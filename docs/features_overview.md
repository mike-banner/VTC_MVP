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
