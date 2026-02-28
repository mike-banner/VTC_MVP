alter table public.financial_movements
add column if not exists vat_amount numeric(12,2) default 0;
-- ==========================================
-- BOOKING CANCELLATION SUPPORT
-- ==========================================

alter table public.bookings
add column if not exists cancelled_at timestamptz,
add column if not exists cancellation_reason text,
add column if not exists cancellation_initiator text;

-- ==========================================
-- FINANCIAL SUPPORT FOR PARTIAL REFUND
-- ==========================================

alter table public.financial_movements
add column if not exists refund_ratio numeric(5,4);
