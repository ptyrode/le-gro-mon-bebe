# Reprise des illustrations — Poissons (v3)

Relevé visuel des 10 planches de `docs/v3/fish`, découpées et installées dans
`public/images/fish/` (38 fichiers, 956 Ko).

| Bilan               |                                                       |
| ------------------- | ----------------------------------------------------- |
| Conformes           | **8 / 38** — ou **34 / 38** si l'on accepte les yeux  |
| À refaire           | 7 hors décision, 26 de plus si la règle est maintenue |
| Décision en attente | Les yeux sur la capuche — voir « À trancher »         |

Pour mémoire, la v2 plafonnait à 6 / 38.

---

## Ce qui marche

**Le poisson-chapeau a disparu.** En v2, neuf vignettes montraient un poisson posé de profil
en travers du crâne, tête et œil compris. Il n'en reste **aucune**. La reformulation du bloc
`MONTAGE` — décrire l'assemblage voulu au lieu d'interdire les yeux — a réglé le défaut le
plus grave de la catégorie.

Le montage attendu est appliqué presque partout : la tête du poisson forme la capuche, sa
bouche ouverte en dessine l'ouverture, le visage du bébé s'y encadre, le corps et la queue
prolongent le costume derrière. Bébé est assis sur les 38, mains et pieds visibles, fond
crème homogène.

La **planche 5 (S20 à S23)** est exemplaire : maquereau, dorade, sole et merlan, quatre
capuches sans le moindre œil. C'était la pire planche de la v2, avec 4 échecs sur 4.

---

## À trancher — les yeux sur la capuche

26 vignettes ont conservé **les yeux du poisson** au-dessus du visage du bébé. C'est ce que
le prompt interdit, d'où le score de 8/38.

Mais le rendu reste lisible et cohérent : la tête est bien vue de face, la bouche ouverte
forme l'ouverture, et les yeux du poisson se placent sur le dessus sans masquer le visage.
Rien à voir avec la superposition de deux têtes de la v2.

⬜ **La même question se pose pour `animals`** (29 vignettes concernées), et une seule
décision débloque les deux catégories :

1. **Accepter les yeux** — on garde 34 poissons sur 38 et 34 animaux sur 38, et j'assouplis
   le prompt : tête d'animal autorisée sur la capuche à condition de rester au-dessus du
   front.
2. **Maintenir la règle** — il faut alors regénérer 26 poissons et 29 animaux. La planche 5
   prouve que c'est atteignable, mais pas d'une planche à l'autre de façon fiable.

---

## Les défauts

### 1. Deux sujets identiques — S4 et S5

« Une perle de caviar » et « un œuf de lompe » sont deux sphères noires strictement
interchangeables. Rien ne les distingue.

### 2. L'alevin — S7

Deux yeux de poisson démesurés posés sur la capuche, bien plus voyants qu'ailleurs. C'est la
vignette la plus proche du défaut de la v2.

### 3. Des gueules dentées autour du visage — S33, S36, S38

Le brochet, la lotte et la roussette ouvrent une mâchoire garnie de dents pointues autour de
la tête du bébé. Anatomiquement juste, mais l'image d'un nourrisson dans une gueule ouverte
détonne dans une application de suivi de grossesse.

### 4. Le trio argenté reste proche — S13, S14, S15

Anchois, sardine et éperlan sont mieux différenciés qu'en v2 grâce à la consigne ajoutée,
mais restent trois silhouettes blanc-argenté voisines.

### 5. Bords de vignettes visibles — planche 3

Les quatre cases de la planche 3 sont séparées par un liseré perceptible, qui se retrouve
sur les images découpées.

---

## Relevé des vignettes à revoir

| Semaine | Sujet               | Défaut                                           |
| ------- | ------------------- | ------------------------------------------------ |
| S4      | une perle de caviar | Indiscernable de S5                              |
| S5      | un œuf de lompe     | Indiscernable de S4                              |
| S7      | un alevin           | Yeux de poisson démesurés sur la capuche         |
| S12–S15 | civelle → éperlan   | Bords de vignette visibles ; trio S13-S15 proche |
| S33     | un jeune brochet    | Gueule dentée ouverte autour du visage           |
| S36     | une lotte           | Idem                                             |
| S38     | une roussette       | Idem                                             |

Les 26 vignettes portant des yeux sur la capuche ne figurent pas ici : leur sort dépend de la
décision ci-dessus.

---

## Pour la reprise

Le générateur est à jour. Après décision, supprimer les fichiers concernés — le script refuse
d'écraser — puis relancer les planches voulues :

```bash
rm public/images/fish/fish-{4,5,6,7}.webp
node scripts/split-illustrations.mjs <planche> fish 4
```

⚠️ Le prompt travaille par planche de quatre : reprendre S7 remplace aussi S4, S5 et S6.
