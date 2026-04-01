# 🚀 Évolution (FUTUR)

## 🎯 Recommandations Audit (2026-03-28)

- [ ] **Fiabilisation Webhook** : Ajouter un système de retry ou de notification d'échec pour la création de booking post-paiement. (Critique)
- [ ] **Dashboard Chauffeur** : Priorité absolue pour transformer le MVP en outil opérationnel. (v5.0 déployé)
- [ ] **Facturation PDF** : Système robuste de génération et d'envoi automatique de factures post-course. (Priorité Haute)
- [ ] **Unit Testing** : Implémenter des tests automatisés pour les fonctions critiques (calcul de prix, transitions de statuts).
- [ ] **Refacto RLS Profiles** : Permettre au `tenant_owner` de voir les profils de ses membres.

## 💡 Idées & Backlog

- [ ] **Fiabilité** : Bouton "Retry" sur les réservations en échec (refund_failed / payment_failed).
- [ ] **Paiement** : Intégration du paiement en **Cash**.
- [ ] **Gestion** : Timing et gestion du retard client.
- [ ] **Réseau** : Système de parrainage / partage de courses entre tenants.
- [ ] **Compta** : Statistiques avancées et export comptable automatisé. (Ledger Fiscal Mensuel/Annuel)
- [ ] **Note & Avis** : Système de QR Code dynamique pour permettre aux clients de noter chaque course depuis le téléphone du chauffeur.
- [ ] **Emailing Note** : Permettre au chauffeur d'envoyer le lien de notation par mail post-course si le client n'a pas scanné le QR Code.
