# CamiLudik - Application de Quiz Interactifs

Une application web moderne de quiz interactifs développée avec JavaScript ES6 modules et Tailwind CSS. Parfaite pour tester vos connaissances dans différents domaines et vous préparer aux entretiens techniques.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![CSS](https://img.shields.io/badge/CSS-Tailwind-38B2AC.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

## Fonctionnalités

### Interface de Quiz

- **Timer dynamique** avec animations et changements de couleur
- **Interface responsive** optimisée pour mobile et desktop
- **Feedback visuel** immédiat avec animations (bounce, shake, scale)
- **Vibration mobile** pour un retour haptique
- **Barre de progression** visuelle du quiz
- **Messages flottants** de feedback

### Options de Jeu Personnalisables

- **Sélection du temps** : 5, 10, 15 ou 20 secondes par question
- **Mode Spoiler** : Réponses cachées, révélation automatique à la fin du temps
- **Temps estimé** mis à jour dynamiquement sur les cartes de quiz
- **Configuration persistante** pendant la session

### Design Moderne

- **Dark theme** élégant avec Tailwind CSS
- **Animations CSS** personnalisées et fluides
- **Icons Bootstrap** pour une interface cohérente
- **Gradient backgrounds** et effets visuels
- **Touch-friendly** avec gestes optimisés

### Système de Résultats

- **Cercle de progression SVG** animé
- **Messages personnalisés** selon le score
- **Effets confettis** pour les bons scores
- **Statistiques détaillées** de performance

### Architecture Technique

- **Modules ES6** avec import/export natifs
- **Architecture MVC** avec séparation des responsabilités
- **State management** centralisé
- **Configuration modulaire** et extensible

## Démarrage Rapide

### Prérequis

- Navigateur web moderne supportant les modules ES6
- Serveur HTTP local pour éviter les erreurs CORS

### Installation

1. **Cloner le repository**

```bash
git clone https://github.com/alternative-rvb/job-ready.git
cd job-ready
```

1. **Lancer un serveur local**

```bash
# Python 3
python3 -m http.server 8000

# Node.js (si disponible)
npx serve .

# PHP (si disponible)
php -S localhost:8000
```

1. **Accéder à l'application**
Ouvrez votre navigateur sur `http://localhost:8000`

## Utilisation

### Sélection d'un Quiz

1. Sur la page d'accueil, choisissez un thème de quiz
2. **Configurez vos options de jeu** :
   - **Temps par question** : 5, 10, 15 ou 20 secondes
   - **Mode de jeu** : Normal (réponses visibles) ou Spoiler (réponses cachées)
3. Cliquez sur "Commencer" pour démarrer

### Pendant le Quiz

#### Mode Normal

- **Timer** : Compteur visible en haut avec animations
- **Questions** : Une question à la fois avec options multiples
- **Navigation** : Sélection directe des réponses
- **Feedback** : Retour visuel immédiat sur chaque réponse

#### Mode Spoiler

- **Réponses cachées** : Les boutons de réponse ne sont pas visibles
- **Réflexion pure** : Concentrez-vous sur la question sans distraction
- **Révélation automatique** : La bonne réponse apparaît quand le temps est écoulé
- **Même système de score** : Les points sont attribués normalement

### Résultats

- **Score final** avec pourcentage et statistiques
- **Messages personnalisés** selon la performance
- **Options** : Recommencer le même quiz ou choisir un autre

## Structure du Projet

```
camiludik/
├── 📄 index.html              # Page principale avec Tailwind CSS
├── 📁 images/                 # Assets visuels
│   ├── 1-Bob-leponge.jpg
│   ├── spongebob.jpg
│   ├── start.gif
│   └── win.gif
├── 📁 js/                     # Code JavaScript modulaire
│   ├── 📄 app.js             # Point d'entrée principal
│   ├── 📁 modules/           # Architecture modulaire
│   │   ├── 📁 core/          # Logique fondamentale
│   │   │   ├── config.js     # Configuration globale
│   │   │   ├── state.js      # Gestion d'état
│   │   │   └── utils.js      # Utilitaires partagés
│   │   ├── 📁 ui/            # Interface utilisateur
│   │   │   └── dom.js        # Manipulation DOM
│   │   └── 📁 managers/      # Gestionnaires métier
│   │       ├── quiz-selector.js    # Sélection des quiz
│   │       ├── question-manager.js # Gestion des questions
│   │       └── results-manager.js  # Affichage résultats
│   ├── 📁 data/              # Données des quiz (JSON)
│   │   ├── javascript-1.json      # Questions JavaScript
│   │   ├── spongebob.json         # Quiz SpongeBob
│   │   ├── animaux.json           # Quiz Animaux
│   │   └── entretien-dev-web-1.json # Entretien développeur
│   └── 📁 archives/          # Versions antérieures
└── 📄 README.md              # Documentation
```

## 🔧 Architecture Technique

### Modules Core

- **`config.js`** : Configuration globale (timer, chemins, quiz disponibles)
- **`state.js`** : Gestion centralisée de l'état de l'application
- **`utils.js`** : Fonctions utilitaires (chargement JSON, confettis)

### Modules UI

- **`dom.js`** : Classe DOMManager pour la manipulation des éléments

### Modules Managers

- **`quiz-selector.js`** : Gestion de la sélection des quiz
- **`question-manager.js`** : Logique des questions et timer
- **`results-manager.js`** : Affichage des résultats et navigation

### Flux de Données

```
app.js → QuizApp → Managers → State → DOM
   ↓        ↓         ↓        ↓      ↓
Config → Utils → Core Logic → UI → User
```

## Personnalisation

### Ajouter un Nouveau Quiz (Automatique)

1. **Créez votre fichier JSON** dans `js/data/` avec la structure complète :

```json
{
  "config": {
    "title": "Mon Nouveau Quiz",
    "description": "Description du quiz", 
    "spoilerMode": true,
    "difficulty": "Moyen",
    "questionCount": 15,
    "icon": "bi-star",
    "color": "from-blue-400 to-purple-500"
  },
  "questions": [
    {
      "question": "Ma question ?",
      "choices": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "imageUrl": null
    }
  ]
}
```

1. **Régénérez l'index automatiquement** :

```bash
npm run generate-index
# ou directement :
python3 api.py generate-index
```

1. **C'est tout !** Votre quiz apparaîtra automatiquement dans l'application.

> 💡 **Pour Vercel** : L'index est généré automatiquement pendant le build grâce au `buildCommand` dans `vercel.json`
    file: 'mon-quiz.json'
  }
]

