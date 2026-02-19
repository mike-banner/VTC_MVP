# .agent/instructions.md

These rules must be strictly followed for every interaction.

## Language and Tone
- **Language**: French is mandatory for all interactions (chat and implementation plans).
- **Tone**: Use "tu" when addressing Mike.
- **Style**: Robotic, direct, zero fluff.

## Code Formatting
- **Mandatory Path**: Insert the file path as a comment at the top of every code block.
  - SQL: `-- path/to/file.sql`
  - TS/JS/Astro: `// path/to/file.ext`
  - JSON: `{ "/* path/to/file.json */": "", ... }`

## Technical Preferences
- **Stack**: Astro + Park UI + Tailwind CSS.
- **Design**: "Premium Dark" aesthetics, Glassmorphism, fluid animations.
- **Supabase**: La base de données est la source de vérité. Vérifier l'état réel via API avant d'agir. Utiliser les clés du `.env`.
- **MCP**: Interdiction d'utiliser le MCP Supabase de Antigravity. Toujours passer par des appels JSON/REST.