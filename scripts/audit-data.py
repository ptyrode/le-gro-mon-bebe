#!/usr/bin/env python3
"""Audit de cohérence des données de comparaison vs la croissance fœtale.

Critère retenu : la TAILLE (plus grande dimension réelle de l'objet).
Les estimations ci-dessous sont des ordres de grandeur usuels (cm).
"""
import json

# Tolérance choisie : ratio = taille_objet / taille_foetus
OK_LO, OK_HI = 0.75, 1.35      # ✅ acceptable
WARN_LO, WARN_HI = 0.50, 2.00  # ⚠️ limite ; au-delà => ❌

# Estimations de la plus grande dimension réelle, en cm.
EST = {
    "fruits": {
        "un grain de pavot": 0.1, "une lentille": 0.5, "une myrtille": 1.2,
        "une framboise": 2.0, "une cerise": 2.2, "une fraise": 3.5,
        "une figue": 5.0, "un citron vert": 5.0, "une pêche": 7.0,
        "un citron": 8.0, "une pomme": 8.0, "un avocat": 12.0,
        "une poire": 12.0, "un poivron": 12.0, "une tomate cœur de bœuf": 10.0,
        "une banane": 20.0, "une carotte": 20.0, "une papaye": 25.0,
        "une grosse mangue": 15.0, "un épi de maïs": 25.0, "un chou-fleur": 20.0,
        "une courgette": 25.0, "une salade": 20.0, "une aubergine": 25.0,
        "une courge butternut": 30.0, "un concombre": 30.0, "une noix de coco": 15.0,
        "un gros chou frisé": 30.0, "un ananas": 30.0, "un melon": 18.0,
        "un melon miel": 22.0, "une grosse salade romaine": 30.0,
        "une botte de blettes": 40.0, "un poireau": 45.0,
        "une petite pastèque": 30.0, "un potiron": 40.0,
    },
    "fish": {
        "un œuf de lompe": 0.2, "une crevette grise": 5.0, "un anchois": 12.0,
        "une petite sardine": 10.0, "une gambas": 15.0, "un éperlan": 15.0,
        "un hareng": 25.0, "un maquereau": 30.0, "un rouget": 20.0,
        "une truite": 30.0, "une dorade": 30.0, "un bar": 40.0, "une sole": 30.0,
        "un petit saumon": 40.0, "un tacaud": 25.0, "un beau maquereau": 40.0,
        "un saumon": 70.0, "un brochet": 60.0, "un cabillaud": 70.0,
        "un gros bar": 60.0, "une truite de mer": 50.0, "une lotte": 70.0,
        "un congre": 150.0, "un turbot": 50.0, "un saumon d'Atlantique": 80.0,
        "un gros brochet": 90.0, "un jeune thon": 60.0, "un colin": 60.0,
        "un jeune esturgeon": 80.0, "un gros saumon": 100.0, "un jeune silure": 80.0,
        "un thon rouge": 200.0, "un jeune espadon": 150.0, "un gros thon": 250.0,
        "un petit requin": 100.0, "un thon géant": 300.0,
    },
    "cheeses": {
        "une miette de parmesan": 0.5, "un dé de feta": 1.5,
        "une crotte de chèvre": 4.0, "un bouton de chèvre frais": 4.0,
        "un Babybel": 4.5, "un Saint-Marcellin": 8.0,
        "un crottin de Chavignol": 6.0, "un Rocamadour": 6.0, "un Cabécou": 6.0,
        "un Chaource": 11.0, "un Coulommiers": 13.0, "un Camembert": 11.0,
        "un Reblochon": 14.0, "un Saint-Nectaire": 21.0, "un Munster": 15.0,
        "un Pont-l'Évêque": 11.0, "un Maroilles": 13.0, "un Livarot": 12.0,
        "un Vacherin": 20.0, "un Morbier": 35.0, "un Bleu d'Auvergne": 20.0,
        "un Cantal entre-deux": 40.0, "une Tomme de Savoie": 20.0,
        "un Roquefort": 20.0, "une meule de Reblochon": 14.0,
        "un Brie de Meaux": 36.0, "un Époisses entier": 10.0,
        "un Beaufort (part de meule)": 30.0, "une Mimolette vieille": 20.0,
        "une Fourme d'Ambert": 19.0, "une grosse Tomme": 25.0,
        "un Comté (quart de meule)": 35.0, "un Gruyère": 55.0,
        "un Emmental (gros bloc)": 80.0, "une demi-meule de Comté": 60.0,
        "une meule de Comté": 60.0,
    },
    "animals": {
        "une coccinelle": 0.7, "une abeille": 1.3, "un escargot": 3.0,
        "une souris": 8.0, "un poussin": 8.0, "un hamster": 10.0,
        "un rouge-gorge": 14.0, "une grenouille": 8.0, "un lézard": 15.0,
        "un hérisson": 25.0, "un rat": 25.0, "un écureuil": 20.0,
        "un caneton": 15.0, "un chaton": 20.0, "un lapereau": 20.0,
        "un lapin": 40.0, "un chiot": 30.0, "un canard": 55.0, "une poule": 45.0,
        "un chat adulte": 45.0, "un petit chien": 40.0, "un renardeau": 35.0,
        "un koala": 70.0, "un raton laveur": 50.0, "un blaireau": 70.0,
        "un chien moyen": 60.0, "un renard": 70.0, "un petit singe": 40.0,
        "un castor": 80.0, "un gros matou": 50.0, "un beagle": 50.0,
        "un lapin géant": 70.0, "un bouledogue": 50.0, "un labrador (chiot)": 40.0,
        "un petit mouton": 80.0, "un gros toutou": 80.0,
    },
}


