


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."booking_status" AS ENUM (
    'pending',
    'accepted',
    'completed',
    'cancelled',
    'accepted_pending_payment',
    'paid',
    'deprecated_refunded',
    'cancelled_pending_refund',
    'cancelled_no_refund',
    'cancelled_refunded',
    'no_show',
    'expired_payment',
    'refund_failed'
);


ALTER TYPE "public"."booking_status" OWNER TO "postgres";


CREATE TYPE "public"."cancellation_reason_enum" AS ENUM (
    'client',
    'no_show',
    'driver_fault',
    'platform_issue'
);


ALTER TYPE "public"."cancellation_reason_enum" OWNER TO "postgres";


CREATE TYPE "public"."movement_direction_enum" AS ENUM (
    'credit',
    'debit'
);


ALTER TYPE "public"."movement_direction_enum" OWNER TO "postgres";


CREATE TYPE "public"."movement_type_enum" AS ENUM (
    'payment',
    'commission',
    'refund',
    'commission_reversal'
);


ALTER TYPE "public"."movement_type_enum" OWNER TO "postgres";


CREATE TYPE "public"."onboarding_status" AS ENUM (
    'pending',
    'approved',
    'rejected',
    'processed'
);


ALTER TYPE "public"."onboarding_status" OWNER TO "postgres";


CREATE TYPE "public"."payment_mode" AS ENUM (
    'card',
    'cash'
);


ALTER TYPE "public"."payment_mode" OWNER TO "postgres";


CREATE TYPE "public"."platform_role" AS ENUM (
    'super_admin',
    'platform_staff'
);


ALTER TYPE "public"."platform_role" OWNER TO "postgres";


CREATE TYPE "public"."share_status" AS ENUM (
    'pending',
    'accepted',
    'rejected'
);


ALTER TYPE "public"."share_status" OWNER TO "postgres";


CREATE TYPE "public"."tenant_role" AS ENUM (
    'owner',
    'manager',
    'driver',
    'pending'
);


