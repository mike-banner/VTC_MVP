// src/pages/api/tenant/bookings.ts
import type { APIRoute } from "astro";
import { createServerClient, parseCookieHeader } from "@supabase/ssr";

export const GET: APIRoute = async ({ request, locals, cookies }) => {
  try {
    const { user, profile } = locals as any;
    
    // 🛡️ Securité de base : Authentification requise
    if (!user || !profile) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const supabase = createServerClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll: () => parseCookieHeader(request.headers.get("Cookie") ?? "").map(c => ({ name: c.name, value: c.value ?? "" })),
          setAll: (cookiesToSet) => cookiesToSet.forEach(({ name, value, options }) => cookies.set(name, value, options)),
        },
      }
    );

    // 🎯 Filtrage par Tenant (Isolation multi-entreprise)
    let query = supabase
      .from("bookings")
      .select("*")
      .eq("current_tenant_id", profile.tenant_id);

    // 👮 PERMISSIONS FINES :
    // - owner / manager -> voient toutes les bookings du tenant
    // - driver -> voit uniquement ses bookings
    if (profile.tenant_role === "driver") {
      const { data: driver } = await supabase
        .from("drivers")
        .select("id")
        .eq("user_id", user.id)
        .single();
        
      if (driver) {
        query = query.eq("driver_id", driver.id);
      } else {
        // Si pas de profil chauffeur trouvé, on ne retourne rien (sécurité)
        return new Response(JSON.stringify([]), { status: 200 });
      }
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch bookings error:", error);
      throw error;
    }

    return new Response(JSON.stringify(data), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
