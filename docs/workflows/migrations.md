# Database Migrations Workflow — VTC HUB

## Protocole de modification de schéma

1. **Création d'une nouvelle migration locale** :
   ```bash
   supabase migration new [nom_de_la_migration]
   ```
2. **Édition du fichier SQL** généré dans `supabase/migrations/`.
3. **Application en local** pour test :
   ```bash
   supabase db reset
   ```
4. **Régénération des types Typescript** :
   ```bash
   npm run gen:types
   ```
5. **Déploiement sur l'environnement de production** :
   ```bash
   supabase db push
   ```
