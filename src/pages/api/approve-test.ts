import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
  const { onboarding_id } = await request.json()

  const res = await fetch(
    `${import.meta.env.PUBLIC_SUPABASE_URL}/functions/v1/approve_onboarding`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.SUPABASE_SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify({ onboarding_id })
    }
  )

  const text = await res.text()
  return new Response(text)
}
