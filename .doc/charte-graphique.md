# Charte Graphique - CamiLudik

## Pour changer le thème (résumé rapide)

> Modifier uniquement **`styles/main.css`** (bloc `:root`) + les 4 hex dans **`js/modules/core/theme.js`** + la config Tailwind dans **`index.html`**.
> Tout le reste se propage automatiquement.

## 1. Identité visuelle

| Élément | Fichier | Valeur |
| --- | --- | --- |
| Logo | `images/camiludik-logo.svg` | Caméléon orange avec "C" brun - version couleur |
| Logo complet PNG | `images/camiludik-logo.png` | Même motif en PNG |
| Favicon | `images/camiludik-favicon.svg` | Caméléon seul (sans texte) |
| Favicon PNG | `images/camiludik-favicon.png` | Même motif en PNG |
| Nom | - | **CamiLudik** |
| Sources logos | `.doc/logos/CamiLudik/` | Originaux SVG et PNG (couleur + NB) |

## 2. Palette de couleurs

| Rôle | Nom | Hex | RGB |
| --- | --- | --- | --- |
| Primaire | Turquoise principal | `#66bcb4` | 102, 188, 180 |
| Primaire foncé | Turquoise foncé | `#489e96` | 72, 158, 150 |
| Accent | Orange caméléon | `#ff9d00` | 255, 157, 0 |
| Fond page | Beige très clair | `#fbf3ea` | 251, 243, 234 |
| Fond carte | Beige clair | `#f4eadd` | 244, 234, 221 |
| Fond actif/input | Beige moyen | `#eaddcc` | 234, 221, 204 |
| Bordure | Beige sable | `#dcc9b0` | 220, 201, 176 |
| Texte titre | Brun foncé | `#7c4004` | 124, 64, 4 |
| Texte secondaire | Brun clair | `#b46e28` | 180, 110, 40 |
| Navbar/footer | Turquoise principal | `#66bcb4` | - |

**Dégradé principal**: `linear-gradient(to right, #66bcb4, #489e96)` - utilisé sur la barre de progression, le logo texte.

**Thème**: clair (light mode), fond beige/crème chaleureux avec textes bruns.

## 3. Typographie

| Police | Usage | Source |
| --- | --- | --- |
| **Baloo 2** (400, 600, 700) | Titres de section (h1, h2, h3), logo | Google Fonts |
| **Almarai** (300, 400, 700) | Corps de texte, boutons, labels | Google Fonts |

### Règles d'application Baloo 2

Tous les titres de pages et sections doivent avoir `font-family:'Baloo 2',sans-serif` :
- Titres principaux `h1` : "Mes Trophées", "Historique", "Résultats"
- Titres de sections `h2` : "Options de Jeu", "Recherche et Filtres", "Collection de Trophées", "Débloquer un Trophée", etc.

## 4. Couleurs sémantiques (ne pas modifier)

Ces couleurs ont un sens fonctionnel universel, indépendant du thème.

| Couleur | Classe Tailwind | Usage |
| --- | --- | --- |
| Vert | `text-green-400` / `text-green-500` | Bonne réponse, meilleur score |
| Rouge | `text-red-400` | Mauvaise réponse, pire score |
| Jaune | `text-yellow-400` / `text-yellow-500` | Etoiles, trophées "or", points |
| Gris | `rgb(107, 114, 128)` | Trophées non débloqués (rareté "commun") |
| Violet vif | `rgb(147, 51, 234)` | Trophées "épique" (couleur universelle distincte) |

La palette `category-colors.js` (couleurs des cartes quiz) est aussi intentionnellement indépendante.

## 5. Système de thème - comment ça marche

```
styles/main.css  (:root)          <- SOURCE UNIQUE - modifier ici pour changer le thème
    |
    +-- styles/main.css           <- Lues via var(--color-*)
    +-- styles/time-selector.css  <- Lues via var(--color-*)
    |
    +-- js/modules/core/theme.js  <- Lues une fois au démarrage via getComputedStyle
            |
            +-- js/modules/managers/*.js  <- import { T } -> T.gradientMain, T.primaryA(0.5)...
```

### Les 3 endroits à modifier pour changer le thème

#### A - `styles/main.css` (`:root`) - valeurs RGB brutes

