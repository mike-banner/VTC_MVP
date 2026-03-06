-- ============================================================
-- TENANT ACCOUNT DEACTIVATION (BASIC VERSION)
-- ============================================================

create or replace function public.delete_tenant_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_tenant uuid;
begin

  -- récupérer tenant de l'utilisateur
  select tenant_id
  into v_tenant
  from profiles
  where id = v_user;

  if v_tenant is null then
    raise exception 'Tenant not found';
  end if;

  -- désactiver tenant
  update tenants
  set
    deleted_at = now(),
    name = 'deleted_tenant_' || v_tenant,
    primary_domain = null
  where id = v_tenant;

  -- anonymiser profil
  update profiles
  set
    deleted_at = now(),
    first_name = 'deleted',
    last_name = 'user'
  where id = v_user;

  -- bloquer login
  update auth.users
  set banned_until = now() + interval '100 years'
  where id = v_user;

end;
$$;


alter table tenants
add column if not exists deleted_at timestamptz;

alter table profiles
add column if not exists deleted_at timestamptz;
