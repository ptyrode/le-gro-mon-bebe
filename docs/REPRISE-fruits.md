# Reprise des illustrations — Fruits et légumes (v3)

Relevé visuel des 10 planches de `docs/v3/fruits`, découpées et installées dans
`public/images/fruits/` (38 fichiers, 836 Ko).

| Bilan               |               |
| ------------------- | ------------- |
| Conformes           | **36 / 38**   |
| À refaire           | 2 — S6 et S41 |
| Décision en attente | Aucune        |

**C'est la meilleure des quatre catégories.** Elle a servi de validation au prompt corrigé.

---

## Ce qui marche

Aucune vignette ne présente les défauts qui ont fait échouer les autres catégories : pas un
seul visage parasite sur le costume, aucun sujet posé en chapeau, posture assise tenue sur
les 38 images, fond crème homogène sans dérive de palette ni de trait.

La bascule tient à la reformulation du bloc `MONTAGE` dans
`scripts/gen-illustration-prompts.py` : décrire l'assemblage voulu — capuche creusée d'une
ouverture ronde où s'encadre le visage, feuilles et tige sur le dessus — au lieu d'énumérer
ce qu'il ne faut pas dessiner.

La duplication des deux derniers sujets pour remplir la planche 10 a fonctionné, avec les
originaux en haut : c'est bien eux que le découpage a retenus.

---

## Les défauts

### 1. La lentille passe pour un kiwi — S6

Dessinée en sphère brun-vert à tige et feuille. Une lentille est une graine plate, façon
petit palet.

### 2. La courge trombone est un butternut — S41

Rendue en forme de poire, elle fait doublon avec la courge butternut de S23. La vraie
tromboncino est longue et recourbée en col de cygne.

Les deux sujets sont désormais décrits dans le bloc `SPECIFIQUE` de `fruits`.

---

## Relevé des vignettes à revoir

| Semaine | Sujet               | Défaut                                               |
| ------- | ------------------- | ---------------------------------------------------- |
| S6      | une lentille        | Sphère à tige et feuille : se lit comme un kiwi      |
| S41     | une courge trombone | Forme de poire, donc un butternut — doublon avec S23 |

### Ressemblances tolérées

Deux paires se ressemblent sans que ce soit une erreur de rendu, et **restent en place** :

- **S28 pied de céleri / S37 cardon** — plantes botaniquement voisines, aux côtes
  identiques. Le cardon est plus gris-vert.
- **S36 citrouille / S40 potiron géant** — deux cucurbitacées orange et rondes. La consigne
  d'échelle identique interdit de les séparer par la taille, qui serait pourtant le seul
  vrai écart.

Les corriger demanderait de changer les items du JSON, pas les illustrations.

---

## Pour la reprise

Le générateur est à jour. Supprimer les fichiers concernés — le script refuse d'écraser —
puis relancer les deux planches :

```bash
rm public/images/fruits/fruits-{4,5,6,7}.webp public/images/fruits/fruits-{40,41}.webp
node scripts/split-illustrations.mjs <planche1> fruits 4
node scripts/split-illustrations.mjs <planche10> fruits 40
```

⚠️ Le prompt travaille par planche de quatre : reprendre S6 remplace aussi S4, S5 et S7, qui
sont bonnes.
