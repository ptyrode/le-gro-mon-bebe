# Audit des données de comparaison — 07/08/2026

Critère retenu : **la taille** (plus grande dimension réelle de l'objet), cf. `TODO.md`.

Rejouer l'audit : `python3 scripts/audit-data.py`

**Tolérance appliquée** (ratio = taille de l'objet ÷ taille du fœtus) :

| Verdict     | Ratio                     | Sens                                             |
| ----------- | ------------------------- | ------------------------------------------------ |
| ✅ OK       | 0,75 – 1,35               | l'écart ne se remarque pas                       |
| ⚠️ Limite   | 0,50 – 0,75 ou 1,35 – 2,0 | ça passe, mais c'est approximatif                |
| ❌ Problème | < 0,50 ou > 2,0           | l'objet est au moins 2× trop petit ou trop grand |

⚠️ Les tailles d'objets sont mes **estimations d'ordre de grandeur**, pas des mesures sourcées. Elles vivent dans le dict `EST` de `scripts/audit-data.py` — corriger une valeur qui paraît fausse et relancer.

---

## Récapitulatif

Après adoption de la nouvelle courbe (voir plus bas) :

| Catégorie   | ✅ OK | ⚠️ Limite | ❌ Problème | Régressions |
| ----------- | ----- | --------- | ----------- | ----------- |
| **fruits**  | 17    | 15        | 4           | 7           |
| **animals** | 13    | 15        | 8           | 13          |
| **cheeses** | 12    | 12        | 12          | 12          |
| **fish**    | **3** | 9         | **24**      | 12          |

<details>
<summary>Scores avant changement de courbe</summary>

| Catégorie | ✅ OK | ⚠️ Limite | ❌ Problème |
| --------- | ----- | --------- | ----------- |
| fruits    | 21    | 12        | 3           |
| animals   | 11    | 15        | 10          |
| cheeses   | 13    | 11        | 12          |
| fish      | 2     | 10        | 24          |

La nouvelle courbe **déplace** le problème sans le réduire globalement : S14-S19 ayant pris 4 à 7 cm, les fruits y perdent un peu et les animaux y gagnent. Le diagnostic par catégorie reste identique.
</details>

« Régression » = l'item d'une semaine est **plus petit** que celui de la semaine précédente. C'est le défaut le plus visible pour l'utilisateur : bébé est censé grandir, et la comparaison rapetisse.

---

## 🔴 Le problème n°1 n'est pas dans les catégories : il est dans `fetalGrowth.json`

La courbe de référence contient **deux discontinuités** qui rendent tout calibrage fluide impossible :

| Passage   | Taille                | Écart                    |
| --------- | --------------------- | ------------------------ |
| S19 → S20 | 15,3 cm → **25,6 cm** | **+67 % en une semaine** |
| S24 → S25 | 30,0 cm → **34,6 cm** | +15 % en une semaine     |

C'est un artefact de mesure réel en obstétrique : jusqu'à ~20 SA on mesure la **longueur cranio-caudale** (LCC, bébé recroquevillé), après on mesure **tête-talons**. Les deux ne se raccordent pas.

**Conséquence directe** : à S19 il faut un objet de 15 cm, à S20 un objet de 26 cm. Aucune catégorie ne peut absorber ça sans que la progression paraisse absurde. **Il faut trancher ça avant de recaler quoi que ce soit.**

Trois options :

1. **Lisser la courbe** entre S18 et S22 pour supprimer la marche (on s'éloigne un peu de la donnée médicale, mais l'usage est ludique et le Dashboard affiche déjà la vraie valeur).
2. **Rester en LCC jusqu'au bout** — cohérent, mais donne un « 38 cm » à terme qui ne parlera à personne.
3. **Assumer la marche** et l'expliquer dans l'appli (« à partir de la semaine 20, on mesure bébé de la tête aux pieds ! ») — c'est le plus honnête, et ça fait un contenu rigolo de plus.

Ma préférence : **option 3** — et la comparaison ci-dessous la conforte.

---

## Comparaison avec une référence externe (miraparent.com)

Données extraites de l'outil « taille bébé fruit » de [miraparent.com](https://www.miraparent.com/outils/taille-bebe-fruit/) → sauvegardées dans `scripts/reference-miraparent.json` (36 entrées, **S6 à S41**).

**Ce que la comparaison révèle :**

| Plage          | Verdict                                                                           |
| -------------- | --------------------------------------------------------------------------------- |
| S6 → S13       | **valeurs identiques aux nôtres** (au dixième près)                               |
| S14 → S19      | **on diverge de +4 à +7 cm** — eux sont déjà en taille totale, nous encore en LCC |
| S20 → S40      | **valeurs identiques** (écart < 1 cm)                                             |
| Poids S6 → S40 | **identiques sur toute la plage**                                                 |

Autrement dit : **nos deux jeux viennent de la même source médicale**. Notre seule vraie différence est le point de bascule LCC → taille totale.

**Le point clé** : leur fichier porte un champ **`mesure: "LCC" | "taille"`** sur chaque semaine. Ils ne cachent pas la marche — ils la documentent. Chez eux elle tombe à **S13 → S14 (7 → 12,5 cm, +79 %)**, chez nous à S19 → S20 (+67 %).

⚠️ **La marche ne disparaît donc pas en changeant de source** : elle est inhérente à la mesure obstétricale. On peut seulement choisir où elle tombe et l'assumer.

**Ce que leur courbe apporte en plus :**

- elle corrige notre anomalie **S24 → S25** (chez nous 30 → 34,6 cm, +15 % ; chez eux 30 → 31,9 cm, lisse) ;
- elle va jusqu'à **S41** (grossesse prolongée), là où on s'arrête à S40 ;
- le champ `mesure` permet d'afficher « longueur cranio-caudale » ou « de la tête aux pieds » selon la semaine.

**✅ FAIT (07/08/2026)** : courbe adoptée pour S6→S41, S4-S5 conservées, champ **`measure: "lcc" | "total"`** ajouté sur chaque semaine dans `fetalGrowth.json` (+ type `MeasureKind` et `MEASURE_LABEL` dans `types.ts`). Le Dashboard affiche désormais « de la tête aux fesses » / « de la tête aux pieds » sous la taille. La marche est passée de S19→S20 à **S13→S14**.

⚠️ **Point en suspens** : les données vont maintenant jusqu'à **S41**, mais `MAX_WEEK` vaut toujours **40** dans `pregnancy.ts` — la semaine 41 est donc inerte, et les 4 catégories n'ont pas d'item pour elle. À traiter avec le chantier « dates mauvaises / terme dépassé », pas avant.

> 🔒 **À ne pas copier** : seules les **valeurs cm/g** sont reprises — ce sont des données médicales factuelles, communes à toutes les sources. Leur **liste de fruits** et leurs **textes « fait de la semaine »** sont leur travail éditorial : on garde nos propres items et nos propres `funText`.

---

## Par catégorie

### 🟢 `fruits` — la plus saine, à retoucher

Excellente de S5 à S22. Elle décroche après S30, où l'on manque de fruits vraiment longs.

| Semaine | Item             | Fœtus   | Objet  | Ratio     |
| ------- | ---------------- | ------- | ------ | --------- |
| S31     | une noix de coco | 41,1 cm | ~15 cm | **×0,36** |
| S34     | un melon         | 45,0 cm | ~18 cm | **×0,40** |
| S35     | un melon miel    | 46,2 cm | ~22 cm | **×0,48** |

Régressions notables : S31 noix de coco (15 cm) après un concombre de 30 cm ; S34 melon (18 cm) après un ananas de 30 cm ; S39 petite pastèque (30 cm) après un poireau de 45 cm.

**Piste** : la fin de grossesse veut des **légumes longs** (poireau, botte de blettes, courge spaghetti, gros épi de maïs, branche de céleri) plutôt que des fruits ronds. Les ronds plafonnent vers 30 cm.

### 🟠 `animals` — 13 régressions, ordre à revoir

Peu d'erreurs graves en valeur absolue, mais l'ordre est le vrai souci : petit chien (S25) après chat adulte (S24), petit singe (S32) après renard (S31), labrador chiot (S38) après bouledogue (S37).

Le début est structurellement impossible : à S5-S11 le fœtus fait 0,2 à 4 cm, et sous 3 cm il n'existe que des insectes. Souris (S8, ×5), poussin (S9, ×3,5), hamster (S10, ×3,2) sont tous beaucoup trop gros.

**Piste** : rester sur des insectes/arthropodes jusqu'à S12 (puceron, fourmi, coccinelle, abeille, guêpe, sauterelle), puis passer aux vertébrés. Et remplacer les labels vagues (« un chiot », « un petit chien », « un gros toutou ») par des races précises, seul moyen d'avoir une taille vérifiable.

### 🟠 `cheeses` — cassée par la marche S19→S20

De S12 à S19 c'est très bon (Rocamadour, Camembert, Reblochon, Munster tombent juste). Puis la marche à 25,6 cm fait tout dérailler : Pont-l'Évêque (×0,43), Maroilles (×0,49), Livarot (×0,43) sont des fromages de 11-13 cm placés là où il en faudrait un de 26 cm.

Pires écarts : Époisses entier à S31 (10 cm pour 41 cm attendus, **×0,24**) et meule de Reblochon à S29 (**×0,36**).

**Piste** : au-delà de S25 il n'y a plus que des **meules** (tomme, cantal, morbier, brie de Meaux 36 cm, comté 60 cm). C'est jouable jusqu'à S40, mais il faudra ordonner rigoureusement par diamètre — et accepter que « bébé fait la taille d'une meule de Comté » reste drôle même si la meule pèse 40 kg, puisqu'on ne cale plus sur le poids.

### 🔴 `fish` — à refaire quasi intégralement

**24 items sur 36 en écart d'un facteur 2 ou plus.** Le problème est systémique : les poissons nommés sont des poissons adultes de pêche, tous bien plus grands qu'un fœtus.

Le début est catastrophique — crevette grise à S6 (**×12,5**), anchois à S7 (**×12**), gambas à S9 (×6,5) — et la fin aussi : thon rouge à S36 (×4,2), gros thon à S38 (×5), thon géant à S40 (**×5,9**, 3 mètres pour 51 cm attendus).

**Piste** : ne garder que des espèces dont on cite une taille **crédible et vérifiable**, et couvrir le début avec des œufs et alevins (œuf de lompe, œuf de saumon, alevin, civelle, friture d'éperlan). À terme, viser des poissons de 50 cm réellement courants (bar, dorade royale, cabillaud de portion) plutôt que des thons.

---

## Ordre de traitement proposé

1. **Trancher la marche S19→S20** dans `fetalGrowth.json` — bloquant pour tout le reste.
2. **Refaire `fish`** de zéro (la plus abîmée).
3. **Réordonner `animals`** et préciser les races.
4. **Recaler `cheeses`** au-delà de S20.
5. **Retoucher `fruits`** sur S31-S40 seulement.
6. **Réécrire les `funText`** des items modifiés.
7. Relancer `python3 scripts/audit-data.py` et viser zéro ❌ et zéro régression.
