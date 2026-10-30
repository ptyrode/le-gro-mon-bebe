import subjects from './data/image-subjects.json' with { type: 'json' };

const SPECIFIC = {
    fruits: `- Plusieurs entrées ne sont PAS un fruit isolé mais un ensemble, à dessiner comme tel :
  « un ananas et ses feuilles », « un régime de bananes », « une botte de blettes »,
  « un pied de céleri », « un pied de rhubarbe », « un chou-fleur et ses feuilles »,
  « un pied de chou de Bruxelles » (la tige entière avec ses boules).
- « une graine de pavot » et « une graine de sésame » sont minuscules : les dessiner
  quand même en gros plan, à la même échelle que les autres.
- « un potiron », « une citrouille », « une courge spaghetti », « un potiron géant » :
  quatre cucurbitacées à différencier nettement par la couleur et la forme.
- « une lentille » est une graine PLATE et ronde, brun-vert, façon petit palet — surtout
  pas une baie sphérique à tige, qui la ferait passer pour un kiwi.
- « une courge trombone » est une courge très LONGUE et RECOURBÉE en col de cygne, vert
  pâle, renflée seulement à son extrémité. Ce n'est pas une courge en forme de poire :
  ainsi dessinée, elle devient un butternut et fait doublon avec la semaine 23.
- « un daikon » est un long radis blanc, pas une carotte.`,
    fish: `- Les premières semaines ne sont pas des poissons : « une perle de caviar »,
  « un œuf de lompe », « un œuf de saumon » sont des œufs ; « un alevin tout juste
  éclos » est un tout petit poisson translucide ; « un krill » est une crevette
  minuscule ; « une civelle » est un bébé anguille transparent.
- « une coque » est un coquillage, « un homard » un crustacé à pinces,
  « un hippocampe nain » un hippocampe : ne pas les dessiner en poissons.
- Les poissons de forme voisine doivent rester distincts : le tacaud, le merlan et
  le merlu ont des silhouettes et des couleurs différentes. Même exigence pour le
  trio argenté « un petit anchois », « une sardine », « un éperlan », qui ressort
  trop souvent en trois silhouettes blanc-bleu interchangeables : l'anchois est
  fin et bleu sombre au dos, la sardine trapue avec une ligne de points sombres,
  l'éperlan menu et translucide.
- Les poissons plats (« une sole », « une plie », « un turbot ») se dessinent de dessus,
  couchés sur le flanc.
- « une roussette » est un petit requin.`,
    cheeses: `- Les premières semaines sont des PORTIONS, pas des fromages entiers :
  « une paillette de parmesan », « une miette de roquefort », « une miette de pecorino »,
  « un dé de feta », « une bille de mozzarella », « une bouchée de Boursin ».
  Les dessiner comme de petits morceaux, avec leur visage de bébé.
- Les dernières semaines sont des MEULES entières, hautes et cylindriques, à croûte
  épaisse : fontina, cheddar, salers, grana padano, beaufort, sbrinz, gruyère, comté,
  emmental.
- Ne pas mettre de trous partout : seul l'emmental en a. Le gruyère n'a pas de trous.
- Les bleus (« un Bleu d'Auvergne », « un Bleu de Gex ») ont des veines bleu-vert.
- « une Mimolette » est une boule orange vif, « un Morbier » a une ligne de cendre noire
  au milieu, « un Camembert » et « un Coulommiers » ont une croûte blanche fleurie — le
  Coulommiers est nettement plus large et plus épais.
- Les fromages de marque (« une portion de Vache qui rit », « un Babybel »,
  « une bouchée de Boursin ») se reconnaissent à leur FORME et à leur COULEUR seules :
  triangle sous alu brillant, palet de cire rouge, cylindre blanc aux herbes. Ne
  reproduire ni logo, ni marque, ni étiquette.`,
    animals: `- « un œuf de fourmi » : un petit œuf blanc nacré avec un visage de bébé, pas une fourmi.
- « un chaton de deux mois », « un chat de quatre mois », « un chat adulte » : trois
  illustrations DISTINCTES, de plus en plus grandes et dégourdies.
- « un lapereau » puis « un lapin », « un renardeau » puis « un renard » : même logique,
  le second est visiblement plus âgé.
- Les races de chiens (chihuahua, carlin, beagle, bouledogue français, cocker) doivent
  être reconnaissables entre elles par les OREILLES, la robe et la silhouette du
  costume, et par leur museau sur le dessus de la capuche.
- Les insectes (abeille, frelon, sauterelle) et l'escargot n'ont NI bouche NI
  sourire sur la capuche : seulement leurs antennes et de petits yeux.`,
    desserts: `- Les premières semaines sont des DÉCORS et des CONFISERIES, pas des gâteaux :
  « un cristal de sucre », « une nonpareille », « un vermicelle en chocolat »,
  « une pépite de chocolat », « une dragée ». Les dessiner en gros plan, à la même
  échelle que les autres.
- Trois pâtisseries LONGUES en feuilletage ou en pâte fine doivent rester
  distinctes : « une jalousie à la framboise » a un dessus FENDU de lamelles qui
  laissent voir la confiture rouge, « un dartois » un dessus PLEIN rayé en losanges,
  « un strudel aux pommes » est un ROULEAU de pâte très fine poudré de sucre glace.
- Les gâteaux ronds de taille voisine doivent se distinguer par leur DÉCOR :
  la galette des rois est dorée et rayée en rosace, le gâteau basque brun et lisse
  quadrillé, la forêt-noire couverte de chantilly et de copeaux de chocolat, la
  tarte tropézienne une brioche ouverte garnie de crème.
- « une colombe de Pâques » est une brioche en forme d'OISEAU aux ailes déployées,
  pas une colombe vivante. « un grand œuf de Pâques » est un œuf en CHOCOLAT.
- AUCUN texte écrit au glaçage, aucun prénom, aucun chiffre en bougie.`,
};

