-- ============================================================
-- REMOVE SECURITY DEFINER FROM VIEWS
-- ============================================================

-- Stripe views
ALTER VIEW public.stripe_webhook_pending SET (security_invoker = true);
ALTER VIEW public.stripe_webhook_errors SET (security_invoker = true);

-- Finance views
ALTER VIEW public.financial_summary SET (security_invoker = true);
ALTER VIEW public.financial_monthly_summary SET (security_invoker = true);
ALTER VIEW public.financial_yearly_summary SET (security_invoker = true);
ALTER VIEW public.financial_fiscal_detail SET (security_invoker = true);

ALTER VIEW public.finance_current_year_kpi SET (security_invoker = true);
ALTER VIEW public.finance_monthly_summary SET (security_invoker = true);
ALTER VIEW public.finance_yearly_summary SET (security_invoker = true);
ALTER VIEW public.finance_global_kpi SET (security_invoker = true);

-- Booking view
ALTER VIEW public.bookings_stuck_pending_refund SET (security_invoker = true);


-- ============================================================
-- ENABLE RLS ON MISSING TABLES
-- ============================================================

-- 1️⃣ CUSTOMERS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY customers_tenant_isolation
ON public.customers
USING (tenant_id = public.current_tenant_id())
WITH CHECK (tenant_id = public.current_tenant_id());


-- 2️⃣ BOOKING STATUS TRANSITIONS (lecture simple)
ALTER TABLE public.booking_status_transitions ENABLE ROW LEVEL SECURITY;

CREATE POLICY booking_status_transitions_read
ON public.booking_status_transitions
FOR SELECT
USING (true);


-- 3️⃣ STRIPE WEBHOOK LOGS
ALTER TABLE public.stripe_webhook_logs ENABLE ROW LEVEL SECURITY;

-- Lecture uniquement plateforme
CREATE POLICY stripe_webhook_platform_read
ON public.stripe_webhook_logs
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
    AND platform_role IS NOT NULL
  )
);

-- Insert uniquement service_role
CREATE POLICY stripe_webhook_insert_service
ON public.stripe_webhook_logs
FOR INSERT
TO service_role
WITH CHECK (true);
