# ✅ VERSION CORRIGÉE — `docs/flows.md` (Alignée V1)

Tu peux remplacer ton fichier par ceci :

---

# 🔄 System Flows — VTC HUB (V1)

---

## 🟢 1️⃣ Signup Flow

1. User s’inscrit via Supabase Auth
2. `auth.users` est créé
3. Trigger `handle_new_user` crée une ligne dans `profiles` avec `tenant_role = 'pending'`
4. Middleware détecte le rôle `pending` et force la redirection vers `/onboarding`

---

## 🟡 2️⃣ Onboarding Flow

1. User remplit le formulaire onboarding (Email pré-rempli depuis Auth)
2. Insertion dans `onboarding`
3. Middleware continue de forcer `/onboarding` tant que le profil est en `pending`
4. Accès au dashboard ERP bloqué

---

## 🔵 3️⃣ Admin Validation Flow

1. Super Admin accède à `/admin/onboardings` qui liste les dossiers via la vue `onboarding_admin_view`
2. Clique sur "Approuver"

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

# 💳 Flow : Paiement & Ledger Natif (Stripe)

1. **Checkout** : Le client paie via Stripe.
2. **Webhook Event** : Réception de `checkout.session.completed`.
3. **Idempotence** :
   - Insertion de l'ID event dans `stripe_events`.
   - Si duplication (409), arrêt immédiat.
4. **Validation Booking** : Passage du booking en `paid`.
5. **Ledger (Mouvement 1)** : Création d'un crédit `payment` avec `gross_amount` (TTC), `net_amount` (HT) et `vat_amount`.
6. **Snapshot Commission (Mouvement 2)** :
   - Lecture du `platform_fee_rate` actuel du tenant.
   - Création d'un débit `commission`.
   - **Important** : Le taux est sauvé dans `platform_commission_rate_snapshot`.

---

### 🔄 Flow : Refund & Inversion de Ledger

1. **Refund Trigger** : Initié via Dashboard Stripe ou API.
2. **Webhook Event** : Réception de `refund.created`.
3. **Protection Anti-collision** :
   - Vérification de l'existence du `stripe_refund_id` dans `financial_movements`.
   - Si déjà présent, arrêt (Idempotence).
4. **Calcul Ratio** : `refund_amount / booking.total_amount`.
5. **Inversion Ledger** :
   - Débit `refund` proportionnel au ratio.
   - **Inversion Commission** : Crédit `commission_reversal` basé sur le snapshot original multiplié par le ratio.
6. **Statut** : Mise à jour du booking en `cancelled_refunded`.

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
