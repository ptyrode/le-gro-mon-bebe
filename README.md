# Lé gro mon bébé 🍼

Appli web **PWA mobile-first** qui suit la croissance du fœtus semaine après semaine, avec des comparaisons fun et personnalisables — 🐟 poissons, 🧀 fromages, 🐾 animaux — au lieu des classiques fruits et légumes.

> Projet perso, privé (pour les proches), ton décalé assumé. Pas de compte, pas de backend : tout vit dans le navigateur.

## Stack

| Élément | Choix |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Langage | TypeScript |
| UI | React 19 + Tailwind CSS 4 |
| Stockage | `localStorage` (clé `lgmb:v1`) |
| PWA | `app/manifest.ts` + service worker maison (`public/sw.js`) |
| Hébergement | Vercel |

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
```

Autres scripts : `npm run build` (build de prod), `npm run lint`.

> Pour tester sur un mobile du réseau local, l'IP doit figurer dans `allowedDevOrigins` (`next.config.ts`) — sinon Next bloque les requêtes `/_next/*` cross-origin et l'appli reste sur le splash.

## Structure

```
src/
├── app/          # App Router : layout, page unique, manifest, icônes
├── components/   # Onboarding, Dashboard, Timeline, Settings, BottomNav
├── data/         # fetalGrowth.json (SA 4→40) + categories/*.json
├── hooks/        # usePregnancy (useSyncExternalStore sur le localStorage)
└── lib/          # types, chargement des données, calcul SA, storage
```

## Fonctionnement

L'utilisateur saisit sa **date des dernières règles (DDR)**. La semaine de grossesse en **semaines d'aménorrhée (SA)** s'en déduit directement — c'est l'unité des données médicales, donc aucune conversion. Chaque semaine de 4 à 40 est associée à une taille, un poids et, dans la catégorie choisie, un objet de comparaison avec son texte rigolo.

⚠️ Les valeurs de croissance sont des **ordres de grandeur à visée ludique**, pas un outil de suivi médical.

## Documentation

- [`SPECS.md`](SPECS.md) — spécifications détaillées et décisions
- [`TODO.md`](TODO.md) — ce qu'il reste à faire
- [`AGENTS.md`](AGENTS.md) — consignes pour les agents de code