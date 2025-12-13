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
        
        container.innerHTML = this.trophiesData.trophies.map(trophy => {
            const isUnlocked = unlocked.includes(trophy.id);
            const rarityClass = `rarity-${trophy.rarity}`;
            const badgeClass = `badge-${trophy.rarity}`;
            
            return `
                <div class="trophy-card bg-gray-800 rounded-xl overflow-hidden border-2 ${rarityClass} ${isUnlocked ? 'trophy-unlocked' : ''}">
                    <div class="h-48 bg-gray-700 flex items-center justify-center relative overflow-hidden group">
                        ${isUnlocked ? `
                            <img src="${trophy.image}" alt="${trophy.name}" class="w-full h-full object-cover">
                            <div class="absolute top-2 right-2">
                                <span class="inline-block px-3 py-1 ${badgeClass} rounded-full text-xs font-bold">
                                    <i class="bi bi-check-circle mr-1"></i>${trophy.rarity.toUpperCase()}
                                </span>
                            </div>
                        ` : `
                            <img src="${trophy.image}" alt="${trophy.name}" class="w-full h-full object-cover blur-lg opacity-40">
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="text-center">
                                    <i class="bi bi-lock-fill text-6xl opacity-60"></i>
                                    <p class="text-gray-300 text-sm mt-2">À débloquer</p>
                                </div>
                            </div>
                        `}
                    </div>
                    <div class="p-4">
                        <h3 class="font-bold text-lg mb-1">${trophy.name}</h3>
                        <p class="text-gray-400 text-sm mb-3">${trophy.description}</p>
                        
                        ${isUnlocked ? `
                            <div class="flex flex-col gap-2">
                                <div class="pt-2 border-t border-gray-700">
                                    <a href="${trophy.image}" download class="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 w-full justify-center py-2 rounded bg-blue-900/30 hover:bg-blue-900/50 transition">
                                        <i class="bi bi-download"></i> Télécharger
                                    </a>
                                </div>
                            </div>
                        ` : `
                            <div class="space-y-2">
                                <div class="bg-gray-700/50 rounded p-2">
                                    <p class="text-xs text-gray-400 mb-1">� Code secret :</p>
                                    <p class="font-mono text-sm font-bold text-yellow-400">${trophy.secretCode}</p>
                                </div>
                                ${canUnlock ? `
                                    <p class="text-xs text-gray-300 text-center py-2">👆 Copie ce code et entre-le dans le formulaire ci-dessous (coûte 5 points)</p>
                                ` : `
                                    <p class="text-xs text-gray-400 text-center py-2">Gagnez ${5 - rewards.totalPoints} points pour débloquer</p>
                                `}
                            </div>
                        `}
                    </div>
                </div>
            `;
        }).join('');
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
