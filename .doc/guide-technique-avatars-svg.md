# Guide Technique & Spécifications Graphiques : Avatars Chibi Manga SVG

Ce document décrit les règles fondamentales d'anatomie, de composition géométrique et la hiérarchie stricte des calques SVG utilisées pour concevoir et intégrer les avatars Chibi Manga de **CamiLudik**.

Tout agent IA (Claude, Antigravity, etc.) ou développeur souhaitant modifier un avatar existant ou en créer un nouveau **doit impérativement respecter ce standard**.

---

## 1. Vue d'Ensemble & Philosophie Visuelle

Les avatars sont dessinés **entièrement en SVG vectoriel natif** (sans images matricielles ni placeholders) avec un style **Chibi Manga** mignon, dynamique et proportionné :
- **Tête expressive** avec grand crâne rond, joues potelées et traits expressifs.
- **Corps compact** avec silhouette sculptée (buste et jambes en trapèzes coniques, pas de rectangles bruts).
- **Proportions Chibi** : Ratio tête / corps d'environ 1:1.4 (la tête fait ~60px de haut, le corps + jambes font ~60px).
- **Organisation sémantique** : Chaque composant appartient à un groupe `<g id="...">` dédié respectant un ordre d'empilement (Z-index SVG) immuable.

---

## 2. Repères & Système de Coordonnées

### 2.1 ViewBox
- **Corps entier (Full body)** : `viewBox="0 -8 100 133"` (Garçon) / `viewBox="0 -6 100 131"` (Fille)
- **Portrait / Tête seule (Head only)** : `viewBox="4 -8 92 80"` (Garçon) / `viewBox="4 -6 92 78"` (Fille)
- **Axe central de symétrie** : $X = 50$