```css
:root {
  --color-primary:        102, 188, 180; /* #66bcb4 */
  --color-primary-light:  102, 188, 180; /* #66bcb4 - même que primary */
  --color-primary-dark:   72, 158, 150;  /* #489e96 */
  --color-secondary:      255, 157, 0;   /* #ff9d00 */
  --color-accent:         255, 157, 0;   /* #ff9d00 */
  --color-bg-primary:     251, 243, 234; /* #fbf3ea */
  --color-bg-secondary:   244, 234, 221; /* #f4eadd */
  --color-bg-tertiary:    234, 221, 204; /* #eaddcc */
  --color-text-primary:   124, 64, 4;    /* #7c4004 */
  --color-text-secondary: 180, 110, 40;  /* #b46e28 */
  --color-success:        34, 197, 94;
  --color-error:          239, 68, 68;
  --color-warning:        251, 191, 36;
  --color-info:           102, 188, 180;
  --color-timer-urgent:   239, 68, 68;
  --color-timer-alert:    234, 179, 8;
}
```

> **Format RGB brut** (sans `rgb()`) pour pouvoir les combiner avec une opacité: `rgba(var(--color-primary), 0.5)`.

#### B - `js/modules/core/theme.js` - valeurs hex (4 lignes)

```js
hexPrimary:      '#66bcb4',
hexPrimaryLight: '#66bcb4',
hexSecondary:    '#ff9d00',
hexTextPrimary:  '#7c4004',
```

#### C - `index.html` (config Tailwind inline)

```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#66bcb4',
          500: '#66bcb4',  // <- couleur de base
          600: '#489e96',
        },
        accent: {
          400: '#ffb733',
          500: '#ff9d00',  // <- couleur de base
          600: '#e08900'
        }
      }
    }
  }
}
```

## 6. Helpers `theme.js` - référence technique

```js
import { T } from '../core/theme.js';
```

| Helper | Type | Valeur produite |
| --- | --- | --- |
| `T.primary` | string | `"rgb(102, 188, 180)"` |
| `T.primaryLight` | string | `"rgb(102, 188, 180)"` |
| `T.primaryDark` | string | `"rgb(72, 158, 150)"` |
| `T.secondary` | string | `"rgb(255, 157, 0)"` |
| `T.hexPrimary` | string | `"#66bcb4"` |
| `T.hexPrimaryLight` | string | `"#66bcb4"` |
| `T.hexSecondary` | string | `"#ff9d00"` |
| `T.hexTextPrimary` | string | `"#7c4004"` |
| `T.primaryA(a)` | function | `"rgba(102, 188, 180, a)"` |
| `T.secondaryA(a)` | function | `"rgba(255, 157, 0, a)"` |
| `T.bgTertiaryA(a)` | function | `"rgba(234, 221, 204, a)"` |
| `T.gradientMain` | string | `"linear-gradient(to right, #66bcb4, #489e96)"` |
| `T.gradientMain135` | string | Même dégradé à 135° |
| `T.gradientTimerUrgent` | string | Rouge - timer <=5s |
| `T.gradientTimerAlert` | string | Jaune/orange - timer <=8s |

**Règle**: dans un manager JS, toujours utiliser `T.*`. Ne jamais écrire de hex/rgb en dur.

## 7. Système de boutons

| Classe | Apparence | Usage |
| --- | --- | --- |
| `btn-primary` | Fond `#7c4004` brun (ou turquoise dans certains contextes) | CTA principal (Commencer, Valider) |
| `btn-secondary` | Fond blanc, bordure `#dcc9b0`, texte brun | Actions secondaires (Retour, Historique, Trophées) |
| `time-option` | Fond blanc, bordure beige - sélectionné: bordure turquoise + indicateur radio | Sélection du temps |
| `game-mode` | Fond blanc, bordure beige - sélectionné: bordure turquoise | Sélection du mode de jeu |
| `answer-btn` | Fond blanc, bordure `#dcc9b0` - hover: bordure turquoise | Boutons de réponse quiz |

### Hiérarchie visuelle des boutons

- **Fond turquoise plein**: CTA principal (Commencer un quiz, Valider une réponse)
- **Fond blanc + bordure beige**: État de repos (non sélectionné)
- **Fond blanc + bordure turquoise**: Sélectionné / actif
- **Fond brun `#7c4004`**: Bouton Commencer dans les cartes hero/quiz

## 8. Référence des emplacements par fichier

### `index.html` - classes et styles inline

| Élément | Style/Classe |
| --- | --- |
| Fond page | `background: #fbf3ea` (via CSS `:root --color-bg-primary`) |
| Navbar/footer | `bg-primary-500` = `#66bcb4` |
| Titres sections | `style="color:#7c4004;font-family:'Baloo 2',sans-serif"` |
| Textes secondaires | `style="color:#b46e28"` |
| Cartes | `style="background:#f4eadd;border:1.5px solid #dcc9b0"` |
| Input | `style="background:white;border:1.5px solid #dcc9b0"` |
| Hover icônes nav | `hover:text-accent-500` |

### `styles/main.css` - CSS natif

