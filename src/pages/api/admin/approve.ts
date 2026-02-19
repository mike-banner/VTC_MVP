import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";
import { isPlatform } from "../../../lib/guards";

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const { profile } = locals as any;

        // Double vérification de sécurité (Shield)
        if (!isPlatform(profile)) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
        }

        const { onboarding_id } = await request.json();

        if (!onboarding_id) {
            return new Response(JSON.stringify({ error: "Missing ID" }), { status: 400 });
        }

        const supabase = createClient(
            import.meta.env.PUBLIC_SUPABASE_URL,
            import.meta.env.SUPABASE_SERVICE_ROLE_KEY
        );

        const { error } = await supabase.rpc("approve_onboarding_tx", {
            onboarding_uuid: onboarding_id
        });

        if (error) {
            console.error("RPC Error:", error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ message: "Approved successfully" }), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
};
