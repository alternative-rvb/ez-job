# Charte Graphique - Erudizz

## Identité visuelle

**Nom de l'application** : Erudizz

**Logo** : Lettre "a" stylisée en forme de bulle de dialogue, avec un dégradé orange vers violet. Le logo existe en version fond sombre (blanc) et fond clair (coloré).

**Fichier logo** : `images/erudizz-logo.svg` (header `<img>`, manifest, `og:image`)

**Fichier favicon** : `images/erudizz-favicon.svg` (`<link rel="icon">` dans `index.html`)

---

## Palette de couleurs

| Nom | Hex | RGB | Usage principal |
| --- | --- | --- | --- |
| Violet principal | `#5a4594` | 90, 69, 148 | Couleur primaire, boutons, fond |
| Violet clair | `#8b72d4` | 139, 114, 212 | Accents secondaires, icônes neutres |
| Violet foncé | `#4a3580` | 74, 53, 128 | Hover boutons primaires |
| Orange accent | `#ef8218` | 239, 130, 24 | CTA, dégradé logo, mise en valeur |
| Orange clair | `#f5a84b` | 245, 168, 75 | Hover accent |
| Orange foncé | `#d97706` | 217, 119, 6 | Hover CTA fort |
| Fond principal | `#1B152D` | 27, 21, 45 | Background body (`bg-gray-900`) |
| Fond secondaire | `#312550` | 49, 37, 80 | Cards, header, sections (`bg-gray-800`) |
| Fond tertiaire | `#463673` | 70, 54, 115 | Inputs, boutons secondaires, sous-éléments (`bg-gray-700`) |
| Texte principal | `#CCC4E3` | 204, 196, 227 | Remplace `#ffffff` — toutes les classes `text-white` |
| Noir | `#000000` | 0, 0, 0 | Fond sombre absolu |
| Blanc | `#ffffff` | 255, 255, 255 | Fond clair uniquement (`bg-white`) |

### Dégradé principal (violet → orange)

```css
background: linear-gradient(to right, #5a4594, #ef8218);
/* En JS : T.gradientMain */
```

---

## Modifier le thème : procédure unique

**Pour changer une couleur, ne modifier qu'un seul fichier : `styles/main.css` (bloc `:root`)**

Toutes les couleurs de la charte sont centralisées dans les variables CSS du `:root`. Le module `js/modules/core/theme.js` les lit via `getComputedStyle` au démarrage et les expose aux managers JS.

```
styles/main.css (:root)          ← SOURCE UNIQUE de toutes les couleurs
       ↓ CSS variables
styles/main.css (.sélecteurs)    ← Lus directement via var()
styles/time-selector.css          ← Lus directement via var()
       ↓ getComputedStyle
js/modules/core/theme.js          ← Lu une fois au chargement
       ↓ import { T }
js/modules/managers/*.js          ← Utilisé dans les templates HTML générés
```

**Ne jamais** écrire des couleurs hex/rgb directement dans les managers JS. Utiliser `T.hexPrimary`, `T.gradientMain`, `T.primaryA(0.5)`, etc.

---

## Variables CSS (`styles/main.css` — `:root`)

```css
:root {
  /* ===== PALETTE ERUDIZZ (modifier ici pour changer le thème) ===== */
  --color-primary:        90, 69, 148;    /* #5a4594 — Violet principal */
  --color-primary-light:  139, 114, 212;  /* #8b72d4 — Violet clair */
  --color-primary-dark:   74, 53, 128;    /* #4a3580 — Violet foncé */
  --color-secondary:      239, 130, 24;   /* #ef8218 — Orange accent */
  --color-accent:         239, 130, 24;   /* #ef8218 — Orange (même que secondary) */
  --color-bg-primary:     27, 21, 45;     /* #1B152D — Fond body */
  --color-bg-secondary:   49, 37, 80;     /* #312550 — Fond cards */
  --color-bg-tertiary:    70, 54, 115;    /* #463673 — Fond inputs/btn-secondary */
  --color-text-primary:   204, 196, 227;  /* #CCC4E3 — Texte principal */
  --color-text-secondary: 155, 146, 176;  /* #9b92b0 — Texte secondaire */
  --color-success:        34, 197, 94;
  --color-error:          239, 68, 68;
  --color-warning:        251, 191, 36;
  --color-info:           90, 69, 148;    /* Violet (remplace bleu) */
  --color-timer-urgent:   239, 68, 68;
  --color-timer-alert:    234, 179, 8;
}
```

