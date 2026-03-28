# 🏛️ Plan Architecture — VTC HUB (MVP)

## 🏁 État Actuel (Validé)

La structure de base est en place (Astro + Supabase + Stripe Connect).
L'isolation multi-tenant est fonctionnelle via RLS et `tenant_id`.

## 🏗️ Phase 1 : Consolidation & Mémoire (EN COURS)

- [x] Initialisation Tri-Mémoire (@bootstrap)
- [x] Scan contextuel Repomix
- [x] Audit technique système (@reviewer)
- [x] Nettoyage racine (`test/scripts/`)
- [ ] Mise en place des `.agent/rules.md` (Complet)

## 👷 Phase 2 : Workflow Chauffeur (PROCHAINEMENT)

- [ ] **Brique 2.1 : Dashboard Chauffeur v1**
  - Vue dédiée `/app/driver/dashboard` (Courses faites / en attente).
  - Statistiques : Total courses et montants (Semaine / Mois / Année).
  - Édtion de bilans (PDF) et visualisation des documents.
- [ ] **Brique 2.2 : Configuration Tarifs v1**
  - Heure, km, et prix fixes navettes/forfaits.
- [ ] **Brique 2.3 : Edge Functions Opérationnelles**
  - `assign-driver`, `driver-accept-booking`.
- [ ] **Brique 2.4 : Transition de Statuts**
  - Sécurisation SQL pour les changements d'état (`paid` -> `assigned` -> `accepted`).

## 🚀 Phase 3 : Mobilité & Temps Réel

- [ ] **Brique 3.1 : Workflow Terrain**
  - Boutons "Je suis en route", "Client à bord", "Course terminée".
  - Log des coordonnées GPS et heure de début.
- [ ] **Brique 3.2 : Notifications**
  - Alertes pour les nouvelles missions (+ rappels).

## 📄 Phase 4 : Communications & Documents

- [ ] **Brique 4.1 : Emails Automatisés**
  - Inscription, réservation chauffeur, confirmation client.
- [ ] **Brique 4.2 : Devis & Facturation**
  - Système de PDF devis personnalisables avant facturation finale.
