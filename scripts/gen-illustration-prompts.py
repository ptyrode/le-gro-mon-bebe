#!/usr/bin/env python3
import json
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from illustration_subjects import VISUEL  # noqa: E402

OUT = pathlib.Path('docs')
PAR_PLANCHE = 4

SPECIFIQUE = {
    'animals': """- « un œuf de fourmi » : un petit œuf blanc nacré avec un visage de bébé, pas une fourmi.
- « un chaton de deux mois », « un chat de quatre mois », « un chat adulte » : trois
  illustrations DISTINCTES, de plus en plus grandes et dégourdies.
- « un lapereau » puis « un lapin », « un renardeau » puis « un renard » : même logique,
  le second est visiblement plus âgé.
- Les races de chiens (chihuahua, carlin, beagle, bouledogue français, cocker) doivent
  être reconnaissables entre elles : museau, oreilles et silhouette caractéristiques.""",
    'fruits': """- Plusieurs entrées ne sont PAS un fruit isolé mais un ensemble, à dessiner comme tel :
  « un ananas et ses feuilles », « un régime de bananes », « une botte de blettes »,
  « un pied de céleri », « un pied de rhubarbe », « un chou-fleur et ses feuilles »,
  « un pied de chou de Bruxelles » (la tige entière avec ses boules).
- « une graine de pavot » et « une graine de sésame » sont minuscules : les dessiner
  quand même en gros plan, à la même échelle que les autres.
- « un potiron », « une citrouille », « une courge spaghetti », « un potiron géant » :
  quatre cucurbitacées à différencier nettement par la couleur et la forme.
- « un daikon » est un long radis blanc, pas une carotte.""",
    'fish': """- Les premières semaines ne sont pas des poissons : « une perle de caviar »,
  « un œuf de lompe », « un œuf de saumon » sont des œufs ; « un alevin tout juste
  éclos » est un tout petit poisson translucide ; « un krill » est une crevette
  minuscule ; « une civelle » est un bébé anguille transparent.
- « une coque » est un coquillage, « un homard » un crustacé à pinces,
  « un hippocampe nain » un hippocampe : ne pas les dessiner en poissons.
- Les poissons de forme voisine doivent rester distincts : le tacaud, le merlan et
  le merlu ont des silhouettes et des couleurs différentes.
- Les poissons plats (« une sole », « une plie », « un turbot ») se dessinent de dessus,
  couchés sur le flanc.
- « une roussette » est un petit requin.""",
    'cheeses': """- Les premières semaines sont des PORTIONS, pas des fromages entiers :
  « une paillette de parmesan », « une miette de roquefort », « une miette de pecorino »,
  « un dé de feta », « une bille de mozzarella », « une bouchée de Boursin ».
  Les dessiner comme de petits morceaux, avec leur visage de bébé.
- Les dernières semaines sont des MEULES entières, hautes et cylindriques, à croûte
  épaisse : cheddar, salers, grana padano, beaufort, sbrinz, gruyère, comté, emmental.
- Ne pas mettre de trous partout : seul l'emmental en a. Le gruyère n'a pas de trous.
- Les bleus (« un Bleu d'Auvergne », « un Bleu de Gex ») ont des veines bleu-vert.
- « une Mimolette » est une boule orange vif, « un Morbier » a une ligne de cendre noire
  au milieu, « un Camembert » et « un Coulommiers » ont une croûte blanche fleurie.""",
}

SUJET_COURT = {
    'animals': "on identifie l'animal sans hésiter",
    'fruits': "on identifie le fruit ou le légume sans hésiter",
    'fish': "on identifie l'animal marin sans hésiter",
    'cheeses': "on identifie le fromage sans hésiter",
}

