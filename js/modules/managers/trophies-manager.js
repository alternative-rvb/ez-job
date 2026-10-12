/**
 * Module de gestion de l'affichage des trophées : boutique des skins d'avatar (RPG_TROPHIES)
 */

import { rewardsManager, SUMMON_COST, SUMMON_REFUND, SUMMON_RATES } from './rewards-manager.js';
import { domManager } from '../ui/dom.js';
import { T } from '../core/theme.js';
import { playerManager } from '../core/player.js';
import { RPG_TROPHIES, MANNEQUIN_BOY, MANNEQUIN_GIRL, buildCustomAvatarSvg } from '../ui/avatars.js';
import { avatarCustomizerModal } from '../ui/avatar-modal.js';
import { renderTreeSvg } from '../ui/tree-svg.js';

export { renderTreeSvg };

// ANCHOR Couleur de lueur du fruit d'invocation par rareté (bordures et badges rarity-* / badge-* dans main.css)
const RARITY_GLOW = {
    'rare': 'rgb(102,188,180)',
    'épique': 'rgb(147,51,234)',
    'légendaire': 'rgb(250,204,21)'
};

export class TrophiesManager {
    constructor(onBack) {
        this.onBack = onBack;
        this.listenersReady = false;
    }

    renderSkeleton() {
        const container = document.getElementById('trophies-container');
        if (!container) return;
        container.innerHTML = Array(6).fill(0).map(() => `
            <div class="trophy-card-pokemon rounded-xl overflow-hidden relative skeleton-shimmer-subtle border border-amber-900/10" style="aspect-ratio: 9/16; background-color:#eaddcc">
                <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 space-y-2">
                    <div class="h-3 w-16 rounded skeleton-shimmer"></div>
                    <div class="h-4 w-28 rounded skeleton-shimmer"></div>
                    <div class="h-3 w-full rounded skeleton-shimmer"></div>
                </div>
            </div>
        `).join('');
    }

    show() {
        domManager.showTrophies();
        this.updateStats();
        this.renderSummonPanel();
        this.renderTrophies();

        // NOTE Écouteurs posés une seule fois : show() est rappelé à chaque visite de la page
        if (!this.listenersReady) {
            this.setupEventListeners();
            this.listenersReady = true;
        }
    }

    updateStats() {
        document.getElementById('total-points').textContent = rewardsManager.getTotalPoints();
        const owned = rewardsManager.getUnlockedSkins().length;
        const total = rewardsManager.getSummonPool().length;
        document.getElementById('unlocked-count').textContent = `${owned}/${total}`;
        const bar = document.getElementById('unlocked-bar');
        if (bar) bar.style.width = `${total ? Math.round(owned / total * 100) : 0}%`;
    }

    getRarity(skin) {
        return SUMMON_RATES.find(r => r.rarity === skin.rarity) || SUMMON_RATES[0];
    }

    /**
     * Preset du skin dans le genre actuel du joueur
     */
    getPlayerPreset(skin) {
        return playerManager.getAvatarConfig().type === 'girl' ? skin.girlPreset : skin.boyPreset;
    }

    /**
     * Applique le skin complet à l'avatar du joueur (espèce, coupe, tenue et teintes du preset)
     */
    applySkin(skinId) {
        const skin = rewardsManager.getSummonPool().find(t => t.id === skinId);
        if (!skin || !rewardsManager.isSkinUnlocked(skinId)) return;
        const { id, ...preset } = this.getPlayerPreset(skin);
        playerManager.setAvatarConfig(preset);
        // NOTE Les pastilles des teintes, coupe et tenue restent jusqu'à leur sélection dans l'atelier
        rewardsManager.markItemSeen(`card:${skin.id}`);
        window.dispatchEvent(new CustomEvent('avatar-updated', { detail: { ...preset, playerName: playerManager.playerName } }));
        this.showMessage(`<i class="bi bi-check-circle-fill text-green-400"></i> Skin « ${skin.title} » appliqué à ton avatar ! <button id="btn-open-customizer-from-trophies" class="ml-1 underline font-bold">Ouvrir l\'atelier</button>`, 'success');
        this.renderTrophies();
    }

    // SECTION Arbre d'invocation

    renderTreeSvg() {
        return renderTreeSvg();
    }