ALTER TYPE "public"."tenant_role" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."approve_onboarding_tx"("onboarding_uuid" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
declare
  new_tenant_id uuid := gen_random_uuid();
  v_email text;
begin

  -- 1️⃣ Vérifier que le dossier existe et est pending
  if not exists (
    select 1 from onboarding
    where id = onboarding_uuid
    and status = 'pending'
  ) then
    raise exception 'Onboarding not found or already processed';
  end if;

  -- 2️⃣ Récupérer l'email depuis auth.users via onboarding.profile_id
  select u.email into v_email
  from auth.users u
  join onboarding o on o.profile_id = u.id
  where o.id = onboarding_uuid;

  -- 3️⃣ Créer le tenant avec email (de auth) et phone (de onboarding)
  insert into tenants (id, name, primary_domain, email, phone)
  select
    new_tenant_id,
    company_name,
    primary_domain,
    v_email,
    phone
  from onboarding
  where id = onboarding_uuid;

  -- 4️⃣ Mettre à jour le profile
  update profiles p
  set
    tenant_id = new_tenant_id,
    tenant_role = 'owner',
    first_name = o.first_name,
    last_name = o.last_name
  from onboarding o
  where o.id = onboarding_uuid
  and p.id = o.profile_id;

  -- 5️⃣ Marquer onboarding validé
  update onboarding
  set
    status = 'approved',
    validated_at = now()
  where id = onboarding_uuid;

end;
$$;


ALTER FUNCTION "public"."approve_onboarding_tx"("onboarding_uuid" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."compute_booking_balance"("p_booking_id" "uuid") RETURNS numeric
    LANGUAGE "plpgsql"
    AS $$
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
$$;


ALTER FUNCTION "public"."compute_booking_balance"("p_booking_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."current_tenant_id"() RETURNS "uuid"
    LANGUAGE "sql" STABLE
    AS $$
  select tenant_id
  from public.profiles
  where id = auth.uid()
$$;


ALTER FUNCTION "public"."current_tenant_id"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."expire_unpaid_bookings"() RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
begin
  update bookings
  set status = 'expired_payment'
  where status = 'accepted_pending_payment'
    and created_at < now() - interval '15 minutes';
end;
$$;


ALTER FUNCTION "public"."expire_unpaid_bookings"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
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
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."initiate_refund"("p_booking_id" "uuid", "p_reason" "text") RETURNS TABLE("payment_intent_id" "text", "refund_allowed" boolean)
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "public"."initiate_refund"("p_booking_id" "uuid", "p_reason" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."prevent_booking_delete"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  raise exception 'Bookings cannot be deleted';
end;
$$;


ALTER FUNCTION "public"."prevent_booking_delete"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."prevent_late_cancellation"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  if new.status in ('cancelled_no_refund','cancelled_pending_refund')
     and old.pickup_time <= now() then
    raise exception 'Cannot cancel after pickup_time';
  end if;

  return new;
end;
$$;


ALTER FUNCTION "public"."prevent_late_cancellation"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."prevent_pickup_time_change_after_paid"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  if old.status in ('paid','completed','no_show',
                    'cancelled_pending_refund','cancelled_refunded')
     and new.pickup_time <> old.pickup_time then
    raise exception 'Cannot modify pickup_time after payment';
  end if;

  return new;
end;
$$;


ALTER FUNCTION "public"."prevent_pickup_time_change_after_paid"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."prevent_policy_update"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  if old.cancellation_policy_id is not null
     and new.cancellation_policy_id <> old.cancellation_policy_id then
    raise exception 'cancellation_policy_id cannot be modified once set';
  end if;
  return new;
end;
$$;


ALTER FUNCTION "public"."prevent_policy_update"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."protect_booking_immutable_fields"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
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
$$;


ALTER FUNCTION "public"."protect_booking_immutable_fields"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."validate_booking_status_transition"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
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
$$;


ALTER FUNCTION "public"."validate_booking_status_transition"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."validate_ledger_consistency"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
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
$$;


ALTER FUNCTION "public"."validate_ledger_consistency"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."booking_shares" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "booking_id" "uuid" NOT NULL,
    "shared_by_tenant_id" "uuid" NOT NULL,
    "accepted_by_tenant_id" "uuid",
    "status" "public"."share_status" DEFAULT 'pending'::"public"."share_status" NOT NULL,
    "shared_at" timestamp with time zone DEFAULT "now"(),
    "accepted_at" timestamp with time zone
);


ALTER TABLE "public"."booking_shares" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."booking_status_transitions" (
    "from_status" "public"."booking_status" NOT NULL,
    "to_status" "public"."booking_status" NOT NULL
);


ALTER TABLE "public"."booking_status_transitions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."bookings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "original_tenant_id" "uuid" NOT NULL,
    "current_tenant_id" "uuid" NOT NULL,
    "client_name" "text" NOT NULL,
    "pickup_address" "text" NOT NULL,
    "dropoff_address" "text" NOT NULL,
    "pickup_time" timestamp with time zone NOT NULL,
    "total_amount" numeric(10,2) NOT NULL,
    "status" "public"."booking_status" DEFAULT 'pending'::"public"."booking_status" NOT NULL,
    "payment_mode" "public"."payment_mode" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "driver_id" "uuid",
    "distance_km" numeric,
    "subtotal_amount" numeric NOT NULL,
    "vat_amount" numeric DEFAULT 0 NOT NULL,
    "customer_id" "uuid",
    "client_email" "text",
    "stripe_payment_intent_id" "text",
    "cancellation_policy_id" "uuid",
    "cancellation_reason" "public"."cancellation_reason_enum",
    "cancelled_at" timestamp without time zone,
    "cancellation_initiator" character varying
);


ALTER TABLE "public"."bookings" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."bookings_stuck_pending_refund" AS
 SELECT "id",
    "original_tenant_id",
    "current_tenant_id",
    "client_name",
    "pickup_address",
    "dropoff_address",
    "pickup_time",
    "total_amount",
    "status",
    "payment_mode",
    "created_at",
    "driver_id",
    "distance_km",
    "subtotal_amount",
    "vat_amount",
    "customer_id",
    "client_email",
    "stripe_payment_intent_id",
    "cancellation_policy_id",
    "cancellation_reason",
    "cancelled_at",
    "cancellation_initiator"
   FROM "public"."bookings"
  WHERE (("status" = 'cancelled_pending_refund'::"public"."booking_status") AND ("cancelled_at" < ("now"() - '00:10:00'::interval)));


ALTER VIEW "public"."bookings_stuck_pending_refund" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."cancellation_policies" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tenant_id" "uuid",
    "version" integer NOT NULL,
    "hours_before_full_refund" integer NOT NULL,
    "hours_before_partial_refund" integer NOT NULL,
    "partial_refund_rate" numeric(5,4) NOT NULL,
    "no_show_refund_rate" numeric(5,4) NOT NULL,
    "driver_fault_refund_rate" numeric(5,4) NOT NULL,
    "platform_fee_non_refundable" boolean DEFAULT false NOT NULL,
    "active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."cancellation_policies" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."circle_memberships" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "circle_id" "uuid" NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "role" "text" NOT NULL,
    "status" "text" NOT NULL,
    "joined_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."circle_memberships" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."circles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "created_by_tenant_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."circles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."customers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "first_name" "text",
    "last_name" "text",
    "phone" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."customers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."drivers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "first_name" "text" NOT NULL,
    "last_name" "text" NOT NULL,
    "phone" "text" NOT NULL,
    "license_number" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid"
);


ALTER TABLE "public"."drivers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."financial_movements" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "booking_id" "uuid" NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "stripe_payment_intent_id" "text",
    "stripe_refund_id" "text",
    "movement_type" "public"."movement_type_enum" NOT NULL,
    "direction" "public"."movement_direction_enum" NOT NULL,
    "gross_amount" numeric(12,2) NOT NULL,
    "net_amount" numeric(12,2) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "vat_amount" numeric(12,2) DEFAULT 0,
    "created_by_event" "text",
    "refund_ratio" numeric(5,4),
    "platform_commission_rate_snapshot" numeric,
    "driver_commission_rate_snapshot" numeric,
    "platform_commission_amount" numeric,
    "driver_commission_amount" numeric,
    CONSTRAINT "chk_gross_positive" CHECK (("gross_amount" >= (0)::numeric)),
    CONSTRAINT "chk_net_positive" CHECK (("net_amount" >= (0)::numeric)),
    CONSTRAINT "chk_refund_ratio_valid" CHECK ((("refund_ratio" IS NULL) OR (("refund_ratio" >= (0)::numeric) AND ("refund_ratio" <= (1)::numeric)))),
    CONSTRAINT "chk_vat_positive" CHECK (("vat_amount" >= (0)::numeric))
);


