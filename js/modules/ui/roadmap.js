/**
 * Module de gestion de la Roadmap Fantasy ("La Quête du Château")
 * Affiche la progression du joueur sur une carte médiévale / féerique
 */

import { rewardsManager } from '../managers/rewards-manager.js';
import { playerManager } from '../core/player.js';
import { AVATARS, renderAvatarSvg } from './avatars.js';

export class RoadmapManager {
    constructor() {
        this.containerId = 'hero-roadmap-container';
        this.milestones = [
            {
                id: 'village',
                title: 'Le Hameau de Départ',
                points: 0,
                desc: 'Là où tout commence. Équipe ton sac et lance-toi !',
                icon: 'bi-house-heart-fill',
                reward: 'Boussole de l\'apprenti',
                pathPercent: 0.03
            },
            {
                id: 'forest',
                title: 'La Forêt Enchantée',
                points: 10,
                desc: 'Un sous-bois magique aux mille énigmes.',
                icon: 'bi-tree-fill',
                reward: 'Coffre Mystère en bois',
                pathPercent: 0.26
            },
            {
                id: 'bridge',
                title: 'Le Pont des Murmures',
                points: 25,
                desc: 'Un pont suspendu qui teste ta rapidité d\'esprit.',
                icon: 'bi-water',
                reward: 'Coffre d\'Argent Scintillant',
                pathPercent: 0.50
            },
            {
                id: 'gate',
                title: 'La Porte des Géants',
                points: 45,
                desc: 'Une arche de pierre gardée par d\'anciennes légendes.',
                icon: 'bi-shield-shaded',
                reward: 'Coffre d\'Or & Joyaux',
                pathPercent: 0.74
            },
            {
                id: 'castle',
                title: 'La Citadelle Céleste',
                points: 70,
                desc: 'Le sanctuaire des Grands Maîtres du Savoir !',
                icon: 'bi-trophy-fill',
                reward: 'Couronne Royale du Savoir',
                pathPercent: 0.98
            }
        ];
    }

    /**
     * Calcule le titre / rang selon le score total
     */
    getPlayerRank(totalPoints) {
        if (totalPoints >= 70) return { title: 'Grand Maître du Savoir', rank: 5, color: '#ff9d00', badgeClass: 'bg-amber-500/20 text-amber-700' };
        if (totalPoints >= 45) return { title: 'Conquérant des Cimes', rank: 4, color: '#9333ea', badgeClass: 'bg-purple-500/20 text-purple-700' };
        if (totalPoints >= 25) return { title: 'Explorateur Agile', rank: 3, color: '#2563eb', badgeClass: 'bg-blue-500/20 text-blue-700' };
        if (totalPoints >= 10) return { title: 'Aventurier des Bois', rank: 2, color: '#16a34a', badgeClass: 'bg-emerald-500/20 text-emerald-700' };
        return { title: 'Apprenti Voyageur', rank: 1, color: '#489e96', badgeClass: 'bg-teal-500/20 text-teal-700' };
    }

    /**
     * Initialise et rend la Roadmap dans le conteneur du Hero
     */
    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const totalPoints = rewardsManager.getTotalPoints() || 0;
        const rankInfo = this.getPlayerRank(totalPoints);
        const currentAvatarId = playerManager.playerAvatar || 'boy';
        const avatarData = AVATARS[currentAvatarId] || AVATARS.boy;

        // Calcul du prochain palier
        const nextMilestone = this.milestones.find(m => m.points > totalPoints) || this.milestones[this.milestones.length - 1];
        const prevMilestone = [...this.milestones].reverse().find(m => m.points <= totalPoints) || this.milestones[0];
        
        // Progression globale (0 à 1) plafonnée à 70 pts (avec bonus visuel au-delà)
        const maxPoints = 70;
        const globalProgress = Math.min(Math.max(totalPoints / maxPoints, 0), 1);
        
        // Calcul des points manquants
        const pointsToNext = Math.max(0, nextMilestone.points - totalPoints);

