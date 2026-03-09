drop view if exists "public"."user_emails";

alter table "public"."profiles" add column "is_verified" boolean default false;

alter table "public"."profiles" add constraint "profiles_role_required" CHECK (((platform_role IS NOT NULL) OR (tenant_role IS NOT NULL))) not valid;

alter table "public"."profiles" validate constraint "profiles_role_required";

alter table "public"."profiles" add constraint "profiles_single_role_type" CHECK ((NOT ((platform_role IS NOT NULL) AND (tenant_role IS NOT NULL)))) not valid;

alter table "public"."profiles" validate constraint "profiles_single_role_type";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_driver_verification_email()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- Déclenchement uniquement si is_verified passe à TRUE
  IF (OLD.is_verified = false AND NEW.is_verified = true) THEN
    PERFORM
      net.http_post(
        url := 'https://[TON_PROJECT_REF].supabase.co/functions/v1/send-email',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || '[TON_ANON_KEY_OU_SERVICE_ROLE]'
        ),
        body := jsonb_build_object(
          'to', NEW.email,
          'subject', 'Validation de votre compte Chauffeur 🚗',
          'html', '<html><body><h1>Félicitations ' || NEW.full_name || ' !</h1><p>Votre profil a été validé par notre équipe.</p></body></html>'
        )
      );
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.approve_onboarding_tx(onboarding_uuid uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  new_tenant_id uuid := gen_random_uuid();
begin

  -- 1️⃣ Vérifier que le dossier existe et est pending
  if not exists (
    select 1 from onboarding
    where id = onboarding_uuid
      and status = 'pending'
  ) then
    raise exception 'Onboarding not found or already processed';
  end if;

  -- 2️⃣ Créer le tenant avec email (auth.users) + phone (onboarding)
  insert into tenants (
    id,
    name,
    primary_domain,
    email,
    phone
  )
  select
    new_tenant_id,
    o.company_name,
    o.primary_domain,
    u.email,
    o.phone
  from onboarding o
  join profiles p on p.id = o.profile_id
  join auth.users u on u.id = p.id
  where o.id = onboarding_uuid;

  -- 3️⃣ Mettre à jour le profile
  update profiles p
  set
    tenant_id = new_tenant_id,
    tenant_role = 'owner',
    first_name = o.first_name,
    last_name = o.last_name
  from onboarding o
  where o.id = onboarding_uuid
    and p.id = o.profile_id;

  -- 4️⃣ Marquer onboarding validé
  update onboarding
  set
    status = 'approved',
    validated_at = now()
  where id = onboarding_uuid;

end;
$function$
;

CREATE OR REPLACE FUNCTION public.compute_booking_balance(p_booking_id uuid)
 RETURNS numeric
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
declare
  total numeric;
begin
  select coalesce(sum(
    case
      when movement_type = 'payment' then net_amount
      when movement_type = 'refund' then -net_amount
      else 0
    end
  ),0)
  into total
  from financial_movements
  where booking_id = p_booking_id;

  return total;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_tenant_account()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_user uuid := auth.uid();
  v_tenant uuid;
begin

  -- vérifier que l'utilisateur est owner
  if not exists (
    select 1
    from profiles
    where id = v_user
    and tenant_role = 'owner'
  ) then
    raise exception 'Only tenant owner can delete account';
  end if;

  -- récupérer tenant
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
$function$
;

CREATE OR REPLACE FUNCTION public.expire_unpaid_bookings()
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
begin
  update bookings
  set status = 'expired_payment'
  where status = 'accepted_pending_payment'
    and created_at < now() - interval '15 minutes';
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin

insert into public.profiles (
  id,
  tenant_role,
  first_name,
  last_name,
  created_at
)
values (
  new.id,
  'pending',
  '',
  '',
  now()
);

return new;

end;
$function$
;

CREATE OR REPLACE FUNCTION public.initiate_refund(p_booking_id uuid, p_reason text)
 RETURNS TABLE(payment_intent_id text, refund_allowed boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_booking bookings%rowtype;
begin
  -- 🔒 Verrou ligne booking
  select *
  into v_booking
  from bookings
  where id = p_booking_id
  for update;

  if not found then
    raise exception 'Booking not found';
  end if;

  -- ✅ Autoriser retry si refund_failed
  if v_booking.status not in ('paid','refund_failed') then
    return query select null::text, false;
    return;
  end if;

  -- Passage immédiat en état verrouillé
  update bookings
  set status = 'cancelled_pending_refund',
      cancellation_reason = p_reason,
      cancelled_at = now()
  where id = p_booking_id;

  return query
  select v_booking.stripe_payment_intent_id, true;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.prevent_booking_delete()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
begin
  raise exception 'Bookings cannot be deleted';
end;
$function$
;

CREATE OR REPLACE FUNCTION public.prevent_pickup_time_change_after_paid()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
begin
  if old.status in ('paid','completed','no_show',
                    'cancelled_pending_refund','cancelled_refunded')
     and new.pickup_time <> old.pickup_time then
    raise exception 'Cannot modify pickup_time after payment';
  end if;

  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.protect_booking_immutable_fields()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  IF OLD.status <> 'pending' THEN
    IF NEW.total_amount <> OLD.total_amount
       OR NEW.pickup_address <> OLD.pickup_address
       OR NEW.dropoff_address <> OLD.dropoff_address
       OR NEW.pickup_time <> OLD.pickup_time
       OR NEW.payment_mode <> OLD.payment_mode THEN
         RAISE EXCEPTION 'Booking immutable after pending status';
    END IF;
  END IF;

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.validate_booking_status_transition()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
begin
  if new.status = old.status then
    return new;
  end if;

  if not exists (
    select 1
    from booking_status_transitions
    where from_status = old.status
      and to_status = new.status
  ) then
    raise exception 'Invalid booking status transition from % to %',
      old.status, new.status;
  end if;

  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.validate_ledger_consistency()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
declare
  booking_total numeric;
  ledger_total numeric;
begin
  select total_amount into booking_total
  from bookings
  where id = new.booking_id;

  ledger_total := compute_booking_balance(new.booking_id);

  if ledger_total > booking_total then
    raise exception 'Ledger exceeds booking total TTC';
  end if;

  return new;
end;
$function$
;

CREATE TRIGGER tr_driver_verified AFTER UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_driver_verification_email();


