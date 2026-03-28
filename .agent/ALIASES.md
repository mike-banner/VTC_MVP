# 📑 Liste des Aliases & Commandes

| Alias        | Commande                                                                       | Description                                    |
| :----------- | :----------------------------------------------------------------------------- | :--------------------------------------------- |
| `@bootstrap` | `python3 ~/.ai_global/orchestrator.py --mode bootstrap --path .`               | Ré-initialisation du projet                    |
| `@architect` | `python3 ~/.ai_global/orchestrator.py --mode architect --query "..."`          | Planification technique (PLAN_ARCHITECTURE.md) |
| `@worker`    | `python3 ~/.ai_global/orchestrator.py --mode worker --query "TARGET:file ..."` | Application de modifications de code           |
| `@reviewer`  | `python3 ~/.ai_global/orchestrator.py --mode reviewer --query "..."`           | Revue de qualité et mise à jour EVOLUTION.md   |
| `@repomix`   | `npx repomix`                                                                  | Génération du digest contextuel                |

## 💡 Usage Rapide

Utilise `@architect "Implémenter le dashboard chauffeur"` pour lancer la planification.
Utilise `@worker "TARGET:src/pages/driver.astro Créer la page"` pour coder.
