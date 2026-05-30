# Bookings — Correctifs iOS Safari

## Contexte

Page `/app/bookings`. Sur iOS Safari en production (Cloudflare), tous les éléments interactifs étaient muets : cards non cliquables, bouton "Nouvelle Course" sans réponse, modales inaccessibles. Aucune erreur console visible.

---

## Cause racine #1 — Script non chargé (pattern `?url`)

**Fichiers concernés** : `bookings.astro`, `AppLayout.astro`, `InactivityTimeout.astro`

Le pattern `?url` + `<script type="module" src={...}>` peut silencieusement échouer sur iOS Safari en prod Cloudflare si le MIME type de l'asset retourné n'est pas exactement `application/javascript`.

**Fix** : Migration vers le pattern Astro officiel `<script>` (bundlé par Vite, MIME garanti).

```diff
- import bookingsScriptUrl from "../../scripts/bookings.ts?url";
- <script type="module" src={bookingsScriptUrl}></script>
+ <script>
+   import "../../scripts/bookings.ts";
+ </script>
```

`InactivityTimeout.astro` utilisait `document.currentScript` (toujours `null` pour les modules ES). Migré vers `define:vars` + `window.__INACTIVITY_TIMEOUT_MS__`.

---

## Cause racine #2 — Modales `position:fixed` avec `pointer-events:none` bloquent les taps

Sur iOS Safari, un élément `position: fixed; pointer-events: none` **ne passe pas** les événements touch aux éléments en dessous — contrairement au comportement standard W3C. Les deux modales fermées (z-index 100 et 200) bloquaient silencieusement tous les taps de la page.

**Fix** : Remplacement de `opacity:0 + pointer-events:none` par `display:none` comme état "fermé" des modales.

```typescript
// Ouverture
modal.style.display = "flex";
requestAnimationFrame(() => modal.classList.add("is-active")); // déclenche la transition CSS

// Fermeture
modal.classList.remove("is-active");
setTimeout(() => { modal.style.display = "none"; }, 500); // après la transition
```

---

## Cause racine #3 — Cards non cliquables dans scroll container

Les `<div class="booking-row">` dans un conteneur `-webkit-overflow-scrolling: touch` ne déclenchent pas les events `click` sur iOS : le moteur de scroll absorbe les touches.

**Fix** : Listeners `touchstart`/`touchmove`/`touchend` avec détection scroll vs tap.

```typescript
let touchMoved = false;
row.addEventListener("touchstart", (e) => { touchStartY = e.touches[0].clientY; touchMoved = false; }, { passive: true });
row.addEventListener("touchmove", () => { touchMoved = true; }, { passive: true });
row.addEventListener("touchend", (e) => { if (!touchMoved) { e.preventDefault(); openDetailForRow(row); } });
row.addEventListener("click", () => openDetailForRow(row)); // fallback desktop
```

---

## Autres corrections

- `document.body.classList.toggle("overflow-hidden")` supprimé de `toggleDetailModal` — le body a déjà `overflow:hidden !important` en CSS global, ce toggle était sans effet
- `overscroll-behavior: contain` + `-webkit-overflow-scrolling: touch` ajoutés en style inline sur les divs scrollables des modales
