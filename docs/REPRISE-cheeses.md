# Reprise des illustrations — Fromages (v3)

Relevé visuel des 10 planches de `docs/v3/cheeses`, découpées et installées dans
`public/images/cheeses/` (38 fichiers, 852 Ko).

| Bilan               |                                                       |
| ------------------- | ----------------------------------------------------- |
| Conformes           | **12 / 38**                                           |
| À refaire           | 26 — dont 16 pour un défaut de montage corrigé depuis |
| Décision en attente | Remplacer les items indiscernables de `cheeses.json`  |

**C'est la catégorie la plus faible**, alors qu'elle a été générée avec le même prompt que
`fruits` (36/38). La cause est en partie le prompt, en partie le **choix des items**.

---

## Ce qui marche

Les planches **1 (S4→S7)** et **4 (S16→S19)** sont bonnes de bout en bout, ainsi que S8, S9,
S12 et S14 : combinaison couvrant le corps, capuche en forme de fromage percée d'une
ouverture, visage entier, mains et pieds visibles.

Le Munster à croûte orangée, le Bleu d'Auvergne veiné et le Morbier à ligne de cendre
prouvent que les indications de couleur du bloc `SPECIFIQUE` fonctionnent quand le fromage a
un signe distinctif.

---

## À trancher — les items indiscernables

**Ce défaut-là ne se règle pas au prompt.** Plusieurs fromages de la liste se ressemblent
dans la réalité : aucune consigne ne les rendra distincts.

| Semaines           | Items                                        | Rendu                               |
| ------------------ | -------------------------------------------- | ----------------------------------- |
| S36, S37, S38, S39 | Beaufort, Sbrinz, Gruyère, Comté             | **Quatre meules jaunes identiques** |
| S40, S41           | meule d'emmental, meule d'Emmental de Savoie | **Deux fois la même image**         |
| S14, S15           | Camembert, Coulommiers                       | Deux ronds à croûte blanche         |
| S23, S28           | Brie de Melun, Brie de Meaux                 | Idem                                |
| S30, S31           | Cantal, Laguiole                             | Deux cylindres bruns                |
| S26, S27           | Gouda, meule de raclette                     | Deux disques jaunes                 |

Concrètement, **S36 à S41 donnent six semaines d'affilée avec la même illustration**, juste
avant le terme.

⬜ **Remplacer une partie de ces items dans `src/data/categories/cheeses.json`.**
Vérifier que les tailles de substitution passent `python3 scripts/audit-data.py`, et réécrire
les `funText`.

---

## Les défauts

### 1. Le fromage cesse d'être un costume — 16 vignettes

À partir de la planche 5, le modèle abandonne le déguisement : il ne reste qu'une **meule vue
de face, percée d'un trou**, avec un visage dedans et deux mains, deux pieds collés au
contour. Plus de corps, plus de capuche.

Planches **5, 6, 7 et 9** — soit S20 à S31 et S36 à S39.

La formulation « la capuche est le fromage lui-même, creusé d'une ouverture ronde » se
retourne contre nous ici. Pour un fruit, la forme allongée suggère un corps ; pour une meule
ronde et plate, « ouverture ronde » se lit comme un trou découpé dans un disque.

La planche 5 cumule une **rupture de style** : trait plus épais, cils ajoutés aux yeux,
sourires ouverts, et des bords de vignette visibles après découpe.

✅ Corrigé — le bloc `MONTAGE` de `cheeses` décrit maintenant une combinaison surmontée d'une
capuche, corps et membres visibles, et qualifie explicitement d'échec le visage encastré dans
une meule.

### 2. Texte et marques dans l'image — 3 vignettes

Le prompt interdit tout texte. Il est violé sur la planche 8, et une marque déposée est
reproduite à l'identique sur la planche 2.

✅ Corrigé — interdiction explicite des inscriptions gravées, et consigne dédiée aux fromages
de marque : les rendre par la forme et la couleur seules.

---

## Relevé des vignettes à revoir

| Semaine | Sujet                        | Défaut                                                 |
| ------- | ---------------------------- | ------------------------------------------------------ |
| S10     | une portion de Vache qui rit | Logo de la marque reproduit sur l'emballage            |
| S13     | un Saint-Marcellin           | Bébé assis _dans_ un pot : plus un déguisement porté   |
| S15     | un Coulommiers               | Indiscernable du Camembert de S14                      |
| S20–S23 | Mimolette → Brie de Melun    | Plus de costume + rupture de style ; S22 proche de S20 |
| S24–S27 | Bleu de Gex → raclette       | Plus de costume ; S27 proche de S26                    |
| S28–S31 | Brie de Meaux → Laguiole     | Plus de costume ; S31 proche de S30                    |
| S32     | une Abondance                | « ABONDANCE » gravé sur la croûte                      |
| S34     | un Salers                    | « FOURME SALERS » gravé sur la croûte                  |
| S36–S39 | Beaufort → Comté             | Plus de costume + quatre meules identiques             |
| S40–S41 | les deux emmentals           | Deux fois la même image                                |

---

## Pour la reprise

Les 38 vignettes sont à refaire : les planches conformes sont trop peu nombreuses pour
justifier une reprise partielle, et le style dérive d'une planche à l'autre.

```bash
rm public/images/cheeses/*.webp
```

⚠️ **Traiter d'abord la question des items redondants.** Refaire les images avant de figer la
liste ferait regénérer pour rien les six dernières semaines.
