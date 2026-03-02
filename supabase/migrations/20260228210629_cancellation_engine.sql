-- ==========================================
-- ENUM cancellation_reason
-- ==========================================

create type cancellation_reason_enum as enum (
  'client',
  'no_show',
  'driver_fault',
  'platform_issue'
);

-- ==========================================
-- UPDATE booking_status ENUM
-- (si déjà existant adapter via ALTER TYPE)
-- ==========================================

alter type booking_status add value if not exists 'cancelled_pending_refund';
alter type booking_status add value if not exists 'cancelled_no_refund';
alter type booking_status add value if not exists 'cancelled_refunded';
-- ==========================================
-- cancellation_policies
-- ==========================================

create table cancellation_policies (
  id uuid primary key default gen_random_uuid(),

  tenant_id uuid references tenants(id) on delete cascade,

  version integer not null,

  hours_before_full_refund integer not null,
  hours_before_partial_refund integer not null,
  partial_refund_rate numeric(5,4) not null,
  no_show_refund_rate numeric(5,4) not null,
  driver_fault_refund_rate numeric(5,4) not null,

  platform_fee_non_refundable boolean not null default false,

  active boolean not null default true,

  created_at timestamp not null default now(),

  constraint cancellation_policy_unique_version
    unique (tenant_id, version)
);

create index idx_cancellation_policy_active
on cancellation_policies (tenant_id, active);

-- ==========================================
-- Attach policy to booking
-- ==========================================

alter table bookings
add column cancellation_policy_id uuid
references cancellation_policies(id);

alter table bookings
add column cancellation_reason cancellation_reason_enum;

alter table bookings
add column cancelled_at timestamp;

alter table bookings
add column cancellation_initiator varchar;

-- ==========================================
-- Safety trigger: prevent policy change
-- ==========================================

create or replace function prevent_policy_update()
returns trigger as $$
begin
  if old.cancellation_policy_id is not null
     and new.cancellation_policy_id <> old.cancellation_policy_id then
    raise exception 'cancellation_policy_id cannot be modified once set';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_prevent_policy_update
before update on bookings
for each row
execute function prevent_policy_update();
