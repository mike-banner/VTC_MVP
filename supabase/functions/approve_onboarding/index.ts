import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  const { onboarding_id } = await req.json()

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )

  // 1️⃣ Récupérer onboarding
  const { data: onboarding, error } = await supabase
    .from("onboarding")
    .select("*")
    .eq("id", onboarding_id)
    .single()

  if (error || !onboarding || onboarding.status !== "pending") {
    return new Response("Invalid onboarding", { status: 400 })
  }

  try {
    // 2️⃣ Créer tenant
    const { data: tenant, error: tenantError } = await supabase
      .from("tenants")
      .insert({
        name: onboarding.company_name,
        primary_domain: onboarding.primary_domain,
        commission_rate: 0
      })
      .select()
      .single()

    if (tenantError) throw tenantError

    // 3️⃣ Lier profile
    await supabase
      .from("profiles")
      .update({ tenant_id: tenant.id })
      .eq("id", onboarding.profile_id)

    // 4️⃣ Créer driver
    const { data: driver, error: driverError } = await supabase
      .from("drivers")
      .insert({
        tenant_id: tenant.id,
        phone: onboarding.phone,
        license_number: onboarding.vtc_license_number
      })
      .select()
      .single()

    if (driverError) throw driverError

    // 5️⃣ Créer vehicle
    await supabase.from("vehicles").insert({
      tenant_id: tenant.id,
      driver_id: driver.id,
      brand: onboarding.vehicle_brand,
      model: onboarding.vehicle_model,
      plate_number: onboarding.plate_number,
      capacity: onboarding.capacity
    })

    // 6️⃣ Créer pricing_rules
    for (const category of onboarding.service_categories) {
      await supabase.from("pricing_rules").insert({
        tenant_id: tenant.id,
        service_category: category,
        base_price: onboarding.default_base_price,
        price_per_km: onboarding.default_price_per_km,
        minimum_fare: onboarding.default_minimum_fare,
        active: true
      })
    }

    // 7️⃣ Finaliser
    await supabase
      .from("onboarding")
      .update({ status: "processed" })
      .eq("id", onboarding_id)

    return new Response("Onboarding approved", { status: 200 })

  } catch (err) {
    console.error(err)
    return new Response("Transaction failed", { status: 500 })
  }
})
