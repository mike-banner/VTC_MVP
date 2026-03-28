# 🔎 Technical Audit Report — VTC HUB (2026-03-28)

**Auditeur** : @reviewer (Mike-Standard V10.0)
**Statut** : 🟡 Yellow (Fonctionnel, mais avec des points d'attention)

## 🏗️ Architecture & Multi-tenant

- **Isolation** : ✅ Stricte. Utilisation systématique de `tenant_id` et de la fonction `current_tenant_id()` dans le RLS.
- **Modèle** : ERP-first cohérent. Séparation nette entre `tenants` et `onboarding`.

## 🔐 Sécurité & RLS

- **Profiles** : 🟡 La politique actuelle limite la lecture d'un profil à son propre `id`. Un `tenant_owner` ne peut pas voir les profils de ses chauffeurs via la table `profiles`. Il doit passer par la table `drivers`.
- **Secrets** : ✅ Pas de fuite détectée dans les fichiers publics. Utilisation correcte du `service_role` dans les fonctions Edge.

## 💳 Paiements (Stripe)

- **Flux** : ✅ Robuste. Webhook idempotent grâce à `stripe_events`.
- **Risque** : 🔴 Si l'insertion dans `bookings` échoue après un paiement (ex: erreur de validation), l'argent est encaissé mais le service n'est pas créé. Un mécanisme de "dead letter queue" ou d'alerte critique est recommandé.

## 🧹 Hygiène du Code

- **Scripts root** : 🔴 Trop de fichiers `.ts` de debug à la racine. (En cours de déplacement vers `scripts/`).
- **Logs** : ✅ `console.log` utilisés de manière informative dans les Edge Functions.

## 🎯 Prochaines Étapes Recommandées

1.  **Fiabilisation Webhook** : Ajouter un système de retry ou de notification d'échec pour la création de booking post-paiement.
2.  **Dashboard Chauffeur** : Priorité absolue pour transformer le MVP en outil opérationnel.
3.  **Unit Testing** : Manque de tests automatisés pour les fonctions critiques (calcul de prix, transitions de statuts).
