import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    // 🔐 récupérer token utilisateur
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return new Response("Unauthorized", { status: 401 });
    }

    // client user (pour vérifier rôle admin)
    const supabaseUser = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      {
        global: { headers: { Authorization: authHeader } },
      },
    );

    const { data: userData } = await supabaseUser.auth.getUser();

    if (!userData?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // vérifier rôle plateforme
    const { data: profile, error: profileError } = await supabaseUser
      .from("profiles")
      .select("platform_role")
      .eq("id", userData.user.id)
      .single();

    if (profileError) {
      return new Response("Profile error", { status: 400 });
    }

    if (!["super_admin", "platform_staff"].includes(profile.platform_role)) {
      return new Response("Forbidden", { status: 403 });
    }

    // 📦 récupérer payload
    const { onboarding_id } = await req.json();

    if (!onboarding_id) {
      return new Response("Missing onboarding_id", { status: 400 });
    }

    // service role pour la transaction
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // appeler la transaction SQL
    const { error } = await supabaseAdmin.rpc("approve_onboarding_tx", {
      onboarding_uuid: onboarding_id,
    });

    if (error) {
      console.error("RPC error:", error);
      return new Response(JSON.stringify(error), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Approve error:", err);

    return new Response(JSON.stringify({ error: err?.message ?? err }), {
      status: 500,
    });
  }
});
