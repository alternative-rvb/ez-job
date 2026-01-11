#!/usr/bin/env node

/**
 * Script de validation des fichiers quiz JSON
 * Usage: node scripts/validate-quiz.js [fichier.json]
 * Sans argument: valide tous les quiz dans js/data/
 */

const fs = require('fs');
const path = require('path');

// Couleurs pour console
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m'
};

// Niveaux de difficulté valides (1-5)
const VALID_DIFFICULTIES = [1, 2, 3, 4, 5];

// Catégories valides
const VALID_CATEGORIES = [
  'Développement',
  'Divertissement',
  'Coaching',
  'Éducation',
  'Culture Générale'
];

// Formats d'images supportés
const VALID_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

/**
 * Valide la structure d'un fichier quiz
 */
function validateQuiz(filePath) {
  const errors = [];
  const warnings = [];
  const fileName = path.basename(filePath);

  console.log(`\n${colors.blue}Validation de: ${fileName}${colors.reset}`);

  // Lecture du fichier
  let quiz;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    quiz = JSON.parse(content);
  } catch (error) {
    errors.push(`Erreur de parsing JSON: ${error.message}`);
    return { errors, warnings, valid: false };
  }

  // Validation de la structure de base
  if (!quiz.config) {
    errors.push('Propriété "config" manquante');
  }
  if (!quiz.questions) {
    errors.push('Propriété "questions" manquante');
  }

  // Si structure de base invalide, arrêter
  if (errors.length > 0) {
    return { errors, warnings, valid: false };
  }

  // Validation de la section config
  validateConfig(quiz.config, errors, warnings);

  // Validation des questions
  validateQuestions(quiz.questions, quiz.config, errors, warnings, filePath);

  return {
    errors,
    warnings,
    valid: errors.length === 0,
    questionCount: quiz.questions.length
  };
}

/**
 * Valide la section config
 */
function validateConfig(config, errors, warnings) {
  // Propriétés obligatoires
  const required = ['title', 'description', 'difficulty', 'questionCount', 'category'];
  required.forEach((prop) => {
    if (!config[prop]) {
      errors.push(`config.${prop} est obligatoire`);
    }
  });

  // Validation de la difficulté
  if (config.difficulty && !VALID_DIFFICULTIES.includes(config.difficulty)) {
    errors.push(
      `config.difficulty invalide: "${config.difficulty}". Valeurs acceptées: ${VALID_DIFFICULTIES.join(', ')}`
    );
  }

  // Validation de la catégorie
  if (config.category && !VALID_CATEGORIES.includes(config.category)) {
    warnings.push(
      `config.category "${config.category}" non standard. Catégories recommandées: ${VALID_CATEGORIES.join(', ')}`
    );
  }

  // Validation du nombre de questions
  if (config.questionCount && typeof config.questionCount !== 'number') {
    errors.push('config.questionCount doit être un nombre');
  }

  // Validation spoilerMode
  if (config.hasOwnProperty('spoilerMode') && typeof config.spoilerMode !== 'boolean') {
    errors.push('config.spoilerMode doit être un booléen (true/false)');
  }

  // Validation tags
  if (config.tag && !Array.isArray(config.tag)) {
    errors.push('config.tag doit être un tableau');
  }

  // Validation createdAt (optionnel)
  if (config.createdAt) {
    // Vérifier le format ISO 8601 (YYYY-MM-DD)
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(config.createdAt)) {
      errors.push('config.createdAt doit être au format YYYY-MM-DD (ex: 2024-01-15)');
    } else {
      // Vérifier que c'est une date valide
      const date = new Date(config.createdAt);
      if (isNaN(date.getTime())) {
        errors.push(`config.createdAt "${config.createdAt}" n'est pas une date valide`);
      }
    }
  }
}

/**
 * Valide les questions
 */
