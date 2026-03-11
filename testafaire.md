# Tester ce scénario :

Simule erreur Stripe (mets une mauvaise clé API temporairement)

Annule booking

Booking doit passer en refund_failed

Remets bonne clé

Retry annulation

Refund doit passer

Si ça fonctionne → système blindé.


# dashboard admin 
vue par chauffeurs



# general 
mise en place email inscription
mise en place email reservation chauffeur
mise en place email confirmation de reservation client
delete et log refus inscription (admin)
email a raccorder durant inscription 

# dashboard chauffeur
possibilité de suppression de compte avec demande de confirmation
tableau de bord avec course faite course en attente 
calendrier et email connecter avec rappel de course
etat des paiements (en attente, payé, en retard)
total courses et montants semaines mois années
editions bilan mois et années.
configuration des tarifs heure km et prix fixe navettes.
visualisation et modification des pdfs.

# evolution Reservation 
Mise en place PDF devis chauffeur avec prix deja realiser + possiblité de modification  
mise en place mailling
-chauffeur avec bouton acceptation refus ou (plus tard choix de prise en charge)
-de confirmation de réservation client avec devis + possibilité d'annulation sous delais. (infos sur la course)
-facturation a la fin de la course 


# evolution sur la course 
bouton dans dashboard chauffeur pour demarre la prise en charge (coordonnée gps et heure debut logger)
annulation bouton dashboard 
timing si retard client (plus tard) 
paiement en cash voir comment integration 

# details

Ajouter un bouton "Retry" sur les réservations en échec (refund_failed ou payment_failed).

Ce bouton doit relancer la même action (refund ou capture) en utilisant les mêmes données.

Le bouton doit être visible uniquement si le statut est en échec.

Le bouton doit être désactivé pendant l'exécution de l'action (pour éviter les double-clics).