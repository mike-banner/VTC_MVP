

```
/PROJECT_STATE.md
```

---

# 📌 PROJECT_STATE — VTC HUB

## 🎯 Current Version: V1 — Stable ERP Foundation

VTC HUB est actuellement en **Version 1 (V1)**.

Cette version représente la **base ERP stable et vendable**.

---

# ✅ V1 — Active Scope

## 🏢 Multi-Tenant

* 1 tenant par entreprise
* Isolation stricte via `tenant_id`
* RLS activé
* Séparation `platform_role` / `tenant_role`

---

## 🔐 Auth & Activation

* Signup via Supabase Auth
* Onboarding staging
* Validation manuelle admin
* Activation atomique via `approve_onboarding_tx`
* Owner créé automatiquement

---

## 🚗 Booking Engine

* Création booking
* `distance_km` envoyé par frontend
* Recalcul prix côté backend
* Application `minimum_fare`
* Statuts :

  * pending
  * confirmed
  * completed
  * cancelled
* Liste bookings
* KPI dashboard simple

---

## 🚘 Vehicles

* Category
* Capacity
* 1..N véhicules par tenant

---

## 💰 Pricing

* base_price
* price_per_km
* minimum_fare
* 1 pricing active minimum

---

## 💳 Paiement

* Stripe optionnel
* Chaque tenant connecte SON Stripe
* Aucun encaissement centralisé
* Aucune marketplace

---

# 🚫 Explicitly Out of Scope (Not V1)

Les éléments suivants existent en base mais ne font PAS partie de V1 active :

* Commission plateforme automatique
* Cercle / circle_memberships
* Partage de courses
* Parrainage
* Commission réseau
* Marketplace
* Facturation automatique
* Export comptable
* ERP financier avancé
* Multi-driver permissions fines avancées

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
* Activation atomic via SQL
* Multi-tenant strict isolation
* Progressive feature activation (V2/V3/V4)

---

# ⚠️ Development Rule

Toute nouvelle fonctionnalité doit :

1. Respecter le périmètre V1 si elle est ajoutée maintenant.
2. Être explicitement marquée V2/V3/V4 sinon.
3. Ne jamais introduire de logique marketplace ou encaissement centralisé.

---

# 🎯 Current Objective

Stabiliser V1 pour :

* Production
* Vente du backoffice
* Vente du site optionnel
* Onboarding clients réels

---

Ce fichier sert de **verrou stratégique**.
Il évite toute dérive technique ou fonctionnelle.

---

Maintenant ton IDE est officiellement cadré.

---

Prochaine étape stratégique :

Tu veux qu’on passe en mode :

* 🔥 “V1 Production Hardening”
  ou
* 💼 “Structuration de l’offre commerciale” ?
