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
- **Corps entier (Full body)** : `viewBox="0 -22 100 144"` (permet d'englober sans découpage les mèches hautes, chignons et queues de cheval jusqu'à `y = -18` et l'ombre au sol jusqu'à `y = 120`).
- **Portrait / Tête seule (Head only)** : `viewBox="4 -22 92 88"` (centré sur le visage et le volume haut des cheveux).
- **Axe central de symétrie** : $X = 50$

### 2.2 Points d'ancrage verticaux (Y)
| Zone anatomique | Position Y | Notes |
|---|---|---|
| **Mèches hautes / Chignons / Queues** | `y = -18` à `y = 0` | Volume capillaire supérieur & pointes manga |
| **Sommet du crâne** | `y = 10` | Base supérieure du crâne sous les cheveux |
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
<svg viewBox="0 -22 100 144" ...>
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
- Frange manga découpée en pointes dynamiques sur le front (`y = 10` à `y = 43`).
- **Structure Frange Fille (3 Blocs distincts & Mèche centrale élargie)** :
  - Bloc gauche ($X = 21..38$), pointe à $(30, 36)$.
  - Bloc central large ($X = 38..62$), mèche centrale descendant bas entre les yeux jusqu'à $(50, 43)$.
  - Bloc droit ($X = 62..79$), pointe à $(70, 36)$.
  - Tracé : `<path d="M 21,30 C 23,36 26,38 30,36 C 34,34 36,29 38,28 C 41,32 45,43 50,43 C 55,43 59,32 62,28 C 64,29 66,34 70,36 C 74,38 77,36 79,30 C 76,12 64,6 50,6 C 36,6 24,12 21,30 Z" fill="#8a3c08"/>`
- Les mèches latérales (`y = 30..54`) encadrent l'intérieur des joues **sans recouvrir les oreilles de face**.

### Calque 9 : Traits du visage en avant-plan (`<g id="...-face-features-full">`)
- **Placé au-dessus de la frange** : Permet aux sourcils et aux yeux manga d'être toujours parfaitement lisibles.
- **Yeux manga détaillés** :
  - Fond blanc (`ellipse rx="6.5" ry="5.5"`).
  - Iris bicolore dégradé (couleur sombre en haut `#6d2e05`, couleur vive en bas `#b45309`).
  - Pupille noire + 2 reflets blancs pétillants (un grand en haut à gauche, un petit en bas à droite).
  - Ligne de cils supérieure épaisse noire (`stroke-width="2.2"`, `d="M30 38 Q37 33 44 38"`).
  - **Cils manga supérieurs (Fille)** : 3 pointes triangulaires dégressives en hauteur le long de la courbure extérieure haute de la paupière (`points="29.5,39.2 26.5,35.8 31.8,37.5"`, `points="32.2,37.2 30.8,34.2 34.2,36.0"`, `points="34.8,35.6 34.2,33.5 36.5,34.8"`).
  - **Trait de contour inférieur (Fille)** : Ligne fine discrète sous l'œil (`stroke-width="1"`, `d="M32 44.5 Q37 47.5 42 44.5"`).
  - **Cils manga inférieurs (Fille)** : 
    - 3 pointes triangulaires dégressives orientées vers le bas.
    - **Positionnement centré** : réparties sur la portion centrale du trait inférieur (sous la pupille / iris entre $X=33.5$ et $X=40.5$).
    - **Règle d'ancrage strict** : La base de chaque triangle doit impérativement mordre de 0.2 à 0.4px dans l'épaisseur de la courbe inférieure (`y = 45.0` à `45.7`) pour éviter tout interstice ou impression de cil flottant.
    - Oeil gauche : `points="33.5,45.0 34.2,47.2 35.0,45.5"`, `points="36.2,45.7 37.0,47.6 37.8,45.7"`, `points="39.0,45.5 39.8,46.9 40.5,45.0"`.
    - Oeil droit (symétrie $X' = 100 - X$) : `points="66.5,45.0 65.8,47.2 65.0,45.5"`, `points="63.8,45.7 63.0,47.6 62.2,45.7"`, `points="61.0,45.5 60.2,46.9 59.5,45.0"`.
- **Sourcils effilés en pointe (Règle d'anatomie 1/3 - 2/3 & Tapered Tail)** :
  - **Forme polygonale effilée pour les deux sexes** : Base intérieure plus épaisse près du nez, apex en pointe haute situé aux 2/3 de l'intérieur (1/3 de l'extérieur), et terminaison en pointe aiguë vers la tempe.
    - Oeil gauche :
      - Garçon : `<path d="M43 28.4 L35.5 26.2 L31 29.5 L35.8 28.2 L43 30.6 Z" fill="#542c0e"/>`
      - Fille : `<path d="M43 28.5 L35.5 26.3 L31 29.5 L35.8 28.1 L43 30.5 Z" fill="#6d2e05"/>`
    - Oeil droit (symétrie $X' = 100 - X$) :
      - Garçon : `<path d="M57 28.4 L64.5 26.2 L69 29.5 L64.2 28.2 L57 30.8 Z" fill="#542c0e"/>`
      - Fille : `<path d="M57 28.5 L64.5 26.3 L69 29.5 L64.2 28.1 L57 30.5 Z" fill="#6d2e05"/>`
  - **Couleur & Teinte adoucie** :
    - **Garçon** : `fill="#542c0e"` (brun chaud texturé).
    - **Fille** : `fill="#6d2e05"` (châtain cuivré).
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

## 6. Bonnes Pratiques & Retours d'Expérience (Learnings)

1. **Simplicité et Absence de Sur-Ingénierie (KISS)** :
   - Les modales de prévisualisation ou zoom (ex. [test-avatars.html](file:///home/nicolas/projets/_github/ez-job/test-avatars.html)) doivent rester minimalistes (plein écran, sans boutons superflus, simple clic / croix pour fermer).
   - Ne pas ajouter de fonctionnalités non explicitement demandées.

2. **Équilibre des Cils Chibi Manga** :
   - Les cils supérieurs définissent le regard principal (trait épais $2.2\text{px}$ + 3 pointes dynamiques sur le coin externe).
   - Les cils inférieurs doivent être **subtils, plus courts et fins** que les cils supérieurs, et centrés sous l'iris pour ne pas alourdir le regard ou ressembler à des épines extérieures.
   - Toujours calculer les coordonnées $Y$ selon l'équation de la courbe de Bézier pour garantir la continuité visuelle.

3. **Synchronisation Quadruple Obligatoire** :
   Tout changement de tracé SVG doit être immédiatement reporté sur :
   - [test-avatars.html](file:///home/nicolas/projets/_github/ez-job/test-avatars.html) (environnement de test visuel et modale plein écran)
   - [js/modules/ui/avatars.js](file:///home/nicolas/projets/_github/ez-job/js/modules/ui/avatars.js) (`headSvg` et `svg`)
   - [index.html](file:///home/nicolas/projets/_github/ez-job/index.html) (cartes du sélecteur de personnage)
   - [.doc/guide-technique-avatars-svg.md](file:///home/nicolas/projets/_github/ez-job/.doc/guide-technique-avatars-svg.md) (spécification technique)

---

## 7. Workflow de Validation & Déploiement

```bash
npm run update-version
npm run build
git add .
git commit -m "style(avatars): description des ajustements"
git push origin CamiLudik
```
