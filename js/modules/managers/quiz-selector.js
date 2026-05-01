/**
 * Module de sélection des quiz
 */

import { CONFIG } from '../core/config.js';
import { loadAvailableQuizzes, getDifficultyIcons } from '../core/utils.js';
import { domManager } from '../ui/dom.js';
import { getCategoryColors, initializeCategoryColors } from '../core/category-colors.js';
import { playerManager } from '../core/player.js';
import { T } from '../core/theme.js';
import { getSubjectIcon } from '../core/subject-icons.js';

// Palette de couleurs par matière (point coloré + badge)
const SUBJECT_STYLES = {
    'Mathématiques': { dot: '#ef4444', bg: '#fef2f2', color: '#991b1b', border: '#fecaca' },
    'Français':      { dot: '#3b82f6', bg: '#eff6ff', color: '#1e40af', border: '#bfdbfe' },
    'Histoire':      { dot: '#f59e0b', bg: '#fffbeb', color: '#92400e', border: '#fde68a' },
    'Géographie':    { dot: '#10b981', bg: '#ecfdf5', color: '#065f46', border: '#a7f3d0' },
    'Sciences':      { dot: '#8b5cf6', bg: '#f5f3ff', color: '#5b21b6', border: '#ddd6fe' },
    'Anglais':       { dot: '#06b6d4', bg: '#ecfeff', color: '#155e75', border: '#a5f3fc' },
    'Arts':          { dot: '#ec4899', bg: '#fdf2f8', color: '#9d174d', border: '#fbcfe8' },
    'Musique':       { dot: '#f97316', bg: '#fff7ed', color: '#9a3412', border: '#fed7aa' },
    'SVT':           { dot: '#22c55e', bg: '#f0fdf4', color: '#14532d', border: '#bbf7d0' },
    'Physique':      { dot: '#6366f1', bg: '#eef2ff', color: '#3730a3', border: '#c7d2fe' },
    'Chimie':        { dot: '#14b8a6', bg: '#f0fdfa', color: '#134e4a', border: '#99f6e4' },
    'Informatique':  { dot: '#64748b', bg: '#f8fafc', color: '#1e293b', border: '#cbd5e1' },
};

function getSubjectStyle(subject) {
    return SUBJECT_STYLES[subject] || { dot: '#b46e28', bg: '#fef3e2', color: '#7c4004', border: '#fde8c0' };
}

export class QuizSelector {
    constructor(onQuizSelect) {
        this.onQuizSelect = onQuizSelect;
        this.timeOptions = [5, 10, 15, 20]; // Options de temps en secondes
        this.selectedQuiz = null;
    }

