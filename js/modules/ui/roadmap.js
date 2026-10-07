/**
 * Module de gestion de la Roadmap Fantasy ("La Quête du Château")
 * Affiche la progression du joueur sur une carte médiévale / féerique
 * Intègre le déplacement animé de l'avatar et la bulle de dialogue dynamique (compatible IA Groq).
 */

import { rewardsManager } from '../managers/rewards-manager.js';
import { playerManager } from '../core/player.js';
import { AVATARS } from './avatars.js';

export class RoadmapManager {
    constructor() {
        this.containerId = 'hero-roadmap-container';
        this.customDialogue = null;
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
        }
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
                        <div class="w-10 h-12 sm:w-12 sm:h-14 rounded-xl skeleton-shimmer flex-shrink-0"></div>
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
                        <!-- Avatar interactif -->
                        <div class="relative group cursor-pointer flex-shrink-0" id="roadmap-avatar-toggle" title="Cliquer pour changer de personnage">
                            <div class="w-10 h-12 sm:w-12 sm:h-14 rounded-xl ring-2 ring-primary-500 shadow-md bg-amber-100/90 overflow-hidden flex items-center justify-center transition-transform transform group-hover:scale-105 p-1">
                                ${avatarData.svg}
                            </div>
                            <span class="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-accent-500 text-white flex items-center justify-center text-[9px] sm:text-[10px] shadow" title="Changer de personnage">
                                <i class="bi bi-arrow-repeat"></i>
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

                    <!-- Badge Score & Switch Avatar -->
                    <div class="flex flex-col items-end gap-1 flex-shrink-0">
                        <button id="roadmap-score-badge" class="group/score flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-accent-500/15 hover:bg-accent-500/25 border border-accent-500/30 hover:border-accent-500/50 text-amber-900 font-bold text-xs transition cursor-pointer active:scale-95" title="Cliquer pour tester : +15 pts">
                            <i class="bi bi-star-fill text-accent-500 group-hover/score:scale-110 transition-transform text-xs"></i>
                            <span class="text-xs sm:text-sm font-extrabold">${totalPoints}</span>
                            <span class="text-[10px] sm:text-[11px] font-semibold text-amber-800">pts</span>
                            <span class="text-[9px] sm:text-[10px] text-accent-600 ml-0.5 opacity-70 group-hover/score:opacity-100">+15</span>
                        </button>
                        <button id="quick-avatar-switch-btn" class="text-[10px] sm:text-[11px] font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition whitespace-nowrap">
                            <i class="bi bi-arrow-repeat"></i>
                            <span>Changer d'avatar</span>
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

                            <!-- Montagnes en arrière-plan harmonieuses et étagées -->
                            <!-- Chaîne de montagnes lointaines (Gris-bleu pastel avec névés nets) -->
                            <polygon points="120,180 200,90 280,180" fill="#a8c5dd" opacity="0.6"/>
                            <polygon points="185,105 200,90 215,105" fill="#ffffff" opacity="0.85"/>
                            
                            <polygon points="220,180 320,65 420,180" fill="#93b6d3" opacity="0.75"/>
                            <polygon points="300,90 320,65 340,90" fill="#ffffff" opacity="0.95"/>
                            
                            <!-- Montagne majestueuse de la Citadelle (Pente naturelle continue sans rebord & névé sommital) -->
                            <polygon points="260,240 415,64 465,64 525,240" fill="#7599b5"/>
                            <polygon points="440,64 465,64 525,240 440,240" fill="#5c829e"/>
                            <polygon points="320,240 415,64 440,64 360,240" fill="#88abc6" opacity="0.4"/>
                            
                            <!-- Manteau de neige blanche recouvrant le sommet sous le château (aligné au millimètre sur les pentes) -->
                            <polygon points="379,105 415,64 465,64 479,105" fill="#ffffff" opacity="0.95"/>
                            <polygon points="440,64 465,64 479,105 440,105" fill="#dbe7f0" opacity="0.95"/>
                            
