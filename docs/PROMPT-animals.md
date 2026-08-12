# Prompt d'illustration — Animaux

À copier-coller dans un modèle générateur d'images, **avec l'image de référence en pièce jointe**.

> ⚠️ Les modèles ne produisent pas 38 images d'un coup, et sortent souvent une **planche
> contact** plutôt que des fichiers séparés. Le prompt exploite ce comportement : il demande
> des planches de 4, que `scripts/split-illustrations.mjs` découpe et nomme ensuite.

> 🔁 Ce fichier est **généré** par `python3 scripts/gen-illustration-prompts.py`.
> Le modifier à la main sera écrasé : corriger le script à la place.

---

```
Tu vas produire une série d'illustrations pour une application de suivi de grossesse.
L'image jointe sert de RÉFÉRENCE DE STYLE : toutes les illustrations doivent
paraître issues de la même main, du même livre.

## Style à reproduire fidèlement
- Illustration cartoon douce, style livre pour enfants, contours arrondis.
- Chaque animal a une petite tête de bébé mignonne : grands yeux, joues rondes, expression
  tendre et rigolote. Le sujet reste reconnaissable au premier coup d'œil.
- Palette chaleureuse et pastel, cohérente d'une image à l'autre.
- Aucun texte, aucun chiffre, aucun logo, aucune signature dans l'image.
- Sujet unique, centré, entier (pas de recadrage qui coupe le sujet).

## Contraintes techniques
- Fond uni crème très clair (#FFF4EE), strictement identique sur toutes les images.
- Le sujet occupe environ 80 % du cadre, avec une marge régulière.
- Même échelle visuelle d'une image à l'autre : le plus petit et le plus gros sujet
  doivent occuper la même place dans le cadre. Ne PAS refléter la taille réelle.

## Format de rendu — planches de 4
Tu produis des planches carrées de **2048 × 2048 px découpées en 2 × 2 vignettes**,
soit 4 sujets par planche (chaque vignette fait ainsi 1024 × 1024 px, la taille cible).

- Ordre de lecture strict : **haut-gauche, haut-droite, bas-gauche, bas-droite**,
  dans l'ordre exact de la liste ci-dessous.
- **Chaque vignette montre un sujet DIFFÉRENT.** Ne jamais répéter un sujet pour
  remplir la planche : s'il ne reste que deux sujets, ne fais que deux vignettes.
- Pas de bordure, pas de séparateur, pas de numéro entre les vignettes : juste
  quatre images jointives sur le même fond.
- Chaque vignette doit représenter **exactement** le sujet demandé. En cas de doute
  sur un sujet, demande-moi plutôt que de dessiner autre chose qui y ressemble.

## Précisions générales
- « un œuf de fourmi » : un petit œuf blanc nacré avec un visage de bébé, pas une fourmi.
- « un chaton de deux mois », « un chat de quatre mois », « un chat adulte » : trois
  illustrations DISTINCTES, de plus en plus grandes et dégourdies.
- « un lapereau » puis « un lapin », « un renardeau » puis « un renard » : même logique,
  le second est visiblement plus âgé.
- Les races de chiens (chihuahua, carlin, beagle, bouledogue français, cocker) doivent
  être reconnaissables entre elles : museau, oreilles et silhouette caractéristiques.
```

---

## Les planches, une par une

Envoyer **un bloc à la fois**, en réattachant l'image de référence à chaque planche.
Chaque bloc est autonome : il nomme ses sujets et les décrit, ce qui évite au modèle
d'improviser ou de répéter un sujet pour remplir la grille.

