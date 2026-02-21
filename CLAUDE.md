# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Charte graphique

La charte graphique complète (palette, typographie, emplacements des couleurs dans le code) est dans @.doc/charte-graphique.md.

**Règle importante** : toujours mettre à jour `.doc/charte-graphique.md` après chaque changement de couleur ou de style. Ce fichier est la source de vérité pour l'identité visuelle.

### Système de thème centralisé

**Pour changer une couleur de la charte : ne modifier que `styles/main.css` (bloc `:root`).** Les valeurs se propagent automatiquement partout.

Architecture :
- `styles/main.css` (`:root`) — source unique de toutes les couleurs (variables CSS `--color-*`)
- `js/modules/core/theme.js` — lit les variables CSS via `getComputedStyle` au démarrage et expose l'objet `T`
- `js/modules/managers/*.js` — importent `{ T }` et utilisent `T.gradientMain`, `T.primaryA(0.5)`, etc. dans les templates HTML

**Règles d'usage dans les managers JS :**
- Toujours utiliser `T.*` pour les couleurs dans les `style=""` inline
- Ne jamais écrire de valeurs hex/rgb directement dans les managers
- Voir `theme.js` pour la liste complète des helpers disponibles (`T.hexPrimary`, `T.primaryA()`, `T.gradientMain`, etc.)

**Couleurs intentionnellement hors charte (ne pas modifier) :**
- `category-colors.js` — palette décorative rotative des cartes quiz
- `rarity-épique` `rgb(147,51,234)` — rareté distincte du primary
- `rarity-commun` `rgb(107,114,128)` — gris neutre sémantique pour trophées non débloqués
- Couleurs sémantiques vert/rouge/jaune (`text-green-400`, `text-red-400`, `text-yellow-400`) — feedback utilisateur universel

## Project Overview

Erudizz est une application de quiz interactifs construite avec Vanilla JavaScript ES6 modules et Tailwind CSS. Elle dispose d'un thème sombre violet/orange, d'un suivi des joueurs via localStorage, d'un historique des quiz et de plusieurs modes de jeu (normal/spoiler).

## Development Commands

### Local Development

```bash
# Start development server with auto-generated index (recommended)
npm run dev

# Build the project (generates quiz index)
npm run build

# Generate quiz index manually
npm run generate-index
# or directly:
python3 api.py generate-index

# Validate quiz files
npm run validate              # Validate all quizzes in js/data/
node scripts/validate-quiz.js path/to/quiz.json  # Validate specific file

# Version management
npm run update-version        # Increment version + update all files automatically (RECOMMANDÉ)
npm run bump-version          # Increment patch version only (1.0.0 -> 1.0.1) - manuel
```

### Testing the Application

