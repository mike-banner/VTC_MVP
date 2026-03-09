import { createClient } from "@supabase/supabase-js";
import type { APIRoute } from "astro";
import { isPlatform } from "../../../lib/guards";

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { profile } = locals as any;

    // Sécurité Plateforme
    if (!isPlatform(profile)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    const { onboarding_id } = await request.json();

    if (!onboarding_id) {
      return new Response(JSON.stringify({ error: "Missing ID" }), {
        status: 400,
      });
    }

    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
    );

    // Passer le statut en 'rejected'
    const { error } = await supabase
      .from("onboarding")
      .update({ status: "rejected" })
      .eq("id", onboarding_id);

    if (error) {
      console.error("Reject Error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ message: "Rejected successfully" }), {
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
