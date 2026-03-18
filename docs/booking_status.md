# Booking Status Rules for UI Display

## Database Enum: `booking_status`

| Database Value             | Meaning                                                          | UI Label (French)          |
| :------------------------- | :--------------------------------------------------------------- | :------------------------- |
| `pending`                  | Réservation créée, en attente d'acceptation par le chauffeur.    | **En attente**             |
| `accepted`                 | Réservation acceptée (paiement manuel ou hors ligne).            | **Confirmée**              |
| `accepted_pending_payment` | Acceptée, mais en attente de la confirmation du paiement Stripe. | **En attente de paiement** |
| `paid`                     | Paiement confirmé par Stripe. Réservation sécurisée.             | **Payée**                  |
| `completed`                | Course terminée.                                                 | **Terminée**               |
| `cancelled`                | Réservation annulée.                                             | **Annulée**                |
| `cancelled_pending_refund` | Annulée, remboursement en cours.                                 | **Remboursement en cours** |
| `cancelled_refunded`       | Annulée, remboursement effectué.                                 | **Remboursée**             |
| `cancelled_no_refund`      | Annulée sans remboursement.                                      | **Annulée**                |
| `no_show`                  | Le client ne s'est pas présenté.                                 | **Non présentation**       |
| `expired_payment`          | Le délai de paiement a expiré.                                   | **Paiement expiré**        |
| `refund_failed`            | Échec de la tentative de remboursement.                          | **Échec remboursement**    |
| `deprecated_refunded`      | Ancien statut de remboursement (obsolète).                       | **Remboursée**             |

## Implementation Rules

1. **Static Values**: Do not invent new status values. Use only those defined in the database enum.
2. **Source of Truth**: Always use the `status` column from the `bookings` table.
3. **UI Mapping**: The UI must consistently map these database values to the French labels listed above.
4. **Visual Cues**:
   - Statuses should often be accompanied by color codes (e.g., Green for `paid`/`completed`, Yellow for `pending`, Red for `cancelled`).
   - Action buttons (Cancel, Refund, Accept) must be conditionally displayed based on these statuses.