    renderSummonPanel() {
        const panel = document.getElementById('summon-panel');
        if (!panel) return;
        const canSummon = rewardsManager.canSummon();
        const missing = Math.max(0, SUMMON_COST - rewardsManager.getTotalPoints());
        const pity = rewardsManager.getPityRemaining();

        const gems = rewardsManager.getTotalPoints();
        const progress = Math.min(100, Math.round(gems / SUMMON_COST * 100));

        panel.innerHTML = `
            <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <div id="summon-tree" class="summon-tree w-44 h-48 sm:w-56 sm:h-60 md:w-64 md:h-[17rem] flex-shrink-0">${this.renderTreeSvg()}</div>
                <div class="flex-1 w-full min-w-0">
                    <div class="flex flex-wrap items-center justify-center md:justify-between gap-x-3 gap-y-1.5 mb-1.5">
                        <h2 class="text-xl sm:text-2xl font-bold flex items-center gap-2" style="color:${T.hexTextPrimary};font-family:'Baloo 2',sans-serif">
                            <i class="bi bi-stars" style="color:${T.hexPrimary}"></i>Arbre d'invocation
                        </h2>
                        <span class="inline-flex items-center gap-1 rounded-full text-[11px] font-bold px-2.5 py-1" style="background:${RARITY_GLOW['légendaire']}22;color:#a16207;border:1px solid ${RARITY_GLOW['légendaire']}77">
                            <i class="bi bi-star-fill"></i>Légendaire garanti dans ${pity} invocation${pity > 1 ? 's' : ''} au plus
                        </span>
                    </div>
                    <p class="text-sm mb-4 text-center md:text-left" style="color:#b46e28">Offre ${SUMMON_COST} gemmes à l'arbre : un fruit magique tombe et révèle un skin. Un doublon te rend ${SUMMON_REFUND} gemmes.</p>

                    <!-- Taux de tirage : une barre segmentée par rareté -->
                    <div class="mb-4">
                        <div class="flex h-2.5 rounded-full overflow-hidden gap-0.5" role="img" aria-label="Taux de tirage par rareté">
                            ${SUMMON_RATES.map(r => `<div style="width:${r.rate}%;background:${RARITY_GLOW[r.rarity]}"></div>`).join('')}
                        </div>
                        <div class="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 mt-1.5">
                            ${SUMMON_RATES.map(r => `<span class="inline-flex items-center gap-1.5 text-[11px] font-semibold" style="color:${T.hexTextPrimary}"><span class="inline-block w-2 h-2 rounded-full" style="background:${RARITY_GLOW[r.rarity]}"></span>${r.label} ${r.rate} %</span>`).join('')}
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                        <button id="btn-summon" class="btn-base btn-primary justify-center px-8 py-3 text-base flex-shrink-0 ${canSummon ? '' : 'opacity-50 cursor-not-allowed'}" ${canSummon ? '' : 'disabled'}>
                            <i class="bi bi-gem"></i>Invoquer · ${SUMMON_COST} gemmes
                        </button>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-baseline justify-between text-[11px] font-semibold mb-1" style="color:#b46e28">
                                <span><i class="bi bi-gem text-yellow-500"></i> ${canSummon ? `${gems} gemmes` : `${gems} / ${SUMMON_COST}`}</span>
                                <span>${canSummon ? 'Prêt à invoquer' : `Encore ${missing} gemme${missing > 1 ? 's' : ''} à gagner dans les quiz`}</span>
                            </div>
                            <div class="h-1.5 rounded-full overflow-hidden" style="background:#eaddcc"><div class="h-full rounded-full" style="width:${progress}%;background:${canSummon ? '#22c55e' : '#facc15'}"></div></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Message d'erreur/succès -->
            <div id="code-message" class="hidden mt-3 p-3 rounded-lg text-sm"></div>
        `;
    }

    /**
     * Lance l'invocation : l'arbre tremble, un fruit de la couleur de la rareté tombe, puis la carte est révélée
     */
    handleSummon() {
        if (this.isSummoning) return;
        const result = rewardsManager.summon();
        if (!result) {
            this.showMessage(`<i class="bi bi-x-circle-fill text-red-400"></i> Il te faut ${SUMMON_COST} gemmes pour invoquer.`, 'error');
            return;
        }
        this.isSummoning = true;
        this.updateStats();

        const tree = document.getElementById('summon-tree');
        const fruit = document.getElementById('summon-falling-fruit');
        const button = document.getElementById('btn-summon');
        if (button) button.disabled = true;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (fruit) fruit.style.color = RARITY_GLOW[result.skin.rarity];
        tree?.classList.add('is-summoning');

        setTimeout(() => {
            tree?.classList.remove('is-summoning');
            this.isSummoning = false;
            this.showSummonReveal(result);
            this.renderSummonPanel();
            this.renderTrophies();
        }, reduceMotion ? 150 : 1700);
    }

