/**
 * Module de gestion de la Roadmap Fantasy ("La Quête du Château")
 * Affiche la progression du joueur sur une carte médiévale / féerique
 * Intègre le déplacement animé de l'avatar et la bulle de dialogue dynamique (compatible IA Groq).
 */

import { rewardsManager } from '../managers/rewards-manager.js';
import { playerManager } from '../core/player.js';
import { AVATARS, renderAvatarSvg, renderAvatarHeadSvg } from './avatars.js';
import { avatarCustomizerModal } from './avatar-modal.js';

export class RoadmapManager {
    constructor() {
        this.containerId = 'hero-roadmap-container';
        this.customDialogue = null;
        window.addEventListener('avatar-updated', () => this.render());
        window.addEventListener('resize', () => this.fitSpeechBubble());
        this.milestones = [
            {
                id: 'village',
                title: 'Le Hameau de Départ',
                points: 0,
                desc: 'Là où tout commence. Équipe ton sac et lance-toi !',
                icon: 'bi-house-heart-fill',
                reward: 'Boussole de l\'apprenti',
                pathPercent: 0.02
            },
            {
                id: 'forest',
                title: 'La Forêt Enchantée',
                points: 10,
                desc: 'Un sous-bois magique aux mille énigmes.',
                icon: 'bi-tree-fill',
                reward: 'Coffre Mystère en bois',
                pathPercent: 0.16
            },
            {
                id: 'bridge',
                title: 'Les Rives du Lac',
                points: 25,
                desc: 'Une halte paisible au bord des eaux cristallines.',
                icon: 'bi-water',
                reward: 'Coffre d\'Argent Scintillant',
                pathPercent: 0.28
            },
            {
                id: 'gate',
                title: 'La Porte des Géants',
                points: 40,
                desc: 'Une arche de pierre gardée par d\'anciennes légendes.',
                icon: 'bi-shield-shaded',
                reward: 'Coffre d\'Or & Joyaux',
                pathPercent: 0.42
            },
            {
                id: 'pass',
                title: 'Le Col des Vents',
                points: 60,
                desc: 'Un passage rocheux surplombant toute la vallée.',
                icon: 'bi-cloud-sun-fill',
                reward: 'Cape de voyageur en laine',
                pathPercent: 0.62
            },
            {
                id: 'ridge',
                title: 'La Crête des Aigles',
                points: 80,
                desc: 'L\'air se fait rare, la Citadelle est à portée de vue !',
                icon: 'bi-compass-fill',
                reward: 'Bague de Cristal Étoilée',
                pathPercent: 0.88
            },
            {
                id: 'castle',
                title: 'La Citadelle Céleste',
                points: 100,
                desc: 'Le sanctuaire des Grands Maîtres du Savoir !',
                icon: 'bi-trophy-fill',
                reward: 'Couronne Royale du Savoir',
                pathPercent: 0.98
            }
        ];
    }

    /**
     * Retourne la réplique contextuelle de l'avatar (ou réplique IA personnalisée)
     */
    getSpeechBubbleText(totalPoints) {
        if (this.customDialogue) return this.customDialogue;
        if (totalPoints >= 100) return 'Citadelle atteinte !';
        if (totalPoints >= 80) return 'Le Sommet est proche !';
        if (totalPoints >= 60) return 'Plus que la Crête !';
        if (totalPoints >= 40) return 'L\'Ascension commence !';
        if (totalPoints >= 25) return 'Cap sur la Porte !';
        if (totalPoints >= 10) return 'Vers le Lac !';
        if (totalPoints > 0) return 'En route vers la Forêt !';
        return 'C\'est parti !';
    }

    /**
     * Permet d'injecter une réplique IA (ex: Groq)
     */
    setCustomDialogue(text) {
        this.customDialogue = text;
        const textEl = document.getElementById('avatar-speech-text');
        if (textEl) {
            textEl.textContent = text;
            this.fitSpeechBubble();
        }
    }

    /**
     * Ajuste la largeur de la bulle au texte et la garde dans les limites de la carte
     */
    fitSpeechBubble() {
        const svg = document.getElementById('fantasy-map-svg');
        const marker = document.getElementById('player-avatar-marker');
        const bubble = document.getElementById('avatar-speech-bubble');
        const rect = document.getElementById('avatar-speech-rect');
        const textEl = document.getElementById('avatar-speech-text');
        if (!svg || !marker || !bubble || !rect || !textEl) return;

        // NOTE: la carte est en preserveAspectRatio="none" ; on compense l'étirement horizontal pour garder un texte non déformé
        const box = svg.getBoundingClientRect();
        const k = box.width && box.height ? (box.height / 320) / (box.width / 560) : 1;
        bubble.setAttribute('transform', `scale(${k}, 1)`);

        const width = Math.max(80, textEl.getComputedTextLength() + 32);
        const markerX = marker.transform.baseVal.consolidate()?.matrix.e ?? 0;

        // NOTE: bornes horizontales du viewBox (-20 → 540) avec une petite marge
        const minX = -16;
        const maxX = 536;
        const half = (width * k) / 2;
        let shift = 0;
        if (markerX - half < minX) shift = minX - (markerX - half);
        if (markerX + half > maxX) shift = maxX - (markerX + half);
        shift /= k;

        rect.setAttribute('x', -width / 2 + shift);
        rect.setAttribute('width', width);
        textEl.setAttribute('x', shift);
    }

    /**
     * Calcule le titre / rang selon le score total
     */
    getPlayerRank(totalPoints) {
        if (totalPoints >= 100) return { title: 'Grand Maître du Savoir', rank: 6, color: '#ff9d00', badgeClass: 'bg-amber-500/20 text-amber-700' };
        if (totalPoints >= 80) return { title: 'Éclaireur des Crêtes', rank: 5, color: '#9333ea', badgeClass: 'bg-purple-500/20 text-purple-700' };
        if (totalPoints >= 60) return { title: 'Conquérant des Cimes', rank: 4, color: '#2563eb', badgeClass: 'bg-blue-500/20 text-blue-700' };
        if (totalPoints >= 40) return { title: 'Gardien de la Porte', rank: 3, color: '#0891b2', badgeClass: 'bg-cyan-500/20 text-cyan-700' };
        if (totalPoints >= 25) return { title: 'Navigateur du Lac', rank: 2, color: '#16a34a', badgeClass: 'bg-emerald-500/20 text-emerald-700' };
        if (totalPoints >= 10) return { title: 'Aventurier des Bois', rank: 2, color: '#16a34a', badgeClass: 'bg-emerald-500/20 text-emerald-700' };
        return { title: 'Apprenti Voyageur', rank: 1, color: '#489e96', badgeClass: 'bg-teal-500/20 text-teal-700' };
    }

