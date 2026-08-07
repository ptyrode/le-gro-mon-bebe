# Données — Lé gro mon bébé

## `fetalGrowth.json`

Taille (cm) et poids (g) du fœtus par **semaine d'aménorrhée (SA)**, de la semaine **4 à 41**.

```json
"16": { "sizeCm": 16.2, "weightG": 100, "measure": "total" }
```

Le champ **`measure`** indique comment la taille est mesurée :

| Valeur    | Sens                                        | Semaines  |
| --------- | ------------------------------------------- | --------- |
| `"lcc"`   | longueur cranio-caudale, bébé recroquevillé | S4 → S13  |
| `"total"` | tête-talons                                 | S14 → S41 |

⚠️ **Les deux mesures ne se raccordent pas** : la taille saute de 7 cm à 12,5 cm entre S13 et S14. Ce n'est pas une erreur de saisie, c'est un changement de méthode — d'où l'intérêt d'afficher le libellé (`MEASURE_LABEL` dans `src/lib/types.ts`) plutôt que de laisser croire à une croissance fulgurante.

**Provenance** : aucune API publique JSON propre n'existe pour ces données ; les sources fiables (WHO Fetal Growth Charts, INTERGROWTH-21st) ne sont disponibles que sous forme de calculateurs web ou de PDF. Les valeurs sont des **ordres de grandeur** communs aux chartes de croissance grand public, recoupées avec `scripts/reference-miraparent.json`.

⚠️ **À usage ludique, non médical.**

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
    "funText": "Bien mûr, prêt à croquer."
}
```

La clé `key` doit correspondre à une valeur de `CategoryKey` (`src/lib/types.ts`) **et** au nom du fichier, sans quoi `src/lib/data.ts` ne s'y retrouvera pas.

Pour ajouter une catégorie : copier la structure de `fruits.json`, garder les mêmes numéros de `week`, changer `key`, `label`, `emoji` et les `items`, puis déclarer la clé dans `CategoryKey` et l'import dans `data.ts`.

### Cohérence des items

Le critère de calage est la **taille**, pas le poids : chaque item doit avoir une plus grande dimension réelle proche de la taille du fœtus de sa semaine.

```bash
python3 scripts/audit-data.py
```

L'audit signale les écarts et les **régressions** (un item plus petit que celui de la semaine précédente — le défaut le plus visible, puisque bébé est censé grandir). État des lieux et pistes de correction : [`DATA-AUDIT.md`](../../DATA-AUDIT.md).
