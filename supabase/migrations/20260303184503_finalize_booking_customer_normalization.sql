-- ============================================================
-- FINALIZE BOOKING → CUSTOMER NORMALIZATION
-- ============================================================

-- 1️⃣ Drop dependent views
drop view if exists public.admin_bookings_full_view;
drop view if exists public.bookings_stuck_pending_refund;


-- 2️⃣ Supprimer champs legacy
alter table public.bookings
drop column if exists client_name;

alter table public.bookings
drop column if exists client_email;


-- 3️⃣ Index performance
create index if not exists idx_bookings_customer_id
on public.bookings(customer_id);


-- 4️⃣ Recreate bookings_stuck_pending_refund (sans legacy fields)

create view public.bookings_stuck_pending_refund as
select *
from public.bookings
where status = 'cancelled_pending_refund'
and cancelled_at < (now() - interval '10 minutes');


-- 5️⃣ Recreate admin_bookings_full_view (propre)

create view public.admin_bookings_full_view as
select
  b.id as booking_id,
  b.status,
  b.pickup_address,
  b.dropoff_address,
  b.pickup_time,
  b.total_amount,
  b.payment_mode,
  b.created_at,

  ot.id as original_tenant_id,
  ot.name as original_tenant_name,

  ct.id as current_tenant_id,
  ct.name as current_tenant_name,

  d.id as driver_id,
  d.first_name as driver_first_name,
  d.last_name as driver_last_name,

  c.id as customer_id,
  c.email as customer_email,
  c.first_name as customer_name,

  coalesce(sum(
    case
      when fm.movement_type = 'payment' then fm.gross_amount
      when fm.movement_type = 'refund' then -fm.gross_amount
      else 0
    end
  ), 0) as total_collected

from bookings b
left join tenants ot on ot.id = b.original_tenant_id
left join tenants ct on ct.id = b.current_tenant_id
left join drivers d on d.id = b.driver_id
left join customers c on c.id = b.customer_id
left join financial_movements fm on fm.booking_id = b.id

group by
  b.id, ot.id, ct.id, d.id, c.id;
