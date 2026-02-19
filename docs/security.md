Parfait.
On aligne ce `security.md` avec :

* V1 réel
* Séparation plateforme / tenant
* Booking engine validé backend
* Service role uniquement serveur
* Architecture SSR

On garde le futur hardening en section séparée.

---

# ✅ VERSION CORRIGÉE — `docs/security.md` (Alignée V1)

Tu peux remplacer ton fichier par ceci.

---

# 🔐 Security Model — VTC HUB (V1)

---

# 🎯 Core Principles

* Isolation multi-tenant stricte
* Aucun accès cross-tenant
* Calcul métier validé backend
* Activation contrôlée
* Séparation plateforme / entreprise

---

# 🔑 Auth Layer

## Supabase Auth

* `auth.users` = identité technique
* `profiles.id = auth.users.id`
* Session JWT gérée via cookies SSR
* Aucun token exposé côté client

---

# 👥 Role Separation

## Couche Plateforme

* `platform_role`

  * super_admin
  * platform_staff

Accès uniquement :

```
/admin/*
```

---

## Couche Tenant

* `tenant_role`

  * owner
  * manager
  * driver

Accès uniquement :

```
/app/*
```

---

# 🛡 Row Level Security (RLS)

RLS activé sur les tables multi-tenant :

* profiles
* tenants
* drivers
* vehicles
* pricing_rules
* bookings

Isolation basée sur :

```
tenant_id = profiles.tenant_id
```

Chaque requête est filtrée par `tenant_id`.

Aucun accès inter-entreprise possible.

---

# 🚗 Booking Integrity

## Calcul Prix

* Estimation frontend possible
* Recalcul obligatoire backend
* Minimum fare appliqué côté serveur
* `total_amount` jamais accepté tel quel du client

---

## Statut Booking

Statuts contrôlés :

```
pending
confirmed
completed
cancelled
```

Les mises à jour passent par des routes backend protégées.

---

# 🔒 Activation Protection

Activation gérée exclusivement par :

```
approve_onboarding_tx(uuid)
```

Caractéristiques :

* Vérification status = pending
* Transaction atomique
* Rollback automatique si erreur
* Aucune création partielle possible

---

# 🏢 Tenant Isolation

* `primary_domain` UNIQUE
* Chaque tenant possède son propre `tenant_id`
* Aucune collision possible entre entreprises

---

# 🧩 Middleware SSR

Middleware global vérifie :

1. Session valide
2. `platform_role`
3. `tenant_id`

Redirections automatiques :

* Non connecté → /login
* Platform → /admin
* Tenant actif → /app/dashboard
* Aucun tenant → /onboarding

---

# 🔐 Service Role Protection

* `SUPABASE_SERVICE_ROLE_KEY` utilisée uniquement côté serveur
* Jamais exposée côté client
* Toutes les RPC sensibles exécutées en backend

---

# 🚫 Attack Surface Minimization

* Aucune logique critique côté frontend
* Filtrage systématique par tenant_id
* API internes protégées
* Pas de marketplace
* Aucun flux financier centralisé

---

# 🔮 Future Hardening (Versions ultérieures)

* Audit logs actions critiques
* Verrouillage modification booking confirmée
* Rate limiting API
* Validation Webhooks Stripe
* CSP headers
* Soft delete

---

# 🎯 Résultat

Le modèle sécurité reflète maintenant :

* Architecture V1 réelle
* Séparation claire plateforme / entreprise
* Booking sécurisé
* Activation atomique
* Isolation multi-tenant stricte

---

Documentation maintenant cohérente à 100% avec l’état réel du projet.

---

