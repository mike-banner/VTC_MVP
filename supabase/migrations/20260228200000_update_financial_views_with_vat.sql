-- ==========================================
-- DROP OLD VIEWS
-- ==========================================

drop view if exists public.financial_monthly_summary;
drop view if exists public.financial_yearly_summary;

-- ==========================================
-- CREATE MONTHLY VIEW WITH VAT
-- ==========================================

create view public.financial_monthly_summary as
select
  tenant_id,
  date_trunc('month', created_at) as month,

  sum(case when direction = 'credit' then net_amount else -net_amount end) as net_ht,
  sum(case when direction = 'credit' then vat_amount else -vat_amount end) as total_vat,
  sum(case when direction = 'credit' then gross_amount else -gross_amount end) as net_ttc,

  sum(case when movement_type = 'payment' then gross_amount else 0 end) as total_payments,
  sum(case when movement_type = 'refund' then gross_amount else 0 end) as total_refunds,
  sum(case when movement_type = 'commission' then gross_amount else 0 end) as total_commissions

from public.financial_movements
group by tenant_id, date_trunc('month', created_at);

-- ==========================================
-- CREATE YEARLY VIEW WITH VAT
-- ==========================================

create view public.financial_yearly_summary as
select
  tenant_id,
  date_trunc('year', created_at) as year,

  sum(case when direction = 'credit' then net_amount else -net_amount end) as net_ht,
  sum(case when direction = 'credit' then vat_amount else -vat_amount end) as total_vat,
  sum(case when direction = 'credit' then gross_amount else -gross_amount end) as net_ttc

from public.financial_movements
group by tenant_id, date_trunc('year', created_at);
