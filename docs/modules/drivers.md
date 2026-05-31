# Module Drivers — VTC HUB

## Rôle
Gère la capacité de conduite, les licences professionnelles et l'association des véhicules.

## Modèle Driver

| Colonne | Type | Contrainte |
|---|---|---|
| `id` | uuid | PK |
| `tenant_id` | uuid | FK → tenants, NOT NULL |
| `user_id` | uuid | FK → profiles, UNIQUE (nullable pour collaborateurs sans compte) |
| `first_name` | text | NOT NULL |
| `last_name` | text | NOT NULL |
| `phone` | text | NOT NULL |
| `license_number` | text | NOT NULL (carte pro VTC) |
| `created_at` | timestamptz | NOT NULL |

La table `drivers` est découplée de `profiles` : un driver peut exister sans compte utilisateur (cas collaborateur non-inscrit en V1).

## Chauffeur Titulaire vs Collaborateur
- **Titulaire** : `drivers.user_id = profiles.id` du propriétaire du compte. Initialisé via `initializePrimaryDriver()` qui copie les données depuis la table `onboarding`.
- **Collaborateurs** : `user_id = NULL` (V1). Créés manuellement par l'owner. Pas encore de compte dédié.

## Composants UI

| Composant | Rôle |
|---|---|
| `src/components/drivers/DriverList.tsx` | Liste drivers + sections Titulaire / Collaborateurs. Prop `isOwner` contrôle la visibilité du bouton "Ajouter". |
| `src/components/drivers/DriverModal.tsx` | Modal création/édition (prénom, nom, téléphone, carte pro). |
| `src/components/profile/EditableDriverCard.tsx` | Carte inline sur `/app/profile` : affiche et édite prénom, nom, téléphone, carte pro du driver titulaire. Source : record `drivers` (priorité) avec fallback `profile`. |

## Règle Véhicule Actif
- Table `vehicles` stocke la flotte.
- Un chauffeur ne peut avoir qu'un seul véhicule marqué actif par chauffeur.
- Déclenché via le trigger Postgres `trg_single_active_vehicle`.

## Sécurité & RLS

| Policy | Opération | Condition |
|---|---|---|
| `drivers_isolation` | SELECT | `tenant_id = profiles.tenant_id` de l'user courant |
| `drivers_tenant_isolation` | SELECT / UPDATE / DELETE | `tenant_id = current_tenant_id()` |
| `drivers_insert_owner_only` | **INSERT** | `tenant_id = current_tenant_id()` **ET** `profiles.tenant_role = 'owner'` |

Seul l'owner peut créer de nouveaux chauffeurs, enforced au niveau base de données.

## Service
`src/services/drivers.ts` expose :
- `getDrivers(tenantId)` — liste tous les drivers du tenant
- `createDriver(data)` — insert (bloqué RLS si non-owner)
- `updateDriver(id, updates)` — patch
- `deleteDriver(id)` — suppression
- `initializePrimaryDriver(tenantId, userId)` — auto-création du chauffeur titulaire depuis les données d'onboarding
