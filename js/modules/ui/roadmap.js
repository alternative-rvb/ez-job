/**
 * Module de gestion de la Roadmap Fantasy ("La Quête du Château")
 * Affiche la progression du joueur sur une carte médiévale / féerique
 * Intègre le déplacement animé de l'avatar et la bulle de dialogue dynamique (compatible IA Groq).
 */

import { rewardsManager } from '../managers/rewards-manager.js';
import { playerManager } from '../core/player.js';
import { AVATARS, renderAvatarSvg, renderAvatarHeadSvg } from './avatars.js';
import { avatarCustomizerModal } from './avatar-modal.js';
import { getCharacterId, getMapLine } from '../core/dialogues.js';
import { isAtelierEnabled, setAtelierEnabled } from '../core/feature-flags.js';

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
        return getMapLine(getCharacterId(playerManager.getAvatarConfig()), totalPoints);
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
        const k = box.width && box.height ? (box.height / 328) / (box.width / 560) : 1;
        bubble.setAttribute('transform', `scale(${k}, 1)`);

        const width = Math.max(90, textEl.getComputedTextLength() + 34);
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
                        <svg viewBox="-20 -46 560 328" class="w-full h-full skeleton-svg-pulse" preserveAspectRatio="none">
                            <!-- Ciel : soleil fantôme -->
                            <circle cx="62" cy="10" r="26" fill="#d9c7b0" opacity="0.45"/>
                            <circle cx="62" cy="10" r="15" fill="#cdb79b" opacity="0.7"/>
                            <ellipse cx="140" cy="24" rx="24" ry="9" fill="#ffffff" opacity="0.6"/>
                            <ellipse cx="318" cy="-6" rx="28" ry="9" fill="#ffffff" opacity="0.5"/>
                            <!-- Montagnes lointaines et montagne de la Citadelle -->
                            <path d="M 120 180 L 196 94 Q 200 89 204 94 L 280 180 Z" fill="#d5c2ae" opacity="0.5"/>
                            <path d="M 220 180 L 316 69.6 Q 320 64 324 69.6 L 420 180 Z" fill="#cdb9a3" opacity="0.6"/>
                            <path d="M 250 260 L 409 71 Q 413 65 420 64 L 460 64 Q 466 65 469 72 L 550 260 Z" fill="#bfa78d" opacity="0.7"/>
                            <path d="M 448 64 L 460 64 Q 466 65 469 72 L 550 260 L 478 260 L 470 220 L 474 180 L 463 140 L 466 104 L 455 80 Z" fill="#ab9179" opacity="0.5"/>
                            <!-- Collines étagées -->
                            <path d="M -40 175 Q 120 135 250 170 T 580 155 L 580 320 L -40 320 Z" fill="#dfcfbd" opacity="0.5"/>
                            <path d="M -40 205 Q 150 155 310 195 T 580 185 L 580 320 L -40 320 Z" fill="#d5c2ae" opacity="0.55"/>
                            <path d="M -40 235 Q 180 205 350 230 T 580 220 L 580 320 L -40 320 Z" fill="#ccb8a2" opacity="0.6"/>
                            <!-- Lac alpin -->
                            <path d="M 243 204 C 268 189, 336 187, 387 197 C 403 208, 392 228, 350 231.5 C 294 235.5, 253 225, 243 204 Z" fill="#c4ad94" opacity="0.7"/>
                            <!-- Forêt : bosquets -->
                            <circle cx="78" cy="162" r="8" fill="#bc9f82" opacity="0.55"/>
                            <circle cx="96" cy="168" r="8" fill="#bc9f82" opacity="0.6"/>
                            <circle cx="112" cy="172" r="8" fill="#bc9f82" opacity="0.6"/>
                            <circle cx="150" cy="178" r="8" fill="#bc9f82" opacity="0.55"/>
                            <circle cx="170" cy="184" r="8" fill="#bc9f82" opacity="0.6"/>
                            <!-- Village : trois maisons et un puits -->
                            <rect x="-12" y="190" width="22" height="16" rx="1" fill="#bc9f82" opacity="0.7"/>
                            <polygon points="-15,191 -1,180 13,191" fill="#a98c6e" opacity="0.8"/>
                            <rect x="6" y="212" width="26" height="18" rx="1" fill="#bc9f82" opacity="0.75"/>
                            <polygon points="3,213 19,200 35,213" fill="#a98c6e" opacity="0.85"/>
                            <rect x="-30" y="192" width="14" height="12" rx="1" fill="#bc9f82" opacity="0.55"/>
                            <circle cx="84" cy="236" r="5" fill="#a98c6e" opacity="0.6"/>
                            <!-- Porte de pierre -->
                            <rect x="283" y="163" width="5.5" height="22" rx="1" fill="#a98c6e" opacity="0.75"/>
                            <rect x="301.5" y="163" width="5.5" height="22" rx="1" fill="#a98c6e" opacity="0.75"/>
                            <rect x="281" y="159" width="28" height="6.5" rx="2" fill="#bc9f82" opacity="0.8"/>
                            <!-- Citadelle au sommet -->
                            <rect x="418" y="14" width="14" height="38" rx="1" fill="#bc9f82" opacity="0.75"/>
                            <rect x="448" y="14" width="14" height="38" rx="1" fill="#bc9f82" opacity="0.75"/>
                            <rect x="426" y="26" width="28" height="26" rx="1" fill="#bc9f82" opacity="0.8"/>
                            <polygon points="415,16 425,-6 435,16" fill="#a98c6e" opacity="0.85"/>
                            <polygon points="445,16 455,-6 465,16" fill="#a98c6e" opacity="0.85"/>
                            <polygon points="428,28 440,6 452,28" fill="#a98c6e" opacity="0.85"/>
                            <!-- Sentier en lacets fantôme -->
                            <path d="M 45 222 C 80 222, 100 205, 130 205 C 160 205, 180 206, 210 205 C 240 202, 265 188, 295 185 C 335 182, 385 174, 420 165 C 442 155, 400 144, 365 138 C 335 130, 410 118, 445 110 C 465 102, 435 90, 415 82 C 402 76, 425 66, 440 64"
                                  fill="none" stroke="#bc9f82" stroke-width="5" stroke-linecap="round" stroke-dasharray="8 8" opacity="0.7"/>
                            <!-- 7 jalons fantômes -->
                            <circle cx="50" cy="222" r="11" fill="#dfcfbd" stroke="#bc9f82" stroke-width="2"/>
                            <circle cx="120" cy="205" r="11" fill="#dfcfbd" stroke="#bc9f82" stroke-width="2"/>
                            <circle cx="205" cy="205" r="11" fill="#dfcfbd" stroke="#bc9f82" stroke-width="2"/>
                            <circle cx="290" cy="186" r="11" fill="#dfcfbd" stroke="#bc9f82" stroke-width="2"/>
                            <circle cx="395" cy="168" r="11" fill="#dfcfbd" stroke="#bc9f82" stroke-width="2"/>
                            <circle cx="430" cy="112" r="11" fill="#dfcfbd" stroke="#bc9f82" stroke-width="2"/>
                            <circle cx="440" cy="66" r="11" fill="#dfcfbd" stroke="#bc9f82" stroke-width="2"/>
                            <!-- Pion du joueur et bulle de dialogue -->
                            <rect x="36" y="180" width="30" height="38" rx="8" fill="#bc9f82" opacity="0.7"/>
                            <rect x="16" y="152" width="70" height="22" rx="11" fill="#ffffff" opacity="0.85"/>
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

        const atelierOn = isAtelierEnabled();
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
                        <div class="relative group flex-shrink-0 ${atelierOn ? 'cursor-pointer' : ''}" ${atelierOn ? 'id="roadmap-avatar-toggle" title="Cliquer pour personnaliser ton avatar"' : ''}>
                            <div class="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl ring-2 ring-primary-500 shadow-md bg-amber-100/90 overflow-hidden flex items-center justify-center transition-transform transform group-hover:scale-105 p-0.5">
                                ${avatarData.headSvg || avatarData.svg}
                            </div>
                            ${atelierOn ? `<span class="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-accent-500 text-white flex items-center justify-center text-[8px] sm:text-[9px] shadow" title="Personnaliser">
                                <i class="bi bi-pencil-fill"></i>
                            </span>` : ''}
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
                        ${atelierOn ? `<button id="open-avatar-customizer-btn" class="text-[11px] sm:text-xs font-semibold text-primary-700 hover:text-primary-900 hover:underline flex items-center gap-1 transition whitespace-nowrap cursor-pointer" title="Personnaliser ton avatar">
                            <i class="bi bi-palette-fill text-accent-600"></i>
                            <span>Modifier mon avatar</span>
                        </button>` : ''}
                    </div>
                </div>

                <!-- Carte Fantasy Interactive (SVG Path) -->
                <div class="relative p-1.5 sm:p-2 md:p-3 flex-1 flex flex-col justify-center">
                    <div class="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[190px] max-h-[260px] rounded-xl overflow-hidden shadow-inner border border-amber-800/15" style="background: linear-gradient(180deg, #dcf0f9 0%, #b8e2f2 35%, #9dd5aa 65%, #76be88 100%);">
                        
                        <!-- SVG Carte Fantasy -->
                        <svg id="fantasy-map-svg" viewBox="-20 -46 560 328" class="w-full h-full" preserveAspectRatio="none">
                            <defs>
                                <filter id="pin-shadow" x="-20%" y="-20%" width="140%" height="140%">
                                     <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.25"/>
                                 </filter>
                                 <!-- Ruban du sentier -->
                                 <path id="roadmap-trail-ribbon" d="M 45.04 225.25 L 47.67 225.2 L 50.29 225.09 L 52.86 224.92 L 55.38 224.7 L 57.84 224.42 L 60.26 224.1 L 62.63 223.73 L 64.96 223.32 L 67.25 222.87 L 69.49 222.38 L 71.7 221.86 L 73.88 221.32 L 76.02 220.75 L 78.13 220.15 L 80.22 219.54 L 82.28 218.92 L 84.31 218.28 L 86.32 217.64 L 88.32 216.99 L 90.29 216.34 L 92.25 215.69 L 94.2 215.04 L 96.14 214.41 L 98.08 213.78 L 100.01 213.17 L 101.93 212.58 L 103.85 212.01 L 105.78 211.46 L 107.71 210.93 L 109.65 210.44 L 111.6 209.98 L 113.56 209.55 L 115.53 209.16 L 117.53 208.81 L 119.54 208.51 L 121.57 208.25 L 123.64 208.04 L 125.72 207.88 L 127.84 207.78 L 130.02 207.74 L 132.23 207.72 L 134.42 207.72 L 136.58 207.71 L 138.7 207.71 L 140.8 207.71 L 142.87 207.72 L 144.91 207.72 L 146.93 207.73 L 148.93 207.74 L 150.91 207.75 L 152.86 207.76 L 154.81 207.78 L 156.73 207.79 L 158.65 207.8 L 160.55 207.82 L 162.45 207.83 L 164.34 207.84 L 166.22 207.86 L 168.1 207.87 L 169.98 207.87 L 171.85 207.88 L 173.73 207.89 L 175.62 207.89 L 177.51 207.89 L 179.41 207.88 L 181.31 207.88 L 183.23 207.86 L 185.17 207.85 L 187.11 207.83 L 189.08 207.81 L 191.06 207.78 L 193.07 207.75 L 195.1 207.71 L 197.15 207.66 L 199.23 207.61 L 201.33 207.56 L 203.47 207.49 L 205.64 207.42 L 207.84 207.35 L 210.16 207.26 L 212.51 206.99 L 214.77 206.69 L 217.01 206.35 L 219.23 205.97 L 221.44 205.56 L 223.63 205.12 L 225.8 204.65 L 227.96 204.16 L 230.11 203.64 L 232.24 203.1 L 234.36 202.54 L 236.47 201.96 L 238.58 201.36 L 240.67 200.76 L 242.76 200.14 L 244.84 199.52 L 246.91 198.88 L 248.98 198.24 L 251.04 197.6 L 253.11 196.96 L 255.16 196.32 L 257.22 195.67 L 259.28 195.04 L 261.34 194.41 L 263.4 193.79 L 265.47 193.18 L 267.53 192.58 L 269.61 192 L 271.68 191.44 L 273.77 190.89 L 275.86 190.37 L 277.96 189.86 L 280.07 189.39 L 282.19 188.94 L 284.32 188.51 L 286.47 188.12 L 288.63 187.76 L 290.8 187.44 L 292.99 187.15 L 295.17 186.91 L 298.17 186.67 L 301.23 186.4 L 304.33 186.12 L 307.45 185.82 L 310.6 185.51 L 313.78 185.17 L 316.98 184.82 L 320.21 184.46 L 323.45 184.08 L 326.7 183.68 L 329.97 183.27 L 333.25 182.84 L 336.55 182.4 L 339.84 181.94 L 343.15 181.48 L 346.45 180.99 L 349.76 180.5 L 353.06 179.99 L 356.36 179.47 L 359.65 178.94 L 362.93 178.4 L 366.2 177.85 L 369.45 177.29 L 372.69 176.71 L 375.91 176.13 L 379.11 175.54 L 382.28 174.94 L 385.43 174.33 L 388.56 173.71 L 391.65 173.08 L 394.71 172.45 L 397.73 171.81 L 400.72 171.16 L 403.66 170.51 L 406.57 169.85 L 409.43 169.18 L 412.24 168.51 L 415.01 167.84 L 417.72 167.16 L 420.49 166.44 L 422.25 165.59 L 423.64 164.77 L 424.84 163.92 L 425.83 163.03 L 426.62 162.08 L 427.2 161.05 L 427.53 159.95 L 427.58 158.82 L 427.36 157.72 L 426.92 156.69 L 426.28 155.74 L 425.49 154.85 L 424.55 154 L 423.48 153.18 L 422.27 152.39 L 420.93 151.62 L 419.47 150.86 L 417.9 150.11 L 416.2 149.38 L 414.4 148.65 L 412.5 147.94 L 410.5 147.23 L 408.41 146.54 L 406.24 145.86 L 403.98 145.19 L 401.66 144.53 L 399.27 143.88 L 396.82 143.24 L 394.32 142.62 L 391.77 142.01 L 389.19 141.41 L 386.57 140.83 L 383.92 140.26 L 381.26 139.7 L 378.58 139.16 L 375.89 138.64 L 373.21 138.14 L 370.53 137.65 L 367.86 137.18 L 365.29 136.74 L 363.35 136.17 L 361.76 135.6 L 360.59 135.03 L 359.81 134.52 L 359.43 134.12 L 359.33 133.91 L 359.34 133.78 L 359.48 133.48 L 359.91 132.99 L 360.64 132.39 L 361.67 131.74 L 362.97 131.05 L 364.53 130.34 L 366.31 129.61 L 368.3 128.88 L 370.49 128.14 L 372.86 127.39 L 375.4 126.64 L 378.09 125.88 L 380.92 125.12 L 383.87 124.37 L 386.93 123.61 L 390.09 122.85 L 393.33 122.09 L 396.63 121.34 L 400 120.59 L 403.4 119.84 L 406.83 119.1 L 410.28 118.36 L 413.72 117.63 L 417.16 116.91 L 420.56 116.2 L 423.93 115.49 L 427.24 114.8 L 430.48 114.12 L 433.64 113.44 L 436.71 112.78 L 439.67 112.14 L 442.5 111.5 L 445.26 110.87 L 446.79 110.21 L 448.07 109.55 L 449.18 108.88 L 450.12 108.17 L 450.91 107.44 L 451.55 106.66 L 452.02 105.85 L 452.33 105 L 452.46 104.13 L 452.42 103.26 L 452.23 102.4 L 451.9 101.57 L 451.44 100.75 L 450.87 99.95 L 450.2 99.16 L 449.43 98.38 L 448.56 97.61 L 447.61 96.84 L 446.57 96.07 L 445.46 95.31 L 444.28 94.55 L 443.02 93.8 L 441.71 93.05 L 440.34 92.3 L 438.92 91.56 L 437.46 90.82 L 435.95 90.08 L 434.41 89.36 L 432.84 88.64 L 431.25 87.92 L 429.64 87.22 L 428.02 86.52 L 426.39 85.84 L 424.76 85.16 L 423.13 84.49 L 421.51 83.84 L 419.91 83.2 L 418.33 82.57 L 416.78 81.95 L 415.28 81.36 L 414.43 80.93 L 413.7 80.49 L 413.11 80.06 L 412.64 79.62 L 412.29 79.2 L 412.05 78.78 L 411.91 78.38 L 411.85 77.98 L 411.86 77.57 L 411.96 77.14 L 412.13 76.68 L 412.4 76.2 L 412.75 75.71 L 413.18 75.2 L 413.69 74.68 L 414.28 74.15 L 414.95 73.63 L 415.68 73.1 L 416.47 72.58 L 417.32 72.06 L 418.23 71.54 L 419.19 71.03 L 420.19 70.53 L 421.23 70.04 L 422.31 69.56 L 423.43 69.1 L 424.57 68.65 L 425.73 68.21 L 426.92 67.79 L 428.12 67.38 L 429.33 67 L 430.55 66.63 L 431.78 66.28 L 433 65.96 L 434.22 65.66 L 435.42 65.38 L 436.62 65.13 L 437.79 64.91 L 438.95 64.71 L 440.08 64.54 A 0.55 0.55 0 0 1 439.92 63.46 L 439.92 63.46 L 438.78 63.62 L 437.6 63.81 L 436.4 64.03 L 435.18 64.27 L 433.96 64.54 L 432.72 64.84 L 431.47 65.16 L 430.23 65.5 L 428.99 65.86 L 427.75 66.24 L 426.53 66.65 L 425.32 67.06 L 424.13 67.5 L 422.97 67.95 L 421.83 68.42 L 420.72 68.9 L 419.65 69.39 L 418.61 69.9 L 417.62 70.42 L 416.68 70.94 L 415.78 71.48 L 414.94 72.03 L 414.16 72.58 L 413.44 73.14 L 412.79 73.71 L 412.21 74.29 L 411.7 74.88 L 411.27 75.49 L 410.92 76.1 L 410.67 76.74 L 410.52 77.39 L 410.49 78.05 L 410.59 78.71 L 410.81 79.36 L 411.16 79.98 L 411.63 80.56 L 412.22 81.12 L 412.93 81.65 L 413.76 82.15 L 414.72 82.64 L 416.25 83.26 L 417.8 83.89 L 419.37 84.53 L 420.97 85.19 L 422.57 85.85 L 424.19 86.53 L 425.81 87.21 L 427.42 87.91 L 429.03 88.61 L 430.62 89.33 L 432.2 90.05 L 433.75 90.77 L 435.27 91.5 L 436.75 92.24 L 438.19 92.98 L 439.58 93.72 L 440.91 94.46 L 442.19 95.2 L 443.4 95.95 L 444.54 96.69 L 445.6 97.43 L 446.58 98.16 L 447.46 98.89 L 448.25 99.61 L 448.94 100.31 L 449.52 101 L 449.99 101.67 L 450.34 102.31 L 450.58 102.91 L 450.7 103.49 L 450.72 104.03 L 450.63 104.56 L 450.44 105.1 L 450.11 105.65 L 449.63 106.22 L 449 106.8 L 448.19 107.39 L 447.2 107.99 L 446.03 108.58 L 444.74 109.13 L 442.1 109.71 L 439.27 110.32 L 436.32 110.94 L 433.25 111.58 L 430.09 112.23 L 426.84 112.89 L 423.53 113.55 L 420.16 114.23 L 416.75 114.92 L 413.31 115.62 L 409.85 116.32 L 406.4 117.03 L 402.95 117.75 L 399.54 118.47 L 396.16 119.19 L 392.83 119.92 L 389.58 120.66 L 386.4 121.4 L 383.31 122.14 L 380.33 122.88 L 377.48 123.62 L 374.75 124.36 L 372.17 125.1 L 369.75 125.85 L 367.5 126.59 L 365.44 127.33 L 363.56 128.08 L 361.9 128.83 L 360.44 129.58 L 359.2 130.36 L 358.18 131.18 L 357.4 132.09 L 356.9 133.17 L 356.86 134.4 L 357.35 135.54 L 358.2 136.46 L 359.33 137.24 L 360.77 137.95 L 362.54 138.61 L 364.71 139.26 L 367.41 139.74 L 370.06 140.22 L 372.72 140.73 L 375.39 141.25 L 378.05 141.78 L 380.71 142.33 L 383.35 142.9 L 385.98 143.48 L 388.57 144.07 L 391.13 144.68 L 393.65 145.3 L 396.13 145.94 L 398.54 146.58 L 400.9 147.23 L 403.18 147.9 L 405.4 148.57 L 407.52 149.26 L 409.56 149.95 L 411.51 150.64 L 413.35 151.35 L 415.07 152.06 L 416.68 152.77 L 418.17 153.48 L 419.51 154.19 L 420.72 154.9 L 421.77 155.6 L 422.66 156.28 L 423.38 156.94 L 423.93 157.56 L 424.3 158.12 L 424.51 158.61 L 424.6 159.04 L 424.57 159.43 L 424.44 159.86 L 424.16 160.35 L 423.67 160.92 L 422.96 161.55 L 422.01 162.22 L 420.82 162.91 L 419.51 163.56 L 416.97 164.19 L 414.28 164.84 L 411.52 165.5 L 408.72 166.15 L 405.87 166.79 L 402.98 167.43 L 400.05 168.06 L 397.07 168.69 L 394.06 169.31 L 391.01 169.92 L 387.93 170.52 L 384.82 171.12 L 381.68 171.7 L 378.51 172.28 L 375.32 172.85 L 372.11 173.41 L 368.88 173.97 L 365.64 174.51 L 362.38 175.04 L 359.1 175.56 L 355.82 176.06 L 352.54 176.56 L 349.24 177.05 L 345.95 177.52 L 342.65 177.98 L 339.36 178.42 L 336.08 178.86 L 332.8 179.28 L 329.52 179.68 L 326.27 180.07 L 323.02 180.45 L 319.79 180.81 L 316.59 181.15 L 313.4 181.48 L 310.24 181.79 L 307.1 182.09 L 303.99 182.36 L 300.91 182.62 L 297.87 182.87 L 294.83 183.09 L 292.53 183.34 L 290.27 183.62 L 288.04 183.94 L 285.81 184.29 L 283.61 184.68 L 281.42 185.1 L 279.24 185.55 L 277.08 186.02 L 274.93 186.52 L 272.79 187.05 L 270.67 187.59 L 268.55 188.15 L 266.45 188.73 L 264.35 189.32 L 262.26 189.92 L 260.18 190.53 L 258.1 191.15 L 256.03 191.78 L 253.96 192.41 L 251.89 193.04 L 249.83 193.67 L 247.77 194.3 L 245.71 194.92 L 243.64 195.54 L 241.58 196.15 L 239.51 196.74 L 237.44 197.33 L 235.37 197.89 L 233.28 198.44 L 231.2 198.96 L 229.1 199.47 L 227 199.95 L 224.89 200.41 L 222.76 200.84 L 220.63 201.24 L 218.49 201.61 L 216.33 201.95 L 214.16 202.26 L 211.98 202.52 L 209.84 202.74 L 207.7 202.8 L 205.51 202.85 L 203.35 202.89 L 201.23 202.93 L 199.13 202.96 L 197.07 202.99 L 195.03 203.01 L 193.01 203.02 L 191.02 203.03 L 189.05 203.04 L 187.09 203.04 L 185.15 203.03 L 183.23 203.02 L 181.32 203.01 L 179.42 203 L 177.53 202.98 L 175.65 202.96 L 173.77 202.93 L 171.9 202.91 L 170.02 202.88 L 168.15 202.85 L 166.28 202.81 L 164.4 202.78 L 162.51 202.74 L 160.62 202.71 L 158.72 202.67 L 156.8 202.64 L 154.87 202.6 L 152.93 202.56 L 150.97 202.53 L 148.99 202.49 L 146.99 202.46 L 144.96 202.43 L 142.91 202.4 L 140.84 202.37 L 138.74 202.34 L 136.6 202.32 L 134.44 202.3 L 132.24 202.28 L 129.98 202.26 L 127.69 202.28 L 125.42 202.37 L 123.18 202.51 L 120.98 202.71 L 118.8 202.96 L 116.65 203.25 L 114.54 203.6 L 112.44 203.99 L 110.37 204.41 L 108.32 204.87 L 106.28 205.37 L 104.27 205.89 L 102.27 206.43 L 100.28 207 L 98.3 207.59 L 96.32 208.19 L 94.35 208.8 L 92.39 209.41 L 90.42 210.04 L 88.46 210.66 L 86.49 211.29 L 84.51 211.9 L 82.52 212.51 L 80.52 213.11 L 78.51 213.7 L 76.48 214.27 L 74.44 214.82 L 72.37 215.34 L 70.28 215.84 L 68.16 216.31 L 66.02 216.75 L 63.84 217.15 L 61.63 217.51 L 59.39 217.84 L 57.1 218.12 L 54.77 218.35 L 52.4 218.53 L 49.99 218.66 L 47.52 218.73 L 44.96 218.75 A 3.25 3.25 0 0 1 45.04 225.25 Z"/>
                            </defs>

                            <!-- Décor : Soleil et nuages (flat design, derrière les montagnes) -->
                            <g id="decor-sky">
                                <!-- Soleil discret avec halo qui scintille (sans rayon) -->
                                <g id="decor-sun" transform="translate(62, 10)">
                                    <!-- Halo doux scintillant -->
                                    <circle cx="0" cy="0" r="28" class="sun-halo" fill="#fffbeb" opacity="0.32">
                                        <animate attributeName="r" values="25;30;25" dur="3.6s" repeatCount="indefinite"/>
                                        <animate attributeName="opacity" values="0.22;0.52;0.22" dur="3.6s" repeatCount="indefinite"/>
                                    </circle>
                                    <circle cx="0" cy="0" r="20" class="sun-halo-inner" fill="#fef9c3" opacity="0.45">
                                        <animate attributeName="r" values="18;22;18" dur="2.6s" repeatCount="indefinite"/>
                                        <animate attributeName="opacity" values="0.3;0.65;0.3" dur="2.6s" repeatCount="indefinite"/>
                                    </circle>

                                    <!-- Disque solaire flat uni (jaune pastel doux et discret) -->
                                    <circle cx="0" cy="0" r="14" fill="#fef08a"/>
                                </g>

                                <!-- Nuages qui défilent très très lentement en boucle infinie continue -->
                                <g id="decor-clouds" class="decor-clouds">
                                    <g class="clouds-track">
                                        <animateTransform attributeName="transform" type="translate" from="0 0" to="560 0" dur="95s" repeatCount="indefinite"/>
                                        <!-- Motif principal des nuages -->
                                        <g id="clouds-pattern">
                                            <g transform="translate(20, 62) scale(0.6)" opacity="0.8">
                                                <circle cx="0" cy="0" r="9" fill="#ffffff"/>
                                                <circle cx="12" cy="-5" r="11" fill="#ffffff"/>
                                                <circle cx="25" cy="-1" r="8" fill="#ffffff"/>
                                                <rect x="-9" y="0" width="42" height="8" rx="4" fill="#ffffff"/>
                                                <rect x="-6" y="5" width="36" height="3" rx="1.5" fill="#e3f0f7"/>
                                            </g>
                                            <g transform="translate(140, 22) scale(1)" opacity="0.95">
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
                                            <g transform="translate(290, -8) scale(0.8)" opacity="0.9">
                                                <circle cx="0" cy="0" r="9" fill="#ffffff"/>
                                                <circle cx="12" cy="-5" r="11" fill="#ffffff"/>
                                                <circle cx="25" cy="-1" r="8" fill="#ffffff"/>
                                                <rect x="-9" y="0" width="42" height="8" rx="4" fill="#ffffff"/>
                                                <rect x="-6" y="5" width="36" height="3" rx="1.5" fill="#e3f0f7"/>
                                            </g>
                                            <g transform="translate(440, 18) scale(0.65)" opacity="0.82">
                                                <circle cx="0" cy="0" r="9" fill="#ffffff"/>
                                                <circle cx="12" cy="-5" r="11" fill="#ffffff"/>
                                                <circle cx="25" cy="-1" r="8" fill="#ffffff"/>
                                                <rect x="-9" y="0" width="42" height="8" rx="4" fill="#ffffff"/>
                                                <rect x="-6" y="5" width="36" height="3" rx="1.5" fill="#e3f0f7"/>
                                            </g>
                                        </g>
                                        <!-- Copie décalée de -560px pour assurer la boucle sans coupure -->
                                        <use href="#clouds-pattern" x="-560" y="0"/>
                                    </g>
                                </g>
                            </g>

                            <!-- Montagnes en arrière-plan harmonieuses et étagées -->
                            <!-- Chaîne de montagnes très lointaine (teintes délavées proches du ciel et groupe semi-transparent pour la perspective atmosphérique) -->
                            <!-- NOTE: même construction que les chaînes de devant, base à y=190 masquée par les collines -->
                            <g id="decor-far-mountains" opacity="0.6">
                                <!-- NOTE: les deux sommets de gauche, encore plus lointains, sont davantage estompés -->
                                <g opacity="0.55">
                                    <path d="M -95 190 L -14 122 Q -10 117 -6 122 L 75 190 Z" fill="#d3e7f1"/>
                                    <path d="M -10 118 Q -8 118 -6 122 L 75 190 L 5.3 190 L -1.5 168.4 L 3.6 146.8 L -4 132.4 Z" fill="#c6deeb"/>
                                    <path d="M -27 132.4 L -14 122 Q -10 117 -6 122 L 7 132.4 L 1.3 128.4 L -4.3 135.4 L -10 128.4 L -15.7 135.4 L -21.3 128.4 Z" fill="#edf6fa"/>
                                    <path d="M 15 190 L 91 108 Q 95 103 99 108 L 175 190 Z" fill="#d3e7f1"/>
                                    <path d="M 95 104 Q 97 104 99 108 L 175 190 L 109.4 190 L 103 164.2 L 107.8 138.4 L 100.6 121.2 Z" fill="#c6deeb"/>
                                    <path d="M 79 121.2 L 91 108 Q 95 103 99 108 L 111 121.2 L 105.7 117.2 L 100.3 124.2 L 95 117.2 L 89.7 124.2 L 84.3 117.2 Z" fill="#edf6fa"/>
                                </g>
                                <path d="M 190 190 L 261 100 Q 265 95 269 100 L 340 190 Z" fill="#d3e7f1"/>
                                <path d="M 265 96 Q 267 96 269 100 L 340 190 L 278.5 190 L 272.5 161.8 L 277 133.6 L 270.2 114.8 Z" fill="#c6deeb"/>
                                <path d="M 250 114.8 L 261 100 Q 265 95 269 100 L 280 114.8 L 275 110.8 L 270 117.8 L 265 110.8 L 260 117.8 L 255 110.8 Z" fill="#edf6fa"/>
                                <path d="M 300 190 L 381 86 Q 385 81 389 86 L 470 190 Z" fill="#d3e7f1"/>
                                <path d="M 385 82 Q 387 82 389 86 L 470 190 L 400.3 190 L 393.5 157.6 L 398.6 125.2 L 390.9 103.6 Z" fill="#c6deeb"/>
                                <path d="M 368 103.6 L 381 86 Q 385 81 389 86 L 402 103.6 L 396.3 99.6 L 390.7 106.6 L 385 99.6 L 379.3 106.6 L 373.7 99.6 Z" fill="#edf6fa"/>
                                <path d="M 450 190 L 526 102 Q 530 97 534 102 L 610 190 Z" fill="#d3e7f1"/>
                                <path d="M 530 98 Q 532 98 534 102 L 610 190 L 544.4 190 L 538 162.4 L 542.8 134.8 L 535.6 116.4 Z" fill="#c6deeb"/>
                                <path d="M 514 116.4 L 526 102 Q 530 97 534 102 L 546 116.4 L 540.7 112.4 L 535.3 119.4 L 530 112.4 L 524.7 119.4 L 519.3 112.4 Z" fill="#edf6fa"/>
                            </g>

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
                                <!-- Terre battue sous le village (une seule teinte, celle du sentier) : contour ondulé qui suit la pente, touffes d'herbe en lisière -->
                                <path d="M -20 207 C -14 201, -4 200, 6 203.5 C 14 206, 22 207.5, 31 208.5 C 42 209.5, 55 212, 65 216.5 C 74 220.5, 79 227, 73 232 C 67 237, 54 238.5, 41 237.5 C 30 236.8, 19 238.8, 8 236.5 C -2 234.5, -14 233.5, -19 228 C -23 223, -24 212, -20 207 Z" fill="#dcc08f"/>
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

                            <!-- Sentier en lacets : ruban d'un seul tenant qui s'affine progressivement (6.5 au village -> 4.2 au lac -> 1.1 au château), couleur de la terre du village -->
                            <use href="#roadmap-trail-ribbon" fill="#dcc08f"/>

                            <!-- Sentier Principal continu de référence (invisible, pour le calcul mathématique) -->
                            <path id="roadmap-trail" d="M 45 222 C 80 222, 100 205, 130 205 C 160 205, 180 206, 210 205 C 240 202, 265 188, 295 185 C 335 182, 385 174, 420 165 C 442 155, 400 144, 365 138 C 335 130, 410 118, 445 110 C 465 102, 435 90, 415 82 C 402 76, 425 66, 440 64" fill="none" stroke="none"/>


                            <!-- Checkpoints / Jalons (Milestones) -->
                            <g id="milestones-group"></g>

                            <!-- Pion / Avatar du joueur animé le long du sentier -->
                            <g id="player-avatar-marker">
                                <!-- Bulle de dialogue Manga agrandie et bien lisible -->
                                <g id="avatar-speech-bubble" transform="translate(0, 0)">
                                    <rect id="avatar-speech-rect" x="-75" y="-96" width="150" height="36" rx="18" fill="#ffffff" stroke="#7c4004" stroke-width="1.4" filter="url(#pin-shadow)"/>
                                    <!-- Pointe dirigée vers le haut de la tête de l'avatar -->
                                    <polygon points="-6,-60 6,-60 0,-52" fill="#ffffff"/>
                                    <path d="M-6 -60 L0 -52 L6 -60" stroke="#7c4004" stroke-width="1.4" fill="none" stroke-linejoin="round"/>
                                    <text id="avatar-speech-text" x="0" y="-78" fill="#7c4004" font-size="17" font-weight="700" text-anchor="middle" dominant-baseline="central" font-family="'Baloo 2', 'Almarai', sans-serif">
                                        ${this.getSpeechBubbleText(totalPoints)}
                                    </text>
                                </g>
                                
                                <!-- Conteneur de l'avatar Chibi debout agrandi -->
                                <foreignObject x="-23" y="-52" width="46" height="54">
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
            g.setAttribute('transform', `translate(${pt.x}, ${pt.y - 17})`);
            g.setAttribute('class', 'cursor-pointer milestone-node group');
            g.setAttribute('data-milestone-id', m.id);

            const fontSize = m.points >= 100 && !isUnlocked ? 8.5 : 10.5;

            g.innerHTML = `
                <circle cx="0" cy="0" r="18" fill="transparent" pointer-events="all"/>
                <line x1="0" y1="0" x2="0" y2="17" stroke="#7c4004" stroke-width="2" stroke-linecap="round" pointer-events="none"/>
                <circle cx="0" cy="0" r="12" fill="${isUnlocked ? '#ff9d00' : '#f4e9dc'}" stroke="#ffffff" stroke-width="2.2" filter="url(#pin-shadow)" pointer-events="none"/>
                <text x="0" y="0.5" font-size="${fontSize}" font-weight="900" fill="${isUnlocked ? '#5c2800' : '#7c4004'}" text-anchor="middle" dominant-baseline="central" font-family="'Nunito', 'Baloo 2', sans-serif" pointer-events="none">
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
            marker.setAttribute('transform', `translate(${pt.x + 26}, ${pt.y})`);
            if (avatarBody) {
                avatarBody.classList.remove('avatar-walking');
                avatarBody.classList.add('avatar-idle');
            }
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

            marker.setAttribute('transform', `translate(${pt.x + 26}, ${pt.y})`);

            if (t < 1) {
                requestAnimationFrame(animateWalk);
            } else {
                // Fin du trajet : pose finale et ouverture de la bulle
                const finalPt = trail.getPointAtLength(targetProgress * totalLength);
                marker.setAttribute('transform', `translate(${finalPt.x + 26}, ${finalPt.y})`);
                if (avatarBody) {
                    avatarBody.classList.remove('avatar-walking');
                    avatarBody.classList.add('avatar-idle');
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

// ANCHOR Réactivation de l'atelier d'avatar, masqué par défaut : showAtelier() / hideAtelier() dans la console
if (typeof window !== 'undefined') {
    window.showAtelier = () => {
        setAtelierEnabled(true);
        roadmapManager.render();
        console.log('🎨 Atelier d\'avatar activé (hideAtelier() pour le masquer)');
    };
    window.hideAtelier = () => {
        setAtelierEnabled(false);
        roadmapManager.render();
        console.log('🎨 Atelier d\'avatar masqué (showAtelier() pour le réactiver)');
    };
}

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
    // NOTE resetScore() remet le score à 0 ; resetScore({ trophees: true }) vide aussi les skins gagnés, la garantie d'invocation
    // et l'avatar personnalisé (le skin appliqué ne doit pas survivre à sa suppression), puis recharge la page
    window.resetScore = ({ trophees = false } = {}) => {
        if (trophees) {
            rewardsManager.resetRewards();
            localStorage.removeItem('playerAvatarConfig');
            localStorage.removeItem('playerAvatar');
            console.log('🔄 [DEV] Score, trophées et avatar réinitialisés, rechargement...');
            location.reload();
            return 0;
        }
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
