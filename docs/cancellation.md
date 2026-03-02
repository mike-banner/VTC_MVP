# 🛡️ Moteur d'Annulation & Refund (Engine V1)

Le système d'annulation de VTC HUB est automatisé et basé sur des politiques versionnées attachées à chaque réservation au moment du paiement.

---

## 1️⃣ Moteur de Politiques (`cancellation_policies`)

Chaque tenant définit sa politique active. Lorsqu'un client paie, l'ID de la politique active est copié dans `bookings.cancellation_policy_id`. Cela garantit que même si le chauffeur change ses règles plus tard, la réservation reste soumise aux règles acceptées au moment de l'achat.

### Paramètres de la Politique :

- **Full Refund** : Seuil d'heures avant la course pour un remboursement à 100%.
- **Partial Refund** : Seuil d'heures et taux (ex: 50%) pour un remboursement partiel.
- **No-Show** : Taux de remboursement en cas d'absence client (généralement 0%).
- **Driver Fault** : Taux de remboursement si le chauffeur ne se présente pas (généralement 100%).

---

## 2️⃣ Logique de Remboursement

Le calcul est effectué par la Edge Function `calculate-refund` :

1. Comparaison entre `pickup_time` et `cancelled_at` pour déterminer le `deltaHours`.
2. Application du taux correspondant dans la politique liée.
3. Calcul du `refund_amount = total_amount * refund_rate`.

---

## 3️⃣ Workflow de Statuts

Le lifecycle d'une annulation suit un état de transition sécurisé :

1. `paid` (Statut initial payé)
2. `cancelled_pending_refund` (Remboursement Stripe initié, en attente de webhook)
3. `cancelled_refunded` (Confirmé par Stripe Webhook, audit financier généré)
4. _OU_ `cancelled_no_refund` (Annulé selon les règles sans remboursement dû)

---

## 4️⃣ Tracking & Audit

Chaque annulation enrichit le booking avec les données suivantes :

- `cancelled_at` : Timestamp précis de l'action.
- `cancellation_reason` : Motif (`client`, `no_show`, `driver_fault`, `platform_issue`).
- `cancellation_initiator` : Qui a déclenché l'annulation.
- `financial_movements` : Mouvements de type `refund` et `commission_reversal` créés automatiquement pour équilibrer la comptabilité.

---

## 5️⃣ Sécurité & Intégrité

- **Immuabilité** : Le `cancellation_policy_id` est verrouillé par trigger SQL après insertion.
- **Idempotence** : Le webhook Stripe empêche toute double insertion de mouvement financier de remboursement via `stripe_refund_id`.
- **Validation** : Seules les réservations au statut `paid` peuvent entrer dans le flux d'annulation automatisé.
