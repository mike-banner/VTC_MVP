-- =========================
-- EXTENSIONS
-- =========================


-- =========================
-- ENUMS
-- =========================

create type public.user_role as enum (
  'owner',
  'admin',
  'dispatcher'
);

create type public.booking_status as enum (
  'pending',
  'accepted',
  'completed',
  'cancelled'
);

create type public.share_status as enum (
  'pending',
  'accepted',
  'rejected'
);

create type public.payment_mode as enum (
  'card',
  'cash'
);

-- =========================
-- TENANTS
-- =========================

create table public.tenants (
  id uuid primary key default gen_random_uuid()
,
  name text not null,
  primary_domain text unique not null,
  stripe_account_id text,
  commission_rate numeric(5,2) default 0,
  created_at timestamp with time zone default now()
);

-- =========================
-- PROFILES (linked to auth.users)
-- =========================

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  role public.user_role not null,
  created_at timestamp with time zone default now()
);

-- =========================
-- DRIVERS
-- =========================

create table public.drivers (
  id uuid primary key default gen_random_uuid()
,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  phone text,
  license_number text,
  created_at timestamp with time zone default now()
);

create index idx_drivers_tenant on public.drivers(tenant_id);

-- =========================
-- VEHICLES
-- =========================

create table public.vehicles (
  id uuid primary key default gen_random_uuid()
,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  driver_id uuid references public.drivers(id) on delete set null,
  brand text not null,
  model text not null,
  plate_number text not null,
  category text,
  created_at timestamp with time zone default now()
);

create index idx_vehicles_tenant on public.vehicles(tenant_id);

-- =========================
-- PRICING RULES
-- =========================

create table public.pricing_rules (
  id uuid primary key default gen_random_uuid()
,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  service_type text not null,
  base_price numeric(10,2) not null,
  price_per_km numeric(10,2) not null,
  minimum_fare numeric(10,2) not null,
  active boolean default true,
  created_at timestamp with time zone default now()
);

create index idx_pricing_tenant on public.pricing_rules(tenant_id);

-- =========================
-- BOOKINGS
-- =========================

create table public.bookings (
  id uuid primary key default gen_random_uuid()
,
  original_tenant_id uuid not null references public.tenants(id),
  current_tenant_id uuid not null references public.tenants(id),
  client_name text not null,
  pickup_address text not null,
  dropoff_address text not null,
  pickup_time timestamp with time zone not null,
  total_amount numeric(10,2) not null,
  status public.booking_status default 'pending',
  payment_mode public.payment_mode not null,
  created_at timestamp with time zone default now()
);

create index idx_bookings_original_tenant on public.bookings(original_tenant_id);
create index idx_bookings_current_tenant on public.bookings(current_tenant_id);

-- =========================
-- CIRCLES
-- =========================

create table public.circles (
  id uuid primary key default gen_random_uuid()
,
  name text not null,
  created_by_tenant_id uuid not null references public.tenants(id),
  created_at timestamp with time zone default now()
);

-- =========================
-- CIRCLE MEMBERSHIPS
-- =========================

create table public.circle_memberships (
  id uuid primary key default gen_random_uuid()
,
  circle_id uuid not null references public.circles(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  role text not null,
  status text not null,
  joined_at timestamp with time zone default now()
);

-- =========================
-- BOOKING SHARES
-- =========================

create table public.booking_shares (
  id uuid primary key default gen_random_uuid()
,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  shared_by_tenant_id uuid not null references public.tenants(id),
  accepted_by_tenant_id uuid references public.tenants(id),
  status public.share_status default 'pending',
  shared_at timestamp with time zone default now(),
  accepted_at timestamp with time zone
);

-- =========================
-- COMMISSIONS
-- =========================

create table public.commissions (
  id uuid primary key default gen_random_uuid()
,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  gross_amount numeric(10,2) not null,
  commission_rate numeric(5,2) not null,
  commission_amount numeric(10,2) not null,
  created_at timestamp with time zone default now()
);
