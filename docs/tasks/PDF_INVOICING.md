# 📄 PDF Invoicing Architecture

## Goal

Generate legal, professional PDF invoices for every VTC mission and deliver them automatically to the customer.

## ⚙️ Generation Engine: Supabase Edge Functions

- **Function Name**: `generate-invoice`
- **Library**: `jsPDF` or `react-pdf` (rendered in a Node/Edge environment).
- **Template**: High-fidelity HTML/CSS template reflecting the "Elite" brand.
- **Content**:
  - **Tenant Info**: Name, SIRET, VAT, Address (from `tenants` table).
  - **Booking Info**: ID, Date, Pickup, Dropoff, Type (Hourly/Transfer).
  - **Financials**: Subtotal, VAT (from tenant settings), Total Amount.

## 🗄️ Storage & Delivery

- **Bucket**: `invoices` (Supabase Storage).
- **Structure**: `invoices/[tenant_id]/[booking_id].pdf`.
- **Email**: Sent via `send-invoice` (or integrated into `generate-invoice`) using Resend/SendGrid api with the PDF as an attachment.

## 🚀 Triggers

| Trigger       | Event                                   | Action                                                               |
| :------------ | :-------------------------------------- | :------------------------------------------------------------------- |
| **Automatic** | Booking status -> `paid` or `completed` | Generate PDF + Upload + Send Email.                                  |
| **Manual**    | Driver clicks "📄 Facture" in Dashboard | Check Storage; if exists -> Send/Download; if not -> Force Generate. |

## 🛠️ Database Schema Integration

- **`bookings` table**: Add `invoice_url` to store the signed URL or bucket path.
- **`tenants` table**: Ensure legal fields are fully populated (SIRET, VAT, Legal Name).
