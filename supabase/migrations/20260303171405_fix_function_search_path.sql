-- ============================================================
-- FIX FUNCTION SEARCH PATH
-- ============================================================

ALTER FUNCTION public.protect_booking_immutable_fields()
  SET search_path = public;

ALTER FUNCTION public.prevent_policy_update()
  SET search_path = public;

ALTER FUNCTION public.validate_booking_status_transition()
  SET search_path = public;

ALTER FUNCTION public.prevent_late_cancellation()
  SET search_path = public;

ALTER FUNCTION public.prevent_pickup_time_change_after_paid()
  SET search_path = public;

ALTER FUNCTION public.prevent_booking_delete()
  SET search_path = public;

ALTER FUNCTION public.compute_booking_balance(uuid)
  SET search_path = public;

ALTER FUNCTION public.validate_ledger_consistency()
  SET search_path = public;

ALTER FUNCTION public.expire_unpaid_bookings()
  SET search_path = public;

ALTER FUNCTION public.initiate_refund(uuid, text)
  SET search_path = public;

ALTER FUNCTION public.current_tenant_id()
  SET search_path = public;


  -- ============================================================
-- FIX PROFILES INSERT POLICY
-- ============================================================

DROP POLICY IF EXISTS "Allow profile insert on signup" ON public.profiles;

CREATE POLICY profiles_insert_own
ON public.profiles
FOR INSERT
WITH CHECK (id = auth.uid());
