/**
 * Module de gestion de la Roadmap Fantasy ("La Quête du Château")
 * Affiche la progression du joueur sur une carte médiévale / féerique
 * Intègre le déplacement animé de l'avatar et la bulle de dialogue dynamique (compatible IA Groq).
 */

import { rewardsManager, SUMMON_COST } from '../managers/rewards-manager.js';
import { playerManager } from '../core/player.js';
import { AVATARS, renderAvatarSvg, renderAvatarHeadSvg } from './avatars.js';
import { avatarCustomizerModal } from './avatar-modal.js';
import { getCharacterId, getMapLine } from '../core/dialogues.js';

export class RoadmapManager {
    constructor() {
        this.containerId = 'hero-roadmap-container';
        this.customDialogue = null;
        // ANCHOR Titres des quiz récents annoncés par l'avatar, intro jouée une seule fois par chargement de page
        this.newQuizTitles = [];
        this.introPlayed = false;
        this.introTimer = null;
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
                pathPercent: 0.020
            },
            {
                id: 'forest',
                title: 'La Forêt Enchantée',
                points: 10,
                desc: 'Un sous-bois magique aux mille énigmes.',
                icon: 'bi-tree-fill',
                reward: 'Coffre Mystère en bois',
                pathPercent: 0.259
            },
            {
                id: 'bridge',
                title: 'Les Rives du Lac',
                points: 20,
                desc: 'Une halte paisible au bord des eaux cristallines.',
                icon: 'bi-water',
                reward: 'Coffre d\'Argent Scintillant',
                pathPercent: 0.2
            },
            {
                id: 'meadow',
                title: 'La Prairie des Murmures',
                points: 30,
                desc: 'Les herbes hautes chuchotent des secrets aux voyageurs.',
                icon: 'bi-flower1',
                reward: 'Bourse de Pièces Anciennes',
                pathPercent: 0.3
            },
            {
                id: 'gate',
                title: 'La Porte des Géants',
                points: 40,
                desc: 'Une arche de pierre gardée par d\'anciennes légendes.',
                icon: 'bi-shield-shaded',
                reward: 'Coffre d\'Or & Joyaux',
                pathPercent: 0.448
            },
            {
                id: 'stones',
                title: 'Le Cercle des Pierres',
                points: 50,
                desc: 'Des monolithes couverts de runes marquent la mi-parcours.',
                icon: 'bi-gem',
                reward: 'Amulette Runique',
                pathPercent: 0.5
            },
            {
                id: 'pass',
                title: 'Le Col des Vents',
                points: 60,
                desc: 'Un passage rocheux surplombant toute la vallée.',
                icon: 'bi-cloud-sun-fill',
                reward: 'Cape de voyageur en laine',
                pathPercent: 0.638
            },
            {
                id: 'waterfall',
                title: 'La Cascade Argentée',
                points: 70,
                desc: 'Une chute d\'eau scintillante dévale la falaise.',
                icon: 'bi-droplet-fill',
                reward: 'Fiole d\'Eau Pure',
                pathPercent: 0.7
            },
            {
                id: 'ridge',
                title: 'La Crête des Aigles',
                points: 80,
                desc: 'L\'air se fait rare, la Citadelle est à portée de vue !',
                icon: 'bi-compass-fill',
                reward: 'Bague de Cristal Étoilée',
                pathPercent: 0.886
            },
            {
                id: 'snow',
                title: 'Les Neiges Éternelles',
                points: 90,
                desc: 'Le froid mord, mais le sommet est tout proche.',
                icon: 'bi-snow',
                reward: 'Gants de Givre',
                pathPercent: 0.9
            },
            {
                id: 'castle',
                title: 'La Citadelle Céleste',
                points: 100,
                desc: 'Le sanctuaire des Grands Maîtres du Savoir !',
                icon: 'bi-trophy-fill',
                reward: 'Couronne Royale du Savoir',
                pathPercent: 0.981
            }
        ];
        // NOTE Chaque jalon se place sur la graduation de ses points (échelle proportionnelle commune avec l'avatar)
        this.milestones.forEach((m) => { m.pathPercent = this.percentForPoints(m.points); });
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
     * Mémorise les titres des quiz récents que l'avatar annonce à l'accueil
     */
    setNewQuizTitles(titles) {
        this.newQuizTitles = titles;
    }

    /**
     * Salutation selon l'heure et l'absence du joueur (retour après plusieurs jours)
     */
    getGreetingLine() {
        const name = playerManager.playerName;
        const suffix = name ? ` ${name} !` : ' !';
        let lastVisit = 0;
        try { lastVisit = Number(localStorage.getItem('lastVisitAt')) || 0; } catch (e) { /* localStorage indisponible */ }
        try { localStorage.setItem('lastVisitAt', String(Date.now())); } catch (e) { /* idem */ }

        if (lastVisit && Date.now() - lastVisit > 3 * 24 * 3600 * 1000) return `Content de te revoir${suffix}`;
        const hour = new Date().getHours();
        const options = hour >= 18 || hour < 5
            ? [`Bonsoir${suffix}`, `Salut${suffix}`]
            : [`Bonjour${suffix}`, `Salut${suffix}`, `Coucou${suffix}`];
        return options[Math.floor(Math.random() * options.length)];
    }

    /**
     * Titres déjà annoncés par l'avatar (mémorisés pour ne pas répéter l'annonce à chaque visite)
     */
    getAnnouncedTitles() {
        try { return JSON.parse(localStorage.getItem('announcedQuizzes')) || []; } catch (e) { return []; }
    }

    /**
     * Fait enchaîner à l'avatar salutation, quiz récents jamais annoncés, puis la réplique habituelle de la carte
     */
    playIntroDialogue(totalPoints) {
        clearTimeout(this.introTimer);
        const finalLine = this.getSpeechBubbleText(totalPoints);
        if (this.introPlayed || this.customDialogue) return;
        this.introPlayed = true;

        const announced = this.getAnnouncedTitles();
        const fresh = this.newQuizTitles.filter(t => !announced.includes(t));
        const pick = list => list[Math.floor(Math.random() * list.length)];

        const lines = [this.getGreetingLine(), pick(['Comment tu vas ?', 'Prêt pour l\'aventure ?', 'Tout va bien ?'])];
        if (fresh.length) {
            lines.push(fresh.length === 1
                ? pick(['J\'ai trouvé une nouvelle aventure !', 'Un nouveau quiz vient d\'arriver !'])
                : pick(['Voici les nouvelles aventures...', 'Du nouveau dans mon sac !', 'Regarde ce que j\'ai déniché !']));
            fresh.forEach((title, i) => {
                const short = title.length > 34 ? `${title.slice(0, 31)}...` : title;
                lines.push(fresh.length > 1 && i === fresh.length - 1 ? `Et aussi : ${short}` : short);
            });
            try { localStorage.setItem('announcedQuizzes', JSON.stringify([...new Set([...announced, ...fresh])])); } catch (e) { /* idem */ }
        }

        // NOTE Trophées à invoquer : annoncés à chaque chargement tant que le joueur a assez de gemmes
        if (rewardsManager.canSummon()) {
            const pulls = Math.floor(rewardsManager.getTotalPoints() / SUMMON_COST);
            lines.push(pulls > 1
                ? pick([`Tu peux invoquer ${pulls} trophées !`, `${pulls} invocations de trophées t'attendent !`])
                : pick(['Un trophée est à invoquer !', 'Tu as assez de gemmes pour un trophée !']));
        }
        lines.push(finalLine);

        const textEl = document.getElementById('avatar-speech-text');
        const bubble = document.getElementById('avatar-speech-bubble');
        let index = 0;

        const show = () => {
            const el = document.getElementById('avatar-speech-text');
            // NOTE La carte a pu être re-rendue entre deux répliques : on abandonne l'intro
            if (!el || el !== textEl) return;
            el.style.transition = 'opacity 0.15s';
            el.style.opacity = '0';
            this.introTimer = setTimeout(() => {
                el.textContent = lines[index];
                this.fitSpeechBubble();
                el.style.opacity = '1';
                index += 1;
                // NOTE Durée proportionnelle à la longueur du texte
                if (index < lines.length) this.introTimer = setTimeout(show, 1300 + lines[index - 1].length * 55);
            }, index === 0 ? 0 : 150);
        };

        // NOTE Un clic sur la bulle passe à la réplique suivante
        if (bubble) {
            bubble.style.cursor = 'pointer';
            bubble.addEventListener('click', () => {
                if (index >= lines.length) return;
                clearTimeout(this.introTimer);
                show();
            });
        }
        show();
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
                    <div class="relative mx-auto rounded-xl overflow-hidden shadow-inner border border-amber-800/15 skeleton-shimmer-subtle" style="aspect-ratio: 560 / 328; width: min(100%, 560px);">
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
                        <div class="relative group flex-shrink-0 cursor-pointer" id="roadmap-avatar-toggle" title="Cliquer pour personnaliser ton avatar">
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
                        <div id="roadmap-score-badge" class="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-accent-500/15 border border-accent-500/30 text-amber-900 font-bold text-xs">
                            <i class="bi bi-star-fill text-accent-500 text-xs"></i>
                            <span class="text-xs sm:text-sm font-extrabold">${totalPoints}</span>
                            <span class="text-[10px] sm:text-[11px] font-semibold text-amber-800">pts</span>
                        </div>
                        <button id="open-avatar-customizer-btn" class="text-[11px] sm:text-xs font-semibold text-primary-700 hover:text-primary-900 hover:underline flex items-center gap-1 transition whitespace-nowrap cursor-pointer" title="Personnaliser ton avatar">
                            <i class="bi bi-palette-fill text-accent-600"></i>
                            <span>Modifier mon avatar</span>
                        </button>
                    </div>
                </div>

                <!-- Carte Fantasy Interactive (SVG Path) -->
                <div class="relative p-1.5 sm:p-2 md:p-3 flex-1 flex flex-col justify-center">
                    <div class="relative mx-auto rounded-xl overflow-hidden shadow-inner border border-amber-800/15" style="aspect-ratio: 560 / 328; width: min(100%, 560px); background: linear-gradient(180deg, #dcf0f9 0%, #b8e2f2 35%, #9dd5aa 65%, #76be88 100%);">
                        
                        <!-- SVG Carte Fantasy -->
                        <svg id="fantasy-map-svg" viewBox="-20 -46 560 328" class="w-full h-full" preserveAspectRatio="xMidYMid meet">
                            <defs>
                                <filter id="pin-shadow" x="-20%" y="-20%" width="140%" height="140%">
                                     <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.25"/>
                                 </filter>
                                <!-- NOTE: silhouettes des montagnes, pour couper les bandes vertes du pied -->
                                <clipPath id="mountain-clip-1"><path d="M 120 180 L 196 94 Q 200 89 204 94 L 280 180 Z"/></clipPath>
                                <clipPath id="mountain-clip-2"><path d="M 220 180 L 316 69.6 Q 320 64 324 69.6 L 420 180 Z"/></clipPath>
                                <clipPath id="mountain-clip-3"><path d="M 250 260 L 409 71 Q 413 65 420 64 L 460 64 Q 466 65 469 72 L 550 260 Z"/></clipPath>
                                <clipPath id="mountain-clip-4"><path d="M 430 210 L 592 24 Q 600 16 608 24 L 770 210 Z"/></clipPath>
                                 <!-- Ruban du sentier -->
                                 <path id="roadmap-trail-ribbon" d="M 38.13,267.5 L 40.77,267.49 L 43.68,267.56 L 46.09,267.62 L 49.27,267.69 L 52.09,267.72 L 55.02,267.72 L 58.01,267.66 L 60.41,267.56 L 63.39,267.35 L 66.3,267.04 L 69.66,266.51 L 72.29,265.89 L 75.37,264.97 L 77.89,264.07 L 80.86,262.86 L 83.3,261.77 L 86.19,260.4 L 88.56,259.22 L 91.36,257.79 L 93.67,256.61 L 95.94,255.47 L 98.63,254.16 L 101.28,252.95 L 103.51,251.96 L 106.08,250.82 L 108.98,249.53 L 111.42,248.44 L 113.85,247.35 L 116.71,246.09 L 119.24,244.99 L 121.88,243.86 L 124.17,242.89 L 126.59,241.89 L 129.14,240.85 L 131.81,239.79 L 134.61,238.7 L 136.93,237.82 L 139.9,236.69 L 142.35,235.78 L 144.84,234.85 L 148.01,233.68 L 150.59,232.72 L 153.19,231.75 L 155.82,230.77 L 158.46,229.78 L 161.11,228.77 L 163.76,227.76 L 166.41,226.72 L 169.05,225.68 L 171.72,224.6 L 174.39,223.49 L 176.41,222.63 L 179.11,221.46 L 181.83,220.28 L 184.55,219.08 L 187.29,217.87 L 189.35,216.96 L 192.1,215.76 L 194.86,214.56 L 197.62,213.39 L 199.7,212.52 L 202.47,211.39 L 205.24,210.3 L 207.31,209.5 L 210.08,208.49 L 212.84,207.53 L 215.63,206.6 L 218.45,205.71 L 220.58,205.05 L 223.45,204.2 L 226.32,203.37 L 228.49,202.76 L 231.38,201.98 L 234.29,201.21 L 237.19,200.47 L 239.36,199.92 L 242.25,199.21 L 245.13,198.51 L 248,197.83 L 250.85,197.16 L 252.96,196.67 L 255.77,196.02 L 258.54,195.38 L 261.25,194.76 L 263.92,194.16 L 267.18,193.43 L 269.75,192.87 L 272.3,192.32 L 275.45,191.66 L 277.97,191.14 L 280.48,190.64 L 283.64,190.03 L 286.2,189.56 L 288.78,189.09 L 291.41,188.64 L 294.76,188.09 L 297.5,187.65 L 300.32,187.22 L 302.46,186.92 L 305.35,186.54 L 308.29,186.19 L 311.27,185.87 L 313.53,185.64 L 316.58,185.35 L 319.66,185.07 L 322,184.87 L 325.14,184.59 L 327.51,184.39 L 330.7,184.11 L 333.11,183.89 L 336.34,183.58 L 338.77,183.34 L 342.04,183 L 344.5,182.72 L 347.79,182.32 L 350.26,181.99 L 352.76,181.65 L 356.19,181.19 L 358.82,180.82 L 361.51,180.45 L 364.23,180.07 L 366.98,179.68 L 369.74,179.28 L 372.52,178.87 L 375.3,178.45 L 378.06,178.02 L 380.82,177.58 L 383.54,177.13 L 386.23,176.68 L 388.88,176.21 L 392.32,175.58 L 394.83,175.09 L 397.27,174.59 L 400.39,173.92 L 403.34,173.22 L 406.11,172.51 L 408.83,171.79 L 411.58,171.04 L 414.33,170.28 L 417.04,169.5 L 419.71,168.7 L 422.28,167.88 L 424.74,167.05 L 427.63,165.98 L 430.24,164.89 L 432.95,163.54 L 435.46,161.85 L 437.57,158.33 L 435.96,154.8 L 433.51,152.85 L 430.76,151.23 L 428.08,149.9 L 425.74,148.85 L 423.25,147.82 L 420.66,146.82 L 417.99,145.85 L 415.3,144.92 L 412.61,144.05 L 409.96,143.23 L 406.77,142.3 L 404.36,141.65 L 401.11,140.95 L 398.24,140.53 L 395.95,140.28 L 392.77,140.01 L 390.32,139.85 L 387,139.67 L 384.49,139.56 L 381.19,139.43 L 378.77,139.34 L 375.66,139.21 L 373.44,139.09 L 370.7,138.91 L 367.69,138.6 L 364.87,138.09 L 362.97,137.3 L 362.87,136.08 L 364.22,134.04 L 366.26,132.09 L 368.17,130.61 L 370.41,129.11 L 372.93,127.62 L 375.12,126.45 L 378.04,125.06 L 380.49,124.02 L 383.03,123.06 L 385.63,122.19 L 388.39,121.43 L 390.8,120.92 L 393.48,120.46 L 396.39,120.04 L 399.48,119.66 L 401.64,119.41 L 404.99,119.08 L 407.28,118.86 L 410.77,118.56 L 413.13,118.37 L 415.5,118.17 L 419.05,117.9 L 421.4,117.7 L 424.88,117.42 L 427.15,117.22 L 430.46,116.92 L 432.59,116.7 L 435.64,116.36 L 438.5,115.98 L 441.12,115.57 L 444.21,114.96 L 446.77,114.25 L 449.53,112.94 L 451.75,110.69 L 452.47,107.66 L 451.76,104.86 L 450.12,102.13 L 448.41,100.17 L 446.05,98.05 L 443.8,96.44 L 441.44,95.06 L 438.35,93.82 L 436.06,93.31 L 432.72,92.84 L 430.5,92.64 L 427.36,92.42 L 424.9,92.3 L 421.53,92.18 L 418.98,92.1 L 416.45,92.03 L 413.14,91.93 L 410.75,91.84 L 407.74,91.69 L 404.99,91.48 L 402.06,91.1 L 399.45,90.46 L 397.81,88.96 L 398.83,86.38 L 400.4,84.6 L 402.51,82.7 L 405.02,80.74 L 407.29,79.11 L 409.64,77.5 L 411.98,75.97 L 414.22,74.54 L 416.67,73.02 L 419.09,71.54 L 421.23,70.42 L 423.92,69.23 L 426.69,68.16 L 429.08,67.33 L 431.79,66.47 L 434.68,65.61 L 437.2,64.88 L 440,64 L 440,64 L 437.19,64.83 L 434.66,65.52 L 431.76,66.34 L 429.03,67.17 L 426.63,67.97 L 423.82,69.01 L 421.12,70.17 L 418.93,71.27 L 416.49,72.72 L 414.02,74.22 L 411.76,75.62 L 409.39,77.13 L 407.01,78.71 L 404.71,80.32 L 402.16,82.28 L 399.99,84.18 L 398.33,86 L 397.17,89.05 L 399.2,91.1 L 401.93,91.81 L 404.92,92.22 L 407.68,92.47 L 410.71,92.66 L 413.1,92.77 L 416.42,92.91 L 418.95,93.01 L 421.5,93.12 L 424.85,93.27 L 427.3,93.42 L 430.41,93.66 L 432.6,93.9 L 435.86,94.39 L 438.05,94.9 L 440.9,96.08 L 443.15,97.43 L 445.29,99 L 447.52,101.04 L 449.1,102.89 L 450.57,105.38 L 451.14,107.71 L 450.57,110 L 448.77,111.77 L 446.32,112.9 L 443.89,113.54 L 440.88,114.11 L 438.29,114.48 L 435.47,114.82 L 432.43,115.13 L 430.31,115.32 L 427.01,115.59 L 424.75,115.76 L 421.27,116.02 L 418.92,116.18 L 415.37,116.43 L 413,116.59 L 410.63,116.76 L 407.12,117.03 L 404.82,117.22 L 401.45,117.53 L 399.27,117.74 L 396.14,118.1 L 393.18,118.5 L 390.44,118.95 L 387.94,119.45 L 385.03,120.21 L 382.34,121.08 L 379.71,122.05 L 377.17,123.09 L 374.14,124.5 L 371.86,125.68 L 369.22,127.21 L 366.86,128.76 L 364.79,130.32 L 362.49,132.49 L 360.67,135.25 L 361.34,139.03 L 364.26,140.42 L 367.36,141.01 L 370.49,141.36 L 373.29,141.58 L 375.52,141.72 L 378.65,141.89 L 381.08,142.01 L 384.37,142.17 L 386.86,142.3 L 390.15,142.5 L 392.57,142.69 L 395.67,142.98 L 397.89,143.25 L 400.63,143.68 L 403.64,144.35 L 406,145.02 L 409.13,145.96 L 411.72,146.79 L 414.36,147.68 L 417,148.61 L 419.6,149.59 L 422.13,150.59 L 424.53,151.62 L 426.78,152.65 L 429.3,153.93 L 431.78,155.43 L 433.72,156.99 L 434.42,158.11 L 433.42,159.41 L 431.39,160.74 L 428.92,161.93 L 426.45,162.94 L 423.67,163.93 L 421.27,164.72 L 418.74,165.49 L 416.11,166.26 L 413.42,167 L 410.69,167.73 L 407.95,168.45 L 405.24,169.14 L 402.52,169.81 L 399.63,170.46 L 396.56,171.1 L 394.15,171.57 L 391.67,172.02 L 388.25,172.62 L 385.62,173.06 L 382.95,173.48 L 380.24,173.9 L 377.5,174.31 L 374.74,174.71 L 371.98,175.1 L 369.21,175.48 L 366.45,175.86 L 363.7,176.22 L 360.99,176.57 L 358.31,176.92 L 355.67,177.25 L 352.24,177.69 L 349.74,178.01 L 347.3,178.3 L 344.04,178.67 L 341.61,178.92 L 338.38,179.24 L 335.96,179.45 L 332.75,179.73 L 330.35,179.92 L 327.16,180.17 L 324.79,180.35 L 321.64,180.6 L 319.3,180.78 L 316.2,181.03 L 313.12,181.3 L 310.83,181.5 L 307.81,181.8 L 304.82,182.13 L 301.87,182.49 L 299.68,182.78 L 296.83,183.18 L 294.05,183.59 L 290.66,184.13 L 288.01,184.56 L 285.39,185 L 282.8,185.46 L 279.6,186.05 L 277.06,186.53 L 274.51,187.02 L 271.33,187.66 L 268.76,188.19 L 266.17,188.73 L 262.88,189.44 L 260.2,190.02 L 257.46,190.62 L 254.69,191.23 L 251.87,191.85 L 249.74,192.32 L 246.88,192.97 L 243.99,193.63 L 241.08,194.3 L 238.16,195 L 235.96,195.53 L 233.02,196.25 L 230.08,197 L 227.14,197.77 L 224.93,198.36 L 222,199.18 L 219.09,200.02 L 216.91,200.66 L 214.02,201.55 L 211.16,202.47 L 208.3,203.44 L 205.44,204.46 L 203.31,205.25 L 200.47,206.35 L 197.64,207.47 L 195.52,208.33 L 192.71,209.5 L 189.92,210.67 L 187.14,211.86 L 185.06,212.75 L 182.31,213.93 L 179.59,215.11 L 176.88,216.26 L 174.19,217.39 L 172.2,218.22 L 169.56,219.29 L 166.95,220.32 L 164.32,221.33 L 161.69,222.32 L 159.05,223.31 L 156.41,224.28 L 153.77,225.25 L 151.15,226.2 L 148.55,227.14 L 145.96,228.07 L 142.78,229.22 L 140.27,230.13 L 137.81,231.03 L 134.8,232.13 L 132.45,233.01 L 129.6,234.08 L 126.86,235.15 L 124.27,236.17 L 121.81,237.17 L 119.47,238.13 L 116.79,239.24 L 114.22,240.34 L 111.32,241.59 L 108.87,242.65 L 106.42,243.72 L 103.51,244.99 L 100.95,246.1 L 98.72,247.05 L 95.9,248.32 L 93.08,249.66 L 90.75,250.81 L 88.42,251.97 L 85.64,253.36 L 83.32,254.48 L 80.56,255.77 L 78.27,256.76 L 75.55,257.84 L 73.29,258.63 L 70.6,259.41 L 68.38,259.9 L 65.47,260.35 L 62.84,260.6 L 60.08,260.77 L 57.82,260.84 L 54.98,260.87 L 52.16,260.85 L 49.42,260.79 L 46.3,260.7 L 43.9,260.61 L 40.92,260.51 L 37.87,260.5 Q 33.1,264.18 38.13,267.5 Z"/>
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
                                <!-- Montagne estompée à droite de la Citadelle, derrière la montagne du château -->
                                <g opacity="0.7">
                                    <path d="M 430 190 L 504 38 Q 508 32 512 38 L 586 190 Z" fill="#d3e7f1"/>
                                    <path d="M 508 33 Q 510 33 512 38 L 586 190 L 528 190 L 520 140 L 524 100 L 516 66 Z" fill="#c6deeb"/>
                                    <path d="M 489 69 L 504 38 Q 508 32 512 38 L 527 69 L 520 64 L 514 72 L 508 64 L 501 72 L 495 64 Z" fill="#edf6fa"/>
                                </g>
                                <!-- Montagne estompée derrière le château, entre la montagne centrale et celle de la Citadelle -->
                                <g opacity="0.7">
                                    <path d="M 305 190 L 372 62 Q 376 56 380 62 L 447 190 Z" fill="#d3e7f1"/>
                                    <path d="M 376 57 Q 378 57 380 62 L 447 190 L 391 190 L 385.5 152 L 389.5 118 L 383 84 Z" fill="#c6deeb"/>
                                    <path d="M 361 80 L 372 62 Q 376 56 380 62 L 391 80 L 386 76 L 381 83 L 376 76 L 371 83 L 366 76 Z" fill="#edf6fa"/>
                                </g>
                                <path d="M 190 190 L 261 100 Q 265 95 269 100 L 340 190 Z" fill="#d3e7f1"/>
                                <path d="M 265 96 Q 267 96 269 100 L 340 190 L 278.5 190 L 272.5 161.8 L 277 133.6 L 270.2 114.8 Z" fill="#c6deeb"/>
                                <path d="M 250 114.8 L 261 100 Q 265 95 269 100 L 280 114.8 L 275 110.8 L 270 117.8 L 265 110.8 L 260 117.8 L 255 110.8 Z" fill="#edf6fa"/>
                                <path d="M 300 190 L 381 86 Q 385 81 389 86 L 470 190 Z" fill="#d3e7f1"/>
                                <path d="M 385 82 Q 387 82 389 86 L 470 190 L 400.3 190 L 393.5 157.6 L 398.6 125.2 L 390.9 103.6 Z" fill="#c6deeb"/>
                                <path d="M 368 103.6 L 381 86 Q 385 81 389 86 L 402 103.6 L 396.3 99.6 L 390.7 106.6 L 385 99.6 L 379.3 106.6 L 373.7 99.6 Z" fill="#edf6fa"/>
                            </g>

                            <!-- Chaîne de montagnes lointaines (Gris-bleu pastel avec névés nets) -->
                            <!-- NOTE: même construction que la montagne de la Citadelle (sommet arrondi, arête ombrée, neige dentelée), en teintes plus claires pour la profondeur -->
                            <path d="M 120 180 L 196 94 Q 200 89 204 94 L 280 180 Z" fill="#b3d0e4"/>
                            <path d="M 200 90 Q 202 90 204 94 L 280 180 L 214 180 L 208 156 L 211 130 L 204 108 Z" fill="#9dbdd6"/>
                            <path d="M 180.4 112 L 196 94 Q 200 89 204 94 L 219.6 112 L 214 108 L 209 116 L 204 108 L 198 115 L 192 107 L 186 113 Z" fill="#f7fbfd"/>
                            <path d="M 200 90 Q 202 90 204 94 L 219.6 112 L 214 108 L 209 116 L 204 108 Z" fill="#dde9f2"/>
                            <!-- Pied verdoyant de la montagne : deux bandes vertes superposées -->
                            <g clip-path="url(#mountain-clip-1)">
                                <path d="M 100 143 Q 125 138 150 143 T 175 143 T 200 143 T 225 143 T 250 143 T 275 143 T 300 143 L 300 200 L 100 200 Z" fill="#4a8757" opacity="0.75"/>
                                <path d="M 110 156 Q 134 152 158 156 T 181 156 T 205 156 T 229 156 T 252 156 T 276 156 T 300 156 L 300 200 L 110 200 Z" fill="#2f6b45" opacity="0.85"/>
                            </g>
                            <!-- Sapins sur la pente de la montagne lointaine de gauche : uniquement dans le tiers inférieur -->
                            <g id="decor-slope-firs-1">
                                <rect x="218.5" y="142.6" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="217.5,142.8 218.8,140.0 218.8,142.8" fill="#4f9463"/>
                                <polygon points="218.8,140.0 220.1,142.8 218.8,142.8" fill="#448657"/>
                                <rect x="242.2" y="143.4" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="241.2,143.6 242.5,140.8 242.5,143.6" fill="#4f9463"/>
                                <polygon points="242.5,140.8 243.8,143.6 242.5,143.6" fill="#448657"/>
                                <rect x="194.8" y="145.7" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="193.5,145.9 195.1,142.4 195.1,145.9" fill="#4f9463"/>
                                <polygon points="195.1,142.4 196.7,145.9 195.1,145.9" fill="#448657"/>
                                <rect x="206.7" y="154.1" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="205.4,154.3 207.0,150.8 207.0,154.3" fill="#4f9463"/>
                                <polygon points="207.0,150.8 208.6,154.3 207.0,154.3" fill="#448657"/>
                                <rect x="219.4" y="158.4" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="217.8,158.6 219.7,154.3 219.7,158.6" fill="#4f9463"/>
                                <polygon points="219.7,154.3 221.6,158.6 219.7,158.6" fill="#448657"/>
                                <rect x="164.4" y="162.9" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="162.8,163.1 164.7,158.8 164.7,163.1" fill="#4f9463"/>
                                <polygon points="164.7,158.8 166.6,163.1 164.7,163.1" fill="#448657"/>
                                <rect x="238.1" y="163.0" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="237.1,163.2 238.4,160.4 238.4,163.2" fill="#4f9463"/>
                                <polygon points="238.4,160.4 239.7,163.2 238.4,163.2" fill="#448657"/>
                                <rect x="246.9" y="163.5" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="245.6,163.7 247.2,160.2 247.2,163.7" fill="#4f9463"/>
                                <polygon points="247.2,160.2 248.8,163.7 247.2,163.7" fill="#448657"/>
                            </g>

                            <path d="M 220 180 L 316 69.6 Q 320 64 324 69.6 L 420 180 Z" fill="#9dbdd8"/>
                            <path d="M 320 65 Q 322 65 324 69.6 L 420 180 L 340 180 L 332 150 L 336 118 L 327 92 Z" fill="#83a6c4"/>
                            <path d="M 293.9 95 L 316 69.6 Q 320 64 324 69.6 L 346.1 95 L 340 91 L 334 100 L 327 92 L 320 99 L 313 90 L 306 98 L 300 91 Z" fill="#ffffff" opacity="0.95"/>
                            <path d="M 320 65 Q 322 65 324 69.6 L 346.1 95 L 340 91 L 334 100 L 327 92 Z" fill="#dbe7f0" opacity="0.95"/>
                            <!-- Pied verdoyant de la montagne : deux bandes vertes superposées -->
                            <g clip-path="url(#mountain-clip-2)">
                                <path d="M 200 144 Q 230 139 260 144 T 290 144 T 320 144 T 350 144 T 380 144 T 410 144 T 440 144 L 440 200 L 200 200 Z" fill="#4a8757" opacity="0.75"/>
                                <path d="M 210 157 Q 239 153 268 157 T 296 157 T 325 157 T 354 157 T 382 157 T 411 157 T 440 157 L 440 200 L 210 200 Z" fill="#2f6b45" opacity="0.85"/>
                            </g>
                            <!-- Sapins sur la pente de la montagne centrale : uniquement dans le tiers inférieur -->
                            <g id="decor-slope-firs-2">
                                <rect x="291.9" y="136.6" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="290.3,136.8 292.2,132.5 292.2,136.8" fill="#4f9463"/>
                                <polygon points="292.2,132.5 294.1,136.8 292.2,136.8" fill="#448657"/>
                                <rect x="283.1" y="137.0" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="281.5,137.2 283.4,132.9 283.4,137.2" fill="#4f9463"/>
                                <polygon points="283.4,132.9 285.3,137.2 283.4,137.2" fill="#448657"/>
                                <rect x="300.9" y="139.1" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="299.9,139.3 301.2,136.5 301.2,139.3" fill="#4f9463"/>
                                <polygon points="301.2,136.5 302.5,139.3 301.2,139.3" fill="#448657"/>
                                <rect x="287.3" y="141.5" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="285.7,141.7 287.6,137.4 287.6,141.7" fill="#4f9463"/>
                                <polygon points="287.6,137.4 289.5,141.7 287.6,141.7" fill="#448657"/>
                                <rect x="328.7" y="141.6" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="327.4,141.8 329.0,138.3 329.0,141.8" fill="#4f9463"/>
                                <polygon points="329.0,138.3 330.6,141.8 329.0,141.8" fill="#448657"/>
                                <rect x="310.8" y="145.3" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="309.8,145.5 311.1,142.7 311.1,145.5" fill="#4f9463"/>
                                <polygon points="311.1,142.7 312.4,145.5 311.1,145.5" fill="#448657"/>
                                <rect x="282.9" y="147.4" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="281.3,147.6 283.2,143.3 283.2,147.6" fill="#4f9463"/>
                                <polygon points="283.2,143.3 285.1,147.6 283.2,147.6" fill="#448657"/>
                                <rect x="327.5" y="154.0" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="326.2,154.2 327.8,150.7 327.8,154.2" fill="#4f9463"/>
                                <polygon points="327.8,150.7 329.4,154.2 327.8,154.2" fill="#448657"/>
                                <rect x="259.0" y="156.7" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="257.4,156.9 259.3,152.6 259.3,156.9" fill="#4f9463"/>
                                <polygon points="259.3,152.6 261.2,156.9 259.3,156.9" fill="#448657"/>
                                <rect x="249.5" y="159.7" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="248.2,159.9 249.8,156.4 249.8,159.9" fill="#4f9463"/>
                                <polygon points="249.8,156.4 251.4,159.9 249.8,159.9" fill="#448657"/>
                                <rect x="260.7" y="163.0" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="259.7,163.2 261.0,160.4 261.0,163.2" fill="#4f9463"/>
                                <polygon points="261.0,160.4 262.3,163.2 261.0,163.2" fill="#448657"/>
                            </g>
                            
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
                            <!-- Pied verdoyant de la montagne : deux bandes vertes superposées -->
                            <g clip-path="url(#mountain-clip-3)">
                                <path d="M 300 145 Q 332 140 365 145 T 398 145 T 430 145 T 462 145 T 495 145 T 528 145 T 560 145 L 560 200 L 300 200 Z" fill="#4a8757" opacity="0.75"/>
                                <path d="M 310 158 Q 341 154 372 158 T 404 158 T 435 158 T 466 158 T 498 158 T 529 158 T 560 158 L 560 200 L 310 200 Z" fill="#2f6b45" opacity="0.85"/>
                            </g>
                            <!-- Sapins sur la pente de la montagne de la Citadelle : uniquement dans le tiers inférieur -->
                            <g id="decor-slope-firs-3">
                                <rect x="400.6" y="136.0" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="399.0,136.2 400.9,131.9 400.9,136.2" fill="#4f9463"/>
                                <polygon points="400.9,131.9 402.8,136.2 400.9,136.2" fill="#448657"/>
                                <rect x="424.5" y="142.5" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="423.2,142.7 424.8,139.2 424.8,142.7" fill="#4f9463"/>
                                <polygon points="424.8,139.2 426.4,142.7 424.8,142.7" fill="#448657"/>
                                <rect x="369.9" y="147.5" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="368.9,147.7 370.2,144.9 370.2,147.7" fill="#4f9463"/>
                                <polygon points="370.2,144.9 371.5,147.7 370.2,147.7" fill="#448657"/>
                                <rect x="462.1" y="150.7" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="461.1,150.9 462.4,148.1 462.4,150.9" fill="#4f9463"/>
                                <polygon points="462.4,148.1 463.7,150.9 462.4,150.9" fill="#448657"/>
                                <rect x="386.7" y="152.9" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="385.4,153.1 387.0,149.6 387.0,153.1" fill="#4f9463"/>
                                <polygon points="387.0,149.6 388.6,153.1 387.0,153.1" fill="#448657"/>
                                <rect x="362.4" y="153.8" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="361.1,154.0 362.7,150.5 362.7,154.0" fill="#4f9463"/>
                                <polygon points="362.7,150.5 364.3,154.0 362.7,154.0" fill="#448657"/>
                                <rect x="493.4" y="154.6" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="492.1,154.8 493.7,151.3 493.7,154.8" fill="#4f9463"/>
                                <polygon points="493.7,151.3 495.3,154.8 493.7,154.8" fill="#448657"/>
                                <rect x="465.7" y="156.8" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="464.1,157.0 466.0,152.7 466.0,157.0" fill="#4f9463"/>
                                <polygon points="466.0,152.7 467.9,157.0 466.0,157.0" fill="#448657"/>
                                <rect x="390.0" y="157.7" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="388.7,157.9 390.3,154.4 390.3,157.9" fill="#4f9463"/>
                                <polygon points="390.3,154.4 391.9,157.9 390.3,157.9" fill="#448657"/>
                                <rect x="415.4" y="158.8" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="414.1,159.0 415.7,155.5 415.7,159.0" fill="#4f9463"/>
                                <polygon points="415.7,155.5 417.3,159.0 415.7,159.0" fill="#448657"/>
                                <rect x="484.2" y="159.2" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="482.9,159.4 484.5,155.9 484.5,159.4" fill="#4f9463"/>
                                <polygon points="484.5,155.9 486.1,159.4 484.5,159.4" fill="#448657"/>
                                <rect x="495.2" y="160.5" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="494.2,160.7 495.5,157.9 495.5,160.7" fill="#4f9463"/>
                                <polygon points="495.5,157.9 496.8,160.7 495.5,160.7" fill="#448657"/>
                                <rect x="373.2" y="163.1" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="371.9,163.3 373.5,159.8 373.5,163.3" fill="#4f9463"/>
                                <polygon points="373.5,159.8 375.1,163.3 373.5,163.3" fill="#448657"/>
                                <rect x="394.0" y="164.6" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="392.7,164.8 394.3,161.3 394.3,164.8" fill="#4f9463"/>
                                <polygon points="394.3,161.3 395.9,164.8 394.3,164.8" fill="#448657"/>
                            </g>

                            <!-- Dernière montagne : au premier plan, opaque et agrandie, seul son pied déborde à droite du cadre -->
                            <!-- NOTE: sommet hors cadre (x=600), même construction que la Citadelle, teintes plus soutenues que les chaînes lointaines -->
                            <g id="decor-foreground-mountain">
                                <path d="M 430 210 L 592 24 Q 600 16 608 24 L 770 210 Z" fill="#6f93ae"/>
                                <path d="M 600 16 Q 604 18 608 24 L 770 210 L 640 210 L 624 150 L 632 96 L 618 52 Z" fill="#587d99"/>
                            </g>

                            <!-- Pied verdoyant de la montagne : deux bandes vertes superposées -->
                            <g clip-path="url(#mountain-clip-4)">
                                <path d="M 420 146 Q 438 141 455 146 T 472 146 T 490 146 T 508 146 T 525 146 T 542 146 T 560 146 L 560 200 L 420 200 Z" fill="#4a8757" opacity="0.75"/>
                                <path d="M 430 159 Q 446 155 462 159 T 479 159 T 495 159 T 511 159 T 528 159 T 544 159 T 560 159 L 560 200 L 430 200 Z" fill="#2f6b45" opacity="0.85"/>
                            </g>
                            <!-- Sapins sur la pente de la montagne de premier plan : uniquement dans le tiers inférieur -->
                            <g id="decor-slope-firs-4">
                                <rect x="499.1" y="144.8" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="498.1,145.0 499.4,142.2 499.4,145.0" fill="#4f9463"/>
                                <polygon points="499.4,142.2 500.7,145.0 499.4,145.0" fill="#448657"/>
                                <rect x="510.0" y="148.4" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="509.0,148.6 510.3,145.8 510.3,148.6" fill="#4f9463"/>
                                <polygon points="510.3,145.8 511.6,148.6 510.3,148.6" fill="#448657"/>
                                <rect x="489.7" y="152.9" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="488.4,153.1 490.0,149.6 490.0,153.1" fill="#4f9463"/>
                                <polygon points="490.0,149.6 491.6,153.1 490.0,153.1" fill="#448657"/>
                                <rect x="502.9" y="155.2" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="501.9,155.4 503.2,152.6 503.2,155.4" fill="#4f9463"/>
                                <polygon points="503.2,152.6 504.5,155.4 503.2,155.4" fill="#448657"/>
                                <rect x="532.8" y="156.7" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="531.5,156.9 533.1,153.4 533.1,156.9" fill="#4f9463"/>
                                <polygon points="533.1,153.4 534.7,156.9 533.1,156.9" fill="#448657"/>
                                <rect x="515.5" y="159.5" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="514.2,159.7 515.8,156.2 515.8,159.7" fill="#4f9463"/>
                                <polygon points="515.8,156.2 517.4,159.7 515.8,159.7" fill="#448657"/>
                                <rect x="497.0" y="159.8" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="495.7,160.0 497.3,156.5 497.3,160.0" fill="#4f9463"/>
                                <polygon points="497.3,156.5 498.9,160.0 497.3,160.0" fill="#448657"/>
                                <rect x="478.2" y="161.4" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="476.9,161.6 478.5,158.1 478.5,161.6" fill="#4f9463"/>
                                <polygon points="478.5,158.1 480.1,161.6 478.5,161.6" fill="#448657"/>
                                <rect x="505.8" y="163.3" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="504.2,163.5 506.1,159.2 506.1,163.5" fill="#4f9463"/>
                                <polygon points="506.1,159.2 508.0,163.5 506.1,163.5" fill="#448657"/>
                                <rect x="493.6" y="169.9" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="492.3,170.1 493.9,166.6 493.9,170.1" fill="#4f9463"/>
                                <polygon points="493.9,166.6 495.5,170.1 493.9,170.1" fill="#448657"/>
                            </g>

                            <!-- Collines verdoyantes étagées au premier plan (Couvrent toute la largeur de -40 à 580 et jusqu'en bas Y=320) -->
                            <path d="M -40 175 Q 120 135 250 170 T 580 155 L 580 320 L -40 320 Z" fill="#6ba776"/>
                            <!-- Petits sapins au pied des montagnes (proportionnés à la distance, posés sur la ligne de la première colline) -->
                            <g id="decor-mini-firs">
                                <rect x="149.6" y="155.7" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="148.4,155.9 149.9,152.5 149.9,155.9" fill="#4f9463"/>
                                <polygon points="149.9,152.5 151.4,155.9 149.9,155.9" fill="#448657"/>
                                <rect x="156.8" y="155.5" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="154.9,155.7 157.1,150.5 157.1,155.7" fill="#4f9463"/>
                                <polygon points="157.1,150.5 159.3,155.7 157.1,155.7" fill="#448657"/>
                                <rect x="163.0" y="155.1" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="161.4,155.3 163.3,151.0 163.3,155.3" fill="#4f9463"/>
                                <polygon points="163.3,151.0 165.2,155.3 163.3,155.3" fill="#448657"/>
                                <rect x="167.8" y="157.2" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="165.9,157.4 168.1,152.2 168.1,157.4" fill="#4f9463"/>
                                <polygon points="168.1,152.2 170.3,157.4 168.1,157.4" fill="#448657"/>
                                <rect x="203.4" y="161.8" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="201.8,162.0 203.7,157.7 203.7,162.0" fill="#4f9463"/>
                                <polygon points="203.7,157.7 205.6,162.0 203.7,162.0" fill="#448657"/>
                                <rect x="208.4" y="160.7" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="206.5,160.9 208.7,155.7 208.7,160.9" fill="#4f9463"/>
                                <polygon points="208.7,155.7 210.9,160.9 208.7,160.9" fill="#448657"/>
                                <rect x="215.4" y="163.5" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="213.5,163.7 215.7,158.5 215.7,163.7" fill="#4f9463"/>
                                <polygon points="215.7,158.5 217.9,163.7 215.7,163.7" fill="#448657"/>
                                <rect x="220.2" y="164.1" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="219.0,164.3 220.5,160.9 220.5,164.3" fill="#4f9463"/>
                                <polygon points="220.5,160.9 222.0,164.3 220.5,164.3" fill="#448657"/>
                                <rect x="245.0" y="168.8" width="0.8" height="1.7" fill="#6d4c41"/>
                                <polygon points="242.3,169.1 245.4,161.8 245.4,169.1" fill="#4f9463"/>
                                <polygon points="245.4,161.8 248.5,169.1 245.4,169.1" fill="#448657"/>
                                <rect x="276.0" y="179.4" width="0.8" height="1.7" fill="#6d4c41"/>
                                <polygon points="274.3,179.7 276.4,174.9 276.4,179.7" fill="#4f9463"/>
                                <polygon points="276.4,174.9 278.5,179.7 276.4,179.7" fill="#448657"/>
                                <rect x="317.1" y="183.0" width="0.8" height="1.7" fill="#6d4c41"/>
                                <polygon points="315.4,183.3 317.5,178.5 317.5,183.3" fill="#4f9463"/>
                                <polygon points="317.5,178.5 319.6,183.3 317.5,183.3" fill="#448657"/>
                                <rect x="352.7" y="185.2" width="0.8" height="1.7" fill="#6d4c41"/>
                                <polygon points="350.0,185.5 353.1,178.2 353.1,185.5" fill="#4f9463"/>
                                <polygon points="353.1,178.2 356.2,185.5 353.1,185.5" fill="#448657"/>
                                <rect x="360.9" y="186.1" width="0.8" height="1.7" fill="#6d4c41"/>
                                <polygon points="359.2,186.4 361.3,181.6 361.3,186.4" fill="#4f9463"/>
                                <polygon points="361.3,181.6 363.4,186.4 361.3,186.4" fill="#448657"/>
                                <rect x="365.4" y="185.4" width="0.8" height="1.7" fill="#6d4c41"/>
                                <polygon points="362.7,185.7 365.8,178.4 365.8,185.7" fill="#4f9463"/>
                                <polygon points="365.8,178.4 368.9,185.7 365.8,185.7" fill="#448657"/>
                                <rect x="370.5" y="186.6" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="369.3,186.8 370.8,183.4 370.8,186.8" fill="#4f9463"/>
                                <polygon points="370.8,183.4 372.3,186.8 370.8,186.8" fill="#448657"/>
                                <rect x="376.8" y="184.0" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="375.2,184.2 377.1,179.9 377.1,184.2" fill="#4f9463"/>
                                <polygon points="377.1,179.9 379.0,184.2 377.1,184.2" fill="#448657"/>
                                <rect x="382.5" y="184.7" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="380.6,184.9 382.8,179.7 382.8,184.9" fill="#4f9463"/>
                                <polygon points="382.8,179.7 385.0,184.9 382.8,184.9" fill="#448657"/>
                                <rect x="396.5" y="184.7" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="394.9,184.9 396.8,180.6 396.8,184.9" fill="#4f9463"/>
                                <polygon points="396.8,180.6 398.7,184.9 396.8,184.9" fill="#448657"/>
                                <rect x="406.8" y="183.3" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="405.6,183.5 407.1,180.1 407.1,183.5" fill="#4f9463"/>
                                <polygon points="407.1,180.1 408.6,183.5 407.1,183.5" fill="#448657"/>
                                <rect x="413.2" y="184.0" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="411.3,184.2 413.5,179.0 413.5,184.2" fill="#4f9463"/>
                                <polygon points="413.5,179.0 415.7,184.2 413.5,184.2" fill="#448657"/>
                                <rect x="425.2" y="184.6" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="423.3,184.8 425.5,179.6 425.5,184.8" fill="#4f9463"/>
                                <polygon points="425.5,179.6 427.7,184.8 425.5,184.8" fill="#448657"/>
                                <rect x="456.0" y="178.2" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="454.4,178.4 456.3,174.1 456.3,178.4" fill="#4f9463"/>
                                <polygon points="456.3,174.1 458.2,178.4 456.3,178.4" fill="#448657"/>
                                <rect x="461.1" y="179.2" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="459.9,179.4 461.4,176.0 461.4,179.4" fill="#4f9463"/>
                                <polygon points="461.4,176.0 462.9,179.4 461.4,179.4" fill="#448657"/>
                                <rect x="467.7" y="179.8" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="465.8,180.0 468.0,174.8 468.0,180.0" fill="#4f9463"/>
                                <polygon points="468.0,174.8 470.2,180.0 468.0,180.0" fill="#448657"/>
                                <rect x="472.7" y="179.0" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="471.1,179.2 473.0,174.9 473.0,179.2" fill="#4f9463"/>
                                <polygon points="473.0,174.9 474.9,179.2 473.0,179.2" fill="#448657"/>
                                <rect x="509.3" y="171.9" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="507.4,172.1 509.6,166.9 509.6,172.1" fill="#4f9463"/>
                                <polygon points="509.6,166.9 511.8,172.1 509.6,172.1" fill="#448657"/>
                                <rect x="514.8" y="172.6" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="513.6,172.8 515.1,169.4 515.1,172.8" fill="#4f9463"/>
                                <polygon points="515.1,169.4 516.6,172.8 515.1,172.8" fill="#448657"/>
                                <rect x="532.3" y="167.9" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="530.4,168.1 532.6,162.9 532.6,168.1" fill="#4f9463"/>
                                <polygon points="532.6,162.9 534.8,168.1 532.6,168.1" fill="#448657"/>
                                <rect x="185.7" y="158.0" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="183.8,158.2 186,153.0 186,158.2" fill="#4f9463"/>
                                <polygon points="186,153.0 188.2,158.2 186,158.2" fill="#448657"/>
                                <rect x="191.7" y="158.8" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="190.2,159.0 192,155.0 192,159.0" fill="#4f9463"/>
                                <polygon points="192,155.0 193.8,159.0 192,159.0" fill="#448657"/>
                                <rect x="198.7" y="159.8" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="197.0,160.0 199,155.4 199,160.0" fill="#4f9463"/>
                                <polygon points="199,155.4 201.0,160.0 199,160.0" fill="#448657"/>
                                <rect x="225.7" y="164.7" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="223.8,164.9 226,159.7 226,164.9" fill="#4f9463"/>
                                <polygon points="226,159.7 228.2,164.9 226,164.9" fill="#448657"/>
                                <rect x="232.7" y="166.3" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="231.2,166.5 233,162.5 233,166.5" fill="#4f9463"/>
                                <polygon points="233,162.5 234.8,166.5 233,166.5" fill="#448657"/>
                                <rect x="240.6" y="168.1" width="0.8" height="1.7" fill="#6d4c41"/>
                                <polygon points="238.2,168.4 241.0,161.9 241.0,168.4" fill="#4f9463"/>
                                <polygon points="241.0,161.9 243.8,168.4 241.0,168.4" fill="#448657"/>
                                <rect x="325.6" y="183.3" width="0.8" height="1.7" fill="#6d4c41"/>
                                <polygon points="322.9,183.6 326.0,176.3 326.0,183.6" fill="#4f9463"/>
                                <polygon points="326.0,176.3 329.1,183.6 326.0,183.6" fill="#448657"/>
                                <rect x="332.6" y="183.8" width="0.8" height="1.7" fill="#6d4c41"/>
                                <polygon points="330.5,184.1 333.0,178.5 333.0,184.1" fill="#4f9463"/>
                                <polygon points="333.0,178.5 335.5,184.1 333.0,184.1" fill="#448657"/>
                                <rect x="340.6" y="184.2" width="0.8" height="1.7" fill="#6d4c41"/>
                                <polygon points="338.2,184.5 341.0,178.0 341.0,184.5" fill="#4f9463"/>
                                <polygon points="341.0,178.0 343.8,184.5 341.0,184.5" fill="#448657"/>
                                <rect x="348.6" y="184.6" width="0.8" height="1.7" fill="#6d4c41"/>
                                <polygon points="345.9,184.9 349.0,177.6 349.0,184.9" fill="#4f9463"/>
                                <polygon points="349.0,177.6 352.1,184.9 349.0,184.9" fill="#448657"/>
                                <rect x="431.7" y="181.8" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="430.2,182.0 432,178.0 432,182.0" fill="#4f9463"/>
                                <polygon points="432,178.0 433.8,182.0 432,182.0" fill="#448657"/>
                                <rect x="438.7" y="181.1" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="437.0,181.3 439,176.7 439,181.3" fill="#4f9463"/>
                                <polygon points="439,176.7 441.0,181.3 439,181.3" fill="#448657"/>
                                <rect x="446.7" y="180.3" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="444.8,180.5 447,175.3 447,180.5" fill="#4f9463"/>
                                <polygon points="447,175.3 449.2,180.5 447,180.5" fill="#448657"/>
                                <rect x="479.7" y="175.9" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="478.2,176.1 480,172.1 480,176.1" fill="#4f9463"/>
                                <polygon points="480,172.1 481.8,176.1 480,176.1" fill="#448657"/>
                                <rect x="486.7" y="174.8" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="485.0,175.0 487,170.4 487,175.0" fill="#4f9463"/>
                                <polygon points="487,170.4 489.0,175.0 487,175.0" fill="#448657"/>
                                <rect x="494.7" y="173.4" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="492.8,173.6 495,168.4 495,173.6" fill="#4f9463"/>
                                <polygon points="495,168.4 497.2,173.6 495,173.6" fill="#448657"/>
                                <rect x="502.7" y="172.1" width="0.6" height="1.2" fill="#6d4c41"/>
                                <polygon points="501.2,172.3 503,168.3 503,172.3" fill="#4f9463"/>
                                <polygon points="503,168.3 504.8,172.3 503,172.3" fill="#448657"/>
                            </g>

                            <path d="M -40 205 Q 150 155 310 195 T 580 185 L 580 320 L -40 320 Z" fill="#599965"/>
                            <path d="M -40 235 Q 180 205 350 230 T 580 220 L 580 320 L -40 320 Z" fill="#4a8757"/>

                            <!-- Décor : Lac alpin (flat design : rive claire, eau en deux profondeurs, reflets en traits arrondis) -->
                            <g id="decor-lake">
                                <g transform="matrix(0.85, 0, 0, -0.7, -14.45, 374.5)">
                                <!-- Rive -->
                                <path d="M 243 204 C 268 189, 336 187, 387 197 C 403 208, 392 228, 350 231.5 C 294 235.5, 253 225, 243 204 Z" fill="#7fb97a"/>
                                <!-- Eau -->
                                <path d="M 248 206 C 272 193, 332 191, 380 200 C 394 209, 384 223, 347 227 C 298 231, 258 221, 248 206 Z" fill="#4fb3e0"/>
                                <path d="M 263 207.5 C 284 198, 330 197, 368 203.5 C 379 210, 370 219.5, 342 222 C 302 225.5, 271 218, 263 207.5 Z" fill="#3a9fd0"/>
                                <!-- Bande claire le long de la rive du fond -->
                                <path d="M 256 202 C 280 194.5, 330 193, 374 199.5 C 336 196.5, 286 197.5, 256 202 Z" fill="#8fd6f2"/>
                                <!-- Remous : ellipses qui s'élargissent en s'effaçant -->
                                <g fill="none" stroke="#ffffff" stroke-width="0.7">
                                    <ellipse class="lake-ripple lake-ripple-1" cx="300" cy="209" rx="9" ry="2"/>
                                    <ellipse class="lake-ripple lake-ripple-2" cx="335" cy="213" rx="10" ry="2.2"/>
                                    <ellipse class="lake-ripple lake-ripple-3" cx="355" cy="203" rx="8" ry="1.8"/>
                                </g>
                                <!-- Nénuphars -->
                                <path d="M 360 214 L 363 213 A 3 3 0 1 1 362.6 215.6 Z" fill="#5aa65e"/>
                                <circle cx="359" cy="213.2" r="1" fill="#f48fb1"/>
                                <path d="M 270 215 L 272.3 214.4 A 2.4 2.4 0 1 1 272 216.4 Z" fill="#5aa65e"/>
                                </g>
                                <!-- Roseaux -->
                                <g>
                                    <line x1="200.6" y1="226.1" x2="200.2" y2="216.1" stroke="#3f7f4c" stroke-width="0.8" stroke-linecap="round"/>
                                    <ellipse cx="200.2" cy="217.7" rx="0.9" ry="2" fill="#8d6e63"/>
                                    <line x1="203.6" y1="225.4" x2="204.4" y2="211.9" stroke="#3f7f4c" stroke-width="0.8" stroke-linecap="round"/>
                                    <ellipse cx="204.4" cy="213.5" rx="0.9" ry="2" fill="#8d6e63"/>
                                    <line x1="206.6" y1="225.8" x2="207.8" y2="216.8" stroke="#3f7f4c" stroke-width="0.8" stroke-linecap="round"/>
                                    <ellipse cx="207.8" cy="218.4" rx="0.9" ry="2" fill="#8d6e63"/>
                                    <line x1="311.1" y1="219.8" x2="310.7" y2="210.8" stroke="#3f7f4c" stroke-width="0.8" stroke-linecap="round"/>
                                    <ellipse cx="310.7" cy="212.4" rx="0.9" ry="2" fill="#8d6e63"/>
                                    <line x1="314.1" y1="221.2" x2="314.9" y2="211.2" stroke="#3f7f4c" stroke-width="0.8" stroke-linecap="round"/>
                                    <ellipse cx="314.9" cy="212.8" rx="0.9" ry="2" fill="#8d6e63"/>
                                </g>
                                <!-- Galets -->
                                <ellipse cx="320.5" cy="227" rx="2.6" ry="1.5" fill="#b0bec5"/>
                                <ellipse cx="324" cy="225.5" rx="1.8" ry="1.1" fill="#90a4ae"/>
                                <ellipse cx="197" cy="233" rx="2" ry="1.2" fill="#b0bec5"/>
                            </g>

                            <!-- Décor : Forêt enchantée (flat design, deux rangs pour la profondeur) -->
                            <g id="decor-forest">
                                <!-- Rang du fond -->
                                <rect x="135" y="163" width="2" height="3" fill="#6d4c41"/>
                                <polygon points="130.5,163 136,155.9 136,163" fill="#4f9463"/>
                                <polygon points="136,155.9 141.5,163 136,163" fill="#448657"/>
                                <polygon points="131.71,158.2 136,151.4 136,158.2" fill="#4f9463"/>
                                <polygon points="136,151.4 140.29,158.2 136,158.2" fill="#448657"/>
                                <polygon points="132.975,154.2 136,146 136,154.2" fill="#4f9463"/>
                                <polygon points="136,146 139.025,154.2 136,154.2" fill="#448657"/>
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
                                    <ellipse cx="128" cy="179.5" rx="10" ry="2.2"/>
                                    <ellipse cx="143" cy="180.5" rx="7.5" ry="2"/>
                                    <ellipse cx="158" cy="181.5" rx="8" ry="1.8"/>
                                </g>
                                <!-- Rang de devant -->
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

                            <!-- Forêt à droite du lac : trois profondeurs (fond clair et petit, devant sombre et grand) -->
                            <g id="decor-forest-lake">
                                <rect x="437.7" y="200.3" width="2.4" height="4.5" fill="#6d4c41"/>
                                <circle cx="438.9" cy="195.4" r="5.8" fill="#7cb987"/>
                                <path d="M 438.9 189.6 A 5.8 5.8 0 0 1 438.9 201.1 Z" fill="#6aa977"/>
                                <rect x="481.4" y="201.3" width="2.4" height="4.7" fill="#6d4c41"/>
                                <circle cx="482.6" cy="196.3" r="6.0" fill="#7cb987"/>
                                <path d="M 482.6 190.3 A 6.0 6.0 0 0 1 482.6 202.2 Z" fill="#6aa977"/>
                                <rect x="470.5" y="203.7" width="2.4" height="4.3" fill="#6d4c41"/>
                                <circle cx="471.7" cy="199.0" r="5.5" fill="#7cb987"/>
                                <path d="M 471.7 193.5 A 5.5 5.5 0 0 1 471.7 204.5 Z" fill="#6aa977"/>
                                <rect x="431.4" y="207.7" width="2" height="2.6" fill="#6d4c41"/>
                                <polygon points="426.0,207.7 432.4,199.1 432.4,207.7" fill="#4f9463"/>
                                <polygon points="432.4,199.1 438.8,207.7 432.4,207.7" fill="#448657"/>
                                <polygon points="427.4,204.1 432.4,197.2 432.4,204.1" fill="#4f9463"/>
                                <polygon points="432.4,197.2 437.4,204.1 432.4,204.1" fill="#448657"/>
                                <polygon points="428.9,200.8 432.4,195.7 432.4,200.8" fill="#4f9463"/>
                                <polygon points="432.4,195.7 435.9,200.8 432.4,200.8" fill="#448657"/>
                                <rect x="507.4" y="210.5" width="2" height="2.5" fill="#6d4c41"/>
                                <polygon points="502.1,210.5 508.4,202.0 508.4,210.5" fill="#4f9463"/>
                                <polygon points="508.4,202.0 514.7,210.5 508.4,210.5" fill="#448657"/>
                                <polygon points="503.5,206.9 508.4,200.1 508.4,206.9" fill="#4f9463"/>
                                <polygon points="508.4,200.1 513.3,206.9 508.4,206.9" fill="#448657"/>
                                <polygon points="504.9,203.6 508.4,198.5 508.4,203.6" fill="#4f9463"/>
                                <polygon points="508.4,198.5 511.9,203.6 508.4,203.6" fill="#448657"/>
                                <rect x="471.6" y="210.8" width="2" height="2.4" fill="#6d4c41"/>
                                <polygon points="466.8,210.8 472.6,203.0 472.6,210.8" fill="#4f9463"/>
                                <polygon points="472.6,203.0 478.4,210.8 472.6,210.8" fill="#448657"/>
                                <polygon points="468.1,207.6 472.6,201.3 472.6,207.6" fill="#4f9463"/>
                                <polygon points="472.6,201.3 477.1,207.6 472.6,207.6" fill="#448657"/>
                                <polygon points="469.4,204.5 472.6,199.8 472.6,204.5" fill="#4f9463"/>
                                <polygon points="472.6,199.8 475.8,204.5 472.6,204.5" fill="#448657"/>
                                <rect x="459.8" y="215.8" width="2" height="2.9" fill="#6d4c41"/>
                                <polygon points="453.6,215.8 460.8,206.0 460.8,215.8" fill="#3a8a4a"/>
                                <polygon points="460.8,206.0 468.0,215.8 460.8,215.8" fill="#307a3f"/>
                                <polygon points="455.1,211.7 460.8,203.9 460.8,211.7" fill="#3a8a4a"/>
                                <polygon points="460.8,203.9 466.5,211.7 460.8,211.7" fill="#307a3f"/>
                                <polygon points="456.8,207.9 460.8,202.1 460.8,207.9" fill="#3a8a4a"/>
                                <polygon points="460.8,202.1 464.8,207.9 460.8,207.9" fill="#307a3f"/>
                                <rect x="526.8" y="214.1" width="2.4" height="4.7" fill="#6d4c41"/>
                                <circle cx="528.0" cy="209.0" r="6.0" fill="#5cb85c"/>
                                <path d="M 528.0 203.0 A 6.0 6.0 0 0 1 528.0 215.0 Z" fill="#4aa550"/>
                                <rect x="409.4" y="216.1" width="2" height="2.9" fill="#6d4c41"/>
                                <polygon points="403.3,216.1 410.4,206.5 410.4,216.1" fill="#3a8a4a"/>
                                <polygon points="410.4,206.5 417.5,216.1 410.4,216.1" fill="#307a3f"/>
                                <polygon points="404.8,212.1 410.4,204.4 410.4,212.1" fill="#3a8a4a"/>
                                <polygon points="410.4,204.4 416.0,212.1 410.4,212.1" fill="#307a3f"/>
                                <polygon points="406.5,208.4 410.4,202.6 410.4,208.4" fill="#3a8a4a"/>
                                <polygon points="410.4,202.6 414.3,208.4 410.4,208.4" fill="#307a3f"/>
                                <rect x="505.4" y="216.2" width="2" height="2.9" fill="#6d4c41"/>
                                <polygon points="499.2,216.2 506.4,206.5 506.4,216.2" fill="#3a8a4a"/>
                                <polygon points="506.4,206.5 513.6,216.2 506.4,216.2" fill="#307a3f"/>
                                <polygon points="500.8,212.1 506.4,204.4 506.4,212.1" fill="#3a8a4a"/>
                                <polygon points="506.4,204.4 512.0,212.1 506.4,212.1" fill="#307a3f"/>
                                <polygon points="502.4,208.4 506.4,202.6 506.4,208.4" fill="#3a8a4a"/>
                                <polygon points="506.4,202.6 510.4,208.4 506.4,208.4" fill="#307a3f"/>
                                <rect x="424.2" y="220.8" width="2" height="2.7" fill="#6d4c41"/>
                                <polygon points="418.7,220.8 425.2,212.0 425.2,220.8" fill="#3a8a4a"/>
                                <polygon points="425.2,212.0 431.7,220.8 425.2,220.8" fill="#307a3f"/>
                                <polygon points="420.1,217.1 425.2,210.1 425.2,217.1" fill="#3a8a4a"/>
                                <polygon points="425.2,210.1 430.3,217.1 425.2,217.1" fill="#307a3f"/>
                                <polygon points="421.6,213.7 425.2,208.4 425.2,213.7" fill="#3a8a4a"/>
                                <polygon points="425.2,208.4 428.8,213.7 425.2,213.7" fill="#307a3f"/>
                                <rect x="487.7" y="220.9" width="2" height="2.7" fill="#6d4c41"/>
                                <polygon points="482.0,220.9 488.7,211.8 488.7,220.9" fill="#3a8a4a"/>
                                <polygon points="488.7,211.8 495.4,220.9 488.7,220.9" fill="#307a3f"/>
                                <polygon points="483.4,217.1 488.7,209.8 488.7,217.1" fill="#3a8a4a"/>
                                <polygon points="488.7,209.8 494.0,217.1 488.7,217.1" fill="#307a3f"/>
                                <polygon points="485.0,213.6 488.7,208.1 488.7,213.6" fill="#3a8a4a"/>
                                <polygon points="488.7,208.1 492.4,213.6 488.7,213.6" fill="#307a3f"/>
                                <rect x="451.5" y="221.2" width="2" height="2.6" fill="#6d4c41"/>
                                <polygon points="446.2,221.2 452.5,212.7 452.5,221.2" fill="#3a8a4a"/>
                                <polygon points="452.5,212.7 458.8,221.2 452.5,221.2" fill="#307a3f"/>
                                <polygon points="447.5,217.6 452.5,210.8 452.5,217.6" fill="#3a8a4a"/>
                                <polygon points="452.5,210.8 457.5,217.6 452.5,217.6" fill="#307a3f"/>
                                <polygon points="449.0,214.3 452.5,209.2 452.5,214.3" fill="#3a8a4a"/>
                                <polygon points="452.5,209.2 456.0,214.3 452.5,214.3" fill="#307a3f"/>
                                <rect x="509.0" y="219.6" width="2.4" height="5.4" fill="#6d4c41"/>
                                <circle cx="510.2" cy="213.8" r="6.9" fill="#5cb85c"/>
                                <path d="M 510.2 206.9 A 6.9 6.9 0 0 1 510.2 220.6 Z" fill="#4aa550"/>
                                <rect x="465.2" y="223.8" width="2" height="2.9" fill="#6d4c41"/>
                                <polygon points="459.1,223.8 466.2,214.3 466.2,223.8" fill="#3a8a4a"/>
                                <polygon points="466.2,214.3 473.3,223.8 466.2,223.8" fill="#307a3f"/>
                                <polygon points="460.7,219.8 466.2,212.2 466.2,219.8" fill="#3a8a4a"/>
                                <polygon points="466.2,212.2 471.7,219.8 466.2,219.8" fill="#307a3f"/>
                                <polygon points="462.3,216.1 466.2,210.4 466.2,216.1" fill="#3a8a4a"/>
                                <polygon points="466.2,210.4 470.1,216.1 466.2,216.1" fill="#307a3f"/>
                                <rect x="429.3" y="227.2" width="2.4" height="5.5" fill="#6d4c41"/>
                                <circle cx="430.5" cy="221.2" r="7.1" fill="#4caf50"/>
                                <path d="M 430.5 214.1 A 7.1 7.1 0 0 1 430.5 228.2 Z" fill="#3f9a45"/>
                                <rect x="480.8" y="228.6" width="2.4" height="5.8" fill="#6d4c41"/>
                                <circle cx="482.0" cy="222.3" r="7.4" fill="#4caf50"/>
                                <path d="M 482.0 214.9 A 7.4 7.4 0 0 1 482.0 229.7 Z" fill="#3f9a45"/>
                                <rect x="532.7" y="231.9" width="2" height="2.9" fill="#6d4c41"/>
                                <polygon points="526.5,231.9 533.7,222.2 533.7,231.9" fill="#2e7d32"/>
                                <polygon points="533.7,222.2 540.9,231.9 533.7,231.9" fill="#256b29"/>
                                <polygon points="528.1,227.8 533.7,220.0 533.7,227.8" fill="#2e7d32"/>
                                <polygon points="533.7,220.0 539.3,227.8 533.7,227.8" fill="#256b29"/>
                                <polygon points="529.7,224.1 533.7,218.2 533.7,224.1" fill="#2e7d32"/>
                                <polygon points="533.7,218.2 537.7,224.1 533.7,224.1" fill="#256b29"/>
                                <rect x="502.4" y="229.7" width="2.4" height="6.1" fill="#6d4c41"/>
                                <circle cx="503.6" cy="223.1" r="7.7" fill="#4caf50"/>
                                <path d="M 503.6 215.4 A 7.7 7.7 0 0 1 503.6 230.9 Z" fill="#3f9a45"/>
                                <rect x="416.9" y="231.9" width="2.4" height="6.1" fill="#6d4c41"/>
                                <circle cx="418.1" cy="225.2" r="7.8" fill="#4caf50"/>
                                <path d="M 418.1 217.4 A 7.8 7.8 0 0 1 418.1 233.0 Z" fill="#3f9a45"/>
                                <rect x="428.2" y="235.1" width="2" height="3.1" fill="#6d4c41"/>
                                <polygon points="421.5,235.1 429.2,224.7 429.2,235.1" fill="#2e7d32"/>
                                <polygon points="429.2,224.7 436.9,235.1 429.2,235.1" fill="#256b29"/>
                                <polygon points="423.2,230.7 429.2,222.4 429.2,230.7" fill="#2e7d32"/>
                                <polygon points="429.2,222.4 435.2,230.7 429.2,230.7" fill="#256b29"/>
                                <polygon points="424.9,226.7 429.2,220.5 429.2,226.7" fill="#2e7d32"/>
                                <polygon points="429.2,220.5 433.5,226.7 429.2,226.7" fill="#256b29"/>
                                <rect x="529.1" y="238.1" width="2" height="3.3" fill="#6d4c41"/>
                                <polygon points="521.9,238.1 530.1,227.0 530.1,238.1" fill="#2e7d32"/>
                                <polygon points="530.1,227.0 538.3,238.1 530.1,238.1" fill="#256b29"/>
                                <polygon points="523.7,233.4 530.1,224.5 530.1,233.4" fill="#2e7d32"/>
                                <polygon points="530.1,224.5 536.5,233.4 530.1,233.4" fill="#256b29"/>
                                <polygon points="525.6,229.1 530.1,222.5 530.1,229.1" fill="#2e7d32"/>
                                <polygon points="530.1,222.5 534.6,229.1 530.1,229.1" fill="#256b29"/>
                                <rect x="452.2" y="239.7" width="2" height="3.2" fill="#6d4c41"/>
                                <polygon points="445.4,239.7 453.2,229.2 453.2,239.7" fill="#2e7d32"/>
                                <polygon points="453.2,229.2 461.0,239.7 453.2,239.7" fill="#256b29"/>
                                <polygon points="447.1,235.3 453.2,226.9 453.2,235.3" fill="#2e7d32"/>
                                <polygon points="453.2,226.9 459.3,235.3 453.2,235.3" fill="#256b29"/>
                                <polygon points="448.9,231.2 453.2,224.9 453.2,231.2" fill="#2e7d32"/>
                                <polygon points="453.2,224.9 457.5,231.2 453.2,231.2" fill="#256b29"/>
                                <rect x="498.0" y="242.4" width="2" height="3.3" fill="#6d4c41"/>
                                <polygon points="490.9,242.4 499.0,231.5 499.0,242.4" fill="#2e7d32"/>
                                <polygon points="499.0,231.5 507.1,242.4 499.0,242.4" fill="#256b29"/>
                                <polygon points="492.6,237.8 499.0,229.1 499.0,237.8" fill="#2e7d32"/>
                                <polygon points="499.0,229.1 505.4,237.8 499.0,237.8" fill="#256b29"/>
                                <polygon points="494.5,233.6 499.0,227.0 499.0,233.6" fill="#2e7d32"/>
                                <polygon points="499.0,227.0 503.5,233.6 499.0,233.6" fill="#256b29"/>
                            </g>

                            <!-- Décor : Village de départ (flat design : aplats sans contours, volumes en deux tons) -->
                            <g id="decor-village" transform="translate(12, 36)">
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

                                <!-- Place du village : pavage clair autour du puits -->
                                <ellipse cx="27" cy="214" rx="17" ry="6" fill="#efe0c6"/>
                                <ellipse cx="29" cy="215" rx="12" ry="4.2" fill="#e6d3b3"/>

                                <!-- Maisons de profil sur la gauche, tournées vers la place -->
                                <!-- Maison 2 : chaumière de profil (haut), pignon à gauche, long pan fuyant vers la place -->
                                <g transform="translate(-19, 187)">
                                    <polygon points="4.5,9 24,8 24,19 4.5,20" fill="#fdf1e0"/>
                                    <polygon points="0,8.5 4.5,9 4.5,20 0,21.5" fill="#e6d2b8"/>
                                    <polygon points="2,2.5 20,0 24,8 4.5,9" fill="#3d6c8e"/>
                                    <polygon points="-1.5,8.8 2,2.5 5,9.2" fill="#4f83a8"/>
                                    <rect x="8" y="12" width="4" height="3.4" rx="0.5" fill="#ffd54f"/>
                                    <rect x="15" y="11.8" width="4" height="3.4" rx="0.5" fill="#ffd54f"/>
                                </g>

                                <!-- Maison 3 : maison de profil (bas) -->
                                <g transform="translate(-25, 207) scale(1.6)">
                                    <polygon points="4.5,9 24,8 24,19 4.5,20" fill="#f8ead6"/>
                                    <polygon points="0,8.5 4.5,9 4.5,20 0,21.5" fill="#e3cfb3"/>
                                    <polygon points="2,2.5 20,0 24,8 4.5,9" fill="#3a857e"/>
                                    <polygon points="-1.5,8.8 2,2.5 5,9.2" fill="#489e96"/>
                                    <rect x="8" y="12" width="4" height="3.4" rx="0.5" fill="#ffd54f"/>
                                    <rect x="15" y="11.8" width="4" height="3.4" rx="0.5" fill="#ffd54f"/>
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
                            <!-- Décor : cascade qui part du haut de la montagne et passe derrière la route (dessinée avant le ruban), au pied de laquelle le checkpoint 70 la surplombe à gauche -->
                            <!-- NOTE: animation CSS (.waterfall-drop et .waterfall-bubble dans main.css) ; origine = point de départ de la chute -->
                            <g id="decor-waterfall" transform="translate(387, 106)">
                                <path d="M -0.7 6 L 0.7 6 L 3.6 45 L -3.6 45 Z" fill="#dff1fb" opacity="0.4"/>
                                <!-- Départ de la chute : trait en fuseau -->
                                <path d="M 0 -4 Q 1.7 4 0 14 Q -1.7 4 0 -4 Z" fill="#ffffff" opacity="0.75"/>
                                <g stroke="#ffffff" stroke-width="0.7" stroke-linecap="round" fill="none">
                                    <line class="waterfall-drop" x1="-0.4" y1="2" x2="-0.4" y2="5"/>
                                    <line class="waterfall-drop waterfall-delay-2" x1="0.7" y1="8" x2="0.7" y2="10.4"/>
                                    <line class="waterfall-drop waterfall-delay-3" x1="-1.1" y1="14" x2="-1.1" y2="17.4"/>
                                    <line class="waterfall-drop waterfall-delay-4" x1="1.9" y1="20" x2="1.9" y2="22.6"/>
                                    <line class="waterfall-drop waterfall-delay-5" x1="-2.9" y1="26" x2="-2.9" y2="29"/>
                                    <line class="waterfall-drop waterfall-delay-6" x1="3.3" y1="32" x2="3.3" y2="34.4"/>
                                    <line class="waterfall-drop waterfall-delay-7" x1="-1.7" y1="38" x2="-1.7" y2="41"/>
                                </g>
                                <!-- Effervescence au pied : petits cercles qui se dilatent en s'effaçant -->
                                <g fill="none" stroke="#ffffff" stroke-width="0.4">
                                    <circle class="waterfall-bubble" cx="-2.6" cy="45.6" r="1.1"/>
                                    <circle class="waterfall-bubble waterfall-bubble-2" cx="0.4" cy="46.2" r="1.3"/>
                                    <circle class="waterfall-bubble waterfall-bubble-3" cx="2.9" cy="45.5" r="1"/>
                                    <circle class="waterfall-bubble waterfall-bubble-4" cx="-1" cy="45" r="0.8"/>
                                    <circle class="waterfall-bubble waterfall-bubble-5" cx="1.6" cy="46.5" r="0.9"/>
                                </g>
                            </g>

                            <use href="#roadmap-trail-ribbon" fill="#dcc08f"/>

                            <!-- Forêt entre les jalons 10 et 20 : les arbres du bas sont légèrement plus grands que ceux du haut (avant-plan : dessinée après le ruban, la forêt passe devant la route) -->
                            <g id="decor-forest-road" transform="translate(6, 5)">
                                <rect x="153.8" y="188.3" width="2" height="2.4" fill="#6d4c41"/>
                                <polygon points="148.9,188.3 154.8,180.3 154.8,188.3" fill="#3a8a4a"/>
                                <polygon points="154.8,180.3 160.8,188.3 154.8,188.3" fill="#307a3f"/>
                                <polygon points="150.2,185.0 154.8,178.6 154.8,185.0" fill="#3a8a4a"/>
                                <polygon points="154.8,178.6 159.5,185.0 154.8,185.0" fill="#307a3f"/>
                                <polygon points="151.6,181.9 154.8,177.1 154.8,181.9" fill="#3a8a4a"/>
                                <polygon points="154.8,177.1 158.1,181.9 154.8,181.9" fill="#307a3f"/>
                                <rect x="127.0" y="189.3" width="2" height="2.4" fill="#6d4c41"/>
                                <polygon points="122.1,189.3 128.0,181.3 128.0,189.3" fill="#3a8a4a"/>
                                <polygon points="128.0,181.3 133.9,189.3 128.0,189.3" fill="#307a3f"/>
                                <polygon points="123.3,186.0 128.0,179.6 128.0,186.0" fill="#3a8a4a"/>
                                <polygon points="128.0,179.6 132.6,186.0 128.0,186.0" fill="#307a3f"/>
                                <polygon points="124.7,182.9 128.0,178.1 128.0,182.9" fill="#3a8a4a"/>
                                <polygon points="128.0,178.1 131.3,182.9 128.0,182.9" fill="#307a3f"/>
                                <rect x="176.0" y="190.7" width="2" height="2.5" fill="#6d4c41"/>
                                <polygon points="170.8,190.7 177.0,182.3 177.0,190.7" fill="#3a8a4a"/>
                                <polygon points="177.0,182.3 183.2,190.7 177.0,190.7" fill="#307a3f"/>
                                <polygon points="172.1,187.2 177.0,180.5 177.0,187.2" fill="#3a8a4a"/>
                                <polygon points="177.0,180.5 181.8,187.2 177.0,187.2" fill="#307a3f"/>
                                <polygon points="173.6,184.0 177.0,178.9 177.0,184.0" fill="#3a8a4a"/>
                                <polygon points="177.0,178.9 180.4,184.0 177.0,184.0" fill="#307a3f"/>
                                <rect x="153.4" y="196.9" width="2" height="2.5" fill="#6d4c41"/>
                                <polygon points="148.3,196.9 154.4,188.7 154.4,196.9" fill="#3a8a4a"/>
                                <polygon points="154.4,188.7 160.5,196.9 154.4,196.9" fill="#307a3f"/>
                                <polygon points="149.7,193.5 154.4,186.9 154.4,193.5" fill="#3a8a4a"/>
                                <polygon points="154.4,186.9 159.2,193.5 154.4,193.5" fill="#307a3f"/>
                                <polygon points="151.1,190.3 154.4,185.4 154.4,190.3" fill="#3a8a4a"/>
                                <polygon points="154.4,185.4 157.8,190.3 154.4,190.3" fill="#307a3f"/>
                                <rect x="113.9" y="197.2" width="2.4" height="4.8" fill="#6d4c41"/>
                                <circle cx="115.1" cy="192.0" r="6.1" fill="#5cb85c"/>
                                <path d="M 115.1 185.9 A 6.1 6.1 0 0 1 115.1 198.1 Z" fill="#4aa550"/>
                                <rect x="167.3" y="199.6" width="2" height="2.5" fill="#6d4c41"/>
                                <polygon points="162.1,199.6 168.3,191.2 168.3,199.6" fill="#3a8a4a"/>
                                <polygon points="168.3,191.2 174.5,199.6 168.3,199.6" fill="#307a3f"/>
                                <polygon points="163.4,196.1 168.3,189.4 168.3,196.1" fill="#3a8a4a"/>
                                <polygon points="168.3,189.4 173.1,196.1 168.3,196.1" fill="#307a3f"/>
                                <polygon points="164.9,192.9 168.3,187.9 168.3,192.9" fill="#3a8a4a"/>
                                <polygon points="168.3,187.9 171.7,192.9 168.3,192.9" fill="#307a3f"/>
                                <rect x="139.5" y="202.9" width="2" height="2.6" fill="#6d4c41"/>
                                <polygon points="134.0,202.9 140.5,194.1 140.5,202.9" fill="#3a8a4a"/>
                                <polygon points="140.5,194.1 147.1,202.9 140.5,202.9" fill="#307a3f"/>
                                <polygon points="135.4,199.2 140.5,192.2 140.5,199.2" fill="#3a8a4a"/>
                                <polygon points="140.5,192.2 145.6,199.2 140.5,199.2" fill="#307a3f"/>
                                <polygon points="136.9,195.8 140.5,190.5 140.5,195.8" fill="#3a8a4a"/>
                                <polygon points="140.5,190.5 144.1,195.8 140.5,195.8" fill="#307a3f"/>
                                <rect x="126.1" y="208.1" width="2" height="2.7" fill="#6d4c41"/>
                                <polygon points="120.6,208.1 127.1,199.3 127.1,208.1" fill="#3a8a4a"/>
                                <polygon points="127.1,199.3 133.7,208.1 127.1,208.1" fill="#307a3f"/>
                                <polygon points="122.0,204.4 127.1,197.3 127.1,204.4" fill="#3a8a4a"/>
                                <polygon points="127.1,197.3 132.3,204.4 127.1,204.4" fill="#307a3f"/>
                                <polygon points="123.5,201.0 127.1,195.7 127.1,201.0" fill="#3a8a4a"/>
                                <polygon points="127.1,195.7 130.8,201.0 127.1,201.0" fill="#307a3f"/>
                                <rect x="157.4" y="208.6" width="2" height="2.8" fill="#6d4c41"/>
                                <polygon points="151.5,208.6 158.4,199.3 158.4,208.6" fill="#3a8a4a"/>
                                <polygon points="158.4,199.3 165.4,208.6 158.4,208.6" fill="#307a3f"/>
                                <polygon points="153.0,204.7 158.4,197.2 158.4,204.7" fill="#3a8a4a"/>
                                <polygon points="158.4,197.2 163.9,204.7 158.4,204.7" fill="#307a3f"/>
                                <polygon points="154.6,201.1 158.4,195.5 158.4,201.1" fill="#3a8a4a"/>
                                <polygon points="158.4,195.5 162.3,201.1 158.4,201.1" fill="#307a3f"/>
                                <rect x="141.4" y="209.5" width="2.4" height="5.2" fill="#6d4c41"/>
                                <circle cx="142.6" cy="203.9" r="6.6" fill="#5cb85c"/>
                                <path d="M 142.6 197.2 A 6.6 6.6 0 0 1 142.6 210.5 Z" fill="#4aa550"/>
                                <rect x="124.7" y="218.1" width="2.4" height="5.6" fill="#6d4c41"/>
                                <circle cx="125.9" cy="212.0" r="7.1" fill="#5cb85c"/>
                                <path d="M 125.9 204.9 A 7.1 7.1 0 0 1 125.9 219.2 Z" fill="#4aa550"/>
                                <rect x="170.5" y="234.3" width="2" height="3.2" fill="#6d4c41"/>
                                <polygon points="163.6,234.3 171.5,223.6 171.5,234.3" fill="#2e7d32"/>
                                <polygon points="171.5,223.6 179.4,234.3 171.5,234.3" fill="#256b29"/>
                                <polygon points="165.3,229.8 171.5,221.3 171.5,229.8" fill="#2e7d32"/>
                                <polygon points="171.5,221.3 177.7,229.8 171.5,229.8" fill="#256b29"/>
                                <polygon points="167.2,225.7 171.5,219.3 171.5,225.7" fill="#2e7d32"/>
                                <polygon points="171.5,219.3 175.9,225.7 171.5,225.7" fill="#256b29"/>
                                <rect x="156.3" y="236.8" width="2" height="3.4" fill="#6d4c41"/>
                                <polygon points="148.9,236.8 157.3,225.4 157.3,236.8" fill="#2e7d32"/>
                                <polygon points="157.3,225.4 165.7,236.8 157.3,236.8" fill="#256b29"/>
                                <polygon points="150.7,232.0 157.3,222.9 157.3,232.0" fill="#2e7d32"/>
                                <polygon points="157.3,222.9 163.9,232.0 157.3,232.0" fill="#256b29"/>
                                <polygon points="152.6,227.6 157.3,220.7 157.3,227.6" fill="#2e7d32"/>
                                <polygon points="157.3,220.7 162.0,227.6 157.3,227.6" fill="#256b29"/>
                                <rect x="175.4" y="243.1" width="2" height="3.3" fill="#6d4c41"/>
                                <polygon points="168.3,243.1 176.4,232.1 176.4,243.1" fill="#2e7d32"/>
                                <polygon points="176.4,232.1 184.5,243.1 176.4,243.1" fill="#256b29"/>
                                <polygon points="170.0,238.5 176.4,229.7 176.4,238.5" fill="#2e7d32"/>
                                <polygon points="176.4,229.7 182.8,238.5 176.4,238.5" fill="#256b29"/>
                                <polygon points="171.9,234.2 176.4,227.7 176.4,234.2" fill="#2e7d32"/>
                                <polygon points="176.4,227.7 180.9,234.2 176.4,234.2" fill="#256b29"/>
                                <rect x="135.6" y="246.4" width="2" height="3.9" fill="#6d4c41"/>
                                <polygon points="127.1,246.4 136.6,233.5 136.6,246.4" fill="#2e7d32"/>
                                <polygon points="136.6,233.5 146.2,246.4 136.6,246.4" fill="#256b29"/>
                                <polygon points="129.1,241.0 136.6,230.6 136.6,241.0" fill="#2e7d32"/>
                                <polygon points="136.6,230.6 144.1,241.0 136.6,241.0" fill="#256b29"/>
                                <polygon points="131.3,236.0 136.6,228.3 136.6,236.0" fill="#2e7d32"/>
                                <polygon points="136.6,228.3 141.9,236.0 136.6,236.0" fill="#256b29"/>
                                <rect x="119.0" y="246.6" width="2" height="3.8" fill="#6d4c41"/>
                                <polygon points="110.7,246.6 120.0,233.9 120.0,246.6" fill="#2e7d32"/>
                                <polygon points="120.0,233.9 129.4,246.6 120.0,246.6" fill="#256b29"/>
                                <polygon points="112.7,241.3 120.0,231.2 120.0,241.3" fill="#2e7d32"/>
                                <polygon points="120.0,231.2 127.4,241.3 120.0,241.3" fill="#256b29"/>
                                <polygon points="114.9,236.4 120.0,228.8 120.0,236.4" fill="#2e7d32"/>
                                <polygon points="120.0,228.8 125.2,236.4 120.0,236.4" fill="#256b29"/>
                                <rect x="158.1" y="244.5" width="2.4" height="6.3" fill="#6d4c41"/>
                                <circle cx="159.3" cy="237.6" r="8.0" fill="#4caf50"/>
                                <path d="M 159.3 229.6 A 8.0 8.0 0 0 1 159.3 245.7 Z" fill="#3f9a45"/>
                                <rect x="173.8" y="255.5" width="2" height="3.6" fill="#6d4c41"/>
                                <polygon points="165.8,255.5 174.8,243.5 174.8,255.5" fill="#2e7d32"/>
                                <polygon points="174.8,243.5 183.8,255.5 174.8,255.5" fill="#256b29"/>
                                <polygon points="167.8,250.5 174.8,240.8 174.8,250.5" fill="#2e7d32"/>
                                <polygon points="174.8,240.8 181.8,250.5 174.8,250.5" fill="#256b29"/>
                                <polygon points="169.8,245.8 174.8,238.6 174.8,245.8" fill="#2e7d32"/>
                                <polygon points="174.8,238.6 179.8,245.8 174.8,245.8" fill="#256b29"/>
                                <rect x="128.9" y="253.6" width="2.4" height="6.8" fill="#6d4c41"/>
                                <circle cx="130.1" cy="246.3" r="8.6" fill="#4caf50"/>
                                <path d="M 130.1 237.7 A 8.6 8.6 0 0 1 130.1 254.8 Z" fill="#3f9a45"/>
                                <rect x="160.5" y="255.1" width="2.4" height="7.1" fill="#6d4c41"/>
                                <circle cx="161.7" cy="247.5" r="9.0" fill="#4caf50"/>
                                <path d="M 161.7 238.5 A 9.0 9.0 0 0 1 161.7 256.5 Z" fill="#3f9a45"/>
                                <rect x="142.5" y="262.5" width="2" height="3.6" fill="#6d4c41"/>
                                <polygon points="134.7,262.5 143.5,250.6 143.5,262.5" fill="#2e7d32"/>
                                <polygon points="143.5,250.6 152.2,262.5 143.5,262.5" fill="#256b29"/>
                                <polygon points="136.6,257.5 143.5,248.0 143.5,257.5" fill="#2e7d32"/>
                                <polygon points="143.5,248.0 150.3,257.5 143.5,257.5" fill="#256b29"/>
                                <polygon points="138.6,253.0 143.5,245.8 143.5,253.0" fill="#2e7d32"/>
                                <polygon points="143.5,245.8 148.3,253.0 143.5,253.0" fill="#256b29"/>
                                <rect x="175.9" y="261.0" width="2.4" height="6.6" fill="#6d4c41"/>
                                <circle cx="177.1" cy="253.8" r="8.5" fill="#4caf50"/>
                                <path d="M 177.1 245.3 A 8.5 8.5 0 0 1 177.1 262.3 Z" fill="#3f9a45"/>
                            </g>
                            <g id="decor-village-front">
                                <!-- Maisons de dos au premier plan, devant la route : on ne voit que les toits, une cheminée et un bout de mur aveugle -->
                                <g transform="translate(-8, 256) scale(1.9)">
                                    <rect x="12" y="-2" width="3" height="6" fill="#b9a089"/>
                                    <rect x="1" y="8" width="18" height="8" fill="#fdf1e0"/>
                                    <rect x="12" y="8" width="7" height="8" fill="#efdcc3"/>
                                    <polygon points="-2,9 9,0 22,9" fill="#e0603f"/>
                                    <polygon points="9,0 22,9 9,9" fill="#c24a2c"/>
                                    <rect x="3" y="10.5" width="3.2" height="3.2" rx="0.5" fill="#fcd34d"/>
                                    <rect x="14" y="10.5" width="3.2" height="3.2" rx="0.5" fill="#f5b52e"/>
                                </g>
                                <g transform="translate(46, 257) scale(1.9)">
                                    <rect x="1" y="8" width="16" height="8" fill="#f8ead6"/>
                                    <rect x="10" y="8" width="7" height="8" fill="#ead5b8"/>
                                    <polygon points="-2,9 8.5,0 19,9" fill="#489e96"/>
                                    <polygon points="8.5,0 19,9 8.5,9" fill="#3a857e"/>
                                    <rect x="3" y="10.5" width="3.2" height="3.2" rx="0.5" fill="#fcd34d"/>
                                    <rect x="12" y="10.5" width="3.2" height="3.2" rx="0.5" fill="#f5b52e"/>
                                </g>
                            </g>

                            <!-- Décor : Cercle des Pierres, 5 menhirs en cercle (vu en perspective) après le checkpoint 50, rangés de l'arrière vers l'avant -->
                            <!-- NOTE: flat design sans contour, deux tons (face claire, moitié droite ombrée) ; origine de chaque menhir = pied -->
                            <g id="decor-menhirs" transform="translate(418, 188) scale(0.75) translate(-418, -194)">
                                <ellipse cx="418" cy="195" rx="29" ry="9.5" fill="#3b6b47" opacity="0.18"/>
                                <g transform="translate(423.3, 187.7) scale(0.85)">
                                    <ellipse cx="0" cy="0.6" rx="4.2" ry="1.3" fill="#2f5a3b" opacity="0.3"/>
                                    <path d="M -2.6 0 L -2.2 -11.5 Q -0.2 -14.0 2.4 -11.8 L 2.8 0 Z" fill="#a9b6c3"/>
                                    <path d="M 0.4 0 L 0.3 -13.5 Q 1.6 -13.6 2.4 -11.8 L 2.8 0 Z" fill="#8695a3"/>
                                </g>
                                <g transform="translate(399.3, 190.6) scale(0.92)">
                                    <ellipse cx="0" cy="0.6" rx="4.2" ry="1.3" fill="#2f5a3b" opacity="0.3"/>
                                    <path d="M -2.6 0 L -2.2 -10.0 Q -0.2 -12.5 2.4 -10.3 L 2.8 0 Z" fill="#a9b6c3"/>
                                    <path d="M 0.4 0 L 0.3 -12.0 Q 1.6 -12.1 2.4 -10.3 L 2.8 0 Z" fill="#8695a3"/>
                                </g>
                                <g transform="translate(439.9, 193.5) scale(0.99)">
                                    <ellipse cx="0" cy="0.6" rx="4.2" ry="1.3" fill="#2f5a3b" opacity="0.3"/>
                                    <path d="M -2.6 0 L -2.2 -12.5 Q -0.2 -15.0 2.4 -12.8 L 2.8 0 Z" fill="#a9b6c3"/>
                                    <path d="M 0.4 0 L 0.3 -14.5 Q 1.6 -14.6 2.4 -12.8 L 2.8 0 Z" fill="#8695a3"/>
                                </g>
                                <g transform="translate(401.1, 198.2) scale(1.10)">
                                    <ellipse cx="0" cy="0.6" rx="4.2" ry="1.3" fill="#2f5a3b" opacity="0.3"/>
                                    <path d="M -2.6 0 L -2.2 -10.5 Q -0.2 -13.0 2.4 -10.8 L 2.8 0 Z" fill="#a9b6c3"/>
                                    <path d="M 0.4 0 L 0.3 -12.5 Q 1.6 -12.6 2.4 -10.8 L 2.8 0 Z" fill="#8695a3"/>
                                </g>
                                <g transform="translate(426.2, 200.0) scale(1.14)">
                                    <ellipse cx="0" cy="0.6" rx="4.2" ry="1.3" fill="#2f5a3b" opacity="0.3"/>
                                    <path d="M -2.6 0 L -2.2 -12.0 Q -0.2 -14.5 2.4 -12.3 L 2.8 0 Z" fill="#a9b6c3"/>
                                    <path d="M 0.4 0 L 0.3 -14.0 Q 1.6 -14.1 2.4 -12.3 L 2.8 0 Z" fill="#8695a3"/>
                                </g>
                            </g>

                            <!-- Décor : Porte de Pierre en arche au-dessus de la route (dessinée après le ruban : la route passe sous l'arche) -->
                            <!-- NOTE: flat design sans contour, deux tons (face claire, moitié droite ombrée) ; origine = centre de la route -->
                            <g id="decor-gate" transform="translate(329.9, 183.9) scale(1)">
                                <ellipse cx="0" cy="1" rx="17" ry="2.4" fill="#3b6b47" opacity="0.3"/>
                                <!-- Piliers de part et d'autre de la route -->
                                <rect x="-13" y="-15" width="6" height="16" fill="#9aa8b6"/>
                                <rect x="-10" y="-15" width="3" height="16" fill="#7d8a97"/>
                                <rect x="7" y="-15" width="6" height="16" fill="#9aa8b6"/>
                                <rect x="10" y="-15" width="3" height="16" fill="#7d8a97"/>
                                <g fill="#6f7c89" opacity="0.55">
                                    <rect x="-13" y="-9" width="6" height="0.7"/>
                                    <rect x="-13" y="-4" width="6" height="0.7"/>
                                    <rect x="7" y="-9" width="6" height="0.7"/>
                                    <rect x="7" y="-4" width="6" height="0.7"/>
                                </g>
                                <rect x="-14.2" y="-2.5" width="8.4" height="3.5" rx="0.8" fill="#8695a3"/>
                                <rect x="5.8" y="-2.5" width="8.4" height="3.5" rx="0.8" fill="#8695a3"/>
                                <!-- Arche en plein cintre au-dessus de la route -->
                                <path d="M -13 -15 A 13 13 0 0 1 13 -15 L 7 -15 A 7 7 0 0 0 -7 -15 Z" fill="#b3c0cc"/>
                                <path d="M 0 -28 A 13 13 0 0 1 13 -15 L 7 -15 A 7 7 0 0 0 0 -22 Z" fill="#95a5b5"/>
                                <!-- Joints des claveaux -->
                                <g stroke="#6f7c89" stroke-width="0.6" opacity="0.5">
                                    <line x1="-12" y1="-20" x2="-6.5" y2="-18.5"/>
                                    <line x1="-8.5" y1="-25" x2="-5" y2="-21"/>
                                    <line x1="8.5" y1="-25" x2="5" y2="-21"/>
                                    <line x1="12" y1="-20" x2="6.5" y2="-18.5"/>
                                </g>
                                <!-- Clé de voûte -->
                                <path d="M -2.6 -28 L 2.6 -28 L 1.9 -22 L -1.9 -22 Z" fill="#c9d4de"/>
                                <!-- Mousse au pied -->
                                <path d="M -14.2 1 L -14.2 -0.4 Q -12.4 -1.6 -11 -0.2 Q -9.6 -1.4 -5.8 -0.6 L -5.8 1 Z" fill="#599965"/>
                                <path d="M 5.8 1 L 5.8 -0.4 Q 7.6 -1.4 9 -0.2 Q 10.6 -1.6 14.2 -0.4 L 14.2 1 Z" fill="#599965"/>
                                <!-- Mât et fanion doré au sommet -->
                                <rect x="-0.5" y="-35" width="1" height="7.2" fill="#7d8a97"/>
                                <polygon points="0.5,-35 6,-33.2 0.5,-31.4" fill="#ff9d00"/>
                                <polygon points="0.5,-35 6,-33.2 0.5,-33.2" fill="#e07f00"/>
                            </g>

                            <!-- Sentier Principal continu de référence (invisible, pour le calcul mathématique) -->
                            <path id="roadmap-trail" d="M 38 264 C 43.3 263.8, 59.7 265.3, 70 263 C 80.3 260.7, 90.3 254.2, 100 250 C 109.7 245.8, 116.7 242.5, 128 238 C 139.3 233.5, 154.0 228.5, 168 223 C 182.0 217.5, 197.0 210.0, 212 205 C 227.0 200.0, 243.3 196.3, 258 193 C 272.7 189.7, 284.7 187.2, 300 185 C 315.3 182.8, 332.5 182.3, 350 180 C 367.5 177.7, 390.7 174.7, 405 171 C 419.3 167.3, 436.2 162.7, 436 158 C 435.8 153.3, 416.3 146.3, 404 143 C 391.7 139.7, 365.0 141.7, 362 138 C 359.0 134.3, 371.7 125.2, 386 121 C 400.3 116.8, 439.0 117.3, 448 113 C 457.0 108.7, 448.3 98.8, 440 95 C 431.7 91.2, 401.7 93.8, 398 90 C 394.3 86.2, 411.0 76.3, 418 72 C 425.0 67.7, 436.3 65.3, 440 64" fill="none" stroke="none"/>


                            <!-- Décor : brise au-dessus du checkpoint 60 (3 petits traits en fuseau parallèles qui décrivent la même boucle, décalés dans le temps) -->
                            <!-- NOTE: le fuseau est révélé par un masque (trait épais en pointillé animé, .wind-reveal dans main.css) puis s'efface (.wind-swirl) -->
                            <defs>
                                <mask id="wind-mask-1" maskUnits="userSpaceOnUse" x="-30" y="-20" width="60" height="40">
                                    <path class="wind-reveal wind-delay-1" pathLength="100" d="M -22 4 C -14 -2 -6 -2 2 1 C 9 4 16 -1 15 -6 C 14 -10 8 -9 8 -5 C 8 -2 12 -2 12 -5" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
                                </mask>
                                <mask id="wind-mask-2" maskUnits="userSpaceOnUse" x="-30" y="-20" width="60" height="40">
                                    <path class="wind-reveal wind-delay-2" pathLength="100" d="M -22 4 C -14 -2 -6 -2 2 1 C 9 4 16 -1 15 -6 C 14 -10 8 -9 8 -5 C 8 -2 12 -2 12 -5" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
                                </mask>
                                <mask id="wind-mask-3" maskUnits="userSpaceOnUse" x="-30" y="-20" width="60" height="40">
                                    <path class="wind-reveal wind-delay-3" pathLength="100" d="M -22 4 C -14 -2 -6 -2 2 1 C 9 4 16 -1 15 -6 C 14 -10 8 -9 8 -5 C 8 -2 12 -2 12 -5" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
                                </mask>
                            </defs>
                            <g id="decor-wind" transform="translate(468, 128) scale(0.6)" fill="#ffffff">
                                <g class="wind-swirl wind-delay-1" transform="translate(0, 0.0)" mask="url(#wind-mask-1)"><path d="M -22,4 L -20.82,3.27 L -19.28,2.4 L -18.12,1.86 L -16.6,1.23 L -15.46,0.86 L -13.97,0.45 L -12.49,0.15 L -11.02,-0.04 L -9.57,-0.13 L -8.12,-0.12 L -6.68,-0.02 L -5.24,0.16 L -3.8,0.43 L -2.37,0.78 L -0.93,1.19 L 0.51,1.68 L 1.54,2.07 L 3.34,2.71 L 4.77,3 L 6.53,3.1 L 8.22,2.95 L 9.81,2.55 L 11.28,1.94 L 12.85,0.97 L 14.16,-0.22 L 15.17,-1.61 L 15.82,-3.15 L 16.07,-5.07 L 15.75,-6.66 L 14.69,-8.24 L 13.01,-9.14 L 11.2,-9.22 L 9.51,-8.61 L 8.32,-7.52 L 7.62,-5.8 L 7.74,-4.14 L 8.77,-2.83 L 10.41,-2.6 L 11.65,-3.49 L 12,-5 L 12,-5 L 11.5,-3.6 L 10.34,-2.97 L 9.08,-3.3 L 8.46,-4.33 L 8.52,-5.63 L 9.17,-6.83 L 10.12,-7.51 L 11.36,-7.82 L 12.56,-7.65 L 13.5,-7.02 L 14.03,-6.06 L 14.12,-5.06 L 13.87,-3.77 L 13.34,-2.72 L 12.54,-1.74 L 11.5,-0.87 L 10.26,-0.15 L 9.09,0.29 L 7.83,0.59 L 6.49,0.7 L 5.09,0.63 L 3.93,0.41 L 2.46,-0.07 L 1.24,-0.48 L -0.32,-0.94 L -1.88,-1.31 L -3.45,-1.58 L -5.01,-1.76 L -6.57,-1.84 L -8.13,-1.82 L -9.68,-1.68 L -11.23,-1.44 L -12.76,-1.08 L -14.28,-0.6 L -15.79,0 L -16.9,0.55 L -18.38,1.37 L -19.47,2.08 L -20.93,3.12 L -22,4 L -22,4 Z"/></g>
                                <g class="wind-swirl wind-delay-2" transform="translate(0, 3.4)" mask="url(#wind-mask-2)"><path d="M -22,4 L -20.82,3.27 L -19.28,2.4 L -18.12,1.86 L -16.6,1.23 L -15.46,0.86 L -13.97,0.45 L -12.49,0.15 L -11.02,-0.04 L -9.57,-0.13 L -8.12,-0.12 L -6.68,-0.02 L -5.24,0.16 L -3.8,0.43 L -2.37,0.78 L -0.93,1.19 L 0.51,1.68 L 1.54,2.07 L 3.34,2.71 L 4.77,3 L 6.53,3.1 L 8.22,2.95 L 9.81,2.55 L 11.28,1.94 L 12.85,0.97 L 14.16,-0.22 L 15.17,-1.61 L 15.82,-3.15 L 16.07,-5.07 L 15.75,-6.66 L 14.69,-8.24 L 13.01,-9.14 L 11.2,-9.22 L 9.51,-8.61 L 8.32,-7.52 L 7.62,-5.8 L 7.74,-4.14 L 8.77,-2.83 L 10.41,-2.6 L 11.65,-3.49 L 12,-5 L 12,-5 L 11.5,-3.6 L 10.34,-2.97 L 9.08,-3.3 L 8.46,-4.33 L 8.52,-5.63 L 9.17,-6.83 L 10.12,-7.51 L 11.36,-7.82 L 12.56,-7.65 L 13.5,-7.02 L 14.03,-6.06 L 14.12,-5.06 L 13.87,-3.77 L 13.34,-2.72 L 12.54,-1.74 L 11.5,-0.87 L 10.26,-0.15 L 9.09,0.29 L 7.83,0.59 L 6.49,0.7 L 5.09,0.63 L 3.93,0.41 L 2.46,-0.07 L 1.24,-0.48 L -0.32,-0.94 L -1.88,-1.31 L -3.45,-1.58 L -5.01,-1.76 L -6.57,-1.84 L -8.13,-1.82 L -9.68,-1.68 L -11.23,-1.44 L -12.76,-1.08 L -14.28,-0.6 L -15.79,0 L -16.9,0.55 L -18.38,1.37 L -19.47,2.08 L -20.93,3.12 L -22,4 L -22,4 Z"/></g>
                                <g class="wind-swirl wind-delay-3" transform="translate(0, 6.8)" mask="url(#wind-mask-3)"><path d="M -22,4 L -20.82,3.27 L -19.28,2.4 L -18.12,1.86 L -16.6,1.23 L -15.46,0.86 L -13.97,0.45 L -12.49,0.15 L -11.02,-0.04 L -9.57,-0.13 L -8.12,-0.12 L -6.68,-0.02 L -5.24,0.16 L -3.8,0.43 L -2.37,0.78 L -0.93,1.19 L 0.51,1.68 L 1.54,2.07 L 3.34,2.71 L 4.77,3 L 6.53,3.1 L 8.22,2.95 L 9.81,2.55 L 11.28,1.94 L 12.85,0.97 L 14.16,-0.22 L 15.17,-1.61 L 15.82,-3.15 L 16.07,-5.07 L 15.75,-6.66 L 14.69,-8.24 L 13.01,-9.14 L 11.2,-9.22 L 9.51,-8.61 L 8.32,-7.52 L 7.62,-5.8 L 7.74,-4.14 L 8.77,-2.83 L 10.41,-2.6 L 11.65,-3.49 L 12,-5 L 12,-5 L 11.5,-3.6 L 10.34,-2.97 L 9.08,-3.3 L 8.46,-4.33 L 8.52,-5.63 L 9.17,-6.83 L 10.12,-7.51 L 11.36,-7.82 L 12.56,-7.65 L 13.5,-7.02 L 14.03,-6.06 L 14.12,-5.06 L 13.87,-3.77 L 13.34,-2.72 L 12.54,-1.74 L 11.5,-0.87 L 10.26,-0.15 L 9.09,0.29 L 7.83,0.59 L 6.49,0.7 L 5.09,0.63 L 3.93,0.41 L 2.46,-0.07 L 1.24,-0.48 L -0.32,-0.94 L -1.88,-1.31 L -3.45,-1.58 L -5.01,-1.76 L -6.57,-1.84 L -8.13,-1.82 L -9.68,-1.68 L -11.23,-1.44 L -12.76,-1.08 L -14.28,-0.6 L -15.79,0 L -16.9,0.55 L -18.38,1.37 L -19.47,2.08 L -20.93,3.12 L -22,4 L -22,4 Z"/></g>
                            </g>

                            <!-- Décor : petit aigle qui plane près du checkpoint 80 (La Crête des Aigles) -->
                            <!-- NOTE: flat design sans contour ; le groupe externe porte la position, le groupe .eagle-float porte l'animation de vol plané (main.css) -->
                            <g id="decor-eagle" transform="translate(454, 94) scale(0.56)">
                                <g class="eagle-float">
                                    <!-- Queue en éventail : 5 plumes en fuseau autour du croupion -->
                                    <g transform="translate(0, 3.4)" fill="#a0683a">
                                        <path d="M 0 0 Q 1.7 3.0 0 6 Q -1.7 3.0 0 0 Z" transform="rotate(-32)"/>
                                        <path d="M 0 0 Q 1.8 3.2 0 6.4 Q -1.8 3.2 0 0 Z" transform="rotate(-16)"/>
                                        <path d="M 0 0 Q 1.9 3.4 0 6.8 Q -1.9 3.4 0 0 Z" fill="#b57a46"/>
                                        <path d="M 0 0 Q 1.8 3.2 0 6.4 Q -1.8 3.2 0 0 Z" transform="rotate(16)"/>
                                        <path d="M 0 0 Q 1.7 3.0 0 6 Q -1.7 3.0 0 0 Z" transform="rotate(32)"/>
                                    </g>
                                    <!-- Ailes arquées vers le haut (silhouette ^ i ^), bouts de plumes effilés -->
                                    <path d="M -0.8 0.8 Q -5 -6.4 -12.2 1.4 L -9 1.1 L -8.9 2.8 L -6.8 1.6 L -6.6 3 L -4.6 0.6 Q -2.8 -1.8 -0.8 2.8 Z" fill="#8a5a30" transform="scale(1.8, 1)"/>
                                    <path d="M 0.8 0.8 Q 5 -6.4 12.2 1.4 L 9 1.1 L 8.9 2.8 L 6.8 1.6 L 6.6 3 L 4.6 0.6 Q 2.8 -1.8 0.8 2.8 Z" fill="#744a26" transform="scale(1.8, 1)"/>
                                    <!-- Corps, tête blanche (le point du i) et bec -->
                                    <ellipse cx="0" cy="1.6" rx="1.6" ry="3.2" fill="#96623a"/>
                                    <circle cx="0" cy="-3.1" r="1.8" fill="#ffffff"/>
                                    <path d="M -0.8 -2.6 L 0 -0.9 L 0.8 -2.6 Z" fill="#f5b52e"/>
                                </g>
                            </g>

                            <!-- Checkpoints / Jalons (Milestones) -->
                            <g id="milestones-group"></g>

                            <!-- Pion / Avatar du joueur animé le long du sentier -->
                            <g id="player-avatar-marker">
                                <!-- Bulle de dialogue Manga agrandie et bien lisible -->
                                <g id="avatar-speech-bubble" transform="translate(0, 0)">
                                    <rect id="avatar-speech-rect" x="-75" y="-106" width="150" height="36" rx="18" fill="#ffffff" filter="url(#pin-shadow)"/>
                                    <!-- Pointe dirigée vers le haut de la tête de l'avatar -->
                                    <polygon points="-6,-70 6,-70 0,-62" fill="#ffffff"/>
                                    <text id="avatar-speech-text" x="0" y="-88" fill="#7c4004" font-size="17" font-weight="700" text-anchor="middle" dominant-baseline="central" font-family="'Baloo 2', 'Almarai', sans-serif">
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

                        <!-- Bouton d'agrandissement de la carte -->
                        <button id="roadmap-expand-btn" type="button" class="absolute top-1.5 right-1.5 z-10 w-7 h-7 rounded-lg bg-white/80 backdrop-blur-sm border border-amber-900/20 text-amber-900 hover:bg-white shadow flex items-center justify-center cursor-pointer transition" title="Agrandir la carte" aria-label="Agrandir la carte">
                            <i class="bi bi-arrows-fullscreen text-xs"></i>
                        </button>

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
     * Convertit un nombre de points en position (0 à 1) sur le sentier, de façon proportionnelle :
     * 0 pt au départ (2 %), 100 pts au château (98 %), donc des graduations régulièrement espacées
     */
    percentForPoints(points) {
        const clamped = Math.min(Math.max(points, 0), 100);
        return 0.02 + 0.96 * (clamped / 100);
    }

    /**
     * Distance (en unités du sentier) où se tient l'avatar : à droite du dernier jalon atteint, puis il avance vers le suivant
     * sans jamais le recouvrir (marge de 28 de chaque côté)
     */
    avatarDistance(points, totalLength) {
        const margin = 28;
        const ms = this.milestones;
        let i = 0;
        while (i + 1 < ms.length && ms[i + 1].points <= points) i++;
        const start = ms[i].pathPercent * totalLength + margin;
        if (i + 1 >= ms.length) return Math.min(start, totalLength);
        const end = Math.max(start, ms[i + 1].pathPercent * totalLength - margin);
        const frac = (points - ms[i].points) / (ms[i + 1].points - ms[i].points);
        return start + (end - start) * Math.min(Math.max(frac, 0), 1);
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
            g.setAttribute('transform', `translate(${pt.x}, ${pt.y - 14})`);
            g.setAttribute('class', 'cursor-pointer milestone-node group');
            g.setAttribute('data-milestone-id', m.id);

            const fontSize = m.points >= 100 && !isUnlocked ? 7.2 : 8.8;

            g.innerHTML = `
                <circle cx="0" cy="0" r="15" fill="transparent" pointer-events="all"/>
                <ellipse cx="0" cy="14" rx="3.4" ry="1.2" fill="#7c4004" opacity="0.35" pointer-events="none"/>
                <line x1="0" y1="0" x2="0" y2="14" stroke="#7c4004" stroke-width="1.6" stroke-linecap="round" pointer-events="none"/>
                <circle cx="0" cy="0" r="10" fill="${isUnlocked ? '#ff9d00' : '#f4e9dc'}" stroke="#ffffff" stroke-width="2" filter="url(#pin-shadow)" pointer-events="none"/>
                <text x="0" y="0.5" font-size="${fontSize}" font-weight="900" fill="${isUnlocked ? '#5c2800' : '#7c4004'}" text-anchor="middle" dominant-baseline="central" font-family="'Nunito', 'Baloo 2', sans-serif" pointer-events="none">
                    ${isUnlocked ? '✓' : m.points}
                </text>
            `;

            g.addEventListener('click', () => this.showMilestoneInfo(m, isUnlocked, totalPoints));
            milestonesGroup.appendChild(g);
        });

        // 2. Position de l'avatar : toujours sur la route, à droite du dernier jalon atteint (jamais posé sur un jalon)
        const startDist = this.avatarDistance(0, totalLength);
        const targetDist = this.avatarDistance(totalPoints, totalLength);
        const avatarBody = document.getElementById('avatar-character-wrapper');

        // Si le joueur est tout au début (0 pt)
        if (totalPoints <= 0 || targetDist <= startDist) {
            const pt = trail.getPointAtLength(startDist);
            marker.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
            if (avatarBody) {
                avatarBody.classList.remove('avatar-walking');
                avatarBody.classList.add('avatar-idle');
            }
            if (bubble) bubble.classList.add('avatar-speech-bubble');
            document.fonts.ready.then(() => {
                this.fitSpeechBubble();
                this.playIntroDialogue(totalPoints);
            });
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
            const pt = trail.getPointAtLength(startDist + (targetDist - startDist) * ease);

            marker.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);

            if (t < 1) {
                requestAnimationFrame(animateWalk);
            } else {
                // Fin du trajet : pose finale et ouverture de la bulle
                const finalPt = trail.getPointAtLength(targetDist);
                marker.setAttribute('transform', `translate(${finalPt.x}, ${finalPt.y})`);
                if (avatarBody) {
                    avatarBody.classList.remove('avatar-walking');
                    avatarBody.classList.add('avatar-idle');
                }

                if (bubble) {
                    bubble.style.opacity = '1';
                    bubble.classList.add('avatar-speech-bubble');
                }
                document.fonts.ready.then(() => {
                    this.fitSpeechBubble();
                    this.playIntroDialogue(totalPoints);
                });
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
     * Ouvre toute la carte (en-tête, dessin, objectif) en grand dans une modale, copie figée au moment du clic
     */
    openMapModal() {
        const card = document.querySelector('.fantasy-roadmap-card');
        if (!card) return;

        // La copie fige la carte au moment du clic
        const clone = card.cloneNode(true);
        // NOTE La copie est autonome : ses id sont préfixés et leurs références (url(#..), href) suivies, donc elle s'affiche même si la carte d'origine est masquée
        const ids = [...clone.querySelectorAll('[id]')].map((el) => el.id);
        let html = clone.innerHTML;
        ids.forEach((id) => {
            html = html.split(`id="${id}"`).join(`id="modal-${id}"`).split(`url(#${id})`).join(`url(#modal-${id})`).split(`href="#${id}"`).join(`href="#modal-${id}"`);
        });
        clone.innerHTML = html;
        clone.querySelectorAll('[class*="cursor-pointer"]').forEach((el) => el.classList.remove('cursor-pointer'));
        clone.querySelector('[title="Agrandir la carte"]')?.remove();
        clone.querySelector('.animate-fade-in')?.remove();

        // La carte n'est plus plafonnée en hauteur : elle garde les proportions du dessin
        const svg = clone.querySelector('svg[viewBox^="-20 -46"]');
        // NOTE Dans la petite carte le SVG est étiré (preserveAspectRatio none) et la bulle compense cet étirement : ici le dessin garde ses proportions, donc plus de compensation
        svg?.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        clone.querySelector('[transform^="scale("]')?.setAttribute('transform', 'scale(1, 1)');
        const mapBox = svg?.parentElement;
        if (mapBox) {
            // NOTE Largeur maximale qui tient dans la hauteur de l'écran (en-tête et objectif déduits), sans jamais déformer le dessin
            mapBox.style.width = 'min(100%, calc((100vh - 200px) * 560 / 328))';
        }

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Carte agrandie');
        modal.innerHTML = `
            <div class="map-modal-panel relative w-full max-w-5xl max-h-full overflow-y-auto rounded-2xl shadow-2xl">
                <button type="button" class="map-modal-close absolute top-2 right-2 z-30 w-9 h-9 rounded-full bg-white/90 text-amber-900 hover:bg-white shadow flex items-center justify-center cursor-pointer" title="Fermer" aria-label="Fermer">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
        `;
        modal.firstElementChild.prepend(clone);
        document.body.appendChild(modal);

        const close = () => {
            modal.remove();
            document.removeEventListener('keydown', onKey);
        };
        const onKey = (e) => { if (e.key === 'Escape') close(); };
        document.addEventListener('keydown', onKey);
        modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
        modal.querySelector('.map-modal-close').addEventListener('click', close);
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

        const expandBtn = document.getElementById('roadmap-expand-btn');
        if (expandBtn) {
            expandBtn.addEventListener('click', () => this.openMapModal());
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
