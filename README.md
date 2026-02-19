Parfait.
Voici la **version propre et alignée V1** du `README.md`, sans section “reste à faire”, avec roadmap claire par versions.

Tu peux remplacer ton README actuel par ceci.

---

# 🚖 VTC HUB — ERP SaaS pour Chauffeurs VTC

VTC HUB est un **ERP SaaS multi-tenant** conçu pour les chauffeurs VTC souhaitant structurer, piloter et développer leur activité.

La plateforme fournit :

* Un **backoffice professionnel**
* Un **moteur de réservation**
* Une gestion tarifaire simple
* Un site de réservation optionnel
* Une architecture évolutive vers un ERP complet

VTC HUB n’est pas une marketplace.
Chaque chauffeur reste indépendant et encaisse directement ses paiements.

---

# 🎯 Positionnement Produit

VTC HUB est un **ERP VTC évolutif** :

> Organisation, gestion et performance — sans intermédiaire financier.

Chaque entreprise :

* Possède son propre tenant sécurisé
* Connecte son propre Stripe (optionnel)
* Gère ses courses et son activité de manière autonome

---

# 🚀 Stack Technique

* **Frontend & SSR** : Astro (Output: Server)
* **Design** : Tailwind CSS
* **Infrastructure** : Cloudflare Pages
* **Backend & Database** : Supabase (Postgres + Auth + RLS)
* **Logique métier critique** : RPC SQL transactionnelles (PL/pgSQL)

---

# 🏗️ Architecture & Sécurité

## Multi-Tenant Strict

Chaque entreprise est isolée via :

```
tenant_id
```

Isolation garantie par :

* Row Level Security (RLS)
* Middleware SSR
* Guards backend
* SERVICE_ROLE non exposée

---

## Activation Sécurisée

Le passage de l’onboarding au statut actif est géré par une **transaction SQL atomique**, garantissant :

* Création cohérente du tenant
* Mise à jour du profile
* Intégrité complète des données

---

# 🔄 Flux Utilisateur (V1)

1. Inscription
2. Onboarding (profil + véhicule + tarification)
3. Validation admin
4. Création automatique du tenant
5. Accès au backoffice

---

# 📦 Fonctionnalités Actuelles — V1

## 🔐 Auth & Structure

* Multi-tenant sécurisé
* Owner par défaut
* Support multi-driver (structure prête)

---

## 🚗 Booking Engine V1

* Création de course
* Calcul automatique du prix (validation backend)
* Statuts : pending / confirmed / completed / cancelled
* Liste des courses
* Historique complet

---

## 💰 Pricing

* Base price
* Price per km
* Minimum fare

---

## 🚘 Véhicule

* Catégorie
* Capacité

---

## 💳 Paiement

* Stripe optionnel
* Chaque chauffeur connecte son propre compte Stripe
* Aucun encaissement par la plateforme

---

## 📊 Dashboard V1

* Courses du jour
* Courses du mois
* Chiffre brut
* Historique des courses

---

# 🗺️ Roadmap Produit

## 🚀 V1 — Base ERP Stable (Actuelle)

* Multi-tenant sécurisé
* Booking Engine fonctionnel
* Pricing simple
* Dashboard KPI
* Stripe optionnel

---

## 📦 V2 — ERP Professionnel

* Multi-driver avancé
* Permissions fines
* Assignation chauffeur
* Facturation automatique
* Génération PDF
* Export comptable
* Rapports mensuels

---

## 📊 V3 — ERP Financier Avancé

* Suivi cash journalier / mensuel / annuel
* Comptes rendus automatiques
* Analytics détaillés
* Gestion dépenses

---

## 🌐 V4 — Réseau & Cercle

* Parrainage contrôlé
* Cercle d’entreprises
* Partage de courses
* Commission réseau

---

# 🛠️ Installation & Développement

```bash
npm install
npm run dev
npm run build
```

---

# 📜 Licence

Projet privé — ERP propriétaire.

