# 🏗️ Booking Architecture Rules (V2)

## 🎯 Les 3 Piliers de l'Architecture

Pour garantir une flexibilité SaaS, chaque réservation est définie par trois axes indépendants.

### 1. `booking_type` (Le Service)

_Qu'est-ce que le client a réservé ?_

| Type         | Description                                |
| :----------- | :----------------------------------------- |
| **transfer** | Trajet point A → point B.                  |
| **hourly**   | Mise à disposition à l'heure.              |
| **manual**   | Créé manuellement via le backoffice admin. |
| **dispatch** | Assignation interne à une flotte.          |
| **share**    | Course partagée sur le réseau/cercle.      |

### 2. `booking_flow` (Le Workflow)

_Comment la réservation est-elle traitée commercialement ?_

| Flow                  | Description                                     | Workflow Type                                 |
| :-------------------- | :---------------------------------------------- | :-------------------------------------------- |
| **pay_first**         | Le client paie avant confirmation.              | `form → stripe → paid → booking`              |
| **accept_then_pay**   | Chauffeur accepte, puis lien de paiement.       | `booking → accepted → payment → paid`         |
| **accept_only**       | Confirmation sans paiement en ligne nécessaire. | `booking → accepted → completed`              |
| **internal_dispatch** | Assignation directe à un chauffeur interne.     | `booking → pending → assigned → accepted`     |
| **network_share**     | Partage sur un cercle avec commission.          | `booking → shared → accepted_by_other → paid` |

### 3. `status` (L'État)

_Où en est la réservation dans son cycle de vie ?_
(Voir `docs/booking_status.md` pour la liste complète des statuts).

---

## 🛠️ Exemples de Combinaisons possibles

| Type       | Flow              | Status final               | Cas d'usage                              |
| :--------- | :---------------- | :------------------------- | :--------------------------------------- |
| `transfer` | `pay_first`       | `paid`                     | Client web standard (B2C).               |
| `transfer` | `accept_then_pay` | `accepted_pending_payment` | Client Pro ou Réservation par téléphone. |
| `transfer` | `accept_only`     | `accepted`                 | Paiement Cash à bord (Main à main).      |
| `share`    | `network_share`   | `shared`                   | Course envoyée au réseau de partenaires. |

## 🚀 Impact Implementation (Next Steps)

1. **Migration DB** : Ajouter `booking_flow` (enum) à la table `bookings`.
2. **Logic Engine** : Adapter les fonctions de création pour assigner le bon `booking_flow` selon l'origine du booking.
3. **UI** : Afficher des actions différentes selon le flow (ex: bouton "Payer" uniquement si `flow == accept_then_pay`).