    async render() {
        // Afficher le loader
        this.showLoader();

        const startTime = Date.now();

        try {
            // S'assurer que les couleurs sont initialisées
            await initializeCategoryColors();

            let availableQuizzes = await loadAvailableQuizzes();

            // Appliquer le filtre de catégories si défini dans CONFIG
            if (CONFIG.categoryFilter && Array.isArray(CONFIG.categoryFilter)) {
                availableQuizzes = availableQuizzes.filter(quiz =>
                    CONFIG.categoryFilter.includes(quiz.category)
                );
            }

            // Trier par date de création (du plus récent au plus ancien)
            const sortedQuizzes = availableQuizzes.sort((a, b) => {
                // Si pas de createdAt, mettre à la fin
                if (!a.createdAt && !b.createdAt) return 0;
                if (!a.createdAt) return 1;
                if (!b.createdAt) return -1;

                // Trier par date décroissante (plus récent en premier)
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            this.allQuizzes = sortedQuizzes;
            this.currentFilter = 'all';
            this.currentLevelFilter = 'all';
            this.currentSubjectFilter = 'all';
            this.searchQuery = '';

            // Récupérer les catégories, niveaux et matières depuis CONFIG
            this.availableCategories = CONFIG.availableCategories || [];
            this.availableLevels = CONFIG.availableLevels || [];
            this.availableSubjects = CONFIG.availableSubjects || [];

            // Assurer un délai minimum de 500ms pour le loader
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, 500 - elapsedTime);

            await new Promise(resolve => setTimeout(resolve, remainingTime));
            this.renderFilterButtons();
            this.renderQuizCards();
            this.hideLoader();

        } catch (error) {
            console.error('Erreur lors du chargement des quiz:', error);
            this.showError('Erreur lors du chargement des quiz. Veuillez réessayer.');
        }
    }

    renderQuizCards() {
        // Remettre les classes originales de la grille - 4 colonnes responsive
        const quizListContainer = document.getElementById('quiz-list');
        quizListContainer.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';

        // Appliquer les filtres (niveau + matière + recherche)
        let filteredQuizzes = this.currentLevelFilter === 'all'
            ? this.allQuizzes
            : this.allQuizzes.filter(quiz => quiz.level === this.currentLevelFilter);

        if (this.currentSubjectFilter !== 'all') {
            filteredQuizzes = filteredQuizzes.filter(quiz => quiz.subject === this.currentSubjectFilter);
        }

        // Appliquer la recherche textuelle
        if (this.searchQuery.trim()) {
            const query = this.searchQuery.toLowerCase();
            filteredQuizzes = filteredQuizzes.filter(quiz => {
                const matchesTitle = quiz.title.toLowerCase().includes(query);
                const matchesDescription = quiz.description.toLowerCase().includes(query);
                const matchesTags = quiz.tag && quiz.tag.some(tag => tag.toLowerCase().includes(query));
                const matchesCategory = quiz.category.toLowerCase().includes(query);
                const matchesLevel = quiz.level && quiz.level.toLowerCase().includes(query);
                const matchesSubject = quiz.subject && quiz.subject.toLowerCase().includes(query);

                return matchesTitle || matchesDescription || matchesTags || matchesCategory || matchesLevel || matchesSubject;
            });
        }
            
        // Palette hex pour les placeholders de cartes sans image (inline CSS, indépendant du cache Tailwind)
        const CARD_GRADIENTS = [
            ['#f59e0b', '#f97316'], // amber → orange
            ['#10b981', '#14b8a6'], // emerald → teal
            ['#0ea5e9', '#3b82f6'], // sky → blue
            ['#f43f5e', '#ec4899'], // rose → pink
            ['#8b5cf6', '#a855f7'], // violet → purple
            ['#f97316', '#ef4444'], // orange → red
            ['#06b6d4', '#0ea5e9'], // cyan → sky
            ['#16a34a', '#10b981'], // green → emerald
            ['#d946ef', '#f43f5e'], // fuchsia → rose
            ['#dc2626', '#f97316'], // red → orange
        ];

        const quizCards = filteredQuizzes.map((quiz, idx) => {
            // Couleurs basées sur la catégorie (pour les badges)
            const categoryColor = getCategoryColors(quiz.category);

            // Couleur et icône de la matière
            const subjectStyle = quiz.subject ? getSubjectStyle(quiz.subject) : null;
            const subjectIcon = quiz.subject ? getSubjectIcon(quiz.subject) : null;

            // Dégradé de la carte : basé sur l'index pour varier les couleurs dans une même catégorie
            const grad = CARD_GRADIENTS[idx % CARD_GRADIENTS.length];

            // Récupérer le meilleur résultat pour ce quiz
            const bestResult = this.getBestResult(quiz.id);

            // Vérifier si le quiz est nouveau
            const isNew = this.isNewQuiz(quiz.createdAt);

            // Zone image : vraie image ou placeholder CSS selon disponibilité (ratio 16:9)
            const imageSectionHTML = quiz.imageUrl && quiz.imageUrl.trim() !== '' ? `
                <div class="relative overflow-hidden" style="background-color:#eaddcc;padding-top:56.25%">
                    <img src="${quiz.imageUrl}" alt="${quiz.title}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">
                    <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                </div>
            ` : `
                <div class="relative overflow-hidden flex items-center justify-center" style="background:linear-gradient(135deg,${grad[0]} 0%,${grad[1]} 100%);padding-top:56.25%">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="text-center px-3 py-2">
                            <p class="font-bold leading-tight line-clamp-3 text-white drop-shadow" style="font-family:'Baloo 2',sans-serif;font-size:1rem">${quiz.title}</p>
                        </div>
                        <div class="absolute inset-0 opacity-20" style="background-image:radial-gradient(circle at 80% 20%, white 0%, transparent 60%)"></div>
                    </div>
                </div>
            `;

            return `
                <div class="group cursor-pointer quiz-card overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300" style="background:#f4eadd"
                     data-quiz-id="${quiz.id}">
                    <!-- Image ou placeholder -->
                    <div class="relative">
                        ${imageSectionHTML}
                        ${isNew ? `
                            <div class="absolute top-2 left-2 px-2 py-0.5 rounded-full shadow-sm" style="background:#ff9d00">
                                <span class="text-white font-bold text-xs tracking-wide">Nouveau</span>
                            </div>
                        ` : ''}
                        ${bestResult ? `
                            <div class="absolute top-2 right-2 px-2 py-0.5 rounded-full shadow-sm" style="background:rgba(255,255,255,0.95)">
                                <div class="flex items-center gap-1">
                                    <i class="bi bi-star-fill text-xs" style="color:#ff9d00"></i>
                                    <span class="font-bold text-xs" style="color:#489e96">${bestResult.percentage}%</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Contenu -->
                    <div class="p-3">
                        <div class="flex items-start justify-between mb-1">
                            <h3 class="text-sm font-bold flex-1" style="color:#7c4004">${quiz.title}</h3>
                            <div class="text-right ml-1">
                                <div class="text-xs font-bold" style="color:#489e96">${quiz.questionCount}</div>
                                <div class="text-xs" style="color:#b46e28">Q.</div>
                            </div>
                        </div>

                        <p class="text-xs mb-2 line-clamp-2" style="color:#b46e28">${quiz.description}</p>

                        <!-- Badge niveau + matière (ou catégorie si pas de niveau) -->
                        <div class="flex flex-wrap gap-1 mb-2">
                            ${quiz.level ? `
                            <span class="text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap" style="background:#fef3c7;color:#92400e;border:1px solid #fde68a">
                                ${quiz.level}
                            </span>
                            ` : `
                            <span class="text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap" style="background:#e0f4f2;color:#489e96;border:1px solid #b0ddd9">
                                ${quiz.category}
                            </span>
                            `}
                            ${quiz.subject && subjectStyle ? `
                            <span class="text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap flex items-center gap-1" style="background:${subjectStyle.bg};color:${subjectStyle.color};border:1px solid ${subjectStyle.border}">
                                ${subjectIcon ? `<span style="color:${subjectStyle.dot};display:inline-flex;width:12px;height:12px;flex-shrink:0" aria-hidden="true">${subjectIcon}</span>` : `<span style="color:${subjectStyle.dot};font-size:0.6rem" aria-hidden="true">&#11044;</span>`}${quiz.subject}
                            </span>
                            ` : ''}
                        </div>

                        <!-- Premier tag non redondant avec niveau/matière/catégorie -->
                        ${(() => {
                            const excluded = new Set([quiz.subject, quiz.level, quiz.category].filter(Boolean));
                            const firstTag = quiz.tag && quiz.tag.find(t => !excluded.has(t));
                            return firstTag ? `
                            <span class="text-xs px-2 py-0.5 rounded-full whitespace-nowrap" style="background:#f4eadd;color:#b46e28;border:1px solid #e0d0bc">
                                <i class="bi bi-tag mr-0.5"></i>${firstTag}
                            </span>` : '';
                        })()}

                        <!-- Infos bas -->
                        <div class="flex items-center justify-between mt-2 pt-2" style="border-top:1px solid #e0d0bc">
                            <div class="flex items-center gap-2 text-xs" style="color:#b46e28">
                                <span><i class="bi bi-clock mr-0.5"></i>~${Math.ceil(quiz.questionCount * CONFIG.timeLimit / 60)}m</span>
                                <span style="color:#c8a882;letter-spacing:-1px">${getDifficultyIcons(quiz.difficulty)}</span>
                            </div>
                            <span class="text-xs font-bold transition-colors" style="color:#66bcb4">
                                <i class="bi bi-play-circle-fill text-base"></i>
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Afficher un message si aucun résultat
        if (filteredQuizzes.length === 0) {
            const noResultsHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-12">
                    <i class="bi bi-search text-6xl text-gray-600 mb-4"></i>
                    <p class="text-xl text-gray-400 mb-2">Aucun quiz trouvé</p>
                    <p class="text-sm text-gray-500">Essayez avec d'autres mots-clés</p>
                </div>
            `;
            domManager.setContent('quizList', noResultsHTML);
            return;
        }

        domManager.setContent('quizList', quizCards);

        // Ajouter les écouteurs d'événements
        document.querySelectorAll('.quiz-card').forEach(card => {
            card.addEventListener('click', () => {
                const quizId = card.dataset.quizId;
                const selectedQuiz = this.allQuizzes.find(q => q.id === quizId);
                if (selectedQuiz) {
                    this.showTimeSelector(selectedQuiz);
                }
            });
        });
    }

    /**
     * Affiche le modal de sélection du temps
     * @param {object} quiz - Le quiz sélectionné
     */
    showTimeSelector(quiz) {
        this.selectedQuiz = quiz;

        // Créer le modal
        const modalId = 'time-selector-modal';
        let existingModal = document.getElementById(modalId);
        if (existingModal) {
            existingModal.remove();
        }

        // Récupérer le temps par défaut du joueur
        const defaultTime = playerManager.defaultTimeLimit || 10;

        const timeButtonsHTML = this.timeOptions.map(time => {
            const isDefault = time === defaultTime;
            const selectedStyle = isDefault
                ? 'background:linear-gradient(to right,#ff9d00,#e08800);color:white;border:2px solid #ff9d00;font-weight:700;'
                : 'background:white;color:#7c4004;border:2px solid #dcc9b0;';
            return `
            <button class="time-option-btn py-4 px-6 rounded-xl font-semibold transition-all duration-200 hover:border-teal-300 hover:shadow-md relative"
                    style="${selectedStyle}"
                    data-time="${time}">
                ${isDefault ? '<span style="position:absolute;top:6px;right:6px;width:9px;height:9px;border-radius:50%;background:white;opacity:0.7"></span>' : ''}
                <span class="text-2xl font-bold block">${time}</span>
                <span class="block text-xs mt-0.5" style="color:${isDefault ? 'rgba(255,255,255,0.85)' : '#b0906a'}">secondes</span>
            </button>
        `;
        }).join('');

        const modalHTML = `
            <div id="${modalId}" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div class="rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden" style="background:#fbf3ea;border:1px solid #dcc9b0">
                    <!-- En-tête -->
                    <div class="px-6 pt-6 pb-4">
                        <h2 class="text-xl font-bold mb-1" style="color:#7c4004;font-family:'Baloo 2',sans-serif">Temps par question</h2>
                        <p class="text-sm" style="color:#b46e28">${quiz.title}</p>
                    </div>

                    <!-- Contenu -->
                    <div class="px-6 pb-6">
                        <!-- Grille de boutons -->
                        <div class="grid grid-cols-2 gap-3 mb-5">
                            ${timeButtonsHTML}
                        </div>

                        <!-- Bouton Annuler -->
                        <button class="close-time-modal w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all" style="background:white;color:#7c4004;border:1.5px solid #dcc9b0">
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Ajouter le modal au DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Ajouter les écouteurs d'événements
        const modal = document.getElementById(modalId);

        // Bouton Annuler
        modal.querySelector('.close-time-modal').addEventListener('click', () => {
            modal.remove();
        });

        // Fermer en cliquant en dehors du modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Boutons de temps
        modal.querySelectorAll('.time-option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedTime = parseInt(btn.dataset.time);
                // Ajouter le style selected pour le feedback visuel
                modal.querySelectorAll('.time-option-btn').forEach(b => {
                    b.style.background = 'white';
                    b.style.color = '#7c4004';
                    b.style.border = '2px solid #dcc9b0';
                    b.querySelector('span:last-child').style.color = '#b0906a';
                });
                btn.style.background = 'linear-gradient(to right,#ff9d00,#e08800)';
                btn.style.color = 'white';
                btn.style.border = '2px solid #ff9d00';
                btn.querySelector('span:last-child').style.color = 'rgba(255,255,255,0.85)';

                // Petit délai pour voir l'effet de sélection
                setTimeout(() => {
                    if (this.onQuizSelect) {
                        // Passer à la fois le quiz et le temps sélectionné
                        this.onQuizSelect(this.selectedQuiz, selectedTime);
                    }
                    modal.remove();
                }, 200);
            });
        });
    }

    /**
     * Récupère le meilleur résultat pour un quiz donné
     * @param {string} quizId - ID du quiz
     * @returns {object|null} Le meilleur résultat ou null
     */
    getBestResult(quizId) {
        const results = playerManager.getResultsByQuiz(quizId);
        if (!results || results.length === 0) {
            return null;
        }

        // Trouver le résultat avec le meilleur pourcentage
        return results.reduce((best, current) => {
            return current.percentage > best.percentage ? current : best;
        });
    }

    /**
     * Vérifie si un quiz est récent (créé dans les 30 derniers jours)
     * @param {string} createdAt - Date de création au format ISO (YYYY-MM-DD)
     * @returns {boolean} true si le quiz est récent
     */
    isNewQuiz(createdAt) {
        if (!createdAt) return false;

        const quizDate = new Date(createdAt);
        const today = new Date();
        const daysDiff = Math.floor((today - quizDate) / (1000 * 60 * 60 * 24));

        return daysDiff <= 30;
    }

    renderFilterButtons() {
        const levelFiltersContainer = document.getElementById('level-filters');
        const subjectFiltersContainer = document.getElementById('subject-filters');

        if (!levelFiltersContainer || !subjectFiltersContainer) {
            console.warn('⚠️ Conteneurs de filtres non trouvés');
            return;
        }

        // --- Filtre Niveau ---
        let levelButtonsHTML = `
            <button type="button" data-level="all" class="btn-base btn-category level-filter selected">
                Tous niveaux
            </button>
        `;

        if (this.availableLevels && this.availableLevels.length > 0) {
            this.availableLevels.forEach(level => {
                levelButtonsHTML += `
                    <button type="button" data-level="${level}" class="btn-base btn-category level-filter">
                        ${level}
                    </button>
                `;
            });
        }

        levelFiltersContainer.innerHTML = levelButtonsHTML;

        // --- Filtre Matière (affiche uniquement les matières du niveau sélectionné) ---
        this.renderSubjectButtons();

        // Réappliquer les écouteurs d'événements
        this.setupFilters();
    }

    renderSubjectButtons() {
        const subjectFiltersContainer = document.getElementById('subject-filters');
        if (!subjectFiltersContainer) return;

        // Calculer les matières disponibles selon le niveau actif
        const quizzesForLevel = this.currentLevelFilter === 'all'
            ? this.allQuizzes
            : this.allQuizzes.filter(q => q.level === this.currentLevelFilter);

        const subjectsInLevel = [...new Set(
            quizzesForLevel
                .filter(q => q.subject)
                .map(q => q.subject)
        )].sort();

        // Si aucune matière disponible, masquer le conteneur
        if (subjectsInLevel.length === 0) {
            subjectFiltersContainer.innerHTML = '';
            document.getElementById('subject-filters-wrapper')?.classList.add('hidden');
            return;
        }

        document.getElementById('subject-filters-wrapper')?.classList.remove('hidden');

        // Réinitialiser la sélection si la matière actuelle n'est plus disponible
        if (this.currentSubjectFilter !== 'all' && !subjectsInLevel.includes(this.currentSubjectFilter)) {
            this.currentSubjectFilter = 'all';
        }

        let subjectButtonsHTML = `
            <button type="button" data-subject="all" class="btn-base btn-category subject-filter">
                Toutes matières
            </button>
        `;

        subjectsInLevel.forEach(subject => {
            const style = getSubjectStyle(subject);
            const icon = getSubjectIcon(subject);
            const iconHTML = icon
                ? `<span style="display:inline-flex;width:14px;height:14px;flex-shrink:0" aria-hidden="true">${icon}</span>`
                : `<span style="font-size:0.6rem" aria-hidden="true">&#11044;</span>`;
            subjectButtonsHTML += `
                <button type="button" data-subject="${subject}" class="btn-base btn-category subject-filter flex items-center gap-1.5" style="--subject-accent:${style.dot}">
                    ${iconHTML}${subject}
                </button>
            `;
        });

        subjectFiltersContainer.innerHTML = subjectButtonsHTML;

        // Marquer le bouton actif (après injection du HTML)
        subjectFiltersContainer.querySelectorAll('.subject-filter').forEach(btn => {
            if (btn.dataset.subject === this.currentSubjectFilter) {
                btn.classList.add('selected');
            }
        });

        this.setupSubjectFilters();
    }

    updateResetButton() {
        const wrapper = document.getElementById('reset-filters-wrapper');
        if (!wrapper) return;
        const isFiltered = this.currentLevelFilter !== 'all' || this.currentSubjectFilter !== 'all';
        wrapper.classList.toggle('hidden', !isFiltered);
    }

    resetFilters() {
        this.currentLevelFilter = 'all';
        this.currentSubjectFilter = 'all';
        document.querySelectorAll('.level-filter').forEach(btn => btn.classList.remove('selected'));
        document.querySelector('.level-filter[data-level="all"]')?.classList.add('selected');
        this.renderSubjectButtons();
        this.renderQuizCards();
        this.updateResetButton();
    }

    setupFilters() {
        // Filtres niveau
        document.querySelectorAll('.level-filter').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.level-filter').forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                this.currentLevelFilter = button.dataset.level;
                this.currentSubjectFilter = 'all';
                this.renderSubjectButtons();
                this.renderQuizCards();
                this.updateResetButton();
            });
        });

        // Bouton reset
        document.getElementById('reset-filters-btn')?.addEventListener('click', () => {
            this.resetFilters();
        });
    }

    setupSubjectFilters() {
        document.querySelectorAll('.subject-filter').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.subject-filter').forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                this.currentSubjectFilter = button.dataset.subject;
                this.renderQuizCards();
                this.updateResetButton();
            });
        });
    }

    async show() {
        domManager.showQuizSelection();
        await this.render();
        this.setupFilters();
        this.setupSearch();
    }

    setupSearch() {
        const searchInput = document.getElementById('quiz-search-input');
        const clearBtn = document.getElementById('clear-search-btn');

        if (!searchInput || !clearBtn) {
            console.warn('⚠️ Éléments de recherche non trouvés');
            return;
        }

        // Recherche en temps réel avec debounce
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);

            const query = e.target.value.trim();

            // Afficher/masquer le bouton clear
            if (query) {
                clearBtn.classList.remove('hidden');
            } else {
                clearBtn.classList.add('hidden');
            }

            // Debounce de 300ms pour éviter trop de rendus
            debounceTimer = setTimeout(() => {
                this.searchQuery = query;
                this.renderQuizCards();
            }, 300);
        });

        // Bouton pour effacer la recherche
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchInput.focus();
            clearBtn.classList.add('hidden');
            this.searchQuery = '';
            this.renderQuizCards();
        });
    }

    showLoader() {
        // Changer les classes du conteneur pour permettre le centrage
        const quizListContainer = document.getElementById('quiz-list');
        quizListContainer.className = 'flex items-center justify-center min-h-[300px]';
        
        const loaderHTML = `
            <div class="flex flex-col items-center justify-center py-8">
                <div class="animate-spin rounded-full h-16 w-16 mb-6" style="border-bottom:4px solid ${T.hexPrimary}"></div>
                <p class="text-gray-400 text-xl font-medium">Chargement des quiz...</p>
                <p class="text-gray-500 text-sm mt-2">Veuillez patienter</p>
            </div>
        `;
        domManager.setContent('quizList', loaderHTML);
    }

    hideLoader() {
        // Le loader sera remplacé par les cartes de quiz dans renderQuizCards()
    }

    showError(message) {
        // Changer les classes du conteneur pour permettre le centrage
        const quizListContainer = document.getElementById('quiz-list');
        quizListContainer.className = 'flex items-center justify-center min-h-[300px]';
        
        const errorHTML = `
            <div class="flex flex-col items-center justify-center py-8">
                <div class="text-red-400 text-6xl mb-6">
                    <i class="bi bi-exclamation-triangle"></i>
                </div>
                <p class="text-gray-300 text-xl text-center font-medium mb-4">${message}</p>
                <button onclick="location.reload()" class="btn-base btn-primary">
                    Réessayer
                </button>
            </div>
        `;
        domManager.setContent('quizList', errorHTML);
    }
}