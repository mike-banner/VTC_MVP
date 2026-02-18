# 🏗 Architecture — VTC SaaS

## 🎯 Overview

Plateforme SaaS multi-tenant pour chauffeurs VTC.

Stack :

- Astro (SSR)
- Supabase (Postgres + Auth + RLS)
- Edge Functions
- RPC transactionnelle
- Cloudflare adapter

---

# 🧱 Architecture Logique

Client
↓
Astro SSR
↓
Supabase Auth
↓
Postgres (RLS + Multi-tenant)


---

# 🔁 Activation Flow

Signup
↓
auth.users
↓ (trigger)
profiles
↓
onboarding (status = pending)
↓
Admin validation
↓
approve_onboarding_tx()
↓
tenants + drivers + vehicles + pricing_rules


---

# 🧩 Multi-Tenant Model

Chaque chauffeur = 1 tenant.

Toutes les données métier isolées via :

tenant_id uuid


Isolation assurée par :

- RLS
- Middleware SSR
- profile.tenant_id

---

# 🔐 Middleware Strategy

Le middleware vérifie :

1. Session existante
2. profile.tenant_id
3. onboarding.status

Cas possibles :

- Non connecté → /login
- Connecté sans onboarding → /onboarding
- Pending → /pending
- Actif → /dashboard

---

# ⚙️ Activation Strategy

Activation via fonction SQL transactionnelle :

approve_onboarding_tx

Avantages :

- Atomicité
- Rollback automatique
- Base cohérente
- Pas de création partielle

---

# ☁️ Infrastructure

- output: "server"
- @astrojs/cloudflare
- Supabase Edge Functions
- RPC SQL transactionnelle

---

# 📌 Design Principles

- Isolation stricte
- Zéro création partielle
- Onboarding staging
- Activation manuelle admin
- Domaine unique par tenant
