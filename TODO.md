# TODO — Lé gro mon bébé

> En ligne : **https://le-gro-mon-bebe.vercel.app/** — redéploiement automatique à chaque push sur `main`.
>
> Ce fichier ne liste que ce qui reste à faire. Le fonctionnement et les décisions produit sont décrits dans [`README.md`](README.md).

- [ ] **Configurer les événements GA4 dans GTM.** Le code pousse six événements dans le `dataLayer` (`src/lib/analytics.ts`), mais tant qu'aucune balise ne les relaie, ils n'arrivent pas dans GA4.
    - Pour chaque nom : un déclencheur « Événement personnalisé » et une balise « Google Analytics : Événement GA4 ». Chaque paramètre demande une « Variable de couche de données » du même nom.
    - `view_change` (`view`), `category_change` (`category`, `source`), `wikipedia_click` (`category`, `week`, `item`), `pwa_install` (`outcome`), `notifications_toggle` (`enabled`, `permission`), `support_click`.
    - ⚠️ `pwa_install` ne remonte que sur Android : iOS n'expose pas `beforeinstallprompt`.
- [ ] **Formulaire de feedback** : remplacer le `mailto:` par une Serverless Function + Resend.
- [ ] **Gérer plusieurs grossesses** (voir « Données sur le téléphone » dans le README).
- [ ] **Proposer de clore la grossesse** quand le terme est dépassé, au lieu de l'écran « Bébé devrait être né ! ». Lié au multi-grossesses.
- [ ] **Sortir les JSON vers un stockage Vercel** (Edge Config, Blob) : à trancher seulement si le besoin d'éditer le contenu sans redéployer se fait sentir. Aujourd'hui les JSON partent dans le bundle, sans requête réseau, et `public/` est déjà servi par le CDN de Vercel.
