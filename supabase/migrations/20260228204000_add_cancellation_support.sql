-- ==========================================
-- EVENT TRACEABILITY
-- ==========================================

alter table public.financial_movements
add column if not exists created_by_event text;

create index if not exists idx_financial_event_link
on public.financial_movements(created_by_event);
