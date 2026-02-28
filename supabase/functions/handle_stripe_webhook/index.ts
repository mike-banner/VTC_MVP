import Stripe from "https://esm.sh/stripe@12.18.0?target=deno&no-check";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2026-02-25.clover",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  const rawBody = await req.arrayBuffer();
  const body = new TextDecoder().decode(rawBody);

  let event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!
    );
  } catch (err) {
    console.error("Signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  // ===============================
  // IDPOTENCE GLOBALE STRIPE EVENT
  // ===============================

  const { error: eventInsertError } = await supabase
    .from("stripe_events")
    .insert({
      stripe_event_id: event.id,
      event_type: event.type,
    });

  if (eventInsertError) {
    // Event déjà traité
    return new Response("OK", { status: 200 });
  }

  // ===============================
  // CHECKOUT COMPLETED
  // ===============================

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.booking_id;

    if (!bookingId) {
      return new Response("OK", { status: 200 });
    }

    const { data: booking } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .maybeSingle();

    if (!booking) {
      return new Response("OK", { status: 200 });
    }

    // 🔒 Blocage double paiement
    if (booking.status === "paid") {
      return new Response("OK", { status: 200 });
    }

    if (booking.status !== "accepted_pending_payment") {
      return new Response("OK", { status: 200 });
    }

    await supabase
      .from("bookings")
      .update({
        status: "paid",
        stripe_payment_intent_id: session.payment_intent,
      })
      .eq("id", bookingId);
  }

  // ===============================
  // REFUND
  // ===============================

  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;
    const paymentIntentId = charge.payment_intent as string;

    if (!paymentIntentId) {
      return new Response("OK", { status: 200 });
    }

    const { data: booking } = await supabase
      .from("bookings")
      .select("*")
      .eq("stripe_payment_intent_id", paymentIntentId)
      .maybeSingle();

    if (!booking) {
      return new Response("OK", { status: 200 });
    }

    // 🔒 Blocage double refund
    if (booking.status === "refunded") {
      return new Response("OK", { status: 200 });
    }

    await supabase
      .from("bookings")
      .update({ status: "refunded" })
      .eq("id", booking.id);
  }

  return new Response("OK", { status: 200 });
});