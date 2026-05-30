# Module Notifications — VTC HUB

## Rôle (Prévu V2/Phase 4)
Notification des chauffeurs et clients lors des événements clés de la course.

## Canaux Prévus
- **Emails (Resend/SendGrid)** : Confirmation de commande client, factures PDF, création de compte tenant.
- **SMS (Twilio)** : Alertes terrain (ex: "Votre chauffeur est en route").

- Déclencheur Facturation : Statut de paiement finalisé (via Webhook Stripe ou validation chauffeur pour TPE/Cash) -> Envoi de la facture Factur-X par email.
