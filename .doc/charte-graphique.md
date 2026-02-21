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
/* ou en CSS inline : style="background:linear-gradient(to right,#5a4594,#ef8218)" */
```

---

## Configuration Tailwind (index.html inline)

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

---

## Variables CSS (styles/main.css — :root)

```css
--color-primary:   90, 69, 148;    /* Violet #5a4594 */
--color-secondary: 239, 130, 24;   /* Orange #ef8218 */
--color-accent:    239, 130, 24;   /* Orange #ef8218 */
--color-info:      90, 69, 148;    /* Violet (remplace bleu) */
```

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

**CSS global (styles/main.css)** :

```css
body, html {
  font-family: 'Heebo', ui-sans-serif, system-ui, sans-serif;
}
```

---

## Emplacements des couleurs dans le code

### 1. `index.html`

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

### 2. `styles/main.css`

| Sélecteur | Couleur appliquée |
| --- | --- |
| `.text-white` | `#CCC4E3` via CSS override dans `main.css` |
| `.text-gray-400` | `#9b92b0` via CSS override dans `main.css` — texte secondaire violet désaturé |
| `.feedback-modal-content` (fond) | `rgba(49, 37, 80, 0.97)` — fond secondaire `#312550` |
| `.feedback-modal-content` (bordure) | `rgba(90, 69, 148, 0.4)` — violet principal |
| `.btn-primary` | `rgb(90, 69, 148)` — violet |
| `.btn-primary:hover` | `rgb(74, 53, 128)` — violet foncé |
| `.btn-primary.selected` | box-shadow ring `rgb(27, 21, 45)` + `rgb(90, 69, 148)` |
| `.btn-secondary` | `rgb(70, 54, 115)` — `#463673` |
| `.btn-secondary:hover` | `rgb(74, 53, 128)` — violet foncé |
| `.btn-secondary.selected` | box-shadow ring `rgb(27, 21, 45)` + `rgb(90, 69, 148)` |
| `.answer-btn:active` | `rgb(70, 54, 115)` — `#463673` fond tertiaire |
| `.answer-btn:disabled` | `rgb(70, 54, 115)` — `#463673` fond tertiaire |
| `.rarity-rare` | `rgb(90, 69, 148)` — violet |
| `.badge-rare` | `rgb(90, 69, 148)` — violet |
| `.trophy-card-pokemon:hover` | box-shadow violet |
| `@keyframes card-shine` | drop-shadow violet |

### 3. `styles/time-selector.css`

| Sélecteur | Couleur appliquée |
| --- | --- |
| `.time-option-btn` (fond) | `#463673` — fond tertiaire |
| `.time-option-btn` (texte) | `#CCC4E3` — texte principal |
| `.time-option-btn` (bordure) | `#5a4594` — violet principal |
| `.time-option-btn:hover` (fond) | `#5a4594` — violet principal |
| `.time-option-btn:hover` (bordure) | `#8b72d4` — violet clair |
| `.time-option-btn.selected` | `linear-gradient(135deg, rgb(90,69,148), rgb(239,130,24))` |

### 4. `js/modules/managers/quiz-selector.js`

| Élément | Valeur |
| --- | --- |
| Bouton temps sélectionné (défaut) | `from-primary-500 to-accent-500 border-primary-400` |
| En-tête modal temps | `from-primary-600 to-primary-500` |
| Titre modal (`h2`) | `style="color:#CCC4E3"` |
| Sous-titre modal | `style="color:#CCC4E3;opacity:0.75"` |
| Description modale | `style="color:#CCC4E3"` |
| Bouton Annuler | `style="color:#CCC4E3"` |
| Spinner chargement | `style="border-bottom:4px solid #5a4594"` |

### 5. `js/modules/managers/question-manager.js`

| Élément | Valeur |
| --- | --- |
| Lettre A/B/C/D | `style="background-color:#5a4594"` |
| Badge timer (fond) | `style="background:linear-gradient(to right,#5a4594,#ef8218)"` |
| Badge timer urgence (≤5s) | `style="background:linear-gradient(to right,#ef4444,#dc2626)"` |
| Badge timer alerte (≤8s) | `style="background:linear-gradient(to right,#eab308,#f97316)"` |
| Conteneur progress bar | `style="background:rgba(70,54,115,0.4)"` + `border-gray-700` |
| Barre progression (intérieure) | `style="background:linear-gradient(to right,#5a4594,#ef8218);width:…%"` |
| Bouton valider texte | `style="background:linear-gradient(to right,#5a4594,#ef8218)"` |
| Mode Libre bloc | `style="background:rgba(90,69,148,0.2);border:2px solid rgba(90,69,148,0.5)"` |
| Spinner chargement | `style="border-bottom:2px solid #5a4594"` |

### 6. `js/modules/managers/results-manager.js`

| Élément | Valeur |
| --- | --- |
| Barre score | `style="background:linear-gradient(to right,#5a4594,#ef8218)"` |
| Section récompenses | `style="background:linear-gradient(to right,rgba(90,69,148,0.5),rgba(239,130,24,0.3));border:1px solid rgba(90,69,148,0.5)"` |

### 7. `js/modules/managers/history-manager.js`

| Élément | Valeur |
| --- | --- |
| Stats (total/moyenne) | `text-accent-500` |
| Badge points gagnés | `style="background:rgba(90,69,148,0.3);color:#8b72d4"` |

### 8. `manifest.json`

```json
"theme_color": "#5a4594",
"background_color": "#5a4594"
```

### 9. `sw.js`

```js
const CACHE_NAME = `erudizz-${CACHE_VERSION}`;
// filtre: cacheName.startsWith('erudizz-')
```

### 10. `js/modules/managers/rewards-manager.js`

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
| `text-yellow-300` (code secret trophée) → `#CCC4E3` inline | Page trophées, `trophies-manager.js` | Aligné sur la couleur de texte principale |
| `text-green-400` | Bonne réponse, meilleur score | Feedback positif universel |
| `text-red-400` | Mauvaise réponse, pire score | Feedback négatif universel |
| `text-yellow-400` | Trophées, étoiles | Couleur "or" standard |
| `rarity-épique` `rgb(147,51,234)` | Trophées épiques | Rareté distincte du primary |
| `rarity-légendaire` `rgb(249,115,22)` | Trophées légendaires | Accord charte (orange accent) |
| Palette `category-colors.js` | Couleurs rotatives des cartes quiz | Décoratives, indépendantes |
