import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12.18.0?target=deno&no-check";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2022-11-15",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response("ok", { headers: corsHeaders });

  try {
    const { customer_data, booking_data } = await req.json();

    // 1. CALCULS FINANCIERS OBLIGATOIRES (TVA 10%)
    const total = Number(booking_data.total_amount);
    const vatRate = 0.1;
    const subtotal = total / (1 + vatRate);

    // 2. GESTION DU CUSTOMER (Lien obligatoire pour customer_id)
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

    if (cErr) throw new Error(`SQL Customer: ${cErr.message}`);

    // 3. INSERTION BOOKING (Respect strict des colonnes NO NULL)
    const { data: booking, error: bErr } = await supabase
      .from("bookings")
      .insert({
        original_tenant_id: booking_data.tenant_id, // Obligatoire
        current_tenant_id: booking_data.tenant_id, // Obligatoire
        pickup_address: booking_data.pickup_address, // Obligatoire
        dropoff_address: booking_data.dropoff_address, // Obligatoire
        pickup_time: booking_data.pickup_time, // Obligatoire
        total_amount: total, // Obligatoire
        subtotal_amount: subtotal, // Obligatoire
        customer_id: customer.id, // Obligatoire
        payment_mode: "card", // Obligatoire (Enum validé)
        status: "pending", // Sécurité additionnelle
        passenger_count: booking_data.passengers || 1,
      })
      .select()
      .single();

    if (bErr) throw new Error(`SQL Booking: ${bErr.message}`);

    // 4. RÉCUPÉRATION DU COMPTE STRIPE CHAUFFEUR
    const { data: tenant } = await supabase
      .from("tenants")
      .select("stripe_account_id, platform_fee_rate")
      .eq("id", booking_data.tenant_id)
      .single();

    if (!tenant?.stripe_account_id) throw new Error("Compte Stripe absent.");

    // 5. CRÉATION SESSION STRIPE
    const amountInCents = Math.round(total * 100);
    const feeRate = tenant.platform_fee_rate || 0;
    const feeInCents = Math.round((feeRate / 100) * amountInCents);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customer.email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Course VTC`,
              description: `${booking_data.pickup_address} → ${booking_data.dropoff_address}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: feeInCents > 0 ? feeInCents : undefined,
        transfer_data: { destination: tenant.stripe_account_id },
        metadata: { booking_id: booking.id },
      },
      success_url: `${req.headers.get("origin")}/success?id=${booking.id}`,
      cancel_url: `${req.headers.get("origin")}/transfert`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("🔥 Erreur:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
