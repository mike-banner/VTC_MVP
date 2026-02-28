Parfait.
On va enrichir ce `decisions.md` pour qu’il reflète :

- Les décisions réellement prises
- Le modèle ERP-first
- Le non-positionnement marketplace
- Stripe non centralisé
- Séparation plateforme / tenant

On garde un style clair et stratégique.

---

# ✅ VERSION CORRIGÉE — `docs/decisions.md`

Tu peux remplacer ton fichier par ceci.

---

# 🧠 Architectural Decisions — VTC HUB

---

## Why ERP-First and Not Marketplace?

VTC HUB est conçu comme un **ERP indépendant**, pas comme une marketplace.

Décision stratégique :

- Chaque chauffeur reste propriétaire de ses clients
- Aucun encaissement centralisé
- Pas d’intermédiation financière

Objectif :

> Construire un outil professionnel, pas une plateforme d’intermédiation.

---

## Why Onboarding as Staging?

Séparation claire entre :

- Données temporaires (`onboarding`)
- Données actives (`tenants`, `drivers`, `vehicles`)

Permet :

- Validation manuelle
- Contrôle qualité
- Prévention des abus
- Création atomique des entités

---

## Why SQL Transaction Activation?

Une première version JS créait :

- Données partielles
- Incohérences
- États impossibles

Solution retenue :

- Activation via `approve_onboarding_tx`
- Transaction SQL atomique
- Rollback automatique
- Cohérence garantie

---

## Why tenant_id Everywhere?

Chaque entité métier contient :

```
tenant_id
```

Pourquoi ?

- Isolation multi-tenant native
- Filtrage simple via RLS
- Sécurité structurelle
- Scalabilité propre

---

## Why Separate platform_role and tenant_role?

Deux couches distinctes :

- `platform_role` → super_admin / platform_staff
- `tenant_role` → owner / manager / driver

Permet :

- Séparation claire plateforme / entreprise
- Éviter les rôles hybrides
- Simplifier les guards backend

---

## Why Drivers as Separate Entity?

Même si un user peut conduire,
la conduite est une entité métier distincte.

Séparation :

```
profiles → identité
drivers → capacité métier
bookings → activité
```

Permet :

- Multi-driver futur
- Assignation flexible
- Évolution V2 sans refactor

---

## Why Backend Price Validation?

Le frontend peut afficher une estimation.

Mais :

- Le backend recalcule toujours le prix
- `total_amount` n’est jamais accepté tel quel
- minimum_fare appliqué côté serveur

Permet :

- Intégrité métier
- Protection contre manipulation
- Cohérence financière

---

## Why Stripe Not Centralized?

Chaque tenant :

- Connecte son propre Stripe
- Encaisse directement
- Gère sa relation client

La plateforme :

- Ne manipule aucun flux financier client
- Réduit risques juridiques
- Simplifie architecture

---

## Why capacity in vehicles?

`capacity` est une donnée métier centrale :

- Affichage site
- Filtrage services
- Matching futur
- Pricing futur

---

## Why category as text (not enum)?

Décision V1 :

- Flexibilité
- Évolutivité
- Pas de rigidité prématurée

Peut évoluer en enum si standardisation future.

---

## Why Keep V2/V3 Features Dormant?

Certaines tables (drivers avancés, commission, etc.)
existent déjà.

Décision :

- Construire base solide
- Activer progressivement
- Éviter refactor massif plus tard

---

---

## Why Financial movements table and Audit Trail?

Décision stratégique pour passer d'un simple booking à un ERP financier.

- **Idempotence Stripe** : Chaque événement Stripe (`checkout`, `refund`) est stocké et vérifié pour éviter les doubles traitements.
- **Audit-Trail Immutable** : Les mouvements financiers ne sont jamais supprimés. On utilise des mouvements de type `refund` ou `commission_reversal` pour équilibrer les comptes.
- **Reporting Fiscal** : Permet de générer des déclarations de TVA et des bilans par tenant en temps réel sans recalculer toute la base de bookings.

Objectif :

> Garantir une intégrité financière absolue pour les chauffeurs et la plateforme.

---

# 🎯 Result

Les décisions actuelles garantissent :

- Base ERP stable
- Sécurité forte
- Isolation stricte
- Scalabilité maîtrisée
- Évolution contrôlée vers V2/V3/V4
- **Audit financier robuste**

---