### Planche 1/10 — S4, S5, S6, S7

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un œuf de fourmi — minuscule œuf blanc nacré ovale — pas une fourmi
Haut droite. un puceron — minuscule insecte vert tendre poire, pattes fines
Bas gauche. une fourmi — fourmi noire à trois segments et antennes
Bas droite. une coccinelle — coccinelle rouge à points noirs

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 2/10 — S8, S9, S10, S11

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. une abeille — abeille dodue rayée jaune et noir, ailes translucides
Haut droite. un frelon — grosse guêpe brun-jaune, plus grande et plus massive que l'abeille
Bas gauche. un escargot — escargot à coquille spiralée brune
Bas droite. une sauterelle — sauterelle verte à longues pattes arrière repliées

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 3/10 — S12, S13, S14, S15

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. une grenouille — grenouille verte assise, pattes palmées
Haut droite. une souris — petite souris grise à grandes oreilles rondes et longue queue fine
Bas gauche. un hamster — hamster doré tout rond, petites oreilles, joues pleines
Bas droite. un rouge-gorge — petit oiseau brun à POITRINE ORANGE

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 4/10 — S16, S17, S18, S19

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. une taupe — petit animal noir au museau rose pointu et aux grosses pattes-pelles
Haut droite. un rat — rat gris-brun au museau allongé et à la longue queue nue
Bas gauche. un écureuil — écureuil roux à grande queue touffue
Bas droite. un merle — oiseau NOIR au bec ORANGE vif

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 5/10 — S20, S21, S22, S23

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un hérisson — hérisson brun couvert de piquants, museau pointu
Haut droite. un cochon d'Inde — petit rongeur trapu au poil roux et blanc, SANS queue
Bas gauche. un furet — petit mustélidé long et souple, beige à masque foncé
Bas droite. un chaton de deux mois — tout petit chaton maladroit aux pattes courtes

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 6/10 — S24, S25, S26, S27

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un lapereau — petit lapin aux oreilles encore courtes
Haut droite. un pigeon — pigeon gris-bleu à reflets verts sur le cou
Bas gauche. un chihuahua — tout petit chien à grandes oreilles dressées et gros yeux ronds
Bas droite. un chat de quatre mois — jeune chat dégingandé, plus grand que le chaton

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 7/10 — S28, S29, S30, S31

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un carlin — petit chien beige au museau écrasé, plis sur le front, queue en tire-bouchon
Haut droite. une poule — poule rousse à crête rouge
Bas gauche. un lapin — lapin adulte aux longues oreilles dressées
Bas droite. un chat adulte — chat adulte assis, queue enroulée autour des pattes

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 8/10 — S32, S33, S34, S35

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un renardeau — bébé renard roux aux oreilles rondes et à la queue courte
Haut droite. un canard colvert — canard à TÊTE VERTE brillante et collier blanc
Bas gauche. un beagle — chien tricolore blanc-brun-noir à longues oreilles tombantes
Bas droite. un raton laveur — animal gris à MASQUE noir sur les yeux et queue annelée

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 9/10 — S36, S37, S38, S39

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un bouledogue français — chien trapu à grandes oreilles DROITES en chauve-souris, museau plat
Haut droite. un renard — renard roux adulte à grande queue touffue à bout blanc
Bas gauche. un blaireau — animal gris trapu à tête blanche rayée de deux bandes noires
Bas droite. un cocker — chien à très longues oreilles tombantes et poil ondulé doré

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 10/10 — S40, S41

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 2 vignettes
côte à côte (2 vignettes), sans bordure ni séparateur.

Les 2 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un agneau nouveau-né — tout petit agneau blanc sur ses pattes flageolantes
Haut droite. un porcelet — petit cochon rose au groin rond et à la queue en tire-bouchon

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

---

## Découper et vérifier

Les planches arrivent en un seul fichier : le découpage et le nommage sont
automatisés. Pour une planche 2 × 2 démarrant à la semaine 4 :

```bash
node scripts/split-illustrations.mjs ~/Downloads/<planche>.png animals 4
```

Le script écrit `public/illustrations/animals/animals-4.png` … et refuse
d'écraser un fichier existant. Il redimensionne chaque vignette en 1024 × 1024.

⚠️ **La dernière planche ne contient que 2 vignettes** (S40 et S41) : préciser la
grille, sinon le script découpe en 2 × 2 et produit deux images vides.

```bash
node scripts/split-illustrations.mjs ~/Downloads/<planche10>.png animals 40 2 1
```

Une fois toutes les planches découpées :

```bash
node scripts/check-illustrations.mjs
```

Ce contrôle liste les images manquantes **avec le sujet attendu**, signale les noms
non conformes et les dimensions incorrectes. Il attend **38 fichiers**, de
`animals-4.png` à `animals-41.png`, sans trou.

⚠️ Vérifier visuellement que chaque image correspond bien à son sujet : un décalage
d'un cran et bébé fait la taille du mauvais objet pendant toute une semaine.
