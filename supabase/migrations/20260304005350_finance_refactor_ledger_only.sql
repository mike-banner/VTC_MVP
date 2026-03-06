drop view if exists finance_global_kpi cascade;
drop view if exists finance_current_year_kpi cascade;
drop view if exists finance_monthly_summary cascade;
drop view if exists finance_yearly_summary cascade;


alter table financial_movements enable row level security;


create policy "tenant_can_view_own_finance"
on financial_movements
for select
using (
  tenant_id = (
    select tenant_id
    from profiles
    where id = auth.uid()
  )
);



create or replace view public.admin_tenants_overview as
select
  t.id as tenant_id,
  t.name as tenant_name,
  t.primary_domain,
  t.created_at as joined_at,

  coalesce(sum(case when fm.movement_type = 'payment' then fm.gross_amount else 0 end), 0) as total_gross_revenue,

  coalesce(sum(case when fm.movement_type = 'payment' then fm.net_amount else 0 end), 0) -
  coalesce(sum(case when fm.movement_type = 'refund' then fm.net_amount else 0 end), 0) as total_net_revenue,

  count(distinct fm.booking_id) as total_bookings,

  coalesce(avg(case when fm.movement_type = 'payment' then fm.platform_commission_rate_snapshot end), 0) as avg_commission_rate

from tenants t
left join financial_movements fm on fm.tenant_id = t.id
group by t.id;



create or replace view public.admin_monthly_summary as
select
  date_trunc('month', created_at) as month,
  sum(case when movement_type = 'payment' then net_amount else 0 end) -
  sum(case when movement_type = 'refund' then net_amount else 0 end) as net_revenue
from financial_movements
group by 1
order by 1;
