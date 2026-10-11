Tickets 20 à 25 (backlog `.doc/backlog.csv`)

# Outillage de création des avatars SVG

Plan d'exécution destiné à un agent qui reprend le travail sans l'historique de la conversation. Il décrit le constat, les six chantiers, leur ordre, et les règles à respecter.

## Contexte

Les avatars Chibi Manga d'Erudizz sont générés par `buildCustomAvatarSvg()` dans `js/modules/ui/avatars.js`. Un trophée apporte un skin complet (espèce, coupe, tenue, teintes) gagné par invocation aléatoire sur la page trophées (`js/modules/managers/trophies-manager.js`, `js/modules/managers/rewards-manager.js`).

Lire avant toute intervention :

- `AGENTS.md`, section « Règles de Design des Avatars SVG & Trophées RPG » (règles absolues : capes, yeux, bouche, oreilles, espèce chat, armes, sangles).
- `.claude/skills/avatars-svg/SKILL.md` (ordre des 13 calques, recette d'un trophée, lab).
- `.claude/skills/avatars-svg/references/traits-largeur-variable.md` (traits fuseau, plume, calligraphique, anneaux, ceintures, techniques de forme et de volume).

État au 2026-10-11 : trophées terminés `elf` (1), `orc` (2), `paladin` (3), `cat` (4, en validation, ticket 19). Squelettes : `shadow` (5), `vampire` (6).

## Constat

Mesures sur `js/modules/ui/avatars.js` :

- 2 594 lignes, 210 Ko.
- 110 tracés fuseau ou plume précalculés, écrits en longues suites de points `L` : 54 000 caractères, un quart du fichier. Pour modifier un trait, il faut régénérer le tracé avec `.claude/skills/avatars-svg/scripts/tapered-path.mjs`, puis retrouver l'ancien texte au caractère près pour le remplacer.
- La main qui serre une arme est recopiée 11 fois, la signature par défaut `skin = { base: '#ffd4a3', shadow: '#f0be8d' }` 26 fois.
- Les éléments symétriques (oreilles, griffes, mèches de tempes, brassards) sont écrits deux fois à la main.
- Les repères anatomiques sont des nombres magiques recalculés à chaque création (largeur de taille, position des mains, courbes des bras).
- Chaque vérification visuelle passe par un script jetable (environ 60 pendant la session du 2026-10-11).
- Le dessin n'existe que dans du code : impossible de l'ouvrir dans un éditeur vectoriel.

## Ordre conseillé

1. Ticket 20 (boîte à outils) et ticket 21 (script d'aperçu) : gain immédiat dès le prochain personnage.
2. Ticket 22 (repères anatomiques) et ticket 23 (découpage par trophée).
3. Ticket 24 (bibliothèque SVG éditable) : dépend de 20 et 23.
4. Ticket 25 (lab piloté par les données) : indépendant, à faire au passage.

## Ticket 20 : boîte à outils `avatar-kit`

Créer `js/modules/ui/avatar-kit.js`, module ES6 sans dépendance, importé par `avatars.js`.

#### Fonctions à fournir

| Fonction | Rôle | Origine |
| --- | --- | --- |
| `fuseau(d, largeur, echantillons)` | trait épais au centre, fin aux bouts | `tapered-path.mjs`, profil `fuseau` |
| `plume(d, largeur)` | épais au départ, effilé à l'arrivée (griffes, racines, branches, séparations de mèches) | profil `plume` |
| `calligraphique(d, largeur)` | plein et délié selon l'angle | profil `calligraphique` |
| `sablier(d, largeur)` | bouches | profil `sablier` |
| `openRing(cx, cy, rx, ry, ouverture, angle, largeur)` | anneau ouvert (boucles d'oreille) | `scripts/open-ring.mjs` |
| `crescent(cx, cy, r, a0, a1, k)` | ombre ou lumière en croissant : arc sur le cercle puis retour par un arc de rayon `k * r` (1.35 par défaut) | arbre d'invocation |
| `rimHighlight(cx, cy, r, a0, a1, retrait, largeur)` | reflet fin en fuseau qui suit le bord d'un cercle, en retrait de 1.4 à 1.8 | arbre d'invocation |
| `mirror(d, axe)` | symétrie d'un attribut `d` : `x -> 100 - x` dans le repère de l'avatar, `x -> -x` dans le repère local d'un groupe | partout |
| `gripHand(skin)` | main qui serre une poignée, à l'origine du groupe de l'arme : ellipse `rx 3.2 ry 3.3` plus deux séparations de doigts en fuseau 0.65 | 11 copies actuelles |
| `beltOnWaist(xl, xr, cy, hauteur)` | ceinture fuseau `M xl,cy Q 50,cy+2.4 xr,cy` de largeur `1.35 * hauteur`, et `dyAt(x) = 4.8 t (1 - t)` pour recentrer boucles et sacoches | référence, section « Ajuster une ceinture » |
| `fitBand(courbeExt, courbeInt, t0, t1, u0, u1)` | bande qui épouse un membre : échantillonne deux courbes de Bézier, relie les points, gonfle le polygone de 0.35 | brassards du chat |
| `spikesArc(a0, a1, n)` | piques ou mèches en arc autour du crâne (base sur ellipse rx 30 ry 26, pointe obtuse sur rx 42 à 45, longueur et inclinaison alternées) | coupes du chat |
| `SKIN_DEFAULT` | constante `{ base: '#ffd4a3', shadow: '#f0be8d' }` pour remplacer les 26 copies | |

Le calcul de `taperedPath` est pur (pas de DOM) : il tourne tel quel dans le navigateur. Garder `tapered-path.mjs` comme source unique et le faire réexporter par `avatar-kit.js`, ou déplacer le cœur dans `avatar-kit.js` et faire importer ce module par les scripts du skill.

#### Migration

1. Avant toute modification, rendre une planche de référence de tous les avatars (ticket 21, ou script provisoire) : 8 tenues de base garçon et fille, 4 trophées garçon et fille, corps et portrait, deux carnations.
2. Remplacer chaque tracé précalculé par l'appel qui l'a produit. Les lignes centrales d'origine figurent dans les commentaires `NOTE ... généré depuis ...` quand elles existent ; sinon, les retrouver en lisant le premier et le dernier point du tracé, ou redessiner la ligne centrale et accepter un écart visuel inférieur à 0.3 unité.
3. Rendre la même planche et comparer au pixel (Pillow, `ImageChops.difference`). Tolérance : différences limitées à l'anticrénelage.
4. Les fonctions gardent les mêmes signatures publiques (`buildCustomAvatarSvg`, `renderAvatarSvg`, `renderAvatarHeadSvg`, `getAvatarPresetById`, palettes, `RPG_TROPHIES`).

#### Points d'attention

- Calcul au rendu : `buildCustomAvatarSvg` est appelé des dizaines de fois par l'atelier avatar (miniatures). Mettre en cache le résultat de chaque appel de trait (clé `profil|d|largeur|echantillons`) si le temps d'ouverture de l'atelier dépasse 100 ms.
- Ne jamais utiliser de dégradé SVG (`linearGradient`, `radialGradient`) : Chrome ne les affiche pas quand ils sont définis dans un SVG masqué (`display:none`).
- Un tracé courbe sans `fill` est rempli en noir : un trait filaire porte `fill="none"`, un trait converti porte `fill="couleur"` et aucun `stroke`.

## Ticket 21 : script officiel d'aperçu

Créer `scripts/avatar-preview.mjs`.

- Usage : `node scripts/avatar-preview.mjs <id|base> [--zoom visage|mains|ceinture|queue|x,y,l,h] [--teintes] [--sortie fichier.png]`.
- Charge `js/modules/ui/avatars.js` dans Node avec un bouchon minimal : `globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} }; globalThis.window = globalThis; globalThis.document = { addEventListener() {}, querySelector: () => null, getElementById: () => null };`, et un paramètre `?v=Date.now()` dans l'import pour éviter le cache de module.
- Produit une planche : fille et garçon, corps entier (`viewBox 0 -34 100 156`) et portrait (`viewBox 0 -34 100 102`), fond `#f4eadd`. Avec `--teintes`, ajoute brun `#5a2d0c`, blond `#d99a38`, roux `#8a3c08`, noir `#1c1917` et une carnation foncée.
- Rendu PNG par `rsvg-convert` (installé). Zoom : recadrer le `viewBox` de la planche.
- Documenter l'usage dans `.claude/skills/avatars-svg/SKILL.md` (section « Lab de test ») et supprimer `gen-apercus.mjs` et `gen-apercu-global.mjs` s'ils deviennent redondants.

## Ticket 22 : repères anatomiques dans `anatomy.json`

Créer `js/modules/ui/avatars/anatomy.json` (ou un module JS exporté si l'import JSON pose problème sans bundler).

Contenu attendu :

- Crâne : ellipse universelle `cx 50 cy 26 rx 35 ry 31`, début de frange vers `y 4`.
- Cadrages : corps `0 -34 100 156`, portrait `0 -34 100 102`.
- Largeur de taille mesurée par tenue (xl, xr) : garçon 1 `37.4-62.6`, ninja `36.25-63.75`, mage `35.95-64.05`, archer garçon `37.45-62.55`, fille 1 `36.65-63.35`, guerrière `39.05-60.95`, sorcière `35.45-64.55`, archère `38-62`, elfe `36.1-63.9`, orc `36.2-63.8`, paladin `36.1-63.9`, chat `38-62`.
- Bras fille archère et chat : extérieur gauche `M33 63 C26 67.5 24 74.5 27 81.5`, intérieur gauche `27 81.5 C30 81.5 32.5 77.5 35 73.5` ; extérieur droit `M67 63 C74 66.5 76 70.5 75 75.5`, intérieur droit `75 75.5 C72.5 77.5 69.5 75.5 66 71.5`. Relever les autres tenues.
- Points de main par tenue (exemples : archère gauche `27, 81.5`, droite `76, 75.5` ; ninja `75.4, 81` ; paladin épée `76, 79`).
- Épaules et sangles : `y 61.5 à 65` entre `x 31 et 38.5` à gauche, `61.5 et 69` à droite ; bas des sangles dans `x 36.5 à 63.5` (règle 13 d'`AGENTS.md`).
- Oreilles : décalages `translate(0 d)` humain 4.8, elfe 6, orc 5.5 ; rapprochement elfe 2.6, orc 2.4 ; humain centres `23.4` et `76.6`.
- Intégrer le script de mesure de taille (rendu `legs` + `body` en noir opaque, 20 px par unité, lecture de la ligne `cy` avec Pillow) dans `scripts/avatar-preview.mjs` ou un script voisin.

## Ticket 23 : découper `avatars.js` par trophée

- `js/modules/ui/avatars/base.js` : palettes `BASE_*` et `ALL_*`, `BOY_BASE`, `GIRL_BASE`, coupes et tenues de base, espèces, `buildCustomAvatarSvg`.
- `js/modules/ui/avatars/trophies/elf.js`, `orc.js`, `paladin.js`, `cat.js` : teintes propres, coupes, tenue, modèles d'armes, entrée de `RPG_TROPHIES`.
- `js/modules/ui/avatars.js` devient un index qui réexporte exactement la même API publique : aucun import ailleurs dans le projet ne doit changer (`avatar-modal.js`, `trophies-manager.js`, `rewards-manager.js`, `roadmap.js`, `results-manager.js`, `test-avatars.html`).
- Attention aux imports circulaires : `avatars.js` importe `player.js`, et `rewards-manager.js` importe `RPG_TROPHIES`.
- Mettre à jour les chemins cités dans `AGENTS.md`, le skill et `.doc/guide-technique-avatars-svg.md`.

## Ticket 24 : bibliothèque de pièces SVG éditables

But : permettre à Nicolas de dessiner une pièce dans Inkscape ou Figma, puis à l'agent de la brancher.

- Dossier `assets/avatar-parts/<trophée>/` : un fichier `.svg` par pièce (`tail.svg`, `ears.svg`, `hair-back-girl.svg`, `hair-front-boy.svg`, `outfit-body.svg`, `weapon.svg`...).
- Repère commun : chaque fichier a le `viewBox="0 -34 100 156"` de l'avatar complet, pour que les pièces se superposent sans recalage.
- Couleurs réglables en variables CSS : `fill="var(--hair)"`, `var(--skin)`, `var(--skin-shadow)`, `var(--mouth)`, `var(--eye-dark)`, `var(--eye-light)`. Le SVG final de l'avatar porte `style="--hair: ...; --skin: ..."`. Prévoir un fichier de prévisualisation qui fixe des valeurs par défaut, pour que la pièce reste lisible dans l'éditeur.
- Script `npm run build-avatars` (ajouter `"build-avatars": "node scripts/build-avatar-parts.mjs"` dans `package.json`) : lit le dossier, nettoie les métadonnées d'éditeur (Inkscape `sodipodi:*`, `inkscape:*`, identifiants inutiles), arrondit les coordonnées à 2 décimales, génère `js/modules/ui/avatars/parts.generated.js` exportant une chaîne par pièce. Pas de chargement à la volée : il multiplierait les requêtes et casserait le mode hors ligne de la PWA.
- Un trait à largeur variable dessiné à la main dans l'éditeur reste un aplat : pas de conversion à prévoir. Un trait simple (`stroke`) peut être converti par `avatar-kit` si on veut le fuseau.
- Interdits rappelés : pas de dégradé SVG, pas de filtre, pas de `clipPath` à identifiant fixe (plusieurs avatars coexistent dans la page et les identifiants entreraient en collision).
- Commencer par une pièce pilote : la queue du chat (`getCatTail`).

## Ticket 25 : lab piloté par les données

`test-avatars.html` code en dur les légendes Espèce et Classe (table `LEGENDS` ajoutée pour le paladin et le chat). Ajouter à chaque entrée de `RPG_TROPHIES` les champs `speciesIcon`, `speciesText`, `classIcon`, `classText`, et les lire dans le lab. Les emoji s'affichent en carrés dans un navigateur sans police emoji : préférer les icônes Bootstrap Icons (`bi-*`) déjà chargées.

## Règles de travail

- Ne jamais committer sans l'accord explicite de Nicolas pour ce commit précis. `git add` est libre.
- Aucune ligne `Co-Authored-By` ni mention d'outil dans les messages de commit.
- Format de commit : `[id] Résumé court`, avec le mouvement de backlog dans le même commit (ligne déplacée vers `.doc/archives/backlog-archive-AAAA-MM-JJ.csv` avec `date_fin`).
- `npm run update-version` avant un commit qui change le rendu.
- `node --check` sur chaque fichier JS modifié, puis contrôle sans erreur console de `http://localhost:8000/test-avatars.html` et de `http://localhost:8000/index.html` (page Trophées, atelier avatar).
- Ne jamais modifier `BASE_HAIR_COLORS`.
- Rédaction : français, vouvoiement envers Nicolas, pas de tiret cadratin, commentaires de code annotés `NOTE`, `ANCHOR`, `SECTION`.
