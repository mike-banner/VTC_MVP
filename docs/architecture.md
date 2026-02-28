---
# ✅ VERSION CORRIGÉE — `docs/architecture.md` (Alignée V1)

Tu peux remplacer ton fichier par ceci.
---

# 🏗 Architecture — VTC HUB (V1)

---

# 🎯 Overview

VTC HUB est un ERP SaaS multi-tenant pour chauffeurs VTC.

Architecture basée sur :

- Astro SSR (`output: "server"`)
- Supabase (Postgres + Auth + RLS)
- RPC SQL transactionnelles
- Cloudflare Adapter

La plateforme est conçue pour :

- Isolation stricte des tenants
- Activation atomique
- Séparation plateforme / entreprise

---

# 🧱 Architecture Logique

```
Client (SaaS Multi-tenant)
   ↓
Astro SSR (Routes + API)
   ↓
Edge Functions (Stripe Webhooks & Business Logic)
   ↓
Supabase Auth
   ↓
Postgres (RLS + Multi-tenant + Financial Engine)
```

---

# 💹 Audit Comptable & Layer Financière

VTC HUB intègre un moteur financier transactionnel. Chaque flux d'argent (paiement, commission, refund) est immutablement tracé.

- **Idempotence** : Aucun événement Stripe n'est traité deux fois (`stripe_events`).
- **Audit-Trail** : La table `financial_movements` contient l'historique brut des flux pour chaque tenant.
- **Vues Fiscales** : Les résumés mensuels et annuels sont calculés dynamiquement via des vues SQL (`financial_monthly_summary`).

---

# ⚡ Stripe Edge Integration

Le traitement des paiements est déporté dans des Edge Functions pour :

- **Sécurité** : Validation de signature Stripe.
- **Isolation** : Séparation de la logique de paiement du reste de l'ERP.
- **Performance** : Exécution rapide au plus proche de l'utilisateur.

---

# 🗂 Séparation des Routes

## 🌍 Plateforme

```
/admin/*
```

Accessible uniquement si :

```
platform_role != NULL
```

---

## 🏢 Application Entreprise

```
/app/*
```

Accessible uniquement si :

```
tenant_id != NULL
```

---

# 🔐 Auth & Rôles

## Couche Plateforme

- super_admin
- platform_staff

---

## Couche Tenant

- owner
- manager
- driver

Les rôles hiérarchiques sont stockés dans :

```
profiles.tenant_role
profiles.platform_role
```

---

# 🔁 Activation Flow

```
Signup
   ↓
auth.users
   ↓ (trigger handle_new_user)
profiles
   ↓
onboarding (status = pending)
   ↓
Admin validation
   ↓
approve_onboarding_tx()
   ↓
tenants + drivers + vehicles + pricing_rules
```

---

# ⚙️ Activation Strategy

Activation gérée par :

```
approve_onboarding_tx(uuid)
```

Caractéristiques :

- Transaction atomique
- Rollback automatique en cas d’erreur
- Création cohérente des entités
- Mise à jour profile centralisée

---

# 🧩 Multi-Tenant Model

Chaque entreprise possède :

```
tenant_id uuid
```

Isolation assurée par :

- Row Level Security (RLS)
- Middleware SSR
- Guards backend
- Filtrage systématique par tenant_id

---

# 🚗 Booking Engine & Annulation

## Statuts Financiers

Les bookings supportent désormais les statuts `paid`, `refunded` et `accepted_pending_payment`.

---

# 🔐 Middleware Strategy

Le middleware global vérifie :

1. Session active
2. profile.platform_role
3. profile.tenant_id

Cas possibles :

| Cas           | Redirection    |
| ------------- | -------------- |
| Non connecté  | /login         |
| platform_role | /admin         |
| tenant_id     | /app/dashboard |
| Aucun         | /onboarding    |

---

# ☁️ Infrastructure

- `output: "server"`
- Adapter Cloudflare
- Supabase Postgres
- RPC SQL transactionnelles

Aucune logique critique côté client.

---

# 📌 Design Principles

- Isolation stricte des données
- Séparation plateforme / entreprise
- Activation atomique
- Calcul métier validé backend
- Stripe non centralisé (chaque tenant indépendant)

---

# 🔮 Évolution Prévue

## V2

- Multi-driver avancé
- Assignation chauffeur
- Facturation
- Moteur de règles d'annulation (Moteur simple plateforme vs Configurable tenant).
- Refund automatique via backend.
- Dashboard financier agrégé.

## V3

- ERP financier complet
- Rapports avancés

## V4

- Réseau / Cercle
- Partage de courses
- Cercle & Réseau de chauffeurs avec commissions croisées.

---

# 🎯 Résultat

Ton architecture documentée correspond maintenant :

- À V1 réel
- À la séparation `/admin` / `/app`
- À la logique ERP
- À ta vision long terme

---

Nous avons maintenant :

- README aligné
- database.md aligné
- flows.md aligné
- architecture.md aligné

Base documentaire propre.

---
