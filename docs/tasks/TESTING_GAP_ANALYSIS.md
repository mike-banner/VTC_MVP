# 🧪 Cartographie Exhaustive des Écarts de Tests — VTC HUB MVP

Ce document dresse l'inventaire complet des tests unitaires, d'intégration et de bout en bout (E2E) requis pour valider les **9 compartiments fonctionnels** du projet avant la mise en production.

---

## 🏛️ Compartiment 1 : Tunnel Client Public (`/`)

Le tunnel public gère la prise de commande client en mode anonyme et le paiement.

- [ ] **Autocomplete Google Maps** :
  - *Test E2E* : Simuler la saisie d'adresses partielles et vérifier la sélection d'une adresse valide.
  - *Test d'Intégration* : Valider que le clic en dehors ou la touche "Escape" ferme correctement l'overlay de saisie plein écran sur mobile.
- [ ] **Carrousel Véhicules (Sélection)** :
  - *Test Unitaire* : Vérifier que le carrousel filtre et affiche uniquement les catégories de véhicules actives du tenant.
  - *Test d'Intégration* : Valider les badges de capacité (bagages et passagers max) par carte véhicule selon les specs techniques.
- [ ] **Moteur d'Estimation Tarifaire** :
  - *Test Unitaire* : Calculer la distance. Valider le prix final selon les formules :
    - Tarif Standard : `base_price` + (`price_per_km` * `distance`)
    - Tarif Minimum : Si prix calculé < `minimum_fare` ➔ appliquer `minimum_fare`.
    - Forfait Prioritaire : Si les zones de départ et d'arrivée correspondent à une règle `fixed_route` active ➔ appliquer le forfait fixe et ignorer le calcul kilométrique.
- [ ] **Intégration Stripe Elements** :
  - *Test E2E* : Simuler une saisie de carte de test Stripe et vérifier la création de la réservation en statut `pending_payment`.

---

## 🏛️ Compartiment 2 : Authentification, Inscription & Onboarding Wizard

Ce compartiment sécurise l'entrée des nouveaux chauffeurs et la configuration de leur dossier légal.

- [ ] **Wizard `/signup` (3 Étapes)** :
  - *Test E2E* : Valider que la progression bloque à l'étape $N$ si les champs requis (SIRET, Numéro de Carte VTC, Mot de passe) sont invalides.
- [ ] **SIRET & Validation Légale** :
  - *Test Unitaire* : Valider le format SIRET (14 chiffres) et le numéro de licence VTC.
  - *Test d'Intégration* : Simuler l'upload de documents (KBIS, Assurance) et s'assurer qu'ils sont stockés dans le bucket temporaire avec un préfixe d'onboarding.
- [ ] **Base Intermédiaire (Staging Onboarding)** :
  - *Test d'Intégration* : Valider que la soumission finale de l'onboarding insère correctement les données dans la table temporaire `onboardings` et crée le compte utilisateur Auth Supabase avec le statut `pending`.

---

## 🏛️ Compartiment 3 : Command Center Chauffeur (`/app/dashboard`)

L'interface de travail mobile du chauffeur "tête haute".

