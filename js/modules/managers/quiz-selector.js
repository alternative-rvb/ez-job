/**
 * Module de sélection des quiz
 */

import { CONFIG } from '../core/config.js';
import { loadAvailableQuizzes } from '../core/utils.js';
import { domManager } from '../ui/dom.js';
import { getCategoryColors, initializeCategoryColors } from '../core/category-colors.js';
import { playerManager } from '../core/player.js';

export class QuizSelector {
    constructor(onQuizSelect) {
        this.onQuizSelect = onQuizSelect;
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
            this.searchQuery = '';

            // Récupérer les catégories disponibles depuis CONFIG
            this.availableCategories = CONFIG.availableCategories || [];
            console.log('📦 Catégories pour les filtres:', this.availableCategories);
            
            // Assurer un délai minimum de 500ms pour le loader
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, 500 - elapsedTime);
            
            setTimeout(() => {
                this.renderFilterButtons();
                this.renderQuizCards();
                this.hideLoader();
            }, remainingTime);
            
        } catch (error) {
            console.error('Erreur lors du chargement des quiz:', error);
            this.showError('Erreur lors du chargement des quiz. Veuillez réessayer.');
        }
    }

    renderQuizCards() {
        // Remettre les classes originales de la grille - 4 colonnes responsive
        const quizListContainer = document.getElementById('quiz-list');
        quizListContainer.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';

        // Appliquer les filtres (catégorie + recherche)
        let filteredQuizzes = this.currentFilter === 'all'
            ? this.allQuizzes
            : this.allQuizzes.filter(quiz => quiz.category === this.currentFilter);

        // Appliquer la recherche textuelle
        if (this.searchQuery.trim()) {
            const query = this.searchQuery.toLowerCase();
            filteredQuizzes = filteredQuizzes.filter(quiz => {
                const matchesTitle = quiz.title.toLowerCase().includes(query);
                const matchesDescription = quiz.description.toLowerCase().includes(query);
                const matchesTags = quiz.tag && quiz.tag.some(tag => tag.toLowerCase().includes(query));
                const matchesCategory = quiz.category.toLowerCase().includes(query);

                return matchesTitle || matchesDescription || matchesTags || matchesCategory;
            });
        }
            
        const quizCards = filteredQuizzes.map(quiz => {
            // Image avec fallback placehold.co
            const imageUrl = quiz.imageUrl || `https://placehold.co/400x200?text=${encodeURIComponent(quiz.title)}`;

            // Couleurs basées sur la catégorie
            const categoryColor = getCategoryColors(quiz.category);

            // Récupérer le meilleur résultat pour ce quiz
            const bestResult = this.getBestResult(quiz.id);

            // Vérifier si le quiz est nouveau
            const isNew = this.isNewQuiz(quiz.createdAt);

            return `
                <div class="group cursor-pointer quiz-card overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-gray-800"
                     data-quiz-id="${quiz.id}">
                    <!-- Image -->
                    <div class="relative h-32 overflow-hidden bg-gray-700">
                        <img src="${imageUrl}" alt="${quiz.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">
                        <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                        ${isNew ? `
                            <div class="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-emerald-600 px-2 py-1 rounded shadow-md">
                                <div class="flex items-center gap-1">
                                    <i class="bi bi-star-fill text-white text-xs"></i>
                                    <span class="text-white font-bold text-xs tracking-wide">NEW</span>
                                </div>
                            </div>
                        ` : ''}
                        ${bestResult ? `
                            <div class="absolute top-2 right-2 bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded shadow-md border border-gray-600/50">
                                <div class="flex items-center gap-1">
                                    <i class="bi bi-star-fill text-gray-400 text-xs"></i>
                                    <span class="text-gray-200 font-semibold text-xs">${bestResult.percentage}%</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- Contenu -->
                    <div class="p-3">
                        <div class="flex items-start justify-between mb-1">
                            <h3 class="text-sm font-bold text-white flex-1">${quiz.title}</h3>
                            <div class="text-right ml-1">
                                <div class="text-xs font-semibold text-gray-300">${quiz.questionCount}</div>
                                <div class="text-xs text-gray-500">Q.</div>
                            </div>
                        </div>
                        
                        <p class="text-xs text-gray-400 mb-2 line-clamp-2">${quiz.description}</p>
                        
                        <!-- Badges -->
                        <div class="flex flex-wrap gap-1 mb-2">
                            <span class="text-xs px-1 py-0.5 ${categoryColor.badge} rounded font-medium">
                                <i class="bi bi-folder mr-0.5"></i>${quiz.category}
                            </span>
                            <span class="text-xs px-1 py-0.5 bg-gray-700 text-gray-200 rounded font-medium">
                                <i class="bi bi-lightning-charge mr-0.5"></i>${quiz.difficulty}
                            </span>
                        </div>
                        
                        <!-- Tags (au maximum 1 affiché) -->
                        ${quiz.tag && quiz.tag.length > 0 ? `
                            <span class="text-xs px-1 py-0.5 bg-gray-700 text-gray-200 rounded font-medium">
                                <i class="bi bi-tag mr-0.5"></i>${quiz.tag[0]}
                            </span>
                        ` : ''}
                        
                        <!-- Infos bas -->
                        <div class="flex items-center justify-between mt-2 pt-2 border-t border-gray-700">
                            <div class="flex items-center text-xs text-gray-500">
                                <i class="bi bi-clock mr-0.5"></i>
                                <span>~${Math.ceil(quiz.questionCount * CONFIG.timeLimit / 60)}m</span>
                            </div>
                            <span class="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
                                <i class="bi bi-play-fill"></i>
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
                if (selectedQuiz && this.onQuizSelect) {
                    this.onQuizSelect(selectedQuiz);
                }
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
        const categoryFiltersContainer = document.getElementById('category-filters');
        if (!categoryFiltersContainer) {
            console.warn('⚠️ Conteneur category-filters non trouvé');
            return;
        }

        // Générer les boutons de filtres dynamiquement
        let filterButtonsHTML = `
            <button type="button" data-category="all" class="btn-base btn-primary category-filter selected">
                Toutes
            </button>
        `;

        // Ajouter les catégories disponibles avec les couleurs appropriées
        if (this.availableCategories && this.availableCategories.length > 0) {
            this.availableCategories.forEach(category => {
                const colors = getCategoryColors(category);
                filterButtonsHTML += `
                    <button type="button" data-category="${category}" class="btn-category category-filter ${colors.badge}">
                        ${category}
                    </button>
                `;
            });
        }

        categoryFiltersContainer.innerHTML = filterButtonsHTML;
        
        // Réappliquer les écouteurs d'événements
        this.setupFilters();
    }

    setupFilters() {
        document.querySelectorAll('.category-filter').forEach(button => {
            button.addEventListener('click', () => {
                const isAllBtn = button.dataset.category === 'all';
                
                // Retirer la classe selected de tous les boutons
                document.querySelectorAll('.category-filter').forEach(btn => {
                    btn.classList.remove('selected');
                });
                
                // Ajouter la classe selected au bouton cliqué
                button.classList.add('selected');

                // Mettre à jour le filtre
                this.currentFilter = button.dataset.category;
                this.renderQuizCards();
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
                <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-400 mb-6"></div>
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