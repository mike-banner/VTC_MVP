import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const { booking_id, cancelled_at, reason } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", booking_id)
    .single();

  if (!booking) {
    return new Response("Booking not found", { status: 404 });
  }

  const { data: policy } = await supabase
    .from("cancellation_policies")
    .select("*")
    .eq("id", booking.cancellation_policy_id)
    .single();

  if (!policy) {
    return new Response("Policy not found", { status: 400 });
  }

  const pickupTime = new Date(booking.pickup_time);
  const cancelTime = new Date(cancelled_at);

  const deltaHours =
    (pickupTime.getTime() - cancelTime.getTime()) / (1000 * 60 * 60);

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

  return new Response(
    JSON.stringify({
      refund_rate: refundRate,
      refund_amount: refundAmount,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
});
