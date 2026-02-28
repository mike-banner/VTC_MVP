-- ==========================================
-- UNIQUE PROTECTION FINANCIAL MOVEMENTS
-- ==========================================

create unique index if not exists idx_unique_financial_payment
on public.financial_movements (
  stripe_payment_intent_id,
  movement_type,
  coalesce(stripe_refund_id, 'no_refund')
);
