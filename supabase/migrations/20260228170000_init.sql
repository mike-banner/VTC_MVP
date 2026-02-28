drop extension if exists "pg_net";

create type "public"."platform_role" as enum ('super_admin', 'platform_staff');

create type "public"."tenant_role" as enum ('owner', 'manager', 'driver');

drop policy "commissions_select" on "public"."commissions";

revoke delete on table "public"."commissions" from "anon";

revoke insert on table "public"."commissions" from "anon";

revoke references on table "public"."commissions" from "anon";

revoke select on table "public"."commissions" from "anon";

revoke trigger on table "public"."commissions" from "anon";

revoke truncate on table "public"."commissions" from "anon";

revoke update on table "public"."commissions" from "anon";

revoke delete on table "public"."commissions" from "authenticated";

revoke insert on table "public"."commissions" from "authenticated";

revoke references on table "public"."commissions" from "authenticated";

revoke select on table "public"."commissions" from "authenticated";

revoke trigger on table "public"."commissions" from "authenticated";

revoke truncate on table "public"."commissions" from "authenticated";

revoke update on table "public"."commissions" from "authenticated";

revoke delete on table "public"."commissions" from "service_role";

revoke insert on table "public"."commissions" from "service_role";

revoke references on table "public"."commissions" from "service_role";

revoke select on table "public"."commissions" from "service_role";

revoke trigger on table "public"."commissions" from "service_role";

revoke truncate on table "public"."commissions" from "service_role";

revoke update on table "public"."commissions" from "service_role";

alter table "public"."commissions" drop constraint "commissions_booking_id_fkey";

alter table "public"."commissions" drop constraint "commissions_pkey";

drop index if exists "public"."commissions_pkey";

drop table "public"."commissions";

alter table "public"."booking_shares" alter column "status" drop default;

alter table "public"."bookings" alter column "status" drop default;

alter type "public"."booking_status" rename to "booking_status__old_version_to_be_dropped";

create type "public"."booking_status" as enum ('pending', 'accepted', 'completed', 'cancelled', 'accepted_pending_payment', 'paid', 'refunded');


  create table "public"."booking_commissions" (
    "id" uuid not null default gen_random_uuid(),
    "booking_id" uuid not null,
    "beneficiary_tenant_id" uuid,
    "commission_type" text not null,
    "commission_rate_snapshot" numeric not null,
    "commission_amount" numeric not null,
    "created_at" timestamp with time zone default now()
      );



  create table "public"."customers" (
    "id" uuid not null default gen_random_uuid(),
    "tenant_id" uuid not null,
    "email" text not null,
    "first_name" text,
    "last_name" text,
    "phone" text,
    "created_at" timestamp with time zone default now()
      );



  create table "public"."refunds" (
    "id" uuid not null default gen_random_uuid(),
    "booking_id" uuid,
    "stripe_refund_id" text,
    "payment_intent_id" text,
    "amount" numeric,
    "reason" text,
    "requested_by_tenant_id" uuid,
    "created_at" timestamp with time zone default now()
      );



  create table "public"."stripe_events" (
    "id" uuid not null default gen_random_uuid(),
    "stripe_event_id" text not null,
    "event_type" text not null,
    "received_at" timestamp with time zone default now()
      );


alter table "public"."booking_shares" alter column status type "public"."share_status" using status::text::"public"."share_status";

alter table "public"."bookings" alter column status type "public"."booking_status" using status::text::"public"."booking_status";

alter table "public"."booking_shares" alter column "status" set default 'pending'::public.share_status;

alter table "public"."bookings" alter column "status" set default 'pending'::public.booking_status;

drop type "public"."booking_status__old_version_to_be_dropped";

alter table "public"."booking_shares" alter column "status" set not null;

alter table "public"."bookings" add column "client_email" text;

alter table "public"."bookings" add column "customer_id" uuid;

alter table "public"."bookings" add column "distance_km" numeric;

alter table "public"."bookings" add column "driver_id" uuid;

alter table "public"."bookings" add column "stripe_payment_intent_id" text;

alter table "public"."bookings" add column "subtotal_amount" numeric not null;

