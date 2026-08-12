#!/usr/bin/env python3
import json

OK_LO, OK_HI = 0.75, 1.35      # ✅ acceptable
WARN_LO, WARN_HI = 0.50, 2.00  # ⚠️ limite ; au-delà => ❌

EST = {
    "fruits": {
        "une graine de pavot": 0.1,
        "une graine de sésame": 0.25,
        "une lentille": 0.5,
        "une myrtille": 1.2,
        "une framboise": 2.0,
        "une cerise": 2.5,
        "une fraise": 3.5,
        "un abricot": 4.5,
        "un citron vert": 5.5,
        "une pêche": 7.5,
        "un avocat": 13.0,
        "un poivron": 14.0,
        "une carotte": 17.0,
        "une banane": 19.0,
        "une aubergine": 22.0,
        "un épi de maïs": 23.0,
        "un concombre": 25.0,
        "une courgette": 27.0,
        "une papaye": 28.0,
        "une courge butternut": 30.0,
        "une salade romaine": 32.0,
        "un ananas et ses feuilles": 34.0,
        "un chou frisé": 36.0,
        "une botte de blettes": 38.0,
        "un pied de céleri": 40.0,
        "un poireau": 42.0,
        "un pied de rhubarbe": 44.0,
        "un chou-fleur et ses feuilles": 45.0,
        "une courge spaghetti": 47.0,
        "un chou chinois": 48.0,
        "un régime de bananes": 50.0,
        "une pastèque": 51.0,
        "une citrouille": 53.0,
        "un cardon": 55.0,
        "un pied de chou de Bruxelles": 58.0,
        "un daikon": 60.0,
        "un potiron géant": 62.0,
        "une courge trombone": 66.0,
    },
    "fish": {
        "une perle de caviar": 0.1,
        "un œuf de lompe": 0.2,
        "un œuf de saumon": 0.5,
        "un alevin tout juste éclos": 1.0,
        "un krill": 1.8,
        "un hippocampe nain": 2.5,
        "une crevette grise": 3.5,
        "une coque": 4.5,
        "une civelle": 6.0,
        "un petit anchois": 8.0,
        "une sardine": 14.0,
        "un éperlan": 16.0,
        "un rouget": 18.0,
        "un chinchard": 20.0,
        "un hareng": 23.0,
        "une truite portion": 25.0,
        "un maquereau": 28.0,
        "une dorade royale": 30.0,
        "une sole": 31.0,
        "un merlan": 32.0,
        "un tacaud": 34.0,
        "un mulet": 36.0,
        "une plie": 38.0,
        "un cabillaud de portion": 40.0,
        "un lieu jaune": 42.0,
        "une truite de mer": 43.0,
        "un merlu": 45.0,
        "un turbot": 46.0,
        "un lieu noir": 47.0,
        "un jeune brochet": 49.0,
        "une raie bouclée": 50.0,
        "un saint-pierre": 51.0,
        "une lotte": 53.0,
        "un maigre": 54.0,
        "une roussette": 55.0,
        "un homard": 56.0,
        "un beau bar de ligne": 57.0,
        "un saumon sauvage": 62.0,
    },
    "cheeses": {
        "une paillette de parmesan": 0.1,
        "une miette de roquefort": 0.2,
        "une miette de pecorino": 0.5,
        "un dé de feta": 1.2,
        "une bille de mozzarella": 1.8,
        "une bouchée de Boursin": 2.5,
        "une portion de Vache qui rit": 3.5,
        "un Babybel": 4.5,
        "un crottin de Chavignol": 6.0,
        "un Saint-Marcellin": 8.0,
        "un Camembert": 11.0,
        "un Coulommiers": 13.0,
        "un Reblochon": 14.0,
        "un Munster": 19.0,
        "un Bleu d'Auvergne": 20.0,
        "un Saint-Nectaire": 21.0,
        "une Mimolette": 22.0,
        "un Vacherin Mont d'Or": 24.0,
        "un Ossau-Iraty": 26.0,
        "un Brie de Melun": 28.0,
        "un Bleu de Gex": 30.0,
        "un Morbier": 32.0,
        "un Gouda": 33.0,
        "une meule de raclette": 34.0,
        "un Brie de Meaux": 36.0,
        "un Bethmale": 38.0,
        "un Cantal": 40.0,
        "un Laguiole": 41.0,
        "une Abondance": 43.0,
        "un Cheddar": 45.0,
        "un Salers": 47.0,
        "un Grana Padano": 48.0,
        "un Beaufort": 50.0,
        "un Sbrinz": 52.0,
        "un Gruyère": 55.0,
        "un Comté": 60.0,
        "une meule d'emmental": 65.0,
        "une meule d'Emmental de Savoie": 67.0,
    },
    "animals": {
        "un œuf de fourmi": 0.1,
        "un puceron": 0.2,
        "une fourmi": 0.5,
        "une coccinelle": 0.8,
        "une abeille": 1.5,
        "un frelon": 2.5,
        "un escargot": 3.5,
        "une sauterelle": 4.5,
        "une grenouille": 6.0,
        "une souris": 8.0,
        "un hamster": 14.0,
        "un rouge-gorge": 15.0,
        "une taupe": 16.0,
        "un rat": 20.0,
        "un écureuil": 22.0,
        "un merle": 25.0,
        "un hérisson": 27.0,
        "un cochon d'Inde": 28.0,
        "un furet": 29.0,
        "un chaton de deux mois": 31.0,
        "un lapereau": 32.0,
        "un pigeon": 34.0,
        "un chihuahua": 36.0,
        "un chat de quatre mois": 38.0,
        "un carlin": 40.0,
        "une poule": 42.0,
        "un lapin": 44.0,
        "un chat adulte": 46.0,
        "un renardeau": 47.0,
        "un canard colvert": 48.0,
        "un beagle": 50.0,
        "un raton laveur": 52.0,
        "un bouledogue français": 53.0,
        "un renard": 55.0,
        "un blaireau": 56.0,
        "un cocker": 57.0,
        "un agneau nouveau-né": 58.0,
        "un porcelet": 63.0,
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
        foetus = growth[str(week)]["size"]
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
