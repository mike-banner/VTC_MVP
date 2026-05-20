# 📊 Fiscal Ledger Architecture (Draft)

## Goal

Establish an automated, high-integrity monthly and yearly revenue report for tenants to facilitate tax declarations ("décompte impôts").

## Data Source

The `financial_movements` table is the source of truth. Every successful booking payment or refund must generate a row here.

## 💾 Database Layer

### View `tenant_accounting_ledger`

Group movements by:

- `tenant_id`
- `fiscal_year` (extracted from `created_at`)
- `fiscal_month` (extracted from `created_at`)

### Columns

| Column            | Description                                                       |
| :---------------- | :---------------------------------------------------------------- |
| `gross_revenue`   | Sum of all `gross_amount` where type is `payment`.                |
| `net_revenue`     | Sum of all `net_amount` where type is `payment` minus `refund`.   |
| `commission_paid` | Sum of `platform_commission_amount` + `driver_commission_amount`. |
| `vat_total`       | Sum of `vat_amount` for fiscal reporting.                         |
| `count`           | Total successful bookings for the period.                         |

## 🖥️ UI / Implementation

- **Dashboard Section**: A dedicated "Fiscalité" card showing the Current Year and Current Month totals.
- **Detailed History**: A paginated list of months per year, allowing the tenant to see exactly what was made each month.
- **Audit**: Clicking a month shows the list of bookings that contributed to the total.
