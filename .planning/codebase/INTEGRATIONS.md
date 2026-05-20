# Integrations & APIs — VTC HUB

This document maps all third-party services, APIs, databases, webhook systems, and external integrations in the VTC HUB platform.

## 🗄️ Database Integration (Supabase)
- **Engine** : PostgreSQL (Multi-tenant schema).
- **Client Configuration** : Shared client instance initialized using environment variables:
  - `PUBLIC_SUPABASE_URL`
  - `PUBLIC_SUPABASE_ANON_KEY`
- **Security & Multi-Tenancy** :
  - Managed via PostgreSQL Row Level Security (RLS).
  - All tenant data queries MUST match the active user's `tenant_id`.
  - Staging/Onboarding operations verified via RPC (`delete_tenant_account`, `ApproveOnboardingTx`).

## 💳 Payment Gateway (Stripe Connect)
- **Features** : Multi-tenant payment routing, driver payouts, transaction ledger.
- **Idempotence** : Webhooks processed through standard idempotence checks via `stripe_events` logs.
- **Financial Movement Ledger** :
  - Writes to `financial_movements` (Grand Livre) ledger which is completely immutable once created.
  - Refund triggers execute database updates only when operations are verified.

## 📧 Email Infrastructure (Resend)
- **Scope** : Transactional emails (Signup validation, ride booking notifications, client confirmation).
- **Architecture** : Astro pages communicate via JSON POST request to a Resend-integrated endpoint or Supabase Edge function.

## 🗺️ Geolocation & Autocomplete (Google Maps)
- **Features** : Pickup/Dropoff address autocompletion.
- **Implementation** : Google Maps Autocomplete API client script embedded in client-side forms.
- **Mobile First Optimization** : Fullscreen autocomplete overlay to prevent input occlusion by the virtual keyboard.