    /**
     * Révélation de la carte gagnée (nouveau skin ou doublon)
     */
    showSummonReveal({ skin, isNew, refund }) {
        const { rarity, label } = this.getRarity(skin);
        const avatarSvg = buildCustomAvatarSvg({ ...this.getPlayerPreset(skin), mode: 'full' });
        const modal = document.createElement('div');
        modal.id = 'trophy-modal';
        modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-4 gap-3';
        modal.innerHTML = `
            <p class="summon-reveal-title text-xl sm:text-2xl font-black text-white text-center" style="font-family:'Baloo 2',sans-serif;text-shadow:0 0 18px ${RARITY_GLOW[rarity]}">
                ${isNew ? `Nouveau skin ${label} !` : `Déjà obtenu : +${refund} gemmes rendues`}
            </p>
            <div class="summon-reveal-card trophy-card-pokemon trophy-unlocked rounded-xl overflow-hidden border-2 rarity-${rarity} relative shadow-2xl" style="aspect-ratio: 9/16; height: min(62vh, 520px); max-width: 86vw; background-color:${T.bgSecondary};box-shadow:0 0 40px ${RARITY_GLOW[rarity]}">
                <div class="absolute inset-x-0 top-0 bottom-[30%] px-4 pt-6 flex items-center justify-center pointer-events-none">${avatarSvg}</div>
                ${this.renderCardFace(skin)}
            </div>
            <div class="flex flex-wrap justify-center gap-2">
                ${isNew ? `<button class="trophy-apply-btn btn-base btn-primary" data-skin-id="${skin.id}"><i class="bi bi-person-check-fill"></i>Appliquer</button>` : ''}
                ${rewardsManager.canSummon() ? `<button id="btn-summon-again" class="btn-base btn-secondary"><i class="bi bi-gem"></i>Invoquer encore</button>` : ''}
                <button id="close-trophy-modal" class="btn-base btn-secondary"><i class="bi bi-x-lg"></i>Fermer</button>
            </div>
        `;
        document.body.appendChild(modal);
        this.add3DEffectToModal(modal.querySelector('.summon-reveal-card'));

        if (isNew && typeof confetti === 'function') {
            try { confetti({ particleCount: rarity === 'légendaire' ? 160 : 80, spread: 80, origin: { y: 0.5 } }); } catch (e) {}
        }

        const closeModal = () => modal.remove();
        modal.querySelector('#close-trophy-modal').addEventListener('click', closeModal);
        modal.querySelector('#btn-summon-again')?.addEventListener('click', () => {
            closeModal();
            this.handleSummon();
        });
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    }

    // !SECTION Arbre d'invocation