                            <!-- Plateau fortifié en pierre claire taillée sous le château -->
                            <polygon points="415,64 465,64 467,70 410,70" fill="#ffffff" stroke="#94a3b8" stroke-width="0.8"/>

                            <!-- Collines verdoyantes étagées au premier plan -->
                            <path d="M 0 175 Q 120 135 250 170 T 520 155 L 520 280 L 0 280 Z" fill="#6ba776"/>
                            <path d="M 0 205 Q 150 155 310 195 T 520 185 L 520 280 L 0 280 Z" fill="#599965"/>
                            <path d="M 0 235 Q 180 205 350 230 T 520 220 L 520 280 L 0 280 Z" fill="#4a8757"/>

                            <!-- Décor : Grand Lac Alpin au pied de la montagne -->
                            <g id="decor-lake">
                                <!-- Berges du lac -->
                                <path d="M 245 204 C 270 190, 335 188, 385 198 C 400 208, 390 226, 350 230 C 295 234, 255 224, 245 204 Z" fill="#447d53" opacity="0.6"/>
                                <!-- Nappe d'eau du lac avec reflets azur -->
                                <path d="M 248 206 C 272 193, 332 191, 380 200 C 394 209, 384 223, 347 227 C 298 231, 258 221, 248 206 Z" fill="#38a3d1" stroke="#257ca3" stroke-width="1"/>
                                <!-- Miroir d'eau & reflets scintillants -->
                                <ellipse cx="315" cy="210" rx="40" ry="6.5" fill="#5fc1e6" opacity="0.65"/>
                                <ellipse cx="300" cy="215" rx="24" ry="3" fill="#9de2fa" opacity="0.8"/>
                                <line x1="330" y1="208" x2="355" y2="208" stroke="#ffffff" stroke-width="0.8" opacity="0.75" stroke-linecap="round"/>
                                <!-- Végétation aquatique / roseaux au bord de l'eau -->
                                <circle cx="258" cy="208" r="1.5" fill="#20502e"/>
                                <circle cx="262" cy="210" r="1.2" fill="#20502e"/>
                                <circle cx="368" cy="220" r="1.5" fill="#20502e"/>
                            </g>

                            <!-- Forêt dense sur la colline (Centre-Gauche uniquement) -->
                            <g fill="#336a44" opacity="0.85">
                                <circle cx="85" cy="162" r="7"/>
                                <circle cx="95" cy="157" r="9"/>
                                <circle cx="108" cy="160" r="8"/>
                                <circle cx="120" cy="155" r="9"/>
                                <circle cx="155" cy="162" r="7"/>
                                <circle cx="165" cy="157" r="9"/>
                            </g>

                            <!-- Décor : Grande Forêt Enchantée (Centre-Gauche) -->
                            <g transform="translate(90, 160)">
                                <circle cx="10" cy="15" r="9" fill="#2d6e40"/>
                                <circle cx="24" cy="10" r="12" fill="#387e4c"/>
                                <circle cx="38" cy="14" r="10" fill="#2d6e40"/>
                                
                                <polygon points="18,-6 10,8 26,8" fill="#1b522c"/>
                                <polygon points="18,3 8,17 28,17" fill="#154223"/>
                                
                                <polygon points="35,-12 25,2 45,2" fill="#1e5c32"/>
                                <polygon points="35,-2 23,12 47,12" fill="#174827"/>
                                <polygon points="35,8 20,22 50,22" fill="#123a1f"/>

                                <circle cx="52" cy="12" r="11" fill="#4d9b64"/>
                                <circle cx="64" cy="16" r="8" fill="#3f8854"/>
                                <circle cx="58" cy="5" r="9" fill="#58ad71"/>
                                
                                <polygon points="72,-4 65,8 79,8" fill="#1b522c"/>
                                <polygon points="72,5 62,18 82,18" fill="#154223"/>
                            </g>

