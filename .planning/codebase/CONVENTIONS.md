# Coding Conventions — VTC HUB

This document specifies coding standards, style guides, agent comment rules, and design constraints enforced across VTC HUB.

## ✍️ Code Annotations & Source Tracing
- **Absolute Paths** : Every file must start with a comment defining its absolute path inside the project workspace (relative to the repo root).
  - HTML/Astro: `<!-- /path/to/file.astro -->`
  - JS/TS/CSS: `// /path/to/file.ts`

## 🧱 Architecture & Component Rules
- **Astro Core** : Pages and layouts must be written in Astro (`.astro`). Use Astro frontmatter for data loading, environment check, and metadata resolution.
- **Interactive React** : React (`.tsx`) is reserved for dynamic elements requiring instant DOM feedback (e.g., interactive Maps autocomplete, swipe carousels, bottom sheets).
- **TypeScript strict** : Strict type-checking enabled. Avoid `any`. Leverage generated database types in `src/lib/supabase/database.types.ts`.

## 🔒 Multi-Tenant & Security Conventions
- **Tenant Isolation** : Always fetch and validate `tenant_id` from session details before executing database operations. Never write a query on `bookings`, `vehicles`, `drivers`, or `financial_movements` without appending `.eq('tenant_id', tenant_id)`.
- **Database Modifiers** : Never execute raw SQL/Postgres mutations outside controlled RPC transactions or the Supabase SDK REST API interface.
- **Audit Trails** : Financial records in `financial_movements` are write-once. The updating of ledger entries is strictly forbidden. Corrective actions must be logged as compensating insert operations.

## 🚨 Error Handling & Responses
- **API Endpoints** : Always return a standard JSON structure with HTTP status codes:
  - Success: `{ success: true, data: [...] }`
  - Error: `{ success: false, error: "Détails du message d'erreur" }`
- **Boundary UI Catching** : Wrap database RPC/REST executions in try/catch blocks with clean error logs in development and unified error overlays for drivers/customers.
