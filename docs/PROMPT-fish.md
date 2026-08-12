# Prompt d'illustration — Poissons & fruits de mer

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
- Le costume reste reconnaissable au premier coup d'œil : on identifie l'animal marin sans hésiter.
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
- Les premières semaines ne sont pas des poissons : « une perle de caviar »,
  « un œuf de lompe », « un œuf de saumon » sont des œufs ; « un alevin tout juste
  éclos » est un tout petit poisson translucide ; « un krill » est une crevette
  minuscule ; « une civelle » est un bébé anguille transparent.
- « une coque » est un coquillage, « un homard » un crustacé à pinces,
  « un hippocampe nain » un hippocampe : ne pas les dessiner en poissons.
- Les poissons de forme voisine doivent rester distincts : le tacaud, le merlan et
  le merlu ont des silhouettes et des couleurs différentes.
- Les poissons plats (« une sole », « une plie », « un turbot ») se dessinent de dessus,
  couchés sur le flanc.
- « une roussette » est un petit requin.
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

Haut gauche. une perle de caviar — petite bille noire brillante
Haut droite. un œuf de lompe — minuscule bille noire mate
Bas gauche. un œuf de saumon — bille orange translucide
Bas droite. un alevin tout juste éclos — tout petit poisson translucide avec de gros yeux et une poche ventrale
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

Haut gauche. un krill — crevette minuscule rosée translucide
Haut droite. un hippocampe nain — hippocampe, queue enroulée, museau en tube
Bas gauche. une crevette grise — petite crevette grise translucide
Bas droite. une coque — coquillage bivalve strié beige, fermé
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

Haut gauche. une civelle — bébé anguille filiforme et transparent
Haut droite. un petit anchois — petit poisson argenté fin à bande bleutée
Bas gauche. une sardine — petit poisson argenté au dos bleuté
Bas droite. un éperlan — petit poisson argenté effilé
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

Haut gauche. un rouget — poisson rouge-rose à barbillons sous le menton
Haut droite. un chinchard — poisson argenté fuselé à ligne latérale marquée
Bas gauche. un hareng — poisson argenté élancé au dos vert-bleu
Bas droite. une truite portion — truite mouchetée de brun et rose
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

Haut gauche. un maquereau — poisson au dos bleu-vert ZÉBRÉ de noir, ventre argenté
Haut droite. une dorade royale — poisson gris argenté avec une tache dorée entre les yeux
Bas gauche. une sole — poisson PLAT ovale brun, vu de dessus, les deux yeux du même côté
Bas droite. un merlan — poisson allongé gris-argent à museau pointu
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

Haut gauche. un tacaud — poisson cuivré trapu avec un barbillon sous le menton
Haut droite. un mulet — poisson gris argenté au corps épais et à la tête plate
Bas gauche. une plie — poisson plat brun couvert de taches ORANGE vif
Bas droite. un cabillaud de portion — gros poisson gris-vert moucheté à barbillon
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

Haut gauche. un lieu jaune — poisson doré-brun élancé, ligne latérale claire
Haut droite. une truite de mer — truite argentée à petits points noirs
Bas gauche. un merlu — poisson gris-argent très allongé à grande bouche
Bas droite. un turbot — poisson plat presque rond, brun tacheté, vu de dessus
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

Haut gauche. un lieu noir — poisson gris foncé élancé, dos sombre
Haut droite. un jeune brochet — poisson long vert olive à gueule allongée pleine de dents
Bas gauche. une raie bouclée — raie en losange brun clair tacheté, longue queue
Bas droite. un saint-pierre — poisson haut et plat gris doré avec une grosse tache noire ronde sur le flanc
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

Haut gauche. une lotte — baudroie à énorme tête aplatie et grande bouche
Haut droite. un maigre — grand poisson argenté élancé
Bas gauche. une roussette — petit requin brun tacheté, silhouette de requin
Bas droite. un homard — crustacé bleu-noir à grosses pinces
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

Haut gauche. un beau bar de ligne — poisson argenté élégant à dos gris-bleu
Haut droite. un saumon sauvage — saumon argenté à dos bleuté et flancs rosés
```

---

## Découper et vérifier

Les planches arrivent en un seul fichier : le découpage et le nommage sont
automatisés. Pour une planche 2 × 2 démarrant à la semaine 4 :

```bash
node scripts/split-illustrations.mjs ~/Downloads/<planche>.png fish 4
```

Le script écrit `public/images/fish/fish-4.webp` … et refuse
d'écraser un fichier existant. Il redimensionne chaque vignette en 1024 × 1024.

⚠️ **La dernière planche ne contient que 2 vignettes** (S40 et S41) : préciser la
grille, sinon le script découpe en 2 × 2 et produit deux images vides.

```bash
node scripts/split-illustrations.mjs ~/Downloads/<planche10>.png fish 40 2 1
```

Une fois toutes les planches découpées :

```bash
node scripts/check-illustrations.mjs
```

Ce contrôle liste les images manquantes **avec le sujet attendu**, signale les noms
non conformes et les dimensions incorrectes. Il attend **38 fichiers**, de
`fish-4.png` à `fish-41.png`, sans trou.

⚠️ Vérifier visuellement que chaque image correspond bien à son sujet : un décalage
d'un cran et bébé fait la taille du mauvais objet pendant toute une semaine.