                            <!-- Décor : Village de départ (Place pavée & chaumières RPG) -->
                            <g id="decor-village">
                                <!-- Place pavée du village -->
                                <ellipse cx="42" cy="225" rx="36" ry="15" fill="#e8cca8" opacity="0.7"/>
                                <ellipse cx="42" cy="225" rx="33" ry="13" fill="#d9b68c" opacity="0.35" stroke="#a88458" stroke-dasharray="2 3" stroke-width="0.8"/>

                                <!-- Maison 1 : L'Auberge du Départ (Arrière-gauche) -->
                                <g transform="translate(14, 182)">
                                    <!-- Cheminée avec fumée douce -->
                                    <rect x="16" y="2" width="3.5" height="7" fill="#7d8a97" stroke="#525d67" stroke-width="0.6"/>
                                    <circle cx="17.8" cy="-1.5" r="1.8" fill="#ffffff" opacity="0.6"/>
                                    <circle cx="19.5" cy="-5" r="2.3" fill="#ffffff" opacity="0.4"/>
                                    <circle cx="21" cy="-9" r="2.8" fill="#ffffff" opacity="0.2"/>

                                    <!-- Murs avec soubassement pierre & colombages -->
                                    <rect x="0" y="8" width="22" height="16" fill="#eed9c4" stroke="#684624" stroke-width="0.8" rx="1"/>
                                    <rect x="0" y="20" width="22" height="4" fill="#9ca3af" stroke="#684624" stroke-width="0.6"/>
                                    <line x1="11" y1="8" x2="11" y2="20" stroke="#8b5a2b" stroke-width="0.8"/>
                                    <line x1="0" y1="14" x2="22" y2="14" stroke="#8b5a2b" stroke-width="0.6"/>

                                    <!-- Toit mansardé tuiles rouges -->
                                    <polygon points="-3,8 11,-1 25,8" fill="#c04928" stroke="#7c2e1b" stroke-width="0.8"/>
                                    <!-- Lucarne ronde -->
                                    <circle cx="11" cy="4" r="2" fill="#ffeb99" stroke="#7c2e1b" stroke-width="0.6"/>
                                    <line x1="11" y1="2" x2="11" y2="6" stroke="#7c2e1b" stroke-width="0.5"/>
                                    <!-- Fenêtres lumineuses -->
                                    <rect x="2.5" y="10" width="4" height="4" fill="#ffe066" stroke="#684624" stroke-width="0.5"/>
                                    <rect x="15.5" y="10" width="4" height="4" fill="#ffe066" stroke="#684624" stroke-width="0.5"/>
                                    <!-- Porte en bois voutée -->
                                    <path d="M 8 24 L 8 18 A 3 3 0 0 1 14 18 L 14 24 Z" fill="#684624"/>
                                    <circle cx="9.5" cy="21" r="0.5" fill="#ffe066"/>
                                </g>

                                <!-- Maison 2 : Chaumière du Voyageur (Gauche au premier plan) -->
                                <g transform="translate(2, 210)">
                                    <rect x="0" y="7" width="16" height="13" fill="#e2c8a2" stroke="#684624" stroke-width="0.8" rx="1"/>
                                    <polygon points="-2,7 8,-1 18,7" fill="#486b88" stroke="#2c445a" stroke-width="0.8"/>
                                    <rect x="2.5" y="10" width="3.5" height="3.5" fill="#ffe066" stroke="#684624" stroke-width="0.5"/>
                                    <rect x="9" y="11" width="5" height="9" fill="#583416"/>
                                    <rect x="2" y="14" width="4.5" height="1.5" fill="#8b5a2b"/>
                                    <circle cx="3" cy="13.5" r="0.8" fill="#e11d48"/>
                                    <circle cx="4.5" cy="13.5" r="0.8" fill="#fbbf24"/>
                                    <circle cx="6" cy="13.5" r="0.8" fill="#38bdf8"/>
                                </g>