def verdict(ratio):
    if OK_LO <= ratio <= OK_HI:
        return "OK"
    if WARN_LO <= ratio <= WARN_HI:
        return "LIMITE"
    return "PROBLEME"


growth = json.load(open("src/data/fetalGrowth.json"))["weeks"]
summary = {}

for cat in ["fruits", "fish", "cheeses", "animals"]:
    items = json.load(open(f"src/data/categories/{cat}.json"))["items"]
    rows, prev_size, non_mono = [], None, []
    counts = {"OK": 0, "LIMITE": 0, "PROBLEME": 0}

    for it in items:
        week, name = it["week"], it["name"]
        foetus = growth[str(week)]["sizeCm"]
        est = EST[cat][name]
        ratio = est / foetus
        v = verdict(ratio)
        counts[v] += 1
        rows.append((week, name, foetus, est, ratio, v))
        if prev_size is not None and est < prev_size:
            non_mono.append((week, name, est, prev_size))
        prev_size = est

    summary[cat] = (rows, counts, non_mono)

    print(f"\n{'=' * 78}\n{cat.upper()}  —  "
          f"OK {counts['OK']} | limite {counts['LIMITE']} | problème {counts['PROBLEME']}"
          f"\n{'=' * 78}")
    for week, name, foetus, est, ratio, v in rows:
        if v != "OK":
            flag = "!!" if v == "PROBLEME" else " ~"
            print(f"{flag} S{week:<3} {name:<30} fœtus {foetus:>5} cm | "
                  f"objet ~{est:>5} cm | x{ratio:.2f}")
    if non_mono:
        print(f"\n  -- Régressions de taille ({len(non_mono)}) : "
              "l'item est plus petit que celui de la semaine précédente")
        for week, name, est, prev in non_mono:
            print(f"     S{week}: {name} (~{est} cm) < semaine précédente (~{prev} cm)")

print(f"\n{'=' * 78}\nRÉCAPITULATIF\n{'=' * 78}")
print(f"{'catégorie':<12} {'OK':>4} {'limite':>7} {'problème':>9} {'régressions':>12}")
for cat, (rows, counts, non_mono) in summary.items():
    print(f"{cat:<12} {counts['OK']:>4} {counts['LIMITE']:>7} "
          f"{counts['PROBLEME']:>9} {len(non_mono):>12}")
