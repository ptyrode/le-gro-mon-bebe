# TODO — Lé gro mon bébé

## 🔴 Prioritaire — revoir/calibrer les données de comparaison
Les catégories actuelles (`src/data/categories/*.json`) ont été générées pour donner une **impression de taille croissante**, mais les valeurs **réelles ne collent pas** aux données du fœtus.

**Exemple** : semaine 40 → fœtus ≈ 51 cm / 3,4 kg, mais une *meule de Comté* pèse ~40 kg. Incohérent.

**À faire** : pour chaque item, choisir un objet dont la **taille et le poids réels** correspondent (à peu près) à ceux du fœtus de la semaine (voir `src/data/fetalGrowth.json`).
- Recaler les 4 catégories : `fruits`, `poissons`, `fromages`, `animaux`.
- Cible : cohérence taille (cm) **et** poids (g) à chaque semaine.
- Garder le ton rigolo des `funText`.

## 🟡 Après validation des data — illustrations
Une fois les data au poil, générer une **image illustrative rigolote par item** (ex : un munster avec une petite tête de bébé mignonne).
- ⚠️ Volume : ~35 items × 4 catégories ≈ **140 images** → réfléchir au périmètre (une seule catégorie d'abord ? style commun ?).
- ⚠️ Capacité génération d'images : à cadrer (voir note ci-dessous / discuter avec Pierrick).

## Reste du découpage (cf. SPECS.md §7)
- [ ] Formulaire feedback : remplacer le `mailto:` par Serverless Function + Resend.
- [ ] Déploiement Vercel (import depuis GitHub `ptyrode/le-gro-mon-bebe`).
- [ ] Commit final (Pierrick committera tout d'un coup une fois terminé).
- [ ] Tester les notifications (Option A) sur mobile réel.
