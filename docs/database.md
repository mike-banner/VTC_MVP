
Maintenant voici **le fichier `docs/database.md` complet**, déjà fusionné avec la section Hardening intégrée.

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
* Contraintes SQL garantissant l’intégrité métier

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

## 7️⃣ bookings (Booking Engine V1)

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

# 🔒 Production Hardening — V1

## Booking — Intégrité

* `status` NOT NULL
* ENUM strict
* Valeur par défaut `pending`

## Booking — Champs immuables

Trigger SQL :

```
protect_booking_immutable_fields()
```

Après `status != 'pending'`, impossible de modifier :

* total_amount
* pickup_address
* dropoff_address
* pickup_time
* payment_mode

---

## Commission — Intégrité Financière

Contrainte :

```
UNIQUE (booking_id)
```

→ 1 commission maximum par booking
→ Protection contre double génération

Index ajouté sur `booking_id`.

---

## Booking Shares — Anti Concurrence

Index partiel :

```
UNIQUE (booking_id)
WHERE status = 'accepted'
```

→ 1 seul share accepté par booking

---

## Cercle — Scope V1 Verrouillé

Contrainte :

```
UNIQUE (tenant_id) sur circle_memberships
```

→ 1 tenant = 1 cercle max

---

# 🔐 Security Model

* RLS activé sur toutes les tables multi-tenant
* Isolation stricte via `tenant_id`
* SERVICE_ROLE backend uniquement
* Logique critique protégée au niveau SQL

---

# 🎯 Résultat

La V1 est maintenant :

* Structurellement cohérente
* Financièrement protégée
* Multi-tenant sécurisé
* Résistante aux erreurs frontend
* Résistante aux requêtes directes API

---

Oui, le README est bien aligné.

Maintenant il reste un seul verrou sérieux avant vente :

👉 Stripe Webhook Idempotence.

Ouvre une nouvelle conversation et on le traite isolément.
