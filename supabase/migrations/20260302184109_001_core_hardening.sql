-- ===============================
-- CORE HARDENING MIGRATION
-- ===============================

-- 1️⃣ ENUM updates
alter type booking_status add value if not exists 'no_show';
alter type booking_status add value if not exists 'expired_payment';
alter type booking_status add value if not exists 'refund_failed';

-- 2️⃣ Transition table
create table if not exists booking_status_transitions (
  from_status booking_status not null,
  to_status booking_status not null,
  primary key (from_status, to_status)
);

truncate booking_status_transitions;

insert into booking_status_transitions (from_status, to_status) values

-- Flux normal
('pending', 'accepted'),
('accepted', 'accepted_pending_payment'),
('accepted_pending_payment', 'paid'),
('paid', 'completed'),

-- Expiration
('accepted_pending_payment', 'expired_payment'),

-- Annulation avant paiement
('pending', 'cancelled_no_refund'),
('accepted', 'cancelled_no_refund'),
('accepted_pending_payment', 'cancelled_no_refund'),

-- Annulation après paiement
('paid', 'cancelled_pending_refund'),
('cancelled_pending_refund', 'cancelled_refunded'),

-- Retry refund
('cancelled_pending_refund', 'refund_failed'),
('refund_failed', 'cancelled_pending_refund'),

-- No show
('paid', 'no_show');

-- 3️⃣ Validate transition trigger
create or replace function validate_booking_status_transition()
returns trigger as $$
begin
  if new.status = old.status then
    return new;
  end if;

  if not exists (
    select 1
    from booking_status_transitions
    where from_status = old.status
      and to_status = new.status
  ) then
    raise exception 'Invalid booking status transition from % to %',
      old.status, new.status;
  end if;

  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_validate_booking_status_transition on bookings;

create trigger trg_validate_booking_status_transition
before update on bookings
for each row
when (old.status is distinct from new.status)
execute function validate_booking_status_transition();


-- 4️⃣ Prevent late cancellation
create or replace function prevent_late_cancellation()
returns trigger as $$
begin
  if new.status in ('cancelled_no_refund','cancelled_pending_refund')
     and old.pickup_time <= now() then
    raise exception 'Cannot cancel after pickup_time';
  end if;

  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_prevent_late_cancellation on bookings;

create trigger trg_prevent_late_cancellation
before update on bookings
for each row
execute function prevent_late_cancellation();


-- 5️⃣ Ledger constraints
alter table financial_movements
add constraint if not exists chk_gross_positive
check (gross_amount >= 0);

alter table financial_movements
add constraint if not exists chk_net_positive
check (net_amount >= 0);

alter table financial_movements
add constraint if not exists chk_vat_positive
check (vat_amount >= 0);

alter table financial_movements
add constraint if not exists chk_refund_ratio_valid
check (
  refund_ratio is null
  or (refund_ratio >= 0 and refund_ratio <= 1)
);


-- 6️⃣ Prevent delete booking
create or replace function prevent_booking_delete()
returns trigger as $$
begin
  raise exception 'Bookings cannot be deleted';
end;
$$ language plpgsql;

drop trigger if exists trg_prevent_booking_delete on bookings;

create trigger trg_prevent_booking_delete
before delete on bookings
for each row
execute function prevent_booking_delete();


-- 7️⃣ Compute booking balance
create or replace function compute_booking_balance(p_booking_id uuid)
returns numeric as $$
declare
  total numeric;
begin
  select coalesce(sum(
    case
      when movement_type = 'payment' then net_amount
      when movement_type = 'refund' then -net_amount
      else 0
    end
  ),0)
  into total
  from financial_movements
  where booking_id = p_booking_id;

  return total;
end;
$$ language plpgsql;


-- 8️⃣ Ledger consistency trigger
create or replace function validate_ledger_consistency()
returns trigger as $$
declare
  booking_total numeric;
  ledger_total numeric;
begin
  select total_amount into booking_total
  from bookings
  where id = new.booking_id;

  ledger_total := compute_booking_balance(new.booking_id);

  if ledger_total > booking_total then
    raise exception 'Ledger exceeds booking total TTC';
  end if;

  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_validate_ledger_consistency on financial_movements;

create trigger trg_validate_ledger_consistency
after insert on financial_movements
for each row
execute function validate_ledger_consistency();


-- 9️⃣ Expire unpaid bookings (15 minutes)
create or replace function expire_unpaid_bookings()
returns void as $$
begin
  update bookings
  set status = 'expired_payment'
  where status = 'accepted_pending_payment'
    and created_at < now() - interval '15 minutes';
end;
$$ language plpgsql;


-- 🔟 Refund concurrency lock
create or replace function public.initiate_refund(
  p_booking_id uuid,
  p_reason text
)
returns table (
  payment_intent_id text,
  refund_allowed boolean
)
language plpgsql
security definer
as $$
declare
  v_booking bookings%rowtype;
begin
  select *
  into v_booking
  from bookings
  where id = p_booking_id
  for update;

  if not found then
    raise exception 'Booking not found';
  end if;

  if v_booking.status not in ('paid','refund_failed') then
    return query select null::text, false;
    return;
  end if;

  update bookings
  set status = 'cancelled_pending_refund',
      cancellation_reason = p_reason,
      cancelled_at = now()
  where id = p_booking_id;

  return query
  select v_booking.stripe_payment_intent_id, true;
end;
$$;
