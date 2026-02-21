# Charte Graphique — Erudizz

---

## Pour changer le thème (résumé rapide)

> Modifier uniquement **`styles/main.css`** (bloc `:root`) + les 4 hex dans **`js/modules/core/theme.js`** + la config Tailwind dans **`index.html`**.
> Tout le reste se propage automatiquement.

---

## 1. Identité visuelle

| Élément | Fichier | Valeur |
| --- | --- | --- |
| Logo | `images/erudizz-logo.svg` | Lettre "a" bulle de dialogue — contour orange, remplissage violet |
| Favicon | `images/erudizz-favicon.svg` | Même motif |
| Nom | — | **Erudizz** |

---

## 2. Palette de couleurs

| Rôle | Nom | Hex | RGB |
| --- | --- | --- | --- |
| Primaire | Violet principal | `#5a4594` | 90, 69, 148 |
| Primaire clair | Violet clair | `#8b72d4` | 139, 114, 212 |
| Primaire foncé | Violet foncé | `#4a3580` | 74, 53, 128 |
| Accent | Orange | `#ef8218` | 239, 130, 24 |
| Accent clair | Orange clair | `#f5a84b` | 245, 168, 75 |
| Accent foncé | Orange foncé | `#d97706` | 217, 119, 6 |
| Fond principal | — | `#1B152D` | 27, 21, 45 |
| Fond secondaire | — | `#312550` | 49, 37, 80 |
| Fond tertiaire | — | `#463673` | 70, 54, 115 |
| Texte principal | — | `#CCC4E3` | 204, 196, 227 |
| Texte secondaire | — | `#9b92b0` | 155, 146, 176 |

**Dégradé principal** : violet → orange, utilisé sur les boutons CTA, la barre de progression, le logo.

---

## 3. Typographie

