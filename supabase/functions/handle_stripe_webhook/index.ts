import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12.18.0?target=deno&no-check";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2026-02-25.clover",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  const rawBody = await req.arrayBuffer();
  const body = new TextDecoder().decode(rawBody);

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
    );
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  // 🔥 Log réception immédiate
  await supabase.from("stripe_webhook_logs").insert({
    stripe_event_id: event.id,
    event_type: event.type,
    payload: event,
    status: "received",
  });

  try {
    const allowedEvents = ["checkout.session.completed", "refund.created"];

    if (!allowedEvents.includes(event.type)) {
      await supabase
        .from("stripe_webhook_logs")
        .update({
          status: "success",
          processed_at: new Date().toISOString(),
        })
        .eq("stripe_event_id", event.id);

      return new Response("OK");
    }

    // Idempotence globale
    const { error: eventInsertError } = await supabase
      .from("stripe_events")
      .insert({
        stripe_event_id: event.id,
        event_type: event.type,
      });

    if (eventInsertError) {
      await supabase
        .from("stripe_webhook_logs")
        .update({
          status: "success",
          processed_at: new Date().toISOString(),
        })
        .eq("stripe_event_id", event.id);

      return new Response("OK");
    }

    // =============================
    // PAYMENT
    // =============================
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.booking_id;
      if (!bookingId) return new Response("OK");

      const { data: booking } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", bookingId)
        .maybeSingle();

      if (!booking) return new Response("OK");
      if (booking.status !== "accepted_pending_payment")
        return new Response("OK");

      const { data: policy } = await supabase
        .from("cancellation_policies")
        .select("id")
        .eq("tenant_id", booking.current_tenant_id)
        .eq("active", true)
        .order("version", { ascending: false })
        .limit(1)
        .single();

      if (!policy) throw new Error("No active cancellation policy found");

      await supabase
        .from("bookings")
        .update({
          status: "paid",
          stripe_payment_intent_id: session.payment_intent,
          cancellation_policy_id: policy.id,
        })
        .eq("id", bookingId);

      const subtotal = booking.subtotal_amount ?? 0;
      const vat = booking.vat_amount ?? 0;
      const total = booking.total_amount ?? 0;

      await supabase.from("financial_movements").insert({
        booking_id: booking.id,
        tenant_id: booking.current_tenant_id,
        stripe_payment_intent_id: session.payment_intent,
        movement_type: "payment",
        direction: "credit",
        gross_amount: total,
        net_amount: subtotal,
        vat_amount: vat,
        created_by_event: event.id,
      });

      const { data: tenant } = await supabase
        .from("tenants")
        .select("platform_fee_rate")
        .eq("id", booking.current_tenant_id)
        .maybeSingle();

      const rate = tenant?.platform_fee_rate ?? 0;

      if (rate > 0) {
        const commissionAmount = total * (rate / 100);

        await supabase.from("financial_movements").insert({
          booking_id: booking.id,
          tenant_id: booking.current_tenant_id,
          stripe_payment_intent_id: session.payment_intent,
          movement_type: "commission",
          direction: "debit",
          gross_amount: commissionAmount,
          net_amount: commissionAmount,
          vat_amount: 0,
          platform_commission_rate_snapshot: rate,
          platform_commission_amount: commissionAmount,
          created_by_event: event.id,
        });
      }
    }

    // =============================
    // REFUND
    // =============================
    if (event.type === "refund.created") {
      const refund = event.data.object as Stripe.Refund;
      const paymentIntentId = refund.payment_intent as string;

      if (!paymentIntentId) return new Response("OK");

      const { data: existing } = await supabase
        .from("financial_movements")
        .select("id")
        .eq("stripe_refund_id", refund.id)
        .maybeSingle();

      if (existing) return new Response("OK");

      const { data: booking } = await supabase
        .from("bookings")
        .select("*")
        .eq("stripe_payment_intent_id", paymentIntentId)
        .maybeSingle();

      if (!booking) return new Response("OK");

      const total = booking.total_amount ?? 0;
      if (total === 0) return new Response("OK");

      const refundAmount = refund.amount / 100;
      const refundRatio = refundAmount / total;

      const subtotal = booking.subtotal_amount ?? 0;
      const vat = booking.vat_amount ?? 0;

      await supabase.from("financial_movements").insert({
        booking_id: booking.id,
        tenant_id: booking.current_tenant_id,
        stripe_payment_intent_id: paymentIntentId,
        stripe_refund_id: refund.id,
        movement_type: "refund",
        direction: "debit",
        gross_amount: refundAmount,
        net_amount: subtotal * refundRatio,
        vat_amount: vat * refundRatio,
        refund_ratio: refundRatio,
        created_by_event: event.id,
      });

      const { data: originalCommission } = await supabase
        .from("financial_movements")
        .select("*")
        .eq("booking_id", booking.id)
        .eq("movement_type", "commission")
        .maybeSingle();

      if (originalCommission) {
        const commissionReversal =
          (originalCommission.gross_amount ?? 0) * refundRatio;

        await supabase.from("financial_movements").insert({
          booking_id: booking.id,
          tenant_id: originalCommission.tenant_id,
          stripe_payment_intent_id: paymentIntentId,
          stripe_refund_id: refund.id,
          movement_type: "commission_reversal",
          direction: "credit",
          gross_amount: commissionReversal,
          net_amount: commissionReversal,
          vat_amount: 0,
          refund_ratio: refundRatio,
          platform_commission_rate_snapshot:
            originalCommission.platform_commission_rate_snapshot,
          platform_commission_amount: commissionReversal,
          created_by_event: event.id,
        });
      }

      await supabase
        .from("bookings")
        .update({ status: "cancelled_refunded" })
        .eq("id", booking.id);
    }

    // ✅ Success mark
    await supabase
      .from("stripe_webhook_logs")
      .update({
        status: "success",
        processed_at: new Date().toISOString(),
      })
      .eq("stripe_event_id", event.id);

    return new Response("OK");
  } catch (err) {
    await supabase
      .from("stripe_webhook_logs")
      .update({
        status: "error",
        error_message: String(err),
        processed_at: new Date().toISOString(),
      })
      .eq("stripe_event_id", event.id);

    console.error("Webhook processing error:", err);

    return new Response("Webhook error", { status: 500 });
  }
});
