import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

export const POST: APIRoute = async ({ request }) => {
    try {
        const { onboarding_id } = await request.json();

        if (!onboarding_id) {
            return new Response(JSON.stringify({ error: "Missing ID" }), { status: 400 });
        }

        // Initialisation avec la SERVICE_ROLE_KEY pour l'exécution admin
        // Note: On utilise createClient direct car c'est un call backend-to-backend
        const supabase = createClient(
            import.meta.env.PUBLIC_SUPABASE_URL,
            import.meta.env.SUPABASE_SERVICE_ROLE_KEY
        );

        // Appel direct de la fonction SQL transactionnelle
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
