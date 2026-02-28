-- ==========================================
-- ENUMS
-- ==========================================

do $$
begin
  if not exists (select 1 from pg_type where typname = 'movement_type_enum') then
    create type movement_type_enum as enum (
      'payment',
      'commission',
      'refund',
      'commission_reversal'
    );
  end if;
end$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'movement_direction_enum') then
    create type movement_direction_enum as enum (
      'credit',
      'debit'
    );
  end if;
end$$;

-- ==========================================
-- TABLE
-- ==========================================

create table public.financial_movements (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid not null references public.bookings(id) on delete cascade,

  tenant_id uuid not null references public.tenants(id) on delete cascade,

  stripe_payment_intent_id text,
  stripe_refund_id text,

  movement_type movement_type_enum not null,
  direction movement_direction_enum not null,

  gross_amount numeric(12,2) not null,
  net_amount numeric(12,2) not null,

  created_at timestamp with time zone not null default now()
);

-- ==========================================
-- INDEXES
-- ==========================================

create index idx_financial_movements_booking_id
  on public.financial_movements(booking_id);

create index idx_financial_movements_tenant_id
  on public.financial_movements(tenant_id);

create index idx_financial_movements_payment_intent
  on public.financial_movements(stripe_payment_intent_id);

-- ==========================================
-- RLS
-- ==========================================

alter table public.financial_movements enable row level security;

create policy "Tenant can view own financial movements"
on public.financial_movements
for select
using (
  tenant_id = (
    select tenant_id
    from public.profiles
    where id = auth.uid()
  )
);

create policy "System insert only"
on public.financial_movements
for insert
with check (true);