**Police** : [Heebo](https://fonts.google.com/specimen/Heebo) (Google Fonts)

| Grammage | Usage |
| --- | --- |
| 100 — Thin | Titres décoratifs, grandes tailles |
| 500 — Medium | Corps de texte, labels |
| 700 — Bold | Titres, boutons |
| 900 — Black | Hero titles |

---

## 4. Couleurs sémantiques (ne pas modifier)

Ces couleurs ont un sens fonctionnel universel, indépendant du thème.

| Couleur | Classe Tailwind | Usage |
| --- | --- | --- |
| Vert | `text-green-400` | Bonne réponse, meilleur score |
| Rouge | `text-red-400` | Mauvaise réponse, pire score |
| Jaune | `text-yellow-400` | Étoiles, trophées "or" |
| Gris | `rgb(107, 114, 128)` | Trophées non débloqués (rareté "commun") |
| Violet vif | `rgb(147, 51, 234)` | Trophées "épique" (distinct du primary) |

La palette `category-colors.js` (couleurs des cartes quiz) est aussi intentionnellement indépendante.

---

## 5. Système de thème — comment ça marche

```
styles/main.css  (:root)          ← SOURCE UNIQUE — modifier ici pour changer le thème
    │
    ├── styles/main.css           ← Lues via var(--color-*)
    ├── styles/time-selector.css  ← Lues via var(--color-*)
    │
    └── js/modules/core/theme.js  ← Lues une fois au démarrage via getComputedStyle
            │
            └── js/modules/managers/*.js  ← import { T } → T.gradientMain, T.primaryA(0.5)…
```

### Les 3 endroits à modifier pour changer le thème

#### A — `styles/main.css` (`:root`) — valeurs RGB brutes

```css
:root {
  --color-primary:        90, 69, 148;   /* #5a4594 */
  --color-primary-light:  139, 114, 212; /* #8b72d4 */
  --color-primary-dark:   74, 53, 128;   /* #4a3580 */
  --color-secondary:      239, 130, 24;  /* #ef8218 */
  --color-accent:         239, 130, 24;  /* #ef8218 */
  --color-bg-primary:     27, 21, 45;    /* #1B152D */
  --color-bg-secondary:   49, 37, 80;    /* #312550 */
  --color-bg-tertiary:    70, 54, 115;   /* #463673 */
  --color-text-primary:   204, 196, 227; /* #CCC4E3 */
  --color-text-secondary: 155, 146, 176; /* #9b92b0 */
  --color-success:        34, 197, 94;
  --color-error:          239, 68, 68;
  --color-warning:        251, 191, 36;
  --color-info:           90, 69, 148;
  --color-timer-urgent:   239, 68, 68;
  --color-timer-alert:    234, 179, 8;
}
```

> **Format RGB brut** (sans `rgb()`) pour pouvoir les combiner avec une opacité : `rgba(var(--color-primary), 0.5)`.

#### B — `js/modules/core/theme.js` — valeurs hex (4 lignes)

```js
hexPrimary:      '#5a4594',
hexPrimaryLight: '#8b72d4',
hexSecondary:    '#ef8218',
hexTextPrimary:  '#CCC4E3',
```

Ces 4 valeurs sont les seules couleurs "en dur" du projet — elles servent uniquement pour les propriétés CSS `color:` et `border-color:` dans les templates JS, où `rgba()` n'est pas nécessaire.

#### C — `index.html` (config Tailwind inline)

```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        gray: {
          700: '#463673',  // fond tertiaire
          800: '#312550',  // fond secondaire
          900: '#1B152D'   // fond principal
        },
        primary: {
          400: '#8b72d4',
          500: '#5a4594',  // ← couleur de base
          600: '#4a3580',
        },
        accent: {
          400: '#f5a84b',
          500: '#ef8218',  // ← couleur de base
          600: '#d97706'
        }
      }
    }
  }
}
```

---

## 6. Helpers `theme.js` — référence technique

```js
import { T } from '../core/theme.js';
```

| Helper | Type | Valeur produite |
| --- | --- | --- |
| `T.primary` | string | `"rgb(90, 69, 148)"` |
| `T.primaryLight` | string | `"rgb(139, 114, 212)"` |
| `T.primaryDark` | string | `"rgb(74, 53, 128)"` |
| `T.secondary` | string | `"rgb(239, 130, 24)"` |
| `T.hexPrimary` | string | `"#5a4594"` |
| `T.hexPrimaryLight` | string | `"#8b72d4"` |
| `T.hexSecondary` | string | `"#ef8218"` |
| `T.hexTextPrimary` | string | `"#CCC4E3"` |
| `T.primaryA(a)` | function | `"rgba(90, 69, 148, a)"` |
| `T.secondaryA(a)` | function | `"rgba(239, 130, 24, a)"` |
| `T.bgTertiaryA(a)` | function | `"rgba(70, 54, 115, a)"` |
| `T.gradientMain` | string | `"linear-gradient(to right, rgb(…), rgb(…))"` |
| `T.gradientMain135` | string | Même dégradé à 135° |
| `T.gradientTimerUrgent` | string | Rouge — timer ≤ 5s |
| `T.gradientTimerAlert` | string | Jaune/orange — timer ≤ 8s |

**Règle** : dans un manager JS, toujours utiliser `T.*`. Ne jamais écrire de hex/rgb en dur.

```js
// CORRECT
`style="background:${T.gradientMain}"`
`style="background:${T.primaryA(0.2)};border:1px solid ${T.primaryA(0.5)}"`

// INCORRECT
`style="background:linear-gradient(to right,#5a4594,#ef8218)"`
`style="color:#CCC4E3"`
```

---

## 7. Référence des emplacements par fichier

### `index.html` — classes Tailwind

| Élément | Classe |
| --- | --- |
| Theme color PWA | `<meta name="theme-color" content="#5a4594">` |
| Titres hero | `from-primary-400 via-accent-500 to-primary-400` |
| Boutons CTA | `from-accent-500 to-accent-600` |
| Barre progression | `from-primary-500 to-accent-500` |
| Input focus | `focus:border-primary-500` |
| Hover icônes | `hover:text-accent-500` |

### `styles/main.css` — CSS natif

| Sélecteur | Effet |
| --- | --- |
| `.text-white` override | `#CCC4E3` au lieu de blanc pur |
| `.text-gray-400` override | `#9b92b0` — texte secondaire violet |
| `.btn-primary` | Violet principal + hover foncé |
| `.btn-secondary` | Fond tertiaire + hover foncé |
| `.btn-*.selected` | Box-shadow ring violet |
| `.answer-btn:active/disabled` | Fond tertiaire `#463673` |
| `.rarity-rare` / `.badge-rare` | Violet principal |
| `.feedback-modal-content` | Fond secondaire + bordure violette |

### `styles/time-selector.css`

| Sélecteur | Effet |
| --- | --- |
| `.time-option-btn` | Fond tertiaire, texte principal, bordure primaire |
| `.time-option-btn:hover` | Fond primaire, bordure claire |
| `.time-option-btn.selected` | Dégradé violet → orange 135° |

### `js/modules/managers/*.js` — via `T.*`

| Manager | Éléments |
| --- | --- |
| `quiz-selector.js` | Titres/textes modal, spinner |
| `question-manager.js` | Lettres A/B/C/D, timer badge, barre progression, bouton valider, mode libre, spinner |
| `results-manager.js` | Barre score, section récompenses |
| `history-manager.js` | Badge points gagnés |
| `trophies-manager.js` | Texte code secret |

### Autres fichiers

| Fichier | Couleur |
| --- | --- |
| `manifest.json` | `"theme_color": "#5a4594"` |
| `index.html` `<meta theme-color>` | `#5a4594` |
