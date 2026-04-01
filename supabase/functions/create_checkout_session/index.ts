import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@12.18.0?target=deno&no-check';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
});

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
      },
    },
  },
);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    console.log('BODY =', body);

    const customer_data = body.customer_data;
    const booking_data = body.booking_data;

    if (!booking_data) throw new Error('booking_data missing');
    if (!booking_data.type) throw new Error('booking_type missing');
    if (!booking_data.tenant_id) throw new Error('tenant_id missing');

    const tenantId = booking_data.tenant_id;

    const total = Number(booking_data?.total_amount ?? booking_data?.total ?? 0);

    const safeTotal = total > 0 ? total : 1;

    console.log('TOTAL =', total);
    console.log('SAFE TOTAL =', safeTotal);

    // =========================
    // CUSTOMER UPSERT
    // =========================

    console.log('UPSERT CUSTOMER INPUT', {
      tenantId,
      email: customer_data?.email,
    });

    const { data: customer, error: cErr } = await supabaseAdmin
      .from('customers')
      .upsert(
        {
          tenant_id: tenantId,
          email: customer_data.email,
          first_name: customer_data.first_name,
          last_name: customer_data.last_name,
          phone: customer_data.phone,
        },
        {
          onConflict: 'tenant_id,email',
        },
      )
      .select()
      .single();

    if (cErr) {
      console.log('CUSTOMERS ERROR =', cErr);
      throw new Error(cErr.message);
    }

    if (!customer) {
      console.log('CUSTOMER NULL');
      throw new Error('customer null');
    }

    // =========================
    // VEHICLE CHECK
    // =========================

    const vehicleId = booking_data.vehicle_id;

    if (!vehicleId) {
      throw new Error('vehicle_id required');
    }

    const { data: vehicle, error: vErr } = await supabaseAdmin
      .from('vehicles')
      .select('tenant_id,status')
      .eq('id', vehicleId)
      .single();

    if (vErr) {
      console.log('VEHICLE ERROR =', vErr);
      throw new Error(vErr.message);
    }

    if (!vehicle) throw new Error('vehicle not found');

    if (vehicle.status !== 'active') {
      throw new Error('vehicle inactive');
    }

    if (vehicle.tenant_id !== tenantId) {
      throw new Error('vehicle tenant mismatch');
    }

    // =========================
    // TENANT
    // =========================

    const { data: tenant, error: tErr } = await supabaseAdmin
      .from('tenants')
      .select('stripe_account_id, platform_fee_rate')
      .eq('id', tenantId)
      .single();

    if (tErr) {
      console.log('TENANT ERROR =', tErr);
      throw new Error(tErr.message);
    }

    if (!tenant) throw new Error('tenant not found');

    if (!tenant.stripe_account_id) {
      throw new Error('stripe not connected');
    }

    const account = await stripe.accounts.retrieve(tenant.stripe_account_id);

    if (!account.charges_enabled) {
      throw new Error('stripe not ready');
    }

    // =========================
    // STRIPE SESSION
    // =========================

    const amountInCents = Math.round(safeTotal * 100);

    const feeRate = tenant.platform_fee_rate ?? 0;

    const feeInCents = Math.round((feeRate / 100) * amountInCents);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',

      customer_email: customer.email,

      metadata: {
        tenant_id: tenantId,
        booking_type: booking_data.type,
        pickup_address: booking_data.pickup_address,
        dropoff_address: booking_data.dropoff_address,
        pickup_time: booking_data.pickup_time,
        vehicle_id: booking_data.vehicle_id,
        total_amount: safeTotal,
        customer_id: customer.id,
      },

      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Course VTC',
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],

      payment_intent_data: {
        application_fee_amount: feeInCents > 0 ? feeInCents : undefined,

        transfer_data: {
          destination: tenant.stripe_account_id,
        },

        on_behalf_of: tenant.stripe_account_id,
      },

      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/transfert`,
    });

    await supabaseAdmin.from('stripe_events').insert({
      session_id: session.id,
      status: 'checkout_created',
      tenant_id: tenantId,
      booking_type: booking_data.type,
      amount: safeTotal,
      metadata: {
        customer_id: customer.id,
        vehicle_id: booking_data.vehicle_id,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.log('FINAL ERROR =', err);
    const error = err instanceof Error ? err.message : String(err);

    return new Response(JSON.stringify({ error }), {
      headers: corsHeaders,
      status: 400,
    });
  }
});
