# Consignes de développement

## Ce n'est pas le Next.js que tu connais

Le projet tourne sous **Next.js 16**, qui introduit des ruptures par rapport aux versions largement diffusées : APIs, conventions et structure de fichiers peuvent différer. **Lire le guide concerné dans `node_modules/next/dist/docs/` avant d'écrire du code**, et tenir compte des avis de dépréciation.

Deux pièges déjà rencontrés :

- `setState` dans un `useEffect` est une **erreur** de lint (`react-hooks/set-state-in-effect`). Pour lire le `localStorage`, utiliser `useSyncExternalStore` — voir `src/hooks/usePregnancy.ts`.
- Les apostrophes doivent être échappées en JSX (`&apos;`), sinon `react/no-unescaped-entities` bloque le build.
- Dans `translations.json`, une apostrophe **collée à une balise ou à une variable** (`d'<item>`, `l'{name}`) ouvre un échappement ICU et casse le message, qui s'affiche brut. La doubler : `d''<item>{name}</item>` s'affiche « d'un camembert ».

## Qualité de code

Avant de conclure une session : `npm run lint:fix` et `npm run typecheck`. **Ne jamais lancer `npm run build` sans qu'on le demande** : il écrit dans `.next/`, le même dossier que `npm run dev`, et fige le CSS du serveur de dev qui tourne en parallèle.

⚠️ `npm run lint` seul réordonne les imports et peut recasser la mise en forme Prettier. Toujours passer par `lint:fix`, qui enchaîne `format` → `lint` → `style` dans le bon ordre.

**Pas de commentaires dans le code**, nulle part dans le repo : `src/`, mais aussi `public/sw.js`, `scripts/`, les fichiers de config et le CSS. Les explications vont dans la documentation.

**Pas de style inline** (`style={…}`) : tout passe par des classes Tailwind écrites en entier (jamais construites par concaténation, Tailwind ne les détecterait pas). Une valeur continue comme une progression passe par l'élément natif adapté (`<progress>`), une taille par un jeu de variantes (`ItemVisual` : `sm`, `lg`).

## Données

Cinq catégories de 38 items (S4 → S41) : `cheeses`, `fish`, `animals`, `desserts`, `fruits`. Après toute modification d'un item, relancer `node scripts/audit-data.mjs` : zéro item hors tolérance, zéro régression (bébé ne doit jamais paraître rétrécir d'une semaine à l'autre : un item n'est jamais deux fois moins volumineux que le précédent). Règles de calibrage dans `src/data/README.md`.

Un item ajouté ou renommé demande aussi sa taille estimée dans `scripts/data/item-sizes.json`, son volume estimé dans `scripts/data/item-volumes.json`, sa description visuelle dans `scripts/data/image-subjects.json` et son image (voir `README.md`, section « Images »). Chaque image générée se **relit visuellement** avant d'être gardée.

## Notifications

Le serveur ne doit **jamais recevoir la DDR**, ni rien qui permette de la retrouver : il ne connaît que l'abonnement push et le jour de la semaine. Le texte des notifications est calculé sur le téléphone. Voir la section « Notifications » du README.

## Rédaction des données

Dans les JSON, toute phrase **commence par une majuscule et se termine par un point**. Ne pas écrire de fragments destinés à être recollés en milieu de phrase par un composant : ça produit des fautes de contraction (« le poids de le débat ») et rend le texte illisible hors contexte.

## Textes de l'interface

Aucune chaîne visible ne doit être écrite en dur dans un composant : tout passe par **`public/locales/fr/translations.json`** via `useTranslations` (client) ou `getTranslations` (serveur, pour `layout.tsx` et `manifest.ts`).

**Une seule déclaration par composant, sans namespace**, et la clé complète à l'appel :

```tsx
const t = useTranslations();
t('forms.fields.lastPeriodDate.label');
t('base.name');
```

Le fichier se range en cinq sections :

- **`base`** : nom et description de l'appli (manifest, métadonnées, titre).
- **`common`** : ce qui sert à plusieurs écrans. `cta` regroupe **tous les libellés de bouton**, par ordre alphabétique ; `nav`, `unit` (g, kg, SA, S20…), `pregnancy`, et un groupe par composant partagé (`onboarding`, `installBanner`, `inAppBrowserBanner`).
- **`messages`** : retours à l'utilisateur (permission des notifications, lien copié) et texte des notifications de croissance.
- **`forms`** : `fields` (libellé, aide, placeholder de chaque champ) et `error` (erreurs de saisie).
- **`pages`** : un groupe par route, nommé comme elle (`home`, `timeline`, `settings`, `newPregnancy`).

