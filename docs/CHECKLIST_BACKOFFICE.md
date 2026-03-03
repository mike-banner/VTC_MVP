# 🧠 BACKOFFICE CHECKLIST — VTC HUB (Repo 1)

Ce dépôt contient le cœur financier et administratif du SaaS.

---

## 🔐 1️⃣ Hardening Métier

- [x] **Isolation Multi-tenant** : Basée sur `tenant_id` sur toutes les tables.
- [x] **ENUM strict booking_status** : Cycle de vie complet implémenté.
- [x] **ENUM strict movement_type** : Aligné avec le ledger financier.
- [ ] **Trigger de transition** : Bloquer les changements de statut invalides en SQL.
- [ ] **Hardening Annulation** : Bloquer l'annulation après `pickup_time`.
- [ ] **Statuts spéciaux** : Implémenter `no_show` et `expired_payment`.
- [ ] **Automation** : Expiration automatique des sessions de paiement non abouties.
- [x] **Contraintes Refund** :
  - [x] Interdire si statut ≠ `paid`.
  - [ ] Interdire si déjà `cancelled` ou `no_show`.
  - [x] Empêcher refund > montant payé.
- [x] **Intégrité Ledger** : Interdire UPDATE/DELETE (Append-only).
- [ ] **Intégrité Métier** : Interdire le DELETE sur la table `bookings` (Immuabilité).
- [ ] **Réconciliation** : Trigger de cohérence ledger ↔ booking (balance check).

## 💳 2️⃣ Paiement Stripe

- [x] **Single Intent** : 1 seul `payment_intent` par booking.
- [x] **Idempotence renforcée** : Table `stripe_events` avec index unique.
- [ ] **Monitoring** : Table `webhook_errors` pour isoler les échecs.
- [ ] **Script de réconciliation** : Comparer DB et Stripe Dashboard périodiquement.

## 📒 3️⃣ Ledger Financier

- [ ] **Contrainte CHECK** : Montants `gross`, `net`, `vat` ≥ 0.
- [x] **Indexes Performance** : `booking_id`, `stripe_payment_intent_id`, `created_at`.
- [ ] **Logique Interne** : Fonction `compute_booking_balance()`.
- [x] **Vues de synthèse** : `financial_fiscal_detail` et `financial_monthly_summary`.

## 📊 4️⃣ Dashboard Finance (Admin)

- [ ] **KPIs Période** : Total encaissé, remboursé, Net.
- [ ] **Compteurs** : Nombre de bookings payés, refunds, Ticket moyen.
- [ ] **Visualisation** : Graphique CA mensuel.
- [ ] **Exports** : CSV Ledger, CSV Bookings, Export Fiscal/TVA.

## 📋 5️⃣ Pages Backoffice (Astro Admin)

- [x] **Login sécurisé** (Supabase Auth).
- [ ] **Liste Bookings** : Paginée avec filtres.
- [ ] **Fiche Booking** : Complète avec Timeline de statuts.
- [ ] **Section Ledger** : Liée à chaque fiche booking.
- [ ] **Outils Admin** : Pages Refunds, Erreurs paiement, Logs webhook.
- [ ] **KPI Finance** : Dashboard global.

## 🔐 6️⃣ Sécurité

- [x] **RLS** : Vérifiée table par table.
- [x] **Policies** : INSERT/UPDATE restrictives.
- [x] **Audit Logs** : Trace immuable via Ledger et Stripe Events.
- [ ] **Backup** : Configuration des snapshots automatiques.

## 🧪 7️⃣ Tests Production

- [ ] **Paiement réel** : Flux complet Stripe Live/Test.
- [ ] **Refund partiel** : Vérification des pro-rata HT/TVA.
- [ ] **Double webhook** : Test de collision simultanée.
- [ ] **Race Condition** : Simuler deux refunds en même temps.
- [ ] **Annulation tardive** : Vérifier le blocage après pickup.

## 🔐 8️⃣ Concurrence & Transactions (Hardening 003)

- [ ] **Race Condition Protection** : Utiliser `SELECT ... FOR UPDATE` sur les lignes critiques (Refunds/Status).
- [ ] **Verrouillage Booking** : Empêcher les updates simultanés d'un même dossier.
- [ ] **Transactions Strictes** : Garantir l'atomicité Status Change + Ledger Entry.

## 📈 9️⃣ Finance Ops (Reconciliation & Monitoring)

- [ ] **Script de Réconciliation** : Comparaison périodique Stripe API vs DB (Ledger).
- [ ] **Alerting Actif** : Notifications Slack/Email sur erreurs Webhook ou incohérences.
- [ ] **Dashboard Anomalies** : Vue dédiée aux écarts de réconciliation et erreurs critiques.
