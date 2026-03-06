drop extension if exists "pg_net";

alter table "public"."bookings" alter column "customer_id" set not null;

alter table "public"."customers" alter column "first_name" set not null;

CREATE INDEX idx_customers_tenant_email ON public.customers USING btree (tenant_id, email);

CREATE UNIQUE INDEX idx_unique_financial_payment ON public.financial_movements USING btree (stripe_payment_intent_id, movement_type, COALESCE(stripe_refund_id, 'no_refund'::text));

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.current_tenant_id()
 RETURNS uuid
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  select tenant_id
  from public.profiles
  where id = auth.uid()
$function$
;

CREATE OR REPLACE FUNCTION public.prevent_late_cancellation()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  if new.status is distinct from old.status then
    if new.status in ('cancelled_no_refund','cancelled_pending_refund')
       and old.pickup_time <= now() then
       raise exception 'Cannot cancel after pickup_time';
    end if;
  end if;

  return new;
end;
$function$
;

grant delete on table "public"."bookings" to "anon";

grant insert on table "public"."bookings" to "anon";

grant references on table "public"."bookings" to "anon";

grant select on table "public"."bookings" to "anon";

grant trigger on table "public"."bookings" to "anon";

grant truncate on table "public"."bookings" to "anon";

grant update on table "public"."bookings" to "anon";

grant delete on table "public"."bookings" to "authenticated";

grant references on table "public"."bookings" to "authenticated";

grant trigger on table "public"."bookings" to "authenticated";

grant truncate on table "public"."bookings" to "authenticated";

grant delete on table "public"."drivers" to "anon";

grant insert on table "public"."drivers" to "anon";

grant references on table "public"."drivers" to "anon";

grant select on table "public"."drivers" to "anon";

grant trigger on table "public"."drivers" to "anon";

grant truncate on table "public"."drivers" to "anon";

grant update on table "public"."drivers" to "anon";

grant insert on table "public"."financial_movements" to "anon";

grant references on table "public"."financial_movements" to "anon";

grant select on table "public"."financial_movements" to "anon";

grant trigger on table "public"."financial_movements" to "anon";

grant truncate on table "public"."financial_movements" to "anon";

grant insert on table "public"."financial_movements" to "authenticated";

grant references on table "public"."financial_movements" to "authenticated";

grant trigger on table "public"."financial_movements" to "authenticated";

grant truncate on table "public"."financial_movements" to "authenticated";

grant delete on table "public"."tenants" to "anon";

grant insert on table "public"."tenants" to "anon";

grant references on table "public"."tenants" to "anon";

grant select on table "public"."tenants" to "anon";

grant trigger on table "public"."tenants" to "anon";

grant truncate on table "public"."tenants" to "anon";

grant update on table "public"."tenants" to "anon";

grant delete on table "public"."tenants" to "authenticated";

grant insert on table "public"."tenants" to "authenticated";

grant references on table "public"."tenants" to "authenticated";

grant trigger on table "public"."tenants" to "authenticated";

grant truncate on table "public"."tenants" to "authenticated";

grant update on table "public"."tenants" to "authenticated";

grant delete on table "public"."vehicles" to "anon";

grant insert on table "public"."vehicles" to "anon";

grant references on table "public"."vehicles" to "anon";

grant select on table "public"."vehicles" to "anon";

grant trigger on table "public"."vehicles" to "anon";

grant truncate on table "public"."vehicles" to "anon";

grant update on table "public"."vehicles" to "anon";


  create policy "bookings_select"
  on "public"."bookings"
  as permissive
  for select
  to public
using ((current_tenant_id = ( SELECT profiles.tenant_id
   FROM public.profiles
  WHERE (profiles.id = auth.uid()))));


CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