const COSTUME = {
    fruits: `- La capuche est le sujet lui-même, creusé d'une ouverture ronde à l'avant
  dans laquelle s'encadre le visage du bébé.
- Feuilles, tige et pédoncule restent sur le DESSUS de la capuche. Le sujet ne
  porte ni yeux, ni bouche, ni visage dessiné : le seul visage est celui du
  bébé.`,
    fish: `- La capuche est la TÊTE DU POISSON VUE DE FACE : sa gueule ouverte forme
  l'ouverture de la capuche, et le visage du bébé s'y encadre.
- Les yeux du poisson sont AUTORISÉS sur le dessus de la capuche, au-dessus
  du front du bébé, à condition qu'ils restent PLUS PETITS que ceux du bébé.
  JAMAIS de bouche ni de sourire dessiné en plus sur la capuche.
- Ne JAMAIS poser le poisson de profil en travers du crâne comme un chapeau :
  ce n'est pas un poisson posé sur la tête, c'est un costume que bébé porte.
- Le corps, les nageoires et la queue prolongent le costume derrière bébé.
- Pour les poissons plats et les crustacés, les yeux restent petits et
  posés sur le dessus, comme pour les autres.`,
    cheeses: `- Le costume est une COMBINAISON qui habille tout le corps du bébé, surmontée
  d'une CAPUCHE en forme de fromage. Le corps, les bras et les jambes restent
  visibles sous la capuche.
- La capuche est le fromage vu de face, creusé d'une ouverture ronde dans
  laquelle s'encadre le visage, la croûte faisant le tour de l'ouverture.
- Le fromage n'est PAS un disque plat percé d'un trou : bébé le PORTE. Un
  visage encastré dans une meule, avec seulement deux mains et deux pieds qui
  dépassent du contour, est un ÉCHEC.
- Le fromage ne porte ni yeux, ni bouche, ni visage dessiné : le seul visage
  est celui du bébé.
- AUCUN nom, AUCUNE inscription, AUCUN logo gravé ou imprimé sur la croûte ni
  sur l'emballage.`,
    animals: `- La capuche est la TÊTE DE L'ANIMAL, comme sur un pyjama-déguisement du
  commerce : le visage du bébé s'encadre dans une ouverture ronde, juste
  SOUS le front de l'animal.
- Les yeux, le museau, la truffe ou le bec de l'animal sont AUTORISÉS sur le
  dessus de la capuche, au-dessus du front du bébé, à condition :
  · que ses yeux restent PLUS PETITS que ceux du bébé ;
  · qu'il n'y ait JAMAIS de bouche ni de sourire dessiné sur la capuche :
    deux visages qui sourient l'un au-dessus de l'autre est un ÉCHEC.
- Les oreilles, cornes, antennes ou plumes restent sur le DESSUS de la
  capuche, jamais devant le visage.
- Ne JAMAIS poser l'animal entier en travers du crâne comme un chapeau : ce
  n'est pas un animal posé sur la tête, c'est un costume que bébé porte.`,
    desserts: `- Le costume est une COMBINAISON qui habille tout le corps du bébé, surmontée
  d'une CAPUCHE en forme de pâtisserie. Le corps, les bras et les jambes restent
  visibles sous la capuche.
- La capuche est la pâtisserie vue de face, creusée d'une ouverture ronde dans
  laquelle s'encadre le visage. Crème, fruits, bougies et décors restent sur le
  DESSUS de la capuche.
- Pour les pâtisseries longues (éclair, baguette, strudel, bûche, jalousie,
  dartois), le costume
  enveloppe bébé comme un sac de couchage dont seul le visage dépasse.
- La pâtisserie ne porte ni yeux, ni bouche, ni visage dessiné : le seul
  visage est celui du bébé.`,
};

