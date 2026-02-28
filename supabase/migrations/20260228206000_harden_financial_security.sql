-- ==========================================
-- STRICT UNIQUE GUARANTEE
-- ==========================================

create unique index if not exists idx_unique_financial_strict
on public.financial_movements (
  stripe_payment_intent_id,
  movement_type,
  coalesce(stripe_refund_id, 'none')
);
