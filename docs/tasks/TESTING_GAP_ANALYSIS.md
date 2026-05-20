# 🧪 Analyse des Écarts de Tests (Testing Gap Analysis) — VTC HUB

Ce document dresse l'état des lieux de la couverture de tests actuelle et liste de manière exhaustive les tests automatisés manquants requis pour valider le projet de manière robuste avant son déploiement en production.

---

## 📊 État Actuel des Tests
- **Couverture Automatisée** : **0%** (Aucun framework de test unitaire, d'intégration ou E2E n'est installé dans le `package.json`).
- **Validation Existante** :
  - Compilation Astro (`npm run build`).
  - Validation TypeScript (`npm run gen:types`).
  - Scripts de diagnostic manuel (`test/scripts/`).
  - Vérification UI manuelle (Chrome DevTools, simulation 375px).

---

## 🚨 Tests Manquants Critiques (À Implémenter)

### 1. 🔒 Sécurité & Base de Données (Supabase RLS)
Le modèle d'isolation multi-tenant reposant sur les politiques RLS (Row Level Security), des tests d'intégration sont indispensables pour éviter les fuites de données entre entreprises.

- [ ] **Isolation Multi-Tenant (RLS)** :
  - Vérifier qu'un chauffeur du Tenant A ne peut pas lire/modifier les courses, véhicules ou clients du Tenant B.
  - Vérifier qu'un manager du Tenant A ne peut pas accéder au grand livre comptable (Ledger) du Tenant B.
- [ ] **Accès Anonymes (Avis Passagers)** :
  - Vérifier qu'un utilisateur non authentifié peut lire et modifier uniquement les champs `rating`, `rating_comment` et `rating_created_at` pour une course spécifique (via son UUID).
  - Vérifier qu'un utilisateur non authentifié ne peut pas modifier le montant, l'itinéraire, ou le statut d'une course.
- [ ] **Séparation des Rôles Plateforme** :
  - Vérifier que seuls les utilisateurs ayant le rôle de métadonnées `super_admin` ou `platform_staff` peuvent accéder aux tables et API du namespace `admin/`.

---

### 2. 🔌 API & Logique Métier (Unit & Integration Tests)

#### A. Endpoint de Notation (`/api/submit-rating`)
- [ ] **Validation de la note** : Rejeter les notes non entières, $< 1$, ou $> 5$.
- [ ] **Sanitisation du commentaire** : Valider le trim et le troncage à 500 caractères.
- [ ] **Vérification du statut** : Empêcher la notation si la course n'est pas en statut `completed`.
- [ ] **Verrouillage de notation** : Empêcher de soumettre un avis si la colonne `rating` de la course n'est pas nulle (`alreadyRated` check).
- [ ] **Smart Routing (Aiguillage)** : Vérifier que l'API renvoie les bonnes métadonnées pour inciter le partage sur Google Business si $\ge 4$ étoiles et qu'une URL Google Reviews est renseignée.

#### B. Endpoint de Création de Course (`/api/tenant/create-booking`)
- [ ] **Moteur Tarifaire Automatique** : Vérifier le calcul `base_price` + `price_per_km * distance_km`.
- [ ] **Sécurité Minimum** : Vérifier que si le montant calculé est inférieur à `minimum_fare`, le tarif appliqué est le prix minimum configuré.
- [ ] **Override Manuel** : Confirmer que `manual_total` court-circuite le moteur de calcul si fourni.
- [ ] **Auto-Assignment** : Confirmer que la course créée manuellement est automatiquement assignée au chauffeur connecté.

#### C. Transition Statut Terrain (`/api/missions/terrain-transition`)
- [ ] **Guard Temporel H-15** : Bloquer le passage au statut "En Route" si l'heure actuelle est supérieure à `pickup_time - 15 minutes`.
- [ ] **Cycle de vie strict** : Valider que les transitions ne peuvent s'effectuer que dans le sens : `not_started` ➔ `in_progress` ➔ `completed`. Interdire tout retour en arrière.
- [ ] **Horodatage (`mission_note`)** : Confirmer que chaque transition écrit correctement le tag `[terrain] action_at=ISO` dans la note de mission.

---

### 3. 📱 Interface Utilisateur (Component & E2E Tests via Playwright/Vitest)

- [ ] **Bottom Navigation Bar Adaptative** :
  - Connecté en tant que `driver` ➔ Vérifier que seuls 3 onglets (Dashboard, Courses, Profil) sont affichés.
  - Connecté en tant que `manager` ➔ Vérifier que 4 onglets (Dashboard, Courses, Compta, Profil) sont affichés.
  - Connecté en tant qu'`owner` ➔ Vérifier que les 5 onglets sont affichés.
- [ ] **Lien Profil Chauffeur** : Vérifier que le clic sur l'onglet Profil redirige correctement vers `/app/profile` et ne lève aucune erreur d'accès pour les chauffeurs simples.
- [ ] **Raccourci Admin Backoffice** :
  - Vérifier que le badge "Backoffice Admin" est visible et cliquable si l'utilisateur possède les rôles plateforme.
  - Vérifier qu'il est masqué pour les utilisateurs standards.
- [ ] **Rendu QR Code Local** :
  - Vérifier que l'élément `<canvas>` est correctement instancié et dessiné dans les modals de détails de course.
  - Vérifier qu'aucune requête réseau n'est émise vers des services de QR code externes.

---

## 🛠️ Stack de Test Recommandée

Pour combler ces écarts de manière optimale et cohérente avec la stack actuelle :
1. **Vitest** : Pour les tests unitaires de la logique de calcul tarifaire et les routes API Astro.
2. **Playwright** : Pour les tests E2E de navigation adaptative, la simulation mobile (Viewport 375px), les touch targets (min 48px), et le scan simulé du QR Code.
3. **Supabase CLI Local Testing** : Pour valider les règles RLS hors-ligne (`supabase test db`).
