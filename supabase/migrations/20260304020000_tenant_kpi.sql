-- ============================================================
-- CLEAN FINANCE ARCHITECTURE (LEDGER ONLY)
-- Source of truth: financial_movements
-- ============================================================


-- ============================================================
-- 1️⃣ DROP LEGACY VIEWS
-- ============================================================

drop view if exists financial_monthly_summary cascade;
drop view if exists financial_yearly_summary cascade;
drop view if exists financial_summary cascade;
drop view if exists financial_fiscal_detail cascade;

drop view if exists finance_global_kpi cascade;
drop view if exists finance_current_year_kpi cascade;
drop view if exists finance_monthly_summary cascade;
drop view if exists finance_yearly_summary cascade;


-- ============================================================
-- 2️⃣ ADMIN MONTHLY SUMMARY (LEDGER BASED)
-- Used by: /admin/dashboard chart
-- ============================================================

create or replace view public.admin_monthly_summary as
select
  date_trunc('month', created_at) as month,
  (
    coalesce(sum(case when movement_type = 'payment' then net_amount else 0 end), 0)
    -
    coalesce(sum(case when movement_type = 'refund' then net_amount else 0 end), 0)
  ) as net_revenue
from financial_movements
group by 1
order by 1;

grant select on public.admin_monthly_summary to authenticated, service_role;


-- ============================================================
-- 3️⃣ TENANT DASHBOARD KPI (LEDGER BASED)
-- Used by: /app/dashboard
-- ============================================================

create or replace view public.tenant_dashboard_kpi as
select
  tenant_id,

  -- GLOBAL GROSS
  coalesce(sum(case
    when movement_type = 'payment' then gross_amount
    else 0 end), 0) as total_gross_revenue,

  -- GLOBAL REFUNDED (GROSS)
  coalesce(sum(case
    when movement_type = 'refund' then gross_amount
    else 0 end), 0) as total_refunded_gross,

  -- GLOBAL NET
  (
    coalesce(sum(case
      when movement_type = 'payment' then net_amount
      else 0 end), 0)
    -
    coalesce(sum(case
      when movement_type = 'refund' then net_amount
      else 0 end), 0)
  ) as total_net_revenue,

  -- BOOKINGS COUNT
  count(distinct booking_id) as total_bookings,

  -- CURRENT MONTH NET
  (
    coalesce(sum(case
      when movement_type = 'payment'
      and date_trunc('month', created_at) = date_trunc('month', now())
      then net_amount else 0 end), 0)
    -
    coalesce(sum(case
      when movement_type = 'refund'
      and date_trunc('month', created_at) = date_trunc('month', now())
      then net_amount else 0 end), 0)
  ) as monthly_net_revenue

from financial_movements
group by tenant_id;

grant select on public.tenant_dashboard_kpi to authenticated, service_role;


-- ============================================================
-- END MIGRATION
-- ============================================================
