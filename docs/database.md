Maintenant voici **le fichier `docs/database.md` complet**, déjà fusionné avec la section Hardening intégrée.

---

# 📚 Database Documentation — VTC HUB (Supabase)

## 🧠 Overview

Base de données d’un ERP SaaS multi-tenant pour chauffeurs VTC.

Principes :

- Multi-tenant strict
- Isolation via `tenant_id`
- Auth séparée (`auth.users`)
- Activation transactionnelle (`approve_onboarding_tx`)
- RLS activé sur tables métier
- Contraintes SQL garantissant l’intégrité métier

---

# 🏢 Multi-Tenant Architecture

Chaque entreprise = 1 `tenant`.

Isolation garantie par :

```
tenant_id uuid
```

Tables liées au tenant (V1 actif) :

- drivers
- vehicles
- pricing_rules
- bookings

---

# 🔐 Auth Flow

```
auth.users
   ↓ (trigger)
profiles
   ↓
onboarding (staging)
   ↓
approve_onboarding_tx()
   ↓
tenants + drivers + vehicles + pricing_rules
```

---

# 🗂️ Tables — V1 Actives

---

## 1️⃣ tenants

Entreprise cliente SaaS.

| Column            | Type        | Notes             |
| ----------------- | ----------- | ----------------- |
| id                | uuid (PK)   |                   |
| name              | text        | Nom entreprise    |
| site_slug         | text UNIQUE | Slug personnalisé |
| primary_domain    | text UNIQUE | Domaine client    |
| stripe_account_id | text        | Stripe optionnel  |
| commission_rate   | numeric     | Réservé V2+       |
| created_at        | timestamptz | default now()     |

Relations :

- 1:N drivers
- 1:N vehicles
- 1:N pricing_rules
- 1:N bookings
- 1:N financial_movements

🔒 RLS : Filtrage strict par `tenant_id`
🔒 Isolation : Fonction `current_tenant_id()` utilisée dans les politiques.
🔒 Service_Role : Accès bypass (Edge Functions uniquement).

## 2️⃣ profiles

Lien auth → tenant.

| Column        | Type        | Notes                        |
| ------------- | ----------- | ---------------------------- |
| id            | uuid (PK)   | = auth.users.id              |
| tenant_id     | uuid        | null si non activé           |
| tenant_role   | enum        | owner / manager / driver     |
| platform_role | enum        | super_admin / platform_staff |
| first_name    | text        | V1 utilisé                   |
| last_name     | text        | V1 utilisé                   |
| created_at    | timestamptz |                              |

---

## 3️⃣ onboarding (Staging)

Table temporaire avant activation.

| Column               | Type                     |
| -------------------- | ------------------------ |
| id                   | uuid                     |
| profile_id           | uuid                     |
| status               | enum (pending, approved) |
| company_name         | text                     |
| primary_domain       | text                     |
| phone                | text                     |
| first_name           | text                     |
| last_name            | text                     |
| vtc_license_number   | text                     |
| vehicle_brand        | text                     |
| vehicle_model        | text                     |
| plate_number         | text                     |
| capacity             | integer                  |
| service_categories   | text[]                   |
| default_base_price   | numeric                  |
| default_price_per_km | numeric                  |
| default_minimum_fare | numeric                  |
| created_at           | timestamptz              |
| validated_at         | timestamptz              |

🔒 RLS activé
Lecture limitée au propriétaire ou admin plateforme
Aucun UPDATE autorisé hors service role

---

## 4️⃣ drivers

| Column         | Type                        |
| -------------- | --------------------------- |
| id             | uuid                        |
| tenant_id      | uuid                        |
| user_id        | uuid (unique → profiles.id) |
| first_name     | text                        |
| last_name      | text                        |
| phone          | text                        |
| license_number | text                        |
| created_at     | timestamptz                 |

---

## 5️⃣ vehicles

| Column       | Type        |
| ------------ | ----------- |
| id           | uuid        |
| tenant_id    | uuid        |
| driver_id    | uuid        |
| brand        | text        |
| model        | text        |
| plate_number | text        |
| category     | text        |
| capacity     | integer     |
| created_at   | timestamptz |

---

## 6️⃣ pricing_rules

| Column           | Type        |
| ---------------- | ----------- |
| id               | uuid        |
| tenant_id        | uuid        |
| service_category | text        |
| base_price       | numeric     |
| price_per_km     | numeric     |
| minimum_fare     | numeric     |
| active           | boolean     |
| created_at       | timestamptz |

---

## 7️⃣ zones

| Column     | Type        |
| ---------- | ----------- |
| id         | uuid        |
| tenant_id  | uuid        |
| name       | text        |
| created_at | timestamptz |

---

## 8️⃣ fixed_routes (Forfaits)

| Column           | Type        | Notes                          |
| ---------------- | ----------- | ------------------------------ |
| id               | uuid        |                                |
| tenant_id        | uuid        |                                |
| pickup_zone_id   | uuid        | FK zones                       |
| dropoff_zone_id  | uuid        | FK zones                       |
| vehicle_category | text        |                                |
| price            | numeric     |                                |
| is_bidirectional | boolean     | Appliquable dans les deux sens |
| active           | boolean     |                                |
| created_at       | timestamptz |                                |

---

## 9️⃣ customers

| Column     | Type        | Notes         |
| ---------- | ----------- | ------------- |
| id         | uuid        |               |
| tenant_id  | uuid        |               |
| email      | text        | Unique/Tenant |
| first_name | text        |               |
| last_name  | text        |               |
| phone      | text        |               |
| created_at | timestamptz |               |

---

## 🔟 bookings (Booking Engine V1)

