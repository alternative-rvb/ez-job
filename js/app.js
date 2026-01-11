/**
 * Application principale de quiz
 * @version 2.0.0
 * @author Alternative RVB
 */

import { CONFIG } from './modules/core/config.js';
import { quizState } from './modules/core/state.js';
import { domManager } from './modules/ui/dom.js';
import { playerManager } from './modules/core/player.js';
import { QuizSelector } from './modules/managers/quiz-selector.js';
import { QuestionManager } from './modules/managers/question-manager.js';
import { ResultsManager } from './modules/managers/results-manager.js';
import { HistoryManager } from './modules/managers/history-manager.js';
import { TrophiesManager } from './modules/managers/trophies-manager.js';
import { shuffleArray, loadQuizData, getDifficultyIcons } from './modules/core/utils.js';
import { initializeCategoryColors, getCategoryColors } from './modules/core/category-colors.js';

class QuizApp {
    constructor() {
        this.quizSelector = null;
        this.questionManager = null;
        this.resultsManager = null;
        this.historyManager = null;
        this.trophiesManager = null;
        this.availableQuizzes = [];
    }

    async init() {
        console.log('Quiz App loaded');

        // Initialiser les couleurs des catégories
        await initializeCategoryColors();

        // Initialiser le gestionnaire DOM
        if (!domManager.init()) {
            console.error('Impossible d\'initialiser l\'application');
            return;
        }

        // Vérifier si le joueur a déjà un nom
        if (playerManager.playerName) {
            console.log(`👤 Bienvenue ${playerManager.playerName}`);
            this.showQuizSelection();
        } else {
            this.showPlayerNameScreen();
        }

        console.log('Quiz App initialisée');
    }

