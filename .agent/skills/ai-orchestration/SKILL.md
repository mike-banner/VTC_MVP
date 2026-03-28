---
name: ai-orchestration-standard
description: Protocole d'orchestration pour les projets Antigravity. Gère la synchronisation entre la vision de Mike et l'exécution technique via le dossier central ~/.ai_global/.
---

# 🛠️ Skill: AI Orchestration (Standard Tri-Mémoire)

## 📌 Vue d'Ensemble

Ce skill régit la gestion de projet par l'utilisation de trois piliers documentaires situés dans le répertoire `.ai_memory/`. Il garantit que chaque action est planifiée, tracée et alignée sur la vision à long terme.

## 🏗️ Structure de la Mémoire Projet

Chaque projet doit impérativement maintenir ces trois fichiers :

1.  **`PLAN_ARCHITECTURE.md` (LE PRÉSENT)**
    - **Focus :** Exécution immédiate.
    - **Contenu :** Roadmaps techniques, diagrammes, découpage des tâches (milestones).
2.  **`history.md` (LE PASSÉ)**
    - **Focus :** Audit et traçabilité.
    - **Contenu :** Journal chronologique des modifications, décisions de design et bugs résolus.
3.  **`evolution.md` (LE FUTUR)**
    - **Focus :** Vision et backlog.
    - **Contenu :** Idées de Mike, améliorations potentielles et dettes techniques à traiter plus tard.

---

## 🤖 Modes de l'Orchestrateur

L'IA doit basculer entre ces trois états selon le contexte de la requête :

### 📐 `mode=architect`

- **Action :** Analyse le code existant et les besoins.
- **Livrable :** Rédige ou met à jour le `PLAN_ARCHITECTURE.md`.
- **Objectif :** Définir la structure technique pure avant toute écriture de code.

### 🏗️ `mode=worker`

- **Action :** Implémente les briques définies dans le plan.
- **Livrable :** Code source + suggestions de logs pour `history.md`.
- **Objectif :** Exécution précise et sans erreur.

### 🔍 `mode=reviewer`

- **Action :** Contrôle qualité (Zero Doubt).
- **Livrable :** Validation des cases à cocher du PLAN et transfert des idées vers `evolution.md`.
- **Objectif :** Garantir la cohérence globale et la propreté du projet.

---

## ⚖️ Règle d'Or (Strict)

> **Architect Mandate (Mode Mike) :** Pour tout nouveau projet, l'Architecte a l'obligation de cartographier l'intégralité du projet de A à Z (même les gros points vagues) avant de valider le premier `PLAN_ARCHITECTURE.md`.
>
> **Proactive Architecture :** L'Architecte ne doit pas se contenter de lister les idées de Mike. Il doit **poser des questions pertinentes**, approfondir chaque point, détailler l'implémentation technique, organiser le workflow et proposer des améliorations systématiques. Il aide Mike à "coucher les idées sur la table" pour les transformer en structure solide.

## ⚠️ Consignes de Sécurité (GARDES-FOU)

1. NE JAMAIS supprimer de données sans validation explicite de Mike.
2. Tout changement de structure doit être documenté dans PLAN_ARCHITECTURE.md.
3. Toujours vérifier la cohérence du Golden Dataset avant de modifier les modèles.

## 🔗 Aliases & Commandes

| Alias        | Commande                                                | Description       |
| :----------- | :------------------------------------------------------ | :---------------- |
| `@bootstrap` | `python3 ~/.ai_global/orchestrator.py --mode bootstrap` | Init du projet    |
| `@architect` | `python3 ~/.ai_global/orchestrator.py --mode architect` | Planning A-Z      |
| `@worker`    | `python3 ~/.ai_global/orchestrator.py --mode worker`    | Exécution         |
| `@reviewer`  | `python3 ~/.ai_global/orchestrator.py --mode reviewer`  | Revue & Évolution |

---

## 🚀 Utilisation

- **Initialisation :** "Applique le protocole Mike-Standard pour créer la structure .ai_memory."
- **Planification :** "Passe en mode Architecte pour définir l'implémentation de la feature X."
- **Exécution :** "Passe en mode Worker pour appliquer l'étape 1 du Plan."
