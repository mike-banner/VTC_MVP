# Technical Stack — VTC HUB

This document maps the language, runtime, frameworks, and configuration layers of the VTC HUB project.

## Core Runtime & Engine
- **Runtime Environment** : Node.js (v20+ recommended)
- **Deployment Platform** : Cloudflare Pages (via `@astrojs/cloudflare` SSR adapter)
- **Framework** : Astro 5.x (`astro` package, SSR enabled)

## Frontend Layer
- **Language** : TypeScript / JavaScript (ES Modules)
- **View Library** : React 19.x (`react`, `react-dom` via `@astrojs/react`)
- **Styling** : TailwindCSS 3.x (`tailwindcss` via `@astrojs/tailwind` integration)
- **Component Primitives** : Ark UI React (`@ark-ui/react`), Park UI Tailwind Plugin (`@ park-ui/tailwind-plugin`)
- **Icons & Assets** : Lucide React (`lucide-react`)
- **Utilities** : QR Code Generator (`qrcode.react`)

## Backend & Database Layer
- **Database** : PostgreSQL (hosted on Supabase)
- **Auth Provider** : Supabase Auth (managed through `@supabase/ssr` / `@supabase/supabase-js`)
- **API Architecture** : Astro Endpoint API Routes (`src/pages/api/`)
- **SDK & Client** : Supabase JS Client (`@supabase/supabase-js`)

## Tooling & Configuration Files
- `package.json` : Project package definitions and scripts.
- `astro.config.mjs` : Astro configuration enabling Cloudflare SSR, React rendering, and Tailwind integration.
- `tsconfig.json` : TypeScript configuration.
- `tailwind.config.mjs` : Tailwind UI theme and configuration.
- `schema.json` : Database schema references.
- `.gitignore` : Version control ignore policies.
- `.cursor/rules/` : IDE-specific AI context rules.

## Core Commands
- **Start Development Server** : `npm run dev` (runs `astro dev`)
- **Compile Production Build** : `npm run build` (runs `astro build`)
- **Preview Production Build** : `npm run preview` (runs `astro preview`)
- **Generate Database Types** : `npm run gen:types` (executes Supabase CLI schema generator)
