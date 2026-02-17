// src/middleware.ts
import { createServerClient, parseCookieHeader } from '@supabase/ssr'
import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware(async ({ cookies, request, redirect }, next) => {
  const url = new URL(request.url)
  const protectedRoutes = ['/dashboard', '/bookings', '/settings']
  const isProtectedRoute = protectedRoutes.some(route => url.pathname.startsWith(route))

  if (!isProtectedRoute) {
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
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    if (isProtectedRoute) {
      return redirect('/login')
    }
    return next()
  }

  // 3. Vérifier le profile et le tenant_id
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('id', user.id)
    .single()

  if (profileError || !profile?.tenant_id) {
    // Si on est sur une route protégée mais qu'on n'a pas de tenant,
    // on redirige vers onboarding (sauf si on y est déjà, mais ici les routes protégées n'incluent pas onboarding)
    return redirect('/onboarding')
  }

  // 4. Accès autorisé
  return next()
})
