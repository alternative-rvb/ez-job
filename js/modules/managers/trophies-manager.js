/**
 * Module de gestion de l'affichage des trophées
 */

import { rewardsManager } from './rewards-manager.js';
import { domManager } from '../ui/dom.js';
import { addCacheBuster } from '../core/version.js';

export class TrophiesManager {
    constructor(onBack) {
        this.onBack = onBack;
        this.trophiesData = [];
    }

    async show() {
        // Charger les données des trophées
        try {
            const response = await fetch(addCacheBuster('./js/data/trophies.json'));
            this.trophiesData = await response.json();
        } catch (error) {
            console.error('Erreur lors du chargement des trophées:', error);
            return;
        }

        // Afficher l'écran des trophées
        domManager.showTrophies();

        // Mettre à jour les statistiques et afficher les trophées
        this.updateStats();
        this.renderTrophies();

        // Ajouter les écouteurs d'événements
        this.setupEventListeners();

        // Ajouter l'écouteur du bouton retour
        const btnBack = document.getElementById('btn-back-from-trophies');
        if (btnBack) {
            btnBack.addEventListener('click', () => {
                if (this.onBack) {
                    this.onBack();
                }
            });
        }
    }

    updateStats() {
        const rewards = rewardsManager.getRewards();
        const totalPoints = rewards.totalPoints || 0;
        const unlockedCount = rewards.unlockedTrophies.length;

        document.getElementById('total-points').textContent = totalPoints;
        document.getElementById('unlocked-count').textContent = unlockedCount;
    }

    renderTrophies() {
        const container = document.getElementById('trophies-container');
        const unlocked = rewardsManager.getUnlockedTrophies();
        const rewards = rewardsManager.getRewards();
        const canUnlock = rewards.totalPoints >= 5;

        // Mapping des rarités pour affichage
        const rarityLabels = {
            'commun': 'Commun',
            'rare': 'Rare',
            'épique': 'Épique',
            'légendaire': 'Légendaire'
        };

        container.innerHTML = this.trophiesData.trophies.map(trophy => {
            const isUnlocked = unlocked.includes(trophy.id);
            const rarityClass = `rarity-${trophy.rarity}`;
            const badgeClass = `badge-${trophy.rarity}`;
            const rarityLabel = rarityLabels[trophy.rarity] || trophy.rarity.toUpperCase();
            
            return `
                <div class="trophy-card-pokemon rounded-xl overflow-hidden border-2 ${rarityClass} ${isUnlocked ? 'trophy-unlocked' : ''} relative" style="aspect-ratio: 9/16; background-image: url('${trophy.image}'); background-size: cover; background-position: center;">
                    ${isUnlocked ? '' : `
                        <!-- Overlay de verrouillage -->
                        <div class="absolute inset-0 backdrop-blur-xl bg-black/60">
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="text-center">
                                    <i class="bi bi-lock-fill text-5xl opacity-60 mb-2"></i>
                                    <p class="text-gray-300 text-sm font-semibold">À débloquer</p>
                                </div>
                            </div>
                        </div>
                    `}

                    <!-- Dégradé transparent vers noir en bas -->
                    <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-16 pb-3 px-3 space-y-2">
                        ${isUnlocked ? `
                            <div class="space-y-1">
                                ${trophy.series ? `<p class="text-xs text-gray-400 font-semibold uppercase tracking-wide">${trophy.series}</p>` : ''}
                                <h3 class="font-bold text-base leading-tight">${trophy.name}</h3>
                                <p class="text-gray-300 text-xs line-clamp-2">${trophy.description}</p>
                            </div>
                            <div class="flex items-center justify-between pt-2 border-t border-gray-700/50">
                                <span class="inline-block px-2 py-1 ${badgeClass} rounded-full text-xs font-bold">
                                    <i class="bi bi-star-fill mr-1"></i>${rarityLabel}
                                </span>
                                <a href="${trophy.image}" download class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500/30 hover:bg-blue-500/50 text-blue-400 hover:text-blue-300 transition transform hover:scale-110" title="Télécharger">
                                    <i class="bi bi-download text-sm"></i>
                                </a>
                            </div>
                        ` : `
                            <div class="space-y-2">
                                <div class="text-center">
                                    <h3 class="font-bold text-base leading-tight text-gray-500">Trophée Mystère</h3>
                                    <p class="text-gray-500 text-xs mt-1">Débloquez pour découvrir</p>
                                </div>
                                <div class="bg-gray-700/70 backdrop-blur-sm rounded p-2 border border-yellow-500/40">
                                    <p class="text-xs text-yellow-300 font-mono font-bold text-center tracking-wider">${trophy.secretCode}</p>
                                </div>
                            </div>
                        `}
                    </div>
                </div>
            `;
        }).join('');

        // Ajouter l'effet 3D sur les cartes débloquées
        this.add3DEffect();
    }

