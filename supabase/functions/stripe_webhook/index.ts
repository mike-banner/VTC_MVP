import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12.18.0?target=deno&no-check";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  const rawBody = await req.arrayBuffer();
  const body = new TextDecoder().decode(rawBody);

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
    );
  } catch (err) {
    console.log("SIGNATURE ERROR", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const obj: any = event.data.object;

  const sessionId =
    obj?.id && obj?.object === "checkout.session"
      ? obj.id
      : (obj?.checkout_session ?? null);

  const paymentIntent = obj?.payment_intent ?? obj?.id ?? null;

  const tenantId = obj?.metadata?.tenant_id ?? null;

  const amount = obj?.amount_total
    ? obj.amount_total / 100
    : obj?.amount_received
      ? obj.amount_received / 100
      : null;

  // --------------------------
  // STATUS
  // --------------------------

  let status = "received";

  if (event.type === "checkout.session.completed") {
    status = "session_completed";
  }

  if (event.type === "payment_intent.succeeded") {
    status = "paid";
  }

  if (event.type === "payment_intent.payment_failed") {
    status = "failed";
  }

  // --------------------------
  // UPSERT stripe_events
  // --------------------------

  const { data: existing } = await supabase
    .from("stripe_events")
    .select("id")
    .eq("stripe_event_id", event.id)
    .maybeSingle();

  if (!existing) {
    await supabase.from("stripe_events").insert({
      stripe_event_id: event.id,
      session_id: sessionId,
      payment_intent_id: paymentIntent,
      event_type: event.type,
      status,
      tenant_id: tenantId,
      amount,
      metadata: event,
    });
  } else {
    await supabase
      .from("stripe_events")
      .update({
        status,
        metadata: event,
      })
      .eq("stripe_event_id", event.id);
  }

  // --------------------------
  // CREATE BOOKING V1
  // --------------------------
  if (event.type === "checkout.session.completed") {
    const session = obj as any;

    if (session?.metadata) {
      const m = session.metadata;

      const subtotal = Number(m.subtotal_amount ?? 0);
      const vat = Number(m.vat_amount ?? 0);
      const total = Number(m.total_amount ?? amount ?? 0);

      console.log("INSERTING BOOKING FOR CUSTOMER", m.customer_id);

      const { data: booking, error } = await supabase
        .from("bookings")
        .insert({
          original_tenant_id: tenantId,
          current_tenant_id: tenantId,

          pickup_address: m.pickup_address,
          dropoff_address: m.dropoff_address,

          pickup_time: m.pickup_time,

          total_amount: total,
          subtotal_amount: subtotal,
          vat_amount: vat,

          status: "paid",
          payment_mode: "stripe",
          booking_source: "customer", // OBLIGATOIRE
          pricing_mode: "direct",     // OBLIGATOIRE

          customer_id: m.customer_id,

          stripe_payment_intent_id: session.payment_intent,

          passenger_count: Number(m.passenger_count ?? 1),
          luggage_count: Number(m.luggage_count ?? 0),

          booking_type: m.booking_type,

          vehicle_id: m.vehicle_id ?? null,
        })
        .select()
        .single();

      if (error) {
        console.error("CRITICAL: BOOKING INSERTION FAILED", error);
        // On retourne une 500 pour que Stripe retente le webhook plus tard
        return new Response(`Error: ${error.message}`, { status: 500 });
      }

      if (booking) {
        console.log("BOOKING CREATED SUCCESS", booking.id);
        await supabase
          .from("stripe_events")
          .update({
            status: "booking_created",
            booking_id: booking.id,
          })
          .eq("stripe_event_id", event.id);
      }
    }
  }

  return new Response("OK");
});
