// src/middleware.ts
import { createServerClient, parseCookieHeader } from '@supabase/ssr'
import { defineMiddleware } from 'astro:middleware'
import { isPlatform, isTenant } from './lib/guards'

export const onRequest = defineMiddleware(async ({ cookies, request, redirect, locals }, next) => {
  const url = new URL(request.url)
  const path = url.pathname

  // Initialisation Supabase pour TOUTES les requêtes (SSR)
  const supabase = createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => parseCookieHeader(request.headers.get("Cookie") ?? "").map(c => ({ name: c.name, value: c.value ?? "" })),
        setAll: (cookiesToSet) => cookiesToSet.forEach(({ name, value, options }) => cookies.set(name, value, options)),
      },
    },
  )

  const { data: { user } } = await supabase.auth.getUser();
  (locals as any).user = user;
  (locals as any).profile = null;

  // Ne protéger que les routes SaaS sensibles
  const authRoutes = ['/app', '/admin', '/onboarding', '/waiting-approval', '/dashboard']
  const isAuthRoute = authRoutes.some(route => path.startsWith(route))

  if (!user) {
    if (isAuthRoute && path !== '/login') return redirect("/login")
    return next()
  }

  // Récupération du profil et de l'onboarding si l'utilisateur est connecté
  const [profileResult, onboardingResult] = await Promise.all([
    supabase.from("profiles").select("tenant_id, platform_role, tenant_role").eq("id", user.id).maybeSingle(),
    supabase.from("onboarding").select("status").eq("profile_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle()
  ]);

  const profile = profileResult.data;
  const onboarding = onboardingResult.data;

  (locals as any).profile = profile;

  // Logique de redirection pour les routes protégées
  if (isAuthRoute) {
    // 1. Logique Plateforme
    if (isPlatform(profile)) {
      if (path.startsWith('/admin')) return next();
      return redirect('/admin');
    }

    // 2. Logique Tenant (Chauffeur/Admin déjà onboardé)
    if (isTenant(profile)) {
      if (path.startsWith('/app')) return next();
      return redirect('/app/dashboard');
    }

    // 3. Logique Onboarding
    if (!onboarding) {
      if (path === '/onboarding') return next();
      return redirect('/onboarding');
    }

    if (onboarding.status === 'pending') {
      if (path === '/waiting-approval') return next();
      return redirect('/waiting-approval');
    }

    // Par défaut si connecté mais perdu
    if (path === '/onboarding') return next();
  }

  return next()
})