alter table "public"."bookings" add column "vat_amount" numeric not null default 0;

alter table "public"."bookings" alter column "created_at" set not null;

alter table "public"."bookings" alter column "status" set not null;

alter table "public"."drivers" add column "user_id" uuid;

alter table "public"."onboarding" add column "default_base_price" numeric not null;

alter table "public"."onboarding" add column "default_minimum_fare" numeric not null;

alter table "public"."onboarding" add column "default_price_per_km" numeric not null;

alter table "public"."onboarding" add column "service_categories" text[] not null;

alter table "public"."onboarding" add column "vtc_license_number" text not null;

alter table "public"."onboarding" enable row level security;

alter table "public"."pricing_rules" drop column "service_type";

alter table "public"."pricing_rules" add column "service_category" character varying not null;

alter table "public"."profiles" drop column "role";

alter table "public"."profiles" add column "first_name" text;

alter table "public"."profiles" add column "last_name" text;

alter table "public"."profiles" add column "platform_role" public.platform_role;

alter table "public"."profiles" add column "tenant_role" public.tenant_role;

alter table "public"."tenants" add column "platform_fee_rate" numeric default 0;

alter table "public"."tenants" add column "share_fee_rate" numeric default 0;

alter table "public"."tenants" add column "vat_rate" numeric default 0;

alter table "public"."tenants" enable row level security;

drop type "public"."user_role";

CREATE UNIQUE INDEX booking_commissions_pkey ON public.booking_commissions USING btree (id);

CREATE UNIQUE INDEX circle_memberships_one_circle_per_tenant ON public.circle_memberships USING btree (tenant_id);

CREATE UNIQUE INDEX customers_pkey ON public.customers USING btree (id);

CREATE UNIQUE INDEX customers_unique_email_per_tenant ON public.customers USING btree (tenant_id, email);

CREATE UNIQUE INDEX drivers_user_id_key ON public.drivers USING btree (user_id);

CREATE INDEX idx_booking_commissions_beneficiary ON public.booking_commissions USING btree (beneficiary_tenant_id);

CREATE INDEX idx_booking_commissions_booking ON public.booking_commissions USING btree (booking_id);

CREATE INDEX idx_booking_shares_booking ON public.booking_shares USING btree (booking_id);

CREATE UNIQUE INDEX idx_booking_shares_one_accept ON public.booking_shares USING btree (booking_id) WHERE (status = 'accepted'::public.share_status);

CREATE INDEX idx_bookings_driver ON public.bookings USING btree (driver_id);

CREATE INDEX idx_bookings_status ON public.bookings USING btree (status);

CREATE INDEX idx_circle_memberships_tenant ON public.circle_memberships USING btree (tenant_id);

CREATE UNIQUE INDEX idx_unique_commission_type_per_booking ON public.booking_commissions USING btree (booking_id, commission_type);

CREATE UNIQUE INDEX refunds_pkey ON public.refunds USING btree (id);

CREATE UNIQUE INDEX stripe_events_pkey ON public.stripe_events USING btree (id);

CREATE UNIQUE INDEX stripe_events_stripe_event_id_key ON public.stripe_events USING btree (stripe_event_id);

alter table "public"."booking_commissions" add constraint "booking_commissions_pkey" PRIMARY KEY using index "booking_commissions_pkey";

alter table "public"."customers" add constraint "customers_pkey" PRIMARY KEY using index "customers_pkey";

alter table "public"."refunds" add constraint "refunds_pkey" PRIMARY KEY using index "refunds_pkey";

alter table "public"."stripe_events" add constraint "stripe_events_pkey" PRIMARY KEY using index "stripe_events_pkey";

alter table "public"."booking_commissions" add constraint "booking_commissions_beneficiary_tenant_id_fkey" FOREIGN KEY (beneficiary_tenant_id) REFERENCES public.tenants(id) not valid;

alter table "public"."booking_commissions" validate constraint "booking_commissions_beneficiary_tenant_id_fkey";

alter table "public"."booking_commissions" add constraint "booking_commissions_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE CASCADE not valid;

alter table "public"."booking_commissions" validate constraint "booking_commissions_booking_id_fkey";

