create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    tenant_id,
    role,
    created_at,
    updated_at
  )
  values (
    new.id,
    null,
    'owner',
    now(),
    now()
  );
  return new;
end;
$$;