| Sélecteur | Effet |
| --- | --- |
| `.btn-primary` | Fond brun `#7c4004` ou turquoise selon contexte |
| `.btn-secondary` | Fond blanc, bordure `#d7c6af`, texte brun |
| `.time-option` / `.game-mode` | Fond blanc, indicateur radio turquoise si selected |
| `.time-option.selected` / `.game-mode.selected` | Bordure turquoise + box-shadow turquoise |
| `.answer-btn:hover` | Bordure turquoise, fond teal très clair |
| `.answer-btn:disabled` | Fond blanc, bordure beige, opacité 0.6 |
| `.rarity-rare` / `.badge-rare` | Turquoise principal |
| `.rarity-épique` / `.badge-épique` | Violet `rgb(147,51,234)` |
| `.camiludik-alert` | Bannière d'alerte moderne : fond clair dégradé, coins arrondis 1rem (`rounded-2xl`), ombre portée douce, animation d'entrée `alert-slide-in` et sortie fluide `alert-hiding`. Contient `.camiludik-alert-icon` (badge circulaire avec icône), `.camiludik-alert-text` (texte gras 600 Almarai), `.camiludik-alert-action` (bouton pilule d'action) et `.camiludik-alert-close` (croix de fermeture). |
| `.camiludik-alert-success` | Succès : fond dégradé menthe/émeraude clair (`#f0fdf4` -> `#ecfdf5`), bordure `#86efac`, texte vert forêt `#14532d`, badge `#dcfce7` avec icône `#16a34a`, bouton pilule vert `#16a34a` hover `#15803d`. |
| `.camiludik-alert-error` | Erreur : fond dégradé rose clair (`#fff1f2` -> `#ffe4e6`), bordure `#fca5a5`, texte carmin `#881337`, badge `#fee2e2` avec icône `#dc2626`, bouton pilule rouge `#dc2626`. |
| `.camiludik-alert-warning` | Avertissement : fond miel/ambre clair (`#fffbeb` -> `#fef3c7`), bordure `#fcd34d`, texte ambre foncé `#78350f`, badge `#fef3c7` avec icône `#d97706`. |
| `.camiludik-alert-info` | Information : fond turquoise clair (`#f0fdfa` -> `#e6f6f4`), bordure `#99f6e4`, texte turquoise sombre `#134e4a`, badge `#ccfbf1` avec icône `#0d9488`. |

### `js/modules/managers/*.js` - via `T.*`

| Manager | Eléments colorés |
| --- | --- |
| `quiz-selector.js` | Modal temps : titres bruns Fredoka, boutons temps avec indicateur radio |
| `question-manager.js` | Lettre A/B/C/D fond `#66bcb4`, timer badge, barre progression turquoise, bouton valider brun |
| `results-manager.js` | % score `#66bcb4`, barre progress turquoise dégradé, cartes `#f4eadd` |
| `history-manager.js` | Stats cards `#f4eadd`, chiffres `#66bcb4`, résultats beige |
| `trophies-manager.js` | Carte Arbre d'invocation (barre de taux segmentée aux couleurs de rareté, pastille légendaire garanti, jauge de gemmes vers le coût ; arbre SVG : feuillage turquoise `#2f7d74` à `#66bcb4`, tronc brun `#8a4b14`), fruits et lueur de révélation par rareté (rare turquoise `rgb(102,188,180)`, épique violet `rgb(147,51,234)`, légendaire or `rgb(250,204,21)`), cartes 9/16 sur fond neutre crème `T.bgSecondary` (`#f4eadd`), boutons icônes discrets zoom et appliquer (`T.secondaryA(0.75)`, 28 à 34 px) sur la miniature et la modale, description masquée sous 210 px de large, squelette `#eaddcc`. Animations `summon-*` dans `styles/main.css`, coupées par `prefers-reduced-motion`. Bannière d'alerte `#code-message` utilisant le composant `.camiludik-alert` (succès lors de l'application d'un skin avec bouton pilule « Ouvrir l'atelier », erreur si gemmes insuffisantes, bouton fermeture et disparition animée). |

### `js/modules/ui/avatar-modal.js` - atelier avatar

| Elément | Style |
| --- | --- |
| Pastille « Nouveau » d'une teinte | Point ambre `bg-amber-400` de 10 px cerclé `ring-primary-900`, en haut à droite de la pastille de couleur |
| Pastille « Nouveau » d'une miniature (espèce, tenue, coupe) | Micro-chip `text-[8px] px-1.5 py-0.5`, fond `bg-amber-400/80` flouté, bordure fine `border-amber-200/70` |
| Micro-chip « Nouveau » de section | `text-[8px]`, fond `bg-amber-400/25`, texte `text-amber-300`, bordure `border-amber-400/40` |
| Aperçu | Collant en haut du défilement (fond `bg-primary-900/95` flouté), en ligne avec Corps/Tête sur mobile |

### Avatars et trophées (`js/modules/ui/avatars/`)

| Élément | Style |
| --- | --- |
| Cou de tous les personnages | `skin.shadow` (teinte de peau un peu plus sombre que le visage) |
| Diadème du paladin et ceinture du paladin | Métal gris clair `#cbd5e1`, sans contour |
| Diadème de Shadow | Argent `#94a3b8` et `#cbd5e1`, sans contour, croissant `#e2e8f0`, améthystes `#7e22ce` / `#c084fc` |
| Cornes de Shadow | Ébène `#130e24`, nervure violette `#7c3aed` (60 %) et reflet `#c084fc`, tracé plume |
| Bandeau de l'orc | Cuir `#451a03`, crâne d'os `#fef3c7` contour `#78350f`, orbites `#1c0a02`, sans cornes ni gemme |
| Ceinture de l'orc | Rivets ronds `#94a3b8` (boucle réduite à un rivet), bras nus |
| Queue du chat | Couleur des cheveux assombrie d'une couche noire à 22 % |
| Vampire | Redingote `#991b1b`, cape `#450a0a` (doublure `#2c0606`), jabot `#f8fafc`, rapière `#cbd5e1`, pommeau `#dc2626`, peau `#e6edf8` (ombre `#bccbe4`), cheveux `#2a0a12` |
| Nécromancien | Robe `#2f4a43`, capuche avant `#2f4a43` et arrière `#0e1a17`, cape `#0e1a17`, cordon d'os `#d6d3c4`, flamme `#22c55e` / `#86efac`, peau `#aebbb4` (ombre `#85948d`), cheveux `#e7e5d8`, œil noir `#0a0a0a`, pupille `#4ade80` |
| Pirate | Veste d'officier marine `#1e3a5f`, manteau dorsal `#091e36`, grand tricorne évasé `#0f243f` à galon or `#fbbf24`, plume écarlate `#dc2626`, bandana carmin `#991b1b`, locks de corsaire en fuseau, sans perles (Jack Sparrow), sabre d'abordage `#cbd5e1`, écharpe de taille `#991b1b`, moustache et sourire harmonieux en courbe parallèle avec impériale |
| Chevalier Dragon | Cuirasse d'écailles rubis `#881337`, plastron d'acier sombre `#1e293b`, cape écarlate très sombre `#380808`, lance de dragonnier, cornes draconiques en plume et fuseau dans l'esprit de Shadow (obsidienne `#18181b`, flammes rubis `#b91c1c`, reflets or `#f59e0b` et cœur `#fef08a`), yeux ardents fendus |
| Cosmonaute | Combinaison blanche `#f8fafc` à bandes et ceinture orange `#f97316`, sac de survie gris acier `#94a3b8`, casque rond relevé derrière la tête (coque `#f1f5f9`, visière dorée `#fbbf24`), gants blancs, drapeau d'expédition, cheveux Indigo Orbital `#312e81`, peau `golden`, yeux `sky` |
| Avatars rares (13 à 30) | 18 déclinaisons de base harmonisées par tenue : **Tenue 1 Aventurier** (Menthe Givrée `#2dd4bf`, Pêche Veloutée `#fb923c`, Cyan Glacé `#06b6d4`, Blond Platine `#fef08a`), **Tenue 2 Guerrier/Ninja** (Rouge Grenat `#991b1b`, Argent Polaire `#e2e8f0`, Bleu Saphir `#1e3a8a`, Framboise Sauvage `#be185d`, Indigo Nuit `#3730a3`), **Tenue 3 Mage/Sorcière** (Pourpre Impérial `#6b21a8`, Lavande Pastel `#c4b5fd`, Rose Bonbon `#f472b6`, Châtain Cendré `#57534e`), **Tenue 4 Archer/Archère** (Vert Forêt `#14532d`, Cuivre Flamboyant `#ea580c`, Brun Moka `#291810`, Ambre Chaud `#b45309`, Rose Corail `#fb7185`) et 18 teintes d'iris assorties |
| Case vide de la collection | Carte 9/16 en pointillés turquoise (`T.primaryA(0.45)`) sur fond crème, mannequin neutre grisé à 60 %, pastille « ? », « Trophée N » et « À découvrir » ; un clic ramène à l'arbre |
| Raretés d'invocation | Rare turquoise, épique violet `rgb(147,51,234)`, légendaire doré (voir `trophies-manager.js`) |

### Autres fichiers

| Fichier | Couleur |
| --- | --- |
| `manifest.json` | `"theme_color": "#66bcb4"`, `"background_color": "#fbf3ea"` |
| `index.html` `<meta theme-color>` | `#66bcb4` |
