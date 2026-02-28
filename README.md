Voici la **version corrigée et réellement alignée Production-Ready** de ton `README.md`.

Elle intègre le hardening SQL appliqué aujourd’hui sans alourdir le document.

Tu peux remplacer intégralement ton README par ceci.

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
* **Sécurité structurelle** : Contraintes SQL + Triggers + Index

---

# 🏗️ Architecture & Sécurité

## Multi-Tenant Strict

Chaque entreprise est isolée via :

```
tenant_id
```

Isolation garantie par :

* Row Level Security (RLS) activée sur toutes les tables sensibles
* Policies basées sur `current_tenant_id()`
* Middleware SSR
* SERVICE_ROLE non exposée

Aucune fuite inter-tenant possible au niveau base de données.

---

## Activation Sécurisée

Le passage de l’onboarding au statut actif est géré par une **transaction SQL atomique**, garantissant :

* Création cohérente du tenant
* Mise à jour du profile
* Intégrité complète des données

L’onboarding est isolé par RLS et non modifiable après validation (hors service role).

---

# 🔒 Production Hardening (V1)

La V1 est sécurisée au niveau base de données.

Les garanties suivantes sont appliquées :

### Booking

* `status` ENUM strict
* `status` NOT NULL
* Champs critiques immuables après `pending`

  * total_amount
  * pickup_address
  * dropoff_address
  * pickup_time
  * payment_mode
* Protection contre modification frauduleuse après acceptation

### Intégrité Financière

* 1 commission maximum par booking (`UNIQUE booking_id`)
* Protection contre double génération de commission
* Sécurité déplacée au niveau SQL

### Protection Concurrence

* 1 seul share accepté par booking (index partiel)
* Protection contre double acceptation simultanée

### Scope V1 Verrouillé

* Mono-cercle forcé en base
* Aucune dérive marketplace possible

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
* Application du minimum fare
* Statuts :

  * pending
  * confirmed
  * completed
  * cancelled
* Historique complet
* Dashboard KPI simple

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

# 🗺️ Roadmap Produit

## 🚀 V1 — ERP Stable & Production-Ready

* Multi-tenant sécurisé
* Booking Engine validé
* Pricing simple
* Dashboard KPI
* Hardening SQL appliqué
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

---

Maintenant la documentation est alignée avec la réalité technique.
