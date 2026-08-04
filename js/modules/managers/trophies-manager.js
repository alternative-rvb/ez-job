/**
 * Module de gestion de l'affichage des trophées
 */

import { domManager } from '../ui/dom.js';
import { addCacheBuster } from '../core/version.js';
import { T } from '../core/theme.js';
import { playerManager } from '../core/player.js';
import { getUnlockedTrophies, getNextTrophy } from './trophy-progress.js';

const THEME_LABELS = {
    'debut': 'Début',
    'progression': 'Progression',
    'resilience': 'Résilience',
    'excellence': 'Excellence'
};

const THEME_ORDER = ['debut', 'progression', 'resilience', 'excellence'];

export class TrophiesManager {
    constructor(onBack) {
        this.onBack = onBack;
        this.trophiesData = [];
        this.successCount = 0;
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

        this.successCount = playerManager.getSuccessfulQuizCount();

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
        const trophies = this.trophiesData.trophies;
        const unlockedCount = getUnlockedTrophies(trophies, this.successCount).length;
        const nextTrophy = getNextTrophy(trophies, this.successCount);

        document.getElementById('unlocked-trophies-count').textContent = `${unlockedCount} / ${trophies.length}`;
        document.getElementById('successful-quiz-count').textContent = this.successCount;

        const nextTrophyEl = document.getElementById('next-trophy-progress');
        if (nextTrophyEl) {
            nextTrophyEl.textContent = nextTrophy
                ? `${nextTrophy.unlockThreshold - this.successCount}`
                : '🏆';
        }
    }

