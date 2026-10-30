# Consignes de développement

## Ce n'est pas le Next.js que tu connais

Le projet tourne sous **Next.js 16**, qui introduit des ruptures par rapport aux versions largement diffusées : APIs, conventions et structure de fichiers peuvent différer. **Lire le guide concerné dans `node_modules/next/dist/docs/` avant d'écrire du code**, et tenir compte des avis de dépréciation.

Deux pièges déjà rencontrés :

- `setState` dans un `useEffect` est une **erreur** de lint (`react-hooks/set-state-in-effect`). Pour lire le `localStorage`, utiliser `useSyncExternalStore` — voir `src/hooks/usePregnancy.ts`.
- Les apostrophes doivent être échappées en JSX (`&apos;`), sinon `react/no-unescaped-entities` bloque le build.

## Qualité de code

Avant de conclure une session : `npm run lint:fix`, `npm run typecheck`, `npm run build`.

⚠️ `npm run lint` seul réordonne les imports et peut recasser la mise en forme Prettier. Toujours passer par `lint:fix`, qui enchaîne `format` → `lint` → `style` dans le bon ordre.

**Pas de commentaires dans le code**, nulle part dans le repo : `src/`, mais aussi `public/sw.js`, `scripts/`, les fichiers de config et le CSS. Les explications vont dans la documentation.

## Données

Cinq catégories de 38 items (S4 → S41) : `cheeses`, `fish`, `animals`, `desserts`, `fruits`. Après toute modification d'un item, relancer `node scripts/audit-data.mjs` : zéro item hors tolérance, zéro régression (bébé ne doit jamais rétrécir d'une semaine à l'autre). Règles de calibrage dans `src/data/README.md`.

Un item ajouté ou renommé demande aussi sa taille estimée dans `scripts/data/item-sizes.json`, sa description visuelle dans `scripts/data/image-subjects.json` et son image (voir `README.md`, section « Images »). Chaque image générée se **relit visuellement** avant d'être gardée.

## Notifications

Le serveur ne doit **jamais recevoir la DDR**, ni rien qui permette de la retrouver : il ne connaît que l'abonnement push et le jour de la semaine. Le texte des notifications est calculé sur le téléphone. Voir la section « Notifications » du README.

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

## Cohérence de l'interface

Dans tout élément interactif — bouton, onglet, pastille de catégorie, badge — **l'icône se place AVANT le texte**, dans son propre `span` marqué `aria-hidden`, l'espacement venant du conteneur :

```tsx
<a className="inline-flex items-center gap-2 …">
    <span aria-hidden="true">☕</span>
    {t('settings.supportCta')}
</a>
```

L'emoji ne doit donc **jamais être écrit dans la clé de traduction** d'un libellé de bouton : le texte reste seul, l'icône vit dans le JSX.

Les emoji en **fin de phrase** dans les messages (erreurs de saisie, notifications, encarts d'état) ne sont pas des icônes mais de la ponctuation expressive : ils restent dans le texte traduit.

## Documentation

- [`README.md`](README.md) — l'appli, ses décisions produit, et le code (installation, scripts, structure)
- [`TODO.md`](TODO.md) — ce qui reste à faire
- [`src/data/README.md`](src/data/README.md) — format des fichiers de données
