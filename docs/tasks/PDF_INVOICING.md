# 📄 Architecture Facturation & Cohabitation (Stripe / TPE / Cash)

## Objectif
Permettre aux chauffeurs d'encaisser via 3 canaux distincts tout en garantissant un flux de facturation légal, unique et immuable en fin de course.

## 🗄️ Structure de la Base de Données

### 1. Modes de Paiement (`payment_mode` Enum)
- `stripe` : Paiement en ligne par carte (automatique).
- `tpe` : Terminal physique dans le véhicule (manuel).
- `cash` : Espèces remises au chauffeur (manuel).

### 2. Table `invoices` (Immuable)
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) UNIQUE,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  invoice_number VARCHAR(50) NOT NULL UNIQUE, -- FAC-YYYYMM-XXXX
  amount_ht INT NOT NULL, -- En centimes
  vat_amount INT NOT NULL, -- En centimes
  amount_ttc INT NOT NULL, -- En centimes
  payment_mode payment_mode NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'issued', -- issued, paid, canceled
  pdf_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- RLS Stricte : Pas de modifications
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read invoices" ON invoices FOR SELECT USING (true); -- filtré par RLS tenant
-- UPDATE et DELETE interdits pour garantir l'immutabilité fiscale
```

---

## ⚙️ Cycle de Vie & Génération

| Moyen | Flux d'Encaissement | Déclencheur Facture | Mention Facture |
| :--- | :--- | :--- | :--- |
| **Stripe** | Paiement en ligne pré-course ou post-course via redirection. | Webhook `payment_intent.succeeded` -> Statut course `paid` | *"Payé en ligne via Stripe"* |
| **TPE** | Le chauffeur passe la carte du client sur son propre terminal physique. | Le chauffeur clique sur *"Terminer & Encaisser (TPE)"* dans l'App mobile -> Statut `completed`. | *"Payé par carte bancaire (TPE Chauffeur)"* |
| **Cash** | Le client donne les espèces au chauffeur. | Le chauffeur clique sur *"Terminer & Encaisser (Espèces)"* dans l'App mobile -> Statut `completed`. | *"Payé en espèces"* |

---

## 🚀 Le Pipeline de Génération Local (Factur-X)

1. **Trigger Postgres** : Un booking passe au statut final (`paid` pour stripe, `completed` pour TPE/Cash).
2. **Worker Asynchrone (Node.js)** :
   - Récupère les métadonnées (Siret tenant, infos client, montant, mode de paiement).
   - Génère le HTML de la facture (Template Elite).
   - Convertit en PDF/A-3 via API de rendu (ex: Gotenberg / Browserless).
   - Injecte les métadonnées structurées XML (Factur-X) dans le PDF/A-3.
3. **Storage** : Upload du PDF dans le bucket privé `invoices`.
4. **Emailing** : Appel API Resend pour envoyer le mail de confirmation de course au client avec la facture en pièce jointe.
