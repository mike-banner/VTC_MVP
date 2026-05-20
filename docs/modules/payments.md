# Module Payments & Ledger — VTC HUB

## Rôle
Gestion des flux de paiement Stripe Connect, remboursements et tenue du grand livre fiscal immuable.

## Flux Stripe Connect Express
1. Le client paie via une session de paiement liée au `stripe_account_id` du tenant.
2. Webhook Stripe reçoit `checkout.session.completed` -> passe la course en `paid`.
3. Insertion de deux lignes immuables dans `financial_movements` :
   - Crédit : Paiement client brut (`gross_amount`).
   - Débit : Commission plateforme (`commission_amount` basé sur `platform_fee_rate`).

## Annulation et Remboursements
- Les remboursements déclenchent un mouvement inverse de débit `refund` et de crédit `commission_reversal`.
- L'audit financier complet est garanti par l'immuabilité de la table `financial_movements` (bloquée en UPDATE/DELETE via triggers).
