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
- **Le sujet est porté comme un DÉGUISEMENT par un bébé**, pas décoré d'un visage.
  On doit voir : sa TÊTE ENTIÈRE qui émerge du costume (visage complet, joues rondes,
  grands yeux brillants, expression tendre et rigolote), ses deux PETITES MAINS
  potelées et ses deux PETITS PIEDS qui dépassent.
- Le costume reste reconnaissable au premier coup d'œil : on identifie l'animal sans hésiter.
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

**Envoyer un bloc à la fois, avec l'image de référence en pièce jointe.**

Chaque bloc est **entièrement autonome** : il porte le style, le format et ses sujets.
Il n'y a rien à envoyer avant — pas besoin du texte ci-dessus, qui n'est là que pour
expliquer la démarche.

### Planche 1/10 — S4, S5, S6, S7

```
Reprends exactement le style de l'image de référence jointe.

STYLE
- Illustration cartoon douce, style livre pour enfants, contours arrondis.
- Le sujet est porté comme un DÉGUISEMENT par un bébé, pas décoré d'un
  visage. On doit voir sa TÊTE ENTIÈRE qui émerge du costume (visage
  complet, joues rondes, grands yeux brillants), ses deux PETITES MAINS
  potelées et ses deux PETITS PIEDS qui dépassent.
- Le costume reste reconnaissable au premier coup d'œil.
- Fond uni crème très clair (#FFF4EE), identique sur toutes les images.
- Chaque sujet occupe ~80 % de sa case, centré et entier.
- Même échelle visuelle partout : ne PAS refléter la taille réelle.
- Aucun texte, aucun chiffre, aucun logo dans l'image.

FORMAT
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

LES 4 SUJETS, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un œuf de fourmi — minuscule œuf blanc nacré ovale — pas une fourmi
Haut droite. un puceron — minuscule insecte vert tendre poire, pattes fines
Bas gauche. une fourmi — fourmi noire à trois segments et antennes
Bas droite. une coccinelle — coccinelle rouge à points noirs
```

### Planche 2/10 — S8, S9, S10, S11

```
Reprends exactement le style de l'image de référence jointe.

STYLE
- Illustration cartoon douce, style livre pour enfants, contours arrondis.
- Le sujet est porté comme un DÉGUISEMENT par un bébé, pas décoré d'un
  visage. On doit voir sa TÊTE ENTIÈRE qui émerge du costume (visage
  complet, joues rondes, grands yeux brillants), ses deux PETITES MAINS
  potelées et ses deux PETITS PIEDS qui dépassent.
- Le costume reste reconnaissable au premier coup d'œil.
- Fond uni crème très clair (#FFF4EE), identique sur toutes les images.
- Chaque sujet occupe ~80 % de sa case, centré et entier.
- Même échelle visuelle partout : ne PAS refléter la taille réelle.
- Aucun texte, aucun chiffre, aucun logo dans l'image.

FORMAT
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

LES 4 SUJETS, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. une abeille — abeille dodue rayée jaune et noir, ailes translucides
Haut droite. un frelon — grosse guêpe brun-jaune, plus grande et plus massive que l'abeille
Bas gauche. un escargot — escargot à coquille spiralée brune
Bas droite. une sauterelle — sauterelle verte à longues pattes arrière repliées
```

### Planche 3/10 — S12, S13, S14, S15

```
Reprends exactement le style de l'image de référence jointe.

STYLE
- Illustration cartoon douce, style livre pour enfants, contours arrondis.
- Le sujet est porté comme un DÉGUISEMENT par un bébé, pas décoré d'un
  visage. On doit voir sa TÊTE ENTIÈRE qui émerge du costume (visage
  complet, joues rondes, grands yeux brillants), ses deux PETITES MAINS
  potelées et ses deux PETITS PIEDS qui dépassent.
- Le costume reste reconnaissable au premier coup d'œil.
- Fond uni crème très clair (#FFF4EE), identique sur toutes les images.
- Chaque sujet occupe ~80 % de sa case, centré et entier.
- Même échelle visuelle partout : ne PAS refléter la taille réelle.
- Aucun texte, aucun chiffre, aucun logo dans l'image.

FORMAT
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

LES 4 SUJETS, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. une grenouille — grenouille verte assise, pattes palmées
Haut droite. une souris — petite souris grise à grandes oreilles rondes et longue queue fine
Bas gauche. un hamster — hamster doré tout rond, petites oreilles, joues pleines
Bas droite. un rouge-gorge — petit oiseau brun à POITRINE ORANGE
```

### Planche 4/10 — S16, S17, S18, S19

