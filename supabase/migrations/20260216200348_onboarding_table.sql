-- =========================
-- ENUM: ONBOARDING STATUS
-- =========================

create type public.onboarding_status as enum (
  'pending',
  'approved',
  'rejected',
  'processed'
);

-- =========================
-- TABLE: ONBOARDING
-- =========================

create table public.onboarding (
  id uuid primary key default gen_random_uuid(),

  profile_id uuid not null
    references public.profiles(id)
    on delete cascade,

  status public.onboarding_status not null default 'pending',

  -- Tenant identity (public site)
  company_name text not null,
  primary_domain text not null,
  city text not null,
  phone text not null,

  -- Optional branding
  logo_url text,
  primary_color text,
  secondary_color text,

  -- Vehicle (minimal V1)
  brand text not null,
  model text not null,
  category text not null,
  capacity integer not null,

  -- Pricing (single service_type V1)
  base_price numeric(10,2) not null,
  price_per_km numeric(10,2) not null,
  minimum_fare numeric(10,2) not null,

  created_at timestamp with time zone default now(),
  validated_at timestamp with time zone
);

create index idx_onboarding_profile
on public.onboarding(profile_id);

-- =========================
-- ENABLE RLS
-- =========================
