-- ============================================================
-- VTC V1 HARDENING CLEANUP
-- ============================================================
-- Fix RLS duplication
-- Remove duplicate index
-- Secure grants
-- Stabilize current_tenant_id
-- ============================================================



-- ============================================================
-- 1️⃣ FIX BOOKINGS RLS (REMOVE DUPLICATE SELECT POLICY)
-- ============================================================

DROP POLICY IF EXISTS bookings_select ON public.bookings;
DROP POLICY IF EXISTS bookings_select_isolation ON public.bookings;

CREATE POLICY bookings_select_isolation
ON public.bookings
FOR SELECT
USING (
  original_tenant_id = public.current_tenant_id()
  OR
  current_tenant_id = public.current_tenant_id()
);



-- ============================================================
-- 2️⃣ REMOVE DUPLICATE FINANCIAL UNIQUE INDEX
-- ============================================================

DROP INDEX IF EXISTS public.idx_unique_financial_payment;



-- ============================================================
-- 3️⃣ HARDEN GRANTS
-- ============================================================

-- Remove dangerous ALL grants
REVOKE ALL ON public.bookings FROM anon;
REVOKE ALL ON public.tenants FROM anon;
REVOKE ALL ON public.financial_movements FROM anon;
REVOKE ALL ON public.drivers FROM anon;
REVOKE ALL ON public.vehicles FROM anon;

REVOKE ALL ON public.bookings FROM authenticated;
REVOKE ALL ON public.tenants FROM authenticated;
REVOKE ALL ON public.financial_movements FROM authenticated;

-- Re-apply minimal safe grants
GRANT SELECT, INSERT, UPDATE ON public.bookings TO authenticated;
GRANT SELECT ON public.tenants TO authenticated;
GRANT SELECT ON public.financial_movements TO authenticated;



-- ============================================================
-- 4️⃣ STABILIZE current_tenant_id()
-- ============================================================

CREATE OR REPLACE FUNCTION public.current_tenant_id()
RETURNS uuid
LANGUAGE sql
STABLE
AS $$
  SELECT tenant_id
  FROM public.profiles
  WHERE id = auth.uid()
  LIMIT 1
$$;



-- ============================================================
-- END
-- ============================================================
