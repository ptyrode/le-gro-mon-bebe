# TODO — Lé gro mon bébé

> En ligne : **https://le-gro-mon-bebe.vercel.app/** — redéploiement automatique à chaque push sur `main`.
>
> Ce fichier ne liste que ce qui reste à faire. Le fonctionnement et les décisions produit sont décrits dans [`README.md`](README.md).

- [ ] **Styleguide** (prévu le 13/11/2026) : une route `/styleguide` qui présente les composants de base, extraits au passage des écrans où ils se répètent.
    - **Carte** blanche arrondie (`rounded-3xl bg-white p-5 shadow-sm`), présente une dizaine de fois.
    - **Boutons** : orange plein, rouge plein, crème, lien rouge.
    - **Pastilles** : catégories, sélecteur de grossesse, actions de la liste des grossesses.
    - **Champs** texte et date, avec libellé, aide et erreur.
    - **Interrupteur** des notifications.
    - Couleurs et typographie (variables de `src/app/styles/globals.css`).
- [ ] **Configurer les événements GA4 dans GTM.** Le code pousse six événements dans le `dataLayer` (`src/utils/track.ts`, types dans `src/@types/analytics.d.ts`), mais tant qu'aucune balise ne les relaie, ils n'arrivent pas dans GA4.
    - Pour chaque nom : un déclencheur « Événement personnalisé » et une balise « Google Analytics : Événement GA4 ». Chaque paramètre demande une « Variable de couche de données » du même nom.
    - `view_change` (`view`), `category_change` (`category`, `source`), `wikipedia_click` (`category`, `week`, `item`), `pwa_install` (`outcome`), `notifications_toggle` (`enabled`, `permission`), `support_click`.
    - ⚠️ `pwa_install` ne remonte que sur Android : iOS n'expose pas `beforeinstallprompt`.
    - **D'abord, vérifier la liaison GTM → GA4 déjà en place** : mode Aperçu de GTM (Tag Assistant) sur le site, la balise Google (`G-…`) doit se déclencher à l'initialisation ; puis GA4 → Rapports → Temps réel, ou Admin → DebugView, doit voir la visite. Vérifier aussi que la mesure améliorée de GA4 suit les « changements de page basés sur l'historique du navigateur », sans quoi les navigations entre `/`, `/timeline` et `/settings` ne compteront pas comme des pages vues.
    - Méthode retenue : générer un JSON de conteneur à importer dans GTM (Admin → Importer un conteneur, en fusion), plutôt que de tout créer à la main. Il faudra l'ID de mesure GA4 (`G-…`).
- [ ] **Formulaire de feedback** : remplacer le `mailto:` par une Serverless Function + Resend.
- [ ] **Sortir les JSON vers un stockage Vercel** (Edge Config, Blob) : à trancher seulement si le besoin d'éditer le contenu sans redéployer se fait sentir. Aujourd'hui les JSON partent dans le bundle, sans requête réseau, et `public/` est déjà servi par le CDN de Vercel.
