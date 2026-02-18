Parfait.
Voici une **checklist d’audit technique complète** adaptée à ton SaaS VTC multi-tenant.

À mettre dans :

```
/docs/audit-checklist.md
```

---

# 🔎 Technical Audit Checklist — VTC SaaS

---

# 🧱 1️⃣ Architecture & Structure

### ✅ Multi-tenant isolation

* [ ] Toutes les tables métier contiennent `tenant_id`
* [ ] Aucune table sensible sans isolation
* [ ] Aucun accès cross-tenant possible

### ✅ Activation atomique

* [ ] approve_onboarding_tx existe
* [ ] Fonction transactionnelle (plpgsql)
* [ ] Rollback testé en cas d’erreur
* [ ] Aucun insert partiel possible

### ✅ Onboarding staging

* [ ] onboarding séparé de tenants
* [ ] status enum strict
* [ ] Impossible d’activer si != pending

---

# 🔐 2️⃣ Sécurité

### Auth

* [ ] profiles.id = auth.users.id
* [ ] Trigger création profile testé
* [ ] Session SSR via cookies

### RLS

* [ ] RLS activé sur toutes les tables multi-tenant
* [ ] Policy select own
* [ ] Policy update own
* [ ] Aucun bypass via service_role côté client

### Secrets

* [ ] SERVICE_ROLE jamais exposé en PUBLIC_
* [ ] Variables .env non commitées
* [ ] Cloudflare env variables sécurisées

---

# 🗄 3️⃣ Database Integrity

### Contraintes

* [ ] primary_domain UNIQUE
* [ ] drivers.first_name NOT NULL
* [ ] drivers.last_name NOT NULL
* [ ] drivers.phone NOT NULL
* [ ] drivers.license_number NOT NULL
* [ ] vehicles.capacity correct type
* [ ] pricing_rules active default true

### Defaults

* [ ] created_at default now() partout
* [ ] Pas de colonne nullable critique

### Indexes

* [ ] Index sur tenant_id
* [ ] Index sur bookings.current_tenant_id
* [ ] Index sur primary_domain

---

# ⚙️ 4️⃣ Business Logic Validation

### Onboarding

* [ ] Impossible de soumettre sans champs obligatoires
* [ ] Impossible d’activer deux fois
* [ ] Impossible d’utiliser domain déjà pris

### Activation

* [ ] Tenant créé
* [ ] Profile lié
* [ ] Driver créé
* [ ] Vehicle créé
* [ ] Pricing générée
* [ ] Status onboarding = processed

### Middleware

* [ ] Non connecté → login
* [ ] Pending → /pending
* [ ] Actif → dashboard
* [ ] Impossible d’accéder dashboard sans tenant

---

# 🌐 5️⃣ Frontend / SSR

* [ ] output: "server"
* [ ] @astrojs/cloudflare configuré
* [ ] Middleware testé
* [ ] Routes admin protégées
* [ ] Aucune clé sensible côté client

---

# 💰 6️⃣ Financial Integrity

* [ ] commission_rate cohérent
* [ ] commissions calculées correctement
* [ ] total_amount non modifiable côté client
* [ ] Aucune logique financière en frontend

---

# 🧪 7️⃣ Testing Checklist

### Cas fonctionnels

* [ ] Signup
* [ ] Onboarding
* [ ] Pending page
* [ ] Activation
* [ ] Reconnexion
* [ ] Création booking
* [ ] Partage booking (si activé)

### Cas d’erreur

* [ ] Duplicate domain
* [ ] Missing required fields
* [ ] Activation double
* [ ] Unauthorized access
* [ ] Cross-tenant access attempt

---

# 🚀 8️⃣ Scalability Readiness

* [ ] Aucun SELECT *
* [ ] Pagination prévue sur bookings
* [ ] Pas de N+1 queries
* [ ] Index sur colonnes fréquentes
* [ ] Pricing scalable

---

# 🧾 9️⃣ Code Hygiene

* [ ] Pas de console.log en production
* [ ] Pas de routes test laissées actives
* [ ] Types stricts
* [ ] Fonctions Edge propres
* [ ] Aucune logique métier dupliquée

---

# 🛡 1️⃣0️⃣ Production Readiness

* [ ] Logs monitoring activé
* [ ] Error handling propre
* [ ] Backup strategy connue
* [ ] Supabase plan adapté
* [ ] Rate limiting futur prévu

---

# 🧠 Audit Outcome Levels

### 🟢 Green

Production ready SaaS.

### 🟡 Yellow

Fonctionnel mais fragile.

### 🔴 Red

Risque de corruption ou fuite données.

---

# 📌 Bonus : Self-Scoring System

Tu peux noter chaque section sur 10
et avoir un score global de maturité technique.

---

Quand tu voudras passer en version finale,
on fera :

* Diagramme ER propre
* Audit sécurité avancé
* Hardening checklist
* Préparation levée de fonds

---

