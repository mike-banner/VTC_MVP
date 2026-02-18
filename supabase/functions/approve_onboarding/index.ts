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
  const { error } = await supabase.rpc("approve_onboarding_tx", {
    onboarding_uuid: onboarding_id
  })

  if (error) throw error

  return new Response("Onboarding approved", { status: 200 })

} catch (err) {
  console.error("Approve error:", err)
  return new Response(
    JSON.stringify({ error: err?.message ?? err }),
    { status: 500 }
  )
}

})
