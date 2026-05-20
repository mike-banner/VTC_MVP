# Module Notifications — VTC HUB

## Rôle (Prévu V2/Phase 4)
Notification des chauffeurs et clients lors des événements clés de la course.

## Canaux Prévus
- **Emails (Resend/SendGrid)** : Confirmation de commande client, factures PDF, création de compte tenant.
- **SMS (Twilio)** : Alertes terrain (ex: "Votre chauffeur est en route").

## Triggers Métier
- `booking.status = 'paid'` -> Envoi email confirmation client.
- `mission_status = 'completed'` -> Envoi facture PDF par email au client.
