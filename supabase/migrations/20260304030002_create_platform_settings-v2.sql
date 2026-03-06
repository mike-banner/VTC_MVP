-- ============================================================
-- PLATFORM GLOBAL SETTINGS
-- ============================================================

create table if not exists public.platform_settings (
  id uuid primary key default gen_random_uuid(),

  default_platform_commission_rate numeric(5,2) not null default 0,
  default_tenant_commission_rate numeric(5,2) not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Une seule ligne autorisée
create unique index if not exists platform_settings_single_row
on public.platform_settings ((true));

-- Insert ligne initiale si vide
insert into public.platform_settings (default_platform_commission_rate, default_tenant_commission_rate)
select 0, 0
where not exists (select 1 from public.platform_settings);

-- ============================================================
-- Auto update updated_at
-- ============================================================

create or replace function public.update_platform_settings_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_update_platform_settings on public.platform_settings;

create trigger trg_update_platform_settings
before update on public.platform_settings
for each row
execute function public.update_platform_settings_updated_at();

-- ============================================================
-- RLS
-- ============================================================

alter table public.platform_settings enable row level security;

-- Lecture admin uniquement (via service role)
create policy "platform_settings_read_admin"
on public.platform_settings
for select
using (true);

-- Update admin uniquement (via service role)
create policy "platform_settings_update_admin"
on public.platform_settings
for update
using (true);

grant select, update on public.platform_settings to authenticated, service_role;
