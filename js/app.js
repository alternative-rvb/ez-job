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
import { rewardsManager } from './modules/managers/rewards-manager.js';
import { roadmapManager } from './modules/ui/roadmap.js';
import { shuffleArray, loadQuizData, getDifficultyIcons } from './modules/core/utils.js';
import { initializeCategoryColors, getCategoryColors } from './modules/core/category-colors.js';
import { SKIN_COLORS, buildCustomAvatarSvg } from './modules/ui/avatars.js';
import { avatarCustomizerModal } from './modules/ui/avatar-modal.js';
import { APP_VERSION } from './modules/core/version.js';

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
        // Initialiser les couleurs des catégories
        await initializeCategoryColors();

        // Initialiser le gestionnaire DOM
        if (!domManager.init()) {
            console.error('Impossible d\'initialiser l\'application');
            return;
        }

        // Mettre à jour la version dans le footer
        const versionEl = document.getElementById('footer-version-text');
        if (versionEl) {
            versionEl.textContent = `v${APP_VERSION}`;
        }

        // Vérifier si le joueur a déjà un nom
        if (playerManager.playerName) {
            this.showQuizSelection();
        } else {
            this.showPlayerNameScreen();
        }
    }

    showPlayerNameScreen() {
        const screen = document.getElementById('player-name-screen');
        const form = document.getElementById('player-name-form');
        const input = document.getElementById('player-name-input');
        const avatarButtons = document.querySelectorAll('#start-avatar-picker .avatar-select-btn');
        const skinSwatchesContainer = document.getElementById('start-skin-swatches');
        const skinLabel = document.getElementById('start-skin-label');
        const boyPreviewEl = document.getElementById('start-avatar-boy-preview');
        const girlPreviewEl = document.getElementById('start-avatar-girl-preview');

        if (screen) {
            screen.classList.remove('hidden');
        }

        let selectedAvatar = playerManager.playerAvatar || 'boy';
        let selectedSkin = 'light';
        const currentConfig = playerManager.getAvatarConfig();
        if (currentConfig && currentConfig.skinColor) {
            selectedSkin = currentConfig.skinColor;
        }

        const renderPreviews = () => {
            if (boyPreviewEl) {
                boyPreviewEl.innerHTML = buildCustomAvatarSvg({
                    type: 'boy',
                    styleId: 1,
                    outfitId: 1,
                    hairColor: '#5a2d0c',
                    eyeColor: 'brown',
                    skinColor: selectedSkin,
                    mode: 'full'
                });
            }
            if (girlPreviewEl) {
                girlPreviewEl.innerHTML = buildCustomAvatarSvg({
                    type: 'girl',
                    styleId: 1,
                    outfitId: 1,
                    hairColor: '#8a3c08',
                    eyeColor: 'amber',
                    skinColor: selectedSkin,
                    mode: 'full'
                });
            }
        };

        const renderSkinSwatches = () => {
            if (!skinSwatchesContainer) return;
            const currentSkinObj = SKIN_COLORS.find(s => s.id === selectedSkin || s.base === selectedSkin) || SKIN_COLORS[1];
            if (skinLabel) {
                skinLabel.textContent = currentSkinObj ? currentSkinObj.name : selectedSkin;
            }

            skinSwatchesContainer.innerHTML = SKIN_COLORS.map(s => {
                const isSelected = selectedSkin === s.id || selectedSkin === s.base;
                return `
                    <button type="button" data-skin-id="${s.id}" data-skin-name="${s.name}" class="start-skin-swatch w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all transform hover:scale-110 relative shadow-md cursor-pointer ${
                        isSelected ? 'border-white ring-2 ring-accent-400 scale-110' : 'border-black/40 hover:border-white/80'
                    }" style="background-color: ${s.base};" title="${s.name}">
                        ${isSelected ? '<i class="bi bi-check text-slate-800 text-xs font-black absolute inset-0 flex items-center justify-center drop-shadow"></i>' : ''}
                    </button>
                `;
            }).join('');

            skinSwatchesContainer.querySelectorAll('.start-skin-swatch').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectedSkin = btn.dataset.skinId;
                    renderSkinSwatches();
                    renderPreviews();
                });
            });
        };

        // Rendu initial des previews et des pastilles de peau
        renderPreviews();
        renderSkinSwatches();

        // Gestion de la sélection du genre au démarrage
        avatarButtons.forEach(btn => {
            const isCurSelected = btn.dataset.avatar === selectedAvatar;
            btn.classList.toggle('selected', isCurSelected);
            btn.classList.toggle('bg-white/20', isCurSelected);
            btn.classList.toggle('border-white', isCurSelected);
            btn.classList.toggle('text-white', isCurSelected);
            btn.classList.toggle('bg-white/10', !isCurSelected);
            btn.classList.toggle('border-white/40', !isCurSelected);
            btn.classList.toggle('text-white/80', !isCurSelected);

            btn.addEventListener('click', () => {
                avatarButtons.forEach(b => {
                    b.classList.remove('selected', 'bg-white/20', 'border-white', 'text-white');
                    b.classList.add('bg-white/10', 'border-white/40', 'text-white/80');
                });
                btn.classList.add('selected', 'bg-white/20', 'border-white', 'text-white');
                btn.classList.remove('bg-white/10', 'border-white/40', 'text-white/80');

                const avatarId = btn.dataset.avatar;
                if (avatarId) {
                    selectedAvatar = avatarId;
                    playerManager.setPlayerAvatar(avatarId);
                }
            });
        });

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = input.value.trim();
                if (name.length > 0) {
                    playerManager.setPlayerName(name);
                    playerManager.setAvatarConfig({
                        type: selectedAvatar,
                        styleId: 1,
                        outfitId: 1,
                        hairColor: selectedAvatar === 'boy' ? '#5a2d0c' : '#8a3c08',
                        eyeColor: selectedAvatar === 'boy' ? 'brown' : 'amber',
                        skinColor: selectedSkin
                    });
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

        // Afficher la sélection des quiz (charge les quiz en interne)
        await this.quizSelector.show();

        // Récupérer la liste chargée depuis le sélecteur (évite un double fetch)
        this.availableQuizzes = this.quizSelector.allQuizzes || [];

        // Quiz récents annoncés par l'avatar (les plus récents d'abord, 3 au maximum)
        roadmapManager.setNewQuizTitles(
            this.availableQuizzes
                .filter(q => this.quizSelector.isNewQuiz(q.createdAt))
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 3)
                .map(q => q.title)
        );

        // Rendre la Roadmap Fantasy dans la section Hero
        roadmapManager.render();

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

        // Modale élégante de confirmation pour changer de joueur
        const showChangePlayerModal = () => {
            const existing = document.getElementById('change-player-modal');
            if (existing) existing.remove();

            const currentName = playerManager.playerName || 'Joueur';

            const modal = document.createElement('div');
            modal.id = 'change-player-modal';
            modal.className = 'fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-200 opacity-0';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-labelledby', 'change-player-modal-title');

            modal.innerHTML = `
                <div class="relative w-full max-w-md p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border-2 transform transition-all duration-200 scale-95 opacity-0 text-left" style="background:#fbf3ea; border-color:#66bcb4;">
                    <!-- En-tête -->
                    <div class="flex items-center justify-between gap-3 mb-4">
                        <div class="flex items-center gap-3">
                            <span class="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-lg shadow-md" style="background:linear-gradient(135deg, #66bcb4, #489e96);">
                                <i class="bi bi-person-gear"></i>
                            </span>
                            <div>
                                <h3 id="change-player-modal-title" class="text-xl sm:text-2xl font-bold leading-tight" style="color:#7c4004; font-family:'Baloo 2',sans-serif;">
                                    Changer de joueur ?
                                </h3>
                                <p class="text-xs" style="color:#b46e28;">Gestion du profil</p>
                            </div>
                        </div>
                        <button type="button" id="btn-close-change-player-modal" class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-black/5 transition cursor-pointer" aria-label="Fermer">
                            <i class="bi bi-x-lg text-lg"></i>
                        </button>
                    </div>

                    <!-- Carte profil actuel -->
                    <div class="flex items-center gap-3 p-3 rounded-xl mb-3.5" style="background:#f4eadd; border:1px solid #dcc9b0;">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center text-base shadow-inner text-white font-bold" style="background:#489e96;">
                            <i class="bi bi-person-fill"></i>
                        </div>
                        <div class="min-w-0 flex-1">
                            <div class="text-[10px] font-bold uppercase tracking-wider" style="color:#b46e28;">Profil en cours</div>
                            <div class="text-base font-extrabold truncate" style="color:#7c4004;">${currentName}</div>
                        </div>
                    </div>

                    <!-- Message d'explication -->
                    <p class="text-xs sm:text-sm mb-4 leading-relaxed" style="color:#6b3603;">
                        Cette action fermera la session en cours et réinitialisera l'historique pour permettre à un nouveau joueur de commencer.
                    </p>

                    <!-- Passerelle vers l'Atelier Avatar -->
                    <div class="flex items-center justify-between gap-3 p-2.5 sm:p-3 mb-5 rounded-xl text-xs" style="background:#eaddcc; border:1px solid #dcc9b0; color:#7c4004;">
                        <div class="flex items-center gap-2 min-w-0">
                            <i class="bi bi-palette-fill text-base flex-shrink-0" style="color:#489e96;"></i>
                            <span class="truncate">Tu veux juste modifier ton look ou ton prénom ?</span>
                        </div>
                        <button type="button" id="btn-modal-open-customizer" class="px-2.5 py-1 rounded-lg font-bold text-xs whitespace-nowrap transition cursor-pointer shadow-sm hover:scale-105 active:scale-95" style="background:#66bcb4; color:white;">
                            Atelier
                        </button>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-[#dcc9b0]/60">
                        <button type="button" id="btn-modal-cancel-change" class="btn-base btn-secondary py-2 px-4 text-xs sm:text-sm cursor-pointer">
                            Annuler
                        </button>
                        <button type="button" id="btn-modal-confirm-change" class="btn-base py-2 px-4 text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95" style="background:#dc2626; color:white;">
                            <i class="bi bi-arrow-repeat"></i>
                            Oui, changer
                        </button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            document.body.classList.add('overflow-hidden');

            const contentEl = modal.querySelector('div');

            // Animation d'ouverture
            requestAnimationFrame(() => {
                modal.classList.remove('opacity-0');
                modal.classList.add('opacity-100');
                if (contentEl) {
                    contentEl.classList.remove('opacity-0', 'scale-95');
                    contentEl.classList.add('opacity-100', 'scale-100');
                }
            });

            // Fermeture de la modale
            const closeModal = () => {
                modal.classList.remove('opacity-100');
                modal.classList.add('opacity-0');
                if (contentEl) {
                    contentEl.classList.remove('scale-100', 'opacity-100');
                    contentEl.classList.add('scale-95', 'opacity-0');
                }
                document.body.classList.remove('overflow-hidden');
                document.removeEventListener('keydown', onKeyDown);
                setTimeout(() => modal.remove(), 200);
            };

            const onKeyDown = (e) => {
                if (e.key === 'Escape') closeModal();
            };
            document.addEventListener('keydown', onKeyDown);

            // Clic arrière-plan
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });

            // Boutons de fermeture
            modal.querySelector('#btn-close-change-player-modal')?.addEventListener('click', closeModal);
            modal.querySelector('#btn-modal-cancel-change')?.addEventListener('click', closeModal);

            // Passerelle vers Atelier
            modal.querySelector('#btn-modal-open-customizer')?.addEventListener('click', () => {
                closeModal();
                avatarCustomizerModal.open();
            });

            // Confirmation effective du changement de joueur
            modal.querySelector('#btn-modal-confirm-change')?.addEventListener('click', () => {
                playerManager.reset();
                location.reload();
            });
        };

        // Bouton changer de joueur (hero)
        const btnChangePlayer = document.getElementById('btn-change-player');
        if (btnChangePlayer) {
            btnChangePlayer.addEventListener('click', showChangePlayerModal);
        }

        // ===== Boutons du Header Navigation Desktop =====
        
        // Bouton joueur (nav)
        const navPlayerBtn = document.getElementById('nav-player-btn');
        if (navPlayerBtn) {
            navPlayerBtn.textContent = `${playerManager.playerName}`;
            navPlayerBtn.innerHTML = `<i class="bi bi-person"></i><span>${playerManager.playerName}</span>`;
            navPlayerBtn.title = 'Changer de joueur';
            navPlayerBtn.classList.remove('hidden');
            navPlayerBtn.addEventListener('click', showChangePlayerModal);
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
            mobilePlayerBtn.title = 'Changer de joueur';
            mobilePlayerBtn.classList.remove('hidden');
            mobilePlayerBtn.addEventListener('click', () => {
                document.getElementById('mobile-menu')?.classList.add('hidden');
                showChangePlayerModal();
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

        // NOTE Plein écran du navigateur (API Fullscreen), masqué si non supporté (ex. iPhone)
        const fsButton = document.getElementById('quiz-fullscreen-btn');
        if (fsButton && document.fullscreenEnabled) {
            fsButton.classList.remove('hidden');
            fsButton.addEventListener('click', () => {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    document.documentElement.requestFullscreen().catch(() => {});
                }
            });
        }

        // Navigation fluide au clic sur le fil d'Ariane (Accueil)
        document.querySelectorAll('nav[aria-label="Fil d\'Ariane"] a[href="/"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.backToHome();
            });
        });
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
        const defaultTimeLimit = playerManager.defaultTimeLimit ?? 10;
        
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
                    const estimatedTime = Math.ceil(quiz.questionCount * (CONFIG.timeLimit || 10) / 60);
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
        const estimatedTime = Math.ceil(latestQuiz.questionCount * (CONFIG.timeLimit || 10) / 60);
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
            if (selectedTime !== null && selectedTime !== undefined) {
                quizState.setTimeLimit(selectedTime);
            } else {
                // Sinon, utiliser le temps par défaut de la config
                quizState.setTimeLimit(CONFIG.timeLimit);
            }

            // Afficher le message de chargement
            domManager.showQuizInterface();
            domManager.updateQuizTitle(selectedQuiz.title, selectedQuiz.category || 'Quiz');
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
            
            // Démarrer le quiz
            this.startQuiz(latestQuiz);
        } catch (error) {
            console.error('❌ Erreur lors du chargement du dernier quiz:', error);
        }
    }

    restartQuiz() {
        if (quizState.currentQuiz) {
            // Redémarrer avec le même temps que le dernier essai
            this.startQuiz(quizState.currentQuiz, quizState.currentTimeLimit);
        }
    }

    async backToHome() {
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

        // Mettre à jour la Roadmap avec les nouveaux points gagnés
        roadmapManager.render();
    }
}

// Fonctions d'aide globales pour tester et ajuster le score en direct depuis la console
window.setScore = (points) => {
    rewardsManager.setTotalPoints(points);
    roadmapManager.render();
    console.log(`[Points] Score mis à jour : ${points} pts`);
    return points;
};

window.addScore = (points = 10) => {
    const current = rewardsManager.getTotalPoints();
    const updated = rewardsManager.setTotalPoints(current + points);
    roadmapManager.render();
    console.log(`[Points] Score augmenté de +${points} pts (Nouveau total : ${updated} pts)`);
    return updated;
};

// NOTE Dev uniquement : vide le localStorage du site (gemmes, skins, avatar, historique...) puis recharge la page
window.resetStorage = ({ keepName = false } = {}) => {
    const playerName = localStorage.getItem('playerName');
    localStorage.clear();
    if (keepName && playerName) localStorage.setItem('playerName', playerName);
    console.log(`[Storage] localStorage vidé${keepName ? ' (prénom conservé)' : ''}, rechargement...`);
    location.reload();
};

// Initialiser l'application quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    const app = new QuizApp();
    app.init();
});