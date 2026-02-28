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