GABARIT = """# Prompt d'illustration — {label}

À copier-coller dans un modèle générateur d'images, **avec l'image de référence en pièce jointe**.

> ⚠️ Les modèles ne produisent pas {n} images d'un coup, et sortent souvent une **planche
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
- Le costume reste reconnaissable au premier coup d'œil : {sujet_court}.
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
{specifique}
```

---

## Les planches, une par une

**Envoyer un bloc à la fois, avec l'image de référence en pièce jointe.**

Chaque bloc est **entièrement autonome** : il porte le style, le format et ses sujets.
Il n'y a rien à envoyer avant — pas besoin du texte ci-dessus, qui n'est là que pour
expliquer la démarche.

{liste}

---

## Découper et vérifier

Les planches arrivent en un seul fichier : le découpage et le nommage sont
automatisés. Pour une planche 2 × 2 démarrant à la semaine {first_week} :

```bash
node scripts/split-illustrations.mjs ~/Downloads/<planche>.png {cat} {first_week}
```

Le script écrit `public/images/{cat}/{cat}-{first_week}.webp` … et refuse
d'écraser un fichier existant. Il redimensionne chaque vignette en 1024 × 1024.

⚠️ **La dernière planche ne contient que 2 vignettes** (S40 et S41) : préciser la
grille, sinon le script découpe en 2 × 2 et produit deux images vides.

```bash
node scripts/split-illustrations.mjs ~/Downloads/<planche10>.png {cat} 40 2 1
```

Une fois toutes les planches découpées :

```bash
node scripts/check-illustrations.mjs
```

Ce contrôle liste les images manquantes **avec le sujet attendu**, signale les noms
non conformes et les dimensions incorrectes. Il attend **{n} fichiers**, de
`{first}` à `{last}`, sans trou.

⚠️ Vérifier visuellement que chaque image correspond bien à son sujet : un décalage
d'un cran et bébé fait la taille du mauvais objet pendant toute une semaine.
"""


def main() -> None:
    OUT.mkdir(exist_ok=True)
    for cat in ('animals', 'fruits', 'fish', 'cheeses'):
        data = json.loads(
            pathlib.Path(f'src/data/categories/{cat}.json').read_text(encoding='utf-8')
        )
        items = data['items']
        planches = [
            items[i:i + PAR_PLANCHE] for i in range(0, len(items), PAR_PLANCHE)
        ]
        blocs = []
        for n, groupe in enumerate(planches, 1):
            sujets = '\n'.join(
                f'{pos}. {it["name"]} — {VISUEL.get(it["name"], "")}'.rstrip(' —')
                for pos, it in zip(
                    ['Haut gauche', 'Haut droite', 'Bas gauche', 'Bas droite'], groupe
                )
            )
            semaines = ', '.join(f'S{it["week"]}' for it in groupe)
            blocs.append(
                f'### Planche {n}/{len(planches)} — {semaines}\n\n'
                f'```\n'
                f'Reprends exactement le style de l\'image de référence jointe.\n\n'
                f'STYLE\n'
                f'- Illustration cartoon douce, style livre pour enfants, contours arrondis.\n'
                f'- Le sujet est porté comme un DÉGUISEMENT par un bébé, pas décoré d\'un\n'
                f'  visage. On doit voir sa TÊTE ENTIÈRE qui émerge du costume (visage\n'
                f'  complet, joues rondes, grands yeux brillants), ses deux PETITES MAINS\n'
                f'  potelées et ses deux PETITS PIEDS qui dépassent.\n'
                f'- Le costume reste reconnaissable au premier coup d\'œil.\n'
                f'- Fond uni crème très clair (#FFF4EE), identique sur toutes les images.\n'
                f'- Chaque sujet occupe ~80 % de sa case, centré et entier.\n'
                f'- Même échelle visuelle partout : ne PAS refléter la taille réelle.\n'
                f'- Aucun texte, aucun chiffre, aucun logo dans l\'image.\n\n'
                f'FORMAT\n'
                f'Produis UNE image carrée 2048 × 2048 px composée de '
                f'{len(groupe)} vignettes\n'
                f'{"disposées en 2 × 2" if len(groupe) == 4 else f"côte à côte ({len(groupe)} vignettes)"}, '
                f'sans bordure ni séparateur.\n\n'
                f'LES {len(groupe)} SUJETS, dans cet ordre exact — chacun DIFFÉRENT, '
                f'aucune répétition :\n\n{sujets}\n'
                f'```'
            )
        liste = '\n\n'.join(blocs)
        texte = GABARIT.format(
            sujet_court=SUJET_COURT[cat],
            label=data['label'],
            cat=cat,
            n=len(items),
            liste=liste,
            specifique=SPECIFIQUE[cat],
            first=f'{cat}-{items[0]["week"]}.png',
            last=f'{cat}-{items[-1]["week"]}.png',
            first_week=items[0]['week'],
        )
        path = OUT / f'PROMPT-{cat}.md'
        path.write_text(texte, encoding='utf-8')
        print(f'{path} — {len(items)} items')


if __name__ == '__main__':
    main()
