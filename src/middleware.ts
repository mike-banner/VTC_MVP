// src/middleware.ts
import { createServerClient, parseCookieHeader } from '@supabase/ssr'
import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware(async ({ cookies, request, redirect }, next) => {
  const url = new URL(request.url)
  const authRoutes = ['/dashboard', '/bookings', '/settings', '/onboarding', '/waiting-approval']
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
          return parseCookieHeader(request.headers.get('Cookie') ?? '')
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 2. Vérifier la session
  const { data: { user } } = await supabase.auth.getUser()

  // Routes d'authentification (accessibles uniquement si non connecté)
  const isAuthPage = url.pathname === '/login' || url.pathname === '/signup'

  // Si l'utilisateur est déjà connecté et tente d'aller sur login/signup -> Dashboard
  if (user && isAuthPage) {
    return redirect('/dashboard')
  }

  // Si pas de session et tente d'accéder à une route SaaS -> Login
  if (!user && isAuthRoute) {
    return redirect('/login')
  }

  // Si pas de session et pas une route protégée -> OK
  if (!user) {
    return next()
  }

  // 3. Récupérer le profil
  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('id', user.id)
    .maybeSingle()

  // Si l'utilisateur a déjà un tenant (Onboarding fini et validé)
  if (profile?.tenant_id) {
    if (url.pathname === '/onboarding' || url.pathname === '/waiting-approval') {
      return redirect('/dashboard')
    }
    return next()
  }

  // 4. Si pas de tenant, vérifier l'état de l'onboarding
  const { data: onboarding } = await supabase
    .from('onboarding')
    .select('status')
    .eq('profile_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  // Cas A : Aucun onboarding commencé ou rattaché au compte -> DIRECTION ONBOARDING
  if (!onboarding) {
    if (url.pathname !== '/onboarding') {
      return redirect('/onboarding')
    }
    return next()
  }

  // Cas B : Dossier soumis et en cours de vérification -> DIRECTION ATTENTE
  if (onboarding.status === 'pending') {
    if (url.pathname !== '/waiting-approval') {
      return redirect('/waiting-approval')
    }
    return next()
  }

  // Cas C : Le dossier est 'processed' (terminé) mais le tenant_id n'est pas encore synchronisé
  // ou dossier rejeté -> On redirige vers l'onboarding pour sécurité ou nouvelle tentative
  if (url.pathname !== '/onboarding') {
    return redirect('/onboarding')
  }

  return next()
})
