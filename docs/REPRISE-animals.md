# Reprise des illustrations — Animaux (v3)

Relevé visuel des 10 planches de `docs/v3/animals`, découpées et installées dans
`public/images/animals/` (38 fichiers, 828 Ko).

| Bilan               |                                                        |
| ------------------- | ------------------------------------------------------ |
| Conformes           | **9 / 38** — ou **34 / 38** si l'on accepte les yeux   |
| À refaire           | 10 hors décision, 29 de plus si la règle est maintenue |
| Décision en attente | Les yeux sur la capuche — voir « À trancher »          |

---

## Ce qui marche

**Le montage de base est bon sur les 38, sans exception** : bébé assis vu de face, visage
humain entier, mains et pieds sortant du costume, fond crème homogène. Aucun animal posé en
chapeau sur le crâne, aucun sujet seul sans bébé.

La **fourmi (S6)** et la **coccinelle (S7)** sont les meilleures de la série : la capuche ne
porte que les antennes, le corps de l'insecte prolonge le costume, et l'ensemble reste
parfaitement lisible sans le moindre œil ajouté.

---

## À trancher — les yeux sur la capuche

29 vignettes portent une **tête d'animal complète** — yeux, museau, truffe ou bec — au-dessus
du visage du bébé. C'est ce que le prompt interdit, d'où le score de 9/38.

**Sauf qu'ici le rendu est réussi.** Un vrai pyjama-costume pour bébé a exactement cette
forme. Le renard, le raton laveur, le beagle et le bouledogue ressemblent à des déguisements
du commerce, pas à des accidents.

La règle « aucun œil sur la capuche » a été écrite pour `fish`, où le modèle posait un
poisson de profil sur le crâne. Appliquée aux mammifères, elle prive le costume de ce qui le
rend lisible.

⬜ **La même question se pose pour `fish`** (26 vignettes concernées), et une seule décision
débloque les deux catégories :

1. **Accepter les yeux** — on garde 34 animaux sur 38 et 34 poissons sur 38, et j'assouplis
   le prompt : tête d'animal autorisée sur la capuche à condition de rester au-dessus du
   front et de ne jamais masquer le visage.
2. **Maintenir la règle** — il faut alors regénérer 29 animaux et 26 poissons. Le chihuahua
   (S26), les chats (S27, S31), le lapin (S30) et l'agneau (S40) prouvent que c'est
   atteignable, mais pas de façon fiable d'une planche à l'autre.

Les vignettes conformes à la règle actuelle sont **S4, S6, S7, S12, S26, S27, S30, S31, S40**.

---

## Les défauts

### 1. Deux visages réellement superposés — S8 à S11

L'abeille, le frelon, l'escargot et la sauterelle portent des **yeux ET une bouche
souriante** dessinés sur la capuche. On lit littéralement deux visages qui sourient l'un
au-dessus de l'autre. C'est le seul cas où le défaut est indiscutable.

### 2. Rupture de style — S16 à S19

Taupe, rat, écureuil et merle sont dessinés dans un autre trait : contours plus épais,
aplats plus francs, yeux réduits à de petits points noirs sans reflet. Ils tranchent avec le
reste de la série.

### 3. Pieds d'animal au lieu de pieds humains — S23, S26, S27, S31

Les pieds nus du bébé sont remplacés par des pattes à coussinets. L'effet déguisement s'y
perd, alors même que ces vignettes respectent la règle sur la capuche.

---

## Relevé des vignettes à revoir

| Semaine | Sujet                  | Défaut                                      |
| ------- | ---------------------- | ------------------------------------------- |
| S5      | un puceron             | Deux petits yeux noirs sur la capuche       |
| S8      | une abeille            | Yeux **et** bouche souriante sur la capuche |
| S9      | un frelon              | Idem                                        |
| S10     | un escargot            | Idem                                        |
| S11     | une sauterelle         | Idem                                        |
| S16–S19 | taupe → merle          | Rupture de style sur toute la planche       |
| S23     | un chaton de deux mois | Pattes à coussinets au lieu de pieds nus    |
| S26     | un chihuahua           | Idem                                        |
| S27     | un chat de quatre mois | Idem                                        |
| S31     | un chat adulte         | Idem                                        |

Les 29 vignettes portant une tête d'animal sur la capuche ne figurent pas ici : leur sort
dépend de la décision ci-dessus.

---

## Pour la reprise

Le générateur est à jour. Après décision, supprimer les fichiers concernés — le script refuse
d'écraser — puis relancer les planches voulues :

```bash
rm public/images/animals/animals-{8,9,10,11}.webp
node scripts/split-illustrations.mjs <planche2> animals 8
```

⚠️ Le prompt travaille par planche de quatre : reprendre une vignette remplace les trois
autres de sa planche.
