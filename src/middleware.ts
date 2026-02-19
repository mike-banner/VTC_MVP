// src/middleware.ts
import { createServerClient, parseCookieHeader } from '@supabase/ssr'
import { defineMiddleware } from 'astro:middleware'
import { isPlatform, isTenant } from './lib/guards'

export const onRequest = defineMiddleware(async ({ cookies, request, redirect, locals }, next) => {
  const url = new URL(request.url)
  const path = url.pathname

  // Ne protéger que les routes SaaS sensibles
  const authRoutes = ['/app', '/admin', '/onboarding', '/waiting-approval', '/dashboard']
  const isAuthRoute = authRoutes.some(route => path.startsWith(route))

  if (!isAuthRoute) {
    return next()
  }

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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect("/login")

  const [profileResult, onboardingResult] = await Promise.all([
    supabase.from("profiles").select("tenant_id, platform_role, tenant_role").eq("id", user.id).maybeSingle(),
    supabase.from("onboarding").select("status").eq("profile_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle()
  ]);

  const profile = profileResult.data;
  const onboarding = onboardingResult.data;

  (locals as any).user = user;
  (locals as any).profile = profile;

  // 1. Logique Plateforme (Priorité 1)
  if (isPlatform(profile)) {
    if (path.startsWith('/admin')) return next();
    return redirect('/admin');
  }

  // 2. Logique Tenant (Priorité 2)
  if (isTenant(profile)) {
    if (path.startsWith('/app')) return next();
    return redirect('/app/dashboard');
  }

  // 3. Logique Onboarding (Priorité 3)
  if (!onboarding) {
    if (path === '/onboarding') return next();
    return redirect('/onboarding');
  }

  if (onboarding.status === 'pending') {
    if (path === '/waiting-approval') return next();
    return redirect('/waiting-approval');
  }

  if (path !== '/onboarding') return redirect('/onboarding');

  return next()
})
