
Voici une **documentation complète et structurée de la base Supabase**

```
/docs/database.md
```

---

# 📚 Database Documentation — VTC SaaS (Supabase)

## 🧠 Overview

Cette base de données supporte un SaaS multi-tenant pour chauffeurs VTC.

Principes fondamentaux :

* Multi-tenant strict
* Isolation via `tenant_id`
* Auth séparée (`auth.users`)
* Activation transactionnelle via `approve_onboarding_tx`
* RLS activé sur les tables sensibles

---

# 🏢 Multi-Tenant Architecture

Chaque chauffeur = 1 `tenant`.

Toutes les données métier sont isolées via :

```
tenant_id uuid
```

Les tables liées au tenant :

* drivers
* vehicles
* pricing_rules
* bookings
* commissions
* circles
* circle_memberships

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

# 🗂️ Tables Documentation

---

## 1️⃣ tenants

Représente un client SaaS (entreprise chauffeur).

| Column            | Type          | Notes                 |
| ----------------- | ------------- | --------------------- |
| id                | uuid (PK)     |                       |
| name              | text          | Nom entreprise        |
| primary_domain    | text (UNIQUE) | Domaine client        |
| stripe_account_id | text          | Stripe Connect        |
| commission_rate   | numeric       | Commission plateforme |
| created_at        | timestamptz   | default now()         |

Relations :

* 1:N drivers
* 1:N vehicles
* 1:N pricing_rules
* 1:N bookings

---

## 2️⃣ profiles

Lien entre auth.users et le tenant.

| Column     | Type        | Notes              |
| ---------- | ----------- | ------------------ |
| id         | uuid (PK)   | = auth.users.id    |
| tenant_id  | uuid        | null si non activé |
| role       | enum        | owner              |
| created_at | timestamptz |                    |

Important :

* Créé automatiquement via trigger
* `tenant_id` rempli après activation

---

## 3️⃣ onboarding (Staging Table)

Table temporaire avant activation.

| Column               | Type                      |
| -------------------- | ------------------------- |
| id                   | uuid                      |
| profile_id           | uuid                      |
| status               | enum (pending, processed) |
| company_name         | text                      |
| primary_domain       | text                      |
| phone                | text                      |
| first_name           | text                      |
| last_name            | text                      |
| vtc_license_number   | text                      |
| vehicle_brand        | text                      |
| vehicle_model        | text                      |
| plate_number         | text                      |
| capacity             | integer                   |
| service_categories   | text[]                    |
| default_base_price   | numeric                   |
| default_price_per_km | numeric                   |
| default_minimum_fare | numeric                   |
| created_at           | timestamptz               |
| validated_at         | timestamptz               |

Usage :

* Staging uniquement
* Supprimable après activation si besoin

---

## 4️⃣ drivers

Représente un chauffeur.

| Column         | Type            |
| -------------- | --------------- |
| id             | uuid            |
| tenant_id      | uuid            |
| first_name     | text (NOT NULL) |
| last_name      | text (NOT NULL) |
| phone          | text (NOT NULL) |
| license_number | text (NOT NULL) |
| created_at     | timestamptz     |

1 tenant = 1..N drivers

---

## 5️⃣ vehicles

Véhicules du chauffeur.

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

Notes :

* capacity = nombre passagers
* category = type de service (standard, premium…)

---

## 6️⃣ pricing_rules

Tarification par catégorie.

| Column           | Type        |
| ---------------- | ----------- |
| id               | uuid        |
| tenant_id        | uuid        |
| service_category | varchar     |
| base_price       | numeric     |
| price_per_km     | numeric     |
| minimum_fare     | numeric     |
| active           | boolean     |
| created_at       | timestamptz |

Un tenant peut avoir plusieurs règles selon service_category.

---

## 7️⃣ bookings

Réservation client.

| Column             | Type        |
| ------------------ | ----------- |
| id                 | uuid        |
| original_tenant_id | uuid        |
| current_tenant_id  | uuid        |
| client_name        | text        |
| pickup_address     | text        |
| dropoff_address    | text        |
| pickup_time        | timestamptz |
| total_amount       | numeric     |
| status             | enum        |
| payment_mode       | enum        |
| created_at         | timestamptz |

Support partage inter-tenant.

---

## 8️⃣ booking_shares

Gestion des partages de courses.

| Column                | Type        |
| --------------------- | ----------- |
| id                    | uuid        |
| booking_id            | uuid        |
| shared_by_tenant_id   | uuid        |
| accepted_by_tenant_id | uuid        |
| status                | enum        |
| shared_at             | timestamptz |
| accepted_at           | timestamptz |

---

## 9️⃣ commissions

Calcul commission plateforme.

| Column            | Type        |
| ----------------- | ----------- |
| id                | uuid        |
| booking_id        | uuid        |
| gross_amount      | numeric     |
| commission_rate   | numeric     |
| commission_amount | numeric     |
| created_at        | timestamptz |

---

## 🔟 circles & circle_memberships

Système de réseau / groupement de chauffeurs.

circles :

| Column               | Type        |
| -------------------- | ----------- |
| id                   | uuid        |
| name                 | text        |
| created_by_tenant_id | uuid        |
| created_at           | timestamptz |

circle_memberships :

| Column    | Type        |
| --------- | ----------- |
| id        | uuid        |
| circle_id | uuid        |
| tenant_id | uuid        |
| role      | text        |
| status    | text        |
| joined_at | timestamptz |

---

# 🔐 Security Model

* RLS activé sur tables multi-tenant
* Isolation via `tenant_id`
* profiles.id = auth.uid()
* approve_onboarding via RPC transactionnelle
* primary_domain unique

---

# 🔁 Critical Business Logic

### approve_onboarding_tx

Fonction transactionnelle SQL :

* Vérifie onboarding pending
* Crée tenant
* Lie profile
* Crée driver
* Crée vehicle
* Crée pricing_rules
* Met onboarding processed
* Rollback automatique si erreur

---

# 🧩 Design Decisions

* Onboarding = staging table
* Activation atomique SQL (pas JS)
* Multi-tenant strict
* Capacity stocké dans vehicles
* Category text flexible (peut devenir enum plus tard)
* service_categories array utilisé pour générer pricing_rules

---

# 📌 Future Improvements

* Enum strict pour category
* Audit log table
* Soft delete
* Status workflow avancé
* Multi-driver par tenant
* Multi-vehicle pricing dynamic

---