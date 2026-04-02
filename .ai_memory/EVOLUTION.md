# 🚀 Évolution (FUTUR)

## 🎯 Recommandations Audit (2026-03-28)

- [ ] **Fiabilisation Webhook** : Ajouter un système de retry ou de notification d'échec pour la création de booking post-paiement. (Critique)
- [x] **Dashboard Chauffeur** : Priorité absolue pour transformer le MVP en outil opérationnel. (Elite Dashboard v5.1 Déployé)
- [ ] **Facturation PDF** : Système robuste de génération et d'envoi automatique de factures post-course. (Priorité Haute - Fondations posées dans le Ledger)
- [ ] **Unit Testing** : Implémenter des tests automatisés pour les fonctions critiques (calcul de prix, transitions de statuts).
- [ ] **Refacto RLS Profiles** : Permettre au `tenant_owner` de voir les profils de ses membres.

## 💡 Idées & Backlog

- [ ] **Fiabilité** : Bouton "Retry" sur les réservations en échec (refund_failed / payment_failed).
- [ ] **Paiement** : Intégration du paiement en **Cash**.
- [ ] **Gestion** : Timing et gestion du retard client.
- [ ] **Réseau** : Système de parrainage / partage de courses entre tenants.
- [x] **Compta** : Statistiques avancées et export comptable automatisé. (Suivi Global Implémenté 2026-04-01)
- [ ] **Note & Avis** : Système de QR Code dynamique pour permettre aux clients de noter chaque course depuis le téléphone du chauffeur. (UI préparée dans le Dashboard)
- [ ] **Emailing Note** : Permettre au chauffeur d'envoyer le lien de notation par mail post-course si le client n'a pas scanné le QR Code.

## 🚀 Phase 7 : Flux de Course Dynamique (Roadmap 2026-04-02)

- [ ] **"Prendre en main"** : Déclenchement d'un email automatique au client lors de l'acceptation de la course par le chauffeur. Transition visuelle du bouton vers "Démarrer la course".
- [ ] **Verrouillage Temporel** : Le bouton "Démarrer la course" ne s'active qu'à l'heure exacte de la prestation (H-15min tolerance plausible).
- [ ] **"Fin de course"** : Action de clôture qui déclenche :
  - L'émission immédiate de la facture PDF.
  - L'envoi automatique par email au passager.
  - L'affichage d'un QR Code unique de mission pour notation/avis.
- [ ] **Accessibilité QR** : Le QR code de mission doit rester accessible dans les détails de la course au niveau du Cockpit.
- [ ] **Archive Fiscale** : Liaison automatique de la facture générée au Ledger Fiscal (tenant_accounting_ledger).
