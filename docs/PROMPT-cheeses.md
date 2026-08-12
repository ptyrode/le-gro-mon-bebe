# Prompt d'illustration — Fromages

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
- Chaque fromage a un petit visage de bébé mignon : grands yeux, joues rondes, expression
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
- Les premières semaines sont des PORTIONS, pas des fromages entiers :
  « une paillette de parmesan », « une miette de roquefort », « une miette de pecorino »,
  « un dé de feta », « une bille de mozzarella », « une bouchée de Boursin ».
  Les dessiner comme de petits morceaux, avec leur visage de bébé.
- Les dernières semaines sont des MEULES entières, hautes et cylindriques, à croûte
  épaisse : cheddar, salers, grana padano, beaufort, sbrinz, gruyère, comté, emmental.
- Ne pas mettre de trous partout : seul l'emmental en a. Le gruyère n'a pas de trous.
- Les bleus (« un Bleu d'Auvergne », « un Bleu de Gex ») ont des veines bleu-vert.
- « une Mimolette » est une boule orange vif, « un Morbier » a une ligne de cendre noire
  au milieu, « un Camembert » et « un Coulommiers » ont une croûte blanche fleurie.
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

Haut gauche. une paillette de parmesan — minuscule copeau de fromage dur jaune pâle
Haut droite. une miette de roquefort — petit éclat de fromage blanc veiné de bleu
Bas gauche. une miette de pecorino — petit éclat de fromage dur ivoire
Bas droite. un dé de feta — petit cube blanc mat

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 2/10 — S8, S9, S10, S11

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. une bille de mozzarella — petite boule blanche lisse et brillante
Haut droite. une bouchée de Boursin — petite portion de fromage frais blanc parsemé d'herbes vertes
Bas gauche. une portion de Vache qui rit — triangle de fromage fondu emballé dans un papier argenté
Bas droite. un Babybel — petite meule ronde enrobée de cire ROUGE vif

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 3/10 — S12, S13, S14, S15

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un crottin de Chavignol — petit palet de chèvre beige à croûte plissée
Haut droite. un Saint-Marcellin — petit fromage rond très crémeux, croûte beige, dans un pot en terre
Bas gauche. un Camembert — fromage rond plat à croûte blanche fleurie
Bas droite. un Coulommiers — fromage rond plat à croûte blanche, plus épais que le camembert

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 4/10 — S16, S17, S18, S19

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un Reblochon — fromage rond à croûte jaune-orangé
Haut droite. un Munster — fromage rond à croûte ORANGE vif, lisse et humide
Bas gauche. un Bleu d'Auvergne — fromage blanc cylindrique veiné de bleu-vert
Bas droite. un Saint-Nectaire — grande galette plate à croûte grise fleurie

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 5/10 — S20, S21, S22, S23

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. une Mimolette — boule ORANGE vif à croûte grise creusée de petits trous
Haut droite. un Vacherin Mont d'Or — fromage crémeux dans une boîte ronde en bois d'épicéa
Bas gauche. un Ossau-Iraty — meule bombée à croûte orangée, fromage de brebis
Bas droite. un Brie de Melun — grande galette plate à croûte blanche

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 6/10 — S24, S25, S26, S27

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un Bleu de Gex — fromage clair veiné de bleu pâle
Haut droite. un Morbier — fromage rond clair traversé en son milieu par une LIGNE de cendre noire
Bas gauche. un Gouda — meule ronde et bombée à croûte jaune-orangé cirée
Bas droite. une meule de raclette — grande meule ronde à croûte brune, pâte jaune pâle

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 7/10 — S28, S29, S30, S31

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un Brie de Meaux — très grande galette plate à croûte blanche fleurie
Haut droite. un Bethmale — meule à croûte orangée, pâte jaune pâle
Bas gauche. un Cantal — grande fourme CYLINDRIQUE haute, croûte gris-doré
Bas droite. un Laguiole — haute fourme cylindrique à croûte brun-orangé

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 8/10 — S32, S33, S34, S35

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. une Abondance — meule à talon CONCAVE, croûte brossée ambrée
Haut droite. un Cheddar — meule cylindrique à pâte JAUNE-ORANGÉ, croûte claire
Bas gauche. un Salers — haute fourme cylindrique à croûte épaisse dorée
Bas droite. un Grana Padano — grande meule dorée à croûte lisse

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 9/10 — S36, S37, S38, S39

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 4 vignettes
disposées en 2 × 2, sans bordure ni séparateur.

Les 4 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. un Beaufort — grande meule à talon nettement CONCAVE, croûte ambrée
Haut droite. un Sbrinz — grande meule très dure à croûte brun clair
Bas gauche. un Gruyère — grande meule à croûte brune, pâte jaune — AUCUN trou
Bas droite. un Comté — très grande meule à croûte brun doré, pâte ivoire

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

### Planche 10/10 — S40, S41

```
Même style que l'image de référence jointe, même fond crème, même échelle.
Produis UNE image carrée 2048 × 2048 px composée de 2 vignettes
côte à côte (2 vignettes), sans bordure ni séparateur.

Les 2 sujets, dans cet ordre exact — chacun DIFFÉRENT, aucune répétition :

Haut gauche. une meule d'emmental — énorme meule bombée à pâte jaune percée de GROS trous ronds
Haut droite. une meule d'Emmental de Savoie — énorme meule à pâte jaune percée de gros trous, croûte dorée

Rappels : un seul sujet par vignette, centré, entier, occupant ~80 % de sa case.
Chaque sujet a un petit visage de bébé mignon. Aucun texte, aucun chiffre dans l'image.
```

---

## Découper et vérifier

Les planches arrivent en un seul fichier : le découpage et le nommage sont
automatisés. Pour une planche 2 × 2 démarrant à la semaine 4 :

```bash
node scripts/split-illustrations.mjs ~/Downloads/<planche>.png cheeses 4
```

Le script écrit `public/images/cheeses/cheeses-4.webp` … et refuse
d'écraser un fichier existant. Il redimensionne chaque vignette en 1024 × 1024.

⚠️ **La dernière planche ne contient que 2 vignettes** (S40 et S41) : préciser la
grille, sinon le script découpe en 2 × 2 et produit deux images vides.

```bash
node scripts/split-illustrations.mjs ~/Downloads/<planche10>.png cheeses 40 2 1
```

Une fois toutes les planches découpées :

```bash
node scripts/check-illustrations.mjs
```

Ce contrôle liste les images manquantes **avec le sujet attendu**, signale les noms
non conformes et les dimensions incorrectes. Il attend **38 fichiers**, de
`cheeses-4.png` à `cheeses-41.png`, sans trou.

⚠️ Vérifier visuellement que chaque image correspond bien à son sujet : un décalage
d'un cran et bébé fait la taille du mauvais objet pendant toute une semaine.
