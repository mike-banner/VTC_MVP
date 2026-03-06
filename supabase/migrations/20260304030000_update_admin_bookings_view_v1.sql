-- ============================================================
-- UPDATE ADMIN BOOKINGS FULL VIEW (SAFE RECREATE)
-- ============================================================

drop view if exists public.admin_bookings_full_view cascade;

create view public.admin_bookings_full_view as
select
  b.id,
  b.created_at,
  b.pickup_time,

  -- TRAJET
  b.pickup_address,
  b.dropoff_address,

  -- CLIENT
  coalesce(c.first_name, 'Client') as display_customer_first_name,
  c.last_name as display_customer_last_name,
  c.email as display_customer_email,
  c.phone as display_customer_phone,
  c.city as display_customer_city,
  c.postal_code as display_customer_postal_code,

  -- FINANCE
  b.total_amount,
  b.status,

  -- PARTENAIRE ORIGINE
  ot.name as original_tenant_name,
  ot.primary_domain as original_tenant_domain,

  -- PARTENAIRE ACTUEL
  ct.name as current_tenant_name

from bookings b
left join customers c on c.id = b.customer_id
left join tenants ot on ot.id = b.original_tenant_id
left join tenants ct on ct.id = b.current_tenant_id;

grant select on public.admin_bookings_full_view to authenticated, service_role;