- Start a local server: `python3 -m http.server 8000` or `npm run dev`
- Navigate to `http://localhost:8000`
- The app uses ES6 modules, so it MUST run through a server (not file://)

## Architecture Overview

### Module Structure (ES6 Modules)

The application follows a clean modular architecture with separation of concerns:

```plaintext
job-ez/
├── index.html                # Main HTML (605 lines, simplifié)
├── sw.js                     # Service Worker PWA (offline support)
├── styles/
│   ├── main.css             # CSS externalisé (animations, trophées, modales)
│   └── time-selector.css    # CSS pour le sélecteur de temps
├── scripts/
│   ├── validate-quiz.js     # Script de validation des quiz
│   └── update-version.js    # Script automatique de mise à jour de version
├── js/
│   ├── app.js                    # Main entry point, bootstraps QuizApp
│   ├── modules/
│   │   ├── core/                 # Core functionality
│   │   │   ├── config.js        # Global configuration (singleton AppConfig class)
│   │   │   ├── state.js         # Centralized state management (QuizState class)
│   │   │   ├── player.js        # Player data & localStorage persistence
│   │   │   ├── version.js       # Version management & cache-busting
│   │   │   ├── category-colors.js # Category color mappings
│   │   │   └── utils.js         # Shared utilities (confetti, JSON loading, array shuffle)
│   │   ├── ui/
│   │   │   └── dom.js           # DOM manipulation (DOMManager class)
│   │   └── managers/            # Business logic managers
│   │       ├── quiz-selector.js  # Quiz selection and filtering
│   │       ├── question-manager.js # Question display and timer logic
│   │       ├── results-manager.js  # Results display and navigation
│   │       ├── history-manager.js  # Player history tracking
│   │       ├── trophies-manager.js # Trophy display and management
│   │       └── rewards-manager.js  # Trophy rewards system
│   └── data/                    # Quiz JSON files
│       ├── index.json           # Auto-generated quiz index
│       ├── trophies.json        # Trophy definitions
│       └── *.json               # Individual quiz files
├── images/
│   ├── quiz/                    # Quiz-specific images (11 dossiers)
│   │   ├── animaux/
│   │   ├── jules-ferry-ecole/
│   │   ├── la-terre/
│   │   ├── le-petit-nicolas/
│   │   ├── le-petrole-et-l-energie/
│   │   ├── spongebob/
│   │   ├── systeme-solaire/
│   │   ├── unites-mesure/
│   │   └── white-tiger/
│   └── trophies/
│       └── characters/         # Centralized trophy character images
│           ├── spongebob/      # SpongeBob characters (10 trophées)
│           ├── les-sisters/    # Les Sisters characters (2 trophées)
│           └── spy-x-family/   # Spy × Family characters (23 trophées)
└── .doc/                        # Internal documentation (optional)
    └── quiz-format-specification.md
```

### Key Design Patterns

**Singleton Pattern**: Core modules (`config.js`, `state.js`, `player.js`, `domManager`) export singleton instances for global state.

**Manager Pattern**: Business logic is encapsulated in manager classes that handle specific concerns (quiz selection, questions, results, history).

**State Centralization**: All quiz state is managed through `quizState` in `state.js`. This includes current question index, score, timer state, user answers, and timing data.

**Event-Driven Architecture**: The main `QuizApp` class coordinates managers through callback functions passed to constructors.

### Data Flow

1. **App Initialization** (`app.js`):
   - Check if player name exists in localStorage
   - Show player name screen OR quiz selection
   - Initialize all manager instances

2. **Quiz Selection** (`quiz-selector.js`):
   - Load quiz list from `index.json` (auto-generated)
   - Apply category filters based on `CONFIG.categoryFilter`
   - Render quiz cards with dynamic metadata
   - Callback to `app.startQuiz()` on selection

3. **Quiz Execution** (`question-manager.js`):
   - Load quiz data from JSON file
   - Shuffle questions (via `utils.shuffleArray()`)
   - Initialize `quizState` with quiz data
   - Display questions one by one with timer
   - Handle answer submission and validation
   - Record answers and correctness in state

4. **Results Display** (`results-manager.js`):
   - Calculate final score from `quizState`
   - Save result to `playerManager` (persisted to localStorage)
   - Show animated SVG progress circle
   - Display personalized messages and confetti

5. **Player Persistence** (`player.js`):
   - Store player name in localStorage
   - Track all quiz results with metadata (score, time, date, category)
   - Provide statistics (average score, best/worst, total time)

## Quiz Data Structure

### Auto-Generated Index (`js/data/index.json`)

The `api.py` script scans `js/data/` and generates this index:

```json
{
  "quizzes": ["quiz-id-1", "quiz-id-2", "..."],
  "categories": ["CM2", "Coaching", "Divertissement", "Développement"],
  "count": 21,
  "lastUpdated": "ISO-8601-timestamp",
  "generated_by": "api.py"
}
```

### Quiz File Format (`js/data/*.json`)

Chaque quiz est un fichier JSON avec deux sections principales : `config` (métadonnées) et `questions` (contenu).

#### Structure complète

```json
{
  "config": {
    "title": "Titre du Quiz",
    "description": "Description brève et engageante du quiz",
    "imageUrl": "",
    "spoilerMode": true,
    "difficulty": "Facile",
    "questionCount": 20,
    "category": "Développement",
    "createdAt": "2024-06-15",
    "tag": ["Programmation", "Web"]
  },
  "questions": [
    {
      "id": 1,
      "question": "Texte de la question ?",
      "choices": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "imageUrl": "https://example.com/image.jpg"
    }
  ]
}
```

#### Champs de configuration (`config`)

| Champ | Type | Obligatoire | Description | Exemples |
|-------|------|-------------|-------------|----------|
| `title` | string | ✅ | Titre du quiz affiché dans la carte | `"JavaScript Fondamentaux"`, `"Bob l'Éponge"` |
| `description` | string | ✅ | Description courte du quiz | `"Testez vos connaissances de base en JavaScript"` |
| `imageUrl` | string | ❌ | URL d'image pour la carte du quiz (rarement utilisé) | `""` (généralement vide) |
| `spoilerMode` | boolean | ✅ | Active le floutage des images de questions | `true` (images floues), `false` (images visibles) |
| `difficulty` | string/number | ✅ | Niveau de difficulté affiché | **Numérique** (recommandé): `1`, `2`, `3`, `4`, `5` OU **String** (ancien format): `"Facile"`, `"Moyen"`, `"Difficile"` |
| `questionCount` | number | ✅ | Nombre total de questions | `10`, `20` (doit correspondre au nombre réel) |
| `category` | string | ✅ | Catégorie principale du quiz | `"Développement"`, `"CM2"`, `"Coaching"`, `"Divertissement"` |
| `createdAt` | string | ❌ | Date de création du quiz (format ISO 8601: YYYY-MM-DD) | `"2024-06-15"`, `"2026-01-11"` |
| `tag` | array | ❌ | Tags secondaires pour filtrage | `["Programmation", "Web"]`, `["Nature", "Animaux"]` |

**Note sur `createdAt`**:

- Les quiz sont triés par date de création (du plus récent au plus ancien) dans la sélection
- Les quiz créés dans les 30 derniers jours affichent un badge "NEW" vert sur leur carte
- Format obligatoire: `YYYY-MM-DD` (ex: `2024-06-15`)
- Ce champ est optionnel mais recommandé pour tous les nouveaux quiz

#### Champs de question (`questions`)

**Deux types de questions sont supportés** :

1. **Questions à choix multiples** : utiliser `choices` + `correctAnswer`
2. **Questions à saisie libre** : utiliser `acceptedAnswers` (RECOMMANDÉ) OU `answer` (champ de texte avec validation en temps réel)

**⚠️ Important** : Une question doit avoir SOIT `choices`+`correctAnswer`, SOIT `answer`/`acceptedAnswers`, mais PAS les deux !

| Champ | Type | Obligatoire | Description | Exemples |
|-------|------|-------------|-------------|----------|
| `id` | number | ❌ | Identifiant unique de la question | `1`, `2`, `3` (optionnel, certains quiz n'en ont pas) |
| `question` | string | ✅ | Texte de la question | `"Qu'est-ce que JavaScript ?"` |
| `choices` | array[4] | ⚠️ | Tableau de 4 choix de réponses (QCM uniquement) | `["Option 1", "Option 2", "Option 3", "Option 4"]` |
| `correctAnswer` | string | ⚠️ | La réponse correcte pour QCM (DOIT être identique à un des `choices`) | `"Option 1"` |
| `answer` | string | ⚠️ | Une seule réponse acceptée (déprécié, utiliser `acceptedAnswers`) | `"Monday"` |
| `acceptedAnswers` | array | ⚠️ | Plusieurs réponses acceptées pour saisie libre (RECOMMANDÉ) | `["Monday", "monday"]`, `["Trousers", "Pants"]` |
| `imageUrl` | string/null | ❌ | URL de l'image associée à la question | `"/images/quiz/tigre-blanc/white-tiger.jpg"`, `null` |

**Notes sur les types de questions** :
- **QCM** : Nécessite `choices` (array de 4 éléments) ET `correctAnswer` (string)
- **Saisie libre** : Nécessite `acceptedAnswers` (array, RECOMMANDÉ) OU `answer` (string, rétrocompatible)
- La validation est **insensible à la casse** et ignore les espaces de début/fin (trim)
- **Validation en temps réel** : Le champ devient vert dès que la réponse est correcte
- **Auto-soumission** : La réponse est validée automatiquement 1 seconde après la saisie correcte
- Utiliser `acceptedAnswers` pour permettre plusieurs orthographes : `["Trousers", "Pants", "trousers", "pants"]`

#### Catégories disponibles

Basées sur l'analyse de l'existant :

- **Développement** : Quiz techniques (JavaScript, Dev Web, etc.)
- **CM2** : Quiz éducatifs pour niveau CM2 (français, math, sciences)
- **Coaching** : Quiz sur la carrière et soft skills (entretiens, comportement)
- **Divertissement** : Quiz culture pop et loisirs (Bob l'Éponge, animaux, etc.)

#### Gestion des images

**Deux approches d'images** :

1. **Images locales** (recommandé pour nouveaux quiz) :
   - Placer les images dans `/images/quiz/[nom-du-quiz]/`
   - Exemple : `/images/quiz/white-tiger/white-tiger-1.webp`
   - Avantage : contrôle total, pas de dépendance externe

2. **Images externes** (URLs absolues) :
   - URLs Unsplash, Wikipedia, ou autres sources
   - Exemple : `"https://images.unsplash.com/photo-123..."`
   - Avantage : pas de gestion locale, mais risque de liens brisés

3. **Pas d'image** :
   - Mettre `null` ou omettre le champ `imageUrl`
   - Exemple : quiz connecteurs-logiques (toutes les questions sans image)

#### SpoilerMode : Quand l'utiliser ?

- **`spoilerMode: true`** : Les images révèlent la réponse ou donnent un indice fort
  - Exemple : Quiz Bob l'Éponge (image du personnage = réponse)
  - Exemple : Quiz Tigre Blanc (images spécifiques aux réponses)

- **`spoilerMode: false`** : Les images sont décoratives ou contextuelles
  - Exemple : Quiz Le Petit Nicolas (même image pour tout le chapitre)
  - Exemple : Quiz sans images

#### Exemples de quiz types

**Quiz technique (JavaScript)** :
```json
{
  "config": {
    "title": "JavaScript Fondamentaux",
    "description": "Testez vos connaissances de base en JavaScript",
    "imageUrl": "",
    "spoilerMode": true,
    "difficulty": "Facile",
    "questionCount": 20,
    "category": "Développement",
    "tag": ["Programmation", "Web"]
  },
  "questions": [
    {
      "id": 1,
      "question": "Qu'est-ce que JavaScript ?",
      "choices": [
        "Un langage de programmation",
        "Un outil de design graphique",
        "Un système d'exploitation",
        "Un logiciel de gestion de base de données"
      ],
      "correctAnswer": "Un langage de programmation",
      "imageUrl": "https://oracle-devrel.github.io/devo-image-repository/seo-thumbnails/JavaScript---Thumbnail-1200-x-630.jpg"
    }
  ]
}
```

**Quiz divertissement (Bob l'Éponge)** :
```json
{
  "config": {
    "title": "Bob l'Éponge",
    "description": "Tout sur votre éponge préférée de Bikini Bottom",
    "imageUrl": "",
    "spoilerMode": true,
    "difficulty": "Facile",
    "questionCount": 10,
    "category": "Divertissement",
    "tag": ["Divertissement", "Culture pop"]
  },
  "questions": [
    {
      "question": "Quel est le nom complet de Bob l'éponge ?",
      "choices": [
        "Bob l'éponge Carlo",
        "Bob l'éponge Pantalon Carré",
        "Bob l'éponge Éponge",
        "Bob Éponge Carré"
      ],
      "correctAnswer": "Bob Éponge Carré",
      "imageUrl": "/images/characters/spongebob/SpongeBob_stock_art.webp"
    }
  ]
}
```

**Quiz éducatif (CM2)** :
```json
{
  "config": {
    "title": "Les connecteurs logiques",
    "description": "Teste tes connaissances sur les mots qui servent à lier les idées",
    "imageUrl": "",
    "spoilerMode": true,
    "difficulty": "Facile",
    "questionCount": 10,
    "category": "CM2",
    "tag": ["Français", "Grammaire"]
  },
  "questions": [
    {
      "question": "Quel mot peut commencer une histoire ?",
      "choices": [
        "Tout d'abord",
        "Mais",
        "Parce que",
        "Enfin"
      ],
      "correctAnswer": "Tout d'abord",
      "imageUrl": null
    }
  ]
}
```

**Quiz coaching (Entretien)** :
```json
{
  "config": {
    "title": "Entretien Développeur Web 1",
    "description": "Questions d'entretien pour évaluer les compétences comportementales et techniques des développeurs web",
    "imageUrl": "",
    "spoilerMode": true,
    "difficulty": "Moyen",
    "questionCount": 20,
    "category": "Coaching",
    "tag": ["Carrière", "Entretien"]
  },
  "questions": [
    {
      "id": 1,
      "question": "Quelle est votre principale motivation pour postuler à ce poste de développeur web ?",
      "choices": [
        "Le salaire attractif",
        "L'opportunité d'apprendre de nouvelles technologies",
        "La proximité géographique",
        "Les horaires flexibles"
      ],
      "correctAnswer": "L'opportunité d'apprendre de nouvelles technologies",
      "imageUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?..."
    }
  ]
}
```

**Quiz mixte (choix multiples + saisie libre)** :

```json
{
  "config": {
    "title": "Vocabulaire Anglais - Test Mixte",
    "description": "Quiz mêlant choix multiples et saisie de réponses",
    "imageUrl": "",
    "spoilerMode": false,
    "difficulty": "Facile",
    "questionCount": 4,
    "category": "CM2",
    "tag": ["Anglais", "Vocabulaire"]
  },
  "questions": [
    {
      "id": 1,
      "question": "Comment dit-on 'lundi' en anglais ? (Entrez votre réponse)",
      "answer": "Monday",
      "imageUrl": null
    },
    {
      "id": 2,
      "question": "Quel est le premier jour de la semaine ?",
      "choices": [
        "Monday",
        "Sunday",
        "Tuesday",
        "Saturday"
      ],
      "correctAnswer": "Monday",
      "imageUrl": null
    },
    {
      "id": 3,
      "question": "Tapez la traduction de 'rouge' en anglais",
      "answer": "Red",
      "imageUrl": null
    },
    {
      "id": 4,
      "question": "Comment dit-on 'bleu' en anglais ?",
      "choices": [
        "Blue",
        "Black",
        "Brown",
        "Red"
      ],
      "correctAnswer": "Blue",
      "imageUrl": null
    }
  ]
}
```

#### Checklist de création d'un quiz

1. **Choisir le nom du fichier** : `[slug-kebab-case].json` dans `js/data/`
2. **Définir la configuration** :
   - Titre accrocheur et description engageante
   - Catégorie appropriée (Développement, CM2, Coaching, Divertissement)
   - Difficulté réaliste (Facile/Moyen/Difficile)
   - `spoilerMode: true` si les images révèlent les réponses
   - `questionCount` exact
3. **Créer les questions** :
   - Minimum 10 questions, recommandé 20
   - **Pour QCM** : Exactement 4 choix de réponses + `correctAnswer` DOIT être une copie exacte d'un des `choices`
   - **Pour saisie libre** : Un seul champ `answer` (validation insensible à la casse)
   - Possibilité de **mixer les deux types** dans un même quiz
   - Images optionnelles (locales ou externes)
4. **Valider le quiz** : `npm run validate`
5. **Régénérer l'index** : `npm run generate-index`
6. **Tester localement** : `npm run dev`
7. **Commiter les deux fichiers** : le quiz JSON + `index.json`

#### Règles importantes

- **JAMAIS** de faute de frappe entre `correctAnswer` et `choices` (sensible à la casse)
- **JAMAIS** mélanger `choices`+`correctAnswer` avec `answer` dans la même question
- Toujours mettre `questionCount` égal au nombre réel de questions
- Les `id` de questions sont optionnels (certains quiz en ont, d'autres non)
- Les images `null` sont valides (quiz sans images)
- Le champ `tag` est optionnel mais recommandé pour un meilleur filtrage
- Le champ `imageUrl` de config est rarement utilisé (laisser vide)
- La validation de `answer` est **insensible à la casse** : `"Monday"` = `"monday"` = `"MONDAY"`

## Important Implementation Details

### Configuration System

The `CONFIG` object in `config.js` is a singleton class instance that:

- Detects if running in `/private/` path (different category filtering)
- Manages global settings: `timeLimit`, `freeMode`, `categoryFilter`, `showResponse`
- Can be updated at runtime (e.g., when user selects different time limit)

### State Management

The `quizState` object in `state.js` manages:

- Current quiz and questions array
- Current question index and score
- Timer state (`timeRemaining`, `timerInterval`)
- User answers tracking (`userAnswers`, `userAnswersCorrect`)
- Timing data for analytics (`questionStartTime`, `totalTime`)

**Important**: Always call `quizState.reset()` before starting a new quiz to clear previous state.

### Player System

The `playerManager` in `player.js`:

- Requires player name before showing quizzes
- Persists all results to localStorage as `playerResults`
- Each result includes: quizId, score, percentage, timeSpent, date, difficulty, category
- Provides `getStats()` for aggregated analytics

### Trophy System

The application features a comprehensive trophy system managed by `trophies-manager.js` and `rewards-manager.js`:

**Trophy Collection**:
- **35 trophées** répartis en 3 séries thématiques
- **Série 1**: Les Sisters (2 trophées) - Wendy, Marine
- **Série 2**: Spy × Family (23 trophées) - Famille Forger (Loid, Yor, Anya, Bond) + personnages principaux
- **Série 3**: Bob l'Éponge (10 trophées) - Bob, Patrick, Carlo, Sandy, M. Krabs, etc.

**Rarity System**:
- Légendaire (legendary)
- Épique (epic)
- Rare (rare)
- Commun (common)

**Trophy Structure** (`trophies.json`):
```json
{
  "id": "trophy_001",
  "name": "Wendy",
  "series": "Les Sisters",
  "description": "La grande sœur rebelle et passionnée",
  "image": "/images/trophies/characters/les-sisters/personnage-sisters-wendy.webp",
  "rarity": "légendaire",
  "order": 1,
  "secretCode": "WENDY2025"
}
```

**Features**:
- Trophy unlock via secret codes
- Persistent storage in localStorage
- Visual display with rarity badges
- Series-based organization
- Right-click and long-press protection on trophy images

### Adding New Quizzes

1. Create a JSON file in `js/data/` following the format above
2. Run `npm run generate-index` to update `index.json`
3. **Commit both files** (your quiz JSON + `index.json`)
4. The quiz automatically appears in the UI (no code changes needed)

**Vercel Deployment**: The `index.json` file must be **pre-generated and committed** to the repository. Vercel does NOT regenerate the index during build. Always run `npm run generate-index` locally and commit the updated index before deploying.

### Free Mode vs Normal Mode

- **Normal Mode**: Questions show answer buttons, user clicks to select
- **Free Mode**: Answer buttons hidden, correct answer revealed when timer expires
- Toggled via game mode selector, stored in `CONFIG.freeMode`
- CSS class `.free-mode` on body controls visibility

### Spoiler Mode

Quiz-specific setting (`config.spoilerMode` in quiz JSON):

- Blurs question images
- Shows eye-slash icon overlay
- Image revealed when answer is selected or time expires

## Technologies & Dependencies

### Frontend Stack

- **Vanilla JavaScript ES6+** (modules, classes, async/await)
- **Tailwind CSS v3** (via CDN, dark mode enabled) + Custom CSS externalisé
- **Bootstrap Icons** (via CDN)
- **tsparticles-confetti** (loaded dynamically in utils.js)
- **Service Worker** (PWA support, offline functionality)

### Browser APIs Used

- **localStorage**: Player name and results persistence
- **Service Worker API**: Offline support, caching strategy
- **Vibration API**: Haptic feedback on mobile (wrong answers)
- **ES6 Modules**: Native import/export (requires HTTP server)

### Build Tools & Scripts

- **api.py**: Quiz index generator using Python 3 stdlib (json, os, sys, datetime)
- **validate-quiz.js**: Node.js script for quiz JSON validation
- **sw.js**: Service Worker for PWA (Cache First + Network First strategies)

## Code Conventions

### File Organization

- One class per file in managers
- Core modules export singleton instances
- Import paths use relative paths with `.js` extension

### Naming Conventions

- Classes: PascalCase (`QuizApp`, `QuestionManager`)
- Singleton instances: camelCase (`quizState`, `playerManager`, `domManager`)
- Constants: UPPER_CASE in CONFIG object
- CSS classes: Tailwind utility classes + kebab-case for custom classes

### Manager Constructor Pattern

Managers receive callback functions in constructor:

```javascript
new QuestionManager(() => this.showResults())
new ResultsManager(
  () => this.restartQuiz(),
  () => this.backToHome()
)
```

## Common Development Tasks

### Modifying Time Limit Options

Edit the time option buttons in [index.html](index.html) and the `CONFIG.timeLimit` default in [js/modules/core/config.js](js/modules/core/config.js).

### Adding New Question Types

Modify [js/modules/managers/question-manager.js](js/modules/managers/question-manager.js) `showQuestion()` method to handle new question structures.

### Changing Category Filtering

Update `CONFIG.categoryFilter` in [js/modules/core/config.js](js/modules/core/config.js). Set to `null` for all categories, or array like `['Coaching']` to filter.

### Customizing Result Messages

Edit the message logic in [js/modules/managers/results-manager.js](js/modules/managers/results-manager.js) `show()` method.

## Claude Code Integration

### Custom Slash Commands

Available commands in `.claude/commands/`:

- **/architecture**: Generates a complete annotated project tree structure with detailed comments

### Documentation Guidelines

**IMPORTANT**: Always ask before creating documentation files. Prefer updating CLAUDE.md over creating separate documentation.

If documentation is explicitly requested:

- `.doc/quiz-format-specification.md` - Quiz JSON format specification (comprehensive)
- `.doc/architecture-*.md` - Auto-generated project architecture files (via /architecture command)
- `.doc/*.md` - Other technical notes (only if explicitly requested)

## Deployment Notes

### Vercel

The project is configured for Vercel deployment via [vercel.json](vercel.json) as a **static site** (no server needed).

**IMPORTANT**: The quiz index (`js/data/index.json`) must be **pre-generated and committed** to the repository. Vercel does NOT regenerate the index during build.

**Deployment workflow**:

1. Add/modify a quiz in `js/data/`
2. Run `npm run generate-index` locally
3. *Optional*: Run `npm run validate` to check all quiz files
4. Commit both the quiz file and `js/data/index.json`
5. Push to Vercel (automatic deployment)

### PWA & Service Worker

- Service Worker (`sw.js`) is registered automatically on page load
- Provides offline functionality with Cache First strategy for assets
- Version is synchronized with `package.json` version
- Use `npm run bump-version` to increment version and force cache refresh

#### Gestion du cache PWA

La PWA utilise plusieurs niveaux de cache qui peuvent empêcher de voir les modifications :

**Problème** : Modifications non visibles après déploiement ou en développement local

**Solutions** :

1. **Méthode automatique (RECOMMANDÉE)** :
   ```bash
   npm run update-version
   ```
   - ✅ Met à jour automatiquement `package.json` (1.0.0 → 1.0.1)
   - ✅ Met à jour automatiquement `sw.js` ligne 6 : `const CACHE_VERSION = 'v1.0.1';`
   - ✅ Met à jour automatiquement `js/modules/core/version.js` ligne 6 : `export const APP_VERSION = '1.0.1';`
   - ✅ Crée le fichier `.version`
   - Le Service Worker détectera le changement et supprimera l'ancien cache automatiquement
   - **À utiliser avant chaque commit important avec modifications visuelles ou de quiz**

2. **Méthode manuelle (développement)** :
   - Chrome DevTools (F12)
   - Onglet "Application" → "Storage" → "Clear site data"
   - Cocher "Unregister service workers" + "Cache storage" + "Local storage"
   - Cliquer "Clear site data"
   - Recharger la page (Ctrl+Shift+R ou Cmd+Shift+R)

3. **Désactiver temporairement le Service Worker** :
   - Chrome DevTools (F12) → Onglet "Application"
   - Section "Service Workers" → Cocher "Bypass for network"
   - ⚠️ Ne pas oublier de décocher après les tests

4. **Hard Refresh** :
   - Chrome/Edge : `Ctrl+Shift+R` (Windows/Linux) ou `Cmd+Shift+R` (Mac)
   - Firefox : `Ctrl+F5` ou `Shift+F5`
   - ⚠️ Peut ne pas suffire si le Service Worker est actif

**Workflow recommandé** :

1. **Développement local** : Travailler avec "Bypass for network" activé dans DevTools
2. **Modifications importantes** (nouveau quiz, changement UI, etc.) :
   ```bash
   npm run update-version
   ```
3. **Tester la PWA** : Désactiver "Bypass for network" et recharger pour tester le cache
4. **Commit** :
   ```bash
   git add package.json sw.js js/modules/core/version.js .version js/data/
   git commit -m "feat: nouveau quiz Les carnets + bump version"
   git push
   ```
5. **Déploiement** : La nouvelle version forcera automatiquement le rafraîchissement du cache client

**Architecture du cache** :

- **Service Worker** (`sw.js`) : Cache applicatif (HTML, CSS, JS, images)
  - **Cache First** : Assets statiques (HTML, CSS, JS, images, CDN)
    - Retourne le cache immédiatement si disponible
    - Met en cache les nouvelles ressources après le premier chargement
    - Idéal pour les fichiers qui changent rarement
  - **Network First** : Quiz JSON individuels (`/js/data/*.json`)
    - Essaie le réseau en premier pour avoir les données les plus récentes
    - Utilise le cache en fallback si le réseau est indisponible
    - Garantit les quiz à jour tout en permettant le mode offline
  - **Stale-While-Revalidate** : Index des quiz (`/js/data/index.json`)
    - Retourne le cache immédiatement pour un chargement ultra-rapide
    - Met à jour le cache en arrière-plan
    - Meilleur compromis vitesse/fraîcheur pour la liste des quiz
  - Version actuelle : `job-ez-v1.0.2`

- **localStorage** : Données utilisateur (nom du joueur, historique, résultats)
  - Clés : `playerName`, `playerResults`
  - Persistant même après vidage du cache Service Worker
  - À vider manuellement si nécessaire

- **Navigateur** : Cache HTTP standard
  - Contrôlé par les en-têtes HTTP (Cache-Control, ETag)
  - Vidé par Hard Refresh (Ctrl+Shift+R)

### Local Server

Always use a local HTTP server due to ES6 module CORS restrictions:

- `npm run dev` (recommended - includes index generation)
- `python3 -m http.server 8000` (manual serving)
