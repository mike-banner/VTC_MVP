# Incident Handling — VTC HUB

## Problèmes fréquents & Résolution rapide

### 1. Conflit de signature Webhook Stripe
- Symptôme : Les webhooks échouent avec une erreur 401 ou signature invalide.
- Action : Vérifier que le secret de signature Stripe (`STRIPE_WEBHOOK_SECRET`) est correctement configuré via les secrets de fonctions Supabase.

### 2. Triggers SQL désactivés en Dev
- Symptôme : Les règles métier (ex: un seul véhicule actif) ne s'appliquent plus.
- Action : Exécuter la commande SQL suivante pour réactiver les triggers :
  ```sql
  ALTER TABLE bookings ENABLE TRIGGER ALL;
  ALTER TABLE vehicles ENABLE TRIGGER ALL;
  ```

### 3. Types Typescript désynchronisés
- Symptôme : Erreur de compilation sur des attributs inexistants ou modifiés.
- Action : Lancer la régénération des types :
  ```bash
  npm run gen:types
  ```
