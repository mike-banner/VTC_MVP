# Areas of Concern & Tech Debt — VTC HUB

This document tracks technical debt, security considerations, and fragile areas in the VTC HUB platform.

## ⚠️ Fragile Operations

### 1. Booking State Transitions (H-15 Lockout)
- Drivers must transition bookings through the lifecycles (`not_started` -> `in_progress` -> `completed`).
- The transition from `not_started` to `in_progress` is locked until H-15.
- **Concern** : Clock drift between the client browser, Cloudflare edge functions, and Supabase servers can block users. Time comparisons must be relative to server time.

### 2. Vehicle Fleet Active Exclusivity
- A tenant is restricted to **exactly one active vehicle** at any time.
- **Concern** : Race conditions when toggling active vehicles. Need to guarantee atomic transactions when marking a vehicle active and marking others inactive.

## 🔒 Security & Tenant Boundaries
- **Cross-Tenant Leakage** : High risk. All new tables must support `tenant_id` and have active RLS.
- **Stripe Webhook Verification** : Stripe hooks must verify event signatures and enforce idempotency using `stripe_events` to prevent double execution of billing events.
- **Danger Zone / Account Deletion** : The RPC `delete_tenant_account` anonymizes rather than deletes historical data to comply with ledger audit rules. Any new user data structures must be included in this anonymization routine.

## 💸 Financial Ledger Immutability
- The `financial_movements` table is read-only.
- **Concern** : Avoid any application logic attempting updates or deletes on this table, as database triggers will abort the transaction immediately.
