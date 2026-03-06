-- ============================================================
-- PLATFORM GLOBAL SETTINGS
-- ============================================================

create table if not exists public.platform_settings (
  id uuid primary key default gen_random_uuid(),

  default_platform_commission_rate numeric(5,2) not null default 0,
  default_tenant_commission_rate numeric(5,2) not null default 0,

  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- On garde UNE seule ligne
create unique index if not exists platform_settings_single_row
on public.platform_settings ((true));

-- Insert initial row si vide
insert into public.platform_settings (default_platform_commission_rate, default_tenant_commission_rate)
select 0, 0
where not exists (select 1 from public.platform_settings);

grant select, update on public.platform_settings to authenticated, service_role;
