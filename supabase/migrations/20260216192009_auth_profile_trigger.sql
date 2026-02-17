-- =========================
-- FUNCTION: HANDLE NEW USER
-- =========================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, tenant_id, role)
  values (
    new.id,
    null,
    'owner'
  );
  return new;
end;
$$;

-- =========================
-- TRIGGER ON AUTH.USERS
-- =========================

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();
