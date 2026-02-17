---
description: Pipeline de déploiement et synchronisation Supabase
---

# .agent/workflows/supabase_sync.md

1. Vérifier l'état local
```bash
npx supabase status
```

2. Appliquer les migrations locales sur le projet distant
```bash
npx supabase db push
```

3. Générer les types TypeScript pour le frontend
```bash
npx supabase gen types typescript --project-id kpnkhmtxzigxtfnkmzru > src/types/supabase.ts
```
