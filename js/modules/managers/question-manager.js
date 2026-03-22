/**
 * Module de gestion des questions de quiz
 */

import { CONFIG } from '../core/config.js';
import { quizState } from '../core/state.js';
import { domManager } from '../ui/dom.js';
import { launchConfetti } from '../core/utils.js';
import { T } from '../core/theme.js';

export class QuestionManager {
    constructor(onQuizComplete) {
        this.onQuizComplete = onQuizComplete;
    }

    showQuestion() {
        if (quizState.isQuizComplete()) {
            this.onQuizComplete();
            return;
        }

        // Retirer le focus de tout élément actif avant de changer de question
        if (document.activeElement && document.activeElement !== document.body) {
            document.activeElement.blur();
        }

        const question = quizState.getCurrentQuestion();
        
        quizState.startTimer();
        quizState.startQuestionTimer();
        
        let imageSection = '';
        if (question.imageUrl) {
            const isSpoilerMode = quizState.currentQuiz?.spoilerMode;
            const blurClass = isSpoilerMode ? 'filter blur-md' : '';
            const spoilerOverlay = isSpoilerMode ? `
                <div class="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                    <div class="text-white text-center">
                        <i class="bi bi-eye-slash text-4xl mb-2"></i>
                    </div>
                </div>
            ` : '';
            
            imageSection = `
                <div class="mb-4 text-center relative overflow-hidden">
                    <img src="${question.imageUrl}"
                         alt="Question ${quizState.currentQuestionIndex + 1}"
                         class="max-w-full h-32 aspect-video object-cover rounded-lg mx-auto ${blurClass}"
                         id="question-image"
                         loading="lazy">
                    ${spoilerOverlay}
                </div>
            `;
        }
        
        let optionsHTML = '';
        if (question.choices && question.choices.length > 0) {
            // Mode choix multiples
            optionsHTML = question.choices.map((option, index) => {
                const letter = String.fromCharCode(65 + index);
                const isHidden = CONFIG.freeMode ? 'hidden' : '';
                return `
                    <button class="answer-btn ${isHidden} px-4 py-2 md:p-5 text-left rounded-xl border-2 touch-manipulation font-semibold transition-all duration-150" style="background-color:white;color:#5a3800;border-color:#dcc9b0"
                            data-answer-index="${index}">
                        <div class="flex items-center space-x-3">
                            <span class="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-base" style="background-color:#66bcb4;color:white">${letter}</span>
                            <span class="text-sm md:text-base leading-relaxed">${option}</span>
                        </div>
                    </button>
                `;
            }).join('');
        } else if (question.answer || question.acceptedAnswers) {
            // Mode saisie de texte - champ input
            const isHidden = CONFIG.freeMode ? 'hidden' : '';
            optionsHTML = `
                <div class="md:col-span-2">
                    <div class="rounded-lg p-6 space-y-4" style="background-color:#489e96">
                        <label for="text-answer-input" class="block text-lg font-medium text-white mb-2">
                            Votre réponse :
                        </label>
                        <input
                            type="text"
                            id="text-answer-input"
                            class="w-full px-4 py-3 text-lg text-white border-2 rounded-lg focus:outline-none transition-all" style="background-color:#66bcb4;border-color:rgba(255,255,255,0.4);color:white"
                            style="--tw-ring-color:${T.primaryA(0.25)}"
                            placeholder="Entrez votre réponse..."
                            autocomplete="off"
                        />
                        <button
                            id="submit-text-answer"
                            class="answer-submit-btn ${isHidden} w-full px-6 py-3 text-white font-bold rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            style="background:${T.gradientMain}"
                        >
                            <div class="flex items-center justify-center space-x-2">
                                <i class="bi bi-check-circle"></i>
                                <span>Valider ma réponse</span>
                            </div>
                        </button>
                    </div>
                </div>
            `;
        } else {
            // Pas de choix ni de réponse - question informative
            optionsHTML = `
                <div class="text-center py-8">
                    <p class="text-lg md:text-xl font-medium" style="color:${T.hexPrimary}">Question informative</p>
                    <p class="text-sm text-white/70 mt-2">Cette question ne compte pas dans le score</p>
                </div>
            `;
        }
        
        const questionHTML = `
            <div class="question-container">
                <!-- Timer prominent en haut -->
                <div class="mb-4 flex justify-center">
                    <div id="timer-badge" class="rounded-full px-6 py-3 shadow-lg" style="background:${T.gradientMain}">
                        <div class="flex items-center space-x-3">
                            <i class="bi bi-clock text-white text-lg"></i>
                            <span class="text-2xl font-bold text-white" id="timer-display-large">${quizState.timeRemaining}</span>
                            <span class="text-white text-sm">sec</span>
                        </div>
                    </div>
                </div>
                
                ${imageSection}
                
                <h3 class="text-xl md:text-2xl font-bold mb-4 text-center px-2">${question.question}</h3>
                
                <!-- Options améliorées pour mobile -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 px-2">
                    ${CONFIG.freeMode ? `
                        <div class="text-center py-4 px-6 rounded-lg mb-4 md:col-span-2" style="background:${T.primaryA(0.2)};border:2px solid ${T.primaryA(0.5)}">
                            <i class="bi bi-lightbulb text-2xl mb-2" style="color:${T.hexPrimaryLight}"></i>
                            <p class="font-medium" style="color:${T.hexPrimaryLight}">Mode Libre activé</p>
                            <p class="text-sm" style="color:${T.hexPrimary}">Les réponses sont cachées. Réfléchissez bien !</p>
                        </div>
                    ` : ''}
                    ${optionsHTML}
                </div>
                
                <!-- Progress bar -->
                <div class="mt-4 px-2 mb-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-semibold text-white">Progression</span>
                        <span class="text-sm font-semibold text-white" id="question-progress">${quizState.currentQuestionIndex + 1}/${quizState.questions.length}</span>
                    </div>
                    <div class="w-full rounded-full h-4 overflow-hidden shadow-inner" style="background:rgba(72,158,150,0.5);border:1px solid rgba(255,255,255,0.2)"
                        <div class="h-4 rounded-full transition-all duration-1000 ease-out shadow-md"
                             id="question-progress-bar"
                             style="background:linear-gradient(to right,#5a4594,#ef8218);width:${((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100}%"></div>
                    </div>
                </div>
            </div>
        `;
        
        domManager.setContent('quizContent', questionHTML);
        domManager.updateQuizStats(
            quizState.currentQuestionIndex, 
            quizState.questions.length, 
            quizState.score, 
            quizState.timeRemaining
        );
        
        // Ajouter les écouteurs d'événements
        const currentQuestion = quizState.getCurrentQuestion();

        // Gestion des boutons de choix multiples
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!quizState.isAnswered) {
                    // Désactiver TOUS les boutons immédiatement
                    document.querySelectorAll('.answer-btn').forEach(b => {
                        b.disabled = true;
                        b.style.border = '2px solid transparent';
                        b.style.backgroundColor = '';
                    });
                    this.selectAnswer(parseInt(btn.dataset.answerIndex));
                }
            });
        });

        // Gestion du champ de saisie de texte
        if (currentQuestion.answer || currentQuestion.acceptedAnswers) {
            const textInput = document.getElementById('text-answer-input');
            const submitBtn = document.getElementById('submit-text-answer');

            if (textInput && submitBtn) {
                // Préparer les réponses acceptées
                const acceptedAnswers = currentQuestion.acceptedAnswers
                    ? currentQuestion.acceptedAnswers.map(a => a.toLowerCase().trim())
                    : [currentQuestion.answer.toLowerCase().trim()];

                // Validation en temps réel pendant la frappe
                let autoSubmitTimeout = null;
                textInput.addEventListener('input', () => {
                    const userAnswer = textInput.value.trim().toLowerCase();

                    if (userAnswer.length === 0) {
                        // Champ vide : bordure grise neutre
                        textInput.classList.remove('border-green-500', 'border-red-500');
                        textInput.classList.add('border-white/40');
                        submitBtn.innerHTML = `
                            <div class="flex items-center justify-center space-x-2">
                                <i class="bi bi-check-circle"></i>
                                <span>Valider ma réponse</span>
                            </div>
                        `;
                        submitBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                        submitBtn.style.background = T.gradientMain;
                        clearTimeout(autoSubmitTimeout);
                    } else if (acceptedAnswers.includes(userAnswer) && !quizState.isAnswered) {
                        // Réponse correcte : bordure verte
                        textInput.classList.remove('border-white/40', 'border-red-500');
                        textInput.classList.add('border-green-500');

                        // Afficher un indicateur visuel
                        submitBtn.innerHTML = `
                            <div class="flex items-center justify-center space-x-2">
                                <i class="bi bi-check-circle-fill text-green-400"></i>
                                <span>Bonne réponse !</span>
                            </div>
                        `;
                        submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                        submitBtn.style.background = '';

                        // Auto-soumettre après 1 seconde
                        clearTimeout(autoSubmitTimeout);
                        autoSubmitTimeout = setTimeout(() => {
                            if (!quizState.isAnswered) {
                                this.selectTextAnswer(textInput.value.trim());
                            }
                        }, 1000);
                    } else {
                        // En cours de frappe, réponse incorrecte : bordure rouge
                        textInput.classList.remove('border-white/40', 'border-green-500');
                        textInput.classList.add('border-red-500');
                        submitBtn.innerHTML = `
                            <div class="flex items-center justify-center space-x-2">
                                <i class="bi bi-x-circle"></i>
                                <span>Continue...</span>
                            </div>
                        `;
                        submitBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                        submitBtn.style.background = T.gradientMain;

                        // Annuler l'auto-soumission
                        clearTimeout(autoSubmitTimeout);
                    }
                });

                // Validation manuelle à la soumission
                const submitTextAnswer = () => {
                    if (!quizState.isAnswered) {
                        clearTimeout(autoSubmitTimeout);
                        const userAnswer = textInput.value.trim();
                        this.selectTextAnswer(userAnswer);
                    }
                };

                submitBtn.addEventListener('click', submitTextAnswer);

                // Validation avec la touche Entrée
                textInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && !quizState.isAnswered) {
                        e.preventDefault();
                        submitTextAnswer();
                    }
                });
            }
        }

        // Pour les questions informatives sans choix ni réponse

        // Retirer le focus de tous les éléments au démarrage de la question
        setTimeout(() => {
            if (document.activeElement) {
                document.activeElement.blur();
            }
            document.querySelectorAll('.answer-btn').forEach(btn => btn.blur());
        }, 0);

        this.startTimer();
    }

    startTimer() {
        quizState.timerInterval = setInterval(() => {
            quizState.timeRemaining--;
            
            const timerDisplay = document.getElementById('timer-display');
            const timerDisplayLarge = document.getElementById('timer-display-large');
            
            if (timerDisplay) {
                timerDisplay.textContent = quizState.timeRemaining;
            }
            
            if (timerDisplayLarge) {
                timerDisplayLarge.textContent = quizState.timeRemaining;

                const timerContainer = document.getElementById('timer-badge');

                if (quizState.timeRemaining <= 5) {
                    // Animation d'urgence
                    if (timerContainer) {
                        timerContainer.style.background = T.gradientTimerUrgent;
                        timerContainer.classList.add('animate-pulse');
                    }
                } else if (quizState.timeRemaining <= 8) {
                    // Avertissement
                    if (timerContainer) {
                        timerContainer.style.background = T.gradientTimerAlert;
                    }
                }
                
                // Vibration sur mobile pour les dernières secondes
                if (quizState.timeRemaining <= 3 && 'vibrate' in navigator) {
                    navigator.vibrate(100);
                }
            }
            
            if (quizState.timeRemaining <= 0) {
                clearInterval(quizState.timerInterval);

                if (!quizState.isAnswered) {
                    const question = quizState.getCurrentQuestion();

                    // L'image sera révélée dans le modal de feedback
                    if (quizState.currentQuiz?.spoilerMode && question?.imageUrl) {
                        // Pas besoin d'action supplémentaire ici
                    }

                    if (question && (question.answer || question.acceptedAnswers)) {
                        // Pour les questions à saisie de texte
                        this.selectTextAnswer('');
                    } else if (question && question.choices && question.choices.length > 0) {
                        // Pour les questions à choix multiples
                        this.selectAnswer(-1);
                    } else {
                        // Pour les questions informatives
                        this.handleFreeResponseMode();
                    }
                }
            }
        }, 1000);
    }

    selectTextAnswer(userAnswer) {
        if (!quizState.isAnswered && quizState.questions && quizState.questions.length > 0) {
            const question = quizState.getCurrentQuestion();

            // Vérification de sécurité - pour les questions à saisie de texte
            if (!question || (!question.answer && !question.acceptedAnswers)) {
                console.error('Question data is invalid for text input:', question);
                return;
            }

            quizState.setAnswered(true);
            quizState.recordAnswer(userAnswer); // Enregistrer la réponse de l'utilisateur
            quizState.endQuestionTimer();

            // Normaliser les réponses pour la comparaison (insensible à la casse et aux espaces)
            const normalizedUserAnswer = userAnswer.toLowerCase().trim();

            // Préparer les réponses acceptées
            const acceptedAnswers = question.acceptedAnswers
                ? question.acceptedAnswers.map(a => a.toLowerCase().trim())
                : [question.answer.toLowerCase().trim()];

            const isCorrect = acceptedAnswers.includes(normalizedUserAnswer);

            // Désactiver le champ et le bouton
            const textInput = document.getElementById('text-answer-input');
            const submitBtn = document.getElementById('submit-text-answer');

            if (textInput) {
                textInput.disabled = true;
                textInput.classList.add('opacity-50');
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add('opacity-50');
            }

            // Gestion du feedback
            if (isCorrect) {
                quizState.addScore();
                quizState.recordAnswerCorrectness(true);
                if (textInput) {
                    textInput.classList.remove('border-white/40');
                    textInput.classList.add('border-green-500', 'bg-green-900/20');
                }
                this.showFeedbackMessage('Bonne réponse !', 'success', question, null, userAnswer);
            } else {
                quizState.recordAnswerCorrectness(false);
                if (textInput) {
                    textInput.classList.remove('border-white/40');
                    textInput.classList.add('border-red-500', 'bg-red-900/20');
                }
                // Utiliser 'timeout' si la réponse est vide (temps écoulé), sinon 'error'
                const feedbackType = (!userAnswer || userAnswer === '') ? 'timeout' : 'error';
                const feedbackMessage = (!userAnswer || userAnswer === '') ? 'Temps écoulé ! ⏰' : 'Mauvaise réponse 😔';
                this.showFeedbackMessage(feedbackMessage, feedbackType, question, null, userAnswer);
            }

            domManager.updateQuizStats(
                quizState.currentQuestionIndex,
                quizState.questions.length,
                quizState.score,
                quizState.timeRemaining
            );

            // Passer à la question suivante après un délai
            setTimeout(() => {
                quizState.nextQuestion();
                this.showQuestion();
            }, 2500);
        }
    }

    selectAnswer(answerIndex) {
        if (!quizState.isAnswered && quizState.questions && quizState.questions.length > 0) {
            const question = quizState.getCurrentQuestion();

            // Vérification de sécurité - pour les questions à choix multiples
            if (!question || !question.choices || question.choices.length === 0 || !question.correctAnswer) {
                console.error('Question data is invalid for multiple choice:', question);
                return;
            }
            
            // Afficher la popup de révélation d'image en mode spoiler
            if (quizState.currentQuiz?.spoilerMode && question.imageUrl) {
                // L'image sera affichée dans le modal de feedback normal
            }
            
            quizState.setAnswered(true);
            quizState.recordAnswer(answerIndex); // Enregistrer la réponse de l'utilisateur
            quizState.endQuestionTimer(); // Enregistrer le temps de cette question

            const answerButtons = document.querySelectorAll('.answer-btn');

            // En mode libre, révéler automatiquement la bonne réponse
            if (CONFIG.freeMode && answerIndex === -1) {
                this.revealCorrectAnswer(question);
                return;
            }

            // Logique normale pour le mode normal
            // Vérifier la réponse
            const correctAnswerIndex = question.choices.indexOf(question.correctAnswer);
            const isCorrect = correctAnswerIndex !== -1 && answerIndex === correctAnswerIndex;
            if (isCorrect) {
                quizState.addScore();
                quizState.recordAnswerCorrectness(true);
                this.showFeedbackMessage('Bonne réponse !', 'success', question, answerIndex);
            } else if (answerIndex === -1) {
                quizState.recordAnswerCorrectness(false);
                this.showFeedbackMessage('Temps écoulé ! ⏰', 'timeout', question, correctAnswerIndex);
            } else {
                quizState.recordAnswerCorrectness(false);
                // Afficher la bonne réponse si showResponse est activé
                this.showFeedbackMessage('Mauvaise réponse 😔', 'error', CONFIG.showResponse ? question : (quizState.currentQuiz?.spoilerMode ? question : null), correctAnswerIndex);
            }
            
            domManager.updateQuizStats(
                quizState.currentQuestionIndex, 
                quizState.questions.length, 
                quizState.score, 
                quizState.timeRemaining
            );
            
            this.handleNormalMode(answerIndex, question, answerButtons);
        }
    }

    revealCorrectAnswer(question) {
        // Afficher le popup avec juste le texte de la bonne réponse
        const correctAnswerText = question.correctAnswer;
        this.showFeedbackMessage(correctAnswerText, 'timeout');

        // Créer l'élément de révélation
        const correctAnswerIndex = question.choices.indexOf(question.correctAnswer);
        const revealHTML = `
            <div class="answer-reveal correct">
                <div class="text-2xl font-bold mb-2">Temps écoulé !</div>
                <div class="text-lg mb-2">La bonne réponse était :</div>
                <div class="text-xl font-semibold bg-green-600 text-white px-4 py-2 rounded-lg inline-block">
                    ${String.fromCharCode(65 + correctAnswerIndex)}) ${question.correctAnswer}
                </div>
            </div>
        `;

        // Ajouter la révélation après les boutons de réponse
        const quizContent = document.getElementById('quizContent');
        if (quizContent) {
            const existingReveal = quizContent.querySelector('.answer-reveal');
            if (existingReveal) {
                existingReveal.remove();
            }
            quizContent.insertAdjacentHTML('beforeend', revealHTML);
        }

        // Délai avant de passer à la question suivante
        setTimeout(() => {
            quizState.nextQuestion();
            this.showQuestion();
        }, 3000);
    }

    handleNormalMode(answerIndex, question, answerButtons) {
        // Retirer immédiatement le focus de tous les boutons
        answerButtons.forEach(btn => {
            btn.blur();
            btn.style.outline = 'none';
        });

        // Forcer la suppression du focus après un micro-délai
        setTimeout(() => {
            answerButtons.forEach(btn => btn.blur());
        }, 0);

        // Animation de sélection
        if (answerIndex >= 0) {
            const selectedButton = answerButtons[answerIndex];
            selectedButton?.classList.add('scale-95');
            if (selectedButton) selectedButton.style.outline = `2px solid ${T.hexPrimary}`;
        }

        // Délai pour l'animation de sélection
        setTimeout(() => {
            // Marquer les réponses avec animations améliorées
            answerButtons.forEach((btn, index) => {
                const isCorrect = question.choices && question.correctAnswer ? question.choices[index] === question.correctAnswer : false;
                const isSelected = index === answerIndex;
                const letterSpan = btn.querySelector('span');

                btn.disabled = true;
                btn.blur(); // Retirer à nouveau le focus après avoir désactivé
                btn.style.outline = 'none';
                btn.classList.remove('hover:bg-primary-600');

                if (isCorrect) {
                    btn.classList.add('bg-green-600', 'border-green-400', 'shadow-lg');
                    letterSpan?.classList.add('bg-green-400');
                    // Animation de succès
                    btn.classList.add('animate-bounce');
                } else if (isSelected) {
                    btn.classList.add('bg-red-600', 'border-red-400');
                    letterSpan?.classList.add('bg-red-400');
                    // Animation d'échec
                    btn.style.animation = 'shake 0.5s ease-in-out';
                } else {
                    btn.classList.add('opacity-40', 'blur-sm');
                }
            });

            // Vérifier la réponse (déjà fait dans selectAnswer)
            // La logique de vérification a été déplacée vers selectAnswer pour éviter les doublons

            // Passer à la question suivante après un délai
            setTimeout(() => {
                quizState.nextQuestion();
                this.showQuestion();
            }, 2500);

        }, 300);
    }

    handleFreeResponseMode() {
        // Pour les questions libres, on ne compte pas de points
        quizState.setAnswered(true);
        quizState.recordAnswerCorrectness(false); // Marquer comme non compté dans le score
        quizState.endQuestionTimer();
        
        // Feedback simple
        this.showFeedbackMessage('Question informative - pas de points', 'neutral');
        
        // Désactiver les éléments si présents (pour compatibilité)
        const freeAnswerInput = document.getElementById('free-answer-input');
        const submitFreeAnswerBtn = document.getElementById('submit-free-answer');
        
        if (freeAnswerInput) {
            freeAnswerInput.disabled = true;
            freeAnswerInput.classList.add('opacity-50');
        }
        
        if (submitFreeAnswerBtn) {
            submitFreeAnswerBtn.disabled = true;
            submitFreeAnswerBtn.classList.add('opacity-50');
        }
        
        // Passer à la question suivante après un délai
        setTimeout(() => {
            quizState.nextQuestion();
            this.showQuestion();
        }, 2000);
    }

    showFeedbackMessage(message, type, question = null, answerIndex = null, userTextAnswer = null) {
        const feedbackColors = {
            success: 'from-green-400 to-emerald-500',
            error: 'from-red-400 to-pink-500',
            neutral: 'from-primary-400 to-primary-500',
            timeout: 'from-yellow-400 to-orange-500'
        };

        // Créer l'overlay modal
        const overlay = document.createElement('div');
        overlay.className = 'feedback-modal-overlay';

        // Créer le contenu modal
        const modalContent = document.createElement('div');
        modalContent.className = 'feedback-modal-content';

        // Contenu du modal selon le type
        let icon = '';
        let title = '';
        let subtitle = '';
        let responseSection = '';
        let imageSection = '';

        // Ajouter l'image révélée en mode spoiler
        if (quizState.currentQuiz?.spoilerMode && question?.imageUrl) {
            imageSection = `
                <div class="mb-4">
                    <img src="${question.imageUrl}"
                         alt="Image révélée"
                         class="w-full max-w-sm aspect-video object-contain rounded-lg mx-auto"
                         loading="lazy">
                </div>
            `;
        }

        switch(type) {
            case 'success':
                icon = '<i class="bi bi-check-circle-fill text-green-400"></i>';
                title = 'Bonne réponse !';
                subtitle = message;
                // Afficher la réponse correcte avec le même style
                if (userTextAnswer !== null) {
                    // Question à saisie de texte
                    responseSection = `
                        <div class="mt-4 p-3 rounded-lg border-2 border-green-500/50" style="background:rgba(72,158,150,0.6)">
                            <p class="text-sm text-white/80 mb-2">Votre réponse:</p>
                            <p class="text-lg font-semibold text-green-400">
                                ${userTextAnswer}
                            </p>
                        </div>
                    `;
                } else if (question && answerIndex !== null) {
                    // Question à choix multiples
                    responseSection = `
                        <div class="mt-4 p-3 rounded-lg border-2 border-green-500/50" style="background:rgba(72,158,150,0.6)">
                            <p class="text-sm text-white/80 mb-2">Votre réponse:</p>
                            <p class="text-lg font-semibold text-green-400">
                                ${String.fromCharCode(65 + answerIndex)} : ${question.choices[answerIndex]}
                            </p>
                        </div>
                    `;
                }
                break;
            case 'error':
                icon = '<i class="bi bi-x-circle-fill text-red-400"></i>';
                title = 'Mauvaise réponse';
                subtitle = message;
                // Afficher la bonne réponse si showResponse est activé et la question est disponible
                if (userTextAnswer !== null && question && (question.answer || question.acceptedAnswers)) {
                    // Question à saisie de texte
                    if (CONFIG.showResponse) {
                        const correctAnswer = question.acceptedAnswers
                            ? question.acceptedAnswers[0]
                            : question.answer;
                        // Gérer userTextAnswer qui peut être null, undefined ou une chaîne vide
                        const displayAnswer = (userTextAnswer && userTextAnswer.trim()) ? userTextAnswer : '(aucune réponse)';
                        responseSection = `
                            <div class="mt-4 p-3 rounded-lg border-2 border-red-500/50 mb-2" style="background:rgba(72,158,150,0.6)">
                                <p class="text-sm text-white/80 mb-2">Votre réponse:</p>
                                <p class="text-lg font-semibold text-red-400">
                                    ${displayAnswer}
                                </p>
                            </div>
                            <div class="mt-2 p-3 rounded-lg border-2 border-green-500/50" style="background:rgba(72,158,150,0.6)">
                                <p class="text-sm text-white/80 mb-2">La bonne réponse était:</p>
                                <p class="text-lg font-semibold text-green-400">
                                    ${correctAnswer}
                                </p>
                            </div>
                        `;
                    }
                } else if (CONFIG.showResponse && question && answerIndex !== null) {
                    // Question à choix multiples
                    responseSection = `
                        <div class="mt-4 p-3 rounded-lg border-2 border-green-500/50" style="background:rgba(72,158,150,0.6)">
                            <p class="text-sm text-white/80 mb-2">La bonne réponse était:</p>
                            <p class="text-lg font-semibold text-green-400">
                                ${String.fromCharCode(65 + answerIndex)} : ${question.choices[answerIndex]}
                            </p>
                        </div>
                    `;
                }
                break;
            case 'neutral':
                icon = `<i class="bi bi-journal-text" style="color:${T.hexPrimaryLight}"></i>`;
                title = 'Réponse enregistrée';
                subtitle = message;
                break;
            case 'timeout':
                icon = '<i class="bi bi-clock-fill text-red-400"></i>';
                title = 'Temps écoulé !';
                if (userTextAnswer !== null && question && (question.answer || question.acceptedAnswers)) {
                    // Question à saisie de texte - timeout
                    subtitle = 'Vous n\'avez pas eu le temps de répondre';
                    if (CONFIG.showResponse) {
                        const correctAnswer = question.acceptedAnswers
                            ? question.acceptedAnswers[0]
                            : question.answer;
                        responseSection = `
                            <div class="mt-4 p-3 rounded-lg border-2 border-green-500/50" style="background:rgba(72,158,150,0.6)">
                                <p class="text-sm text-white/80 mb-2">La bonne réponse était:</p>
                                <p class="text-lg font-semibold text-green-400">
                                    ${correctAnswer}
                                </p>
                            </div>
                        `;
                    }
                } else if (question && answerIndex !== null) {
                    // Question à choix multiples - timeout
                    subtitle = 'Vous n\'avez pas eu le temps de répondre';
                    if (CONFIG.showResponse) {
                        responseSection = `
                            <div class="mt-4 p-3 rounded-lg border-2 border-green-500/50" style="background:rgba(72,158,150,0.6)">
                                <p class="text-sm text-white/80 mb-2">La bonne réponse était:</p>
                                <p class="text-lg font-semibold text-green-400">
                                    ${String.fromCharCode(65 + answerIndex)} : ${question.choices[answerIndex]}
                                </p>
                            </div>
                        `;
                    }
                } else if (question) {
                    // Mode spoiler : afficher sans lettrage
                    subtitle = question.correctAnswer;
                } else {
                    subtitle = message;
                }
                break;
        }

        modalContent.innerHTML = `
            <div class="flex flex-col items-center">
                <div class="text-7xl mb-6">${icon}</div>
                <h3 class="text-3xl font-bold mb-4 bg-gradient-to-r ${feedbackColors[type]} bg-clip-text text-transparent">
                    ${title}
                </h3>
                ${imageSection}
                <p class="text-lg text-white leading-relaxed mb-4">
                    ${subtitle}
                </p>
                ${responseSection}
            </div>
        `;

        overlay.appendChild(modalContent);
        document.body.appendChild(overlay);

        // Supprimer le modal après 3 secondes
        setTimeout(() => {
            overlay.style.animation = 'fadeInModal 0.3s ease-out reverse';
            modalContent.style.animation = 'scaleInModal 0.3s ease-out reverse';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }, 3000);
    }

    showLoadingMessage() {
        const loadingHTML = `
            <div class="text-center py-8">
                <div class="animate-spin rounded-full h-12 w-12 mx-auto mb-4" style="border-bottom:2px solid ${T.hexPrimary}"></div>
                <p class="text-white/80">Chargement des questions...</p>
            </div>
        `;
        domManager.setContent('quizContent', loadingHTML);
    }

    updateProgressBar() {
        const progressElement = document.getElementById('question-progress');
        const progressBarElement = document.getElementById('question-progress-bar');
        
        if (progressElement && progressBarElement) {
            const current = quizState.currentQuestionIndex;
            const total = quizState.questions.length;
            const progressText = `${current + 1}/${total}`;
            const progressPercent = ((current + 1) / total) * 100;
            
            progressElement.textContent = progressText;
            progressBarElement.style.width = `${progressPercent}%`;
        }
    }
}