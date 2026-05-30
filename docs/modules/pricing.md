# Tarification — Module Pricing

## Source de vérité

Toute la logique de calcul est centralisée dans **`src/lib/pricing.ts`** (TS pur, zéro dépendance). Ce module est importé à la fois côté serveur et côté client — il n'existe qu'une seule implémentation.

```
src/lib/pricing.ts
  ├── importé par src/pages/api/tenant/create-booking.ts  (calcul réel, facturé)
  └── importé par src/scripts/bookings.ts                 (estimation UI temps réel)
```

## Formules

| Type de course | Formule | Règle |
|---|---|---|
| Transfert | `base_price + price_per_km × distance_km` | `minimum_fare` appliqué si résultat inférieur |
| Mise à dispo | `base_price + price_per_hour × duration_hours` | `minimum_fare` appliqué si résultat inférieur |
| Forfait fixe | `fixed_routes.price` (catégorie véhicule matchée) | Aucun calcul dynamique |

## API du module

```typescript
calculatePrice(input: PriceInput): number
// Calcule le total pour une règle tarifaire donnée.

findPricingRule(rules: PricingRule[], vehicleCategory: string): PricingRule | null
// Sélectionne la règle matchant la catégorie du véhicule.
// Fallback sur la première règle active si aucune ne matche.
```

## Sélection de la règle tarifaire

1. Toutes les règles `active = true` du tenant sont récupérées
2. `findPricingRule` cherche la règle dont `service_category` correspond à la catégorie du véhicule (insensible à la casse)
3. Si aucune ne matche → première règle disponible (ordre `created_at DESC`)

## `pricing_mode` — valeurs

| Valeur | Signification |
|---|---|
| `direct` | Prix calculé automatiquement depuis `pricing_rules` |
| `manual` | Prix saisi manuellement par le chauffeur (champ "Prix €" modifié) |

## Colonnes DB persistées (table `bookings`)

| Colonne | Type | Remplie si |
|---|---|---|
| `distance_km` | `numeric` | Course de type `transfer` |
| `duration_hours` | `numeric` | Course de type `hourly` (ajoutée via migration `20260522000000`) |
| `pricing_mode` | `enum` | Toujours — `direct` ou `manual` |

## Calcul automatique côté formulaire

Le prix s'actualise automatiquement dans le formulaire "Nouvelle Course" à chaque changement de :
- Type de course (transfert / mise à dispo)
- Véhicule sélectionné (change la règle tarifaire appliquée)
- Forfait sélectionné
- Distance km (saisie manuelle ou via bouton **⚡ Estimer**)
- Durée en heures (mise à dispo)

Le champ "Prix €" reste éditable — toute modification manuelle du chauffeur passe en `pricing_mode: manual`.

## Bouton ⚡ Estimer l'itinéraire

Appelle deux APIs publiques séquentiellement :

1. **Nominatim** (OpenStreetMap) — géocode l'adresse texte en coordonnées `lat/lng`
   - Endpoint : `https://nominatim.openstreetmap.org/search`
   - Requires `User-Agent` header
2. **OSRM** (routing) — calcule la distance routière réelle
   - Endpoint : `https://router.project-osrm.org/route/v1/driving/`
   - ⚠️ Serveur de démonstration public — à remplacer par une instance dédiée en production haute charge

## Validation côté serveur

- `manual_total` : accepté si `> 0` et `≤ 9999€` (évite les erreurs de saisie)
- Si aucune règle tarifaire active et aucun montant manuel → `HTTP 400`
- Le serveur **recalcule toujours** le prix même quand l'estimation front est fournie (si `manual_total` absent)
