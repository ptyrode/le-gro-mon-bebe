# Lé gro mon bébé — Spécifications v1

Appli web **PWA mobile-first** qui suit la croissance du fœtus semaine après semaine, avec des comparaisons fun et personnalisables (poissons, fromages, animaux…) au lieu des classiques fruits/légumes.

> Projet perso, privé (pour les proches), ton décalé assumé. Pas de compte, pas de backend de données : tout vit dans le navigateur.

---

## 1. Stack technique

| Élément             | Choix                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------ |
| Framework           | **Next.js** (App Router)                                                                   |
| Langage             | TypeScript                                                                                 |
| Styling             | **Tailwind CSS** (rapide, mobile-first)                                                    |
| Hébergement         | **Vercel** (free tier) — [le-gro-mon-bebe.vercel.app](https://le-gro-mon-bebe.vercel.app/) |
| Repo                | **GitHub** `github.com/ptyrode/le-gro-mon-bebe` (compte perso, privé)                      |
| Stockage            | **localStorage** (zéro backend pour les données user)                                      |
| PWA                 | Service Worker + manifest (`next-pwa` ou config manuelle)                                  |
| Formulaire feedback | **Vercel Serverless Function** + **Resend** (mail vers Pierrick)                           |
| Qualité de code     | **ESLint + Prettier + Stylelint**, conf reprise du projet Aubade (`npm run lint:fix`)      |
| Textes              | **next-intl** sans routing i18n — clés dans `public/locales/fr/translations.json`          |

> Le repo vit sur le **compte GitHub perso**, à part de tout ce qui touche au travail. Vercel s'y branche nativement : déploiement automatique à chaque push sur `main`.

---

## 2. Modèle de données (localStorage)

Une seule grossesse en v1 (multi-grossesses = v2).

```json
{
    "version": 1,
    "pregnancy": {
        "lastPeriodDate": "2026-02-15", // DDR (dernières règles), ISO date, saisie par l'utilisateur
        "category": "cheeses", // clé de catégorie choisie
        "createdAt": "2026-06-30T10:00:00Z"
    },
    "notifications": {
        "enabled": true,
        "lastSeenWeek": 16 // dernière semaine affichée en notif
    }
}
```

### Calcul de la semaine de grossesse

- L'utilisateur saisit la **date des dernières règles (DDR)**.
- Les données médicales de croissance sont indexées en **semaines d'aménorrhée (SA)** = semaines depuis les dernières règles. Match direct, pas de conversion.
- Semaine de grossesse (SA) actuelle = `floor((aujourd'hui - DDR) / 7 jours)`.
- Bornes : on affiche de la **semaine 4** (premières données fiables) à la **semaine 41** (grossesse prolongée).
- Les cas limites ne sont plus écrasés silencieusement : `pregnancyStatus()` (`src/lib/pregnancy.ts`) distingue `future`, `implausible` (> 2 ans), `tooEarly` (< S4), `born` (au-delà de 41 SA) et `ongoing`. Chacun a son écran dédié dans le Dashboard.
- La DDR est validée **à la saisie** par `validateLastPeriodDate()`, dans l'onboarding comme dans les réglages.

---

## 3. Écrans & parcours

### 3.1 Onboarding (première visite)

- Écran d'accueil avec le pitch en une phrase + ton rigolo.
- Saisie de la **date des dernières règles (DDR)** (date picker mobile-friendly).
- Choix de la **catégorie de comparaison** (cartes visuelles : 🐟 poissons, 🧀 fromages, 🐾 animaux, 🍎 fruits…).
- Demande d'autorisation des **notifications** (peut être différée).
- → sauvegarde en localStorage, redirection vers l'écran principal.

### 3.2 Écran principal (semaine en cours)

- Grande illustration / emoji de l'équivalence de la semaine (ex : « Cette semaine, bébé fait la taille d'un **camembert** 🧀 »).
- Taille (cm) + poids (g) du fœtus.
- Phrase fun générée pour la semaine.
- Indicateur de progression (semaine X / 41).
- Bouton pour **changer de catégorie** à la volée.

### 3.3 Timeline / historique

- Liste scrollable des semaines passées et à venir avec leurs équivalences.
- Permet de revoir les comparaisons précédentes et d'anticiper les suivantes.

### 3.4 Réglages

- Modifier la date des dernières règles (DDR).
- Changer de catégorie.
- Activer/désactiver les notifications.
- Lien vers le **formulaire d'idées**.
- (v2) Gérer plusieurs grossesses.

### 3.5 Formulaire « Propose une idée »

- Champ texte libre (+ email optionnel).
- Envoi → Serverless Function → Resend → mail à Pierrick.
- Pas de stockage, pas de modération : juste un tuyau vers la boîte mail.

