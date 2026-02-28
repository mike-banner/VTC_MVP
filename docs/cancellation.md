# 🚧 Règles d'Annulation (Policy Workflow)

VTC HUB implémente un moteur de gestion des annulations flexible, essentiel pour la rentabilité et la protection des chauffeurs.

---

## 1️⃣ Moteur de Règles (V1 simple)

Actuellement, les règles globales de la plateforme s'appliquent :

- **Annulation Client > 24h avant** : Remboursement 100%.
- **Annulation Client < 24h avant** : Remboursement 50%.
- **No-show Client** : Remboursement 0% (Paiement intégral conservé).
- **Annulation Chauffeur (Faute)** : Remboursement 100% (Débit du chauffeur si partagé).

---

## 2️⃣ Logique Backend (Prévue)

Le moteur de règles agira sur les `financial_movements` :

1. L'annulation déclenche un événement `booking_cancelled`.
2. Le moteur calcule le `refund_ratio` approprié selon la règle active.
3. Un mouvement financier de type `refund` est créé proportionnellement.
4. La commission plateforme (`commission`) est inversée (`commission_reversal`) proportionnellement.

---

## 3️⃣ Évolutions Futures (V2 Configurable)

- **Politique Personnalisée par Tenant** : Chaque chauffeur/entreprise pourra définir ses propres fenêtres de temps et taux de remboursement.
- **Politique par Chauffeur** : Différentes pénalités selon le statut du chauffeur.
- **Pénalité Plateforme Fine** : Frais de service Stripe conservés au besoin (choix business).

---

## 4️⃣ Tracking & Audit

Chaque annulation est documentée dans la table `bookings` :

- `cancelled_at` : Date et heure.
- `cancellation_reason` : Motif saisi par l'initiateur.
- `cancellation_initiator` : `client`, `driver` ou `admin`.

---

## 5️⃣ Statuts de Booking Liés

- **Refund Total (100%)** → `status = refunded`.
- **Refund Partiel (< 100%)** → `status = paid` (le paiement reste validé, avec une partie débitée).
