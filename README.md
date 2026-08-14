# Lé gro mon bébé 🍼

**➜ [le-gro-mon-bebe.vercel.app](https://le-gro-mon-bebe.vercel.app/)**

Appli web **PWA mobile-first** qui suit la croissance du fœtus semaine après semaine, avec des comparaisons fun et personnalisables — 🐟 poissons, 🧀 fromages, 🐾 animaux — au lieu des classiques fruits et légumes.

> Projet perso, privé (pour les proches), ton décalé assumé. Pas de compte, pas de backend : tout vit dans le navigateur.

## Stack

| Élément     | Choix                                                         |
| ----------- | ------------------------------------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack)                            |
| Langage     | TypeScript                                                    |
| UI          | React 19 + Tailwind CSS 4                                     |
| Stockage    | `localStorage` (clé `lgmb:v1`)                                |
| Textes      | next-intl, sans routing i18n (`public/locales/fr/`)           |
| PWA         | `app/manifest.ts` + service worker maison (`public/sw.js`)    |
| Hébergement | Vercel                                                        |
| Analytics   | Google Tag Manager (`GTM-586X3SW9`) via `@next/third-parties` |

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
```

> Pour tester sur un mobile du réseau local, l'IP doit figurer dans `allowedDevOrigins` (`next.config.ts`) — sinon Next bloque les requêtes `/_next/*` cross-origin et l'appli reste sur le splash.

## Scripts

| Script                 | Effet                                                   |
| ---------------------- | ------------------------------------------------------- |
| `npm run dev`          | serveur de dev                                          |
| `npm run build`        | build de production                                     |
| `npm run lint:fix`     | **le combo avant commit** : `format` + `lint` + `style` |
| `npm run lint:ci`      | vérification sans écriture : ESLint + Stylelint         |
| `npm run lint`         | ESLint avec correction automatique                      |
| `npm run lint:check`   | ESLint en lecture seule                                 |
| `npm run format`       | Prettier en écriture                                    |
| `npm run format:check` | Prettier en vérification                                |
| `npm run style`        | Stylelint avec correction automatique                   |
| `npm run style:check`  | Stylelint en lecture seule                              |
| `npm run typecheck`    | `tsc --noEmit`                                          |

La configuration ESLint, Prettier et Stylelint est reprise du projet Aubade : 4 espaces, quotes simples, une prop JSX par ligne, imports triés (`simple-import-sort`), imports inutilisés en erreur, classes Tailwind ordonnées via `prettier-plugin-tailwindcss`.

`stylelint.config.mjs` étend `stylelint-config-standard` en neutralisant `at-rule-no-unknown` pour les at-rules Tailwind 4 (`@theme`, `@apply`, `@utility`, `@variant`…), qu'il signalerait sinon comme inconnues.

⚠️ Lancer `npm run lint` seul peut recasser la mise en forme Prettier (il réordonne les imports). D'où `lint:fix`, qui enchaîne les trois outils dans le bon ordre.

### Outils lancés à la main

Ils vivent dans `scripts/`, hors du cycle de build, et sont exclus du linter (`console.log` assumé).

| Commande                                      | Effet                                                            |
| --------------------------------------------- | ---------------------------------------------------------------- |
| `python3 scripts/audit-data.py`               | contrôle le calibrage des 152 items sur la courbe de croissance  |
| `python3 scripts/gen-illustration-prompts.py` | régénère les quatre `docs/PROMPT-*.md` depuis les JSON           |
| `node scripts/split-illustrations.mjs`        | découpe une planche 2 × 2 en vignettes WebP nommées par semaine  |
| `node scripts/check-illustrations.mjs`        | vérifie qu'aucune illustration ne manque, avec le sujet attendu  |
| `node scripts/gen-icons.mjs`                  | regénère les icônes et le favicon depuis `_temp/baby-bottle.svg` |

## Structure

```
src/
├── app/          # App Router : layout, page unique, manifest, icônes
├── components/   # Onboarding, Dashboard, Timeline, Settings, BottomNav
├── data/         # fetalGrowth.json, weightJokes.json, categories/*.json
├── i18n/         # configuration next-intl (locale unique)
├── hooks/        # usePregnancy (useSyncExternalStore sur le localStorage)
└── lib/          # types, chargement des données, calcul SA, storage

public/           # servi tel quel : icônes, service worker, locales/, images/
scripts/          # outils hors build : audit des données, illustrations, icônes
docs/             # prompts de génération des illustrations et audits de rendu
```

`scripts/` et `docs/` restent **hors de `src/`** : ce ne sont ni du code applicatif ni
des fichiers compilés. Même logique que le dossier `tools/` du projet Aubade.

## Fonctionnement

L'utilisateur saisit sa **date des dernières règles (DDR)**. La semaine de grossesse en **semaines d'aménorrhée (SA)** s'en déduit directement — c'est l'unité des données médicales, donc aucune conversion. Chaque semaine est associée à une taille, un poids et, dans la catégorie choisie, un objet de comparaison avec son texte rigolo.

⚠️ Les valeurs de croissance sont des **ordres de grandeur à visée ludique**, pas un outil de suivi médical.

⚠️ La taille change de méthode de mesure en cours de route : **longueur cranio-caudale** jusqu'à S13, **tête-talons** à partir de S14. D'où le saut de 7 à 12,5 cm entre les deux — ce n'est pas une erreur. Le champ `measure` de chaque semaine porte l'information, à titre documentaire.

## Déploiement

Hébergé sur **Vercel**, branché sur ce repo GitHub : chaque push sur `main` redéploie automatiquement. Aucune variable d'environnement n'est nécessaire aujourd'hui (tout est côté client) — ça changera quand le formulaire de feedback passera par une serverless function.

Sur mobile, « Ajouter à l'écran d'accueil » installe la PWA.

## Documentation

- [`SPECS.md`](SPECS.md) — spécifications détaillées et décisions
- [`TODO.md`](TODO.md) — ce qu'il reste à faire
- [`src/data/README.md`](src/data/README.md) — format des fichiers de données
- [`CLAUDE.md`](CLAUDE.md) — consignes de développement (pièges Next 16, chaîne de lint, rédaction)
- [`docs/`](docs/) — prompts de génération des illustrations
