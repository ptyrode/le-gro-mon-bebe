# Données — Lé gro mon bébé

## `fetalGrowth.json`

Taille (cm) et poids (g) du fœtus par **semaine d'aménorrhée (SA)**, de la semaine **4 à 41**.

```json
"16": { "size": 16.2, "weight": 100, "measure": "total" }
```

Le champ **`measure`** indique comment la taille est mesurée :

| Valeur    | Sens                                        | Semaines  |
| --------- | ------------------------------------------- | --------- |
| `"lcc"`   | longueur cranio-caudale, bébé recroquevillé | S4 → S13  |
| `"total"` | tête-talons                                 | S14 → S41 |

⚠️ **Les deux mesures ne se raccordent pas** : la taille saute de 7 cm à 12,5 cm entre S13 et S14. Ce n'est pas une erreur de saisie, c'est un changement de méthode. Le champ `measure` n'est plus affiché dans l'appli, il reste ici pour documenter la donnée.

**Provenance** : aucune API publique JSON propre n'existe pour ces données ; les sources fiables (WHO Fetal Growth Charts, INTERGROWTH-21st) ne sont disponibles que sous forme de calculateurs web ou de PDF. Les valeurs sont des **ordres de grandeur** communs aux chartes de croissance grand public, recoupées avec une transcription de Mira Parent conservée hors du repo.

⚠️ **À usage ludique, non médical.**

## `weightJokes.json`

Comparaison humoristique du **poids**, une par semaine (S4 → S41).

```json
"20": "Aussi lourd que la mère de trois enfants qui commence toutes ses phrases par « tu devrais »."
```

Ce fichier est **indépendant des catégories** : la taille compare bébé à un objet (fromage, poisson…), le poids à une lourdeur de l'entourage. Les deux s'affichent l'un sous l'autre dans le Dashboard, quelle que soit la catégorie choisie.

⚠️ Chaque valeur est une **phrase complète** — majuscule initiale, point final. Toutes commencent par « Aussi lourd que ». Ne pas revenir à des fragments recollés par le composant : ça produisait des fautes de contraction (« le poids de le débat »), que la formulation actuelle évite d'emblée.

Le concept est inspiré d'une infographie de Bonjour Ocytocine, mais **aucune formulation n'en est reprise** : les 38 phrases ont été écrites pour ce projet.

⚠️ Les transcriptions des sources tierces ayant servi de repère ont été **sorties du repo** : c'était du contenu éditorial appartenant à ses auteurs, sans raison d'être versionné ici.

## `categories/*.json`

Une catégorie = un fichier, nommé **en anglais** comme sa clé :

| Fichier         | `key`      | Contenu                   |
| --------------- | ---------- | ------------------------- |
| `cheeses.json`  | `cheeses`  | fromages                  |
| `fish.json`     | `fish`     | poissons et fruits de mer |
| `animals.json`  | `animals`  | animaux                   |
| `desserts.json` | `desserts` | desserts et pâtisseries   |
| `fruits.json`   | `fruits`   | fruits et légumes         |

Chaque `item` associe une **semaine** à une comparaison :

```json
{
    "week": 16,
    "name": "un avocat",
    "funText": "Bien mûr, prêt à croquer.",
    "wikipedia": "https://fr.wikipedia.org/wiki/Avocat_(fruit)"
}
```

Les items n'ont **pas** d'emoji : chacun a son image dans `public/images/`. Seule la
**catégorie** garde un `emoji`, qui sert au sélecteur de catégorie et de repli si une image
manque.

La clé `key` doit correspondre à une valeur de `CategoryKey` (`src/@types/data.d.ts`) **et** au nom du fichier, sans quoi `src/constants/data.ts` ne s'y retrouvera pas.

Pour ajouter une catégorie : copier la structure de `fruits.json`, garder les mêmes numéros de `week`, changer `key`, `label`, `emoji` et les `items`, puis déclarer la clé dans `CategoryKey` et l'import dans `data.ts`.

Le champ **`wikipedia` est optionnel** et contient une **URL en dur**. Ne jamais la construire depuis `name` : la validation initiale a montré que 6 titres n'existaient pas et que 9 renvoyaient vers une page d'homonymie — « Camembert » pointe sur la commune de l'Orne, « Beagle » sur le navire de Darwin. Un item sans article pertinent n'a pas de lien, plutôt qu'un lien mort.

Les liens pointent **uniquement vers Wikipédia en français**. Quand l'article FR n'existe pas, l'item reste sans lien : pas de repli sur une autre langue. Sont dans ce cas « une courge trombone », « une jalousie à la framboise » et « un dartois ».

## Calibrage des items

Le critère de calage est la **taille**, jamais le poids : chaque item doit avoir une plus grande dimension réelle proche de la taille du fœtus de sa semaine. C'est la convention des comparatifs de grossesse, et le seul critère praticable — en calant sur le poids, fromages et fruits n'ont plus d'item crédible au-delà de S32.

```bash
node scripts/audit-data.mjs
```