ALTER TABLE "public"."financial_movements" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."finance_current_year_kpi" AS
 SELECT COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'payment'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE NULL::numeric
        END), (0)::numeric) AS "total_collected",
    COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'refund'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE NULL::numeric
        END), (0)::numeric) AS "total_refunded",
    (COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'payment'::"public"."movement_type_enum") THEN "net_amount"
            ELSE NULL::numeric
        END), (0)::numeric) - COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'refund'::"public"."movement_type_enum") THEN "net_amount"
            ELSE NULL::numeric
        END), (0)::numeric)) AS "net_revenue"
   FROM "public"."financial_movements"
  WHERE ("date_trunc"('year'::"text", "created_at") = "date_trunc"('year'::"text", "now"()));


ALTER VIEW "public"."finance_current_year_kpi" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."finance_global_kpi" AS
 SELECT COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'payment'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE NULL::numeric
        END), (0)::numeric) AS "total_collected",
    COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'refund'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE NULL::numeric
        END), (0)::numeric) AS "total_refunded",
    (COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'payment'::"public"."movement_type_enum") THEN "net_amount"
            ELSE NULL::numeric
        END), (0)::numeric) - COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'refund'::"public"."movement_type_enum") THEN "net_amount"
            ELSE NULL::numeric
        END), (0)::numeric)) AS "net_revenue",
    "count"(DISTINCT "booking_id") AS "total_bookings"
   FROM "public"."financial_movements";


ALTER VIEW "public"."finance_global_kpi" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."finance_monthly_summary" AS
 SELECT "date_trunc"('month'::"text", "created_at") AS "month",
    COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'payment'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE NULL::numeric
        END), (0)::numeric) AS "total_collected",
    COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'refund'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE NULL::numeric
        END), (0)::numeric) AS "total_refunded",
    (COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'payment'::"public"."movement_type_enum") THEN "net_amount"
            ELSE NULL::numeric
        END), (0)::numeric) - COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'refund'::"public"."movement_type_enum") THEN "net_amount"
            ELSE NULL::numeric
        END), (0)::numeric)) AS "net_revenue"
   FROM "public"."financial_movements"
  GROUP BY ("date_trunc"('month'::"text", "created_at"))
  ORDER BY ("date_trunc"('month'::"text", "created_at")) DESC;


ALTER VIEW "public"."finance_monthly_summary" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."finance_yearly_summary" AS
 SELECT "date_trunc"('year'::"text", "created_at") AS "year",
    COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'payment'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE NULL::numeric
        END), (0)::numeric) AS "total_collected",
    COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'refund'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE NULL::numeric
        END), (0)::numeric) AS "total_refunded",
    (COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'payment'::"public"."movement_type_enum") THEN "net_amount"
            ELSE NULL::numeric
        END), (0)::numeric) - COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'refund'::"public"."movement_type_enum") THEN "net_amount"
            ELSE NULL::numeric
        END), (0)::numeric)) AS "net_revenue"
   FROM "public"."financial_movements"
  GROUP BY ("date_trunc"('year'::"text", "created_at"))
  ORDER BY ("date_trunc"('year'::"text", "created_at")) DESC;


ALTER VIEW "public"."finance_yearly_summary" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."financial_fiscal_detail" AS
 SELECT "tenant_id",
    "booking_id",
    "movement_type",
    "direction",
    "net_amount" AS "amount_ht",
    "vat_amount",
    "gross_amount" AS "amount_ttc",
    "stripe_payment_intent_id",
    "stripe_refund_id",
    "created_at"
   FROM "public"."financial_movements"
  ORDER BY "created_at" DESC;


