// src/pages/api/tenant/create-booking.ts
import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

/**
 * API pour créer une course avec calcul de prix automatisé côté serveur
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { pickup, dropoff, distance_km, pickup_time, client_name, payment_mode } = body;

    // Utilisation de la SERVICE_ROLE_KEY pour bypass RLS et calculs critiques
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { user, profile } = locals as any;
    if (!user || !profile) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // 1️⃣ Récupérer les règles tarifaires actives du tenant
    const { data: pricing, error: pricingError } = await supabase
      .from("pricing_rules")
      .select("*")
      .eq("tenant_id", profile.tenant_id)
      .eq("active", true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (pricingError || !pricing) {
      return new Response(JSON.stringify({ error: "Aucune règle tarifaire active trouvée pour ce tenant." }), { status: 400 });
    }

    // 2️⃣ Calcul du prix (Logique V1)
    // total = base + (per_km * distance)
    let total = Number(pricing.base_price) + (Number(pricing.price_per_km) * Number(distance_km));

    // Application du minimum fare
    if (total < Number(pricing.minimum_fare)) {
      total = Number(pricing.minimum_fare);
    }

    // 3️⃣ Insertion de la réservation
    const { data: booking, error: insertError } = await supabase
      .from("bookings")
      .insert({
        original_tenant_id: profile.tenant_id,
        current_tenant_id: profile.tenant_id,
        client_name,
        pickup_address: pickup,
        dropoff_address: dropoff,
        pickup_time,
        total_amount: total,
        status: "pending",
        payment_mode: payment_mode || "cash" // Par défaut Cash si non précisé
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert booking error:", insertError);
      return new Response(JSON.stringify({ error: insertError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      booking_id: booking.id,
      total_price: total 
    }), { status: 200 });

  } catch (err: any) {
    console.error("Create booking crash:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
