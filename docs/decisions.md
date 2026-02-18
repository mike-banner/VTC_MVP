# 🧠 Architectural Decisions

---

## Why Onboarding as Staging?

Séparer :

- Données temporaires
- Données actives

Permet :

- Validation manuelle
- Contrôle qualité
- Prévention abus

---

## Why SQL Transaction Activation?

JS version créait incohérences.

SQL transaction :

- Atomicité
- Rollback automatique
- Cohérence garantie

---

## Why tenant_id Everywhere?

Isolation multi-tenant native.

---

## Why capacity in vehicles?

Donnée métier centrale :

- Affichage site
- Matching pricing
- Filtrage booking

---

## Why category text (not enum)?

Flexibilité future.
Peut devenir enum si standardisé.