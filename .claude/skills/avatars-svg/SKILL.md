---
name: avatars-svg
description: Création et retouche des avatars SVG Chibi Manga d'Erudizz et des trophées skins (elf, orc, paladin, cat, shadow, vampire, necromancer, fairy, scholar, pirate, dragon, astronaut). À utiliser dès qu'il faut créer ou modifier une coupe de cheveux, une tenue, une espèce, une teinte de peau/yeux/cheveux, un preset de trophée dans js/modules/ui/avatars.js, ou travailler dans le lab test-avatars.html.
---

# Avatars SVG et trophées skins

Un avatar est un SVG généré à la volée par `buildCustomAvatarSvg()` dans `js/modules/ui/avatars.js`, à partir d'une configuration.

#### Organisation du code (depuis le ticket 23)

- `js/modules/ui/avatars.js` : point d'entrée à l'API inchangée (réexports), registres `RPG_STYLES`, `RPG_OUTFITS`, `RPG_TROPHIES` assemblés, `AVATAR_SHORT_IDS`, `buildCustomAvatarSvg`, `AVATARS`, rendus par identifiant.
- `js/modules/ui/avatars/base.js` : palettes `BASE_*` et `ALL_*`, `getSpeciesEars`, `BOY_BASE`, `GIRL_BASE`, coupes et tenues de base.
- `js/modules/ui/avatars/trophies/<id>.js` (elf, orc, paladin, cat, shadow, vampire, necromancer, fairy, scholar, pirate, dragon, astronaut) : tenue `OUTFIT_*`, coupes `<ID>_STYLES`, fiche `<ID>_TROPHY` et traits d'espèce propres (oreilles et queue du chat, cornes de shadow). **Ne lire que le fichier du trophée concerné.**
- `js/modules/ui/avatar-kit.js` : traits à largeur variable et utilitaires de dessin.
- `js/modules/ui/avatars/mannequin.js` : **mannequin neutre** (tête nue, corps nu, gris `#dcdcdc`, clés `mannequin_boy`, `mannequin_girl`, `mannequin`, presets `MANNEQUIN_BOY` et `MANNEQUIN_GIRL`), gabarit de départ de chaque futur trophée : mêmes ancrages que tous les personnages. Section « Mannequin neutre » du lab avec export SVG par calques ; `node scripts/avatar-preview.mjs mannequin`. Jamais tiré ni débloqué (hors `RPG_TROPHIES`).

Configuration d'un avatar :

```js
{ type: 'boy'|'girl', styleId | styleKey, outfitId | outfitKey, species, hairColor, eyeColor, skinColor, mode: 'full'|'head' }
```

Un trophée ne donne plus une image : il apporte un **skin complet** (coupe + tenue + espèce) et débloque ses **teintes** (peau, yeux, cheveux) que le joueur peut ensuite réutiliser.

Les règles de design absolues (capes, yeux et cils, bouche, oreilles, crocs, armes, sangles, contraste peau/cheveux) sont dans la section « Règles de Design des Avatars » d'`AGENTS.md`. Les coordonnées détaillées par calque sont dans [.doc/guide-technique-avatars-svg.md](../../../.doc/guide-technique-avatars-svg.md). Ce skill ne les répète pas : il dit **où** et **comment** construire.

## Ordre réel d'empilement (le code fait foi)

`buildCustomAvatarSvg()` empile 13 emplacements, du fond vers l'avant :

