# 🧠 Mémoire Technique (FAITS)

## 📌 Constantes du Projet

- **Stack** : Astro, Supabase, Stripe Connect, Cloudflare.
- **Tenant ID** : Présent sur toutes les tables métier pour l'isolation.
- **RLS** : Activé sur toutes les tables de production.
- **Onboarding V4** : Schéma propre (SIRET, Licence VTC), wizard unifié sur `/signup`.

## 👷 Phase 2 : Workflow Chauffeur (TERMINÉ - REFILTRAGE)

- [x] **Brique 2.1 : Elite Driver Dashboard v5.1**
  - Refonte UX/UI Premium (Command Center).
  - Stat Grid (Aujourd'hui, Mois, Revenus).
  - Focus Mission Immédiate (Active Mission).
- [x] **Brique 2.2 : Configuration Tarifs v1**
- [x] **Brique 2.3 : Suivi Global & Finance**
  - Dashboard fiscal dynamique (/app/ledger).
  - Badge Elite "CHAUFFEUR N°1" pour le titulaire.
  - Reordering des KPIs pour focus taxes (Missions, HT, TTC, TVA).

## 🔗 Liens Utiles

- [repomix-output.md](file:///home/mike/projects/vtc/vtc_mvp/repomix-output.md) : Digest complet du dépôt.
- [.ai_memory/repo_context.xml](file:///home/mike/projects/vtc/vtc_mvp/.ai_memory/repo_context.xml) : Contexte XML généré par l'orchestrateur.

## ⚙️ Tips Techniques V2

- **Triggers** : Pour réactiver les sécurités en V2 : `alter table bookings enable trigger all;`
- **Typing** : Les vues comme `tenant_accounting_ledger` nécessitent un cast `as any` si les types ne sont pas synchronisés.
