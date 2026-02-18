# 🚖 VTC HUB — SaaS Multi-Tenant pour Chauffeurs VTC

VTC HUB est une plateforme SaaS "Premium" permettant aux chauffeurs VTC de gérer leur activité, leurs tarifs et leurs courses dans un environnement multi-tenant sécurisé.

---

## 🚀 Stack Technique

- **Frontend & SSR** : [Astro](https://astro.build/) (Output: Server)
- **Design** : Tailwind CSS + Park UI (Glassmorphism & Premium Dark Theme)
- **Infrastructure** : [Cloudflare Pages](https://pages.cloudflare.com/)
- **Backend & Database** : [Supabase](https://supabase.com/) (Postgres + Auth + RLS)
- **Logique Métier** : Edge Functions & RPC Transactionnelles (PL/pgSQL)

---

## 🏗️ Architecture & Sécurité

- **Isolation Multi-Tenant** : Chaque chauffeur possède son propre `tenant_id`. L'isolation est garantie par des **Policies RLS** au niveau de la base de données.
- **Middleware SSR** : Protection des routes en temps réel (Auth check, Onboarding status).
- **Activation Atomique** : Le passage de l'onboarding au mode actif est géré par une transaction SQL unique pour garantir l'intégrité des données (Zéro création partielle).

---

## 🔄 Flux Utilisateur

1. **Inscription** : Création du compte via Supabase Auth.
2. **Onboarding** : Tunnel Premium en 3 étapes (Profil, Véhicule, Tarification).
3. **Attente** : Dossier en staging (`status: pending`) en attente de validation admin.
4. **Activation** : Création automatique du Tenant, Driver et Véhicule.
5. **Dashboard** : Accès complet aux outils de gestion.

---

## 📂 Documentation

Pour plus de détails techniques, consulte le dossier [docs/](./docs) :

- [🏗️ Architecture](./docs/architecture.md)
- [🗄️ Base de données](./docs/database.md)
- [🔐 Sécurité](./docs/security.md)
- [🔄 Flux Systèmes](./docs/flows.md)
- [🧠 Décisions d'Architecture](./docs/decisions.md)
- [🔎 Checklist Audit](./docs/cheklist_audit.md)

---

## 🛠️ Installation & Développement

```bash
# Installation des dépendances
npm install

# Lancement du serveur local
npm run dev

# Déploiement (Cloudflare)
npm run build
```

---

## 📜 Licence
Projet privé — Tous droits réservés.
