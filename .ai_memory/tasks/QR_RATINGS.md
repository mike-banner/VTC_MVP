# ⭐ QR Code Ratings Architecture

## Goal

Enable instantaneous mission ratings by passengers using a QR code displayed on the driver's device, with real-time feedback for the dashboard and public site.

## ⚙️ Technical Stack

- **Library**: `qrcode.react` (React component for fast, client-side QR generation).
- **Target URL**: `https://[domain]/rate/[booking_id]` (public, minimalist).

## 🚀 Workflows

### Driver Workflow (Dashboard)

1. **Conditions**: Ride status is ongoing/finished (`currentTime >= pickup_time`).
2. **Action**: "⭐ Évaluer" button in the Mission Detail Modal.
3. **Display**: Full-screen or centered QR code to be scanned by the customer.

### Passenger Workflow (Public Page)

1. **Source**: Scanned QR Code.
2. **Page**: `/rate/[booking_id]`.
3. **Content**:
   - 1 to 5 Star selector (interactive).
   - Optional text comment area.
   - "Submit" via a secure Supabase call (using the booking UUID).
4. **Outcome**: Success message and immediate update of the `bookings` table.

## 🗄️ Data Layer

- **`bookings` table**: Add `rating` (smallint) and `rating_comment` (text).
- **`driver_ratings` View**: Aggregates average rating and total counts per driver/tenant for display on the dashboard and main website.

## 📬 Future / Roadmap

- **Email Link**: Button to send the `/rate/[id]` link to the customer post-mission.
