/**
 * Module de gestion des résultats de quiz
 */

import { quizState } from '../core/state.js';
import { domManager } from '../ui/dom.js';
import { launchConfetti } from '../core/utils.js';
import { playerManager } from '../core/player.js';
import { getNewlyUnlocked, getNextTrophy } from './trophy-progress.js';
import { addCacheBuster } from '../core/version.js';
import { T } from '../core/theme.js';

const THEME_LABELS = {
    'debut': 'Début',
    'progression': 'Progression',
    'resilience': 'Résilience',
    'excellence': 'Excellence'
};

export class ResultsManager {
    constructor(onRestart, onBackToHome, onShowTrophies) {
        console.log('📦 ResultsManager constructor called');
        console.log('onRestart:', onRestart);
        console.log('onBackToHome:', onBackToHome);
        this.onRestart = onRestart;
        this.onBackToHome = onBackToHome;
        this.onShowTrophies = onShowTrophies;
    }

    async show() {
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

        // Progression trophées : nombre de quiz réussis avant/après ce résultat
        const previousSuccessCount = playerManager.getSuccessfulQuizCount();

        playerManager.saveResult({
            id: quizState.currentQuiz?.id,
            title: quizState.currentQuiz?.title,
            score: score,
            totalQuestions: totalScorable,
            percentage: percentage,
            timeSpent: quizState.totalTime,
            difficulty: quizState.currentQuiz?.difficulty,
            category: quizState.currentQuiz?.category
        });

        const successCount = playerManager.getSuccessfulQuizCount();

        let trophies = [];
        try {
            const response = await fetch(addCacheBuster('./js/data/trophies.json'));
            const trophiesData = await response.json();
            trophies = trophiesData.trophies;
        } catch (error) {
            console.error('Erreur lors du chargement des trophées:', error);
        }

        const newlyUnlocked = getNewlyUnlocked(trophies, previousSuccessCount, successCount);
        const nextTrophy = getNextTrophy(trophies, successCount);
        
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
                <div class="text-center mb-8">
                    <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">Résultats</h1>
                    <p class="text-gray-400">${quizTitle}</p>
                </div>

                <!-- Score Card -->
                <div class="bg-gray-800 rounded-2xl p-8 mb-8 text-center shadow-2xl">
                    <div class="mb-6">
                        <div class="text-7xl font-bold text-white">
                            ${percentage}%
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <p class="text-2xl font-bold text-white mb-2">${score} / ${totalScorable}</p>
                        <p class="text-gray-400">Bonnes réponses</p>
                    </div>
                    
                    <div class="p-4 bg-gray-700 rounded-xl mb-6">
                        <p class="text-lg ${messageClass} font-semibold">${message}</p>
                    </div>
                    
                    <div class="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div class="h-full transition-all duration-500"
                             style="width:${percentage}%;background:${T.gradientMain}"></div>
                    </div>
                </div>

                <!-- Trophy Progress Section -->
                <div class="rounded-2xl p-6 mb-8 shadow-lg" style="background:linear-gradient(to right,${T.primaryA(0.5)},${T.secondaryA(0.3)});border:1px solid ${T.primaryA(0.5)}">
                    <div class="flex items-start gap-4">
                        <i class="bi bi-trophy-fill text-4xl text-yellow-400 flex-shrink-0"></i>
                        <div class="flex-1">
                            <h3 class="text-xl font-bold text-white mb-2">${newlyUnlocked.length > 0 ? 'Nouveau trophée débloqué !' : 'Progression trophées'}</h3>
                            <p class="text-purple-200 mb-3">
                                ${this.getTrophyProgressMessage(newlyUnlocked, nextTrophy, successCount)}
                            </p>
                        </div>
                    </div>
                    ${newlyUnlocked.length > 0 ? `
                        <button id="btnShowTrophies" class="btn-base btn-primary">
                            <i class="bi bi-trophy-fill"></i>Voir mes trophées
                        </button>
                    ` : ''}
                </div>

                <!-- Actions -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <button id="btnRetry" class="btn-base btn-primary w-full">
                        <i class="bi bi-arrow-clockwise"></i> Rejouer
                    </button>
                    <button id="btnHome" class="btn-base btn-secondary w-full">
                        <i class="bi bi-house"></i> Retour à l'accueil
                    </button>
                </div>

                <!-- Details Section -->
                <div class="bg-gray-800 rounded-2xl p-6 shadow-2xl">
                    <h2 class="text-xl font-bold text-white mb-6">Détails des réponses</h2>
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
     * Génère le message de progression trophées après un quiz
     * @param {array} newlyUnlocked - Trophées venant d'être débloqués par ce quiz
     * @param {object|null} nextTrophy - Prochain trophée à débloquer
     * @param {number} successCount - Nombre total de quiz réussis
     * @returns {string} Message formaté
     */
    getTrophyProgressMessage(newlyUnlocked, nextTrophy, successCount) {
        if (newlyUnlocked.length > 0) {
            return newlyUnlocked
                .map(t => `<i class="bi bi-star-fill" style="color:${T.hexSecondary}"></i> ${THEME_LABELS[t.theme] || t.theme} : « ${t.motivationUnlocked} »`)
                .join('<br>');
        }

        if (!nextTrophy) {
            return `<i class="bi bi-trophy-fill text-yellow-400"></i> Tous les trophées sont débloqués !`;
        }

        const remaining = nextTrophy.unlockThreshold - successCount;
        return `<i class="bi bi-journal-text" style="color:${T.hexPrimaryLight}"></i> Encore ${remaining} quiz réussi${remaining > 1 ? 's' : ''} pour débloquer ton prochain trophée.`;
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
                <div class="border-l-4 ${isCorrect ? 'border-green-400' : 'border-red-400'} bg-gray-700 p-4 rounded">
                    <div class="flex items-start justify-between mb-2">
                        <h3 class="font-bold text-white flex-1">${index + 1}. ${q.question}</h3>
                        <span class="text-xl ml-2">${statusIcon}</span>
                    </div>
                    
                    <div class="space-y-1 text-sm">
                        <div>
                            <span class="text-gray-400">Votre réponse:</span>
                            <p class="${statusColor} font-semibold">${userAnswerText}</p>
                        </div>
                        ${!isCorrect ? `
                            <div>
                                <span class="text-gray-400">Bonne réponse:</span>
                                <p class="text-green-400 font-semibold">${q.correctAnswer}</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }
}