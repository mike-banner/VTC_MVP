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