                                <!-- Puits de village sculpté en pierre -->
                                <g transform="translate(24, 226)">
                                    <ellipse cx="4.5" cy="7.5" rx="4.5" ry="2" fill="#525d67"/>
                                    <rect x="0" y="4" width="9" height="5" fill="#7d8a97" stroke="#4b5563" stroke-width="0.6" rx="1"/>
                                    <line x1="1.5" y1="4" x2="1.5" y2="0" stroke="#684624" stroke-width="0.8"/>
                                    <line x1="7.5" y1="4" x2="7.5" y2="0" stroke="#684624" stroke-width="0.8"/>
                                    <polygon points="0,1 4.5,-2 9,1" fill="#c04928" stroke="#7c2e1b" stroke-width="0.6"/>
                                    <circle cx="4.5" cy="1.5" r="0.8" fill="#ffffff"/>
                                </g>

                                <!-- Panneau indicateur de route en bois -->
                                <g transform="translate(56, 232)">
                                    <line x1="0" y1="6" x2="0" y2="0" stroke="#684624" stroke-width="1.2" stroke-linecap="round"/>
                                    <polygon points="-1,0 6,0 8,2 6,4 -1,4" fill="#c49a6c" stroke="#684624" stroke-width="0.6"/>
                                    <line x1="1" y1="2" x2="5" y2="2" stroke="#684624" stroke-width="0.6"/>
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
                                <!-- Tour Gauche -->
                                <rect x="4" y="24" width="10" height="24" fill="#f0f5fa" stroke="#b4c7d9" stroke-width="1"/>
                                <polygon points="3,24 9,12 15,24" fill="#489e96"/>
                                <rect x="7" y="30" width="4" height="6" rx="1" fill="#32516d"/>

                                <!-- Tour Droite -->
                                <rect x="36" y="24" width="10" height="24" fill="#f0f5fa" stroke="#b4c7d9" stroke-width="1"/>
                                <polygon points="35,24 41,12 47,24" fill="#489e96"/>
                                <rect x="39" y="30" width="4" height="6" rx="1" fill="#32516d"/>

                                <!-- Corps Principal / Donjon Central -->
                                <rect x="12" y="16" width="26" height="32" fill="#ffffff" stroke="#b4c7d9" stroke-width="1.2"/>
                                <!-- Créneaux centraux -->
                                <polygon points="12,16 25,2 38,16" fill="#e07e00"/>
                                
                                <!-- Grande Porte Royale / Arche -->
                                <path d="M 20 48 L 20 36 A 5 5 0 0 1 30 36 L 30 48 Z" fill="#583416"/>
                                <!-- Fenêtres hautes lumineuses -->
                                <circle cx="25" cy="22" r="3" fill="#ffe066"/>

                                <!-- Mât & Bannière d'or royale -->
                                <line x1="25" y1="2" x2="25" y2="-8" stroke="#7c4004" stroke-width="1.5"/>
                                <polygon points="25,-8 37,-4 25,0" fill="#ff9d00"/>
                            </g>