```
Reprends exactement le style de l'image de référence jointe.

STYLE
- Illustration cartoon douce, style livre pour enfants, contours arrondis.
- Le sujet est porté comme un DÉGUISEMENT par un bébé, pas décoré d'un
  visage. On doit voir sa TÊTE ENTIÈRE qui émerge du costume (visage
  complet, joues rondes, grands yeux brillants), ses deux PETITES MAINS
  potelées et ses deux PETITS PIEDS qui dépassent.
- Le costume reste reconnaissable au premier coup d'œil.
- Fond uni crème très clair (#FFF4EE), identique sur toutes les images.
- Chaque sujet occupe ~80 % de sa case, centré et entier.
- Même échelle visuelle partout : ne PAS refléter la taille réelle.
- Aucun texte, aucun chiffre, aucun logo dans l'image.

FORMAT
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

LES 4 SUJETS, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. une taupe — petit animal noir au museau rose pointu et aux grosses pattes-pelles
Haut droite. un rat — rat gris-brun au museau allongé et à la longue queue nue
Bas gauche. un écureuil — écureuil roux à grande queue touffue
Bas droite. un merle — oiseau NOIR au bec ORANGE vif
```

### Planche 5/10 — S20, S21, S22, S23

```
Reprends exactement le style de l'image de référence jointe.

STYLE
- Illustration cartoon douce, style livre pour enfants, contours arrondis.
- Le sujet est porté comme un DÉGUISEMENT par un bébé, pas décoré d'un
  visage. On doit voir sa TÊTE ENTIÈRE qui émerge du costume (visage
  complet, joues rondes, grands yeux brillants), ses deux PETITES MAINS
  potelées et ses deux PETITS PIEDS qui dépassent.
- Le costume reste reconnaissable au premier coup d'œil.
- Fond uni crème très clair (#FFF4EE), identique sur toutes les images.
- Chaque sujet occupe ~80 % de sa case, centré et entier.
- Même échelle visuelle partout : ne PAS refléter la taille réelle.
- Aucun texte, aucun chiffre, aucun logo dans l'image.

FORMAT
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

LES 4 SUJETS, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un hérisson — hérisson brun couvert de piquants, museau pointu
Haut droite. un cochon d'Inde — petit rongeur trapu au poil roux et blanc, SANS queue
Bas gauche. un furet — petit mustélidé long et souple, beige à masque foncé
Bas droite. un chaton de deux mois — tout petit chaton maladroit aux pattes courtes
```

### Planche 6/10 — S24, S25, S26, S27

```
Reprends exactement le style de l'image de référence jointe.

STYLE
- Illustration cartoon douce, style livre pour enfants, contours arrondis.
- Le sujet est porté comme un DÉGUISEMENT par un bébé, pas décoré d'un
  visage. On doit voir sa TÊTE ENTIÈRE qui émerge du costume (visage
  complet, joues rondes, grands yeux brillants), ses deux PETITES MAINS
  potelées et ses deux PETITS PIEDS qui dépassent.
- Le costume reste reconnaissable au premier coup d'œil.
- Fond uni crème très clair (#FFF4EE), identique sur toutes les images.
- Chaque sujet occupe ~80 % de sa case, centré et entier.
- Même échelle visuelle partout : ne PAS refléter la taille réelle.
- Aucun texte, aucun chiffre, aucun logo dans l'image.

FORMAT
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

LES 4 SUJETS, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un lapereau — petit lapin aux oreilles encore courtes
Haut droite. un pigeon — pigeon gris-bleu à reflets verts sur le cou
Bas gauche. un chihuahua — tout petit chien à grandes oreilles dressées et gros yeux ronds
Bas droite. un chat de quatre mois — jeune chat dégingandé, plus grand que le chaton
```

### Planche 7/10 — S28, S29, S30, S31

```
Reprends exactement le style de l'image de référence jointe.

STYLE
- Illustration cartoon douce, style livre pour enfants, contours arrondis.
- Le sujet est porté comme un DÉGUISEMENT par un bébé, pas décoré d'un
  visage. On doit voir sa TÊTE ENTIÈRE qui émerge du costume (visage
  complet, joues rondes, grands yeux brillants), ses deux PETITES MAINS
  potelées et ses deux PETITS PIEDS qui dépassent.
- Le costume reste reconnaissable au premier coup d'œil.
- Fond uni crème très clair (#FFF4EE), identique sur toutes les images.
- Chaque sujet occupe ~80 % de sa case, centré et entier.
- Même échelle visuelle partout : ne PAS refléter la taille réelle.
- Aucun texte, aucun chiffre, aucun logo dans l'image.

FORMAT
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

LES 4 SUJETS, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un carlin — petit chien beige au museau écrasé, plis sur le front, queue en tire-bouchon
Haut droite. une poule — poule rousse à crête rouge
Bas gauche. un lapin — lapin adulte aux longues oreilles dressées
Bas droite. un chat adulte — chat adulte assis, queue enroulée autour des pattes
```