alter table "public"."bookings" add constraint "bookings_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES public.customers(id) not valid;

alter table "public"."bookings" validate constraint "bookings_customer_id_fkey";

alter table "public"."bookings" add constraint "bookings_driver_id_fkey" FOREIGN KEY (driver_id) REFERENCES public.drivers(id) ON DELETE SET NULL not valid;

alter table "public"."bookings" validate constraint "bookings_driver_id_fkey";

alter table "public"."circle_memberships" add constraint "circle_memberships_one_circle_per_tenant" UNIQUE using index "circle_memberships_one_circle_per_tenant";

alter table "public"."customers" add constraint "customers_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON DELETE CASCADE not valid;

alter table "public"."customers" validate constraint "customers_tenant_id_fkey";

alter table "public"."drivers" add constraint "drivers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."drivers" validate constraint "drivers_user_id_fkey";

alter table "public"."drivers" add constraint "drivers_user_id_key" UNIQUE using index "drivers_user_id_key";

alter table "public"."refunds" add constraint "refunds_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES public.bookings(id) not valid;

alter table "public"."refunds" validate constraint "refunds_booking_id_fkey";

alter table "public"."stripe_events" add constraint "stripe_events_stripe_event_id_key" UNIQUE using index "stripe_events_stripe_event_id_key";

set check_function_bodies = off;

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

  -- 2️⃣ Créer le tenant
  insert into tenants (id, name, primary_domain)
  select
    new_tenant_id,
    company_name,
    primary_domain
  from onboarding
  where id = onboarding_uuid;

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

CREATE OR REPLACE FUNCTION public.protect_booking_immutable_fields()
 RETURNS trigger
 LANGUAGE plpgsql
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

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.profiles (
    id,
    created_at
  )
  values (
    new.id,
    now()
  );
  return new;
end;
$function$
;

grant delete on table "public"."booking_commissions" to "anon";

grant insert on table "public"."booking_commissions" to "anon";

grant references on table "public"."booking_commissions" to "anon";

grant select on table "public"."booking_commissions" to "anon";

grant trigger on table "public"."booking_commissions" to "anon";

grant truncate on table "public"."booking_commissions" to "anon";

grant update on table "public"."booking_commissions" to "anon";

grant delete on table "public"."booking_commissions" to "authenticated";

grant insert on table "public"."booking_commissions" to "authenticated";

grant references on table "public"."booking_commissions" to "authenticated";

grant select on table "public"."booking_commissions" to "authenticated";

grant trigger on table "public"."booking_commissions" to "authenticated";

grant truncate on table "public"."booking_commissions" to "authenticated";

grant update on table "public"."booking_commissions" to "authenticated";

grant delete on table "public"."booking_commissions" to "service_role";

grant insert on table "public"."booking_commissions" to "service_role";

grant references on table "public"."booking_commissions" to "service_role";

grant select on table "public"."booking_commissions" to "service_role";

grant trigger on table "public"."booking_commissions" to "service_role";

grant truncate on table "public"."booking_commissions" to "service_role";

grant update on table "public"."booking_commissions" to "service_role";

grant delete on table "public"."customers" to "anon";

grant insert on table "public"."customers" to "anon";

grant references on table "public"."customers" to "anon";

grant select on table "public"."customers" to "anon";

grant trigger on table "public"."customers" to "anon";

grant truncate on table "public"."customers" to "anon";

grant update on table "public"."customers" to "anon";

grant delete on table "public"."customers" to "authenticated";

grant insert on table "public"."customers" to "authenticated";

grant references on table "public"."customers" to "authenticated";

grant select on table "public"."customers" to "authenticated";

grant trigger on table "public"."customers" to "authenticated";

grant truncate on table "public"."customers" to "authenticated";

grant update on table "public"."customers" to "authenticated";

grant delete on table "public"."customers" to "service_role";

grant insert on table "public"."customers" to "service_role";

grant references on table "public"."customers" to "service_role";

grant select on table "public"."customers" to "service_role";

grant trigger on table "public"."customers" to "service_role";

