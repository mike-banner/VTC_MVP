-- ============================================================
-- CUSTOMERS + PASSENGERS NORMALIZED ARCHITECTURE
-- ============================================================

-- ============================================================
-- 1️⃣ CUSTOMER TYPE ENUM
-- ============================================================

create type public.customer_type_enum as enum (
  'individual',
  'company'
);

-- ============================================================
-- 2️⃣ EXTEND CUSTOMERS TABLE (LEGAL ENTITY)
-- ============================================================

alter table public.customers
add column if not exists type public.customer_type_enum default 'individual' not null,
add column if not exists company_name text,
add column if not exists vat_number text,
add column if not exists billing_address text,
add column if not exists city text,
add column if not exists country text,
add column if not exists postal_code text;

-- ============================================================
-- 3️⃣ BOOKING PASSENGER COUNT
-- ============================================================

alter table public.bookings
add column if not exists passenger_count integer default 1 not null;

-- ============================================================
-- 4️⃣ PASSENGERS TABLE (WHO ACTUALLY TRAVELS)
-- ============================================================

create table if not exists public.passengers (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  phone text,
  created_at timestamptz default now() not null
);

create index if not exists idx_passengers_booking
on public.passengers(booking_id);

-- ============================================================
-- 5️⃣ RLS FOR PASSENGERS
-- ============================================================

alter table public.passengers enable row level security;

create policy passengers_tenant_isolation
on public.passengers
using (
  exists (
    select 1
    from public.bookings b
    where b.id = passengers.booking_id
    and (
      b.original_tenant_id = public.current_tenant_id()
      or
      b.current_tenant_id = public.current_tenant_id()
    )
  )
)
with check (
  exists (
    select 1
    from public.bookings b
    where b.id = passengers.booking_id
    and (
      b.original_tenant_id = public.current_tenant_id()
      or
      b.current_tenant_id = public.current_tenant_id()
    )
  )
);

-- ============================================================
-- 6️⃣ ADMIN GLOBAL READ FOR PASSENGERS
-- ============================================================

create policy passengers_platform_admin_read
on public.passengers
for select
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid()
    and platform_role in ('super_admin','platform_staff')
  )
);
