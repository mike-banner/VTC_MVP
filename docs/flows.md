# ✅ VERSION CORRIGÉE — `docs/flows.md` (Alignée V1)

Tu peux remplacer ton fichier par ceci :

---

# 🔄 System Flows — VTC HUB (V1)

---

## 🟢 1️⃣ Signup Flow

1. User s’inscrit via Supabase Auth
2. `auth.users` est créé
3. Trigger `handle_new_user` crée une ligne dans `profiles`
4. `profiles.tenant_id = NULL`
5. User est redirigé vers `/onboarding`

---

## 🟡 2️⃣ Onboarding Flow

1. User remplit le formulaire onboarding
2. Insertion dans `onboarding` avec :

```
status = 'pending'
```

3. Redirection vers `/pending`
4. Accès au dashboard bloqué tant que non validé

---

## 🔵 3️⃣ Admin Validation Flow

1. Super Admin accède à `/admin`

2. Clique sur "Approve"

3. Appel RPC `approve_onboarding_tx(onboarding_uuid)`

4. Transaction atomique :
   - Vérifie que onboarding = pending
   - Crée `tenant`
   - Met à jour `profiles.tenant_id`
   - Met `tenant_role = owner`
   - Crée driver initial
   - Crée véhicule initial
   - Crée pricing_rules
   - Met `onboarding.status = approved`

5. User peut maintenant accéder au dashboard

---

## 🟢 4️⃣ Active User Flow

1. User login
2. Middleware SSR vérifie :
   - `platform_role` → accès `/admin`
   - `tenant_id` → accès `/app`
   - sinon → `/onboarding`

3. Accès au dashboard ERP

---

# 🚗 5️⃣ Booking Flow (V1 Actif)

## Création

1. Client crée une réservation (site ou backoffice)
2. Frontend envoie `distance_km`
3. Backend :
   - Récupère pricing_rules actif
   - Recalcule le prix
   - Applique minimum_fare
   - Insère booking

```
status = 'pending'
```

---

## Mise à jour statut

Owner peut modifier :

```
pending → confirmed → completed
pending → cancelled
```

---

## Affichage

Dashboard :

- Liste bookings
- KPI du jour
- KPI du mois
- Total brut

---

# 💳 6️⃣ Payment Flow (Stripe)

Le système utilise Stripe Checkout pour sécuriser les paiements.

1. **Client** initiate `checkout session`
2. **Stripe** redirects to hosted checkout
3. **Paiement réussi** → Stripe envoie `checkout.session.completed`
4. **Edge Function** (`handle_stripe_webhook`) :
   - Vérifie la signature du webhook
   - Vérifie si l'`event_id` est déjà traité (`stripe_events`)
   - Récupère le `booking_id` depuis les metadata
   - Met à jour `booking.status = paid`
   - Stocke le `stripe_payment_intent_id`
   - Génère les `financial_movements` :
     - Type **payment** (Crédit)
     - Type **commission** (Débit, si configurée)
   - Marque l'événement comme `processed`

---

# 💸 7️⃣ Cancellation & Refund Flow (Automated)

Le système gère les annulations selon des politiques versionnées (`cancellation_policies`).

### Étape 1 : Initialisation de l'annulation (`cancel-booking`)

1. **Appel API** avec `booking_id` et `reason`.
2. **Validation** : Le booking doit être au statut `paid`.
3. **Calcul** : La fonction récupère la politique active du tenant et calcule le `refund_rate` selon le délai (pickup vs now) et le motif.
4. **Stripe API** : Si un remboursement est dû, appel à `stripe.refunds.create`.
5. **Statut** : Le booking passe à `cancelled_pending_refund` (ou `cancelled_no_refund`).

### Étape 2 : Confirmation Webhook (`refund.created`)

1. **Webhook Stripe** reçoit l'événement.
2. **Idempotence** : Vérification dans `stripe_events`.
3. **Audit Financier** : Insertion d'un mouvement `refund` (Débit) et `commission_reversal` (Crédit) pro-rata.
4. **Finalisation** : Le booking passe au statut final `cancelled_refunded`.

L'audit financier permet de recalculer le Net par tenant après déduction des refunds réels.

---

# 🛡️ 8️⃣ Sécurité & Idempotence Stripe

- **Signature Check** : Chaque requête webhook est authentifiée via le secret Stripe.
- **Whitelist** : Uniquement `checkout.session.completed` et `refund.created` sont traités.
- **Idempotence** : Table `stripe_events` persistée. Si un événement arrive deux fois, il est ignoré.
- **Metadata atomicity** : Les IDs Stripe sont systématiquement liés aux `booking_id` pour garantir la traçabilité.

---

# 🪟 9️⃣ Reporting Financier

Le système expose des vues SQL pour le reporting :

- **TVA** : Calculée automatiquement sur chaque mouvement.
- **Audit exhaustif** : Vue `financial_fiscal_detail` pour le détail de chaque flux.
- **Agrégation** : Résumés mensuels et annuels automatiques.

---

# 🔮 Future Flows (Versions ultérieures)

## V2

- Dashboard financier temps réel par tenant avec graphiques.
- Export CSV natif depuis le frontend.

## V4

- Cercle & Partage de courses avec commissions complexes entre tiers.

---

# 🎯 Résultat

Le système de flux financiers est :

- **Production-ready** : Idempotence et sécurité Stripe gérées.
- **Audit-ready** : Chaque centime est tracé via `financial_movements`.
- **Consistency** : Politiques d'annulation attachées immuablement au moment du paiement.
