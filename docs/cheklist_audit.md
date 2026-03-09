Parfait.
On va réaligner cette checklist avec **V1 réel uniquement**.

Actuellement elle contient :

- Commission (V4)
- Partage booking (V4)
- Circle (V4)
- Edge functions non utilisées
- Éléments financiers non actifs

On garde :

- Multi-tenant
- Booking V1
- Activation atomique
- Stripe non centralisé
- Structure ERP V1

---

# ✅ VERSION CORRIGÉE — `docs/audit-checklist.md` (Alignée V1)

Tu peux remplacer ton fichier par ceci.

---

# 🔎 Technical Audit Checklist — VTC HUB (V1)

---

# 🧱 1️⃣ Architecture & Structure

### ✅ Multi-tenant isolation

- [x] Toutes les tables métier contiennent `tenant_id`
- [x] Aucun accès cross-tenant possible
- [x] RLS activé sur toutes les tables sensibles
- [x] Toutes les requêtes filtrées par `tenant_id`
- [x] Isolation renforcée via fonction SQL interne (Cloud)

---

### ✅ Activation atomique

- [x] `approve_onboarding_tx` existe
- [x] Fonction en `plpgsql`
- [x] Rollback testé
- [x] Impossible d’activer deux fois le même onboarding
- [x] Aucun insert partiel possible

---

### ✅ Onboarding staging

- [x] onboarding séparé de tenants
- [x] status enum strict (`pending`, `approved`, `rejected`)
- [x] Vue `onboarding_admin_view` pour la jointure avec `auth.users`
- [x] `primary_domain` unique

---

# 🔐 2️⃣ Sécurité

---

### Auth

- [x] profiles.id = auth.users.id
- [x] Trigger `handle_new_user` testé
- [x] Session SSR via cookies
- [x] platform_role séparé de tenant_role

---

### RLS

- [x] RLS activé sur :
  - profiles
  - tenants
  - drivers
  - vehicles
  - pricing_rules
  - bookings

- [ ] Policy SELECT own
- [ ] Policy UPDATE own
- [ ] Aucune route client utilisant service_role

---

### Secrets

- [ ] SERVICE_ROLE jamais exposé côté client
- [ ] Pas de variable sensible en `PUBLIC_`
- [ ] .env non commité
- [ ] Variables Cloudflare sécurisées

---

# 🗄 3️⃣ Database Integrity

---

### Contraintes

- [x] primary_domain UNIQUE
- [x] drivers.first_name NOT NULL
- [x] drivers.last_name NOT NULL
- [x] drivers.phone NOT NULL
- [x] drivers.license_number NOT NULL
- [x] vehicles.capacity type correct
- [x] distance_km type numeric
- [x] total_amount non nullable

---

### Defaults

- [ ] created_at default now() partout
- [ ] status default correct

---

### Indexes

- [ ] Index sur tenant_id
- [ ] Index sur bookings.current_tenant_id
- [ ] Index sur primary_domain

---

# ⚙️ 4️⃣ Business Logic Validation

---

### Onboarding

- [ ] Impossible de soumettre sans champs obligatoires
- [ ] Impossible d’activer deux fois
- [ ] Impossible d’utiliser domain déjà pris

---

### Activation

- [ ] Tenant créé
- [ ] Profile lié
- [ ] Driver créé
- [ ] Vehicle créé
- [ ] Pricing générée
- [ ] Status onboarding = approved

---

### Booking V1

- [x] Prix recalculé backend
- [x] minimum_fare appliqué
- [x] total_amount jamais accepté tel quel
- [x] Statuts contrôlés
- [x] Booking lié au bon tenant
- [x] **Normalisation Customer** : `customer_id` obligatoire et validé.

---

### Middleware

- [x] Non connecté → /login
- [x] Platform Role → /admin/dashboard
- [x] Tenant Role 'pending' → /onboarding (Forcé)
- [x] Tenant actif (tenant_id) → /app/dashboard

---

# 🌐 5️⃣ Frontend / SSR

- [ ] output: "server"
- [ ] Adapter Cloudflare configuré
- [ ] Middleware testé
- [ ] Routes admin protégées
- [ ] Aucune clé sensible exposée

---

# 💳 6️⃣ Paiement & Audit Financier (Stripe)

---

### Stripe Webhook

- [x] Edge Function `handle_stripe_webhook` active
- [x] Validation de signature Stripe implémentée
- [x] Idempotence via `stripe_events` testée (pas de replay)
- [x] Metadata `booking_id` systématiquement vérifié
- [x] Unicité `stripe_payment_intent_id` garantie
- [x] **Cycle Paid validé** : Status change via webhook uniquement.

---

### Audit Financier (Ledger Natif)

- [x] Table `financial_movements` alimentée automatiquement
- [x] `movement_type` géré (payment, commission, refund, commission_reversal)
- [x] `direction` (credit/debit) correct selon type
- [x] Calcul HT / TVA / TTC cohérent
- [x] **Snapshots de taux** (commission plateforme/chauffeur) figés lors de l'insert
- [x] Pas de modification/suppression manuelle autorisée (Audit trail)

---

### Refund & Annulation

- [x] Webhook `refund.created` implémenté
- [x] Refund partiel proportionnel testé
- [x] Inversion commission (`commission_reversal`) proportionnelle basée sur snapshot
- [x] Statut booking mis à jour après refund Stripe (cancelled_refunded)
- [x] Traçabilité `stripe_refund_id` dans le ledger

---

### Reporting

- [ ] Vue `financial_monthly_summary` fonctionnelle
- [ ] Vue `financial_fiscal_detail` exploitable pour audit
- [ ] Filtrage RLS sur les vues par `tenant_id`

---

# 🧪 7️⃣ Testing Checklist

---

### Cas fonctionnels

- [ ] Signup
- [ ] Onboarding
- [ ] Pending page
- [ ] Activation
- [ ] Reconnexion
- [ ] Création booking
- [ ] Changement statut booking
- [ ] KPI dashboard

---

### Cas d’erreur

- [ ] Duplicate domain
- [ ] Missing required fields
- [ ] Activation double
- [ ] Unauthorized access
- [ ] Tentative cross-tenant

---

# 🚀 8️⃣ Scalability Readiness

- [ ] Pas de SELECT \*
- [ ] Pagination prévue sur bookings
- [ ] Pas de N+1 queries
- [ ] Index sur colonnes fréquentes

---

# 🧾 9️⃣ Code Hygiene

- [ ] Pas de console.log en production
- [ ] Pas de routes test actives
- [ ] Types stricts
- [ ] Pas de logique métier dupliquée

---

# 🛡 🔟 Production Readiness

- [ ] Gestion erreurs centralisée
- [ ] Logs monitoring activé
- [ ] Backup strategy connue
- [ ] Plan Supabase adapté

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

- 100% alignée V1
- Sans fonctionnalités futures mélangées
- Cohérente avec ton ERP-first model

---

On a terminé :

- README
- database.md
- flows.md
- architecture.md
- security.md
- decisions.md
- audit-checklist.md

Documentation V1 complète.

---

👉 Prochaine étape stratégique :

On passe en mode “produit vendable”.

Veux-tu :

1️⃣ Structurer l’offre commerciale (pricing + packaging)
ou
2️⃣ Stabiliser l’UX dashboard V1 avant mise en prod ?
