# 🏛️ Plan Architecture — VTC HUB (MVP)

## 🏁 État Actuel (Validé)

La structure de base est en place (Astro + Supabase + Stripe Connect).
L'isolation multi-tenant est fonctionnelle via RLS et `tenant_id`.

## 🏗️ Phase 1 : Consolidation & Mémoire (COMPLET)

- [x] Initialisation Tri-Mémoire (@bootstrap)
- [x] Scan contextuel Repomix
- [x] Audit technique système (@reviewer)
- [x] Nettoyage racine (`test/scripts/`)
- [x] Mise en place des `.agent/rules.md` (Complet)
- [x] Unification Inscription / Onboarding (Wizard)

## 👷 Phase 2 : Workflow Chauffeur (COMPLET)

- [x] **Brique 2.1 : Elite Driver Dashboard v5.1**
  - Refonte UX/UI Premium (Command Center).
  - Stat Grid (Aujourd'hui, Mois, Revenus).
  - Focus Mission Immédiate (Active Mission).
- [x] **Brique 2.2 : Configuration Tarifs v1**
  - Heure, km, et prix fixes navettes/forfaits.
- [x] **Brique 2.3 : Suivi Global & Finance**
  - Dashboard fiscal dynamique (/app/ledger).
  - Badge Elite "CHAUFFEUR N°1" pour le titulaire.
- [x] **Brique 2.4 : Driver Recovery**
  - Restauration des records chauffeurs propriétaires.

## 🚀 Phase 3 : Mobilité & Temps Réel (À VENIR)

- [ ] **Brique 3.1 : Workflow Terrain**
  - Boutons "Je suis en route", "Client à bord", "Course terminée".
  - Verrouillage temporel "Démarrer" : activable à \(H-15\) (pas de GPS pour l’instant).
  - Log horodaté des transitions (UTC).
- [ ] **Brique 3.2 : Notifications**
  - Alertes pour les nouvelles missions (+ rappels).
- [ ] **Brique 3.3 : QR Code Ratings**
  - Système de notation passager immédiat.

## 📄 Phase 4 : Communications & Documents (À VENIR)

- [ ] **Brique 4.1 : Emails Automatisés**
  - Inscription, réservation chauffeur, confirmation client.
- [ ] **Brique 4.2 : Devis & Facturation PDF**
  - Système de PDF devis personnalisables avant facturation finale.
