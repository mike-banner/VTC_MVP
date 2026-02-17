-- =========================
-- ENABLE RLS
-- =========================

alter table public.profiles enable row level security;
alter table public.drivers enable row level security;
alter table public.vehicles enable row level security;
alter table public.pricing_rules enable row level security;
alter table public.bookings enable row level security;
alter table public.circles enable row level security;
alter table public.circle_memberships enable row level security;
alter table public.booking_shares enable row level security;
alter table public.commissions enable row level security;

-- =========================
-- HELPER FUNCTION
-- =========================

create or replace function public.current_tenant_id()
returns uuid
language sql
stable
as $$
  select tenant_id
  from public.profiles
  where id = auth.uid()
$$;

-- =========================
-- PROFILES
-- =========================

create policy "profiles_select_own"
on public.profiles
for select
using (id = auth.uid());

-- =========================
-- GENERIC TENANT ISOLATION
-- =========================

-- DRIVERS
create policy "drivers_tenant_isolation"
on public.drivers
for all
using (tenant_id = public.current_tenant_id())
with check (tenant_id = public.current_tenant_id());

-- VEHICLES
create policy "vehicles_tenant_isolation"
on public.vehicles
for all
using (tenant_id = public.current_tenant_id())
with check (tenant_id = public.current_tenant_id());

-- PRICING RULES
create policy "pricing_tenant_isolation"
on public.pricing_rules
for all
using (tenant_id = public.current_tenant_id())
with check (tenant_id = public.current_tenant_id());

-- BOOKINGS
create policy "bookings_select_isolation"
on public.bookings
for select
using (
  original_tenant_id = public.current_tenant_id()
  or current_tenant_id = public.current_tenant_id()
);

create policy "bookings_insert_isolation"
on public.bookings
for insert
with check (
  original_tenant_id = public.current_tenant_id()
);

create policy "bookings_update_isolation"
on public.bookings
for update
using (
  original_tenant_id = public.current_tenant_id()
  or current_tenant_id = public.current_tenant_id()
)
with check (
  original_tenant_id = public.current_tenant_id()
  or current_tenant_id = public.current_tenant_id()
);

-- CIRCLES
create policy "circles_tenant_isolation"
on public.circles
for all
using (created_by_tenant_id = public.current_tenant_id())
with check (created_by_tenant_id = public.current_tenant_id());

-- CIRCLE MEMBERSHIPS
create policy "circle_memberships_tenant_isolation"
on public.circle_memberships
for all
using (tenant_id = public.current_tenant_id())
with check (tenant_id = public.current_tenant_id());

-- BOOKING SHARES
create policy "booking_shares_select"
on public.booking_shares
for select
using (
  shared_by_tenant_id = public.current_tenant_id()
  or accepted_by_tenant_id = public.current_tenant_id()
);

-- COMMISSIONS
create policy "commissions_select"
on public.commissions
for select
using (
  exists (
    select 1
    from public.bookings b
    where b.id = booking_id
    and (
      b.original_tenant_id = public.current_tenant_id()
      or b.current_tenant_id = public.current_tenant_id()
    )
  )
);
