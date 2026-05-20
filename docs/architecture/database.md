# Database Architecture — VTC HUB

## Schéma Relationnel Multi-Tenant

```
[tenants] (id)
   ├── [profiles] (tenant_id)
   ├── [drivers] (tenant_id)
   ├── [vehicles] (tenant_id)
   ├── [pricing_rules] (tenant_id)
   └── [bookings] (current_tenant_id) ──> [financial_movements]
```

## RLS (Row Level Security)

Chaque table métier possède la policy suivante :
```sql
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON table_name
  USING (tenant_id = current_tenant_id());
```

## Table Clé : `financial_movements` (Audit Trail)
- **Immuable** : Pas d'UPDATE ni de DELETE possible via trigger SQL.
- Trace tous les crédits/débits associés aux paiements et commissions Stripe.

## Vues SQL de Reporting & Fiscalité
Toutes les vues respectent la RLS (filtrage par tenant).

- **`financial_monthly_summary`** : Résumé mensuel par tenant (`gross_revenue` [TTC], `net_revenue` [HT], `vat_total`, `commission_total`, `refund_total`). Utilisé pour la déclaration de TVA.
- **`financial_yearly_summary`** : Résumé annuel pour le bilan comptable.
- **`financial_fiscal_detail`** : Vue granulaire de chaque mouvement financier pour export comptable.