ALTER VIEW "public"."financial_fiscal_detail" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."financial_monthly_summary" AS
 SELECT "tenant_id",
    "date_trunc"('month'::"text", "created_at") AS "month",
    "sum"(
        CASE
            WHEN ("direction" = 'credit'::"public"."movement_direction_enum") THEN "net_amount"
            ELSE (- "net_amount")
        END) AS "net_ht",
    "sum"(
        CASE
            WHEN ("direction" = 'credit'::"public"."movement_direction_enum") THEN "vat_amount"
            ELSE (- "vat_amount")
        END) AS "total_vat",
    "sum"(
        CASE
            WHEN ("direction" = 'credit'::"public"."movement_direction_enum") THEN "gross_amount"
            ELSE (- "gross_amount")
        END) AS "net_ttc",
    "sum"(
        CASE
            WHEN ("movement_type" = 'payment'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE (0)::numeric
        END) AS "total_payments",
    "sum"(
        CASE
            WHEN ("movement_type" = 'refund'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE (0)::numeric
        END) AS "total_refunds",
    "sum"(
        CASE
            WHEN ("movement_type" = 'commission'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE (0)::numeric
        END) AS "total_commissions"
   FROM "public"."financial_movements"
  GROUP BY "tenant_id", ("date_trunc"('month'::"text", "created_at"));


ALTER VIEW "public"."financial_monthly_summary" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."financial_summary" AS
 SELECT "tenant_id",
    "sum"(
        CASE
            WHEN ("direction" = 'credit'::"public"."movement_direction_enum") THEN "gross_amount"
            ELSE (- "gross_amount")
        END) AS "net_total",
    "sum"(
        CASE
            WHEN ("movement_type" = 'payment'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE (0)::numeric
        END) AS "total_payments",
    "sum"(
        CASE
            WHEN ("movement_type" = 'refund'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE (0)::numeric
        END) AS "total_refunds",
    "sum"(
        CASE
            WHEN ("movement_type" = 'commission'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE (0)::numeric
        END) AS "total_commissions"
   FROM "public"."financial_movements"
  GROUP BY "tenant_id";


ALTER VIEW "public"."financial_summary" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."financial_yearly_summary" AS
 SELECT "tenant_id",
    "date_trunc"('year'::"text", "created_at") AS "year",
    "sum"(
        CASE
            WHEN ("direction" = 'credit'::"public"."movement_direction_enum") THEN "net_amount"
            ELSE (- "net_amount")
        END) AS "net_ht",
    "sum"(
        CASE
            WHEN ("direction" = 'credit'::"public"."movement_direction_enum") THEN "vat_amount"
            ELSE (- "vat_amount")
        END) AS "total_vat",
    "sum"(
        CASE
            WHEN ("direction" = 'credit'::"public"."movement_direction_enum") THEN "gross_amount"
            ELSE (- "gross_amount")
        END) AS "net_ttc"
   FROM "public"."financial_movements"
  GROUP BY "tenant_id", ("date_trunc"('year'::"text", "created_at"));


ALTER VIEW "public"."financial_yearly_summary" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."onboarding" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "status" "public"."onboarding_status" DEFAULT 'pending'::"public"."onboarding_status" NOT NULL,
    "company_name" "text" NOT NULL,
    "primary_domain" "text" NOT NULL,
    "phone" "text" NOT NULL,
    "capacity" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "validated_at" timestamp with time zone,
    "vtc_license_number" "text" NOT NULL,
    "service_categories" "text"[] NOT NULL,
    "default_base_price" numeric NOT NULL,
    "default_price_per_km" numeric NOT NULL,
    "default_minimum_fare" numeric NOT NULL,
    "vehicle_brand" "text",
    "vehicle_model" "text",
    "plate_number" "text",
    "first_name" "text" NOT NULL,
    "last_name" "text" NOT NULL
);


ALTER TABLE "public"."onboarding" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pricing_rules" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "base_price" numeric(10,2) NOT NULL,
    "price_per_km" numeric(10,2) NOT NULL,
    "minimum_fare" numeric(10,2) NOT NULL,
    "active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "service_category" character varying NOT NULL
);


ALTER TABLE "public"."pricing_rules" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "tenant_id" "uuid",
    "tenant_role" "public"."tenant_role",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "platform_role" "public"."platform_role",
    "first_name" "text",
    "last_name" "text"
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stripe_events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "stripe_event_id" "text" NOT NULL,
    "event_type" "text" NOT NULL,
    "received_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."stripe_events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stripe_webhook_logs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "stripe_event_id" "text" NOT NULL,
    "event_type" "text" NOT NULL,
    "payload" "jsonb" NOT NULL,
    "received_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "processed_at" timestamp with time zone,
    "status" "text" DEFAULT 'received'::"text" NOT NULL,
    "error_message" "text"
);


ALTER TABLE "public"."stripe_webhook_logs" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."stripe_webhook_errors" AS
 SELECT "id",
    "stripe_event_id",
    "event_type",
    "payload",
    "received_at",
    "processed_at",
    "status",
    "error_message"
   FROM "public"."stripe_webhook_logs"
  WHERE ("status" = 'error'::"text")
  ORDER BY "received_at" DESC;


ALTER VIEW "public"."stripe_webhook_errors" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."stripe_webhook_pending" AS
 SELECT "id",
    "stripe_event_id",
    "event_type",
    "payload",
    "received_at",
    "processed_at",
    "status",
    "error_message"
   FROM "public"."stripe_webhook_logs"
  WHERE ("status" = 'received'::"text")
  ORDER BY "received_at" DESC;


ALTER VIEW "public"."stripe_webhook_pending" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tenants" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "primary_domain" "text" NOT NULL,
    "stripe_account_id" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "platform_fee_rate" numeric DEFAULT 0,
    "share_fee_rate" numeric DEFAULT 0,
    "vat_rate" numeric DEFAULT 0,
    "email" "text",
    "phone" "text"
);


ALTER TABLE "public"."tenants" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."vehicles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "driver_id" "uuid",
    "brand" "text" NOT NULL,
    "model" "text" NOT NULL,
    "plate_number" "text" NOT NULL,
    "category" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "capacity" integer
);


ALTER TABLE "public"."vehicles" OWNER TO "postgres";


ALTER TABLE ONLY "public"."booking_shares"
    ADD CONSTRAINT "booking_shares_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."booking_status_transitions"
    ADD CONSTRAINT "booking_status_transitions_pkey" PRIMARY KEY ("from_status", "to_status");



ALTER TABLE ONLY "public"."bookings"
    ADD CONSTRAINT "bookings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."cancellation_policies"
    ADD CONSTRAINT "cancellation_policies_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."cancellation_policies"
    ADD CONSTRAINT "cancellation_policy_unique_version" UNIQUE ("tenant_id", "version");



ALTER TABLE ONLY "public"."circle_memberships"
    ADD CONSTRAINT "circle_memberships_one_circle_per_tenant" UNIQUE ("tenant_id");



ALTER TABLE ONLY "public"."circle_memberships"
    ADD CONSTRAINT "circle_memberships_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."circles"
    ADD CONSTRAINT "circles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."drivers"
    ADD CONSTRAINT "drivers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."drivers"
    ADD CONSTRAINT "drivers_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."financial_movements"
    ADD CONSTRAINT "financial_movements_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."onboarding"
    ADD CONSTRAINT "onboarding_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pricing_rules"
    ADD CONSTRAINT "pricing_rules_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."stripe_events"
    ADD CONSTRAINT "stripe_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."stripe_events"
    ADD CONSTRAINT "stripe_events_stripe_event_id_key" UNIQUE ("stripe_event_id");



ALTER TABLE ONLY "public"."stripe_webhook_logs"
    ADD CONSTRAINT "stripe_webhook_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_primary_domain_key" UNIQUE ("primary_domain");



ALTER TABLE ONLY "public"."vehicles"
    ADD CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id");



CREATE UNIQUE INDEX "customers_unique_email_per_tenant" ON "public"."customers" USING "btree" ("tenant_id", "email");



CREATE INDEX "idx_booking_shares_booking" ON "public"."booking_shares" USING "btree" ("booking_id");



CREATE UNIQUE INDEX "idx_booking_shares_one_accept" ON "public"."booking_shares" USING "btree" ("booking_id") WHERE ("status" = 'accepted'::"public"."share_status");



CREATE INDEX "idx_bookings_created_at" ON "public"."bookings" USING "btree" ("created_at");



CREATE INDEX "idx_bookings_current_tenant" ON "public"."bookings" USING "btree" ("current_tenant_id");



CREATE INDEX "idx_bookings_driver" ON "public"."bookings" USING "btree" ("driver_id");



CREATE INDEX "idx_bookings_email" ON "public"."bookings" USING "btree" ("client_email");



CREATE INDEX "idx_bookings_original_tenant" ON "public"."bookings" USING "btree" ("original_tenant_id");



CREATE INDEX "idx_bookings_status" ON "public"."bookings" USING "btree" ("status");



CREATE INDEX "idx_cancellation_policy_active" ON "public"."cancellation_policies" USING "btree" ("tenant_id", "active");



CREATE INDEX "idx_circle_memberships_tenant" ON "public"."circle_memberships" USING "btree" ("tenant_id");



CREATE INDEX "idx_drivers_tenant" ON "public"."drivers" USING "btree" ("tenant_id");



CREATE INDEX "idx_financial_event_link" ON "public"."financial_movements" USING "btree" ("created_by_event");



CREATE INDEX "idx_financial_movements_booking_id" ON "public"."financial_movements" USING "btree" ("booking_id");



CREATE INDEX "idx_financial_movements_payment_intent" ON "public"."financial_movements" USING "btree" ("stripe_payment_intent_id");



CREATE INDEX "idx_financial_movements_tenant_id" ON "public"."financial_movements" USING "btree" ("tenant_id");



CREATE INDEX "idx_onboarding_profile" ON "public"."onboarding" USING "btree" ("profile_id");



CREATE INDEX "idx_pricing_tenant" ON "public"."pricing_rules" USING "btree" ("tenant_id");



CREATE INDEX "idx_stripe_event_received" ON "public"."stripe_webhook_logs" USING "btree" ("received_at" DESC);



CREATE INDEX "idx_stripe_event_status" ON "public"."stripe_webhook_logs" USING "btree" ("status");



CREATE UNIQUE INDEX "idx_stripe_event_unique" ON "public"."stripe_webhook_logs" USING "btree" ("stripe_event_id");



CREATE UNIQUE INDEX "idx_unique_financial_payment" ON "public"."financial_movements" USING "btree" ("stripe_payment_intent_id", "movement_type", COALESCE("stripe_refund_id", 'no_refund'::"text"));



CREATE UNIQUE INDEX "idx_unique_financial_strict" ON "public"."financial_movements" USING "btree" ("stripe_payment_intent_id", "movement_type", COALESCE("stripe_refund_id", 'none'::"text"));



CREATE INDEX "idx_vehicles_tenant" ON "public"."vehicles" USING "btree" ("tenant_id");



CREATE UNIQUE INDEX "unique_active_policy_per_tenant" ON "public"."cancellation_policies" USING "btree" ("tenant_id") WHERE ("active" = true);



CREATE OR REPLACE TRIGGER "trg_prevent_booking_delete" BEFORE DELETE ON "public"."bookings" FOR EACH ROW EXECUTE FUNCTION "public"."prevent_booking_delete"();



CREATE OR REPLACE TRIGGER "trg_prevent_late_cancellation" BEFORE UPDATE ON "public"."bookings" FOR EACH ROW EXECUTE FUNCTION "public"."prevent_late_cancellation"();



CREATE OR REPLACE TRIGGER "trg_prevent_pickup_time_change_after_paid" BEFORE UPDATE ON "public"."bookings" FOR EACH ROW EXECUTE FUNCTION "public"."prevent_pickup_time_change_after_paid"();



CREATE OR REPLACE TRIGGER "trg_prevent_policy_update" BEFORE UPDATE ON "public"."bookings" FOR EACH ROW EXECUTE FUNCTION "public"."prevent_policy_update"();



CREATE OR REPLACE TRIGGER "trg_protect_booking_fields" BEFORE UPDATE ON "public"."bookings" FOR EACH ROW EXECUTE FUNCTION "public"."protect_booking_immutable_fields"();



CREATE OR REPLACE TRIGGER "trg_validate_booking_status_transition" BEFORE UPDATE ON "public"."bookings" FOR EACH ROW WHEN (("old"."status" IS DISTINCT FROM "new"."status")) EXECUTE FUNCTION "public"."validate_booking_status_transition"();



CREATE OR REPLACE TRIGGER "trg_validate_ledger_consistency" AFTER INSERT ON "public"."financial_movements" FOR EACH ROW EXECUTE FUNCTION "public"."validate_ledger_consistency"();



ALTER TABLE ONLY "public"."booking_shares"
    ADD CONSTRAINT "booking_shares_accepted_by_tenant_id_fkey" FOREIGN KEY ("accepted_by_tenant_id") REFERENCES "public"."tenants"("id");



ALTER TABLE ONLY "public"."booking_shares"
    ADD CONSTRAINT "booking_shares_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."booking_shares"
    ADD CONSTRAINT "booking_shares_shared_by_tenant_id_fkey" FOREIGN KEY ("shared_by_tenant_id") REFERENCES "public"."tenants"("id");



ALTER TABLE ONLY "public"."bookings"
    ADD CONSTRAINT "bookings_cancellation_policy_id_fkey" FOREIGN KEY ("cancellation_policy_id") REFERENCES "public"."cancellation_policies"("id");



ALTER TABLE ONLY "public"."bookings"
    ADD CONSTRAINT "bookings_current_tenant_id_fkey" FOREIGN KEY ("current_tenant_id") REFERENCES "public"."tenants"("id");



ALTER TABLE ONLY "public"."bookings"
    ADD CONSTRAINT "bookings_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id");



