# Deployment Workflow — VTC HUB

## Déploiement Frontend (Cloudflare Pages)
- Branché sur le dépôt Git.
- Tout push sur la branche principale déclenche un build automatique via Cloudflare Pages.
- Commande de build : `npm run build`
- Dossier de sortie : `dist/`

## Déploiement Supabase Edge Functions
Pour déployer ou mettre à jour une fonction Deno :
```bash
# Déployer une fonction spécifique
supabase functions deploy <function-name> --project-ref <project-ref>
```
⚠️ Assurez-vous d'avoir défini les secrets (clés Stripe) dans Supabase pour les webhooks.
