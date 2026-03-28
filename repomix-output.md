This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
.agent/
  workflows/
    supabase_sync.md
  identity.md
  instructions.md
  mcp-config.json
docs/
  architecture.md
  booking_architecture.md
  booking_status.md
  cancellation.md
  CHECKLIST_BACKOFFICE.md
  CHECKLIST_FRONT.md
  cheklist_audit.md
  database.md
  decisions.md
  features_overview.md
  flows.md
  implementation_progress.md
  refund_engine_technical.md
  reporting.md
  security.md
  user_guide.md
public/
  favicon.ico
src/
  components/
    admin/
      DataTable.astro
      KPIGrid.astro
      MonthlyChart.astro
      Sidebar.astro
    common/
      ConfirmationModal.tsx
      InactivityTimeout.astro
    dashboard/
      StripeConnectionCard.tsx
    drivers/
      DriverList.tsx
      DriverModal.tsx
    pricing/
      TransferManager.tsx
    vehicles/
      VehicleList.tsx
      VehicleModal.tsx
  layouts/
    AdminLayout.astro
    AppLayout.astro
    Layout.astro
    MainLayout.astro
  lib/
    guards/
      platform.ts
    supabase/
      client.ts
      database.types.ts
      server.ts
    guards.ts
  pages/
    admin/
      bookings.astro
      dashboard.astro
      index.astro
      ledger.astro
      onboardings.astro
      settings.astro
      stripe-monitoring.astro
      tenants.astro
    api/
      admin/
        approve.ts
        reject.ts
      tenant/
        .gitkeep
        bookings.ts
        create-booking.ts
        update-booking-status.ts
      approve-test.ts
    app/
      bookings.astro
      dashboard.astro
      drivers.astro
      pricing.astro
      settings.astro
      vehicles.astro
    admin-test.astro
    index.astro
    login.astro
    onboarding.astro
    signup.astro
    waiting-approval.astro
  services/
    drivers.ts
    pricing.ts
    vehicles.ts
  styles/
    global.css
  env.d.ts
  middleware.ts
supabase/
  .branches/
    _current_branch
  .temp/
    cli-latest
    gotrue-version
    pooler-url
    postgres-version
    project-ref
    rest-version
    storage-migration
    storage-version
  functions/
    accept-booking/
      .npmrc
      deno.json
      index.ts
    approve_onboarding/
      .npmrc
      deno.json
      index.ts
    calculate-refund/
      index.ts
    cancel-booking/
      index.ts
    create_checkout_session/
      .npmrc
      deno.json
      index.ts
    create_customer/
      .npmrc
      deno.json
      index.ts
    create_refund/
      .npmrc
      deno.json
      index.ts
    create-account-link/
      .npmrc
      deno.json
      index.ts
    create-connect-account/
      .npmrc
      deno.json
      index.ts
    create-stripe-onboarding/
      .npmrc
      deno.json
      index.ts
    delete-tenant-account/
      index.ts
    send-email/
      deno.json
      index.ts
    stripe_webhook/
      .npmrc
      deno.json
      index.ts
    deno.json
  migrations/
    20260310000000_baseline.sql
    20260310000001_add_site_slug.sql
    20260310210930_allow_public_read_tenants.sql
    20260310222956_reset_public_read_policies.sql
    20260310223203_rls_public_read_front.sql
    20260311011313_airport_transfer_routes.sql
    20260311023218_create_clients_table.sql
    20260311040612_Allow_public_read_booking.sql
    20260312212834_vehicle_enums.sql
    20260312223341_get_available_vehicles.sql
    20260312231224_add_luggage_count_to_bookings.sql
    20260312231900_add_booking_type_enum.sql
    20260312232001_add_booking_type_column.sql
    20260313094828_add_booking_vehiculeID_column.sql
    20260316213124_add_logo.sql
    20260317144504_stripe_events_v2.sql
    20260317150946_stripe_events_fix_v1.sql
    20260317160010_policy_INSERT_bookings.sql
    20260317170329_fix_bookings_rls_for_webhook_v1.sql
    20260317182933_service_role_policies_payement_v1.sql
    20260317183357_fix_customers_rls_v2.sql
    20260317183612_reset_customers_rls_v3.sql
    20260317184235_customers_rls_upsert_fix_v4.sql
    20260317184556_customers_rls_bypass_v7.sql
    20260317185350_customers_insert_tenant.sql
    20260317195831_add_payement.sql
    20260317205354_policy_success.sql
    20260317205714_policy_success_v2.sql
    20260317225903_approve_onboarding_add_driver.sql
    20260317231242_approve_onboarding_add_driver_v2.sql
    20260317235220_add_logo_storage_and_columns.sql
    20260318000203_update_approve_onboarding_tx.sql
    20260318122732_booking_source-mode-required.sql
    20260318123547_booking_source-mode-required-v2.sql
  config.toml
.gitignore
.repomixignore
astro.config.mjs
check_email.ts
check_id.ts
check_onboarding.ts
check_users.ts
debug_user.ts
LICENSE
list_profiles.ts
package.json
PROJECT_STATE.md
README.md
tailwind.config.mjs
testafaire.md
tsconfig.json
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="supabase/migrations/20260318122732_booking_source-mode-required.sql">
-- 1. ENUM booking_source
do $$ begin
  create type booking_source as enum (
    'manual_driver',
    'from_customer'
  );
exception
  when duplicate_object then null;
end $$;

-- 2. ENUM pricing_mode
do $$ begin
  create type pricing_mode as enum (
    'direct',
    'manual'
  );
exception
  when duplicate_object then null;
end $$;

-- 3. Ajouter colonnes
alter table bookings
add column if not exists booking_source booking_source,
add column if not exists pricing_mode pricing_mode,
add column if not exists approval_required boolean default false;

-- 4. Backfill pour tes données existantes
update bookings
set
  booking_source = 'from_customer',
  pricing_mode = 'direct',
  approval_required = false
where booking_source is null;

-- 5. Contraintes (important pour solidité)
alter table bookings
alter column booking_source set not null,
alter column pricing_mode set not null,
alter column approval_required set not null;
</file>

<file path="supabase/migrations/20260318123547_booking_source-mode-required-v2.sql">
create type booking_source_new as enum (
  'manual_driver',
  'customer'
);

alter table bookings
alter column booking_source drop default;

alter table bookings
alter column booking_source
type booking_source_new
using (
  case
    when booking_source = 'from_customer' then 'customer'::booking_source_new
    else booking_source::text::booking_source_new
  end
);

drop type booking_source;
alter type booking_source_new rename to booking_source;

alter table bookings
alter column booking_source set not null;
</file>

<file path=".repomixignore">
# Repomix Ignore

# Dependency directories
node_modules/
bower_components/

# Build outputs
dist/
build/
.next/
.astro/
.cache/
.wrangler/

# Version control
.git/
.svn/
.hg/

# OS files
.DS_Store
Thumbs.db

# Locks
package-lock.json
yarn.lock
pnpm-lock.yaml
bun.lockb

# Environment and secrets
.env
.env.*
*.pem
*.key

# Temporary files
*.log
tmp/
temp/

# Medias
*.png
*.jpg
*.jpeg
*.gif
*.svg
*.mp4
*.webm
*.pdf
*.zip
*.tar.gz
*.tgz
*.rar

# Project specific
stripe.tar.gz
schema.json
</file>

<file path=".agent/workflows/supabase_sync.md">
---
description: Pipeline de déploiement et synchronisation Supabase
---

# .agent/workflows/supabase_sync.md

1. Vérifier l'état local
```bash
npx supabase status
```

2. Appliquer les migrations locales sur le projet distant
```bash
npx supabase db push
```

3. Générer les types TypeScript pour le frontend
```bash
npx supabase gen types typescript --project-id kpnkhmtxzigxtfnkmzru > src/types/supabase.ts
```
</file>

<file path="docs/booking_architecture.md">
# 🏗️ Booking Architecture Rules (V2)

## 🎯 Les 3 Piliers de l'Architecture

Pour garantir une flexibilité SaaS, chaque réservation est définie par trois axes indépendants.

### 1. `booking_type` (Le Service)

_Qu'est-ce que le client a réservé ?_

| Type         | Description                                |
| :----------- | :----------------------------------------- |
| **transfer** | Trajet point A → point B.                  |
| **hourly**   | Mise à disposition à l'heure.              |
| **manual**   | Créé manuellement via le backoffice admin. |
| **dispatch** | Assignation interne à une flotte.          |
| **share**    | Course partagée sur le réseau/cercle.      |

### 2. `booking_flow` (Le Workflow)

_Comment la réservation est-elle traitée commercialement ?_

| Flow                  | Description                                     | Workflow Type                                 |
| :-------------------- | :---------------------------------------------- | :-------------------------------------------- |
| **pay_first**         | Le client paie avant confirmation.              | `form → stripe → paid → booking`              |
| **accept_then_pay**   | Chauffeur accepte, puis lien de paiement.       | `booking → accepted → payment → paid`         |
| **accept_only**       | Confirmation sans paiement en ligne nécessaire. | `booking → accepted → completed`              |
| **internal_dispatch** | Assignation directe à un chauffeur interne.     | `booking → pending → assigned → accepted`     |
| **network_share**     | Partage sur un cercle avec commission.          | `booking → shared → accepted_by_other → paid` |

### 3. `status` (L'État)

_Où en est la réservation dans son cycle de vie ?_
(Voir `docs/booking_status.md` pour la liste complète des statuts).

---

## 🛠️ Exemples de Combinaisons possibles

| Type       | Flow              | Status final               | Cas d'usage                              |
| :--------- | :---------------- | :------------------------- | :--------------------------------------- |
| `transfer` | `pay_first`       | `paid`                     | Client web standard (B2C).               |
| `transfer` | `accept_then_pay` | `accepted_pending_payment` | Client Pro ou Réservation par téléphone. |
| `transfer` | `accept_only`     | `accepted`                 | Paiement Cash à bord (Main à main).      |
| `share`    | `network_share`   | `shared`                   | Course envoyée au réseau de partenaires. |

## 🚀 Impact Implementation (Next Steps)

1. **Migration DB** : Ajouter `booking_flow` (enum) à la table `bookings`.
2. **Logic Engine** : Adapter les fonctions de création pour assigner le bon `booking_flow` selon l'origine du booking.
3. **UI** : Afficher des actions différentes selon le flow (ex: bouton "Payer" uniquement si `flow == accept_then_pay`).
</file>

<file path="docs/booking_status.md">
# Booking Status Rules for UI Display

## Database Enum: `booking_status`

| Database Value             | Meaning                                                          | UI Label (French)          |
| :------------------------- | :--------------------------------------------------------------- | :------------------------- |
| `pending`                  | Réservation créée, en attente d'acceptation par le chauffeur.    | **En attente**             |
| `accepted`                 | Réservation acceptée (paiement manuel ou hors ligne).            | **Confirmée**              |
| `accepted_pending_payment` | Acceptée, mais en attente de la confirmation du paiement Stripe. | **En attente de paiement** |
| `paid`                     | Paiement confirmé par Stripe. Réservation sécurisée.             | **Payée**                  |
| `completed`                | Course terminée.                                                 | **Terminée**               |
| `cancelled`                | Réservation annulée.                                             | **Annulée**                |
| `cancelled_pending_refund` | Annulée, remboursement en cours.                                 | **Remboursement en cours** |
| `cancelled_refunded`       | Annulée, remboursement effectué.                                 | **Remboursée**             |
| `cancelled_no_refund`      | Annulée sans remboursement.                                      | **Annulée**                |
| `no_show`                  | Le client ne s'est pas présenté.                                 | **Non présentation**       |
| `expired_payment`          | Le délai de paiement a expiré.                                   | **Paiement expiré**        |
| `refund_failed`            | Échec de la tentative de remboursement.                          | **Échec remboursement**    |
| `deprecated_refunded`      | Ancien statut de remboursement (obsolète).                       | **Remboursée**             |

## Implementation Rules

1. **Static Values**: Do not invent new status values. Use only those defined in the database enum.
2. **Source of Truth**: Always use the `status` column from the `bookings` table.
3. **UI Mapping**: The UI must consistently map these database values to the French labels listed above.
4. **Visual Cues**:
   - Statuses should often be accompanied by color codes (e.g., Green for `paid`/`completed`, Yellow for `pending`, Red for `cancelled`).
   - Action buttons (Cancel, Refund, Accept) must be conditionally displayed based on these statuses.
</file>

<file path="docs/CHECKLIST_FRONT.md">
# 🌐 SITE CHAUFFEUR CHECKLIST (Repo 2)

Ce dépôt contient le site public, le tunnel de réservation et la conversion client.
**Note : Aucune logique critique n'est hébergée ici. Tout est délégué au Backoffice.**

---

## 🏠 1️⃣ Pages Minimum

- [ ] **Home** : Présentation et arguments de vente.
- [ ] **Booking Flow** : Formulaire de réservation étape par étape.
- [ ] **Confirmation** : Récapitulatif avant paiement.
- [ ] **Post-Paiement** : Pages Succès et Échec (Redirection Stripe).
- [ ] **Légal** : Mentions légales, CGV, Politique remboursement/no-show.

## 📝 2️⃣ Formulaire de Réservation

- [ ] **Validation Zod** : Validation stricte des champs client.
- [ ] **Date Picker** : Blocage des dates passées et délais minimums.
- [ ] **Calcul Prix** : Appel à l'Edge Function pour estimation dynamique.
- [ ] **Soumission** : Création du booking temporaire via API Backoffice.
- [ ] **Hand-off** : Redirection sécurisée vers Stripe Checkout.

## 🔄 3️⃣ Parcours Client (Emails)

- [ ] Email de confirmation de demande.
- [ ] Email de succès de paiement (Webhook triggers).
- [ ] Email d'échec / relance.
- [ ] Email de rappel (H-24 / H-2).

## 📈 4️⃣ Conversion & Tracking

- [ ] **Tracking GTM/Pixel** : Paiement réussi, Abandon, Envoi formulaire.
- [ ] **SEO** : Optimisation meta-tags et performance (Lighthouse > 90).

## ⚙️ 5️⃣ Stabilité Front

- [ ] **Error Boundaries** : Gestion propre des échecs API.
- [ ] **Loading States** : Squelettes de chargement et feedback visuel.
- [ ] **Retry Logic** : Tentatives automatiques sur les appels API instables.

---

⚠️ **RÈGLE D'ARCHITECTURE**
Le site chauffeur :

- Ne parle jamais directement aux tables sensibles de Supabase.
- Ne calcule jamais le montant final (utilisé pour Stripe).
- Ne décide jamais du statut d'un booking.
- Ne touche jamais au Ledger financier.
</file>

<file path="docs/refund_engine_technical.md">
# Internal Technical Documentation: Cancellation & Refund Engine (V1 Stable)

## 1. System Overview

The purpose of the cancellation and refund engine is to provide a robust, automated financial framework for handling booking cancellations.

- **Automated cancellation**: based on versioned policies linked to each booking.
- **No manual refunds allowed**: all refunds must go through the engine for consistency.
- **Stripe-driven payment lifecycle**: the state of a booking is tied to Stripe events.
- **Financial layer as single source of truth**: all monetary movements are tracked in `financial_movements`.
- **Multi-tenant compatible**: strict isolation via `tenant_id`.

### Separation of Concerns

- **Business state**: `bookings.status` reflects the current stage of the service.
- **Financial truth**: `financial_movements` reflects the actual accounting reality.

---

## 2. Booking Lifecycle (State Machine)

The booking lifecycle is driven by both Edge Functions and Stripe Webhooks.

| Status                     | Set By                                 | Description                                           | Financial Implication                              |
| -------------------------- | -------------------------------------- | ----------------------------------------------------- | -------------------------------------------------- |
| `accepted_pending_payment` | App Logic                              | Driver has accepted the booking.                      | None yet.                                          |
| `paid`                     | Webhook (`checkout.session.completed`) | Stripe payment confirmed.                             | `payment` movement (+ `commission` if applicable). |
| `cancelled_pending_refund` | Edge Function (`cancel-booking`)       | Cancellation requested; refund initiated with Stripe. | None yet (waiting for confirmation).               |
| `cancelled_refunded`       | Webhook (`refund.created`)             | Stripe refund confirmed.                              | `refund` (debit) + `commission_reversal` (credit). |
| `cancelled_no_refund`      | Edge Function (`cancel-booking`)       | Cancelled but policy calculated 0% refund.            | None (booking closed).                             |

---

## 3. Cancellation Policies

Table: `cancellation_policies`

- **Versioned per tenant**: each tenant can have multiple versions of their policy.
- **One active policy**: only one policy is marked as `active: true` per tenant.
- **Attached at payment time**: the active policy ID is copied to `bookings.cancellation_policy_id` during the `paid` event.
- **Immutable once attached**: a trigger prevents changing the policy linked to a booking.

### Fields

- `version`: incremental version number.
- `hours_before_full_refund`: window for 100% refund.
- `hours_before_partial_refund`: window for partial refund.
- `partial_refund_rate`: percentage refunded in partial window (e.g., 0.5 for 50%).
- `no_show_refund_rate`: refund rate for no-show reason (usually 0).
- `driver_fault_refund_rate`: refund rate for driver-fault reason (usually 1).
- `active`: indicates if this is the current policy to be used for new bookings.

### Refund Calculation Logic

`deltaHours = pickup_time - cancellation_time`

_Decision Tree:_

1. **driver_fault** → use `driver_fault_refund_rate`.
2. **no_show** → use `no_show_refund_rate`.
3. **deltaHours >= hours_before_full_refund** → 100% refund.
4. **deltaHours >= hours_before_partial_refund** → use `partial_refund_rate`.
5. **else** → 0% refund.

---

## 4. Edge Functions

### `cancel-booking`

- **Validate**: ensures booking is currently `paid`.
- **Load Policy**: retrieves the policy attached specifically to that booking.
- **Calculate**: computes the refund amount based on the decision tree.
- **Stripe Refund**: if `amount > 0`, calls Stripe API `stripe.refunds.create`.
- **Update Status**: sets `cancelled_pending_refund` or `cancelled_no_refund`.
- _Note:_ This function does NOT insert financial movements; it only initiates the process.

### `handle_stripe_webhook`

Listens for critical lifecycle events:

#### Event: `checkout.session.completed`

- **Attach Policy**: links the current active policy to the booking.
- **Set Status**: updates booking to `paid`.
- **Financial Entry**:
  - Creates `payment` movement (credit to tenant).
  - Creates `commission` movement (debit from platform) if configured.

#### Event: `refund.created`

- **Global Idempotence**: checks `stripe_events` to ensure the event isn't processed twice.
- **Anti-Duplication**: verifies if the `stripe_refund_id` is already in `financial_movements`.
- **Financial Entry**:
  - Creates `refund` movement (debit from tenant).
  - Creates `commission_reversal` movement (credit to platform) proportional to `refund_ratio`.
- **Set Status**: updates booking to `cancelled_refunded`.
- _Note:_ No secondary Stripe API calls are made inside the webhook (except signature check).

---

## 5. Financial Layer

Table: `financial_movements`

### Movement Types

- `payment`: Initial customer payment.
- `refund`: Money returned to the customer.
- `commission`: Platform fee.
- `commission_reversal`: Platform fee returned due to refund.

### Logic

`refund_ratio = refund_amount / total_amount`
This ratio is used to ensure all components (NET, VAT, Commission) are reversed proportionally.

---

## 6. Idempotence Strategy

- **`stripe_events` table**: Ensures that the exact same Stripe event ID is never processed twice.
- **`stripe_refund_id` uniqueness**: Acts as a secondary guard within the financial movements table to prevent duplicate accounting entries for the same refund.
- **Webhook Resiliency**: Safe against Stripe retries and network failures.
- **Specific Event**: Uses `refund.created` for faster and more reliable status synchronization than legacy events.

---

## 7. Security Guarantees

- **Policy Snapshot**: Rules are locked at the moment of payment; subsequent policy changes don't affect existing contracts.
- **Immutability**: Triggers prevent tampering with the linked policy or the critical financial metadata of a booking after payment.
- **No Manual Backdoor**: No path exists for manual refunds that bypass the accounting layer.
- **Metadata Validation**: Every webhook event is cross-referenced with internal database IDs.
- **RLS Isolation**: Cross-tenant data leaks are prevented at the database level.

---

## 8. Known Design Decisions

- **`refund.created` vs `charge.refunded`**: selected for more granular control and immediate feedback.
- **Minimal Webhook Logic**: No external API calls (except signature) inside the webhook handler to prevent timeouts and complexity.
- **State Separation**: Business status (`bookings`) and monetary state (`financial_movements`) are separate but eventually consistent.
- **Proportional Reversal**: Ensures that accounting remains balanced even with partial refunds.

---

## 9. Future Hardening Roadmap

- **Time Guard**: Prevent cancellation after `pickup_time`.
- **Auto No-Show**: Automated handling of non-presentation.
- **RLS for Edge Functions**: stricter enforcement for `cancel-booking`.
- **Administrative Audit**: tracking who initiated each refund manually if needed.
- **Optional Non-Refundable Commission**: business logic option to keep commission even on refund.
- **Cleanup**: Remove legacy `refunded` status items once migration is complete.
- **Multi-Refund Support**: Handle cases where a booking is refunded in multiple small partial chunks.
</file>

<file path="docs/reporting.md">
# 📑 Reporting Financier & Vues SQL

VTC HUB fournit une infrastructure de reporting robuste basée sur des vues SQL optimisées. Ces vues permettent d'extraire des données agrégées pour la comptabilité et le pilotage de l'activité.

---

## 1️⃣ Vues Disponibles

### 📊 `financial_monthly_summary`

Résumé mensuel par tenant.

- **Colonnes** : `month`, `year`, `tenant_id`, `gross_revenue` (TTC), `net_revenue` (HT), `vat_total`, `commission_total`, `refund_total`.
- **Usage** : Dashboard mensuel, préparation déclaration TVA.

### 📅 `financial_yearly_summary`

Résumé annuel pour le bilan comptable.

- **Usage** : Clôture d'exercice, comparaison N-1.

### 🧾 `financial_fiscal_detail`

Vue granulaire de chaque mouvement financier.

- **Usage** : Audit de transaction, export pour expert-comptable.

---

## 2️⃣ Logique de Calcul

Le reporting ne se base pas sur les `bookings` (qui peuvent changer) mais sur les `financial_movements` (immutables).

- **Brut (TTC)** : Somme des directions `credit` (payment) moins somme des directions `debit` (refund).
- **TVA** : Somme des `vat_amount`.
- **Commission** : Somme des mouvements de type `commission` (débit plateforme).

---

## 3️⃣ Sécurité & Multi-tenant

Toutes les vues respectent les politiques **RLS (Row Level Security)**. Un tenant ne peut voir que ses propres statistiques financières. Les administrateurs de la plateforme peuvent voir l'ensemble des données via `service_role`.

---

## 4️⃣ Évolutions Futures

- Export CSV direct depuis le dashboard.
- Graphiques de tendance de revenus.
- Calcul automatique de la rentabilité par chauffeur.
</file>

<file path="docs/user_guide.md">
# Guide Utilisateur : Gestion de votre Entreprise (MVP)

Ce guide vous explique comment utiliser les nouvelles fonctionnalités de votre dashboard.

## 1. Gestion de vos Tarifs (Pricing)

Pour configurer ce que vos clients paieront lors de leurs réservations :

1. Allez dans l'onglet **Pricing** de votre menu latéral.
2. Si aucun tarif n'existe, cliquez sur **Configurer maintenant**.
3. **Ajouter un service** :
   - Cliquez sur le bouton en haut à droite.
   - Saisissez le nom (ex: "Berline Éco"), le prix de base, le tarif au kilomètre et le montant minimum de la course.
   - Validez.
4. **Modifier/Désactiver** :
   - Utilisez le bouton **Modifier** sur une ligne existante.
   - Vous pouvez décocher **Service Actif** pour masquer temporairement un type de véhicule sans le supprimer.

## 2. Sécurité de votre Session

Pour protéger vos données, le système surveille votre activité :

- **Déconnexion automatique** : Si vous ne touchez pas à votre souris ou clavier pendant **30 minutes**, vous serez automatiquement déconnecté. Un message vous en informera sur la page de connexion.
- **Confirmation de déconnexion** : Un clic accidentel sur "Se déconnecter" n'aura pas d'effet immédiat ; une fenêtre de confirmation apparaîtra pour valider votre choix.

## 3. Paramètres & Suppression de Compte

Dans l'onglet **Paramètres**, vous trouverez la **Zone de Danger** tout en bas de la page.

- Cette option est réservée au propriétaire (Owner).
- Elle permet de fermer définitivement le compte de l'entreprise.
- **Attention** : Cette action est irréversible et nécessite de taper manuellement une phrase de sécurité.

## 4. Support & Emails

Vous recevrez désormais des emails transactionnels (ex: confirmation d'inscription). Vérifiez vos spams si vous ne recevez rien, et assurez-vous que votre adresse est correcte dans votre profil.
</file>

<file path="src/components/admin/DataTable.astro">
---
// src/components/admin/DataTable.astro
interface Props {
    title: string;
    description?: string;
    headers: string[];
    data: any[];
    emptyMessage?: string;
}

const { title, description, headers, data, emptyMessage = "Aucune donnée trouvée." } = Astro.props;
---

<div class="mb-12">
    <div class="flex items-end justify-between mb-8">
        <div>
            <h2 class="text-3xl font-black italic uppercase tracking-tighter text-white">
                {title}
            </h2>
            {description && (
                <p class="text-sm font-bold tracking-widest uppercase text-slate-500 mt-2">
                    {description}
                </p>
            )}
        </div>
        <div class="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-[#555]">
            Total: {data.length}
        </div>
    </div>

    <div class="overflow-hidden border border-white/5 bg-white/5 rounded-3xl backdrop-blur-3xl shadow-2xl relative">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none"></div>

        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[800px]">
                <thead>
                    <tr class="bg-white/10 border-b border-white/5">
                        {headers.map((header) => (
                            <th class="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                    {data.length > 0 ? data.map((row) => (
                        <tr class="group hover:bg-white/5 transition-colors duration-200">
                            <slot name="row" row={row} />
                        </tr>
                    )) : (
                        <tr>
                            <td colspan={headers.length} class="px-12 py-24 text-center">
                                <span class="text-sm font-bold tracking-widest uppercase text-slate-600 block mb-4">
                                    {emptyMessage}
                                </span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
</div>
</file>

<file path="src/components/admin/KPIGrid.astro">
---
// src/components/admin/KPIGrid.astro
interface Props {
    title: string;
    items: {
        label: string;
        value: string | number;
        icon: string;
        trend?: string;
        trendColor?: string;
    }[];
}

const { title, items } = Astro.props;
---

<div class="mb-12">
    <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-black italic uppercase tracking-tighter text-white">
            {title}
        </h2>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
            <div class="relative p-6 transition-all border group bg-white/5 border-white/5 rounded-2xl hover:bg-white/[0.08] hover:border-indigo-500/30 overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 bg-indigo-500/30 translate-x-16 -translate-y-16 group-hover:opacity-20 transition-opacity"></div>

                <div class="flex items-start justify-between">
                    <div>
                        <p class="text-sm font-bold tracking-widest uppercase text-slate-500 mb-2">
                            {item.label}
                        </p>
                        <p class="text-4xl font-black tracking-tighter text-white">
                            {item.value}
                        </p>
                    </div>
                    <div class="p-3 border rounded-xl bg-indigo-500/10 border-indigo-500/20 text-indigo-400">
                        <svg class="w-6 h-6 outline-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" set:html={item.icon}></svg>
                    </div>
                </div>

                {item.trend && (
                    <div class="flex items-center gap-1 mt-6">
                        <span class={`text-xs font-bold tracking-widest uppercase ${item.trendColor || 'text-indigo-400'}`}>
                            {item.trend}
                        </span>
                    </div>
                )}
            </div>
        ))}
    </div>
</div>
</file>

<file path="src/components/admin/MonthlyChart.astro">
---
// src/components/admin/MonthlyChart.astro
interface Props {
    title: string;
    data: {
        month: string;
        total_net: number;
    }[];
}

const { title, data } = Astro.props;
const max = Math.max(...data.map(d => d.total_net), 100);
---

<div class="p-8 border bg-white/5 border-white/5 rounded-3xl overflow-hidden relative">
    <div class="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-10 bg-indigo-500/20"></div>

    <div class="mb-8">
        <h2 class="text-2xl font-black italic uppercase tracking-tighter text-white">
            {title}
        </h2>
    </div>

    <div class="flex items-end gap-3 h-64 mt-12">
        {data.map((item) => {
            const height = (item.total_net / max) * 100;
            return (
                <div class="flex-1 flex flex-col items-center group">
                    <div class="w-full relative">
                        <div
                            class="w-full bg-indigo-600/20 border-x border-t border-indigo-500/30 rounded-t-lg transition-all duration-300 group-hover:bg-indigo-600/40 relative overflow-hidden"
                            style={`height: ${height}%`}
                        >
                            <div class="absolute inset-0 bg-gradient-to-t from-transparent to-indigo-500/10"></div>
                        </div>
                        <div class="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all text-xs font-black text-indigo-400 whitespace-nowrap bg-[#0F0F11] border border-white/5 px-2 py-1 rounded shadow-xl">
                            {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.total_net)}
                        </div>
                    </div>
                    <span class="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 truncate w-full text-center">
                        {item.month}
                    </span>
                </div>
            )
        })}
    </div>
</div>
</file>

<file path="src/components/common/ConfirmationModal.tsx">
// src/components/common/ConfirmationModal.tsx
import { AlertCircle, X } from "lucide-react";
import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel: string;
  confirmVariant?: "danger" | "primary" | "success";
  loading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel,
  confirmVariant = "primary",
  loading = false,
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: "bg-red-600 hover:bg-red-500 shadow-red-600/20",
    primary: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20",
    success: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20",
  };

  const iconStyles = {
    danger: "bg-red-500/10 border-red-500/20 text-red-500",
    primary: "bg-indigo-500/10 border-indigo-500/20 text-indigo-500",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
  };

  return (
    <div className='fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-md bg-black/80 transition-all'>
      <div className='relative glass max-w-sm w-full rounded-[2.5rem] border border-white/10 shadow-2xl p-8 animate-in fade-in zoom-in duration-300 transform scale-100'>
        <button
          onClick={onClose}
          className='absolute top-8 right-8 text-slate-500 hover:text-white transition-colors'>
          <X className='w-5 h-5' />
        </button>

        <div
          className={`w-12 h-12 border rounded-2xl flex items-center justify-center mb-6 ${iconStyles[confirmVariant]}`}>
          <AlertCircle className='w-6 h-6' />
        </div>

        <h3 className='text-2xl font-black italic uppercase text-white mb-2 tracking-tighter'>
          {title}
        </h3>
        <p className='text-slate-400 text-sm font-medium mb-8 leading-relaxed italic'>
          {message}
        </p>

        <div className='flex flex-col sm:flex-row gap-3 font-black uppercase text-[10px] tracking-widest'>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-4 text-white rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50 ${variantStyles[confirmVariant]}`}>
            {loading ? (
              <span className='w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin inline-block' />
            ) : (
              confirmLabel
            )}
          </button>
          <button
            onClick={onClose}
            className='flex-1 py-4 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl transition-all border border-white/5 active:scale-95'>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};
</file>

<file path="src/components/common/InactivityTimeout.astro">
---
// src/components/common/InactivityTimeout.astro
/**
 * Ce composant gère la déconnexion automatique en cas d'inactivité.
 * Il surveille les mouvements de souris, clics, touches clavier et scroll.
 */
interface Props {
    timeoutMinutes?: number;
}

const { timeoutMinutes = 30 } = Astro.props;
const timeoutMs = timeoutMinutes * 60 * 1000;
---

<script define:vars={{ timeoutMs }}>
    import { supabase } from "@/lib/supabase/client";

    let inactivityTimer;

    const logout = async () => {
        console.log("Inactivité détectée. Déconnexion automatique...");
        await supabase.auth.signOut();
        window.location.href = "/login?reason=inactivity";
    };

    const resetTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(logout, timeoutMs);
    };

    // Liste des événements à surveiller pour réinitialiser le timer
    const activityEvents = [
        'mousedown',
        'mousemove',
        'keypress',
        'scroll',
        'touchstart',
        'click'
    ];

    // Initialisation
    const initInactivityTracker = () => {
        // Ne pas tracker si on est sur la page de login ou d'accueil publique
        const currentPath = window.location.pathname;
        if (currentPath === '/login' || currentPath === '/') return;

        // Démarrer le premier timer
        resetTimer();

        // Ajouter les écouteurs d'événements
        activityEvents.forEach(event => {
            document.addEventListener(event, resetTimer, { passive: true });
        });
    };

    // Support Astro View Transitions
    document.addEventListener('astro:page-load', initInactivityTracker);

    // Initialisation standard au cas où View Transitions n'est pas utilisé activement
    initInactivityTracker();
</script>
</file>

<file path="src/components/drivers/DriverModal.tsx">
// src/components/drivers/DriverModal.tsx
import { createDriver, updateDriver } from "@/services/drivers";
import { Save, UserPlus, X } from "lucide-react";
import React, { useState } from "react";

interface DriverModalProps {
  tenantId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  driver?: any; // If provided, we are in edit mode
}

export const DriverModal: React.FC<DriverModalProps> = ({
  tenantId,
  isOpen,
  onClose,
  onSuccess,
  driver,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const driverData = {
      tenant_id: tenantId,
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      phone: formData.get("phone") as string,
      license_number: formData.get("license_number") as string,
    };

    try {
      if (driver) {
        await updateDriver(driver.id, driverData);
      } else {
        await createDriver(driverData);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-black/80 transition-all'>
      <div className='relative glass max-w-lg w-full rounded-[2.5rem] border border-white/10 shadow-2xl p-8 animate-in fade-in zoom-in duration-300'>
        <button
          onClick={onClose}
          className='absolute top-8 right-8 text-slate-500 hover:text-white transition-colors'>
          <X className='w-6 h-6' />
        </button>

        <div className='flex items-center gap-4 mb-10'>
          <div className='w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 shadow-lg shadow-indigo-500/10'>
            <UserPlus className='w-6 h-6' />
          </div>
          <div>
            <h3 className='text-2xl font-black uppercase text-white tracking-tighter leading-none mb-1'>
              {driver ? "Modifier Chauffeur" : "Nouveau Chauffeur"}
            </h3>
            <p className='text-[10px] font-bold uppercase tracking-widest text-slate-500'>
              {driver
                ? "Mettre à jour les informations"
                : "Ajouter un collaborateur à la flotte"}
            </p>
          </div>
        </div>

        {error && (
          <div className='mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold uppercase tracking-widest'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
                {" "}
                Prénom{" "}
              </label>
              <input
                name='first_name'
                required
                defaultValue={driver?.first_name}
                placeholder='Jean'
                className='w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
                {" "}
                Nom{" "}
              </label>
              <input
                name='last_name'
                required
                defaultValue={driver?.last_name}
                placeholder='Dupont'
                className='w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
              {" "}
              Portable{" "}
            </label>
            <input
              name='phone'
              required
              defaultValue={driver?.phone}
              placeholder='06 12 34 56 78'
              className='w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700'
            />
          </div>

          <div className='space-y-2'>
            <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
              {" "}
              Numéro de Carte Pro{" "}
            </label>
            <input
              name='license_number'
              required
              defaultValue={driver?.license_number}
              placeholder='VTC-123456789'
              className='w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 uppercase'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full mt-6 flex items-center justify-center gap-3 py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98]'>
            {loading ? (
              <span className='w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin' />
            ) : (
              <>
                {driver ? (
                  <Save className='w-4 h-4' />
                ) : (
                  <UserPlus className='w-4 h-4' />
                )}
                <span>
                  {driver
                    ? "Enregistrer les modifications"
                    : "Créer le chauffeur"}
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
</file>

<file path="src/components/pricing/TransferManager.tsx">
// src/components/pricing/TransferManager.tsx
import {
  createFixedRoute,
  createZone,
  deleteFixedRoute,
  getFixedRoutes,
  getZones,
  updateFixedRoute,
} from "@/services/pricing";
import {
  ArrowRightLeft,
  Edit,
  Loader2,
  MapPin,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const VEHICLE_CATEGORIES = ["berline", "van", "suv", "minibus", "luxury"];

export const TransferManager: React.FC<{ tenantId: string }> = ({
  tenantId,
}) => {
  const [zones, setZones] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState<any>(null);
  const [newZoneName, setNewZoneName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [z, r] = await Promise.all([
        getZones(tenantId),
        getFixedRoutes(tenantId),
      ]);
      setZones(z);
      setRoutes(r);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tenantId]);

  const handleCreateZone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newZoneName) return;
    try {
      setSubmitting(true);
      await createZone(tenantId, newZoneName);
      setNewZoneName("");
      setShowZoneModal(false);
      fetchData();
    } catch (err) {
      alert("Erreur lors de la création de la zone");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRouteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      setSubmitting(true);

      const payload = {
        tenant_id: tenantId,
        pickup_zone_id: formData.get("pickup") as string,
        dropoff_zone_id: formData.get("dropoff") as string,
        vehicle_category: formData.get("category") as string,
        price: parseFloat(formData.get("price") as string),
        is_bidirectional: formData.get("bidirectional") === "on",
      };

      if (editingRoute) {
        await updateFixedRoute(editingRoute.id, payload);
      } else {
        await createFixedRoute(payload);
      }

      setShowRouteModal(false);
      setEditingRoute(null);
      fetchData();
    } catch (err: any) {
      console.error(err);
      alert("Erreur lors de la sauvegarde du forfait.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRoute = async (id: string) => {
    if (window.confirm("Supprimer ce forfait ?")) {
      await deleteFixedRoute(id);
      fetchData();
    }
  };

  useEffect(() => {
    const openTransferModal = () => {
      setEditingRoute(null);
      setShowRouteModal(true);
    };
    const openZoneModal = () => setShowZoneModal(true);

    window.addEventListener("pricing:open-transfer-modal", openTransferModal);
    window.addEventListener("pricing:open-zone-modal", openZoneModal);

    return () => {
      window.removeEventListener(
        "pricing:open-transfer-modal",
        openTransferModal,
      );
      window.removeEventListener("pricing:open-zone-modal", openZoneModal);
    };
  }, []);

  if (loading)
    return (
      <div className='flex justify-center p-20 text-slate-500 animate-pulse font-bold tracking-widest uppercase text-xs'>
        Chargement des forfaits...
      </div>
    );

  return (
    <div className='space-y-12'>
      {/* Routes Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {routes.map((r) => (
          <div
            key={r.id}
            className='glass p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group relative overflow-hidden'>
            <div className='absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/10 transition-all' />

            <div className='flex justify-between items-start mb-6'>
              <div className='flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20'>
                {r.vehicle_category}
              </div>
              {r.is_bidirectional && (
                <div className='text-slate-500' title='Aller-Retour'>
                  <ArrowRightLeft className='w-4 h-4' />
                </div>
              )}
            </div>

            <div className='space-y-2 mb-8'>
              <div className='flex items-center gap-3'>
                <div className='w-2 h-2 rounded-full bg-emerald-500' />
                <span className='text-lg font-black text-white uppercase tracking-tighter'>
                  {r.pickup_zone?.name}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-2 h-2 rounded-full bg-red-500' />
                <span className='text-lg font-black text-white uppercase tracking-tighter'>
                  {r.dropoff_zone?.name}
                </span>
              </div>
            </div>

            <div className='flex items-end justify-between pt-6 border-t border-white/5'>
              <div>
                <p className='text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1'>
                  Prix Fixe
                </p>
                <p className='text-3xl font-black text-white tabular-nums tracking-tighter'>
                  {r.price}
                  <span className='text-lg ml-1 text-slate-500'>€</span>
                </p>
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => {
                    setEditingRoute(r);
                    setShowRouteModal(true);
                  }}
                  className='p-3 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5 hover:bg-white/10'>
                  <Edit className='w-4 h-4' />
                </button>
                <button
                  onClick={() => handleDeleteRoute(r.id)}
                  className='p-3 text-slate-700 hover:text-red-500 transition-colors bg-white/5 rounded-xl border border-white/5 hover:bg-red-500/10 hover:border-red-500/20'>
                  <Trash2 className='w-5 h-5' />
                </button>
              </div>
            </div>
          </div>
        ))}

        {routes.length === 0 && (
          <div className='col-span-full py-20 text-center glass rounded-[2.5rem] border border-white/5 bg-white/[0.01]'>
            <div className='w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-slate-700 mx-auto mb-6'>
              <MapPin className='w-8 h-8' />
            </div>
            <p className='text-slate-500 text-sm font-medium uppercase tracking-widest'>
              Aucun forfait configuré
            </p>
          </div>
        )}
      </div>

      {/* ZONE MODAL */}
      {showZoneModal && (
        <div className='fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-md bg-black/80'>
          <div className='relative glass max-w-md w-full rounded-[2.5rem] border border-white/10 shadow-2xl p-8 animate-in zoom-in duration-300'>
            <button
              onClick={() => setShowZoneModal(false)}
              className='absolute top-8 right-8 text-slate-500 hover:text-white'>
              <X className='w-6 h-6' />
            </button>
            <h3 className='text-2xl font-black uppercase text-white mb-2'>
              Zones
            </h3>
            <p className='text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-8'>
              Définissez vos points de départ/arrivée (ex: Paris, CDG)
            </p>

            <div className='max-h-60 overflow-y-auto pr-2 custom-scrollbar mb-8 space-y-2'>
              {zones.map((z) => (
                <div
                  key={z.id}
                  className='flex justify-between items-center px-5 py-4 bg-white/5 border border-white/5 rounded-xl uppercase font-black text-xs text-white'>
                  {z.name}
                </div>
              ))}
            </div>

            <form onSubmit={handleCreateZone} className='space-y-4'>
              <input
                value={newZoneName}
                onChange={(e) => setNewZoneName(e.target.value)}
                placeholder='Nom de la zone (ex: Orly)'
                className='w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white font-bold text-sm focus:outline-none focus:border-indigo-500 transition-all uppercase'
              />
              <button
                disabled={submitting}
                className='w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20'>
                {submitting ? (
                  <Loader2 className='w-5 h-5 animate-spin' />
                ) : (
                  <>
                    <Plus className='w-4 h-4' /> Ajouter la zone
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ROUTE MODAL */}
      {showRouteModal && (
        <div className='fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-md bg-black/80'>
          <div className='relative glass max-w-lg w-full rounded-[3rem] border border-white/10 shadow-2xl p-10 animate-in zoom-in duration-300'>
            <button
              onClick={() => setShowRouteModal(false)}
              className='absolute top-8 right-8 text-slate-500 hover:text-white'>
              <X className='w-6 h-6' />
            </button>
            <h3 className='text-3xl font-black uppercase text-white mb-1'>
              {editingRoute ? "Modifier" : "Nouveau"} Forfait
            </h3>
            <p className='text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-10'>
              Configuration d'un prix point à point
            </p>

            <form onSubmit={handleRouteSubmit} className='space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
                    Départ
                  </label>
                  <select
                    name='pickup'
                    defaultValue={editingRoute?.pickup_zone_id}
                    required
                    className='w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-5 text-white font-bold text-sm appearance-none outline-none focus:border-indigo-500 uppercase'>
                    <option value='' className='bg-black text-slate-500'>
                      SÉLECTIONNER
                    </option>
                    {zones.map((z) => (
                      <option key={z.id} value={z.id} className='bg-black'>
                        {z.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='space-y-2'>
                  <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
                    Arrivée
                  </label>
                  <select
                    name='dropoff'
                    defaultValue={editingRoute?.dropoff_zone_id}
                    required
                    className='w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-5 text-white font-bold text-sm appearance-none outline-none focus:border-indigo-500 uppercase'>
                    <option value='' className='bg-black text-slate-500'>
                      SÉLECTIONNER
                    </option>
                    {zones.map((z) => (
                      <option key={z.id} value={z.id} className='bg-black'>
                        {z.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
                    Véhicule
                  </label>
                  <select
                    name='category'
                    defaultValue={editingRoute?.vehicle_category}
                    required
                    className='w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-5 text-white font-bold text-sm appearance-none outline-none focus:border-indigo-500 uppercase'>
                    {VEHICLE_CATEGORIES.map((c) => (
                      <option key={c} value={c} className='bg-black'>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='space-y-2'>
                  <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
                    Prix Fixe (€)
                  </label>
                  <input
                    name='price'
                    type='number'
                    step='0.01'
                    defaultValue={editingRoute?.price}
                    required
                    placeholder='0.00'
                    className='w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white font-bold tabular-nums outline-none focus:border-indigo-500'
                  />
                </div>
              </div>

              <div className='flex items-center gap-4 py-4 px-6 bg-white/5 border border-white/5 rounded-2xl'>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    name='bidirectional'
                    id='bidirectional'
                    className='sr-only peer'
                    defaultChecked={
                      editingRoute ? editingRoute.is_bidirectional : true
                    }
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
                <span className='text-[10px] font-black uppercase tracking-widest text-slate-400'>
                  Appliquer dans les deux sens (A/R)
                </span>
              </div>

              <button
                disabled={submitting}
                className='w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/20 active:scale-95'>
                {submitting ? (
                  <Loader2 className='w-6 h-6 animate-spin' />
                ) : (
                  <>
                    <Plus className='w-5 h-5' />{" "}
                    {editingRoute ? "Mettre à jour" : "Enregistrer"} le Forfait
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
</file>

<file path="src/components/vehicles/VehicleList.tsx">
// src/components/vehicles/VehicleList.tsx
import { getVehicles } from "@/services/vehicles";
import { Car, Edit2, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { VehicleModal } from "./VehicleModal";

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  plate_number: string;
  category: string | null;
  capacity: number | null;
  status?: string | null;
}

interface VehicleListProps {
  tenantId: string;
}

export const VehicleList: React.FC<VehicleListProps> = ({ tenantId }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await getVehicles(tenantId);
      setVehicles(data || []);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [tenantId]);

  useEffect(() => {
    const openModal = () => setShowModal(true);
    window.addEventListener("vehicles:open-modal", openModal);
    return () => window.removeEventListener("vehicles:open-modal", openModal);
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <div className='flex justify-between items-end mb-10'>
        <div>
          <p className='text-[10px] font-bold uppercase tracking-widest text-slate-500'>
            Liste de vos véhicules ({vehicles.length})
          </p>
        </div>
      </div>

      {loading ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='glass h-48 rounded-[2rem] border border-white/5 animate-pulse bg-white/5'
            />
          ))}
        </div>
      ) : vehicles.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 custom-scrollbar pb-12'>
          {vehicles.map((v) => (
            <div
              key={v.id}
              className='glass p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all group relative overflow-hidden'>
              {/* Background Glow */}
              <div className='absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/10 transition-all' />

              <div className='flex justify-between items-start mb-6'>
                <div className='w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110'>
                  <Car className='w-8 h-8' />
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                    v.status === "active"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/10"
                      : "bg-slate-500/10 text-slate-500 border-slate-500/10"
                  }`}>
                  {v.status === "active" ? "Opérationnel" : v.status}
                </div>
              </div>

              <div className='mb-6'>
                <h3 className='text-xl font-black text-white uppercase tracking-tighter mb-1'>
                  {v.brand} {v.model}
                </h3>
                <p className='text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/5 w-fit px-2 py-0.5 rounded-md'>
                  {v.plate_number}
                </p>
              </div>

              <div className='flex items-center justify-between border-t border-white/5 pt-6'>
                <div className='flex gap-4'>
                  <div>
                    <p className='text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1'>
                      Passagers
                    </p>
                    <p className='text-sm font-bold text-white uppercase italic'>
                      {v.capacity} Places
                    </p>
                  </div>
                  <div>
                    <p className='text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1'>
                      Catégorie
                    </p>
                    <p className='text-sm font-bold text-white uppercase italic'>
                      {v.category}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-1'>
                  <button className='p-2 text-slate-600 hover:text-white transition-colors'>
                    <Edit2 className='w-4 h-4' />
                  </button>
                  <button className='p-2 text-slate-600 hover:text-red-500 transition-colors'>
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex-1 glass rounded-[2.5rem] border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center p-20 text-center'>
          <div className='w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-slate-700 mb-6'>
            <Car className='w-10 h-10' />
          </div>
          <h3 className='text-2xl font-black text-white uppercase tracking-tighter mb-2'>
            Aucun véhicule enregistré
          </h3>
          <p className='text-slate-500 text-sm italic mb-8 max-w-sm'>
            Vous n'avez pas encore de véhicule dans votre flotte. Enregistrez
            votre premier véhicule pour commencer à accepter des courses.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className='flex items-center gap-3 px-10 py-5 bg-white text-black hover:bg-indigo-50 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-white/20 active:scale-95'>
            <Plus className='w-4 h-4' />
            Ajouter un véhicule
          </button>
        </div>
      )}

      <VehicleModal
        tenantId={tenantId}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchVehicles}
      />
    </div>
  );
};
</file>

<file path="src/components/vehicles/VehicleModal.tsx">
// src/components/vehicles/VehicleModal.tsx
import { createVehicle } from "@/services/vehicles";
import { Car, Plus, X } from "lucide-react";
import React, { useState } from "react";

interface VehicleModalProps {
  tenantId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const VehicleModal: React.FC<VehicleModalProps> = ({
  tenantId,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const vehicleData = {
      tenant_id: tenantId,
      brand: formData.get("brand") as string,
      model: formData.get("model") as string,
      plate_number: formData.get("plate_number") as string,
      category: formData.get("category") as string,
      capacity: parseInt(formData.get("capacity") as string) || 4,
      status: "active",
    };

    try {
      await createVehicle(vehicleData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-black/80 transition-all'>
      <div className='relative glass max-w-lg w-full rounded-[2.5rem] border border-white/10 shadow-2xl p-8 animate-in fade-in zoom-in duration-300'>
        <button
          onClick={onClose}
          className='absolute top-8 right-8 text-slate-500 hover:text-white transition-colors'>
          <X className='w-6 h-6' />
        </button>

        <div className='flex items-center gap-4 mb-10'>
          <div className='w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 shadow-lg shadow-indigo-500/10'>
            <Car className='w-6 h-6' />
          </div>
          <div>
            <h3 className='text-2xl font-black uppercase text-white tracking-tighter leading-none mb-1'>
              Nouveau véhicule
            </h3>
            <p className='text-[10px] font-bold uppercase tracking-widest text-slate-500'>
              Enregistrer un véhicule dans la flotte
            </p>
          </div>
        </div>

        {error && (
          <div className='mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold uppercase tracking-widest'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
                {" "}
                Marque{" "}
              </label>
              <input
                name='brand'
                required
                placeholder='Mercedes, Tesla, etc.'
                className='w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
                {" "}
                Modèle{" "}
              </label>
              <input
                name='model'
                required
                placeholder='Classe E, Model S, etc.'
                className='w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
              {" "}
              Plaque d'immatriculation{" "}
            </label>
            <input
              name='plate_number'
              required
              placeholder='AA-123-BB'
              className='w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 uppercase'
            />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
                {" "}
                Catégorie{" "}
              </label>
              <select
                name='category'
                required
                className='w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all appearance-none'>
                <option value='berline' className='bg-black text-white'>
                  Berline
                </option>
                <option value='van' className='bg-black text-white'>
                  Van
                </option>
                <option value='suv' className='bg-black text-white'>
                  SUV
                </option>
                <option value='minibus' className='bg-black text-white'>
                  Minibus
                </option>
                <option value='luxury' className='bg-black text-white'>
                  Luxe
                </option>
              </select>
            </div>
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1'>
                {" "}
                Passagers{" "}
              </label>
              <input
                name='capacity'
                type='number'
                required
                defaultValue='4'
                min='1'
                className='w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700'
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full mt-6 flex items-center justify-center gap-3 py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98]'>
            {loading ? (
              <span className='w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin' />
            ) : (
              <>
                <Plus className='w-4 h-4' />
                <span>Créer le véhicule</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
</file>

<file path="src/layouts/Layout.astro">
---
// src/layouts/Layout.astro
interface Props {
    title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="fr">
    <head>
        <meta charset="UTF-8" />
        <meta name="description" content="VTC MVP Onboarding" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="generator" content={Astro.generator} />
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
            rel="stylesheet"
        />
    </head>
    <body>
        <slot />
    </body>
</html>
<style is:global>
    :root {
        --accent: 136, 58, 234;
        --accent-light: 224, 204, 250;
        --accent-dark: 49, 10, 101;
        --accent-gradient: linear-gradient(
            45deg,
            rgb(var(--accent)),
            rgb(var(--accent-light)) 30%,
            white 60%
        );
    }
    html {
        font-family: "Inter", system-ui, sans-serif;
        background: #13151a;
    }
    body {
        margin: 0;
    }
    code {
        font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
    }
</style>
</file>

<file path="src/lib/guards/platform.ts">
// src/lib/guards/platform.ts
import { createAdminClient } from "../supabase/server";

const PLATFORM_ROLES = ["super_admin", "platform_staff"];

export async function requirePlatformAdmin(profile: any) {
  if (!profile?.id) {
    throw new Error("Unauthorized");
  }

  const supabaseAdmin = createAdminClient();

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("platform_role")
    .eq("id", profile.id)
    .maybeSingle();

  if (error || !data || !PLATFORM_ROLES.includes(data.platform_role)) {
    throw new Error("Unauthorized");
  }

  return true;
}
</file>

<file path="src/lib/supabase/server.ts">
// src/lib/supabase/server.ts
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
</file>

<file path="src/pages/admin/ledger.astro">
---
// src/pages/admin/ledger.astro
import DataTable from "../../components/admin/DataTable.astro";
import AdminLayout from "../../layouts/AdminLayout.astro";
import { requirePlatformAdmin } from "../../lib/guards/platform";
import { createAdminClient } from "../../lib/supabase/server";

const { profile } = Astro.locals;

// Protection d'accès plateforme
try {
  await requirePlatformAdmin(profile);
} catch {
  return Astro.redirect("/login");
}

const supabaseAdmin = createAdminClient();

const bookingId = Astro.url.searchParams.get("booking_id");

let query = supabaseAdmin.from("financial_movements").select("*").order("created_at", { ascending: false });

if (bookingId) {
    query = query.eq("booking_id", bookingId);
}

const { data: movements } = await query;



const headers = ["Référence Booking", "Type de Mouvement", "Date", "Montant Brut", "Frais Plateforme", "Net Chauffeur", "Date Création"];

const getTypeBadge = (type: string) => {
    switch (type) {
        case 'payment':
        case 'capture': return 'bg-green-500/10 text-green-500 border-green-500/20';
        case 'refund': return 'bg-red-500/10 text-red-500 border-red-500/20';
        case 'commission': return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
        case 'commission_reversal': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
        default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
}
---

<AdminLayout title="Grand Livre">
    {bookingId && (
        <div class="mb-12 flex items-center justify-between p-6 border bg-indigo-500/10 border-indigo-500/20 rounded-2xl">
            <div class="flex items-center gap-4">
                <div class="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                </div>
                <div>
                   <h3 class="text-sm font-black uppercase tracking-widest text-[#AAA]">Filtre Actif</h3>
                   <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter mt-1">Booking ID: {bookingId}</p>
                </div>
            </div>
            <a href="/admin/ledger" class="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                Réinitialiser
            </a>
        </div>
    )}

    <DataTable
        title="Mouvements Financiers"
        description="Détails techniques des transactions et de la distribution des revenus."
        headers={headers}
        data={movements || []}
    >
        {movements?.map((m) => (
            <tr slot="row" class="group hover:bg-white/5 transition-colors duration-200">
                <td class="px-6 py-4">
                    <a href={`/admin/ledger?booking_id=${m.booking_id}`} class="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">
                       #{m.booking_id?.slice(0, 8)}
                    </a>
                </td>
                <td class="px-6 py-4">
                    <span class={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border ${getTypeBadge(m.movement_type)}`}>
                        {m.movement_type}
                    </span>
                </td>
                <td class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {new Date(m.created_at).toLocaleDateString('fr-FR')} {new Date(m.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td class="px-6 py-4 text-xs font-black text-white italic">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(m.gross_amount || 0)}
                </td>
                <td class="px-6 py-4 text-xs font-black text-red-400/80 italic">
                    -{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(m.platform_commission_amount || 0)}
                </td>
                <td class="px-6 py-4 text-sm font-black text-green-500 italic">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(m.net_amount || 0)}
                </td>
                <td class="px-6 py-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    {m.id.slice(0,10)}...
                </td>

            </tr>
        ))}
    </DataTable>
</AdminLayout>
</file>

<file path="src/pages/admin/settings.astro">
---
// src/pages/admin/settings.astro
import AdminLayout from "../../layouts/AdminLayout.astro";
import { requirePlatformAdmin } from "../../lib/guards/platform";
import { createAdminClient } from "../../lib/supabase/server";

const { profile } = Astro.locals;

// Protection
try {
  await requirePlatformAdmin(profile);
} catch {
  return Astro.redirect("/login");
}

const supabaseAdmin = createAdminClient();
let message = "";
let errorMsg = "";

// 1️⃣ Fetch Initial Settings
const { data: settings } = await supabaseAdmin
  .from("platform_settings")
  .select("*")
  .single();

// 2️⃣ Handle Update
if (Astro.request.method === "POST") {
    try {
        const formData = await Astro.request.formData();
        const platformRate = parseFloat(formData.get("platform_rate") as string);
        const tenantRate = parseFloat(formData.get("tenant_rate") as string);

        const { error } = await supabaseAdmin
            .from("platform_settings")
            .update({
                default_platform_commission_rate: platformRate,
                default_tenant_commission_rate: tenantRate,
                updated_at: new Date().toISOString()
            })
            .eq("id", settings.id);

        if (error) throw error;
        message = "Paramètres mis à jour avec succès !";

        // Refresh data after update
        return Astro.redirect("/admin/settings?success=true");
    } catch (e: any) {
        errorMsg = "Erreur : " + e.message;
    }
}

const success = Astro.url.searchParams.get("success") === "true";
if (success) message = "Paramètres mis à jour avec succès !";
---

<AdminLayout title="Configuration Générale">
    <div class="max-w-5xl">

        {message && (
            <div class="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 w-fit">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {message}
            </div>
        )}

        {errorMsg && (
            <div class="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 w-fit">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errorMsg}
            </div>
        )}

        <form method="POST" class="space-y-16 text-left">
            <!-- SECTION : TAUX DE COMMISSION -->
            <section class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div class="lg:col-span-4">
                    <h2 class="text-2xl font-black italic uppercase text-white tracking-tight">Commissions</h2>
                    <p class="text-slate-500 text-xs font-medium mt-2 italic leading-relaxed">
                        Définit les taux de prélèvement par défaut appliqués lors du calcul des revenus dans le Ledger.
                    </p>
                </div>

                <div class="lg:col-span-8 flex flex-col gap-8">
                    <div class="glass p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.01] grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- Commission Plateforme -->
                        <div class="space-y-3">
                            <label class="block">
                                <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Prélèvement Plateforme</span>
                                <div class="relative group">
                                    <input
                                        type="number"
                                        name="platform_rate"
                                        step="0.01"
                                        value={settings?.default_platform_commission_rate}
                                        class="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:border-indigo-500/50 outline-none transition-all tabular-nums"
                                        placeholder="0.00"
                                    />
                                    <div class="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 font-black text-xs">%</div>
                                </div>
                                <p class="text-[8px] text-slate-600 mt-3 italic font-bold uppercase tracking-wider">Frais de service globaux</p>
                            </label>
                        </div>

                        <!-- Commission Tenant -->
                        <div class="space-y-3">
                            <label class="block">
                                <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Com. Partenaire Défaut</span>
                                <div class="relative group">
                                    <input
                                        type="number"
                                        name="tenant_rate"
                                        step="0.01"
                                        value={settings?.default_tenant_commission_rate}
                                        class="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:border-indigo-500/50 outline-none transition-all tabular-nums"
                                        placeholder="0.00"
                                    />
                                    <div class="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 font-black text-xs">%</div>
                                </div>
                                <p class="text-[8px] text-slate-600 mt-3 italic font-bold uppercase tracking-wider">Appliqué aux flottes externes</p>
                            </label>
                        </div>
                    </div>

                    <div class="flex items-center justify-between gap-8">
                        <div class="max-w-md p-6 rounded-3xl border border-indigo-500/10 bg-indigo-500/5">
                            <p class="text-[9px] text-slate-400 leading-relaxed font-bold italic uppercase tracking-tighter">
                                <span class="text-indigo-500">Note :</span> Ces taux servent de Fallback. Ils peuvent être surchargés individuellement par partenaire.
                            </p>
                        </div>

                        <button
                            type="submit"
                            class="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.95] whitespace-nowrap"
                        >
                            Sauvegarder les taux
                        </button>
                    </div>
                </div>
            </section>

            <!-- ESPACE POUR FUTURES SECTIONS -->
            <div class="pt-16 border-t border-white/5 opacity-20">
                <p class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Autres réglages bientôt disponibles...</p>
            </div>
        </form>
    </div>
</AdminLayout>
</file>

<file path="src/pages/admin/stripe-monitoring.astro">
---
// src/pages/admin/stripe-monitoring.astro
import DataTable from "../../components/admin/DataTable.astro";
import AdminLayout from "../../layouts/AdminLayout.astro";
import { requirePlatformAdmin } from "../../lib/guards/platform";
import { createAdminClient } from "../../lib/supabase/server";

const { profile } = Astro.locals;

// Protection d'accès plateforme
try {
  await requirePlatformAdmin(profile);
} catch {
  return Astro.redirect("/login");
}

const supabaseAdmin = createAdminClient();

const { data: errors, error: fetchError } = await supabaseAdmin
    .from("stripe_webhook_errors")
    .select("*")
    .order("received_at", { ascending: false });



const headers = ["ID", "Type d'événement", "Date de réception", "Message d'erreur"];
---

<AdminLayout title="Stripe Monitoring">
    <DataTable
        title="Webhooks Stripe"
        description="Suivi des erreurs lors du traitement des webhooks Stripe."
        headers={headers}
        data={errors || []}
    >
        {errors?.map((err) => (
            <tr slot="row" class="group hover:bg-white/5 transition-colors duration-200">
                <td class="px-6 py-4 text-xs font-mono text-slate-500">#{err.id.slice(0,8)}</td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-red-500/20">
                        {err.event_type}
                    </span>
                </td>
                <td class="px-6 py-4 text-sm text-slate-400">
                    {new Date(err.received_at).toLocaleString('fr-FR')}
                </td>
                <td class="px-6 py-4">
                    <p class="text-[10px] font-bold text-slate-500 max-w-lg truncate group-hover:whitespace-normal">
                        {err.error_message}
                    </p>
                </td>
            </tr>
        ))}
    </DataTable>
</AdminLayout>
</file>

<file path="src/pages/admin/tenants.astro">
---
// src/pages/admin/tenants.astro
import AdminLayout from "../../layouts/AdminLayout.astro";
import { requirePlatformAdmin } from "../../lib/guards/platform";
import { createAdminClient } from "../../lib/supabase/server";

const { profile } = Astro.locals;

// Protection d'accès plateforme
try {
  await requirePlatformAdmin(profile);
} catch {
  return Astro.redirect("/login");
}

const supabaseAdmin = createAdminClient();

// Récupération via la vue agrégée Ledger
const { data: tenants, error } = await supabaseAdmin
  .from('admin_tenants_overview')
  .select('*')
  .order('joined_at', { ascending: false });

if (error) console.error("Tenants Fetch Error:", error);
---

<AdminLayout title="Gestion des Partenaires">
    <div class="mb-10">
        <h1 class="text-4xl font-black italic uppercase tracking-tighter text-white">
            Partenaires & Flottes
        </h1>
        <p class="text-slate-500 text-sm font-medium mt-2 italic">Vision consolidée basée sur le Ledger financier.</p>
    </div>

    <div class="glass rounded-3xl overflow-hidden border border-white/5 bg-white/[0.01]">
        <table class="w-full text-left">
            <thead>
                <tr class="bg-white/5 border-b border-white/5">
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Compagnie</th>
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Volume</th>
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">CA Brut</th>
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Net Plateforme</th>
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Com. Moyenne</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
                {tenants?.map((t) => (
                    <tr class="hover:bg-white/5 transition-colors group">
                        <td class="px-6 py-4">
                            <p class="text-[11px] font-black italic uppercase text-white">{t.tenant_name}</p>
                            <p class="text-[9px] font-bold text-slate-500 mt-0.5">{t.primary_domain}</p>
                            <p class="text-[8px] text-slate-600 mt-1">ID: {t.tenant_id.slice(0,8)}</p>
                        </td>
                        <td class="px-6 py-4">
                            <span class="text-xs font-black text-slate-300">
                                {t.total_bookings} courses
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <span class="text-xs font-black text-white italic">
                                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(t.total_gross_revenue || 0)}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <span class="text-xs font-black text-green-400 italic">
                                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(t.total_net_revenue || 0)}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <span class="text-[10px] font-black text-indigo-400">
                                {(Number(t.avg_commission_rate) * 100).toFixed(1)}%
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</AdminLayout>
</file>

<file path="src/pages/api/admin/reject.ts">
import { createClient } from "@supabase/supabase-js";
import type { APIRoute } from "astro";
import { isPlatform } from "../../../lib/guards";

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { profile } = locals as any;

    // Sécurité Plateforme
    if (!isPlatform(profile)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    const { onboarding_id } = await request.json();

    if (!onboarding_id) {
      return new Response(JSON.stringify({ error: "Missing ID" }), {
        status: 400,
      });
    }

    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
    );

    // Passer le statut en 'rejected'
    const { error } = await supabase
      .from("onboarding")
      .update({ status: "rejected" })
      .eq("id", onboarding_id);

    if (error) {
      console.error("Reject Error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ message: "Rejected successfully" }), {
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
</file>

<file path="src/pages/api/tenant/.gitkeep">

</file>

<file path="src/pages/api/tenant/update-booking-status.ts">
// src/pages/api/tenant/update-booking-status.ts
import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

/**
 * API pour mettre à jour le statut d'une course
 * Sécurisé par tenant_id pour éviter les modifications croisées
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { booking_id, new_status } = await request.json();
    const { user, profile } = locals as any;

    if (!user || !profile) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Mise à jour sécurisée : on vérifie que la course appartient bien au tenant du profil
    const { error } = await supabase
      .from("bookings")
      .update({ status: new_status })
      .eq("id", booking_id)
      .eq("current_tenant_id", profile.tenant_id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
</file>

<file path="src/pages/api/approve-test.ts">
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
  const { onboarding_id } = await request.json()

  const res = await fetch(
    `${import.meta.env.PUBLIC_SUPABASE_URL}/functions/v1/approve_onboarding`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.SUPABASE_SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify({ onboarding_id })
    }
  )

  const text = await res.text()
  return new Response(text)
}
</file>

<file path="src/pages/admin-test.astro">
---
const onboardingId = "813c1332-5039-41ed-a20b-1ea19c63ce34";
---

<button id="approveBtn">Test Approve</button>

<script>
    const btn = document.getElementById("approveBtn");

    btn.addEventListener("click", async () => {
        const res = await fetch("/api/approve-test", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                onboarding_id: "{{onboardingId}}",
            }),
        });

        const text = await res.text();
        console.log(text);
        alert(text);
    });
</script>
</file>

<file path="supabase/.branches/_current_branch">
main
</file>

<file path="supabase/.temp/pooler-url">
postgresql://postgres.kpnkhmtxzigxtfnkmzru@aws-1-eu-west-1.pooler.supabase.com:5432/postgres
</file>

<file path="supabase/.temp/postgres-version">
17.6.1.063
</file>

<file path="supabase/.temp/project-ref">
kpnkhmtxzigxtfnkmzru
</file>

<file path="supabase/.temp/rest-version">
v14.1
</file>

<file path="supabase/.temp/storage-migration">
fix-optimized-search-function
</file>

<file path="supabase/.temp/storage-version">
v1.37.7
</file>

<file path="supabase/functions/accept-booking/.npmrc">
# Configuration for private npm package dependencies
# For more information on using private registries with Edge Functions, see:
# https://supabase.com/docs/guides/functions/import-maps#importing-from-private-registries
</file>

<file path="supabase/functions/accept-booking/deno.json">
{
  "imports": {
    "@supabase/functions-js": "jsr:@supabase/functions-js@^2"
  }
}
</file>

<file path="supabase/functions/accept-booking/index.ts">
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const body = await req.json();

    const { booking_id, driver_id } = body;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // 1. update booking

    const { data, error } = await supabase
      .from("bookings")
      .update({
        driver_id,
        status: "accepted",
      })
      .eq("id", booking_id)
      .eq("status", "paid")
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    // 2. TODO send email later

    console.log("BOOKING ACCEPTED", data.id);

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
});
</file>

<file path="supabase/functions/approve_onboarding/.npmrc">
# Configuration for private npm package dependencies
# For more information on using private registries with Edge Functions, see:
# https://supabase.com/docs/guides/functions/import-maps#importing-from-private-registries
</file>

<file path="supabase/functions/approve_onboarding/deno.json">
{
  "imports": {
    "@supabase/functions-js": "jsr:@supabase/functions-js@^2"
  }
}
</file>

<file path="supabase/functions/create_checkout_session/.npmrc">
# Configuration for private npm package dependencies
# For more information on using private registries with Edge Functions, see:
# https://supabase.com/docs/guides/functions/import-maps#importing-from-private-registries
</file>

<file path="supabase/functions/create_checkout_session/deno.json">
{
  "imports": {
    "@supabase/functions-js": "jsr:@supabase/functions-js@^2"
  }
}
</file>

<file path="supabase/functions/create_customer/.npmrc">
# Configuration for private npm package dependencies
# For more information on using private registries with Edge Functions, see:
# https://supabase.com/docs/guides/functions/import-maps#importing-from-private-registries
</file>

<file path="supabase/functions/create_customer/deno.json">
{
  "imports": {
    "@supabase/functions-js": "jsr:@supabase/functions-js@^2"
  }
}
</file>

<file path="supabase/functions/create_customer/index.ts">
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  const body = await req.json();

  const { tenant_id, email, first_name, last_name, phone } = body;

  const { data, error } = await supabase
    .from("customers")
    .upsert(
      {
        tenant_id,
        email,
        first_name,
        last_name,
        phone,
      },
      { onConflict: "tenant_id,email" },
    )
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }

  return new Response(JSON.stringify(data));
});
</file>

<file path="supabase/functions/create_refund/.npmrc">
# Configuration for private npm package dependencies
# For more information on using private registries with Edge Functions, see:
# https://supabase.com/docs/guides/functions/import-maps#importing-from-private-registries
</file>

<file path="supabase/functions/create_refund/deno.json">
{
  "imports": {
    "@supabase/functions-js": "jsr:@supabase/functions-js@^2"
  }
}
</file>

<file path="supabase/functions/create_refund/index.ts">
import Stripe from "https://esm.sh/stripe@12.18.0?target=deno&no-check";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2026-02-25.clover",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async (req) => {
  const { booking_id } = await req.json();

  if (!booking_id) {
    return new Response("Missing booking_id", { status: 400 });
  }

  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", booking_id)
    .single();

  if (!booking || booking.status !== "paid") {
    return new Response("Invalid booking state", { status: 400 });
  }

  const refund = await stripe.refunds.create({
    payment_intent: booking.stripe_payment_intent_id,
  });

  return new Response(JSON.stringify({ refund_id: refund.id }), {
    status: 200,
  });
});
</file>

<file path="supabase/functions/create-account-link/.npmrc">
# Configuration for private npm package dependencies
# For more information on using private registries with Edge Functions, see:
# https://supabase.com/docs/guides/functions/import-maps#importing-from-private-registries
</file>

<file path="supabase/functions/create-account-link/deno.json">
{
  "imports": {
    "@supabase/functions-js": "jsr:@supabase/functions-js@^2"
  }
}
</file>

<file path="supabase/functions/create-account-link/index.ts">
import Stripe from "npm:stripe";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
});

Deno.serve(async (req) => {
  try {
    const { account_id } = await req.json();

    const link = await stripe.accountLinks.create({
      account: account_id,
      refresh_url: "http://localhost:3000/stripe/refresh",
      return_url: "http://localhost:3000/stripe/return",
      type: "account_onboarding",
    });

    return new Response(
      JSON.stringify({ url: link.url }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 },
    );
  }
});
</file>

<file path="supabase/functions/create-connect-account/.npmrc">
# Configuration for private npm package dependencies
# For more information on using private registries with Edge Functions, see:
# https://supabase.com/docs/guides/functions/import-maps#importing-from-private-registries
</file>

<file path="supabase/functions/create-connect-account/deno.json">
{
  "imports": {
    "@supabase/functions-js": "jsr:@supabase/functions-js@^2"
  }
}
</file>

<file path="supabase/functions/create-connect-account/index.ts">
import Stripe from "npm:stripe";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  try {
    const { tenant_id, email } = await req.json();

    if (!tenant_id) {
      throw new Error("tenant_id required");
    }

    // ✅ create connect account

    const account = await stripe.accounts.create({
      type: "express",
      country: "FR",
      email,
      capabilities: {
        transfers: { requested: true },
        card_payments: { requested: true },
      },
    });

    // ✅ save in tenants

    const { error } = await supabase
      .from("tenants")
      .update({
        stripe_account_id: account.id,
      })
      .eq("id", tenant_id);

    if (error) {
      throw new Error("DB update failed");
    }

    return new Response(
      JSON.stringify({
        account_id: account.id,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 },
    );
  }
});
</file>

<file path="supabase/functions/create-stripe-onboarding/.npmrc">
# Configuration for private npm package dependencies
# For more information on using private registries with Edge Functions, see:
# https://supabase.com/docs/guides/functions/import-maps#importing-from-private-registries
</file>

<file path="supabase/functions/create-stripe-onboarding/deno.json">
{
  "imports": {
    "@supabase/functions-js": "jsr:@supabase/functions-js@^2"
  }
}
</file>

<file path="supabase/functions/delete-tenant-account/index.ts">
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const authHeader = req.headers.get("Authorization");

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, // Nécessaire pour les updates admin si la RPC le requiert
    {
      global: {
        headers: { Authorization: authHeader || "" },
      },
    },
  );

  const { error } = await supabase.rpc("delete_tenant_account");

  if (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
</file>

<file path="supabase/functions/send-email/deno.json">
{
  "imports": {
    "std/http/server": "https://deno.land/std@0.168.0/http/server.ts"
  }
}
</file>

<file path="supabase/functions/send-email/index.ts">
import { serve } from "std/http/server";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

serve(async (req) => {
  // CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const { to, subject, html } = await req.json();

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set in environment");
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev", // À changer par ton domaine authentifié
        to: [to],
        subject: subject,
        html: html,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
</file>

<file path="supabase/functions/stripe_webhook/.npmrc">
# Configuration for private npm package dependencies
# For more information on using private registries with Edge Functions, see:
# https://supabase.com/docs/guides/functions/import-maps#importing-from-private-registries
</file>

<file path="supabase/functions/stripe_webhook/deno.json">
{
  "imports": {
    "@supabase/functions-js": "jsr:@supabase/functions-js@^2"
  }
}
</file>

<file path="supabase/functions/deno.json">
{
  "imports": {
    "@supabase/supabase-js": "https://esm.sh/@supabase/supabase-js@2",
    "stripe": "https://esm.sh/stripe@12.18.0?target=deno&no-check"
  },
  "lint": {
    "rules": {
      "exclude": ["no-unused-vars"]
    }
  }
}
</file>

<file path="supabase/migrations/20260310000000_baseline.sql">
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."booking_status" AS ENUM (
    'pending',
    'accepted',
    'completed',
    'cancelled',
    'accepted_pending_payment',
    'paid',
    'deprecated_refunded',
    'cancelled_pending_refund',
    'cancelled_no_refund',
    'cancelled_refunded',
    'no_show',
    'expired_payment',
    'refund_failed'
);


ALTER TYPE "public"."booking_status" OWNER TO "postgres";


CREATE TYPE "public"."cancellation_reason_enum" AS ENUM (
    'client',
    'no_show',
    'driver_fault',
    'platform_issue'
);


ALTER TYPE "public"."cancellation_reason_enum" OWNER TO "postgres";


CREATE TYPE "public"."customer_type_enum" AS ENUM (
    'individual',
    'company'
);


ALTER TYPE "public"."customer_type_enum" OWNER TO "postgres";


CREATE TYPE "public"."movement_direction_enum" AS ENUM (
    'credit',
    'debit'
);


ALTER TYPE "public"."movement_direction_enum" OWNER TO "postgres";


CREATE TYPE "public"."movement_type_enum" AS ENUM (
    'payment',
    'commission',
    'refund',
    'commission_reversal'
);


ALTER TYPE "public"."movement_type_enum" OWNER TO "postgres";


CREATE TYPE "public"."onboarding_status" AS ENUM (
    'pending',
    'approved',
    'rejected',
    'processed'
);


ALTER TYPE "public"."onboarding_status" OWNER TO "postgres";


CREATE TYPE "public"."payment_mode" AS ENUM (
    'card',
    'cash'
);


ALTER TYPE "public"."payment_mode" OWNER TO "postgres";


CREATE TYPE "public"."platform_role" AS ENUM (
    'super_admin',
    'platform_staff'
);


ALTER TYPE "public"."platform_role" OWNER TO "postgres";


CREATE TYPE "public"."share_status" AS ENUM (
    'pending',
    'accepted',
    'rejected'
);


ALTER TYPE "public"."share_status" OWNER TO "postgres";


CREATE TYPE "public"."tenant_role" AS ENUM (
    'owner',
    'manager',
    'driver',
    'pending'
);


ALTER TYPE "public"."tenant_role" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."approve_onboarding_tx"("onboarding_uuid" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
declare
  new_tenant_id uuid := gen_random_uuid();
begin

  -- 1️⃣ Vérifier que le dossier existe et est pending
  if not exists (
    select 1 from onboarding
    where id = onboarding_uuid
      and status = 'pending'
  ) then
    raise exception 'Onboarding not found or already processed';
  end if;

  -- 2️⃣ Créer le tenant avec email (auth.users) + phone (onboarding)
  insert into tenants (
    id,
    name,
    primary_domain,
    email,
    phone
  )
  select
    new_tenant_id,
    o.company_name,
    o.primary_domain,
    u.email,
    o.phone
  from onboarding o
  join profiles p on p.id = o.profile_id
  join auth.users u on u.id = p.id
  where o.id = onboarding_uuid;

  -- 3️⃣ Mettre à jour le profile
  update profiles p
  set
    tenant_id = new_tenant_id,
    tenant_role = 'owner',
    first_name = o.first_name,
    last_name = o.last_name
  from onboarding o
  where o.id = onboarding_uuid
    and p.id = o.profile_id;

  -- 4️⃣ Marquer onboarding validé
  update onboarding
  set
    status = 'approved',
    validated_at = now()
  where id = onboarding_uuid;

end;
$$;


ALTER FUNCTION "public"."approve_onboarding_tx"("onboarding_uuid" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."compute_booking_balance"("p_booking_id" "uuid") RETURNS numeric
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
declare
  total numeric;
begin
  select coalesce(sum(
    case
      when movement_type = 'payment' then net_amount
      when movement_type = 'refund' then -net_amount
      else 0
    end
  ),0)
  into total
  from financial_movements
  where booking_id = p_booking_id;

  return total;
end;
$$;


ALTER FUNCTION "public"."compute_booking_balance"("p_booking_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."current_tenant_id"() RETURNS "uuid"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'public'
    AS $$
  select tenant_id
  from public.profiles
  where id = auth.uid()
$$;


ALTER FUNCTION "public"."current_tenant_id"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_tenant_account"() RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
declare
  v_user uuid := auth.uid();
  v_tenant uuid;
begin

  -- vérifier que l'utilisateur est owner
  if not exists (
    select 1
    from profiles
    where id = v_user
    and tenant_role = 'owner'
  ) then
    raise exception 'Only tenant owner can delete account';
  end if;

  -- récupérer tenant
  select tenant_id
  into v_tenant
  from profiles
  where id = v_user;

  if v_tenant is null then
    raise exception 'Tenant not found';
  end if;

  -- désactiver tenant
  update tenants
  set
    deleted_at = now(),
    name = 'deleted_tenant_' || v_tenant,
    primary_domain = null
  where id = v_tenant;

  -- anonymiser profil
  update profiles
  set
    deleted_at = now(),
    first_name = 'deleted',
    last_name = 'user'
  where id = v_user;

  -- bloquer login
  update auth.users
  set banned_until = now() + interval '100 years'
  where id = v_user;

end;
$$;


ALTER FUNCTION "public"."delete_tenant_account"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."expire_unpaid_bookings"() RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
begin
  update bookings
  set status = 'expired_payment'
  where status = 'accepted_pending_payment'
    and created_at < now() - interval '15 minutes';
end;
$$;


ALTER FUNCTION "public"."expire_unpaid_bookings"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_driver_verification_email"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  -- Déclenchement uniquement si is_verified passe à TRUE
  IF (OLD.is_verified = false AND NEW.is_verified = true) THEN
    PERFORM
      net.http_post(
        url := 'https://[TON_PROJECT_REF].supabase.co/functions/v1/send-email',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || '[TON_ANON_KEY_OU_SERVICE_ROLE]'
        ),
        body := jsonb_build_object(
          'to', NEW.email,
          'subject', 'Validation de votre compte Chauffeur 🚗',
          'html', '<html><body><h1>Félicitations ' || NEW.full_name || ' !</h1><p>Votre profil a été validé par notre équipe.</p></body></html>'
        )
      );
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_driver_verification_email"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
begin

insert into public.profiles (
  id,
  tenant_role,
  first_name,
  last_name,
  created_at
)
values (
  new.id,
  'pending',
  '',
  '',
  now()
);

return new;

end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."initiate_refund"("p_booking_id" "uuid", "p_reason" "text") RETURNS TABLE("payment_intent_id" "text", "refund_allowed" boolean)
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
declare
  v_booking bookings%rowtype;
begin
  -- 🔒 Verrou ligne booking
  select *
  into v_booking
  from bookings
  where id = p_booking_id
  for update;

  if not found then
    raise exception 'Booking not found';
  end if;

  -- ✅ Autoriser retry si refund_failed
  if v_booking.status not in ('paid','refund_failed') then
    return query select null::text, false;
    return;
  end if;

  -- Passage immédiat en état verrouillé
  update bookings
  set status = 'cancelled_pending_refund',
      cancellation_reason = p_reason,
      cancelled_at = now()
  where id = p_booking_id;

  return query
  select v_booking.stripe_payment_intent_id, true;
end;
$$;


ALTER FUNCTION "public"."initiate_refund"("p_booking_id" "uuid", "p_reason" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."prevent_booking_delete"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
begin
  raise exception 'Bookings cannot be deleted';
end;
$$;


ALTER FUNCTION "public"."prevent_booking_delete"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."prevent_late_cancellation"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  if new.status is distinct from old.status then
    if new.status in ('cancelled_no_refund','cancelled_pending_refund')
       and old.pickup_time <= now() then
       raise exception 'Cannot cancel after pickup_time';
    end if;
  end if;

  return new;
end;
$$;


ALTER FUNCTION "public"."prevent_late_cancellation"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."prevent_pickup_time_change_after_paid"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
begin
  if old.status in ('paid','completed','no_show',
                    'cancelled_pending_refund','cancelled_refunded')
     and new.pickup_time <> old.pickup_time then
    raise exception 'Cannot modify pickup_time after payment';
  end if;

  return new;
end;
$$;


ALTER FUNCTION "public"."prevent_pickup_time_change_after_paid"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."prevent_policy_update"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
begin
  if old.cancellation_policy_id is not null
     and new.cancellation_policy_id <> old.cancellation_policy_id then
    raise exception 'cancellation_policy_id cannot be modified once set';
  end if;
  return new;
end;
$$;


ALTER FUNCTION "public"."prevent_policy_update"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."protect_booking_immutable_fields"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
BEGIN
  IF OLD.status <> 'pending' THEN
    IF NEW.total_amount <> OLD.total_amount
       OR NEW.pickup_address <> OLD.pickup_address
       OR NEW.dropoff_address <> OLD.dropoff_address
       OR NEW.pickup_time <> OLD.pickup_time
       OR NEW.payment_mode <> OLD.payment_mode THEN
         RAISE EXCEPTION 'Booking immutable after pending status';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."protect_booking_immutable_fields"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_platform_settings_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;


ALTER FUNCTION "public"."update_platform_settings_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."validate_booking_status_transition"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
begin
  if new.status = old.status then
    return new;
  end if;

  if not exists (
    select 1
    from booking_status_transitions
    where from_status = old.status
      and to_status = new.status
  ) then
    raise exception 'Invalid booking status transition from % to %',
      old.status, new.status;
  end if;

  return new;
end;
$$;


ALTER FUNCTION "public"."validate_booking_status_transition"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."validate_ledger_consistency"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
declare
  booking_total numeric;
  ledger_total numeric;
begin
  select total_amount into booking_total
  from bookings
  where id = new.booking_id;

  ledger_total := compute_booking_balance(new.booking_id);

  if ledger_total > booking_total then
    raise exception 'Ledger exceeds booking total TTC';
  end if;

  return new;
end;
$$;


ALTER FUNCTION "public"."validate_ledger_consistency"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."bookings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "original_tenant_id" "uuid" NOT NULL,
    "current_tenant_id" "uuid" NOT NULL,
    "pickup_address" "text" NOT NULL,
    "dropoff_address" "text" NOT NULL,
    "pickup_time" timestamp with time zone NOT NULL,
    "total_amount" numeric(10,2) NOT NULL,
    "status" "public"."booking_status" DEFAULT 'pending'::"public"."booking_status" NOT NULL,
    "payment_mode" "public"."payment_mode" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "driver_id" "uuid",
    "distance_km" numeric,
    "subtotal_amount" numeric NOT NULL,
    "vat_amount" numeric DEFAULT 0 NOT NULL,
    "customer_id" "uuid" NOT NULL,
    "stripe_payment_intent_id" "text",
    "cancellation_policy_id" "uuid",
    "cancellation_reason" "public"."cancellation_reason_enum",
    "cancelled_at" timestamp without time zone,
    "cancellation_initiator" character varying,
    "passenger_count" integer DEFAULT 1 NOT NULL
);


ALTER TABLE "public"."bookings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."customers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "first_name" "text" NOT NULL,
    "last_name" "text",
    "phone" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "type" "public"."customer_type_enum" DEFAULT 'individual'::"public"."customer_type_enum" NOT NULL,
    "company_name" "text",
    "vat_number" "text",
    "billing_address" "text",
    "city" "text",
    "country" "text",
    "postal_code" "text"
);


ALTER TABLE "public"."customers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tenants" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "primary_domain" "text" NOT NULL,
    "stripe_account_id" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "platform_fee_rate" numeric DEFAULT 0,
    "share_fee_rate" numeric DEFAULT 0,
    "vat_rate" numeric DEFAULT 0,
    "email" "text",
    "phone" "text",
    "deleted_at" timestamp with time zone
);


ALTER TABLE "public"."tenants" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."admin_bookings_full_view" AS
 SELECT "b"."id",
    "b"."created_at",
    "b"."pickup_time",
    "b"."pickup_address",
    "b"."dropoff_address",
    COALESCE("c"."first_name", 'Client'::"text") AS "display_customer_first_name",
    "c"."last_name" AS "display_customer_last_name",
    "c"."email" AS "display_customer_email",
    "c"."phone" AS "display_customer_phone",
    "c"."city" AS "display_customer_city",
    "c"."postal_code" AS "display_customer_postal_code",
    "b"."total_amount",
    "b"."status",
    "ot"."name" AS "original_tenant_name",
    "ot"."primary_domain" AS "original_tenant_domain",
    "ct"."name" AS "current_tenant_name"
   FROM ((("public"."bookings" "b"
     LEFT JOIN "public"."customers" "c" ON (("c"."id" = "b"."customer_id")))
     LEFT JOIN "public"."tenants" "ot" ON (("ot"."id" = "b"."original_tenant_id")))
     LEFT JOIN "public"."tenants" "ct" ON (("ct"."id" = "b"."current_tenant_id")));


ALTER VIEW "public"."admin_bookings_full_view" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."financial_movements" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "booking_id" "uuid" NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "stripe_payment_intent_id" "text",
    "stripe_refund_id" "text",
    "movement_type" "public"."movement_type_enum" NOT NULL,
    "direction" "public"."movement_direction_enum" NOT NULL,
    "gross_amount" numeric(12,2) NOT NULL,
    "net_amount" numeric(12,2) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "vat_amount" numeric(12,2) DEFAULT 0,
    "created_by_event" "text",
    "refund_ratio" numeric(5,4),
    "platform_commission_rate_snapshot" numeric,
    "driver_commission_rate_snapshot" numeric,
    "platform_commission_amount" numeric,
    "driver_commission_amount" numeric,
    CONSTRAINT "chk_gross_positive" CHECK (("gross_amount" >= (0)::numeric)),
    CONSTRAINT "chk_net_positive" CHECK (("net_amount" >= (0)::numeric)),
    CONSTRAINT "chk_refund_ratio_valid" CHECK ((("refund_ratio" IS NULL) OR (("refund_ratio" >= (0)::numeric) AND ("refund_ratio" <= (1)::numeric)))),
    CONSTRAINT "chk_vat_positive" CHECK (("vat_amount" >= (0)::numeric))
);


ALTER TABLE "public"."financial_movements" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."admin_monthly_summary" AS
 SELECT "date_trunc"('month'::"text", "created_at") AS "month",
    (COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'payment'::"public"."movement_type_enum") THEN "net_amount"
            ELSE (0)::numeric
        END), (0)::numeric) - COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'refund'::"public"."movement_type_enum") THEN "net_amount"
            ELSE (0)::numeric
        END), (0)::numeric)) AS "net_revenue"
   FROM "public"."financial_movements"
  GROUP BY ("date_trunc"('month'::"text", "created_at"))
  ORDER BY ("date_trunc"('month'::"text", "created_at"));


ALTER VIEW "public"."admin_monthly_summary" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."admin_tenants_overview" AS
SELECT
    NULL::"uuid" AS "tenant_id",
    NULL::"text" AS "tenant_name",
    NULL::"text" AS "primary_domain",
    NULL::timestamp with time zone AS "joined_at",
    NULL::numeric AS "total_gross_revenue",
    NULL::numeric AS "total_net_revenue",
    NULL::bigint AS "total_bookings",
    NULL::numeric AS "avg_commission_rate";


ALTER VIEW "public"."admin_tenants_overview" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."booking_shares" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "booking_id" "uuid" NOT NULL,
    "shared_by_tenant_id" "uuid" NOT NULL,
    "accepted_by_tenant_id" "uuid",
    "status" "public"."share_status" DEFAULT 'pending'::"public"."share_status" NOT NULL,
    "shared_at" timestamp with time zone DEFAULT "now"(),
    "accepted_at" timestamp with time zone
);


ALTER TABLE "public"."booking_shares" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."booking_status_transitions" (
    "from_status" "public"."booking_status" NOT NULL,
    "to_status" "public"."booking_status" NOT NULL
);


ALTER TABLE "public"."booking_status_transitions" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."bookings_stuck_pending_refund" AS
 SELECT "id",
    "original_tenant_id",
    "current_tenant_id",
    "pickup_address",
    "dropoff_address",
    "pickup_time",
    "total_amount",
    "status",
    "payment_mode",
    "created_at",
    "driver_id",
    "distance_km",
    "subtotal_amount",
    "vat_amount",
    "customer_id",
    "stripe_payment_intent_id",
    "cancellation_policy_id",
    "cancellation_reason",
    "cancelled_at",
    "cancellation_initiator",
    "passenger_count"
   FROM "public"."bookings"
  WHERE (("status" = 'cancelled_pending_refund'::"public"."booking_status") AND ("cancelled_at" < ("now"() - '00:10:00'::interval)));


ALTER VIEW "public"."bookings_stuck_pending_refund" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."cancellation_policies" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tenant_id" "uuid",
    "version" integer NOT NULL,
    "hours_before_full_refund" integer NOT NULL,
    "hours_before_partial_refund" integer NOT NULL,
    "partial_refund_rate" numeric(5,4) NOT NULL,
    "no_show_refund_rate" numeric(5,4) NOT NULL,
    "driver_fault_refund_rate" numeric(5,4) NOT NULL,
    "platform_fee_non_refundable" boolean DEFAULT false NOT NULL,
    "active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."cancellation_policies" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."circle_memberships" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "circle_id" "uuid" NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "role" "text" NOT NULL,
    "status" "text" NOT NULL,
    "joined_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."circle_memberships" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."circles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "created_by_tenant_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."circles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."drivers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "first_name" "text" NOT NULL,
    "last_name" "text" NOT NULL,
    "phone" "text" NOT NULL,
    "license_number" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid"
);


ALTER TABLE "public"."drivers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."onboarding" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "status" "public"."onboarding_status" DEFAULT 'pending'::"public"."onboarding_status" NOT NULL,
    "company_name" "text" NOT NULL,
    "primary_domain" "text" NOT NULL,
    "phone" "text" NOT NULL,
    "capacity" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "validated_at" timestamp with time zone,
    "vtc_license_number" "text" NOT NULL,
    "service_categories" "text"[] NOT NULL,
    "default_base_price" numeric NOT NULL,
    "default_price_per_km" numeric NOT NULL,
    "default_minimum_fare" numeric NOT NULL,
    "vehicle_brand" "text",
    "vehicle_model" "text",
    "plate_number" "text",
    "first_name" "text" NOT NULL,
    "last_name" "text" NOT NULL
);


ALTER TABLE "public"."onboarding" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."onboarding_admin_view" AS
 SELECT "o"."id",
    "o"."profile_id",
    "o"."status",
    "o"."company_name",
    "o"."primary_domain",
    "o"."phone",
    "o"."capacity",
    "o"."created_at",
    "o"."validated_at",
    "o"."vtc_license_number",
    "o"."service_categories",
    "o"."default_base_price",
    "o"."default_price_per_km",
    "o"."default_minimum_fare",
    "o"."vehicle_brand",
    "o"."vehicle_model",
    "o"."plate_number",
    "o"."first_name",
    "o"."last_name",
    "u"."email" AS "auth_email"
   FROM ("public"."onboarding" "o"
     JOIN "auth"."users" "u" ON (("o"."profile_id" = "u"."id")));


ALTER VIEW "public"."onboarding_admin_view" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."passengers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "booking_id" "uuid" NOT NULL,
    "first_name" "text" NOT NULL,
    "last_name" "text" NOT NULL,
    "phone" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."passengers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."platform_settings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "default_platform_commission_rate" numeric(5,2) DEFAULT 0 NOT NULL,
    "default_tenant_commission_rate" numeric(5,2) DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."platform_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pricing_rules" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "base_price" numeric(10,2) NOT NULL,
    "price_per_km" numeric(10,2) NOT NULL,
    "minimum_fare" numeric(10,2) NOT NULL,
    "active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "service_category" character varying NOT NULL
);


ALTER TABLE "public"."pricing_rules" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "tenant_id" "uuid",
    "tenant_role" "public"."tenant_role",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "platform_role" "public"."platform_role",
    "first_name" "text",
    "last_name" "text",
    "is_verified" boolean DEFAULT false,
    "deleted_at" timestamp with time zone,
    CONSTRAINT "profiles_role_required" CHECK ((("platform_role" IS NOT NULL) OR ("tenant_role" IS NOT NULL))),
    CONSTRAINT "profiles_single_role_type" CHECK ((NOT (("platform_role" IS NOT NULL) AND ("tenant_role" IS NOT NULL))))
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stripe_events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "stripe_event_id" "text" NOT NULL,
    "event_type" "text" NOT NULL,
    "received_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."stripe_events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stripe_webhook_logs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "stripe_event_id" "text" NOT NULL,
    "event_type" "text" NOT NULL,
    "payload" "jsonb" NOT NULL,
    "received_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "processed_at" timestamp with time zone,
    "status" "text" DEFAULT 'received'::"text" NOT NULL,
    "error_message" "text"
);


ALTER TABLE "public"."stripe_webhook_logs" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."stripe_webhook_errors" WITH ("security_invoker"='true') AS
 SELECT "id",
    "stripe_event_id",
    "event_type",
    "payload",
    "received_at",
    "processed_at",
    "status",
    "error_message"
   FROM "public"."stripe_webhook_logs"
  WHERE ("status" = 'error'::"text")
  ORDER BY "received_at" DESC;


ALTER VIEW "public"."stripe_webhook_errors" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."stripe_webhook_pending" WITH ("security_invoker"='true') AS
 SELECT "id",
    "stripe_event_id",
    "event_type",
    "payload",
    "received_at",
    "processed_at",
    "status",
    "error_message"
   FROM "public"."stripe_webhook_logs"
  WHERE ("status" = 'received'::"text")
  ORDER BY "received_at" DESC;


ALTER VIEW "public"."stripe_webhook_pending" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."tenant_dashboard_kpi" AS
 SELECT "tenant_id",
    COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'payment'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE (0)::numeric
        END), (0)::numeric) AS "total_gross_revenue",
    COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'refund'::"public"."movement_type_enum") THEN "gross_amount"
            ELSE (0)::numeric
        END), (0)::numeric) AS "total_refunded_gross",
    (COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'payment'::"public"."movement_type_enum") THEN "net_amount"
            ELSE (0)::numeric
        END), (0)::numeric) - COALESCE("sum"(
        CASE
            WHEN ("movement_type" = 'refund'::"public"."movement_type_enum") THEN "net_amount"
            ELSE (0)::numeric
        END), (0)::numeric)) AS "total_net_revenue",
    "count"(DISTINCT "booking_id") AS "total_bookings",
    (COALESCE("sum"(
        CASE
            WHEN (("movement_type" = 'payment'::"public"."movement_type_enum") AND ("date_trunc"('month'::"text", "created_at") = "date_trunc"('month'::"text", "now"()))) THEN "net_amount"
            ELSE (0)::numeric
        END), (0)::numeric) - COALESCE("sum"(
        CASE
            WHEN (("movement_type" = 'refund'::"public"."movement_type_enum") AND ("date_trunc"('month'::"text", "created_at") = "date_trunc"('month'::"text", "now"()))) THEN "net_amount"
            ELSE (0)::numeric
        END), (0)::numeric)) AS "monthly_net_revenue"
   FROM "public"."financial_movements"
  GROUP BY "tenant_id";


ALTER VIEW "public"."tenant_dashboard_kpi" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."vehicles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tenant_id" "uuid" NOT NULL,
    "driver_id" "uuid",
    "brand" "text" NOT NULL,
    "model" "text" NOT NULL,
    "plate_number" "text" NOT NULL,
    "category" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "capacity" integer
);


ALTER TABLE "public"."vehicles" OWNER TO "postgres";


ALTER TABLE ONLY "public"."booking_shares"
    ADD CONSTRAINT "booking_shares_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."booking_status_transitions"
    ADD CONSTRAINT "booking_status_transitions_pkey" PRIMARY KEY ("from_status", "to_status");



ALTER TABLE ONLY "public"."bookings"
    ADD CONSTRAINT "bookings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."cancellation_policies"
    ADD CONSTRAINT "cancellation_policies_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."cancellation_policies"
    ADD CONSTRAINT "cancellation_policy_unique_version" UNIQUE ("tenant_id", "version");



ALTER TABLE ONLY "public"."circle_memberships"
    ADD CONSTRAINT "circle_memberships_one_circle_per_tenant" UNIQUE ("tenant_id");



ALTER TABLE ONLY "public"."circle_memberships"
    ADD CONSTRAINT "circle_memberships_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."circles"
    ADD CONSTRAINT "circles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."drivers"
    ADD CONSTRAINT "drivers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."drivers"
    ADD CONSTRAINT "drivers_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."financial_movements"
    ADD CONSTRAINT "financial_movements_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."onboarding"
    ADD CONSTRAINT "onboarding_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."passengers"
    ADD CONSTRAINT "passengers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."platform_settings"
    ADD CONSTRAINT "platform_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pricing_rules"
    ADD CONSTRAINT "pricing_rules_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."stripe_events"
    ADD CONSTRAINT "stripe_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."stripe_events"
    ADD CONSTRAINT "stripe_events_stripe_event_id_key" UNIQUE ("stripe_event_id");



ALTER TABLE ONLY "public"."stripe_webhook_logs"
    ADD CONSTRAINT "stripe_webhook_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_primary_domain_key" UNIQUE ("primary_domain");



ALTER TABLE ONLY "public"."vehicles"
    ADD CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id");



CREATE UNIQUE INDEX "customers_unique_email_per_tenant" ON "public"."customers" USING "btree" ("tenant_id", "email");



CREATE INDEX "idx_booking_shares_booking" ON "public"."booking_shares" USING "btree" ("booking_id");



CREATE UNIQUE INDEX "idx_booking_shares_one_accept" ON "public"."booking_shares" USING "btree" ("booking_id") WHERE ("status" = 'accepted'::"public"."share_status");



CREATE INDEX "idx_bookings_created_at" ON "public"."bookings" USING "btree" ("created_at");



CREATE INDEX "idx_bookings_current_tenant" ON "public"."bookings" USING "btree" ("current_tenant_id");



CREATE INDEX "idx_bookings_customer_id" ON "public"."bookings" USING "btree" ("customer_id");



CREATE INDEX "idx_bookings_driver" ON "public"."bookings" USING "btree" ("driver_id");



CREATE INDEX "idx_bookings_original_tenant" ON "public"."bookings" USING "btree" ("original_tenant_id");



CREATE INDEX "idx_bookings_status" ON "public"."bookings" USING "btree" ("status");



CREATE INDEX "idx_cancellation_policy_active" ON "public"."cancellation_policies" USING "btree" ("tenant_id", "active");



CREATE INDEX "idx_circle_memberships_tenant" ON "public"."circle_memberships" USING "btree" ("tenant_id");



CREATE INDEX "idx_customers_tenant_email" ON "public"."customers" USING "btree" ("tenant_id", "email");



CREATE INDEX "idx_drivers_tenant" ON "public"."drivers" USING "btree" ("tenant_id");



CREATE INDEX "idx_financial_event_link" ON "public"."financial_movements" USING "btree" ("created_by_event");



CREATE INDEX "idx_financial_movements_booking_id" ON "public"."financial_movements" USING "btree" ("booking_id");



CREATE INDEX "idx_financial_movements_payment_intent" ON "public"."financial_movements" USING "btree" ("stripe_payment_intent_id");



CREATE INDEX "idx_financial_movements_tenant_id" ON "public"."financial_movements" USING "btree" ("tenant_id");



CREATE INDEX "idx_onboarding_profile" ON "public"."onboarding" USING "btree" ("profile_id");



CREATE INDEX "idx_passengers_booking" ON "public"."passengers" USING "btree" ("booking_id");



CREATE INDEX "idx_pricing_tenant" ON "public"."pricing_rules" USING "btree" ("tenant_id");



CREATE INDEX "idx_stripe_event_received" ON "public"."stripe_webhook_logs" USING "btree" ("received_at" DESC);



CREATE INDEX "idx_stripe_event_status" ON "public"."stripe_webhook_logs" USING "btree" ("status");



CREATE UNIQUE INDEX "idx_stripe_event_unique" ON "public"."stripe_webhook_logs" USING "btree" ("stripe_event_id");



CREATE UNIQUE INDEX "idx_unique_financial_payment" ON "public"."financial_movements" USING "btree" ("stripe_payment_intent_id", "movement_type", COALESCE("stripe_refund_id", 'no_refund'::"text"));



CREATE UNIQUE INDEX "idx_unique_financial_strict" ON "public"."financial_movements" USING "btree" ("stripe_payment_intent_id", "movement_type", COALESCE("stripe_refund_id", 'none'::"text"));



CREATE INDEX "idx_vehicles_tenant" ON "public"."vehicles" USING "btree" ("tenant_id");



CREATE UNIQUE INDEX "onboarding_one_pending_per_profile" ON "public"."onboarding" USING "btree" ("profile_id") WHERE ("status" = 'pending'::"public"."onboarding_status");



CREATE UNIQUE INDEX "platform_settings_single_row" ON "public"."platform_settings" USING "btree" ((true));



CREATE UNIQUE INDEX "profiles_one_tenant_owner" ON "public"."profiles" USING "btree" ("id") WHERE ("tenant_role" = 'owner'::"public"."tenant_role");



CREATE UNIQUE INDEX "profiles_owner_unique" ON "public"."profiles" USING "btree" ("id") WHERE ("tenant_role" = 'owner'::"public"."tenant_role");



CREATE UNIQUE INDEX "unique_active_policy_per_tenant" ON "public"."cancellation_policies" USING "btree" ("tenant_id") WHERE ("active" = true);



CREATE OR REPLACE VIEW "public"."admin_tenants_overview" AS
 SELECT "t"."id" AS "tenant_id",
    "t"."name" AS "tenant_name",
    "t"."primary_domain",
    "t"."created_at" AS "joined_at",
    COALESCE("sum"(
        CASE
            WHEN ("fm"."movement_type" = 'payment'::"public"."movement_type_enum") THEN "fm"."gross_amount"
            ELSE (0)::numeric
        END), (0)::numeric) AS "total_gross_revenue",
    (COALESCE("sum"(
        CASE
            WHEN ("fm"."movement_type" = 'payment'::"public"."movement_type_enum") THEN "fm"."net_amount"
            ELSE (0)::numeric
        END), (0)::numeric) - COALESCE("sum"(
        CASE
            WHEN ("fm"."movement_type" = 'refund'::"public"."movement_type_enum") THEN "fm"."net_amount"
            ELSE (0)::numeric
        END), (0)::numeric)) AS "total_net_revenue",
    "count"(DISTINCT "fm"."booking_id") AS "total_bookings",
    COALESCE("avg"(
        CASE
            WHEN ("fm"."movement_type" = 'payment'::"public"."movement_type_enum") THEN "fm"."platform_commission_rate_snapshot"
            ELSE NULL::numeric
        END), (0)::numeric) AS "avg_commission_rate"
   FROM ("public"."tenants" "t"
     LEFT JOIN "public"."financial_movements" "fm" ON (("fm"."tenant_id" = "t"."id")))
  GROUP BY "t"."id";



CREATE OR REPLACE TRIGGER "tr_driver_verified" AFTER UPDATE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."handle_driver_verification_email"();



CREATE OR REPLACE TRIGGER "trg_prevent_booking_delete" BEFORE DELETE ON "public"."bookings" FOR EACH ROW EXECUTE FUNCTION "public"."prevent_booking_delete"();



CREATE OR REPLACE TRIGGER "trg_prevent_late_cancellation" BEFORE UPDATE ON "public"."bookings" FOR EACH ROW EXECUTE FUNCTION "public"."prevent_late_cancellation"();



CREATE OR REPLACE TRIGGER "trg_prevent_pickup_time_change_after_paid" BEFORE UPDATE ON "public"."bookings" FOR EACH ROW EXECUTE FUNCTION "public"."prevent_pickup_time_change_after_paid"();



CREATE OR REPLACE TRIGGER "trg_prevent_policy_update" BEFORE UPDATE ON "public"."bookings" FOR EACH ROW EXECUTE FUNCTION "public"."prevent_policy_update"();



CREATE OR REPLACE TRIGGER "trg_protect_booking_fields" BEFORE UPDATE ON "public"."bookings" FOR EACH ROW EXECUTE FUNCTION "public"."protect_booking_immutable_fields"();



CREATE OR REPLACE TRIGGER "trg_update_platform_settings" BEFORE UPDATE ON "public"."platform_settings" FOR EACH ROW EXECUTE FUNCTION "public"."update_platform_settings_updated_at"();



CREATE OR REPLACE TRIGGER "trg_validate_booking_status_transition" BEFORE UPDATE ON "public"."bookings" FOR EACH ROW WHEN (("old"."status" IS DISTINCT FROM "new"."status")) EXECUTE FUNCTION "public"."validate_booking_status_transition"();



CREATE OR REPLACE TRIGGER "trg_validate_ledger_consistency" AFTER INSERT ON "public"."financial_movements" FOR EACH ROW EXECUTE FUNCTION "public"."validate_ledger_consistency"();



ALTER TABLE ONLY "public"."booking_shares"
    ADD CONSTRAINT "booking_shares_accepted_by_tenant_id_fkey" FOREIGN KEY ("accepted_by_tenant_id") REFERENCES "public"."tenants"("id");



ALTER TABLE ONLY "public"."booking_shares"
    ADD CONSTRAINT "booking_shares_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."booking_shares"
    ADD CONSTRAINT "booking_shares_shared_by_tenant_id_fkey" FOREIGN KEY ("shared_by_tenant_id") REFERENCES "public"."tenants"("id");



ALTER TABLE ONLY "public"."bookings"
    ADD CONSTRAINT "bookings_cancellation_policy_id_fkey" FOREIGN KEY ("cancellation_policy_id") REFERENCES "public"."cancellation_policies"("id");



ALTER TABLE ONLY "public"."bookings"
    ADD CONSTRAINT "bookings_current_tenant_id_fkey" FOREIGN KEY ("current_tenant_id") REFERENCES "public"."tenants"("id");



ALTER TABLE ONLY "public"."bookings"
    ADD CONSTRAINT "bookings_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id");



ALTER TABLE ONLY "public"."bookings"
    ADD CONSTRAINT "bookings_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."bookings"
    ADD CONSTRAINT "bookings_original_tenant_id_fkey" FOREIGN KEY ("original_tenant_id") REFERENCES "public"."tenants"("id");



ALTER TABLE ONLY "public"."cancellation_policies"
    ADD CONSTRAINT "cancellation_policies_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."circle_memberships"
    ADD CONSTRAINT "circle_memberships_circle_id_fkey" FOREIGN KEY ("circle_id") REFERENCES "public"."circles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."circle_memberships"
    ADD CONSTRAINT "circle_memberships_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."circles"
    ADD CONSTRAINT "circles_created_by_tenant_id_fkey" FOREIGN KEY ("created_by_tenant_id") REFERENCES "public"."tenants"("id");



ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."drivers"
    ADD CONSTRAINT "drivers_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."drivers"
    ADD CONSTRAINT "drivers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."financial_movements"
    ADD CONSTRAINT "financial_movements_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."financial_movements"
    ADD CONSTRAINT "financial_movements_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."onboarding"
    ADD CONSTRAINT "onboarding_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."passengers"
    ADD CONSTRAINT "passengers_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pricing_rules"
    ADD CONSTRAINT "pricing_rules_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."vehicles"
    ADD CONSTRAINT "vehicles_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."vehicles"
    ADD CONSTRAINT "vehicles_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



CREATE POLICY "admin_full_view_platform_read" ON "public"."bookings" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."platform_role" = ANY (ARRAY['super_admin'::"public"."platform_role", 'platform_staff'::"public"."platform_role"]))))));



ALTER TABLE "public"."booking_shares" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "booking_shares_select" ON "public"."booking_shares" FOR SELECT USING ((("shared_by_tenant_id" = "public"."current_tenant_id"()) OR ("accepted_by_tenant_id" = "public"."current_tenant_id"())));



ALTER TABLE "public"."booking_status_transitions" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "booking_status_transitions_read" ON "public"."booking_status_transitions" FOR SELECT USING (true);



ALTER TABLE "public"."bookings" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "bookings_insert_isolation" ON "public"."bookings" FOR INSERT WITH CHECK (("original_tenant_id" = "public"."current_tenant_id"()));



CREATE POLICY "bookings_platform_admin_read" ON "public"."bookings" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."platform_role" = ANY (ARRAY['super_admin'::"public"."platform_role", 'platform_staff'::"public"."platform_role"]))))));



CREATE POLICY "bookings_select" ON "public"."bookings" FOR SELECT USING (("current_tenant_id" = ( SELECT "profiles"."tenant_id"
   FROM "public"."profiles"
  WHERE ("profiles"."id" = "auth"."uid"()))));



CREATE POLICY "bookings_select_isolation" ON "public"."bookings" FOR SELECT USING ((("original_tenant_id" = "public"."current_tenant_id"()) OR ("current_tenant_id" = "public"."current_tenant_id"())));



CREATE POLICY "bookings_update_isolation" ON "public"."bookings" FOR UPDATE USING ((("original_tenant_id" = "public"."current_tenant_id"()) OR ("current_tenant_id" = "public"."current_tenant_id"()))) WITH CHECK ((("original_tenant_id" = "public"."current_tenant_id"()) OR ("current_tenant_id" = "public"."current_tenant_id"())));



ALTER TABLE "public"."cancellation_policies" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."circle_memberships" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "circle_memberships_tenant_isolation" ON "public"."circle_memberships" USING (("tenant_id" = "public"."current_tenant_id"())) WITH CHECK (("tenant_id" = "public"."current_tenant_id"()));



ALTER TABLE "public"."circles" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "circles_tenant_isolation" ON "public"."circles" USING (("created_by_tenant_id" = "public"."current_tenant_id"())) WITH CHECK (("created_by_tenant_id" = "public"."current_tenant_id"()));



ALTER TABLE "public"."customers" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "customers_platform_admin_read" ON "public"."customers" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."platform_role" = ANY (ARRAY['super_admin'::"public"."platform_role", 'platform_staff'::"public"."platform_role"]))))));



CREATE POLICY "customers_tenant_isolation" ON "public"."customers" USING (("tenant_id" = "public"."current_tenant_id"())) WITH CHECK (("tenant_id" = "public"."current_tenant_id"()));



ALTER TABLE "public"."drivers" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "drivers_isolation" ON "public"."drivers" USING (("tenant_id" = ( SELECT "profiles"."tenant_id"
   FROM "public"."profiles"
  WHERE ("profiles"."id" = "auth"."uid"()))));



CREATE POLICY "drivers_tenant_isolation" ON "public"."drivers" USING (("tenant_id" = "public"."current_tenant_id"())) WITH CHECK (("tenant_id" = "public"."current_tenant_id"()));



CREATE POLICY "finance_insert_service_only" ON "public"."financial_movements" FOR INSERT TO "service_role" WITH CHECK (true);



CREATE POLICY "finance_select_isolated" ON "public"."financial_movements" FOR SELECT TO "authenticated" USING (("tenant_id" = "public"."current_tenant_id"()));



ALTER TABLE "public"."financial_movements" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "financial_platform_admin_read" ON "public"."financial_movements" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."platform_role" = ANY (ARRAY['super_admin'::"public"."platform_role", 'platform_staff'::"public"."platform_role"]))))));



ALTER TABLE "public"."onboarding" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "onboarding_insert_own" ON "public"."onboarding" FOR INSERT WITH CHECK (("profile_id" = "auth"."uid"()));



CREATE POLICY "onboarding_select_own" ON "public"."onboarding" FOR SELECT USING (("profile_id" = "auth"."uid"()));



CREATE POLICY "onboarding_select_platform" ON "public"."onboarding" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."platform_role" IS NOT NULL)))));



ALTER TABLE "public"."passengers" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "passengers_platform_admin_read" ON "public"."passengers" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."platform_role" = ANY (ARRAY['super_admin'::"public"."platform_role", 'platform_staff'::"public"."platform_role"]))))));



CREATE POLICY "passengers_tenant_isolation" ON "public"."passengers" USING ((EXISTS ( SELECT 1
   FROM "public"."bookings" "b"
  WHERE (("b"."id" = "passengers"."booking_id") AND (("b"."original_tenant_id" = "public"."current_tenant_id"()) OR ("b"."current_tenant_id" = "public"."current_tenant_id"())))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."bookings" "b"
  WHERE (("b"."id" = "passengers"."booking_id") AND (("b"."original_tenant_id" = "public"."current_tenant_id"()) OR ("b"."current_tenant_id" = "public"."current_tenant_id"()))))));



CREATE POLICY "platform_admin_read_financial" ON "public"."financial_movements" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."platform_role" = ANY (ARRAY['super_admin'::"public"."platform_role", 'platform_staff'::"public"."platform_role"]))))));



ALTER TABLE "public"."platform_settings" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "platform_settings_read_admin" ON "public"."platform_settings" FOR SELECT USING (true);



CREATE POLICY "platform_settings_update_admin" ON "public"."platform_settings" FOR UPDATE USING (true);



CREATE POLICY "pricing_isolation" ON "public"."pricing_rules" USING (("tenant_id" = ( SELECT "profiles"."tenant_id"
   FROM "public"."profiles"
  WHERE ("profiles"."id" = "auth"."uid"()))));



ALTER TABLE "public"."pricing_rules" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "pricing_tenant_isolation" ON "public"."pricing_rules" USING (("tenant_id" = "public"."current_tenant_id"())) WITH CHECK (("tenant_id" = "public"."current_tenant_id"()));



ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "profiles_insert_own" ON "public"."profiles" FOR INSERT WITH CHECK (("id" = "auth"."uid"()));



CREATE POLICY "profiles_select_own" ON "public"."profiles" FOR SELECT USING (("id" = "auth"."uid"()));



CREATE POLICY "profiles_update_own" ON "public"."profiles" FOR UPDATE USING (("id" = "auth"."uid"()));



ALTER TABLE "public"."stripe_events" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "stripe_webhook_insert_service" ON "public"."stripe_webhook_logs" FOR INSERT TO "service_role" WITH CHECK (true);



ALTER TABLE "public"."stripe_webhook_logs" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "stripe_webhook_platform_read" ON "public"."stripe_webhook_logs" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."platform_role" IS NOT NULL)))));



CREATE POLICY "tenant_can_view_own_finance" ON "public"."financial_movements" FOR SELECT USING (("tenant_id" = ( SELECT "profiles"."tenant_id"
   FROM "public"."profiles"
  WHERE ("profiles"."id" = "auth"."uid"()))));



ALTER TABLE "public"."tenants" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "tenants_platform_admin_read" ON "public"."tenants" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."platform_role" = ANY (ARRAY['super_admin'::"public"."platform_role", 'platform_staff'::"public"."platform_role"]))))));



CREATE POLICY "tenants_select_own" ON "public"."tenants" FOR SELECT USING (("id" = ( SELECT "profiles"."tenant_id"
   FROM "public"."profiles"
  WHERE ("profiles"."id" = "auth"."uid"()))));



ALTER TABLE "public"."vehicles" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "vehicles_isolation" ON "public"."vehicles" USING (("tenant_id" = ( SELECT "profiles"."tenant_id"
   FROM "public"."profiles"
  WHERE ("profiles"."id" = "auth"."uid"()))));



CREATE POLICY "vehicles_tenant_isolation" ON "public"."vehicles" USING (("tenant_id" = "public"."current_tenant_id"())) WITH CHECK (("tenant_id" = "public"."current_tenant_id"()));





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."approve_onboarding_tx"("onboarding_uuid" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."approve_onboarding_tx"("onboarding_uuid" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."approve_onboarding_tx"("onboarding_uuid" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."compute_booking_balance"("p_booking_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."compute_booking_balance"("p_booking_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."compute_booking_balance"("p_booking_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."current_tenant_id"() TO "anon";
GRANT ALL ON FUNCTION "public"."current_tenant_id"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."current_tenant_id"() TO "service_role";



GRANT ALL ON FUNCTION "public"."delete_tenant_account"() TO "anon";
GRANT ALL ON FUNCTION "public"."delete_tenant_account"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_tenant_account"() TO "service_role";



GRANT ALL ON FUNCTION "public"."expire_unpaid_bookings"() TO "anon";
GRANT ALL ON FUNCTION "public"."expire_unpaid_bookings"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."expire_unpaid_bookings"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_driver_verification_email"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_driver_verification_email"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_driver_verification_email"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."initiate_refund"("p_booking_id" "uuid", "p_reason" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."initiate_refund"("p_booking_id" "uuid", "p_reason" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."initiate_refund"("p_booking_id" "uuid", "p_reason" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."prevent_booking_delete"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_booking_delete"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_booking_delete"() TO "service_role";



GRANT ALL ON FUNCTION "public"."prevent_late_cancellation"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_late_cancellation"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_late_cancellation"() TO "service_role";



GRANT ALL ON FUNCTION "public"."prevent_pickup_time_change_after_paid"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_pickup_time_change_after_paid"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_pickup_time_change_after_paid"() TO "service_role";



GRANT ALL ON FUNCTION "public"."prevent_policy_update"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_policy_update"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_policy_update"() TO "service_role";



GRANT ALL ON FUNCTION "public"."protect_booking_immutable_fields"() TO "anon";
GRANT ALL ON FUNCTION "public"."protect_booking_immutable_fields"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."protect_booking_immutable_fields"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_platform_settings_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_platform_settings_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_platform_settings_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."validate_booking_status_transition"() TO "anon";
GRANT ALL ON FUNCTION "public"."validate_booking_status_transition"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."validate_booking_status_transition"() TO "service_role";



GRANT ALL ON FUNCTION "public"."validate_ledger_consistency"() TO "anon";
GRANT ALL ON FUNCTION "public"."validate_ledger_consistency"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."validate_ledger_consistency"() TO "service_role";


















GRANT ALL ON TABLE "public"."bookings" TO "anon";
GRANT ALL ON TABLE "public"."bookings" TO "authenticated";
GRANT ALL ON TABLE "public"."bookings" TO "service_role";



GRANT ALL ON TABLE "public"."customers" TO "anon";
GRANT ALL ON TABLE "public"."customers" TO "authenticated";
GRANT ALL ON TABLE "public"."customers" TO "service_role";



GRANT ALL ON TABLE "public"."tenants" TO "anon";
GRANT ALL ON TABLE "public"."tenants" TO "authenticated";
GRANT ALL ON TABLE "public"."tenants" TO "service_role";



GRANT ALL ON TABLE "public"."admin_bookings_full_view" TO "anon";
GRANT ALL ON TABLE "public"."admin_bookings_full_view" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_bookings_full_view" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."financial_movements" TO "anon";
GRANT SELECT,INSERT,REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."financial_movements" TO "authenticated";
GRANT ALL ON TABLE "public"."financial_movements" TO "service_role";



GRANT ALL ON TABLE "public"."admin_monthly_summary" TO "anon";
GRANT ALL ON TABLE "public"."admin_monthly_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_monthly_summary" TO "service_role";



GRANT ALL ON TABLE "public"."admin_tenants_overview" TO "anon";
GRANT ALL ON TABLE "public"."admin_tenants_overview" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_tenants_overview" TO "service_role";



GRANT ALL ON TABLE "public"."booking_shares" TO "anon";
GRANT ALL ON TABLE "public"."booking_shares" TO "authenticated";
GRANT ALL ON TABLE "public"."booking_shares" TO "service_role";



GRANT ALL ON TABLE "public"."booking_status_transitions" TO "anon";
GRANT ALL ON TABLE "public"."booking_status_transitions" TO "authenticated";
GRANT ALL ON TABLE "public"."booking_status_transitions" TO "service_role";



GRANT ALL ON TABLE "public"."bookings_stuck_pending_refund" TO "anon";
GRANT ALL ON TABLE "public"."bookings_stuck_pending_refund" TO "authenticated";
GRANT ALL ON TABLE "public"."bookings_stuck_pending_refund" TO "service_role";



GRANT ALL ON TABLE "public"."cancellation_policies" TO "anon";
GRANT ALL ON TABLE "public"."cancellation_policies" TO "authenticated";
GRANT ALL ON TABLE "public"."cancellation_policies" TO "service_role";



GRANT ALL ON TABLE "public"."circle_memberships" TO "anon";
GRANT ALL ON TABLE "public"."circle_memberships" TO "authenticated";
GRANT ALL ON TABLE "public"."circle_memberships" TO "service_role";



GRANT ALL ON TABLE "public"."circles" TO "anon";
GRANT ALL ON TABLE "public"."circles" TO "authenticated";
GRANT ALL ON TABLE "public"."circles" TO "service_role";



GRANT ALL ON TABLE "public"."drivers" TO "anon";
GRANT ALL ON TABLE "public"."drivers" TO "authenticated";
GRANT ALL ON TABLE "public"."drivers" TO "service_role";



GRANT ALL ON TABLE "public"."onboarding" TO "anon";
GRANT ALL ON TABLE "public"."onboarding" TO "authenticated";
GRANT ALL ON TABLE "public"."onboarding" TO "service_role";



GRANT ALL ON TABLE "public"."onboarding_admin_view" TO "anon";
GRANT ALL ON TABLE "public"."onboarding_admin_view" TO "authenticated";
GRANT ALL ON TABLE "public"."onboarding_admin_view" TO "service_role";



GRANT ALL ON TABLE "public"."passengers" TO "anon";
GRANT ALL ON TABLE "public"."passengers" TO "authenticated";
GRANT ALL ON TABLE "public"."passengers" TO "service_role";



GRANT ALL ON TABLE "public"."platform_settings" TO "anon";
GRANT ALL ON TABLE "public"."platform_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."platform_settings" TO "service_role";



GRANT ALL ON TABLE "public"."pricing_rules" TO "anon";
GRANT ALL ON TABLE "public"."pricing_rules" TO "authenticated";
GRANT ALL ON TABLE "public"."pricing_rules" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."stripe_events" TO "anon";
GRANT ALL ON TABLE "public"."stripe_events" TO "authenticated";
GRANT ALL ON TABLE "public"."stripe_events" TO "service_role";



GRANT ALL ON TABLE "public"."stripe_webhook_logs" TO "anon";
GRANT ALL ON TABLE "public"."stripe_webhook_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."stripe_webhook_logs" TO "service_role";



GRANT ALL ON TABLE "public"."stripe_webhook_errors" TO "anon";
GRANT ALL ON TABLE "public"."stripe_webhook_errors" TO "authenticated";
GRANT ALL ON TABLE "public"."stripe_webhook_errors" TO "service_role";



GRANT ALL ON TABLE "public"."stripe_webhook_pending" TO "anon";
GRANT ALL ON TABLE "public"."stripe_webhook_pending" TO "authenticated";
GRANT ALL ON TABLE "public"."stripe_webhook_pending" TO "service_role";



GRANT ALL ON TABLE "public"."tenant_dashboard_kpi" TO "anon";
GRANT ALL ON TABLE "public"."tenant_dashboard_kpi" TO "authenticated";
GRANT ALL ON TABLE "public"."tenant_dashboard_kpi" TO "service_role";



GRANT ALL ON TABLE "public"."vehicles" TO "anon";
GRANT ALL ON TABLE "public"."vehicles" TO "authenticated";
GRANT ALL ON TABLE "public"."vehicles" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































drop extension if exists "pg_net";

revoke delete on table "public"."financial_movements" from "anon";

revoke update on table "public"."financial_movements" from "anon";

revoke delete on table "public"."financial_movements" from "authenticated";

revoke update on table "public"."financial_movements" from "authenticated";

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
</file>

<file path="supabase/migrations/20260310000001_add_site_slug.sql">
-- Migration: Add site_slug to tenants
ALTER TABLE IF EXISTS public.tenants
ADD COLUMN IF NOT EXISTS site_slug text UNIQUE;

-- Commentaire pour documentation
COMMENT ON COLUMN public.tenants.site_slug IS 'Slug identifiant le dossier de design dans src/sites/';

-- Update du tenant de test si nécessaire
-- UPDATE public.tenants SET site_slug = 'demo' WHERE id = '5750a0b3-4c6c-4782-b137-830a49e32249';
</file>

<file path="supabase/migrations/20260310210930_allow_public_read_tenants.sql">
-- Autoriser la lecture publique de la table tenants (nécessaire pour le multi-tenant front)
CREATE POLICY "Allow public read of tenants" ON public.tenants FOR SELECT USING (true);
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
</file>

<file path="supabase/migrations/20260310222956_reset_public_read_policies.sql">
-- supprimer ancienne policy si elle existe
drop policy if exists "public_read_tenants" on public.tenants;

-- s'assurer que RLS est actif
alter table public.tenants enable row level security;

-- nouvelle policy propre
create policy "public_read_tenants"
on public.tenants
for select
using (true);


drop policy if exists "public_read_pricing" on public.pricing_rules;

alter table public.pricing_rules enable row level security;

create policy "public_read_pricing"
on public.pricing_rules
for select
using (true);
</file>

<file path="supabase/migrations/20260310223203_rls_public_read_front.sql">
-- activer RLS
alter table public.tenants enable row level security;
alter table public.pricing_rules enable row level security;

-- reset policies si elles existent
drop policy if exists "public_read_tenants" on public.tenants;
drop policy if exists "public_read_pricing" on public.pricing_rules;

-- permettre lecture publique pour le site
create policy "public_read_tenants"
on public.tenants
for select
using (true);

create policy "public_read_pricing"
on public.pricing_rules
for select
using (true);
</file>

<file path="supabase/migrations/20260311011313_airport_transfer_routes.sql">
-- 1. Création des Zones
CREATE TABLE IF NOT EXISTS public.zones (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id uuid REFERENCES public.tenants(id) ON DELETE CASCADE,
    name text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- 2. Création des Trajets Fixes (Forfaits)
CREATE TABLE IF NOT EXISTS public.fixed_routes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id uuid REFERENCES public.tenants(id) ON DELETE CASCADE,
    pickup_zone_id uuid REFERENCES public.zones(id) ON DELETE CASCADE,
    dropoff_zone_id uuid REFERENCES public.zones(id) ON DELETE CASCADE,
    vehicle_category text NOT NULL,
    price numeric NOT NULL CHECK (price > 0),
    is_bidirectional boolean DEFAULT true, -- Permet d'appliquer le prix dans les deux sens
    active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    -- CONTRAINTE D'UNICITÉ : Empêche les doublons pour un même trajet/véhicule/chauffeur
    CONSTRAINT unique_tenant_route_category UNIQUE (tenant_id, pickup_zone_id, dropoff_zone_id, vehicle_category)
);

-- 3. Index de performance (Recherche ultra-rapide par le Front)
CREATE INDEX IF NOT EXISTS idx_fixed_routes_query
ON public.fixed_routes (tenant_id, pickup_zone_id, dropoff_zone_id);

-- 4. RLS & POLICIES
ALTER TABLE public.zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fixed_routes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_zones" ON public.zones;
CREATE POLICY "public_read_zones" ON public.zones FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_fixed_routes" ON public.fixed_routes;
CREATE POLICY "public_read_fixed_routes" ON public.fixed_routes FOR SELECT USING (true);
</file>

<file path="supabase/migrations/20260311023218_create_clients_table.sql">
-- Pour la table customers
CREATE TABLE IF NOT EXISTS public.customers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id uuid NOT NULL,
    email text NOT NULL,
    first_name text,
    last_name text,
    phone text,
    created_at timestamptz DEFAULT now(),
    UNIQUE(tenant_id, email)
);

-- Pour la liaison (C'est ici que ça bloquait)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='customer_id') THEN
        ALTER TABLE public.bookings ADD COLUMN customer_id uuid REFERENCES public.customers(id) ON DELETE SET NULL;
    END IF;
END $$;
</file>

<file path="supabase/migrations/20260311040612_Allow_public_read_booking.sql">
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read booking by ID" ON public.bookings;
CREATE POLICY "Allow public read booking by ID"
ON public.bookings FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Allow public read customer by ID" ON public.customers;
CREATE POLICY "Allow public read customer by ID"
ON public.customers FOR SELECT TO anon USING (true);
</file>

<file path="supabase/migrations/20260312212834_vehicle_enums.sql">
-- =========================
-- VEHICLE ENUMS
-- =========================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'vehicle_category_enum'
  ) THEN
    CREATE TYPE vehicle_category_enum AS ENUM (
      'berline',
      'van',
      'suv',
      'minibus',
      'luxury'
    );
  END IF;
END $$;


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'vehicle_status_enum'
  ) THEN
    CREATE TYPE vehicle_status_enum AS ENUM (
      'active',
      'inactive',
      'maintenance'
    );
  END IF;
END $$;


-- =========================
-- ALTER VEHICLES
-- =========================

ALTER TABLE public.vehicles
ALTER COLUMN category
TYPE vehicle_category_enum
USING category::vehicle_category_enum;


ALTER TABLE public.vehicles
ADD COLUMN IF NOT EXISTS status vehicle_status_enum
NOT NULL DEFAULT 'active';
</file>

<file path="supabase/migrations/20260312223341_get_available_vehicles.sql">
create or replace function public.get_available_vehicles(
  p_tenant_id uuid
)
returns table (
  id uuid,
  category vehicle_category_enum,
  capacity int,
  brand text,
  model text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    v.id,
    v.category,
    v.capacity,
    v.brand,
    v.model
  from public.vehicles v
  where v.tenant_id = p_tenant_id
  and v.status = 'active'
$$;
</file>

<file path="supabase/migrations/20260312231224_add_luggage_count_to_bookings.sql">
ALTER TABLE public.bookings
ADD COLUMN luggage_count int NOT NULL DEFAULT 0;
</file>

<file path="supabase/migrations/20260312231900_add_booking_type_enum.sql">
CREATE TYPE booking_type_enum AS ENUM (
  'transfer'
);
</file>

<file path="supabase/migrations/20260312232001_add_booking_type_column.sql">
ALTER TABLE public.bookings
ADD COLUMN booking_type booking_type_enum;

UPDATE public.bookings
SET booking_type = 'transfer'
WHERE booking_type IS NULL;

ALTER TABLE public.bookings
ALTER COLUMN booking_type SET NOT NULL;
</file>

<file path="supabase/migrations/20260313094828_add_booking_vehiculeID_column.sql">
-- =========================
-- BOOKING VEHICLE
-- =========================

alter table bookings
add column vehicle_id uuid;

alter table bookings
add constraint bookings_vehicle_fk
foreign key (vehicle_id)
references vehicles(id)
on delete set null;

create index bookings_vehicle_id_idx
on bookings(vehicle_id);


-- =========================
-- VEHICLE LUGGAGE
-- =========================

alter table vehicles
add column luggage_capacity int not null default 3;

update vehicles
set luggage_capacity = 8
where category = 'van';

update vehicles
set luggage_capacity = 3
where category = 'berline';
</file>

<file path="supabase/migrations/20260316213124_add_logo.sql">
alter table tenants
add column if not exists logo_url text,
add column if not exists favicon_url text,
add column if not exists primary_color text;
</file>

<file path="supabase/migrations/20260317144504_stripe_events_v2.sql">

</file>

<file path="supabase/migrations/20260317150946_stripe_events_fix_v1.sql">
-- =====================================================
-- STRIPE EVENTS LOG TABLE
-- Used to track all Stripe activity:
-- checkout sessions
-- payments
-- webhooks
-- refunds
-- transfers
-- errors
-- This table must stay generic
-- =====================================================

drop table if exists stripe_events cascade;

create table stripe_events (

  -- Primary key
  id uuid primary key default gen_random_uuid(),

  -- Stripe identifiers
  stripe_event_id text,        -- Stripe event id (evt_...)
  session_id text,             -- checkout session id (cs_...)
  payment_intent_id text,      -- payment intent (pi_...)

  -- Event info
  event_type text,             -- checkout_session_created / payment_succeeded / webhook / etc
  status text,                 -- session_created / completed / failed / expired / error

  -- Context
  tenant_id uuid,              -- tenant linked to payment
  booking_id uuid,             -- booking created after payment

  -- Service info
  booking_type text,           -- transfer / hourly / share / manual / dispatch

  -- Money
  amount numeric,              -- total amount

  -- Full metadata snapshot (from stripe / session / webhook)
  metadata jsonb,

  -- Error message if failure
  error text,

  -- Timestamp
  created_at timestamptz default now()

);

-- =====================================================
-- INDEXES
-- =====================================================

-- fast lookup by session
create index idx_stripe_events_session
on stripe_events (session_id);

-- fast lookup by payment intent
create index idx_stripe_events_payment
on stripe_events (payment_intent_id);

-- fast lookup by tenant
create index idx_stripe_events_tenant
on stripe_events (tenant_id);

-- fast lookup by type
create index idx_stripe_events_type
on stripe_events (event_type);
</file>

<file path="supabase/migrations/20260317160010_policy_INSERT_bookings.sql">
drop policy if exists "insert bookings" on bookings;

create policy "insert bookings"
on bookings
for insert
to anon, authenticated
with check (true);
</file>

<file path="supabase/migrations/20260317170329_fix_bookings_rls_for_webhook_v1.sql">
-- =========================================================
-- fix_bookings_rls_for_webhook_v1_1
-- Correction tenant_id → current_tenant_id
-- =========================================================


-- =========================
-- 1. Activer RLS
-- =========================

alter table bookings enable row level security;


-- =========================
-- 2. Supprimer anciennes policies
-- =========================

drop policy if exists "insert bookings" on bookings;
drop policy if exists "insert bookings anon" on bookings;
drop policy if exists "insert bookings authenticated" on bookings;

drop policy if exists "select bookings tenant" on bookings;
drop policy if exists "update bookings tenant" on bookings;
drop policy if exists "delete bookings tenant" on bookings;


-- =========================
-- 3. PAS de policy INSERT
-- webhook only
-- =========================


-- =========================
-- 4. SELECT tenant
-- =========================

create policy "select bookings tenant"
on bookings
for select
to authenticated
using (

  current_tenant_id = (
    select tenant_id
    from profiles
    where id = auth.uid()
  )

);


-- =========================
-- 5. UPDATE tenant (optionnel)
-- =========================

create policy "update bookings tenant"
on bookings
for update
to authenticated
using (

  current_tenant_id = (
    select tenant_id
    from profiles
    where id = auth.uid()
  )

)
with check (

  current_tenant_id = (
    select tenant_id
    from profiles
    where id = auth.uid()
  )

);


-- =========================
-- 6. DELETE bloqué
-- =========================

-- pas de policy delete


-- =========================
-- V1 RULE
-- booking créé uniquement par webhook
-- =========================
</file>

<file path="supabase/migrations/20260317182933_service_role_policies_payement_v1.sql">
-- =========================================================
-- V1 — SERVICE ROLE POLICIES SAFE
-- migration idempotente
-- =========================================================


-- =========================
-- CUSTOMERS
-- =========================

drop policy if exists service_role_full_access_customers
on public.customers;

create policy service_role_full_access_customers
on public.customers
for all
to service_role
using (true)
with check (true);



-- =========================
-- BOOKINGS
-- =========================

drop policy if exists service_role_full_access_bookings
on public.bookings;

create policy service_role_full_access_bookings
on public.bookings
for all
to service_role
using (true)
with check (true);



-- =========================
-- STRIPE EVENTS
-- =========================

drop policy if exists service_role_full_access_stripe_events
on public.stripe_events;

create policy service_role_full_access_stripe_events
on public.stripe_events
for all
to service_role
using (true)
with check (true);



-- =========================
-- VEHICLES
-- =========================

drop policy if exists service_role_full_access_vehicles
on public.vehicles;

create policy service_role_full_access_vehicles
on public.vehicles
for all
to service_role
using (true)
with check (true);



-- =========================
-- TENANTS
-- =========================

drop policy if exists service_role_full_access_tenants
on public.tenants;

create policy service_role_full_access_tenants
on public.tenants
for all
to service_role
using (true)
with check (true);



-- =========================
-- PROFILES
-- =========================

drop policy if exists service_role_full_access_profiles
on public.profiles;

create policy service_role_full_access_profiles
on public.profiles
for all
to service_role
using (true)
with check (true);
</file>

<file path="supabase/migrations/20260317183357_fix_customers_rls_v2.sql">
/*
-------------------------------------------------------
FIX RLS V2 — allow service_role full access
Used by Stripe webhook / Edge Functions
-------------------------------------------------------

Problem:
Webhook uses service_role key
RLS blocks inserts if policy not defined for service_role

Solution:
Create full access policies for service_role
on customers / bookings / stripe_events
-------------------------------------------------------
*/


/* =====================================================
   CUSTOMERS
===================================================== */

-- Enable RLS
alter table customers enable row level security;

-- Remove old policy if exists
drop policy if exists service_role_full_access_customers
on customers;

-- Allow service_role full access
create policy service_role_full_access_customers
on customers
for all
to service_role
using (true)
with check (true);



/* =====================================================
   BOOKINGS
===================================================== */

alter table bookings enable row level security;

drop policy if exists service_role_full_access_bookings
on bookings;

create policy service_role_full_access_bookings
on bookings
for all
to service_role
using (true)
with check (true);



/* =====================================================
   STRIPE EVENTS
===================================================== */

alter table stripe_events enable row level security;

drop policy if exists service_role_full_access_stripe_events
on stripe_events;

create policy service_role_full_access_stripe_events
on stripe_events
for all
to service_role
using (true)
with check (true);



/* =====================================================
   DEBUG CHECK (optional)
   You can run manually in SQL editor
===================================================== */

-- select *
-- from pg_policies
-- where tablename in (
--   'customers',
--   'bookings',
--   'stripe_events'
-- );
</file>

<file path="supabase/migrations/20260317183612_reset_customers_rls_v3.sql">
/*
RESET COMPLET RLS customers
On supprime toutes les policies
Puis on recrée uniquement service_role
*/

alter table customers enable row level security;

-- remove ALL policies
drop policy if exists service_role_full_access_customers on customers;
drop policy if exists customers_select_policy on customers;
drop policy if exists customers_insert_policy on customers;
drop policy if exists customers_update_policy on customers;
drop policy if exists customers_delete_policy on customers;
drop policy if exists full_access on customers;
drop policy if exists allow_all on customers;

-- recreate clean policy

create policy service_role_full_access_customers
on customers
for all
to service_role
using (true)
with check (true);
</file>

<file path="supabase/migrations/20260317184235_customers_rls_upsert_fix_v4.sql">
/*
customers RLS fix for UPSERT
Allow service_role full access
Fix tenant isolation conflict
*/

alter table customers enable row level security;


-- remove old policies

drop policy if exists service_role_full_access_customers on customers;
drop policy if exists customers_insert on customers;
drop policy if exists customers_update on customers;
drop policy if exists customers_select on customers;
drop policy if exists customers_all on customers;
drop policy if exists customers_tenant_isolation on customers;
drop policy if exists customers_platform_admin_read on customers;
drop policy if exists "Allow public read customer by ID" on customers;


-- service_role full access

create policy customers_service_role_all
on customers
for all
to service_role
using (true)
with check (true);


-- tenant isolation only for authenticated users

create policy customers_tenant_isolation
on customers
for all
to authenticated
using (
  tenant_id = current_tenant_id()
)
with check (
  tenant_id = current_tenant_id()
);
</file>

<file path="supabase/migrations/20260317184556_customers_rls_bypass_v7.sql">
/*
FINAL FIX customers RLS

Allow service_role to bypass tenant isolation
*/

alter table customers enable row level security;


-- remove tenant isolation

drop policy if exists customers_tenant_isolation on customers;


-- keep service_role full access

drop policy if exists customers_service_role_all on customers;

create policy customers_service_role_all
on customers
for all
to service_role
using (true)
with check (true);


-- tenant isolation ONLY for authenticated

create policy customers_tenant_isolation_auth
on customers
for all
to authenticated
using (
  tenant_id = current_tenant_id()
)
with check (
  tenant_id = current_tenant_id()
);
</file>

<file path="supabase/migrations/20260317185350_customers_insert_tenant.sql">
alter table customers enable row level security;

drop policy if exists insert_customers_public on customers;

create policy insert_customers_public
on customers
for insert
to anon, authenticated
with check (
  tenant_id is not null
);

create policy insert_bookings_public
on bookings
for insert
to anon, authenticated
with check (
  original_tenant_id is not null
);
</file>

<file path="supabase/migrations/20260317195831_add_payement.sql">
ALTER TYPE payment_mode ADD VALUE 'stripe';
</file>

<file path="supabase/migrations/20260317205354_policy_success.sql">
drop policy if exists "public read bookings" on bookings;
drop policy if exists "public read stripe_events" on stripe_events;
drop policy if exists "public read customers" on customers;

create policy "public read bookings"
on bookings
for select
using (true);

create policy "public read stripe_events"
on stripe_events
for select
using (true);

create policy "public read customers"
on customers
for select
using (true);
</file>

<file path="supabase/migrations/20260317205714_policy_success_v2.sql">
alter table stripe_events enable row level security;
alter table bookings enable row level security;
alter table customers enable row level security;


drop policy if exists "public_read_stripe_events" on stripe_events;
drop policy if exists "public_read_bookings" on bookings;
drop policy if exists "public_read_customers" on customers;

create policy "public_read_stripe_events"
on stripe_events
for select
to anon
using (true);

create policy "public_read_bookings"
on bookings
for select
to anon
using (true);

create policy "public_read_customers"
on customers
for select
to anon
using (true);
</file>

<file path="supabase/migrations/20260317225903_approve_onboarding_add_driver.sql">
create or replace function public.approve_onboarding_tx(onboarding_uuid uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  new_tenant_id uuid := gen_random_uuid();
  new_driver_id uuid := gen_random_uuid();
begin

  -- 1️⃣ vérifier onboarding pending
  if not exists (
    select 1
    from onboarding
    where id = onboarding_uuid
      and status = 'pending'
  ) then
    raise exception 'Onboarding not found or already processed';
  end if;


  -- 2️⃣ créer tenant

  insert into tenants (
    id,
    name,
    primary_domain,
    email,
    phone
  )
  select
    new_tenant_id,
    o.company_name,
    o.primary_domain,
    u.email,
    o.phone
  from onboarding o
  join profiles p on p.id = o.profile_id
  join auth.users u on u.id = p.id
  where o.id = onboarding_uuid;


  -- 3️⃣ update profile owner

  update profiles p
  set
    tenant_id = new_tenant_id,
    tenant_role = 'owner',
    first_name = o.first_name,
    last_name = o.last_name
  from onboarding o
  where o.id = onboarding_uuid
    and p.id = o.profile_id;


  -- 4️⃣ créer driver #1

  insert into drivers (
    id,
    tenant_id,
    first_name,
    last_name,
    phone
  )
  select
    new_driver_id,
    new_tenant_id,
    o.first_name,
    o.last_name,
    o.phone
  from onboarding o
  where o.id = onboarding_uuid;


  -- 5️⃣ créer vehicle #1 (si données présentes)

  insert into vehicles (
    tenant_id,
    driver_id,
    brand,
    model,
    plate_number
  )
  select
    new_tenant_id,
    new_driver_id,
    o.vehicle_brand,
    o.vehicle_model,
    o.plate_number
  from onboarding o
  where o.id = onboarding_uuid
    and o.vehicle_brand is not null;


  -- 6️⃣ update onboarding

  update onboarding
  set
    status = 'approved',
    validated_at = now()
  where id = onboarding_uuid;

end;
$$;
</file>

<file path="supabase/migrations/20260317231242_approve_onboarding_add_driver_v2.sql">
create or replace function public.approve_onboarding_tx(onboarding_uuid uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  new_tenant_id uuid := gen_random_uuid();
  new_driver_id uuid := gen_random_uuid();
begin

  if not exists (
    select 1
    from onboarding
    where id = onboarding_uuid
      and status = 'pending'
  ) then
    raise exception 'Onboarding not found or already processed';
  end if;


  insert into tenants (
    id,
    name,
    primary_domain,
    email,
    phone
  )
  select
    new_tenant_id,
    o.company_name,
    o.primary_domain,
    u.email,
    o.phone
  from onboarding o
  join profiles p on p.id = o.profile_id
  join auth.users u on u.id = p.id
  where o.id = onboarding_uuid;


  update profiles p
  set
    tenant_id = new_tenant_id,
    tenant_role = 'owner',
    first_name = o.first_name,
    last_name = o.last_name
  from onboarding o
  where o.id = onboarding_uuid
    and p.id = o.profile_id;


  insert into drivers (
    id,
    tenant_id,
    first_name,
    last_name,
    phone,
    license_number
  )
  select
    new_driver_id,
    new_tenant_id,
    o.first_name,
    o.last_name,
    o.phone,
    o.vtc_license_number
  from onboarding o
  where o.id = onboarding_uuid;


  insert into vehicles (
    tenant_id,
    driver_id,
    brand,
    model,
    plate_number
  )
  select
    new_tenant_id,
    new_driver_id,
    o.vehicle_brand,
    o.vehicle_model,
    o.plate_number
  from onboarding o
  where o.id = onboarding_uuid
    and o.vehicle_brand is not null;


  update onboarding
  set
    status = 'approved',
    validated_at = now()
  where id = onboarding_uuid;

end;
$$;
</file>

<file path="supabase/migrations/20260317235220_add_logo_storage_and_columns.sql">
-- supabase/migrations/20260317235220_add_logo_storage_and_columns.sql

-- 1. Ajouter les colonnes si elles manquent
ALTER TABLE public.tenants
ADD COLUMN IF NOT EXISTS logo_url text,
ADD COLUMN IF NOT EXISTS favicon_url text,
ADD COLUMN IF NOT EXISTS primary_color text;

-- 2. Créer le bucket 'assets' s'il n'existe pas
INSERT INTO storage.buckets (id, name, public)
VALUES ('assets', 'assets', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Politiques RLS pour Storage (Bucket assets)
-- On permet à tout le monde de lire (puisque c'est public)
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'assets');

-- On permet aux utilisateurs authentifiés d'uploader leur propre logo
-- (Ici on simplifie pour le MVP : authentifié peut uploader dans assets/logos/TENANT_ID/...)
CREATE POLICY "Authenticated Upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'assets' AND
  auth.role() = 'authenticated'
);

-- On permet aux propriétaires de modifier leurs fichiers
CREATE POLICY "Owner Delete" ON storage.objects
FOR DELETE USING (
  bucket_id = 'assets' AND
  auth.role() = 'authenticated'
);
</file>

<file path="supabase/migrations/20260318000203_update_approve_onboarding_tx.sql">
-- 002_fix_approve_onboarding_tx.sql

create or replace function public.approve_onboarding_tx(onboarding_uuid uuid)
returns void
language plpgsql
security definer
set search_path = public
as $function$

declare
  new_tenant_id uuid := gen_random_uuid();
  new_driver_id uuid := gen_random_uuid();

begin

  -- onboarding must exist and be pending
  if not exists (
    select 1
    from onboarding
    where id = onboarding_uuid
      and status = 'pending'
  ) then
    raise exception 'Onboarding not found or already processed';
  end if;


  -- prevent double tenant creation
  if exists (
    select 1
    from profiles p
    join onboarding o on o.profile_id = p.id
    where o.id = onboarding_uuid
      and p.tenant_id is not null
  ) then
    raise exception 'Tenant already created for this profile';
  end if;


  -- create tenant
  insert into tenants (
    id,
    name,
    primary_domain,
    email,
    phone
  )
  select
    new_tenant_id,
    o.company_name,
    o.primary_domain,
    u.email,
    o.phone
  from onboarding o
  join profiles p on p.id = o.profile_id
  join auth.users u on u.id = p.id
  where o.id = onboarding_uuid;


  -- update profile
  update profiles p
  set
    tenant_id = new_tenant_id,
    tenant_role = 'owner',
    first_name = o.first_name,
    last_name = o.last_name
  from onboarding o
  where o.id = onboarding_uuid
    and p.id = o.profile_id;


  -- create driver only once
  insert into drivers (
    id,
    tenant_id,
    first_name,
    last_name,
    phone,
    license_number
  )
  select
    new_driver_id,
    new_tenant_id,
    o.first_name,
    o.last_name,
    o.phone,
    o.vtc_license_number
  from onboarding o
  where o.id = onboarding_uuid;


  -- create vehicle if exists
  insert into vehicles (
    tenant_id,
    driver_id,
    brand,
    model,
    plate_number
  )
  select
    new_tenant_id,
    new_driver_id,
    o.vehicle_brand,
    o.vehicle_model,
    o.plate_number
  from onboarding o
  where o.id = onboarding_uuid
    and o.vehicle_brand is not null;


  -- mark onboarding approved
  update onboarding
  set
    status = 'approved',
    validated_at = now()
  where id = onboarding_uuid;

end;

$function$;
</file>

<file path=".gitignore">
# build output
dist/
# generated types
.astro/

# dependencies
node_modules/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*


# environment variables
.env
.env.production

# macOS-specific files
.DS_Store

# jetbrains setting folder
.idea/
</file>

<file path="check_email.ts">
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function checkSpecificEmail(email: string) {
  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error(error);
    return;
  }

  console.log("Total users in Auth:", users.length);
  const found = users.find((u) => u.email === email);
  if (found) {
    console.log("Found User:", found.id, found.email);
  } else {
    console.log("User not found by email:", email);
    console.log("Emails present:", users.map((u) => u.email).join(", "));
  }
}

checkSpecificEmail("mike.webfree@gmail.com");
</file>

<file path="check_id.ts">
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function checkUserById(id: string) {
  const {
    data: { user },
    error,
  } = await supabase.auth.admin.getUserById(id);
  if (error) {
    console.error(error);
    return;
  }
  console.log("User Email:", user?.email);
  console.log("User Metadata:", user?.user_metadata);
}

checkUserById("95879b16-f871-4bb6-85d8-8058c575043f");
</file>

<file path="check_onboarding.ts">
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function checkOnboarding() {
  const { data: onboardings, error } = await supabase
    .from("onboarding")
    .select("id, profile_id, status, company_name, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching onboardings:", error);
    return;
  }

  console.log("--- ONBOARDINGS BREAKDOWN ---");
  for (const o of onboardings) {
    console.log(`Onboarding ID: ${o.id}`);
    console.log(`  - Profile ID: ${o.profile_id}`);
    console.log(`  - Status: ${o.status}`);
    console.log(`  - Company: ${o.company_name}`);
    console.log(`  - Created At: ${o.created_at}`);
    console.log("------------------------");
  }
}

checkOnboarding();
</file>

<file path="debug_user.ts">
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function checkSpecificUser(email: string) {
  console.log(`Checking status for: ${email}`);

  const {
    data: { users },
    error: authError,
  } = await supabase.auth.admin.listUsers();

  if (authError) {
    console.error("Error listing users:", authError);
    return;
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    console.log("User not found in auth.users");
    return;
  }

  console.log(`Auth User ID: ${user.id}`);

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    return;
  }

  console.log("--- Profile Details ---");
  console.log(JSON.stringify(profile, null, 2));
}

const emailToCheck = process.argv[2] || "mike.webfree@gmail.com";
checkSpecificUser(emailToCheck);
</file>

<file path="LICENSE">
MIT License

Copyright (c) 2021 Supabase, Inc. and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</file>

<file path="list_profiles.ts">
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function listProfiles() {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, platform_role, tenant_role");

  if (error) {
    console.error(error);
    return;
  }

  console.log("Profiles found:", profiles.length);
  console.log(JSON.stringify(profiles, null, 2));
}

listProfiles();
</file>

<file path="tailwind.config.mjs">
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdb,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#6366f1',
                    secondary: '#4f46e5',
                    dark: '#0a0a0c',
                },
            },
        },
    },
    plugins: [require('@park-ui/tailwind-plugin')],
    parkUI: {
        accentColor: 'indigo',
        grayColor: 'slate',
    },
    darkMode: 'class',
}
</file>

<file path=".agent/identity.md">
# .agent/identity.md

**ROLE**: SENIOR FULL-STACK ENGINE (ANTIGRAVITY)

## 👤 PERSONALITY & TONE
- **Robotic & Efficient**: No small talk, no "I will do that".
- **Communication**: Responses in French ONLY.
- **Execution Silence**: No commentary during the process.
- **Direct**: Brutally honest, addresses Mike as "tu".

## 🔐 OPERATIONAL RULES
- **Token Optimization**: Absolute minimalism. No prose allowed.
- **Stack Protocol**: Park UI + Tailwind for "Luxury VTC" rendering.
- **Workflow**: One step at a time. Wait for "Next".
- **Validation**: La base de données réelle est la source de vérité absolue.
- **Protocol**: Ne JAMAIS utiliser le MCP Supabase. Utiliser uniquement les identifiants du `.env` via des appels REST/JSON.

## ⚠️ EXECUTION PROTOCOL
Unique conclusion format after every action:
**Statut** : [Succès/Erreur]
**Action** : [Surgical summary]
**Next** : [Suggested next step]

"Maximum output. Minimum tokens."
</file>

<file path="docs/cancellation.md">
# 🛡️ Moteur d'Annulation & Refund (Engine V1)

Le système d'annulation de VTC HUB est automatisé et basé sur des politiques versionnées attachées à chaque réservation au moment du paiement.

---

## 1️⃣ Moteur de Politiques (`cancellation_policies`)

Chaque tenant définit sa politique active. Lorsqu'un client paie, l'ID de la politique active est copié dans `bookings.cancellation_policy_id`. Cela garantit que même si le chauffeur change ses règles plus tard, la réservation reste soumise aux règles acceptées au moment de l'achat.

### Paramètres de la Politique :

- **Full Refund** : Seuil d'heures avant la course pour un remboursement à 100%.
- **Partial Refund** : Seuil d'heures et taux (ex: 50%) pour un remboursement partiel.
- **No-Show** : Taux de remboursement en cas d'absence client (généralement 0%).
- **Driver Fault** : Taux de remboursement si le chauffeur ne se présente pas (généralement 100%).

---

## 2️⃣ Logique de Remboursement

Le calcul est effectué par la Edge Function `calculate-refund` :

1. Comparaison entre `pickup_time` et `cancelled_at` pour déterminer le `deltaHours`.
2. Application du taux correspondant dans la politique liée.
3. Calcul du `refund_amount = total_amount * refund_rate`.

---

## 3️⃣ Workflow de Statuts

Le lifecycle d'une annulation suit un état de transition sécurisé :

1. `paid` (Statut initial payé)
2. `cancelled_pending_refund` (Remboursement Stripe initié, en attente de webhook)
3. `cancelled_refunded` (Confirmé par Stripe Webhook, audit financier généré)
4. _OU_ `cancelled_no_refund` (Annulé selon les règles sans remboursement dû)

---

## 4️⃣ Tracking & Audit

Chaque annulation enrichit le booking avec les données suivantes :

- `cancelled_at` : Timestamp précis de l'action.
- `cancellation_reason` : Motif (`client`, `no_show`, `driver_fault`, `platform_issue`).
- `cancellation_initiator` : Qui a déclenché l'annulation.
- `financial_movements` : Mouvements de type `refund` et `commission_reversal` créés automatiquement pour équilibrer la comptabilité.

---

## 5️⃣ Sécurité & Intégrité

- **Immuabilité** : Le `cancellation_policy_id` est verrouillé par trigger SQL après insertion.
- **Idempotence** : Le webhook Stripe empêche toute double insertion de mouvement financier de remboursement via `stripe_refund_id`.
- **Validation** : Seules les réservations au statut `paid` peuvent entrer dans le flux d'annulation automatisé.
</file>

<file path="docs/features_overview.md">
# Aperçu des Fonctionnalités Core (V1)

Ce document détaille les briques fondamentales implémentées pour la gestion opérationnelle et la sécurité du MVP VTC.

## 1. 📧 Infrastructure Email

Le système utilise une **Edge Gateway** centralisée pour l'envoi d'emails transactionnels via **Resend**.

### Déclenchement (Signup)

Lors de l'inscription (`src/pages/signup.astro`), une requête est envoyée à l'Edge Function `send-email`.

```typescript
// Exemple d'appel
const { error } = await supabase.functions.invoke("send-email", {
  body: {
    to: email,
    subject: "Bienvenue sur VTC HUB",
    html: `<h1>Bienvenue ${full_name}...</h1>`,
  },
});
```

### Configuration

- **Service** : [Resend](https://resend.com)
- **Fichiers clés** :
  - `supabase/functions/send-email/index.ts` : Proxy sécurisé gérant les API Keys.

---

## 2. 💰 Moteur de Pricing Dynamique

Chaque entreprise (Tenant) peut piloter sa propre grille tarifaire.

### Structure de Données

Table : `pricing_rules`

- `base_price` : Coût initial dès la prise en charge.
- `price_per_km` : Tarif appliqué à la distance.
- `minimum_fare` : Seuil minimal pour une course.
- `active` : Boolean (permet de masquer un service momentanément).

### Dashboard Chauffeur

La page `src/pages/app/pricing.astro` permet le CRUD complet via une modal premium. Elle injecte dynamiquement le `tenant_id` pour garantir l'isolation des données.

---

## 3. 🗺️ Forfaits & Zones (Fixed Routes)

Le système permet de définir des tarifs fixes pour des trajets spécifiques (ex: Transfert Aéroport).

- **Zones** : Définition de zones géographiques (Aéroport CDG, Paris Centre, etc.).
- **Forfaits (Fixed Routes)** : Association de deux zones avec un prix fixe par catégorie de véhicule.
- **Bidirectionnalité** : Option pour appliquer le même tarif dans les deux sens de circulation.

Ces tarifs sont prioritaires sur le calcul kilométrique dynamique si un trajet correspond exactement aux zones définies.

---

## 4. 🛡️ Sécurité & Cycle de Vie

### Suppression de Compte (Danger Zone)

- **Processus** : Appel à la RPC `delete_tenant_account` via une Edge Function.
- **Sécurité** : Requiert la saisie exacte de la phrase `SUPPRESSION COMPTE {NOM_ENTREPRISE}`.
- **Action SQL** : Désactive le profil, marque le tenant comme `deleted_at` et anonymise les données sensibles.

### Timeout d'Inactivité

Composant : `src/components/common/InactivityTimeout.astro`

- **Délai** : 30 minutes.
- **Fonctionnement** : Scrutage des événements (souris, clavier, tactile). Redirige vers `/login?reason=inactivity` en cas de dépassement.
- **Intégration** : Présent dans `AppLayout` et `AdminLayout`.

---

## 🎨 Guide des Composants UI

Les nouveaux composants utilisent une esthétique **Glassmorphism Dark** :

- **Modals** : Utilisation de `backdrop-blur-sm`, `border-white/10` et animations `scale-95` -> `scale-100`.
- **Toggles** : Switchs indigo élégants pour les statuts actifs/inactifs.
- **Empty States** : Retours visuels informatifs avec icônes SVG si aucune donnée n'est présente.
</file>

<file path="src/components/admin/Sidebar.astro">
---
// src/components/admin/Sidebar.astro
const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Validation Onboarding', href: '/admin/onboardings', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Réservations', href: '/admin/bookings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Partenaires', href: '/admin/tenants', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { name: 'Grand Livre', href: '/admin/ledger', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Stripe Errors', href: '/admin/stripe-monitoring', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
];

const currentPath = Astro.url.pathname;
---

<aside class="fixed inset-y-0 left-0 z-50 w-64 bg-[#0A0A0B] border-r border-white/5 transition-transform duration-300 transform md:translate-x-0 -translate-x-full" id="sidebar">
    <div class="flex flex-col h-full">
        <div class="flex items-center gap-3 px-6 py-8 border-b border-white/5">
            <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span class="text-white font-black text-xl">V</span>
            </div>
            <span class="text-lg font-black tracking-tighter uppercase italic text-white">
                VTC <span class="text-indigo-500">ADMIN</span>
            </span>
        </div>

        <nav class="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
                const isActive = currentPath === item.href;
                return (
                    <a
                        href={item.href}
                        class={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                            isActive
                                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                        }`}
                    >
                        <svg class={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon} />
                        </svg>
                        <span class="font-medium">{item.name}</span>
                    </a>
                );
            })}
        </nav>

        <div class="p-4 border-t border-white/5 space-y-3">
            <a
                href="/admin/settings"
                class={`flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all border ${
                    currentPath === '/admin/settings'
                    ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/20'
                    : 'text-slate-500 hover:text-white hover:bg-white/5 border-transparent'
                }`}
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Configuration
            </a>

            <button
                id="sidebar-logout-btn"
                class="flex items-center justify-center w-full gap-2 px-4 py-2 text-xs font-bold text-red-400 uppercase transition-all bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
            </button>
        </div>
    </div>
</aside>

<!-- Logout Confirmation Modal -->
<div id="logout-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-6 opacity-0 pointer-events-none transition-all duration-300">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm modal-overlay"></div>
    <div class="relative glass max-w-sm w-full rounded-[2rem] border border-white/10 shadow-2xl p-8 transform scale-95 transition-all duration-300">
        <div class="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center text-red-500 mb-6">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
        </div>
        <h3 class="text-xl font-black italic uppercase text-white mb-2 tracking-tight">Déconnexion</h3>
        <p class="text-slate-400 text-sm font-medium mb-8 leading-relaxed italic">
            Es-tu sûr de vouloir te déconnecter de la plateforme ?
        </p>
        <div class="flex gap-3">
            <button id="confirm-logout" class="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all">
                Oui, déconnexion
            </button>
            <button id="cancel-logout" class="flex-1 py-3 bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-black uppercase tracking-widest rounded-xl transition-all border border-white/5">
                Annuler
            </button>
        </div>
    </div>
</div>

<style>
    .glass {
        background: rgba(10, 10, 11, 0.8);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    }
    #logout-modal.is-active {
        opacity: 1;
        pointer-events: auto;
    }
    #logout-modal.is-active > div:last-child {
        transform: scale(1);
    }
</style>

<script>
    import { supabase } from "@/lib/supabase/client";

    const logoutBtn = document.querySelector("#sidebar-logout-btn");
    const modal = document.querySelector("#logout-modal");
    const confirmBtn = document.querySelector("#confirm-logout");
    const cancelBtn = document.querySelector("#cancel-logout");
    const overlay = document.querySelector(".modal-overlay");

    const toggleModal = () => {
        modal?.classList.toggle('is-active');
    };

    logoutBtn?.addEventListener("click", toggleModal);
    cancelBtn?.addEventListener("click", toggleModal);
    overlay?.addEventListener("click", toggleModal);

    confirmBtn?.addEventListener("click", async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    });

    // Close on Escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('is-active')) {
            toggleModal();
        }
    });
</script>
</file>

<file path="src/components/drivers/DriverList.tsx">
import {
  deleteDriver,
  getDrivers,
  initializePrimaryDriver,
} from "@/services/drivers";
import {
  CreditCard,
  Edit2,
  Phone,
  Plus,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { ConfirmationModal } from "../common/ConfirmationModal";
import { DriverModal } from "./DriverModal";

interface Driver {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  license_number: string;
  created_at: string;
}

interface DriverListProps {
  tenantId: string;
  userId: string;
}

export const DriverList: React.FC<DriverListProps> = ({ tenantId, userId }) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [initLoading, setInitLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  // States pour les Confirmations
  const [confirmInit, setConfirmInit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const data = await getDrivers(tenantId);
      setDrivers(data || []);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInitialize = async () => {
    try {
      setInitLoading(true);
      const res = await initializePrimaryDriver(tenantId, userId);
      if (res.success) {
        fetchDrivers();
        setConfirmInit(false);
      } else {
        // Optionnel : on pourrait aussi utiliser un modal d'erreur ici au lieu d'une alerte
        alert(res.error || res.message || "Erreur lors de l'initialisation");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setInitLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      setLoading(true); // Re-trigger loading state or use a local delete loading state
      await deleteDriver(confirmDelete.id);
      fetchDrivers();
      setConfirmDelete(null);
    } catch (err) {
      alert("Erreur lors de la suppression");
      setLoading(false);
    }
  };

  const handleEdit = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedDriver(null);
    setShowModal(true);
  };

  useEffect(() => {
    fetchDrivers();
  }, [tenantId]);

  useEffect(() => {
    const openModal = () => handleCreate();
    window.addEventListener("drivers:open-modal", openModal);
    return () => window.removeEventListener("drivers:open-modal", openModal);
  }, []);

  return (
    <div className='flex flex-col h-full'>
      {loading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='glass h-56 rounded-[2rem] border border-white/5 animate-pulse bg-white/5'
            />
          ))}
        </div>
      ) : drivers.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 custom-scrollbar pb-12'>
          {drivers.map((d) => (
            <div
              key={d.id}
              className='glass p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all group relative overflow-hidden'>
              <div className='absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/10 transition-all' />

              <div className='flex justify-between items-start mb-6'>
                <div className='w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110'>
                  <Users className='w-8 h-8' />
                </div>
                <div className='flex items-center gap-1'>
                  <button
                    onClick={() => handleEdit(d)}
                    className='p-2 text-slate-600 hover:text-white transition-colors'>
                    <Edit2 className='w-4 h-4' />
                  </button>
                  <button
                    onClick={() =>
                      setConfirmDelete({
                        id: d.id,
                        name: `${d.first_name} ${d.last_name}`,
                      })
                    }
                    className='p-2 text-slate-600 hover:text-red-500 transition-colors'>
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              </div>

              <div className='mb-6'>
                <h3 className='text-2xl font-black text-white uppercase tracking-tighter leading-none mb-1'>
                  {d.first_name}
                </h3>
                <h3 className='text-2xl font-black text-white/50 uppercase tracking-tighter leading-none'>
                  {d.last_name}
                </h3>
              </div>

              <div className='space-y-3 pt-6 border-t border-white/5'>
                <div className='flex items-center gap-3'>
                  <Phone className='w-3 h-3 text-indigo-500' />
                  <p className='text-[11px] font-bold text-slate-300 uppercase tracking-widest'>
                    {d.phone}
                  </p>
                </div>
                <div className='flex items-center gap-3'>
                  <CreditCard className='w-3 h-3 text-slate-500' />
                  <p className='text-[10px] font-medium text-slate-500 uppercase tracking-widest'>
                    Carte : {d.license_number}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex-1 glass rounded-[2.5rem] border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center p-20 text-center'>
          <div className='w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-slate-700 mb-6'>
            <Users className='w-10 h-10' />
          </div>
          <h3 className='text-2xl font-black text-white uppercase tracking-tighter mb-2'>
            Aucun chauffeur trouvé
          </h3>
          <p className='text-slate-500 text-sm mb-12 max-w-sm'>
            Vous n'avez pas encore enregistré de chauffeur pour votre flotte.
          </p>

          <div className='flex flex-col sm:flex-row gap-4'>
            <button
              onClick={() => setConfirmInit(true)}
              disabled={initLoading}
              className='flex items-center gap-3 px-10 py-5 bg-white text-black hover:bg-indigo-50 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-white/10 active:scale-95 disabled:opacity-50'>
              {initLoading ? (
                <span className='w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin' />
              ) : (
                <UserCheck className='w-4 h-4' />
              )}
              <span>M'ajouter comme chauffeur</span>
            </button>

            <button
              onClick={handleCreate}
              className='flex items-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95'>
              <Plus className='w-4 h-4' />
              <span>Créer un autre chauffeur</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal d'édition / création */}
      <DriverModal
        tenantId={tenantId}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchDrivers}
        driver={selectedDriver}
      />

      {/* Confirmation Initialisation */}
      <ConfirmationModal
        isOpen={confirmInit}
        onClose={() => setConfirmInit(false)}
        onConfirm={handleInitialize}
        loading={initLoading}
        title='Initialisation Chauffeur'
        message="Voulez-vous vous enregistrer automatiquement comme premier chauffeur en utilisant vos informations d'inscription ?"
        confirmLabel="S'enregistrer"
        confirmVariant='primary'
      />

      {/* Confirmation Suppression */}
      <ConfirmationModal
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        title='Supprimer Chauffeur'
        message={`Es-tu sûr de vouloir supprimer ${confirmDelete?.name} ? Cette action est irréversible.`}
        confirmLabel='Supprimer'
        confirmVariant='danger'
      />
    </div>
  );
};
</file>

<file path="src/lib/supabase/client.ts">
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
);
</file>

<file path="src/lib/guards.ts">
// src/lib/guards.ts

export type TenantRole = "owner" | "manager" | "driver";

/**
 * Vérifie si le profil est un administrateur plateforme
 */
const PLATFORM_ROLES = ["super_admin", "platform_staff"];

export function isPlatform(profile: any) {
  return PLATFORM_ROLES.includes(profile?.platform_role);
}
/**
 * Vérifie si le profil appartient à un tenant
 */
export function isTenant(profile: any) {
  return !!profile?.tenant_id;
}

/**
 * Vérifie les permissions au sein d'un tenant
 */
export function requireTenantRole(profile: any, allowed: TenantRole[]) {
  if (!profile?.tenant_role || !allowed.includes(profile.tenant_role)) {
    throw new Error("Access denied: Insufficient permissions");
  }
}

/**
 * Utilitaire booléen pour l'UI
 */
export function hasTenantRole(profile: any, allowed: TenantRole[]): boolean {
  return !!(profile?.tenant_role && allowed.includes(profile.tenant_role));
}
</file>

<file path="src/pages/admin/bookings.astro">
---
// src/pages/admin/bookings.astro
import AdminLayout from "../../layouts/AdminLayout.astro";
import { requirePlatformAdmin } from "../../lib/guards/platform";
import { createAdminClient } from "../../lib/supabase/server";

const { profile } = Astro.locals;

// 1. Sécurité : Vérification plateforme
try {
  await requirePlatformAdmin(profile);
} catch {
  return Astro.redirect("/login");
}

const supabaseAdmin = createAdminClient();

// 2. Paramètres de pagination et filtres
const PAGE_SIZE = 25;
const url = Astro.url;
const page = parseInt(url.searchParams.get("page") || "1");
const status = url.searchParams.get("status") || "";
const driver_id = url.searchParams.get("driver_id") || "";
const email = url.searchParams.get("email") || "";
const dateFrom = url.searchParams.get("from") || "";
const dateTo = url.searchParams.get("to") || "";
const minAmount = url.searchParams.get("min") || "";
const maxAmount = url.searchParams.get("max") || "";

const fromIndex = (page - 1) * PAGE_SIZE;
const toIndex = fromIndex + PAGE_SIZE - 1;

// 3. Construction de la requête principale via la VUE ADMIN
let query = supabaseAdmin
    .from("admin_bookings_full_view")
    .select("*", { count: "exact" });

if (status) query = query.eq("status", status);
if (driver_id) query = query.eq("driver_id", driver_id);
if (email) query = query.ilike("display_customer_email", `%${email}%`);
if (dateFrom) query = query.gte("created_at", `${dateFrom}T00:00:00`);
if (dateTo) query = query.lte("created_at", `${dateTo}T23:59:59`);
if (minAmount) query = query.gte("total_amount", parseFloat(minAmount));
if (maxAmount) query = query.lte("total_amount", parseFloat(maxAmount));

const { data: bookings, count, error } = await query
    .order("created_at", { ascending: false })
    .range(fromIndex, toIndex);

if (error) console.error("Admin Bookings Fetch Error:", error);

// 4. Données pour les filtres (chauffeurs)
const { data: drivers } = await supabaseAdmin
    .from("drivers")
    .select("id, first_name, last_name")
    .order("last_name");

const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 0;

// Utilitaire pour construire les liens de pagination en gardant les filtres
const getPaginationUrl = (p: number) => {
    const params = new URLSearchParams(url.searchParams);
    params.set("page", p.toString());
    return `${url.pathname}?${params.toString()}`;
};

const getStatusBadge = (s: string) => {
    switch (s) {
        case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
        case 'accepted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
        case 'paid': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
        case 'completed': return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
        case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
        case 'refunded': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
        default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
}
---

<AdminLayout
    title="Gestion des Courses"
    description="Consultez et filtrez l'historique complet des réservations."
>
    <div class="max-w-7xl mx-auto py-4 px-6 mt-[-40px]">
        <!-- FILTRES -->
        <div class="glass p-8 rounded-3xl border border-white/5 mb-8">
            <form id="filter-form" method="GET" class="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
                <input type="hidden" name="page" value="1" />

                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Email Client</label>
                    <input
                        type="text" name="email" value={email} placeholder="jane@example.com"
                        class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Statut</label>
                    <select name="status" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
                        <option value="">Tous les statuts</option>
                        {['pending', 'accepted', 'paid', 'completed', 'cancelled', 'refunded'].map(s => (
                            <option value={s} selected={status === s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Chauffeur</label>
                    <select name="driver_id" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
                        <option value="">Tous les chauffeurs</option>
                        {drivers?.map(d => (
                            <option value={d.id} selected={driver_id === d.id}>{d.first_name} {d.last_name}</option>
                        ))}
                    </select>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Du</label>
                        <input type="date" name="from" value={dateFrom} class="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white" />
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Au</label>
                        <input type="date" name="to" value={dateTo} class="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white" />
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                     <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Min €</label>
                        <input type="number" name="min" value={minAmount} placeholder="0" class="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white" />
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Max €</label>
                        <input type="number" name="max" value={maxAmount} placeholder="1000" class="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white" />
                    </div>
                </div>
            </form>
        </div>


        <!-- BARRE D'ACTIONS & RÉSULTATS -->
        <div class="mb-6 flex items-center justify-between">
             <div class="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-400">
                {count || 0} Résultats
            </div>

            <div class="flex items-center gap-3">
                <a href="/admin/bookings" class="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 rounded-xl transition-all border border-white/5">Réinitialiser</a>
                <button type="submit" form="filter-form" class="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-600/20 transition-all">Filtrer</button>
            </div>
        </div>


        <!-- TABLEAU -->
        <div class="glass rounded-3xl overflow-hidden border border-white/5">

            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead>
                        <tr class="bg-white/5 border-b border-white/5">
                            <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Référence</th>
                            <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Client / Email</th>
                            <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Chauffeur</th>
                            <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Date / Trajet</th>
                            <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Statut</th>
                            <th class="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">Montant Montant</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        {bookings?.map((b) => (
                            <tr class="hover:bg-white/5 transition-colors group">
                                <td class="px-6 py-4">
                                    <span class="text-[10px] font-black uppercase tracking-widest text-slate-600">#{b.id?.slice(0, 8)}</span>
                                </td>
                                <td class="px-6 py-4">
                                    <p class="text-[11px] font-black italic uppercase text-white">
                                        {b.display_customer_first_name} {b.display_customer_last_name || ''}
                                    </p>
                                    <p class="text-[9px] font-bold text-slate-500 mt-0.5">{b.display_customer_email}</p>
                                    <a href={`tel:${b.display_customer_phone}`} class="text-[8px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors block mt-1">
                                        {b.display_customer_phone}
                                    </a>
                                </td>
                                <td class="px-6 py-4">
                                    {b.driver_id ? (
                                        <p class="text-[10px] font-black uppercase text-indigo-400">
                                            {b.driver_first_name} {b.driver_last_name}
                                        </p>
                                    ) : (
                                        <div>
                                            <p class="text-[10px] font-black uppercase text-amber-500/80 italic">Chauffeur (Non assigné)</p>
                                            <p class="text-[9px] font-bold text-slate-500 mt-0.5">{b.original_tenant_name || 'Inconnu'}</p>
                                            <p class="text-[8px] text-slate-600 truncate max-w-[120px]">{b.original_tenant_domain}</p>
                                        </div>
                                    )}
                                </td>
                                <td class="px-6 py-4">
                                    <p class="text-[10px] font-black text-white italic">
                                        {new Date(b.pickup_time).toLocaleDateString('fr-FR')} {new Date(b.pickup_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                    <p class="text-[9px] font-medium text-slate-500 max-w-xs truncate mt-0.5" title={b.pickup_address}>
                                        {b.pickup_address} &rarr; {b.dropoff_address}
                                    </p>
                                </td>
                                <td class="px-6 py-4">
                                    <span class={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter border ${getStatusBadge(b.status)}`}>
                                        {b.status}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <span class="text-xs font-black italic text-white">
                                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(b.total_amount)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {bookings?.length === 0 && (
                            <tr>
                                <td colspan="6" class="px-6 py-20 text-center">
                                    <p class="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Aucune réservation trouvée</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- PAGINATION -->
        {totalPages > 1 && (
            <div class="mt-8 flex items-center justify-between">
                <div class="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Page <span class="text-white">{page}</span> sur <span class="text-white">{totalPages}</span>
                </div>
                <div class="flex gap-2">
                    {page > 1 && (
                        <a
                            href={getPaginationUrl(page - 1)}
                            class="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/10 transition-all"
                        > Précédent </a>
                    )}

                    <div class="flex gap-1">
                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                            let pageNum = page;
                            if (page < 3) pageNum = i + 1;
                            else if (page > totalPages - 2) pageNum = totalPages - 4 + i;
                            else pageNum = page - 2 + i;

                            if (pageNum < 1 || pageNum > totalPages) return null;

                            return (
                                <a
                                    href={getPaginationUrl(pageNum)}
                                    class={`w-10 h-10 flex items-center justify-center rounded-xl text-[10px] font-black transition-all border ${page === pageNum ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'}`}
                                >
                                    {pageNum}
                                </a>
                            );
                        })}
                    </div>

                    {page < totalPages && (
                        <a
                            href={getPaginationUrl(page + 1)}
                            class="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/10 transition-all"
                        > Suivant </a>
                    )}
                </div>
            </div>
        )}
    </div>
</AdminLayout>
</file>

<file path="src/pages/admin/dashboard.astro">
---
// src/pages/admin/dashboard.astro
import KPIGrid from "../../components/admin/KPIGrid.astro";
import MonthlyChart from "../../components/admin/MonthlyChart.astro";
import AdminLayout from "../../layouts/AdminLayout.astro";
import { requirePlatformAdmin } from "../../lib/guards/platform";
import { createAdminClient } from "../../lib/supabase/server";


const { profile } = Astro.locals;

// Protection d'accès plateforme
try {
  await requirePlatformAdmin(profile);
} catch {
  return Astro.redirect("/login");
}

const supabaseAdmin = createAdminClient();

// Récupération des données via la nouvelle vue complète
const { data: latestBookings, error } = await supabaseAdmin
  .from('admin_bookings_full_view')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(10);

if (error) console.error("Dashboard Fetch Error:", error);

// 1️⃣ KPIs Globaux (Source: Ledger)
const { data: globalStats } = await supabaseAdmin
    .from("financial_movements")
    .select(`
        gross_amount,
        net_amount,
        movement_type
    `);

const stats = (globalStats || []).reduce((acc, curr) => {
    if (curr.movement_type === 'payment') {
        acc.total_collected += Number(curr.gross_amount);
        acc.total_net += Number(curr.net_amount);
    } else if (curr.movement_type === 'refund') {
        acc.total_net -= Number(curr.net_amount);
        acc.total_refunded += Number(curr.gross_amount);
    }
    return acc;
}, { total_collected: 0, total_net: 0, total_refunded: 0 });

// 2️⃣ Graphiques (Source: Ledger)
const { data: monthlySummary } = await supabaseAdmin
    .from("admin_monthly_summary")
    .select("*")
    .order("month", { ascending: true });

const kpiItems = [
    {
        label: "CA Total Encaissé",
        value: new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(stats.total_collected),
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
        trend: "Brut Ledger",
        trendColor: "text-slate-400"
    },
    {
        label: "Total Remboursé",
        value: new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(stats.total_refunded),
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />',
        trend: "Sorties",
        trendColor: "text-red-400"
    },
    {
        label: "Revenu Net Plateforme",
        value: new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(stats.total_net),
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />',
        trend: "Collecté - Refund",
        trendColor: "text-green-400"
    }
];

const monthlyChartData = (monthlySummary || []).map(d => ({
    month: new Date(d.month).toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }),
    total_net: Number(d.net_revenue)
}));
---


<AdminLayout title="Tableau de Bord">
    <KPIGrid title="Indicateurs Financiers" items={kpiItems} />

    <div class="mt-12">
        <MonthlyChart title="Performance Mensuelle (Net)" data={monthlyChartData} />
    </div>

    <!-- DERNIÈRES RÉSERVATIONS -->
    <div class="mt-12">
        <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-black uppercase italic tracking-tighter flex items-center gap-3 text-white">
                <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                Dernières Activités Plateforme
            </h3>
            <a href="/admin/bookings" class="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">Voir tout &rarr;</a>
        </div>

        <div class="glass rounded-3xl overflow-hidden border border-white/5 bg-white/[0.01]">
            <table class="w-full text-left">
                <thead>
                    <tr class="bg-white/5 border-b border-white/5">
                        <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Client</th>
                        <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Partenaire</th>
                        <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Statut</th>
                        <th class="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">Montant</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                    {latestBookings?.map((b) => (
                        <tr class="hover:bg-white/5 transition-colors group">
                            <td class="px-6 py-4">
                                <p class="text-[11px] font-black italic uppercase text-white">
                                    {b.display_customer_first_name} {b.display_customer_last_name || ''}
                                </p>
                                <p class="text-[9px] font-bold text-slate-500 mt-0.5">{b.display_customer_email}</p>
                                <a href={`tel:${b.display_customer_phone}`} class="text-[8px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors block mt-1">
                                    {b.display_customer_phone}
                                </a>
                            </td>
                            <td class="px-6 py-4">
                                {b.driver_id ? (
                                    <p class="text-[10px] font-black uppercase text-indigo-400">
                                        {b.driver_first_name} {b.driver_last_name}
                                    </p>
                                ) : (
                                    <p class="text-[9px] font-black uppercase text-amber-500/80 italic">Chauffeur non assigné</p>
                                )}
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1">{b.original_tenant_name}</p>
                                <p class="text-[8px] text-slate-600 italic">{b.original_tenant_domain}</p>
                            </td>
                            <td class="px-6 py-4">
                                <span class={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter border ${
                                    b.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                    b.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                    'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                }`}>
                                    {b.status}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <span class="text-sm font-black italic text-white">
                                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(b.total_amount)}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</AdminLayout>
</file>

<file path="src/pages/admin/onboardings.astro">
---
// src/pages/admin/onboardings.astro
import AdminLayout from "../../layouts/AdminLayout.astro";
import { requirePlatformAdmin } from "../../lib/guards/platform";
import { createAdminClient } from "../../lib/supabase/server";

const { profile } = Astro.locals as any;

// Protection d'accès plateforme
try {
  await requirePlatformAdmin(profile);
} catch {
  return Astro.redirect("/login");
}

const supabaseAdmin = createAdminClient();

// Récupérer les demandes d'onboarding via la vue jointe (onboarding + auth.users)
const { data: onboardings, error } = await supabaseAdmin
    .from("onboarding_admin_view")
    .select("*")
    .in("status", ["pending", "rejected", "approved"])
    .order("created_at", { ascending: false });

if (error) console.error("Admin Fetch Error:", error);

const counts = {
    pending: onboardings?.filter(o => o.status === 'pending').length || 0,
    rejected: onboardings?.filter(o => o.status === 'rejected').length || 0,
    approved: onboardings?.filter(o => o.status === 'approved').length || 0
};
---

<AdminLayout title="Gestion Onboarding">
    <div class="max-w-7xl mx-auto py-12 px-6">
        <div class="flex items-center justify-between mb-10">
            <div>
                <h1
                    class="text-4xl font-black italic tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500"
                >
                    BackOffice Admin
                </h1>
                <p class="text-slate-400 mt-2">
                    Gestion des dossiers d'onboarding en attente
                </p>
            </div>
            <div
                id="count-badge"
                class="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-bold text-indigo-400 uppercase tracking-widest"
            >
                0 Dossiers
            </div>
        </div>

        <!-- Filtres / Onglets -->
        <div class="flex gap-4 mb-6">
            <button
                id="tab-pending"
                class="filter-tab group flex items-center gap-3 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all glass border border-white/10 text-white bg-indigo-600/20"
                data-target="pending"
            >
                En attente
                <span id="badge-pending" class="px-2 py-0.5 bg-white/10 rounded-md text-indigo-400 group-hover:text-white transition-colors">{counts.pending}</span>
            </button>
            <button
                id="tab-rejected"
                class="filter-tab group flex items-center gap-3 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all glass border border-white/10 text-slate-400 hover:text-white"
                data-target="rejected"
            >
                Refusés
                <span id="badge-rejected" class="px-2 py-0.5 bg-white/10 rounded-md text-slate-500 group-hover:text-white transition-colors">{counts.rejected}</span>
            </button>
            <button
                id="tab-approved"
                class="filter-tab group flex items-center gap-3 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all glass border border-white/10 text-slate-400 hover:text-white"
                data-target="approved"
            >
                Approuvés
                <span id="badge-approved" class="px-2 py-0.5 bg-white/10 rounded-md text-slate-500 group-hover:text-white transition-colors">{counts.approved}</span>
            </button>
        </div>

        <div class="glass rounded-3xl overflow-hidden border border-white/5">
            <table class="w-full text-left">
                <thead>
                    <tr class="bg-white/5 border-b border-white/5">
                        <th
                            class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
                            >Entreprise</th
                        >
                        <th
                            class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
                            >Domaine</th
                        >
                        <th
                            class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
                            >Email</th
                        >
                        <th
                            class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
                            >Créé le</th
                        >
                        <th
                            class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
                            >Status</th
                        >
                        <th
                            class="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
                            >Action</th
                        >
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                    {
                        onboardings && onboardings.length > 0 ? (
                            onboardings.map((ob: any) => (
                                <tr
                                    class="onboarding-row hover:bg-white/5 transition-colors group"
                                    data-status={ob.status}
                                >
                                    <td class="px-6 py-6 font-bold text-white">
                                        {ob.company_name}
                                    </td>
                                    <td class="px-6 py-6 text-[10px] text-indigo-400 font-bold uppercase">
                                        {ob.primary_domain}.vtchub.fr
                                    </td>
                                    <td class="px-6 py-6 text-sm text-slate-300">
                                        {ob.auth_email || "N/A"}
                                    </td>
                                    <td class="px-6 py-6 text-xs text-slate-500">
                                        {new Date(
                                            ob.created_at,
                                        ).toLocaleDateString("fr-FR")}
                                    </td>
                                    <td class="px-6 py-6 text-sm">
                                        <span class={`px-2 py-1 border rounded text-[10px] font-bold uppercase tracking-tighter ${
                                            ob.status === 'pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                                            ob.status === 'approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                            'bg-red-500/10 border-red-500/20 text-red-400'
                                        }`}>
                                            {ob.status}
                                        </span>
                                    </td>
                                    <td class="px-6 py-6 text-right">
                                        <div class="flex flex-col items-end gap-2">
                                            <!-- Bouton Détails (Au-dessus) -->
                                            <button
                                                data-id={ob.id}
                                                data-ob={JSON.stringify(ob)}
                                                title="Voir les détails"
                                                class="details-btn w-full max-w-[88px] flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-400 rounded-lg transition-all border border-white/5 group"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 transition-transform group-hover:scale-110">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </button>

                                            <!-- Duo Approuver / Refuser (En dessous) -->
                                            <div class="flex gap-2">
                                                <button
                                                    data-id={ob.id}
                                                    title="Approuver"
                                                    class={`approve-btn w-10 h-10 flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-lg shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50 ${ob.status !== 'pending' ? 'hidden' : ''}`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                    </svg>
                                                </button>
                                                <button
                                                    data-id={ob.id}
                                                    title="Refuser"
                                                    class={`reject-btn w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-lg shadow-red-600/20 transition-all active:scale-95 disabled:opacity-50 ${ob.status !== 'pending' ? 'hidden' : ''}`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : null
                    }
                    <tr id="empty-state" class="hidden">
                        <td colspan="6" class="px-6 py-20 text-center">
                            <span class="text-slate-500 uppercase tracking-widest text-xs font-bold font-inter">
                                Aucun dossier dans cette catégorie
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</AdminLayout>

<!-- Modal Détails -->
<div
    id="details-modal"
    class="fixed inset-0 bg-black/90 backdrop-blur-md z-[120] hidden items-center justify-center p-4 transition-all duration-300 opacity-0"
>
    <div class="glass max-w-2xl w-full rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div class="p-8 border-b border-white/5 flex justify-between items-center">
            <div>
                <h2 id="det-company" class="text-2xl font-black italic uppercase tracking-tighter text-white">Nom Société</h2>
                <div id="det-domain" class="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mt-1">domaine.vtchub.fr</div>
            </div>
            <button id="close-details" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>

        <div class="p-8 overflow-y-auto space-y-8 custom-scrollbar">
            <!-- Section Identité -->
            <div class="grid grid-cols-2 gap-8">
                <div>
                    <h4 class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Contact Responsable</h4>
                    <div class="space-y-2">
                        <div class="flex justify-between text-sm"><span class="text-slate-500">Nom :</span> <span id="det-name" class="text-white font-bold">-</span></div>
                        <div class="flex justify-between text-sm"><span class="text-slate-500">Email :</span> <span id="det-email" class="text-white font-bold">-</span></div>
                        <div class="flex justify-between text-sm"><span class="text-slate-500">Tel :</span> <span id="det-phone" class="text-white font-bold">-</span></div>
                    </div>
                </div>
                <div>
                    <h4 class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Véhicule & Licence</h4>
                    <div class="space-y-2">
                        <div class="flex justify-between text-sm"><span class="text-slate-500">Véhicule :</span> <span id="det-vehicle" class="text-white font-bold">-</span></div>
                        <div class="flex justify-between text-sm"><span class="text-slate-500">Plaque :</span> <span id="det-plate" class="text-white font-bold">-</span></div>
                        <div class="flex justify-between text-sm"><span class="text-slate-500">Licence VTC :</span> <span id="det-vtc" class="text-white font-bold">-</span></div>
                    </div>
                </div>
            </div>

            <!-- Section Taris -->
            <div class="bg-white/5 rounded-2xl p-6 border border-white/5">
                <h4 class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Configuration Tarifaire Par Défaut</h4>
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div class="p-4 bg-white/5 rounded-xl">
                        <div class="text-[10px] text-slate-500 font-bold uppercase mb-1">Base</div>
                        <div id="det-base" class="text-xl font-black text-white italic">0.00€</div>
                    </div>
                    <div class="p-4 bg-white/5 rounded-xl">
                        <div class="text-[10px] text-slate-500 font-bold uppercase mb-1">KM</div>
                        <div id="det-km" class="text-xl font-black text-white italic">0.00€</div>
                    </div>
                    <div class="p-4 bg-white/5 rounded-xl">
                        <div class="text-[10px] text-slate-500 font-bold uppercase mb-1">Mini</div>
                        <div id="det-min" class="text-xl font-black text-white italic">0.00€</div>
                    </div>
                </div>
                <div class="mt-4 flex gap-2 justify-center" id="det-cats">
                    <!-- Categories badges here -->
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Confirmation (Approve/Reject) -->
<div
    id="modal-overlay"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] hidden items-center justify-center p-6 transition-all duration-300 opacity-0"
>
    <!-- ... (reste de la modal existante) ... -->
    <div id="modal-content" class="glass max-w-md w-full rounded-3xl border border-white/10 p-8 shadow-2xl transform scale-95 transition-all duration-300">
        <div id="modal-icon" class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 mx-auto"></div>
        <h3 id="modal-title" class="text-xl font-black uppercase tracking-widest text-center text-white mb-4 italic">Confirmation</h3>
        <p id="modal-text" class="text-slate-400 text-center text-sm mb-8 leading-relaxed font-medium">Texte confirmation.</p>
        <div id="modal-actions" class="flex gap-4">
            <button id="modal-cancel" class="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/5">Annuler</button>
            <button id="modal-confirm" class="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg transition-all active:scale-95">Confirmer</button>
        </div>
        <button id="modal-close" class="hidden w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/5">Fermer</button>
    </div>
</div>

<script>
    // --- GESTION DES ONGLETS / FILTRES ---
    const tabs = document.querySelectorAll('.filter-tab');
    const rows = document.querySelectorAll('.onboarding-row');
    const emptyState = document.getElementById('empty-state');
    const countBadge = document.getElementById('count-badge');

    function filterTable(status: string) {
        let count = 0;
        rows.forEach(row => {
            const rowStatus = (row as HTMLElement).dataset.status;
            if (rowStatus === status) {
                (row as HTMLElement).style.display = 'table-row';
                count++;
            } else {
                (row as HTMLElement).style.display = 'none';
            }
        });

        // Toggle empty state
        if (count === 0) {
            emptyState?.classList.remove('hidden');
        } else {
            emptyState?.classList.add('hidden');
        }

        // Update badge
        if (countBadge) {
            countBadge.textContent = `${count} Dossier${count > 1 ? 's' : ''}`;
        }

        // Update tabs style
        tabs.forEach(t => {
            if (t.getAttribute('data-target') === status) {
                t.classList.add('bg-indigo-600/20', 'text-white');
                t.classList.remove('text-slate-400');
            } else {
                t.classList.remove('bg-indigo-600/20', 'text-white');
                t.classList.add('text-slate-400');
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target')!;
            filterTable(target);
        });
    });

    // Filtre par défaut au chargement
    filterTable('pending');

    // --- GESTION DES DÉTAILS ---
    const detModal = document.getElementById('details-modal');
    const closeDet = document.getElementById('close-details');
    const detailsBtns = document.querySelectorAll('.details-btn');

    detailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const ob = JSON.parse(btn.getAttribute('data-ob') || '{}');

            // Remplissage data
            document.getElementById('det-company')!.textContent = ob.company_name || '-';
            document.getElementById('det-domain')!.textContent = ob.primary_domain ? `${ob.primary_domain}.vtchub.fr` : '-';
            document.getElementById('det-name')!.textContent = (ob.first_name || ob.last_name) ? `${ob.first_name || ''} ${ob.last_name || ''}`.trim() : 'N/A';
            document.getElementById('det-email')!.textContent = ob.auth_email || 'N/A';
            document.getElementById('det-phone')!.textContent = ob.phone || '-';
            document.getElementById('det-vehicle')!.textContent = (ob.vehicle_brand || ob.vehicle_model) ? `${ob.vehicle_brand || ''} ${ob.vehicle_model || ''}`.trim() : 'Non renseigné';
            document.getElementById('det-plate')!.textContent = ob.plate_number || '-';
            document.getElementById('det-vtc')!.textContent = ob.vtc_license_number || '-';
            document.getElementById('det-base')!.textContent = `${ob.default_base_price || 0}€`;
            document.getElementById('det-km')!.textContent = `${ob.default_price_per_km || 0}€`;
            document.getElementById('det-min')!.textContent = `${ob.default_minimum_fare || 0}€`;

            const catsContainer = document.getElementById('det-cats')!;
            catsContainer.innerHTML = (ob.service_categories || []).map((c: string) => `
                <span class="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[8px] font-bold text-indigo-400 uppercase tracking-widest">${c}</span>
            `).join('');

            // Show animation
            detModal?.classList.remove('hidden');
            detModal?.classList.add('flex');
            requestAnimationFrame(() => {
                detModal!.style.opacity = "1";
            });
        });
    });

    closeDet?.addEventListener('click', () => {
        detModal!.style.opacity = "0";
        setTimeout(() => detModal?.classList.add('hidden'), 300);
    });

    // --- GESTION APPROUVER / REFUSER ---
    const overlay = document.getElementById("modal-overlay");
    const mConfirm = document.getElementById("modal-confirm") as HTMLButtonElement;
    const approveBtns = document.querySelectorAll(".approve-btn");
    const rejectBtns = document.querySelectorAll(".reject-btn");

    let activeAction: 'approve' | 'reject' | null = null;
    let targetId: string | null = null;
    let currentBtn: HTMLButtonElement | null = null;

    function showConfirm(id: string, action: 'approve' | 'reject', btn: HTMLButtonElement) {
        targetId = id;
        activeAction = action;
        currentBtn = btn;

        const mTitle = document.getElementById('modal-title')!;
        const mText = document.getElementById('modal-text')!;
        const mIcon = document.getElementById('modal-icon')!;

        if (action === 'approve') {
            mTitle.textContent = "Approuver Dossier";
            mText.textContent = "Voulez-vous vraiment activer ce chauffeur ? Ses accès seront créés immédiatement.";
            mConfirm.className = "flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg transition-all";
        } else {
            mTitle.textContent = "Refuser Dossier";
            mText.textContent = "Voulez-vous rejeter cette demande d'onboarding ? Le dossier sera marqué comme refusé.";
            mConfirm.className = "flex-1 px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg transition-all";
        }

        overlay?.classList.remove('hidden');
        overlay?.classList.add('flex');
        requestAnimationFrame(() => overlay!.style.opacity = "1");
    }

    approveBtns.forEach(btn => btn.addEventListener('click', () => showConfirm(btn.getAttribute('data-id')!, 'approve', btn as HTMLButtonElement)));
    rejectBtns.forEach(btn => btn.addEventListener('click', () => showConfirm(btn.getAttribute('data-id')!, 'reject', btn as HTMLButtonElement)));

    mConfirm?.addEventListener("click", async () => {
        if (!targetId || !activeAction || !currentBtn) return;

        mConfirm.disabled = true;
        mConfirm.textContent = "TRAITEMENT...";

        const endpoint = activeAction === 'approve' ? '/api/admin/approve' : '/api/admin/reject';

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ onboarding_id: targetId }),
            });

            if (response.ok) {
                window.location.reload();
            } else {
                const res = await response.json();
                alert("Erreur : " + res.error);
            }
        } catch (err) {
            alert("Erreur réseau");
        } finally {
            mConfirm.disabled = false;
        }
    });

    document.getElementById('modal-cancel')?.addEventListener('click', () => {
        overlay!.style.opacity = "0";
        setTimeout(() => overlay?.classList.add('hidden'), 300);
    });
</script>

<style>
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
</style>
</file>

<file path="src/pages/api/admin/approve.ts">
import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";
import { isPlatform } from "../../../lib/guards";

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const { profile } = locals as any;

        // Double vérification de sécurité (Shield)
        if (!isPlatform(profile)) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
        }

        const { onboarding_id } = await request.json();

        if (!onboarding_id) {
            return new Response(JSON.stringify({ error: "Missing ID" }), { status: 400 });
        }

        const supabase = createClient(
            import.meta.env.PUBLIC_SUPABASE_URL,
            import.meta.env.SUPABASE_SERVICE_ROLE_KEY
        );

        const { error } = await supabase.rpc("approve_onboarding_tx", {
            onboarding_uuid: onboarding_id
        });

        if (error) {
            console.error("RPC Error:", error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ message: "Approved successfully" }), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
};
</file>

<file path="src/pages/app/vehicles.astro">
---
// src/pages/app/vehicles.astro
import { VehicleList } from "@/components/vehicles/VehicleList";
import AppLayout from "../../layouts/AppLayout.astro";

const { profile } = Astro.locals;

if (!profile) return Astro.redirect("/login");
---

<AppLayout title="Véhicules">
    <div class="flex-1 flex flex-col p-8 md:p-12 overflow-hidden h-full relative">
        <!-- HEADER -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 flex-shrink-0">
            <div>
                <span class="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black tracking-widest text-indigo-400 uppercase">Gestion de Flotte</span>
                <h1 class="text-4xl font-black mt-4 uppercase tracking-tighter text-white">Véhicules</h1>
                <p class="text-slate-500 mt-2 font-medium">Gérez votre parc automobile et le statut des véhicules.</p>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
            <div class="mb-8 flex justify-end">
                <button id="btn-new-vehicle-content" class="px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-xl shadow-white/5">
                    + Nouveau Véhicule
                </button>
            </div>
            <VehicleList client:only="react" tenantId={profile.tenant_id!} />
        </div>
    </div>
</AppLayout>

<script>
    const openModal = () => window.dispatchEvent(new CustomEvent('vehicles:open-modal'));
    document.getElementById('btn-new-vehicle-content')?.addEventListener('click', openModal);
</script>
</file>

<file path="src/services/drivers.ts">
import { supabase } from "@/lib/supabase/client";

export const getDrivers = async (tenantId: string) => {
  const { data, error } = await supabase
    .from("drivers")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const createDriver = async (driver: {
  tenant_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  license_number: string;
  user_id?: string;
}) => {
  const { data, error } = await supabase
    .from("drivers")
    .insert([driver])
    .select()
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const updateDriver = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from("drivers")
    .update(updates)
    .eq("id", id)
    .select()
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const deleteDriver = async (id: string) => {
  const { error } = await supabase.from("drivers").delete().eq("id", id);
  if (error) throw error;
};

export const initializePrimaryDriver = async (
  tenantId: string,
  userId: string,
) => {
  try {
    // 1. Vérifier si un chauffeur existe déjà pour ce tenant

    const { count, error: countError } = await supabase
      .from("drivers")
      .select("*", { count: "exact", head: true })
      .eq("tenant_id", tenantId);

    if (countError) throw countError;
    if (count && count > 0)
      return { success: false, message: "Un chauffeur existe déjà." };

    // 2. Récupérer les infos de l'onboarding pour avoir la licence Pro et le phone
    const { data: onboarding, error: onboardingError } = await supabase
      .from("onboarding")
      .select("*")
      .eq("profile_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (onboardingError) throw onboardingError;
    if (!onboarding)
      throw new Error(
        "Données d'onboarding introuvables. Veuillez compléter votre profil.",
      );

    // 3. Créer le chauffeur principal
    const primaryDriver = {
      tenant_id: tenantId,
      first_name: onboarding.first_name,
      last_name: onboarding.last_name,
      phone: onboarding.phone,
      license_number: onboarding.vtc_license_number,
      user_id: userId,
    };

    const { data, error: insertError } = await supabase
      .from("drivers")
      .insert([primaryDriver])
      .select()
      .limit(1)
      .maybeSingle();

    if (insertError) throw insertError;

    return { success: true, data };
  } catch (err: any) {
    console.error("Error in initializePrimaryDriver:", err);
    return { success: false, error: err.message };
  }
};
</file>

<file path="src/services/pricing.ts">
import { supabase } from "@/lib/supabase/client";

// --- ZONES ---
export const getZones = async (tenantId: string) => {
  const { data, error } = await supabase
    .from("zones")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("name");
  if (error) throw error;
  return data;
};

export const createZone = async (tenantId: string, name: string) => {
  const { data, error } = await supabase
    .from("zones")
    .insert([{ tenant_id: tenantId, name }])
    .select()
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
};

// --- FIXED ROUTES ---
export const getFixedRoutes = async (tenantId: string) => {
  const { data, error } = await supabase
    .from("fixed_routes")
    .select(
      "*, pickup_zone:pickup_zone_id(name), dropoff_zone:dropoff_zone_id(name)",
    )
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const createFixedRoute = async (route: {
  tenant_id: string;
  pickup_zone_id: string;
  dropoff_zone_id: string;
  vehicle_category: string;
  price: number;
  is_bidirectional?: boolean;
}) => {
  const { data, error } = await supabase
    .from("fixed_routes")
    .insert([route])
    .select()
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
};

export const updateFixedRoute = async (
  id: string,
  route: Partial<{
    pickup_zone_id: string;
    dropoff_zone_id: string;
    vehicle_category: string;
    price: number;
    is_bidirectional: boolean;
  }>,
) => {
  const { data, error } = await supabase
    .from("fixed_routes")
    .update(route)
    .eq("id", id)
    .select()
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
};

export const deleteFixedRoute = async (id: string) => {
  const { error } = await supabase.from("fixed_routes").delete().eq("id", id);
  if (error) throw error;
};
</file>

<file path="src/services/vehicles.ts">
import { supabase } from "@/lib/supabase/client";

export const getVehicles = async (tenantId: string) => {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const createVehicle = async (vehicle: {
  tenant_id: string;
  brand: string;
  model: string;
  plate_number: string;
  category: any;
  capacity: number;
  status: string;
}) => {
  const { data, error } = await supabase
    .from("vehicles")
    .insert(vehicle as any)
    .select()
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const updateVehicle = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from("vehicles")
    .update(updates)
    .eq("id", id)
    .select()
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Update vehicle error:", error);
    throw error;
  }
  if (!data) {
    console.warn(`No vehicle found with id ${id} to update.`);
    // Depending on desired behavior, you might throw an error or return null/undefined
    // For now, let's return null if no data was updated.
    return null;
  }
  return data;
};

export const deleteVehicle = async (id: string) => {
  const { error } = await supabase.from("vehicles").delete().eq("id", id);
  if (error) throw error;
};
</file>

<file path="src/styles/global.css">
@tailwind base;
@tailwind components;
@tailwind utilities;

/* src/styles/global.css */
* {
  box-sizing: border-box;
}

*,
::before,
::after {
  max-width: 100vw;
}

:root {
  --park-colors-accent-default: #6366f1;
  --park-colors-bg-canvas: #0a0a0c;
  --park-colors-bg-default: #111114;
  --park-colors-fg-default: #ffffff;
}

html,
body {
  overflow-x: hidden !important;
  width: 100% !important;
  position: relative;
  margin: 0;
  padding: 0;
}

/* Forcer les conteneurs de tableaux à gérer leur overflow */
.table-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

table {
  max-width: none; /* Les tableaux peuvent être plus larges que le viewport */
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

body {
  background-color: var(--park-colors-bg-canvas);
  color: var(--park-colors-fg-default);
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
}

.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.premium-gradient {
  background: radial-gradient(circle at top left, #1a1a2e, #0a0a0c);
}
</file>

<file path="supabase/.temp/cli-latest">
v2.78.1
</file>

<file path="supabase/.temp/gotrue-version">
v2.187.0
</file>

<file path="supabase/functions/calculate-refund/index.ts">
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const { booking_id, cancelled_at, reason } = await req.json();

  if (!booking_id || !cancelled_at || !reason) {
    return new Response("Missing params", { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // 1️⃣ Load booking
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", booking_id)
    .maybeSingle();

  if (bookingError || !booking) {
    return new Response("Booking not found", { status: 404 });
  }

  // 🔒 Only calculable if paid or refund_failed
  if (!["paid", "refund_failed"].includes(booking.status)) {
    return new Response("Refund not allowed for this status", { status: 400 });
  }

  if (!booking.cancellation_policy_id) {
    return new Response("Missing cancellation policy", { status: 400 });
  }

  // 2️⃣ Load policy
  const { data: policy, error: policyError } = await supabase
    .from("cancellation_policies")
    .select("*")
    .eq("id", booking.cancellation_policy_id)
    .maybeSingle();

  if (policyError || !policy) {
    return new Response("Policy not found", { status: 400 });
  }

  const pickupTime = new Date(booking.pickup_time);
  const cancelTime = new Date(cancelled_at);

  if (isNaN(cancelTime.getTime())) {
    return new Response("Invalid cancellation date", { status: 400 });
  }

  const deltaHours =
    (pickupTime.getTime() - cancelTime.getTime()) / (1000 * 60 * 60);

  let refundRate = 0;

  if (reason === "driver_fault") {
    refundRate = policy.driver_fault_refund_rate;
  } else if (reason === "no_show") {
    refundRate = policy.no_show_refund_rate;
  } else if (deltaHours >= policy.hours_before_full_refund) {
    refundRate = 1;
  } else if (deltaHours >= policy.hours_before_partial_refund) {
    refundRate = policy.partial_refund_rate;
  }

  // Clamp sécurité
  if (refundRate < 0) refundRate = 0;
  if (refundRate > 1) refundRate = 1;

  const refundAmount = Number(booking.total_amount) * refundRate;

  return new Response(
    JSON.stringify({
      refund_rate: refundRate,
      refund_amount: refundAmount,
    }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
});
</file>

<file path="supabase/functions/create-stripe-onboarding/index.ts">
// supabase/functions/create-stripe-onboarding/index.ts

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "npm:stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { tenant_id } = await req.json();

    const { data: tenant } = await supabase
      .from("tenants")
      .select("id, email, stripe_account_id")
      .eq("id", tenant_id)
      .limit(1)
      .maybeSingle();

    if (!tenant) {
      throw new Error("Tenant not found");
    }

    let accountId = tenant.stripe_account_id;

    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        country: "FR",
        email: tenant.email,
        capabilities: {
          transfers: { requested: true },
          card_payments: { requested: true },
        },
      });

      accountId = account.id;

      await supabase
        .from("tenants")
        .update({ stripe_account_id: accountId })
        .eq("id", tenant.id);
    }

    const account = await stripe.accounts.retrieve(accountId);

    if (!account.charges_enabled) {
      const link = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: "https://example.com/refresh",
        return_url: "https://example.com/return",
        type: "account_onboarding",
      });

      return new Response(
        JSON.stringify({
          type: "onboarding",
          url: link.url,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }

    const login = await stripe.accounts.createLoginLink(accountId);

    return new Response(
      JSON.stringify({
        type: "dashboard",
        url: login.url,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
</file>

<file path="supabase/functions/stripe_webhook/index.ts">
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12.18.0?target=deno&no-check";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  const rawBody = await req.arrayBuffer();
  const body = new TextDecoder().decode(rawBody);

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
    );
  } catch (err) {
    console.log("SIGNATURE ERROR", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const obj: any = event.data.object;

  const sessionId =
    obj?.id && obj?.object === "checkout.session"
      ? obj.id
      : (obj?.checkout_session ?? null);

  const paymentIntent = obj?.payment_intent ?? obj?.id ?? null;

  const tenantId = obj?.metadata?.tenant_id ?? null;

  const amount = obj?.amount_total
    ? obj.amount_total / 100
    : obj?.amount_received
      ? obj.amount_received / 100
      : null;

  // --------------------------
  // STATUS
  // --------------------------

  let status = "received";

  if (event.type === "checkout.session.completed") {
    status = "session_completed";
  }

  if (event.type === "payment_intent.succeeded") {
    status = "paid";
  }

  if (event.type === "payment_intent.payment_failed") {
    status = "failed";
  }

  // --------------------------
  // UPSERT stripe_events
  // --------------------------

  const { data: existing } = await supabase
    .from("stripe_events")
    .select("id")
    .eq("stripe_event_id", event.id)
    .maybeSingle();

  if (!existing) {
    await supabase.from("stripe_events").insert({
      stripe_event_id: event.id,
      session_id: sessionId,
      payment_intent_id: paymentIntent,
      event_type: event.type,
      status,
      tenant_id: tenantId,
      amount,
      metadata: event,
    });
  } else {
    await supabase
      .from("stripe_events")
      .update({
        status,
        metadata: event,
      })
      .eq("stripe_event_id", event.id);
  }

  // --------------------------
  // CREATE BOOKING V1
  // --------------------------

  if (event.type === "checkout.session.completed") {
    const session = obj as any;

    if (session?.metadata) {
      const m = session.metadata;

      const subtotal = Number(m.subtotal_amount ?? 0);
      const vat = Number(m.vat_amount ?? 0);
      const total = Number(m.total_amount ?? amount ?? 0);

      const { data: booking, error } = await supabase
        .from("bookings")
        .insert({
          original_tenant_id: tenantId,
          current_tenant_id: tenantId,

          pickup_address: m.pickup_address,
          dropoff_address: m.dropoff_address,

          pickup_time: m.pickup_time,

          total_amount: total,
          subtotal_amount: subtotal,
          vat_amount: vat,

          status: "paid",
          payment_mode: "stripe",

          customer_id: m.customer_id,

          stripe_payment_intent_id: session.payment_intent,

          passenger_count: Number(m.passenger_count ?? 1),
          luggage_count: Number(m.luggage_count ?? 0),

          booking_type: m.booking_type,

          vehicle_id: m.vehicle_id ?? null,
        })
        .select()
        .single();

      if (!error && booking) {
        await supabase
          .from("stripe_events")
          .update({
            status: "booking_created",
            booking_id: booking.id,
          })
          .eq("stripe_event_id", event.id);
      } else {
        console.log("BOOKING ERROR", error);
      }
    }
  }

  return new Response("OK");
});
</file>

<file path="check_users.ts">
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function checkUsers() {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, platform_role, tenant_id, tenant_role");

  if (error) {
    console.error("Error fetching profiles:", error);
    return;
  }

  console.log("--- PROFILES BREAKDOWN ---");
  for (const p of profiles) {
    const isPlatformAdmin = ["super_admin", "platform_staff"].includes(
      p.platform_role as string,
    );
    const isTenantUser = !!p.tenant_id;

    console.log(`User ID: ${p.id}`);
    console.log(
      `  - Platform Role: ${p.platform_role || "none"} ${isPlatformAdmin ? "(ADMIN)" : ""}`,
    );
    console.log(`  - Tenant ID: ${p.tenant_id || "none"}`);
    console.log(
      `  - Tenant Role: ${p.tenant_role || "none"} ${isTenantUser ? "(TENANT)" : ""}`,
    );
    console.log("------------------------");
  }
}

checkUsers();
</file>

<file path="tsconfig.json">
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
</file>

<file path="docs/architecture.md">
---
# ✅ VERSION CORRIGÉE — `docs/architecture.md` (Alignée V1)

Tu peux remplacer ton fichier par ceci.
---

# 🏗 Architecture — VTC HUB (V1)

---

# 🎯 Overview

VTC HUB est un ERP SaaS multi-tenant pour chauffeurs VTC.

Architecture basée sur :

- Astro SSR (`output: "server"`)
- Supabase (Postgres + Auth + RLS)
- RPC SQL transactionnelles
- Cloudflare Adapter

La plateforme est conçue pour :

- Isolation stricte des tenants
- Activation atomique
- Séparation plateforme / entreprise

---

# 🧱 Architecture Logique

```
Client (SaaS Multi-tenant)
   ↓
Astro SSR (Routes + API)
   ↓
Edge Functions (Stripe Webhooks & Business Logic)
   ↓
Supabase Auth
   ↓
Postgres (RLS + Multi-tenant + Financial Engine)
```

---

# 💹 Audit Comptable & Layer Financière

VTC HUB intègre un moteur financier transactionnel. Chaque flux d'argent (paiement, commission, refund) est immutablement tracé.

- **Idempotence** : Aucun événement Stripe n'est traité deux fois (`stripe_events`).
- **Audit-Trail** : La table `financial_movements` contient l'historique brut des flux pour chaque tenant.
- **Vues Fiscales** : Les résumés mensuels et annuels sont calculés dynamiquement via des vues SQL (`financial_monthly_summary`).

---

# ⚡ Stripe Edge Integration

Le traitement des paiements est déporté dans des Edge Functions pour :

- **Sécurité** : Validation de signature Stripe.
- **Isolation** : Séparation de la logique de paiement du reste de l'ERP.
- **Performance** : Exécution rapide au plus proche de l'utilisateur.

---

# 🗂 Séparation des Routes

## 🌍 Plateforme

```
/admin/*
```

Accessible uniquement si :

```
platform_role != NULL
```

---

## 🏢 Application Entreprise

```
/app/*
```

Accessible uniquement si :

```
tenant_id != NULL
```

---

# 🔐 Auth & Rôles

## Couche Plateforme

- super_admin
- platform_staff

---

## Couche Tenant

- owner
- manager
- driver

Les rôles hiérarchiques sont stockés dans :

```
profiles.tenant_role
profiles.platform_role
```

---

# 🔁 Activation Flow

```
Signup
   ↓
auth.users
   ↓ (trigger handle_new_user)
profiles
   ↓
onboarding (status = pending)
   ↓
Admin validation
   ↓
approve_onboarding_tx()
   ↓
tenants + drivers + vehicles + pricing_rules
```

---

# ⚙️ Activation Strategy

Activation gérée par :

```
approve_onboarding_tx(uuid)
```

Caractéristiques :

- Transaction atomique
- Rollback automatique en cas d’erreur
- Création cohérente des entités
- Mise à jour profile centralisée

---

# 🧩 Multi-Tenant Model

Chaque entreprise possède :

```
tenant_id uuid
```

Isolation assurée par :

- Row Level Security (RLS)
- Middleware SSR
- Guards backend
- Filtrage systématique par tenant_id

---

# 🚗 Booking Engine & Annulation

## Statuts Financiers

Les bookings supportent désormais les statuts `paid`, `refunded` et `accepted_pending_payment`.

---

# 🔐 Middleware Strategy

Le middleware global vérifie :

1. Session active
2. profile.platform_role
3. profile.tenant_id

Cas possibles :

| Cas           | Redirection    |
| ------------- | -------------- |
| Non connecté  | /login         |
| platform_role | /admin         |
| tenant_id     | /app/dashboard |
| Aucun         | /onboarding    |

---

# ☁️ Infrastructure

- `output: "server"`
- Adapter Cloudflare
- Supabase Postgres
- RPC SQL transactionnelles

Aucune logique critique côté client.

---

# 📌 Design Principles

- Isolation stricte des données
- Séparation plateforme / entreprise
- Activation atomique
- Calcul métier validé backend
- Stripe non centralisé (chaque tenant indépendant)

---

# 🔮 Évolution Prévue

## V2

- Multi-driver avancé
- Assignation chauffeur
- Facturation
- Moteur de règles d'annulation (Moteur simple plateforme vs Configurable tenant).
- Refund automatique via backend.
- Dashboard financier agrégé.

## V3

- ERP financier complet
- Rapports avancés

## V4

- Réseau / Cercle
- Partage de courses
- Cercle & Réseau de chauffeurs avec commissions croisées.

---

# 🎯 Résultat

Ton architecture documentée correspond maintenant :

- À V1 réel
- À la séparation `/admin` / `/app`
- À la logique ERP
- À ta vision long terme

---

Nous avons maintenant :

- README aligné
- database.md aligné
- flows.md aligné
- architecture.md aligné

Base documentaire propre.

---
</file>

<file path="docs/CHECKLIST_BACKOFFICE.md">
# 🧠 BACKOFFICE CHECKLIST — VTC HUB (Repo 1)

Ce dépôt contient le cœur financier et administratif du SaaS.

---

## 🔐 1️⃣ Hardening Métier

- [x] **Isolation Multi-tenant** : Basée sur `tenant_id` sur toutes les tables.
- [x] **ENUM strict booking_status** : Cycle de vie complet implémenté.
- [x] **ENUM strict movement_type** : Aligné avec le ledger financier.
- [x] **Trigger de transition** : Bloquer les changements de statut invalides en SQL.
- [x] **Hardening Annulation** : Bloquer l'annulation après `pickup_time`.
- [x] **Statuts spéciaux** : Implémenter `no_show` et `expired_payment` dans l'ENUM.
- [x] **Automation** : Expiration automatique des sessions de paiement non abouties (`expire_unpaid_bookings`).
- [x] **Contraintes Refund** :
  - [x] Interdire si statut ≠ `paid`.
  - [x] Interdire si déjà `cancelled` ou `no_show` (via trigger).
  - [x] Empêcher refund > montant payé.
- [x] **Intégrité Ledger** : Interdire UPDATE/DELETE (Append-only).
- [x] **Intégrité Métier** : Interdire le DELETE sur la table `bookings` (Immuabilité via trigger).
- [x] **Réconciliation** : Trigger de cohérence ledger ↔ booking (`validate_ledger_consistency`).

## 💳 2️⃣ Paiement Stripe

- [x] **Single Intent** : 1 seul `payment_intent` par booking.
- [x] **Idempotence renforcée** : Table `stripe_events` avec index unique.
- [ ] **Monitoring** : Table `webhook_errors` pour isoler les échecs.
- [ ] **Script de réconciliation** : Comparer DB et Stripe Dashboard périodiquement.

## 📒 3️⃣ Ledger Financier

- [ ] **Contrainte CHECK** : Montants `gross`, `net`, `vat` ≥ 0.
- [x] **Indexes Performance** : `booking_id`, `stripe_payment_intent_id`, `created_at`.
- [ ] **Logique Interne** : Fonction `compute_booking_balance()`.
- [x] **Vues de synthèse** : `financial_fiscal_detail` et `financial_monthly_summary`.

## 📊 4️⃣ Dashboard Finance (Admin)

- [ ] **KPIs Période** : Total encaissé, remboursé, Net.
- [ ] **Compteurs** : Nombre de bookings payés, refunds, Ticket moyen.
- [ ] **Visualisation** : Graphique CA mensuel.
- [ ] **Exports** : CSV Ledger, CSV Bookings, Export Fiscal/TVA.

## 📋 5️⃣ Pages Backoffice (Astro Admin)

- [x] **Login sécurisé** (Supabase Auth).
- [ ] **Liste Bookings** : Paginée avec filtres.
- [x] **Fiche Booking** : Complète avec Timeline de statuts.
- [x] **Section Ledger** : Liée à chaque fiche booking (Admin & App).
- [x] **Outils Admin** : Pages Refunds, Erreurs paiement, Logs webhook.
- [x] **KPI Finance** : Dashboard global opérationnel.

## 🔐 6️⃣ Sécurité

- [x] **RLS** : Vérifiée table par table.
- [x] **Policies** : INSERT/UPDATE restrictives.
- [x] **Audit Logs** : Trace immuable via Ledger et Stripe Events.
- [ ] **Backup** : Configuration des snapshots automatiques.

## 🧪 7️⃣ Tests Production

- [ ] **Paiement réel** : Flux complet Stripe Live/Test.
- [ ] **Refund partiel** : Vérification des pro-rata HT/TVA.
- [ ] **Double webhook** : Test de collision simultanée.
- [ ] **Race Condition** : Simuler deux refunds en même temps.
- [ ] **Annulation tardive** : Vérifier le blocage après pickup.

## 🔐 8️⃣ Concurrence & Transactions (Hardening 003)

- [x] **Race Condition Protection** : Utiliser `SELECT ... FOR UPDATE` sur les lignes critiques (Refunds/Status).
- [x] **Verrouillage Booking** : Empêcher les updates simultanés d'un même dossier.
- [x] **Transactions Strictes** : Garantir l'atomicité Status Change + Ledger Entry.

## 👤 10️⃣ Normalisation Customer (V1 Update)

- [x] **Suppression Legacy** : Champs `client_name`/`email` retirés de l'insertion booking.
- [x] **FK Obligatoire** : `customer_id` NOT NULL dans `bookings`.
- [x] **Identité Centralisée** : Table `customers` maître de la donnée.

## 📈 9️⃣ Finance Ops (Reconciliation & Monitoring)

- [ ] **Script de Réconciliation** : Comparaison périodique Stripe API vs DB (Ledger).
- [ ] **Alerting Actif** : Notifications Slack/Email sur erreurs Webhook ou incohérences.
- [ ] **Dashboard Anomalies** : Vue dédiée aux écarts de réconciliation et erreurs critiques.

## 🔮 11️⃣ Future Booking Architecture (Planning)

- [ ] **Data Model** : Ajouter la colonne `booking_flow` à la table `bookings`.
- [ ] **Flow pay_first** (V1 actuel) : Paiement Stripe obligatoire à la création.
- [ ] **Flow accept_then_pay** : Lien de paiement envoyé après validation chauffeur.
- [ ] **Flow accept_only** : Validation sans paiement (Cash/Pro).
- [ ] **Flow dispatch** : Système d'assignation interne à une flotte.
- [ ] **Flow share** : Partage inter-tenants avec gestion des commissions partenaires.
</file>

<file path="docs/decisions.md">
Parfait.
On va enrichir ce `decisions.md` pour qu’il reflète :

- Les décisions réellement prises
- Le modèle ERP-first
- Le non-positionnement marketplace
- Stripe non centralisé
- Séparation plateforme / tenant

On garde un style clair et stratégique.

---

# ✅ VERSION CORRIGÉE — `docs/decisions.md`

Tu peux remplacer ton fichier par ceci.

---

# 🧠 Architectural Decisions — VTC HUB

---

## Why ERP-First and Not Marketplace?

VTC HUB est conçu comme un **ERP indépendant**, pas comme une marketplace.

Décision stratégique :

- Chaque chauffeur reste propriétaire de ses clients
- Aucun encaissement centralisé
- Pas d’intermédiation financière

Objectif :

> Construire un outil professionnel, pas une plateforme d’intermédiation.

---

## Why Onboarding as Staging?

Séparation claire entre :

- Données temporaires (`onboarding`)
- Données actives (`tenants`, `drivers`, `vehicles`)

Permet :

- Validation manuelle
- Contrôle qualité
- Prévention des abus
- Création atomique des entités

---

## Why SQL Transaction Activation?

Une première version JS créait :

- Données partielles
- Incohérences
- États impossibles

Solution retenue :

- Activation via `approve_onboarding_tx`
- Transaction SQL atomique
- Rollback automatique
- Cohérence garantie

---

## Why tenant_id Everywhere?

Chaque entité métier contient :

```
tenant_id
```

Pourquoi ?

- Isolation multi-tenant native
- Filtrage simple via RLS
- Sécurité structurelle
- Scalabilité propre

---

## Why Separate platform_role and tenant_role?

Deux couches distinctes :

- `platform_role` → super_admin / platform_staff
- `tenant_role` → owner / manager / driver

Permet :

- Séparation claire plateforme / entreprise
- Éviter les rôles hybrides
- Simplifier les guards backend

---

## Why Drivers as Separate Entity?

Même si un user peut conduire,
la conduite est une entité métier distincte.

Séparation :

```
profiles → identité
drivers → capacité métier
bookings → activité
```

Permet :

- Multi-driver futur
- Assignation flexible
- Évolution V2 sans refactor

---

## Why Backend Price Validation?

Le frontend peut afficher une estimation.

Mais :

- Le backend recalcule toujours le prix
- `total_amount` n’est jamais accepté tel quel
- minimum_fare appliqué côté serveur

Permet :

- Intégrité métier
- Protection contre manipulation
- Cohérence financière

---

## Why Stripe Not Centralized?

Chaque tenant :

- Connecte son propre Stripe
- Encaisse directement
- Gère sa relation client

La plateforme :

- Ne manipule aucun flux financier client
- Réduit risques juridiques
- Simplifie architecture

---

## Why capacity in vehicles?

`capacity` est une donnée métier centrale :

- Affichage site
- Filtrage services
- Matching futur
- Pricing futur

---

## Why category as text (not enum)?

Décision V1 :

- Flexibilité
- Évolutivité
- Pas de rigidité prématurée

Peut évoluer en enum si standardisation future.

---

## Why Keep V2/V3 Features Dormant?

Certaines tables (drivers avancés, commission, etc.)
existent déjà.

Décision :

- Construire base solide
- Activer progressivement
- Éviter refactor massif plus tard

---

---

## Why Financial movements table and Audit Trail?

Décision stratégique pour passer d'un simple booking à un ERP financier.

- **Idempotence Stripe** : Chaque événement Stripe (`checkout`, `refund`) est stocké et vérifié pour éviter les doubles traitements.
- **Audit-Trail Immutable** : Les mouvements financiers ne sont jamais supprimés. On utilise des mouvements de type `refund` ou `commission_reversal` pour équilibrer les comptes.
- **Reporting Fiscal** : Permet de générer des déclarations de TVA et des bilans par tenant en temps réel sans recalculer toute la base de bookings.

Objectif :

> Garantir une intégrité financière absolue pour les chauffeurs et la plateforme.

---

# 🎯 Result

Les décisions actuelles garantissent :

- Base ERP stable
- Sécurité forte
- Isolation stricte
- Scalabilité maîtrisée
- Évolution contrôlée vers V2/V3/V4
- **Audit financier robuste**

---
</file>

<file path="docs/security.md">
Parfait.
On aligne ce `security.md` avec :

- V1 réel
- Séparation plateforme / tenant
- Booking engine validé backend
- Service role uniquement serveur
- Architecture SSR

On garde le futur hardening en section séparée.

---

# ✅ VERSION CORRIGÉE — `docs/security.md` (Alignée V1)

Tu peux remplacer ton fichier par ceci.

---

# 🔐 Security Model — VTC HUB (V1)

---

# 🎯 Core Principles

- Isolation multi-tenant stricte
- Aucun accès cross-tenant
- Calcul métier validé backend
- Activation contrôlée
- Séparation plateforme / entreprise

---

# 🔑 Auth Layer

## Supabase Auth

- `auth.users` = identité technique
- `profiles.id = auth.users.id`
- Session JWT gérée via cookies SSR
- Aucun token exposé côté client

---

# 👥 Role Separation

## Couche Plateforme

- `platform_role`
  - super_admin
  - platform_staff

Accès uniquement :

```
/admin/*
```

---

## Couche Tenant

- `tenant_role`
  - owner
  - manager
  - driver

Accès uniquement :

```
/app/*
```

---

# 🛡 Row Level Security (RLS)

RLS activé sur les tables multi-tenant :

- profiles
- tenants
- drivers
- vehicles
- pricing_rules
- bookings

Isolation basée sur :

```
tenant_id = profiles.tenant_id
```

Chaque requête est filtrée par `tenant_id`.

Aucun accès inter-entreprise possible.

---

# 🚗 Booking & Financial Integrity

## Calcul Prix

- Estimation frontend possible
- Recalcul obligatoire backend
- Minimum fare appliqué côté serveur
- `total_amount` jamais accepté tel quel du client

## Statuts Financiers & Booking

Statuts contrôlés :

```
pending
accepted_pending_payment
paid
refunded
completed
cancelled
```

---

# 💳 Stripe Webhook Security

Le traitement des paiements et refunds via Edge Functions est hautement sécurisé :

- **Validation Signature** : Chaque requête Stripe est validée avec le secret webhook.
- **Idempotence** : Utilisation de la table `stripe_events` pour empêcher le rejeu d'un événement.
- **Sanity Check** : Vérification systématique du `booking_id` envoyé par Stripe avant mise à jour.
- **Unicité transactionnelle** : Protection SQL contre la double génération de mouvements financiers.

---

# ⚖️ Audit Trail (Immutabilité)

- Aucune suppression de ligne dans `financial_movements`.
- Toute correction financière passe par un mouvement opposé (refund / commission_reversal).
- Tracé complet de chaque flux vers l'événement Stripe source (`created_by_event`).

---

# 🚫 Attack Surface Minimization

- Aucune logique critique côté frontend
- Filtrage systématique par tenant_id via RLS
- API internes protégées par service role
- Pas de marketplace centralisée
- Aucun flux financier transitant hors des comptes Stripe des tenants

---

# 🔮 Future Hardening (Versions ultérieures)

- Audit logs actions critiques (CRUD profiles/tenants)
- Rate limiting API
- CSP headers granulaires
- Soft delete complet

---

# 🎯 Résultat

Le modèle sécurité reflète maintenant l'état réel de production :

- Architecture SaaS multi-tenant isolée.
- Flux financiers robustes et auditables.
- Webhooks Stripe sécurisés.
- Intégrité financière garantie par SQL.
</file>

<file path="src/components/dashboard/StripeConnectionCard.tsx">
// src/components/dashboard/StripeConnectionCard.tsx

import { supabase } from "@/lib/supabase/client";
import { AlertTriangle, ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";

interface StripeConnectionCardProps {
  tenantId: string;
  monthlyCount: number;
  monthlyRevenue: number;
}

type StripeStatus = {
  type: "onboarding" | "dashboard";
  url: string;
};

export const StripeConnectionCard: React.FC<StripeConnectionCardProps> = ({
  tenantId,
  monthlyCount,
  monthlyRevenue,
}) => {
  const [loading, setLoading] = useState(true);
  const [initialAccountIdMissing, setInitialAccountIdMissing] = useState(false);
  const [stripeAccountId, setStripeAccountId] = useState<string | null>(null);
  const [stripeStatus, setStripeStatus] = useState<StripeStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStripeInfo = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Charger les infos du tenant
        const { data: tenant, error: tenantError } = await supabase
          .from("tenants")
          .select("id, stripe_account_id")
          .eq("id", tenantId)
          .limit(1)
          .maybeSingle();

        if (tenantError) throw tenantError;
        if (!tenant) throw new Error("Tenant non trouvé.");
        setStripeAccountId(tenant.stripe_account_id);
        setInitialAccountIdMissing(!tenant.stripe_account_id);

        // 2. Appeler la function Stripe
        // Le user précise que Stripe est la source de vérité, on appelle systématiquement
        const { data, error: functionError } = await supabase.functions.invoke(
          "create-stripe-onboarding",
          {
            body: { tenant_id: tenantId },
          },
        );

        if (functionError) throw functionError;

        const status = data as StripeStatus;
        setStripeStatus(status);
      } catch (err: any) {
        console.error("Error loading Stripe status:", err);
        setError(
          err.message || "Une erreur est survenue lors du chargement de Stripe",
        );
      } finally {
        setLoading(false);
      }
    };

    if (tenantId) {
      loadStripeInfo();
    }
  }, [tenantId]);

  const handleAction = () => {
    if (stripeStatus?.url) {
      window.open(stripeStatus.url, "_blank");
    }
  };

  if (loading) {
    return (
      <div className='bg-[#0A0A0B]/50 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 animate-pulse text-center'>
        <div className='h-8 w-48 bg-white/5 rounded-full mx-auto mb-4' />
        <div className='h-4 w-32 bg-white/5 rounded-full mx-auto opacity-50' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-500/5 backdrop-blur-xl border border-red-500/10 rounded-[2rem] p-8'>
        <div className='flex items-center gap-5'>
          <div className='w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500'>
            <AlertTriangle className='w-6 h-6' />
          </div>
          <div>
            <h3 className='text-sm font-black uppercase text-white tracking-tight'>
              Erreur Stripe
            </h3>
            <p className='text-red-500/60 text-[10px] font-medium uppercase tracking-widest'>
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isDashboard = stripeStatus?.type === "dashboard";

  // Configuration dynamique
  let title = "";
  let buttonLabel = "";

  if (initialAccountIdMissing) {
    title = "Connexion Stripe requise";
    buttonLabel = "Connecter Stripe";
  } else if (stripeStatus?.type === "onboarding") {
    title = "Configuration incomplète";
    buttonLabel = "Finaliser Stripe";
  } else {
    title = "Compte Stripe actif";
    buttonLabel = "Dashboard Stripe";
  }

  return (
    <div
      className={`relative overflow-hidden bg-[#0A0A0B]/80 backdrop-blur-xl border rounded-[2rem] px-10 py-8 shadow-2xl transition-all duration-500 group ${
        isDashboard ? "border-emerald-500/20" : "border-indigo-500/20"
      }`}>
      {/* Background Glow */}
      <div
        className={`absolute -top-24 -right-24 w-64 h-64 blur-[100px] opacity-10 rounded-full transition-all duration-700 ${
          isDashboard ? "bg-emerald-500" : "bg-indigo-500"
        }`}
      />

      <div className='relative flex flex-col md:flex-row md:items-center justify-between gap-10'>
        {/* KPIs Section */}
        <div className='grid grid-cols-2 gap-8 md:gap-12 flex-1'>
          {/* Col 1: Monthly Count */}
          <a
            href='/app/bookings'
            className='flex flex-col items-center text-center group/kpi hover:bg-white/[0.03] p-4 rounded-2xl transition-all'>
            <p className='text-[8px] font-black uppercase text-slate-500 tracking-[0.2em] mb-2 h-3 flex items-center justify-center whitespace-nowrap group-hover/kpi:text-indigo-400 transition-colors'>
              Missions / Mois
            </p>
            <div className='flex items-baseline leading-none'>
              <span className='text-2xl font-black tabular-nums text-white tracking-tighter leading-none group-hover/kpi:scale-110 transition-transform'>
                {monthlyCount}
              </span>
            </div>
          </a>

          {/* Col 2: Total Revenue */}
          <a
            href='/app/bookings'
            className='flex flex-col items-center text-center group/kpi hover:bg-white/[0.03] p-4 rounded-2xl transition-all'>
            <p className='text-[8px] font-black uppercase text-slate-500 tracking-[0.2em] mb-2 h-3 flex items-center justify-center whitespace-nowrap group-hover/kpi:text-indigo-400 transition-colors'>
              Total / Mois
            </p>
            <div className='flex items-baseline gap-1 leading-none'>
              <span className='text-2xl font-black tabular-nums text-white tracking-tighter leading-none group-hover/kpi:scale-110 transition-transform'>
                {monthlyRevenue.toLocaleString("fr-FR", {
                  minimumFractionDigits: 0,
                })}
              </span>
              <span className='text-indigo-500 font-black text-base transition-colors leading-none'>
                €
              </span>
            </div>
          </a>
        </div>

        {/* Action Section */}
        <div className='flex flex-col md:items-end gap-5 shrink-0'>
          <div className='flex items-center gap-3'>
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border transition-colors duration-500 ${
                initialAccountIdMissing
                  ? "bg-slate-500/10 text-slate-500 border-slate-500/10"
                  : stripeStatus?.type === "onboarding"
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/10"
                    : "bg-emerald-500/10 text-emerald-500 border-emerald-500/10"
              }`}>
              <span
                className={`w-1.5 h-1.5 rounded-full animate-pulse shrink-0 ${
                  initialAccountIdMissing
                    ? "bg-slate-500"
                    : stripeStatus?.type === "onboarding"
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
              />
              {initialAccountIdMissing
                ? "Non configuré"
                : stripeStatus?.type === "onboarding"
                  ? "En cours"
                  : "Actif"}
            </div>
            <h3 className='text-xs font-black uppercase text-white/40 tracking-widest leading-none'>
              Stripe Connect
            </h3>
          </div>

          <button
            onClick={handleAction}
            disabled={!stripeStatus?.url}
            className={`group relative flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden shrink-0 ${
              isDashboard
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/20 border border-emerald-400/20"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/20 border border-indigo-400/20"
            }`}>
            {/* Shine effect */}
            <div className='absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[45deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000' />

            <span className='relative flex items-center gap-2'>
              {buttonLabel}
              <ExternalLink className='w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
</file>

<file path="src/pages/admin/index.astro">
---
// src/pages/admin/index.astro
return Astro.redirect("/admin/dashboard");
---
</file>

<file path="src/pages/api/tenant/bookings.ts">
// src/pages/api/tenant/bookings.ts
import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals, cookies }) => {
  try {
    const { user, profile } = locals as any;

    // 🛡️ Securité de base : Authentification requise
    if (!user || !profile) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const supabase = createServerClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll: () =>
            parseCookieHeader(request.headers.get("Cookie") ?? "").map((c) => ({
              name: c.name,
              value: c.value ?? "",
            })),
          setAll: (cookiesToSet) =>
            cookiesToSet.forEach(({ name, value, options }) =>
              cookies.set(name, value, options),
            ),
        },
      },
    );

    // 🎯 Filtrage par Tenant (Isolation multi-entreprise)
    let query = supabase
      .from("bookings")
      .select("*, customers(*)")
      .eq("current_tenant_id", profile.tenant_id);

    // 👮 PERMISSIONS FINES :
    // - owner / manager -> voient toutes les bookings du tenant
    // - driver -> voit uniquement ses bookings
    if (profile.tenant_role === "driver") {
      const { data: driver } = await supabase
        .from("drivers")
        .select("id")
        .eq("user_id", user.id)
        .eq("tenant_id", profile.tenant_id!)
        .limit(1)
        .maybeSingle();

      if (driver) {
        query = query.eq("driver_id", driver.id);
      } else {
        // Si pas de profil chauffeur trouvé, on ne retourne rien (sécurité)
        return new Response(JSON.stringify([]), { status: 200 });
      }
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      console.error("Fetch bookings error:", error);
      throw error;
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
</file>

<file path="src/pages/api/tenant/create-booking.ts">
// src/pages/api/tenant/create-booking.ts
import { createClient } from "@supabase/supabase-js";
import type { APIRoute } from "astro";

/**
 * API pour créer une course avec calcul de prix automatisé côté serveur
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const {
      pickup,
      dropoff,
      distance_km,
      pickup_time,
      client_name,
      client_email,
      payment_mode,
    } = body;

    // Utilisation de la SERVICE_ROLE_KEY pour bypass RLS et calculs critiques
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
    );

    const { user, profile } = locals as any;
    if (!user || !profile) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // 1️⃣ Normalisation email
    const normalizedEmail = client_email.trim().toLowerCase();
    const tenantId = profile.tenant_id;

    // 2️⃣ Chercher customer existant
    let { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("tenant_id", tenantId)
      .eq("email", normalizedEmail)
      .maybeSingle();

    let customerId = existingCustomer?.id;

    // 3️⃣ Créer si absent
    if (!customerId) {
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert({
          tenant_id: tenantId,
          email: normalizedEmail,
          first_name: client_name.split(" ")[0],
          last_name: client_name.split(" ").slice(1).join(" ") || "",
          type: "individual",
        })
        .select("id")
        .limit(1)
        .maybeSingle();

      if (customerError) throw customerError;
      if (!newCustomer) throw new Error("Erreur lors de la création du client");
      customerId = newCustomer.id;
    }

    // 2️ (Suite) Récupérer les règles tarifaires actives du tenant
    const { data: pricing, error: pricingError } = await supabase
      .from("pricing_rules")
      .select("*")
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (pricingError || !pricing) {
      return new Response(
        JSON.stringify({
          error: "Aucune règle tarifaire active trouvée pour ce tenant.",
        }),
        { status: 400 },
      );
    }

    // 3️⃣ Calcul du prix (Logique V1)
    let total =
      Number(pricing.base_price) +
      Number(pricing.price_per_km) * Number(distance_km);
    if (total < Number(pricing.minimum_fare)) {
      total = Number(pricing.minimum_fare);
    }

    // 4️⃣ Insertion de la réservation
    const { data: booking, error: insertError } = await supabase
      .from("bookings")
      .insert({
        original_tenant_id: tenantId,
        current_tenant_id: tenantId,
        customer_id: customerId, // Utilisation de l'ID normalisé
        pickup_address: pickup,
        dropoff_address: dropoff,
        pickup_time,
        total_amount: total,
        status: "pending",
        payment_mode: payment_mode || "cash",
      })
      .select()
      .limit(1)
      .maybeSingle();

    if (insertError) {
      console.error("Insert booking error:", insertError);
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
      });
    }

    if (!booking) {
      return new Response(
        JSON.stringify({
          error: "Erreur lors de la création de la réservation",
        }),
        {
          status: 500,
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        booking_id: booking.id,
        total_price: total,
      }),
      { status: 200 },
    );
  } catch (err: any) {
    console.error("Create booking crash:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
</file>

<file path="src/pages/app/drivers.astro">
---
// src/pages/app/drivers.astro
import { DriverList } from "@/components/drivers/DriverList";
import AppLayout from "../../layouts/AppLayout.astro";

const { profile } = Astro.locals;

if (!profile) return Astro.redirect("/login");
---

<AppLayout title="Chauffeurs">
    <div class="flex-1 flex flex-col p-8 md:p-12 overflow-hidden h-full relative">
        <!-- HEADER -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 flex-shrink-0">
            <div>
                <span class="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black tracking-widest text-indigo-400 uppercase">Gestion Collaborative</span>
                <h1 class="text-4xl font-black mt-4 uppercase tracking-tighter text-white">Chauffeurs</h1>
                <p class="text-slate-500 mt-2 font-medium">Gérez vos collaborateurs et leurs accès.</p>
            </div>
            <button id="btn-new-driver-content" class="px-6 py-4 bg-white hover:bg-slate-100 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95 shadow-xl shadow-white/5 flex items-center gap-3">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" />
                </svg>
                <span>Nouveau Chauffeur</span>
            </button>
        </div>

        <!-- LIST HEADER (EXTERNAL) -->
        <div class="mb-6 flex-shrink-0">
            <p class="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-3">
                <span class="w-8 h-[1px] bg-slate-800"></span>
                Liste de vos collaborateurs
            </p>
        </div>

        <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
            <DriverList client:only="react" tenantId={profile.tenant_id!} userId={profile.id} />
        </div>
    </div>
</AppLayout>

<script>
    const openModal = () => window.dispatchEvent(new CustomEvent('drivers:open-modal'));
    document.getElementById('btn-new-driver-content')?.addEventListener('click', openModal);
</script>
</file>

<file path="src/pages/index.astro">
---
// src/pages/index.astro
import MainLayout from "../layouts/MainLayout.astro";
---

<MainLayout title="Accueil">
	<div class="max-w-7xl mx-auto px-6 py-10 sm:py-20 relative z-10">
		<div class="glass p-8 sm:p-12 rounded-[2.5rem] text-center max-w-3xl mx-auto border border-white/10 shadow-[0_0_50px_-12px_rgba(79,70,229,0.2)]">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4 sm:mb-8">
				<span class="relative flex h-2 w-2">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
					<span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
				</span>
				VTC SaaS - V1.0
			</div>

			<h1
				class="text-[2.5rem] sm:text-6xl font-black mb-4 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 tracking-tighter italic uppercase leading-[1.1] py-2"
			>
				L'excellence <br/> du <span class="text-indigo-500">VTC</span>
			</h1>
			<p class="text-slate-400 text-base sm:text-lg mb-8 sm:mb-12 font-medium max-w-xl mx-auto leading-relaxed">
				Propulsez votre entreprise de transport avec une infrastructure technologique <span class="text-white italic">Elite</span>.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/signup"
					class="px-6 py-4 sm:px-10 sm:py-5 bg-indigo-600 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30 active:scale-95"
				>
					Démarrer maintenant
				</a>
				<button
					id="btn-learn-more"
					class="px-6 py-4 sm:px-10 sm:py-5 glass rounded-2xl font-black uppercase tracking-widest hover:bg-white/5 transition-all border border-white/10 active:scale-95"
				>
					En savoir plus
				</button>
			</div>
		</div>
	</div>

	<!-- MODAL: EN SAVOIR PLUS -->
	<div id="modal-about" class="fixed inset-0 z-[100] flex items-center justify-center p-6 opacity-0 pointer-events-none transition-all duration-500">
		<div class="absolute inset-0 bg-black/80 backdrop-blur-sm modal-overlay"></div>

		<div class="relative glass max-w-2xl w-full rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden transform scale-95 transition-transform duration-500">
			<!-- Close Button -->
			<button class="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors close-modal">
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			<div class="p-10 sm:p-16">
				<div class="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30 mb-8 mx-auto sm:mx-0">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>

				<h2 class="text-4xl font-black italic uppercase text-white tracking-tighter mb-6 text-center sm:text-left">
					L'Écosystème <span class="text-indigo-500">VTC MVP</span>
				</h2>

				<div class="space-y-8 text-left h-[400px] overflow-y-auto pr-4 custom-scrollbar">
					<p class="text-slate-400 leading-relaxed font-medium">
						Bienvenue sur l'infrastructure de référence pour les professionnels du VTC. Notre plateforme n'est pas qu'un simple annuaire, c'est un <span class="text-white font-bold italic">ERP financier</span> et une <span class="text-white font-bold italic">centrale de réservation</span> privée.
					</p>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div class="p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-indigo-500/30 transition-colors">
							<h3 class="text-indigo-400 font-black uppercase text-[10px] tracking-widest mb-3">Finance & Ledger</h3>
							<p class="text-xs text-slate-500 leading-relaxed">Transparence totale. Chaque euro est tracé dans un Grand Livre (Ledger) immuable. Fini les erreurs de calcul.</p>
						</div>
						<div class="p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-indigo-500/30 transition-colors">
							<h3 class="text-indigo-400 font-black uppercase text-[10px] tracking-widest mb-3">Gestion de Flotte</h3>
							<p class="text-xs text-slate-500 leading-relaxed">Partenaires, chauffeurs, véhicules. Gardez un contrôle absolu sur votre activité et celle de vos équipes.</p>
						</div>
						<div class="p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-indigo-500/30 transition-colors">
							<h3 class="text-indigo-400 font-black uppercase text-[10px] tracking-widest mb-3">Réservation Directe</h3>
							<p class="text-xs text-slate-500 leading-relaxed">Un moteur de booking ultra-performant. Recevez vos paiements via Stripe de manière sécurisée et instantanée.</p>
						</div>
						<div class="p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-indigo-500/30 transition-colors">
							<h3 class="text-indigo-400 font-black uppercase text-[10px] tracking-widest mb-3">Dashboard Admin</h3>
							<p class="text-xs text-slate-500 leading-relaxed">Une vision à 360° sur vos KPI, vos réservations en cours et vos litiges Stripe éventuels.</p>
						</div>
					</div>

					<div class="p-8 rounded-[2rem] bg-indigo-600/10 border border-indigo-500/20">
						<h4 class="text-white font-black uppercase text-xs italic mb-2 tracking-widest">En tant que nouveau membre :</h4>
						<ul class="text-[11px] text-slate-400 space-y-2 list-disc list-inside font-medium italic">
							<li>Finalisez votre onboarding en téléchargeant vos documents.</li>
							<li>Configurez vos tarifs personnalisés (Zones, Forfaits).</li>
							<li>Commencez à opérer sous votre propre domaine ou via la plateforme.</li>
						</ul>
					</div>
				</div>

				<div class="mt-12 flex justify-center sm:justify-start">
					<button class="px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all active:scale-95 close-modal">
						J'ai compris
					</button>
				</div>
			</div>
		</div>
	</div>

	<style>
		.glass {
			background: rgba(255, 255, 255, 0.03);
			backdrop-filter: blur(20px);
			-webkit-backdrop-filter: blur(20px);
		}

		#modal-about.is-active {
			opacity: 1;
			pointer-events: auto;
		}

		#modal-about.is-active > div:last-child {
			transform: scale(1);
		}

		.custom-scrollbar::-webkit-scrollbar {
			width: 4px;
		}
		.custom-scrollbar::-webkit-scrollbar-track {
			background: transparent;
		}
		.custom-scrollbar::-webkit-scrollbar-thumb {
			background: rgba(255, 255, 255, 0.1);
			border-radius: 10px;
		}
	</style>

	<script>
		const btn = document.getElementById('btn-learn-more');
		const modal = document.getElementById('modal-about');
		const closeBtns = document.querySelectorAll('.close-modal');
		const overlay = document.querySelector('.modal-overlay');

		const toggleModal = () => {
			modal?.classList.toggle('is-active');
			document.body.classList.toggle('overflow-hidden');
		};

		btn?.addEventListener('click', toggleModal);
		closeBtns.forEach(b => b.addEventListener('click', toggleModal));
		overlay?.addEventListener('click', toggleModal);

		// Fermeture avec Echap
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && modal?.classList.contains('is-active')) {
				toggleModal();
			}
		});
	</script>
</MainLayout>
</file>

<file path="src/pages/waiting-approval.astro">
---
// src/pages/waiting-approval.astro
import MainLayout from "../layouts/MainLayout.astro";
---

<MainLayout title="En attente d'approbation">
    <div
        class="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4"
    >
        <div
            class="glass p-10 rounded-3xl w-full max-w-lg shadow-2xl border border-white/10 text-center animate-in fade-in zoom-in duration-700"
        >
            <div
                class="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-indigo-500/20"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-indigo-500 animate-pulse"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            </div>

            <h1
                class="text-3xl font-black italic tracking-tighter uppercase mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400"
            >
                Dossier en cours d'examen
            </h1>

            <div class="space-y-4 text-slate-400 mb-10 leading-relaxed">
                <p>
                    Merci d'avoir complété votre inscription. Nos équipes
                    vérifient actuellement vos documents et les informations de
                    votre véhicule.
                </p>
                <p class="text-sm border-t border-white/5 pt-4">
                    Cette étape prend généralement <span
                        class="text-indigo-400 font-bold"
                        >moins de 24 heures</span
                    >. Vous recevrez un e-mail dès que votre compte sera activé.
                </p>
            </div>

            <div class="flex flex-col gap-3">
                <a
                    href="/onboarding?edit=true"
                    class="w-full py-4 bg-indigo-600 rounded-xl font-bold uppercase tracking-tighter text-xs transition-all hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 text-white flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                    Modifier mon dossier
                </a>
                <button
                    id="waiting-logout-btn"
                    class="w-full py-4 glass rounded-xl font-bold uppercase tracking-tighter text-xs transition-all hover:bg-white/10 active:scale-95"
                >
                    Déconnexion
                </button>
            </div>

            <script>
                import { supabase } from "@/lib/supabase/client";
                const btn = document.getElementById("waiting-logout-btn");
                btn?.addEventListener("click", async () => {
                    await supabase.auth.signOut();
                    window.location.href = "/";
                });
            </script>

            <div
                class="mt-8 text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]"
            >
                VTC HUB &bull; Service Qualité
            </div>
        </div>
    </div>
</MainLayout>
</file>

<file path="src/env.d.ts">
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user: import("@supabase/supabase-js").User | null;
    profile: {
      id: string;
      tenant_id: string | null;
      platform_role: string | null;
      tenant_role: "owner" | "manager" | "driver" | "pending" | null;
      first_name: string | null;
      last_name: string | null;
    } | null;
    supabase: import("@supabase/supabase-js").SupabaseClient;
  }
}
</file>

<file path="supabase/functions/cancel-booking/index.ts">
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12.18.0?target=deno&no-check";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
});

serve(async (req) => {
  try {
    const { booking_id, reason } = await req.json();

    if (!booking_id || !reason) {
      return new Response("Missing params", { status: 400 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // 1️⃣ Load booking
    const { data: booking } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", booking_id)
      .limit(1)
      .maybeSingle();

    if (!booking) {
      return new Response("Booking not found", { status: 404 });
    }

    // 2️⃣ Load cancellation policy
    const { data: policy } = await supabase
      .from("cancellation_policies")
      .select("*")
      .eq("id", booking.cancellation_policy_id)
      .limit(1)
      .maybeSingle();

    if (!policy) {
      return new Response("Policy not found", { status: 400 });
    }

    const now = new Date();
    const pickup = new Date(booking.pickup_time);
    const deltaHours = (pickup.getTime() - now.getTime()) / (1000 * 60 * 60);

    let refundRate = 0;

    if (reason === "driver_fault") {
      refundRate = policy.driver_fault_refund_rate;
    } else if (reason === "no_show") {
      refundRate = policy.no_show_refund_rate;
    } else if (deltaHours >= policy.hours_before_full_refund) {
      refundRate = 1;
    } else if (deltaHours >= policy.hours_before_partial_refund) {
      refundRate = policy.partial_refund_rate;
    }

    const refundAmount = booking.total_amount * refundRate;

    // 3️⃣ Cas sans remboursement
    if (refundAmount <= 0) {
      const { error } = await supabase
        .from("bookings")
        .update({
          status: "cancelled_no_refund",
          cancellation_reason: reason,
          cancelled_at: now.toISOString(),
        })
        .eq("id", booking_id)
        .eq("status", "paid");

      if (error) {
        return new Response("Cancellation failed", { status: 400 });
      }

      return new Response(JSON.stringify({ refund: 0 }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // 4️⃣ 🔒 Verrou transactionnel via RPC
    const { data: lockData, error: lockError } = await supabase.rpc(
      "initiate_refund",
      {
        p_booking_id: booking_id,
        p_reason: reason,
      },
    );

    if (lockError || !lockData || !lockData[0]?.refund_allowed) {
      return new Response("Refund not allowed", { status: 400 });
    }

    const paymentIntentId = lockData[0].payment_intent_id;

    // 5️⃣ Appel Stripe sécurisé
    try {
      await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: Math.round(refundAmount * 100),
      });

      return new Response(
        JSON.stringify({ success: true, refund: refundAmount }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (err) {
      await supabase
        .from("bookings")
        .update({ status: "refund_failed" })
        .eq("id", booking_id);

      console.error("Stripe refund error:", err);
      return new Response("Stripe refund failed", { status: 500 });
    }
  } catch (err) {
    console.error("Handler error:", err);
    return new Response(String(err), { status: 500 });
  }
});
</file>

<file path="supabase/config.toml">
[functions.handle_stripe_webhook]
enabled = true
verify_jwt = true
import_map = "./functions/handle_stripe_webhook/deno.json"
# Uncomment to specify a custom file path to the entrypoint.
# Supported file extensions are: .ts, .js, .mjs, .jsx, .tsx
entrypoint = "./functions/handle_stripe_webhook/index.ts"
# Specifies static files to be bundled with the function. Supports glob patterns.
# For example, if you want to serve static HTML pages in your function:
# static_files = [ "./functions/handle_stripe_webhook/*.html" ]

[functions.create_refund]
enabled = true
verify_jwt = true
import_map = "./functions/create_refund/deno.json"
# Uncomment to specify a custom file path to the entrypoint.
# Supported file extensions are: .ts, .js, .mjs, .jsx, .tsx
entrypoint = "./functions/create_refund/index.ts"
# Specifies static files to be bundled with the function. Supports glob patterns.
# For example, if you want to serve static HTML pages in your function:
# static_files = [ "./functions/create_refund/*.html" ]

[functions.stripe_webhook]
enabled = true
verify_jwt = true
import_map = "./functions/stripe_webhook/deno.json"
# Uncomment to specify a custom file path to the entrypoint.
# Supported file extensions are: .ts, .js, .mjs, .jsx, .tsx
entrypoint = "./functions/stripe_webhook/index.ts"
# Specifies static files to be bundled with the function. Supports glob patterns.
# For example, if you want to serve static HTML pages in your function:
# static_files = [ "./functions/stripe_webhook/*.html" ]

[functions.create-connect-account]
enabled = true
verify_jwt = true
import_map = "./functions/create-connect-account/deno.json"
# Uncomment to specify a custom file path to the entrypoint.
# Supported file extensions are: .ts, .js, .mjs, .jsx, .tsx
entrypoint = "./functions/create-connect-account/index.ts"
# Specifies static files to be bundled with the function. Supports glob patterns.
# For example, if you want to serve static HTML pages in your function:
# static_files = [ "./functions/create-connect-account/*.html" ]

[functions.create-account-link]
enabled = true
verify_jwt = true
import_map = "./functions/create-account-link/deno.json"
# Uncomment to specify a custom file path to the entrypoint.
# Supported file extensions are: .ts, .js, .mjs, .jsx, .tsx
entrypoint = "./functions/create-account-link/index.ts"
# Specifies static files to be bundled with the function. Supports glob patterns.
# For example, if you want to serve static HTML pages in your function:
# static_files = [ "./functions/create-account-link/*.html" ]

[functions.create-stripe-onboarding]
enabled = true
verify_jwt = true
import_map = "./functions/create-stripe-onboarding/deno.json"
# Uncomment to specify a custom file path to the entrypoint.
# Supported file extensions are: .ts, .js, .mjs, .jsx, .tsx
entrypoint = "./functions/create-stripe-onboarding/index.ts"
# Specifies static files to be bundled with the function. Supports glob patterns.
# For example, if you want to serve static HTML pages in your function:
# static_files = [ "./functions/create-stripe-onboarding/*.html" ]

[functions.create_customer]
enabled = true
verify_jwt = true
import_map = "./functions/create_customer/deno.json"
# Uncomment to specify a custom file path to the entrypoint.
# Supported file extensions are: .ts, .js, .mjs, .jsx, .tsx
entrypoint = "./functions/create_customer/index.ts"
# Specifies static files to be bundled with the function. Supports glob patterns.
# For example, if you want to serve static HTML pages in your function:
# static_files = [ "./functions/create_customer/*.html" ]

[functions.accept-booking]
enabled = true
verify_jwt = true
import_map = "./functions/accept-booking/deno.json"
# Uncomment to specify a custom file path to the entrypoint.
# Supported file extensions are: .ts, .js, .mjs, .jsx, .tsx
entrypoint = "./functions/accept-booking/index.ts"
# Specifies static files to be bundled with the function. Supports glob patterns.
# For example, if you want to serve static HTML pages in your function:
# static_files = [ "./functions/accept-booking/*.html" ]
</file>

<file path="testafaire.md">
# Tester ce scénario :

Simule erreur Stripe (mets une mauvaise clé API temporairement)

Annule booking

Booking doit passer en refund_failed

Remets bonne clé

Retry annulation

Refund doit passer

Si ça fonctionne → système blindé.

# dashboard admin

vue par chauffeurs

# general

mise en place email inscription
mise en place email reservation chauffeur
mise en place email confirmation de reservation client
delete et log refus inscription (admin)
email a raccorder durant inscription

# dashboard chauffeur

tableau de bord avec course faite course en attente
calendrier et email connecter avec rappel de course
etat des paiements (en attente, payé, en retard)
total courses et montants semaines mois années
editions bilan mois et années.
configuration des tarifs heure km et prix fixe navettes.
visualisation et modification des pdfs.

# evolution Reservation

Mise en place PDF devis chauffeur avec prix deja realiser + possiblité de modification
mise en place mailling
-chauffeur avec bouton acceptation refus ou (plus tard choix de prise en charge)
-de confirmation de réservation client avec devis + possibilité d'annulation sous delais. (infos sur la course)
-facturation a la fin de la course

# evolution sur la course

bouton dans dashboard chauffeur pour demarre la prise en charge (coordonnée gps et heure debut logger)
annulation bouton dashboard
timing si retard client (plus tard)
paiement en cash voir comment integration

# details

Ajouter un bouton "Retry" sur les réservations en échec (refund_failed ou payment_failed).

Ce bouton doit relancer la même action (refund ou capture) en utilisant les mêmes données.

Le bouton doit être visible uniquement si le statut est en échec.

Le bouton doit être désactivé pendant l'exécution de l'action (pour éviter les double-clics).

5. Pour réactiver plus tard

Très important pour V2 :

alter table bookings enable trigger all;

Ou un seul :

alter table bookings enable trigger prevent_booking_delete;
</file>

<file path=".agent/instructions.md">
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
</file>

<file path="src/lib/supabase/database.types.ts">
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      booking_shares: {
        Row: {
          accepted_at: string | null
          accepted_by_tenant_id: string | null
          booking_id: string
          id: string
          shared_at: string | null
          shared_by_tenant_id: string
          status: Database["public"]["Enums"]["share_status"]
        }
        Insert: {
          accepted_at?: string | null
          accepted_by_tenant_id?: string | null
          booking_id: string
          id?: string
          shared_at?: string | null
          shared_by_tenant_id: string
          status?: Database["public"]["Enums"]["share_status"]
        }
        Update: {
          accepted_at?: string | null
          accepted_by_tenant_id?: string | null
          booking_id?: string
          id?: string
          shared_at?: string | null
          shared_by_tenant_id?: string
          status?: Database["public"]["Enums"]["share_status"]
        }
        Relationships: [
          {
            foreignKeyName: "booking_shares_accepted_by_tenant_id_fkey"
            columns: ["accepted_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "booking_shares_accepted_by_tenant_id_fkey"
            columns: ["accepted_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_shares_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_shares_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_shares_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings_stuck_pending_refund"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_shares_shared_by_tenant_id_fkey"
            columns: ["shared_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "booking_shares_shared_by_tenant_id_fkey"
            columns: ["shared_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_status_transitions: {
        Row: {
          from_status: Database["public"]["Enums"]["booking_status"]
          to_status: Database["public"]["Enums"]["booking_status"]
        }
        Insert: {
          from_status: Database["public"]["Enums"]["booking_status"]
          to_status: Database["public"]["Enums"]["booking_status"]
        }
        Update: {
          from_status?: Database["public"]["Enums"]["booking_status"]
          to_status?: Database["public"]["Enums"]["booking_status"]
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_type: Database["public"]["Enums"]["booking_type_enum"]
          cancellation_initiator: string | null
          cancellation_policy_id: string | null
          cancellation_reason:
            | Database["public"]["Enums"]["cancellation_reason_enum"]
            | null
          cancelled_at: string | null
          created_at: string
          current_tenant_id: string
          customer_id: string
          distance_km: number | null
          driver_id: string | null
          dropoff_address: string
          id: string
          luggage_count: number
          original_tenant_id: string
          passenger_count: number
          payment_mode: Database["public"]["Enums"]["payment_mode"]
          pickup_address: string
          pickup_time: string
          status: Database["public"]["Enums"]["booking_status"]
          stripe_payment_intent_id: string | null
          subtotal_amount: number
          total_amount: number
          vat_amount: number
          vehicle_id: string | null
        }
        Insert: {
          booking_type: Database["public"]["Enums"]["booking_type_enum"]
          cancellation_initiator?: string | null
          cancellation_policy_id?: string | null
          cancellation_reason?:
            | Database["public"]["Enums"]["cancellation_reason_enum"]
            | null
          cancelled_at?: string | null
          created_at?: string
          current_tenant_id: string
          customer_id: string
          distance_km?: number | null
          driver_id?: string | null
          dropoff_address: string
          id?: string
          luggage_count?: number
          original_tenant_id: string
          passenger_count?: number
          payment_mode: Database["public"]["Enums"]["payment_mode"]
          pickup_address: string
          pickup_time: string
          status?: Database["public"]["Enums"]["booking_status"]
          stripe_payment_intent_id?: string | null
          subtotal_amount: number
          total_amount: number
          vat_amount?: number
          vehicle_id?: string | null
        }
        Update: {
          booking_type?: Database["public"]["Enums"]["booking_type_enum"]
          cancellation_initiator?: string | null
          cancellation_policy_id?: string | null
          cancellation_reason?:
            | Database["public"]["Enums"]["cancellation_reason_enum"]
            | null
          cancelled_at?: string | null
          created_at?: string
          current_tenant_id?: string
          customer_id?: string
          distance_km?: number | null
          driver_id?: string | null
          dropoff_address?: string
          id?: string
          luggage_count?: number
          original_tenant_id?: string
          passenger_count?: number
          payment_mode?: Database["public"]["Enums"]["payment_mode"]
          pickup_address?: string
          pickup_time?: string
          status?: Database["public"]["Enums"]["booking_status"]
          stripe_payment_intent_id?: string | null
          subtotal_amount?: number
          total_amount?: number
          vat_amount?: number
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cancellation_policy_id_fkey"
            columns: ["cancellation_policy_id"]
            isOneToOne: false
            referencedRelation: "cancellation_policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_current_tenant_id_fkey"
            columns: ["current_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "bookings_current_tenant_id_fkey"
            columns: ["current_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_original_tenant_id_fkey"
            columns: ["original_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "bookings_original_tenant_id_fkey"
            columns: ["original_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_vehicle_fk"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      cancellation_policies: {
        Row: {
          active: boolean
          created_at: string
          driver_fault_refund_rate: number
          hours_before_full_refund: number
          hours_before_partial_refund: number
          id: string
          no_show_refund_rate: number
          partial_refund_rate: number
          platform_fee_non_refundable: boolean
          tenant_id: string | null
          version: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          driver_fault_refund_rate: number
          hours_before_full_refund: number
          hours_before_partial_refund: number
          id?: string
          no_show_refund_rate: number
          partial_refund_rate: number
          platform_fee_non_refundable?: boolean
          tenant_id?: string | null
          version: number
        }
        Update: {
          active?: boolean
          created_at?: string
          driver_fault_refund_rate?: number
          hours_before_full_refund?: number
          hours_before_partial_refund?: number
          id?: string
          no_show_refund_rate?: number
          partial_refund_rate?: number
          platform_fee_non_refundable?: boolean
          tenant_id?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "cancellation_policies_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "cancellation_policies_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      circle_memberships: {
        Row: {
          circle_id: string
          id: string
          joined_at: string | null
          role: string
          status: string
          tenant_id: string
        }
        Insert: {
          circle_id: string
          id?: string
          joined_at?: string | null
          role: string
          status: string
          tenant_id: string
        }
        Update: {
          circle_id?: string
          id?: string
          joined_at?: string | null
          role?: string
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "circle_memberships_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "circles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "circle_memberships_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "circle_memberships_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      circles: {
        Row: {
          created_at: string | null
          created_by_tenant_id: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          created_by_tenant_id: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          created_by_tenant_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "circles_created_by_tenant_id_fkey"
            columns: ["created_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "circles_created_by_tenant_id_fkey"
            columns: ["created_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          billing_address: string | null
          city: string | null
          company_name: string | null
          country: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string | null
          phone: string | null
          postal_code: string | null
          tenant_id: string
          type: Database["public"]["Enums"]["customer_type_enum"]
          vat_number: string | null
        }
        Insert: {
          billing_address?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name?: string | null
          phone?: string | null
          postal_code?: string | null
          tenant_id: string
          type?: Database["public"]["Enums"]["customer_type_enum"]
          vat_number?: string | null
        }
        Update: {
          billing_address?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string | null
          phone?: string | null
          postal_code?: string | null
          tenant_id?: string
          type?: Database["public"]["Enums"]["customer_type_enum"]
          vat_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "customers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          created_at: string
          first_name: string
          id: string
          last_name: string
          license_number: string
          phone: string
          tenant_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          first_name: string
          id?: string
          last_name: string
          license_number: string
          phone: string
          tenant_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          license_number?: string
          phone?: string
          tenant_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drivers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "drivers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drivers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_movements: {
        Row: {
          booking_id: string
          created_at: string
          created_by_event: string | null
          direction: Database["public"]["Enums"]["movement_direction_enum"]
          driver_commission_amount: number | null
          driver_commission_rate_snapshot: number | null
          gross_amount: number
          id: string
          movement_type: Database["public"]["Enums"]["movement_type_enum"]
          net_amount: number
          platform_commission_amount: number | null
          platform_commission_rate_snapshot: number | null
          refund_ratio: number | null
          stripe_payment_intent_id: string | null
          stripe_refund_id: string | null
          tenant_id: string
          vat_amount: number | null
        }
        Insert: {
          booking_id: string
          created_at?: string
          created_by_event?: string | null
          direction: Database["public"]["Enums"]["movement_direction_enum"]
          driver_commission_amount?: number | null
          driver_commission_rate_snapshot?: number | null
          gross_amount: number
          id?: string
          movement_type: Database["public"]["Enums"]["movement_type_enum"]
          net_amount: number
          platform_commission_amount?: number | null
          platform_commission_rate_snapshot?: number | null
          refund_ratio?: number | null
          stripe_payment_intent_id?: string | null
          stripe_refund_id?: string | null
          tenant_id: string
          vat_amount?: number | null
        }
        Update: {
          booking_id?: string
          created_at?: string
          created_by_event?: string | null
          direction?: Database["public"]["Enums"]["movement_direction_enum"]
          driver_commission_amount?: number | null
          driver_commission_rate_snapshot?: number | null
          gross_amount?: number
          id?: string
          movement_type?: Database["public"]["Enums"]["movement_type_enum"]
          net_amount?: number
          platform_commission_amount?: number | null
          platform_commission_rate_snapshot?: number | null
          refund_ratio?: number | null
          stripe_payment_intent_id?: string | null
          stripe_refund_id?: string | null
          tenant_id?: string
          vat_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_movements_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_movements_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_movements_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings_stuck_pending_refund"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_movements_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "financial_movements_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      fixed_routes: {
        Row: {
          active: boolean | null
          created_at: string | null
          dropoff_zone_id: string | null
          id: string
          is_bidirectional: boolean | null
          pickup_zone_id: string | null
          price: number
          tenant_id: string | null
          vehicle_category: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          dropoff_zone_id?: string | null
          id?: string
          is_bidirectional?: boolean | null
          pickup_zone_id?: string | null
          price: number
          tenant_id?: string | null
          vehicle_category: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          dropoff_zone_id?: string | null
          id?: string
          is_bidirectional?: boolean | null
          pickup_zone_id?: string | null
          price?: number
          tenant_id?: string | null
          vehicle_category?: string
        }
        Relationships: [
          {
            foreignKeyName: "fixed_routes_dropoff_zone_id_fkey"
            columns: ["dropoff_zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fixed_routes_pickup_zone_id_fkey"
            columns: ["pickup_zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fixed_routes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "fixed_routes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding: {
        Row: {
          capacity: number
          company_name: string
          created_at: string | null
          default_base_price: number
          default_minimum_fare: number
          default_price_per_km: number
          first_name: string
          id: string
          last_name: string
          phone: string
          plate_number: string | null
          primary_domain: string
          profile_id: string
          service_categories: string[]
          status: Database["public"]["Enums"]["onboarding_status"]
          validated_at: string | null
          vehicle_brand: string | null
          vehicle_model: string | null
          vtc_license_number: string
        }
        Insert: {
          capacity: number
          company_name: string
          created_at?: string | null
          default_base_price: number
          default_minimum_fare: number
          default_price_per_km: number
          first_name: string
          id?: string
          last_name: string
          phone: string
          plate_number?: string | null
          primary_domain: string
          profile_id: string
          service_categories: string[]
          status?: Database["public"]["Enums"]["onboarding_status"]
          validated_at?: string | null
          vehicle_brand?: string | null
          vehicle_model?: string | null
          vtc_license_number: string
        }
        Update: {
          capacity?: number
          company_name?: string
          created_at?: string | null
          default_base_price?: number
          default_minimum_fare?: number
          default_price_per_km?: number
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
          plate_number?: string | null
          primary_domain?: string
          profile_id?: string
          service_categories?: string[]
          status?: Database["public"]["Enums"]["onboarding_status"]
          validated_at?: string | null
          vehicle_brand?: string | null
          vehicle_model?: string | null
          vtc_license_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      passengers: {
        Row: {
          booking_id: string
          created_at: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
        }
        Insert: {
          booking_id: string
          created_at?: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
        }
        Update: {
          booking_id?: string
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "passengers_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "passengers_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "passengers_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings_stuck_pending_refund"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_settings: {
        Row: {
          created_at: string | null
          default_platform_commission_rate: number
          default_tenant_commission_rate: number
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          default_platform_commission_rate?: number
          default_tenant_commission_rate?: number
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          default_platform_commission_rate?: number
          default_tenant_commission_rate?: number
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      pricing_rules: {
        Row: {
          active: boolean | null
          base_price: number
          created_at: string
          id: string
          minimum_fare: number
          price_per_km: number
          service_category: string
          tenant_id: string
        }
        Insert: {
          active?: boolean | null
          base_price: number
          created_at?: string
          id?: string
          minimum_fare: number
          price_per_km: number
          service_category: string
          tenant_id: string
        }
        Update: {
          active?: boolean | null
          base_price?: number
          created_at?: string
          id?: string
          minimum_fare?: number
          price_per_km?: number
          service_category?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pricing_rules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "pricing_rules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          first_name: string | null
          id: string
          is_verified: boolean | null
          last_name: string | null
          platform_role: Database["public"]["Enums"]["platform_role"] | null
          tenant_id: string | null
          tenant_role: Database["public"]["Enums"]["tenant_role"] | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          first_name?: string | null
          id: string
          is_verified?: boolean | null
          last_name?: string | null
          platform_role?: Database["public"]["Enums"]["platform_role"] | null
          tenant_id?: string | null
          tenant_role?: Database["public"]["Enums"]["tenant_role"] | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          first_name?: string | null
          id?: string
          is_verified?: boolean | null
          last_name?: string | null
          platform_role?: Database["public"]["Enums"]["platform_role"] | null
          tenant_id?: string | null
          tenant_role?: Database["public"]["Enums"]["tenant_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_events: {
        Row: {
          event_type: string
          id: string
          received_at: string | null
          stripe_event_id: string
        }
        Insert: {
          event_type: string
          id?: string
          received_at?: string | null
          stripe_event_id: string
        }
        Update: {
          event_type?: string
          id?: string
          received_at?: string | null
          stripe_event_id?: string
        }
        Relationships: []
      }
      stripe_webhook_logs: {
        Row: {
          error_message: string | null
          event_type: string
          id: string
          payload: Json
          processed_at: string | null
          received_at: string
          status: string
          stripe_event_id: string
        }
        Insert: {
          error_message?: string | null
          event_type: string
          id?: string
          payload: Json
          processed_at?: string | null
          received_at?: string
          status?: string
          stripe_event_id: string
        }
        Update: {
          error_message?: string | null
          event_type?: string
          id?: string
          payload?: Json
          processed_at?: string | null
          received_at?: string
          status?: string
          stripe_event_id?: string
        }
        Relationships: []
      }
      tenants: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          platform_fee_rate: number | null
          primary_domain: string
          share_fee_rate: number | null
          stripe_account_id: string | null
          vat_rate: number | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          platform_fee_rate?: number | null
          primary_domain: string
          share_fee_rate?: number | null
          stripe_account_id?: string | null
          vat_rate?: number | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          platform_fee_rate?: number | null
          primary_domain?: string
          share_fee_rate?: number | null
          stripe_account_id?: string | null
          vat_rate?: number | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          brand: string
          capacity: number | null
          category: Database["public"]["Enums"]["vehicle_category_enum"] | null
          created_at: string | null
          driver_id: string | null
          id: string
          luggage_capacity: number
          model: string
          plate_number: string
          status: Database["public"]["Enums"]["vehicle_status_enum"]
          tenant_id: string
        }
        Insert: {
          brand: string
          capacity?: number | null
          category?: Database["public"]["Enums"]["vehicle_category_enum"] | null
          created_at?: string | null
          driver_id?: string | null
          id?: string
          luggage_capacity?: number
          model: string
          plate_number: string
          status?: Database["public"]["Enums"]["vehicle_status_enum"]
          tenant_id: string
        }
        Update: {
          brand?: string
          capacity?: number | null
          category?: Database["public"]["Enums"]["vehicle_category_enum"] | null
          created_at?: string | null
          driver_id?: string | null
          id?: string
          luggage_capacity?: number
          model?: string
          plate_number?: string
          status?: Database["public"]["Enums"]["vehicle_status_enum"]
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "vehicles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      zones: {
        Row: {
          created_at: string | null
          id: string
          name: string
          tenant_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          tenant_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "zones_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "zones_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      admin_bookings_full_view: {
        Row: {
          created_at: string | null
          current_tenant_name: string | null
          display_customer_city: string | null
          display_customer_email: string | null
          display_customer_first_name: string | null
          display_customer_last_name: string | null
          display_customer_phone: string | null
          display_customer_postal_code: string | null
          dropoff_address: string | null
          id: string | null
          original_tenant_domain: string | null
          original_tenant_name: string | null
          pickup_address: string | null
          pickup_time: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          total_amount: number | null
        }
        Relationships: []
      }
      admin_monthly_summary: {
        Row: {
          month: string | null
          net_revenue: number | null
        }
        Relationships: []
      }
      admin_tenants_overview: {
        Row: {
          avg_commission_rate: number | null
          joined_at: string | null
          primary_domain: string | null
          tenant_id: string | null
          tenant_name: string | null
          total_bookings: number | null
          total_gross_revenue: number | null
          total_net_revenue: number | null
        }
        Relationships: []
      }
      bookings_stuck_pending_refund: {
        Row: {
          cancellation_initiator: string | null
          cancellation_policy_id: string | null
          cancellation_reason:
            | Database["public"]["Enums"]["cancellation_reason_enum"]
            | null
          cancelled_at: string | null
          created_at: string | null
          current_tenant_id: string | null
          customer_id: string | null
          distance_km: number | null
          driver_id: string | null
          dropoff_address: string | null
          id: string | null
          original_tenant_id: string | null
          passenger_count: number | null
          payment_mode: Database["public"]["Enums"]["payment_mode"] | null
          pickup_address: string | null
          pickup_time: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          stripe_payment_intent_id: string | null
          subtotal_amount: number | null
          total_amount: number | null
          vat_amount: number | null
        }
        Insert: {
          cancellation_initiator?: string | null
          cancellation_policy_id?: string | null
          cancellation_reason?:
            | Database["public"]["Enums"]["cancellation_reason_enum"]
            | null
          cancelled_at?: string | null
          created_at?: string | null
          current_tenant_id?: string | null
          customer_id?: string | null
          distance_km?: number | null
          driver_id?: string | null
          dropoff_address?: string | null
          id?: string | null
          original_tenant_id?: string | null
          passenger_count?: number | null
          payment_mode?: Database["public"]["Enums"]["payment_mode"] | null
          pickup_address?: string | null
          pickup_time?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          stripe_payment_intent_id?: string | null
          subtotal_amount?: number | null
          total_amount?: number | null
          vat_amount?: number | null
        }
        Update: {
          cancellation_initiator?: string | null
          cancellation_policy_id?: string | null
          cancellation_reason?:
            | Database["public"]["Enums"]["cancellation_reason_enum"]
            | null
          cancelled_at?: string | null
          created_at?: string | null
          current_tenant_id?: string | null
          customer_id?: string | null
          distance_km?: number | null
          driver_id?: string | null
          dropoff_address?: string | null
          id?: string | null
          original_tenant_id?: string | null
          passenger_count?: number | null
          payment_mode?: Database["public"]["Enums"]["payment_mode"] | null
          pickup_address?: string | null
          pickup_time?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          stripe_payment_intent_id?: string | null
          subtotal_amount?: number | null
          total_amount?: number | null
          vat_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cancellation_policy_id_fkey"
            columns: ["cancellation_policy_id"]
            isOneToOne: false
            referencedRelation: "cancellation_policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_current_tenant_id_fkey"
            columns: ["current_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "bookings_current_tenant_id_fkey"
            columns: ["current_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_original_tenant_id_fkey"
            columns: ["original_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "bookings_original_tenant_id_fkey"
            columns: ["original_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_admin_view: {
        Row: {
          auth_email: string | null
          capacity: number | null
          company_name: string | null
          created_at: string | null
          default_base_price: number | null
          default_minimum_fare: number | null
          default_price_per_km: number | null
          first_name: string | null
          id: string | null
          last_name: string | null
          phone: string | null
          plate_number: string | null
          primary_domain: string | null
          profile_id: string | null
          service_categories: string[] | null
          status: Database["public"]["Enums"]["onboarding_status"] | null
          validated_at: string | null
          vehicle_brand: string | null
          vehicle_model: string | null
          vtc_license_number: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_webhook_errors: {
        Row: {
          error_message: string | null
          event_type: string | null
          id: string | null
          payload: Json | null
          processed_at: string | null
          received_at: string | null
          status: string | null
          stripe_event_id: string | null
        }
        Insert: {
          error_message?: string | null
          event_type?: string | null
          id?: string | null
          payload?: Json | null
          processed_at?: string | null
          received_at?: string | null
          status?: string | null
          stripe_event_id?: string | null
        }
        Update: {
          error_message?: string | null
          event_type?: string | null
          id?: string | null
          payload?: Json | null
          processed_at?: string | null
          received_at?: string | null
          status?: string | null
          stripe_event_id?: string | null
        }
        Relationships: []
      }
      stripe_webhook_pending: {
        Row: {
          error_message: string | null
          event_type: string | null
          id: string | null
          payload: Json | null
          processed_at: string | null
          received_at: string | null
          status: string | null
          stripe_event_id: string | null
        }
        Insert: {
          error_message?: string | null
          event_type?: string | null
          id?: string | null
          payload?: Json | null
          processed_at?: string | null
          received_at?: string | null
          status?: string | null
          stripe_event_id?: string | null
        }
        Update: {
          error_message?: string | null
          event_type?: string | null
          id?: string | null
          payload?: Json | null
          processed_at?: string | null
          received_at?: string | null
          status?: string | null
          stripe_event_id?: string | null
        }
        Relationships: []
      }
      tenant_dashboard_kpi: {
        Row: {
          monthly_net_revenue: number | null
          tenant_id: string | null
          total_bookings: number | null
          total_gross_revenue: number | null
          total_net_revenue: number | null
          total_refunded_gross: number | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_movements_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "financial_movements_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      approve_onboarding_tx: {
        Args: { onboarding_uuid: string }
        Returns: undefined
      }
      compute_booking_balance: {
        Args: { p_booking_id: string }
        Returns: number
      }
      current_tenant_id: { Args: never; Returns: string }
      delete_tenant_account: { Args: never; Returns: undefined }
      expire_unpaid_bookings: { Args: never; Returns: undefined }
      get_available_vehicles: {
        Args: { p_tenant_id: string }
        Returns: {
          brand: string
          capacity: number
          category: Database["public"]["Enums"]["vehicle_category_enum"]
          id: string
          model: string
        }[]
      }
      initiate_refund: {
        Args: { p_booking_id: string; p_reason: string }
        Returns: {
          payment_intent_id: string
          refund_allowed: boolean
        }[]
      }
    }
    Enums: {
      booking_status:
        | "pending"
        | "accepted"
        | "completed"
        | "cancelled"
        | "accepted_pending_payment"
        | "paid"
        | "deprecated_refunded"
        | "cancelled_pending_refund"
        | "cancelled_no_refund"
        | "cancelled_refunded"
        | "no_show"
        | "expired_payment"
        | "refund_failed"
      booking_type_enum: "transfer"
      cancellation_reason_enum:
        | "client"
        | "no_show"
        | "driver_fault"
        | "platform_issue"
      customer_type_enum: "individual" | "company"
      movement_direction_enum: "credit" | "debit"
      movement_type_enum:
        | "payment"
        | "commission"
        | "refund"
        | "commission_reversal"
      onboarding_status: "pending" | "approved" | "rejected" | "processed"
      payment_mode: "card" | "cash"
      platform_role: "super_admin" | "platform_staff"
      share_status: "pending" | "accepted" | "rejected"
      tenant_role: "owner" | "manager" | "driver" | "pending"
      vehicle_category_enum: "berline" | "van" | "suv" | "minibus" | "luxury"
      vehicle_status_enum: "active" | "inactive" | "maintenance"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: [
        "pending",
        "accepted",
        "completed",
        "cancelled",
        "accepted_pending_payment",
        "paid",
        "deprecated_refunded",
        "cancelled_pending_refund",
        "cancelled_no_refund",
        "cancelled_refunded",
        "no_show",
        "expired_payment",
        "refund_failed",
      ],
      booking_type_enum: ["transfer"],
      cancellation_reason_enum: [
        "client",
        "no_show",
        "driver_fault",
        "platform_issue",
      ],
      customer_type_enum: ["individual", "company"],
      movement_direction_enum: ["credit", "debit"],
      movement_type_enum: [
        "payment",
        "commission",
        "refund",
        "commission_reversal",
      ],
      onboarding_status: ["pending", "approved", "rejected", "processed"],
      payment_mode: ["card", "cash"],
      platform_role: ["super_admin", "platform_staff"],
      share_status: ["pending", "accepted", "rejected"],
      tenant_role: ["owner", "manager", "driver", "pending"],
      vehicle_category_enum: ["berline", "van", "suv", "minibus", "luxury"],
      vehicle_status_enum: ["active", "inactive", "maintenance"],
    },
  },
} as const
</file>

<file path="supabase/functions/approve_onboarding/index.ts">
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return new Response("Unauthorized", { status: 401 });
    }

    // client user
    const supabaseUser = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      {
        global: { headers: { Authorization: authHeader } },
      },
    );

    const { data: userData } = await supabaseUser.auth.getUser();

    if (!userData?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // check role
    const { data: profile, error: profileError } = await supabaseUser
      .from("profiles")
      .select("platform_role")
      .eq("id", userData.user.id)
      .single();

    if (profileError) {
      return new Response("Profile error", { status: 400 });
    }

    if (!["super_admin", "platform_staff"].includes(profile.platform_role)) {
      return new Response("Forbidden", { status: 403 });
    }

    // payload
    const { onboarding_id } = await req.json();

    if (!onboarding_id) {
      return new Response("Missing onboarding_id", { status: 400 });
    }

    // service role
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // ✅ only SQL transaction
    const { error } = await supabaseAdmin.rpc("approve_onboarding_tx", {
      onboarding_uuid: onboarding_id,
    });

    if (error) {
      console.error("RPC error:", error);
      return new Response(JSON.stringify(error), { status: 400 });
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (err) {
    console.error("Approve error:", err);

    return new Response(
      JSON.stringify({ error: err?.message ?? err }),
      { status: 500 }
    );
  }
});
</file>

<file path="supabase/functions/create_checkout_session/index.ts">
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12.18.0?target=deno&no-check";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
});

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      },
    },
  },
);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    console.log("BODY =", body);

    const customer_data = body.customer_data;
    const booking_data = body.booking_data;

    if (!booking_data) throw new Error("booking_data missing");
    if (!booking_data.type) throw new Error("booking_type missing");
    if (!booking_data.tenant_id) throw new Error("tenant_id missing");

    const tenantId = booking_data.tenant_id;

    const total = Number(
      booking_data?.total_amount ?? booking_data?.total ?? 0,
    );

    const safeTotal = total > 0 ? total : 1;

    console.log("TOTAL =", total);
    console.log("SAFE TOTAL =", safeTotal);

    // =========================
    // CUSTOMER UPSERT
    // =========================

    console.log("UPSERT CUSTOMER INPUT", {
      tenantId,
      email: customer_data?.email,
    });

    const { data: customer, error: cErr } = await supabaseAdmin
      .from("customers")
      .upsert(
        {
          tenant_id: tenantId,
          email: customer_data.email,
          first_name: customer_data.first_name,
          last_name: customer_data.last_name,
          phone: customer_data.phone,
        },
        {
          onConflict: "tenant_id,email",
        },
      )
      .select()
      .single();

    if (cErr) {
      console.log("CUSTOMERS ERROR =", cErr);
      throw new Error(cErr.message);
    }

    if (!customer) {
      console.log("CUSTOMER NULL");
      throw new Error("customer null");
    }

    // =========================
    // VEHICLE CHECK
    // =========================

    const vehicleId = booking_data.vehicle_id;

    if (!vehicleId) {
      throw new Error("vehicle_id required");
    }

    const { data: vehicle, error: vErr } = await supabaseAdmin
      .from("vehicles")
      .select("tenant_id,status")
      .eq("id", vehicleId)
      .single();

    if (vErr) {
      console.log("VEHICLE ERROR =", vErr);
      throw new Error(vErr.message);
    }

    if (!vehicle) throw new Error("vehicle not found");

    if (vehicle.status !== "active") {
      throw new Error("vehicle inactive");
    }

    if (vehicle.tenant_id !== tenantId) {
      throw new Error("vehicle tenant mismatch");
    }

    // =========================
    // TENANT
    // =========================

    const { data: tenant, error: tErr } = await supabaseAdmin
      .from("tenants")
      .select("stripe_account_id, platform_fee_rate")
      .eq("id", tenantId)
      .single();

    if (tErr) {
      console.log("TENANT ERROR =", tErr);
      throw new Error(tErr.message);
    }

    if (!tenant) throw new Error("tenant not found");

    if (!tenant.stripe_account_id) {
      throw new Error("stripe not connected");
    }

    const account = await stripe.accounts.retrieve(tenant.stripe_account_id);

    if (!account.charges_enabled) {
      throw new Error("stripe not ready");
    }

    // =========================
    // STRIPE SESSION
    // =========================

    const amountInCents = Math.round(safeTotal * 100);

    const feeRate = tenant.platform_fee_rate ?? 0;

    const feeInCents = Math.round((feeRate / 100) * amountInCents);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      customer_email: customer.email,

      metadata: {
        tenant_id: tenantId,
        booking_type: booking_data.type,
        pickup_address: booking_data.pickup_address,
        dropoff_address: booking_data.dropoff_address,
        pickup_time: booking_data.pickup_time,
        vehicle_id: booking_data.vehicle_id,
        total_amount: safeTotal,
        customer_id: customer.id,
      },

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Course VTC",
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],

      payment_intent_data: {
        application_fee_amount: feeInCents > 0 ? feeInCents : undefined,

        transfer_data: {
          destination: tenant.stripe_account_id,
        },

        on_behalf_of: tenant.stripe_account_id,
      },

      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/transfert`,
    });

    await supabaseAdmin.from("stripe_events").insert({
      session_id: session.id,
      status: "checkout_created",
      tenant_id: tenantId,
      booking_type: booking_data.type,
      amount: safeTotal,
      metadata: {
        customer_id: customer.id,
        vehicle_id: booking_data.vehicle_id,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log("FINAL ERROR =", err);

    return new Response(JSON.stringify({ error: err.message }), {
      headers: corsHeaders,
      status: 400,
    });
  }
});
</file>

<file path="astro.config.mjs">
// @ts-check
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
});
</file>

<file path="package.json">
{
  "name": "tender-telescope",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "gen:types": "supabase gen types typescript --project-id kpnkhmtxzigxtfnkmzru > src/lib/supabase/database.types.ts"
  },
  "dependencies": {
    "@ark-ui/react": "^5.31.0",
    "@astrojs/cloudflare": "^12.6.12",
    "@astrojs/node": "^9.5.3",
    "@astrojs/react": "^5.0.0",
    "@astrojs/tailwind": "^6.0.2",
    "@park-ui/tailwind-plugin": "^0.20.1",
    "@supabase/ssr": "^0.8.0",
    "@supabase/supabase-js": "^2.95.3",
    "astro": "^5.17.1",
    "lucide-react": "^0.564.0",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "tailwindcss": "^3.4.19"
  }
}
</file>

<file path="PROJECT_STATE.md">
# 📌 ÉTAT DU PROJET — VTC HUB (MVP)

## 🏁 État actuel validé

D’après les dernières évolutions et vérifications :

**Structure de la table `bookings` :**

| Champ                      | Rôle                                      |
| -------------------------- | ----------------------------------------- |
| `booking_type`             | Type de course (ex: `transfer`, `hourly`) |
| `driver_id`                | Chauffeur assigné                         |
| `vehicle_id`               | Véhicule assigné                          |
| `passenger_count`          | Nombre de passagers                       |
| `luggage_count`            | Nombre de bagages                         |
| `subtotal_amount`          | Prix HT                                   |
| `vat_amount`               | TVA                                       |
| `total_amount`             | Prix TTC                                  |
| `stripe_payment_intent_id` | Identifiant de paiement Stripe            |
| `status`                   | État actuel de la course                  |

> **Note** : La structure DB est jugée **suffisante pour la V1**. Pas de nouvelle migration immédiate nécessaire sur le cœur du modèle.

---

## ✅ Ce qui est fonctionnel

### Architecture Technique

| Couche   | Technologie            |
| -------- | ---------------------- |
| Frontend | Astro (Multi-domaine)  |
| Backend  | Supabase               |
| Auth     | Supabase Auth          |
| Database | PostgreSQL             |
| Logique  | Edge Functions (Deno)  |
| Paiement | Stripe Connect Express |
| Infra    | Cloudflare             |

### Isolation Multi-tenant

Isolation stricte garantie par :

- Identité : `profiles.id = auth.uid()` relié à `profiles.tenant_id`.
- Données : Toutes les tables métier contiennent un `tenant_id`.
- Sécurité (RLS) : `tenant_id = (select tenant_id from profiles where id = auth.uid())`.

### Flux Booking & Finances

1.  **Réservation** : Le client choisit son trajet/service.
2.  **Calcul** : Prix + TVA calculés côté backend (`create-booking`).
3.  **Insertion** : Création du record dans `bookings`.
4.  **Paiement** : Création d'une `Stripe Checkout Session` via Edge Function.
5.  **Validation** : Le Webhook Stripe met à jour `booking.status = 'paid'`.

**Champs Financiers :**

- `subtotal_amount` (HT), `vat_amount` (TVA), `total_amount` (TTC).
- Encaissement direct sur le compte **Stripe Connect Express** de l'entreprise (`tenants.stripe_account_id`).

### UI & Dashboard (VTC MVP)

- **Gestion Tarifaire** : Configuration des forfaits, zones et prix au km.
- **Gestion Flotte** : Ajout et suivi des véhicules et chauffeurs.
- **Historique des Bookings** : Liste tabulée par statut (Toutes, À Valider, En Paiement, Terminées).
- **Dashboard Avancé** :
  - Vue "Missions en ligne" (liste verticale fluide).
  - **Modale de détails** : Clic sur une mission pour voir toutes les infos (Client, Trajet, Finance, Statut).
  - **Distinction de service** : Badge visuel pour différencier les "Transferts" des "Mises à Dispo (Hourly)".

---

## 🚦 Statuts Booking (Logique Métier)

Flux opérationnel complet :

1.  `pending` (Attente réservation)
2.  `waiting_validation` (Pour les mises à dispo sans tarif fixe)
3.  `paid` (Payé, prêt pour assignation)
4.  `assigned` (Chauffeur assigné)
5.  `accepted` (Chauffeur a accepté la mission)
6.  `on_the_way` (Chauffeur en route vers le client)
7.  `in_progress` (Course en cours)
8.  `completed` (Terminée)
9.  `cancelled` / `no_show` (Annulations)

---

## 🏗️ Modèle Réseau & Partage (Prévu)

L'infrastructure est déjà prête pour les évolutions futures :

- **Cercles privés** : Gestion de groupements de chauffeurs.
- **Partage de course** : Délégation de mission à d'autres membres du réseau.
- **Commissions plateforme** : Appliquées uniquement sur le partage de course.
  - Table `commissions` existante (`booking_id`, `gross_amount`, `commission_rate`, `commission_amount`).

---

## 🛠️ Ce qui reste à implémenter (Phase V2)

### 1️⃣ Backoffice Chauffeur (Interface Driver)

- Tableau de bord dédié au chauffeur (hors admin).
- Actions : Accepter/Refuser une mission assignée.
- Workflow terrain : "Je suis en route", "Client à bord", "Course terminée".

### 2️⃣ Sécurisation RLS Driver

- Restriction de vue : `bookings.driver_id = current_driver_id`.

### 3️⃣ Edge Functions Opérationnelles

- `assign-driver`
- `driver-accept-booking`
- `driver-start-trip`
- `driver-complete-trip`

### 4️⃣ Transitions de Statuts Sécurisées

- Vérification SQL (`validate_booking_status_transition()`) pour empêcher les sauts d'étapes incohérents (ex: `paid` -> `completed` sans passer par `in_progress`).

### 5️⃣ Pricing Dynamique Avancé

- Exploitation complète de la table `pricing_rules` pour le calcul temps réel des forfaits complexes.

---

## 🎯 Prochain Objectif Critique

Lancer la brique :
**VTC SAAS — DRIVER DASHBOARD & WORKFLOW V1**

C'est l'étape nécessaire pour transformer l'outil de gestion en outil opérationnel pour les chauffeurs sur le terrain.
</file>

<file path="docs/implementation_progress.md">
# 📋 État d'Avancement du Projet — VTC HUB (MVP -> V1)

Ce document récapitule l'ensemble des fonctionnalités implémentées depuis le début du projet et liste les tâches restantes pour les versions futures.

---

## ✅ 1. Fondations & Multi-Tenant (TERMINÉ)

- [x] **Isolation stricte** : Architecture basée sur `tenant_id` sur toutes les tables métiers.
- [x] **Sécurité (RLS)** : Politiques Row Level Security pour garantir qu'un tenant ne voit que ses données.
- [x] **Auth & Profiles** : Intégration Supabase Auth liée à un profil utilisateur avec rôles (`platform_role`, `tenant_role`).
- [x] **Activation Atomique** : Procédure `approve_onboarding_tx` (SQL) pour créer un tenant, un chauffeur, un véhicule et des tarifs en une seule transaction.
- [x] **Onboarding Staging** : Gestion des inscriptions en attente de validation administrative.

---

## ✅ 2. Moteur de Réservation (TERMINÉ)

- [x] **Calcul Backend** : Recalcul systématique du prix côté serveur pour éviter les fraudes.
- [x] **Pricing Rules** : Gestion des tarifs de base, prix au km et tarif minimum par catégorie.
- [x] **Zones & Forfaits** : Gestion des trajets fixes entre zones prédéfinies (Airport, Gare...).
- [x] **Véhicules & Chauffeurs** : Gestion de la capacité des véhicules et des documents chauffeurs.
- [x] **Gestion des Statuts** : Workflow complet de `pending` à `completed` ou `cancelled`.

---

## ✅ 3. Système Financier & Stripe (TERMINÉ)

- [x] **Stripe Checkout** : Intégration du paiement sécurisé par tenant.
- [x] **Webhook Idempotent** : Edge Function `handle_stripe_webhook` avec protection contre les doubles traitements (`stripe_events`).
- [x] **Audit Comptable** : Table `financial_movements` traçant chaque flux (paiement, commission, refund).
- [x] **Refund Support** : Gestion des remboursements totaux et partiels avec recalcul automatique de la TVA et de la commission.
- [x] **Reporting SQL** : Vues `financial_monthly_summary` et `financial_yearly_summary` pour la comptabilité.

---

## ✅ 4. En cours / À Finaliser (V1+)

- [x] **Dashboard Tenant** :
  - [x] **Vue "Missions en ligne"** : Affichage vertical fluide des prochaines courses.
  - [x] **Modale de Détails** : Clic sur une mission pour voir toutes les infos (Client, Trajet, Finance, Statut).
  - [x] **Distinction de service** : Badge visuel pour différencier les "Transferts" des "Mises à Dispo (Hourly)".
- [x] **Multi-Site (Tenant Slug)** : Isolation des tunnels de réservation par slug personnalisé (`site_slug`).
- [x] **Gestion des types de booking** : Ajout de l'énumération `hourly` et gestion visuelle dédiée dans l'ERP.
- [ ] **Export CSV Finance** : Bouton d'export des mouvements pour les experts-comptables depuis le frontend.
- [ ] **Gestion des Frais Stripe** : Arbitrage business sur la répercussion des frais fixes Stripe en cas de refund.

---

## ✅ 6. Validation V1 — Paiement & Normalisation (MARS 2026)

### 🔐 Normalisation Booking → Customer

- **Indépendance stricte** : Suppression des champs legacy `client_name` et `client_email` dans `bookings`.
- **Intégrité référentielle** : `bookings.customer_id` est désormais `NOT NULL`. Un booking ne peut pas exister sans client.
- **Réduction de redondance** : Les clients sont centralisés dans la table `customers` avec email normalisé (trim + lowercase).
- **Structure validée** : `passenger_count` obligatoire, répartition `subtotal_amount` + `vat_amount` = `total_amount`.

### 💳 Pipeline Stripe & Ledger

- **Cycle complet validé** : Du statut `accepted_pending_payment` vers `paid` via Webhook.
- **Source de Vérité** : Le statut `paid` est exclusivement déclenché par le webhook Stripe via l'Edge Function.
- **Financial Movement** : Insertion automatique d'un mouvement de type `payment` lors de la réussite du paiement.
- **Idempotence** : Protection contre le double traitement confirmée.

---

## 🔮 7. Roadmap Future (V2 - V4)

- [ ] **V1.1 (Operational)** :
  - [ ] **Driver Backoffice** (Tableau de bord chauffeur, actions accepter/refuser).
  - [ ] **Workflow Terrain** (En route, Arrivé, Terminé).
  - [ ] **Assignation Chauffeur** (Interface admin stable).
  - [ ] **Transitions Sécurisées SQL** (Trigger de validation des états).
- [ ] **V2 (Pro)** : Facturation automatique PDF, Multi-driver avancé, Analytics avancés.
- [ ] **V3 (ERP)** : Suivi des dépenses (essence, entretien), Gestion de flotte exhaustive.
- [ ] **V4 (Réseau)** : Cercles d'entreprises, Partage de courses entre tenants, Commissions réseau.

---

### 🛡️ Note sur la Documentation

Aucune information historique n'a été supprimée lors de la mise à jour. Les documents ont été migrés d'un état "Prévu" vers un état "Réel" pour refléter la maturité actuelle du code source.
</file>

<file path="src/layouts/AdminLayout.astro">
---
// src/layouts/AdminLayout.astro
import "../styles/global.css";
import { isPlatform } from "../lib/guards";
import Sidebar from "../components/admin/Sidebar.astro";
import InactivityTimeout from "../components/common/InactivityTimeout.astro";

interface Props {
    title: string;
    description?: string;
}

const { title, description } = Astro.props;
const { profile } = Astro.locals;


// Sécurité supplémentaire au niveau du layout
if (!isPlatform(profile)) {
    return Astro.redirect("/");
}
---

<!doctype html>
<html lang="fr" class="dark scroll-smooth">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="generator" content={Astro.generator} />
        <title>{title} | VTC HUB Admin</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;600;800;900&display=swap"
            rel="stylesheet"
        />
        <style is:global>
            :root {
                --accent: 79, 70, 229;
                --accent-light: 224, 204, 250;
                --accent-dark: 49, 10, 101;
                --accent-gradient: linear-gradient(
                    45deg,
                    rgb(var(--accent)),
                    rgb(var(--accent-light)) 30%,
                    white 60%
                );
            }
            html {
                font-family: 'Inter', system-ui, sans-serif;
                background-color: #050505;
                color-scheme: dark;
            }
            .font-title {
                font-family: 'Outfit', 'Inter', sans-serif;
            }
            .glass {
                background: rgba(255, 255, 255, 0.01);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            /* FIX: Dropdowns blanc sur blanc */
            select option {
                background-color: #0f172a; /* Slate 900 */
                color: white;
            }
            select:focus option {
                background-color: #0f172a;
            }
        </style>
    </head>
    <body
        class="bg-[#050505] min-h-screen text-slate-50 selection:bg-indigo-500/30 overflow-x-hidden"
    >
        <Sidebar />

        <main class="md:ml-64 relative min-h-screen flex flex-col p-8 md:p-12 lg:p-20 overflow-hidden">
            <!-- Background Decoration -->
            <div class="absolute top-0 right-0 w-full h-full pointer-events-none opacity-50">
                <div class="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
            </div>

            <!-- Page Header -->
            <header class="relative mb-12 flex items-center justify-between">
                <div>
                    <h1 class="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-2">
                        Backoffice Plateforme
                    </h1>
                    <p class="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white font-title">
                        {title}
                    </p>
                    {description && (
                        <p class="text-slate-500 text-xs md:text-sm mt-2 font-medium tracking-wide">
                            {description}
                        </p>
                    )}
                </div>
                <div class="hidden md:flex items-center gap-4">
                    <div class="px-4 py-2 border rounded-xl bg-white/5 border-white/10 flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span class="text-[10px] font-bold uppercase tracking-widest text-[#555]">Serveur Status: OK</span>
                    </div>
                </div>
            </header>

            <!-- Page Content -->
            <div class="relative z-10 flex-1">
                <slot />
            </div>

            <!-- Footer -->
            <footer class="mt-24 pt-8 border-t border-white/5 text-center">
                <p class="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                    &copy; {new Date().getFullYear()} VTC HUB SaaS — TOUS DROITS RÉSERVÉS — V1.0 Stable
                </p>
            </footer>
        </main>

        <script>
            // Client-side interactions
            document.addEventListener('astro:page-load', () => {
                // Future JS interactions
            });
        </script>
        <InactivityTimeout timeoutMinutes={30} />
    </body>
</html>
</file>

<file path="src/pages/app/settings.astro">
---
// src/pages/app/settings.astro
import AppLayout from "../../layouts/AppLayout.astro";
import { requireTenantRole } from "../../lib/guards";
import { createAdminClient } from "../../lib/supabase/server";

const { profile } = Astro.locals;

// Protection Guard : Owner uniquement
try {
    requireTenantRole(profile, ["owner"]);
} catch (e) {
    return Astro.redirect("/app/dashboard");
}

const supabaseAdmin = createAdminClient();

// 1️⃣ Récupérer les infos du tenant pour la confirmation
const { data: tenant } = await supabaseAdmin
  .from("tenants")
  .select("name, logo_url")
  .eq("id", profile!.tenant_id)
  .single();

const tenantName = tenant?.name || "Inconnu";
const confirmationPhrase = `SUPPRESSION COMPTE ${tenantName}`;
---

<AppLayout title="Paramètres - Owner">
    <div id="settings-page" data-confirmation-phrase={confirmationPhrase} class="flex-1 flex flex-col p-12 overflow-hidden h-full relative">
        <!-- FIXED HEADER -->
        <div class="flex-shrink-0 border-b border-white/5 pb-10 mb-10">
            <span
                class="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] font-black tracking-widest text-red-400 uppercase"
                >Administration</span
            >
            <h1
                class="text-4xl font-black italic mt-4 uppercase tracking-tighter text-white"
            >
                Paramètres Entreprise
            </h1>
            <p class="text-slate-500 mt-2 font-medium">
                Configuration critique du tenant (Réservé au Propriétaire)
            </p>
        </div>

        <!-- SCROLLABLE CONTENT -->
        <div
            class="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8 pb-20"
        >
            <div
                class="glass p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.01]"
            >
                <h3
                    class="text-xl font-black uppercase italic tracking-tighter text-white mb-8 flex items-center gap-3"
                >
                    <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    Identité Visuelle
                </h3>

                <div class="flex flex-col md:flex-row gap-10 items-start">
                    <!-- Logo Preview -->
                    <div class="relative group">
                        <div class="w-40 h-40 bg-white/5 border-2 border-dashed border-white/10 rounded-[2rem] flex items-center justify-center overflow-hidden transition-all group-hover:border-indigo-500/50">
                            {tenant?.logo_url ? (
                                <img id="logo-preview" src={tenant.logo_url} class="w-full h-full object-contain p-4" />
                            ) : (
                                <div id="logo-placeholder" class="text-slate-600 flex flex-col items-center gap-2">
                                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p class="text-[8px] font-black uppercase tracking-widest text-center">Aucun Logo</p>
                                </div>
                            )}
                            <img id="logo-preview-new" class="hidden w-full h-full object-contain p-4" />
                        </div>
                    </div>

                    <!-- Upload Controls -->
                    <div class="flex-1 space-y-6 w-full">
                        <div>
                            <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Logo de l'entreprise</p>
                            <p class="text-xs text-slate-400 mb-6 italic leading-relaxed">Format recommandé : PNG transparent ou SVG. Taille max : 2Mo.</p>

                            <div class="flex flex-wrap gap-4">
                                <label class="cursor-pointer px-6 py-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all active:scale-95 inline-flex items-center gap-2">
                                    <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    Choisir un fichier
                                    <input type="file" id="logo-input" class="hidden" accept="image/*" />
                                </label>

                                <button id="save-logo-btn" class="hidden px-6 py-4 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Enregistrer le logo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="glass p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.01]"
            >
                <h3
                    class="text-xl font-black uppercase italic tracking-tighter text-white mb-8 flex items-center gap-3"
                >
                    <span class="w-2 h-2 rounded-full bg-slate-500"></span>
                    Informations Générales
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div class="space-y-4">
                        <label
                            class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 block"
                            >Nom de l'entreprise</label
                        >
                        <input
                            type="text"
                            class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none font-bold text-lg"
                            value={tenantName}
                            readonly
                        />
                    </div>
                </div>
            </div>

            <div
                class="glass p-10 rounded-[2.5rem] border border-red-500/10 bg-red-500/[0.02]"
            >
                <h3
                    class="text-xl font-black mb-2 text-red-500 italic uppercase italic tracking-tighter"
                >
                    Zone de Danger
                </h3>
                <p class="text-slate-500 mb-8 font-medium italic">
                    La suppression de votre compte désactivera votre société, votre site chauffeur et votre accès au dashboard. Cette action est irréversible.
                </p>
                <button
                    id="open-delete-modal"
                    class="px-8 py-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-xl shadow-red-900/10 active:scale-95"
                >
                    Supprimer le compte entreprise
                </button>
            </div>
        </div>
    </div>

    <!-- MODAL DE CONFIRMATION SUPPRESSION -->
    <div id="delete-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-6 opacity-0 pointer-events-none transition-all duration-300">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm modal-overlay"></div>
        <div class="relative glass max-w-lg w-full rounded-[2.5rem] border border-red-500/20 shadow-2xl p-10 transform scale-95 transition-all duration-300">
            <div class="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500 mb-8 mx-auto sm:mx-0">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>

            <h2 class="text-3xl font-black italic uppercase text-white mb-4 tracking-tighter">Confirmation de suppression</h2>

            <p class="text-slate-400 font-medium mb-6 leading-relaxed italic">
                Vous êtes sur le point de supprimer définitivement le compte de votre société :<br/>
                <strong class="text-red-500 uppercase tracking-tighter text-xl block mt-2">{tenantName}</strong>
            </p>

            <div class="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 mb-8">
                <p class="text-[10px] font-black uppercase tracking-widest text-red-400 mb-3 italic">Phrase de confirmation requise :</p>
                <p class="text-white font-mono text-sm font-bold bg-black/40 p-4 rounded-xl border border-white/5 select-all" id="phrase-target">
                    {confirmationPhrase}
                </p>
            </div>

            <div class="space-y-4 mb-8">
                <input
                    type="text"
                    id="confirmation-input"
                    placeholder="Écrire la phrase de confirmation"
                    class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-red-500/50 focus:outline-none font-bold transition-all"
                />
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
                <button id="cancel-delete" class="px-8 py-4 glass border border-white/10 rounded-2xl font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all order-2 sm:order-1">
                    Annuler
                </button>
                <button
                    id="confirm-delete-btn"
                    disabled
                    class="flex-1 px-8 py-4 bg-red-600/20 border border-red-600/20 text-red-600/40 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-red-900/20 disabled:cursor-not-allowed order-1 sm:order-2"
                >
                    Supprimer définitivement
                </button>
            </div>
        </div>
    </div>

    <style>
        .glass {
            background: rgba(10, 10, 11, 0.8);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }
        #delete-modal.is-active {
            opacity: 1;
            pointer-events: auto;
        }
        #delete-modal.is-active > div:last-child {
            transform: scale(1);
        }
    </style>

    <script>
        import { supabase } from "@/lib/supabase/client";

        const container = document.getElementById('settings-page');
        const confirmationPhrase = container?.getAttribute('data-confirmation-phrase');

        const openBtn = document.getElementById('open-delete-modal');
        const modal = document.getElementById('delete-modal');
        const cancelBtn = document.getElementById('cancel-delete');
        const confirmBtn = document.getElementById('confirm-delete-btn') as HTMLButtonElement;
        const input = document.getElementById('confirmation-input') as HTMLInputElement;
        const overlay = document.querySelector('.modal-overlay');

        // --- GESTION LOGO ---
        const logoInput = document.getElementById('logo-input') as HTMLInputElement;
        const saveLogoBtn = document.getElementById('save-logo-btn') as HTMLButtonElement;
        const logoPreviewOld = document.getElementById('logo-preview');
        const logoPlaceholder = document.getElementById('logo-placeholder');
        const logoPreviewNew = document.getElementById('logo-preview-new') as HTMLImageElement;
        let selectedLogoFile = null;

        logoInput?.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (!file) return;

            if (file.size > 2 * 1024 * 1024) {
                alert("Le fichier est trop volumineux (Max 2Mo)");
                return;
            }

            selectedLogoFile = file;
            const url = URL.createObjectURL(file);

            if (logoPreviewOld) logoPreviewOld.classList.add('hidden');
            if (logoPlaceholder) logoPlaceholder.classList.add('hidden');

            if (logoPreviewNew) {
                logoPreviewNew.src = url;
                logoPreviewNew.classList.remove('hidden');
            }

            if (saveLogoBtn) saveLogoBtn.classList.remove('hidden');
        });

        saveLogoBtn?.addEventListener('click', async () => {
            if (!selectedLogoFile) return;

            saveLogoBtn.disabled = true;
            saveLogoBtn.innerText = "TÉLÉCHARGEMENT...";
            console.log("[Logo] Start upload for:", selectedLogoFile.name);

            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) throw new Error("Session introuvable");

                const { data: profileData, error: profileErr } = await supabase
                    .from('profiles')
                    .select('tenant_id')
                    .eq('id', user.id)
                    .single();

                if (profileErr) throw profileErr;
                const tid = profileData?.tenant_id;
                if (!tid) throw new Error("ID Entreprise non trouvé (Tenant ID)");

                const fileExt = selectedLogoFile.name.split('.').pop()?.toLowerCase();
                const fileName = `logos/${tid}/logo.${fileExt}`;

                // 1. Upload to Storage
                const { error: uploadError } = await supabase.storage
                    .from('assets')
                    .upload(fileName, selectedLogoFile, {
                        upsert: true,
                        contentType: selectedLogoFile.type
                    });

                if (uploadError) throw uploadError;

                // 2. Get Public URL with cache buster
                const { data: { publicUrl } } = supabase.storage
                    .from('assets')
                    .getPublicUrl(fileName);

                const finalUrl = `${publicUrl}?t=${Date.now()}`;

                // 3. Update Tenant
                const { error: updateError } = await supabase
                    .from('tenants')
                    .update({ logo_url: finalUrl })
                    .eq('id', tid);

                if (updateError) throw updateError;

                console.log("[Logo] Success! New URL:", finalUrl);
                alert("Logo mis à jour avec succès !");
                window.location.reload();
            } catch (err) {
                console.error("[Logo] Error:", err);
                alert("Erreur lors du téléchargement du logo : " + err.message);
                saveLogoBtn.disabled = false;
                saveLogoBtn.innerText = "Enregistrer le logo";
            }
        });

        const toggleModal = () => {
            modal?.classList.toggle('is-active');
            document.body.classList.toggle('overflow-hidden');
            if (modal?.classList.contains('is-active')) {
                input.value = '';
                confirmBtn.disabled = true;
                confirmBtn.classList.add('bg-red-600/20', 'text-red-600/40');
                confirmBtn.classList.remove('bg-red-600', 'text-white', 'hover:bg-red-500');
            }
        };

        openBtn?.addEventListener('click', toggleModal);
        cancelBtn?.addEventListener('click', toggleModal);
        overlay?.addEventListener('click', toggleModal);

        input?.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            const val = target.value;
            if (val === confirmationPhrase) {
                confirmBtn.disabled = false;
                confirmBtn.classList.remove('bg-red-600/20', 'text-red-600/40');
                confirmBtn.classList.add('bg-red-600', 'text-white', 'hover:bg-red-500');
            } else {
                confirmBtn.disabled = true;
                confirmBtn.classList.add('bg-red-600/20', 'text-red-600/40');
                confirmBtn.classList.remove('bg-red-600', 'text-white', 'hover:bg-red-500');
            }
        });

        confirmBtn?.addEventListener('click', async () => {
            confirmBtn.disabled = true;
            confirmBtn.innerText = "SUPPRESSION...";

            try {
                const { data, error } = await supabase.functions.invoke('delete-tenant-account');

                if (error) throw error;

                alert("Compte supprimé avec succès.");
                await supabase.auth.signOut();
                window.location.href = "/";
            } catch (err) {
                console.error(err);
                alert("Une erreur est survenue lors de la suppression.");
                confirmBtn.disabled = false;
                confirmBtn.innerText = "Supprimer définitivement";
            }
        });

        // Close on Escape
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal?.classList.contains('is-active')) {
                toggleModal();
            }
        });
    </script>
</AppLayout>
</file>

<file path="src/pages/signup.astro">
---
// src/pages/signup.astro
import MainLayout from "../layouts/MainLayout.astro";
---

<MainLayout title="Inscription">
	<div
		class="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4"
	>
		<div
			class="glass p-10 rounded-3xl w-full max-w-md shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700"
		>
			<div class="flex justify-center mb-6">
				<span
					class="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase"
				>
					Inscription
				</span>
			</div>
			<div class="text-center mb-8">
				<h1
					class="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-white"
				>
					Rejoins l'aventure
				</h1>
				<p class="text-slate-400">
					Crée ton compte pour commencer ton onboarding
				</p>
			</div>

			<form id="signup-form" class="space-y-6">
				<div class="space-y-2">
					<label
						for="email"
						class="text-sm font-medium text-slate-300"
						>Email professionnel</label
					>
					<input
						type="email"
						id="email"
						name="email"
						required
						placeholder="nom@entreprise.fr"
						class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-inter"
					/>
				</div>

				<div class="space-y-2">
					<label
						for="password"
						class="text-sm font-medium text-slate-300"
						>Mot de passe</label
					>
					<input
						type="password"
						id="password"
						name="password"
						required
						placeholder="••••••••"
						class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-inter"
					/>
				</div>

				<button
					type="submit"
					id="submit-btn"
					class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
				>
					<span
						class="btn-text group-hover:tracking-wider transition-all duration-300"
						>S'inscrire</span
					>
					<div
						class="loader-container hidden absolute inset-0 flex items-center justify-center bg-indigo-600"
					>
						<svg
							class="animate-spin h-5 w-5 text-white"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					</div>
				</button>
			</form>

			<div
				id="message"
				class="mt-6 text-center text-sm font-medium min-h-[20px]"
			>
			</div>
		</div>
	</div>
</MainLayout>

<script>
	import { supabase } from "@/lib/supabase/client";

	const form = document.querySelector("#signup-form") as HTMLFormElement;
	const messageEl = document.querySelector("#message") as HTMLDivElement;
	const submitBtn = document.querySelector(
		"#submit-btn",
	) as HTMLButtonElement;
	const loader = document.querySelector(
		".loader-container",
	) as HTMLDivElement;
	const btnText = document.querySelector(".btn-text") as HTMLSpanElement;

	form?.addEventListener("submit", async (e) => {
		e.preventDefault();

		const formData = new FormData(form);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		// UI State: Loading
		submitBtn.disabled = true;
		loader.classList.remove("hidden");
		btnText.style.opacity = "0";
		messageEl.textContent = "";

		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			});

			if (error) {
				if (
					error.status === 400 ||
					error.message.toLowerCase().includes("already registered")
				) {
					messageEl.innerHTML = `Utilisateur déjà inscrit. <a href="/login" class="text-indigo-400 font-bold underline">Connecte-toi ici</a>`;
					messageEl.className =
						"mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center text-sm font-medium text-amber-400";
				} else {
					messageEl.textContent = "Erreur : " + error.message;
					messageEl.className =
						"mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center text-sm font-medium text-red-400";
				}
				submitBtn.disabled = false;
				loader.classList.add("hidden");
				btnText.style.opacity = "1";
			} else {
				// 📧 Envoi email de bienvenue (Non bloquant pour l'UX utilisateur)
				try {
					await supabase.functions.invoke("send-email", {
						body: {
							to: email,
							subject: "Bienvenue sur VTC MVP ! 🚀",
							html: `
								<div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
									<h1 style="color: #4f46e5;">Bienvenue sur VTC MVP !</h1>
									<p>Salut,</p>
									<p>Ton compte vient d'être créé avec succès. Tu peux maintenant commencer ton processus d'onboarding.</p>
									<a href="${window.location.origin}/onboarding"
									   style="display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
										Commencer mon onboarding
									</a>
									<hr style="margin-top: 40px; border: none; border-top: 1px solid #eee;" />
									<p style="font-size: 12px; color: #666;">Ce mail est envoyé automatiquement par notre plateforme Elite de VTC.</p>
								</div>
							`
						}
					});
				} catch (emailErr) {
					console.error("Email error (silent):", emailErr);
				}

				messageEl.textContent = "Compte créé ! Redirection...";
				messageEl.className =
					"mt-6 text-center text-sm font-medium text-emerald-400";

				window.location.href = "/onboarding";
			}
		} catch (err) {
			console.error(err);
			messageEl.textContent = "Une erreur technique est survenue.";
			messageEl.className =
				"mt-6 text-center text-sm font-medium text-red-400";
			submitBtn.disabled = false;
			loader.classList.add("hidden");
			btnText.style.opacity = "1";
		}
	});
</script>
</file>

<file path="README.md">
Voici la **version corrigée et réellement alignée Production-Ready** de ton `README.md`.

Elle intègre le hardening SQL appliqué aujourd’hui sans alourdir le document.

Tu peux remplacer intégralement ton README par ceci.

---

# 🚖 VTC HUB — ERP SaaS pour Chauffeurs VTC

VTC HUB est un **ERP SaaS multi-tenant** conçu pour les chauffeurs VTC souhaitant structurer, piloter et développer leur activité.

La plateforme fournit :

- Un **backoffice professionnel**
- Un **moteur de réservation**
- Une gestion tarifaire simple
- Un site de réservation optionnel
- Une architecture évolutive vers un ERP complet

VTC HUB n’est pas une marketplace.
Chaque chauffeur reste indépendant et encaisse directement ses paiements.

---

# 🎯 Positionnement Produit

VTC HUB est un **ERP VTC évolutif** :

> Organisation, gestion et performance — sans intermédiaire financier.

Chaque entreprise :

- Possède son propre tenant sécurisé
- Connecte son propre Stripe (optionnel)
- Gère ses courses et son activité de manière autonome

---

# 🚀 Stack Technique

- **Frontend & SSR** : Astro (Output: Server)
- **Design** : Tailwind CSS
- **Infrastructure** : Cloudflare Pages
- **Backend & Database** : Supabase (Postgres + Auth + RLS)
- **Logique métier critique** : RPC SQL transactionnelles (PL/pgSQL)
- **Sécurité structurelle** : Contraintes SQL + Triggers + Index

---

# 🏗️ Architecture & Sécurité

## Multi-Tenant Strict

Chaque entreprise est isolée via :

```
tenant_id
```

Isolation garantie par :

- Row Level Security (RLS) activée sur toutes les tables sensibles
- Policies basées sur `current_tenant_id()`
- Middleware SSR
- SERVICE_ROLE non exposée

Aucune fuite inter-tenant possible au niveau base de données.

---

## Activation Sécurisée

Le passage de l’onboarding au statut actif est géré par une **transaction SQL atomique**, garantissant :

- Création cohérente du tenant
- Mise à jour du profile
- Intégrité complète des données

L’onboarding est isolé par RLS et non modifiable après validation (hors service role).

---

# 🔒 Production Hardening (V1)

La V1 est sécurisée au niveau base de données.

Les garanties suivantes sont appliquées :

### Booking

- `status` ENUM strict
- `status` NOT NULL
- Champs critiques immuables après `pending`
  - total_amount
  - pickup_address
  - dropoff_address
  - pickup_time
  - payment_mode

- Protection contre modification frauduleuse après acceptation

### Intégrité Financière

- 1 commission maximum par booking (`UNIQUE booking_id`)
- Protection contre double génération de commission
- Sécurité déplacée au niveau SQL

### Protection Concurrence

- 1 seul share accepté par booking (index partiel)
- Protection contre double acceptation simultanée

### Scope V1 Verrouillé

- Mono-cercle forcé en base
- Aucune dérive marketplace possible

---

# 🔄 Flux Utilisateur (V1)

1. Inscription
2. Onboarding (profil + véhicule + tarification)
3. Validation admin
4. Création automatique du tenant
5. Accès au backoffice

---

# 📦 Fonctionnalités Actuelles — V1 (Stable)

## 🔐 Auth & Structure

- Multi-tenant sécurisé par RLS
- Owner par défaut
- Support multi-driver (données isolées)

---

## 🚗 Booking Engine V1 (Paiement & Annulation)

- Création de course avec calcul automatique du prix backend
- **Paiement Stripe Checkout** intégré
- **Gestion des annulations** avec motifs
- Statuts :
  - `pending`
  - `accepted_pending_payment`
  - `paid`
  - `completed`
  - `cancelled`
  - `refunded`

---

## 💰 Layer Financière & Audit

- **Audit Trail Immutable** : Chaque mouvement financier est tracé (`financial_movements`).
- **Refund Support** : Gestion automatique des refunds total/partiel via Webhook.
- **Idempotence Stripe** : Protection contre les doubles paiements et rejeux d'événements.
- **TVA & Commission** : Calcul automatique et proportionnel sur les refunds.

---

## 📊 Reporting & Fiscalité

- **Reporting Mensuel/Annuel** via vues SQL performantes.
- **Détail Fiscal** prêt pour export comptable (TVA, Revenu Net).
- **Multi-tenant isolation** : Chaque chauffeur ne voit que ses propres chiffres.

---

## 🚘 Véhicule & Pricing

- Catégorie de service (Berline, Van, etc.)
- Capacité (Passagers/Bagages)
- Pricing rules (Base, Km, Minimum fare)

---

## 💳 Paiement

- Stripe Checkout natif par tenant.
- Traitement asynchrone sécurisé via **Edge Functions**.
- Whitelist d'événements Stripe (`checkout.session.completed`, `charge.refunded`).

---

# 🗺️ Roadmap Produit

## 🚀 V1 — ERP Stable & Production-Ready

- Multi-tenant sécurisé
- Booking Engine validé
- Pricing simple
- Dashboard KPI
- Hardening SQL appliqué
- Stripe optionnel

---

## 📦 V2 — ERP Professionnel

- Multi-driver avancé
- Permissions fines
- Assignation chauffeur
- Facturation automatique
- Génération PDF
- Export comptable
- Rapports mensuels

---

## 📊 V3 — ERP Financier Avancé

- Suivi cash journalier / mensuel / annuel
- Comptes rendus automatiques
- Analytics détaillés
- Gestion dépenses

---

## 🌐 V4 — Réseau & Cercle

- Parrainage contrôlé
- Cercle d’entreprises
- Partage de courses
- Commission réseau

---

# 🛠️ Installation & Développement

```bash
npm install
npm run dev
npm run build
```

---

# 📜 Licence

Projet privé — ERP propriétaire.

---

Maintenant la documentation est alignée avec la réalité technique.
</file>

<file path="docs/cheklist_audit.md">
Parfait.
On va réaligner cette checklist avec **V1 réel uniquement**.

Actuellement elle contient :

- Commission (V4)
- Partage booking (V4)
- Circle (V4)
- Edge functions non utilisées
- Éléments financiers non actifs

On garde :

- Multi-tenant
- Booking V1
- Activation atomique
- Stripe non centralisé
- Structure ERP V1

---

# ✅ VERSION CORRIGÉE — `docs/audit-checklist.md` (Alignée V1)

Tu peux remplacer ton fichier par ceci.

---

# 🔎 Technical Audit Checklist — VTC HUB (V1)

---

# 🧱 1️⃣ Architecture & Structure

### ✅ Multi-tenant isolation

- [x] Toutes les tables métier contiennent `tenant_id`
- [x] Aucun accès cross-tenant possible
- [x] RLS activé sur toutes les tables sensibles
- [x] Toutes les requêtes filtrées par `tenant_id`
- [x] Isolation renforcée via fonction SQL interne (Cloud)

---

### ✅ Activation atomique

- [x] `approve_onboarding_tx` existe
- [x] Fonction en `plpgsql`
- [x] Rollback testé
- [x] Impossible d’activer deux fois le même onboarding
- [x] Aucun insert partiel possible

---

### ✅ Onboarding staging

- [x] onboarding séparé de tenants
- [x] status enum strict (`pending`, `approved`, `rejected`)
- [x] Vue `onboarding_admin_view` pour la jointure avec `auth.users`
- [x] `primary_domain` unique

---

# 🔐 2️⃣ Sécurité

---

### Auth

- [x] profiles.id = auth.users.id
- [x] Trigger `handle_new_user` testé
- [x] Session SSR via cookies
- [x] platform_role séparé de tenant_role

---

### RLS

- [x] RLS activé sur :
  - profiles
  - tenants
  - drivers
  - vehicles
  - pricing_rules
  - bookings

- [ ] Policy SELECT own
- [ ] Policy UPDATE own
- [ ] Aucune route client utilisant service_role

---

### Secrets

- [ ] SERVICE_ROLE jamais exposé côté client
- [ ] Pas de variable sensible en `PUBLIC_`
- [ ] .env non commité
- [ ] Variables Cloudflare sécurisées

---

# 🗄 3️⃣ Database Integrity

---

### Contraintes

- [x] primary_domain UNIQUE
- [x] drivers.first_name NOT NULL
- [x] drivers.last_name NOT NULL
- [x] drivers.phone NOT NULL
- [x] drivers.license_number NOT NULL
- [x] vehicles.capacity type correct
- [x] distance_km type numeric
- [x] total_amount non nullable

---

### Defaults

- [ ] created_at default now() partout
- [ ] status default correct

---

### Indexes

- [ ] Index sur tenant_id
- [ ] Index sur bookings.current_tenant_id
- [ ] Index sur primary_domain

---

# ⚙️ 4️⃣ Business Logic Validation

---

### Onboarding

- [ ] Impossible de soumettre sans champs obligatoires
- [ ] Impossible d’activer deux fois
- [ ] Impossible d’utiliser domain déjà pris

---

### Activation

- [ ] Tenant créé
- [ ] Profile lié
- [ ] Driver créé
- [ ] Vehicle créé
- [ ] Pricing générée
- [ ] Status onboarding = approved

---

### Booking V1

- [x] Prix recalculé backend
- [x] minimum_fare appliqué
- [x] total_amount jamais accepté tel quel
- [x] Statuts contrôlés
- [x] Booking lié au bon tenant
- [x] **Normalisation Customer** : `customer_id` obligatoire et validé.

---

### Middleware

- [x] Non connecté → /login
- [x] Platform Role → /admin/dashboard
- [x] Tenant Role 'pending' → /onboarding (Forcé)
- [x] Tenant actif (tenant_id) → /app/dashboard

---

# 🌐 5️⃣ Frontend / SSR

- [ ] output: "server"
- [ ] Adapter Cloudflare configuré
- [ ] Middleware testé
- [ ] Routes admin protégées
- [ ] Aucune clé sensible exposée

---

# 💳 6️⃣ Paiement & Audit Financier (Stripe)

---

### Stripe Webhook

- [x] Edge Function `handle_stripe_webhook` active
- [x] Validation de signature Stripe implémentée
- [x] Idempotence via `stripe_events` testée (pas de replay)
- [x] Metadata `booking_id` systématiquement vérifié
- [x] Unicité `stripe_payment_intent_id` garantie
- [x] **Cycle Paid validé** : Status change via webhook uniquement.

---

### Audit Financier (Ledger Natif)

- [x] Table `financial_movements` alimentée automatiquement
- [x] `movement_type` géré (payment, commission, refund, commission_reversal)
- [x] `direction` (credit/debit) correct selon type
- [x] Calcul HT / TVA / TTC cohérent
- [x] **Snapshots de taux** (commission plateforme/chauffeur) figés lors de l'insert
- [x] Pas de modification/suppression manuelle autorisée (Audit trail)

---

### Refund & Annulation

- [x] Webhook `refund.created` implémenté
- [x] Refund partiel proportionnel testé
- [x] Inversion commission (`commission_reversal`) proportionnelle basée sur snapshot
- [x] Statut booking mis à jour après refund Stripe (cancelled_refunded)
- [x] Traçabilité `stripe_refund_id` dans le ledger

---

### Reporting

- [ ] Vue `financial_monthly_summary` fonctionnelle
- [ ] Vue `financial_fiscal_detail` exploitable pour audit
- [ ] Filtrage RLS sur les vues par `tenant_id`

---

# 🧪 7️⃣ Testing Checklist

---

### Cas fonctionnels

- [ ] Signup
- [ ] Onboarding
- [ ] Pending page
- [ ] Activation
- [ ] Reconnexion
- [ ] Création booking
- [ ] Changement statut booking
- [ ] KPI dashboard

---

### Cas d’erreur

- [ ] Duplicate domain
- [ ] Missing required fields
- [ ] Activation double
- [ ] Unauthorized access
- [ ] Tentative cross-tenant

---

# 🚀 8️⃣ Scalability Readiness

- [ ] Pas de SELECT \*
- [ ] Pagination prévue sur bookings
- [ ] Pas de N+1 queries
- [ ] Index sur colonnes fréquentes

---

# 🧾 9️⃣ Code Hygiene

- [ ] Pas de console.log en production
- [ ] Pas de routes test actives
- [ ] Types stricts
- [ ] Pas de logique métier dupliquée

---

# 🛡 🔟 Production Readiness

- [ ] Gestion erreurs centralisée
- [ ] Logs monitoring activé
- [ ] Backup strategy connue
- [ ] Plan Supabase adapté

---

# 🧠 Audit Outcome

### 🟢 Green

ERP V1 stable et prêt à vendre.

### 🟡 Yellow

Fonctionnel mais fragile.

### 🔴 Red

Risque sécurité ou incohérence données.

---

# 🎯 Résultat

Ta documentation est maintenant :

- 100% alignée V1
- Sans fonctionnalités futures mélangées
- Cohérente avec ton ERP-first model

---

On a terminé :

- README
- database.md
- flows.md
- architecture.md
- security.md
- decisions.md
- audit-checklist.md

Documentation V1 complète.

---

👉 Prochaine étape stratégique :

On passe en mode “produit vendable”.

Veux-tu :

1️⃣ Structurer l’offre commerciale (pricing + packaging)
ou
2️⃣ Stabiliser l’UX dashboard V1 avant mise en prod ?
</file>

<file path="src/layouts/MainLayout.astro">
---
// src/layouts/MainLayout.astro
import "../styles/global.css";

interface Props {
    title: string;
}

const { title } = Astro.props;
const { user } = Astro.locals;
---

<!doctype html>
<html lang="fr" class="dark">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="generator" content={Astro.generator} />
        <title>{title} | VTC Premium</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
        />
    </head>
    <body
        class="premium-gradient min-h-screen text-slate-50 selection:bg-indigo-500/30"
    >
        <div
            class="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20"
        >
        </div>

        <nav
            class="sticky top-0 z-50 w-full glass border-b border-white/5 px-6 py-4"
        >
            <div class="max-w-7xl mx-auto flex items-center justify-between">
                <a
                    href="/"
                    class="flex items-center gap-2 group transition-opacity hover:opacity-80"
                >
                    <div
                        class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform"
                    >
                        <span class="text-white font-bold text-xl">V</span>
                    </div>
                    <span
                        class="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400"
                    >
                        VTC HUB
                    </span>
                </a>

                <div class="flex items-center gap-6">
                    {
                        user ? (
                            <button
                                id="logout-btn"
                                class="text-sm font-bold text-red-400/80 hover:text-red-400 transition-colors"
                            >
                                Déconnexion
                            </button>
                        ) : (
                            <a
                                href="/login"
                                class="text-sm font-bold text-slate-400 hover:text-white transition-colors"
                            >
                                Connexion
                            </a>
                        )
                    }
                </div>
            </div>
        </nav>

        <main class="relative z-10">
            <slot />
        </main>

        <footer class="mt-10 sm:mt-20 border-t border-white/5 py-8 sm:py-12 px-6 glass">
            <div
                class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm"
            >
                <div>
                    &copy; {new Date().getFullYear()} VTC HUB. Précision. Luxe. Excellence.
                </div>
                <div class="flex items-center gap-4">
                    <!-- Bouton Admin retiré -->
                </div>
            </div>
        </footer>

        <script>
            import { supabase } from "@/lib/supabase/client";

            const logoutBtn = document.querySelector("#logout-btn");

            logoutBtn?.addEventListener("click", async () => {
                await supabase.auth.signOut();
                window.location.href = "/";
            });
        </script>
    </body>
</html>
</file>

<file path="src/pages/app/pricing.astro">
---
// src/pages/app/pricing.astro
import AppLayout from "../../layouts/AppLayout.astro";
import { requireTenantRole } from "../../lib/guards";
import { createAdminClient } from "../../lib/supabase/server";
import { TransferManager } from "@/components/pricing/TransferManager";

const { profile } = Astro.locals;

// Protection Guard : Owner + Manager
try {
    requireTenantRole(profile, ["owner", "manager"]);
} catch (e) {
    return Astro.redirect("/app/dashboard");
}

const supabaseAdmin = createAdminClient();

// 1️ Récupérer les règles réelles du tenant
const { data: rules, error } = await supabaseAdmin
    .from("pricing_rules")
    .select("*")
    .eq("tenant_id", profile!.tenant_id)
    .order("service_category", { ascending: true });

// 2️ Récupérer les infos onboarding pour l'initialisation éventuelle
const { data: onboarding } = await supabaseAdmin
    .from("onboarding")
    .select("*")
    .eq("profile_id", profile!.id)
    .maybeSingle();

if (error) {
    console.error("Pricing fetch error:", error);
}
---

<AppLayout title="Gestion Pricing">
    <div class="flex-1 flex flex-col p-8 md:p-12 overflow-hidden h-full relative">
        <!-- HEADER -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 flex-shrink-0">
            <div>
                <span class="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black tracking-widest text-indigo-400 uppercase">Configuration Financière</span>
                <h1 class="text-4xl font-black mt-4 uppercase tracking-tighter text-white">Tarification</h1>
                <p class="text-slate-500 mt-2 font-medium">Gérez vos forfaits et vos tarifs au kilomètre.</p>
            </div>

            <div class="flex flex-wrap items-center gap-4">
                <!-- TABS -->
                <div class="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                   <button id="tab-standard" class="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">Standard</button>
                   <button id="tab-transfer" class="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-500 hover:text-white">Transferts (Fixes)</button>
                </div>

                <!-- HEADER ACTIONS (TABS ONLY NOW) -->
                <div id="actions-transfer" class="hidden"></div>
            </div>
        </div>

        <!-- SCROLLABLE CONTENT -->
        <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">

            <!-- SECTION 1: STANDARD PRICING -->
            <div id="section-standard" class="space-y-8 animate-in fade-in duration-500">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-black uppercase tracking-tighter text-white">Grille KM / Heure</h3>
                    <button id="add-rule-btn" class="px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-xl shadow-white/5">
                        + Ajouter un service
                    </button>
                </div>

                <div class="glass rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.01]">
                    <div class="table-container">
                        <table class="w-full text-left border-collapse min-w-[800px]">
                            <thead class="bg-white/5 sticky top-0 z-10">
                                <tr class="border-b border-white/5">
                                    <th class="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Service</th>
                                    <th class="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Base (€)</th>
                                    <th class="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">KM (€)</th>
                                    <th class="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Heure (€)</th>
                                    <th class="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Min. (€)</th>
                                    <th class="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-white/5">
                                {rules && rules.length > 0 ? (
                                    rules.map((r) => (
                                        <tr class="hover:bg-white/5 transition-colors group">
                                            <td class="px-8 py-8">
                                                <div class="flex items-center gap-3">
                                                    <div class={`w-2 h-2 rounded-full ${r.active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`}></div>
                                                    <span class="font-black text-white uppercase tracking-tighter text-lg">{r.service_category}</span>
                                                </div>
                                            </td>
                                            <td class="px-8 py-8 text-white font-bold tabular-nums text-lg">{r.base_price?.toFixed(2)}</td>
                                            <td class="px-8 py-8 text-indigo-400 font-bold tabular-nums text-lg">{r.price_per_km?.toFixed(2)}</td>
                                            <td class="px-8 py-8 text-amber-400 font-bold tabular-nums text-lg">{r.price_per_hour?.toFixed(2)}</td>
                                            <td class="px-8 py-8 text-slate-300 font-medium tabular-nums text-lg">{r.minimum_fare?.toFixed(2)}</td>
                                            <td class="px-8 py-8 text-right">
                                                <button
                                                    class="edit-rule-btn px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white transition-all text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/5"
                                                    data-rule={JSON.stringify(r)}
                                                >
                                                    Modifier
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colspan="6" class="px-8 py-20 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">Aucun tarif configuré</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- SECTION 2: TRANSFERS -->
            <div id="section-transfer" class="hidden space-y-8 animate-in fade-in duration-500">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-black uppercase tracking-tighter text-white">Forfaits Point à Point</h3>
                    <div class="flex gap-2">
                        <button id="btn-new-transfer-content" class="px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-xl shadow-white/5 whitespace-nowrap">
                            + Nouveau Forfait
                        </button>
                        <button id="btn-manage-zones" class="px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-xl shadow-white/5 whitespace-nowrap">
                            Zones
                        </button>
                    </div>
                </div>
                <TransferManager client:only="react" tenantId={profile!.tenant_id!} />
            </div>
        </div>
    </div>

    <!-- MODAL EDIT/ADD -->
    <div id="pricing-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-6 opacity-0 pointer-events-none transition-all duration-300">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm modal-overlay"></div>
        <div class="relative glass max-w-lg w-full rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden transform scale-95 transition-all duration-300">
            <div class="p-10 sm:p-12">
                <div class="flex items-center gap-4 mb-8">
                    <div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h2 id="modal-title" class="text-3xl font-black uppercase text-white tracking-tighter">Édition Tarif</h2>
                        <p class="text-slate-500 text-xs font-bold uppercase tracking-widest">Paramètres financiers du service</p>
                    </div>
                </div>

                <form id="pricing-form" class="space-y-6" data-tenant-id={profile?.tenant_id} data-onboarding={JSON.stringify(onboarding)}>
                    <input type="hidden" name="rule_id" id="rule-id">

                    <div class="grid grid-cols-2 gap-6">
                        <div class="col-span-2 sm:col-span-1">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Nom du Service</label>
                            <input type="text" name="service_category" id="service-category" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" placeholder="E.g. BUSINESS">
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Base (€)</label>
                            <input type="number" step="0.01" name="base_price" id="base-price" required class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold tabular-nums">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Prix / KM (€)</label>
                            <input type="number" step="0.01" name="price_per_km" id="price-per-km" required class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold tabular-nums">
                        </div>
                        <div>
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Prix / Heure (€)</label>
                            <input type="number" step="0.01" name="price_per_hour" id="price-per-hour" required class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold tabular-nums" placeholder="0.00">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-6">
                        <div class="col-span-2 sm:col-span-1">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Montant Minimum (€)</label>
                            <input type="number" step="0.01" name="minimum_fare" id="minimum-fare" required class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold tabular-nums">
                        </div>
                        <div class="col-span-2 sm:col-span-1 flex items-end pb-3 pl-2">
                             <button type="button" id="init-from-profile" class="text-[8px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors cursor-pointer border-b border-indigo-400/20">
                                Copier Infos Profil
                             </button>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 py-4">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="active" id="is-active" class="sr-only peer">
                            <div class="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                        <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">Service Actif</span>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 pt-6 mt-4 border-t border-white/5">
                        <button type="button" class="close-modal px-8 py-5 glass border border-white/10 rounded-2xl font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all order-2 sm:order-1">
                            Annuler
                        </button>
                        <button type="submit" id="save-rule-btn" class="flex-1 px-8 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/30 active:scale-95 order-1 sm:order-2">
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</AppLayout>

<style is:global>
    .glass {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    }
    #pricing-modal.is-active {
        opacity: 1;
        pointer-events: auto;
    }
    #pricing-modal.is-active > div:last-child {
        transform: scale(1);
    }
</style>

<script>
    import { supabase } from "@/lib/supabase/client";

    const modal = document.getElementById('pricing-modal');
    const form = document.getElementById('pricing-form') as HTMLFormElement;
    const addBtn = document.getElementById('add-rule-btn');
    const editBtns = document.querySelectorAll('.edit-rule-btn');
    const closeBtns = document.querySelectorAll('.close-modal');
    const overlay = document.querySelector('.modal-overlay');

    const btnStandard = document.getElementById('tab-standard');
    const btnTransfer = document.getElementById('tab-transfer');
    const secStandard = document.getElementById('section-standard');
    const secTransfer = document.getElementById('section-transfer');

    const actTransfer = document.getElementById('actions-transfer');

    const toggleTabs = (mode: 'standard' | 'transfer') => {
        if (mode === 'standard') {
            btnStandard?.classList.add('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/20');
            btnStandard?.classList.remove('text-slate-500');
            btnTransfer?.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/20');
            btnTransfer?.classList.add('text-slate-500');

            secStandard?.classList.remove('hidden');
            secTransfer?.classList.add('hidden');

            actTransfer?.classList.add('hidden');
        } else {
            btnTransfer?.classList.add('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/20');
            btnTransfer?.classList.remove('text-slate-500');
            btnStandard?.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/20');
            btnStandard?.classList.add('text-slate-500');

            secTransfer?.classList.remove('hidden');
            secStandard?.classList.add('hidden');

            actTransfer?.classList.remove('hidden');
        }
    }

    btnStandard?.addEventListener('click', () => toggleTabs('standard'));
    btnTransfer?.addEventListener('click', () => toggleTabs('transfer'));

    // TRANSFER ACTIONS LINKING
    const openTransfer = () => window.dispatchEvent(new CustomEvent('pricing:open-transfer-modal'));

    document.getElementById('btn-new-transfer-content')?.addEventListener('click', openTransfer);

    document.getElementById('btn-manage-zones')?.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('pricing:open-zone-modal'));
    });

    const modalTitle = document.getElementById('modal-title');
    const ruleIdInput = document.getElementById('rule-id') as HTMLInputElement;
    const serviceInput = document.getElementById('service-category') as HTMLInputElement;
    const baseInput = document.getElementById('base-price') as HTMLInputElement;
    const kmInput = document.getElementById('price-per-km') as HTMLInputElement;
    const hourInput = document.getElementById('price-per-hour') as HTMLInputElement;
    const minInput = document.getElementById('minimum-fare') as HTMLInputElement;
    const activeInput = document.getElementById('is-active') as HTMLInputElement;
    const initBtn = document.getElementById('init-from-profile');

    const toggleModal = () => {
        modal?.classList.toggle('is-active');
        document.body.classList.toggle('overflow-hidden');
    };

    // ADD Mode
    addBtn?.addEventListener('click', () => {
        if (modalTitle) modalTitle.innerText = "Nouveau Service";
        if (ruleIdInput) ruleIdInput.value = "";
        form?.reset();
        if (activeInput) activeInput.checked = true;
        toggleModal();
    });

    // EDIT Mode
    editBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const rule = JSON.parse(btn.getAttribute('data-rule') || '{}');
            if (modalTitle) modalTitle.innerText = "Édition Tarif";
            if (ruleIdInput) ruleIdInput.value = rule.id;
            if (serviceInput) serviceInput.value = rule.service_category;
            if (baseInput) baseInput.value = rule.base_price;
            if (kmInput) kmInput.value = rule.price_per_km;
            if (hourInput) hourInput.value = rule.price_per_hour || "0";
            if (minInput) minInput.value = rule.minimum_fare;
            if (activeInput) activeInput.checked = rule.active;
            toggleModal();
        });
    });

    initBtn?.addEventListener('click', () => {
        const onboarding = JSON.parse(form.dataset.onboarding || '{}');
        if (onboarding) {
            if (baseInput) baseInput.value = onboarding.default_base_price || "";
            if (kmInput) kmInput.value = onboarding.default_price_per_km || "";
            if (minInput) minInput.value = onboarding.default_minimum_fare || "";
            if (hourInput) hourInput.value = "0";
        }
    });

    closeBtns.forEach(btn => btn.addEventListener('click', toggleModal));
    overlay?.addEventListener('click', toggleModal);

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const saveBtn = document.getElementById('save-rule-btn') as HTMLButtonElement;
        const tenantId = form.dataset.tenantId;

        if (!tenantId) {
            alert("Erreur: Tenant ID manquant");
            return;
        }

        saveBtn.disabled = true;
        saveBtn.innerText = "SAUVEGARDE...";

        const formData = new FormData(form);
        const id = formData.get('rule_id');
        const payload = {
            tenant_id: tenantId,
            service_category: String(formData.get('service_category') || '').toUpperCase(),
            base_price: parseFloat(String(formData.get('base_price') || '0')),
            price_per_km: parseFloat(String(formData.get('price_per_km') || '0')),
            price_per_hour: parseFloat(String(formData.get('price_per_hour') || '0')),
            minimum_fare: parseFloat(String(formData.get('minimum_fare') || '0')),
            active: formData.get('active') === 'on'
        };

        try {
            let error;
            if (id) {
                const { error: err } = await supabase.from('pricing_rules').update(payload).eq('id', String(id));
                error = err;
            } else {
                const { error: err } = await supabase.from('pricing_rules').insert(payload);
                error = err;
            }

            if (error) throw error;
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la sauvegarde.");
            saveBtn.disabled = false;
            saveBtn.innerText = "Sauvegarder";
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('is-active')) {
            toggleModal();
        }
    });
</script>
</file>

<file path="src/pages/onboarding.astro">
---
// src/pages/onboarding.astro
import MainLayout from "../layouts/MainLayout.astro";
---

<MainLayout title="Onboarding">
    <div class="max-w-xl mx-auto px-4 py-8">
        <!-- Step Headings -->
        <div id="step-headings" class="mb-8 min-h-[80px]">
            <div class="step-header transition-all duration-300" data-step="1">
                <h2
                    class="text-3xl font-black italic tracking-tighter uppercase"
                >
                    Profil
                </h2>
                <p
                    class="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1"
                >
                    Identité du titulaire du compte.
                </p>
            </div>
            <div
                class="step-header hidden opacity-0 transition-all duration-300"
                data-step="2"
            >
                <h2
                    class="text-3xl font-black italic tracking-tighter uppercase"
                >
                    Véhicule
                </h2>
                <p
                    class="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1"
                >
                    Détails techniques de votre flotte.
                </p>
            </div>
            <div
                class="step-header hidden opacity-0 transition-all duration-300"
                data-step="3"
            >
                <h2
                    class="text-3xl font-black italic tracking-tighter uppercase"
                >
                    Tarification
                </h2>
                <p
                    class="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1"
                >
                    Configuration de vos prix par défaut.
                </p>
            </div>
        </div>

        <!-- Stepper Indicator -->
        <div class="mb-8 relative px-4">
            <div
                class="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2"
            >
            </div>
            <div
                id="progress-bar"
                class="absolute top-1/2 left-0 h-0.5 bg-indigo-500 -translate-y-1/2 transition-all duration-500 ease-in-out"
                style="width: 0%"
            >
            </div>
            <div class="relative flex justify-between">
                {
                    [1, 2, 3].map((step) => (
                        <div
                            class="step-dot w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-[10px] font-bold z-10 transition-all duration-300"
                            data-step={step}
                        >
                            {step}
                        </div>
                    ))
                }
            </div>
        </div>

        <form id="onboarding-form" class="relative min-h-[300px]">
            <!-- Etape 1: Profil -->
            <div class="step-content space-y-6" data-step="1">
                <div class="space-y-4">
                    <div class="space-y-1">
                        <label
                            class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter"
                            >Prénom</label
                        >
                        <input
                            type="text"
                            name="first_name"
                            required
                            class="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-white focus:border-indigo-500/50 outline-none transition-all"
                        />
                    </div>
                    <div class="space-y-1">
                        <label
                            class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter"
                            >Nom</label
                        >
                        <input
                            type="text"
                            name="last_name"
                            required
                            class="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-white focus:border-indigo-500/50 outline-none transition-all"
                        />
                    </div>
                    <div class="space-y-1">
                        <label
                            class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter"
                            >Email (Compte)</label
                        >
                        <input
                            type="email"
                            id="auth-email"
                            disabled
                            class="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-slate-400 cursor-not-allowed outline-none transition-all"
                        />
                    </div>
                    <div class="space-y-1">
                        <label
                            class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter"
                            >Société</label
                        >
                        <input
                            type="text"
                            name="company_name"
                            required
                            placeholder="Ex: Prestige VTC"
                            class="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-white focus:border-indigo-500/50 outline-none transition-all"
                        />
                    </div>
                    <div class="space-y-1">
                        <label
                            class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter"
                            >Sous-domaine</label
                        >
                        <input
                            type="text"
                            name="primary_domain"
                            required
                            placeholder="prestige-vtc"
                            class="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-white focus:border-indigo-500/50 outline-none transition-all"
                        />
                    </div>
                    <div class="space-y-1">
                        <label
                            class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter"
                            >Téléphone</label
                        >
                        <div class="flex gap-2">
                            <select
                                name="phone_prefix"
                                class="w-24 bg-white/5 border border-white/5 rounded-lg px-2 py-3 text-white focus:border-indigo-500/50 outline-none transition-all appearance-none cursor-pointer text-xs font-bold uppercase tracking-tighter"
                            >
                                <option
                                    value="+33"
                                    class="bg-[#0a0a0c]"
                                    selected>🇫🇷 +33</option
                                >
                                <option value="+32" class="bg-[#0a0a0c]"
                                    >🇧🇪 +32</option
                                >
                                <option value="+41" class="bg-[#0a0a0c]"
                                    >🇨🇭 +41</option
                                >
                                <option value="+352" class="bg-[#0a0a0c]"
                                    >🇱🇺 +352</option
                                >
                            </select>
                            <input
                                type="tel"
                                name="phone_number"
                                required
                                placeholder="6 00 00 00 00"
                                class="flex-1 bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-white focus:border-indigo-500/50 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Etape 2: Véhicule -->
            <div class="step-content space-y-6 hidden opacity-0" data-step="2">
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label
                                class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter"
                                >Marque</label
                            >
                            <input
                                type="text"
                                name="vehicle_brand"
                                required
                                class="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-white focus:border-indigo-500/50 outline-none transition-all"
                            />
                        </div>
                        <div class="space-y-1">
                            <label
                                class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter"
                                >Modèle</label
                            >
                            <input
                                type="text"
                                name="vehicle_model"
                                required
                                class="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-white focus:border-indigo-500/50 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div class="space-y-1">
                        <label
                            class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter"
                            >Immatriculation</label
                        >
                        <input
                            type="text"
                            name="plate_number"
                            required
                            class="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-white focus:border-indigo-500/50 outline-none transition-all"
                        />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label
                                class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter"
                                >Carte VTC</label
                            >
                            <input
                                type="text"
                                name="vtc_license_number"
                                required
                                class="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-white focus:border-indigo-500/50 outline-none transition-all"
                            />
                        </div>
                        <div class="space-y-1">
                            <label
                                class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter"
                                >Capacité</label
                            >
                            <input
                                type="number"
                                name="capacity"
                                required
                                min="1"
                                max="12"
                                value="4"
                                class="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-white focus:border-indigo-500/50 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Etape 3: Tarifs -->
            <div class="step-content space-y-6 hidden opacity-0" data-step="3">
                <div class="space-y-4">
                    <div class="grid grid-cols-3 gap-4">
                        <div class="space-y-1 text-center">
                            <label
                                class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter"
                                >Base</label
                            >
                            <input
                                type="number"
                                step="0.01"
                                name="default_base_price"
                                required
                                class="w-full bg-white/5 border border-white/5 rounded-lg px-2 py-3 text-white text-center focus:border-indigo-500/50 outline-none transition-all"
                            />
                        </div>
                        <div class="space-y-1 text-center">
                            <label
                                class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter"
                                >KM</label
                            >
                            <input
                                type="number"
                                step="0.01"
                                name="default_price_per_km"
                                required
                                class="w-full bg-white/5 border border-white/5 rounded-lg px-2 py-3 text-white text-center focus:border-indigo-500/50 outline-none transition-all"
                            />
                        </div>
                        <div class="space-y-1 text-center">
                            <label
                                class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter"
                                >Min</label
                            >
                            <input
                                type="number"
                                step="0.01"
                                name="default_minimum_fare"
                                required
                                class="w-full bg-white/5 border border-white/5 rounded-lg px-2 py-3 text-white text-center focus:border-indigo-500/50 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label
                            class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter"
                            >Catégories</label
                        >
                        <div class="flex gap-2">
                            {
                                ["Berline", "Affaires", "Van"].map((c) => (
                                    <label class="flex-1 py-2 rounded-lg border border-white/5 bg-white/5 text-[10px] font-bold uppercase cursor-pointer hover:bg-white/10 transition-all text-center">
                                        <input
                                            type="checkbox"
                                            name="service_categories"
                                            value={c.toLowerCase()}
                                            class="hidden"
                                        />
                                        <span>{c}</span>
                                    </label>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation -->
            <div class="mt-12 flex justify-between gap-4">
                <button
                    type="button"
                    id="prev-btn"
                    class="flex-1 py-4 glass rounded-xl font-bold uppercase tracking-tighter text-xs opacity-0 pointer-events-none transition-all hover:bg-white/10"
                >
                    Retour
                </button>
                <button
                    type="button"
                    id="next-btn"
                    class="flex-1 py-4 bg-indigo-600 rounded-xl font-bold uppercase tracking-tighter text-xs transition-all hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
                >
                    Suivant
                </button>
                <button
                    type="submit"
                    id="final-btn"
                    class="flex-1 py-4 bg-emerald-600 rounded-xl font-bold uppercase tracking-tighter text-xs transition-all hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 hidden"
                >
                    Finaliser
                </button>
            </div>
        </form>

        <div
            id="status-msg"
            class="mt-6 text-center text-[10px] font-bold uppercase tracking-widest min-h-[12px]"
        >
        </div>
    </div>
</MainLayout>

<script>
    import { supabase } from "@/lib/supabase/client";

    let currentStep = 1;
    const totalSteps = 3;

    const form = document.getElementById("onboarding-form") as HTMLFormElement;
    const contents = document.querySelectorAll(".step-content");
    const headers = document.querySelectorAll(".step-header");
    const dots = document.querySelectorAll(".step-dot");
    const progressBar = document.getElementById(
        "progress-bar",
    ) as HTMLDivElement;
    const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;
    const prevBtn = document.getElementById("prev-btn") as HTMLButtonElement;
    const finalBtn = document.getElementById("final-btn") as HTMLButtonElement;
    const statusEl = document.getElementById("status-msg") as HTMLDivElement;

    function updateUI() {
        // Content & Header visibility
        [contents, headers].forEach((group) => {
            group.forEach((el) => {
                const step = parseInt(el.getAttribute("data-step")!);
                if (step === currentStep) {
                    el.classList.remove("hidden");
                    setTimeout(() => el.classList.remove("opacity-0"), 50);
                } else {
                    el.classList.add("hidden", "opacity-0");
                }
            });
        });

        // Dots & Progress
        dots.forEach((dot) => {
            const step = parseInt(dot.getAttribute("data-step")!);
            if (step <= currentStep) {
                dot.classList.add("border-indigo-500", "text-indigo-400");
            } else {
                dot.classList.remove("border-indigo-500", "text-indigo-400");
            }
        });

        const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = `${progress}%`;

        // Buttons
        prevBtn.style.opacity = currentStep === 1 ? "0" : "1";
        prevBtn.style.pointerEvents = currentStep === 1 ? "none" : "auto";

        if (currentStep === totalSteps) {
            nextBtn.classList.add("hidden");
            finalBtn.classList.remove("hidden");
        } else {
            nextBtn.classList.remove("hidden");
            finalBtn.classList.add("hidden");
        }
    }

    nextBtn.addEventListener("click", () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateUI();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
        }
    });

    // Checkbox styling toggle
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((cb) => {
        cb.addEventListener("change", (e: any) => {
            const parent = (e.target as HTMLInputElement).parentElement;
            if (e.target.checked) {
                parent?.classList.add(
                    "bg-indigo-500/20",
                    "border-indigo-500/50",
                    "text-indigo-400",
                );
            } else {
                parent?.classList.remove(
                    "bg-indigo-500/20",
                    "border-indigo-500/50",
                    "text-indigo-400",
                );
            }
        });
    });

    // --- Système de Sauvegarde Locale (Solution 1) ---
    const STORAGE_KEY = "vtc_onboarding_draft";

    async function saveDraft() {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const formData = new FormData(form);
        const data: Record<string, any> = {
            currentStep,
        };

        formData.forEach((value, key) => {
            if (key === "service_categories") {
                if (!data[key]) data[key] = [];
                data[key].push(value);
            } else {
                data[key] = value;
            }
        });

        localStorage.setItem(`${STORAGE_KEY}_${user.id}`, JSON.stringify(data));
    }

    async function fillForm(data: any) {
        if (!data) return;

        if (data.currentStep) currentStep = data.currentStep;

        Object.entries(data).forEach(([key, value]) => {
            // Cas spécial téléphone venant de la DB (champ 'phone')
            if (key === 'phone' && typeof value === 'string' && value.startsWith('+')) {
                const prefixes = ["+33", "+32", "+41", "+352"];
                const foundPrefix = prefixes.find(p => value.startsWith(p));
                if (foundPrefix) {
                    const number = value.replace(foundPrefix, "").trim();
                    const pInput = form.elements.namedItem('phone_prefix') as any;
                    const nInput = form.elements.namedItem('phone_number') as any;
                    if (pInput) pInput.value = foundPrefix;
                    if (nInput) nInput.value = number;
                }
                return;
            }

            const input = form.elements.namedItem(key) as any;
            if (!input) return;

            if (key === "service_categories" && Array.isArray(value)) {
                const checkboxes = form.querySelectorAll(
                    `input[name="${key}"]`,
                );
                checkboxes.forEach((cb: any) => {
                    if (value.includes(cb.value)) {
                        cb.checked = true;
                        cb.parentElement?.classList.add(
                            "bg-indigo-500/20",
                            "border-indigo-500/50",
                            "text-indigo-400",
                        );
                    } else {
                        // Nettoyer si on recharge
                        cb.checked = false;
                        cb.parentElement?.classList.remove(
                            "bg-indigo-500/20",
                            "border-indigo-500/50",
                            "text-indigo-400",
                        );
                    }
                });
            } else if (input.type === "checkbox") {
                input.checked = !!value;
            } else if (input instanceof HTMLSelectElement || input instanceof HTMLInputElement) {
                input.value = value ? String(value) : "";
            }
        });
        updateUI();
    }

    async function loadData() {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        // Pré-remplir l'email
        const emailInput = document.getElementById('auth-email') as HTMLInputElement;
        if (emailInput && user.email) emailInput.value = user.email;

        // 1. Chercher d'abord en DB (Dossier déjà soumis mais pending)
        const { data: dbOnboarding, error: dbError } = await supabase
            .from("onboarding")
            .select("*")
            .eq("profile_id", user.id)
            .eq("status", "pending")
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle();

        if (dbOnboarding) {
            console.log("Onboarding recharge: data found in DB", dbOnboarding);
            fillForm(dbOnboarding);
            // On force l'étape 3 si on recharge de la DB pour montrer qu'on a tout
            currentStep = 3;
            updateUI();
            return;
        }

        // 2. Fallback sur localStorage (Brouillon non soumis)
        const saved = localStorage.getItem(`${STORAGE_KEY}_${user.id}`);
        if (!saved) return;

        try {
            const data = JSON.parse(saved);
            console.log("Onboarding recharge: data found in LocalStorage", data);
            fillForm(data);
        } catch (e) {
            console.error("Failed to load draft", e);
        }
    }

    // Sauvegarder à chaque changement (uniquement dans localStorage)
    form.addEventListener("input", saveDraft);
    form.addEventListener("change", saveDraft);

    // Charger au démarrage
    loadData();

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        finalBtn.disabled = true;
        statusEl.textContent = "TRANSMISSION...";
        statusEl.className =
            "mt-6 text-center text-[10px] font-bold uppercase tracking-widest text-indigo-400";

        const formData = new FormData(form);
        const categories = formData.getAll("service_categories");

        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) throw new Error("AUTH_REQUIRED");

            const phonePrefix = formData.get("phone_prefix") as string;
            const phoneNumber = formData.get("phone_number") as string;
            const fullPhone = `${phonePrefix}${phoneNumber}`.replace(/\s/g, "");

            // Vérifier s'il existe déjà un dossier pending pour faire un UPDATE plutôt qu'un INSERT
            const { data: existing } = await supabase
                .from("onboarding")
                .select("id")
                .eq("profile_id", user.id)
                .eq("status", "pending")
                .limit(1)
                .maybeSingle();

            const onboardingData = {
                profile_id: user.id,
                first_name: formData.get("first_name") as string,
                last_name: formData.get("last_name") as string,
                company_name: formData.get("company_name") as string,
                primary_domain: formData.get("primary_domain") as string,
                phone: fullPhone,
                vtc_license_number: formData.get("vtc_license_number") as string,
                vehicle_brand: formData.get("vehicle_brand") as string,
                vehicle_model: formData.get("vehicle_model") as string,
                plate_number: formData.get("plate_number") as string,
                capacity: parseInt(formData.get("capacity") as string),
                service_categories: categories.map(c => String(c)),
                default_base_price: parseFloat(
                    formData.get("default_base_price") as string,
                ),
                default_price_per_km: parseFloat(
                    formData.get("default_price_per_km") as string,
                ),
                default_minimum_fare: parseFloat(
                    formData.get("default_minimum_fare") as string,
                ),
                status: "pending" as any,
            };

            let obError;
            if (existing) {
                const { error } = await supabase
                    .from("onboarding")
                    .update(onboardingData)
                    .eq("id", existing.id);
                obError = error;
            } else {
                const { error } = await supabase
                    .from("onboarding")
                    .insert(onboardingData);
                obError = error;
            }

            if (obError) throw obError;

            /* Désactivation de l'auto-activation pour passer par le flux Admin
            await supabase.functions.invoke("approve_onboarding", {
                body: { onboarding_id: obData.id },
            });
            */

            // Nettoyage de la sauvegarde locale après succès
            localStorage.removeItem(`${STORAGE_KEY}_${user.id}`);

            statusEl.textContent = "DOSSIER SOUMIS - EN ATTENTE";
            statusEl.className =
                "mt-6 text-center text-[10px] font-bold uppercase tracking-widest text-emerald-400";
            window.location.href = "/waiting-approval";
        } catch (err: any) {
            statusEl.textContent = "ERROR: " + err.message;
            statusEl.className =
                "mt-6 text-center text-[10px] font-bold uppercase tracking-widest text-red-500";
            finalBtn.disabled = false;
        }
    });

    updateUI();
</script>
</file>

<file path="docs/database.md">
Maintenant voici **le fichier `docs/database.md` complet**, déjà fusionné avec la section Hardening intégrée.

---

# 📚 Database Documentation — VTC HUB (Supabase)

## 🧠 Overview

Base de données d’un ERP SaaS multi-tenant pour chauffeurs VTC.

Principes :

- Multi-tenant strict
- Isolation via `tenant_id`
- Auth séparée (`auth.users`)
- Activation transactionnelle (`approve_onboarding_tx`)
- RLS activé sur tables métier
- Contraintes SQL garantissant l’intégrité métier

---

# 🏢 Multi-Tenant Architecture

Chaque entreprise = 1 `tenant`.

Isolation garantie par :

```
tenant_id uuid
```

Tables liées au tenant (V1 actif) :

- drivers
- vehicles
- pricing_rules
- bookings

---

# 🔐 Auth Flow

```
auth.users
   ↓ (trigger)
profiles
   ↓
onboarding (staging)
   ↓
approve_onboarding_tx()
   ↓
tenants + drivers + vehicles + pricing_rules
```

---

# 🗂️ Tables — V1 Actives

---

## 1️⃣ tenants

Entreprise cliente SaaS.

| Column            | Type        | Notes             |
| ----------------- | ----------- | ----------------- |
| id                | uuid (PK)   |                   |
| name              | text        | Nom entreprise    |
| site_slug         | text UNIQUE | Slug personnalisé |
| primary_domain    | text UNIQUE | Domaine client    |
| stripe_account_id | text        | Stripe optionnel  |
| commission_rate   | numeric     | Réservé V2+       |
| created_at        | timestamptz | default now()     |

Relations :

- 1:N drivers
- 1:N vehicles
- 1:N pricing_rules
- 1:N bookings
- 1:N financial_movements

🔒 RLS : Filtrage strict par `tenant_id`
🔒 Isolation : Fonction `current_tenant_id()` utilisée dans les politiques.
🔒 Service_Role : Accès bypass (Edge Functions uniquement).

## 2️⃣ profiles

Lien auth → tenant.

| Column        | Type        | Notes                        |
| ------------- | ----------- | ---------------------------- |
| id            | uuid (PK)   | = auth.users.id              |
| tenant_id     | uuid        | null si non activé           |
| tenant_role   | enum        | owner / manager / driver     |
| platform_role | enum        | super_admin / platform_staff |
| first_name    | text        | V1 utilisé                   |
| last_name     | text        | V1 utilisé                   |
| created_at    | timestamptz |                              |

---

## 3️⃣ onboarding (Staging)

Table temporaire avant activation.

| Column               | Type                     |
| -------------------- | ------------------------ |
| id                   | uuid                     |
| profile_id           | uuid                     |
| status               | enum (pending, approved) |
| company_name         | text                     |
| primary_domain       | text                     |
| phone                | text                     |
| first_name           | text                     |
| last_name            | text                     |
| vtc_license_number   | text                     |
| vehicle_brand        | text                     |
| vehicle_model        | text                     |
| plate_number         | text                     |
| capacity             | integer                  |
| service_categories   | text[]                   |
| default_base_price   | numeric                  |
| default_price_per_km | numeric                  |
| default_minimum_fare | numeric                  |
| created_at           | timestamptz              |
| validated_at         | timestamptz              |

🔒 RLS activé
Lecture limitée au propriétaire ou admin plateforme
Aucun UPDATE autorisé hors service role

---

## 4️⃣ drivers

| Column         | Type                        |
| -------------- | --------------------------- |
| id             | uuid                        |
| tenant_id      | uuid                        |
| user_id        | uuid (unique → profiles.id) |
| first_name     | text                        |
| last_name      | text                        |
| phone          | text                        |
| license_number | text                        |
| created_at     | timestamptz                 |

---

## 5️⃣ vehicles

| Column       | Type        |
| ------------ | ----------- |
| id           | uuid        |
| tenant_id    | uuid        |
| driver_id    | uuid        |
| brand        | text        |
| model        | text        |
| plate_number | text        |
| category     | text        |
| capacity     | integer     |
| created_at   | timestamptz |

---

## 6️⃣ pricing_rules

| Column           | Type        |
| ---------------- | ----------- |
| id               | uuid        |
| tenant_id        | uuid        |
| service_category | text        |
| base_price       | numeric     |
| price_per_km     | numeric     |
| minimum_fare     | numeric     |
| active           | boolean     |
| created_at       | timestamptz |

---

## 7️⃣ zones

| Column     | Type        |
| ---------- | ----------- |
| id         | uuid        |
| tenant_id  | uuid        |
| name       | text        |
| created_at | timestamptz |

---

## 8️⃣ fixed_routes (Forfaits)

| Column           | Type        | Notes                          |
| ---------------- | ----------- | ------------------------------ |
| id               | uuid        |                                |
| tenant_id        | uuid        |                                |
| pickup_zone_id   | uuid        | FK zones                       |
| dropoff_zone_id  | uuid        | FK zones                       |
| vehicle_category | text        |                                |
| price            | numeric     |                                |
| is_bidirectional | boolean     | Appliquable dans les deux sens |
| active           | boolean     |                                |
| created_at       | timestamptz |                                |

---

## 9️⃣ customers

| Column     | Type        | Notes         |
| ---------- | ----------- | ------------- |
| id         | uuid        |               |
| tenant_id  | uuid        |               |
| email      | text        | Unique/Tenant |
| first_name | text        |               |
| last_name  | text        |               |
| phone      | text        |               |
| created_at | timestamptz |               |

---

## 🔟 bookings (Booking Engine V1)

| Column                   | Type                                                 | Notes                                   |
| ------------------------ | ---------------------------------------------------- | --------------------------------------- |
| id                       | uuid (PK)                                            |                                         |
| original_tenant_id       | uuid                                                 | Tenant créateur                         |
| current_tenant_id        | uuid                                                 | Tenant gérant actuellement              |
| customer_id              | uuid                                                 | FK customers                            |
| pickup_address           | text                                                 |                                         |
| dropoff_address          | text                                                 |                                         |
| pickup_time              | timestamptz                                          |                                         |
| distance_km              | numeric                                              |                                         |
| total_amount             | numeric                                              | Montant TTC total                       |
| status                   | enum                                                 | Voir ci-dessous                         |
| driver_id                | uuid (nullable)                                      |                                         |
| cancelled_at             | timestamptz (nullable)                               | Date d'annulation                       |
| cancellation_reason      | enum (client, no_show, driver_fault, platform_issue) | Motif précis                            |
| cancellation_initiator   | text (nullable)                                      | client / driver / admin                 |
| cancellation_policy_id   | uuid (FK)                                            | Politique appliquée à cette réservation |
| stripe_payment_intent_id | text (nullable)                                      | Référence paiement Stripe               |
| created_at               | timestamptz                                          |                                         |

### Statuts Booking (Lifecycle complet)

- `pending` : En attente.
- `accepted_pending_payment` : Accepté par le chauffeur, Stripe en attente.
- `paid` : Paiement Stripe confirmé par webhook.
- `completed` : Course terminée.
- `cancelled_pending_refund` : Annulé, remboursement API Stripe initié.
- `cancelled_refunded` : Annulé, remboursement Stripe validé par webhook.
- `cancelled_no_refund` : Annulé sans remboursement (selon politique).

---

## 8️⃣ cancellation_policies (Versioned Policies)

Définit les règles de remboursement par tenant.

| Column                      | Type        | Notes                                    |
| --------------------------- | ----------- | ---------------------------------------- |
| id                          | uuid (PK)   |                                          |
| tenant_id                   | uuid        |                                          |
| version                     | integer     | Incrément automatique                    |
| active                      | boolean     | Une seule active par tenant              |
| hours_before_full_refund    | integer     | Temps avant 100% remboursement           |
| hours_before_partial_refund | integer     | Temps avant remboursement partiel        |
| partial_refund_rate         | numeric     | % remboursé (ex: 0.5)                    |
| no_show_refund_rate         | numeric     | % remboursé en cas de no-show (0)        |
| driver_fault_refund_rate    | numeric     | % remboursé en cas de faute chauffeur(1) |
| created_at                  | timestamptz |                                          |

---

## 9️⃣ financial_movements (Audit Comptable - Ledger Natif)

Table unique remplaçant `booking_commissions` et `refunds`. Elle sert d'audit financier immuable.

| Column                            | Type               | Notes                                  |
| --------------------------------- | ------------------ | -------------------------------------- |
| id                                | uuid (PK)          |                                        |
| booking_id                        | uuid               | Lien booking                           |
| tenant_id                         | uuid               | Isolation SaaS                         |
| movement_type                     | enum               | payment, commission, refund, etc.      |
| direction                         | enum               | credit, debit                          |
| gross_amount                      | numeric            | Montant TTC                            |
| net_amount                        | numeric            | Montant HT                             |
| vat_amount                        | numeric            | Montant TVA                            |
| platform_commission_amount        | numeric            | Montant commission plateforme          |
| platform_commission_rate_snapshot | numeric            | Taux plateforme au moment du mouvement |
| driver_commission_amount          | numeric            | Montant commission chauffeur (V2)      |
| driver_commission_rate_snapshot   | numeric            | Taux chauffeur au moment du mouvement  |
| stripe_payment_intent_id          | text               | Référence Stripe                       |
| stripe_refund_id                  | text               | Si mouvement de type refund            |
| refund_ratio                      | numeric (nullable) | Ratio du refund précis (0.0 à 1.0)     |
| created_by_event                  | text               | ID de l'événement Stripe (Idempotence) |
| created_at                        | timestamptz        |                                        |

🔒 Immuabilité : Aucun UPDATE ou DELETE autorisé hors admin.
🔒 Audit Trail : Chaînage avec `stripe_events`.

---

## 🔟 stripe_events (Idempotence)

Stockage des événements Stripe pour éviter les doubles traitements.

| Column     | Type        | Notes                         |
| ---------- | ----------- | ----------------------------- |
| id         | text (PK)   | ID Stripe de l'événement      |
| type       | text        | checkout.session.completed... |
| processed  | boolean     | État du traitement            |
| created_at | timestamptz |                               |

---

# 📊 Vues de Reporting

Vues SQL optimisées pour les dashboards financiers :

- `financial_monthly_summary` : Agrégation par mois/tenant (HT, TVA, TTC, Commission, Refund).
- `financial_yearly_summary` : Agrégation annuelle.
- `financial_fiscal_detail` : Détail complet pour export TVA et audit financier exhaustif.

---

# 🔒 Production Hardening & Consistency

## Refund Integrity

- **Refund Ratio** : Calculé sur le `total_amount` et répercuté au pro-rata sur la TVA et la commission.
- **Audit Trail** : Les remboursements sont liés via `stripe_refund_id`.
- **Immuabilité** : Les mouvements financiers insérés sont en lecture seule pour garantir l'intégrité de l'audit.
- **Unicité** : Index unique `unique_active_policy_per_tenant` assurant qu'une seule politique est applicable à un instant T.

---

# 🎯 Résultat

La V1 est maintenant :

- Structurellement cohérente avec audit financier.
- Financièrement protégée (double paiement/refund).
- Multi-tenant sécurisé.
- Prête pour le reporting fiscal automatique.
</file>

<file path="docs/flows.md">
# ✅ VERSION CORRIGÉE — `docs/flows.md` (Alignée V1)

Tu peux remplacer ton fichier par ceci :

---

# 🔄 System Flows — VTC HUB (V1)

---

## 🟢 1️⃣ Signup Flow

1. User s’inscrit via Supabase Auth
2. `auth.users` est créé
3. Trigger `handle_new_user` crée une ligne dans `profiles` avec `tenant_role = 'pending'`
4. Middleware détecte le rôle `pending` et force la redirection vers `/onboarding`

---

## 🟡 2️⃣ Onboarding Flow

1. User remplit le formulaire onboarding (Email pré-rempli depuis Auth)
2. Insertion dans `onboarding`
3. Middleware continue de forcer `/onboarding` tant que le profil est en `pending`
4. Accès au dashboard ERP bloqué

---

## 🔵 3️⃣ Admin Validation Flow

1. Super Admin accède à `/admin/onboardings` qui liste les dossiers via la vue `onboarding_admin_view`
2. Clique sur "Approuver"

3. Appel RPC `approve_onboarding_tx(onboarding_uuid)`

4. Transaction atomique :
   - Vérifie que onboarding = pending
   - Crée `tenant`
   - Met à jour `profiles.tenant_id`
   - Met `tenant_role = owner`
   - Crée driver initial
   - Crée véhicule initial
   - Crée pricing_rules
   - Met `onboarding.status = approved`

5. User peut maintenant accéder au dashboard

---

## 🟢 4️⃣ Active User Flow

1. User login
2. Middleware SSR vérifie :
   - `platform_role` → accès `/admin`
   - `tenant_id` → accès `/app`
   - sinon → `/onboarding`

3. Accès au dashboard ERP

---

# 🚗 5️⃣ Booking Flow (V1 Actif)

## Création

1. Client crée une réservation (site ou backoffice)
2. Frontend envoie `distance_km`
3. Backend :
   - Récupère pricing_rules actif
   - Recalcule le prix
   - Applique minimum_fare
   - Insère booking

```
status = 'pending'
```

---

## Mise à jour statut

Owner peut modifier :

```
pending → confirmed → completed
pending → cancelled
```

---

## Affichage

Dashboard :

- Liste bookings
- KPI du jour
- KPI du mois
- Total brut

---

# 💳 6️⃣ Payment Flow (Stripe)

Le système utilise Stripe Checkout pour sécuriser les paiements.

1. **Client** initiate `checkout session`
2. **Stripe** redirects to hosted checkout
3. **Paiement réussi** → Stripe envoie `checkout.session.completed`
4. **Edge Function** (`handle_stripe_webhook`) :
   - Vérifie la signature du webhook
   - Vérifie si l'`event_id` est déjà traité (`stripe_events`)
   - Récupère le `booking_id` depuis les metadata
   - Met à jour `booking.status = paid`
   - Stocke le `stripe_payment_intent_id`
   - Génère les `financial_movements` :
     - Type **payment** (Crédit)
     - Type **commission** (Débit, si configurée)
   - Marque l'événement comme `processed`

---

# 💸 7️⃣ Cancellation & Refund Flow (Automated)

# 💳 Flow : Paiement & Ledger Natif (Stripe)

1. **Checkout** : Le client paie via Stripe.
2. **Webhook Event** : Réception de `checkout.session.completed`.
3. **Idempotence** :
   - Insertion de l'ID event dans `stripe_events`.
   - Si duplication (409), arrêt immédiat.
4. **Validation Booking** : Passage du booking en `paid`.
5. **Ledger (Mouvement 1)** : Création d'un crédit `payment` avec `gross_amount` (TTC), `net_amount` (HT) et `vat_amount`.
6. **Snapshot Commission (Mouvement 2)** :
   - Lecture du `platform_fee_rate` actuel du tenant.
   - Création d'un débit `commission`.
   - **Important** : Le taux est sauvé dans `platform_commission_rate_snapshot`.

---

### 🔄 Flow : Refund & Inversion de Ledger

1. **Refund Trigger** : Initié via Dashboard Stripe ou API.
2. **Webhook Event** : Réception de `refund.created`.
3. **Protection Anti-collision** :
   - Vérification de l'existence du `stripe_refund_id` dans `financial_movements`.
   - Si déjà présent, arrêt (Idempotence).
4. **Calcul Ratio** : `refund_amount / booking.total_amount`.
5. **Inversion Ledger** :
   - Débit `refund` proportionnel au ratio.
   - **Inversion Commission** : Crédit `commission_reversal` basé sur le snapshot original multiplié par le ratio.
6. **Statut** : Mise à jour du booking en `cancelled_refunded`.

L'audit financier permet de recalculer le Net par tenant après déduction des refunds réels.

---

# 🛡️ 8️⃣ Sécurité & Idempotence Stripe

- **Signature Check** : Chaque requête webhook est authentifiée via le secret Stripe.
- **Whitelist** : Uniquement `checkout.session.completed` et `refund.created` sont traités.
- **Idempotence** : Table `stripe_events` persistée. Si un événement arrive deux fois, il est ignoré.
- **Metadata atomicity** : Les IDs Stripe sont systématiquement liés aux `booking_id` pour garantir la traçabilité.

---

# 🪟 9️⃣ Reporting Financier

Le système expose des vues SQL pour le reporting :

- **TVA** : Calculée automatiquement sur chaque mouvement.
- **Audit exhaustif** : Vue `financial_fiscal_detail` pour le détail de chaque flux.
- **Agrégation** : Résumés mensuels et annuels automatiques.

---

# 🔮 Architecture Future (Planning)

## Découplage Type vs Flow

Le système doit séparer le **Service** (ce qui est réservé) du **Workflow** (comment c'est traité).

- **Booking Type** (Service) : `transfer`, `hourly`, `manual`, `dispatch`, `share`.
- **Booking Flow** (Workflow) : `pay_first`, `accept_then_pay`, `accept_only`, `internal_dispatch`, `network_share`.

### Exemples de workflows prévus :

1. **FLOW pay_first** : `form → stripe → paid → booking` (B2C Standard)
2. **FLOW accept_then_pay** : `booking → accepted → payment → paid` (Pro / Manual)
3. **FLOW accept_only** : `booking → accepted → completed` (Cash / Admin)
4. **FLOW dispatch** : `booking → pending → assigned → accepted` (Flotte)
5. **FLOW share** : `booking → shared → accepted_by_other → paid` (Réseau/Cercle)

---

# 🎯 Résultat

Le système de flux financiers est :

- **Production-ready** : Idempotence et sécurité Stripe gérées.
- **Audit-ready** : Chaque centime est tracé via `financial_movements`.
- **Consistency** : Politiques d'annulation attachées immuablement au moment du paiement.
</file>

<file path="src/pages/login.astro">
---
// src/pages/login.astro
import MainLayout from "../layouts/MainLayout.astro";
---

<MainLayout title="Connexion">
    <div
        class="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4"
    >
        <div
            class="glass p-10 rounded-3xl w-full max-w-md shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700 relative"
        >
            <!-- Bouton Fermer / Retour Inscription -->
            <a
                href="/signup"
                class="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-500 hover:text-white hover:bg-white/10 transition-all group"
                title="Retour à l'inscription"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 transition-transform group-hover:rotate-90">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </a>
            <div class="flex justify-center mb-6">
                <span
                    class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black tracking-[0.2em] text-emerald-400 uppercase"
                >
                    Connexion
                </span>
            </div>
            <div class="text-center mb-8">
                <h1
                    class="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-white"
                >
                    Bon retour
                </h1>
                <p class="text-slate-400">
                    Connectez-vous à votre compte chauffeur
                </p>
            </div>

            <form id="login-form" class="space-y-6">
                <div class="space-y-2">
                    <label
                        for="email"
                        class="text-sm font-medium text-slate-300"
                        >Email professionnel</label
                    >
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="nom@entreprise.fr"
                        class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-inter"
                    />
                </div>

                <div class="space-y-2">
                    <div class="flex justify-between">
                        <label
                            for="password"
                            class="text-sm font-medium text-slate-300"
                            >Mot de passe</label
                        >
                        <a
                            href="#"
                            class="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                            >Oublié ?</a
                        >
                    </div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="••••••••"
                        class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-inter"
                    />
                </div>

                <button
                    type="submit"
                    id="submit-btn"
                    class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                    <span
                        class="btn-text group-hover:tracking-wider transition-all duration-300"
                        >Se connecter</span
                    >
                    <div
                        class="loader-container hidden absolute inset-0 flex items-center justify-center bg-indigo-600"
                    >
                        <svg
                            class="animate-spin h-5 w-5 text-white"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"></circle>
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    </div>
                </button>
            </form>

            <div class="mt-8 pt-8 border-t border-white/5 text-center">
                <p class="text-slate-500 text-sm">
                    Pas encore de compte ?
                    <a
                        href="/signup"
                        class="text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
                        >Créer un compte</a
                    >
                </p>
            </div>

            <div
                id="message"
                class="mt-6 text-center text-sm font-medium min-h-[20px]"
            >
            </div>
        </div>
    </div>
</MainLayout>

<script>
    import { supabase } from "@/lib/supabase/client";

    const form = document.querySelector("#login-form") as HTMLFormElement;
    const messageEl = document.querySelector("#message") as HTMLDivElement;
    const submitBtn = document.querySelector(
        "#submit-btn",
    ) as HTMLButtonElement;
    const loader = document.querySelector(
        ".loader-container",
    ) as HTMLDivElement;
    const btnText = document.querySelector(".btn-text") as HTMLSpanElement;

    // Check for inactivity reason
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reason') === 'inactivity' && messageEl) {
        messageEl.textContent = "Vous avez été déconnecté pour inactivité.";
        messageEl.className = "mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center text-sm font-medium text-amber-500";
    }

    form?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // UI State: Loading
        submitBtn.disabled = true;
        loader.classList.remove("hidden");
        btnText.style.opacity = "0";
        messageEl.textContent = "";

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                messageEl.textContent = "Erreur : " + error.message;
                messageEl.className =
                    "mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center text-sm font-medium text-red-400";
                submitBtn.disabled = false;
                loader.classList.add("hidden");
                btnText.style.opacity = "1";
            } else {
                messageEl.textContent = "Connexion réussie ! Redirection...";
                messageEl.className =
                    "mt-6 text-center text-sm font-medium text-emerald-400";

                window.location.href = "/dashboard";

            }
        } catch (err) {
            console.error(err);
            messageEl.textContent = "Une erreur technique est survenue.";
            messageEl.className =
                "mt-6 text-center text-sm font-medium text-red-400";
            submitBtn.disabled = false;
            loader.classList.add("hidden");
            btnText.style.opacity = "1";
        }
    });
</script>
</file>

<file path="src/pages/app/bookings.astro">
---
// src/pages/app/bookings.astro
import { supabase } from "@/lib/supabase/client";
import AppLayout from "../../layouts/AppLayout.astro";

const { profile, user } = Astro.locals;

if (!profile || !user) {
    return Astro.redirect("/login");
}

const safeProfile = profile;

const currentStatus = Astro.url.searchParams.get("status") || "all";
const currentType = Astro.url.searchParams.get("type") || "all";

/**
 * 🎯 LOGIQUE SÉCURISÉE (BACKEND SSR)
 */
let query = supabase
    .from("bookings")
    .select("*, customers!inner(*)")
    .eq("current_tenant_id", profile.tenant_id as string);

if (currentStatus !== "all") {
    if (currentStatus === "completed") {
        query = query.in("status", ["completed", "paid"]);
    } else {
        query = query.eq("status", currentStatus as any);
    }
}

if (currentType !== "all") {
    query = query.eq("booking_type", currentType as any);
}

if (profile.tenant_role === "driver") {
    const { data: driver } = await supabase
        .from("drivers")
        .select("id")
        .eq("user_id", user.id)
        .eq("tenant_id", profile.tenant_id!)
        .limit(1)
        .maybeSingle();

    if (driver) {
        query = query.eq("driver_id", driver.id);
    } else {
        query = query.eq("id", "00000000-0000-0000-0000-000000000000");
    }
}

const { data: bookings, error } = await query.order("created_at", {
    ascending: false,
});

if (error) console.error("Error fetching bookings:", error);

const tabs = [
    { id: 'all', label: 'Toutes', count: null },
    { id: 'pending', label: 'À Valider', count: null },
    { id: 'accepted_pending_payment', label: 'En Paiement', count: null },
    { id: 'completed', label: 'Terminées', count: null },
];

const STATUS_LABELS_FR: Record<string, string> = {
    pending: "En attente",
    accepted: "Confirmée",
    accepted_pending_payment: "En attente de paiement",
    paid: "Payée",
    completed: "Terminée",
    cancelled: "Annulée",
    cancelled_pending_refund: "Remboursement en cours",
    cancelled_refunded: "Remboursée",
    cancelled_no_refund: "Annulée",
    deprecated_refunded: "Remboursée",
    no_show: "Non présentation",
    expired_payment: "Paiement expiré",
    refund_failed: "Échec remboursement"
};

const typeFilters = [
    { id: 'all', label: 'Tous les bookings' },
    { id: 'transfer', label: 'Transferts' },
    { id: 'hourly', label: 'Mises à Dispo' },
];

// Helper to build URLs with multiple filters
const getFilterUrl = (params: Record<string, string>) => {
    const url = new URL(Astro.url.href);
    Object.entries(params).forEach(([key, value]) => {
        if (value === 'all') {
            url.searchParams.delete(key);
        } else {
            url.searchParams.set(key, value);
        }
    });
    return url.pathname + url.search;
};
---

<AppLayout title="Mes Courses">
    <div class="flex-1 flex flex-col p-12 overflow-hidden h-full">
        <!-- FIXED HEADER -->
        <div class="flex-shrink-0 border-b border-white/5 pb-8 mb-6">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span
                        class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black tracking-widest text-emerald-400 uppercase"
                    >
                        {
                            safeProfile.tenant_role === "driver"
                                ? "Mes Courses"
                                : "Toutes les Courses"
                        }
                    </span>
                    <h1
                        class="text-4xl font-black italic mt-4 uppercase tracking-tighter text-white"
                    >
                        Gestion des Bookings
                    </h1>
                </div>

                <!-- TABS -->
                <div class="flex flex-col gap-4">
                    <div class="flex bg-white/5 p-1 rounded-2xl border border-white/5 h-fit">
                        {tabs.map(tab => (
                            <a
                                href={getFilterUrl({ status: tab.id })}
                                class={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    currentStatus === tab.id
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                    : "text-slate-500 hover:text-white"
                                }`}
                            >
                                {tab.label}
                            </a>
                        ))}
                    </div>

                    <div class="flex justify-end relative inline-block group" id="type-dropdown-container">
                        <button
                            id="type-dropdown-button"
                            class="px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-xl shadow-white/5 flex items-center gap-3 min-w-[200px] justify-between"
                        >
                            <span>{typeFilters.find(f => f.id === currentType)?.label || 'Tous les bookings'}</span>
                            <svg class="w-3 h-3 opacity-30 group-focus-within:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <!-- DROP DOWN MENU -->
                        <div
                            id="type-dropdown-menu"
                            class="absolute top-full right-0 mt-2 bg-[#0A0B10] border border-white/10 rounded-2xl p-2 shadow-2xl opacity-0 scale-95 pointer-events-none group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:pointer-events-auto transition-all z-50 min-w-[200px]"
                        >
                            <div class="flex flex-col gap-1">
                                {typeFilters.map(filter => (
                                    <a
                                        href={getFilterUrl({ type: filter.id })}
                                        class={`px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                            currentType === filter.id
                                            ? "bg-white/5 text-white"
                                            : "text-slate-500 hover:bg-white/5 hover:text-white"
                                        }`}
                                    >
                                        {filter.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SCROLLABLE CONTENT -->
        <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {
                bookings && bookings.length > 0 ? (
                    <div class="glass rounded-3xl overflow-hidden border border-white/5 bg-white/[0.01]">
                        <div class="table-container">
                            <table class="w-full text-left border-collapse">
                                <thead class="bg-white/5 sticky top-0 z-10">
                                    <tr class="border-b border-white/5">
                                        <th class="px-8 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            Client / Détails
                                        </th>
                                        <th class="px-8 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            Date & Heure
                                        </th>
                                        <th class="px-8 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            Type
                                        </th>
                                        <th class="px-8 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            Statut
                                        </th>
                                        <th class="px-8 py-3 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            Montant
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-white/5">
                                    {bookings.map((booking) => (
                                        <tr class="hover:bg-white/5 transition-colors group">
                                            <td class="px-8 py-4">
                                                <div class="font-black text-white uppercase italic tracking-tighter text-lg leading-tight">
                                                    {booking.customers.first_name || ""} {booking.customers.last_name || ""}
                                                    {(!booking.customers.first_name && !booking.customers.last_name) && "Client"}
                                                </div>
                                                <div class="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">
                                                    {booking.customers.email}
                                                </div>
                                                <div class="mt-4 flex flex-col gap-1.5 pt-4 border-t border-white/5">
                                                    <div class="flex items-start gap-2">
                                                        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1"></span>
                                                        <div>
                                                            <div class="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none mb-1">Départ</div>
                                                            <div class="text-[11px] font-bold text-slate-300 uppercase tracking-tight line-clamp-1">{booking.pickup_address}</div>
                                                        </div>
                                                    </div>
                                                    {(booking.booking_type as any) === 'transfer' ? (
                                                        <div class="flex items-start gap-2 mt-2">
                                                            <span class="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1"></span>
                                                            <div>
                                                                <div class="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none mb-1">Arrivée</div>
                                                                <div class="text-[11px] font-bold text-slate-400 uppercase tracking-tight line-clamp-1">{booking.dropoff_address}</div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div class="flex items-start gap-2 mt-2 bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
                                                            <span class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1"></span>
                                                            <div>
                                                                <div class="text-[9px] text-amber-500 font-black uppercase tracking-widest leading-none mb-1">Service</div>
                                                                <div class="text-[11px] font-black text-amber-400 uppercase tracking-tighter">Mise à Disposition</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td class="px-8 py-4 font-medium">
                                                <div class="flex flex-col">
                                                    <span class="text-sm text-white font-black tabular-nums">
                                                        {new Date(booking.pickup_time).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
                                                    </span>
                                                    <span class="text-[11px] text-slate-500 font-bold mt-1">
                                                        {new Date(booking.pickup_time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="px-8 py-4">
                                                <span class={`inline-flex px-1.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                                    (booking.booking_type as any) === 'hourly'
                                                    ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                                                }`}>
                                                    {(booking.booking_type as any) === 'hourly' ? 'Mise à Dispo' : 'Transfert'}
                                                </span>
                                            </td>
                                            <td class="px-8 py-4">
                                                <span class={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${
                                                    booking.status === "completed" || booking.status === "paid"
                                                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                        : booking.status === "cancelled"
                                                            ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                                                            : "bg-white/10 text-slate-400 border-white/10"
                                                }`}>
                                                    {STATUS_LABELS_FR[booking.status] || booking.status}
                                                </span>
                                            </td>
                                            <td class="px-8 py-4 text-right font-black text-2xl text-white tabular-nums">
                                                {Number(
                                                    booking.total_amount,
                                                ).toFixed(2)}{" "}
                                                €
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div class="h-full flex flex-col items-center justify-center text-center pb-20">
                        <div class="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-8 border border-white/5 shadow-2xl">
                            <svg
                                class="w-10 h-10 text-slate-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-xl font-black uppercase italic tracking-wider text-slate-100 mb-2">
                            Historique vide
                        </h3>
                        <p class="text-slate-500 max-w-xs font-medium leading-relaxed">
                            Vos réservations passées et futures s'afficheront
                            ici.
                        </p>
                    </div>
                )
            }
        </div>
    </div>
</AppLayout>

<style>
    /* Styling for the dropdown arrow rotation and shadow refinement */
    #type-dropdown-container:focus-within #type-dropdown-button svg {
        rotate: 180deg;
    }

    #type-dropdown-menu {
        backdrop-filter: blur(20px);
    }
</style>
</file>

<file path="src/pages/app/dashboard.astro">
---
// src/pages/app/dashboard.astro
import { StripeConnectionCard } from "@/components/dashboard/StripeConnectionCard";
import { supabase } from "@/lib/supabase/client";
import AppLayout from "../../layouts/AppLayout.astro";

const { profile, supabase: supabaseAdmin } = Astro.locals;

if (!profile) return Astro.redirect("/login");

// 📅 Calcul des dates pour les KPIs
const now = new Date();
const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
).toISOString();
const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
).toISOString();

// 1️⃣ Courses du mois (Métier)
const { count: monthlyCount } = await supabaseAdmin
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("current_tenant_id", profile.tenant_id!)
    .gte("pickup_time", startOfMonth);

// 2️⃣ Données Financières (Source: Vue Ledger)
const { data: kpi } = await supabaseAdmin
    .from("tenant_dashboard_kpi")
    .select("*")
    .eq("tenant_id", profile.tenant_id!)
    .limit(1)
    .maybeSingle();

const monthlyRevenue = kpi?.monthly_net_revenue || 0;

// 3️⃣ Prochaines courses (Mise en avant)
const { data: upcomingBookings } = await supabaseAdmin
    .from("bookings")
    .select("*, customers!inner(*)")
    .eq("current_tenant_id", profile.tenant_id!)
    .gte("pickup_time", now.toISOString())
    .order("pickup_time", { ascending: true })
    .limit(3);

// 4️⃣ Courses en attente de validation (Mise à dispo)
const { data: validatingBookings } = await supabaseAdmin
    .from("bookings")
    .select("*, customers!inner(*)")
    .eq("current_tenant_id", profile.tenant_id!)
    .eq("status", "pending")
    .order("created_at", { ascending: true });

// 5️⃣ Dernières courses (Historique court)
const { data: pastBookings } = await supabaseAdmin
    .from("bookings")
    .select("*, customers!inner(*)")
    .eq("current_tenant_id", profile.tenant_id!)
    .lt("pickup_time", now.toISOString())
    .neq("status", "cancelled")
    .order("pickup_time", { ascending: false })
    .limit(2);

// 6️⃣ Récupérer l'ID driver du profil actuel
const { data: driver } = await supabaseAdmin
    .from("drivers")
    .select("id")
    .eq("user_id", profile.id)
    .maybeSingle();

const driverId = driver?.id;

// 7️⃣ Récupérer les infos du tenant pour le titre si besoin
const { data: tenant } = await supabaseAdmin
    .from("tenants")
    .select("name")
    .eq("id", profile.tenant_id!)
    .maybeSingle();

const tenantName = tenant?.name || "VTC HUB";
---

<AppLayout title="Dashboard">
    <div class="flex-1 flex flex-col p-12 overflow-y-auto">
        <!-- FIXED TOP SECTION -->
        <div class="flex-shrink-0 border-b border-white/5 pb-10 mb-10">
            <span
                class="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black tracking-widest text-indigo-400 uppercase"
                >{profile?.tenant_role || "Chauffeur"} — {profile?.first_name}</span
            >
            <h1
                class="text-5xl font-black italic mt-4 tracking-tighter uppercase text-white leading-none"
            >
                Tableau de bord
            </h1>

            <div class="mt-10">
                <StripeConnectionCard
                    client:only="react"
                    tenantId={profile.tenant_id!}
                    monthlyCount={monthlyCount || 0}
                    monthlyRevenue={monthlyRevenue}
                />
            </div>
        </div>

        <!-- DYNAMIC CONTENT SECTION -->
        <div class="flex flex-col gap-12">
            <!-- 🚥 À VALIDER (COURTES ÉCHÉANCES) -->
            {validatingBookings && validatingBookings.length > 0 && (
                <div>
                    <h3 class="text-lg font-black uppercase tracking-tighter flex items-center gap-3 text-amber-500 mb-6">
                        <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        À Valider (Mises à Dispo)
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {validatingBookings.map((booking) => (
                            <div class="glass p-6 rounded-[2rem] border border-amber-500/10 bg-amber-500/[0.02] hover:border-amber-500/40 transition-all">
                                <div class="flex justify-between items-start mb-4">
                                    <div class="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[9px] font-black tracking-widest text-amber-500 uppercase">
                                        Action Recommandée
                                    </div>
                                    <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
                                        {new Date(booking.pickup_time).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                                    </div>
                                </div>
                                <div class="mb-6">
                                    <p class="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Client</p>
                                    <p class="text-lg font-black text-white uppercase tracking-tighter">
                                        {booking.customers.first_name} {booking.customers.last_name}
                                    </p>
                                </div>
                                <div class="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <span class="text-[10px] font-black uppercase text-slate-400">Montant Est.</span>
                                    <span class="text-xl font-black text-white italic">{Number(booking.total_amount).toFixed(0)}€</span>
                                </div>
                                <a href={`/app/bookings?status=pending`} class="mt-6 block w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest text-center rounded-xl transition-all active:scale-95 shadow-lg shadow-amber-500/20">
                                    Valider le tarif
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <!-- ⚡️ PROCHAINES COURSES (MISE EN AVANT) -->
            <div>
                <h3 class="text-lg font-black uppercase tracking-tighter flex items-center gap-3 text-white mb-6">
                    <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    Prochaines Missions
                </h3>

                {upcomingBookings && upcomingBookings.length > 0 ? (
                    <div class="glass rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.01]">
                        <div class="table-container no-scrollbar">
                            <table class="w-full text-left border-collapse">
                                <tbody class="divide-y divide-white/5">
                                    {upcomingBookings.map((booking) => (
                                        <tr
                                            class="hover:bg-indigo-500/[0.05] transition-all cursor-pointer group booking-row"
                                            data-booking={JSON.stringify(booking)}
                                        >
                                            <td class="px-6 py-6 overflow-hidden">
                                                <div class="flex flex-col gap-6">
                                                    {/* TOP: TIME & ADDRESSES */}
                                                    <div>
                                                        <div class="inline-flex px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-[10px] font-black tracking-widest text-indigo-400 uppercase mb-3">
                                                            {new Date(booking.pickup_time).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })} — {new Date(booking.pickup_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                        <div class="flex flex-col gap-2">
                                                            <div class="flex items-center gap-2 min-w-0">
                                                                <div class="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                                                <span class="text-[11px] font-bold text-slate-300 truncate">{booking.pickup_address}</span>
                                                            </div>
                                                            <div class="flex items-center gap-2 min-w-0">
                                                                <div class="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                                                                <span class="text-[11px] font-bold text-slate-500 truncate">{booking.dropoff_address || '---'}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* BOTTOM: TYPE, NAME & PRICE */}
                                                    <div class="flex items-end justify-between gap-4">
                                                        <div class="min-w-0">
                                                            <p class={`text-[7px] font-black uppercase tracking-[0.2em] mb-1 px-1.5 py-0.5 rounded w-fit border ${
                                                                (booking.booking_type as any) === 'hourly'
                                                                ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                                : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                                                            }`}>
                                                                {(booking.booking_type as any) === 'hourly' ? 'Mise à Disposition' : 'Transfert'}
                                                            </p>
                                                            <p class="text-sm font-black text-white uppercase tracking-tighter truncate">
                                                                {booking.customers.first_name} {booking.customers.last_name}
                                                            </p>
                                                        </div>
                                                        <div class="text-2xl font-black text-white italic tabular-nums shrink-0">
                                                            {Number(booking.total_amount).toFixed(0)}€
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div class="glass p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] text-center text-slate-500 text-sm">
                        Aucune mission programmée pour le moment.
                    </div>
                )}
            </div>

            <!-- 📜 DERNIÈRES ACTIVITÉS (PAST - LAST 2) -->
            <div>
                <h3 class="text-lg font-black uppercase tracking-tighter flex items-center gap-3 text-white mb-6 opacity-30">
                    Dernières activités
                </h3>

                {pastBookings && pastBookings.length > 0 ? (
                    <div class="glass rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.01]">
                        <div class="table-container">
                            <table class="w-full text-left border-collapse">
                                <tbody class="divide-y divide-white/5">
                                    {pastBookings.map((booking) => (
                                        <tr
                                            class="hover:bg-white/[0.04] transition-all cursor-pointer group booking-row"
                                            data-booking={JSON.stringify(booking)}
                                        >
                                            <td class="px-8 py-6">
                                                <div class="flex items-center gap-4">
                                                    <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-white transition-colors">
                                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div class="font-bold text-white uppercase tracking-tighter">
                                                            {booking.customers.first_name} {booking.customers.last_name}
                                                        </div>
                                                        <div class="flex items-center gap-2 mt-0.5">
                                                            <span class={`text-[8px] font-black uppercase tracking-widest ${
                                                                (booking.booking_type as any) === 'hourly' ? 'text-amber-500/70' : 'text-indigo-400/70'
                                                            }`}>
                                                                {(booking.booking_type as any) === 'hourly' ? 'Mise à Dispo' : 'Transfert'}
                                                            </span>
                                                            <span class="text-[10px] text-slate-600 font-bold uppercase">
                                                                {new Date(booking.pickup_time).toLocaleDateString('fr-FR')} — Terminé
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-8 py-6 text-right">
                                                <div class="font-black text-white tabular-nums">
                                                    {Number(booking.total_amount).toFixed(2)} €
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p class="text-slate-600 text-sm">Aucun historique disponible.</p>
                )}
            </div>
        </div>
    </div>
</AppLayout>

<!-- MODAL DÉTAILS BOOKING -->
<div id="booking-modal" data-driver-id={driverId} class="fixed inset-0 z-[100] flex items-center justify-center p-6 opacity-0 pointer-events-none transition-all duration-300">
    <div class="absolute inset-0 bg-black/80 backdrop-blur-sm modal-overlay"></div>
    <div class="relative glass max-w-4xl w-full max-h-[90vh] rounded-[3rem] border border-white/10 shadow-2xl overflow-y-auto custom-scrollbar transform scale-95 transition-all duration-300">
        <div class="p-8 sm:p-10">
            <div class="flex items-center gap-4 mb-8">
                <div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <h2 class="text-3xl font-black uppercase text-white tracking-tighter">Détails Course</h2>
                    <div class="flex items-center gap-2">
                        <p id="modal-booking-ref" class="text-slate-500 text-xs font-bold uppercase tracking-widest">REF: #---</p>
                        <span id="modal-booking-type" class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border border-white/10 text-slate-400">---</span>
                    </div>
                </div>
            </div>

            <div class="space-y-8">
                <!-- CLIENT -->
                <div class="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4">
                    <div>
                        <p class="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Client</p>
                        <p id="modal-client-name" class="text-xl font-black text-white uppercase tracking-tighter">---</p>
                    </div>
                    <div class="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                        <a id="modal-client-phone-link" href="#" class="flex items-center gap-2 group/link">
                            <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover/link:bg-emerald-500/20 transition-colors">
                                <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <span id="modal-client-phone" class="text-xs text-slate-300 font-bold group-hover/link:text-white transition-colors">---</span>
                        </a>
                        <a id="modal-client-email-link" href="#" class="flex items-center gap-2 group/link">
                            <div class="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover/link:bg-indigo-500/20 transition-colors">
                                <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span id="modal-client-email" class="text-xs text-slate-300 font-bold group-hover/link:text-white transition-colors">---</span>
                        </a>
                    </div>
                </div>

                <!-- TRAJET & INFOS -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="space-y-6">
                        <div class="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4 relative group/map">
                            <a id="modal-map-link" href="#" target="_blank" class="absolute top-4 right-4 p-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-lg border border-indigo-500/20 transition-all flex items-center gap-2 group/btn">
                                <span class="text-[9px] font-black uppercase tracking-widest">Carte</span>
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 011.106-1.789L9 1.118l6 3 5.447-2.724A2 2 0 0121 3.236v9.764a2 2 0 01-1.106 1.789L15 17.382l-6 2.618z" />
                                </svg>
                            </a>
                            <div class="flex gap-3">
                                <div class="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                <div class="pr-12">
                                    <p class="text-[9px] font-black uppercase text-slate-500 mb-1">Départ</p>
                                    <p id="modal-pickup" class="text-xs text-slate-200 font-bold leading-tight">---</p>
                                </div>
                            </div>
                            <div class="flex gap-3">
                                <div class="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                <div class="pr-12">
                                    <p class="text-[9px] font-black uppercase text-slate-500 mb-1">Arrivée</p>
                                    <p id="modal-dropoff" class="text-xs text-slate-200 font-bold leading-tight">---</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white/5 p-6 rounded-2xl border border-white/4 shadow-inner flex flex-col justify-center">
                            <p class="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Rendez-vous</p>
                            <p id="modal-time" class="text-2xl font-black text-white italic">---</p>
                            <p id="modal-date" class="text-[10px] text-indigo-400 font-black uppercase mt-1">---</p>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <!-- PASSAGERS & BAGAGES -->
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-[8px] font-black uppercase text-slate-500 tracking-widest mb-1">Passagers</p>
                                    <p id="modal-passengers" class="text-xl font-black text-white">---</p>
                                </div>
                            </div>
                            <div class="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-[8px] font-black uppercase text-slate-500 tracking-widest mb-1">Bagages</p>
                                    <p id="modal-luggage" class="text-xl font-black text-white">---</p>
                                </div>
                            </div>
                        </div>

                        <!-- NOTES SUPPLÉMENTAIRES -->
                        <div class="bg-white/5 p-6 rounded-2xl border border-white/5">
                            <p class="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3">Notes supplémentaires</p>
                            <div id="modal-notes" class="text-[11px] text-slate-400 font-medium leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5 min-h-[80px]">
                                ---
                            </div>
                        </div>
                    </div>
                </div>

                <!-- FINANCES -->
                <div class="flex items-center justify-between p-5 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-600/20">
                    <div>
                        <p class="text-[9px] font-black uppercase text-white/60 tracking-widest mb-0.5">Montant TTC</p>
                        <p id="modal-amount" class="text-2xl font-black text-white italic tabular-nums">---€</p>
                    </div>
                    <div id="modal-status-badge" class="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg border border-white/20 text-[9px] font-black uppercase tracking-widest text-white">
                        ---
                    </div>
                </div>
            </div>

            <button id="modal-accept-btn" class="hidden mt-10 w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                Accepter la course
            </button>

            <button class="close-modal mt-4 w-full py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/5 shadow-xl">
                Fermer
            </button>
        </div>
    </div>
</div>

<script>
    import { supabase } from "@/lib/supabase/client";

    const modal = document.getElementById('booking-modal');
    const driverId = modal?.getAttribute('data-driver-id');
    const closeBtns = document.querySelectorAll('.close-modal');
    const overlay = document.querySelector('.modal-overlay');

    const toggleModal = () => {
        modal?.classList.toggle('opacity-0');
        modal?.classList.toggle('pointer-events-none');
        modal?.querySelector('.relative')?.classList.toggle('scale-95');
        document.body.classList.toggle('overflow-hidden');
    };

    document.querySelectorAll('.booking-row').forEach(row => {
        row.addEventListener('click', () => {
            const booking = JSON.parse(row.getAttribute('data-booking') || '{}');

            // Populate Modal
            const nameEl = document.getElementById('modal-client-name');
            const emailEl = document.getElementById('modal-client-email');
            const emailLinkEl = document.getElementById('modal-client-email-link') as HTMLAnchorElement;
            const phoneEl = document.getElementById('modal-client-phone');
            const phoneLinkEl = document.getElementById('modal-client-phone-link') as HTMLAnchorElement;
            const pickupEl = document.getElementById('modal-pickup');
            const dropoffEl = document.getElementById('modal-dropoff');
            const passengersEl = document.getElementById('modal-passengers');
            const luggageEl = document.getElementById('modal-luggage');
            const notesEl = document.getElementById('modal-notes');
            const timeEl = document.getElementById('modal-time');
            const mapLinkEl = document.getElementById('modal-map-link') as HTMLAnchorElement;
            const dateEl = document.getElementById('modal-date');
            const amountEl = document.getElementById('modal-amount');
            const refEl = document.getElementById('modal-booking-ref');
            const typeEl = document.getElementById('modal-booking-type');
            const statusEl = document.getElementById('modal-status-badge');

            const STATUS_LABELS_FR: Record<string, string> = {
                pending: "En attente",
                accepted: "Confirmée",
                accepted_pending_payment: "En attente de paiement",
                paid: "Payée",
                completed: "Terminée",
                cancelled: "Annulée",
                cancelled_pending_refund: "Remboursement en cours",
                cancelled_refunded: "Remboursée",
                cancelled_no_refund: "Annulée",
                deprecated_refunded: "Remboursée",
                no_show: "Non présentation",
                expired_payment: "Paiement expiré",
                refund_failed: "Échec remboursement"
            };

            if (nameEl) nameEl.innerText = `${booking.customers.first_name} ${booking.customers.last_name}`;

            if (emailEl) emailEl.innerText = booking.customers.email;
            if (emailLinkEl) emailLinkEl.href = `mailto:${booking.customers.email}`;

            if (phoneEl) phoneEl.innerText = booking.customers.phone || 'Non renseigné';
            if (phoneLinkEl) {
                if (booking.customers.phone) {
                    phoneLinkEl.href = `tel:${booking.customers.phone}`;
                    phoneLinkEl.style.display = 'flex';
                } else {
                    phoneLinkEl.style.display = 'none';
                }
            }

            if (pickupEl) pickupEl.innerText = booking.pickup_address;
            if (dropoffEl) dropoffEl.innerText = booking.dropoff_address || 'Non spécifiée';
            if (passengersEl) passengersEl.innerText = booking.passenger_count?.toString() || '1';
            if (luggageEl) luggageEl.innerText = booking.luggage_count?.toString() || '0';
            if (notesEl) notesEl.innerText = booking.notes || 'Aucune note particulière.';
            if (refEl) refEl.innerText = `REF: #${booking.id.split('-')[0].toUpperCase()}`;
            if (statusEl) {
                const status = booking.status;
                statusEl.innerText = STATUS_LABELS_FR[status] || status;

                // Optionnel: Couleur dynamique du badge status
                const statusColors: Record<string, string> = {
                    pending: 'bg-amber-500/20 text-amber-500 border-amber-500/20',
                    accepted: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20',
                    paid: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/20',
                    completed: 'bg-slate-500/20 text-slate-400 border-slate-500/20',
                    cancelled: 'bg-rose-500/20 text-rose-500 border-rose-500/20'
                };
                statusEl.className = `px-3 py-1.5 backdrop-blur-md rounded-lg border text-[9px] font-black uppercase tracking-widest ${statusColors[status] || 'bg-white/10 text-white border-white/10'}`;

                // --- LOGIQUE BOUTON ACCEPTER ---
                const acceptBtn = document.getElementById('modal-accept-btn');
                if (acceptBtn) {
                    if (status === 'paid') {
                        acceptBtn.classList.remove('hidden');

                        if (!driverId) {
                            acceptBtn.classList.add('opacity-50');
                            acceptBtn.onclick = () => {
                                alert("Attention : Vous devez être enregistré comme chauffeur pour accepter cette course. Veuillez créer votre profil chauffeur dans la section 'Chauffeurs'.");
                            };
                        } else {
                            acceptBtn.classList.remove('opacity-50');
                            acceptBtn.onclick = async () => {
                                try {
                                    acceptBtn.innerText = "Traitement...";
                                    acceptBtn.setAttribute('disabled', 'true');

                                    // Appel de la fonction Edge Supabase accept-booking
                                    const { error } = await supabase.functions.invoke('accept-booking', {
                                        body: { booking_id: booking.id, driver_id: driverId }
                                    });

                                    if (error) throw error;

                                    // Si OK, on reload
                                    window.location.reload();
                                } catch (err) {
                                    console.error("Erreur Accept Booking:", err);
                                    alert("Une erreur est survenue lors de l'acceptation de la course.");
                                    acceptBtn.innerText = "Accepter la course";
                                    acceptBtn.removeAttribute('disabled');
                                }
                            };
                        }
                    } else {
                        acceptBtn.classList.add('hidden');
                    }
                }
            }
            if (amountEl) amountEl.innerText = `${Number(booking.total_amount).toFixed(2)}€`;
            if (mapLinkEl) mapLinkEl.href = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(booking.pickup_address)}&destination=${encodeURIComponent(booking.dropoff_address || '')}`;

            if (typeEl) {
                const isHourly = (booking.booking_type as any) === 'hourly';
                typeEl.innerText = isHourly ? 'MISE À DISPOSITION' : 'TRANSFERT';
                typeEl.className = `px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${
                    isHourly
                    ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                }`;
            }

            const dateObj = new Date(booking.pickup_time);
            if (timeEl) timeEl.innerText = dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            if (dateEl) dateEl.innerText = dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

            toggleModal();
        });
    });

    closeBtns.forEach(btn => btn.addEventListener('click', toggleModal));
    overlay?.addEventListener('click', toggleModal);
</script>
</file>

<file path="src/layouts/AppLayout.astro">
---
// src/layouts/AppLayout.astro
import "../styles/global.css";
import { isTenant } from "../lib/guards";
import InactivityTimeout from "../components/common/InactivityTimeout.astro";

interface Props {
    title: string;
}

const { title } = Astro.props;
const { profile } = Astro.locals;
const pathname = new URL(Astro.request.url).pathname;

// Sécurité supplémentaire au niveau du layout
if (!isTenant(profile)) {
    return Astro.redirect("/onboarding");
}

// Pour satisfaire TypeScript car isTenant garantit qu'il n'est pas nul
const safeProfile = profile!;

const navItems = [
    {
        label: "Tableau de bord",
        href: "/app/dashboard",
        roles: ["owner", "manager", "driver"],
    },
    {
        label: "Courses",
        href: "/app/bookings",
        roles: ["owner", "manager", "driver"],
    },
    { label: "Chauffeurs", href: "/app/drivers", roles: ["owner", "manager"] },
    { label: "Véhicules", href: "/app/vehicles", roles: ["owner", "manager"] },
    { label: "Pricing", href: "/app/pricing", roles: ["owner", "manager"] },
];

const { data: tenant } = await Astro.locals.supabase
    .from("tenants")
    .select("name, logo_url")
    .eq("id", safeProfile.tenant_id!)
    .maybeSingle();

const logoUrl = tenant?.logo_url;

const tenantName = tenant?.name || "VTC HUB";
---

<!doctype html>
<html lang="fr" class="dark">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="generator" content={Astro.generator} />
        <title>{title} | VTC App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
        />
    </head>
    <body
        class="bg-black h-screen overflow-hidden text-slate-50 selection:bg-indigo-500/30 font-inter"
    >
        <div class="flex h-full flex-col md:flex-row">
            <header class="md:hidden flex flex-col items-center justify-center p-6 glass border-b border-white/5 flex-shrink-0 z-[60] text-center gap-4">
                <div class="flex flex-col items-center gap-3">
                    {logoUrl ? (
                         <div class="p-2 bg-white rounded-xl shadow-lg">
                            <img src={logoUrl} alt={tenantName} class="w-10 h-10 object-contain" />
                         </div>
                    ) : (
                        <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                            <span class="text-white font-black text-xl italic">{tenantName.charAt(0).toUpperCase()}</span>
                        </div>
                    )}
                    <span class="text-sm font-black tracking-tighter italic uppercase text-white">{tenantName}</span>
                </div>
                <button id="mobile-menu-toggle" class="absolute right-6 top-8 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </header>

            <!-- Sidebar Fixe (Desktop) -->
            <aside
                class="w-72 h-full glass border-r border-white/5 hidden md:flex flex-col p-6 flex-shrink-0"
            >
                <div class="mb-14 flex flex-col items-start gap-6 w-full">
                    {logoUrl ? (
                        <div class="p-4 bg-white/5 border border-white/10 rounded-3xl shadow-xl">
                            <img src={logoUrl} alt={tenantName} class="w-20 h-20 object-contain" />
                        </div>
                    ) : (
                        <div class="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-600/20 shrink-0">
                            <span class="text-white font-black text-4xl italic">{tenantName.charAt(0).toUpperCase()}</span>
                        </div>
                    )}
                    <div class="flex flex-col gap-1 w-full text-left">
                        <span class="text-2xl font-black tracking-tighter italic uppercase text-white leading-tight block truncate pr-4">{tenantName}</span>
                    </div>
                </div>

                <nav
                    class="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar"
                >
                    {
                        navItems.map(
                            (item) =>
                                item.roles.includes(
                                    safeProfile.tenant_role || "",
                                ) && (
                                    <a
                                        href={item.href}
                                        class={`flex items-center px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                                            pathname === item.href
                                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                    >
                                        {item.label}
                                    </a>
                                ),
                        )
                    }
                </nav>

                <div class="pt-6 mt-6 border-t border-white/5 space-y-3">
                    {
                        safeProfile.tenant_role === "owner" && (
                            <a
                                href="/app/settings"
                                class={`flex items-center px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    pathname === "/app/settings"
                                        ? "bg-white/10 text-white border border-white/10"
                                        : "text-slate-500 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                Paramètres
                            </a>
                        )
                    }
                    <button
                        id="logout-btn"
                        class="w-full flex items-center px-4 py-4 rounded-2xl hover:bg-red-500/10 text-[10px] font-black uppercase tracking-widest text-red-500/80 hover:text-red-500 transition-all text-left group"
                    >
                        <span>Se déconnecter</span>
                    </button>
                </div>
            </aside>

            <!-- Contenu Principal -->
            <main
                class="flex-1 h-full relative bg-[#050505] flex flex-col overflow-hidden"
            >
                <slot />
            </main>
        </div>

        <!-- Mobile Menu Drawer -->
        <div id="mobile-menu" class="fixed inset-0 z-[100] md:hidden pointer-events-none opacity-0 transition-all duration-300">
            <div class="absolute inset-0 bg-black/90 backdrop-blur-sm mobile-menu-overlay"></div>
            <div class="absolute inset-y-0 right-0 w-[85%] max-w-sm glass border-l border-white/10 p-8 transform translate-x-full transition-transform duration-300 flex flex-col overflow-hidden">
                <div class="flex items-center justify-between mb-10">
                    <div class="flex flex-col items-start text-left gap-4 w-full">
                        {logoUrl ? (
                            <div class="p-3 bg-white/5 border border-white/10 rounded-2xl">
                                <img src={logoUrl} alt={tenantName} class="w-16 h-16 object-contain" />
                            </div>
                        ) : (
                            <div class="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                <span class="text-white font-black text-4xl italic">{tenantName.charAt(0).toUpperCase()}</span>
                            </div>
                        )}
                        <span class="text-3xl font-black tracking-tighter italic uppercase text-white leading-tight truncate w-full">{tenantName}</span>
                    </div>
                    <button id="mobile-menu-close" class="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400 hover:text-white">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav class="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                    {
                        navItems.map(
                            (item) =>
                                item.roles.includes(
                                    safeProfile.tenant_role || "",
                                ) && (
                                    <a
                                        href={item.href}
                                        class={`flex items-center px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                                            pathname === item.href
                                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                    >
                                        {item.label}
                                    </a>
                                ),
                        )
                    }
                </nav>

                <div class="pt-6 mt-6 border-t border-white/5 space-y-4">
                    {
                        safeProfile.tenant_role === "owner" && (
                            <a
                                href="/app/settings"
                                class={`flex items-center px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    pathname === "/app/settings"
                                        ? "bg-white/10 text-white border border-white/10"
                                        : "text-slate-500 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                Paramètres
                            </a>
                        )
                    }
                    <button
                        id="logout-btn-mobile"
                        class="w-full flex items-center px-5 py-4 rounded-2xl hover:bg-red-500/10 text-[10px] font-black uppercase tracking-widest text-red-500/80 hover:text-red-500 transition-all text-left group"
                    >
                        <span>Se déconnecter</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Logout Confirmation Modal -->
        <div id="logout-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-6 opacity-0 pointer-events-none transition-all duration-300">
            <div class="absolute inset-0 bg-black/80 backdrop-blur-sm modal-overlay"></div>
            <div class="relative glass max-w-sm w-full rounded-[2.5rem] border border-white/10 shadow-2xl p-8 transform scale-95 transition-all duration-300 text-center sm:text-left">
                <div class="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500 mb-6 mx-auto sm:mx-0">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </div>
                <h3 class="text-2xl font-black italic uppercase text-white mb-2 tracking-tighter">Déconnexion</h3>
                <p class="text-slate-400 text-sm font-medium mb-8 leading-relaxed italic">
                    Es-tu sûr de vouloir te déconnecter ? Toutes les sessions actives seront fermées.
                </p>
                <div class="flex flex-col sm:flex-row gap-3 font-black uppercase text-[10px] tracking-widest">
                    <button id="confirm-logout" class="flex-1 py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-95">
                        Déconnexion
                    </button>
                    <button id="cancel-logout" class="flex-1 py-4 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl transition-all border border-white/5 active:scale-95">
                        Annuler
                    </button>
                </div>
            </div>
        </div>

        <style is:global>
            .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
            }

            #logout-modal.is-active {
                opacity: 1;
                pointer-events: auto;
            }
            #logout-modal.is-active > div:last-child {
                transform: scale(1);
            }

            #mobile-menu.is-active {
                opacity: 1;
                pointer-events: auto;
            }
            #mobile-menu.is-active > div:last-child {
                transform: translateX(0);
            }
        </style>

        <script>
            import { supabase } from "@/lib/supabase/client";
            const logoutBtn = document.querySelector("#logout-btn");
            const modal = document.querySelector("#logout-modal");
            const confirmBtn = document.querySelector("#confirm-logout");
            const cancelBtn = document.querySelector("#cancel-logout");
            const overlay = document.querySelector(".modal-overlay");

            const toggleModal = () => {
                modal?.classList.toggle('is-active');
                document.body.classList.toggle('overflow-hidden');
            };

            logoutBtn?.addEventListener("click", toggleModal);
            cancelBtn?.addEventListener("click", toggleModal);
            overlay?.addEventListener("click", toggleModal);

            confirmBtn?.addEventListener("click", async () => {
                await supabase.auth.signOut();
                window.location.href = "/";
            });

            // Mobile Menu Logic
            const mobileMenu = document.querySelector("#mobile-menu");
            const mobileMenuBtn = document.querySelector("#mobile-menu-toggle");
            const mobileMenuClose = document.querySelector("#mobile-menu-close");
            const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
            const logoutBtnMobile = document.querySelector("#logout-btn-mobile");

            const toggleMobileMenu = () => {
                mobileMenu?.classList.toggle('is-active');
                document.body.classList.toggle('overflow-hidden');
            };

            mobileMenuBtn?.addEventListener("click", toggleMobileMenu);
            mobileMenuClose?.addEventListener("click", toggleMobileMenu);
            mobileMenuOverlay?.addEventListener("click", toggleMobileMenu);
            logoutBtnMobile?.addEventListener("click", () => {
                toggleMobileMenu();
                toggleModal();
            });

            // Close on Escape
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    if (modal?.classList.contains('is-active')) toggleModal();
                    if (mobileMenu?.classList.contains('is-active')) toggleMobileMenu();
                }
            });
        </script>
        <InactivityTimeout timeoutMinutes={30} />
    </body>
</html>
</file>

<file path="src/middleware.ts">
// src/middleware.ts
import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(
  async ({ cookies, request, redirect, locals }, next) => {
    const url = new URL(request.url);
    const path = url.pathname;

    // Initialisation Supabase (SSR)
    const supabase = createServerClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll: () =>
            parseCookieHeader(request.headers.get("Cookie") ?? "").map((c) => ({
              name: c.name,
              value: c.value ?? "",
            })),
          setAll: (cookiesToSet) =>
            cookiesToSet.forEach(({ name, value, options }) =>
              cookies.set(name, value, options as any),
            ),
        },
      },
    );

    locals.supabase = supabase;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Mapping des types de routes
    const isLoginPage = path === "/login";
    const isSignupPage = path === "/signup";
    const isAuthPage = isLoginPage || isSignupPage;

    const isAppRoute = path.startsWith("/app");
    const isAdminRoute = path.startsWith("/admin");
    const isOnboardingRoute = path.startsWith("/onboarding");
    const isDashboardBase = path === "/dashboard";
    const isSaaSRoute =
      isAppRoute || isAdminRoute || isOnboardingRoute || isDashboardBase;

    // 1. CAS : Utilisateur NON connecté
    if (!user) {
      if (isSaaSRoute && !isAuthPage) {
        return redirect("/login");
      }
      return next();
    }

    locals.user = user;

    // 2. CAS : Utilisateur connecté -> Récupérer profil
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    locals.profile = profile || null;

    // 3. LOGIQUE DE REDIRECTION (Pour connectés sur Login/Dashboard/Apps)
    if (isSaaSRoute || isAuthPage) {
      // --- PRIORITÉ : ADMIN Plateforme ---
      if (profile?.platform_role) {
        // Toujours vers l'admin dashboard
        if (!isAdminRoute) {
          return redirect("/admin/onboardings");
        }
        return next();
      }

      // --- PRIORITÉ : Flow Onboarding (Pending) ---
      if (profile?.tenant_role === "pending") {
        // Vérifier s'il a déjà soumis un dossier
        const { data: onboarding } = await supabase
          .from("onboarding")
          .select("status")
          .eq("profile_id", user.id)
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        // S'il a un dossier pending, il va sur waiting-approval, SAUF s'il demande explicitement /onboarding?edit=true
        const isWaitingApprovalPage = path === "/waiting-approval";
        const isEditingOnboarding =
          path === "/onboarding" && url.searchParams.get("edit") === "true";

        if (onboarding && !isWaitingApprovalPage && !isEditingOnboarding) {
          return redirect("/waiting-approval");
        }

        if (!onboarding && !isOnboardingRoute) {
          return redirect("/onboarding");
        }

        return next();
      }

      // --- PRIORITÉ : Chauffeur Actif (Onboardé) ---
      if (profile?.tenant_id) {
        if (!isAppRoute) {
          return redirect("/app/dashboard");
        }
        return next();
      }

      // --- CAS : Nouveau connecté sans rôle défini (Sécurité) ---
      if (isSaaSRoute && !isOnboardingRoute && !isAdminRoute) {
        return redirect("/onboarding");
      }
    }

    return next();
  },
);
</file>

</files>