```

### Modifier le Design

- **Couleurs** : Adapter les gradients dans `config.js`
- **Animations** : Personnaliser les keyframes CSS dans `index.html`
- **Layout** : Modifier les classes Tailwind dans les managers

### Configuration du Timer

```javascript
// Dans config.js
export const CONFIG = {
    timeLimit: 15, // Durée en secondes
    // ...
}
```

## Technologies Utilisées

### Frontend

- **HTML5** avec structure sémantique
- **Tailwind CSS v3** via CDN (dark theme)
- **JavaScript ES6+** avec modules natifs
- **Bootstrap Icons** pour l'iconographie

### Bibliothèques

- **tsparticles-confetti** pour les effets de confettis
- **Vibration API** pour le feedback haptique mobile

### Outils de Développement

- **Git** pour le versioning
- **HTTP Server** pour le développement local
- **ES6 Modules** pour l'organisation du code

## Données et Format

### Structure d'un Quiz JSON

```json
{
  "title": "Titre du Quiz",
  "questions": [
    {
      "question": "Texte de la question",
      "options": ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
      "correct": 2,
      "explanation": "Explication détaillée de la bonne réponse"
    }
  ]
}
```

### Quiz Disponibles

- **JavaScript Fondamentaux** : Concepts de base et syntaxe
- **SpongeBob** : Quiz ludique sur l'univers de la série
- **Animaux** : Connaissances générales sur la faune
- **Entretien Développeur Web** : Questions techniques d'entretien

## Fonctionnalités Avancées

### Mobile-First

- Interface tactile optimisée
- Gestures et animations fluides
- Vibrations pour le feedback
- Design responsive sur tous écrans

### Performance

- Chargement lazy des données JSON
- Animations GPU-accelerated
- Code modulaire pour un loading optimal
- Cache des éléments DOM fréquemment utilisés

### Accessibilité

- Contraste optimisé (dark theme)
- Icons avec labels sémantiques
- Navigation au clavier
- Structure HTML5 sémantique

## Roadmap

### Version 2.1 (À venir)

- [ ] Mode multijoueur local
- [ ] Sauvegarde des scores
- [ ] Quiz chronométrés avancés
- [ ] Export des résultats

### Version 2.2

- [ ] Création de quiz via interface
- [ ] Thèmes personnalisables
- [ ] Mode hors-ligne (PWA)
- [ ] Analytics de performance

## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Pushez sur la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

### Guidelines de Développement

- Utilisez les modules ES6
- Suivez les conventions de nommage existantes
- Documentez les nouvelles fonctionnalités
- Testez sur mobile et desktop
- Respectez l'architecture modulaire

## License

Ce projet est sous licence ISC. Voir le fichier `LICENSE` pour plus de détails.

## Auteurs

- **Alternative RVB** - Développement initial - [@alternative-rvb](https://github.com/alternative-rvb)

## Remerciements

- **Tailwind CSS** pour le framework CSS moderne
- **Bootstrap Icons** pour l'iconographie
- **tsparticles** pour les effets visuels
- La communauté JavaScript pour l'inspiration

---

**N'hésitez pas à mettre une étoile si ce projet vous a aidé !**
