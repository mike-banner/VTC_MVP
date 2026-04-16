// src/pages/api/missions/terrain-transition.ts
import { supabase } from '@/lib/supabase/client';
import type { APIRoute } from 'astro';

type TerrainAction = 'en_route' | 'on_board' | 'completed';

const TERRAIN_TAGS: Record<TerrainAction, string> = {
  en_route: 'en_route_at',
  on_board: 'on_board_at',
  completed: 'completed_at',
};

export const POST: APIRoute = async ({ request, locals }) => {
  const { profile } = locals;
  if (!profile) return new Response('Unauthorized', { status: 401 });

  try {
    const { booking_id, action } = await request.json();

    if (!booking_id || !action || !(action in TERRAIN_TAGS)) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
    }

    // 1. Fetch booking and verify ownership (tenant)
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('id, status, pickup_time, notes, current_tenant_id')
      .eq('id', booking_id)
      .eq('current_tenant_id', profile.tenant_id)
      .single();

    if (fetchError || !booking) {
      return new Response(JSON.stringify({ error: 'Booking not found' }), { status: 404 });
    }

    // 2. Guard H-15 for en_route
    if (action === 'en_route') {
      const pickupTimeMs = new Date(booking.pickup_time).getTime();
      const availableAtMs = pickupTimeMs - 15 * 60 * 1000;
      if (Date.now() < availableAtMs) {
        return new Response(
          JSON.stringify({ error: 'Too early', available_at: new Date(availableAtMs).toISOString() }),
          { status: 400 }
        );
      }
    }

    // 3. Prepare Notes Update
    const nowIso = new Date().toISOString();
    const marker = `[terrain] ${TERRAIN_TAGS[action as TerrainAction]}=${nowIso}`;
    const currentNotes = (booking.notes ?? '').toString();
    const alreadyMarked = currentNotes.includes(`[terrain] ${TERRAIN_TAGS[action as TerrainAction]}=`);
    const nextNotes = alreadyMarked ? currentNotes : `${currentNotes}${currentNotes ? '\n' : ''}${marker}`;

    const updatePayload: any = { notes: nextNotes };
    if (action === 'completed') {
      updatePayload.status = 'completed';
    }

    const { error: updateError } = await supabase
      .from('bookings')
      .update(updatePayload)
      .eq('id', booking_id);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ success: true, notes: nextNotes }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Terrain transition error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