        container.innerHTML = `
            <div class="fantasy-roadmap-card rounded-2xl overflow-hidden shadow-lg border border-amber-900/10 flex flex-col justify-between" style="background: linear-gradient(180deg, #fdf8f2 0%, #f4eadd 100%);">
                <!-- Header Profil & Rang -->
                <div class="p-4 md:p-5 border-b border-amber-900/10 flex items-center justify-between gap-3 bg-white/40 backdrop-blur-sm">
                    <div class="flex items-center gap-3">
                        <!-- Avatar interactif -->
                        <div class="relative group cursor-pointer" id="roadmap-avatar-toggle" title="Cliquer pour changer d'avatar">
                            <div class="w-12 h-14 rounded-xl ring-2 ring-primary-500 shadow-md bg-amber-100/90 overflow-hidden flex items-center justify-center transition-transform transform group-hover:scale-105 p-1">
                                ${avatarData.svg}
                            </div>
                            <span class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent-500 text-white flex items-center justify-center text-[10px] shadow" title="Changer de personnage">
                                <i class="bi bi-arrow-repeat"></i>
                            </span>
                        </div>

                        <div>
                            <div class="flex items-center gap-2">
                                <h3 class="font-bold text-base leading-tight text-amber-950">${playerManager.playerName || 'Joueur'}</h3>
                                <span class="text-xs font-semibold px-2 py-0.5 rounded-full ${rankInfo.badgeClass}">
                                    Niv. ${rankInfo.rank}
                                </span>
                            </div>
                            <p class="text-xs font-medium text-amber-800/80">${rankInfo.title}</p>
                        </div>
                    </div>

                    <!-- Badge Score & Switch Avatar -->
                    <div class="flex flex-col items-end gap-1">
                        <div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-500/15 border border-accent-500/30 text-amber-900 font-bold text-xs">
                            <i class="bi bi-star-fill text-accent-500"></i>
                            <span class="text-sm font-extrabold">${totalPoints}</span>
                            <span class="text-[11px] font-semibold text-amber-800">pts</span>
                        </div>
                        <button id="quick-avatar-switch-btn" class="text-[11px] font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition">
                            <i class="bi bi-arrow-repeat"></i>
                            <span>Changer de personnage</span>
                        </button>
                    </div>
                </div>

                <!-- Carte Fantasy Interactive (SVG Path) -->
                <div class="relative p-2 md:p-3 flex-1 flex flex-col justify-center">
                    <div class="relative w-full aspect-[16/9] max-h-[260px] rounded-xl overflow-hidden shadow-inner border border-amber-800/15" style="background: linear-gradient(180deg, #dcf0f9 0%, #b8e2f2 35%, #9dd5aa 65%, #76be88 100%);">
                        
                        <!-- SVG Carte Fantasy -->
                        <svg id="fantasy-map-svg" viewBox="0 0 520 280" class="w-full h-full" preserveAspectRatio="none">
                            <defs>
                                <!-- Filtre ombre portée -->
                                <filter id="pin-shadow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="0" dy="3" stdDeviation="2" flood-color="#000" flood-opacity="0.35"/>
                                </filter>
                                <!-- Dégradé du sentier -->
                                <linearGradient id="trail-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#dfbe99"/>
                                    <stop offset="50%" stop-color="#cfab83"/>
                                    <stop offset="100%" stop-color="#eed8b8"/>
                                </linearGradient>
                                <linearGradient id="trail-active-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#ff9d00"/>
                                    <stop offset="100%" stop-color="#ffd000"/>
                                </linearGradient>
                            </defs>

                            <!-- Montagnes en arrière-plan -->
                            <polygon points="260,140 340,50 420,140" fill="#a4bed6" opacity="0.65"/>
                            <polygon points="340,140 430,30 520,140" fill="#8caec9" opacity="0.8"/>
                            <polygon points="410,50 430,30 450,50" fill="#ffffff" opacity="0.9"/> <!-- Neige sommet -->

                            <!-- Collines verdoyantes -->
                            <path d="M0 200 Q 140 130 300 210 T 520 180 L 520 280 L 0 280 Z" fill="#88c593"/>
                            <path d="M0 240 Q 200 170 380 250 T 520 230 L 520 280 L 0 280 Z" fill="#6dae7a"/>

                            <!-- Éléments de décor Fantasy -->
                            <!-- Petit Hameau (Départ) -->
                            <g transform="translate(25, 205)">
                                <rect x="0" y="8" width="16" height="12" fill="#d49464" rx="1"/>
                                <polygon points="-2,8 8,0 18,8" fill="#a8432a"/>
                                <rect x="5" y="13" width="5" height="7" fill="#7c4004"/>
                                <circle cx="22" cy="12" r="5" fill="#589e62"/>
                            </g>

                            <!-- Forêt Magique (Étape 2) -->
                            <g transform="translate(130, 155)">
                                <circle cx="0" cy="0" r="10" fill="#3f8854"/>
                                <circle cx="12" cy="-4" r="13" fill="#2d6e40"/>
                                <circle cx="22" cy="2" r="9" fill="#4d9b64"/>
                                <polygon points="12,-20 6,-8 18,-8" fill="#1b522c"/>
                            </g>

                            <!-- Pont / Ruisseau (Étape 3) -->
                            <path d="M230 180 C245 190, 275 185, 290 200" stroke="#7ac9e8" stroke-width="8" fill="none" stroke-linecap="round"/>
                            <rect x="245" y="180" width="28" height="8" rx="2" fill="#9b7348" stroke="#684624" stroke-width="1.5" transform="rotate(-10, 250, 180)"/>

                            <!-- Porte de Pierre (Étape 4) -->
                            <g transform="translate(365, 85)">
                                <rect x="0" y="0" width="6" height="24" fill="#7d8a97" rx="1"/>
                                <rect x="18" y="0" width="6" height="24" fill="#7d8a97" rx="1"/>
                                <rect x="-2" y="-5" width="28" height="7" fill="#95a5b5" rx="2"/>
                                <polygon points="12,-12 4,-5 20,-5" fill="#ff9d00"/>
                            </g>

                            <!-- Citadelle Céleste / Château (Arrivée) -->
                            <g transform="translate(440, 25)">
                                <!-- Donjon central et tours -->
                                <rect x="12" y="18" width="26" height="30" fill="#ffffff" stroke="#c4d5e5" stroke-width="1.5"/>
                                <polygon points="12,18 25,2 38,18" fill="#e07e00"/>
                                <rect x="0" y="26" width="14" height="22" fill="#f0f5fa"/>
                                <polygon points="0,26 7,14 14,26" fill="#489e96"/>
                                <rect x="36" y="26" width="14" height="22" fill="#f0f5fa"/>
                                <polygon points="36,26 43,14 50,26" fill="#489e96"/>
                                <!-- Drapeaux flottants -->
                                <line x1="25" y1="2" x2="25" y2="-6" stroke="#7c4004" stroke-width="1.5"/>
                                <polygon points="25,-6 35,-2 25,2" fill="#ff9d00"/>
                                <!-- Halo magique autour du château -->
                                <circle cx="25" cy="20" r="30" fill="#ffdd55" opacity="0.25" class="animate-pulse"/>
                            </g>

                            <!-- Sentier Sinueux Principal (Tracé SVG) -->
                            <path id="roadmap-trail" 
                                  d="M 45 225 C 100 225, 120 185, 155 180 C 200 175, 230 190, 275 175 C 320 160, 340 120, 390 105 C 430 90, 445 75, 465 58" 
                                  fill="none" 
                                  stroke="url(#trail-gradient)" 
                                  stroke-width="12" 
                                  stroke-linecap="round" 
                                  stroke-linejoin="round"
                                  stroke-dasharray="2 0" />
                            
                            <!-- Bordures pointillées du sentier -->
                            <path d="M 45 225 C 100 225, 120 185, 155 180 C 200 175, 230 190, 275 175 C 320 160, 340 120, 390 105 C 430 90, 445 75, 465 58" 
                                  fill="none" 
                                  stroke="#a87f55" 
                                  stroke-width="1" 
                                  stroke-dasharray="4 4" />

                            <!-- Tracé actif complété (en doré) -->
                            <path id="roadmap-trail-active" 
                                  d="M 45 225 C 100 225, 120 185, 155 180 C 200 175, 230 190, 275 175 C 320 160, 340 120, 390 105 C 430 90, 445 75, 465 58" 
                                  fill="none" 
                                  stroke="url(#trail-active-gradient)" 
                                  stroke-width="6" 
                                  stroke-linecap="round"
                                  style="opacity: 0.9;" />

                            <!-- Checkpoints / Jalons (Milestones) -->
                            <g id="milestones-group"></g>

                            <!-- Pion / Avatar du joueur -->
                            <g id="player-avatar-marker" style="transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);">
                                <!-- Bulle "Tu es ici" -->
                                <g transform="translate(0, -44)">
                                    <rect x="-18" y="0" width="36" height="15" rx="7.5" fill="#7c4004" filter="url(#pin-shadow)"/>
                                    <polygon points="-3,15 3,15 0,19" fill="#7c4004"/>
                                    <text x="0" y="10.5" fill="#ffffff" font-size="7.5" font-weight="bold" text-anchor="middle" font-family="'Nunito', sans-serif">ICI</text>
                                </g>
                                
                                <!-- Conteneur de l'avatar Chibi debout -->
                                <foreignObject x="-17" y="-40" width="34" height="42">
                                    <div class="w-full h-full flex items-center justify-center">
                                        ${avatarData.svg}
                                    </div>
                                </foreignObject>
                            </g>
                        </svg>

                        <!-- Info-bulle / Modal Checkpoint Flottant (Caché par défaut) -->
                        <div id="roadmap-milestone-popover" class="hidden absolute inset-x-3 bottom-3 p-3 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-amber-900/20 text-xs z-20 flex items-center justify-between gap-3 animate-fade-in">
                            <div class="flex items-center gap-2.5">
                                <div id="popover-icon" class="w-8 h-8 rounded-lg bg-accent-500/20 text-accent-600 flex items-center justify-center text-base">
                                    <i class="bi bi-gift-fill"></i>
                                </div>
                                <div>
                                    <h4 id="popover-title" class="font-bold text-amber-950 text-xs leading-tight">Forêt Enchantée</h4>
                                    <p id="popover-desc" class="text-amber-800 text-[11px]">Débloqué avec 10 points !</p>
                                </div>
                            </div>
                            <button id="close-popover-btn" class="p-1 rounded-md text-amber-800/60 hover:text-amber-950">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Footer : Progression vers le prochain objectif -->
                <div class="p-3 md:p-4 bg-amber-900/5 border-t border-amber-900/10 flex items-center justify-between gap-3 text-xs">
                    <div class="flex-1">
                        <div class="flex items-center justify-between font-semibold text-amber-900 mb-1">
                            <span class="flex items-center gap-1">
                                <i class="bi bi-flag-fill text-primary-600"></i>
                                <span>Objectif : <strong>${nextMilestone.title}</strong></span>
                            </span>
                            <span class="text-[11px] font-bold text-amber-800">${pointsToNext === 0 ? 'Sommet atteint !' : `Encore ${pointsToNext} pt${pointsToNext > 1 ? 's' : ''}`}</span>
                        </div>
                        <div class="w-full bg-amber-900/10 h-2 rounded-full overflow-hidden">
                            <div class="h-full rounded-full transition-all duration-700" 
                                 style="width: ${Math.round(globalProgress * 100)}%; background: linear-gradient(90deg, #66bcb4, #ff9d00);"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Positionner l'avatar et les checkpoints sur le tracé SVG
        this.positionElementsOnTrail(totalPoints, globalProgress);
        
        // Attacher les interactions
        this.setupEventListeners();
    }

    /**
     * Calcule et positionne précisément les jalons et l'avatar sur le tracé SVG
     */
    positionElementsOnTrail(totalPoints, globalProgress) {
        const trail = document.getElementById('roadmap-trail');
        const activeTrail = document.getElementById('roadmap-trail-active');
        const milestonesGroup = document.getElementById('milestones-group');
        const marker = document.getElementById('player-avatar-marker');

        if (!trail || !milestonesGroup || !marker) return;

        const totalLength = trail.getTotalLength();

        // Mettre à jour la longueur du tracé actif
        if (activeTrail) {
            const activeLength = totalLength * globalProgress;
            activeTrail.style.strokeDasharray = `${activeLength} ${totalLength}`;
        }

        // Placer les Checkpoints / Jalons (décalés au-dessus du sentier pour ne pas recouvrir le joueur)
        milestonesGroup.innerHTML = '';
        this.milestones.forEach((m, idx) => {
            const pt = trail.getPointAtLength(m.pathPercent * totalLength);
            const isUnlocked = totalPoints >= m.points;

            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            // On décale le jalon vers le haut pour une parfaite lisibilité
            g.setAttribute('transform', `translate(${pt.x}, ${pt.y - 14})`);
            g.setAttribute('class', 'cursor-pointer milestone-node group');
            g.setAttribute('data-milestone-id', m.id);

            g.innerHTML = `
                <!-- Petit mât de jalon -->
                <line x1="0" y1="0" x2="0" y2="14" stroke="#7c4004" stroke-width="1.8" stroke-linecap="round"/>
                <!-- Badge jalon -->
                <circle cx="0" cy="0" r="8.5" fill="${isUnlocked ? '#ff9d00' : '#e8d8c8'}" stroke="#ffffff" stroke-width="2" class="drop-shadow"/>
                <!-- Nombre de points du jalon -->
                <text x="0" y="3.2" font-size="6.5" font-weight="bold" fill="${isUnlocked ? '#ffffff' : '#7c4004'}" text-anchor="middle" font-family="'Nunito', sans-serif">
                    ${isUnlocked ? '✓' : m.points}
                </text>
            `;

            g.addEventListener('click', () => this.showMilestoneInfo(m, isUnlocked, totalPoints));
            milestonesGroup.appendChild(g);
        });

        // Placer l'avatar à la position calculée
        const avatarPercent = Math.min(Math.max(globalProgress, 0.03), 0.98);
        const avatarPoint = trail.getPointAtLength(avatarPercent * totalLength);
        marker.setAttribute('transform', `translate(${avatarPoint.x}, ${avatarPoint.y})`);
    }

    /**
     * Affiche l'info-bulle détaillée du jalon cliqué
     */
    showMilestoneInfo(milestone, isUnlocked, currentPoints) {
        const popover = document.getElementById('roadmap-milestone-popover');
        const titleEl = document.getElementById('popover-title');
        const descEl = document.getElementById('popover-desc');
        const iconEl = document.getElementById('popover-icon');

        if (!popover || !titleEl || !descEl || !iconEl) return;

        titleEl.textContent = `${milestone.title} (${milestone.points} pts)`;
        
        if (isUnlocked) {
            descEl.innerHTML = `<span class="text-green-600 font-bold">✓ Étape validée !</span> Récompense : <strong>${milestone.reward}</strong>`;
            iconEl.innerHTML = `<i class="bi bi-check-circle-fill text-green-600"></i>`;
            iconEl.className = 'w-8 h-8 rounded-lg bg-green-500/20 text-green-600 flex items-center justify-center text-base';
        } else {
            const missing = milestone.points - currentPoints;
            descEl.innerHTML = `Encore <strong>${missing} point${missing > 1 ? 's' : ''}</strong> pour débloquer : <em>${milestone.reward}</em>`;
            iconEl.innerHTML = `<i class="bi bi-lock-fill text-amber-600"></i>`;
            iconEl.className = 'w-8 h-8 rounded-lg bg-amber-500/20 text-amber-600 flex items-center justify-center text-base';
        }

        popover.classList.remove('hidden');
    }

    /**
     * Bascule l'avatar du joueur entre Garçon (Léo) et Fille (Mia)
     */
    toggleAvatar() {
        const current = playerManager.playerAvatar || 'boy';
        const next = current === 'boy' ? 'girl' : 'boy';
        playerManager.setPlayerAvatar(next);
        this.render();
    }

    /**
     * Configure les écouteurs d'événements
     */
    setupEventListeners() {
        // Toggle avatar au clic sur l'icône avatar
        const avatarToggle = document.getElementById('roadmap-avatar-toggle');
        if (avatarToggle) {
            avatarToggle.addEventListener('click', () => this.toggleAvatar());
        }

        // Toggle avatar via le bouton texte rapide
        const quickSwitchBtn = document.getElementById('quick-avatar-switch-btn');
        if (quickSwitchBtn) {
            quickSwitchBtn.addEventListener('click', () => this.toggleAvatar());
        }

        // Fermeture popover
        const closePopoverBtn = document.getElementById('close-popover-btn');
        if (closePopoverBtn) {
            closePopoverBtn.addEventListener('click', () => {
                const popover = document.getElementById('roadmap-milestone-popover');
                if (popover) popover.classList.add('hidden');
            });
        }
    }
}

export const roadmapManager = new RoadmapManager();
