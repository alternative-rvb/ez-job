# Spécification du Format Quiz

## Vue d'ensemble

Les quiz de Job-EZ sont définis dans des fichiers JSON situés dans `js/data/`. Chaque fichier contient la configuration du quiz et ses questions.

## Structure du Fichier

```json
{
  "config": { ... },
  "questions": [ ... ]
}
```

---

## Section `config`

### Propriétés Obligatoires

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `title` | `string` | Titre du quiz affiché dans l'interface | `"Bob l'Éponge"` |
| `description` | `string` | Description courte du quiz | `"Tout sur votre éponge préférée"` |
| `difficulty` | `string` | Niveau de difficulté | `"Facile"`, `"Moyen"`, `"Difficile"` |
| `questionCount` | `number` | Nombre total de questions | `20` |
| `category` | `string` | Catégorie principale | `"Divertissement"` |

### Propriétés Optionnelles

| Propriété | Type | Description | Valeur par défaut |
|-----------|------|-------------|-------------------|
| `imageUrl` | `string` | URL de l'image de couverture | `""` |
| `spoilerMode` | `boolean` | Active le floutage des images | `false` |
| `tag` | `array<string>` | Tags additionnels pour filtrage | `[]` |
| `icon` | `string` | Classe Bootstrap Icons | `"bi-question-circle"` |
| `color` | `string` | Classes Tailwind pour gradient | `"from-blue-500 to-purple-600"` |

### Exemple Complet

```json
{
  "config": {
    "title": "Quiz JavaScript ES6+",
    "description": "Testez vos connaissances en JavaScript moderne",
    "imageUrl": "",
    "spoilerMode": false,
    "difficulty": "Moyen",
    "questionCount": 20,
    "category": "Développement",
    "tag": ["JavaScript", "ES6", "Frontend"],
    "icon": "bi-code-slash",
    "color": "from-yellow-400 to-orange-500"
  }
}
```

---

## Section `questions`

### Structure d'une Question

```json
{
  "id": 1,
  "question": "Quelle est la question ?",
  "choices": ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
  "correctAnswer": "Réponse A",
  "imageUrl": "/images/quiz/example/image.webp"
}
```

### Propriétés

| Propriété | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `id` | `number` | ❌ Non | Identifiant unique (optionnel, pour référence) |
| `question` | `string` | ✅ Oui | Texte de la question |
| `choices` | `array<string>` | ✅ Oui | Liste de 2 à 6 choix possibles |
| `correctAnswer` | `string` | ✅ Oui | Réponse correcte (doit être dans `choices`) |
| `imageUrl` | `string` | ❌ Non | URL de l'image illustrative |

### Contraintes

- **Nombre de choix** : Minimum 2, maximum 6 (recommandé : 4)
- **Réponse correcte** : Doit correspondre EXACTEMENT à l'un des éléments de `choices`
- **Images** : Formats supportés : `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg`
- **Chemins d'images** : Absolus depuis la racine (`/images/...`)

---

## Catégories Disponibles

Les catégories suivantes sont utilisées dans l'application :

- **Développement** : Quiz techniques (JavaScript, Git, etc.)
- **Divertissement** : Culture populaire, séries, films
- **Coaching** : Questions de développement personnel
- **Éducation** : Sujets académiques (mathématiques, sciences)
- **Culture Générale** : Connaissances générales

---

## Niveaux de Difficulté

| Niveau | Description | Usage |
|--------|-------------|-------|
| `Facile` | Questions accessibles à tous | Quiz d'introduction, culture pop |
| `Moyen` | Nécessite des connaissances spécifiques | Quiz techniques de base |
| `Difficile` | Questions avancées | Quiz experts, approfondissement |

---

## Bonnes Pratiques

### 1. Nommage des Fichiers

```
js/data/
├── javascript.json              ✅ Bon : kebab-case, descriptif
├── entretien-dev-web-1.json    ✅ Bon : numérotation si série
├── Quiz_JavaScript.json         ❌ Éviter : PascalCase
└── quiz1.json                   ❌ Éviter : nom générique
```

### 2. Organisation des Images

```
images/
├── characters/           # Personnages réutilisables
│   ├── spongebob/
│   └── les-sisters/
└── quiz/                 # Images spécifiques aux quiz
    ├── white-tiger/
    └── le-petit-nicolas/
```

### 3. Qualité des Questions

**✅ Bonne question**
```json
{
  "question": "Quelle méthode JavaScript permet de filtrer un tableau ?",
  "choices": ["filter()", "map()", "reduce()", "forEach()"],
  "correctAnswer": "filter()"
}
```

**❌ Question ambiguë**
```json
{
  "question": "Quelle est la meilleure méthode ?",
  "choices": ["A", "B", "C", "D"],
  "correctAnswer": "A"
}
```

### 4. Choix de Réponses

- **Homogènes** : Même type/format pour tous les choix
- **Plausibles** : Distracteurs crédibles
- **Concis** : Éviter les réponses trop longues
- **Distincts** : Pas de doublons ou synonymes

---

## Validation

### Vérifier un Quiz

Le système charge automatiquement les quiz depuis `js/data/index.json`. Pour vérifier qu'un quiz est valide :

1. **Format JSON** : Utiliser un validateur JSON
2. **Structure** : Vérifier que toutes les propriétés obligatoires sont présentes
3. **Réponses** : S'assurer que `correctAnswer` existe dans `choices`
4. **Images** : Vérifier que les fichiers existent aux chemins spécifiés

### Script de Validation (à venir)

```bash
npm run validate-quiz js/data/mon-quiz.json
```

---

## Génération de l'Index

Après avoir créé ou modifié un quiz, **générer l'index** :

```bash
npm run generate-index
```

Cela met à jour `js/data/index.json` avec la liste complète des quiz disponibles.

---

## Exemple Complet

```json
{
  "config": {
    "title": "Les Sisters",
    "description": "Testez vos connaissances sur Wendy et Marine",
    "imageUrl": "/images/characters/les-sisters/wendy.webp",
    "spoilerMode": false,
    "difficulty": "Facile",
    "questionCount": 10,
    "category": "Divertissement",
    "tag": ["Bande dessinée", "Les Sisters"],
    "icon": "bi-book",
    "color": "from-pink-400 to-purple-500"
  },
  "questions": [
    {
      "question": "Qui est la grande sœur ?",
      "choices": ["Wendy", "Marine", "Sammantha", "Loulou"],
      "correctAnswer": "Wendy",
      "imageUrl": "/images/characters/les-sisters/wendy.webp"
    },
    {
      "question": "Quelle est la passion de Wendy ?",
      "choices": ["La musique", "Le sport", "La lecture", "La danse"],
      "correctAnswer": "La musique",
      "imageUrl": "/images/characters/les-sisters/personnage-sisters-01.webp"
    }
  ]
}
```

---

## Changelog

| Version | Date | Modifications |
|---------|------|---------------|
| 1.0.0 | 2025-12-13 | Spécification initiale |

---

## Références

- **Code source** : `js/modules/managers/quiz-selector.js`
- **Générateur d'index** : `api.py`
- **Fichier d'index** : `js/data/index.json`