ALTER TABLE ONLY "public"."bookings"
    ADD CONSTRAINT "bookings_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."bookings"
    ADD CONSTRAINT "bookings_original_tenant_id_fkey" FOREIGN KEY ("original_tenant_id") REFERENCES "public"."tenants"("id");



ALTER TABLE ONLY "public"."cancellation_policies"
    ADD CONSTRAINT "cancellation_policies_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."circle_memberships"
    ADD CONSTRAINT "circle_memberships_circle_id_fkey" FOREIGN KEY ("circle_id") REFERENCES "public"."circles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."circle_memberships"
    ADD CONSTRAINT "circle_memberships_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."circles"
    ADD CONSTRAINT "circles_created_by_tenant_id_fkey" FOREIGN KEY ("created_by_tenant_id") REFERENCES "public"."tenants"("id");



ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."drivers"
    ADD CONSTRAINT "drivers_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."drivers"
    ADD CONSTRAINT "drivers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."financial_movements"
    ADD CONSTRAINT "financial_movements_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."financial_movements"
    ADD CONSTRAINT "financial_movements_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."onboarding"
    ADD CONSTRAINT "onboarding_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pricing_rules"
    ADD CONSTRAINT "pricing_rules_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."vehicles"
    ADD CONSTRAINT "vehicles_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."vehicles"
    ADD CONSTRAINT "vehicles_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