---

## 4. Notifications (Option A — v1)

Pas de push server-side (incompatible avec un déploiement statique simple).

**Comportement** : à **l'ouverture de l'app**, on compare la semaine de grossesse actuelle avec `notifications.lastSeenWeek`.

- Si une nouvelle semaine a commencé → on affiche une **notification navigateur locale** (`Notification` API) + un encart in-app (« Bébé a grandi ! Il fait maintenant la taille d'un… »).
- On met à jour `lastSeenWeek`.

> Option B (vrai push hebdo sans ouvrir l'app, via VAPID + serverless) = **hors scope v1**, noté pour plus tard.

---

## 5. Données de comparaison

### 5.1 Données médicales (taille/poids par semaine)

- Indexées par semaine de grossesse (SA), de la semaine 4 à 41.
- **Fait** : pas d'API publique JSON exploitable → données hardcodées dans **`src/data/fetalGrowth.json`** (valeurs de référence standard, voir `src/data/README.md`).
- Structure :

```json
{
    "weeks": {
        "12": { "size": 5.4, "weight": 14, "measure": "lcc" },
        "40": { "size": 50.5, "weight": 3300, "measure": "total" }
    }
}
```

### 5.2 Catégories de comparaison

- Un JSON par catégorie dans **`src/data/categories/`**, chaque entrée associée à une semaine.
- **Fait** : 4 catégories générées — `fruits.json`, `fish.json`, `cheeses.json`, `animals.json` (38 items chacune, semaines 4 → 41). Noms de fichiers et clés en anglais.
- Structure :

```json
{
    "key": "cheeses",
    "label": "Fromages",
    "emoji": "🧀",
    "description": "Parce qu'un bébé, ça se savoure.",
    "items": [
        {
            "week": 12,
            "name": "un Rocamadour",
            "emoji": "🧀",
            "funText": "Fond dans la bouche."
        },
        {
            "week": 40,
            "name": "une meule de Comté",
            "emoji": "🧀",
            "funText": "C'est l'heure !"
        }
    ]
}
```

> **Décidé** : mapping par **semaine** (chaque item est associé à une semaine précise). Simple à gérer pour la v1.

---

## 6. PWA

- `manifest.json` : nom, icônes, couleur de thème, `display: standalone`.
- Service Worker : mise en cache de l'app shell pour fonctionnement offline.
- Installable sur l'écran d'accueil mobile.

---

## 7. Découpage de dev proposé

1. ✅ **Bootstrap** : Next.js + TS + Tailwind + structure de dossiers.
2. ✅ **Données** : JSON médical + 4 catégories.
3. ✅ **Logique** : calcul de la semaine (`src/lib/pregnancy.ts`), hook localStorage (`usePregnancy` via `useSyncExternalStore`), sélection d'équivalence.
4. ✅ **Écrans** : onboarding → dashboard → timeline → réglages (nav mobile en bas).
5. 🟡 **Notifications** : Option A implémentée (notif locale à l'ouverture si nouvelle semaine). Reste à tester en vrai sur mobile.
6. ✅ **PWA** : `app/manifest.ts` + `public/sw.js` (network-first navigations, stale-while-revalidate assets) enregistré via `ServiceWorkerRegister` (prod only). Icônes biberon générées (192/512 + maskable, apple-icon 180, favicon icon.png).
7. 🟡 **Formulaire feedback** : v1 en `mailto:` (constante `FEEDBACK_EMAIL` dans `Settings.tsx`). À remplacer par serverless + Resend.
8. ✅ **Déploiement** : en ligne sur **https://le-gro-mon-bebe.vercel.app/**, branché sur le repo GitHub (redéploiement auto à chaque push sur `main`).

---

## 8. Décisions & questions restantes

**Décidé :**

- Saisie de la **DDR** (dernières règles), pas la date de conception.
- Mapping des équivalences **par semaine**.
- Styling avec **Tailwind CSS**.
- Repo sur **GitHub** perso (`ptyrode`), privé — projet perso, strictement séparé des dépôts professionnels.

**Fait depuis :**

- Données médicales + 4 catégories (fruits, poissons, fromages, animaux) générées dans `src/data/`.
- Bootstrap Next.js 16 + TypeScript + Tailwind 4 (App Router, `src/`).

- Déploiement Vercel branché sur GitHub, appli en ligne et PWA vérifiée en prod (manifest, service worker, icônes).

**Reste à clarifier :**

1. Relire les `funText` des catégories et ajuster le ton si besoin.
2. Recalibrer les données de comparaison pour que taille **et** poids collent à ceux du fœtus (cf. `TODO.md`).
