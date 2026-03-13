import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12.18.0?target=deno&no-check";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const customer_data = body.customer_data;
    const booking_data = body.booking_data;

    if (!booking_data) {
      throw new Error("booking_data missing");
    }

    if (!booking_data.type) {
      throw new Error("booking_type is required");
    }

    if (!booking_data.tenant_id) {
      throw new Error("tenant_id required");
    }

    // =========================
    // CALCULS FINANCIERS
    // =========================

    const total = Number(booking_data.total_amount ?? 0);

    if (!total || total <= 0) {
      throw new Error("invalid total");
    }

    const VAT_RATE = 0.1;

    const subtotal = Number((total / (1 + VAT_RATE)).toFixed(2));

    const vatAmount = Number((total - subtotal).toFixed(2));

    // =========================
    // CUSTOMER
    // =========================

    const { data: customer, error: cErr } = await supabase
      .from("customers")
      .upsert(
        {
          tenant_id: booking_data.tenant_id,
          email: customer_data.email,
          first_name: customer_data.first_name,
          last_name: customer_data.last_name,
          phone: customer_data.phone,
        },
        { onConflict: "tenant_id,email" },
      )
      .select()
      .single();

    if (cErr || !customer) {
      throw new Error("Customer error");
    }

    // =========================
    // VEHICLE CHECK
    // =========================

    const vehicleId = booking_data.vehicle_id;

    if (!vehicleId) {
      throw new Error("vehicle_id required");
    }

    const passengers = Number(booking_data.passengers ?? 1);
    const luggage = Number(booking_data.luggage ?? 0);

    const { data: vehicle, error: vErr } = await supabase
      .from("vehicles")
      .select("capacity, luggage_capacity, tenant_id, status")
      .eq("id", vehicleId)
      .single();

    if (vErr || !vehicle) {
      throw new Error("Vehicle not found");
    }

    if (vehicle.status !== "active") {
      throw new Error("Vehicle inactive");
    }

    if (vehicle.tenant_id !== booking_data.tenant_id) {
      throw new Error("Vehicle tenant mismatch");
    }

    if (passengers > vehicle.capacity) {
      throw new Error("Too many passengers");
    }

    if (luggage > vehicle.luggage_capacity) {
      throw new Error("Too much luggage");
    }

    // =========================
    // INSERT BOOKING
    // =========================

    const { data: booking, error: bErr } = await supabase
      .from("bookings")
      .insert({
        original_tenant_id: booking_data.tenant_id,
        current_tenant_id: booking_data.tenant_id,

        pickup_address: booking_data.pickup_address,
        dropoff_address: booking_data.dropoff_address,
        pickup_time: booking_data.pickup_time,

        vehicle_id: vehicleId,

        total_amount: total,
        subtotal_amount: subtotal,
        vat_amount: vatAmount,

        customer_id: customer.id,

        payment_mode: "card",
        status: "accepted_pending_payment",

        passenger_count: passengers,
        luggage_count: luggage,

        booking_type: booking_data.type,
      })
      .select()
      .single();

    if (bErr || !booking) {
      throw new Error("Booking insert failed");
    }

    // =========================
    // TENANT STRIPE
    // =========================

    const { data: tenant, error: tErr } = await supabase
      .from("tenants")
      .select("stripe_account_id, platform_fee_rate")
      .eq("id", booking_data.tenant_id)
      .single();

    if (tErr || !tenant) {
      throw new Error("Tenant not found");
    }

    if (!tenant.stripe_account_id) {
      throw new Error("Stripe account missing");
    }

    // =========================
// CHECK STRIPE STATUS
// =========================

const account = await stripe.accounts.retrieve(
  tenant.stripe_account_id
);

if (!account.charges_enabled) {
  throw new Error(
    "Driver Stripe account not ready"
  );
}

    // =========================
    // STRIPE SESSION
    // =========================

    const amountInCents = Math.round(total * 100);

    const feeRate = tenant.platform_fee_rate ?? 0;

    const feeInCents = Math.round((feeRate / 100) * amountInCents);

const session = await stripe.checkout.sessions.create({
  mode: "payment",

  metadata: {
    booking_id: booking.id,
  },

  customer_email: customer.email,

  line_items: [
    {
      price_data: {
        currency: "eur",
        product_data: {
          name: "Course VTC",
          description:
            `${booking_data.pickup_address} → ${booking_data.dropoff_address}`,
        },
        unit_amount: amountInCents,
      },
      quantity: 1,
    },
  ],

payment_intent_data: {
  application_fee_amount:
    feeInCents > 0 ? feeInCents : undefined,

  transfer_data: {
    destination: tenant.stripe_account_id,
  },

  on_behalf_of: tenant.stripe_account_id,

  metadata: {
    booking_id: booking.id,
  },
},

  success_url:
    `${req.headers.get("origin")}/success?id=${booking.id}`,

  cancel_url:
    `${req.headers.get("origin")}/transfert`,
});

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      },
    );

  } catch (err) {

    console.error("🔥 Error:", err.message);

    return new Response(
      JSON.stringify({ error: err.message }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      },
    );
  }
});
