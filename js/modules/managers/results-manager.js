/**
 * Module de gestion des résultats de quiz
 */

import { quizState } from '../core/state.js';
import { domManager } from '../ui/dom.js';
import { launchConfetti } from '../core/utils.js';
import { CONFIG } from '../core/config.js';
import { playerManager } from '../core/player.js';
import { rewardsManager } from './rewards-manager.js';
import { T } from '../core/theme.js';

export class ResultsManager {
    constructor(onRestart, onBackToHome, onShowTrophies) {
        console.log('📦 ResultsManager constructor called');
        console.log('onRestart:', onRestart);
        console.log('onBackToHome:', onBackToHome);
        this.onRestart = onRestart;
        this.onBackToHome = onBackToHome;
        this.onShowTrophies = onShowTrophies;
    }

    show() {
        console.log('🎯 ResultsManager.show() called');
        console.log('Quiz state:', quizState);
        
        // Calculer le nombre de questions qui comptent pour le score
        // Inclut les QCM et les questions à saisie de texte
        const scorableQuestions = quizState.questions.filter(q =>
            (q.choices && q.choices.length > 0) || q.answer || q.acceptedAnswers
        );
        const totalScorable = scorableQuestions.length;
        
        const score = quizState.score || 0;
        const percentage = totalScorable > 0 ? Math.round((score / totalScorable) * 100) : 0;
        
        console.log(`📊 Score: ${score}/${totalScorable} = ${percentage}%`);

        // Calculer et ajouter les points de récompense (en tenant compte du temps limite choisi)
        const rewardsResult = rewardsManager.addPoints(percentage, quizState.currentQuiz?.title, quizState.currentTimeLimit);

        // Sauvegarder le résultat avec les points gagnés
        playerManager.saveResult({
            id: quizState.currentQuiz?.id,
            title: quizState.currentQuiz?.title,
            score: score,
            totalQuestions: totalScorable,
            percentage: percentage,
            timeSpent: quizState.totalTime,
            difficulty: quizState.currentQuiz?.difficulty,
            category: quizState.currentQuiz?.category,
            pointsEarned: rewardsResult.pointsEarned,
            totalPoints: rewardsResult.totalPoints
        });
        
        // Déterminer le message basé sur le pourcentage
        let message = '';
        let messageClass = '';
        if (percentage === 100) {
            message = '<i class="bi bi-trophy-fill text-yellow-400"></i> Parfait ! Vous maîtrisez ce quiz !';
            messageClass = 'text-green-400';
        } else if (percentage >= 80) {
            message = '<i class="bi bi-emoji-smile-fill text-green-400"></i> Très bien ! Continuez comme ça !';
            messageClass = 'text-green-400';
        } else if (percentage >= 60) {
            message = '<i class="bi bi-hand-thumbs-up-fill text-yellow-400"></i> Bien ! Quelques lacunes à combler.';
            messageClass = 'text-yellow-400';
        } else if (percentage >= 40) {
            message = '<i class="bi bi-book-fill text-orange-400"></i> À améliorer. Révisez un peu !';
            messageClass = 'text-orange-400';
        } else {
            message = '<i class="bi bi-hand-thumbs-up-fill text-red-400"></i> Pas grave ! Rejouez pour progresser !';
            messageClass = 'text-red-400';
        }
        
        // Construire le HTML des résultats
        const quizTitle = quizState.currentQuiz?.title || 'Quiz';
        
        const resultsHTML = `
            <div class="py-8">
                <!-- Header -->
                <div class="text-center mb-6">
                    <h1 class="text-4xl md:text-5xl font-bold mb-1" style="color:#7c4004;font-family:'Baloo 2',sans-serif">Résultats</h1>
                    <p style="color:#b46e28">${quizTitle}</p>
                </div>

                <!-- Score Card -->
                <div class="rounded-2xl p-8 mb-8 text-center shadow-lg" style="background:#f4eadd;border:1.5px solid #dcc9b0">
                    <div class="mb-4">
                        <div class="text-7xl font-bold" style="color:#66bcb4;font-family:'Baloo 2',sans-serif">
                            ${percentage}%
                        </div>
                    </div>

                    <div class="mb-5">
                        <p class="text-2xl font-bold mb-1" style="color:#7c4004">${score} / ${totalScorable}</p>
                        <p style="color:#b46e28">Bonnes réponses</p>
                    </div>

                    <div class="p-3 rounded-xl mb-5" style="background:white;border:1px solid #dcc9b0">
                        <p class="text-base ${messageClass} font-semibold">${message}</p>
                    </div>

                    <div class="w-full rounded-full h-3 overflow-hidden" style="background:#eaddcc">
                        <div class="h-full rounded-full transition-all duration-700"
                             style="width:${percentage}%;background:linear-gradient(to right,#66bcb4,#489e96)"></div>
                    </div>
                </div>

                <!-- Rewards Section -->
                <div class="rounded-2xl p-5 mb-6" style="background:#f4eadd;border:1.5px solid #dcc9b0">
                    <div class="flex items-start gap-4">
                        <i class="bi bi-star-fill text-3xl text-yellow-400 flex-shrink-0 mt-0.5"></i>
                        <div class="flex-1">
                            <h3 class="text-base font-bold mb-1" style="color:#7c4004;font-family:'Baloo 2',sans-serif">Récompense Gagnée !</h3>
                            <p class="text-sm mb-3" style="color:#b46e28">
                                ${this.getRewardMessage(rewardsResult.pointsEarned, CONFIG.timeLimit)}
                            </p>
                            <div class="flex flex-wrap gap-4">
                                <div class="text-center">
                                    <p class="text-2xl font-bold text-yellow-500">${rewardsResult.totalPoints}</p>
                                    <p class="text-xs" style="color:#b46e28">Points totaux</p>
                                </div>
                                ${rewardsResult.canBuySecretCode ? `
                                    <div class="text-center">
                                        <p class="text-2xl">🔓</p>
                                        <p class="text-xs text-green-600 font-semibold">Code dispo !</p>
                                    </div>
                                ` : `
                                    <div class="text-center">
                                        <p class="text-2xl font-bold" style="color:#b46e28">${5 - rewardsResult.totalPoints}</p>
                                        <p class="text-xs" style="color:#b46e28">Points restants</p>
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>
                    ${rewardsResult.canBuySecretCode ? `
                        <div class="mt-4">
                            <button id="btnShowTrophies" class="btn-base btn-primary w-full justify-center">
                                <i class="bi bi-key-fill"></i>Débloquer un trophée
                            </button>
                        </div>
                    ` : ''}
                </div>

                <!-- Actions -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    <button id="btnRetry" class="btn-base btn-primary w-full justify-center py-3">
                        <i class="bi bi-arrow-clockwise"></i> Rejouer
                    </button>
                    <button id="btnHome" class="btn-base btn-secondary w-full justify-center py-3">
                        <i class="bi bi-house"></i> Accueil
                    </button>
                </div>

                <!-- Details Section -->
                <div class="rounded-2xl p-6" style="background:#f4eadd;border:1.5px solid #dcc9b0">
                    <h2 class="text-xl font-bold mb-6" style="color:#7c4004;font-family:'Baloo 2',sans-serif">Détails des réponses</h2>
                    <div class="space-y-4" id="detailsContainer">
                        ${this.renderDetails(quizState.questions)}
                    </div>
                </div>
            </div>
        `;
        
        domManager.setContent('results-container', resultsHTML);
        console.log('✅ Results HTML set in DOM');
        
        // Afficher le conteneur de résultats et masquer les autres
        domManager.showResults();
        console.log('✅ Results container shown via domManager');
        
        // Lancer confetti si 100%
        if (percentage === 100) {
            launchConfetti();
        }
        
        // Ajouter les écouteurs d'événements après un court délai pour assurer que le DOM est mis à jour
        const self = this; // Capturer 'this' pour éviter les problèmes de contexte
        setTimeout(() => {
            console.log('⏱️ Timeout callback - attaching event listeners');
            console.log('self:', self);
            console.log('self.onRestart:', self.onRestart);
            console.log('self.onBackToHome:', self.onBackToHome);
            
            const btnRetry = document.getElementById('btnRetry');
            const btnHome = document.getElementById('btnHome');
            const btnShowTrophies = document.getElementById('btnShowTrophies');
            
            console.log('btnRetry:', btnRetry);
            console.log('btnHome:', btnHome);
            console.log('btnShowTrophies:', btnShowTrophies);
            
            if (btnRetry) {
                btnRetry.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('🔄 Retry clicked');
                    console.log('self.onRestart:', self.onRestart);
                    if (self.onRestart) {
                        console.log('✅ Calling onRestart');
                        self.onRestart();
                    } else {
                        console.error('❌ onRestart not defined');
                    }
                });
            } else {
                console.error('❌ btnRetry element not found');
            }
            
            if (btnHome) {
                btnHome.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('🏠 Home clicked');
                    console.log('self.onBackToHome:', self.onBackToHome);
                    if (self.onBackToHome) {
                        console.log('✅ Calling onBackToHome');
                        self.onBackToHome();
                    } else {
                        console.error('❌ onBackToHome not defined');
                    }
                });
            } else {
                console.error('❌ btnHome element not found');
            }

            if (btnShowTrophies) {
                btnShowTrophies.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('🏆 Show Trophies clicked');
                    if (self.onShowTrophies) {
                        console.log('✅ Calling onShowTrophies');
                        self.onShowTrophies();
                    } else {
                        console.error('❌ onShowTrophies not defined');
                    }
                });
            }
        }, 100);
    }

    /**
     * Génère le message de récompense en fonction des points et du temps
     * @param {number} points - Nombre de points gagnés
     * @param {number} timeLimit - Temps limite utilisé
     * @returns {string} Message formaté
     */
    getRewardMessage(points, timeLimit) {
        if (points === 0) {
            return `<i class="bi bi-journal-text" style="color:${T.hexPrimaryLight}"></i> Score enregistré`;
        }

        const difficultyLabel = {
            5: 'Mode Expert (5s)',
            10: 'Mode Difficile (10s)',
            15: 'Mode Normal (15s)',
            20: 'Mode Facile (20s)'
        }[timeLimit] || 'Mode Normal';

        const emojis = ['<i class="bi bi-trophy-fill text-yellow-400"></i>', '<i class="bi bi-star-fill text-yellow-400"></i>', `<i class="bi bi-star-fill" style="color:${T.hexSecondary}"></i>`, `<i class="bi bi-star-fill" style="color:${T.hexPrimaryLight}"></i>`, '<i class="bi bi-trophy-fill text-green-400"></i>'];
        const emoji = emojis[Math.min(points - 1, emojis.length - 1)] || '<i class="bi bi-star-fill text-yellow-400"></i>';

        return `${emoji} ${difficultyLabel} : +${points} point${points > 1 ? 's' : ''} !`;
    }

    renderDetails(questions) {
        return questions.map((q, index) => {
            const userAnswer = quizState.userAnswers[index];
            const isCorrect = quizState.userAnswersCorrect[index];
            const isFreeResponse = !q.choices || q.choices.length === 0;
            
            let userAnswerText = 'Non répondu';
            if (userAnswer !== undefined && !isFreeResponse) {
                userAnswerText = q.choices[userAnswer] || 'Réponse inconnue';
            } else if (isFreeResponse && userAnswer) {
                userAnswerText = userAnswer;
            }
            
            const statusIcon = isCorrect ? '<i class="bi bi-check-circle-fill text-green-400"></i>' : '<i class="bi bi-x-circle-fill text-red-400"></i>';
            const statusColor = isCorrect ? 'text-green-400' : 'text-red-400';
            
            return `
                <div class="border-l-4 ${isCorrect ? 'border-green-400' : 'border-red-400'} p-4 rounded-lg" style="background:white;border-top:1px solid #eaddcc;border-right:1px solid #eaddcc;border-bottom:1px solid #eaddcc">
                    <div class="flex items-start justify-between mb-2">
                        <h3 class="font-semibold flex-1" style="color:#7c4004">${index + 1}. ${q.question}</h3>
                        <span class="text-xl ml-2">${statusIcon}</span>
                    </div>

                    <div class="space-y-1 text-sm">
                        <div>
                            <span style="color:#b46e28">Votre réponse:</span>
                            <p class="${statusColor} font-semibold">${userAnswerText}</p>
                        </div>
                        ${!isCorrect ? `
                            <div>
                                <span style="color:#b46e28">Bonne réponse:</span>
                                <p class="text-green-600 font-semibold">${q.correctAnswer}</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }
}