CREATE POLICY "Allow profile insert on signup" ON "public"."profiles" FOR INSERT WITH CHECK (true);



ALTER TABLE "public"."booking_shares" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "booking_shares_select" ON "public"."booking_shares" FOR SELECT USING ((("shared_by_tenant_id" = "public"."current_tenant_id"()) OR ("accepted_by_tenant_id" = "public"."current_tenant_id"())));



ALTER TABLE "public"."bookings" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "bookings_insert_isolation" ON "public"."bookings" FOR INSERT WITH CHECK (("original_tenant_id" = "public"."current_tenant_id"()));



CREATE POLICY "bookings_select" ON "public"."bookings" FOR SELECT USING (("current_tenant_id" = ( SELECT "profiles"."tenant_id"
   FROM "public"."profiles"
  WHERE ("profiles"."id" = "auth"."uid"()))));



CREATE POLICY "bookings_select_isolation" ON "public"."bookings" FOR SELECT USING ((("original_tenant_id" = "public"."current_tenant_id"()) OR ("current_tenant_id" = "public"."current_tenant_id"())));



CREATE POLICY "bookings_update_isolation" ON "public"."bookings" FOR UPDATE USING ((("original_tenant_id" = "public"."current_tenant_id"()) OR ("current_tenant_id" = "public"."current_tenant_id"()))) WITH CHECK ((("original_tenant_id" = "public"."current_tenant_id"()) OR ("current_tenant_id" = "public"."current_tenant_id"())));



ALTER TABLE "public"."cancellation_policies" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."circle_memberships" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "circle_memberships_tenant_isolation" ON "public"."circle_memberships" USING (("tenant_id" = "public"."current_tenant_id"())) WITH CHECK (("tenant_id" = "public"."current_tenant_id"()));



ALTER TABLE "public"."circles" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "circles_tenant_isolation" ON "public"."circles" USING (("created_by_tenant_id" = "public"."current_tenant_id"())) WITH CHECK (("created_by_tenant_id" = "public"."current_tenant_id"()));



ALTER TABLE "public"."drivers" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "drivers_isolation" ON "public"."drivers" USING (("tenant_id" = ( SELECT "profiles"."tenant_id"
   FROM "public"."profiles"
  WHERE ("profiles"."id" = "auth"."uid"()))));



CREATE POLICY "drivers_tenant_isolation" ON "public"."drivers" USING (("tenant_id" = "public"."current_tenant_id"())) WITH CHECK (("tenant_id" = "public"."current_tenant_id"()));



CREATE POLICY "finance_insert_service_only" ON "public"."financial_movements" FOR INSERT TO "service_role" WITH CHECK (true);



CREATE POLICY "finance_select_isolated" ON "public"."financial_movements" FOR SELECT TO "authenticated" USING (("tenant_id" = "public"."current_tenant_id"()));



ALTER TABLE "public"."financial_movements" ENABLE ROW LEVEL SECURITY;


CREATE VIEW "public"."user_emails" AS
 SELECT id, email FROM auth.users;

GRANT SELECT ON TABLE "public"."user_emails" TO "authenticated";
GRANT SELECT ON TABLE "public"."user_emails" TO "service_role";

