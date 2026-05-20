# Project Structure — VTC HUB

This document catalogs the directories, configuration files, and core source locations of VTC HUB.

## 📂 Complete Directory Tree

```text
/
├── .cursor/                # Cursor IDE-specific behavior rules
├── .vscode/                # VS Code workspace settings
├── docs/                   # Centralized documentation system (Tri-Mémoire)
│   ├── ai-context/         # AI-agent bootstrap and forbidden-actions documents
│   ├── architecture/       # Backend, frontend, auth, and database specs
│   ├── business/           # Role hierarchy, pricing, and ride operational flows
│   ├── decisions/          # Immutable Architectural Decision Records (ADR)
│   ├── modules/            # Domain-specific modules (rides, ledger, invoicing)
│   ├── workflows/          # Operational workflow guidelines
│   ├── HISTORY.md          # History log (Tri-Mémoire)
│   ├── PLAN_ARCHITECTURE.md# Architecture planning roadmap (Tri-Mémoire)
│   ├── MEMORY.md           # Immutable technical memory (Tri-Mémoire)
│   └── EVOLUTION.md        # Technical backlog roadmap (Tri-Mémoire)
├── public/                 # Static assets (images, logos, robots.txt)
├── src/                    # Primary application source
│   ├── components/         # Reusable UI component libraries (Astro / React)
│   ├── layouts/            # Astro layout structures
│   │   ├── AdminLayout.astro# Layout for tenant verification portal
│   │   ├── AppLayout.astro  # Layout for driver workspaces (with Bottom Navigation)
│   │   ├── Layout.astro     # Global layout baseline
│   │   └── MainLayout.astro # Public facing layout (landing pages)
│   ├── lib/                # Shared utilities and database client config
│   │   └── supabase/       # Supabase client bootstrap & generated types
│   ├── middleware.ts       # Route interceptor enforcing Auth and inactivity timeouts
│   ├── pages/              # Routing pages (resolved by Astro File System Router)
│   │   ├── admin/          # Admin/Tenant manager views
│   │   ├── api/            # Serverless JSON endpoints
│   │   ├── app/            # Mobile-first driver dashboards & configuration
│   │   ├── index.astro     # Customer booking tunnel (Astro + interactive React)
│   │   ├── login.astro     # Authentication gate
│   │   ├── onboarding.astro# Redirection portal
│   │   ├── signup.astro    # Wizard-based registration interface
│   │   └── waiting-approval.astro # Onboarding pending view
│   ├── scripts/            # Build/Staging and sync scripts
│   ├── services/           # Backend business logic services (DB RPC calls)
│   │   ├── drivers.ts      # Driver management
│   │   ├── pricing.ts      # Pricing calculations
│   │   └── vehicles.ts     # Vehicle fleet administration
│   └── styles/             # Global CSS variables and UI theme files
└── supabase/               # Supabase local config, DB migrations and Edge Functions
```

## 📍 Core File Locations
- **Database Types** : `src/lib/supabase/database.types.ts`
- **Main Layout (Driver Portal)** : `src/layouts/AppLayout.astro`
- **Driver Dashboard Route** : `src/pages/app/dashboard.astro`
- **Customer Booking Tunnel** : `src/pages/index.astro`
- **Middleware Handler** : `src/middleware.ts`
