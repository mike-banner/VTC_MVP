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
