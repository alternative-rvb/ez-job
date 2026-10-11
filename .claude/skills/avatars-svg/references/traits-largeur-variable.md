# Traits à largeur variable (stroked-to-filled path)

Technique à n'appliquer **que lorsque l'utilisateur la demande** pour un élément précis. Par défaut, garder les traits existants.

## Principe

`stroke-width` applique une épaisseur uniforme sur tout le tracé : le trait reste « tube », sans la finesse d'un trait d'encre manga. Pour un trait qui s'effile, on remplace le tracé filaire par **un tracé fermé rempli** dont les deux bords sont calculés de part et d'autre de la trajectoire :

1. Prendre la trajectoire actuelle (Bézier quadratique `Q` ou cubique `C`).
2. Échantillonner N points le long de la courbe, avec la tangente en chacun.
3. Décaler chaque point selon la normale, d'une demi-largeur `w(t)` donnée par un **profil** (paroi supérieure à `+w/2`, paroi inférieure à `-w/2`).
4. Fermer le tracé : paroi supérieure, bout, paroi inférieure à rebours, bout, `Z`.
5. Rendre avec `fill="<couleur de l'ancien stroke>"`, **sans** `stroke`.

C'est l'équivalent SVG de l'outil Largeur d'Illustrator (« outline stroke » avec profil de largeur variable).

## Profils disponibles

L'utilisateur demande un effet par son nom (guide utilisateur : `.doc/guide-effets-traits-svg.md`). Correspondance nom cité, alias anglais et profil du générateur :

| Nom cité | Alias | Forme | Usage typique |
|---|---|---|---|
| `fuseau` | spindle, football | pointe, ventre épais au centre, pointe | reflet de mèche, cil inférieur |
| `plume` | pinceau, taper-out, brush feather | départ large arrondi, pointe d'aiguille à l'arrivée | paupière supérieure, mèche fine, pli qui s'estompe |
| `comete` | comète, flare, expanding wedge | pointe au départ, tête large arrondie à l'arrivée | plume dans l'autre sens de tracé |
| `sablier` | diabolo, waisted, hourglass, étranglement central | épais aux deux bouts, centre très fin (~15 %) | bouches, pli de tissu tendu |
| `calligraphique` | plume à bec, broad-nib, courbe en S | épaisseur selon la DIRECTION de la tangente (bec à 45°) : délié en montée vers la droite, plein en descente, constant sur une droite | mèche ondulée, ruban, drapé |

Choisir `plume` ou `comete` selon le sens du tracé existant : le bout épais doit tomber là où l'utilisateur le veut. Les profils reçoivent `(t, angle)` : seul `calligraphique` utilise l'angle de la tangente (bec fixé à -45° dans le script, à ajuster si l'utilisateur demande un autre angle).

Un bout qui garde de l'épaisseur reçoit automatiquement un arrondi (équivalent de `stroke-linecap="round"`). Un bout à largeur nulle reste une pointe.

## Générateur

Script sans dépendance : [../scripts/tapered-path.mjs](../scripts/tapered-path.mjs).

```bash
# Un segment : 3 points pour Q, 4 points pour C
node .claude/skills/avatars-svg/scripts/tapered-path.mjs "<x0,y0 x1,y1 x2,y2 [x3,y3]>" <profil> <largeurMax> [échantillons]

# Exemple : bouche souriante actuelle M45 51 Q50 56.5 55 51, stroke-width 2
node .claude/skills/avatars-svg/scripts/tapered-path.mjs "45,51 50,56.5 55,51" sablier 1.8 12

# Tracé de plusieurs segments (mèche longue, boucles) : passer l'attribut d absolu complet (M, C, Q)
node .claude/skills/avatars-svg/scripts/tapered-path.mjs "M 10,50 C 40,0 60,100 90,50 C 120,0 140,100 170,50" calligraphique 6 12
```

Sur un tracé de plusieurs segments, le profil s'étale sur toute la longueur (paramétrage par longueur d'arc) : un `fuseau` est épais au milieu de la chaîne entière, pas de chaque segment. Non pris en charge : commandes relatives (minuscules), `A`, `S`, `T`, `L` et tracés fermés (anneaux). Un segment droit (`line` ou `L`) se passe en `Q` à point de contrôle médian : `M x0,y0 Q xm,ym x1,y1`. Une polyligne à angles vifs (zigzag) se convertit **un fuseau par segment**, concaténés dans le même `d` : décaler à travers un angle vif replierait le bord intérieur. Courbure serrée : si le rayon devient plus petit que la demi-largeur, le bord intérieur se replie ; agrandir la boucle ou réduire la largeur.

