-- ===============================
-- FINANCE DASHBOARD VIEWS
-- ===============================

-- 1️⃣ KPI global
create or replace view finance_global_kpi as
select
  coalesce(sum(case when movement_type = 'payment' then gross_amount end),0) as total_collected,
  coalesce(sum(case when movement_type = 'refund' then gross_amount end),0) as total_refunded,
  coalesce(
    sum(case when movement_type = 'payment' then net_amount end),0
  ) - coalesce(
    sum(case when movement_type = 'refund' then net_amount end),0
  ) as net_revenue,
  count(distinct booking_id) as total_bookings
from financial_movements;

-- 2️⃣ Résumé mensuel
create or replace view finance_monthly_summary as
select
  date_trunc('month', created_at) as month,
  coalesce(sum(case when movement_type = 'payment' then gross_amount end),0) as total_collected,
  coalesce(sum(case when movement_type = 'refund' then gross_amount end),0) as total_refunded,
  coalesce(
    sum(case when movement_type = 'payment' then net_amount end),0
  ) - coalesce(
    sum(case when movement_type = 'refund' then net_amount end),0
  ) as net_revenue
from financial_movements
group by 1
order by 1 desc;

-- 3️⃣ Refund bloqués
create or replace view bookings_stuck_pending_refund as
select *
from bookings
where status = 'cancelled_pending_refund'
  and cancelled_at < now() - interval '10 minutes';

-- 4️⃣ Webhook errors (sécurité)
create or replace view stripe_webhook_errors as
select *
from stripe_webhook_logs
where status = 'error'
order by received_at desc;
