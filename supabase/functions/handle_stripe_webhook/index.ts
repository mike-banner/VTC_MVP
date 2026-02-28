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

  // ==========================================
  // EVENT WHITELIST
  // ==========================================

  const allowedEvents = ["checkout.session.completed", "charge.refunded"];

  if (!allowedEvents.includes(event.type)) {
    return new Response("OK", { status: 200 });
  }

  // ==========================================
  // GLOBAL IDEMPOTENCE
  // ==========================================

  const { error: eventInsertError } = await supabase
    .from("stripe_events")
    .insert({
      stripe_event_id: event.id,
      event_type: event.type,
    });

  if (eventInsertError) return new Response("OK", { status: 200 });

  // ==========================================
  // PAYMENT
  // ==========================================

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.booking_id;
    if (!bookingId) return new Response("OK", { status: 200 });

    const { data: booking } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .maybeSingle();

    if (!booking) return new Response("OK", { status: 200 });
    if (booking.status !== "accepted_pending_payment")
      return new Response("OK", { status: 200 });

    await supabase
      .from("bookings")
      .update({
        status: "paid",
        stripe_payment_intent_id: session.payment_intent,
      })
      .eq("id", bookingId);

    // Payment movement
    await supabase.from("financial_movements").insert({
      booking_id: booking.id,
      tenant_id: booking.current_tenant_id,
      stripe_payment_intent_id: session.payment_intent,
      movement_type: "payment",
      direction: "credit",
      gross_amount: booking.total_amount,
      net_amount: booking.subtotal_amount,
      vat_amount: booking.vat_amount,
      refund_ratio: null,
      created_by_event: event.id,
    });

    // Commission movement
    const { data: commission } = await supabase
      .from("booking_commissions")
      .select("*")
      .eq("booking_id", booking.id)
      .maybeSingle();

    if (commission) {
      await supabase.from("financial_movements").insert({
        booking_id: booking.id,
        tenant_id: commission.beneficiary_tenant_id,
        stripe_payment_intent_id: session.payment_intent,
        movement_type: "commission",
        direction: "debit",
        gross_amount: commission.commission_amount,
        net_amount: commission.commission_amount,
        vat_amount: 0,
        refund_ratio: null,
        created_by_event: event.id,
      });
    }
  }

  // ==========================================
  // REFUND (PARTIAL SUPPORT)
  // ==========================================

  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;
    const paymentIntentId = charge.payment_intent as string;
    if (!paymentIntentId) return new Response("OK", { status: 200 });

    const { data: booking } = await supabase
      .from("bookings")
      .select("*")
      .eq("stripe_payment_intent_id", paymentIntentId)
      .maybeSingle();

    if (!booking) return new Response("OK", { status: 200 });

    // Extra security: verify metadata
    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (pi.metadata?.booking_id !== booking.id)
      return new Response("OK", { status: 200 });

    const refundAmount = charge.amount_refunded / 100;
    const refundRatio = refundAmount / booking.total_amount;

    const netReversal = booking.subtotal_amount * refundRatio;
    const vatReversal = booking.vat_amount * refundRatio;

    // Refund movement
    await supabase.from("financial_movements").insert({
      booking_id: booking.id,
      tenant_id: booking.current_tenant_id,
      stripe_payment_intent_id: paymentIntentId,
      stripe_refund_id: charge.refunds?.data?.[0]?.id ?? null,
      movement_type: "refund",
      direction: "debit",
      gross_amount: refundAmount,
      net_amount: netReversal,
      vat_amount: vatReversal,
      refund_ratio: refundRatio,
      created_by_event: event.id,
    });

    // Commission reversal (proportional)
    const { data: commission } = await supabase
      .from("booking_commissions")
      .select("*")
      .eq("booking_id", booking.id)
      .maybeSingle();

    if (commission) {
      const commissionReversal = commission.commission_amount * refundRatio;

      await supabase.from("financial_movements").insert({
        booking_id: booking.id,
        tenant_id: commission.beneficiary_tenant_id,
        stripe_payment_intent_id: paymentIntentId,
        stripe_refund_id: charge.refunds?.data?.[0]?.id ?? null,
        movement_type: "commission_reversal",
        direction: "credit",
        gross_amount: commissionReversal,
        net_amount: commissionReversal,
        vat_amount: 0,
        refund_ratio: refundRatio,
        created_by_event: event.id,
      });
    }

    // Mark refunded only if full refund
    if (refundRatio >= 0.999) {
      await supabase
        .from("bookings")
        .update({ status: "refunded" })
        .eq("id", booking.id);
    }
  }

  return new Response("OK", { status: 200 });
});
