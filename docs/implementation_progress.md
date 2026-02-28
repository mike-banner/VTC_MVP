# 📋 État d'Avancement du Projet — VTC HUB (MVP -> V1)

Ce document récapitule l'ensemble des fonctionnalités implémentées depuis le début du projet et liste les tâches restantes pour les versions futures.

---

## ✅ 1. Fondations & Multi-Tenant (TERMINÉ)

- [x] **Isolation stricte** : Architecture basée sur `tenant_id` sur toutes les tables métiers.
- [x] **Sécurité (RLS)** : Politiques Row Level Security pour garantir qu'un tenant ne voit que ses données.
- [x] **Auth & Profiles** : Intégration Supabase Auth liée à un profil utilisateur avec rôles (`platform_role`, `tenant_role`).
- [x] **Activation Atomique** : Procédure `approve_onboarding_tx` (SQL) pour créer un tenant, un chauffeur, un véhicule et des tarifs en une seule transaction.
- [x] **Onboarding Staging** : Gestion des inscriptions en attente de validation administrative.

---

## ✅ 2. Moteur de Réservation (TERMINÉ)

- [x] **Calcul Backend** : Recalcul systématique du prix côté serveur pour éviter les fraudes.
- [x] **Pricing Rules** : Gestion des tarifs de base, prix au km et tarif minimum par catégorie.
- [x] **Véhicules & Chauffeurs** : Gestion de la capacité des véhicules et des documents chauffeurs.
- [x] **Gestion des Statuts** : Workflow complet de `pending` à `completed` ou `cancelled`.

---

## ✅ 3. Système Financier & Stripe (TERMINÉ)

- [x] **Stripe Checkout** : Intégration du paiement sécurisé par tenant.
- [x] **Webhook Idempotent** : Edge Function `handle_stripe_webhook` avec protection contre les doubles traitements (`stripe_events`).
- [x] **Audit Comptable** : Table `financial_movements` traçant chaque flux (paiement, commission, refund).
- [x] **Refund Support** : Gestion des remboursements totaux et partiels avec recalcul automatique de la TVA et de la commission.
- [x] **Reporting SQL** : Vues `financial_monthly_summary` et `financial_yearly_summary` pour la comptabilité.

---

## 🟡 4. En cours / À Finaliser (V1+)

- [ ] **Moteur de Règles d'Annulation** : Implémentation de la logique automatique de remboursement selon le délai (implémenté en doc, à finaliser en code).
- [ ] **Export CSV Finance** : Bouton d'export des mouvements pour les experts-comptables depuis le frontend.
- [ ] **Dashboard Tenant** : Finalisation de l'interface graphique pour le suivi des revenus et refunds.
- [ ] **Gestion des Frais Stripe** : Arbitrage business sur la répercussion des frais fixes Stripe en cas de refund.

---

## 🔮 5. Roadmap Future (V2 - V4)

- [ ] **V2 (Pro)** : Facturation automatique PDF, Multi-driver avancé, Assignation manuelle/auto.
- [ ] **V3 (ERP)** : Suivi des dépenses (essence, entretien), Analytics avancés.
- [ ] **V4 (Réseau)** : Cercles d'entreprises, Partage de courses entre tenants, Commissions réseau.

---

### 🛡️ Note sur la Documentation

Aucune information historique n'a été supprimée lors de la mise à jour. Les documents ont été migrés d'un état "Prévu" vers un état "Réel" pour refléter la maturité actuelle du code source.
