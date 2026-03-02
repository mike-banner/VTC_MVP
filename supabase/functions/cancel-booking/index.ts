import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12.18.0?target=deno&no-check";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2026-02-25.clover",
});

serve(async (req) => {
  const { booking_id, reason } = await req.json();

  if (!booking_id || !reason) {
    return new Response("Missing params", { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // 1️⃣ Load booking
  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", booking_id)
    .maybeSingle();

  if (!booking) return new Response("Booking not found", { status: 404 });
  if (booking.status !== "paid")
    return new Response("Booking not cancellable", { status: 400 });

  if (!booking.cancellation_policy_id)
    return new Response("Missing cancellation policy", { status: 400 });

  // 2️⃣ Load policy
  const { data: policy } = await supabase
    .from("cancellation_policies")
    .select("*")
    .eq("id", booking.cancellation_policy_id)
    .single();

  const now = new Date();
  const pickup = new Date(booking.pickup_time);

  const deltaHours = (pickup.getTime() - now.getTime()) / (1000 * 60 * 60);

  let refundRate = 0;

  if (reason === "driver_fault") {
    refundRate = policy.driver_fault_refund_rate;
  } else if (reason === "no_show") {
    refundRate = policy.no_show_refund_rate;
  } else if (deltaHours >= policy.hours_before_full_refund) {
    refundRate = 1;
  } else if (deltaHours >= policy.hours_before_partial_refund) {
    refundRate = policy.partial_refund_rate;
  }

  const refundAmount = booking.total_amount * refundRate;

  // 3️⃣ No refund case
  if (refundAmount <= 0) {
    await supabase
      .from("bookings")
      .update({
        status: "cancelled_no_refund",
        cancellation_reason: reason,
        cancelled_at: now.toISOString(),
      })
      .eq("id", booking_id);

    return new Response(JSON.stringify({ refund: 0 }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // 4️⃣ Stripe refund
  await stripe.refunds.create({
    payment_intent: booking.stripe_payment_intent_id,
    amount: Math.round(refundAmount * 100),
  });

  await supabase
    .from("bookings")
    .update({
      status: "cancelled_pending_refund",
      cancellation_reason: reason,
      cancelled_at: now.toISOString(),
    })
    .eq("id", booking_id);

  return new Response(JSON.stringify({ refund: refundAmount }), {
    headers: { "Content-Type": "application/json" },
  });
});
