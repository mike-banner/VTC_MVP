Parfait.
On aligne ce `security.md` avec :

- V1 réel
- Séparation plateforme / tenant
- Booking engine validé backend
- Service role uniquement serveur
- Architecture SSR

On garde le futur hardening en section séparée.

---

# ✅ VERSION CORRIGÉE — `docs/security.md` (Alignée V1)

Tu peux remplacer ton fichier par ceci.

---

# 🔐 Security Model — VTC HUB (V1)

---

# 🎯 Core Principles

- Isolation multi-tenant stricte
- Aucun accès cross-tenant
- Calcul métier validé backend
- Activation contrôlée
- Séparation plateforme / entreprise

---

# 🔑 Auth Layer

## Supabase Auth

- `auth.users` = identité technique
- `profiles.id = auth.users.id`
- Session JWT gérée via cookies SSR
- Aucun token exposé côté client

---

# 👥 Role Separation

## Couche Plateforme

- `platform_role`
  - super_admin
  - platform_staff

Accès uniquement :

```
/admin/*
```

---

## Couche Tenant

- `tenant_role`
  - owner
  - manager
  - driver

Accès uniquement :

```
/app/*
```

---

# 🛡 Row Level Security (RLS)

RLS activé sur les tables multi-tenant :

- profiles
- tenants
- drivers
- vehicles
- pricing_rules
- bookings

Isolation basée sur :

```
tenant_id = profiles.tenant_id
```

Chaque requête est filtrée par `tenant_id`.

Aucun accès inter-entreprise possible.

---

# 🚗 Booking & Financial Integrity

## Calcul Prix

- Estimation frontend possible
- Recalcul obligatoire backend
- Minimum fare appliqué côté serveur
- `total_amount` jamais accepté tel quel du client

## Statuts Financiers & Booking

Statuts contrôlés :

```
pending
accepted_pending_payment
paid
refunded
completed
cancelled
```

---

# 💳 Stripe Webhook Security

Le traitement des paiements et refunds via Edge Functions est hautement sécurisé :

- **Validation Signature** : Chaque requête Stripe est validée avec le secret webhook.
- **Idempotence** : Utilisation de la table `stripe_events` pour empêcher le rejeu d'un événement.
- **Sanity Check** : Vérification systématique du `booking_id` envoyé par Stripe avant mise à jour.
- **Unicité transactionnelle** : Protection SQL contre la double génération de mouvements financiers.

---

# ⚖️ Audit Trail (Immutabilité)

- Aucune suppression de ligne dans `financial_movements`.
- Toute correction financière passe par un mouvement opposé (refund / commission_reversal).
- Tracé complet de chaque flux vers l'événement Stripe source (`created_by_event`).

---

# 🚫 Attack Surface Minimization

- Aucune logique critique côté frontend
- Filtrage systématique par tenant_id via RLS
- API internes protégées par service role
- Pas de marketplace centralisée
- Aucun flux financier transitant hors des comptes Stripe des tenants

---

# 🔮 Future Hardening (Versions ultérieures)

- Audit logs actions critiques (CRUD profiles/tenants)
- Rate limiting API
- CSP headers granulaires
- Soft delete complet

---

# 🎯 Résultat

Le modèle sécurité reflète maintenant l'état réel de production :

- Architecture SaaS multi-tenant isolée.
- Flux financiers robustes et auditables.
- Webhooks Stripe sécurisés.
- Intégrité financière garantie par SQL.
