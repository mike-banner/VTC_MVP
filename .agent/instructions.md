# .agent/instructions.md

These rules must be strictly followed for every interaction.

## Language and Tone

- **Language**: French is mandatory for all interactions (chat and implementation plans).
- **Tone**: Use "tu" when addressing Mike.
- **Style**: Robotic, direct, zero fluff.

## Code Formatting

- **Mandatory Path**: Insérer le chemin absolu du fichier en commentaire tout en haut de chaque fichier (en tête).
  - PHP: `<?php // /chemin/du/fichier.php`
  - SQL: `-- /chemin/du/fichier.sql`
  - TS/JS/Astro: `// /chemin/du/fichier.ext`
  - CSS: `/* /chemin/du/fichier.css */`
  - Markdown: `<!-- /chemin/du/fichier.md -->`

## Protocole de Correction

- Si une demande est invalide ou sous-optimale, proposer une alternative via un bloc intitulé **Correction**.
- Expliquer pourquoi et fournir l'exemple de correction.
- **Trigger**: Si l'utilisateur écrit "test de correction fichier", générer un exemple de ce protocole.

## Technical Preferences

- **Stack**: Astro + Park UI + Tailwind CSS.
- **Design**: "Premium Dark" aesthetics, Glassmorphism, fluid animations.
- **Supabase**: La base de données est la source de vérité. Vérifier l'état réel via API avant d'agir. Utiliser les clés du `.env`.
- **MCP**: Interdiction d'utiliser le MCP Supabase de Antigravity. Toujours passer par des appels JSON/REST.

## System Architecture

- **Séparation Stricte (Multi-Repo)** :
  - **Repo 1 (Backend/Admin)** : `vtc-backoffice` (Ce dépôt). Maître de la donnée, du Ledger, de Stripe et de la logique métier.
  - **Repo 2 (Public)** : `vtc-site-chauffeur`. UI de réservation, tracking et conversion.
- **Règle d'or** : Le Repo 2 ne traite aucune donnée sensible et n'effectue aucun calcul de prix. Tout passe par les Edge Functions du Repo 1.
- **Source of Truth** : La base Cloud reste la seule vérité.

## Development Workflow

- **Architecture**: Multi-tenant via `tenant_id`. Isolation RLS stricte.
- **Migrations**: Utiles pour l'historique, mais NE PAS s'y fier pour l'état actuel de la base. Ne JAMAIS créer de nouveau fichier de migration automatiquement sans accord.
- **Types**: Toujours exécuter `npm run gen:types` AVANT d'inspecter l'état de la base. Se baser sur `src/lib/supabase/database.types.ts`.
- **Financial Ledger**: La table `financial_movements` est la source unique. Les snapshots de taux sont gérés par le middleware financier.
- **Idempotence**: Vérification systématique via `stripe_events` pour les webhooks Stripe.