    /**
     * Génère le HTML fidèle de l'effet Squelette (Skeleton Shimmer) de la Roadmap
     */
    getSkeletonHTML() {
        return `
            <div class="fantasy-roadmap-card rounded-2xl overflow-hidden shadow-lg border border-amber-900/10 flex flex-col justify-between" style="background: linear-gradient(180deg, #fdf8f2 0%, #f4eadd 100%);">
                <!-- Header Skeleton -->
                <div class="p-3 sm:p-4 md:p-5 border-b border-amber-900/10 flex items-center justify-between gap-2 sm:gap-3 bg-white/40 backdrop-blur-sm">
                    <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <!-- Avatar box skeleton -->
                        <div class="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl skeleton-shimmer flex-shrink-0"></div>
                        <div class="space-y-2 min-w-0">
                            <div class="flex items-center gap-2">
                                <div class="h-4 w-24 sm:w-32 rounded skeleton-shimmer"></div>
                                <div class="h-4 w-12 rounded-full skeleton-shimmer"></div>
                            </div>
                            <div class="h-3 w-20 sm:w-28 rounded skeleton-shimmer"></div>
                        </div>
                    </div>

                    <!-- Score & Avatar switch skeleton -->
                    <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <div class="h-7 w-20 sm:w-24 rounded-full skeleton-shimmer"></div>
                        <div class="h-3 w-16 sm:w-20 rounded skeleton-shimmer"></div>
                    </div>
                </div>

                <!-- Carte Fantasy Squelette Fidèle (SVG Shimmer) -->
                <div class="relative p-1.5 sm:p-2 md:p-3 flex-1 flex flex-col justify-center">
                    <div class="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[190px] max-h-[260px] rounded-xl overflow-hidden shadow-inner border border-amber-800/15 skeleton-shimmer-subtle">
                        <svg viewBox="-20 -38 560 320" class="w-full h-full skeleton-svg-pulse" preserveAspectRatio="none">
                            <!-- Arrière-plan collines et montagnes fantômes -->
                            <path d="M-20 200 Q 120 160, 260 210 T 540 180 L 540 320 L -20 320 Z" fill="#dfcfbd" opacity="0.4"/>
                            <path d="M220 250 L 360 80 L 460 250 Z" fill="#d5c2ae" opacity="0.5"/>
                            <path d="M380 250 L 455 35 L 535 240 Z" fill="#ccb8a2" opacity="0.6"/>
                            <!-- Silhouette Citadelle Sommet -->
                            <rect x="430" y="8" width="50" height="28" rx="2" fill="#bc9f82" opacity="0.7"/>
                            <polygon points="425,12 455,-12 485,12" fill="#bc9f82" opacity="0.8"/>
                            <!-- Tracé courbe en S fantôme -->
                            <path d="M 25 245 C 50 245, 70 238, 90 225 C 120 205, 140 195, 175 198 C 210 202, 235 220, 260 224 C 290 228, 315 210, 335 185 C 355 160, 365 130, 385 105 C 400 85, 420 62, 455 48" 
                                  fill="none" stroke="#bc9f82" stroke-width="6" stroke-linecap="round" stroke-dasharray="8 8" opacity="0.6"/>
                            <!-- 7 Jalons Checkpoints fantômes -->
                            <circle cx="25" cy="231" r="9" fill="#dfcfbd" stroke="#bc9f82" stroke-width="2"/>
                            <circle cx="95" cy="208" r="9" fill="#dfcfbd" stroke="#bc9f82" stroke-width="2"/>
                            <circle cx="160" cy="184" r="9" fill="#dfcfbd" stroke="#bc9f82" stroke-width="2"/>
                            <circle cx="230" cy="204" r="9" fill="#dfcfbd" stroke="#bc9f82" stroke-width="2"/>
                            <circle cx="335" cy="171" r="9" fill="#dfcfbd" stroke="#bc9f82" stroke-width="2"/>
                            <circle cx="410" cy="74" r="9" fill="#dfcfbd" stroke="#bc9f82" stroke-width="2"/>
                            <circle cx="455" cy="34" r="9" fill="#dfcfbd" stroke="#bc9f82" stroke-width="2"/>
                            <!-- Avatar fantôme au départ -->
                            <rect x="36" y="195" width="22" height="28" rx="4" fill="#bc9f82" opacity="0.6"/>
                            <rect x="20" y="172" width="55" height="16" rx="8" fill="#ffffff" opacity="0.8"/>
                        </svg>
                    </div>
                </div>

                <!-- Footer Skeleton -->
                <div class="p-2.5 sm:p-3 md:p-4 bg-amber-900/5 border-t border-amber-900/10 flex items-center justify-between gap-3 text-xs">
                    <div class="flex-1 space-y-2">
                        <div class="flex items-center justify-between">
                            <div class="h-3.5 w-36 rounded skeleton-shimmer"></div>
                            <div class="h-3.5 w-20 rounded skeleton-shimmer"></div>
                        </div>
                        <div class="w-full bg-amber-900/10 h-2 rounded-full overflow-hidden">
                            <div class="h-full w-1/3 rounded-full skeleton-shimmer"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Rendu de l'effet Squelette dans le conteneur
     */
    renderSkeleton() {
        const container = document.getElementById(this.containerId);
        if (container) {
            container.innerHTML = this.getSkeletonHTML();
        }
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
        
        // Progression globale (0 à 1)
        const maxPoints = this.milestones[this.milestones.length - 1].points || 100;
        const globalProgress = Math.min(Math.max(totalPoints / maxPoints, 0), 1);
        
        // Calcul des points manquants
        const pointsToNext = Math.max(0, nextMilestone.points - totalPoints);

        container.innerHTML = `
            <div class="fantasy-roadmap-card rounded-2xl overflow-hidden shadow-lg border border-amber-900/10 flex flex-col justify-between" style="background: linear-gradient(180deg, #fdf8f2 0%, #f4eadd 100%);">
                <!-- Header Profil & Rang -->
                <div class="p-3 sm:p-4 md:p-5 border-b border-amber-900/10 flex items-center justify-between gap-2 sm:gap-3 bg-white/40 backdrop-blur-sm">
                    <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <!-- Avatar interactif (Portrait Tête) -->
                        <div class="relative group cursor-pointer flex-shrink-0" id="roadmap-avatar-toggle" title="Cliquer pour personnaliser ton avatar">
                            <div class="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl ring-2 ring-primary-500 shadow-md bg-amber-100/90 overflow-hidden flex items-center justify-center transition-transform transform group-hover:scale-105 p-0.5">
                                ${avatarData.headSvg || avatarData.svg}
                            </div>
                            <span class="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-accent-500 text-white flex items-center justify-center text-[8px] sm:text-[9px] shadow" title="Personnaliser">
                                <i class="bi bi-pencil-fill"></i>
                            </span>
                        </div>

                        <div class="min-w-0">
                            <div class="flex items-center gap-1.5 sm:gap-2">
                                <h3 class="font-bold text-sm sm:text-base leading-tight text-amber-950 truncate">${playerManager.playerName || 'Joueur'}</h3>
                                <span class="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full ${rankInfo.badgeClass} whitespace-nowrap">
                                    Niv. ${rankInfo.rank}
                                </span>
                            </div>
                            <p class="text-[11px] sm:text-xs font-medium text-amber-800/80 truncate">${rankInfo.title}</p>
                        </div>
                    </div>

                    <!-- Badge Score & Lien de Modification Avatar -->
                    <div class="flex flex-col items-end gap-1 flex-shrink-0">
                        <button id="roadmap-score-badge" class="group/score flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-accent-500/15 hover:bg-accent-500/25 border border-accent-500/30 hover:border-accent-500/50 text-amber-900 font-bold text-xs transition cursor-pointer active:scale-95" title="Cliquer pour tester : +15 pts">
                            <i class="bi bi-star-fill text-accent-500 group-hover/score:scale-110 transition-transform text-xs"></i>
                            <span class="text-xs sm:text-sm font-extrabold">${totalPoints}</span>
                            <span class="text-[10px] sm:text-[11px] font-semibold text-amber-800">pts</span>
                            <span class="text-[9px] sm:text-[10px] text-accent-600 ml-0.5 opacity-70 group-hover/score:opacity-100">+15</span>
                        </button>
                        <button id="open-avatar-customizer-btn" class="text-[11px] sm:text-xs font-semibold text-primary-700 hover:text-primary-900 hover:underline flex items-center gap-1 transition whitespace-nowrap cursor-pointer" title="Personnaliser ton avatar">
                            <i class="bi bi-palette-fill text-accent-600"></i>
                            <span>Modifier mon avatar</span>
                        </button>
                    </div>
                </div>

                <!-- Carte Fantasy Interactive (SVG Path) -->
                <div class="relative p-1.5 sm:p-2 md:p-3 flex-1 flex flex-col justify-center">
                    <div class="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[190px] max-h-[260px] rounded-xl overflow-hidden shadow-inner border border-amber-800/15" style="background: linear-gradient(180deg, #dcf0f9 0%, #b8e2f2 35%, #9dd5aa 65%, #76be88 100%);">
                        
                        <!-- SVG Carte Fantasy -->
                        <svg id="fantasy-map-svg" viewBox="-20 -38 560 320" class="w-full h-full" preserveAspectRatio="none">
                            <defs>
                                <filter id="pin-shadow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.25"/>
                                </filter>
                                <linearGradient id="trail-active-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#ff9d00"/>
                                    <stop offset="100%" stop-color="#ffd000"/>
                                </linearGradient>
                                <!-- Ruban du sentier (affiché en terre, puis en doré sous le masque de progression) -->
                                <path id="roadmap-trail-ribbon" d="M 45 225.2 L 47.7 225.2 L 50.3 225.1 L 52.9 224.9 L 55.4 224.7 L 57.8 224.4 L 60.3 224.1 L 62.6 223.7 L 65 223.3 L 67.2 222.9 L 69.5 222.4 L 71.7 221.9 L 73.9 221.3 L 76 220.7 L 78.1 220.2 L 80.2 219.5 L 82.3 218.9 L 84.3 218.3 L 86.3 217.6 L 88.3 217 L 90.3 216.3 L 92.3 215.7 L 94.2 215 L 96.1 214.4 L 98.1 213.8 L 100 213.2 L 101.9 212.6 L 103.9 212 L 105.8 211.5 L 107.7 210.9 L 109.7 210.4 L 111.6 210 L 113.6 209.5 L 115.5 209.2 L 117.5 208.8 L 119.5 208.5 L 121.6 208.2 L 123.6 208 L 125.7 207.9 L 127.8 207.8 L 130 207.7 L 132.2 207.7 L 134.4 207.7 L 136.6 207.7 L 138.7 207.7 L 140.8 207.7 L 142.9 207.7 L 144.9 207.7 L 146.9 207.7 L 148.9 207.7 L 150.9 207.8 L 152.9 207.8 L 154.8 207.8 L 156.7 207.8 L 158.6 207.8 L 160.6 207.8 L 162.4 207.8 L 164.3 207.8 L 166.2 207.9 L 168.1 207.9 L 170 207.9 L 171.9 207.9 L 173.7 207.9 L 175.6 207.9 L 177.5 207.9 L 179.4 207.9 L 181.3 207.9 L 183.2 207.9 L 185.2 207.9 L 187.1 207.8 L 189.1 207.8 L 191.1 207.8 L 193.1 207.7 L 195.1 207.7 L 197.1 207.7 L 199.2 207.6 L 201.3 207.6 L 203.5 207.5 L 205.6 207.4 L 207.8 207.3 L 210.2 207.3 L 212.5 207 L 214.8 206.7 L 217 206.3 L 219.2 206 L 221.4 205.6 L 223.6 205.1 L 225.8 204.7 L 228 204.2 L 230.1 203.6 L 232.2 203.1 L 234.4 202.5 L 236.5 202 L 238.6 201.4 L 240.7 200.8 L 242.8 200.2 L 244.8 199.5 L 246.9 198.9 L 249 198.3 L 251.1 197.6 L 253.1 197 L 255.2 196.4 L 257.2 195.7 L 259.3 195.1 L 261.4 194.5 L 263.4 193.8 L 265.5 193.2 L 267.6 192.6 L 269.6 192.1 L 271.7 191.5 L 273.8 191 L 275.9 190.4 L 278 189.9 L 280.1 189.5 L 282.2 189 L 284.3 188.6 L 286.5 188.2 L 288.6 187.9 L 290.8 187.5 L 293 187.3 L 295.2 187 L 298.2 186.8 L 301.2 186.5 L 304.3 186.3 L 307.5 186 L 310.6 185.7 L 313.8 185.3 L 317 185 L 320.2 184.6 L 323.5 184.3 L 326.7 183.9 L 330 183.5 L 333.3 183 L 336.6 182.6 L 339.9 182.2 L 343.2 181.7 L 346.5 181.2 L 349.8 180.7 L 353.1 180.2 L 356.4 179.7 L 359.7 179.2 L 363 178.7 L 366.2 178.1 L 369.5 177.5 L 372.7 177 L 376 176.4 L 379.2 175.8 L 382.3 175.2 L 385.5 174.6 L 388.6 174 L 391.7 173.4 L 394.8 172.8 L 397.8 172.1 L 400.8 171.5 L 403.7 170.8 L 406.6 170.2 L 409.5 169.5 L 412.3 168.9 L 415.1 168.2 L 417.8 167.5 L 420.6 166.8 L 422.4 165.9 L 423.8 165.1 L 425.1 164.2 L 426.1 163.3 L 426.9 162.3 L 427.5 161.2 L 427.9 160 L 428 158.8 L 427.7 157.6 L 427.3 156.5 L 426.6 155.5 L 425.8 154.6 L 424.8 153.7 L 423.7 152.9 L 422.5 152 L 421.1 151.3 L 419.7 150.5 L 418.1 149.7 L 416.4 149 L 414.6 148.3 L 412.6 147.5 L 410.6 146.8 L 408.5 146.1 L 406.4 145.4 L 404.1 144.8 L 401.8 144.1 L 399.4 143.4 L 396.9 142.8 L 394.4 142.2 L 391.9 141.6 L 389.3 140.9 L 386.7 140.4 L 384 139.8 L 381.4 139.2 L 378.7 138.7 L 376 138.2 L 373.3 137.6 L 370.6 137.1 L 368 136.7 L 365.4 136.2 L 363.5 135.7 L 362 135.1 L 360.9 134.6 L 360.2 134.1 L 359.9 133.8 L 359.9 133.8 L 359.9 133.9 L 359.9 133.8 L 360.3 133.4 L 361 132.8 L 361.9 132.2 L 363.2 131.6 L 364.7 130.9 L 366.5 130.1 L 368.5 129.4 L 370.7 128.7 L 373 128 L 375.6 127.2 L 378.2 126.5 L 381.1 125.7 L 384 125 L 387.1 124.2 L 390.2 123.5 L 393.5 122.7 L 396.8 122 L 400.1 121.2 L 403.5 120.5 L 407 119.8 L 410.4 119 L 413.9 118.3 L 417.3 117.6 L 420.7 116.9 L 424.1 116.2 L 427.4 115.5 L 430.6 114.9 L 433.8 114.2 L 436.9 113.5 L 439.8 112.9 L 442.7 112.3 L 445.5 111.6 L 447.1 110.9 L 448.5 110.3 L 449.6 109.5 L 450.6 108.8 L 451.5 108 L 452.2 107.1 L 452.8 106.2 L 453.1 105.2 L 453.3 104.2 L 453.2 103.2 L 453 102.2 L 452.6 101.2 L 452.1 100.3 L 451.5 99.4 L 450.8 98.6 L 450 97.8 L 449.1 97 L 448.1 96.2 L 447.1 95.4 L 445.9 94.6 L 444.7 93.8 L 443.5 93.1 L 442.1 92.3 L 440.8 91.5 L 439.3 90.8 L 437.8 90 L 436.3 89.3 L 434.8 88.6 L 433.2 87.8 L 431.6 87.1 L 430 86.4 L 428.4 85.7 L 426.7 85 L 425.1 84.3 L 423.5 83.6 L 421.9 83 L 420.3 82.3 L 418.7 81.7 L 417.1 81.1 L 415.7 80.5 L 414.9 80.1 L 414.2 79.7 L 413.7 79.3 L 413.3 79 L 413.1 78.7 L 412.9 78.4 L 412.8 78.1 L 412.8 77.9 L 412.8 77.7 L 412.9 77.4 L 413 77.1 L 413.2 76.7 L 413.5 76.3 L 413.9 75.9 L 414.4 75.4 L 414.9 74.9 L 415.5 74.4 L 416.2 73.9 L 417 73.4 L 417.8 72.9 L 418.7 72.4 L 419.6 71.9 L 420.6 71.4 L 421.6 71 L 422.7 70.5 L 423.8 70 L 424.9 69.6 L 426.1 69.2 L 427.2 68.7 L 428.4 68.3 L 429.6 68 L 430.8 67.6 L 432 67.3 L 433.3 67 L 434.5 66.7 L 435.6 66.4 L 436.8 66.2 L 438 65.9 L 439.1 65.7 L 440.2 65.6 A 1.6 1.6 0 0 1 439.8 62.4 L 439.8 62.4 L 438.6 62.6 L 437.4 62.8 L 436.2 63 L 435 63.3 L 433.7 63.5 L 432.5 63.8 L 431.2 64.2 L 429.9 64.5 L 428.7 64.9 L 427.4 65.3 L 426.2 65.7 L 425 66.1 L 423.8 66.6 L 422.6 67 L 421.4 67.5 L 420.3 68 L 419.2 68.5 L 418.2 69 L 417.1 69.6 L 416.2 70.1 L 415.3 70.7 L 414.4 71.2 L 413.6 71.8 L 412.8 72.4 L 412.1 73 L 411.5 73.6 L 410.9 74.3 L 410.5 75 L 410.1 75.7 L 409.7 76.5 L 409.6 77.3 L 409.5 78.1 L 409.7 78.9 L 409.9 79.8 L 410.4 80.5 L 410.9 81.2 L 411.6 81.8 L 412.4 82.4 L 413.3 83 L 414.3 83.5 L 415.9 84.1 L 417.5 84.8 L 419 85.4 L 420.6 86 L 422.2 86.7 L 423.8 87.4 L 425.5 88.1 L 427.1 88.7 L 428.7 89.4 L 430.3 90.1 L 431.8 90.9 L 433.4 91.6 L 434.9 92.3 L 436.4 93 L 437.8 93.7 L 439.2 94.5 L 440.5 95.2 L 441.8 95.9 L 442.9 96.7 L 444.1 97.4 L 445.1 98.1 L 446.1 98.8 L 446.9 99.5 L 447.7 100.2 L 448.3 100.9 L 448.9 101.5 L 449.3 102.1 L 449.6 102.7 L 449.8 103.2 L 449.9 103.6 L 449.9 104 L 449.8 104.4 L 449.7 104.7 L 449.4 105.2 L 449 105.7 L 448.5 106.2 L 447.7 106.7 L 446.8 107.3 L 445.7 107.9 L 444.5 108.4 L 441.9 108.9 L 439.1 109.6 L 436.2 110.2 L 433.1 110.8 L 429.9 111.5 L 426.7 112.2 L 423.4 112.8 L 420 113.5 L 416.6 114.2 L 413.2 114.9 L 409.7 115.6 L 406.3 116.4 L 402.8 117.1 L 399.4 117.8 L 396 118.6 L 392.7 119.3 L 389.4 120 L 386.3 120.8 L 383.2 121.5 L 380.2 122.3 L 377.3 123 L 374.6 123.8 L 372 124.5 L 369.6 125.3 L 367.3 126 L 365.2 126.8 L 363.3 127.6 L 361.7 128.3 L 360.2 129.1 L 358.9 129.9 L 357.8 130.8 L 356.9 131.8 L 356.4 133 L 356.3 134.5 L 356.9 135.8 L 357.9 136.9 L 359.1 137.7 L 360.6 138.4 L 362.4 139.1 L 364.6 139.8 L 367.3 140.2 L 370 140.7 L 372.6 141.2 L 375.3 141.7 L 378 142.3 L 380.6 142.8 L 383.3 143.4 L 385.9 143.9 L 388.5 144.5 L 391 145.1 L 393.5 145.7 L 396 146.4 L 398.4 147 L 400.8 147.7 L 403.1 148.3 L 405.3 149 L 407.4 149.7 L 409.4 150.4 L 411.4 151 L 413.2 151.7 L 414.9 152.4 L 416.5 153.1 L 418 153.8 L 419.3 154.5 L 420.5 155.2 L 421.5 155.9 L 422.4 156.6 L 423.1 157.2 L 423.6 157.8 L 424 158.3 L 424.1 158.7 L 424.2 159.1 L 424.2 159.4 L 424.1 159.7 L 423.8 160.1 L 423.4 160.7 L 422.7 161.3 L 421.8 161.9 L 420.6 162.6 L 419.4 163.2 L 416.9 163.8 L 414.2 164.5 L 411.4 165.2 L 408.6 165.8 L 405.8 166.5 L 402.9 167.1 L 400 167.7 L 397 168.4 L 394 169 L 390.9 169.6 L 387.9 170.2 L 384.8 170.8 L 381.6 171.4 L 378.5 172 L 375.3 172.6 L 372.1 173.1 L 368.8 173.7 L 365.6 174.2 L 362.3 174.8 L 359.1 175.3 L 355.8 175.8 L 352.5 176.3 L 349.2 176.8 L 345.9 177.3 L 342.6 177.8 L 339.3 178.2 L 336 178.7 L 332.8 179.1 L 329.5 179.5 L 326.2 179.9 L 323 180.3 L 319.8 180.6 L 316.6 181 L 313.4 181.3 L 310.2 181.6 L 307.1 181.9 L 304 182.2 L 300.9 182.5 L 297.9 182.7 L 294.8 183 L 292.5 183.2 L 290.3 183.5 L 288 183.8 L 285.8 184.2 L 283.6 184.6 L 281.4 185 L 279.2 185.5 L 277.1 185.9 L 274.9 186.4 L 272.8 187 L 270.7 187.5 L 268.5 188.1 L 266.4 188.7 L 264.3 189.3 L 262.2 189.9 L 260.2 190.5 L 258.1 191.1 L 256 191.7 L 253.9 192.4 L 251.9 193 L 249.8 193.6 L 247.8 194.3 L 245.7 194.9 L 243.6 195.5 L 241.6 196.1 L 239.5 196.7 L 237.4 197.3 L 235.4 197.9 L 233.3 198.4 L 231.2 199 L 229.1 199.5 L 227 200 L 224.9 200.4 L 222.8 200.8 L 220.6 201.2 L 218.5 201.6 L 216.3 202 L 214.2 202.3 L 212 202.5 L 209.8 202.7 L 207.7 202.8 L 205.5 202.8 L 203.4 202.9 L 201.2 202.9 L 199.1 203 L 197.1 203 L 195 203 L 193 203 L 191 203 L 189 203 L 187.1 203 L 185.2 203 L 183.2 203 L 181.3 203 L 179.4 203 L 177.5 203 L 175.6 203 L 173.8 202.9 L 171.9 202.9 L 170 202.9 L 168.2 202.8 L 166.3 202.8 L 164.4 202.8 L 162.5 202.7 L 160.6 202.7 L 158.7 202.7 L 156.8 202.6 L 154.9 202.6 L 152.9 202.6 L 151 202.5 L 149 202.5 L 147 202.5 L 145 202.4 L 142.9 202.4 L 140.8 202.4 L 138.7 202.3 L 136.6 202.3 L 134.4 202.3 L 132.2 202.3 L 130 202.3 L 127.7 202.3 L 125.4 202.4 L 123.2 202.5 L 121 202.7 L 118.8 203 L 116.7 203.3 L 114.5 203.6 L 112.4 204 L 110.4 204.4 L 108.3 204.9 L 106.3 205.4 L 104.3 205.9 L 102.3 206.4 L 100.3 207 L 98.3 207.6 L 96.3 208.2 L 94.4 208.8 L 92.4 209.4 L 90.4 210 L 88.5 210.7 L 86.5 211.3 L 84.5 211.9 L 82.5 212.5 L 80.5 213.1 L 78.5 213.7 L 76.5 214.3 L 74.4 214.8 L 72.4 215.3 L 70.3 215.8 L 68.2 216.3 L 66 216.7 L 63.8 217.1 L 61.6 217.5 L 59.4 217.8 L 57.1 218.1 L 54.8 218.3 L 52.4 218.5 L 50 218.7 L 47.5 218.7 L 45 218.8 A 3.2 3.2 0 0 1 45 225.2 Z"/>
                            </defs>

                            <!-- Décor : Soleil et nuages (flat design, derrière les montagnes) -->
                            <g id="decor-sky">
                                <circle cx="62" cy="10" r="30" fill="#fff3c4" opacity="0.45"/>
                                <circle cx="62" cy="10" r="22" fill="#ffe082" opacity="0.6"/>
                                <circle cx="62" cy="10" r="15" fill="#ffd54f"/>
                                <path d="M 62 -5 A 15 15 0 0 1 62 25 Z" fill="#ffca28"/>
                                <g transform="translate(140, 22) scale(1)" opacity="0.95">
                                    <circle cx="0" cy="0" r="9" fill="#ffffff"/>
                                    <circle cx="12" cy="-5" r="11" fill="#ffffff"/>
                                    <circle cx="25" cy="-1" r="8" fill="#ffffff"/>
                                    <rect x="-9" y="0" width="42" height="8" rx="4" fill="#ffffff"/>
                                    <rect x="-6" y="5" width="36" height="3" rx="1.5" fill="#e3f0f7"/>
                                </g>
                                <g transform="translate(290, -8) scale(0.8)" opacity="0.9">
                                    <circle cx="0" cy="0" r="9" fill="#ffffff"/>
                                    <circle cx="12" cy="-5" r="11" fill="#ffffff"/>
                                    <circle cx="25" cy="-1" r="8" fill="#ffffff"/>
                                    <rect x="-9" y="0" width="42" height="8" rx="4" fill="#ffffff"/>
                                    <rect x="-6" y="5" width="36" height="3" rx="1.5" fill="#e3f0f7"/>
                                </g>
                                <g transform="translate(215, 52) scale(0.55)" opacity="0.75">
                                    <circle cx="0" cy="0" r="9" fill="#ffffff"/>
                                    <circle cx="12" cy="-5" r="11" fill="#ffffff"/>
                                    <circle cx="25" cy="-1" r="8" fill="#ffffff"/>
                                    <rect x="-9" y="0" width="42" height="8" rx="4" fill="#ffffff"/>
                                    <rect x="-6" y="5" width="36" height="3" rx="1.5" fill="#e3f0f7"/>
                                </g>
                                <g transform="translate(20, 62) scale(0.6)" opacity="0.8">
                                    <circle cx="0" cy="0" r="9" fill="#ffffff"/>
                                    <circle cx="12" cy="-5" r="11" fill="#ffffff"/>
                                    <circle cx="25" cy="-1" r="8" fill="#ffffff"/>
                                    <rect x="-9" y="0" width="42" height="8" rx="4" fill="#ffffff"/>
                                    <rect x="-6" y="5" width="36" height="3" rx="1.5" fill="#e3f0f7"/>
                                </g>
                            </g>

                            <!-- Montagnes en arrière-plan harmonieuses et étagées -->
                            <!-- Chaîne de montagnes lointaines (Gris-bleu pastel avec névés nets) -->
                            <!-- NOTE: même construction que la montagne de la Citadelle (sommet arrondi, arête ombrée, neige dentelée), en teintes plus claires pour la profondeur -->
                            <path d="M 120 180 L 196 94 Q 200 89 204 94 L 280 180 Z" fill="#b3d0e4"/>
                            <path d="M 200 90 Q 202 90 204 94 L 280 180 L 214 180 L 208 156 L 211 130 L 204 108 Z" fill="#9dbdd6"/>
                            <path d="M 180.4 112 L 196 94 Q 200 89 204 94 L 219.6 112 L 214 108 L 209 116 L 204 108 L 198 115 L 192 107 L 186 113 Z" fill="#f7fbfd"/>
                            <path d="M 200 90 Q 202 90 204 94 L 219.6 112 L 214 108 L 209 116 L 204 108 Z" fill="#dde9f2"/>

                            <path d="M 220 180 L 316 69.6 Q 320 64 324 69.6 L 420 180 Z" fill="#9dbdd8"/>
                            <path d="M 320 65 Q 322 65 324 69.6 L 420 180 L 340 180 L 332 150 L 336 118 L 327 92 Z" fill="#83a6c4"/>
                            <path d="M 293.9 95 L 316 69.6 Q 320 64 324 69.6 L 346.1 95 L 340 91 L 334 100 L 327 92 L 320 99 L 313 90 L 306 98 L 300 91 Z" fill="#ffffff" opacity="0.95"/>
                            <path d="M 320 65 Q 322 65 324 69.6 L 346.1 95 L 340 91 L 334 100 L 327 92 Z" fill="#dbe7f0" opacity="0.95"/>
                            
                            <!-- Montagne majestueuse de la Citadelle (Pente naturelle continue sans rebord & névé sommital) -->
                            <path d="M 250 260 L 409 71 Q 413 65 420 64 L 460 64 Q 466 65 469 72 L 550 260 Z" fill="#7599b5"/>
                            <!-- Face ombrée à droite de l'arête (ligne de crête en diagonale) -->
                            <path d="M 448 64 L 460 64 Q 466 65 469 72 L 550 260 L 478 260 L 470 220 L 474 180 L 463 140 L 466 104 L 455 80 Z" fill="#5c829e"/>
                            <!-- Reflet de lumière sur la face gauche -->
                            <path d="M 290 260 L 405 80 L 413 70 L 395 130 L 360 200 L 335 260 Z" fill="#88abc6" opacity="0.4"/>

                            <!-- Manteau de neige sommital (bords calés sur les pentes, lisière inférieure dentelée) -->
                            <path d="M 374.6 112 L 409 71 Q 413 65 420 64 L 460 64 Q 466 65 469 72 L 486 110 L 478 104 L 470 117 L 462 103 L 453 113 L 443 101 L 433 115 L 423 102 L 413 112 L 402 100 L 393 109 L 384 101 Z" fill="#ffffff" opacity="0.95"/>
                            <path d="M 448 64 L 460 64 Q 466 65 469 72 L 486 110 L 478 104 L 470 117 L 466 110 L 466 104 L 455 80 Z" fill="#dbe7f0" opacity="0.95"/>

                            <!-- Terrasse enneigée sous le château -->
                            <ellipse cx="440" cy="65" rx="27" ry="3.5" fill="#f4f8fb"/>

                            <!-- Collines verdoyantes étagées au premier plan (Couvrent toute la largeur de -40 à 580 et jusqu'en bas Y=320) -->
                            <path d="M -40 175 Q 120 135 250 170 T 580 155 L 580 320 L -40 320 Z" fill="#6ba776"/>
                            <path d="M -40 205 Q 150 155 310 195 T 580 185 L 580 320 L -40 320 Z" fill="#599965"/>
                            <path d="M -40 235 Q 180 205 350 230 T 580 220 L 580 320 L -40 320 Z" fill="#4a8757"/>

                            <!-- Décor : Lac alpin (flat design : rive claire, eau en deux profondeurs, reflets en traits arrondis) -->
                            <g id="decor-lake">
                                <!-- Rive -->
                                <path d="M 243 204 C 268 189, 336 187, 387 197 C 403 208, 392 228, 350 231.5 C 294 235.5, 253 225, 243 204 Z" fill="#7fb97a"/>
                                <!-- Eau -->
                                <path d="M 248 206 C 272 193, 332 191, 380 200 C 394 209, 384 223, 347 227 C 298 231, 258 221, 248 206 Z" fill="#4fb3e0"/>
                                <path d="M 263 207.5 C 284 198, 330 197, 368 203.5 C 379 210, 370 219.5, 342 222 C 302 225.5, 271 218, 263 207.5 Z" fill="#3a9fd0"/>
                                <!-- Bande claire le long de la rive du fond -->
                                <path d="M 256 202 C 280 194.5, 330 193, 374 199.5 C 336 196.5, 286 197.5, 256 202 Z" fill="#8fd6f2"/>
                                <!-- Reflets -->
                                <g stroke="#ffffff" stroke-linecap="round" opacity="0.7">
                                    <line x1="276" y1="212" x2="292" y2="212" stroke-width="1.4"/>
                                    <line x1="297" y1="212" x2="301" y2="212" stroke-width="1.4"/>
                                    <line x1="318" y1="217.5" x2="340" y2="217.5" stroke-width="1.2"/>
                                    <line x1="345" y1="206" x2="362" y2="206" stroke-width="1"/>
                                </g>
                                <!-- Nénuphars -->
                                <path d="M 360 214 L 363 213 A 3 3 0 1 1 362.6 215.6 Z" fill="#5aa65e"/>
                                <circle cx="359" cy="213.2" r="1" fill="#f48fb1"/>
                                <path d="M 270 215 L 272.3 214.4 A 2.4 2.4 0 1 1 272 216.4 Z" fill="#5aa65e"/>
                                <!-- Roseaux -->
                                <g>
                                    <line x1="253" y1="212" x2="252.5" y2="202" stroke="#3f7f4c" stroke-width="0.8" stroke-linecap="round"/>
                                    <ellipse cx="252.5" cy="203.6" rx="0.9" ry="2" fill="#8d6e63"/>
                                    <line x1="256.5" y1="213" x2="257.5" y2="199.5" stroke="#3f7f4c" stroke-width="0.8" stroke-linecap="round"/>
                                    <ellipse cx="257.5" cy="201.1" rx="0.9" ry="2" fill="#8d6e63"/>
                                    <line x1="260" y1="212.5" x2="261.5" y2="203.5" stroke="#3f7f4c" stroke-width="0.8" stroke-linecap="round"/>
                                    <ellipse cx="261.5" cy="205.1" rx="0.9" ry="2" fill="#8d6e63"/>
                                    <line x1="383" y1="221" x2="382.5" y2="212" stroke="#3f7f4c" stroke-width="0.8" stroke-linecap="round"/>
                                    <ellipse cx="382.5" cy="213.6" rx="0.9" ry="2" fill="#8d6e63"/>
                                    <line x1="386.5" y1="219" x2="387.5" y2="209" stroke="#3f7f4c" stroke-width="0.8" stroke-linecap="round"/>
                                    <ellipse cx="387.5" cy="210.6" rx="0.9" ry="2" fill="#8d6e63"/>
                                </g>
                                <!-- Galets -->
                                <ellipse cx="392" cy="214" rx="2.6" ry="1.5" fill="#b0bec5"/>
                                <ellipse cx="395.5" cy="216" rx="1.8" ry="1.1" fill="#90a4ae"/>
                                <ellipse cx="250" cy="216.5" rx="2" ry="1.2" fill="#b0bec5"/>
                            </g>

                            <!-- Décor : Forêt enchantée (flat design, deux rangs pour la profondeur) -->
                            <g id="decor-forest">
                                <!-- Rang du fond -->
                                <rect x="76" y="165" width="2" height="3" fill="#6d4c41"/>
                                <polygon points="72.875,165 77,160 77,165" fill="#4f9463"/>
                                <polygon points="77,160 81.125,165 77,165" fill="#448657"/>
                                <polygon points="73.7825,161.6 77,156.8 77,161.6" fill="#4f9463"/>
                                <polygon points="77,156.8 80.2175,161.6 77,161.6" fill="#448657"/>
                                <polygon points="74.7313,158.8 77,153 77,158.8" fill="#4f9463"/>
                                <polygon points="77,153 79.2687,158.8 77,158.8" fill="#448657"/>
                                <rect x="135" y="163" width="2" height="3" fill="#6d4c41"/>
                                <polygon points="130.5,163 136,155.9 136,163" fill="#4f9463"/>
                                <polygon points="136,155.9 141.5,163 136,163" fill="#448657"/>
                                <polygon points="131.71,158.2 136,151.4 136,158.2" fill="#4f9463"/>
                                <polygon points="136,151.4 140.29,158.2 136,158.2" fill="#448657"/>
                                <polygon points="132.975,154.2 136,146 136,154.2" fill="#4f9463"/>
                                <polygon points="136,146 139.025,154.2 136,154.2" fill="#448657"/>
                                <rect x="82.8" y="161.8" width="2.4" height="4.2" fill="#6d4c41"/>
                                <circle cx="84" cy="156.7" r="6" fill="#7cb987"/>
                                <path d="M 84 150.7 A 6 6 0 0 1 84 162.7 Z" fill="#6aa977"/>
                                <rect x="92" y="164" width="2" height="3" fill="#6d4c41"/>
                                <polygon points="88.05,164 93,157.7 93,164" fill="#4f9463"/>
                                <polygon points="93,157.7 97.95,164 93,164" fill="#448657"/>
                                <polygon points="89.139,159.8 93,153.8 93,159.8" fill="#4f9463"/>
                                <polygon points="93,153.8 96.861,159.8 93,159.8" fill="#448657"/>
                                <polygon points="90.2775,156.2 93,149 93,156.2" fill="#4f9463"/>
                                <polygon points="93,149 95.7225,156.2 93,156.2" fill="#448657"/>
                                <rect x="102.8" y="160.1" width="2.4" height="4.9" fill="#6d4c41"/>
                                <circle cx="104" cy="154.2" r="7" fill="#7cb987"/>
                                <path d="M 104 147.2 A 7 7 0 0 1 104 161.2 Z" fill="#6aa977"/>
                                <rect x="119" y="161" width="2" height="3" fill="#6d4c41"/>
                                <polygon points="113.95,161 120,153 120,161" fill="#4f9463"/>
                                <polygon points="120,153 126.05,161 120,161" fill="#448657"/>
                                <polygon points="115.281,155.7 120,148.1 120,155.7" fill="#4f9463"/>
                                <polygon points="120,148.1 124.719,155.7 120,155.7" fill="#448657"/>
                                <polygon points="116.672,151.1 120,142 120,151.1" fill="#4f9463"/>
                                <polygon points="120,142 123.328,151.1 120,151.1" fill="#448657"/>
                                <rect x="148.8" y="161.8" width="2.4" height="4.2" fill="#6d4c41"/>
                                <circle cx="150" cy="156.7" r="6" fill="#7cb987"/>
                                <path d="M 150 150.7 A 6 6 0 0 1 150 162.7 Z" fill="#6aa977"/>
                                <rect x="160" y="164" width="2" height="3" fill="#6d4c41"/>
                                <polygon points="155.775,164 161,157.3 161,164" fill="#4f9463"/>
                                <polygon points="161,157.3 166.225,164 161,164" fill="#448657"/>
                                <polygon points="156.924,159.5 161,153.1 161,159.5" fill="#4f9463"/>
                                <polygon points="161,153.1 165.076,159.5 161,159.5" fill="#448657"/>
                                <polygon points="158.126,155.7 161,148 161,155.7" fill="#4f9463"/>
                                <polygon points="161,148 163.874,155.7 161,155.7" fill="#448657"/>
                                <rect x="170.8" y="163.8" width="2.4" height="4.2" fill="#6d4c41"/>
                                <circle cx="172" cy="158.7" r="6" fill="#7cb987"/>
                                <path d="M 172 152.7 A 6 6 0 0 1 172 164.7 Z" fill="#6aa977"/>
                                <!-- Ombres au sol du rang de devant -->
                                <g fill="#3f7f4c" opacity="0.35">
                                    <ellipse cx="96" cy="180.5" rx="9" ry="2"/>
                                    <ellipse cx="110" cy="181.5" rx="8" ry="2"/>
                                    <ellipse cx="128" cy="179.5" rx="10" ry="2.2"/>
                                    <ellipse cx="143" cy="180.5" rx="7.5" ry="2"/>
                                    <ellipse cx="158" cy="181.5" rx="8" ry="1.8"/>
                                </g>
                                <!-- Rang de devant -->
                                <rect x="94.8" y="174.4" width="2.4" height="5.6" fill="#6d4c41"/>
                                <circle cx="96" cy="167.6" r="8" fill="#4caf50"/>
                                <path d="M 96 159.6 A 8 8 0 0 1 96 175.6 Z" fill="#3f9a45"/>
                                <rect x="109" y="178" width="2" height="3" fill="#6d4c41"/>
                                <polygon points="102.575,178 110,167.9 110,178" fill="#2e7d32"/>
                                <polygon points="110,167.9 117.425,178 110,178" fill="#256b29"/>
                                <polygon points="104.209,171.3 110,161.7 110,171.3" fill="#2e7d32"/>
                                <polygon points="110,161.7 115.791,171.3 110,171.3" fill="#256b29"/>
                                <polygon points="105.916,165.5 110,154 110,165.5" fill="#2e7d32"/>
                                <polygon points="110,154 114.084,165.5 110,165.5" fill="#256b29"/>
                                <rect x="126.8" y="172.7" width="2.4" height="6.3" fill="#6d4c41"/>
                                <circle cx="128" cy="165" r="9" fill="#4caf50"/>
                                <path d="M 128 156 A 9 9 0 0 1 128 174 Z" fill="#3f9a45"/>
                                <rect x="142" y="177" width="2" height="3" fill="#6d4c41"/>
                                <polygon points="136.4,177 143,168.2 143,177" fill="#2e7d32"/>
                                <polygon points="143,168.2 149.6,177 143,177" fill="#256b29"/>
                                <polygon points="137.852,171.1 143,162.7 143,171.1" fill="#2e7d32"/>
                                <polygon points="143,162.7 148.148,171.1 143,171.1" fill="#256b29"/>
                                <polygon points="139.37,166.1 143,156 143,166.1" fill="#2e7d32"/>
                                <polygon points="143,156 146.63,166.1 143,166.1" fill="#256b29"/>
                                <rect x="156.8" y="176.1" width="2.4" height="4.9" fill="#6d4c41"/>
                                <circle cx="158" cy="170.2" r="7" fill="#4caf50"/>
                                <path d="M 158 163.2 A 7 7 0 0 1 158 177.2 Z" fill="#3f9a45"/>
                            </g>

                            <!-- Décor : Village de départ (flat design : aplats sans contours, volumes en deux tons) -->
                            <g id="decor-village">
                                <!-- Terre battue sous le village : contour ondulé qui suit la pente, touffes d'herbe en lisière -->
                                <path d="M -20 207 C -14 201, -4 200, 6 203.5 C 14 206, 22 207.5, 31 208.5 C 42 209.5, 55 212, 65 216.5 C 74 220.5, 79 227, 73 232 C 67 237, 54 238.5, 41 237.5 C 30 236.8, 19 238.8, 8 236.5 C -2 234.5, -14 233.5, -19 228 C -23 223, -24 212, -20 207 Z" fill="#dcc08f"/>
                                <path d="M -12 213 C -6 208, 4 208, 12 210.5 C 22 213.5, 36 213, 48 216 C 58 218.5, 67 222, 66 227.5 C 65 232, 52 233.5, 40 232.8 C 28 232, 16 233.5, 6 231.5 C -4 229.5, -13 227, -14 221 C -15 217, -14.5 215, -12 213 Z" fill="#e8d2a8"/>
                                <g fill="#cdb07c">
                                    <ellipse cx="34" cy="226" rx="1.5" ry="0.7"/>
                                    <ellipse cx="46" cy="229.5" rx="1.3" ry="0.6"/>
                                    <ellipse cx="54" cy="224" rx="1.4" ry="0.7"/>
                                    <ellipse cx="-4" cy="222" rx="1.3" ry="0.6"/>
                                </g>
                                <g fill="#599965">
                                    <path d="M 66 233.5 L 67.5 229.5 L 69 233 L 70.5 230 L 71.5 233.5 Z"/>
                                    <path d="M 22 238.5 L 23.3 235 L 24.6 238 L 26 235.3 L 27 238.6 Z"/>
                                    <path d="M -17 230 L -15.8 226.5 L -14.6 229.5 L -13.3 227 L -12.4 230.3 Z"/>
                                    <path d="M 56 214 L 57.2 210.8 L 58.4 213.6 L 59.6 211.2 L 60.4 214.4 Z"/>
                                </g>

                                <!-- Arbre rond en arrière-plan -->
                                <rect x="69" y="196" width="2.5" height="8" fill="#8d6e63"/>
                                <circle cx="70.2" cy="193" r="7" fill="#4caf50"/>
                                <path d="M 70.2 186 A 7 7 0 0 1 70.2 200 Z" fill="#43a047"/>

                                <!-- Maison 1 : l'auberge (arrière) -->
                                <g transform="translate(14, 184)">
                                    <circle cx="20" cy="-3" r="2" fill="#ffffff" opacity="0.7"/>
                                    <circle cx="22" cy="-7.5" r="2.6" fill="#ffffff" opacity="0.45"/>
                                    <rect x="17.5" y="1" width="4" height="8" fill="#8d6e63"/>
                                    <rect x="0" y="10" width="24" height="16" fill="#f8ead6"/>
                                    <rect x="16" y="10" width="8" height="16" fill="#ead5b8"/>
                                    <polygon points="-3,11 12,-1 27,11" fill="#e0603f"/>
                                    <polygon points="12,-1 27,11 12,11" fill="#c24a2c"/>
                                    <circle cx="12" cy="5" r="2" fill="#ffd54f"/>
                                    <rect x="3" y="14" width="4.5" height="4.5" rx="0.8" fill="#ffd54f"/>
                                    <rect x="18" y="14" width="4" height="4.5" rx="0.8" fill="#ffca28"/>
                                    <path d="M 9 26 L 9 20 A 3 3 0 0 1 15 20 L 15 26 Z" fill="#8d5a3b"/>
                                </g>

                                <!-- Maison 2 : la chaumière (premier plan) -->
                                <g transform="translate(2, 208)">
                                    <rect x="0" y="8" width="18" height="13" fill="#fdf1e0"/>
                                    <rect x="12" y="8" width="6" height="13" fill="#efdcc3"/>
                                    <polygon points="-2,9 9,0 20,9" fill="#4f83a8"/>
                                    <polygon points="9,0 20,9 9,9" fill="#3d6c8e"/>
                                    <rect x="2.5" y="11.5" width="3.5" height="3.5" rx="0.6" fill="#ffd54f"/>
                                    <rect x="8" y="14" width="4.5" height="7" rx="1" fill="#6d4c41"/>
                                </g>

                                <!-- Maison 3 : petite maison (arrière-gauche) -->
                                <g transform="translate(-17, 186)">
                                    <rect x="0" y="7" width="14" height="11" fill="#f8ead6"/>
                                    <rect x="9" y="7" width="5" height="11" fill="#ead5b8"/>
                                    <polygon points="-2,8 7,0 16,8" fill="#489e96"/>
                                    <polygon points="7,0 16,8 7,8" fill="#3a857e"/>
                                    <rect x="2.5" y="10" width="3.5" height="3.5" rx="0.6" fill="#ffd54f"/>
                                </g>

                                <!-- Puits -->
                                <g transform="translate(26, 224)">
                                    <rect x="1.5" y="0" width="1" height="5" fill="#8d6e63"/>
                                    <rect x="7.5" y="0" width="1" height="5" fill="#8d6e63"/>
                                    <polygon points="0,1 5,-3 10,1" fill="#e0603f"/>
                                    <polygon points="5,-3 10,1 5,1" fill="#c24a2c"/>
                                    <rect x="0" y="5" width="10" height="5" rx="1.5" fill="#90a4ae"/>
                                    <rect x="5" y="5" width="5" height="5" rx="1.5" fill="#78909c"/>
                                </g>

                                <!-- Buissons -->
                                <circle cx="22" cy="231" r="3" fill="#66bb6a"/>
                                <circle cx="25.5" cy="232" r="2.3" fill="#4caf50"/>
                                <circle cx="62" cy="233" r="2.6" fill="#66bb6a"/>

                                <!-- Panneau indicateur -->
                                <g transform="translate(56, 232)">
                                    <rect x="-0.6" y="0" width="1.4" height="7" fill="#8d6e63"/>
                                    <polygon points="-1,0 6,0 8,2 6,4 -1,4" fill="#d7a86e"/>
                                </g>
                            </g>

                            <!-- Décor : Porte de Pierre au pied de la montagne -->
                            <g transform="translate(283, 163)">
                                <rect x="0" y="0" width="5.5" height="22" fill="#7d8a97" rx="1"/>
                                <rect x="18.5" y="0" width="5.5" height="22" fill="#7d8a97" rx="1"/>
                                <rect x="-2" y="-4" width="28" height="6.5" fill="#95a5b5" rx="2"/>
                                <polygon points="12,-11 4,-4 20,-4" fill="#ff9d00"/>
                            </g>

                            <!-- Décor : Citadelle Céleste / Château royal (Parfaitement posé sur le plateau sommital) -->
                            <g transform="translate(415, 16)">
                                <!-- NOTE: flat design, aucun contour ; volumes rendus par une moitié droite ombrée -->
                                <!-- Tour Gauche -->
                                <rect x="4" y="24" width="10" height="24" fill="#eef3f8"/>
                                <rect x="9" y="24" width="5" height="24" fill="#d9e3ec"/>
                                <polygon points="3,24 9,12 9,24" fill="#489e96"/>
                                <polygon points="9,12 15,24 9,24" fill="#3a857e"/>
                                <rect x="7" y="30" width="4" height="6" rx="2" fill="#32516d"/>

                                <!-- Tour Droite -->
                                <rect x="36" y="24" width="10" height="24" fill="#eef3f8"/>
                                <rect x="41" y="24" width="5" height="24" fill="#d9e3ec"/>
                                <polygon points="35,24 41,12 41,24" fill="#489e96"/>
                                <polygon points="41,12 47,24 41,24" fill="#3a857e"/>
                                <rect x="39" y="30" width="4" height="6" rx="2" fill="#32516d"/>

                                <!-- Corps Principal / Donjon Central -->
                                <rect x="12" y="16" width="26" height="32" fill="#ffffff"/>
                                <rect x="25" y="16" width="13" height="32" fill="#e6edf3"/>
                                <!-- Toit du donjon -->
                                <polygon points="12,16 25,2 25,16" fill="#f08c1a"/>
                                <polygon points="25,2 38,16 25,16" fill="#d47400"/>
                                
                                <!-- Grande Porte Royale / Arche -->
                                <path d="M 20 48 L 20 36 A 5 5 0 0 1 30 36 L 30 48 Z" fill="#583416"/>
                                <!-- Fenêtres hautes lumineuses -->
                                <circle cx="25" cy="22" r="3" fill="#ffe066"/>

                                <!-- Mât & Bannière d'or royale -->
                                <line x1="25" y1="2" x2="25" y2="-8" stroke="#7c4004" stroke-width="1.5"/>
                                <polygon points="25,-8 37,-4 25,0" fill="#ff9d00"/>
                            </g>

                            <!-- Sentier en lacets : ruban d'un seul tenant qui s'affine progressivement (6.5 au village -> 4.2 au lac -> 3.2 au sommet), couleur de la terre du village -->
                            <use href="#roadmap-trail-ribbon" fill="#dcc08f"/>

                            <!-- Sentier Principal continu de référence (invisible, pour le calcul mathématique) -->
                            <path id="roadmap-trail" d="M 45 222 C 80 222, 100 205, 130 205 C 160 205, 180 206, 210 205 C 240 202, 265 188, 295 185 C 335 182, 385 174, 420 165 C 442 155, 400 144, 365 138 C 335 130, 410 118, 445 110 C 465 102, 435 90, 415 82 C 402 76, 425 66, 440 64" fill="none" stroke="none"/>

                            <!-- NOTE: la progression est un masque (dasharray piloté en JS sur #roadmap-trail-active) qui révèle le même ruban en doré : pas de double bordure -->
                            <mask id="trail-progress-mask" maskUnits="userSpaceOnUse" x="-20" y="-38" width="560" height="320">
                                <path id="roadmap-trail-active" d="M 45 222 C 80 222, 100 205, 130 205 C 160 205, 180 206, 210 205 C 240 202, 265 188, 295 185 C 335 182, 385 174, 420 165 C 442 155, 400 144, 365 138 C 335 130, 410 118, 445 110 C 465 102, 435 90, 415 82 C 402 76, 425 66, 440 64" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
                            </mask>
                            <use href="#roadmap-trail-ribbon" fill="url(#trail-active-gradient)" mask="url(#trail-progress-mask)"/>

                            <!-- Checkpoints / Jalons (Milestones) -->
                            <g id="milestones-group"></g>

                            <!-- Pion / Avatar du joueur animé le long du sentier -->
                            <g id="player-avatar-marker">
                                <!-- Bulle de dialogue Manga agrandie et bien lisible -->
                                <g id="avatar-speech-bubble" transform="translate(0, 0)">
                                    <rect id="avatar-speech-rect" x="-70" y="-79" width="140" height="36" rx="18" fill="#ffffff" stroke="#7c4004" stroke-width="1.4" filter="url(#pin-shadow)"/>
                                    <!-- Pointe dirigée vers le haut de la tête -->
                                    <polygon points="-6,-43.7 6,-43.7 0,-36" fill="#ffffff"/>
                                    <path d="M-6 -43 L0 -36 L6 -43" stroke="#7c4004" stroke-width="1.4" fill="none" stroke-linejoin="round"/>
                                    <text id="avatar-speech-text" x="0" y="-61" fill="#7c4004" font-size="17" font-weight="700" text-anchor="middle" dominant-baseline="central" font-family="'Baloo 2', 'Almarai', sans-serif">
                                        ${this.getSpeechBubbleText(totalPoints)}
                                    </text>
                                </g>
                                
                                <!-- Conteneur de l'avatar Chibi debout -->
                                <foreignObject x="-16" y="-36" width="32" height="38">
                                    <div id="avatar-character-wrapper" class="w-full h-full flex items-center justify-center">
                                        ${avatarData.svg}
                                    </div>
                                </foreignObject>
                            </g>
                        </svg>

                        <!-- Info-bulle / Modal Checkpoint Flottant (Caché par défaut) -->
                        <div id="roadmap-milestone-popover" class="hidden absolute inset-x-2 sm:inset-x-3 bottom-2 sm:bottom-3 p-2.5 sm:p-3 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-amber-900/20 text-xs z-20 flex items-center justify-between gap-2 sm:gap-3 animate-fade-in">
                            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
                                <div id="popover-icon" class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent-500/20 text-accent-600 flex items-center justify-center text-sm sm:text-base flex-shrink-0">
                                    <i class="bi bi-gift-fill"></i>
                                </div>
                                <div class="min-w-0">
                                    <h4 id="popover-title" class="font-bold text-amber-950 text-xs leading-tight truncate">Forêt Enchantée</h4>
                                    <p id="popover-desc" class="text-amber-800 text-[10px] sm:text-[11px] truncate">Débloqué avec 10 points !</p>
                                </div>
                            </div>
                            <button id="close-popover-btn" class="p-1 rounded-md text-amber-800/60 hover:text-amber-950 flex-shrink-0">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Footer : Progression vers le prochain objectif -->
                <div class="p-2.5 sm:p-3 md:p-4 bg-amber-900/5 border-t border-amber-900/10 flex items-center justify-between gap-2 sm:gap-3 text-xs">
                    <div class="flex-1">
                        <div class="flex items-center justify-between font-semibold text-amber-900 mb-1 text-[11px] sm:text-xs">
                            <span class="flex items-center gap-1 min-w-0 truncate">
                                <i class="bi bi-flag-fill text-primary-600 flex-shrink-0"></i>
                                <span class="truncate">Objectif : <strong>${nextMilestone.title}</strong></span>
                            </span>
                            <span class="text-[10px] sm:text-[11px] font-bold text-amber-800 whitespace-nowrap ml-2 flex-shrink-0">${pointsToNext === 0 ? 'Sommet atteint !' : `Encore ${pointsToNext} pt${pointsToNext > 1 ? 's' : ''}`}</span>
                        </div>
                        <div class="w-full bg-amber-900/10 h-1.5 sm:h-2 rounded-full overflow-hidden">
                            <div class="h-full rounded-full transition-all duration-700" 
                                 style="width: ${Math.round(globalProgress * 100)}%; background: linear-gradient(90deg, #66bcb4, #ff9d00);"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Placer les jalons et démarrer l'animation de marche
        this.setupMilestonesAndAnimate(totalPoints, globalProgress);
        
        // Attacher les interactions
        this.setupEventListeners();
    }

    /**
     * Configure les jalons et lance la marche de l'avatar le long du sentier
     */
    setupMilestonesAndAnimate(totalPoints, globalProgress) {
        const trail = document.getElementById('roadmap-trail');
        const activeTrail = document.getElementById('roadmap-trail-active');
        const milestonesGroup = document.getElementById('milestones-group');
        const marker = document.getElementById('player-avatar-marker');
        const bubble = document.getElementById('avatar-speech-bubble');

        if (!trail || !milestonesGroup || !marker) return;

        const totalLength = trail.getTotalLength();

        // 1. Placer les jalons au-dessus du sentier
        milestonesGroup.innerHTML = '';
        this.milestones.forEach((m) => {
            const pt = trail.getPointAtLength(m.pathPercent * totalLength);
            const isUnlocked = totalPoints >= m.points;

            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('transform', `translate(${pt.x}, ${pt.y - 14})`);
            g.setAttribute('class', 'cursor-pointer milestone-node group');
            g.setAttribute('data-milestone-id', m.id);

            g.innerHTML = `
                <circle cx="0" cy="0" r="16" fill="transparent" pointer-events="all"/>
                <line x1="0" y1="0" x2="0" y2="14" stroke="#7c4004" stroke-width="1.8" stroke-linecap="round" pointer-events="none"/>
                <circle cx="0" cy="0" r="8.5" fill="${isUnlocked ? '#ff9d00' : '#e8d8c8'}" stroke="#ffffff" stroke-width="2" pointer-events="none"/>
                <text x="0" y="3.2" font-size="6.5" font-weight="900" fill="${isUnlocked ? '#5c2800' : '#7c4004'}" text-anchor="middle" font-family="'Nunito', sans-serif" pointer-events="none">
                    ${isUnlocked ? '✓' : m.points}
                </text>
            `;

            g.addEventListener('click', () => this.showMilestoneInfo(m, isUnlocked, totalPoints));
            milestonesGroup.appendChild(g);
        });

        // 2. Calcul des bornes de progression
        const startProgress = 0.02;
        const targetProgress = Math.min(Math.max(globalProgress, 0.02), 0.98);
        const avatarBody = document.getElementById('avatar-character-wrapper');

        // Si le joueur est tout au début (0 pt)
        if (targetProgress <= 0.025) {
            const pt = trail.getPointAtLength(startProgress * totalLength);
            marker.setAttribute('transform', `translate(${pt.x + 21}, ${pt.y})`);
            if (avatarBody) {
                avatarBody.classList.remove('avatar-walking');
                avatarBody.classList.add('avatar-idle');
            }
            if (activeTrail) activeTrail.style.strokeDasharray = `${startProgress * totalLength} ${totalLength}`;
            if (bubble) bubble.classList.add('avatar-speech-bubble');
            document.fonts.ready.then(() => this.fitSpeechBubble());
            return;
        }

        // 3. Animation fluide de marche vers le checkpoint/score actuel
        if (bubble) {
            bubble.style.opacity = '0';
            bubble.classList.remove('avatar-speech-bubble');
        }

        const duration = 1600; // 1.6s de trajet fluide
        let startTime = null;
        if (avatarBody) {
            avatarBody.classList.remove('avatar-idle');
            avatarBody.classList.add('avatar-walking');
        }

        const animateWalk = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const t = Math.min(elapsed / duration, 1);

            // Décélération cubique douce
            const ease = 1 - Math.pow(1 - t, 3);
            const currentProg = startProgress + (targetProgress - startProgress) * ease;
            const currentDist = currentProg * totalLength;

            const pt = trail.getPointAtLength(currentDist);

            marker.setAttribute('transform', `translate(${pt.x + 21}, ${pt.y})`);

            if (activeTrail) {
                activeTrail.style.strokeDasharray = `${currentDist} ${totalLength}`;
            }

            if (t < 1) {
                requestAnimationFrame(animateWalk);
            } else {
                // Fin du trajet : pose finale et ouverture de la bulle
                const finalPt = trail.getPointAtLength(targetProgress * totalLength);
                marker.setAttribute('transform', `translate(${finalPt.x + 21}, ${finalPt.y})`);
                if (avatarBody) {
                    avatarBody.classList.remove('avatar-walking');
                    avatarBody.classList.add('avatar-idle');
                }

                if (activeTrail) {
                    activeTrail.style.strokeDasharray = `${targetProgress * totalLength} ${totalLength}`;
                }

                if (bubble) {
                    bubble.style.opacity = '1';
                    bubble.classList.add('avatar-speech-bubble');
                }
                document.fonts.ready.then(() => this.fitSpeechBubble());
            }
        };

        requestAnimationFrame(animateWalk);
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
     * Configure les écouteurs d'événements
     */
    setupEventListeners() {
        const avatarToggle = document.getElementById('roadmap-avatar-toggle');
        if (avatarToggle) {
            avatarToggle.addEventListener('click', () => {
                avatarCustomizerModal.open(() => this.render());
            });
        }

        const customizerBtn = document.getElementById('open-avatar-customizer-btn');
        if (customizerBtn) {
            customizerBtn.addEventListener('click', () => {
                avatarCustomizerModal.open(() => this.render());
            });
        }

        const scoreBadge = document.getElementById('roadmap-score-badge');
        if (scoreBadge) {
            scoreBadge.addEventListener('click', () => {
                const current = rewardsManager.getTotalPoints();
                const nextScore = current >= 100 ? 0 : current + 15;
                rewardsManager.setTotalPoints(nextScore);
                this.render();
            });
        }

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

// =============================================================================
// OUTILS DE DÉVELOPPEMENT & TESTS PROVISOIRES (À EXCLURE DE PRODUCTION)
// =============================================================================
if (typeof window !== 'undefined') {
    window.setScore = (pts) => {
        rewardsManager.setTotalPoints(pts);
        roadmapManager.render();
        console.log(`⭐ [DEV] Score mis à jour : ${pts} pts`);
        return pts;
    };
    window.addScore = (pts = 10) => {
        const cur = rewardsManager.getTotalPoints();
        const next = rewardsManager.setTotalPoints(cur + pts);
        roadmapManager.render();
        console.log(`⭐ [DEV] Score : +${pts} pts (Total : ${next} pts)`);
        return next;
    };
    window.resetScore = () => {
        rewardsManager.setTotalPoints(0);
        roadmapManager.render();
        console.log(`🔄 [DEV] Score réinitialisé à 0 pt`);
        return 0;
    };
    window.showSkeleton = (duration = 2500) => {
        roadmapManager.renderSkeleton();
        console.log(`💀 [DEV] Effet squelette Roadmap activé (durée : ${duration}ms)`);
        if (duration > 0) {
            setTimeout(() => roadmapManager.render(), duration);
        }
    };
}
