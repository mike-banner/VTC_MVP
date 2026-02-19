# ✅ VERSION CORRIGÉE — `docs/flows.md` (Alignée V1)

Tu peux remplacer ton fichier par ceci :

---

# 🔄 System Flows — VTC HUB (V1)

---

## 🟢 1️⃣ Signup Flow

1. User s’inscrit via Supabase Auth
2. `auth.users` est créé
3. Trigger `handle_new_user` crée une ligne dans `profiles`
4. `profiles.tenant_id = NULL`
5. User est redirigé vers `/onboarding`

---

## 🟡 2️⃣ Onboarding Flow

1. User remplit le formulaire onboarding
2. Insertion dans `onboarding` avec :

```
status = 'pending'
```

3. Redirection vers `/pending`
4. Accès au dashboard bloqué tant que non validé

---

## 🔵 3️⃣ Admin Validation Flow

1. Super Admin accède à `/admin`

2. Clique sur "Approve"

3. Appel RPC `approve_onboarding_tx(onboarding_uuid)`

4. Transaction atomique :

   * Vérifie que onboarding = pending
   * Crée `tenant`
   * Met à jour `profiles.tenant_id`
   * Met `tenant_role = owner`
   * Crée driver initial
   * Crée véhicule initial
   * Crée pricing_rules
   * Met `onboarding.status = approved`

5. User peut maintenant accéder au dashboard

---

## 🟢 4️⃣ Active User Flow

1. User login
2. Middleware SSR vérifie :

   * `platform_role` → accès `/admin`
   * `tenant_id` → accès `/app`
   * sinon → `/onboarding`
3. Accès au dashboard ERP

---

# 🚗 5️⃣ Booking Flow (V1 Actif)

## Création

1. Client crée une réservation (site ou backoffice)
2. Frontend envoie `distance_km`
3. Backend :

   * Récupère pricing_rules actif
   * Recalcule le prix
   * Applique minimum_fare
   * Insère booking

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

* Liste bookings
* KPI du jour
* KPI du mois
* Total brut

---

# 💳 6️⃣ Payment Flow (V1)

* Stripe est optionnel
* Chaque tenant connecte son propre compte Stripe
* Aucun flux financier ne transite par la plateforme

---

# 🔐 Security Enforcement

* Toutes les queries filtrées par `tenant_id`
* RLS actif sur tables métier
* Calcul prix toujours validé côté backend
* SERVICE_ROLE utilisé uniquement côté serveur

---

# 🔮 Future Flows (Versions ultérieures)

## V2

* Assignation chauffeur
* Permissions fines manager / driver
* Facturation automatique

## V3

* Rapports financiers avancés
* Suivi cash

## V4

* Cercle
* Partage de courses
* Commission réseau
* Parrainage

---

# 🎯 Résultat

Ton fichier flows est maintenant :

* Cohérent avec V1 réel
* Sans fonctionnalités non activées
* Aligné avec ton modèle ERP

---
