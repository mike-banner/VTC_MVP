
---

# ✅ VERSION CORRIGÉE — `docs/database.md` (Alignée V1)

Tu peux remplacer ton fichier par ceci.

---

# 📚 Database Documentation — VTC HUB (Supabase)

## 🧠 Overview

Base de données d’un ERP SaaS multi-tenant pour chauffeurs VTC.

Principes :

* Multi-tenant strict
* Isolation via `tenant_id`
* Auth séparée (`auth.users`)
* Activation transactionnelle (`approve_onboarding_tx`)
* RLS activé sur tables métier

---

# 🏢 Multi-Tenant Architecture

Chaque entreprise = 1 `tenant`.

Isolation garantie par :

```
tenant_id uuid
```

Tables liées au tenant (V1 actif) :

* drivers
* vehicles
* pricing_rules
* bookings

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

| Column            | Type        | Notes            |
| ----------------- | ----------- | ---------------- |
| id                | uuid (PK)   |                  |
| name              | text        | Nom entreprise   |
| primary_domain    | text UNIQUE | Domaine client   |
| stripe_account_id | text        | Stripe optionnel |
| commission_rate   | numeric     | Réservé V2+      |
| created_at        | timestamptz | default now()    |

Relations :

* 1:N drivers
* 1:N vehicles
* 1:N pricing_rules
* 1:N bookings

---

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

---

## 4️⃣ drivers (V1 structure prête)

Représente un chauffeur métier.

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

Note :
En V1, un owner peut aussi être driver.

---

## 5️⃣ vehicles

Véhicules entreprise.

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

Tarification simple V1.

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

## 7️⃣ bookings (Booking Engine V1)

Réservation client.

| Column             | Type                                               |
| ------------------ | -------------------------------------------------- |
| id                 | uuid                                               |
| original_tenant_id | uuid                                               |
| current_tenant_id  | uuid                                               |
| client_name        | text                                               |
| pickup_address     | text                                               |
| dropoff_address    | text                                               |
| pickup_time        | timestamptz                                        |
| distance_km        | numeric                                            |
| total_amount       | numeric                                            |
| status             | enum (pending / confirmed / completed / cancelled) |
| driver_id          | uuid (nullable)                                    |
| created_at         | timestamptz                                        |

Prix recalculé côté backend.

---

# 🔐 Security Model

* RLS activé sur tables multi-tenant
* Isolation via tenant_id
* profiles.id = auth.uid()
* Activation via RPC transactionnelle
* SERVICE_ROLE uniquement backend

---

# 🔁 Critical Business Logic

## approve_onboarding_tx

Transaction atomique :

* Vérifie onboarding pending
* Crée tenant
* Met à jour profile
* Crée driver initial
* Crée véhicule
* Crée pricing_rules
* Passe onboarding approved
* Rollback si erreur

---

# 🚀 Versions Futures

## V2

* Permissions fines multi-driver
* Assignation chauffeur
* Facturation automatique
* Export comptable

## V3

* ERP financier avancé
* Rapports mensuels
* Suivi cash
* Analytics

## V4

* Cercle
* Partage de courses
* Commission réseau
* Parrainage

---

# 🎯 Résultat

Ta doc correspond maintenant :

* À ton V1 réel
* À ta vision ERP
* À ta roadmap

---