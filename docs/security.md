# 🔐 Security Model

## 🎯 Core Principles

- Multi-tenant strict isolation
- Row Level Security activé
- Aucun accès cross-tenant
- Activation contrôlée

---

# 🔑 Auth Layer

- Supabase Auth
- profiles.id = auth.users.id
- JWT géré via cookies SSR

---

# 🛡 RLS

RLS activé sur :

- profiles
- tenants
- drivers
- vehicles
- pricing_rules
- bookings

Isolation via :

tenant_id = profile.tenant_id


---

# 🔒 Activation Protection

approve_onboarding_tx :

- Vérifie status pending
- Transaction atomique
- Rollback automatique

---

# 🚫 Protection Domain

primary_domain UNIQUE

Empêche collision multi-tenant.

---

# 🔍 Attack Surface Minimization

- Pas de service_role exposée côté client
- Activation via API interne
- Middleware SSR obligatoire

---

# 📌 Future Hardening

- Audit logs
- Rate limiting
- Webhook validation
- CSP headers