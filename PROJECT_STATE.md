# 📌 ÉTAT DU PROJET — VTC HUB (MVP)

## 🏁 État actuel validé

D’après les dernières évolutions et vérifications :

**Structure de la table `bookings` :**

| Champ                      | Rôle                                      |
| -------------------------- | ----------------------------------------- |
| `booking_type`             | Type de course (ex: `transfer`, `hourly`) |
| `driver_id`                | Chauffeur assigné                         |
| `vehicle_id`               | Véhicule assigné                          |
| `passenger_count`          | Nombre de passagers                       |
| `luggage_count`            | Nombre de bagages                         |
| `subtotal_amount`          | Prix HT                                   |
| `vat_amount`               | TVA                                       |
| `total_amount`             | Prix TTC                                  |
| `stripe_payment_intent_id` | Identifiant de paiement Stripe            |
| `status`                   | État actuel de la course                  |

> **Note** : La structure DB est jugée **suffisante pour la V1**. Pas de nouvelle migration immédiate nécessaire sur le cœur du modèle.

---

## ✅ Ce qui est fonctionnel

### Architecture Technique

| Couche   | Technologie            |
| -------- | ---------------------- |
| Frontend | Astro (Multi-domaine)  |
| Backend  | Supabase               |
| Auth     | Supabase Auth          |
| Database | PostgreSQL             |
| Logique  | Edge Functions (Deno)  |
| Paiement | Stripe Connect Express |
| Infra    | Cloudflare             |

### Isolation Multi-tenant

Isolation stricte garantie par :

- Identité : `profiles.id = auth.uid()` relié à `profiles.tenant_id`.
- Données : Toutes les tables métier contiennent un `tenant_id`.
- Sécurité (RLS) : `tenant_id = (select tenant_id from profiles where id = auth.uid())`.

### Flux Booking & Finances

1.  **Réservation** : Le client choisit son trajet/service.
2.  **Calcul** : Prix + TVA calculés côté backend (`create-booking`).
3.  **Insertion** : Création du record dans `bookings`.
4.  **Paiement** : Création d'une `Stripe Checkout Session` via Edge Function.
5.  **Validation** : Le Webhook Stripe met à jour `booking.status = 'paid'`.

**Champs Financiers :**

- `subtotal_amount` (HT), `vat_amount` (TVA), `total_amount` (TTC).
- Encaissement direct sur le compte **Stripe Connect Express** de l'entreprise (`tenants.stripe_account_id`).

### UI & Dashboard (VTC MVP)

- **Gestion Tarifaire** : Configuration des forfaits, zones et prix au km.
- **Gestion Flotte** : Ajout et suivi des véhicules et chauffeurs.
- **Historique des Bookings** : Liste tabulée par statut (Toutes, À Valider, En Paiement, Terminées).
- **Dashboard Avancé** :
  - Vue "Missions en ligne" (liste verticale fluide).
  - **Modale de détails** : Clic sur une mission pour voir toutes les infos (Client, Trajet, Finance, Statut).
  - **Distinction de service** : Badge visuel pour différencier les "Transferts" des "Mises à Dispo (Hourly)".

---

## 🚦 Statuts Booking (Logique Métier)

Flux opérationnel complet :

1.  `pending` (Attente réservation)
2.  `waiting_validation` (Pour les mises à dispo sans tarif fixe)
3.  `paid` (Payé, prêt pour assignation)
4.  `assigned` (Chauffeur assigné)
5.  `accepted` (Chauffeur a accepté la mission)
6.  `on_the_way` (Chauffeur en route vers le client)
7.  `in_progress` (Course en cours)
8.  `completed` (Terminée)
9.  `cancelled` / `no_show` (Annulations)

---

## 🏗️ Modèle Réseau & Partage (Prévu)

L'infrastructure est déjà prête pour les évolutions futures :

- **Cercles privés** : Gestion de groupements de chauffeurs.
- **Partage de course** : Délégation de mission à d'autres membres du réseau.
- **Commissions plateforme** : Appliquées uniquement sur le partage de course.
  - Table `commissions` existante (`booking_id`, `gross_amount`, `commission_rate`, `commission_amount`).

---

## 🛠️ Ce qui reste à implémenter (Phase V2)

### 1️⃣ Backoffice Chauffeur (Interface Driver)

- Tableau de bord dédié au chauffeur (hors admin).
- Actions : Accepter/Refuser une mission assignée.
- Workflow terrain : "Je suis en route", "Client à bord", "Course terminée".

### 2️⃣ Sécurisation RLS Driver

- Restriction de vue : `bookings.driver_id = current_driver_id`.

### 3️⃣ Edge Functions Opérationnelles

- `assign-driver`
- `driver-accept-booking`
- `driver-start-trip`
- `driver-complete-trip`

### 4️⃣ Transitions de Statuts Sécurisées

- Vérification SQL (`validate_booking_status_transition()`) pour empêcher les sauts d'étapes incohérents (ex: `paid` -> `completed` sans passer par `in_progress`).

### 5️⃣ Pricing Dynamique Avancé

- Exploitation complète de la table `pricing_rules` pour le calcul temps réel des forfaits complexes.

---

## 🎯 Prochain Objectif Critique

Lancer la brique :
**VTC SAAS — DRIVER DASHBOARD & WORKFLOW V1**

C'est l'étape nécessaire pour transformer l'outil de gestion en outil opérationnel pour les chauffeurs sur le terrain.
