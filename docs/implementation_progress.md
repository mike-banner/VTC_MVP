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
- [x] **Zones & Forfaits** : Gestion des trajets fixes entre zones prédéfinies (Airport, Gare...).
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

## ✅ 4. En cours / À Finaliser (V1+)

- [x] **Dashboard Tenant** :
  - [x] **Vue "Missions en ligne"** : Affichage vertical fluide des prochaines courses.
  - [x] **Modale de Détails** : Clic sur une mission pour voir toutes les infos (Client, Trajet, Finance, Statut).
  - [x] **Distinction de service** : Badge visuel pour différencier les "Transferts" des "Mises à Dispo (Hourly)".
- [x] **Multi-Site (Tenant Slug)** : Isolation des tunnels de réservation par slug personnalisé (`site_slug`).
- [x] **Gestion des types de booking** : Ajout de l'énumération `hourly` et gestion visuelle dédiée dans l'ERP.
- [ ] **Export CSV Finance** : Bouton d'export des mouvements pour les experts-comptables depuis le frontend.
- [ ] **Gestion des Frais Stripe** : Arbitrage business sur la répercussion des frais fixes Stripe en cas de refund.

---

## ✅ 6. Validation V1 — Paiement & Normalisation (MARS 2026)

### 🔐 Normalisation Booking → Customer

- **Indépendance stricte** : Suppression des champs legacy `client_name` et `client_email` dans `bookings`.
- **Intégrité référentielle** : `bookings.customer_id` est désormais `NOT NULL`. Un booking ne peut pas exister sans client.
- **Réduction de redondance** : Les clients sont centralisés dans la table `customers` avec email normalisé (trim + lowercase).
- **Structure validée** : `passenger_count` obligatoire, répartition `subtotal_amount` + `vat_amount` = `total_amount`.

### 💳 Pipeline Stripe & Ledger

- **Cycle complet validé** : Du statut `accepted_pending_payment` vers `paid` via Webhook.
- **Source de Vérité** : Le statut `paid` est exclusivement déclenché par le webhook Stripe via l'Edge Function.
- **Financial Movement** : Insertion automatique d'un mouvement de type `payment` lors de la réussite du paiement.
- **Idempotence** : Protection contre le double traitement confirmée.

---

## 🔮 7. Roadmap Future (V2 - V4)

- [ ] **V1.1 (Operational)** :
  - [ ] **Driver Backoffice** (Tableau de bord chauffeur, actions accepter/refuser).
  - [ ] **Workflow Terrain** (En route, Arrivé, Terminé).
  - [ ] **Assignation Chauffeur** (Interface admin stable).
  - [ ] **Transitions Sécurisées SQL** (Trigger de validation des états).
- [ ] **V2 (Pro)** : Facturation automatique PDF, Multi-driver avancé, Analytics avancés.
- [ ] **V3 (ERP)** : Suivi des dépenses (essence, entretien), Gestion de flotte exhaustive.
- [ ] **V4 (Réseau)** : Cercles d'entreprises, Partage de courses entre tenants, Commissions réseau.

---

### 🛡️ Note sur la Documentation

Aucune information historique n'a été supprimée lors de la mise à jour. Les documents ont été migrés d'un état "Prévu" vers un état "Réel" pour refléter la maturité actuelle du code source.
