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
  try {
    const { booking_id } = await req.json();

    if (!booking_id) {
      return new Response("Missing booking_id", { status: 400 });
    }

    // 1️⃣ Fetch booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", booking_id)
      .maybeSingle();

    if (bookingError || !booking) {
      return new Response("Booking not found", { status: 404 });
    }

    if (booking.status !== "accepted_pending_payment") {
      return new Response("Invalid booking status", { status: 400 });
    }

    if (!booking.client_email) {
      return new Response("Missing client email", { status: 400 });
    }

    if (!booking.total_amount || booking.total_amount <= 0) {
      return new Response("Invalid total amount", { status: 400 });
    }

    // 2️⃣ Fetch tenant
    const { data: tenant, error: tenantError } = await supabase
      .from("tenants")
      .select("*")
      .eq("id", booking.current_tenant_id)
      .maybeSingle();

    if (tenantError || !tenant || !tenant.stripe_account_id) {
      return new Response("Stripe account not configured", { status: 400 });
    }

    // 3️⃣ Commission calculation
    const platformFeeRate = tenant.platform_fee_rate ?? 0;
    const subtotal = booking.subtotal_amount ?? 0;

    const platformFeeAmount = Math.round(
      (platformFeeRate / 100) * subtotal * 100
    );

    // 4️⃣ Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: booking.client_email,

      metadata: {
        booking_id: booking.id,
      },

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Course VTC",
            },
            unit_amount: Math.round(booking.total_amount * 100),
          },
          quantity: 1,
        },
      ],

      payment_intent_data: {
        application_fee_amount: platformFeeAmount,
        transfer_data: {
          destination: tenant.stripe_account_id,
        },
        metadata: {
          booking_id: booking.id, // 🔥 CRUCIAL pour refunds
        },
      },

      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
});