**Tolérance appliquée** (ratio = taille de l'objet ÷ taille du fœtus) :

| Verdict     | Ratio                     | Sens                                             |
| ----------- | ------------------------- | ------------------------------------------------ |
| ✅ OK       | 0,75 – 1,35               | l'écart ne se remarque pas                       |
| ⚠️ Limite   | 0,50 – 0,75 ou 1,35 – 2,0 | ça passe, mais c'est approximatif                |
| ❌ Problème | < 0,50 ou > 2,0           | l'objet est au moins 2× trop petit ou trop grand |

### Ordre par volume

La taille fixe la **plage de semaines** où un item est crédible ; à l'intérieur de cette plage, l'ordre suit le **volume**. Une baguette viennoise (52 cm) est plus longue qu'une pièce montée (36 cm), mais à l'œil elle paraît bien plus petite : la placer après donnerait l'impression que bébé rétrécit. Elle passe donc en S32, la pièce montée en S39.

Les volumes sont des **ordres de grandeur en cm³** de l'objet tel qu'on le voit (plumage des oiseaux compris, feuilles du chou-fleur comprises), dans `scripts/data/item-volumes.json`.

L'audit signale une **régression** quand un item est **plus de deux fois moins volumineux** que celui de la semaine précédente. C'est le défaut le plus visible pour l'utilisateur, puisque bébé est censé grandir. Le seuil de 2× tolère les écarts d'estimation entre objets de gabarit voisin. **Objectif : zéro ❌ et zéro régression.**

Quelques items longs et fins sont avancés au prix d'un ratio **⚠️ limite** (poireau, daikon, courge trombone, civelle, sauterelle) et quelques items massifs sont reculés de même (pièce montée, grand œuf de Pâques) : c'est voulu, l'ordre visuel prime sur quelques centimètres d'écart.

**Conventions de mesure** (à ne pas réinventer d'une catégorie à l'autre) :

| Catégorie  | Dimension retenue                                                  |
| ---------- | ------------------------------------------------------------------ |
| `cheeses`  | diamètre de la meule ou du fromage                                 |
| `animals`  | longueur du corps **hors queue** ; bec-à-queue pour oiseaux        |
| `fish`     | longueur totale                                                    |
| `fruits`   | plus grande dimension                                              |
| `desserts` | plus grande dimension, **au format du commerce** — voir ci-dessous |

⚠️ Le début de chaque catégorie (S4 → S13, de 0,1 à 7 cm) impose des objets minuscules : **portions** de fromage, **œufs et alevins**, **arthropodes**, petites graines. Aucun animal ni fromage entier n'est assez petit à cette échelle.

⚠️ Les tailles réelles des objets sont des **estimations d'ordre de grandeur**, pas des mesures sourcées. Elles vivent dans `scripts/data/item-sizes.json` : corriger une valeur qui paraît fausse, puis relancer l'audit.

### Format des desserts

Dans `desserts`, chaque item est pris **à sa taille normale**, jamais en version familiale :

- **en individuel** quand la pâtisserie se vend ainsi : un Paris-Brest fait 8 à 10 cm, pas les 20 cm d'une couronne à partager ;
- sinon au **format standard du commerce** : kouglof en moule de 22 cm, galette des rois de 8 parts à 24 cm, bûche de Noël en moule de 30 à 32 cm.

Au-delà de 30 cm, il n'existe presque plus de pâtisserie de taille normale. La fin de grossesse s'appuie donc sur des **formats longs ou de fête** dont la taille est sourcée : pièce montée de 80 choux (36 cm), pyramide de macarons (40 cm), jalousie (40 cm) et dartois (60 cm) aux formats du CAP pâtissier, baguette viennoise (50 à 54 cm), gâteau de mariage à quatre étages (60 cm).

Sont écartés : les **plaques** de boulangerie de 60 × 40 cm, qui ne se reconnaissent pas comme une pâtisserie, et les versions **« géantes »** d'un item déjà présent (éclair géant, grand gâteau à la broche), qui font doublon.

⚠️ Les tailles de cette catégorie ont été **recoupées sur des sources** (fiches de moules, recettes, catalogues de pâtissiers) avant d'être saisies dans `scripts/data/item-sizes.json`. Pour en changer une, vérifier d'abord la nouvelle valeur plutôt que de l'estimer de tête.

### Éviter les doublons

Deux items différents peuvent désigner le même objet sans que les noms l'indiquent. Le moyen fiable de les repérer est de **grouper les items par article Wikipédia** — c'est ainsi qu'on a trouvé le bar trois fois et le parmesan trois fois.

Restent volontaires dans `animals` quatre paires qui racontent une **progression d'âge** : œuf de fourmi → fourmi, lapereau → lapin, chaton → chat adulte, renardeau → renard.

### Après toute modification

- Relancer `node scripts/audit-data.mjs` et viser zéro ❌ et zéro régression.
- Vérifier que la `description` de la catégorie reste raccord avec ses items **S4 et S41** : elle les cite souvent.
- Vérifier majuscule initiale et point final sur tous les textes.
