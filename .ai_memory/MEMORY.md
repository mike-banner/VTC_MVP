# 🧠 Mémoire Technique (FAITS)

## 📌 Constantes du Projet

- **Stack** : Astro, Supabase, Stripe Connect, Cloudflare.
- **Tenant ID** : Présent sur toutes les tables métier pour l'isolation.
- **RLS** : Activé sur toutes les tables de production.

## 🔗 Liens Utiles

- [repomix-output.md](file:///home/mike/projects/vtc/vtc_mvp/repomix-output.md) : Digest complet du dépôt.
- [.ai_memory/repo_context.xml](file:///home/mike/projects/vtc/vtc_mvp/.ai_memory/repo_context.xml) : Contexte XML généré par l'orchestrateur.

## ⚙️ Tips Techniques V2

- **Triggers** : Pour réactiver les sécurités en V2 : `alter table bookings enable trigger all;`
