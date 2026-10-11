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

Sur un tracé de plusieurs segments, le profil s'étale sur toute la longueur (paramétrage par longueur d'arc) : un `fuseau` est épais au milieu de la chaîne entière, pas de chaque segment. Non pris en charge : commandes relatives (minuscules), `A`, `S`, `T`, `L` et tracés fermés (anneaux). Courbure serrée : si le rayon devient plus petit que la demi-largeur, le bord intérieur se replie ; agrandir la boucle ou réduire la largeur.

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
| Plis et drapés de jupe ou de robe | `C` à 4 points, `stroke-width 1..1.2` | `plume` (le pli part de la taille et s'estompe vers l'ourlet) | Voir le bug ci-dessous. |
| Coutures pointillées (liserés `stroke-dasharray`) | `line` + `stroke-dasharray` | aucun | Une couture piquée reste en pointillés : la largeur variable ne s'applique pas aux points de couture. Elle peut s'appliquer au pli qui accompagne la couture. |
| Sangles, liens croisés, ligatures (hache orc) | segments droits | aucun | Un segment droit gagne peu ; garder `stroke-linecap="round"`. |

## Piège : tracé ouvert sans `fill="none"`

Un `<path>` courbe sans attribut `fill` est rempli en **noir** par défaut (lentille entre la courbe et sa corde), même s'il n'a qu'un `stroke`. Cas présents dans le code : plis de jupe de `GIRL_BASE.legs` et plis de la robe de la tenue fille « 3. Sorcière ». Tout trait filaire doit porter `fill="none"` ; un trait converti par cette technique porte au contraire `fill="<couleur>"` et aucun `stroke`.
