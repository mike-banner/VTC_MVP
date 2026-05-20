# Module Drivers — VTC HUB

## Rôle
Gère la capacité de conduite, les licences professionnelles et l'association des véhicules.

## Modèle Driver
- Table `drivers` liée à `profiles` via `user_id`.
- Permet de découpler l'identité de l'utilisateur (auth) de son profil de chauffeur (VTC).
- Permet à terme le multi-chauffeur par tenant.

## Règle Véhicule Actif
- Table `vehicles` stocke la flotte.
- Un chauffeur ne peut avoir qu'un seul véhicule marqué actif.
- Déclenché via le trigger Postgres `trg_single_active_vehicle`.