    // ANCHOR: face d'une carte débloquée, commune à la miniature et à la modale (tailles en unités cqw dans main.css)
    renderCardFace(skin, { zoomable = false } = {}) {
        const { rarity, label } = this.getRarity(skin);
        return `
            <div class="trophy-face absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div class="trophy-face-text">
                    <p class="trophy-face-series text-white/70 font-semibold uppercase tracking-wide truncate">Trophée ${skin.number} · ${skin.speciesName}</p>
                    <h3 class="trophy-face-name font-bold leading-tight text-white truncate">${skin.title}</h3>
                    <p class="trophy-face-desc text-white/80 line-clamp-2">${skin.className} : ${skin.tagline}</p>
                </div>
                <div class="trophy-face-footer flex items-center justify-between border-t" style="border-color:rgba(255,255,255,0.2)">
                    <span class="trophy-face-badge inline-flex items-center badge-${rarity} rounded-full font-bold whitespace-nowrap">
                        <i class="bi bi-star-fill"></i>${label}
                    </span>
                    <div class="trophy-face-actions flex items-center">
                        ${zoomable ? `
                            <button class="trophy-zoom-btn trophy-face-btn inline-flex items-center justify-center rounded-md text-white/80 hover:text-white transition transform hover:scale-110" style="background:${T.primaryA(0.3)}" title="Agrandir" data-trophy-id="${skin.id}">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        ` : ''}
                        <button class="trophy-apply-btn trophy-face-btn inline-flex items-center justify-center rounded-md text-white/90 hover:text-white transition transform hover:scale-110" style="background:${T.secondaryA(0.75)}" title="Appliquer ce skin à mon avatar" data-skin-id="${skin.id}">
                            <i class="bi bi-person-check-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Collection : seules les cartes gagnées s'affichent
     */
    renderTrophies() {
        const container = document.getElementById('trophies-container');
        if (!container) return;
        const pool = rewardsManager.getSummonPool();
        // NOTE Les plus rares en premier, puis par numéro de trophée
        const order = ['légendaire', 'épique', 'rare'];
        const won = pool.filter(skin => rewardsManager.isSkinUnlocked(skin.id))
            .sort((a, b) => order.indexOf(a.rarity) - order.indexOf(b.rarity) || a.number - b.number);

        if (won.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center text-sm py-8 flex flex-col items-center justify-center" style="color:#b46e28">
                    <div class="w-14 h-16 mb-2 pointer-events-none drop-shadow-sm">${renderTreeSvg()}</div>
                    <p>Ta collection est vide pour l'instant : invoque ton premier skin avec l'arbre !</p>
                </div>
            ` + this.renderEmptySlots(pool);
            return;
        }

        container.innerHTML = won.map(skin => {
            const { rarity } = this.getRarity(skin);
            const avatarSvg = buildCustomAvatarSvg({ ...this.getPlayerPreset(skin), mode: 'full' });
            return `
                <div class="trophy-card-pokemon rounded-xl overflow-hidden border-2 rarity-${rarity} trophy-unlocked relative" style="aspect-ratio: 9/16; background-color:${T.bgSecondary}">
                    ${rewardsManager.isNewItem(`card:${skin.id}`) ? '<span class="absolute top-2 right-2 z-10 text-[8px] font-black px-1.5 py-0.5 rounded-full bg-rose-500/85 text-white border border-white/70 backdrop-blur-sm animate-pulse">Nouveau</span>' : ''}
                    <div class="absolute inset-x-0 top-0 bottom-[34%] px-3 pt-2 flex items-center justify-center pointer-events-none">${avatarSvg}</div>
                    ${this.renderCardFace(skin, { zoomable: true })}
                </div>
            `;
        }).join('') + this.renderEmptySlots(pool.filter(skin => !rewardsManager.isSkinUnlocked(skin.id)));

        // Ajouter l'effet 3D sur les cartes débloquées
        this.add3DEffect();