Un libellé déjà présent dans `common.cta` se réutilise au lieu d'être dupliqué dans une page.

next-intl tourne **sans routing i18n** : une seule locale, définie dans `src/i18n/request.ts`. Ne pas introduire de préfixe d'URL (`/fr/…`) — ça casserait le `start_url` du manifest PWA et le cache du service worker.

Les **données** (`src/data/`) ne sont pas concernées : les noms d'items, `funText` et comparaisons de poids sont du contenu, pas de l'interface.

## Structure

`src/app/<route>/page.tsx` ne fait qu'envelopper `src/components/pages/<Route>Page/<Route>Page.tsx` dans `DefaultLayout`. **Le nom du composant de page reprend celui de la route** (`/new-pregnancy` → `NewPregnancyPage`), et **ses sous-composants, rangés dans le même dossier, sont préfixés du nom de la page sans « Page »** : `HomePage/HomeGrowthCard.tsx`, `SettingsPage/SettingsResetSection.tsx`. Les chemins vivent dans `src/constants/routes.ts`, jamais en dur. Une nouvelle route s'ajoute aussi à `APP_SHELL` dans `public/sw.js`.

Dans `utils/` : **un fichier par thème**, en exports nommés (`date.ts` pour tout ce qui manipule une date, `growth.ts` pour le contenu d'une semaine, `pregnancy.ts`, `storage.ts`, `browser.ts`…). Une nouvelle fonction rejoint le fichier de son thème plutôt que d'en créer un. Les fonctions s'y déclarent sans `export`, et **un seul `export { … }` en fin de fichier** les liste toutes. Même règle dans `services/` : `push.ts` (abonnement du téléphone), `subscription.ts` (abonnements stockés dans Redis). Un helper qui ne sert qu'à un seul fichier y reste en fonction locale, non exportée. Pas de sous-dossier tant qu'un dossier reste petit (`hooks/`, `constants/` sont à plat). Les constantes vont dans `constants/<sujet>.ts`, les types dans `src/@types/*.d.ts` (ambiants, sans import ni export).

## Cohérence de l'interface

Dans tout élément interactif — bouton, onglet, pastille de catégorie, badge — **l'icône se place AVANT le texte**, dans son propre `span` marqué `aria-hidden`, l'espacement venant du conteneur :

```tsx
<a className="inline-flex items-center gap-2 …">
    <span aria-hidden="true">☕</span>
    {t('common.cta.support')}
</a>
```

Les icônes de l'interface vivent dans **`src/constants/icons.ts`** (`ICONS.start`, `ICONS.add`…), jamais en dur dans un composant : le styleguide les liste toutes depuis ce fichier. Les emojis de catégorie, eux, restent dans les données.

L'emoji ne doit donc **jamais être écrit dans la clé de traduction** d'un libellé de bouton : le texte reste seul, l'icône vit dans le JSX.

Les emoji en **fin de phrase** dans les messages (erreurs de saisie, notifications, encarts d'état) ne sont pas des icônes mais de la ponctuation expressive : ils restent dans le texte traduit.

Les composants de `src/components/ui/` (`Text`, `Card`, `SelectableCard`, `Button`, `Pill`, `Badge`, `Field`, `Switch`) portent ces conventions : `Button` et `Pill` prennent l'emoji par la prop `icon`. Un nouvel écran les utilise plutôt que de recopier leurs classes, et toute nouvelle variante s'ajoute aussi à `/styleguide`. Un texte passe par `Text` et sa variante plutôt que par des classes de taille et de couleur. `Pill` sert **uniquement aux choix à bascule** (catégorie, grossesse affichée) : une action (modifier, terminer, supprimer) est un `Button`. Dans un groupe de boutons (aligné à gauche), **« Annuler » ou « Plus tard » se place toujours avant l'action** qu'il annule.

## Documentation

- [`README.md`](README.md) — l'appli, ses décisions produit, et le code (installation, scripts, structure)
- [`TODO.md`](TODO.md) — ce qui reste à faire
- [`src/data/README.md`](src/data/README.md) — format des fichiers de données
