# 🔄 System Flows

---

## 🟢 Signup Flow

1. User signup
2. auth.users créé
3. Trigger crée profile
4. profile.tenant_id = null

---

## 🟡 Onboarding Flow

1. User remplit formulaire
2. Insert onboarding (pending)
3. Redirect /pending

---

## 🔵 Admin Validation Flow

1. Admin clique Valider
2. approve_onboarding_tx()
3. Création tenant
4. Création driver
5. Création vehicle
6. Création pricing
7. onboarding.status = processed

---

## 🟢 Active User Flow

1. Login
2. Middleware vérifie tenant_id
3. Accès dashboard

---

## 🔁 Booking Flow (Prévu)

1. Client crée booking
2. Booking lié au tenant
3. Pricing calculé
4. Commission enregistrée

---

## 🔄 Circle Sharing Flow (Prévu)

1. Tenant partage booking
2. Autre tenant accepte
3. booking.current_tenant_id modifié