    renderTrophies() {
        const container = document.getElementById('trophies-container');
        const unlockedIds = new Set(getUnlockedTrophies(this.trophiesData.trophies, this.successCount).map(t => t.id));

        // Mapping des rarités pour affichage
        const rarityLabels = {
            'commun': 'Commun',
            'rare': 'Rare',
            'épique': 'Épique',
            'légendaire': 'Légendaire'
        };

        container.innerHTML = THEME_ORDER.map(theme => {
            const themeTrophies = this.trophiesData.trophies
                .filter(t => t.theme === theme)
                .sort((a, b) => a.order - b.order);

            if (themeTrophies.length === 0) return '';

            const cardsHTML = themeTrophies.map(trophy => {
                const isUnlocked = unlockedIds.has(trophy.id);
                const rarityClass = `rarity-${trophy.rarity}`;
                const badgeClass = `badge-${trophy.rarity}`;
                const rarityLabel = rarityLabels[trophy.rarity] || trophy.rarity.toUpperCase();
                const remaining = trophy.unlockThreshold - this.successCount;

                return `
                    <div class="trophy-card-pokemon rounded-xl overflow-hidden border-2 ${rarityClass} ${isUnlocked ? 'trophy-unlocked' : ''} relative bg-gray-900 flex flex-col" style="aspect-ratio: 9/16;">
                        <div class="absolute inset-0 flex items-center justify-center px-5 text-center">
                            <p class="font-semibold leading-snug ${isUnlocked ? 'text-sm' : 'text-xs text-gray-500'}">${isUnlocked ? trophy.motivationUnlocked : trophy.motivationLocked}</p>
                        </div>
                        ${isUnlocked ? '' : `
                            <!-- Overlay de verrouillage -->
                            <div class="absolute inset-0 backdrop-blur-md bg-black/50">
                                <div class="absolute top-4 inset-x-0 flex items-center justify-center">
                                    <i class="bi bi-lock-fill text-3xl opacity-60"></i>
                                </div>
                            </div>
                        `}

                        <!-- Dégradé transparent vers noir en bas -->
                        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-10 pb-3 px-3 space-y-2">
                            <p class="text-xs text-gray-400 font-semibold uppercase tracking-wide">${THEME_LABELS[trophy.theme] || trophy.theme}</p>
                            <div class="flex items-center justify-between pt-2 border-t border-gray-700/50">
                                <span class="inline-block px-2 py-1 ${badgeClass} rounded-md text-xs font-bold">
                                    <i class="bi bi-star-fill"></i>
                                    <span class="hidden sm:inline ml-1">${rarityLabel}</span>
                                </span>
                                ${isUnlocked ? `
                                    <button class="trophy-zoom-btn inline-flex items-center justify-center w-7 h-7 rounded-md bg-gray-600/30 hover:bg-gray-600/50 text-gray-300 hover:text-white transition transform hover:scale-110" title="Agrandir" data-trophy-id="${trophy.id}">
                                        <i class="bi bi-zoom-in text-sm"></i>
                                    </button>
                                ` : `
                                    <span class="text-xs text-gray-400 font-semibold">${remaining > 0 ? `Encore ${remaining}` : 'Bientôt'}</span>
                                `}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            return `
                <div class="col-span-full mb-2 mt-6 first:mt-0">
                    <h3 class="text-lg font-bold text-white flex items-center gap-2">
                        <i class="bi bi-signpost-2-fill" style="color:${T.hexPrimaryLight}"></i>
                        ${THEME_LABELS[theme]}
                    </h3>
                </div>
                ${cardsHTML}
            `;
        }).join('');

        // Ajouter l'effet 3D sur les cartes débloquées
        this.add3DEffect();

        // Empêcher le clic long sur les cartes verrouillées
        this.preventLongPress();
    }

    add3DEffect() {
        const cards = document.querySelectorAll('.trophy-card-pokemon.trophy-unlocked');

        cards.forEach(card => {
            // Initialiser les variables CSS par défaut
            card.style.setProperty('--shine-x', '50%');
            card.style.setProperty('--shine-y', '50%');
            card.style.setProperty('--shine-angle', '115deg');

            // Variable pour tracker le mouvement du doigt
            let touchStartX = 0;
            let touchStartY = 0;
            let hasMoved = false;

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

            // Gestion tactile (mobile)
            card.addEventListener('touchstart', (e) => {
                hasMoved = false;
                card.classList.add('touch-start');

                if (e.touches[0]) {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;

                    const touch = e.touches[0];
                    const rect = card.getBoundingClientRect();
                    const x = touch.clientX - rect.left;
                    const y = touch.clientY - rect.top;

                    const percentX = (x / rect.width) * 100;
                    const percentY = (y / rect.height) * 100;

                    card.style.setProperty('--shine-x', `${percentX}%`);
                    card.style.setProperty('--shine-y', `${percentY}%`);
                }
            });

            card.addEventListener('touchmove', (e) => {
                if (!e.touches[0]) return;

                // Vérifier que le mouvement dépasse un certain seuil (5px)
                const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
                const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
                const movementThreshold = 5;

                if (deltaX > movementThreshold || deltaY > movementThreshold) {
                    hasMoved = true;
                }

                // Seulement appliquer l'effet si c'est vraiment un mouvement
                if (!hasMoved) {
                    return;
                }

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

                const percentX = (x / rect.width) * 100;
                const percentY = (y / rect.height) * 100;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

                card.style.setProperty('--shine-x', `${percentX}%`);
                card.style.setProperty('--shine-y', `${percentY}%`);

                const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
                card.style.setProperty('--shine-angle', `${angle}deg`);
            });

            card.addEventListener('touchend', () => {
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
        // Gestion des boutons de zoom (délégation d'événement)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.trophy-zoom-btn')) {
                const btn = e.target.closest('.trophy-zoom-btn');
                const trophyId = btn.dataset.trophyId;
                this.showTrophyModal(trophyId);
            }
        });
    }

    showTrophyModal(trophyId) {
        const trophy = this.trophiesData.trophies.find(t => t.id === trophyId);
        if (!trophy) return;

        const rarityLabels = {
            'commun': 'Commun',
            'rare': 'Rare',
            'épique': 'Épique',
            'légendaire': 'Légendaire'
        };
        const rarityLabel = rarityLabels[trophy.rarity] || trophy.rarity.toUpperCase();
        const badgeClass = `badge-${trophy.rarity}`;
        const rarityClass = `rarity-${trophy.rarity}`;

        // Créer la modale
        const modal = document.createElement('div');
        modal.id = 'trophy-modal';
        modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="trophy-card-pokemon-modal trophy-card-pokemon trophy-unlocked rounded-xl overflow-hidden border-2 ${rarityClass} relative bg-gray-900 shadow-2xl" style="aspect-ratio: 9/16; height: 80vh; max-width: 90vw;">
                <!-- Bouton fermer -->
                <button class="absolute top-4 right-4 z-[200] w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition" id="close-trophy-modal">
                    <i class="bi bi-x-lg text-xl"></i>
                </button>

                <div class="absolute inset-0 flex items-center justify-center px-8 text-center">
                    <p class="font-semibold text-xl leading-snug">${trophy.motivationUnlocked}</p>
                </div>

                <!-- Dégradé transparent vers noir en bas -->
                <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-16 pb-3 px-3 space-y-2">
                    <p class="text-xs text-gray-400 font-semibold uppercase tracking-wide">${THEME_LABELS[trophy.theme] || trophy.theme}</p>
                    <div class="flex items-center justify-between pt-2 border-t border-gray-700/50">
                        <span class="inline-block px-2 py-1 ${badgeClass} rounded-full text-xs font-bold">
                            <i class="bi bi-star-fill"></i>
                            <span class="hidden sm:inline ml-1">${rarityLabel}</span>
                        </span>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Ajouter les effets 3D sur la carte modale
        const modalCard = modal.querySelector('.trophy-card-pokemon-modal');
        this.add3DEffectToModal(modalCard);

        // Fermer la modale au clic sur le fond ou le bouton
        const closeModal = () => {
            modal.classList.add('opacity-0');
            setTimeout(() => modal.remove(), 200);
        };

        document.getElementById('close-trophy-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Fermer avec Échap
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        // Animation d'entrée
        requestAnimationFrame(() => {
            modal.style.opacity = '0';
            modal.style.transition = 'opacity 0.2s';
            requestAnimationFrame(() => {
                modal.style.opacity = '1';
            });
        });
    }

    add3DEffectToModal(card) {
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

            // Mettre à jour la position du reflet
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

        // Gestion tactile (mobile)
        card.addEventListener('touchstart', (e) => {
            card.classList.add('touch-start');

            if (e.touches[0]) {
                const touch = e.touches[0];
                const rect = card.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;

                const percentX = (x / rect.width) * 100;
                const percentY = (y / rect.height) * 100;

                card.style.setProperty('--shine-x', `${percentX}%`);
                card.style.setProperty('--shine-y', `${percentY}%`);
            }
        });

        card.addEventListener('touchmove', (e) => {
            if (!e.touches[0]) return;

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

            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

            card.style.setProperty('--shine-x', `${percentX}%`);
            card.style.setProperty('--shine-y', `${percentY}%`);

            const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
            card.style.setProperty('--shine-angle', `${angle}deg`);
        });

        card.addEventListener('touchend', () => {
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
    }

    preventLongPress() {
        // Empêcher le menu contextuel / clic long sur toutes les cartes de trophées
        const allCards = document.querySelectorAll('.trophy-card-pokemon');

        allCards.forEach(card => {
            card.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                return false;
            });

            card.style.userSelect = 'none';
            card.style.webkitUserSelect = 'none';
            card.style.webkitTouchCallout = 'none';
        });
    }
}