| Column                   | Type                                                 | Notes                                   |
| ------------------------ | ---------------------------------------------------- | --------------------------------------- |
| id                       | uuid (PK)                                            |                                         |
| original_tenant_id       | uuid                                                 | Tenant créateur                         |
| current_tenant_id        | uuid                                                 | Tenant gérant actuellement              |
| customer_id              | uuid                                                 | FK customers                            |
| pickup_address           | text                                                 |                                         |
| dropoff_address          | text                                                 |                                         |
| pickup_time              | timestamptz                                          |                                         |
| distance_km              | numeric                                              |                                         |
| total_amount             | numeric                                              | Montant TTC total                       |
| status                   | enum                                                 | Voir ci-dessous                         |
| driver_id                | uuid (nullable)                                      |                                         |
| cancelled_at             | timestamptz (nullable)                               | Date d'annulation                       |
| cancellation_reason      | enum (client, no_show, driver_fault, platform_issue) | Motif précis                            |
| cancellation_initiator   | text (nullable)                                      | client / driver / admin                 |
| cancellation_policy_id   | uuid (FK)                                            | Politique appliquée à cette réservation |
| stripe_payment_intent_id | text (nullable)                                      | Référence paiement Stripe               |
| created_at               | timestamptz                                          |                                         |

### Statuts Booking (Lifecycle complet)

- `pending` : En attente.
- `accepted_pending_payment` : Accepté par le chauffeur, Stripe en attente.
- `paid` : Paiement Stripe confirmé par webhook.
- `completed` : Course terminée.
- `cancelled_pending_refund` : Annulé, remboursement API Stripe initié.
- `cancelled_refunded` : Annulé, remboursement Stripe validé par webhook.
- `cancelled_no_refund` : Annulé sans remboursement (selon politique).

---

## 8️⃣ cancellation_policies (Versioned Policies)

Définit les règles de remboursement par tenant.

| Column                      | Type        | Notes                                    |
| --------------------------- | ----------- | ---------------------------------------- |
| id                          | uuid (PK)   |                                          |
| tenant_id                   | uuid        |                                          |
| version                     | integer     | Incrément automatique                    |
| active                      | boolean     | Une seule active par tenant              |
| hours_before_full_refund    | integer     | Temps avant 100% remboursement           |
| hours_before_partial_refund | integer     | Temps avant remboursement partiel        |
| partial_refund_rate         | numeric     | % remboursé (ex: 0.5)                    |
| no_show_refund_rate         | numeric     | % remboursé en cas de no-show (0)        |
| driver_fault_refund_rate    | numeric     | % remboursé en cas de faute chauffeur(1) |
| created_at                  | timestamptz |                                          |

---

## 9️⃣ financial_movements (Audit Comptable - Ledger Natif)

Table unique remplaçant `booking_commissions` et `refunds`. Elle sert d'audit financier immuable.

| Column                            | Type               | Notes                                  |
| --------------------------------- | ------------------ | -------------------------------------- |
| id                                | uuid (PK)          |                                        |
| booking_id                        | uuid               | Lien booking                           |
| tenant_id                         | uuid               | Isolation SaaS                         |
| movement_type                     | enum               | payment, commission, refund, etc.      |
| direction                         | enum               | credit, debit                          |
| gross_amount                      | numeric            | Montant TTC                            |
| net_amount                        | numeric            | Montant HT                             |
| vat_amount                        | numeric            | Montant TVA                            |
| platform_commission_amount        | numeric            | Montant commission plateforme          |
| platform_commission_rate_snapshot | numeric            | Taux plateforme au moment du mouvement |
| driver_commission_amount          | numeric            | Montant commission chauffeur (V2)      |
| driver_commission_rate_snapshot   | numeric            | Taux chauffeur au moment du mouvement  |
| stripe_payment_intent_id          | text               | Référence Stripe                       |
| stripe_refund_id                  | text               | Si mouvement de type refund            |
| refund_ratio                      | numeric (nullable) | Ratio du refund précis (0.0 à 1.0)     |
| created_by_event                  | text               | ID de l'événement Stripe (Idempotence) |
| created_at                        | timestamptz        |                                        |

🔒 Immuabilité : Aucun UPDATE ou DELETE autorisé hors admin.
🔒 Audit Trail : Chaînage avec `stripe_events`.

---

## 🔟 stripe_events (Idempotence)

Stockage des événements Stripe pour éviter les doubles traitements.

| Column     | Type        | Notes                         |
| ---------- | ----------- | ----------------------------- |
| id         | text (PK)   | ID Stripe de l'événement      |
| type       | text        | checkout.session.completed... |
| processed  | boolean     | État du traitement            |
| created_at | timestamptz |                               |

---

# 📊 Vues de Reporting

Vues SQL optimisées pour les dashboards financiers :

- `financial_monthly_summary` : Agrégation par mois/tenant (HT, TVA, TTC, Commission, Refund).
- `financial_yearly_summary` : Agrégation annuelle.
- `financial_fiscal_detail` : Détail complet pour export TVA et audit financier exhaustif.

---

# 🔒 Production Hardening & Consistency

## Refund Integrity

- **Refund Ratio** : Calculé sur le `total_amount` et répercuté au pro-rata sur la TVA et la commission.
- **Audit Trail** : Les remboursements sont liés via `stripe_refund_id`.
- **Immuabilité** : Les mouvements financiers insérés sont en lecture seule pour garantir l'intégrité de l'audit.
- **Unicité** : Index unique `unique_active_policy_per_tenant` assurant qu'une seule politique est applicable à un instant T.

---

# 🎯 Résultat

La V1 est maintenant :

- Structurellement cohérente avec audit financier.
- Financièrement protégée (double paiement/refund).
- Multi-tenant sécurisé.
- Prête pour le reporting fiscal automatique.