grant truncate on table "public"."customers" to "service_role";

grant update on table "public"."customers" to "service_role";

grant delete on table "public"."refunds" to "anon";

grant insert on table "public"."refunds" to "anon";

grant references on table "public"."refunds" to "anon";

grant select on table "public"."refunds" to "anon";

grant trigger on table "public"."refunds" to "anon";

grant truncate on table "public"."refunds" to "anon";

grant update on table "public"."refunds" to "anon";

grant delete on table "public"."refunds" to "authenticated";

grant insert on table "public"."refunds" to "authenticated";

grant references on table "public"."refunds" to "authenticated";

grant select on table "public"."refunds" to "authenticated";

grant trigger on table "public"."refunds" to "authenticated";

grant truncate on table "public"."refunds" to "authenticated";

grant update on table "public"."refunds" to "authenticated";

grant delete on table "public"."refunds" to "service_role";

grant insert on table "public"."refunds" to "service_role";

grant references on table "public"."refunds" to "service_role";

grant select on table "public"."refunds" to "service_role";

grant trigger on table "public"."refunds" to "service_role";

grant truncate on table "public"."refunds" to "service_role";

grant update on table "public"."refunds" to "service_role";

grant delete on table "public"."stripe_events" to "anon";

grant insert on table "public"."stripe_events" to "anon";

grant references on table "public"."stripe_events" to "anon";

grant select on table "public"."stripe_events" to "anon";

grant trigger on table "public"."stripe_events" to "anon";

grant truncate on table "public"."stripe_events" to "anon";

grant update on table "public"."stripe_events" to "anon";

grant delete on table "public"."stripe_events" to "authenticated";

grant insert on table "public"."stripe_events" to "authenticated";

grant references on table "public"."stripe_events" to "authenticated";

grant select on table "public"."stripe_events" to "authenticated";

grant trigger on table "public"."stripe_events" to "authenticated";

grant truncate on table "public"."stripe_events" to "authenticated";

grant update on table "public"."stripe_events" to "authenticated";

grant delete on table "public"."stripe_events" to "service_role";

grant insert on table "public"."stripe_events" to "service_role";

grant references on table "public"."stripe_events" to "service_role";

grant select on table "public"."stripe_events" to "service_role";

grant trigger on table "public"."stripe_events" to "service_role";

grant truncate on table "public"."stripe_events" to "service_role";

grant update on table "public"."stripe_events" to "service_role";


  create policy "drivers_isolation"
  on "public"."drivers"
  as permissive
  for all
  to public
using ((tenant_id = ( SELECT profiles.tenant_id
   FROM public.profiles
  WHERE (profiles.id = auth.uid()))));



  create policy "onboarding_insert_own"
  on "public"."onboarding"
  as permissive
  for insert
  to public
with check ((profile_id = auth.uid()));



  create policy "onboarding_select_own"
  on "public"."onboarding"
  as permissive
  for select
  to public
using ((profile_id = auth.uid()));



  create policy "onboarding_select_platform"
  on "public"."onboarding"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.platform_role IS NOT NULL)))));



  create policy "pricing_isolation"
  on "public"."pricing_rules"
  as permissive
  for all
  to public
using ((tenant_id = ( SELECT profiles.tenant_id
   FROM public.profiles
  WHERE (profiles.id = auth.uid()))));



  create policy "Allow profile insert on signup"
  on "public"."profiles"
  as permissive
  for insert
  to public
with check (true);



  create policy "profiles_update_own"
  on "public"."profiles"
  as permissive
  for update
  to public
using ((id = auth.uid()));



  create policy "tenants_select_own"
  on "public"."tenants"
  as permissive
  for select
  to public
using ((id = ( SELECT profiles.tenant_id
   FROM public.profiles
  WHERE (profiles.id = auth.uid()))));



  create policy "vehicles_isolation"
  on "public"."vehicles"
  as permissive
  for all
  to public
using ((tenant_id = ( SELECT profiles.tenant_id
   FROM public.profiles
  WHERE (profiles.id = auth.uid()))));


CREATE TRIGGER trg_protect_booking_fields BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.protect_booking_immutable_fields();


