# Testing & Verification — VTC HUB

This document outlines the testing structures, test script workflows, and quality validation processes.

## 🧪 Testing Strategy
VTC HUB relies on a local-first validation strategy. Testing consists of running verification scripts directly against the Supabase database instances.

## 📂 Verification Scripts (`test/scripts/`)
These scripts are designed to execute database queries, test auth mechanisms, and verify the backend services in isolation:
- `test/scripts/check_driver_by_id.ts` : Verifies driver lookup logic and role properties.
- `test/scripts/check_email.ts` : Tests the email configuration and edge triggers.
- `test/scripts/check_onboarding.ts` : Simulates onboarding transitions (SIRET check, KBIS review).
- `test/scripts/check_users.ts` : Lists and audits active authenticated users.
- `test/scripts/debug_user.ts` : Performs targeted audits on individual session objects.
- `test/scripts/recover_driver.ts` : Helper script to recover driver accounts.
- `test/scripts/investigate_drivers.ts` : Runs complex diagnostic audits on driver vehicle associations.

## 🚀 Execution & Verification Workflow
1. **Pre-build check** : Before shipping, execute the compiler verify script:
   ```bash
   npm run build
   ```
2. **Schema Type Verification** : Always regenerate database types and verify compilation:
   ```bash
   npm run gen:types
   ```
3. **Manual UI Verification** : Load layout and interactive components under Chrome DevTools using mobile device simulation (375px width breakpoint) to verify visual styling and touch targets.
