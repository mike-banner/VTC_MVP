// src/middleware.ts
import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(
  async ({ cookies, request, redirect, locals }, next) => {
    const url = new URL(request.url);
    const path = url.pathname;

    // Initialisation Supabase (SSR)
    const supabase = createServerClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll: () =>
            parseCookieHeader(request.headers.get("Cookie") ?? "").map((c) => ({
              name: c.name,
              value: c.value ?? "",
            })),
          setAll: (cookiesToSet) =>
            cookiesToSet.forEach(({ name, value, options }) =>
              cookies.set(name, value, options as any),
            ),
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Mapping des types de routes
    const isLoginPage = path === "/login";
    const isSignupPage = path === "/signup";
    const isAuthPage = isLoginPage || isSignupPage;

    const isAppRoute = path.startsWith("/app");
    const isAdminRoute = path.startsWith("/admin");
    const isOnboardingRoute = path.startsWith("/onboarding");
    const isDashboardBase = path === "/dashboard";
    const isSaaSRoute =
      isAppRoute || isAdminRoute || isOnboardingRoute || isDashboardBase;

    // 1. CAS : Utilisateur NON connecté
    if (!user) {
      if (isSaaSRoute && !isAuthPage) {
        return redirect("/login");
      }
      return next();
    }

    locals.user = user;

    // 2. CAS : Utilisateur connecté -> Récupérer profil
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    locals.profile = profile || null;

    // 3. LOGIQUE DE REDIRECTION (Pour connectés sur Login/Dashboard/Apps)
    if (isSaaSRoute || isAuthPage) {
      // --- PRIORITÉ : ADMIN Plateforme ---
      if (profile?.platform_role) {
        // Toujours vers l'admin dashboard
        if (!isAdminRoute) {
          return redirect("/admin/onboardings");
        }
        return next();
      }

      // --- PRIORITÉ : Flow Onboarding (Pending) ---
      if (profile?.tenant_role === "pending") {
        if (!isOnboardingRoute) {
          return redirect("/onboarding");
        }
        return next();
      }

      // --- PRIORITÉ : Chauffeur Actif (Onboardé) ---
      if (profile?.tenant_id) {
        if (!isAppRoute) {
          return redirect("/app/dashboard");
        }
        return next();
      }

      // --- CAS : Nouveau connecté sans rôle défini (Sécurité) ---
      if (isSaaSRoute && !isOnboardingRoute && !isAdminRoute) {
        return redirect("/onboarding");
      }
    }

    return next();
  },
);
