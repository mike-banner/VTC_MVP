# 🛡️ Global Rules: Mike-Standard (V10.0)

Ces règles sont sacrées pour le projet VTC HUB.

## 💾 Gestion des Données

1. **Zéro Perte** : Ne jamais supprimer ou écraser de données sources sans validation.
2. **Sécurité .env** : Toujours utiliser les variables d'environnement, jamais de secrets en dur.

## 📂 Architecture & Mémoire (Tri-Mémoire)

1. **PLAN** : Toute modification doit être planifiée dans `.ai_memory/PLAN_ARCHITECTURE.md`.
2. **HISTORY** : Chaque action doit être loguée dans `.ai_memory/HISTORY.md`.
3. **EVOLUTION** : Les idées futures vont dans `.ai_memory/EVOLUTION.md`.
4. **MEMORY** : Les connaissances techniques et constantes vont dans `.ai_memory/MEMORY.md`.

## 🛠️ Qualité & Code

1. **Stricte Isolation** : Toujours vérifier le `tenant_id` dans les requêtes Supabase.
2. **Base de Données** : Ne jamais créer ou modifier de migration SQL (`supabase/migrations/`) sans présenter le plan exact et obtenir une validation explicite de Mike.
3. **Zero Doubt** : Si une instruction est ambiguë, demander clarification plutôt que d'improviser.
4. **RLS First** : Toute nouvelle table doit avoir ses politiques RLS définies immédiatement.
5. **Aesthetics** : Les UI doivent être "Premium" (Vibrant, Dark mode, Glassmorphism).

## 🚀 Git & CI/CD

1. **SSH Only** : Utiliser SSH pour les remotes Git.
2. **Léger** : Ne jamais pusher `node_modules`, `dist` ou gros binaires.
