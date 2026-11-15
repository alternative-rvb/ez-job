/**
 * Module de gestion de la Roadmap Fantasy ("La Quête de l'Arbre")
 * Affiche la progression du joueur sur une carte médiévale / féerique
 * Intègre le déplacement animé de l'avatar et la bulle de dialogue dynamique (compatible IA Groq).
 */

import { rewardsManager, SUMMON_COST } from '../managers/rewards-manager.js';
import { pointsIcon, gemIcon } from './currency-icons.js';
import { renderTreeSvg } from './tree-svg.js';
import { playerManager } from '../core/player.js';
import { AVATARS, renderAvatarSvg, renderAvatarHeadSvg } from './avatars.js';
import { avatarCustomizerModal } from './avatar-modal.js';
import { modalHeaderHTML, MODAL_PANEL_CLASSES, MODAL_BACKDROP_HTML } from './modal-frame.js';
import { getCharacterId, getMapLine } from '../core/dialogues.js';

export class RoadmapManager {
    constructor() {
        this.containerId = 'hero-roadmap-container';
        this.customDialogue = null;
        // ANCHOR Quiz récents : annoncés par l'avatar à chaque chargement de la page, puis affichés en puces cliquables dans le bandeau profil
        this.newQuizzes = [];
        this.onPlayNewQuiz = null;
        // NOTE Titres encore à révéler dans le bandeau : la puce apparaît quand l'avatar cite le quiz
        this.pendingChips = new Set();
        this.introPlayed = false;
        this.introTimer = null;
        window.addEventListener('avatar-updated', () => this.render());
        window.addEventListener('resize', () => this.fitSpeechBubble());
        // NOTE Délégation : les puces sont recréées à chaque render() et ajoutées à la volée pendant l'intro
        document.addEventListener('click', (e) => {
            const chip = e.target.closest?.('[data-new-quiz-chip]');
            // NOTE Les puces de la carte agrandie ont leur propre écouteur (fermeture de la modale avant de lancer le quiz)
            if (!chip || chip.closest('.map-modal')) return;
            const quiz = this.newQuizzes.find(q => q.id === chip.dataset.newQuizChip);
            if (quiz && typeof this.onPlayNewQuiz === 'function') this.onPlayNewQuiz(quiz);
        });
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
                icon: 'bi-pin-map-fill',
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
                desc: 'L\'air se fait rare, l\'Arbre d\'Invocation est à portée de vue !',
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
                title: 'L\'Arbre d\'Invocation',
                points: 100,
                desc: 'L\'arbre aux fruits de connaissance : invoque tes trophées !',
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
     * Mémorise les quiz récents (annonce de l'avatar, puces du bandeau) et le rappel qui lance un quiz
     */
    setNewQuizzes(quizzes, onPlay) {
        this.newQuizzes = quizzes;
        this.onPlayNewQuiz = onPlay;
        // NOTE Annonce rejouée à chaque chargement de la page : toutes les puces attendent que l'avatar cite leur quiz
        this.pendingChips = new Set(quizzes.map(q => q.title));
    }

    /**
     * HTML d'une puce de quiz récent (micro-chip cliquable du bandeau profil)
     */
    newQuizChipHTML(quiz) {
        const esc = v => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
        return `<button type="button" data-new-quiz-chip="${esc(quiz.id)}" class="max-w-full flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] leading-tight font-semibold text-amber-950 border border-accent-500/40 bg-accent-500/15 hover:bg-accent-500/25 transition cursor-pointer" title="Lancer ce quiz">
            <i class="bi bi-stars text-accent-600"></i><span class="truncate">${esc(quiz.title)}</span>
        </button>`;
    }

    /**
     * Ajoute dans le bandeau la puce d'un quiz que l'avatar vient d'annoncer, avec un effet d'apparition
     */
    revealChip(quiz) {
        this.pendingChips.delete(quiz.title);
        const row = document.getElementById('roadmap-new-quiz-row');
        const list = document.getElementById('roadmap-new-quiz-chips');
        if (!row || !list || list.querySelector(`[data-new-quiz-chip="${CSS.escape(quiz.id)}"]`)) return;
        list.insertAdjacentHTML('beforeend', this.newQuizChipHTML(quiz));
        row.classList.remove('hidden');
        const chip = list.lastElementChild;
        if (chip.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            chip.animate(
                [{ opacity: 0, transform: 'translateY(-8px) scale(0.85)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }],
                { duration: 450, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
            );
        }
    }

    /**
     * Révèle d'un coup les puces encore en attente (intro interrompue ou terminée)
     */
    flushChips() {
        this.newQuizzes.filter(q => this.pendingChips.has(q.title)).forEach(q => this.revealChip(q));
    }

    /**
     * Salutation selon l'heure et l'absence du joueur (retour après plusieurs jours)
     */
    getGreetingLine() {
        // NOTE Sans pseudo : l'avatar porte déjà le nom du joueur
        const suffix = ' !';
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
     * Fait enchaîner à l'avatar salutation, annonce des quiz récents (chaque titre fait apparaître sa puce dans le bandeau), puis la réplique habituelle de la carte
     */
    playIntroDialogue(totalPoints) {
        clearTimeout(this.introTimer);
        const finalLine = this.getSpeechBubbleText(totalPoints);
        if (this.introPlayed || this.customDialogue) {
            // NOTE Sans intro (réplique IA), les puces en attente s'affichent directement
            if (!this.introPlayed) this.flushChips();
            return;
        }
        this.introPlayed = true;

        const fresh = this.newQuizzes;
        const pick = list => list[Math.floor(Math.random() * list.length)];
        // NOTE Réplique d'index i : action jouée quand elle s'affiche (apparition de la puce du quiz cité)
        const lineActions = {};

        const lines = [this.getGreetingLine(), pick(['Comment tu vas ?', 'Prêt pour l\'aventure ?', 'Tout va bien ?'])];
        if (fresh.length) {
            lines.push(fresh.length === 1 ? 'Le nouveau quiz est...' : 'Les nouveaux quiz sont...');
            fresh.forEach((quiz, i) => {
                const short = quiz.title.length > 34 ? `${quiz.title.slice(0, 31)}...` : quiz.title;
                lineActions[lines.length] = () => this.revealChip(quiz);
                lines.push(fresh.length > 1 && i === fresh.length - 1 ? `Et aussi : ${short}` : short);
            });
        }

        // NOTE Trophées à invoquer : annoncés à chaque chargement tant que le joueur a assez de fruits de connaissance
        if (rewardsManager.canSummon()) {
            const pulls = Math.floor(rewardsManager.getTotalPoints() / SUMMON_COST);
            lines.push(pulls > 1
                ? pick([`Tu peux invoquer ${pulls} trophées !`, `${pulls} invocations de trophées t'attendent !`])
                : pick(['Un trophée est à invoquer !', 'Tu as assez de fruits de connaissance pour un trophée !']));
        }
        lines.push(finalLine);

        const textEl = document.getElementById('avatar-speech-text');
        const bubble = document.getElementById('avatar-speech-bubble');
        let index = 0;

        const show = () => {
            const el = document.getElementById('avatar-speech-text');
            // NOTE La carte a pu être re-rendue entre deux répliques : on abandonne l'intro
            if (!el || el !== textEl) { this.flushChips(); return; }
            el.style.transition = 'opacity 0.15s';
            el.style.opacity = '0';
            this.introTimer = setTimeout(() => {
                el.textContent = lines[index];
                this.fitSpeechBubble();
                el.style.opacity = '1';
                lineActions[index]?.();
                index += 1;
                // NOTE Durée proportionnelle à la longueur du texte
                if (index < lines.length) this.introTimer = setTimeout(show, 1300 + lines[index - 1].length * 55);
                else this.flushChips();
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
                <div class="px-3 py-2 sm:px-4 border-b border-amber-900/10 grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1.5 sm:gap-x-3 bg-white/40 backdrop-blur-sm">
                    <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <!-- Avatar box skeleton -->
                        <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl skeleton-shimmer flex-shrink-0"></div>
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
                <div class="relative p-1 flex-1 flex flex-col justify-center">
                    <div class="relative mx-auto rounded-xl overflow-hidden shadow-inner border border-amber-800/15 skeleton-shimmer-subtle" style="aspect-ratio: 560 / 328; width: min(100%, 560px);">
                        <svg viewBox="-20 -46 560 328" class="w-full h-full skeleton-svg-pulse" preserveAspectRatio="none">
                            <!-- Ciel : soleil fantôme -->
                            <circle cx="62" cy="10" r="26" fill="#d9c7b0" opacity="0.45"/>
                            <circle cx="62" cy="10" r="15" fill="#cdb79b" opacity="0.7"/>
                            <ellipse cx="140" cy="24" rx="24" ry="9" fill="#ffffff" opacity="0.6"/>
                            <ellipse cx="318" cy="-6" rx="28" ry="9" fill="#ffffff" opacity="0.5"/>
                            <!-- Montagnes lointaines et montagne du sommet -->
                            <path d="M 120 180 L 196 94 Q 200 89 204 94 L 280 180 Z" fill="#d5c2ae" opacity="0.5"/>
                            <path d="M 220 180 L 316 69.6 Q 320 64 324 69.6 L 420 180 Z" fill="#cdb9a3" opacity="0.6"/>
                            <path d="M 250 260 L 409 71 Q 440 54 469 72 L 550 260 Z" fill="#bfa78d" opacity="0.7"/>
                            <path d="M 448 62.9 Q 460 62 469 72 L 550 260 L 478 260 L 470 220 L 474 180 L 463 140 L 466 104 L 455 80 Z" fill="#ab9179" opacity="0.5"/>
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
                            <!-- Arbre d'invocation au sommet -->
                            <rect x="436" y="40" width="8" height="24" rx="2" fill="#a98c6e" opacity="0.8"/>
                            <circle cx="440" cy="30" r="20" fill="#bc9f82" opacity="0.75"/>
                            <circle cx="425" cy="38" r="11" fill="#bc9f82" opacity="0.75"/>
                            <circle cx="455" cy="38" r="11" fill="#bc9f82" opacity="0.75"/>
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
                <div class="px-3 py-2 bg-amber-900/5 border-t border-amber-900/10 flex items-center justify-between gap-3 text-xs">
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

        const totalPoints = rewardsManager.getLifetimePoints() || 0;
        const gems = rewardsManager.getTotalPoints() || 0;
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
                <!-- Header en 2 colonnes : profil + points à gauche, quiz récents à droite -->
                <div class="px-3 py-2 sm:px-4 border-b border-amber-900/10 flex items-center gap-2.5 sm:gap-4 bg-white/40 backdrop-blur-sm">
                    <!-- Colonne gauche : avatar, nom, rang puis points et fruits dessous -->
                    <div class="flex-1 min-w-0 flex flex-col gap-1.5">
                        <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                            <!-- Avatar interactif (Portrait Tête) -->
                            <div class="relative group flex-shrink-0 cursor-pointer" id="roadmap-avatar-toggle" title="Cliquer pour personnaliser ton avatar">
                                <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl ring-2 ring-primary-500 shadow-md bg-amber-100/90 overflow-hidden flex items-center justify-center transition-transform transform group-hover:scale-105 p-0.5">
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

                        <!-- Points et fruits sous l'avatar -->
                        <div class="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                            <div id="roadmap-score-badge" class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-500/15 border border-accent-500/30 text-amber-900 font-bold text-xs">
                                ${pointsIcon('text-xs')}
                                <span class="text-xs font-extrabold">${totalPoints}</span>
                                <span class="text-[10px] font-semibold text-amber-800">pts</span>
                            </div>
                            <div id="roadmap-gem-badge" class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-500/15 border border-accent-500/30 text-amber-900 font-bold text-xs" title="Fruits de connaissance à dépenser en invocations, sans effet sur ta position">
                                ${gemIcon('text-xs')}
                                <span class="text-xs font-extrabold">${gems}</span>
                                <span class="text-[10px] font-semibold text-amber-800">fruit${gems > 1 ? 's' : ''}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Colonne droite : quiz récents annoncés par l'avatar (une puce cliquable apparaît à chaque annonce) -->
                    <div id="roadmap-new-quiz-row" class="${this.newQuizzes.some(q => !this.pendingChips.has(q.title)) ? '' : 'hidden'} w-[46%] sm:w-[42%] flex-shrink-0 min-w-0 border-l border-amber-900/10 pl-2.5 sm:pl-4" aria-label="Nouveaux quiz">
                        <div id="roadmap-new-quiz-chips" class="flex flex-col items-start gap-1">
                            ${this.newQuizzes.filter(q => !this.pendingChips.has(q.title)).map(q => this.newQuizChipHTML(q)).join('')}
                        </div>
                    </div>
                </div>

                <!-- Carte Fantasy Interactive (SVG Path) -->
                <div class="relative p-1 flex-1 flex flex-col justify-center">
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
                                <clipPath id="mountain-clip-3"><path d="M 250 260 L 409 71 Q 440 54 469 72 L 550 260 Z"/></clipPath>
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
                                    <path d="M -10 119.5 Q -8 119.5 -6 122 L 75 190 L 5.3 190 L -1.5 168.4 L 3.6 146.8 L -4 132.4 Z" fill="#c6deeb"/>
                                    <path d="M -27 132.4 L -14 122 Q -10 117 -6 122 L 7 132.4 L 1.3 128.4 L -4.3 135.4 L -10 128.4 L -15.7 135.4 L -21.3 128.4 Z" fill="#edf6fa"/>
                                    <path d="M 15 190 L 91 108 Q 95 103 99 108 L 175 190 Z" fill="#d3e7f1"/>
                                    <path d="M 95 105.5 Q 97 105.5 99 108 L 175 190 L 109.4 190 L 103 164.2 L 107.8 138.4 L 100.6 121.2 Z" fill="#c6deeb"/>
                                    <path d="M 79 121.2 L 91 108 Q 95 103 99 108 L 111 121.2 L 105.7 117.2 L 100.3 124.2 L 95 117.2 L 89.7 124.2 L 84.3 117.2 Z" fill="#edf6fa"/>
                                </g>
                                <!-- Montagne estompée à droite du sommet, derrière la montagne du château -->
                                <g opacity="0.7">
                                    <path d="M 430 190 L 504 38 Q 508 32 512 38 L 586 190 Z" fill="#d3e7f1"/>
                                    <path d="M 508 35 Q 510 35 512 38 L 586 190 L 528 190 L 520 140 L 524 100 L 516 66 Z" fill="#c6deeb"/>
                                    <path d="M 489 69 L 504 38 Q 508 32 512 38 L 527 69 L 520 64 L 514 72 L 508 64 L 501 72 L 495 64 Z" fill="#edf6fa"/>
                                </g>
                                <!-- Montagne estompée derrière la montagne du sommet, entre la montagne centrale et celle du sommet -->
                                <g opacity="0.7">
                                    <path d="M 305 190 L 372 62 Q 376 56 380 62 L 447 190 Z" fill="#d3e7f1"/>
                                    <path d="M 376 59 Q 378 59 380 62 L 447 190 L 391 190 L 385.5 152 L 389.5 118 L 383 84 Z" fill="#c6deeb"/>
                                    <path d="M 361 80 L 372 62 Q 376 56 380 62 L 391 80 L 386 76 L 381 83 L 376 76 L 371 83 L 366 76 Z" fill="#edf6fa"/>
                                </g>
                                <path d="M 190 190 L 261 100 Q 265 95 269 100 L 340 190 Z" fill="#d3e7f1"/>
                                <path d="M 265 97.5 Q 267 97.5 269 100 L 340 190 L 278.5 190 L 272.5 161.8 L 277 133.6 L 270.2 114.8 Z" fill="#c6deeb"/>
                                <path d="M 250 114.8 L 261 100 Q 265 95 269 100 L 280 114.8 L 275 110.8 L 270 117.8 L 265 110.8 L 260 117.8 L 255 110.8 Z" fill="#edf6fa"/>
                                <path d="M 300 190 L 381 86 Q 385 81 389 86 L 470 190 Z" fill="#d3e7f1"/>
                                <path d="M 385 83.5 Q 387 83.5 389 86 L 470 190 L 400.3 190 L 393.5 157.6 L 398.6 125.2 L 390.9 103.6 Z" fill="#c6deeb"/>
                                <path d="M 368 103.6 L 381 86 Q 385 81 389 86 L 402 103.6 L 396.3 99.6 L 390.7 106.6 L 385 99.6 L 379.3 106.6 L 373.7 99.6 Z" fill="#edf6fa"/>
                            </g>

                            <!-- Chaîne de montagnes lointaines (Gris-bleu pastel avec névés nets) -->
                            <!-- NOTE: même construction que la montagne du sommet (sommet arrondi, arête ombrée, neige dentelée), en teintes plus claires pour la profondeur -->
                            <path d="M 120 180 L 196 94 Q 200 89 204 94 L 280 180 Z" fill="#b3d0e4"/>
                            <path d="M 200 91.5 Q 202 91.5 204 94 L 280 180 L 214 180 L 208 156 L 211 130 L 204 108 Z" fill="#9dbdd6"/>
                            <path d="M 180.4 112 L 196 94 Q 200 89 204 94 L 219.6 112 L 214 108 L 209 116 L 204 108 L 198 115 L 192 107 L 186 113 Z" fill="#f7fbfd"/>
                            <path d="M 200 91.5 Q 202 91.5 204 94 L 219.6 112 L 214 108 L 209 116 L 204 108 Z" fill="#dde9f2"/>
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
                            <path d="M 320 66.8 Q 322 66.8 324 69.6 L 420 180 L 340 180 L 332 150 L 336 118 L 327 92 Z" fill="#83a6c4"/>
                            <path d="M 293.9 95 L 316 69.6 Q 320 64 324 69.6 L 346.1 95 L 340 91 L 334 100 L 327 92 L 320 99 L 313 90 L 306 98 L 300 91 Z" fill="#ffffff" opacity="0.95"/>
                            <path d="M 320 66.8 Q 322 66.8 324 69.6 L 346.1 95 L 340 91 L 334 100 L 327 92 Z" fill="#dbe7f0" opacity="0.95"/>
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
                            
                            <!-- Montagne majestueuse du sommet (Pente naturelle continue sans rebord & névé sommital) -->
                            <path d="M 250 260 L 409 71 Q 440 54 469 72 L 550 260 Z" fill="#7599b5"/>
                            <!-- Face ombrée à droite de l'arête (ligne de crête en diagonale) -->
                            <path d="M 448 62.9 Q 460 62 469 72 L 550 260 L 478 260 L 470 220 L 474 180 L 463 140 L 466 104 L 455 80 Z" fill="#5c829e"/>
                            <!-- Reflet de lumière sur la face gauche -->
                            <path d="M 290 260 L 405 80 L 413 70 L 395 130 L 360 200 L 335 260 Z" fill="#88abc6" opacity="0.4"/>

                            <!-- Manteau de neige sommital (bords calés sur les pentes, lisière inférieure dentelée) -->
                            <path d="M 374.6 112 L 409 71 Q 440 54 469 72 L 486 110 L 478 104 L 470 117 L 462 103 L 453 113 L 443 101 L 433 115 L 423 102 L 413 112 L 402 100 L 393 109 L 384 101 Z" fill="#ffffff" opacity="0.95"/>
                            <path d="M 448 62.9 Q 460 62 469 72 L 486 110 L 478 104 L 470 117 L 466 110 L 466 104 L 455 80 Z" fill="#dbe7f0" opacity="0.95"/>

                            <!-- Pied verdoyant de la montagne : deux bandes vertes superposées -->
                            <g clip-path="url(#mountain-clip-3)">
                                <path d="M 300 145 Q 332 140 365 145 T 398 145 T 430 145 T 462 145 T 495 145 T 528 145 T 560 145 L 560 200 L 300 200 Z" fill="#4a8757" opacity="0.75"/>
                                <path d="M 310 158 Q 341 154 372 158 T 404 158 T 435 158 T 466 158 T 498 158 T 529 158 T 560 158 L 560 200 L 310 200 Z" fill="#2f6b45" opacity="0.85"/>
                            </g>
                            <!-- Sapins sur la pente de la montagne du sommet : uniquement dans le tiers inférieur -->
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
                            <!-- NOTE: sommet hors cadre (x=600), même construction que le sommet, teintes plus soutenues que les chaînes lointaines -->
                            <g id="decor-foreground-mountain">
                                <path d="M 430 210 L 592 24 Q 600 16 608 24 L 770 210 Z" fill="#6f93ae"/>
                                <path d="M 600 20 Q 604 20 608 24 L 770 210 L 640 210 L 624 150 L 632 96 L 618 52 Z" fill="#587d99"/>
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

                            <!-- Décor : Arbre d'invocation (même dessin que la page des trophées), posé sur le plateau sommital à la place de l'ancien château -->
                            ${renderTreeSvg({ svgAttrs: 'x="395" y="-26" width="90" height="99" style="overflow:visible"', withFallingFruit: false, groundShadow: false, halo: false })}

                            <!-- Sentier en lacets : ruban d'un seul tenant qui s'affine progressivement (6.5 au village -> 4.2 au lac -> 1.1 à l'arbre), couleur de la terre du village -->
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
                            <g id="decor-eagle" transform="translate(464, 94)">
                                <g class="eagle-float">
                                    <!-- NOTE Aigle fourni par Nicolas (.tmp/aigle.svg, viewBox 2517 x 2947), couleurs ramenées aux bruns de la carte : corps #96623a, ailes #5c3a1e, pattes et bec #f5b52e -->
                                    <g transform="translate(-10.2, -11.9) scale(0.0081)">
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M2086.1,454.3C2085.6,431.1 2083,407.7 2081.7,384.5C2078.2,322.5 2079.6,260.8 2094.8,200.2C2109.9,139.9 2134.9,87.3 2173.7,38.6C2185,24.5 2197.1,9.6 2212.7,0.2C2232.5,152.3 2248.7,305.7 2242.1,459.3C2246.6,445.5 2250.1,431.3 2254.5,417.5C2285.9,318.6 2349.8,182 2445.8,132.2C2438.9,194.9 2435.3,258.3 2429.1,321.2C2426.4,348.5 2422.2,375.6 2418.8,402.9C2404.8,514.4 2389,605.9 2355.3,713.3C2369.5,700.1 2382.8,686 2396.9,672.6C2437.4,634.2 2478.8,595.3 2516.4,554.1C2508,740.5 2430.5,945.2 2316.6,1092.7C2288.1,1129.6 2256.2,1162.8 2221.8,1194.3C2183.1,1229.7 2141.4,1261.2 2101.7,1295.5C1998.5,1384.7 1887.9,1501.3 1880.2,1645.1C1880.1,1646.5 1880.1,1647.8 1880,1649.2C1980.9,1640.2 2119.2,1642.9 2200.7,1710.5C2233.4,1737.6 2252.4,1771.1 2259.5,1813L2260.4,1814C2285.8,1829 2303.3,1852.3 2310.7,1880.9C2316.8,1904.7 2315.8,1933.9 2303.3,1955.5C2300.6,1960.1 2297.5,1964.3 2293.9,1968.3C2284.2,1939.6 2271.1,1931.4 2244.7,1918.3C2227.2,1909.6 2212.4,1903.9 2192.7,1904.5C2175,1905.7 2157,1904.8 2139.4,1906.5C2075.2,1912.9 2033.2,1941.5 1989.1,1986.3C1971.8,2009.5 1958.1,2035.1 1941,2058.5C1871.3,2154 1804.7,2199.8 1701.4,2256.2C1675.1,2270.6 1647.9,2283.4 1620.9,2296.6C1608.8,2302.5 1595.1,2307.8 1583.8,2315.1C1594.8,2352.1 1597.3,2387.8 1578.3,2422.7C1570.5,2437 1559.8,2449.3 1549.2,2461.6C1518.8,2485.2 1487,2492.6 1449.9,2499.4C1445.2,2503 1441.7,2506 1438.3,2510.9C1422.9,2529.4 1413.2,2543.2 1407.7,2567C1375.6,2592.8 1344,2594.2 1304.3,2590C1299.7,2589.5 1295,2588.9 1290.4,2588.3C1254.9,2554.2 1274.3,2511 1263.9,2474.3C1259,2456.8 1248.9,2443.3 1238.2,2429C1236.2,2433.6 1234.1,2438.1 1232,2442.7C1189.3,2533.7 1097.4,2700.5 1021.2,2763.4C1009,2773.4 997,2780.2 982.2,2785.6C977.8,2752.4 984.5,2724.7 993.1,2692.9C968.9,2716.5 939.7,2737.7 911.5,2756.4C885.2,2773.9 799.1,2828.6 771.1,2823C767.8,2820.3 766.3,2819 765.8,2814.5C762.9,2789.4 806.5,2733.4 821.4,2712.7C804.5,2720.6 787.7,2728.7 770.5,2735.9C702.9,2764.3 588.1,2807.4 515.8,2811C509,2811.3 499.2,2812.4 493,2809.3C490.3,2808 490.8,2807.3 490,2804.7C495.6,2773.1 568.7,2716.5 593.8,2695.5C515.3,2727.7 406.8,2747.1 321.7,2755C267.8,2760 209.3,2762.1 156.5,2748.6C150.3,2747 141,2745.7 136.1,2741.7C140.1,2730.4 168,2716.6 178.3,2711.3C226.4,2686.2 277.5,2666.4 326.6,2642.9C478.5,2570.4 630.9,2498.6 778.3,2417.4C817.7,2395.7 855.7,2371.8 893.8,2347.9C948.7,2313.3 1002.9,2277.8 1053.6,2237.1C1112.2,2184.2 1165.6,2123.4 1219.3,2065.6C1187.7,2065.1 1092.6,2061.2 1068.2,2051.1C1064.6,2049.6 1062.5,2049.4 1061,2045.7C1065.7,2030.4 1088.3,2013.6 1100,2002.2C1089.8,2003.4 1079.4,2004.2 1069.2,2004.9C1050.7,2006.1 994,2007.2 980.7,1992.2C978.101,1989.3 976.601,1986.7 977.101,1982.7C979.2,1967.3 1024.4,1934.2 1037.699,1923.8C1020.5,1930.8 1002.8,1934.9 984.4,1937.1C967.9,1939.1 909.4,1943.1 897.2,1930.5C894.5,1927.7 893.101,1925 893.4,1921C894.6,1904.8 945.1,1862.2 958.4,1848C951.1,1849.1 943.8,1850.1 936.4,1851C922.2,1852.7 908,1854.2 893.6,1854.4C873.3,1854.7 801.2,1852.1 789.2,1839.8C785.8,1836.3 786,1835.2 785.8,1830.6C795.6,1811.6 864.5,1755.1 884.8,1739.3C883.6,1739.6 882.3,1739.8 881.1,1740.1C876.9,1741.1 872.7,1742.1 868.4,1742.6C817.6,1749.4 750,1742.8 701,1729.3C694.3,1727.4 682.9,1725 677.9,1720.1C674.7,1717 674.7,1716 674.5,1711.8C684.8,1686.3 752.7,1643.2 779.1,1628.8C720.5,1640.6 647.3,1639.8 591.3,1619.4C621.3,1588.2 658.7,1566.5 695.4,1544.4C634.6,1557.2 563.4,1555 506.4,1528.9C532.1,1502 569.1,1484.5 601.3,1466.5C547,1469.5 447,1461.2 401,1432.8C395.8,1429.6 392.2,1426.5 390.7,1420.4C391.1,1417.3 391.6,1415 393.5,1412.5C398.8,1405.6 407.6,1401.1 415.2,1396.9C446.9,1379.4 478.9,1372.1 514.7,1368.6C421.3,1361 323,1333.6 253.9,1267.5C298.8,1253.7 344.2,1241.4 389.3,1228C360.7,1222.8 332.5,1215.8 304.8,1207.1C233.5,1184 150.8,1142.7 115.4,1073.6C215.6,1073.5 315.7,1069.8 415.6,1062.5C357.9,1044.9 299.3,1027.6 243.5,1004.5C153.3,967.2 46.9,908.7 7.8,814.301C124.4,828.801 239,856 355.3,872C324.7,857.7 294.7,842.2 265.4,825.5C154.1,762.5 35.5,666.4 0,537.9C99.299,590.6 199.1,645.1 301.3,691.9C343.2,711.1 385.8,729.6 428.6,746.6C453.9,756.6 479.7,765.301 504.9,775.7C467.8,749.1 432.6,720 399.5,688.6C286.5,579.4 140.6,415.301 137.6,250.2C180.8,307.2 231.4,360.7 282.4,410.7C459,583.9 663.4,723.4 875.2,849.9C983.3,914.4 1097.2,972.6 1199.1,1046.9C1263.3,1089.6 1308.8,1142.7 1333.5,1216.5C1344,1247.9 1352.2,1280.5 1365.3,1311C1401.6,1287.9 1438.4,1270.8 1478.3,1254.9C1440.2,1232.2 1421.3,1195.8 1409.7,1154.4C1460.5,1150.9 1511.6,1152 1562.2,1157.8C1511.9,1126.7 1482.3,1077.7 1460.8,1024.2C1514.4,1023.7 1567.1,1031.1 1619.9,1039.8C1617,1037.1 1614.2,1034.4 1611.3,1031.7C1571.8,993.6 1536.2,943.1 1535.3,886.4C1583.9,889.5 1632.4,903.1 1677.4,921.4C1673.1,917.801 1668.9,914.301 1664.9,910.4C1614.1,860.801 1579.2,786.7 1578.5,715.301C1625.8,722.9 1705.2,754.801 1745.4,781.1C1715.4,742.901 1687.7,705.7 1667.1,661.301C1642.3,608.1 1628.6,551.4 1649.2,494.7C1698.4,525.301 1742.5,566.7 1785.9,605.001C1802.3,619.401 1818.7,636.1 1836.6,648.401C1807,615.7 1784.8,579.801 1769,538.501C1737.7,456.401 1715.7,343.1 1752.6,260.501C1766.7,271.1 1778.9,284.6 1790.8,297.6C1847,358.401 1889.1,428.1 1926.9,501.501C1937.2,521.6 1943.9,544.801 1955.4,563.901C1955.9,564.801 1956.5,565.7 1957,566.501C1952.5,538.801 1942.7,511.501 1934.6,484.801C1919.7,435.501 1906.2,387.7 1900.1,336.401C1890.2,253.2 1909.3,169.501 1961.6,103.1C1970.3,124.001 1980,144.401 1988.5,165.401C2027,259 2061.399,356.1 2086.1,454.3Z" fill="#96623a"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M138.001,250.3C181.201,307.3 231.801,360.8 282.801,410.8C459.401,584 663.801,723.5 875.601,850C983.701,914.5 1097.6,972.7 1199.5,1047C1191.3,1046.3 1106.5,1009.8 1092.1,1004.2C988.101,963.6 883.401,924.9 778.001,888C737.901,874.1 696.701,856.2 655.501,846.7C661.401,863.7 666.901,880.8 675.701,896.6C703.901,947.6 759.901,988.6 811.301,1013.6C811.701,1013.8 812.101,1014 812.501,1014.2C783.001,1009.3 727.801,996.3 700.901,1004.9C698.601,1007.4 698.001,1007.7 698.301,1011.3C700.201,1034.8 737.601,1069.7 755.201,1083.2C789.401,1109.6 828.701,1131.4 870.701,1142.1L869.301,1146.3C839.501,1146.2 769.301,1148.5 744.601,1162.7C743.201,1165.1 742.601,1164.7 743.501,1167.7C749.301,1188.7 788.801,1210 807.001,1219.1C849.401,1240.4 895.801,1251.6 942.801,1256.8C917.901,1263.8 814.601,1281.9 801.601,1300.9C799.401,1304.2 799.801,1307 801.101,1310.5C809.401,1333.4 879.801,1358.4 900.501,1364.9C936.301,1376.1 972.901,1378.8 1008.8,1388.2C982.601,1396.9 881.401,1433.5 868.401,1453.8C868.201,1458.1 868.101,1460 871.001,1463.3C875.801,1468.9 885.001,1472.8 891.501,1475.9C942.801,1500.4 1001.3,1507.5 1057.1,1514.7C1025.9,1528 951.201,1556.6 936.601,1587.1C944.901,1601.3 979.801,1611.4 994.801,1615.2C1043.199,1627.6 1110.5,1630.5 1160,1625C1130,1640.4 1046.3,1684.8 1030.699,1714.6C1030.8,1718.3 1030.1,1716.8 1032.8,1719.4C1057.7,1743.1 1158.3,1742.3 1194.6,1740.2C1215.3,1739 1236,1737.1 1256.2,1732.4C1249.3,1735.5 1242.5,1738.6 1236.2,1742.8C1216.6,1755.7 1141.9,1814.1 1136.3,1834.9C1135.8,1836.9 1135.2,1838.8 1136.4,1840.7C1140.2,1846.6 1149.9,1848.7 1156.3,1849.7C1218.2,1859.3 1272.9,1839.1 1329.8,1819.1C1329.4,1819.6 1329,1820.2 1328.6,1820.7C1308.5,1846.6 1226,1914.3 1226.5,1942.8C1229,1948.7 1232.1,1951.5 1238,1954C1268.5,1967.2 1335,1956.7 1364.7,1945.4L1365.7,1945C1334.3,1968.2 1302.6,1992.1 1273,2017.6C1255.1,2033 1238.6,2052 1219.4,2065.6C1187.8,2065.1 1092.7,2061.2 1068.3,2051.1C1064.7,2049.6 1062.6,2049.4 1061.1,2045.7C1065.8,2030.4 1088.4,2013.6 1100.1,2002.2C1089.9,2003.4 1079.5,2004.2 1069.3,2004.9C1050.8,2006.1 994.101,2007.2 980.801,1992.2C978.201,1989.3 976.701,1986.7 977.201,1982.7C979.301,1967.3 1024.5,1934.2 1037.8,1923.8C1020.6,1930.8 1002.9,1934.9 984.501,1937.1C968.001,1939.1 909.501,1943.1 897.301,1930.5C894.601,1927.7 893.201,1925 893.501,1921C894.701,1904.8 945.201,1862.2 958.501,1848C951.201,1849.1 943.901,1850.1 936.501,1851C922.301,1852.7 908.101,1854.2 893.701,1854.4C873.401,1854.7 801.301,1852.1 789.301,1839.8C785.901,1836.3 786.101,1835.2 785.901,1830.6C795.701,1811.6 864.601,1755.1 884.901,1739.3C883.701,1739.6 882.401,1739.8 881.201,1740.1C877.001,1741.1 872.801,1742.1 868.501,1742.6C817.701,1749.4 750.101,1742.8 701.101,1729.3C694.401,1727.4 683.001,1725 678.001,1720.1C674.801,1717 674.801,1716 674.601,1711.8C684.901,1686.3 752.801,1643.2 779.201,1628.8C720.601,1640.6 647.401,1639.8 591.401,1619.4C621.401,1588.2 658.801,1566.5 695.501,1544.4C634.701,1557.2 563.501,1555 506.501,1528.9C532.201,1502 569.201,1484.5 601.401,1466.5C547.101,1469.5 447.101,1461.2 401.101,1432.8C395.901,1429.6 392.301,1426.5 390.801,1420.4C391.201,1417.3 391.701,1415 393.601,1412.5C398.901,1405.6 407.701,1401.1 415.301,1396.9C447.001,1379.4 479.001,1372.1 514.801,1368.6C421.401,1361 323.101,1333.6 254.001,1267.5C298.901,1253.7 344.301,1241.4 389.401,1228C360.801,1222.8 332.601,1215.8 304.901,1207.1C233.601,1184 150.901,1142.7 115.501,1073.6C215.701,1073.5 315.801,1069.8 415.701,1062.5C358.001,1044.9 299.4,1027.6 243.601,1004.5C153.401,967.2 47.001,908.7 7.9,814.301C124.5,828.801 239.101,856 355.4,872C324.801,857.7 294.801,842.2 265.5,825.5C154.201,762.5 35.6,666.4 0.1,537.9C99.4,590.6 199.201,645.1 301.4,691.9C343.301,711.1 385.9,729.6 428.701,746.6C454.001,756.6 479.801,765.301 505.001,775.7C467.901,749.1 432.701,720 399.601,688.6C286.901,579.5 141.001,415.4 138.001,250.3Z" fill="#5c3a1e"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M2086.1,454.3C2085.6,431.1 2083,407.7 2081.7,384.5C2078.2,322.5 2079.6,260.8 2094.8,200.2C2109.9,139.9 2134.9,87.3 2173.7,38.6C2185,24.5 2197.1,9.6 2212.7,0.2C2232.5,152.3 2248.7,305.7 2242.1,459.3C2246.6,445.5 2250.1,431.3 2254.5,417.5C2285.9,318.6 2349.8,182 2445.8,132.2C2438.9,194.9 2435.3,258.3 2429.1,321.2C2426.4,348.5 2422.2,375.6 2418.8,402.9C2404.8,514.4 2389,605.9 2355.3,713.3C2340.5,744.4 2326.7,776.7 2310,806.8C2298.5,827.5 2284.7,846.5 2272.6,866.7C2277.3,840.2 2287.7,778.7 2272.2,755.8C2269.9,752.3 2266.7,749.9 2262.5,749.2C2255.3,748 2249.4,752 2244.4,756.6C2208.1,789.9 2187.3,871 2179.5,918.1C2172.5,895.9 2154.5,838.6 2133.7,828.1C2130.3,826.4 2127,825.8 2123.4,827.4C2113.8,831.7 2109.5,846.9 2107.3,856.2C2097.3,897.6 2099.5,943.6 2099.2,985.9C2086,962 2058.399,903.4 2030,895.1C2026.3,894 2024.3,894.4 2021,896.3C2011.1,901.8 2005.3,927.4 2003.6,938.3C1997.3,978.6 2005,1028.6 2022.4,1065.4C1997.2,1038.1 1961.1,981.7 1926.1,970.6C1921.2,971.5 1918.9,973 1916,977.1C1901.8,997.4 1906.8,1037.5 1911.7,1060.4C1917.2,1086.5 1927,1111.4 1940.9,1134.1C1917.2,1112.4 1867.7,1069.3 1833.3,1070.9C1828,1071.1 1823.1,1072.8 1819.5,1076.9C1813.5,1083.8 1813.6,1094.2 1814.6,1102.8C1819.5,1146.5 1842.9,1177.6 1872.9,1208C1846.8,1192.7 1767.3,1153.5 1739.8,1160.4C1736.6,1161.2 1735.2,1162.2 1732.9,1164.4C1727.6,1174.5 1731,1189.7 1734.3,1200.1C1745.8,1236.2 1775.5,1269.4 1805.9,1291C1776.2,1279.1 1697.1,1244.5 1668.3,1253.8C1664.2,1255.1 1661.2,1259 1659.9,1262.9C1656.1,1274.6 1662.5,1289.5 1668.2,1299.7C1688.9,1336.4 1724.1,1362.1 1759.1,1384.1C1721.6,1373.7 1624.1,1331.5 1591.4,1346.4C1588.8,1349.5 1587.9,1351.3 1588.1,1355.5C1589.6,1383.3 1613.6,1409.5 1634,1426C1661,1447.8 1691.6,1461.8 1722.3,1477.1C1687.8,1470.5 1613.4,1452 1582.2,1462.5C1578.4,1466 1577.3,1469.4 1577.2,1474.4C1576.8,1492.7 1585.9,1508.5 1598.5,1521.1C1626.8,1549.5 1668.5,1565.4 1707,1573.7C1686.8,1573.5 1630.2,1569.1 1614.5,1582C1611.9,1587.8 1612.3,1593.2 1614.7,1598.9C1628.7,1633 1665.4,1655.2 1698.2,1668.1C1708.7,1672.2 1719.5,1675.7 1730.2,1679.2C1648,1679.9 1575.8,1644.6 1517.8,1587.8C1452.9,1524.3 1413.8,1441.6 1382.3,1357.8C1377.1,1343.9 1367.4,1325.3 1365.7,1311C1402,1287.9 1438.8,1270.8 1478.7,1254.9C1440.6,1232.2 1421.7,1195.8 1410.1,1154.4C1460.9,1150.9 1512,1152 1562.6,1157.8C1512.3,1126.7 1482.7,1077.7 1461.2,1024.2C1514.8,1023.7 1567.5,1031.1 1620.3,1039.8C1617.4,1037.1 1614.6,1034.4 1611.7,1031.7C1572.2,993.6 1536.6,943.1 1535.7,886.4C1584.3,889.5 1632.8,903.1 1677.8,921.4C1673.5,917.8 1669.3,914.3 1665.3,910.4C1614.5,860.8 1579.6,786.7 1578.9,715.3C1626.2,722.9 1705.6,754.8 1745.8,781.1C1715.8,742.9 1688.1,705.7 1667.5,661.3C1642.7,608.1 1629,551.4 1649.6,494.7C1698.8,525.3 1742.9,566.7 1786.3,605C1802.7,619.4 1819.1,636.1 1837,648.4C1807.4,615.7 1785.2,579.8 1769.4,538.5C1738.1,456.4 1716.1,343.1 1753,260.5C1767.1,271.1 1779.3,284.6 1791.2,297.6C1847.4,358.4 1889.5,428.1 1927.3,501.5C1937.6,521.6 1944.3,544.8 1955.8,563.9C1956.3,564.8 1956.9,565.7 1957.4,566.5C1952.9,538.8 1943.1,511.5 1935,484.8C1920.1,435.5 1906.6,387.7 1900.5,336.4C1890.6,253.2 1909.7,169.5 1962,103.1C1970.7,124 1980.4,144.4 1988.9,165.4C2027,259 2061.399,356.1 2086.1,454.3Z" fill="#5c3a1e"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M1053.7,2237.1L1076.3,2234.8C1055.6,2295.8 930.701,2394.2 877.701,2433C842.101,2459.1 785.801,2494.6 757.201,2527.4C811.501,2527.4 881.901,2490.1 928.301,2461.9C942.401,2453.3 957.101,2440.8 972.101,2434.2C939.601,2465.8 908.601,2502.5 881.901,2539.1C961.001,2524.7 1032.8,2468 1092.5,2417C1069.8,2450.7 1045.3,2484.2 1026.9,2520.5C1097,2501.1 1150.2,2452.9 1200.6,2402.7C1214.8,2388.6 1228,2373.1 1243.4,2360.4C1237.7,2377.4 1228.2,2408 1236,2425.3C1236.9,2427.3 1237.1,2427.4 1238.3,2428.9C1236.3,2433.5 1234.2,2438 1232.1,2442.6C1189.4,2533.6 1097.5,2700.4 1021.3,2763.3C1009.1,2773.3 997.101,2780.1 982.301,2785.5C977.901,2752.3 984.601,2724.6 993.201,2692.8C969.001,2716.4 939.801,2737.6 911.601,2756.3C885.301,2773.8 799.201,2828.5 771.201,2822.9C767.901,2820.2 766.401,2818.9 765.901,2814.4C763.001,2789.3 806.601,2733.3 821.501,2712.6C804.601,2720.5 787.801,2728.6 770.601,2735.8C703.001,2764.2 588.201,2807.3 515.901,2810.9C509.101,2811.2 499.301,2812.3 493.101,2809.2C490.401,2807.9 490.901,2807.2 490.101,2804.6C495.701,2773 568.801,2716.4 593.901,2695.4C515.401,2727.6 406.901,2747 321.801,2754.9C267.901,2759.9 209.401,2762 156.601,2748.5C150.401,2746.9 141.101,2745.6 136.201,2741.6C140.201,2730.3 168.101,2716.5 178.401,2711.2C226.501,2686.1 277.601,2666.3 326.701,2642.8C478.601,2570.3 631.001,2498.5 778.401,2417.3C817.801,2395.6 855.801,2371.7 893.901,2347.8C948.901,2313.3 1003,2277.8 1053.7,2237.1Z" fill="#5c3a1e"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M2035.3,1769.2C2046.7,1753.8 2061.1,1742.5 2080.399,1739.4C2109.3,1734.7 2143.9,1748.4 2166.8,1765.5C2178.4,1774.2 2192.9,1788 2197.2,1802.1C2211,1796.5 2224.4,1797.5 2238.1,1803.3C2246,1806.7 2255.7,1812.9 2260.2,1820.5L2260.5,1814.1C2285.9,1829.1 2303.4,1852.4 2310.8,1881C2316.9,1904.8 2315.9,1934 2303.4,1955.6C2300.7,1960.2 2297.6,1964.4 2294,1968.4C2284.3,1939.7 2271.2,1931.5 2244.8,1918.4C2227.3,1909.7 2212.5,1904 2192.8,1904.6C2175.1,1905.8 2157.1,1904.9 2139.5,1906.6C2075.3,1913 2033.3,1941.6 1989.2,1986.4C1992.3,1969.6 1998.6,1954.5 1995.1,1937C1990.2,1912.2 1971.6,1891.5 1951,1877.8C1900.5,1844.4 1838,1844.7 1780.9,1856.2C1824.2,1835.5 1869.3,1819.4 1914.2,1802.7C1942.9,1792 1972.2,1779.5 2002,1772.6C2013.1,1770.1 2024,1769.6 2035.3,1769.2Z" fill="#f5b52e"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M2035.3,1769.2C2046.7,1753.8 2061.1,1742.5 2080.399,1739.4C2109.3,1734.7 2143.9,1748.4 2166.8,1765.5C2178.4,1774.2 2192.9,1788 2197.2,1802.1C2179,1816.5 2133.5,1836.2 2110.5,1836.5C2079.5,1836.9 2063.6,1813.6 2049.7,1789.6C2046.2,1783.6 2042.9,1775.9 2037.7,1771.3C2036.9,1770.5 2036.1,1769.9 2035.3,1769.2Z" fill="#5c3a1e"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M2098.4,1754.9C2109.4,1755.3 2117.4,1758.5 2127,1763.3C2126.3,1763.7 2125.6,1764.2 2124.9,1764.6C2121.8,1766.5 2119.1,1767.9 2116.9,1770.9C2113.9,1774.8 2111.7,1785.7 2112.8,1790.5C2113.8,1795 2114.9,1795.5 2118.4,1798C2122.8,1798.8 2125.2,1798.5 2129.5,1797.1L2140.5,1793.6C2139.5,1796.8 2136.4,1798.3 2133.9,1800.4C2130.8,1802.5 2127.7,1804.7 2124.4,1806.5C2116.4,1810.8 2106.2,1811.5 2097.7,1808.4C2089.899,1805.5 2083.6,1799.5 2080.3,1791.9C2077.399,1785.3 2076.899,1777.7 2079.7,1771C2083.5,1762.1 2089.899,1758.5 2098.4,1754.9Z" fill="#f5b52e"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M2260.5,1814.1C2285.9,1829.1 2303.4,1852.4 2310.8,1881C2316.9,1904.8 2315.9,1934 2303.4,1955.6C2300.7,1960.2 2297.6,1964.4 2294,1968.4C2284.3,1939.7 2271.2,1931.5 2244.8,1918.4C2227.3,1909.7 2212.5,1904 2192.8,1904.6C2192.6,1902.1 2192.5,1899.6 2192.4,1897.1C2191.3,1857.1 2236.8,1867.3 2255.4,1846.5C2262.2,1839 2260.8,1829.7 2260.3,1820.4L2260.5,1814.1Z" fill="#5c3a1e"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M1521.4,2311.5C1541.4,2314.5 1563.8,2319.4 1583.9,2315.3C1594.9,2352.3 1597.4,2388 1578.4,2422.9C1570.6,2437.2 1559.9,2449.5 1549.3,2461.8C1518.9,2485.4 1487.1,2492.8 1450,2499.6C1491.2,2441.3 1517,2383.3 1521.4,2311.5Z" fill="#5c3a1e"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M870.701,1142.1C874.601,1142.8 878.901,1142.6 882.001,1145.2C877.601,1146.2 873.801,1146.4 869.301,1146.3L870.701,1142.1Z" fill="#5c3a1e"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M1407.8,2567C1409.5,2572.6 1411.5,2576.2 1415.2,2580.7C1432.9,2602.4 1454.3,2621.6 1473.6,2642C1502.2,2672.1 1529.9,2704.4 1560.5,2732.4C1568,2739.2 1575.8,2744.8 1584.7,2749.7C1614.8,2766 1663.1,2777 1674.2,2813.7C1676.1,2819.9 1676.9,2826.7 1677.5,2833.1C1669.6,2825 1662.1,2818.9 1650.2,2818.6C1643,2818.4 1635.3,2821.3 1630,2826.3C1627.1,2829 1624.9,2832.2 1622.8,2835.5C1621.8,2834.2 1621.4,2833.6 1620,2832.5C1614.5,2828 1607,2829.9 1600.6,2830.7C1590.7,2826 1574.5,2823.5 1564.1,2827.1C1560,2828.5 1557.5,2830.2 1554.9,2833.7C1554.3,2837.2 1553.8,2840.6 1553.4,2844.1C1548,2839.4 1540.7,2839.3 1533.8,2839.9C1520.5,2841 1508.3,2846.5 1496.7,2852.8C1478.6,2849.1 1480.1,2836.1 1458.4,2837.8C1470,2818.1 1494.1,2805.5 1495.3,2780.1C1495.6,2773.6 1490.8,2767.8 1486.7,2763.2C1475.2,2750 1459.5,2739 1446.3,2727.5C1415.7,2700.6 1385.7,2673 1354.9,2646.4C1333.9,2628.3 1309.5,2610.6 1291.4,2589.8C1291,2589.4 1290.7,2588.9 1290.3,2588.5C1294.9,2589.2 1299.6,2589.7 1304.2,2590.2C1344,2594.2 1375.7,2592.8 1407.8,2567Z" fill="#f5b52e"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M1449.9,2499.5C1487,2492.7 1518.8,2485.3 1549.2,2461.7C1588.1,2484.7 1624.5,2511.7 1662.1,2536.8C1677,2546.7 1692.2,2558.5 1708.4,2566.2C1725.5,2574.4 1744.5,2570.5 1762.6,2573.9C1781.6,2577.4 1805.8,2591.7 1822.3,2602C1830.6,2607.2 1836.5,2618.6 1839.3,2627.8C1839.4,2628.2 1839.5,2628.6 1839.6,2629C1843.5,2645.6 1847,2659.6 1846.8,2676.8C1830.2,2657.5 1813.5,2636.5 1785.9,2634.8C1780.6,2634.5 1775.3,2634.7 1770.1,2634.8C1772.1,2650 1786.5,2663.7 1785.5,2675.1C1778.8,2667.2 1774.7,2662.5 1763.9,2661.3C1756.6,2660.5 1750.6,2662.1 1745,2666.9C1740,2671.2 1739,2676.2 1737.6,2682.4C1721.9,2673.2 1689.7,2678.1 1672.7,2682.8C1670.1,2683.5 1667.5,2684.4 1664.9,2685.3C1651,2679.1 1639.1,2679.2 1624.3,2680.1C1630.4,2661.6 1654,2627.5 1647.4,2608.8C1643.1,2596.4 1464.1,2521.4 1438.3,2510.9C1441.7,2506.1 1445.2,2503.1 1449.9,2499.5Z" fill="#f5b52e"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M1770.1,2634.9C1766.1,2629.8 1760.6,2626.5 1756.7,2620.8C1756.1,2616.3 1756.1,2615.3 1757.7,2611C1763.4,2606.2 1769.6,2606.1 1776.8,2606.2C1799.9,2606.5 1823.1,2612.1 1839.6,2629C1843.5,2645.6 1847,2659.6 1846.8,2676.8C1830.2,2657.5 1813.5,2636.5 1785.9,2634.8C1780.7,2634.6 1775.4,2634.8 1770.1,2634.9Z" fill="#2b1a0d"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M1553.5,2844C1553.8,2840.5 1554.4,2837.1 1555,2833.6C1557.6,2830.1 1560.1,2828.4 1564.2,2827C1574.6,2823.4 1590.8,2825.9 1600.7,2830.6C1614.3,2852.5 1624.7,2871.8 1618.7,2898.7C1613.9,2920.6 1598.3,2934 1581.5,2947C1588.5,2924.6 1591.1,2901.1 1579.9,2879.4C1573,2866.3 1559.5,2856.6 1553.5,2844Z" fill="#2b1a0d"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M1737.5,2682.6C1738.9,2676.4 1740,2671.4 1744.9,2667.1C1750.5,2662.3 1756.5,2660.6 1763.8,2661.5C1774.6,2662.7 1778.7,2667.3 1785.4,2675.3C1796.4,2701.7 1808.1,2725.5 1796.1,2754.2C1794.4,2758.3 1792.3,2762.1 1790.2,2766C1784.2,2738.3 1778.7,2718.3 1756.6,2699C1750.3,2693.4 1743.1,2688.9 1737.5,2682.6Z" fill="#2b1a0d"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M1622.9,2835.5C1625,2832.2 1627.3,2829 1630.1,2826.3C1635.3,2821.3 1643.1,2818.4 1650.3,2818.6C1662.2,2818.9 1669.6,2825 1677.6,2833.1C1690.3,2860.3 1698.6,2879.3 1687.8,2909.3C1686.4,2913.1 1685.1,2917.1 1681.4,2919C1677.2,2912.1 1679.7,2900.3 1677.2,2892.3C1674.4,2883.3 1668.1,2873.9 1662.4,2866.5C1653.5,2854.7 1627.2,2844.2 1623.2,2836.2L1622.9,2835.5Z" fill="#2b1a0d"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M1458.5,2837.8C1480.2,2836.1 1478.7,2849.1 1496.8,2852.8C1473,2875.5 1458.1,2886.2 1452.7,2920.9C1450.2,2913.4 1448,2905.8 1446.2,2898.1C1441.3,2875.3 1446.3,2856.8 1458.5,2837.8Z" fill="#2b1a0d"/>
                                        </g>
                                        <g transform="matrix(-1,0,0,1,2516.399902,0)">
                                        <path d="M1624.3,2680.2C1639,2679.4 1651,2679.2 1664.9,2685.4C1659.1,2692.2 1653.9,2699.7 1652.3,2708.7C1649.6,2723.9 1658.4,2735.3 1667,2746.7C1650.9,2741.1 1629.4,2730.2 1622,2713.9C1616.3,2701.6 1619.7,2692 1624.3,2680.2Z" fill="#2b1a0d"/>
                                        </g>
                                    </g>
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
                <div class="px-3 py-2 bg-amber-900/5 border-t border-amber-900/10 flex items-center justify-between gap-2 sm:gap-3 text-xs">
                    <div class="flex-1">
                        <div class="flex items-center justify-between font-semibold text-amber-900 mb-1 text-[11px] sm:text-xs">
                            <span class="flex items-center gap-1 min-w-0 truncate">
                                <i class="bi bi-flag-fill text-primary-600 flex-shrink-0"></i>
                                <span class="truncate">Objectif : <strong>${nextMilestone.title}</strong></span>
                            </span>
                            <span class="text-[10px] sm:text-[11px] font-bold text-amber-800 whitespace-nowrap ml-2 flex-shrink-0">${pointsToNext === 0 ? 'Sommet atteint !' : `${pointsIcon()} Encore ${pointsToNext} pt${pointsToNext > 1 ? 's' : ''}`}</span>
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
     * 0 pt au départ (2 %), 100 pts à l'arbre (98 %), donc des graduations régulièrement espacées
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

            const fontSize = m.points >= 100 && !isUnlocked ? 5.4 : 6.6;

            g.innerHTML = `
                <circle cx="0" cy="0" r="12" fill="transparent" pointer-events="all"/>
                <ellipse cx="0" cy="14" rx="3.4" ry="1.2" fill="#7c4004" opacity="0.35" pointer-events="none"/>
                <line x1="0" y1="0" x2="0" y2="14" stroke="#7c4004" stroke-width="1.6" stroke-linecap="round" pointer-events="none"/>
                <circle cx="0" cy="0" r="7.5" fill="${isUnlocked ? '#ff9d00' : '#f4e9dc'}" stroke="#ffffff" stroke-width="1.6" filter="url(#pin-shadow)" pointer-events="none"/>
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
    showMilestoneInfo(milestone, isUnlocked, currentPoints, idPrefix = '') {
        // NOTE idPrefix = 'modal-' pour la copie de la carte en plein écran (ses id sont préfixés)
        const popover = document.getElementById(`${idPrefix}roadmap-milestone-popover`);
        const titleEl = document.getElementById(`${idPrefix}popover-title`);
        const descEl = document.getElementById(`${idPrefix}popover-desc`);
        const iconEl = document.getElementById(`${idPrefix}popover-icon`);

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

        // La carte n'est plus plafonnée en hauteur : elle garde les proportions du dessin
        const svg = clone.querySelector('svg[viewBox^="-20 -46"]');
        // NOTE Dans la petite carte le SVG est étiré (preserveAspectRatio none) et la bulle compense cet étirement : ici le dessin garde ses proportions, donc plus de compensation
        svg?.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        clone.querySelector('[transform^="scale("]')?.setAttribute('transform', 'scale(1, 1)');
        const mapBox = svg?.parentElement;
        if (mapBox) {
            // NOTE Largeur maximale qui tient dans la hauteur de l'écran (en-tête et objectif déduits), sans jamais déformer le dessin
            mapBox.style.width = 'min(100%, calc((100dvh - 240px) * 560 / 328))';
            // NOTE En paysage, styles/main.css (section Carte plein écran) remplit tout l'écran : la zone de carte devient un conteneur dont le dessin prend la plus grande taille possible
            mapBox.classList.add('map-modal-box');
            mapBox.parentElement?.classList.add('map-modal-area');
        }

        // NOTE Même cadre que l'Atelier Avatar (js/modules/ui/modal-frame.js) : la bascule de l'un à l'autre ressemble à un changement d'onglet
        const modal = document.createElement('div');
        modal.className = 'map-modal fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Carte agrandie');
        modal.innerHTML = `
            ${MODAL_BACKDROP_HTML}
            <div class="${MODAL_PANEL_CLASSES}">
                ${modalHeaderHTML({ active: 'map', icon: 'bi-map-fill', title: 'Carte du voyage', badge: 'Aventure', subtitle: 'Ta progression et ton prochain objectif', closeAttrs: 'class-hook="map-close"' })}
                <div class="map-modal-body p-3 sm:p-4 flex-1 min-h-0 flex flex-col"></div>
            </div>
        `;
        modal.querySelector('.map-modal-body').append(clone);
        document.body.appendChild(modal);

        const backdrop = modal.querySelector('.modal-backdrop');
        const panel = modal.querySelector('.modal-panel');
        // NOTE Ouverture animée comme l'atelier (le premier rendu part de l'état masqué)
        requestAnimationFrame(() => requestAnimationFrame(() => {
            backdrop.classList.remove('opacity-0');
            panel.classList.remove('opacity-0', 'scale-95', 'translate-y-4');
            panel.classList.add('opacity-100', 'scale-100', 'translate-y-0');
        }));

        const onKey = (e) => { if (e.key === 'Escape') close(); };
        const close = ({ instant = false } = {}) => {
            document.removeEventListener('keydown', onKey);
            if (instant) { modal.remove(); return; }
            backdrop.classList.add('opacity-0');
            panel.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
            panel.classList.add('opacity-0', 'scale-95', 'translate-y-4');
            setTimeout(() => modal.remove(), 250);
        };
        document.addEventListener('keydown', onKey);
        backdrop.addEventListener('click', () => close());
        modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
        modal.querySelector('[class-hook="map-close"]').addEventListener('click', () => close());

        // NOTE Bascule carte <-> atelier : l'atelier s'ouvre pendant que la carte disparaît d'un coup, puis ramène à la carte (mise à jour) en se fermant
        const goAtelier = () => {
            close({ instant: true });
            avatarCustomizerModal.open(() => this.render(), () => this.openMapModal());
        };
        // NOTE La copie est figée : on rebranche les jalons et la fermeture de l'info-bulle (ids préfixés par modal-)
        const totalPoints = rewardsManager.getTotalPoints();
        modal.querySelectorAll('.milestone-node').forEach((node) => {
            const m = this.milestones.find((x) => x.id === node.getAttribute('data-milestone-id'));
            if (!m) return;
            node.classList.add('cursor-pointer');
            node.addEventListener('click', () => this.showMilestoneInfo(m, totalPoints >= m.points, totalPoints, 'modal-'));
        });
        modal.querySelectorAll('[data-new-quiz-chip]').forEach((chip) => {
            chip.classList.add('cursor-pointer');
            chip.addEventListener('click', () => {
                const quiz = this.newQuizzes.find((q) => q.id === chip.dataset.newQuizChip);
                close({ instant: true });
                if (quiz && typeof this.onPlayNewQuiz === 'function') this.onPlayNewQuiz(quiz);
            });
        });
        modal.querySelector('#modal-close-popover-btn')?.addEventListener('click', () => {
            modal.querySelector('#modal-roadmap-milestone-popover')?.classList.add('hidden');
        });
        modal.querySelector('[data-modal-tab="atelier"]').addEventListener('click', goAtelier);
        modal.querySelectorAll('[id$="open-avatar-customizer-btn"], [id$="roadmap-avatar-toggle"]').forEach((btn) => {
            btn.classList.add('cursor-pointer');
            btn.addEventListener('click', goAtelier);
        });
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

// NOTE L'onglet Carte de l'atelier passe par un événement : roadmap.js importe déjà l'atelier, un import inverse serait circulaire
window.addEventListener('camiludik:open-map', () => roadmapManager.openMapModal());

// =============================================================================
// OUTILS DE DÉVELOPPEMENT & TESTS PROVISOIRES (À EXCLURE DE PRODUCTION)
// =============================================================================
if (typeof window !== 'undefined') {
    window.setScore = (pts) => {
        rewardsManager.setTotalPoints(pts);
        rewardsManager.setLifetimePoints(pts);
        roadmapManager.render();
        console.log(`⭐ [DEV] Score mis à jour : ${pts} pts`);
        return pts;
    };
    window.addScore = (pts = 10) => {
        const cur = rewardsManager.getTotalPoints();
        const next = rewardsManager.setTotalPoints(cur + pts);
        rewardsManager.setLifetimePoints(rewardsManager.getLifetimePoints() + pts);
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
