# 📑 Reporting Financier & Vues SQL

VTC HUB fournit une infrastructure de reporting robuste basée sur des vues SQL optimisées. Ces vues permettent d'extraire des données agrégées pour la comptabilité et le pilotage de l'activité.

---

## 1️⃣ Vues Disponibles

### 📊 `financial_monthly_summary`

Résumé mensuel par tenant.

- **Colonnes** : `month`, `year`, `tenant_id`, `gross_revenue` (TTC), `net_revenue` (HT), `vat_total`, `commission_total`, `refund_total`.
- **Usage** : Dashboard mensuel, préparation déclaration TVA.

### 📅 `financial_yearly_summary`

Résumé annuel pour le bilan comptable.

- **Usage** : Clôture d'exercice, comparaison N-1.

### 🧾 `financial_fiscal_detail`

Vue granulaire de chaque mouvement financier.

- **Usage** : Audit de transaction, export pour expert-comptable.

---

## 2️⃣ Logique de Calcul

Le reporting ne se base pas sur les `bookings` (qui peuvent changer) mais sur les `financial_movements` (immutables).

- **Brut (TTC)** : Somme des directions `credit` (payment) moins somme des directions `debit` (refund).
- **TVA** : Somme des `vat_amount`.
- **Commission** : Somme des mouvements de type `commission` (débit plateforme).

---

## 3️⃣ Sécurité & Multi-tenant

Toutes les vues respectent les politiques **RLS (Row Level Security)**. Un tenant ne peut voir que ses propres statistiques financières. Les administrateurs de la plateforme peuvent voir l'ensemble des données via `service_role`.

---

## 4️⃣ Évolutions Futures

- Export CSV direct depuis le dashboard.
- Graphiques de tendance de revenus.
- Calcul automatique de la rentabilité par chauffeur.
