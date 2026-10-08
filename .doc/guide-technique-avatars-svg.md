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
- **Règle absolue d'ordre** : Ce calque doit impérativement être le premier calque de personnage (derrière tout le corps).
- **Socle géométrique universel (Base minimale obligatoire pour toutes les coupes)** :
  - **Ellipse de base universelle** : `<ellipse cx="50" cy="28" rx="35" ry="33" fill="..."/>`
    - **Sommet** : $Y = -5$ ($15\text{px}$ au-dessus du crâne $Y=10$, donnant le volume supérieur manga).
    - **Bas** : $Y = 61$ (descend sous les oreilles $Y=42.8$ jusqu'au bas du menton/début du cou).
    - **Largeur** : $X = 15..85$ ($rx = 35$, englobant largement le crâne et les oreilles).
- **Extensions selon la coupe** :
  1. **Cheveux longs** (ex: Fille Macarons) : On conserve l'ellipse de base universelle et on ajoute le grand ovale plein descendant jusqu'aux jambes (`<ellipse cx="50" cy="50" rx="34" ry="46" fill="..."/>`).
  2. **Coupe au carré / Bob** (ex: Carré Court, Bob Moderne) : On ajoute un **ovale coupé en 2** descendant jusqu'aux épaules/haut du buste (`Y=62..66`) : `<path d="M 15,66 C 15,22 26,2 50,2 C 74,2 85,22 85,66 Z" fill="..."/>`.
  3. **Pointes / Chignons / Queues** : Se superposent sur cette ellipse de base.
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
- Frange manga découpée en pointes dynamiques sur le front (`y = 10` à `y = 41`).
- **Structure Frange Fille (3 Blocs distincts, mèche centrale extra-large & pointe aiguë)** :
  - Bloc gauche ($X = 21..35$), pointe à $(28, 36)$.
  - Bloc central extra-large ($X = 35..65$), mèche centrale descendant au niveau des yeux en pointe aiguë à $(50, 41)$.
  - Bloc droit ($X = 65..79$), pointe à $(72, 36)$.
  - Tracé : `<path d="M 21,30 C 23,35 25,37 28,36 C 31,35 33,30 35,28 C 39,33 46,38 50,41 C 54,38 61,33 65,28 C 67,30 69,35 72,36 C 75,37 77,35 79,30 C 76,12 64,6 50,6 C 36,6 24,12 21,30 Z" fill="#8a3c08"/>`
- Les mèches latérales (`y = 30..54`) encadrent l'intérieur des joues **sans recouvrir les oreilles de face**.

### Calque 9 : Traits du visage en avant-plan (`<g id="...-face-features-full">`)
- **Placé au-dessus de la frange** : Permet aux sourcils et aux yeux manga d'être toujours parfaitement lisibles.
- **Yeux manga détaillés** :
  - Fond blanc (`ellipse rx="6.5" ry="5.5"`).
  - Iris bicolore dégradé (couleur sombre en haut `#6d2e05`, couleur vive en bas `#b45309`).
  - Pupille noire + 2 reflets blancs pétillants (un grand en haut à gauche, un petit en bas à droite).
  - Ligne de cils supérieure épaisse noire (`stroke-width="2.2"`, `d="M30 38 Q37 33 44 38"`).
  - **Cils manga supérieurs (Fille)** : 3 pointes triangulaires dégressives en hauteur le long de la courbure extérieure haute de la paupière (`points="29.5,39.2 26.5,35.8 31.8,37.5"`, `points="32.2,37.2 30.8,34.2 34.2,36.0"`, `points="34.8,35.6 34.2,33.5 36.5,34.8"`).
  - **Trait de contour inférieur (Fille)** : Ligne fine discrète sous l'œil descendant sous l'iris et le blanc de l'œil (`stroke-width="1"`, `d="M32 46.0 Q37 48.1 42 46.0"`).
  - **Cils manga inférieurs (Fille)** : 
    - 3 pointes triangulaires dégressives orientées vers le bas.
    - **Positionnement centré** : réparties sur la portion centrale du trait inférieur (sous la pupille / iris entre $X=33.5$ et $X=40.5$).
    - **Règle d'ancrage strict** : La base de chaque triangle s'ancre le long de la courbe inférieure (`y = 46.5` à `47.2`, pointes à `48.2..48.8`) pour préserver la visibilité des reflets tout en restant parfaitement positionnée sous le regard.
    - Oeil gauche : `points="33.5,46.5 34.2,48.3 35.0,47.0"`, `points="36.2,47.2 37.0,48.8 37.8,47.2"`, `points="39.0,47.0 39.8,48.2 40.5,46.5"`.
    - Oeil droit (symétrie $X' = 100 - X$) : `points="66.5,46.5 65.8,48.3 65.0,47.0"`, `points="63.8,47.2 63.0,48.8 62.2,47.2"`, `points="61.0,47.0 60.2,48.2 59.5,46.5"`.
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
- **Nez** : Triangle manga pointant vers le bas aplati avec coins arrondis (`<polygon points="48.6,47.2 51.4,47.2 50,47.9" fill="#d99866" stroke="#d99866" stroke-width="0.7" stroke-linejoin="round"/>`).
- **Bouche** : Arc souriant ou ouvert (`d="M45 51 Q50 56.5 55 51"`).

---

## 5. Système de Carnations de Peau (`SKIN_COLORS`)

L'atelier d'avatar et le moteur de rendu vectoriel supportent une palette inclusive de **6 teintes de peau prédéfinies** :

| Identifiant | Nom | Couleur Base (`base`) | Ombrage / Oreilles (`shadow`) | Description |
|---|---|---|---|---|
| `porcelain` | Porcelaine | `#ffe8d6` | `#f4ccba` | Teint très clair, rosé |
| `light` | Pêche (Défaut) | `#ffd4a3` | `#f0be8d` | Teint clair standard |
| `golden` | Dorée | `#f6c48a` | `#dca66e` | Teint intermédiaire doré |
| `tan` | Hâlée | `#df9b62` | `#bc7842` | Teint mat / hâlé chaud |
| `brown` | Chocolat | `#9c5b2e` | `#7a411a` | Teint foncé chaud |
| `dark` | Ébène | `#5c351c` | `#40220f` | Teint très foncé profond |

### Règles d'application dynamique du teint :
1. **Calques anatomiques de base (`headBase`, `faceFeatures`)** :
   - Le cou, la silhouette du crâne et les oreilles reçoivent `skin.base`.
   - L'intérieur des oreilles et le pli du cou reçoivent `skin.shadow`.
   - Le nez s'adapte automatiquement (ou conserve une teinte contrastée harmonisée).
2. **Tenues modulaires (`BOY_OUTFITS`, `GIRL_OUTFITS`)** :
   - Les propriétés `arms` (bras nus, manches courtes, mains) et `legs` (jambes nues sous short/jupe) peuvent être définies sous forme de **fonctions dynamiques** : `(skin) => string`.
   - Le moteur `renderPart(part, effectiveSkin)` évalue automatiquement la fonction en lui passant l'objet `{ base, shadow }`, garantissant que la peau visible sur les tenues s'adapte instantanément au teint choisi.

---

## 6. Palette de Couleurs Standard

| Élément | Garçon (Style Ninja Turquoise) | Fille (Style Aventure Orange/Turquoise) |
|---|---|---|
| **Peau (Base)** | `#ffd4a3` (par défaut) | `#ffd4a3` (par défaut) |
| **Ombre peau / Oreilles intérieures** | `#f0be8d` | `#f0be8d` |
| **Nez** | `#d99866` | `#d99866` |
| **Cheveux (Uniforme)** | `#5a2d0c` (Brun chaud) | `#8a3c08` (Châtain cuivré) |
| **Couleur Principale** | `#489e96` (Turquoise) | `#ff9d00` (Orange vif) |
| **Couleur Accent** | `#ff9d00` (Orange) | `#489e96` (Turquoise) |
| **Bas du corps (Tenue classique)** | `#1b4d49` (Bleu pétrole / Sarcelle) | `#236762` (Sarcelle canard) |
| **Ceinture / Boucle** | `#1f2937` / `#ffb733` | `#1f2937` / `#ffb733` |
| **Yeux (Iris)** | `#542c0e` / `#8c4e1e` | `#6d2e05` / `#b45309` |
| **Cils & Contours** | `#2b1404` | `#2b1404` |

---

## 7. Bonnes Pratiques & Retours d'Expérience (Learnings)

1. **Simplicité et Absence de Sur-Ingénierie (KISS)** :
   - Les modales de prévisualisation ou zoom (ex. [test-avatars.html](file:///home/nicolas/projets/_github/ez-job/test-avatars.html)) doivent rester minimalistes (plein écran, sans boutons superflus, simple clic / croix pour fermer).
   - Ne pas ajouter de fonctionnalités non explicitement demandées.

2. **Équilibre des Cils Chibi Manga** :
   - Les cils supérieurs définissent le regard principal (trait épais $2.2\text{px}$ + 3 pointes dynamiques sur le coin externe).
   - Les cils inférieurs doivent être **subtils, plus courts et fins** que les cils supérieurs, et centrés sous l'iris pour ne pas alourdir le regard ou ressembler à des épines extérieures.
   - Ne pas descendre trop bas la courbure inférieure pour préserver la cohésion avec l'œil tout en laissant les reflets lumineux 100% visibles.

3. **Construction des Cheveux Bouclés / Ondulés (Curly Hair)** :
   - **Masse volumique arrière (`hairBack`)** : Une grappe de cercles superposés ($r = 14..22$) positionnés latéralement ($x = 18..30$ et $x = 70..82$, $y = 30..70$) crée une sensation de volume bouclé riche et naturelle sans alourdir le tracé.
   - **Frange avant (`hairFront`)** : Privilégier une ligne de mèches ondulées sur le front ($y = 20..36$). **Ne jamais placer de cercles parasites isolés sur les tempes ou en avant-plan du visage** ($x = 28$ ou $x = 72$), car ils créent des verrues/artéfacts visuels coupant les yeux et les joues.

4. **Harmonie Chromatique des Tenues & Évitement du Marron** :
   - **Règle de tonalité pour les capes** : Une cape (`capeBack` / `capeFront`) doit impérativement reprendre la même famille de couleur que le vêtement principal du haut du corps (`body`), mais dans une **nuance plus foncée/profonde** (ex. pour un haut de mage violet améthyste `#4c1d95`, le pantalon est également en `#4c1d95` et la cape en violet sombre `#2e1065`, avec liseré or `#fbbf24`).
   - **Tenues de base classiques** : Éviter le marron pour les vêtements bas (pantalons / jupes) ; privilégier des tons pétrole, sarcelle ou ardoise assortis à la charte.

5. **Sélecteur de Teint sur l'Écran d'Accueil** :
   - L'écran initial d'accueil (`#player-name-screen`) intègre la palette des 6 carnations avec mise à jour en direct des SVG de prévisualisation Garçon/Fille et enregistrement transparent dans la configuration du joueur.

6. **Modification du Nom / Pseudo dans l'Atelier Avatar** :
   - L'atelier de personnalisation ([avatar-modal.js](file:///home/nicolas/projets/_github/ez-job/js/modules/ui/avatar-modal.js)) intègre un champ de saisie direct pour modifier le prénom/pseudo du joueur.
   - À l'enregistrement, le nom est sauvegardé dans `playerManager` et synchronisé instantanément sur tous les éléments d'interface (carte de progression roadmap, bouton joueur hero, barre de navigation desktop et mobile).

7. **Synchronisation Complète Obligatoire** :
   Tout changement de tracé SVG ou d'attribut configurable doit être immédiatement reporté sur :
   - [index.html](file:///home/nicolas/projets/_github/ez-job/index.html) et [js/app.js](file:///home/nicolas/projets/_github/ez-job/js/app.js) (écran d'accueil et sélection initiale)
   - [test-avatars.html](file:///home/nicolas/projets/_github/ez-job/test-avatars.html) (laboratoire de test et modale zoom)
   - [js/modules/ui/avatars.js](file:///home/nicolas/projets/_github/ez-job/js/modules/ui/avatars.js) (`headSvg`, `svg`, `buildCustomAvatarSvg`, palettes)
   - [js/modules/ui/avatar-modal.js](file:///home/nicolas/projets/_github/ez-job/js/modules/ui/avatar-modal.js) (options et prévisualisations de l'atelier)
   - [js/modules/core/player.js](file:///home/nicolas/projets/_github/ez-job/js/modules/core/player.js) (persistance du profil et des configs)
   - [.doc/guide-technique-avatars-svg.md](file:///home/nicolas/projets/_github/ez-job/.doc/guide-technique-avatars-svg.md) (spécification technique)

8. **Harmonie Universelle des Cheveux Arrière (Calque 2)** :
   - **Base minimale obligatoire** : Un cercle/volume englobant arrière (`<circle cx="50" cy="24" r="32" fill="..."/>`) pour structurer la masse qui déborde du crâne.
   - **Cheveux longs** : Ajouter un grand ovale descendant jusqu'aux jambes (`<ellipse cx="50" cy="50" rx="34" ry="46" fill="..."/>`).
   - **Coupe au carré (Bob / mi-long)** : Ajouter un **demi-ovale** descendant jusqu'aux épaules/haut du buste (`Y=62..66`). Cette superposition d'un cercle crânien et d'un demi-ovale apporte une assise naturelle, fluide et beaucoup plus harmonieuse sans découpes superflues.

---

## 8. Workflow de Validation & Déploiement

```bash
npm run update-version
npm run build
git add .
git commit -m "style(avatars): description des ajustements"
git push origin CamiLudik
```

