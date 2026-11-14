/**
 * Module de gestion de l'historique des résultats
 */

import { playerManager } from '../core/player.js';
import { domManager } from '../ui/dom.js';
import { getDifficultyIcons } from '../core/utils.js';
import { T } from '../core/theme.js';
import { shareQuizResult } from '../core/share.js';
import { loadQuizData } from '../core/utils.js';
import { CONFIG } from '../core/config.js';
import { getSubjectStyle } from './quiz-selector.js';
import { getSubjectIcon } from '../core/subject-icons.js';

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

        // Moyenne par matière (les anciens résultats sans matière sont complétés en arrière-plan)
        this.renderSubjectAverages(results);
        this.fillMissingSubjects(results).then((changed) => {
            if (changed) this.renderSubjectAverages(playerManager.getAllResults());
        });

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
                <p class="text-sm mb-1 font-medium" style="color:#6b3603">Quiz terminés</p>
                <p class="text-3xl font-bold" style="color:#2e7c75">${stats.totalQuizzes}</p>
            </div>
            <div class="rounded-xl p-4 text-center" style="background:#f4eadd;border:1.5px solid #dcc9b0">
                <p class="text-sm mb-1 font-medium" style="color:#6b3603">Moyenne</p>
                <p class="text-3xl font-bold" style="color:#2e7c75">${stats.averageScore}%</p>
            </div>
            <div class="rounded-xl p-4 text-center" style="background:#f4eadd;border:1.5px solid #dcc9b0">
                <p class="text-sm mb-1 font-medium" style="color:#6b3603">Meilleur</p>
                <p class="text-3xl font-bold text-green-600">${stats.bestScore}%</p>
            </div>
            <div class="rounded-xl p-4 text-center" style="background:#f4eadd;border:1.5px solid #dcc9b0">
                <p class="text-sm mb-1 font-medium" style="color:#6b3603">Moins bon</p>
                <p class="text-3xl font-bold text-red-600">${stats.worstScore}%</p>
            </div>
        `;

        statsContainer.innerHTML = statsHTML;
    }

    /**
     * Complète la matière des anciens résultats (enregistrés avant l'ajout du champ) à partir du fichier du quiz
     * @returns {Promise<boolean>} true si au moins un résultat a été complété
     */
    async fillMissingSubjects(results) {
        const missingIds = [...new Set(results.filter(r => !r.subject && r.quizId).map(r => r.quizId))];
        if (missingIds.length === 0) return false;

        const subjects = {};
        await Promise.all(missingIds.map(async (id) => {
            try {
                const data = await loadQuizData(`${CONFIG.questionsPath}${id}.json`);
                if (data?.config?.subject) subjects[id] = data.config.subject;
            } catch (e) {
                // NOTE Quiz supprimé ou illisible : ces résultats restent hors des moyennes par matière
            }
        }));

        let changed = false;
        results.forEach((r) => {
            if (!r.subject && subjects[r.quizId]) {
                r.subject = subjects[r.quizId];
                changed = true;
            }
        });
        if (changed) playerManager.persistResults();
        return changed;
    }

    renderSubjectAverages(results) {
        const container = document.getElementById('history-subjects');
        if (!container) return;

        const bySubject = {};
        results.filter(r => r.subject).forEach((r) => {
            (bySubject[r.subject] ||= []).push(r.percentage);
        });
        const subjects = Object.entries(bySubject)
            .map(([name, scores]) => ({ name, count: scores.length, avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) }))
            .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'fr'));

        if (subjects.length === 0) {
            container.classList.add('hidden');
            container.innerHTML = '';
            return;
        }

        container.innerHTML = `
            <h2 class="text-sm font-bold mb-2" style="color:#7c4004"><i class="bi bi-bar-chart-fill mr-1 text-accent-500"></i>Moyenne par matière</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                ${subjects.map((s) => {
                    const st = getSubjectStyle(s.name);
                    const icon = getSubjectIcon(s.name);
                    return `
                    <div class="rounded-xl px-3 py-2.5" style="background:${st.bg};border:1.5px solid ${st.border}">
                        <div class="flex items-center justify-between gap-2">
                            <span class="flex items-center gap-1.5 font-bold text-sm min-w-0" style="color:${st.color}">
                                ${icon ? `<span style="color:${st.dot};display:inline-flex;width:16px;height:16px;flex-shrink:0" aria-hidden="true">${icon}</span>` : `<span style="color:${st.dot};font-size:0.6rem" aria-hidden="true">&#11044;</span>`}
                                <span class="truncate">${s.name}</span>
                            </span>
                            <span class="text-xl font-black" style="color:${st.color}">${s.avg}%</span>
                        </div>
                        <div class="mt-1.5 h-1.5 rounded-full overflow-hidden" style="background:rgba(0,0,0,0.08)">
                            <div class="h-full rounded-full" style="width:${s.avg}%;background:${st.dot}"></div>
                        </div>
                        <p class="text-[11px] mt-1 font-medium" style="color:${st.color};opacity:0.8">${s.count} quiz</p>
                    </div>`;
                }).join('')}
            </div>
        `;
        container.classList.remove('hidden');
    }

    renderResults(results) {
        const listContainer = document.getElementById('history-list');
        if (!listContainer) return;

        if (results.length === 0) {
            listContainer.innerHTML = `
                <div class="text-center py-12">
                    <i class="bi bi-inbox text-6xl mb-4" style="color:#8c4808"></i>
                    <p class="text-lg font-bold" style="color:#7c4004">Aucun résultat pour le moment.</p>
                    <p style="color:#6b3603">Lancez un quiz pour voir vos résultats ici !</p>
                </div>
            `;
            return;
        }

        // Trier par date décroissante (plus récents d'abord)
        const sortedResults = [...results].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );

        const resultsHTML = sortedResults.map((result, idx) => {
            const scoreClass = result.percentage >= 80 ? 'text-green-600' : 
                               result.percentage >= 60 ? 'text-amber-600' : 'text-red-600';
            
            const date = playerManager.formatDate(result.date);

            return `
                <div class="rounded-xl p-5 transition-shadow hover:shadow-md" style="background:#f4eadd;border:1.5px solid #dcc9b0">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex-1">
                            <h3 class="text-lg font-bold mb-2" style="color:#7c4004">${result.quizTitle}</h3>
                            <div class="flex gap-2 text-xs flex-wrap">
                                <span class="px-2 py-1 rounded-full whitespace-nowrap font-medium" style="background:#eaddcc;color:#6b3603">${getDifficultyIcons(result.difficulty)}</span>
                                <span class="px-2 py-1 rounded-full whitespace-nowrap font-medium" style="background:#e0f4f2;color:#1e5e57;border:1px solid #99d6d0">${result.category}</span>
                            </div>
                        </div>
                        <div class="text-right ml-4">
                            <p class="text-4xl font-black ${scoreClass}">${result.percentage}%</p>
                            <p class="text-sm font-medium" style="color:#6b3603">${result.score}/${result.totalQuestions}</p>
                        </div>
                    </div>
                    <div class="flex justify-between items-center text-sm pt-3 border-t font-medium flex-wrap gap-2" style="border-color:#dcc9b0;color:#6b3603">
                        <div class="flex gap-4">
                            <span><i class="bi bi-calendar mr-1"></i>${date}</span>
                            <span><i class="bi bi-hourglass-split mr-1"></i>${Math.round(result.timeSpent)}s</span>
                        </div>
                        <div class="flex gap-2 items-center">
                            ${result.pointsEarned !== undefined ? `
                                <span class="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap" style="background:#fff8e0;color:#853e04;border:1px solid #fde68a">
                                    <i class="bi bi-star-fill mr-1 text-accent-500"></i>+${result.pointsEarned} pt${result.pointsEarned > 1 ? 's' : ''}
                                </span>
                            ` : ''}
                            <button class="btn-share-history btn-base btn-secondary text-xs py-1 px-2.5 rounded-lg flex items-center gap-1.5 hover:border-amber-500" data-idx="${idx}" title="Partager ce résultat">
                                <i class="bi bi-share-fill text-accent-500"></i>
                                <span>Partager</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        listContainer.innerHTML = resultsHTML;

        // Attacher les écouteurs de partage sur chaque bouton
        listContainer.querySelectorAll('.btn-share-history').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const idx = parseInt(btn.dataset.idx, 10);
                const result = sortedResults[idx];
                if (result) {
                    await shareQuizResult({
                        title: result.quizTitle,
                        score: result.score,
                        totalQuestions: result.totalQuestions,
                        percentage: result.percentage,
                        pointsEarned: result.pointsEarned
                    });
                }
            });
        });
    }
}