### Planche 8/10 — S32, S33, S34, S35

```
Reprends exactement le style de l'image de référence jointe.

STYLE
- Illustration cartoon douce, style livre pour enfants, contours arrondis.
- Le sujet est porté comme un DÉGUISEMENT par un bébé, pas décoré d'un
  visage. On doit voir sa TÊTE ENTIÈRE qui émerge du costume (visage
  complet, joues rondes, grands yeux brillants), ses deux PETITES MAINS
  potelées et ses deux PETITS PIEDS qui dépassent.
- Le costume reste reconnaissable au premier coup d'œil.
- Fond uni crème très clair (#FFF4EE), identique sur toutes les images.
- Chaque sujet occupe ~80 % de sa case, centré et entier.
- Même échelle visuelle partout : ne PAS refléter la taille réelle.
- Aucun texte, aucun chiffre, aucun logo dans l'image.

FORMAT
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

LES 4 SUJETS, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un renardeau — bébé renard roux aux oreilles rondes et à la queue courte
Haut droite. un canard colvert — canard à TÊTE VERTE brillante et collier blanc
Bas gauche. un beagle — chien tricolore blanc-brun-noir à longues oreilles tombantes
Bas droite. un raton laveur — animal gris à MASQUE noir sur les yeux et queue annelée
```

### Planche 9/10 — S36, S37, S38, S39

```
Reprends exactement le style de l'image de référence jointe.

STYLE
- Illustration cartoon douce, style livre pour enfants, contours arrondis.
- Le sujet est porté comme un DÉGUISEMENT par un bébé, pas décoré d'un
  visage. On doit voir sa TÊTE ENTIÈRE qui émerge du costume (visage
  complet, joues rondes, grands yeux brillants), ses deux PETITES MAINS
  potelées et ses deux PETITS PIEDS qui dépassent.
- Le costume reste reconnaissable au premier coup d'œil.
- Fond uni crème très clair (#FFF4EE), identique sur toutes les images.
- Chaque sujet occupe ~80 % de sa case, centré et entier.
- Même échelle visuelle partout : ne PAS refléter la taille réelle.
- Aucun texte, aucun chiffre, aucun logo dans l'image.

FORMAT
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

LES 4 SUJETS, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un bouledogue français — chien trapu à grandes oreilles DROITES en chauve-souris, museau plat
Haut droite. un renard — renard roux adulte à grande queue touffue à bout blanc
Bas gauche. un blaireau — animal gris trapu à tête blanche rayée de deux bandes noires
Bas droite. un cocker — chien à très longues oreilles tombantes et poil ondulé doré
```

### Planche 10/10 — S40, S41

```
Reprends exactement le style de l'image de référence jointe.

STYLE
- Illustration cartoon douce, style livre pour enfants, contours arrondis.
- Le sujet est porté comme un DÉGUISEMENT par un bébé, pas décoré d'un
  visage. On doit voir sa TÊTE ENTIÈRE qui émerge du costume (visage
  complet, joues rondes, grands yeux brillants), ses deux PETITES MAINS
  potelées et ses deux PETITS PIEDS qui dépassent.
- Le costume reste reconnaissable au premier coup d'œil.
- Fond uni crème très clair (#FFF4EE), identique sur toutes les images.
- Chaque sujet occupe ~80 % de sa case, centré et entier.
- Même échelle visuelle partout : ne PAS refléter la taille réelle.
- Aucun texte, aucun chiffre, aucun logo dans l'image.

FORMAT
Produis UNE image carrée 2048 × 2048 px composée de 2 vignettes
côte à côte (2 vignettes), sans bordure ni séparateur.

LES 2 SUJETS, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un agneau nouveau-né — tout petit agneau blanc sur ses pattes flageolantes
Haut droite. un porcelet — petit cochon rose au groin rond et à la queue en tire-bouchon
```

---

## Découper et vérifier

Les planches arrivent en un seul fichier : le découpage et le nommage sont
automatisés. Pour une planche 2 × 2 démarrant à la semaine 4 :

```bash
node scripts/split-illustrations.mjs ~/Downloads/<planche>.png animals 4
```

Le script écrit `public/images/animals/animals-4.webp` … et refuse
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
