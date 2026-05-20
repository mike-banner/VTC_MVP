# Module Rides & Bookings — VTC HUB

## Rôle
Gère la réservation, l'estimation tarifaire, l'assignation de chauffeur et le cycle opérationnel terrain.

## Cycle de Vie Opérationnel (mission_status)
1. `to_validate` : Course créée par le client, en attente de prise en charge chauffeur.
2. `not_started` : Chauffeur en route vers le client (`en_route`).
3. `in_progress` : Client à bord (`on_board`).
4. `completed` : Course finalisée, déblocage de la facturation et notation.

## Logique Tarifaire
- Calculé via `base_price` + `price_per_km * distance_km`.
- Le minimum appliqué est défini par `minimum_fare`.
- `manual_total` permet d'outrepasser ce calcul pour les courses créées manuellement depuis le backoffice.

## Forfaits & Zones (Fixed Routes)
Le système permet de définir des tarifs fixes pour des trajets spécifiques (ex: Transfert Aéroport).
- **Zones** : Définition de zones géographiques (Aéroport CDG, Paris Centre, etc.).
- **Forfaits (Fixed Routes)** : Association de deux zones avec un prix fixe par catégorie de véhicule.
- **Bidirectionnalité** : Option pour appliquer le même tarif dans les deux sens de circulation.
- **Priorité** : Ces forfaits sont prioritaires sur le calcul kilométrique dynamique si le trajet correspond exactement.

## Évaluation & Notation
- Une fois la course terminée (`mission_status === 'completed'`), le système débloque l'évaluation passager.
- Le chauffeur génère localement un QR code menant à `/rate/[booking_id]`.
- **Smart Feedback Routing** :
  - Notes $\ge 4/5$ : Bouton d'action pour redirection vers les avis Google Reviews de l'entreprise.
  - Notes $\le 3/5$ : Enregistrement interne dans Supabase uniquement (protection d'e-réputation).


