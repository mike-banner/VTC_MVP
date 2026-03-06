-- ============================================================
-- ADMIN FULL BOOKINGS VIEW
-- ============================================================

create or replace view public.admin_bookings_full_view as
select
  b.id as booking_id,
  b.status,
  b.pickup_address,
  b.dropoff_address,
  b.pickup_time,
  b.total_amount,
  b.payment_mode,
  b.created_at,

  -- ORIGINAL TENANT
  ot.id as original_tenant_id,
  ot.name as original_tenant_name,
  ot.primary_domain as original_tenant_domain,

  -- CURRENT TENANT
  ct.id as current_tenant_id,
  ct.name as current_tenant_name,
  ct.primary_domain as current_tenant_domain,

  -- DRIVER
  d.id as driver_id,
  d.first_name as driver_first_name,
  d.last_name as driver_last_name,
  d.phone as driver_phone,

  -- DRIVER PROFILE
  p.id as driver_profile_id,
  p.first_name as profile_first_name,
  p.last_name as profile_last_name,
  p.platform_role as driver_platform_role,

  -- CUSTOMER
  c.id as customer_id,
  c.email as customer_email,
  c.first_name as customer_first_name,
  c.last_name as customer_last_name,
  c.phone as customer_phone,

  -- FINANCE AGGREGATE
  coalesce(sum(
    case
      when fm.movement_type = 'payment' then fm.gross_amount
      when fm.movement_type = 'refund' then -fm.gross_amount
      else 0
    end
  ),0) as total_collected

from bookings b
left join tenants ot on ot.id = b.original_tenant_id
left join tenants ct on ct.id = b.current_tenant_id
left join drivers d on d.id = b.driver_id
left join profiles p on p.id = d.user_id
left join customers c on c.id = b.customer_id
left join financial_movements fm on fm.booking_id = b.id

group by
  b.id,
  ot.id, ct.id,
  d.id,
  p.id,
  c.id;


-- Allow platform admin full read
create policy admin_full_view_platform_read
on public.bookings
for select
using (
  exists (
    select 1 from profiles
    where id = auth.uid()
    and platform_role in ('super_admin','platform_staff')
  )
);
