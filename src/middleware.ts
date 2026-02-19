// src/middleware.ts
import { createServerClient, parseCookieHeader } from '@supabase/ssr'
import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware(async ({ cookies, request, redirect, locals }, next) => {
  const url = new URL(request.url)
  const authRoutes = ['/dashboard', '/bookings', '/settings', '/onboarding', '/waiting-approval', '/admin']
  const isAuthRoute = authRoutes.some(route => url.pathname.startsWith(route))

  if (!isAuthRoute) {
    return next()
  }

  // 1. Initialiser le client Supabase SSR
  const supabase = createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "").map(
            (c) => ({
              name: c.name,
              value: c.value ?? "",
            }),
          );
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookies.set(name, value, options),
          );
        },
      },
    },
  )

  // 2. Vérifier la session
  const { data: { user } } = await supabase.auth.getUser()

  // Routes d'authentification (accessibles uniquement si non connecté)
  const isAuthPage = url.pathname === '/login' || url.pathname === '/signup'

  // Si pas de session et tente d'accéder à une route SaaS -> Login
  if (!user && isAuthRoute) {
    return redirect("/login");
  }

  // Si pas de session et pas une route protégée -> OK
  if (!user) {
    return next();
  }

  // 3. Récupérer le profil et l'onboarding en PARALLÈLE pour gagner en vitesse
  const [profileResult, onboardingResult] = await Promise.all([
    supabase.from("profiles").select("tenant_id, platform_role, tenant_role").eq("id", user.id).maybeSingle(),
    supabase.from("onboarding").select("status").eq("profile_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle()
  ]);

  const profile = profileResult.data;
  const onboarding = onboardingResult.data;

  // 📦 Stocker dans locals pour accès direct dans les pages .astro
  (locals as any).user = user;
  (locals as any).profile = profile;

  // 🧱 LOGIQUE DE REDIRECTION INTELLIGENTE
  
  // Cas 1 : Administrateur Plateforme (Priorité Haute)
  if (profile?.platform_role) {
    if (isAuthPage || (isAuthRoute && !url.pathname.startsWith('/admin'))) {
      return redirect('/admin');
    }
    return next();
  }

  // Cas 2 : Chauffeur avec Tenant Actif
  if (profile?.tenant_id) {
    if (isAuthPage || url.pathname === '/onboarding' || url.pathname === '/waiting-approval' || url.pathname === '/admin') {
      return redirect('/dashboard');
    }
    return next();
  }

  // 🧱 PROTECTION STRICTE /DASHBOARD ET AUTRES ROUTES
  // Si on essaie d'accéder au dashboard (ou autre route protégée) sans tenant_id
  if (!profile?.tenant_id) {
    // Cas A : Aucun onboarding commencé -> DIRECTION ONBOARDING
    if (!onboarding) {
      if (url.pathname !== '/onboarding') return redirect('/onboarding');
      return next();
    }

    // Cas B : Dossier soumis et en cours de vérification -> DIRECTION ATTENTE
    if (onboarding.status === 'pending') {
      if (url.pathname !== '/waiting-approval') return redirect('/waiting-approval');
      return next();
    }

    // Cas C : Le dossier est traité mais pas encore synchronisé ou autre état
    if (url.pathname !== '/onboarding') {
      return redirect('/onboarding');
    }
  }

  return next()
})
