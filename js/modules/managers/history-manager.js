/**
 * Module de gestion de l'historique des résultats
 */

import { playerManager } from '../core/player.js';
import { domManager } from '../ui/dom.js';
import { getDifficultyIcons } from '../core/utils.js';
import { T } from '../core/theme.js';

export class HistoryManager {
    constructor(onBack) {
        this.onBack = onBack;
    }

    show() {
        const results = playerManager.getAllResults();
        const stats = playerManager.getStats();

        // Afficher l'historique
        domManager.showHistory();

        // Afficher les statistiques
        this.renderStats(stats);

        // Afficher la liste des résultats
        this.renderResults(results);

        // Ajouter l'écouteur du bouton retour
        const btnBack = document.getElementById('btn-back-from-history');
        if (btnBack) {
            btnBack.addEventListener('click', () => {
                if (this.onBack) {
                    this.onBack();
                }
            });
        }
    }

    renderStats(stats) {
        const statsContainer = document.getElementById('history-stats');
        if (!statsContainer) return;

        const statsHTML = `
            <div class="rounded-xl p-4 text-center" style="background:#f4eadd;border:1.5px solid #dcc9b0">
                <p class="text-sm mb-1" style="color:#b46e28">Quiz terminés</p>
                <p class="text-3xl font-bold" style="color:#66bcb4">${stats.totalQuizzes}</p>
            </div>
            <div class="rounded-xl p-4 text-center" style="background:#f4eadd;border:1.5px solid #dcc9b0">
                <p class="text-sm mb-1" style="color:#b46e28">Moyenne</p>
                <p class="text-3xl font-bold" style="color:#66bcb4">${stats.averageScore}%</p>
            </div>
            <div class="rounded-xl p-4 text-center" style="background:#f4eadd;border:1.5px solid #dcc9b0">
                <p class="text-sm mb-1" style="color:#b46e28">Meilleur</p>
                <p class="text-3xl font-bold text-green-500">${stats.bestScore}%</p>
            </div>
            <div class="rounded-xl p-4 text-center" style="background:#f4eadd;border:1.5px solid #dcc9b0">
                <p class="text-sm mb-1" style="color:#b46e28">Moins bon</p>
                <p class="text-3xl font-bold text-red-400">${stats.worstScore}%</p>
            </div>
        `;

        statsContainer.innerHTML = statsHTML;
    }

    renderResults(results) {
        const listContainer = document.getElementById('history-list');
        if (!listContainer) return;

        if (results.length === 0) {
            listContainer.innerHTML = `
                <div class="text-center py-12">
                    <i class="bi bi-inbox text-6xl mb-4" style="color:#c8a882"></i>
                    <p class="text-lg" style="color:#b46e28">Aucun résultat pour le moment.</p>
                    <p style="color:#c8a882">Lancez un quiz pour voir vos résultats ici !</p>
                </div>
            `;
            return;
        }

        // Trier par date décroissante (plus récents d'abord)
        const sortedResults = [...results].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );

        const resultsHTML = sortedResults.map(result => {
            const scoreClass = result.percentage >= 80 ? 'text-green-400' : 
                               result.percentage >= 60 ? 'text-yellow-400' : 'text-red-400';
            
            const date = playerManager.formatDate(result.date);

            return `
                <div class="rounded-xl p-5 transition-shadow hover:shadow-md" style="background:#f4eadd;border:1.5px solid #dcc9b0">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex-1">
                            <h3 class="text-lg font-bold mb-2" style="color:#7c4004">${result.quizTitle}</h3>
                            <div class="flex gap-2 text-xs flex-wrap">
                                <span class="px-2 py-1 rounded-full whitespace-nowrap" style="background:#eaddcc;color:#b46e28">${getDifficultyIcons(result.difficulty)}</span>
                                <span class="px-2 py-1 rounded-full whitespace-nowrap" style="background:#e0f4f2;color:#489e96;border:1px solid #b0ddd9">${result.category}</span>
                            </div>
                        </div>
                        <div class="text-right ml-4">
                            <p class="text-4xl font-bold ${scoreClass}">${result.percentage}%</p>
                            <p class="text-sm" style="color:#b46e28">${result.score}/${result.totalQuestions}</p>
                        </div>
                    </div>
                    <div class="flex justify-between items-center text-sm pt-3 border-t" style="border-color:#dcc9b0;color:#b46e28">
                        <div class="flex gap-4">
                            <span><i class="bi bi-calendar mr-1"></i>${date}</span>
                            <span><i class="bi bi-hourglass-split mr-1"></i>${Math.round(result.timeSpent)}s</span>
                        </div>
                        <div class="flex gap-2 items-center">
                            ${result.pointsEarned !== undefined ? `
                                <span class="px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap" style="background:#fff8e0;color:#b45309;border:1px solid #fde68a">
                                    <i class="bi bi-star-fill mr-1"></i>+${result.pointsEarned} pt${result.pointsEarned > 1 ? 's' : ''}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        listContainer.innerHTML = resultsHTML;
    }
}
