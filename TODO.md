# TODO — Lé gro mon bébé

> ✅ En ligne : **https://le-gro-mon-bebe.vercel.app/** — redéploiement automatique à chaque push sur `main`.

## 🔴 Prioritaire — revoir/calibrer les données de comparaison

Les catégories actuelles (`src/data/categories/*.json`) ont été générées pour donner une **impression de taille croissante**, mais les valeurs **réelles ne collent pas** aux données du fœtus.

**Exemple** : semaine 40 → fœtus ≈ 51 cm / 3,4 kg, mais une _meule de Comté_ pèse ~40 kg. Incohérent.

**✅ Décidé (07/08/2026) — on cale sur la TAILLE, pas sur le poids.**
C'est la convention des comparatifs de grossesse (« bébé fait la taille d'un melon »), et c'est bien plus faisable : une pastèque fait 40 cm, un potiron 45 cm, un bar 51 cm — les catégories tiennent jusqu'à S40. En calant sur le poids, fromages et fruits plafonnaient dès S32.

**À faire** : pour chaque item, choisir un objet dont la **plus grande dimension réelle** correspond (à peu près) à la taille du fœtus de la semaine (voir `src/data/fetalGrowth.json`).

- Recaler les 4 catégories : `fruits`, `fish`, `cheeses`, `animals`.
- Critère : **taille (cm) en priorité**. Le poids devient indicatif — on ne cherche plus à le faire coller.
- Écrire un **script de validation** qui compare chaque item à `fetalGrowth.json` et sort les écarts, pour avoir une mesure objective.
- Garder le ton rigolo des `funText`.

**Repères de croissance** (`fetalGrowth.json`) : S8 → 1,6 cm · S12 → 5,4 cm · S16 → 11,6 cm · S20 → 25,6 cm · S24 → 30 cm · S28 → 37,6 cm · S32 → 42,4 cm · S36 → 47,4 cm · S40 → 51,2 cm.

**📊 Audit fait le 07/08/2026 → voir [`DATA-AUDIT.md`](DATA-AUDIT.md)** (script rejouable : `python3 scripts/audit-data.py`).

Verdict : `fruits` 17 OK / 4 problèmes · `animals` 13 / 8 · `cheeses` 12 / 12 · **`fish` 3 / 24**.

**🔴 Bloquant découvert** : `fetalGrowth.json` fait un saut de **+67 % entre S19 (15,3 cm) et S20 (25,6 cm)** — changement de méthode de mesure (longueur cranio-caudale → tête-talons). Aucune catégorie ne peut absorber cette marche. À trancher **avant** de recaler les items (3 options détaillées dans `DATA-AUDIT.md`).

**Reste à trancher** :

- La marche S19→S20 (cf. ci-dessus).
- Liberté de remplacer les items existants, y compris ceux qui portent une blague (le camembert de S16, la meule de Comté de S40).

## 🔴 En complément de la validation des data

### Texte drôle sur chaque item

Le champ `funText` existe **et est déjà rempli sur les 144 items** (36 × 4 catégories). Il s'affiche dans le Dashboard (`Dashboard.tsx:49`) — c'est le bon endroit, **pas besoin de l'afficher dans la Timeline** (la liste doit rester dense et lisible).

- À faire : **réécrire les 144 textes** au fur et à mesure du recalibrage — dès qu'un item change, son texte n'a plus de sens.
- Garder le ton décalé/argot assumé.

### Lien Wikipédia sur l'élément

Permettre de cliquer sur l'item (ex. _melon_, _Reblochon_) pour ouvrir sa page Wikipédia.