Images du guide utilisateur à régénérer après un changement de profil : `node .claude/skills/avatars-svg/scripts/gen-apercus.mjs` puis `node .claude/skills/avatars-svg/scripts/gen-apercu-global.mjs`.

La sortie est l'attribut `d` à coller dans un `<path d="..." fill="..."/>`. Conversion d'une commande SVG en points : `M x0 y0 Q x1 y1 x2 y2` donne `"x0,y0 x1,y1 x2,y2"`, et `M x0 y0 C x1 y1 x2 y2 x3 y3` donne `"x0,y0 x1,y1 x2,y2 x3,y3"`.

Réglages :
- **Largeur max** : partir de l'ancien `stroke-width` et rester proche ou en dessous. Premier test sur les bouches : 2.6 jugé trop épais, 1.8 retenu pour un ancien trait de 2.
- **Échantillons** : 8 pour un trait court (bouche, cil), 12 à 16 pour une courbe longue (mèche, pli). Au-delà, le `d` grossit sans gain visible à l'échelle de l'avatar.
- **Coordonnées statiques** : le tracé dépend uniquement de la géométrie, pas des couleurs. On le génère une fois et on colle le `d` dans le template ; la couleur reste dynamique (`fill="${hairColor}"`, `fill="${mouthColor}"`). Le script vit dans `.claude/` et n'est pas servi au navigateur : ne pas l'importer depuis `js/`. Si un jour un tracé doit varier à l'exécution, déplacer la fonction dans `js/modules/ui/` d'abord.

## Où cela s'appliquerait dans le code actuel

Inventaire au 2026-10-11 dans `js/modules/ui/avatars.js` : 178 `stroke-width`, tous uniformes. Candidats, par contexte :