### 2.2 Points d'ancrage verticaux (Y)
| Zone anatomique | Position Y | Notes |
|---|---|---|
| **Sommet du crâne / Cheveux haut** | `y = -4` à `y = 10` | Volume capillaire et mèches hautes |
| **Bandeau / Serre-tête** | `y = 18` à `y = 28` | Sur le haut du front |
| **Sourcils** | `y = 28` à `y = 31` | Expressifs et nets |
| **Yeux (centre)** | `y = 41` | Grands yeux bicolores avec reflets blancs |
| **Oreilles (centre)** | `x = 21 / 79`, `y = 38` | Rayon `r = 4.8`, sous les tempes |
| **Nez** | `x = 50`, `y = 47.5` | Petit point discret juste sous les yeux |
| **Bouche** | `y = 51` à `y = 56.5` | Arc souriant dans le tiers inférieur |
| **Bas du menton** | `y = 60` | Courbe douce du bas du visage |
| **Ligne des épaules (Haut du buste)** | `y = 62` | Tête proche des épaules (cou très court de 2-4px) |
| **Ceinture / Taille (Waist)** | `y = 80` à `y = 85` | Resserrée, avec boucle dorée et accessoire |
| **Bas du pantalon / jupe** | `y = 85` (Garçon) / `y = 92` (Fille) | |
| **Chevilles / Haut des chaussures** | `y = 106` | Jambes resserrées (~4px d'écartement au sol) |
| **Semelle / Contact au sol** | `y = 114` | Chaussures compactes et profilées |
| **Ombre au sol** | `cx = 50`, `cy = 116` | Ellipse douce `rx = 16`, `ry = 3` |

---

## 3. Hiérarchie Stricte des 9 Calques SVG

En SVG, le Z-index dépend exclusivement de **l'ordre d'apparition dans le code** (le premier élément est au fond, le dernier est au premier plan). L'arborescence doit **toujours** suivre ces 9 calques :

```
<svg viewBox="0 -8 100 133" ...>
  ├── 1. <g id="...-shadow">              (Ombre au sol)
  ├── 2. <g id="...-hair-back-full">      (Cheveux arrière / masse longue)
  ├── 3. <g id="...-legs">                (Jambes, chaussettes & chaussures)
  ├── 4. <g id="...-body">                (Torso, col & vêtements en trapèze)
  ├── 5. <g id="...-belt">                (Ceinture, boucle & sacoche/accessoire)
  ├── 6. <g id="...-arms">                (Bras, manches & mains en ovales simples)
  ├── 7. <g id="...-head-base-full">      (Cou, Oreilles, Forme du crâne & Bandeau)
  ├── 8. <g id="...-hair-front-full">     (Frange & mèches avant)
  └── 9. <g id="...-face-features-full">  (Sourcils, Yeux, Nez, Bouche)
</svg>
```

---

## 4. Règles Graphiques Détaillées par Calque

### Calque 1 : Ombre au sol (`<g id="...-shadow">`)
- Ellipse semi-transparente placée sous les pieds.
- `fill="rgba(124, 64, 4, 0.18)"`
- `cx="50" cy="116" rx="16" ry="3"`

### Calque 2 : Cheveux arrière (`<g id="...-hair-back-full">`)
- **Règle absolue** : Ce calque doit impérativement être le premier calque de personnage (derrière tout le corps).
- Pour les cheveux longs (ex. fille) : inclure une ellipse/forme qui part du haut du crâne et descend jusqu'aux jambes (`ellipse cx="50" cy="50" rx="34" ry="46"`).
- Une couleur 100% unie pour la chevelure (`#5a2d0c` garçon, `#8a3c08` fille).

### Calque 3 : Jambes & Chaussures (`<g id="...-legs">`)
- **Forme en trapèze** : Plus épais en haut (bassin) et s'affinant vers les chevilles (évite les rectangles rigides).
  - Jambe gauche : `polygon points="39,85 49,85 48,106 41,106"`
  - Jambe droite : `polygon points="51,85 61,85 59,106 52,106"`
- **Écartement resserré** : Écart de ~3-4px entre les pieds au sol pour une posture chibi naturelle.
- **Chaussures compactes** : Hauteur ~8px (`y = 106` à `114`), semelle fine foncée et boucle ou liseré décoratif.

### Calque 4 : Corps & Buste (`<g id="...-body">`)
- **Trapèze inversé** : Épaules plus larges en haut (`x = 32..68` à `y = 62`), taille resserrée (`x = 38..62` à `y = 82/85`).
- **Ligne d'épaules rehaussée** à `y = 62` : La tête repose tout près du torse sans cou étiré.
- Veste, kimono ou uniforme avec liserés, col et boutons contrastés.

### Calque 5 : Ceinture & Accessoires (`<g id="...-belt">`)
- Bande horizontale ajustée sur la taille (`y = 80.5..85`, largeur 26px).
- Boucle métallique centrale dorée (`fill="#ffb733"`) avec contour fin.
- Accessoire latéral (petite sacoche ninja ou flacon/bourse) pour le dynamisme.

### Calque 6 : Bras & Mains (`<g id="...-arms">`)
- Manches partant des épaules (`y = 64`) descendant le long du buste.
- **Mains chibi** : Un **seul ovale doux et épuré** à l'extrémité de chaque manche (ex: `ellipse cx="29" cy="84" rx="3.8" ry="3.5"`).

### Calque 7 : Base de la Tête (`<g id="...-head-base-full">`)
- **Cou très court** : `<rect x="46" y="58" width="8" height="4" fill="#ffd4a3"/>`
- **Positionnement des Oreilles (Règle d'or)** :
  - Les oreilles doivent être placées **devant les cheveux arrière** et **juste derrière le tracé du crâne**.
  - On place `<g id="...-ears">` **avant** la balise `<path>` du crâne dans le code de `head-base`.
  - Position : `cx="21"` (gauche) et `cx="79"` (droite), `cy="38"`, `r="4.8"` (chair) + cercle interne `r="2.8"` (ombrage `#f0be8d`).
- **Forme du Crâne** :
  - `path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z"`
- **Accessoire de tête** : Bandeau ninja ou serre-tête avec emblème/nœud.

### Calque 8 : Cheveux avant / Frange (`<g id="...-hair-front-full">`)
- Frange manga découpée en pointes dynamiques sur le front (`y = 10` à `y = 34`).
- Les mèches latérales doivent encadrer l'intérieur des joues **sans recouvrir les oreilles de face**.

### Calque 9 : Traits du visage en avant-plan (`<g id="...-face-features-full">`)
- **Placé au-dessus de la frange** : Permet aux sourcils et aux yeux manga d'être toujours parfaitement lisibles.
- **Yeux manga détaillés** :
  - Fond blanc (`ellipse rx="6.5" ry="5.5"`).
  - Iris bicolore dégradé (couleur sombre en haut, couleur vive en bas).
  - Pupille noire + 2 reflets blancs pétillants (un grand en haut à gauche, un petit en bas à droite).
  - Ligne de cils supérieure épaisse noire (`stroke-width="2.2"`).
- **Sourcils** : Arcs expressifs fins (`stroke-width="1.8"` à `2.2"`).
- **Nez** : Discret point chaud sous les yeux (`cx="50" cy="47.5" r="0.9"`).
- **Bouche** : Arc souriant ou ouvert (`d="M45 51 Q50 56.5 55 51"`).

---

## 5. Palette de Couleurs Standard

| Élément | Garçon (Style Ninja Turquoise) | Fille (Style Aventure Orange/Turquoise) |
|---|---|---|
| **Peau (Base)** | `#ffd4a3` | `#ffd4a3` |
| **Ombre peau / Oreilles intérieures** | `#f0be8d` | `#f0be8d` |
| **Nez** | `#d99866` | `#d99866` |
| **Cheveux (Uniforme)** | `#5a2d0c` (Brun chaud) | `#8a3c08` (Châtain cuivré) |
| **Couleur Principale** | `#489e96` (Turquoise) | `#ff9d00` (Orange vif) |
| **Couleur Accent** | `#ff9d00` (Orange) | `#489e96` (Turquoise) |
| **Cuir / Ceinture / Semelles** | `#7c4004` / `#442100` | `#7c4004` / `#c47000` |
| **Boucle dorée** | `#ffb733` | `#ffb733` |
| **Yeux (Iris)** | `#542c0e` / `#8c4e1e` | `#6d2e05` / `#b45309` |
| **Cils & Contours** | `#2b1404` | `#2b1404` |

---

## 6. Synchronisation dans le Codebase

Tout changement de SVG avatar ou ajout d'un nouvel avatar doit être reporté à **deux endroits obligatoires** :

1. **[js/modules/ui/avatars.js](file:///home/nicolas/projets/_github/ez-job/js/modules/ui/avatars.js)** :
   - Objet `AVATARS[id]` contenant `headSvg` (tête isolée) et `svg` (corps entier).
   - Utilisé dans le gameplay, l'affichage de la roadmap, le header et les profils.
2. **[index.html](file:///home/nicolas/projets/_github/ez-job/index.html)** :
   - Cartes de sélection du personnage de départ dans la modale `#start-avatar-picker` (boutons `boy` et `girl`).

### Workflow de validation & déploiement
```bash
npm run update-version
npm run build
git add .
git commit -m "style(avatars): description des ajustements"
git push origin CamiLudik
```