                            <!-- Sentier en lacets avec dégradé d'épaisseur fine & élégante (8.5px au village -> 3.5px au sommet) -->
                            <path d="M 45 222 C 80 222, 100 205, 130 205" fill="none" stroke="url(#trail-gradient)" stroke-width="8.5" stroke-linecap="round"/>
                            <path d="M 130 205 C 160 205, 180 206, 210 205" fill="none" stroke="url(#trail-gradient)" stroke-width="7.2" stroke-linecap="round"/>
                            <path d="M 210 205 C 240 202, 265 188, 295 185" fill="none" stroke="url(#trail-gradient)" stroke-width="5.8" stroke-linecap="round"/>
                            <path d="M 295 185 C 335 182, 385 174, 420 165 C 442 155, 400 144, 365 138" fill="none" stroke="url(#trail-gradient)" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M 365 138 C 335 130, 410 118, 445 110 C 465 102, 435 90, 415 82 C 402 76, 425 66, 440 64" fill="none" stroke="url(#trail-gradient)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>

                            <!-- Sentier Principal continu de référence (invisible, pour le calcul mathématique) -->
                            <path id="roadmap-trail" 
                                  d="M 45 222 C 80 222, 100 205, 130 205 C 160 205, 180 206, 210 205 C 240 202, 265 188, 295 185 C 335 182, 385 174, 420 165 C 442 155, 400 144, 365 138 C 335 130, 410 118, 445 110 C 465 102, 435 90, 415 82 C 402 76, 425 66, 440 64" 
                                  fill="none" 
                                  stroke="none" />

                            <!-- Tracé actif doré complété grimpant en lacets directement sur la montagne jusqu'au plateau -->
                            <path id="roadmap-trail-active" 
                                  d="M 45 222 C 80 222, 100 205, 130 205 C 160 205, 180 206, 210 205 C 240 202, 265 188, 295 185 C 335 182, 385 174, 420 165 C 442 155, 400 144, 365 138 C 335 130, 410 118, 445 110 C 465 102, 435 90, 415 82 C 402 76, 425 66, 440 64" 
                                  fill="none" 
                                  stroke="url(#trail-active-gradient)" 
                                  stroke-width="3.2" 
                                  stroke-linecap="round" 
                                  stroke-linejoin="round"
                                  style="opacity: 0.95; filter: drop-shadow(0 0 2px rgba(255,180,0,0.6));" />

                            <!-- Checkpoints / Jalons (Milestones) -->
                            <g id="milestones-group"></g>

                            <!-- Pion / Avatar du joueur animé le long du sentier -->
                            <g id="player-avatar-marker">
                                <!-- Bulle de dialogue Manga agrandie et bien lisible -->
                                <g id="avatar-speech-bubble" transform="translate(0, 0)">
                                    <rect x="-55" y="-66" width="110" height="23" rx="11.5" fill="#ffffff" stroke="#7c4004" stroke-width="1.4" filter="url(#pin-shadow)"/>
                                    <!-- Pointe dirigée vers le haut de la tête -->
                                    <polygon points="-5,-43 5,-43 0,-36" fill="#ffffff"/>
                                    <path d="M-5 -43 L0 -36 L5 -43" stroke="#7c4004" stroke-width="1.4" fill="none"/>
                                    <text id="avatar-speech-text" x="0" y="-53.5" fill="#7c4004" font-size="9.5" font-weight="800" text-anchor="middle" dominant-baseline="central" font-family="'Nunito', sans-serif">
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
                <text x="0" y="3.2" font-size="6.5" font-weight="bold" fill="${isUnlocked ? '#ffffff' : '#7c4004'}" text-anchor="middle" font-family="'Nunito', sans-serif" pointer-events="none">
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
     * Bascule l'avatar du joueur entre Garçon et Fille
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
        const avatarToggle = document.getElementById('roadmap-avatar-toggle');
        if (avatarToggle) {
            avatarToggle.addEventListener('click', () => this.toggleAvatar());
        }

        const quickSwitchBtn = document.getElementById('quick-avatar-switch-btn');
        if (quickSwitchBtn) {
            quickSwitchBtn.addEventListener('click', () => this.toggleAvatar());
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

// Expose aussi directement sur window pour un accès immédiat
if (typeof window !== 'undefined') {
    window.setScore = (pts) => {
        rewardsManager.setTotalPoints(pts);
        roadmapManager.render();
        console.log(`⭐ Score mis à jour : ${pts} pts`);
        return pts;
    };
    window.addScore = (pts = 10) => {
        const cur = rewardsManager.getTotalPoints();
        const next = rewardsManager.setTotalPoints(cur + pts);
        roadmapManager.render();
        console.log(`⭐ Score : +${pts} pts (Total : ${next} pts)`);
        return next;
    };
    window.showSkeleton = (duration = 2500) => {
        roadmapManager.renderSkeleton();
        console.log(`💀 Effet squelette Roadmap activé (durée : ${duration}ms)`);
        if (duration > 0) {
            setTimeout(() => roadmapManager.render(), duration);
        }
    };
}