| Contexte | Tracé actuel | Profil conseillé | Points d'attention |
|---|---|---|---|
| Paupière supérieure (G et F, `faceFeatures`) | `M30 38 Q37 34 44 38` (G), `M30 38 Q37 33 44 38` (F), `stroke-width 2.2`, `stroke="${hairColor}"` | `plume` pour l'œil gauche (tracé actuel du coin externe x=30 vers l'interne x=44), `comete` pour l'œil droit (tracé de x=56 interne vers x=70 externe) | Garder le groupe en `mix-blend-mode: multiply` et la teinte `${hairColor}`. Œil droit : symétrie `x' = 100 - x`. Garçons : toujours aucun cil, seul ce trait change. |
| Trait inférieur fille | `M32 46.0 Q37 48.1 42 46.0`, `stroke-width 1` | `fuseau` | Ne pas épaissir au point de masquer les reflets ; les 3 pointes de cils restent des polygones. |
| Bouche souriante | **Fait le 2026-10-11** : ancien `M45 51 Q50 56.5 55 51`, `stroke-width 2` | `sablier`, largeur 1.8 | La couleur reste `getSkinMouthColor(skin)`. |
| Bouche orc | **Fait le 2026-10-11** : ancienne `line` 41,52 vers 59,52, `stroke-width 2.6` | `sablier`, largeur 2.2 | Les coins tombants restent un trait filaire. Les crocs sont dessinés après. |
| Reflets et ombres de mèches (coupes fille, ex. lignes `rgba(255,255,255,0.22)`) | `C` à 4 points, `stroke-width 1.3..1.6` | `fuseau` ou `calligraphique` | Couleur en `fill` avec la même opacité rgba. |
| Mèches fines nouvelles | n/a | `plume`, `comete` ou `calligraphique` | Pour une mèche **pleine**, garder la règle des blocs larges ; cette technique sert aux mèches fines et aux séparations entre blocs. |
| Coutures, plis, liserés et ourlets de tenue | **Fait le 2026-10-11** (ticket 14) : plis de jupe de base, plis et ourlet de la robe sorcière, coutures ninja et mage, liserés archer, guerrière et archère, bordure du plastron elfe, zigzags de la cape orc | `fuseau`, largeur = ancien `stroke-width` x 1.2 environ, sauf épais traits de fourrure : 1.6 pour les zigzags de la cape orc (2.6 jugé trop épais) | Règle demandée par l'utilisateur : toute nouvelle couture ou tout nouveau pli de vêtement se dessine en `fuseau`. |
| Diadèmes, bandeaux et rubans de chapeau | **Fait le 2026-10-11** (ticket 14) : diadème elfe `M 28,26 Q 50,21 72,26` largeur 3.8, bandeau orc `M 26,17 Q 50,12 74,17` largeur 4.4, bandeau du mage et diadème de base fille `M 21.5,25 C 32.5,18 67.5,18 78.5,25` largeur 5.8, ruban du chapeau sorcière `M 26.5,18.5 Q 50,28.5 73.5,19.5` largeur 6.2 | `fuseau`. Trait fin : environ 2 x l'ancien `stroke-width`. Bande pleine : ligne médiane de la bande, largeur 1.2 x son épaisseur | Validé par l'utilisateur : « un peu plus d'épaisseur » que l'ancien trait pour jouer sur la profondeur. |
| Ceintures | **Fait le 2026-10-11** (ticket 14) : les 10 ceintures `rect` (base G/F, ninja et son liseré rouge, mage, archer, guerrière, sorcière, archère, elfe, orc) | `fuseau` sur `M xl,cy Q 50,cy+2.4 xr,cy` (cy = y + h/2), largeur 1.35 x h, 16 échantillons | **Largeur** : `xl`/`xr` = bords de la silhouette `legs` + `body` de la tenue mesurés à la ligne `cy` (rendu raster, voir « Ajuster une ceinture » ci-dessous), jamais une largeur commune. **Centrage** : chaque élément posé sur la ceinture (boucle, gemme, rivet, sacoche, pagne) est enveloppé dans `<g transform="translate(0 dy)">` avec `dy = 4.8 t (1 - t)`, `t = (xc - xl) / (xr - xl)`, `xc` = centre horizontal de l'élément (dy = 1.2 au centre). |
| Mains (séparations des doigts) | **Fait le 2026-10-11** : 20 mains ouvertes des bras (base G/F, tenues de base, elfe, orc, paladin) sans aucun trait ; 8 anciens `line` `stroke-width 0.5..0.6` des mains qui tiennent une arme (dagues elfe, hache orc, épée paladin) | `fuseau` largeur 0.65, `fill="${skin.shadow}"` | Règle : **toute main porte des séparations de doigts en fuseau**. Main ouverte (ellipse `cx, cy, rx, ry`) : deux traits de `(cx ∓ 1, cy + 0.3)` à `(cx ∓ 1.2, cy + ry - 0.5)`, légèrement bombés vers l'extérieur. Poing sur une arme : traits horizontaux sur la poignée, comme avant. |
| Contours de chapeau (sorcière) | **Fait le 2026-10-11** : anciens contours par superposition d'une forme sombre sous une forme claire (épaisseur constante) | `fuseau` : flancs du cône `M 20,18 Q 36,-32 86,-33` (3) et `M 86,-33 Q 62,-4 76,16` (2.6) ; bord = ellipse `48,20 rx 48 ry 11.5` remplie + deux demi-arcs `openRingCenterline(..., 50, ±90)`, devant 4.2, arrière 3, dans le groupe `witch-hat-brim` tourné de -6° | Ordre : bord, puis cône (premier plan, base courbe `Q 48,26` qui suit la perspective du bord), puis ruban d'un coin du cône à l'autre. Un contour fait de deux formes superposées se remplace par une forme pleine + des traits fuseau. |
| Anneaux d'oreille orc | **Fait le 2026-10-11** : ancienne `ellipse` `rx 1.6 ry 2` en `stroke-width 1.1` | `fuseau` largeur 1.3 sur un cercle `R 1.8` ouvert à 80 % du tour, ouverture à cheval sur le rebord de l'oreille, généré par `scripts/open-ring.mjs` (voir « Anneau ouvert ») | Un anneau fermé n'est pas pris en charge par le générateur ; un cercle ouvert est plus naturel et reste lisible. |
| Coutures de torse et lacets | **Fait le 2026-10-11** (ticket 14) : couture piquée de l'archer (un fuseau de 2.4 de long tous les 4, largeur 1.2), lacets croisés du plastron elfe (un fuseau par segment, largeur 1.3) | `fuseau` | Une couture pointillée devient une suite de petits fuseaux plutôt qu'un `stroke-dasharray`. |
| Bandages, sangles | segments droits | aucun | Gardés en trait uniforme. |
| Sangles, liens croisés, ligatures (hache orc) | segments droits | aucun | Un segment droit gagne peu ; garder `stroke-linecap="round"`. |

## Anneau ouvert (boucle d'oreille, anneau de nez, maillon)

Le générateur ne gère pas les tracés fermés : un anneau se dessine **ouvert**, ce qui est aussi plus naturel (il semble traverser le lobe). Script dédié :

```bash
node .claude/skills/avatars-svg/scripts/open-ring.mjs <cx> <cy> <rx> <ry> [ouverture %] [angle ouverture °] [largeur] [échantillons]
# Anneau d'oreille orc gauche (référence validée)
node .claude/skills/avatars-svg/scripts/open-ring.mjs 15.8 34 1.6 2 20 -90 1.3
```

- **Ouverture** : 20 % du tour (anneau à 80 %), centrée sur l'angle donné. `-90` = en haut, là où l'anneau entre dans le lobe ; pour un anneau de nez ou un maillon suspendu, orienter l'ouverture vers le point d'accroche.
- **Épaisseur** : profil `fuseau`, maximum à l'opposé de l'ouverture (le bas pour une boucle d'oreille), pointes aux deux bords de l'ouverture.
- **Méthode** : 8 points de l'ellipse sur l'arc, convertis en cubiques Catmull-Rom (`openRingCenterline`), puis `taperedPath`.
- **Placement (règle validée)** : l'ouverture se pose **à cheval sur le rebord extérieur de l'oreille**, les deux pointes sur l'oreille, le corps de l'anneau pendant à l'extérieur. Calcul : prendre un point du rebord (milieu `t = 0.5` de la quadratique pointe vers lobe), sa normale sortante `n`, centre = point + `n` x 0.8 (moins que `R cos 36° = 1.46` pour que le rebord traverse l'ouverture), angle d'ouverture = direction de `-n`. Les coordonnées sont celles du dessin de l'oreille : l'anneau suit les `translate` du groupe d'oreilles. Orc : `R 1.8`, centres (16.29, 40.81) à -36° et (83.71, 40.81) à -144°.
- Rendu : `<path d="..." fill="<couleur du métal>"/>`, sans `stroke`.

## Ajuster une ceinture

1. Mesurer la taille : rendre seulement `legs` + `body` de la tenue (peau en noir opaque) dans un SVG `viewBox="0 70 100 30"` à 20 px par unité (`rsvg-convert`), puis lire le premier et le dernier pixel opaque de la ligne `cy` (Pillow). Les bords donnent `xl` et `xr`.
2. Générer la bande : `taperedPath("M xl,cy Q 50,cy+2.4 xr,cy", "fuseau", 1.35 * h, 16)`.
3. Recentrer chaque élément posé dessus avec le `dy` de la table. Centre horizontal d'un `rect` : `x + width / 2` (attention à ne pas lire `stroke-width` à la place de `width`).
4. Contrôler en rendu zoomé : pointes au ras de la silhouette, boucle au milieu de la bande.

## Piège : tracé ouvert sans `fill="none"`

Un `<path>` courbe sans attribut `fill` est rempli en **noir** par défaut (lentille entre la courbe et sa corde), même s'il n'a qu'un `stroke`. Tout trait filaire doit porter `fill="none"` ; un trait converti par cette technique porte au contraire `fill="<couleur>"` et aucun `stroke`. Les cas présents (plis de jupe de base et de robe sorcière) ont disparu avec le passage en fuseau.
