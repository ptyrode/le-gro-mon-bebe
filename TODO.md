# TODO — Lé gro mon bébé

> ✅ En ligne : **https://le-gro-mon-bebe.vercel.app/** — redéploiement automatique à chaque push sur `main`.

## 🔴 v1 — ce qui reste

- [x] **Illustrations** : les 4 catégories sont faites — **152 images** (2,9 Mo en WebP 512).
- [ ] **Tests sur mobile réel** (iPhone) : installation via le bandeau, popup de permission des notifications, et comportement des liens Wikipédia en mode standalone.
    - ⚠️ Sur iOS, les notifications web n'existent **que si la PWA est installée** sur l'écran d'accueil. Sans installation, aucune notif possible.
    - ⚠️ La notification actuelle (Option A) se déclenche **à l'ouverture de l'appli**, pas spontanément. Un vrai push hebdomadaire demande un service worker `push` + VAPID + une fonction serverless — c'est l'Option B, en v2.

## 🔵 v2 — plus tard

- [ ] **Sortir les JSON vers un stockage Vercel.** Deux offres proposées dans l'interface :
    - **Global Config** (« ultra-low latency reads ») : petit magasin JSON répliqué mondialement, lu depuis l'edge. Conçu pour de la config et des données lues souvent mais modifiées rarement — le profil exact de nos catégories.
    - **Blob** (« fast object storage ») : stockage de fichiers façon S3, pour images et médias.
    - ⚠️ **Gain réel à questionner.** Aujourd'hui les JSON sont importés au build : ils partent dans le bundle, sans aucune requête réseau — donc plus rapides que n'importe quelle base. Le seul vrai bénéfice de Global Config serait de **modifier le contenu sans redéployer**. Idem pour Blob : `public/` est déjà servi par le CDN Vercel gratuitement, Blob n'a d'intérêt que pour des fichiers uploadés depuis l'appli.
    - À trancher quand le besoin d'éditer sans redéployer se fera sentir.
