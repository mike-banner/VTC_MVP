// src/pages/api/submit-rating.ts
import type { APIRoute } from 'astro';
import { createAdminClient } from '../../lib/supabase/server';

export const POST: APIRoute = async ({ request }) => {
  const supabaseAdmin = createAdminClient();
  try {
    const { bookingId, rating, comment } = await request.json();

    if (!bookingId || !rating) {
      return new Response(JSON.stringify({ error: 'Données manquantes' }), { status: 400 });
    }

    // 1️⃣ Vérifier si déjà noté
    const { data: booking, error: fetchError } = await supabaseAdmin
      .from('bookings')
      .select('rating')
      .eq('id', bookingId)
      .single();

    if (fetchError || !booking) {
      return new Response(JSON.stringify({ error: 'Réservation non trouvée' }), { status: 404 });
    }

    if (booking.rating !== null) {
      return new Response(JSON.stringify({ error: 'Déjà noté' }), { status: 400 });
    }

    // 2️⃣ Mettre à jour
    const { error: updateError } = await supabaseAdmin
      .from('bookings')
      .update({
        rating: parseInt(rating),
        rating_comment: comment,
        rating_created_at: new Date().toISOString(),
      })
      .eq('id', bookingId);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ success: true }));
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