    add3DEffect() {
        const cards = document.querySelectorAll('.trophy-card-pokemon.trophy-unlocked');

        cards.forEach(card => {
            // Initialiser les variables CSS par défaut
            card.style.setProperty('--shine-x', '50%');
            card.style.setProperty('--shine-y', '50%');
            card.style.setProperty('--shine-angle', '115deg');

            // Gestion souris
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover-active');
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                // Position du reflet (en pourcentage)
                const percentX = (x / rect.width) * 100;
                const percentY = (y / rect.height) * 100;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

                // Mettre à jour la position du reflet - décalé par rapport au pointeur
                card.style.setProperty('--shine-x', `${percentX}%`);
                card.style.setProperty('--shine-y', `${percentY}%`);

                // Calculer l'angle pour le gradient arc-en-ciel
                const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
                card.style.setProperty('--shine-angle', `${angle}deg`);
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover-active');
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                card.style.setProperty('--shine-x', '50%');
                card.style.setProperty('--shine-y', '50%');
                card.style.setProperty('--shine-angle', '115deg');
            });

            // Gestion tactile (mobile) - Phase progressive
            card.addEventListener('touchstart', (e) => {
                // Phase 1 : Affichage estompé de l'effet dès le toucher
                card.classList.add('touch-start');

                // Obtenir la position initiale du toucher
                if (e.touches[0]) {
                    const touch = e.touches[0];
                    const rect = card.getBoundingClientRect();
                    const x = touch.clientX - rect.left;
                    const y = touch.clientY - rect.top;

                    const percentX = (x / rect.width) * 100;
                    const percentY = (y / rect.height) * 100;

                    // Positionner le reflet à l'endroit du toucher initial
                    card.style.setProperty('--shine-x', `${percentX}%`);
                    card.style.setProperty('--shine-y', `${percentY}%`);
                }
            });

            card.addEventListener('touchmove', (e) => {
                if (!e.touches[0]) return;

                // Phase 2 : Activation complète de l'effet lors du mouvement
                if (card.classList.contains('touch-start')) {
                    card.classList.remove('touch-start');
                    card.classList.add('touch-active');
                }

                const touch = e.touches[0];
                const rect = card.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                // Position du reflet (en pourcentage)
                const percentX = (x / rect.width) * 100;
                const percentY = (y / rect.height) * 100;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

                // Mettre à jour la position du reflet
                card.style.setProperty('--shine-x', `${percentX}%`);
                card.style.setProperty('--shine-y', `${percentY}%`);

                // Calculer l'angle pour le gradient arc-en-ciel
                const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
                card.style.setProperty('--shine-angle', `${angle}deg`);
            });

            card.addEventListener('touchend', () => {
                // Phase 3 : Reset complet
                card.classList.remove('touch-start', 'touch-active');
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                card.style.setProperty('--shine-x', '50%');
                card.style.setProperty('--shine-y', '50%');
                card.style.setProperty('--shine-angle', '115deg');
            });

            card.addEventListener('touchcancel', () => {
                card.classList.remove('touch-start', 'touch-active');
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                card.style.setProperty('--shine-x', '50%');
                card.style.setProperty('--shine-y', '50%');
                card.style.setProperty('--shine-angle', '115deg');
            });
        });
    }

    setupEventListeners() {
        // Utiliser un code secret
        document.getElementById('use-code-btn').addEventListener('click', () => this.handleUseCode());

        // Touche Entrée pour valider le code
        document.getElementById('secret-code-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleUseCode();
            }
        });
    }

    handleUseCode() {
        const input = document.getElementById('secret-code-input');
        const code = input.value.toUpperCase().trim();

        if (!code) {
            this.showMessage('Veuillez entrer un code', 'error');
            return;
        }

        // Vérifier si c'est un code secret de trophée visible
        let trophyMatch = null;
        
        if (this.trophiesData && this.trophiesData.trophies) {
            for (const trophy of this.trophiesData.trophies) {
                if (trophy.secretCode && trophy.secretCode.toUpperCase() === code) {
                    trophyMatch = trophy;
                    break;
                }
            }
        }

        if (trophyMatch) {
            // C'est un code de trophée visible
            const rewards = rewardsManager.getRewards();
            
            // Vérifier si le trophée est déjà débloqué
            if (rewards.unlockedTrophies.includes(trophyMatch.id)) {
                this.showMessage('❌ Ce trophée est déjà débloqué!', 'error');
                return;
            }

            // Vérifier si l'utilisateur a assez de points
            if (rewards.totalPoints < 5) {
                this.showMessage(`❌ Vous n'avez pas assez de points! (Il vous en faut 5, vous en avez ${rewards.totalPoints})`, 'error');
                return;
            }

            // Déduire 5 points et débloquer le trophée
            rewards.totalPoints -= 5;
            rewards.unlockedTrophies.push(trophyMatch.id);
            rewardsManager.saveRewards(rewards);

            this.showMessage(`✅ Trophée "${trophyMatch.name}" débloqué! (-5 points)`, 'success');
            input.value = '';
            setTimeout(() => {
                this.renderTrophies();
                this.updateStats();
            }, 500);
        } else {
            // Sinon, vérifier les codes générés (système existant)
            const result = rewardsManager.useSecretCode(code);

            if (result) {
                this.showMessage('✅ Trophée débloqué avec succès!', 'success');
                input.value = '';
                setTimeout(() => {
                    this.renderTrophies();
                    this.updateStats();
                }, 500);
            } else if (rewardsManager.getRewards().secretCodes[code]?.used) {
                this.showMessage('❌ Ce code a déjà été utilisé', 'error');
            } else {
                this.showMessage('❌ Code invalide ou inexistant', 'error');
            }
        }
    }

    showMessage(text, type) {
        const messageDiv = document.getElementById('code-message');
        messageDiv.textContent = text;
        messageDiv.className = type === 'success' ? 
            'hidden mt-3 p-3 rounded-lg text-sm bg-green-900/50 text-green-300 border border-green-600' :
            'hidden mt-3 p-3 rounded-lg text-sm bg-red-900/50 text-red-300 border border-red-600';
        messageDiv.classList.remove('hidden');

        setTimeout(() => {
            messageDiv.classList.add('hidden');
        }, 5000);
    }
}
