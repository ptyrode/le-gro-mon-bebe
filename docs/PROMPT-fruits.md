# Prompt d'illustration — Fruits & légumes

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
- Chaque fruit ou légume a un petit visage de bébé mignon : grands yeux, joues rondes, expression
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
- Plusieurs entrées ne sont PAS un fruit isolé mais un ensemble, à dessiner comme tel :
  « un ananas et ses feuilles », « un régime de bananes », « une botte de blettes »,
  « un pied de céleri », « un pied de rhubarbe », « un chou-fleur et ses feuilles »,
  « un pied de chou de Bruxelles » (la tige entière avec ses boules).
- « une graine de pavot » et « une graine de sésame » sont minuscules : les dessiner
  quand même en gros plan, à la même échelle que les autres.
- « un potiron », « une citrouille », « une courge spaghetti », « un potiron géant » :
  quatre cucurbitacées à différencier nettement par la couleur et la forme.
- « un daikon » est un long radis blanc, pas une carotte.
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

Haut gauche. une graine de pavot — minuscule grain rond gris ardoise, surface mate
Haut droite. une graine de sésame — petite goutte plate beige clair, lisse
Bas gauche. une lentille — petit disque PLAT brun-vert, comme une lentille sèche du paquet — surtout pas une boule
Bas droite. une myrtille — petite baie bleu-violet à couronne étoilée

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 2/10 — S8, S9, S10, S11

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. une framboise — baie rouge composée de petites boules serrées
Haut droite. une cerise — cerise rouge brillante avec sa queue verte
Bas gauche. une fraise — fraise rouge en cœur, mouchetée, avec sa collerette verte
Bas droite. un abricot — petit fruit orange velouté avec un sillon

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 3/10 — S12, S13, S14, S15

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un citron vert — boule vert vif à peau grenue
Haut droite. une pêche — fruit rond duveteux rose-orangé avec un sillon
Bas gauche. un avocat — fruit vert foncé en forme de poire, peau grenue
Bas droite. un poivron — poivron rouge brillant à quatre lobes et queue verte

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 4/10 — S16, S17, S18, S19

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. une carotte — carotte orange conique avec ses fanes vertes
Haut droite. une banane — banane jaune incurvée, une seule
Bas gauche. une aubergine — fruit violet foncé brillant et allongé, calice vert
Bas droite. un épi de maïs — épi jaune aux grains alignés, feuilles vertes écartées

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 5/10 — S20, S21, S22, S23

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un concombre — concombre vert foncé long et régulier
Haut droite. une courgette — courgette vert clair allongée avec sa fleur
Bas gauche. une papaye — gros fruit ovale jaune-orangé
Bas droite. une courge butternut — courge beige en forme de poire allongée

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 6/10 — S24, S25, S26, S27

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. une salade romaine — laitue haute aux feuilles vertes dressées et serrées
Haut droite. un ananas et ses feuilles — ananas entier AVEC son plumeau de feuilles pointues
Bas gauche. un chou frisé — boule de feuilles vert foncé très gaufrées
Bas droite. une botte de blettes — bouquet de tiges blanches à larges feuilles vertes, lié

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 7/10 — S28, S29, S30, S31

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un pied de céleri — botte de longues côtes vert pâle serrées
Haut droite. un poireau — poireau long, blanc à la base et vert au sommet
Bas gauche. un pied de rhubarbe — tiges rouge-rosé à grandes feuilles vertes
Bas droite. un chou-fleur et ses feuilles — boule blanche entourée de ses grandes feuilles vertes

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 8/10 — S32, S33, S34, S35

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. une courge spaghetti — courge ovale jaune pâle, lisse
Haut droite. un chou chinois — chou allongé vert pâle aux feuilles serrées, façon pé-tsaï
Bas gauche. un régime de bananes — grappe entière de bananes attachées, pas une seule
Bas droite. une pastèque — grosse boule vert rayé de vert foncé

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 9/10 — S36, S37, S38, S39

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. une citrouille — citrouille ronde orange vif, façon Halloween
Haut droite. un cardon — longues côtes gris-vert épaisses, façon céleri géant
Bas gauche. un pied de chou de Bruxelles — haute tige verticale couverte de petites boules vertes
Bas droite. un daikon — long radis BLANC droit, avec ses fanes vertes — pas une carotte

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 10/10 — S40, S41

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 2 vignettes
côte à côte (2 vignettes), sans bordure ni séparateur.

Les 2 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un potiron géant — énorme citrouille orange bien ronde
Haut droite. une courge trombone — courge très longue et recourbée, beige-vert, col étroit

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

---

## Découper et vérifier

Les planches arrivent en un seul fichier : le découpage et le nommage sont
automatisés. Pour une planche 2 × 2 démarrant à la semaine 4 :

```bash
node scripts/split-illustrations.mjs ~/Downloads/<planche>.png fruits 4
```

Le script écrit `public/illustrations/fruits/fruits-4.png` … et refuse
d'écraser un fichier existant. Il redimensionne chaque vignette en 1024 × 1024.

⚠️ **La dernière planche ne contient que 2 vignettes** (S40 et S41) : préciser la
grille, sinon le script découpe en 2 × 2 et produit deux images vides.

```bash
node scripts/split-illustrations.mjs ~/Downloads/<planche10>.png fruits 40 2 1
```

Une fois toutes les planches découpées :

```bash
node scripts/check-illustrations.mjs
```

Ce contrôle liste les images manquantes **avec le sujet attendu**, signale les noms
non conformes et les dimensions incorrectes. Il attend **38 fichiers**, de
`fruits-4.png` à `fruits-41.png`, sans trou.

⚠️ Vérifier visuellement que chaque image correspond bien à son sujet : un décalage
d'un cran et bébé fait la taille du mauvais objet pendant toute une semaine.