    showPlayerNameScreen() {
        const screen = document.getElementById('player-name-screen');
        const form = document.getElementById('player-name-form');
        const input = document.getElementById('player-name-input');

        if (screen) {
            screen.classList.remove('hidden');
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = input.value.trim();
                if (name.length > 0) {
                    playerManager.setPlayerName(name);
                    this.showQuizSelection();
                } else {
                    input.focus();
                }
            });
            input.focus();
        }
    }

    async showQuizSelection() {
        // Masquer l'écran de saisie du nom
        const nameScreen = document.getElementById('player-name-screen');
        if (nameScreen) {
            nameScreen.classList.add('hidden');
        }

        // Afficher le nom du joueur
        const playerDisplay = document.getElementById('player-name-display');
        if (playerDisplay) {
            playerDisplay.textContent = playerManager.playerName;
        }

        // Initialiser les modules
        this.quizSelector = new QuizSelector((quiz, selectedTime) => this.startQuiz(quiz, selectedTime));
        this.questionManager = new QuestionManager(() => this.showResults());
        this.resultsManager = new ResultsManager(
            () => this.restartQuiz(),
            () => this.backToHome(),
            () => this.trophiesManager.show()
        );
        this.historyManager = new HistoryManager(() => this.backToHome());
        this.trophiesManager = new TrophiesManager(() => this.backToHome());

        // Configurer les écouteurs d'événements globaux
        this.setupEventListeners();
        this.setupGameOptions();
        this.initializeGameOptions();

        // Charger la liste des quiz disponibles
        const { loadAvailableQuizzes } = await import('./modules/core/utils.js');
        this.availableQuizzes = await loadAvailableQuizzes();

        // Mettre à jour la carte Hero avec le dernier quiz
        this.updateHeroCard();

        // Afficher la sélection des quiz
        await this.quizSelector.show();

        // Ajouter les écouteurs pour l'historique et le changement de joueur
        this.setupHistoryButtons();
    }

    setupHistoryButtons() {
        // ===== Boutons de la section Hero =====
        
        // Bouton historique (hero)
        const btnHistory = document.getElementById('btn-show-history');
        if (btnHistory) {
            btnHistory.addEventListener('click', () => {
                this.historyManager.show();
            });
        }

        // Bouton trophées (hero)
        const btnTrophies = document.getElementById('btn-show-trophies');
        if (btnTrophies) {
            btnTrophies.addEventListener('click', () => {
                this.trophiesManager.show();
            });
        }

        // Bouton changer de joueur (hero)
        const btnChangePlayer = document.getElementById('btn-change-player');
        if (btnChangePlayer) {
            btnChangePlayer.addEventListener('click', () => {
                playerManager.reset();
                location.reload();
            });
        }

        // ===== Boutons du Header Navigation Desktop =====
        
        // Bouton joueur (nav)
        const navPlayerBtn = document.getElementById('nav-player-btn');
        if (navPlayerBtn) {
            navPlayerBtn.textContent = `${playerManager.playerName}`;
            navPlayerBtn.innerHTML = `<i class="bi bi-person"></i><span>${playerManager.playerName}</span>`;
            navPlayerBtn.classList.remove('hidden');
            navPlayerBtn.addEventListener('click', () => {
                playerManager.reset();
                location.reload();
            });
        }

        // Bouton historique (nav)
        const navHistoryBtn = document.getElementById('nav-history-btn');
        if (navHistoryBtn) {
            navHistoryBtn.classList.remove('hidden');
            navHistoryBtn.addEventListener('click', () => {
                this.historyManager.show();
            });
        }

        // Bouton trophées (nav)
        const navTrophiesBtn = document.getElementById('nav-trophies-btn');
        if (navTrophiesBtn) {
            navTrophiesBtn.classList.remove('hidden');
            navTrophiesBtn.addEventListener('click', () => {
                this.trophiesManager.show();
            });
        }

        // ===== Boutons du Menu Mobile =====
        
        // Bouton joueur (mobile)
        const mobilePlayerBtn = document.getElementById('mobile-player-btn');
        if (mobilePlayerBtn) {
            mobilePlayerBtn.innerHTML = `<i class="bi bi-person"></i><span>${playerManager.playerName}</span>`;
            mobilePlayerBtn.classList.remove('hidden');
            mobilePlayerBtn.addEventListener('click', () => {
                playerManager.reset();
                location.reload();
            });
        }

        // Bouton historique (mobile)
        const mobileHistoryBtn = document.getElementById('mobile-history-btn');
        if (mobileHistoryBtn) {
            mobileHistoryBtn.classList.remove('hidden');
            mobileHistoryBtn.addEventListener('click', () => {
                this.historyManager.show();
                document.getElementById('mobile-menu').classList.add('hidden');
            });
        }

        // Bouton trophées (mobile)
        const mobileTrophiesBtn = document.getElementById('mobile-trophies-btn');
        if (mobileTrophiesBtn) {
            mobileTrophiesBtn.classList.remove('hidden');
            mobileTrophiesBtn.addEventListener('click', () => {
                this.trophiesManager.show();
                document.getElementById('mobile-menu').classList.add('hidden');
            });
        }
    }

    setupEventListeners() {
        // Bouton retour à la sélection
        const backButton = document.getElementById('back-to-selection');
        if (backButton) {
            backButton.addEventListener('click', () => this.backToHome());
        }
    }

    setupGameOptions() {
        // Gestionnaire pour les boutons de temps
        document.querySelectorAll('.time-option').forEach(button => {
            button.addEventListener('click', () => {
                // Retirer la classe selected de tous les boutons
                document.querySelectorAll('.time-option').forEach(btn => {
                    btn.classList.remove('selected');
                });
                // Ajouter la classe selected au bouton cliqué
                button.classList.add('selected');

                // Mettre à jour la configuration et sauvegarder le choix du joueur
                const timeLimit = parseInt(button.dataset.time);
                CONFIG.timeLimit = timeLimit;
                playerManager.setDefaultTimeLimit(timeLimit);

                // Mettre à jour l'affichage du temps estimé sur les cartes
                this.updateQuizCardsTime();
            });
        });

        // Gestionnaire pour les modes de jeu
        document.querySelectorAll('.game-mode').forEach(button => {
            button.addEventListener('click', () => {
                // Retirer la classe selected de tous les boutons
                document.querySelectorAll('.game-mode').forEach(btn => {
                    btn.classList.remove('selected');
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-secondary');
                });
                // Ajouter la classe selected au bouton cliqué
                button.classList.add('selected');
                button.classList.remove('btn-secondary');
                button.classList.add('btn-primary');

                // Mettre à jour la configuration
                const isFreeMode = button.id === 'free-mode';
                CONFIG.freeMode = isFreeMode;

                // Ajouter/retirer la classe free-mode sur le body
                document.body.classList.toggle('free-mode', isFreeMode);
            });
        });
    }

    initializeGameOptions() {
        // Initialiser les boutons avec les valeurs sauvegardées du joueur
        const defaultTimeLimit = playerManager.defaultTimeLimit || 10;
        
        // Sélectionner le bouton de temps correspondant
        document.querySelectorAll('.time-option').forEach(button => {
            const btnTime = parseInt(button.dataset.time);
            if (btnTime === defaultTimeLimit) {
                button.classList.add('selected');
                button.classList.remove('btn-secondary');
                button.classList.add('btn-primary');
                CONFIG.timeLimit = defaultTimeLimit;
            } else {
                button.classList.remove('selected');
                button.classList.add('btn-secondary');
                button.classList.remove('btn-primary');
            }
        });
    }

    updateQuizCardsTime() {
        // Mettre à jour le temps estimé sur toutes les cartes de quiz
        document.querySelectorAll('.quiz-card').forEach(card => {
            const quizId = card.dataset.quizId;
            const quiz = this.availableQuizzes.find(q => q.id === quizId);
            if (quiz) {
                const timeElement = card.querySelector('.text-sm.text-gray-400 span');
                if (timeElement) {
                    const estimatedTime = Math.ceil(quiz.questionCount * CONFIG.timeLimit / 60);
                    timeElement.textContent = `~${estimatedTime} min`;
                }
            }
        });
    }

    updateHeroCard() {
        // Afficher la carte Hero avec le dernier quiz
        if (this.availableQuizzes.length === 0) {
            console.warn('Aucun quiz disponible pour la carte Hero');
            return;
        }

        const latestQuiz = this.availableQuizzes[0];
        const categoryColor = getCategoryColors(latestQuiz.category);

        // Mettre à jour les éléments de la carte Hero
        const heroQuizTitle = document.getElementById('hero-quiz-title');
        const heroQuizDescription = document.getElementById('hero-quiz-description');
        const heroQuizQuestions = document.getElementById('hero-quiz-questions');
        const heroQuizTime = document.getElementById('hero-quiz-time');
        const heroQuizCategory = document.getElementById('hero-quiz-category');
        const heroQuizDifficultyIcons = document.getElementById('hero-quiz-difficulty-icons');
        const heroQuizDate = document.getElementById('hero-quiz-date');
        const heroQuizColorDot = document.getElementById('hero-quiz-color-dot');
        const heroStartBtn = document.getElementById('hero-start-quiz-btn');

        if (heroQuizTitle) heroQuizTitle.textContent = latestQuiz.title;
        if (heroQuizDescription) heroQuizDescription.textContent = latestQuiz.description || 'Testez vos connaissances avec ce quiz.';
        if (heroQuizQuestions) heroQuizQuestions.textContent = `${latestQuiz.questionCount} question${latestQuiz.questionCount > 1 ? 's' : ''}`;

        // Calculer le temps estimé
        const estimatedTime = Math.ceil(latestQuiz.questionCount * CONFIG.timeLimit / 60);
        if (heroQuizTime) heroQuizTime.textContent = `~${estimatedTime} min`;

        if (heroQuizCategory) heroQuizCategory.textContent = latestQuiz.category;
        
        // Afficher les icônes de difficulté
        if (heroQuizDifficultyIcons) {
            heroQuizDifficultyIcons.innerHTML = getDifficultyIcons(latestQuiz.difficulty);
        }

        // Mettre à jour la couleur du point
        if (heroQuizColorDot) {
            // Extraire la couleur du badge pour le point
            const colorClass = categoryColor.badge.match(/bg-\w+-500\/20 text-(\w+-300)/);
            if (colorClass) {
                heroQuizColorDot.className = `w-2 h-2 rounded-full bg-${colorClass[1].replace('-300', '-400')}`;
            } else {
                heroQuizColorDot.className = 'w-2 h-2 rounded-full bg-primary-400';
            }
        }

        // Ajouter l'écouteur au bouton
        if (heroStartBtn) {
            heroStartBtn.addEventListener('click', () => {
                // Afficher le modal de sélection du temps pour le dernier quiz
                this.quizSelector.showTimeSelector(this.availableQuizzes[0]);
            });
        }

        // Mettre à jour la date
        if (heroQuizDate) {
            const today = new Date();
            const dateStr = today.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
            heroQuizDate.textContent = dateStr;
        }
    }

    async startQuiz(selectedQuiz, selectedTime = null) {
        try {
            // Si un temps est sélectionné, le stocker dans l'état
            if (selectedTime) {
                quizState.setTimeLimit(selectedTime);
            } else {
                // Sinon, utiliser le temps par défaut de la config
                quizState.setTimeLimit(CONFIG.timeLimit);
            }

            // Afficher le message de chargement
            domManager.showQuizInterface();
            domManager.updateQuizTitle(selectedQuiz.title);
            this.questionManager.showLoadingMessage();

            // Charger les données du quiz (config + questions)
            const quizData = await loadQuizData(`${CONFIG.questionsPath}${selectedQuiz.id}.json`);
            
            // Fusionner la configuration du fichier JSON avec celle de config.js
            const mergedQuiz = {
                ...selectedQuiz,
                ...quizData.config
            };
            
            // Configurer l'état du quiz
            quizState.reset();
            quizState.setQuiz(mergedQuiz);
            quizState.setQuestions(shuffleArray(quizData.questions));

            // Démarrer la première question
            this.questionManager.showQuestion();

        } catch (error) {
            console.error('Erreur lors du démarrage du quiz:', error);
            alert('Erreur lors du chargement du quiz. Veuillez réessayer.');
        }
    }

    showResults() {
        this.resultsManager.show();
    }

    async startLatestQuiz() {
        try {
            // Trouver le dernier quiz dans la liste
            if (this.availableQuizzes.length === 0) {
                console.error('❌ Aucun quiz disponible');
                return;
            }
            
            // Récupérer le dernier quiz (premier de la liste, supposé être triée par date)
            const latestQuiz = this.availableQuizzes[0];
            console.log('🚀 Starting latest quiz:', latestQuiz.id);
            
            // Démarrer le quiz
            this.startQuiz(latestQuiz);
        } catch (error) {
            console.error('❌ Erreur lors du chargement du dernier quiz:', error);
        }
    }

    restartQuiz() {
        console.log('🔄 App.restartQuiz() called');
        if (quizState.currentQuiz) {
            // Redémarrer avec le même temps que le dernier essai
            this.startQuiz(quizState.currentQuiz, quizState.currentTimeLimit);
        }
    }

    async backToHome() {
        console.log('🏠 App.backToHome() called');
        quizState.reset();
        
        // Afficher la sélection des quiz
        const quizSelection = document.getElementById('quiz-selection');
        const historyScreen = document.getElementById('history-screen');
        if (quizSelection) {
            quizSelection.classList.remove('hidden');
        }
        if (historyScreen) {
            historyScreen.classList.add('hidden');
        }
        
        domManager.showQuizSelection();
    }
}

// Initialiser l'application quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    const app = new QuizApp();
    app.init();
});