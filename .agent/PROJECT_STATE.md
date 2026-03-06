# 🧠 Agent Memory - VTC HUB

## 🏗️ Architecture & Source of Truth

- **Séparation Stricte (Multi-Repo)** :
  - **Repo 1 (Backend/Admin)** : `vtc-backoffice` (Ce dépôt). Maître de la donnée, du Ledger, de Stripe et de la logique métier.
  - **Repo 2 (Public)** : `vtc-site-chauffeur`. UI de réservation, tracking et conversion.
- **Règle d'or** : Le Repo 2 ne traite aucune donnée sensible et n'effectue aucun calcul de prix. Tout passe par les Edge Functions du Repo 1.
- **Source of Truth** : La base Cloud reste la seule vérité.
- **Database Schema**: La vérité est en **Cloud**.
- **Protocole de lecture** : Toujours exécuter `npm run gen:types` AVANT d'inspecter l'état de la base.
- **Local Reference**: Se baser EXCLUSIVEMENT sur `src/lib/supabase/database.types.ts` après génération pour valider l'existence d'une table ou d'une colonne.
- **Migrations**: Utiles pour l'historique, mais NE PAS s'y fier pour l'état actuel.
- **Règle Stricte Migrations** : Ne JAMAIS créer de nouveau fichier de migration (`.sql`) automatiquement. Toujours vérifier les migrations existantes ou demander l'accord avant d'en générer une, pour ne pas dérégler l'ordre des commits de l'utilisateur.

## 🔒 Multi-Tenancy Rules

- **Isolation**: Basée sur `tenant_id` (UUID).
- **RLS**: Extraction du `tenant_id` via le profil de l'utilisateur connecté (`auth.uid()`).
- **Service Role**: Les Edge Functions et le backend utilisent la `service_role_key` pour bypasser la RLS sur les tables sensibles (ex: `financial_movements`).

## 💰 Financial Ledger

- **Table unique**: `financial_movements` remplace `booking_commissions` et `refunds`.
- **Snapshots**: Les taux de commission plateforme et chauffeur sont sauvegardés au moment du mouvement dans `platform_commission_rate_snapshot`.
- **Idempotence**: Vérification systématique via `stripe_events`.
