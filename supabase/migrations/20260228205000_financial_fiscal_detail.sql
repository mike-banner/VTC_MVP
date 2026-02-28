create or replace view public.financial_fiscal_detail as
select
  tenant_id,
  booking_id,
  movement_type,
  direction,
  net_amount as amount_ht,
  vat_amount,
  gross_amount as amount_ttc,
  stripe_payment_intent_id,
  stripe_refund_id,
  created_at
from public.financial_movements
order by created_at desc;
