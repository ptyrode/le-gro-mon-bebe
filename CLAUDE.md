# Consignes de développement

## Ce n'est pas le Next.js que tu connais

Le projet tourne sous **Next.js 16**, qui introduit des ruptures par rapport aux versions largement diffusées : APIs, conventions et structure de fichiers peuvent différer. **Lire le guide concerné dans `node_modules/next/dist/docs/` avant d'écrire du code**, et tenir compte des avis de dépréciation.

Deux pièges déjà rencontrés :

- `setState` dans un `useEffect` est une **erreur** de lint (`react-hooks/set-state-in-effect`). Pour lire le `localStorage`, utiliser `useSyncExternalStore` — voir `src/hooks/usePregnancy.ts`.
- Les apostrophes doivent être échappées en JSX (`&apos;`), sinon `react/no-unescaped-entities` bloque le build.

## Qualité de code

Avant de conclure une session : `npm run lint:fix`, `npm run typecheck`, `npm run build`.

⚠️ `npm run lint` seul réordonne les imports et peut recasser la mise en forme Prettier. Toujours passer par `lint:fix`, qui enchaîne `format` → `lint` → `style` dans le bon ordre.

## Rédaction des données

Dans les JSON, toute phrase **commence par une majuscule et se termine par un point**. Ne pas écrire de fragments destinés à être recollés en milieu de phrase par un composant : ça produit des fautes de contraction (« le poids de le débat ») et rend le texte illisible hors contexte.

## Textes de l'interface

Aucune chaîne visible ne doit être écrite en dur dans un composant : tout passe par **`public/locales/fr/translations.json`** via `useTranslations` (client) ou `getTranslations` (serveur, pour `layout.tsx` et `manifest.ts`).

**Une seule déclaration par composant, sans namespace**, et la clé complète à l'appel :

```tsx
const t = useTranslations();
t('onboarding.dateLabel');
t('app.name');
```

next-intl tourne **sans routing i18n** : une seule locale, définie dans `src/i18n/request.ts`. Ne pas introduire de préfixe d'URL (`/fr/…`) — ça casserait le `start_url` du manifest PWA et le cache du service worker.

Les **données** (`src/data/`) ne sont pas concernées : les noms d'items, `funText` et comparaisons de poids sont du contenu, pas de l'interface.

## Documentation

- [`README.md`](README.md) — installation, scripts, structure
- [`SPECS.md`](SPECS.md) — spécifications et décisions produit
- [`TODO.md`](TODO.md) — ce qui reste à faire
- [`src/data/README.md`](src/data/README.md) — format des fichiers de données
