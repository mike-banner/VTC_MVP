-- ==========================================
-- FINANCIAL MONTHLY SUMMARY PER TENANT
-- ==========================================

create or replace view public.financial_monthly_summary as
select
  tenant_id,
  date_trunc('month', created_at) as month,

  sum(
    case
      when direction = 'credit' then gross_amount
      else -gross_amount
    end
  ) as net_total,

  sum(
    case when movement_type = 'payment'
      then gross_amount else 0 end
  ) as total_payments,

  sum(
    case when movement_type = 'refund'
      then gross_amount else 0 end
  ) as total_refunds,

  sum(
    case when movement_type = 'commission'
      then gross_amount else 0 end
  ) as total_commissions

from public.financial_movements
group by tenant_id, date_trunc('month', created_at)
order by month desc;