---

## Module `theme.js` (`js/modules/core/theme.js`)

Ce module est **la seule interface** entre les variables CSS et le code JS. Il lit les variables CSS une fois au chargement et expose un objet `T` typé.

```javascript
import { T } from '../core/theme.js';

// Couleurs solides
T.primary        // "rgb(90, 69, 148)"
T.primaryLight   // "rgb(139, 114, 212)"
T.secondary      // "rgb(239, 130, 24)"

// Couleurs hex (pour CSS color:)
T.hexPrimary      // "#5a4594"
T.hexPrimaryLight // "#8b72d4"
T.hexSecondary    // "#ef8218"
T.hexTextPrimary  // "#CCC4E3"

// Avec opacité (fonctions)
T.primaryA(0.3)    // "rgba(90, 69, 148, 0.3)"
T.secondaryA(0.3)  // "rgba(239, 130, 24, 0.3)"
T.bgTertiaryA(0.4) // "rgba(70, 54, 115, 0.4)"

// Dégradés prêts à l'emploi
T.gradientMain         // "linear-gradient(to right, rgb(...), rgb(...))"
T.gradientMain135      // Même dégradé à 135°
T.gradientTimerUrgent  // Rouge — timer ≤5s
T.gradientTimerAlert   // Jaune/orange — timer ≤8s
```

**Usage dans un manager :**
```javascript
// CORRECT
style="background:${T.gradientMain};color:${T.hexTextPrimary}"
style="background:${T.primaryA(0.2)};border:1px solid ${T.primaryA(0.5)}"

// INCORRECT (ne jamais faire)
style="background:linear-gradient(to right,#5a4594,#ef8218)"
style="color:#CCC4E3"
```

---

## Configuration Tailwind (`index.html` inline)

```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        gray: {
          700: '#463673',  // fond tertiaire (inputs, btn-secondary)
          800: '#312550',  // fond secondaire (cards, header)
          900: '#1B152D'   // fond principal (body)
        },
        primary: {
          50:  '#f3f0fa',
          400: '#8b72d4',   // violet clair
          500: '#5a4594',   // violet principal ← couleur de base
          600: '#4a3580',   // violet foncé (hover)
          700: '#3a2870',
          800: '#2a1c5c',
          900: '#1a1048'
        },
        accent: {
          400: '#f5a84b',   // orange clair
          500: '#ef8218',   // orange principal ← couleur de base
          600: '#d97706'    // orange foncé (hover)
        }
      },
      fontFamily: {
        sans: ['Heebo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    }
  }
}
```

**Note** : Tailwind ne scanne pas les templates JS générés dynamiquement. Les couleurs dans les managers utilisent donc `style=` inline via `T.*`, et non des classes Tailwind.

---

## Typographie

**Police principale** : **Heebo** (Google Fonts)

| Grammage | Usage |
| --- | --- |
| Thin (100) | Titres légers, grandes tailles |
| Medium (500) | Corps de texte, labels |
| Bold (700) | Titres forts, CTA |
| Black (900) | Hero titles |

