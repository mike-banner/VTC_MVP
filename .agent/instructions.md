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
- **Supabase**: Migrations are mandatory (`supabase/migrations/`). No manual dashboard changes.
- **MCP**: Systematic integration (Supabase, Notion, GitHub).