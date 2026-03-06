-- ============================================================
-- PLATFORM ADMIN GLOBAL READ ACCESS
-- Allow super_admin & platform_staff to read all data
-- ============================================================

-- BOOKINGS
CREATE POLICY bookings_platform_admin_read
ON public.bookings
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
    AND platform_role IN ('super_admin','platform_staff')
  )
);

-- FINANCIAL MOVEMENTS
CREATE POLICY financial_platform_admin_read
ON public.financial_movements
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
    AND platform_role IN ('super_admin','platform_staff')
  )
);

-- CUSTOMERS
CREATE POLICY customers_platform_admin_read
ON public.customers
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
    AND platform_role IN ('super_admin','platform_staff')
  )
);

-- TENANTS
CREATE POLICY tenants_platform_admin_read
ON public.tenants
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
    AND platform_role IN ('super_admin','platform_staff')
  )
);
