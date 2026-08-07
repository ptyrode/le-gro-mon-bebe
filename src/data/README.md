# Données — Lé gro mon bébé

## `fetalGrowth.json`
Taille (cm) et poids (g) du fœtus par **semaine d'aménorrhée (SA)**, de la semaine 4 à 40.

**Provenance** : aucune API publique JSON propre n'existe pour ces données ; les sources fiables (WHO Fetal Growth Charts, INTERGROWTH-21st) ne sont disponibles que sous forme de calculateurs web ou de PDF. Les valeurs ici sont des **valeurs de référence approximatives** issues des chartes de croissance fœtale standard grand public.

⚠️ La taille passe de cranio-caudale (CRL) à tête-talons à la **semaine 20** (d'où le saut de ~16 cm à ~25 cm). Données **à usage ludique, non médical**.

## `categories/*.json`
Une catégorie = un fichier. Chaque `item` mappe une **semaine** à une comparaison fun (`name`, `emoji`, `funText`).

- `fruits.json` — le classique fruits/légumes (façon parents.fr), sert aussi de référence de mapping par semaine.
- À venir (fournis par Pierrick ou générés) : `poissons.json`, `fromages.json`, `animaux.json`, etc.

Pour ajouter une catégorie : copier la structure de `fruits.json`, garder les mêmes clés `week` (4 → 40), changer `key`, `label`, `emoji` et les `items`.