- Ajouter un champ optionnel `wikipedia` dans `CategoryItem` (`src/lib/types.ts`) : URL en dur plutôt que générée, sinon les redirections et homonymes tombent à côté (« crotte de chèvre » n'a pas d'article, « Rocamadour » renvoie vers la ville).
- Rendre le champ **optionnel** : certains items n'auront pas d'article pertinent → pas de lien affiché, pas de lien mort.
- Ouvrir dans un nouvel onglet (`target="_blank" rel="noopener"`), et vérifier le comportement en mode PWA standalone (un lien externe peut sortir de l'appli).
- ⚠️ À vérifier au moment de le faire : chaque URL doit être testée une par une, un lien Wikipédia cassé se voit tout de suite.

### Gérer les dates « mauvaises »

Aujourd'hui `clampWeek()` (`src/lib/pregnancy.ts`) borne la semaine entre 4 et 40 **en silence** : aucun cas limite n'est signalé à l'utilisateur.

- **Terme dépassé** (> 40 SA) : l'appli affiche « semaine 40 » comme si la grossesse était en cours. → Afficher un message du genre « bah alors, il est où le bébé ? il devrait être né depuis X jours ! ». La donnée existe déjà : `daysUntilDue()` devient négatif.
- **Date dans le futur** : `daysSince()` est négatif et l'appli retombe sur la semaine 4 → message d'erreur à la saisie plutôt qu'un affichage faux.
- **Date beaucoup trop ancienne** (plusieurs années) : distinguer « bébé né récemment » d'une saisie manifestement erronée.
- **Avant la semaine 4** : vérifier ce qui s'affiche, les données de croissance ne commencent qu'à la semaine 4.
- Valider aussi la date **au moment de la saisie** dans l'Onboarding et les Réglages, pas seulement à l'affichage.
- Décider si, terme dépassé, on propose de **clore la grossesse** (bascule vers un état « bébé né ») — ça touche au multi-grossesses prévu en v2, donc à cadrer.

### 💡 Idée : une 5e catégorie « lourdeurs »

Inspirée d'une infographie de _Bonjour Ocytocine_ (« poids du bébé vs lourdeur des gens ») : au lieu de comparer bébé à un objet, on compare son **poids** à celui des remarques pénibles de l'entourage.

📄 Infographie transcrite dans **`scripts/reference-bonjourocytocine.json`** (14 entrées, 4 SA → 9e mois).

Le principe : « Cette semaine, bébé pèse 140 g — aussi lourd que ton boss qui te demande si tu comptes t'arrêter longtemps. »

- **Ça recycle le poids**, qu'on a justement abandonné comme critère de calibrage pour les autres catégories. Ici l'écart n'a aucune importance, c'est une vanne.
- Cible parfaite du ton décalé/argot du projet.
- Registre à cadrer avec Pierrick : l'infographie d'origine tape sur la belle-mère, le boss, l'influenceuse, la copine jamais enceinte qui a un avis. C'est mordant — à doser puisque l'appli est destinée à ses proches.
- ⚠️ Ne reprendre que **le concept**, pas les formulations : leurs punchlines sont leur contenu éditorial. À réécrire intégralement.
- Impact technique : cette catégorie n'a pas d'`emoji` d'objet ni de taille à valider → vérifier que le modèle `CategoryItem` s'y prête, et l'exclure de `scripts/audit-data.py` (rien à calibrer).

## 🟡 Après validation des data — illustrations

Une fois les data au poil, générer une **image illustrative rigolote par item** (ex : un munster avec une petite tête de bébé mignonne).

- ⚠️ Volume : ~35 items × 4 catégories ≈ **140 images** → réfléchir au périmètre (une seule catégorie d'abord ? style commun ?).
- ⚠️ Capacité génération d'images : à cadrer (voir note ci-dessous / discuter avec Pierrick).

## Reste du découpage (cf. SPECS.md §7)

- [ ] Formulaire feedback : remplacer le `mailto:` par Serverless Function + Resend.
- [ ] Tester les notifications (Option A) sur mobile réel.
- [ ] Tester l'installation de la PWA depuis l'URL de prod (iOS + Android).
- [x] Déploiement Vercel, branché sur GitHub `ptyrode/le-gro-mon-bebe`.
- [x] Premier commit poussé.
