drop view if exists public.admin_bookings_full_view;

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
  coalesce(ot.name, 'Plateforme') as original_tenant_name,
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

  -- CLIENT (Safe Fallback)
  coalesce(c.id, b.customer_id) as customer_id,
  coalesce(c.email, b.client_email) as display_customer_email,
  coalesce(
    trim(concat(c.first_name, ' ', c.last_name)),
    b.client_name
  ) as display_customer_name,
  coalesce(c.phone, 'N/A') as display_customer_phone,

  -- FINANCE
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
  b.id,
  ot.id,
  ct.id,
  d.id,
  c.id;