CREATE OR REPLACE VIEW "public"."onboarding_admin_view" AS
 SELECT
    o.id,
    o.profile_id,
    o.status,
    o.company_name,
    o.primary_domain,
    o.phone,
    o.capacity,
    o.created_at,
    o.validated_at,
    o.vtc_license_number,
    o.service_categories,
    o.default_base_price,
    o.default_price_per_km,
    o.default_minimum_fare,
    o.vehicle_brand,
    o.vehicle_model,
    o.plate_number,
    o.first_name,
    o.last_name,
    u.email AS auth_email
   FROM "public"."onboarding" o
     JOIN auth.users u ON o.profile_id = u.id;

GRANT SELECT ON TABLE "public"."onboarding_admin_view" TO "authenticated";
GRANT SELECT ON TABLE "public"."onboarding_admin_view" TO "service_role";

ALTER TABLE "public"."onboarding" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "onboarding_insert_own" ON "public"."onboarding" FOR INSERT WITH CHECK (("profile_id" = "auth"."uid"()));



CREATE POLICY "onboarding_select_own" ON "public"."onboarding" FOR SELECT USING (("profile_id" = "auth"."uid"()));



CREATE POLICY "onboarding_select_platform" ON "public"."onboarding" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."platform_role" IS NOT NULL)))));



CREATE POLICY "platform_admin_read_financial" ON "public"."financial_movements" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."platform_role" = ANY (ARRAY['super_admin'::"public"."platform_role", 'platform_staff'::"public"."platform_role"]))))));



CREATE POLICY "pricing_isolation" ON "public"."pricing_rules" USING (("tenant_id" = ( SELECT "profiles"."tenant_id"
   FROM "public"."profiles"
  WHERE ("profiles"."id" = "auth"."uid"()))));



ALTER TABLE "public"."pricing_rules" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "pricing_tenant_isolation" ON "public"."pricing_rules" USING (("tenant_id" = "public"."current_tenant_id"())) WITH CHECK (("tenant_id" = "public"."current_tenant_id"()));



ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "profiles_select_own" ON "public"."profiles" FOR SELECT USING (("id" = "auth"."uid"()));



CREATE POLICY "profiles_update_own" ON "public"."profiles" FOR UPDATE USING (("id" = "auth"."uid"()));



ALTER TABLE "public"."stripe_events" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."tenants" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "tenants_select_own" ON "public"."tenants" FOR SELECT USING (("id" = ( SELECT "profiles"."tenant_id"
   FROM "public"."profiles"
  WHERE ("profiles"."id" = "auth"."uid"()))));



ALTER TABLE "public"."vehicles" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "vehicles_isolation" ON "public"."vehicles" USING (("tenant_id" = ( SELECT "profiles"."tenant_id"
   FROM "public"."profiles"
  WHERE ("profiles"."id" = "auth"."uid"()))));



