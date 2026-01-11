/**
 * Fonctions utilitaires
 */

/**
 * Génère les icônes de difficulté (flammes) en fonction du niveau
 * @param {number} difficulty - Niveau de difficulté (1-5)
 * @returns {string} - Chaîne d'icônes de flammes
 */
export function getDifficultyIcons(difficulty) {
    // Version mise à jour avec icônes Bootstrap
    if (typeof difficulty !== 'number' || difficulty < 1 || difficulty > 5) {
        return '<i class="bi bi-fire text-orange-400"></i>'; // Par défaut une flamme
    }
    return '<i class="bi bi-fire text-orange-400"></i>'.repeat(difficulty);
}

/**
 * Mélange un tableau (algorithme Fisher-Yates)
 * @param {Array} array - Tableau à mélanger
 * @returns {Array} - Tableau mélangé
 */
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Charge les questions depuis un fichier JSON
 * @param {string} url - URL du fichier JSON
 * @returns {Promise<Array>} - Promesse contenant les questions
 */
export async function loadQuestions(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur de chargement: ${response.status}`);
        }
        const questions = await response.json();
        
        // Mélanger les réponses pour chaque question à choix multiples
        return questions.map(question => {
            if (question.choices && question.choices.length > 0) {
                // Créer un tableau avec les réponses et leurs indices originaux
                const choicesWithIndex = question.choices.map((choice, index) => ({
                    choice,
                    originalIndex: index,
                    isCorrect: choice === question.correctAnswer
                }));
                
                // Mélanger les réponses
                const shuffledChoices = shuffleArray(choicesWithIndex);
                
                // Reconstruire la question avec les réponses mélangées
                return {
                    ...question,
                    choices: shuffledChoices.map(item => item.choice),
                    correctAnswer: question.correctAnswer // La bonne réponse reste la même
                };
            }
            return question; // Retourner la question inchangée si pas de choix multiples
        });
    } catch (error) {
        console.error('Erreur lors du chargement des questions:', error);
        throw error;
    }
}

/**
 * Charge les données d'un quiz (configuration + questions) depuis un fichier JSON
 * @param {string} url - URL du fichier JSON
 * @returns {Promise<Object>} - Promesse contenant {config, questions}
 */
export async function loadQuizData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur de chargement: ${response.status}`);
        }
        const quizData = await response.json();
        
        // Vérifier que la structure est correcte
        if (!quizData.questions || !Array.isArray(quizData.questions)) {
            throw new Error('Structure de données invalide: questions manquantes');
        }
        
        // Mélanger les réponses pour chaque question à choix multiples
        const processedQuestions = quizData.questions.map(question => {
            if (question.choices && question.choices.length > 0) {
                // Créer un tableau avec les réponses et leurs indices originaux
                const choicesWithIndex = question.choices.map((choice, index) => ({
                    choice,
                    originalIndex: index,
                    isCorrect: choice === question.correctAnswer
                }));
                
                // Mélanger les réponses
                const shuffledChoices = shuffleArray(choicesWithIndex);
                
                // Reconstruire la question avec les réponses mélangées
                return {
                    ...question,
                    choices: shuffledChoices.map(item => item.choice),
                    correctAnswer: question.correctAnswer // La bonne réponse reste la même
                };
            }
            return question;
        });
        
        return {
            config: quizData.config || {},
            questions: processedQuestions
        };
    } catch (error) {
        console.error('Erreur lors du chargement des données du quiz:', error);
        throw error;
    }
}

/**
 * Lance les confettis
 * @param {Object} options - Options pour les confettis
 */
export function launchConfetti(options = {}) {
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            ...options
        });
    }
}

/**
 * Charge la liste des quiz disponibles depuis le fichier d'index
 * Compatible avec Vercel et les déploiements statiques
 * @returns {Promise<Array>} - Liste des quiz avec leurs configurations
 */
export async function loadAvailableQuizzes() {
    // Importer CONFIG pour avoir accès au chemin correct
    const { CONFIG } = await import('./config.js');
    
    let quizIds = [];
    let categories = [];
    const indexPath = CONFIG.questionsPath + 'index.json';

    try {
        // Charger la liste depuis le fichier d'index
        const response = await fetch(indexPath);
        if (response.ok) {
            const indexData = await response.json();
            quizIds = indexData.quizzes || [];
            categories = indexData.categories || [];
            // Mettre à jour les catégories disponibles dans CONFIG
            CONFIG.setAvailableCategories(categories);
            console.log(`📋 Quiz chargés depuis l'index (${quizIds.length} quiz disponibles)`);
        } else {
            throw new Error('Fichier d\'index non trouvé');
        }
    } catch (error) {
        console.warn('⚠️ Erreur lors du chargement de l\'index, utilisation de la liste de fallback:', error);
        // Fallback vers une liste statique
        quizIds = [
            'javascript-1',
            'spongebob',
            'animaux',
            'entretien-dev-web-1',
            'entretien-dev-web-2',
            'connecteurs-logiques-cm2'
        ];
    }

    const availableQuizzes = [];

    // Charger chaque quiz et extraire sa config
    for (const quizId of quizIds) {
        try {
            const quizData = await loadQuizData(`${CONFIG.questionsPath}${quizId}.json`);
            if (quizData && quizData.config) {
                availableQuizzes.push({
                    id: quizId,
                    ...quizData.config
                });
            }
        } catch (error) {
            console.warn(`Quiz ${quizId} non disponible:`, error);
        }
    }

    // Trier les quiz par date créée (les plus récents en premier)
    availableQuizzes.sort((a, b) => {
        const dateA = new Date(a.createdAt || '1970-01-01');
        const dateB = new Date(b.createdAt || '1970-01-01');
        return dateB - dateA; // Décroissant (plus récents en premier)
    });

    console.log(`✅ ${availableQuizzes.length} quiz chargés avec succès`);
    return availableQuizzes;
}