Voici la version mise à jour proprement après le hardening réel effectué en base.

Tu peux remplacer entièrement ton fichier par celui-ci.

---

```
/PROJECT_STATE.md
```

---

# 📌 PROJECT_STATE — VTC HUB

## 🎯 Current Version: V1 — Production-Ready ERP Foundation

VTC HUB est actuellement en **Version 1 (V1)**.

Cette version représente désormais une **base ERP stable, sécurisée et prête pour production réelle**.

Le hardening SQL a été appliqué.

---

# ✅ V1 — Active Scope

## 🏢 Multi-Tenant

* 1 tenant par entreprise
* Isolation stricte via `tenant_id`
* RLS activé sur toutes les tables sensibles
* `current_tenant_id()` utilisé dans les policies
* Séparation `platform_role` / `tenant_role`
* Aucune fuite inter-tenant possible au niveau DB

---

## 🔐 Auth & Activation

* Signup via Supabase Auth
* Onboarding staging isolé
* RLS activé sur `onboarding`
* Lecture limitée :

  * au propriétaire (`profile_id = auth.uid()`)
  * ou admin plateforme
* Validation manuelle admin
* Activation atomique via `approve_onboarding_tx`
* Owner créé automatiquement
* Aucune modification directe onboarding post création (hors service role)

---

## 🚗 Booking Engine

* Création booking
* `distance_km` envoyé par frontend
* Recalcul prix côté backend
* Application `minimum_fare`
* `status` ENUM strict
* `status` NOT NULL
* Statuts :

  * pending
  * confirmed
  * completed
  * cancelled

### 🔒 Hardening appliqué

* Impossible d’avoir `status = NULL`
* Trigger SQL protège champs critiques :

  * total_amount
  * pickup_address
  * dropoff_address
  * pickup_time
  * payment_mode
* Ces champs deviennent immuables dès que `status != pending`
* Protection contre modification frauduleuse après acceptation

---

## 🔁 Booking Shares (Infrastructure V4 non active)

Bien que hors scope V1, la structure est sécurisée :

* `status` NOT NULL
* Index partiel :

  * 1 seul share accepté par booking
* Protection contre double acceptation concurrente

---

## 🚘 Vehicles

* Category
* Capacity
* 1..N véhicules par tenant
* Isolation stricte RLS

---

## 💰 Pricing

* base_price
* price_per_km
* minimum_fare
* 1 pricing active minimum
* Isolation stricte RLS

---

## 💳 Paiement

* Stripe optionnel
* Chaque tenant connecte SON Stripe
* Aucun encaissement centralisé
* Aucune marketplace

### 🔒 Hardening financier

* `commissions.booking_id` UNIQUE
* Impossible d’avoir 2 commissions pour un booking
* Sécurité déplacée au niveau SQL (pas uniquement Edge Function)

---

# 🔐 Data Integrity Guarantees (Hardening V1)

Les protections suivantes sont maintenant assurées au niveau base :

* RLS activé partout
* Onboarding isolé
* Commission unique par booking
* Booking.status non nullable
* Booking immuable après pending
* Mono-cercle forcé (anti dérive V4)
* Index ajoutés sur colonnes critiques
* Protection contre race conditions sur acceptation share

---

# 🚫 Explicitly Out of Scope (Not V1 Active)

Les éléments suivants existent en base mais ne font PAS partie de V1 active :

* Commission plateforme automatique
* Cercle / circle_memberships actif
* Partage de courses actif
* Parrainage
* Commission réseau
* Marketplace
* Facturation automatique
* Export comptable
* ERP financier avancé
* Multi-driver permissions fines avancées

La base est prête, mais les features restent désactivées stratégiquement.

---

# 🗺️ Roadmap Direction

## V2

* Multi-driver avancé
* Assignation chauffeur
* Facturation
* Permissions fines

## V3

* ERP financier complet
* Rapports avancés
* Suivi cash

## V4

* Réseau / Cercle
* Partage de courses
* Commission réseau

---

# 🧠 Design Principles Locked

* ERP-first, not marketplace
* No centralized financial handling
* Backend price validation mandatory
* Activation atomic via SQL transaction
* Multi-tenant strict isolation
* Hardening critique déplacé au niveau SQL
* Progressive feature activation (V2/V3/V4)

---

# ⚠️ Development Rule

Toute nouvelle fonctionnalité doit :

1. Respecter le périmètre V1 si ajoutée maintenant.
2. Être explicitement marquée V2/V3/V4 sinon.
3. Ne jamais introduire de logique marketplace ou encaissement centralisé.
4. Ne jamais déplacer une sécurité SQL vers du code frontend.

---

# 🎯 Current Objective

V1 est maintenant :

* Production-ready au niveau base
* Structurellement sécurisé
* Prêt pour vente réelle

Prochain verrou stratégique :

* Audit Stripe webhook (idempotence)
* Logging minimal d’audit
* Tests concurrentiels réels

---

Ce fichier sert de verrou stratégique et technique.
Il reflète désormais l’état réel du système.

---

Maintenant on décide :

🔥 Sécurisation Stripe webhook
ou
💼 Structuration de l’offre commerciale pour commencer à vendre ?
