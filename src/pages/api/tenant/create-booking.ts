// src/pages/api/tenant/create-booking.ts
import { createClient } from "@supabase/supabase-js";
import type { APIRoute } from "astro";

/**
 * API pour créer une course avec calcul de prix automatisé côté serveur
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const {
      pickup,
      dropoff,
      distance_km,
      pickup_time,
      client_name,
      client_email,
      payment_mode,
    } = body;

    // Utilisation de la SERVICE_ROLE_KEY pour bypass RLS et calculs critiques
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
    );

    const { user, profile } = locals as any;
    if (!user || !profile) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // 1️⃣ Normalisation email
    const normalizedEmail = client_email.trim().toLowerCase();
    const tenantId = profile.tenant_id;

    // 2️⃣ Chercher customer existant
    let { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("tenant_id", tenantId)
      .eq("email", normalizedEmail)
      .maybeSingle();

    let customerId = existingCustomer?.id;

    // 3️⃣ Créer si absent
    if (!customerId) {
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert({
          tenant_id: tenantId,
          email: normalizedEmail,
          first_name: client_name.split(" ")[0],
          last_name: client_name.split(" ").slice(1).join(" ") || "",
          type: "individual",
        })
        .select("id")
        .limit(1)
        .maybeSingle();

      if (customerError) throw customerError;
      if (!newCustomer) throw new Error("Erreur lors de la création du client");
      customerId = newCustomer.id;
    }

    // 2️ (Suite) Récupérer les règles tarifaires actives du tenant
    const { data: pricing, error: pricingError } = await supabase
      .from("pricing_rules")
      .select("*")
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (pricingError || !pricing) {
      return new Response(
        JSON.stringify({
          error: "Aucune règle tarifaire active trouvée pour ce tenant.",
        }),
        { status: 400 },
      );
    }

    // 3️⃣ Calcul du prix (Logique V1)
    let total =
      Number(pricing.base_price) +
      Number(pricing.price_per_km) * Number(distance_km);
    if (total < Number(pricing.minimum_fare)) {
      total = Number(pricing.minimum_fare);
    }

    // 4️⃣ Insertion de la réservation
    const { data: booking, error: insertError } = await supabase
      .from("bookings")
      .insert({
        original_tenant_id: tenantId,
        current_tenant_id: tenantId,
        customer_id: customerId, // Utilisation de l'ID normalisé
        pickup_address: pickup,
        dropoff_address: dropoff,
        pickup_time,
        total_amount: total,
        status: "pending",
        payment_mode: payment_mode || "cash",
      })
      .select()
      .limit(1)
      .maybeSingle();

    if (insertError) {
      console.error("Insert booking error:", insertError);
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
      });
    }

    if (!booking) {
      return new Response(
        JSON.stringify({
          error: "Erreur lors de la création de la réservation",
        }),
        {
          status: 500,
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        booking_id: booking.id,
        total_price: total,
      }),
      { status: 200 },
    );
  } catch (err: any) {
    console.error("Create booking crash:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