- [ ] **KPIs & Statistiques Financières** :
  - *Test Unitaire* : Vérifier les calculs de somme pour la grille (Aujourd'hui, Semaine, Mois, Revenus Bruts vs Nets) en fonction d'un jeu de données de courses de test.
- [ ] **Agenda Chronologique** :
  - *Test Unitaire* : S'assurer que seules les 3 prochaines courses triées par heure de pickup croissante sont affichées dans l'agenda.
- [ ] **Bandeau Mission Active & Guard H-15** :
  - *Test Unitaire / Intégration* :
    - Si heure actuelle est supérieure à `pickup_time - 15 minutes` ➔ Le bouton "En Route" est activé.
    - Si heure actuelle est inférieure ➔ Le bouton est grisé et affiche le temps d'attente restant.

---

## 🏛️ Compartiment 4 : Gestion des Courses & Cycle de Vie (`/app/bookings`)

Suivi opérationnel des réservations.

- [ ] **Bottom Sheet (Détails)** :
  - *Test E2E* : Clic sur une course ➔ Le tiroir modal s'ouvre avec les détails complets sans rechargement de page.
- [ ] **Transitions de Statuts Terrain** :
  - *Test d'Intégration* : Appels successifs à `/api/missions/terrain-transition` pour valider la machine d'état :
    - `not_started` ➔ `in_progress` (Autorisé)
    - `in_progress` ➔ `completed` (Autorisé)
    - `completed` ➔ `in_progress` (Rejeté avec erreur HTTP 400)
- [ ] **Horodatage & Notes de Mission** :
  - *Test d'Intégration* : Vérifier que chaque transition concatène proprement la trace dans `mission_note` (`[terrain] action_at=ISO`).
- [ ] **Auto-Assignment** :
  - *Test Unitaire / DB* : Vérifier qu'une réservation créée manuellement par un chauffeur via l'app lui est automatiquement assignée (`driver_id` = identifiant du créateur).

---

## 🏛️ Compartiment 5 : Réglages Entreprise (`/app/settings`)

Centralisation de l'administration pour le manager/owner.

- [ ] **Exclusivité du Véhicule Actif** :
  - *Test d'Intégration / Trigger DB* : Activer le véhicule B alors que le véhicule A est déjà actif pour le même chauffeur ➔ Vérifier que le véhicule A passe automatiquement à `active = false`.
- [ ] **Configuration de la Grille Tarifaire** :
  - *Test d'Intégration* : Mettre à jour la grille tarifaire active et vérifier que les réservations suivantes utilisent immédiatement les nouveaux tarifs de calcul.
- [ ] **Gestion des Forfaits (Fixed Routes)** :
  - *Test Unitaire* : Valider la bidirectionnalité (si A ➔ B vaut 50€, vérifier que B ➔ A applique aussi 50€ si l'option est cochée).

---

## 🏛️ Compartiment 6 : Ledger Fiscal (`/app/ledger`)

Journal immuable des mouvements financiers (Grand Livre).

- [ ] **Immutabilité des Écritures** :
  - *Test RLS / DB* : Vérifier que les utilisateurs (y compris l'owner) n'ont aucun droit de `DELETE` ou `UPDATE` sur la table `financial_movements` (Grand Livre).
- [ ] **Calculs Comptables** :
  - *Test Unitaire* : S'assurer que le calcul du solde brut et net déduit correctement les commissions plateforme et isole les paiements espèces vs Stripe.

---

## 🏛️ Compartiment 7 : Backoffice Administrateur (`/admin/`)

La console centrale de validation de la plateforme.

- [ ] **Approbation d'Onboarding** :
  - *Test d'Intégration* : Valider que l'exécution de la procédure `approve_onboarding_tx()` transfère de façon atomique et propre les données de staging vers `tenants`, `drivers` et `vehicles`, et passe le compte de l'utilisateur à `active`.
- [ ] **Rejet d'Onboarding** :
  - *Test d'Intégration* : Valider que le rejet passe l'onboarding au statut `rejected` et maintient le compte utilisateur bloqué.

---

## 🏛️ Compartiment 8 : Sécurité & Cloisonnement Multi-Tenant (Supabase RLS)

- [ ] **Cloisonnement strict inter-entreprise** :
  - *Test RLS (Supabase CLI)* : Simuler une requête de lecture de courses avec le contexte du `driver_id` du Tenant A. S'assurer que 0 ligne du Tenant B n'est retournée.
- [ ] **Avis Passagers Anonymes** :
  - *Test RLS (Supabase CLI)* : Tenter d'insérer ou de modifier des colonnes sensibles (ex: `total_amount`) sans authentification ➔ Doit échouer.
  - *Test RLS* : Tenter de modifier uniquement `rating` et `rating_comment` sur une course terminée ➔ Doit réussir.

---

## 🏛️ Compartiment 9 : Stripe & Webhooks

- [ ] **Stripe Account Onboarding** :
  - *Test d'Intégration* : Valider la génération de lien Connect Express et le traitement du retour Stripe pour passer `stripe_account_active` à true.
- [ ] **Traitement du Webhook Stripe** :
  - *Test d'Intégration* : Simuler l'envoi d'un événement Stripe `checkout.session.completed` ➔ Vérifier que le statut de la course passe à `paid` et que le mouvement financier correspondant est écrit dans le Grand Livre.