function validateQuestions(questions, config, errors, warnings, quizPath) {
  if (!Array.isArray(questions)) {
    errors.push('questions doit être un tableau');
    return;
  }

  // Vérifier la cohérence avec questionCount
  if (config.questionCount && questions.length !== config.questionCount) {
    warnings.push(
      `Incohérence: config.questionCount = ${config.questionCount} mais ${questions.length} questions trouvées`
    );
  }

  questions.forEach((q, index) => {
    const questionNum = index + 1;

    // Propriétés obligatoires
    if (!q.question) {
      errors.push(`Question ${questionNum}: propriété "question" manquante`);
    }

    // Déterminer le type de question
    const isMultipleChoice = q.choices && Array.isArray(q.choices);
    const isTextInput = q.acceptedAnswers || q.answer;

    // Chaque question doit être soit QCM soit saisie de texte
    if (!isMultipleChoice && !isTextInput) {
      errors.push(
        `Question ${questionNum}: doit avoir soit "choices" + "correctAnswer" (QCM) soit "acceptedAnswers" ou "answer" (saisie de texte)`
      );
    }

    // Validation des questions à choix multiples
    if (isMultipleChoice) {
      if (!q.correctAnswer) {
        errors.push(`Question ${questionNum}: propriété "correctAnswer" manquante pour question QCM`);
      }

      if (q.choices.length < 2) {
        errors.push(`Question ${questionNum}: minimum 2 choix requis`);
      }
      if (q.choices.length > 6) {
        warnings.push(`Question ${questionNum}: plus de 6 choix (${q.choices.length}) - recommandé: 4`);
      }

      // Vérifier les doublons
      const uniqueChoices = new Set(q.choices);
      if (uniqueChoices.size !== q.choices.length) {
        errors.push(`Question ${questionNum}: choix en double détectés`);
      }

      // Vérifier que correctAnswer est dans choices
      if (q.correctAnswer && !q.choices.includes(q.correctAnswer)) {
        errors.push(
          `Question ${questionNum}: correctAnswer "${q.correctAnswer}" n'est pas dans les choix`
        );
      }
    }

    // Validation des questions à saisie de texte
    if (isTextInput) {
      if (q.acceptedAnswers) {
        if (!Array.isArray(q.acceptedAnswers)) {
          errors.push(`Question ${questionNum}: "acceptedAnswers" doit être un tableau`);
        } else if (q.acceptedAnswers.length === 0) {
          errors.push(`Question ${questionNum}: "acceptedAnswers" ne peut pas être vide`);
        }
      } else if (q.answer && typeof q.answer !== 'string') {
        errors.push(`Question ${questionNum}: "answer" doit être une chaîne de caractères`);
      }

      // Avertir si acceptedAnswers et answer sont tous les deux présents
      if (q.acceptedAnswers && q.answer) {
        warnings.push(
          `Question ${questionNum}: "acceptedAnswers" et "answer" sont tous deux présents - "acceptedAnswers" sera utilisé`
        );
      }
    }

    // Validation de l'image
    if (q.imageUrl) {
      const ext = path.extname(q.imageUrl).toLowerCase();
      if (!VALID_IMAGE_FORMATS.includes(ext)) {
        warnings.push(
          `Question ${questionNum}: format d'image "${ext}" non standard. Formats recommandés: ${VALID_IMAGE_FORMATS.join(', ')}`
        );
      }

      // Vérifier que l'image existe (si chemin absolu local)
      if (q.imageUrl.startsWith('/images/')) {
        const quizDir = path.dirname(path.dirname(path.dirname(quizPath)));
        const imagePath = path.join(quizDir, q.imageUrl.substring(1));
        if (!fs.existsSync(imagePath)) {
          warnings.push(`Question ${questionNum}: image non trouvée: ${q.imageUrl}`);
        }
      }
    }
  });
}

/**
 * Affiche les résultats de validation
 */
function displayResults(fileName, result) {
  if (result.errors.length > 0) {
    console.log(`${colors.red}${colors.bold}✗ ÉCHEC${colors.reset}`);
    result.errors.forEach((error) => {
      console.log(`  ${colors.red}✗ ${error}${colors.reset}`);
    });
  } else {
    console.log(`${colors.green}${colors.bold}✓ VALIDE${colors.reset} (${result.questionCount} questions)`);
  }

  if (result.warnings.length > 0) {
    result.warnings.forEach((warning) => {
      console.log(`  ${colors.yellow}⚠ ${warning}${colors.reset}`);
    });
  }
}

/**
 * Main
 */
function main() {
  const args = process.argv.slice(2);
  let filesToValidate = [];

  if (args.length === 0) {
    // Valider tous les quiz dans js/data/
    const dataDir = path.join(process.cwd(), 'js', 'data');
    if (!fs.existsSync(dataDir)) {
      console.error(`${colors.red}Erreur: répertoire js/data/ non trouvé${colors.reset}`);
      process.exit(1);
    }

    const files = fs.readdirSync(dataDir);
    filesToValidate = files
      .filter((f) => f.endsWith('.json') && f !== 'index.json' && f !== 'trophies.json')
      .map((f) => path.join(dataDir, f));

    console.log(`${colors.bold}Validation de ${filesToValidate.length} quiz...${colors.reset}`);
  } else {
    // Valider le fichier spécifié
    const filePath = path.resolve(args[0]);
    if (!fs.existsSync(filePath)) {
      console.error(`${colors.red}Erreur: fichier non trouvé: ${filePath}${colors.reset}`);
      process.exit(1);
    }
    filesToValidate = [filePath];
  }

  // Validation
  let totalErrors = 0;
  let totalWarnings = 0;
  let validCount = 0;

  filesToValidate.forEach((file) => {
    const result = validateQuiz(file);
    displayResults(path.basename(file), result);

    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
    if (result.valid) validCount++;
  });

  // Résumé
  console.log(`\n${colors.bold}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}RÉSUMÉ${colors.reset}`);
  console.log(`Total: ${filesToValidate.length} quiz`);
  console.log(`${colors.green}Valides: ${validCount}${colors.reset}`);
  console.log(`${colors.red}Invalides: ${filesToValidate.length - validCount}${colors.reset}`);
  console.log(`${colors.red}Erreurs: ${totalErrors}${colors.reset}`);
  console.log(`${colors.yellow}Avertissements: ${totalWarnings}${colors.reset}`);
  console.log(`${colors.bold}═══════════════════════════════════════${colors.reset}`);

  // Code de sortie
  process.exit(totalErrors > 0 ? 1 : 0);
}

main();