**Import Google Fonts (dans `<head>`, avant Tailwind)** :

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;500;700;900&display=swap" rel="stylesheet">
```

---

## Emplacements des couleurs dans le code

### 1. `index.html` — classes Tailwind (charte via config)

| Élément | Classe/Attribut |
| --- | --- |
| Favicon | `<link rel="icon" href="/images/erudizz-favicon.svg">` |
| Theme color PWA | `<meta name="theme-color" content="#5a4594">` |
| Titre h1 hero | `from-primary-400 via-accent-500 to-primary-400` |
| Titre h1 nom joueur | `from-primary-400 to-accent-500` |
| Bouton Commencer (form) | `from-accent-500 to-accent-600` |
| Bouton CTA hero | `from-accent-500 to-accent-600` |
| Barre progression quiz | `from-primary-500 to-accent-500` |
| Hero card bordure | `border-primary-500/20 hover:border-primary-500/50` |
| Badge "Dernier Ajout" | `bg-accent-500/20 border-accent-500/50 text-accent-400` |
| Lien "Explorez" | `text-accent-500 hover:text-accent-400` |
| Total points trophées | `text-accent-500` |
| Hover icônes nav/footer | `hover:text-accent-500` |
| Input focus | `focus:border-primary-500` |

### 2. `styles/main.css` — CSS natif via `var()`

| Sélecteur | Couleur appliquée |
| --- | --- |
| `.text-white` | `#CCC4E3` via CSS override |
| `.text-gray-400` | `#9b92b0` via CSS override — texte secondaire violet désaturé |
| `.feedback-modal-content` (fond) | `rgba(49, 37, 80, 0.97)` — fond secondaire |
| `.feedback-modal-content` (bordure) | `rgba(90, 69, 148, 0.4)` — violet principal |
| `.btn-primary` | `rgb(90, 69, 148)` |
| `.btn-primary:hover` | `rgb(74, 53, 128)` |
| `.btn-primary.selected` | box-shadow ring `rgb(27, 21, 45)` + `rgb(90, 69, 148)` |
| `.btn-secondary` | `rgb(70, 54, 115)` |
| `.btn-secondary:hover` | `rgb(74, 53, 128)` |
| `.btn-secondary.selected` | box-shadow ring `rgb(27, 21, 45)` + `rgb(90, 69, 148)` |
| `.answer-btn:active` | `rgb(70, 54, 115)` — fond tertiaire |
| `.answer-btn:disabled` | `rgb(70, 54, 115)` — fond tertiaire |
| `.rarity-rare` | `rgb(90, 69, 148)` |
| `.badge-rare` | `rgb(90, 69, 148)` |
| `.trophy-card-pokemon:hover` | box-shadow violet |
| `@keyframes card-shine` | drop-shadow violet |

### 3. `styles/time-selector.css`

| Sélecteur | Couleur appliquée |
| --- | --- |
| `.time-option-btn` (fond) | `#463673` |
| `.time-option-btn` (texte) | `#CCC4E3` |
| `.time-option-btn` (bordure) | `#5a4594` |
| `.time-option-btn:hover` (fond) | `#5a4594` |
| `.time-option-btn:hover` (bordure) | `#8b72d4` |
| `.time-option-btn.selected` | `linear-gradient(135deg, rgb(90,69,148), rgb(239,130,24))` |

### 4. `js/modules/managers/*.js` — via `import { T } from '../core/theme.js'`

Tous les managers utilisent le module `theme.js`. Voir la section **Module `theme.js`** ci-dessus pour les helpers disponibles.

| Manager | Éléments utilisant `T.*` |
| --- | --- |
| `quiz-selector.js` | Titres/textes modal, spinner chargement |
| `question-manager.js` | Lettres A/B/C/D, timer badge, barre progression, bouton valider, mode libre, spinner |
| `results-manager.js` | Barre score, section récompenses (fond + bordure), icônes étoiles |
| `history-manager.js` | Badge points gagnés (fond + couleur texte) |
| `trophies-manager.js` | Texte code secret |

### 5. `manifest.json`

```json
"theme_color": "#5a4594",
"background_color": "#5a4594"
```

### 6. `js/modules/managers/rewards-manager.js`

```js
this.storageKey = 'erudizz_rewards';
```

---

## Logo

- Contour en **orange** (`#ef8218`)
- Remplissage en **violet** (`#5a4594`)
- Versions : fond sombre (blanc) / fond clair (coloré orange+violet)

---

## Couleurs non modifiées (sémantiques — à conserver)

| Couleur | Usage | Justification |
| --- | --- | --- |
| `text-green-400` | Bonne réponse, meilleur score | Feedback positif universel |
| `text-red-400` | Mauvaise réponse, pire score | Feedback négatif universel |
| `text-yellow-400` | Trophées, étoiles | Couleur "or" standard |
| `rarity-épique` `rgb(147,51,234)` | Trophées épiques | Rareté distincte du primary, intentionnel |
| `rarity-légendaire` `rgb(249,115,22)` | Trophées légendaires | Accord charte (orange accent) |
| `rarity-commun` `rgb(107,114,128)` | Trophées non débloqués | Gris neutre sémantique |
| Palette `category-colors.js` | Couleurs rotatives des cartes quiz | Décoratives, indépendantes de la charte |
