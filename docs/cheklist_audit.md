Parfait.
On va réaligner cette checklist avec **V1 réel uniquement**.

Actuellement elle contient :

* Commission (V4)
* Partage booking (V4)
* Circle (V4)
* Edge functions non utilisées
* Éléments financiers non actifs

On garde :

* Multi-tenant
* Booking V1
* Activation atomique
* Stripe non centralisé
* Structure ERP V1

---

# ✅ VERSION CORRIGÉE — `docs/audit-checklist.md` (Alignée V1)

Tu peux remplacer ton fichier par ceci.

---

# 🔎 Technical Audit Checklist — VTC HUB (V1)

---

# 🧱 1️⃣ Architecture & Structure

### ✅ Multi-tenant isolation

* [ ] Toutes les tables métier contiennent `tenant_id`
* [ ] Aucun accès cross-tenant possible
* [ ] RLS activé sur toutes les tables sensibles
* [ ] Toutes les requêtes filtrées par `tenant_id`

---

### ✅ Activation atomique

* [ ] `approve_onboarding_tx` existe
* [ ] Fonction en `plpgsql`
* [ ] Rollback testé
* [ ] Impossible d’activer deux fois le même onboarding
* [ ] Aucun insert partiel possible

---

### ✅ Onboarding staging

* [ ] onboarding séparé de tenants
* [ ] status enum strict (`pending`, `approved`)
* [ ] Impossible d’activer si status != pending
* [ ] `primary_domain` unique

---

# 🔐 2️⃣ Sécurité

---

### Auth

* [ ] profiles.id = auth.users.id
* [ ] Trigger `handle_new_user` testé
* [ ] Session SSR via cookies
* [ ] platform_role séparé de tenant_role

---

### RLS

* [ ] RLS activé sur :

  * profiles
  * tenants
  * drivers
  * vehicles
  * pricing_rules
  * bookings
* [ ] Policy SELECT own
* [ ] Policy UPDATE own
* [ ] Aucune route client utilisant service_role

---

### Secrets

* [ ] SERVICE_ROLE jamais exposé côté client
* [ ] Pas de variable sensible en `PUBLIC_`
* [ ] .env non commité
* [ ] Variables Cloudflare sécurisées

---

# 🗄 3️⃣ Database Integrity

---

### Contraintes

* [ ] primary_domain UNIQUE
* [ ] drivers.first_name NOT NULL
* [ ] drivers.last_name NOT NULL
* [ ] drivers.phone NOT NULL
* [ ] drivers.license_number NOT NULL
* [ ] vehicles.capacity type correct
* [ ] distance_km type numeric
* [ ] total_amount non nullable

---

### Defaults

* [ ] created_at default now() partout
* [ ] status default correct

---

### Indexes

* [ ] Index sur tenant_id
* [ ] Index sur bookings.current_tenant_id
* [ ] Index sur primary_domain

---

# ⚙️ 4️⃣ Business Logic Validation

---

### Onboarding

* [ ] Impossible de soumettre sans champs obligatoires
* [ ] Impossible d’activer deux fois
* [ ] Impossible d’utiliser domain déjà pris

---

### Activation

* [ ] Tenant créé
* [ ] Profile lié
* [ ] Driver créé
* [ ] Vehicle créé
* [ ] Pricing générée
* [ ] Status onboarding = approved

---

### Booking V1

* [ ] Prix recalculé backend
* [ ] minimum_fare appliqué
* [ ] total_amount jamais accepté tel quel
* [ ] Statuts contrôlés
* [ ] Booking lié au bon tenant

---

### Middleware

* [ ] Non connecté → /login
* [ ] Platform → /admin
* [ ] Tenant actif → /app/dashboard
* [ ] Aucun accès /app sans tenant_id

---

# 🌐 5️⃣ Frontend / SSR

* [ ] output: "server"
* [ ] Adapter Cloudflare configuré
* [ ] Middleware testé
* [ ] Routes admin protégées
* [ ] Aucune clé sensible exposée

---

# 💳 6️⃣ Paiement (V1)

* [ ] Stripe optionnel
* [ ] Chaque tenant connecte SON compte
* [ ] Aucun flux financier centralisé
* [ ] Pas de logique financière côté frontend

---

# 🧪 7️⃣ Testing Checklist

---

### Cas fonctionnels

* [ ] Signup
* [ ] Onboarding
* [ ] Pending page
* [ ] Activation
* [ ] Reconnexion
* [ ] Création booking
* [ ] Changement statut booking
* [ ] KPI dashboard

---

### Cas d’erreur

* [ ] Duplicate domain
* [ ] Missing required fields
* [ ] Activation double
* [ ] Unauthorized access
* [ ] Tentative cross-tenant

---

# 🚀 8️⃣ Scalability Readiness

* [ ] Pas de SELECT *
* [ ] Pagination prévue sur bookings
* [ ] Pas de N+1 queries
* [ ] Index sur colonnes fréquentes

---

# 🧾 9️⃣ Code Hygiene

* [ ] Pas de console.log en production
* [ ] Pas de routes test actives
* [ ] Types stricts
* [ ] Pas de logique métier dupliquée

---

# 🛡 🔟 Production Readiness

* [ ] Gestion erreurs centralisée
* [ ] Logs monitoring activé
* [ ] Backup strategy connue
* [ ] Plan Supabase adapté

---

# 🧠 Audit Outcome

### 🟢 Green

ERP V1 stable et prêt à vendre.

### 🟡 Yellow

Fonctionnel mais fragile.

### 🔴 Red

Risque sécurité ou incohérence données.

---

# 🎯 Résultat

Ta documentation est maintenant :

* 100% alignée V1
* Sans fonctionnalités futures mélangées
* Cohérente avec ton ERP-first model

---

On a terminé :

* README
* database.md
* flows.md
* architecture.md
* security.md
* decisions.md
* audit-checklist.md

Documentation V1 complète.

---

👉 Prochaine étape stratégique :

On passe en mode “produit vendable”.

Veux-tu :

1️⃣ Structurer l’offre commerciale (pricing + packaging)
ou
2️⃣ Stabiliser l’UX dashboard V1 avant mise en prod ?
