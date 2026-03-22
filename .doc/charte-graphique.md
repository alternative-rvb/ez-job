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
| Sources logos | `images/logos/CamiLudik/` | Originaux SVG et PNG (couleur + NB) |

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
| **Fredoka** (400, 600) | Titres de section (h1, h2, h3), logo | Google Fonts |
| **Nunito** (400, 600, 700) | Corps de texte, boutons, labels | Google Fonts |

### Règles d'application Fredoka

Tous les titres de pages et sections doivent avoir `font-family:'Fredoka',sans-serif` :
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
| Titres sections | `style="color:#7c4004;font-family:'Fredoka',sans-serif"` |
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

### `js/modules/managers/*.js` - via `T.*`

| Manager | Eléments colorés |
| --- | --- |
| `quiz-selector.js` | Modal temps : titres bruns Fredoka, boutons temps avec indicateur radio |
| `question-manager.js` | Lettre A/B/C/D fond `#66bcb4`, timer badge, barre progression turquoise, bouton valider brun |
| `results-manager.js` | % score `#66bcb4`, barre progress turquoise dégradé, cartes `#f4eadd` |
| `history-manager.js` | Stats cards `#f4eadd`, chiffres `#66bcb4`, résultats beige |
| `trophies-manager.js` | Cartes `#eaddcc`, overlay badge code `rgba(234,221,204,0.85)` |

### Autres fichiers

| Fichier | Couleur |
| --- | --- |
| `manifest.json` | `"theme_color": "#66bcb4"`, `"background_color": "#fbf3ea"` |
| `index.html` `<meta theme-color>` | `#66bcb4` |
