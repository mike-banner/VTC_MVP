-- ===============================
-- STRIPE WEBHOOK MONITORING
-- ===============================

create table if not exists stripe_webhook_logs (
  id uuid primary key default gen_random_uuid(),
  stripe_event_id text not null,
  event_type text not null,
  payload jsonb not null,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  status text not null default 'received', -- received | success | error
  error_message text
);

create unique index if not exists idx_stripe_event_unique
on stripe_webhook_logs(stripe_event_id);

create index if not exists idx_stripe_event_status
on stripe_webhook_logs(status);

create index if not exists idx_stripe_event_received
on stripe_webhook_logs(received_at desc);




create or replace view stripe_webhook_errors as
select *
from stripe_webhook_logs
where status = 'error'
order by received_at desc;

create or replace view stripe_webhook_pending as
select *
from stripe_webhook_logs
where status = 'received'
order by received_at desc;
