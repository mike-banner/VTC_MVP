# Module Dispatch — VTC HUB

## Rôle
Gestion de l'attribution des courses au sein d'un tenant ou vers des chauffeurs partenaires (V2/V3+).

## Dispatch Interne (V1)
- Toute course créée manuellement par un chauffeur connecté dans son backoffice lui est automatiquement assignée.
- Les réservations en ligne arrivent en statut `to_validate` et doivent être acceptées manuellement par l'owner.

## Évolution Réseau (Prévu V3/V4)
- Partage de courses entre cercles de chauffeurs avec commission de redistribution automatique (table `commissions` existante).