CREATE POLICY "vehicles_tenant_isolation" ON "public"."vehicles" USING (("tenant_id" = "public"."current_tenant_id"())) WITH CHECK (("tenant_id" = "public"."current_tenant_id"()));





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."approve_onboarding_tx"("onboarding_uuid" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."approve_onboarding_tx"("onboarding_uuid" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."approve_onboarding_tx"("onboarding_uuid" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."compute_booking_balance"("p_booking_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."compute_booking_balance"("p_booking_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."compute_booking_balance"("p_booking_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."current_tenant_id"() TO "anon";
GRANT ALL ON FUNCTION "public"."current_tenant_id"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."current_tenant_id"() TO "service_role";



GRANT ALL ON FUNCTION "public"."expire_unpaid_bookings"() TO "anon";
GRANT ALL ON FUNCTION "public"."expire_unpaid_bookings"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."expire_unpaid_bookings"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."initiate_refund"("p_booking_id" "uuid", "p_reason" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."initiate_refund"("p_booking_id" "uuid", "p_reason" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."initiate_refund"("p_booking_id" "uuid", "p_reason" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."prevent_booking_delete"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_booking_delete"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_booking_delete"() TO "service_role";



GRANT ALL ON FUNCTION "public"."prevent_late_cancellation"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_late_cancellation"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_late_cancellation"() TO "service_role";



GRANT ALL ON FUNCTION "public"."prevent_pickup_time_change_after_paid"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_pickup_time_change_after_paid"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_pickup_time_change_after_paid"() TO "service_role";



GRANT ALL ON FUNCTION "public"."prevent_policy_update"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_policy_update"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_policy_update"() TO "service_role";



GRANT ALL ON FUNCTION "public"."protect_booking_immutable_fields"() TO "anon";
GRANT ALL ON FUNCTION "public"."protect_booking_immutable_fields"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."protect_booking_immutable_fields"() TO "service_role";



GRANT ALL ON FUNCTION "public"."validate_booking_status_transition"() TO "anon";
GRANT ALL ON FUNCTION "public"."validate_booking_status_transition"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."validate_booking_status_transition"() TO "service_role";



GRANT ALL ON FUNCTION "public"."validate_ledger_consistency"() TO "anon";
GRANT ALL ON FUNCTION "public"."validate_ledger_consistency"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."validate_ledger_consistency"() TO "service_role";


















GRANT ALL ON TABLE "public"."booking_shares" TO "anon";
GRANT ALL ON TABLE "public"."booking_shares" TO "authenticated";
GRANT ALL ON TABLE "public"."booking_shares" TO "service_role";



GRANT ALL ON TABLE "public"."booking_status_transitions" TO "anon";
GRANT ALL ON TABLE "public"."booking_status_transitions" TO "authenticated";
GRANT ALL ON TABLE "public"."booking_status_transitions" TO "service_role";



GRANT ALL ON TABLE "public"."bookings" TO "anon";
GRANT ALL ON TABLE "public"."bookings" TO "authenticated";
GRANT ALL ON TABLE "public"."bookings" TO "service_role";



GRANT ALL ON TABLE "public"."bookings_stuck_pending_refund" TO "anon";
GRANT ALL ON TABLE "public"."bookings_stuck_pending_refund" TO "authenticated";
GRANT ALL ON TABLE "public"."bookings_stuck_pending_refund" TO "service_role";



GRANT ALL ON TABLE "public"."cancellation_policies" TO "anon";
GRANT ALL ON TABLE "public"."cancellation_policies" TO "authenticated";
GRANT ALL ON TABLE "public"."cancellation_policies" TO "service_role";



GRANT ALL ON TABLE "public"."circle_memberships" TO "anon";
GRANT ALL ON TABLE "public"."circle_memberships" TO "authenticated";
GRANT ALL ON TABLE "public"."circle_memberships" TO "service_role";



GRANT ALL ON TABLE "public"."circles" TO "anon";
GRANT ALL ON TABLE "public"."circles" TO "authenticated";
GRANT ALL ON TABLE "public"."circles" TO "service_role";



GRANT ALL ON TABLE "public"."customers" TO "anon";
GRANT ALL ON TABLE "public"."customers" TO "authenticated";
GRANT ALL ON TABLE "public"."customers" TO "service_role";



GRANT ALL ON TABLE "public"."drivers" TO "anon";
GRANT ALL ON TABLE "public"."drivers" TO "authenticated";
GRANT ALL ON TABLE "public"."drivers" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."financial_movements" TO "anon";
GRANT SELECT,INSERT,REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."financial_movements" TO "authenticated";
GRANT ALL ON TABLE "public"."financial_movements" TO "service_role";



GRANT ALL ON TABLE "public"."finance_current_year_kpi" TO "anon";
GRANT ALL ON TABLE "public"."finance_current_year_kpi" TO "authenticated";
GRANT ALL ON TABLE "public"."finance_current_year_kpi" TO "service_role";



GRANT ALL ON TABLE "public"."finance_global_kpi" TO "anon";
GRANT ALL ON TABLE "public"."finance_global_kpi" TO "authenticated";
GRANT ALL ON TABLE "public"."finance_global_kpi" TO "service_role";



GRANT ALL ON TABLE "public"."finance_monthly_summary" TO "anon";
GRANT ALL ON TABLE "public"."finance_monthly_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."finance_monthly_summary" TO "service_role";



GRANT ALL ON TABLE "public"."finance_yearly_summary" TO "anon";
GRANT ALL ON TABLE "public"."finance_yearly_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."finance_yearly_summary" TO "service_role";



GRANT ALL ON TABLE "public"."financial_fiscal_detail" TO "anon";
GRANT ALL ON TABLE "public"."financial_fiscal_detail" TO "authenticated";
GRANT ALL ON TABLE "public"."financial_fiscal_detail" TO "service_role";



GRANT ALL ON TABLE "public"."financial_monthly_summary" TO "anon";
GRANT ALL ON TABLE "public"."financial_monthly_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."financial_monthly_summary" TO "service_role";



GRANT ALL ON TABLE "public"."financial_summary" TO "anon";
GRANT ALL ON TABLE "public"."financial_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."financial_summary" TO "service_role";



GRANT ALL ON TABLE "public"."financial_yearly_summary" TO "anon";
GRANT ALL ON TABLE "public"."financial_yearly_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."financial_yearly_summary" TO "service_role";



GRANT ALL ON TABLE "public"."onboarding" TO "anon";
GRANT ALL ON TABLE "public"."onboarding" TO "authenticated";
GRANT ALL ON TABLE "public"."onboarding" TO "service_role";



GRANT ALL ON TABLE "public"."pricing_rules" TO "anon";
GRANT ALL ON TABLE "public"."pricing_rules" TO "authenticated";
GRANT ALL ON TABLE "public"."pricing_rules" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."stripe_events" TO "anon";
GRANT ALL ON TABLE "public"."stripe_events" TO "authenticated";
GRANT ALL ON TABLE "public"."stripe_events" TO "service_role";



GRANT ALL ON TABLE "public"."stripe_webhook_logs" TO "anon";
GRANT ALL ON TABLE "public"."stripe_webhook_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."stripe_webhook_logs" TO "service_role";



GRANT ALL ON TABLE "public"."stripe_webhook_errors" TO "anon";
GRANT ALL ON TABLE "public"."stripe_webhook_errors" TO "authenticated";
GRANT ALL ON TABLE "public"."stripe_webhook_errors" TO "service_role";



GRANT ALL ON TABLE "public"."stripe_webhook_pending" TO "anon";
GRANT ALL ON TABLE "public"."stripe_webhook_pending" TO "authenticated";
GRANT ALL ON TABLE "public"."stripe_webhook_pending" TO "service_role";



GRANT ALL ON TABLE "public"."tenants" TO "anon";
GRANT ALL ON TABLE "public"."tenants" TO "authenticated";
GRANT ALL ON TABLE "public"."tenants" TO "service_role";



GRANT ALL ON TABLE "public"."vehicles" TO "anon";
GRANT ALL ON TABLE "public"."vehicles" TO "authenticated";
GRANT ALL ON TABLE "public"."vehicles" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































