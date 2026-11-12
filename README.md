# Lé gro mon bébé 🍼

**➜ [le-gro-mon-bebe.vercel.app](https://le-gro-mon-bebe.vercel.app/)**

Appli web **PWA mobile-first** qui suit la croissance du fœtus semaine après semaine, avec des comparaisons fun et personnalisables (🧀 fromages, 🐟 poissons, 🐾 animaux, 🍰 desserts, ou 🍎 fruits pour les puristes). Chaque semaine a son image : bébé déguisé en l'objet du jour.

> Projet perso, privé (pour les proches), ton décalé assumé. Pas de compte : les données de grossesse vivent dans le navigateur. Le seul backend sert aux notifications push, et il ne reçoit jamais la date de grossesse.

**L'appli** — [Écrans](#écrans) · [Calcul de la semaine](#calcul-de-la-semaine) · [Données sur le téléphone](#données-sur-le-téléphone) · [Notifications](#notifications) · [PWA](#pwa) · [Décisions](#décisions)

**Le code** — [Stack](#stack) · [Démarrer](#démarrer) · [Scripts](#scripts) · [Structure](#structure) · [Données de comparaison](#données-de-comparaison) · [Images](#images) · [Icônes](#icônes) · [Déploiement](#déploiement)

---

# L'appli

## Écrans

Quatre routes, avec des chemins en anglais comme les clés du code : on ne les traduit pas, l'appli installée n'affichant pas son URL. `/` (accueil), `/timeline`, `/settings`, et `/new-pregnancy` pour ajouter une grossesse. Chaque page enveloppe son contenu dans `DefaultLayout` : écran de chargement, onboarding tant qu'aucune grossesse n'existe (l'URL est alors ramenée à `/`, par exemple après la suppression de la dernière grossesse), barre de navigation (masquée sur `/new-pregnancy`). La synchronisation des notifications, elle, vit dans `RootProvider`, monté une seule fois dans le layout racine pour ne pas se relancer à chaque page.

**Onboarding** (première visite, puis `/new-pregnancy` pour chaque nouvelle grossesse) : le pitch en une phrase, un **petit nom** facultatif pour bébé, la saisie de la **date des dernières règles (DDR)**, le choix de la **catégorie** de comparaison, la demande d'autorisation des **notifications** (peut être différée). Tout est enregistré dans le `localStorage`.

**Écran principal** (semaine en cours), titré du petit nom de bébé s'il en a un, du nom de l'appli sinon :

- grande **image** de l'objet de la semaine, emoji de la catégorie en repli si l'image manque ;
- **taille** (cm) avec la méthode de mesure : « de la tête aux fesses » jusqu'à S13, « de la tête aux pieds » ensuite ;
- le nom de l'objet ouvre son **article Wikipédia FR** dans un nouvel onglet, quand il en existe un ;
- le **texte drôle** de l'objet (`funText`) ;
- un **sélecteur de grossesse** quand il y en a plusieurs en cours ;
- **poids** (g), comparé à une « lourdeur » de l'entourage, indépendante de la catégorie : « Aussi lourd que la mère de trois enfants qui commence toutes ses phrases par « tu devrais ». » ;
- progression (semaine X / 41) et changement de catégorie à la volée ;
- un écran dédié pour chaque date hors norme (voir [Calcul de la semaine](#calcul-de-la-semaine)) ;
- le **bandeau d'installation** de la PWA, tant qu'elle n'est pas installée.

**Timeline** : les semaines **déjà atteintes** uniquement, pour garder la surprise d'une semaine sur l'autre. Pas de `funText`, pour que la liste reste dense.

**Réglages** : gérer les grossesses (choisir celle à modifier, terminer, rouvrir, supprimer, ajouter), puis, pour la grossesse choisie, modifier le petit nom, la DDR, changer de catégorie, activer ou couper les notifications, proposer une idée (lien `mailto:`, constante `FEEDBACK_EMAIL` dans `src/constants/links.ts`), soutenir le projet (Buy me a coffee), réinitialiser l'appli.

## Calcul de la semaine

La semaine de grossesse se compte en **semaines d'aménorrhée (SA)**, c'est-à-dire depuis la DDR : c'est l'unité des données médicales, donc aucune conversion. SA = `floor((aujourd'hui - DDR) / 7 jours)`, affichée de **S4** (premières données fiables) à **S41**.

Le **terme** tombe à **41 SA, soit DDR + 287 jours** (`TERM_WEEK`, dont découlent `TERM_DAYS` et `MAX_WEEK`) : c'est la convention française, là où les pays anglo-saxons comptent 40 SA (280 jours). Une DDR au 1er février donne un terme au 15 novembre. Le compte à rebours « J−… avant le terme », la barre de progression et la date du terme prévu (affichée sous celle-ci et sous le champ de DDR des réglages) s'appuient sur cette valeur.

`getPregnancyStatus()` (`src/utils/pregnancy.ts`) qualifie chaque cas au lieu de borner en silence, et l'accueil a un écran par situation :

| Statut        | Déclenchement         | Écran                                                     |
| ------------- | --------------------- | --------------------------------------------------------- |
| `future`      | DDR après aujourd'hui | « Cette date est bizarre »                                |
| `implausible` | plus de 2 ans         | « Elle remonte à plus de deux ans »                       |
| `tooEarly`    | avant 4 SA            | « C'est encore tout frais », pas de données de croissance |
| `born`        | au-delà de 41 SA      | « Bébé devrait être né ! » + jours de dépassement         |
| `ongoing`     | 4 → 41 SA             | affichage normal                                          |

La DDR est validée **à la saisie** (`validateLastPeriodDate()`), dans l'onboarding comme dans les réglages.

⚠️ Les valeurs de croissance sont des **ordres de grandeur à visée ludique**, pas un outil de suivi médical.

⚠️ La taille change de méthode de mesure en cours de route : **longueur cranio-caudale** jusqu'à S13, **tête-talons** à partir de S14. D'où le saut de 7 à 12,5 cm entre les deux — ce n'est pas une erreur.

## Données sur le téléphone

Une liste de grossesses, dans le `localStorage` (clé `lgmb:v2`) :

```json
{
    "version": 2,
    "pregnancies": [
        {
            "id": "3f1c…",
            "name": "Crevette",
            "lastPeriodDate": "2026-02-15",
            "category": "cheeses",
            "createdAt": "2026-06-30T10:00:00Z",
            "closedAt": "2026-11-28T09:12:00Z"
        }
    ],
    "activeId": "3f1c…",
    "notifications": { "enabled": true }
}
```

- `activeId` désigne la grossesse affichée : accueil, timeline et réglages de date ou de catégorie portent sur elle seule.
- Le petit nom est facultatif. Sans nom, la grossesse s'affiche « Bébé du » suivi de la date du terme, dans les listes ; rien n'est enregistré.
- **Terminer** une grossesse pose `closedAt` : elle sort des notifications, et ses écrans se figent à cette date. L'accueil propose de la terminer une fois le terme dépassé (« Bébé est né »), les réglages à tout moment. L'écran d'une grossesse terminée reste neutre (« Grossesse terminée »), car une grossesse peut s'arrêter pour d'autres raisons qu'une naissance.
- Supprimer la dernière grossesse revient à réinitialiser l'appli.
- **Migration** : au premier chargement, l'ancien format (`lgmb:v1`, une seule grossesse) est converti en v2, puis l'ancienne clé est supprimée.

S'y ajoute, dans IndexedDB, la copie dont le service worker a besoin pour les notifications (voir ci-dessous).

## Notifications

Une notification arrive **le jour où bébé change de semaine**, appli fermée, sur Android et sur iPhone (PWA installée) :

> **Semaine 20 : Bébé a grandi ! 🎉**
> Mi-parcours ! La brioche alsacienne a la forme d'un chapeau, et bébé la tête bien faite.

- Un **cron Vercel** quotidien (`vercel.json`, 6 h UTC soit 7-8 h à Paris, à l'heure près sur le plan Hobby) appelle `/api/push/cron`, qui envoie un push **vide** aux abonnés du jour.
- **Le serveur ne connaît jamais la DDR.** Il stocke dans Upstash Redis l'abonnement push et le ou les **jours de la semaine** où une semaine de grossesse change (un par grossesse en cours, sans savoir à laquelle il correspond), rien d'autre. Un abonnement figure dans la liste de chacun de ses jours.
- Le contenu est calculé **sur le téléphone** : à chaque ouverture, l'appli recopie dans IndexedDB, pour chaque grossesse en cours, la DDR et le texte des notifications S4 → S41 dans sa catégorie ; à réception du push, le service worker notifie les grossesses dont la DDR tombe le jour même. Le corps reprend le `funText` de l'item, sans son nom. Avec plusieurs grossesses en cours, le titre nomme bébé : « Semaine 20 : Crevette a grandi ! 🎉 ».
- Couper les notifications, ou réinitialiser l'appli, désabonne et supprime l'entrée côté serveur. Les abonnements expirés (404/410) sont purgés par le cron.
- **Pas de repli** : si le push n'est pas disponible sur un appareil, il n'y a pas de notification.

Chaque passage du cron écrit son bilan dans les logs Vercel (`push cron { weekday, sent, removed, failed }`) : c'est là qu'on vérifie qu'il a bien tourné, et pour combien d'abonnés.

Pour tester **le vrai cron**, sans attendre : dans Vercel, _Settings → Cron Jobs → Run_. Il envoie aux abonnés du jour courant ; pour en faire partie, régler temporairement dans l'appli une DDR tombant le même jour de la semaine qu'aujourd'hui, puis la remettre.

Pour tester un autre jour, avec N de 0 (dimanche) à 6 (samedi) :

```bash
curl -H "Authorization: Bearer $CRON_SECRET" "https://le-gro-mon-bebe.vercel.app/api/push/cron?weekday=N"
```

## PWA

- `app/manifest.ts` : nom, icônes, couleurs, `display: standalone`. Nom court sous l'icône Android : « Lé gro bébé ».
- `public/sw.js`, enregistré en production seulement : navigations en network-first, mises en cache par chemin (les quatre routes sont pré-cachées à l'installation, `/` sert de repli hors ligne), assets en stale-while-revalidate, réception des push. Les requêtes RSC de Next (en-tête `RSC`, paramètre `_rsc`) ne sont pas mises en cache : une version périmée casserait la navigation après un déploiement, et hors ligne Next se rabat de lui-même sur un chargement complet de la page.
- **Navigateurs intégrés** (Messenger, Facebook, Instagram) : ni installation ni notifications possibles, et un stockage séparé de celui du vrai navigateur. `InAppBrowserBanner` les détecte à l'user agent et invite à changer de navigateur, dès l'onboarding : bouton qui ouvre l'appli dans Chrome sur Android (lien `intent://`), instructions et copie du lien sur iPhone, où rien ne permet d'ouvrir Safari de force. La DDR est à ressaisir dans le vrai navigateur, choix assumé pour rester simple. Le bandeau d'installation est masqué dans ce cas.
- **Bandeau d'installation** (`InstallBanner`) : bouton natif sur Android (`beforeinstallprompt`), instructions Partager → Sur l'écran d'accueil sur iOS, où aucune API n'existe. Masquable, choix retenu en `localStorage`.

## Décisions

- Saisie de la **DDR**, pas de la date de conception.
- Une équivalence **par semaine**, calée sur la **taille** et non sur le poids : en calant sur le poids, fromages et fruits n'ont plus d'item crédible au-delà de S32.
- **Le serveur ne reçoit jamais la DDR**, et pas de notification de repli. Le corps de la notification garde le `funText` même quand il cite l'item (une trentaine de cas).
- **Liens Wikipédia en français uniquement**, en dur dans les JSON : pas de lien plutôt qu'un lien mort ou en anglais.
- **Pas de bandeau de consentement cookies.** L'appli est destinée à un cercle privé, le consentement est considéré comme implicite. À savoir si le sujet revient : le cercle privé n'est pas une exemption au sens du RGPD, puisque l'URL reste publique. L'exposition réelle est faible — pas de compte, aucune donnée personnelle transmise, une poignée d'utilisateurs — mais l'arbitrage est assumé, pas ignoré.
- Repo sur le **GitHub perso** (`ptyrode/le-gro-mon-bebe`), privé, strictement séparé des dépôts professionnels.

---

# Le code

## Stack

| Élément       | Choix                                                         |
| ------------- | ------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack)                            |
| Langage       | TypeScript                                                    |
| UI            | React 19 + Tailwind CSS 4                                     |
| Stockage      | `localStorage` et IndexedDB ; Upstash Redis pour le push      |
| Notifications | Web Push (VAPID) + cron Vercel                                |
| Textes        | next-intl, sans routing i18n (`public/locales/fr/`)           |
| PWA           | `app/manifest.ts` + service worker maison (`public/sw.js`)    |
| Hébergement   | Vercel                                                        |
| Analytics     | Google Tag Manager (`GTM-586X3SW9`) via `@next/third-parties` |

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
```

> Pour tester sur un mobile du réseau local, l'IP doit figurer dans `allowedDevOrigins` (`next.config.ts`) — sinon Next bloque les requêtes `/_next/*` cross-origin et l'appli reste sur le splash.

Le service worker ne s'enregistre qu'en production : le push ne se teste pas en local.

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

Configuration ESLint, Prettier et Stylelint : 4 espaces, quotes simples, une prop JSX par ligne, imports triés (`simple-import-sort`), imports inutilisés en erreur, classes Tailwind ordonnées via `prettier-plugin-tailwindcss`.

`stylelint.config.mjs` étend `stylelint-config-standard` en neutralisant `at-rule-no-unknown` pour les at-rules Tailwind 4 (`@theme`, `@apply`, `@utility`, `@variant`…), qu'il signalerait sinon comme inconnues.

⚠️ Lancer `npm run lint` seul peut recasser la mise en forme Prettier (il réordonne les imports). D'où `lint:fix`, qui enchaîne les trois outils dans le bon ordre.

### Outils lancés à la main

Ils vivent dans `scripts/`, hors du cycle de build, et sont exclus du linter (`console.log` assumé).

| Commande                           | Effet                                                           |
| ---------------------------------- | --------------------------------------------------------------- |
| `node scripts/audit-data.mjs`      | contrôle le calibrage des 190 items sur la courbe de croissance |
| `node scripts/generate-images.mjs` | génère et recadre les images via l'API OpenAI                   |
| `node scripts/check-images.mjs`    | vérifie qu'aucune image ne manque, avec le sujet attendu        |

## Structure

```
src/
├── app/          # App Router : layout racine, une route par dossier (page.tsx minimal), manifest, icônes
│   └── api/push/ # abonnement push et cron hebdomadaire
├── components/
│   ├── common/   # composants partagés : Onboarding, ItemVisual, bandeaux
│   ├── layouts/  # DefaultLayout et sa BottomNav
│   └── pages/    # un dossier par route, nommé comme elle : HomePage, TimelinePage, SettingsPage, NewPregnancyPage
├── @types/       # types ambiants (*.d.ts), utilisés sans import
├── constants/    # valeurs fixes, un fichier par sujet : routes, weeks, data, date, storage, push, install, links, analytics
├── contexts/     # RootProvider (next-intl, synchronisation des notifications)
├── data/         # fetalGrowth.json, weightJokes.json, categories/*.json
├── hooks/        # usePregnancy (useSyncExternalStore sur le localStorage), usePregnancyLabel
├── i18n/         # configuration next-intl (locale unique)
├── services/     # ce qui parle à l'extérieur : subscription.ts (abonnements push dans Redis, côté serveur), push.ts (abonnement du téléphone)
├── utils/        # un fichier par thème : date, growth, pregnancy, storage, browser, installPrompt, track, cn
└── fonts.ts      # police (next/font)

public/           # servi tel quel : icônes, service worker, locales/, images/
scripts/          # outils hors build : audit des données, images
└── data/         # tailles estimées, descriptions visuelles, références de style
_temp/            # fichiers de travail locaux, ignorés par git, un sous-dossier par besoin
```

Le fichier de route (`src/app/settings/page.tsx`) ne fait qu'envelopper le composant de page (`src/components/pages/SettingsPage/SettingsPage.tsx`) dans son layout, et ce composant compose ses sous-composants de section, rangés dans le même dossier. **Le nom d'un composant de page reprend celui de sa route** : `/new-pregnancy` → `NewPregnancyPage`. Ses sous-composants sont préfixés du nom de la page : `HomeGrowthCard`, `SettingsResetSection`.

Côté logique, `utils/` range **un fichier par thème**, en exports nommés : tout ce qui manipule une date dans `date.ts`, le contenu d'une semaine (taille, poids, équivalence) dans `growth.ts`, l'état et le statut d'une grossesse dans `pregnancy.ts`, etc. `services/` suit la même règle : `push.ts` pour l'abonnement du téléphone, `subscription.ts` pour les abonnements stockés dans Redis. Les types sont **ambiants** dans `src/@types/` : pas d'import, pas d'export.

`scripts/` reste **hors de `src/`** : ce n'est ni du code applicatif ni des fichiers compilés.

## Données de comparaison

Cinq catégories de 38 items (S4 → S41), un JSON par catégorie dans `src/data/categories/`, plus la courbe de croissance (`fetalGrowth.json`) et les comparaisons de poids (`weightJokes.json`). Chaque item est calé sur la **taille** du fœtus de sa semaine, et l'ordre suit le **volume** : un objet long et fin passe avant un objet plus court mais massif. `node scripts/audit-data.mjs` vérifie qu'aucun item n'est hors tolérance et que bébé ne paraît jamais rétrécir d'une semaine à l'autre.

Format des fichiers, tolérance, conventions de mesure et format des desserts : [`src/data/README.md`](src/data/README.md).

## Images

Une image par item : **190 images** (38 semaines × 5 catégories) en WebP 512 px, dans `public/images/<catégorie>/<catégorie>-<semaine>.webp`. `ItemVisual` les affiche, avec repli sur l'emoji de la catégorie si une image manque.

Elles sont générées par l'API OpenAI, une image par sujet :

```bash
node scripts/generate-images.mjs desserts            # toute la catégorie
node scripts/generate-images.mjs desserts 4-7 12     # une sélection de semaines
node scripts/generate-images.mjs desserts 4 --dry    # affiche le prompt sans appel
node scripts/generate-images.mjs desserts --reframe  # recadre sans appel
```

- **Modèle figé** sur une version datée : c'est le changement de modèle d'une session à l'autre qui faisait dériver le style entre séries.
- **Références de style** : chaque appel joint les images de `scripts/data/style-references/`. Ne jamais y mettre une image ratée, le modèle la recopie.
- **Prompt** : construit par `scripts/image-prompts.mjs` (consignes de style, de costume et de série) ; la description visuelle de chaque sujet vit dans `scripts/data/image-subjects.json`, indexée par le nom de l'item.
- **Recadrage automatique** : le modèle colle presque toujours le sujet en haut du cadre. Le script le détoure depuis les bords et le recentre avec 6 % de marge sur un fond uni `#FFF4EE`. Une image coupée dans l'original reste à régénérer.
- Les originaux 1024 px sont gardés dans `_temp/images/`, pour que `--reframe` puisse recadrer sans payer. Ceux des 190 images actuelles ont été supprimés : `--reframe` ne s'applique qu'aux images générées depuis. Le script saute les images déjà présentes.
- **Pour refaire une image** : corriger la description du sujet, supprimer le WebP, relancer sa semaine. ~0,05 $ l'image.
- ⚠️ **Après avoir remplacé des images, changer la version du cache** du service worker (`const CACHE = 'lgmb-v6'` dans `public/sw.js`, à passer en `v7`, etc.). Les images gardent le même nom alors que leur contenu change : sans nouvelle version, les téléphones affichent encore l'ancienne image à la première ouverture qui suit le déploiement.
- ⚠️ **Relire chaque image** : un sujet mal reconnu, et bébé fait la taille du mauvais objet toute une semaine. `node scripts/check-images.mjs` vérifie qu'il n'en manque aucune.

Règle de dessin : bébé est **assis, vu de face**, et porte le sujet comme un déguisement. La capuche peut avoir les yeux, le museau ou le bec de l'animal, plus petits que les yeux du bébé, mais **jamais de bouche ni de sourire** : deux visages qui sourient l'un au-dessus de l'autre, c'est raté.

## Icônes

`public/icon-{192,512}.png`, `src/app/icon.png`, `src/app/apple-icon.png` et `src/app/favicon.ico` : le biberon en blanc sur un aplat corail. Ils ont été générés une fois pour toutes ; ni le SVG source ni le script ne sont conservés.

- Le biberon occupe **la moitié du cadre** sur toutes les tailles, pour survivre au rognage d'environ 20 % des icônes `maskable` d'Android. Les mêmes fichiers servent donc en `any` et en `maskable`.
- `apple-icon.png` est le seul carré plein : iOS applique son propre masque et remplirait des coins transparents en noir.
- `public/badge-96.png` est la petite icône des notifications dans la barre d'état d'Android (option `badge` de `showNotification`, dans `public/sw.js`). Android n'en garde que la transparence et la recolore lui-même : une image opaque y devient un carré blanc. C'est donc le biberon seul, en blanc sur fond transparent, découpé dans `icon-512.png`.

## Déploiement

Hébergé sur **Vercel**, branché sur ce repo GitHub : chaque push sur `main` redéploie automatiquement. Sur mobile, « Ajouter à l'écran d'accueil » installe la PWA.

Variables d'environnement, à renseigner dans Vercel comme dans `.env` en local (copier `.env.example`, seul des deux à être versionné) :

| Variable                               | Rôle                                                         |
| -------------------------------------- | ------------------------------------------------------------ |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY`         | clé publique Web Push, embarquée côté client                 |
| `VAPID_PRIVATE_KEY`                    | clé privée Web Push, côté serveur uniquement                 |
| `VAPID_SUBJECT`                        | contact VAPID (`https://le-gro-mon-bebe.vercel.app`)         |
| `CRON_SECRET`                          | protège `/api/push/cron` ; Vercel l'envoie au cron tout seul |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | base Upstash Redis, posées par l'intégration Vercel          |
| `OPENAI_API_KEY`                       | local uniquement, pour `scripts/generate-images.mjs`         |

Les clés VAPID se génèrent avec `npx web-push generate-vapid-keys`. Les changer invalide tous les abonnements existants.

---

## Documentation

- [`TODO.md`](TODO.md) — ce qu'il reste à faire
- [`src/data/README.md`](src/data/README.md) — format et calibrage des données
- [`CLAUDE.md`](CLAUDE.md) — consignes de développement (pièges Next 16, chaîne de lint, rédaction)
