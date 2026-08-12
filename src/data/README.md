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

**Provenance** : aucune API publique JSON propre n'existe pour ces données ; les sources fiables (WHO Fetal Growth Charts, INTERGROWTH-21st) ne sont disponibles que sous forme de calculateurs web ou de PDF. Les valeurs sont des **ordres de grandeur** communs aux chartes de croissance grand public, recoupées avec `scripts/reference-miraparent.json`.

⚠️ **À usage ludique, non médical.**

## `weightJokes.json`

Comparaison humoristique du **poids**, une par semaine (S4 → S41).

```json
"20": "Aussi lourd que la mère de trois enfants qui commence toutes ses phrases par « tu devrais »."
```

Ce fichier est **indépendant des catégories** : la taille compare bébé à un objet (fromage, poisson…), le poids à une lourdeur de l'entourage. Les deux s'affichent l'un sous l'autre dans le Dashboard, quelle que soit la catégorie choisie.

⚠️ Chaque valeur est une **phrase complète** — majuscule initiale, point final. Toutes commencent par « Aussi lourd que ». Ne pas revenir à des fragments recollés par le composant : ça produisait des fautes de contraction (« le poids de le débat »), que la formulation actuelle évite d'emblée.

Le concept est inspiré d'une infographie de Bonjour Ocytocine (transcrite dans `scripts/reference-bonjourocytocine.json`), mais **aucune formulation n'en est reprise**.

## `categories/*.json`

Une catégorie = un fichier, nommé **en anglais** comme sa clé :

| Fichier        | `key`     | Contenu               |
| -------------- | --------- | --------------------- |
| `fruits.json`  | `fruits`  | fruits et légumes     |
| `fish.json`    | `fish`    | poissons et crustacés |
| `cheeses.json` | `cheeses` | fromages              |
| `animals.json` | `animals` | animaux               |

Chaque `item` associe une **semaine** à une comparaison :

```json
{
    "week": 16,
    "name": "un avocat",
    "emoji": "🥑",
    "funText": "Bien mûr, prêt à croquer.",
    "wikipedia": "https://fr.wikipedia.org/wiki/Avocat_(fruit)"
}
```

La clé `key` doit correspondre à une valeur de `CategoryKey` (`src/lib/types.ts`) **et** au nom du fichier, sans quoi `src/lib/data.ts` ne s'y retrouvera pas.

Pour ajouter une catégorie : copier la structure de `fruits.json`, garder les mêmes numéros de `week`, changer `key`, `label`, `emoji` et les `items`, puis déclarer la clé dans `CategoryKey` et l'import dans `data.ts`.

Le champ **`wikipedia` est optionnel** et contient une **URL en dur**. Ne jamais la construire depuis `name` : la validation initiale a montré que 6 titres n'existaient pas et que 9 renvoyaient vers une page d'homonymie — « Camembert » pointe sur la commune de l'Orne, « Beagle » sur le navire de Darwin. Un item sans article pertinent n'a pas de lien, plutôt qu'un lien mort.

## Calibrage des items

Le critère de calage est la **taille**, jamais le poids : chaque item doit avoir une plus grande dimension réelle proche de la taille du fœtus de sa semaine. C'est la convention des comparatifs de grossesse, et le seul critère praticable — en calant sur le poids, fromages et fruits n'ont plus d'item crédible au-delà de S32.

```bash
python3 scripts/audit-data.py
```

**Tolérance appliquée** (ratio = taille de l'objet ÷ taille du fœtus) :

| Verdict     | Ratio                     | Sens                                             |
| ----------- | ------------------------- | ------------------------------------------------ |
| ✅ OK       | 0,75 – 1,35               | l'écart ne se remarque pas                       |
| ⚠️ Limite   | 0,50 – 0,75 ou 1,35 – 2,0 | ça passe, mais c'est approximatif                |
| ❌ Problème | < 0,50 ou > 2,0           | l'objet est au moins 2× trop petit ou trop grand |

L'audit signale aussi les **régressions** — un item plus petit que celui de la semaine précédente. C'est le défaut le plus visible pour l'utilisateur, puisque bébé est censé grandir. **Objectif : zéro ❌ et zéro régression.**

**Conventions de mesure** (à ne pas réinventer d'une catégorie à l'autre) :

| Catégorie | Dimension retenue                                           |
| --------- | ----------------------------------------------------------- |
| `cheeses` | diamètre de la meule ou du fromage                          |
| `animals` | longueur du corps **hors queue** ; bec-à-queue pour oiseaux |
| `fish`    | longueur totale                                             |
| `fruits`  | plus grande dimension                                       |

⚠️ Le début de chaque catégorie (S4 → S13, de 0,1 à 7 cm) impose des objets minuscules : **portions** de fromage, **œufs et alevins**, **arthropodes**, petites graines. Aucun animal ni fromage entier n'est assez petit à cette échelle.

⚠️ Les tailles réelles des objets sont des **estimations d'ordre de grandeur**, pas des mesures sourcées. Elles vivent dans le dict `EST` de `scripts/audit-data.py` : corriger une valeur qui paraît fausse, puis relancer l'audit.

### Éviter les doublons

Deux items différents peuvent désigner le même objet sans que les noms l'indiquent. Le moyen fiable de les repérer est de **grouper les items par article Wikipédia** — c'est ainsi qu'on a trouvé le bar trois fois et le parmesan trois fois.

Restent volontaires dans `animals` quatre paires qui racontent une **progression d'âge** : œuf de fourmi → fourmi, lapereau → lapin, chaton → chat adulte, renardeau → renard.

### Après toute modification

- Relancer `python3 scripts/audit-data.py` et viser zéro ❌ et zéro régression.
- Vérifier que la `description` de la catégorie reste raccord avec ses items **S4 et S41** : elle les cite souvent.
- Vérifier majuscule initiale et point final sur tous les textes.