        // Empêcher le clic long sur les cartes
        this.preventLongPress();
    }

    /**
     * Cases vides des skins pas encore gagnés : mannequin neutre grisé, numéro du trophée, clic vers l'arbre
     */
    renderEmptySlots(missing) {
        if (!missing.length) return '';
        const mannequin = playerManager.getAvatarConfig().type === 'girl' ? MANNEQUIN_GIRL : MANNEQUIN_BOY;
        const svg = buildCustomAvatarSvg({ ...mannequin, mode: 'full' });
        return missing.map(skin => `
            <button class="trophy-empty-slot rounded-xl border-2 border-dashed relative overflow-hidden transition hover:scale-[1.02]" style="aspect-ratio: 9/16; border-color:${T.primaryA(0.45)}; background-color:${T.bgSecondary}" data-slot-number="${skin.number}" title="À découvrir avec l'arbre d'invocation">
                <div class="absolute inset-x-0 top-0 bottom-[30%] px-3 pt-2 flex items-center justify-center pointer-events-none" style="opacity:0.6;filter:saturate(0)">${svg}</div>
                <div class="absolute inset-x-0 bottom-0 pb-3 pt-8 text-center flex flex-col items-center gap-0.5" style="color:${T.hexTextPrimary}">
                    <i class="bi bi-question-circle-fill text-xl" style="color:${T.hexPrimary}"></i>
                    <span class="font-bold text-sm">Trophée ${skin.number}</span>
                    <span class="text-[11px]" style="color:#b46e28">À découvrir</span>
                </div>
            </button>`).join('');
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
        // NOTE Délégation d'événement : les cartes sont régénérées à chaque achat
        document.addEventListener('click', (e) => {
            const zoomBtn = e.target.closest('.trophy-zoom-btn');
            if (zoomBtn) this.showTrophyModal(zoomBtn.dataset.trophyId);

            const summonBtn = e.target.closest('#btn-summon');
            if (summonBtn && !summonBtn.disabled) this.handleSummon();

            const applyBtn = e.target.closest('.trophy-apply-btn');
            if (applyBtn) {
                document.getElementById('trophy-modal')?.remove();
                this.applySkin(applyBtn.dataset.skinId);
            }

            if (e.target.closest('.trophy-empty-slot')) document.getElementById('summon-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' });

            if (e.target.closest('#btn-open-customizer-from-trophies')) avatarCustomizerModal.open();
        });

        document.getElementById('btn-back-from-trophies')?.addEventListener('click', () => {
            if (this.onBack) this.onBack();
        });
    }

    showTrophyModal(trophyId) {
        const skin = rewardsManager.getSummonPool().find(t => t.id === trophyId);
        if (!skin) return;
        if (rewardsManager.isNewItem(`card:${skin.id}`)) {
            rewardsManager.markItemSeen(`card:${skin.id}`);
            this.renderTrophies();
        }

        const { rarity } = this.getRarity(skin);
        const avatarSvg = buildCustomAvatarSvg({ ...this.getPlayerPreset(skin), mode: 'full' });

        // Créer la modale
        const modal = document.createElement('div');
        modal.id = 'trophy-modal';
        modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="trophy-card-pokemon-modal trophy-card-pokemon trophy-unlocked rounded-xl overflow-hidden border-2 rarity-${rarity} relative shadow-2xl" style="aspect-ratio: 9/16; height: 80vh; max-width: 90vw; background-color:${T.bgSecondary}">
                <!-- Bouton fermer -->
                <!-- NOTE Croix discrète : petite, translucide, zone de toucher élargie par ::before -->
                <button class="absolute top-2.5 right-2.5 z-[200] w-6 h-6 rounded-full bg-black/25 hover:bg-black/50 text-white/70 hover:text-white backdrop-blur-sm flex items-center justify-center transition before:content-[''] before:absolute before:-inset-2.5" id="close-trophy-modal" aria-label="Fermer">
                    <i class="bi bi-x text-base leading-none"></i>
                </button>

                <!-- Avatar du skin -->
                <div class="absolute inset-x-0 top-0 bottom-[30%] px-4 pt-6 flex items-center justify-center pointer-events-none">${avatarSvg}</div>

                <!-- Dégradé transparent vers noir en bas -->
                ${this.renderCardFace(skin)}
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
        // Sélectionner toutes les cartes de trophées (verrouillées et débloquées)
        const allCards = document.querySelectorAll('.trophy-card-pokemon');

        allCards.forEach(card => {
            const img = card.querySelector('img');
            if (img) {
                // Empêcher le menu contextuel (clic droit / clic long)
                img.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    return false;
                });

                // Empêcher la sélection de l'image
                img.style.userSelect = 'none';
                img.style.webkitUserSelect = 'none';
                img.style.mozUserSelect = 'none';
                img.style.msUserSelect = 'none';

                // Empêcher le drag and drop de l'image
                img.addEventListener('dragstart', (e) => {
                    e.preventDefault();
                    return false;
                });

                // Empêcher le touch callout sur iOS (menu qui apparaît au clic long)
                img.style.webkitTouchCallout = 'none';
            }

            // Appliquer aussi sur toutes les cartes (verrouillées et débloquées)
            card.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                return false;
            });

            card.style.userSelect = 'none';
            card.style.webkitUserSelect = 'none';
            card.style.webkitTouchCallout = 'none';
        });
    }

    showMessage(text, type) {
        const messageDiv = document.getElementById('code-message');
        messageDiv.innerHTML = text;
        messageDiv.className = type === 'success' ? 
            'hidden mt-3 p-3 rounded-lg text-sm bg-green-900/50 text-green-300 border border-green-600' :
            'hidden mt-3 p-3 rounded-lg text-sm bg-red-900/50 text-red-300 border border-red-600';
        messageDiv.classList.remove('hidden');

        setTimeout(() => {
            messageDiv.classList.add('hidden');
        }, 5000);
    }
}