const RECOGNIZABLE = {
    fruits: `on identifie le fruit ou le légume sans hésiter`,
    fish: `on identifie l'animal marin sans hésiter`,
    cheeses: `on identifie le fromage sans hésiter`,
    animals: `on identifie l'animal sans hésiter`,
    desserts: `on identifie la pâtisserie sans hésiter`,
};

export function buildPrompt(category, name) {
    const description = subjects[name];
    const subject = description ? `${name} — ${description}` : name;
    return `Les images jointes sont des RÉFÉRENCES DE STYLE, issues de la même série.
Reproduis exactement leur style, mais PAS leurs sujets.

STYLE
- Illustration cartoon douce, style livre pour enfants, contours arrondis.
- Contour brun foncé net, aplats de couleur mats, ombrage léger :
  aucun reflet brillant, aucun rendu 3D ou plastique.
- Le sujet est porté comme un DÉGUISEMENT par un bébé humain.
  On doit voir son VISAGE HUMAIN entier (joues roses, grands yeux bruns
  brillants, petit nez, bouche souriante, petite mèche de cheveux châtains),
  ses deux PETITES MAINS potelées et ses deux PETITS PIEDS nus.
- Bébé est toujours ASSIS, vu de face, jamais debout ni en pied.
${COSTUME[category]}
- UN SEUL VISAGE dans l'image, et c'est celui du bébé.
- Le costume reste reconnaissable au premier coup d'œil : ${RECOGNIZABLE[category]}.
- Fond uni crème très clair (#FFF4EE), avec une légère ombre au sol.
- Le sujet est centré et ENTIER, avec une marge vide tout autour : rien ne
  touche le bord du cadre, ni les feuilles, ni la crème, ni les oreilles.
  Laisse au moins 10 % d'espace vide au-dessus du point le plus haut.
- Aucun texte, aucun chiffre, aucun logo dans l'image.

PRÉCISIONS SUR LA SÉRIE
${SPECIFIC[category]}

SUJET
${subject}
`;
}
