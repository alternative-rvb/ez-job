---
name: avatars-svg
description: Création et retouche des avatars SVG Chibi Manga d'Erudizz et des trophées skins (elf, orc, paladin, kitsune, shadow, vampire). À utiliser dès qu'il faut créer ou modifier une coupe de cheveux, une tenue, une espèce, une teinte de peau/yeux/cheveux, un preset de trophée dans js/modules/ui/avatars.js, ou travailler dans le lab test-avatars.html.
---

# Avatars SVG et trophées skins

Un avatar est un SVG généré à la volée par `buildCustomAvatarSvg()` dans `js/modules/ui/avatars.js`, à partir d'une configuration :

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

Les modèles de code de chaque objet sont dans [references/modeles-trophee.md](references/modeles-trophee.md).

## Recette : créer ou finaliser un trophée skin

1. **Fiche** : partir de l'entrée existante dans `RPG_TROPHIES` (les trophées 3 à 6 sont des squelettes `status: 'locked'`). Définir espèce, classe, palette (tenue principale, cape plus foncée de la même famille, peau, yeux, cheveux contrastés).
2. **Teintes** : ajouter dans les catalogues `ALL_*` uniquement les teintes nouvelles, avec `isTrophyReward: true`. Ne jamais toucher aux `BASE_*`.
3. **Espèce** : si l'espèce a des oreilles ou des dents propres, ajouter la branche dans `getSpeciesEars()` et dans `faceFeatures` (garçon ET fille). Si l'espèce est `human`, ne rien ajouter.
4. **Coupes** : créer `<id>_boy` et `<id>_girl` dans `RPG_STYLES`, en blocs larges, avec `hairBack` partant de l'ellipse universelle `cx=50 cy=26 rx=35 ry=31`.
5. **Tenue** : créer `OUTFIT_<NOM>` avec ses 8 emplacements (laisser `""` ceux qui sont inutiles), l'enregistrer dans `RPG_OUTFITS`. Armes construites sur l'axe `X=0`, origine au milieu de la poignée, placées par un seul `<g transform="translate(main) rotate(a)">` qui contient aussi la main qui serre, dessinée en dernier (premier plan). Voir AGENTS.md règle 9 « Prise en main » et « Groupes sans orphelins ». Modèles de référence : `PALADIN_SWORD_MODEL`, `boy-ninjato`, `girl-sword`.
6. **Presets** : compléter `boyPreset` et `girlPreset` (`styleKey`, `outfitKey`, `species`, `skinColor`, `hairColor`, `eyeColor`, mêmes teintes pour les deux), la liste `rewards`, puis retirer `status: 'locked'` et passer `badge` à `'Nouveau'`.
7. **Vérifier** : `node --check js/modules/ui/avatars.js`, puis contrôle visuel dans le lab.

## Lab de test : test-avatars.html

- Servir le projet (`npm run dev`) puis ouvrir `http://localhost:8000/test-avatars.html`. C'est l'utilisateur qui valide visuellement : présenter le résultat et attendre son retour, sans commit.
- La section « Nouveaux Trophées & Skins RPG » lit directement `RPG_TROPHIES`, `RPG_STYLES` et `RPG_OUTFITS` : un trophée bien déclaré y apparaît sans toucher au HTML.
- Tester systématiquement : garçon et fille, corps entier et tête seule, zoom, et au moins une carnation claire et une foncée quand la peau est réglable.
- Avant de rendre la main : vérifier la portée des variables dans les templates (une `${variable}` hors de portée provoque un `ReferenceError` qui casse tout le lab).

## Technique optionnelle : traits à largeur variable

Pour des traits effilés façon encre manga (paupières, bouche, reflets et séparations de mèches, plis et coutures de vêtements), on remplace un `stroke-width` uniforme par un tracé fermé rempli, calculé par décalage normal selon un profil. **Ne l'appliquer que sur demande explicite de l'utilisateur, élément par élément**, sauf une règle déjà actée : les coutures, plis, liserés et ourlets de vêtement, ainsi que les diadèmes, bandeaux, rubans de chapeau et ceintures (profondeur : épais au centre, fins sur les côtés), se dessinent toujours en `fuseau`, coutures piquées et lacets compris, comme les séparations de doigts de toutes les mains (largeur 0.65, ombre de peau). Une ceinture est ajustée à la largeur mesurée de la taille et ses éléments sont recentrés sur sa courbe. Largeurs de référence dans la table d'inventaire de la référence ci-dessous. Il cite l'effet par son nom : `fuseau`, `plume`, `comete`, `sablier` ou `calligraphique`. Anneaux ouverts (boucles d'oreille, maillons) : `scripts/open-ring.mjs`. Méthode, générateur `scripts/tapered-path.mjs` et inventaire des candidats dans le code : [references/traits-largeur-variable.md](references/traits-largeur-variable.md).

## État actuel et limites connues

- Trophées terminés : `elf` (1), `orc` (2) et `paladin` (3, humain : peau `sun-bronze`, cheveux Or Solaire `#facc15`, yeux `sky`). Squelettes à concevoir : `kitsune`, `shadow`, `vampire`.
- Un trophée humain passe `isNewCharacter` à vrai (via `styleKey`/`outfitKey`) : le bandeau, le diadème et le triangle de col orange de la tenue de base sont masqués automatiquement.
- Accessoire de tête sur une chevelure de même famille de couleur (diadème or sur cheveux dorés) : il disparaît. Choisir une teinte contrastée (ardoise `#475569`, teinte de la cape, pour le paladin ; l'acier clair `#e2e8f0` se fondait encore dans l'Or Solaire).
- `player.js` (`setAvatarConfig`/`getAvatarConfig`) ne sauvegarde ni `styleKey`, ni `outfitKey`, ni `species` : un skin de trophée ne peut pas encore être porté par le joueur.
- `avatar-modal.js` ne propose que les palettes et coupes de base, sans lien avec les trophées débloqués.
- La page trophées (`trophies-manager.js`, `rewards-manager.js`, `js/data/trophies.json`) gère encore des trophées images.

Ces trois derniers points relèvent du ticket backlog « Trophées : Page trophées basée sur les skins d'avatar ».