| # | Emplacement | Source |
|---|---|---|
| 1 | `backEquipment` (cape, arme dans le dos) | tenue |
| 2 | `shadow` (ombre au sol) | socle |
| 3 | `hairBack` | coupe (`getHairBack(color)`) |
| 4 | `legs` | tenue |
| 5 | `body` | tenue |
| 6 | `belt` | tenue |
| 7 | `arms` | tenue |
| 8 | `headBase` (cou, oreilles d'espèce, crâne) | socle |
| 9 | `faceFeatures` (yeux, nez, bouche, crocs d'espèce) | socle |
| 10 | `hairFront` | coupe (`getHairFront(color)`) |
| 11 | `eyebrows` | socle (couleur des cheveux) |
| 12 | `headAccessory` (diadème, couronne) | tenue |
| 13 | `handItem` (arme en main) | tenue |

En mode `head`, seuls 3, 8, 9, 10, 11 et 12 sont rendus. ViewBox réels : `0 -34 100 156` (corps entier) et `0 -34 100 102` (tête). Le guide indique encore `0 -22 100 144` : c'est obsolète.

## Ce qui est réutilisable (socle, ne pas dupliquer)

À ne jamais recopier dans un trophée : on le paramètre.

- **Anatomie** : `BOY_BASE` et `GIRL_BASE` (`legs`, `arms`, `headBase`, `faceFeatures`, `eyebrows`, `shadow`). Elles reçoivent `skin`, `eye`, `species` et `hairColor` et s'adaptent seules.
- **Traits d'espèce** : `getSpeciesEars(species, skin, gender)` pour les oreilles, et les blocs conditionnels `species === '...'` dans `faceFeatures` pour les crocs ou les canines. Une nouvelle espèce ajoute **une branche** ici, pas une nouvelle tête.
- **Palettes de départ** : `BASE_HAIR_COLORS`, `BASE_EYE_COLORS`, `BASE_SKIN_COLORS`. Elles sont intangibles (voir AGENTS.md, règle 6).
- **Couleur de bouche** : `getSkinMouthColor(skin)`, ou champ `mouth` de la carnation.
- **Moteur** : `buildCustomAvatarSvg()`, `renderAvatarSvg()`, `renderAvatarHeadSvg()`, `getAvatarPresetById()`. Toute partie de tenue peut être une chaîne ou une fonction `(skin) => string` pour que la peau visible suive la carnation.
- **Garde-fou accessoires d'écolier** : dès que `species !== 'human'` ou qu'une `styleKey`/`outfitKey` est présente, le bandeau et le diadème de base sont masqués automatiquement.

## Ce qu'apporte un trophée skin

| Apport | Où l'ajouter | Forme |
|---|---|---|
| Preset du trophée (G et F) | `RPG_TROPHIES` | objet avec `boyPreset` et `girlPreset` |
| Coupe exclusive | `RPG_STYLES` | `<id>_boy` / `<id>_girl` avec `getHairBack` et `getHairFront` |
| Tenue complète | `OUTFIT_<NOM>` puis `RPG_OUTFITS` | objet avec les 8 emplacements de tenue |
| Teinte de peau | `ALL_SKIN_COLORS` | `{ id, name, base, shadow, mouth, isTrophyReward: true }` |
| Teinte d'yeux | `ALL_EYE_COLORS` | `{ id, name, dark, light, isTrophyReward: true }` |
| Teinte de cheveux | `ALL_HAIR_COLORS` | `{ id, name, hex, isTrophyReward: true }` |
| Traits de visage d'espèce | `getSpeciesEars()` et `faceFeatures` de BOY_BASE et GIRL_BASE | branche `species === '<espece>'` |
| Couleurs de carte | `AVATARS.<id>` (`color`, `accent`) et `AVATAR_SHORT_IDS` | |

Un trophée vit dans son fichier `avatars/trophies/<id>.js` ; l'ajouter aux imports et aux registres de `avatars.js`. Les modèles de code de chaque objet sont dans [references/modeles-trophee.md](references/modeles-trophee.md).

## Recette : créer ou finaliser un trophée skin

1. **Fiche** : partir de l'entrée existante dans `RPG_TROPHIES` (plus aucun squelette : les six trophées sont faits ; un nouveau trophée part du modèle de `avatars/trophies/vampire.js`). Définir espèce, classe, palette (tenue principale, cape plus foncée de la même famille, peau, yeux, cheveux contrastés).
2. **Teintes** : ajouter dans les catalogues `ALL_*` uniquement les teintes nouvelles, avec `isTrophyReward: true`. Ne jamais toucher aux `BASE_*`.
3. **Espèce** : si l'espèce a des oreilles ou des dents propres, ajouter la branche dans `getSpeciesEars()` et dans `faceFeatures` (garçon ET fille). Si l'espèce est `human`, ne rien ajouter.
4. **Coupes** : créer `<id>_boy` et `<id>_girl` dans `RPG_STYLES`, en blocs larges, avec `hairBack` partant de la base obligatoire `hairBase('court' | 'mi-long' | 'long', color)` (voir « Règle des cheveux »).
5. **Tenue** : créer `OUTFIT_<NOM>` avec ses 8 emplacements (laisser `""` ceux qui sont inutiles), l'enregistrer dans `RPG_OUTFITS`. Armes construites sur l'axe `X=0`, origine au milieu de la poignée, placées par un seul `<g transform="translate(main) rotate(a)">` qui contient aussi la main qui serre, dessinée en dernier (premier plan). Voir AGENTS.md règle 9 « Prise en main » et « Groupes sans orphelins ». Modèles de référence : `PALADIN_SWORD_MODEL`, `boy-ninjato`, `girl-sword`.
6. **Presets** : compléter `boyPreset` et `girlPreset` (`styleKey`, `outfitKey`, `species`, `skinColor`, `hairColor`, `eyeColor`, mêmes teintes pour les deux), la liste `rewards`, puis retirer `status: 'locked'` et passer `badge` à `'Nouveau'`.
7. **Vérifier** : `node --check` sur les fichiers modifiés, `npm run avatars:check` (aucun élément perdu par rapport à HEAD, aucun `undefined` ou `NaN` rendu), puis `node scripts/avatar-preview.mjs <id>` pour le contrôle visuel, puis le lab.

## Aperçu en une commande : scripts/avatar-preview.mjs

- `node scripts/avatar-preview.mjs <elf|orc|paladin|cat|shadow|base> [--zoom visage|mains|ceinture|queue|x,y,l,h] [--teintes] [--style n --outfit n] [--sortie f.png] [--svg]` écrit une planche PNG (garçon et fille, corps entier et portrait, fond crème) et affiche son chemin ; il suffit ensuite de lire l'image. `--zoom` recadre en gros plan, `--teintes` ajoute quatre couleurs de cheveux et une peau foncée, `base` prend les personnages de départ.
- `npm run avatars:check` compare le code au dernier commit : clés de coupes, tenues, trophées et exports toujours présents, identifiants de groupes toujours rendus, aucun `undefined`, `NaN` ou `[object` dans un SVG (`--geometrie` ajoute l'écart géométrique). À lancer après toute modification de structure.
- `--un fille:portrait --taille 160` produit une image minimale (un personnage, un plan) pour un contrôle rapide.
- Avant une refonte du code : `node scripts/avatar-snapshot.mjs avant.json`, modifier, `node scripts/avatar-snapshot.mjs apres.json`, puis `node scripts/avatar-compare.mjs avant.json apres.json` (écart géométrique maximal toléré 0.3, structure identique). 300 avatars couverts (bases, tenues et coupes RPG croisées, espèces, trophées).
- Les traits à largeur variable se calculent au rendu avec `js/modules/ui/avatar-kit.js` (`fuseau`, `plume`, `comete`, `sablier`, `calligraphique`, `openRing`, `crescent`, `rimHighlight`, `mirror`, `gripHand`, `fitBand`, `beltOnWaist`, `SKIN_DEFAULT`) : écrire `d="${fuseau('M ... C ...', largeur, échantillons)}"` avec la ligne centrale, jamais une suite de points `L` précalculée. `scripts/tapered-path.mjs` et `open-ring.mjs` du skill en sont la ligne de commande.

## Lab de test : test-avatars.html

- Servir le projet (`npm run dev`) puis ouvrir `http://localhost:8000/test-avatars.html`. C'est l'utilisateur qui valide visuellement : présenter le résultat et attendre son retour, sans commit.
- **Export SVG** : les boutons « Exporter SVG » (bases garçon et fille) et « SVG » (trophées) téléchargent le personnage affiché en un fichier avec un calque nommé par couche (`inkscape:groupmode="layer"`, ouvrable dans Inkscape, Figma, Illustrator), via l'option `layers: true` de `buildCustomAvatarSvg`. Nicolas peut ainsi corriger un tracé et le renvoyer.
- La section « Nouveaux Trophées & Skins RPG » lit directement `RPG_TROPHIES`, `RPG_STYLES` et `RPG_OUTFITS` : un trophée bien déclaré y apparaît sans toucher au HTML.
- Tester systématiquement : garçon et fille, corps entier et tête seule, zoom, et au moins une carnation claire et une foncée quand la peau est réglable.
- Avant de rendre la main : vérifier la portée des variables dans les templates (une `${variable}` hors de portée provoque un `ReferenceError` qui casse tout le lab).

## Technique optionnelle : traits à largeur variable

Pour des traits effilés façon encre manga (paupières, bouche, reflets et séparations de mèches, plis et coutures de vêtements), on remplace un `stroke-width` uniforme par un tracé fermé rempli, calculé par décalage normal selon un profil. **Ne l'appliquer que sur demande explicite de l'utilisateur, élément par élément**, sauf une règle déjà actée : les coutures, plis, liserés et ourlets de vêtement, ainsi que les diadèmes, bandeaux, rubans de chapeau et ceintures (profondeur : épais au centre, fins sur les côtés), se dessinent toujours en `fuseau`, coutures piquées et lacets compris, comme les séparations de doigts de toutes les mains (largeur 0.65, ombre de peau). Une ceinture est ajustée à la largeur mesurée de la taille et ses éléments sont recentrés sur sa courbe. Largeurs de référence dans la table d'inventaire de la référence ci-dessous. Il cite l'effet par son nom : `fuseau`, `plume`, `comete`, `sablier` ou `calligraphique`. Anneaux ouverts (boucles d'oreille, maillons) : `scripts/open-ring.mjs`. Méthode, générateur `scripts/tapered-path.mjs` et inventaire des candidats dans le code : [references/traits-largeur-variable.md](references/traits-largeur-variable.md).

## Techniques de forme et de volume

Volume en croissants (une teinte par couche, ombre à l'opposé de la lumière, reflets en fuseau sur le bord), ombre au bout d'une mèche pointue tirée de sa propre courbe, éléments répétés par duplication d'un modèle, brassard qui épouse les courbes du bras, piques en arc, racines et branches en plume : [references/traits-largeur-variable.md](references/traits-largeur-variable.md), section « Techniques de forme et de volume ».

**Cheveux** : ombre et lumière sont retirées de toutes les coupes pour le moment. Nicolas exportera un SVG de référence ; attendre cet exemple avant tout nouvel essai (ticket 16). Essais déjà refusés : croissants pleins (trop marqués), reflets en anneau, reflets en bord de boucle trop épais ; seule piste approuvée à reprendre : « quelques traits seulement ».

## Capuche, bouches et SVG retouchés (trophée 7, Nécromancien)

- **Capuche** : jamais un seul aplat sur la tête. Partie arrière = double ovale dans `hairBack` (derrière le visage, retombe en col sur les épaules) ; partie avant = deux joues en fuseau qui descendent vers les yeux et une pointe de front, dans `headAccessory`, par-dessus la frange. Mèches longues d'un personnage par-dessus les joues : `headAccessory` en fonction `(skin, hairColor, type)`.
- **Types de bouche** : sourire de base, bouche droite `sablier`, ω du chat (ne pas la remplacer) et bouche fille complète (`getFullLipsMouth`, dessin de Nicolas : arc de Cupidon, ouverture en lentille, lèvre inférieure pleine). Couleur de lèvres toujours `mouthColor`.
- **Yeux à blanc noir** (Revenant) : contour, cils et paupières passent en noir via `lashColor`, sinon `multiply` avec un blanc os les rend invisibles.
- **Workflow avec SVG retouché** : Nicolas dépose son export Affinity dans `.tmp/`. Comparer à l'export du lab (`diff`), reprendre ses tracés avec leurs matrices, ne pas corriger sans lui sa géométrie, ne pas y toucher pendant qu'il dessine, et traiter l'export garçon comme base de la fille (ids `boy-...`, cils et mèches de la fille à vérifier).

#### Brèches et mèches (leçons des retouches de cheveux)

- **Brèche** : petite encoche triangulaire découpée dans un bord de cheveux, jamais une ligne. Dans un polygone `L`, une brèche est un aller-retour : `L x1,y L x2,y-h L x3,y`, avec `h` de 4 à 5 et une largeur de 1,2 à 1,6 au pied. Quelques-unes seulement, irrégulièrement espacées : trois sur le bord bas d'un carré, trois sur le côté droit d'une frange droite. Une frange « plus droite » garde un bord bas presque horizontal (y 36), sans V central.
- **Mèche fine** : un seul trait en fuseau (`fuseau(d, largeur, 12 à 14)`, largeur 0,9 à 2,3), de la couleur des cheveux (`${color}`), jamais en noir ou en blanc translucide sauf pour un reflet ou une ombre demandés. On la pose dans les espaces vides ou les creux entre les mèches principales.
- **Courbure** : une mèche ajoutée suit la courbure de la mèche principale voisine (parallèle à son bord), et pas la verticale. Pour « plus de courbure », déplacer la seconde poignée de la courbe, pas le départ. Pour « écarter » ou « décaler », translater tout le tracé.
- **Rythme** : une mèche sur deux plus épaisse (par exemple 2,3 puis 0,9), jamais deux largeurs presque égales.
- **Extrémités** : une tresse ou une mèche longue finit en une seule pointe continue. Pas de pièce ajoutée au bout (triangle, goutte, boule) et pas de bout plat. Une pointe accrochée à la tresse par sa pointe haute (base large en bas) a été essayée puis refusée.
- **Reflets et ombres** : « mettre en fuseau » veut dire garder les mêmes courbes, les mêmes positions et la même opacité, et changer seulement le type de trait. Ne pas redessiner les courbes.
- **Accessoires de chignon** : une baguette est un trait en fuseau courbé, ajusté au diamètre du chignon, à 45°, fin (1,5). Un élastique est un seul trait fin en fuseau à la base, jamais un nœud papillon.
- **Ordre des calques** : les cheveux arrière sont tout au fond, derrière la cape (`headLayers[0]` d'abord dans `fullLayers`).
- **Compréhension des demandes** : « mèche de gauche » désigne le tracé le plus à gauche de la zone en cours. Quand la demande est ambiguë (plusieurs personnages ou plusieurs styles ont le même tracé), n'en modifier qu'un et le dire. Le tracé identique « C 39,33 46,38 50,41 » existait dans trois coupes de filles de base : toujours cibler par ligne ou par identifiant de style.

#### Règle des cheveux : base arrière obligatoire et cheveux avant

Le crâne occupe x 22 à 78 et y 10 à 60 (centre 50, 35). Toute coupe, garçon comme fille, part d'une **base de cheveux arrière** choisie selon la longueur, déclarée par `hairBase('court' | 'mi-long' | 'long', color)` dans `js/modules/ui/avatar-kit.js` (constante `HAIR_BASES`).

| Longueur | Base arrière | Repère |
|---|---|---|
| Court | Cercle `cx 50 cy 30 r 32` (10 à 20 % plus grand que le crâne, ici +14 %) | y -2 à 62 |
| Mi-long | Même règle de largeur, ellipse `rx 32 ry 33 cy 34` qui descend jusqu'au cou | y 1 à 67 |
| Long | Même règle de largeur, ellipse `rx 33 ry 49 cy 51` qui descend jusqu'aux jambes | y 2 à 100 |

- **Mèches arrière (facultatives)** : plus ou moins épaisses, arrondies ou en fuseau (`fuseau`, `plume` pour une pointe de flamme), elles **suivent les courbes de l'ellipse existante** (départ sur le contour, descente le long du bord), jamais un nouveau polygone qui change la silhouette. Largeur 4 à 7, longueurs inégales.
- **Cheveux avant, court** : la calotte de `hairFront` **démarre au point haut de l'ellipse arrière** (y 1 à 2 pour un mi-long ou long, y -2 pour un court), recouvre au minimum le premier tiers du crâne (jusqu'à y 27) et descend **au-dessus des yeux** (bord bas entre y 24 et 32), avec des formes diverses (balayage, brèches, pointes, flammes).
- **Cheveux avant, mi-long et long** : on ajoute à la calotte des **mèches de côté**, arrondies ou en fuseau, qui suivent la courbure naturelle du visage (contour x 22 à 24 entre y 36 et 52 : les mèches restent à x ≤ 21 sur cette plage, jamais devant les joues ou les yeux) et descendent jusqu'au cou (mi-long) ou aux épaules (long).
- **Calques** : `hairBack` est tout au fond, derrière la cape et le corps ; ce qui doit apparaître devant l'épaule ou le buste va dans `hairFront`. Des mèches longues placées seulement dans `hairBack` disparaissent derrière la cape.
- **Fonction de mèche partagée** : quand une coupe répète un motif, une petite fonction en tête du fichier du trophée (`pirateLock`, `dragonTongue`) qui prend couleur, tracé et largeur. Dans `dragonTongue`, la largeur est multipliée par 1,3 : une `plume` rend plus fin que sa largeur nominale.
- **Parité** : garçon et fille d'un même trophée partagent les couleurs ; seule la longueur et les mèches de côté changent.
- **Contrôle** : `node scripts/avatar-preview.mjs <id>` (planche garçon et fille), `--zoom visage` pour la frange, puis `npm run avatars:check`.

Analyse des trophées 1 à 9 (relevé du code, 2026-10-13) : ils utilisent encore l'ancienne base `ellipse cx 50 cy 26 rx 35 ry 30/31` (+25 % de largeur, centrée 9 plus haut que le crâne, bas à y 56 à 57), au lieu de la base ci-dessus. Les filles longues descendent à y 85 à 96 (elfe 93, orc 90, paladin 85, shadow 96, scholar 93), donc conformes à « jusqu'aux jambes ». Les garçons sont courts (y 44 à 56) sauf l'elfe, mi-long (67). La frange démarre à y=4 pour paladin, chat, Shadow, vampire et scholar, soit 9 à 10 sous le point haut de l'ellipse arrière (-5 ou -6), alors que la règle demande le point haut ; l'orc et la Fée y sont presque (la Fée utilise déjà une ellipse de largeur +9 %). Le Nécromancien est un cas à part (capuche en double ovale). Ces coupes sont validées par Nicolas et n'ont **pas** été modifiées : les aligner est un chantier à demander explicitement. Le Corsaire (10) et le Chevalier Dragon (11) suivent la règle.

## État actuel et limites connues

- Trophées terminés, avec leur rareté d'invocation : `elf` (1, épique), `orc` (2, épique), `paladin` (3, épique : humain, peau `sun-bronze`, cheveux Or Solaire `#facc15`, yeux `sky`), `cat` (4, épique : cheveux Violet Félin `#7c3aed` et Lilas Félin `#a78bfa`, yeux `gold`) et `shadow` (5, légendaire : peau Lilas Mystique, cheveux Noir Abyssal `#1e1435`, yeux `amethyst`). `vampire` (6, épique : Noble Duelliste, peau Pâleur Nocturne bleutée très claire `#e6edf8`, cheveux Noir Carmin `#2a0a12`, yeux `ruby`, redingote rouge sang, rapière argentée, canines apparentes, bouche droite). Les six premiers trophées sont terminés. `necromancer` (7, épique : teint `undead-grey`, cheveux Blanc Os, yeux noirs à pupille verte, capuche en deux parties, flamme verte, faux) est fait, avec bouche fille complète pour la fille. `pirate` (10, épique : Corsaire des Mers, tricorne, dreadlocks, sabre, moustache) et `dragon` (11, légendaire : Chevalier Dragon, espèce drakéide, cornes `getDragonHorns`, lance) sont faits. `astronaut` (12, rare : Cosmonaute Explorateur, combinaison blanche et orange, casque relevé dans `hairBack`, drapeau) est fait.
- Traits d'espèce qui suivent la couleur des cheveux : oreilles de chat `getCatEars` (juste avant `hairFront`) et queue `getCatTail` (juste après `backEquipment`, plus sombre que les cheveux). Les cornes de `shadow` (`getShadowHorns`, tracé plume) sont dessinées par-dessus la frange pour que leur base arrondie reste visible.
- Un trophée humain passe `isNewCharacter` à vrai (via `styleKey`/`outfitKey`) : le bandeau, le diadème et le triangle de col orange de la tenue de base sont masqués automatiquement.
- Accessoire de tête sur une chevelure de même famille de couleur : il disparaît. Contraste obligatoire : le diadème du paladin est en métal gris clair `#cbd5e1` (l'acier `#e2e8f0` se fondait dans l'Or Solaire). **Les diadèmes de métal n'ont pas de contour** (seules les gemmes gardent un fin liseré).
- Le cou de tous les personnages est en `skin.shadow` (plus sombre que le visage), jamais en `skin.base`.
- Le joueur peut porter un skin : `player.js` persiste `species`, `styleKey` et `outfitKey` (`cleanSkinKeys`) et l'atelier (`avatar-modal.js`) propose espèces, teintes, coupes et tenues débloquées, avec pastilles « Nouveau ».
- La page trophées est un gacha : gemmes, arbre d'invocation animé, tirage par rareté (Rare 60, Épique 30, Légendaire 10), garantie au 10e tirage, doublon remboursé 5 gemmes (`rewards-manager.js`, `trophies-manager.js`). `js/data/trophies.json` n'est plus la source des cartes.
- Hors du chemin habituel : `resetScore({ trophees: true })` en console remet à zéro skins, gemmes et avatar (voir `.doc/guide-dev-fonctions.md`).