- [ ] **Reprendre les illustrations de `fruits`, `cheeses` et `fish`.** Le rendu est inégal : sur certaines images le bébé est bien visible sous le costume (tête entière, mains, pieds), sur d'autres — les poissons surtout — on n'a qu'un sujet avec un œil un peu humain et deux mains. L'effet « déguisement » manque.
    - La consigne a été renforcée dans `scripts/gen-illustration-prompts.py` **après** la génération de ces trois catégories : elle demande désormais explicitement la tête entière du bébé émergeant du costume, plus les mains et les pieds qui dépassent. `animals` en bénéficie déjà.
    - Regénérer les 114 images avec le prompt actuel, ou seulement les plus faibles (les poissons en priorité).
    - `fish` a été **régénéré en v2 et installé** : 6 vignettes sur 38 seulement sont conformes. Relevé complet : [`docs/REPRISE-fish.md`](REPRISE-fish.md).
    - Le générateur a été corrigé depuis (montage de la capuche décrit au lieu d'être interdit, posture assise imposée, dernière planche complétée par répétition) et **les 4 prompts sont régénérés**. Les 152 images sont donc toutes à refaire avec cette version — `animals` compris, dont le rendu v2 souffrait du même défaut de double visage.
    - ✅ `fruits` **v3 générée et installée** : **36 vignettes sur 38** sont bonnes, ce qui valide le correctif. Restent S6 (lentille) et S41 (courge trombone), décrites depuis dans le prompt : [`docs/REPRISE-fruits.md`](REPRISE-fruits.md).
    - ⚠️ `cheeses` **v3 générée et installée, mais seulement 12 vignettes sur 38** : [`docs/REPRISE-cheeses.md`](REPRISE-cheeses.md). Le prompt a été corrigé (le fromage redevenait un disque percé plutôt qu'un costume ; des noms étaient gravés sur les croûtes), **mais un défaut ne se règle pas au prompt** — voir ci-dessous.
    - ⬜ `animals` **v3 générée et installée** : le montage est bon sur les 38, mais 29 capuches portent une tête d'animal complète, ce que le prompt interdit : [`docs/REPRISE-animals.md`](REPRISE-animals.md).
    - ✅ `fish` **v3 générée et installée** : le poisson posé en chapeau sur le crâne a **totalement disparu** (c'était 9 vignettes en v2), et la planche S20-S23 est exemplaire. Restent 26 capuches à yeux, même question que pour `animals` : [`docs/REPRISE-fish.md`](REPRISE-fish.md).
- [ ] **Trancher la règle « aucun œil sur la capuche ».** Une seule décision débloque `animals` et `fish` — soit 34/38 dans chaque catégorie si on l'assouplit, soit 55 vignettes à regénérer si on la maintient. Écrite à l'origine pour empêcher le poisson-chapeau, elle prive les mammifères de ce qui rend leur costume lisible. Détail de l'arbitrage dans les deux fichiers de reprise.
- [ ] **Revoir les items de `cheeses.json`.** Une dizaine de fromages de la liste sont visuellement indiscernables : Beaufort, Sbrinz, Gruyère et Comté donnent quatre meules jaunes identiques, et les deux emmentals de S40-S41 la même image. Soit **six semaines d'affilée avec la même illustration**, juste avant le terme. À remplacer avant de relancer la génération, sinon on regénère pour rien.
    - Vérifier que les tailles de substitution passent `python3 scripts/audit-data.py`, et réécrire les `funText`.
- [x] **Icônes de l'appli refaites** depuis `_temp/baby-bottle.svg`, par `node scripts/gen-icons.mjs`.
    - Cinq fichiers générés : `public/icon-{192,512}.png`, `src/app/icon.png` (512), `src/app/apple-icon.png` (180), `src/app/favicon.ico` (16/32/48).
    - Le SVG source dessine le biberon **en évidement** dans le disque : le script en extrait les deux tracés et les repeint en blanc sur un aplat corail, ce qui permet de choisir la taille du sujet et la forme du cadre.
    - **`SUBJECT = 0.5` : le biberon occupe la même part du cadre sur toutes les tailles.** Ce ratio est dicté par le rognage d'environ 20 % qu'Android applique aux icônes `maskable`.
    - **Pas de fichiers `maskable` séparés** : le manifest déclare les mêmes `icon-192` et `icon-512` en `any` et en `maskable`, puisqu'ils sont dimensionnés pour les deux. Les coins arrondis (22 %) ne gênent pas — les masques Android sont inscrits dans le cadre et ne les atteignent jamais.
    - **`apple-icon.png` est le seul carré plein** — iOS applique son propre masque et remplirait des coins transparents en noir.
- [ ] **Événements GA4 — reste la configuration dans GTM.** Le code pousse les six événements dans le `dataLayer` (`src/lib/analytics.ts`), mais tant qu'aucune balise ne les relaie, ils n'arrivent pas dans GA4.
    - Dans GTM, pour chaque nom : un déclencheur « Événement personnalisé » + une balise « Google Analytics : Événement GA4 ».
    - `view_change` (`view`), `category_change` (`category`, `source`), `wikipedia_click` (`category`, `week`, `item`), `pwa_install` (`outcome`), `notifications_toggle` (`enabled`, `permission`), `support_click`.
    - Chaque paramètre demande une variable « Variable de couche de données » du même nom.
    - ⚠️ `pwa_install` ne remonte que sur Android : iOS n'expose pas `beforeinstallprompt`, l'installation s'y fait par le menu de partage et reste invisible.
- [ ] **Formulaire feedback** : remplacer le `mailto:` par une Serverless Function + Resend.
- [ ] Gérer plusieurs grossesses (cf. `SPECS.md`).
- [ ] Proposer de clore la grossesse quand le terme est dépassé (lié au multi-grossesses).

### Illustrations

Une **image par item** (ex : un munster avec une petite tête de bébé mignonne), pour remplacer l'emoji du Dashboard.

- Volume : 38 items × 4 catégories = **152 images**, toutes générées.
- ⚠️ Aucun générateur d'images dans l'environnement de dev → les images sont produites par un modèle externe, à partir d'une image de référence fournie par Pierrick.
- 📄 **Un prompt prêt à copier-coller par catégorie** : `docs/PROMPT-animals.md`, `-fruits.md`, `-fish.md`, `-cheeses.md`.
- Ces fichiers sont **générés** depuis les JSON par `python3 scripts/gen-illustration-prompts.py` : après toute modification d'un item, régénérer plutôt que corriger à la main.
- Destination : `public/images/<catégorie>/<catégorie>-<semaine>.webp`. Affiché par `ItemVisual` dans `Dashboard.tsx`, avec **repli sur l'emoji** si l'image manque — les catégories sans illustrations continuent donc de fonctionner.
- Le découpage produit du **WebP 512 px** (≈ 15 Ko l'image, contre 1,2 Mo en PNG 1024). Les 4 catégories tiendront dans ~3 Mo.
- ⚠️ Les planches sources déposées dans `docs/<catégorie>/` sont **ignorées par git** (58 Mo pour `fruits` seul).
- **Chaîne outillée** : les modèles rendent une planche contact plutôt que des fichiers séparés, le prompt exploite ce comportement en demandant des planches 2 × 2 de 2048 px.
    - Chaque fichier `PROMPT-*.md` contient **10 blocs autonomes**, un par planche, avec les 4 sujets nommés **et décrits visuellement** — c'est ce qui empêche le modèle d'improviser ou de dupliquer un sujet pour remplir la grille.
    - `node scripts/split-illustrations.mjs <planche.png> <catégorie> <semaineDépart>` découpe, redimensionne en 1024 et nomme. Refuse d'écraser un fichier existant.
    - `node scripts/check-illustrations.mjs` contrôle qu'il ne manque rien et rappelle le sujet attendu pour chaque image absente.
- ⚠️ **Relire visuellement chaque image** : un décalage d'un cran et bébé fait la taille du mauvais objet toute une semaine.

---

## ✅ Fait

### Calibrage des données de comparaison

Les **4 catégories ont été régénérées**, calées sur la **taille** : **152 items** (38 par catégorie, S4 → S41), tous dans la tolérance, **aucune régression**.
Méthode, tolérance et conventions de mesure : [`src/data/README.md`](src/data/README.md) · vérification : `python3 scripts/audit-data.py`.

| Catégorie | Avant         | Après            |
| --------- | ------------- | ---------------- |
| `fish`    | 2 OK / 24 KO  | **38 OK / 0 KO** |
| `cheeses` | 12 OK / 12 KO | **38 OK / 0 KO** |
| `animals` | 13 OK / 8 KO  | **38 OK / 0 KO** |
| `fruits`  | 17 OK / 4 KO  | **38 OK / 0 KO** |

Les `funText` ont tous été réécrits au passage.

### Courbe de croissance et méthode de mesure

`fetalGrowth.json` couvre **S4 → S41**, avec un champ `measure` (`"lcc"` jusqu'à S13, `"total"` ensuite). La marche de +79 % entre S13 et S14 n'est pas une erreur mais un changement de méthode de mesure : elle est désormais affichée dans le Dashboard (« de la tête aux fesses » / « de la tête aux pieds »).

### Gérer les dates « mauvaises »

`clampWeek()` bornait entre 4 et 41 **en silence** : une grossesse terminée depuis un an affichait « semaine 41 », et une date future retombait sur « semaine 4 ».

`pregnancyStatus()` (`src/lib/pregnancy.ts`) qualifie maintenant chaque cas, et le Dashboard a un écran par situation :

| Statut        | Déclenchement         | Écran                                                     |
| ------------- | --------------------- | --------------------------------------------------------- |
| `future`      | DDR après aujourd'hui | « Cette date est bizarre »                                |
| `implausible` | plus de 2 ans         | « Elle remonte à plus de deux ans »                       |
| `tooEarly`    | avant 4 SA            | « C'est encore tout frais », pas de données de croissance |
| `born`        | au-delà de 41 SA      | « Bébé devrait être né ! » + jours de dépassement         |
| `ongoing`     | 4 → 41 SA             | affichage normal                                          |

- `MAX_WEEK` est passé de 40 à **41** (grossesse prolongée).
- La DDR est validée **à la saisie** (`validateLastPeriodDate`) dans l'onboarding **et** dans les réglages, avec message affiché — les réglages ignoraient jusque-là silencieusement une date invalide.
- ⬜ Reste ouvert : proposer de **clore la grossesse** (état « bébé né ») quand le terme est dépassé. Ça touche au multi-grossesses prévu en v2, donc à cadrer.

### Comparaison de poids (« lourdeurs »)

Le Dashboard affiche désormais **deux comparaisons** :

```
Bébé mesure 25 cm
Soit la taille d'une Mimolette ↗
« Mi-parcours ! Et cette boule orange est creusée par des acariens. »
──────────────────────────────
Bébé pèse 300 g
Soit le poids de la mère de trois enfants qui commence toutes ses phrases par « tu devrais ».
```

- Données dans **`src/data/weightJokes.json`**, indexées par semaine (S4 → S41), **indépendantes de la catégorie** : inutile de dupliquer 38 blagues dans les quatre fichiers.
- Ce n'est donc **pas** une 5e catégorie : pas de `CategoryKey` supplémentaire, pas de champ `compareBy`, rien à exclure de l'audit.
- Chaque valeur est une **phrase complète** (majuscule, point, contractions écrites) — voir l'avertissement dans `src/data/README.md`.
- Concept inspiré de Bonjour Ocytocine, **formulations entièrement réécrites**.

### Lien Wikipédia sur l'élément

Le nom de l'item est cliquable dans le Dashboard et ouvre son article Wikipédia FR.

- Champ **optionnel** `wikipedia` dans `CategoryItem`, **URL en dur** : une URL construite depuis `name` serait tombée à côté — la validation l'a confirmé, 6 titres n'existaient pas et 9 renvoyaient vers une page d'homonymie (« Camembert » → la commune, « Parmesan » → homonymie, « Beagle » → le navire de Darwin).
- **151 items sur 152** ont un lien. Seule « une courge trombone » n'en a pas : aucun article FR. C'est le cas d'usage du champ optionnel — pas de lien plutôt qu'un lien mort.
- Titres **validés via l'API Wikipédia** (existence + détection des homonymies), redirections suivies jusqu'à l'article final, puis **les 134 URLs uniques testées en HTTP : toutes en 200**.
- Ouverture en nouvel onglet (`target="_blank" rel="noopener noreferrer"`), avec un ↗ et un libellé pour les lecteurs d'écran.
- ⬜ Reste à vérifier **sur mobile en mode PWA standalone** : un lien externe peut sortir de l'appli installée.

### Texte drôle sur chaque item

Le champ `funText` est rempli sur les 152 items et s'affiche dans le Dashboard. Décidé : **pas d'affichage dans la Timeline**, la liste doit rester dense.

### Consentement cookies — écarté

**Décision prise : pas de bandeau de consentement.** L'appli est destinée à un cercle privé,
le consentement est considéré comme implicite.

À savoir si le sujet revient : le cercle privé n'est pas une exemption au sens du RGPD,
puisque l'URL Vercel reste publiquement accessible, et le texte ne reconnaît pas le
consentement implicite. L'exposition réelle est faible — pas de compte, aucune donnée
personnelle transmise, une poignée d'utilisateurs — mais l'arbitrage est assumé, pas ignoré.

### Autres

- [x] Déploiement Vercel, branché sur GitHub `ptyrode/le-gro-mon-bebe`.
- [x] Renommage des fichiers de données en anglais (`animals`, `cheeses`, `fish`, `fruits`).
- [x] Chaîne ESLint + Prettier + Stylelint reprise du projet Aubade (`npm run lint:fix`).
