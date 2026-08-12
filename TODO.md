# TODO — Lé gro mon bébé

> ✅ En ligne : **https://le-gro-mon-bebe.vercel.app/** — redéploiement automatique à chaque push sur `main`.

## 🔴 v1 — ce qui reste

- [ ] **Illustrations** : 152 images à générer (voir ci-dessous). Un prompt par catégorie dans [`docs/`](docs/).
- [ ] **Tests sur mobile réel** : notifications (Option A), installation de la PWA depuis la prod (iOS + Android), et comportement des liens Wikipédia en mode standalone.

## 🔵 v2 — plus tard

- [ ] **Sortir les JSON vers un stockage Vercel.** Deux offres proposées dans l'interface :
    - **Global Config** (« ultra-low latency reads ») : petit magasin JSON répliqué mondialement, lu depuis l'edge. Conçu pour de la config et des données lues souvent mais modifiées rarement — le profil exact de nos catégories.
    - **Blob** (« fast object storage ») : stockage de fichiers façon S3, pour images et médias.
    - ⚠️ **Gain réel à questionner.** Aujourd'hui les JSON sont importés au build : ils partent dans le bundle, sans aucune requête réseau — donc plus rapides que n'importe quelle base. Le seul vrai bénéfice de Global Config serait de **modifier le contenu sans redéployer**. Idem pour Blob : `public/` est déjà servi par le CDN Vercel gratuitement, Blob n'a d'intérêt que pour des fichiers uploadés depuis l'appli.
    - À trancher quand le besoin d'éditer sans redéployer se fera sentir.
- [ ] **Formulaire feedback** : remplacer le `mailto:` par une Serverless Function + Resend.
- [ ] Gérer plusieurs grossesses (cf. `SPECS.md`).
- [ ] Proposer de clore la grossesse quand le terme est dépassé (lié au multi-grossesses).

### Illustrations

Une **image par item** (ex : un munster avec une petite tête de bébé mignonne), pour remplacer l'emoji du Dashboard.

- Volume : 38 items × 4 catégories = **152 images**. Commencer par `animals`.
- ⚠️ Aucun générateur d'images dans l'environnement de dev → les images sont produites par un modèle externe, à partir d'une image de référence fournie par Pierrick.
- 📄 **Un prompt prêt à copier-coller par catégorie** : `docs/PROMPT-animals.md`, `-fruits.md`, `-fish.md`, `-cheeses.md`.
- Ces fichiers sont **générés** depuis les JSON par `python3 scripts/gen-illustration-prompts.py` : après toute modification d'un item, régénérer plutôt que corriger à la main.
- Destination : `public/illustrations/<catégorie>/<catégorie>-<semaine>.png`. Le point d'insertion est marqué `TODO(illustrations)` dans `Dashboard.tsx`.
- **Chaîne outillée** : les modèles rendent une planche contact plutôt que des fichiers séparés, le prompt exploite ce comportement en demandant des planches 2 × 2 de 2048 px.
    - Chaque fichier `PROMPT-*.md` contient **10 blocs autonomes**, un par planche, avec les 4 sujets nommés **et décrits visuellement** — c'est ce qui empêche le modèle d'improviser ou de dupliquer un sujet pour remplir la grille.
    - `node scripts/split-illustrations.mjs <planche.png> <catégorie> <semaineDépart>` découpe, redimensionne en 1024 et nomme. Refuse d'écraser un fichier existant.
    - `node scripts/check-illustrations.mjs` contrôle qu'il ne manque rien et rappelle le sujet attendu pour chaque image absente.
- ⚠️ **Relire visuellement chaque image** : un décalage d'un cran et bébé fait la taille du mauvais objet toute une semaine.
- Penser à **optimiser le poids des PNG** avant commit : 152 images en 1024 px, c'est lourd pour une PWA. `sharp` est déjà dans `node_modules`.

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

### Autres

- [x] Déploiement Vercel, branché sur GitHub `ptyrode/le-gro-mon-bebe`.
- [x] Renommage des fichiers de données en anglais (`animals`, `cheeses`, `fish`, `fruits`).
- [x] Chaîne ESLint + Prettier + Stylelint reprise du projet Aubade (`npm run lint:fix`).
