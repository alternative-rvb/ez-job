/**
 * Atelier de Personnalisation de l'Avatar Chibi Manga (Modal interactif)
 * Permet de modifier le genre, la coupe de cheveux (1 à 4), la couleur des cheveux
 * et la couleur des yeux en direct avec aperçu instantané et sauvegarde dans le localStorage.
 */

import { playerManager } from '../core/player.js';
import { rewardsManager } from '../managers/rewards-manager.js';
import { 
    SKIN_COLORS,
    HAIR_COLORS, 
    EYE_COLORS, 
    ALL_SKIN_COLORS,
    ALL_HAIR_COLORS,
    ALL_EYE_COLORS,
    BOY_STYLES, 
    GIRL_STYLES, 
    BOY_OUTFITS,
    GIRL_OUTFITS,
    RPG_STYLES,
    RPG_OUTFITS,
    buildCustomAvatarSvg 
} from './avatars.js';

// ANCHOR Pastille « Nouveau » d'un élément débloqué par un skin, retirée à sa première sélection
const NEW_DOT = '<span class="new-dot absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-rose-500 ring-2 ring-white shadow-md animate-pulse pointer-events-none flex items-center justify-center" title="Nouveau"><i class="bi bi-star-fill text-white" style="font-size:6px"></i></span>';
const NEW_CHIP = '<span class="new-chip absolute -top-1.5 -right-1 z-10 text-[8px] font-black px-1.5 py-0.5 rounded-full bg-rose-500/85 text-white border border-white/70 backdrop-blur-sm pointer-events-none">Nouveau</span>';
const SECTION_CHIP = '<span class="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-rose-500/25 text-rose-200 border border-rose-400/50 backdrop-blur-sm normal-case tracking-normal">Nouveau</span>';
const SPECIES_HUMAN = { id: 'human', label: 'Humain' };

class AvatarCustomizerModal {
    constructor() {
        this.modalId = 'avatar-customizer-modal';
        this.isOpen = false;
        this.state = {
            type: 'boy',
            styleId: 1,
            outfitId: 1,
            hairColor: '#5a2d0c',
            eyeColor: 'brown',
            skinColor: 'light',
            species: 'human',
            styleKey: null,
            outfitKey: null,
            mode: 'full' // 'full' ou 'head'
        };
        this.onSaveCallback = null;
        this.isInitialized = false;
    }

    /**
     * Initialise la structure HTML du modal dans le DOM une seule fois
     */
    initModalStructure() {
        let modalEl = document.getElementById(this.modalId);
        if (modalEl && this.isInitialized) return modalEl;

        if (!modalEl) {
            modalEl = document.createElement('div');
            modalEl.id = this.modalId;
            modalEl.className = 'fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto hidden';
            document.body.appendChild(modalEl);
        }

        modalEl.innerHTML = `
            <!-- Arrière-plan flouté sombre -->
            <div class="modal-backdrop fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300 opacity-0"></div>

            <!-- Panneau Principal -->
            <div class="modal-panel relative bg-gradient-to-b from-primary-900 via-primary-800 to-amber-950 text-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[94vh] transition-all duration-300 transform opacity-0 scale-95 translate-y-4">
                
                <!-- En-tête -->
                <div class="px-4 py-2.5 sm:px-5 sm:py-3 border-b border-white/15 flex items-center justify-between bg-white/5">
                    <div class="flex items-center gap-3">
                        <span class="w-8 h-8 rounded-xl bg-gradient-to-tr from-accent-500 to-amber-400 flex items-center justify-center text-white text-base shadow-md">
                            <i class="bi bi-palette-fill"></i>
                        </span>
                        <div>
                            <h2 class="text-base sm:text-lg font-black text-white flex items-center gap-2 leading-tight">
                                Atelier Avatar
                                <span class="text-xs px-2 py-0.5 rounded-full bg-accent-500/30 text-accent-300 border border-accent-400/40">Chibi Manga</span>
                            </h2>
                            <p class="hidden sm:block text-[11px] text-white/70">Personnalise ton apparence, ta tenue et tes couleurs</p>
                        </div>
                    </div>
                    <button id="modal-close-btn" class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition cursor-pointer" title="Fermer">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                </div>

                <!-- Corps avec Défilement -->
                <div class="p-3 sm:p-4 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    
                    <!-- Colonne GAUCHE : Grand Aperçu Interactif -->
                    <div class="md:col-span-4 self-start sticky -top-3 sm:-top-4 md:top-0 z-20 flex flex-row md:flex-col items-center justify-center gap-4 md:gap-0 bg-primary-900/95 backdrop-blur-md rounded-2xl p-2 sm:p-3 border border-white/10 shadow-lg md:shadow-none">
                        <div class="hidden md:flex text-[11px] font-bold text-accent-300 uppercase tracking-wider mb-1 items-center gap-1.5">
                            <i class="bi bi-eye"></i> Aperçu en Direct
                        </div>

                        <!-- Boîte d'affichage du SVG -->
                        <div id="customizer-avatar-box" class="w-20 h-24 sm:w-28 sm:h-36 md:w-44 md:h-56 flex items-center justify-center transition-all duration-300">
                            <!-- SVG inséré dynamiquement -->
                        </div>

                        <!-- Contrôle de vue (Corps complet / Tête seule) -->
                        <div class="md:mt-1.5 flex flex-col md:flex-row items-stretch gap-1 bg-white/10 p-0.5 rounded-lg border border-white/10">
                            <button type="button" id="view-mode-full" class="view-mode-btn px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer">
                                <i class="bi bi-person-standing"></i> Corps
                            </button>
                            <button type="button" id="view-mode-head" class="view-mode-btn px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer">
                                <i class="bi bi-person-bounding-box"></i> Tête
                            </button>
                        </div>
                    </div>

                    <!-- Colonne DROITE : Sélecteurs & Options -->
                    <div class="md:col-span-8 space-y-3">
                        
                        <!-- 0. Prénom / Pseudo du Joueur -->
                        <div class="bg-black/20 p-2.5 rounded-xl border border-white/10">
                            <div class="flex items-center justify-between mb-1">
                                <label for="customizer-player-name" class="text-[11px] font-bold text-accent-300 uppercase tracking-wider flex items-center gap-1.5">
                                    <i class="bi bi-person-fill text-accent-400"></i> Prénom / Pseudo
                                </label>
                                <span class="text-[10px] text-white/50">Max 30 caractères</span>
                            </div>
                            <div class="relative">
                                <input type="text" id="customizer-player-name" maxlength="30" placeholder="Ton prénom ou pseudo..." autocomplete="off" class="w-full px-3 py-1.5 bg-white/10 border border-white/20 focus:border-accent-400 focus:bg-white/15 rounded-xl text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-accent-400/30 transition placeholder-white/40">
                                <i class="bi bi-pencil-fill absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 text-xs pointer-events-none"></i>
                            </div>
                        </div>

                        <!-- 1. Choix du Genre -->
                        <div>
                            <label class="block text-[11px] font-bold text-accent-300 uppercase tracking-wider mb-1">1. Personnage</label>
                            <div class="grid grid-cols-2 gap-2">
                                <button type="button" id="btn-gender-boy" class="gender-btn flex items-center justify-center gap-2 py-1.5 px-2 rounded-lg font-bold text-xs transition border cursor-pointer">
                                    Garçon
                                </button>
                                <button type="button" id="btn-gender-girl" class="gender-btn flex items-center justify-center gap-2 py-1.5 px-2 rounded-lg font-bold text-xs transition border cursor-pointer">
                                    Fille
                                </button>
                            </div>
                        </div>

                        <!-- 2. Visage : Espèce (débloquée par les skins de la boutique) -->
                        <div>
                            <div class="flex items-center justify-between mb-1">
                                <label class="text-[11px] font-bold text-accent-300 uppercase tracking-wider flex items-center gap-1.5">2. Visage <span id="species-new-chip"></span></label>
                                <span id="selected-species-name" class="text-[10px] font-semibold text-white/70 truncate max-w-[50%] text-right"></span>
                            </div>
                            <div class="grid grid-cols-[repeat(auto-fill,minmax(3.5rem,1fr))] gap-1.5" id="species-picker-container">
                                <!-- Boutons d'espèces insérés dynamiquement -->
                            </div>
                        </div>

                        <!-- 3. Couleur de Peau -->
                        <div>
                            <div class="flex items-center justify-between mb-1">
                                <label class="text-[11px] font-bold text-accent-300 uppercase tracking-wider flex items-center gap-1.5">3. Teint de Peau <span id="skin-new-chip"></span></label>
                                <span id="selected-skin-color-name" class="text-[10px] font-semibold text-white/70 truncate max-w-[50%] text-right"></span>
                            </div>
                            <div class="flex flex-wrap gap-1.5 pt-1" id="skin-color-swatches">
                                <!-- Swatches de peau insérés dynamiquement -->
                            </div>
                        </div>

                        <!-- 3. Choix de la Tenue (BÊTA) -->
                        <div>
                            <div class="flex items-center justify-between mb-1">
                                <label class="text-[11px] font-bold text-accent-300 uppercase tracking-wider flex items-center gap-1.5">
                                    4. Tenue & Classe <span id="outfit-new-chip"></span><span class="px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-300 text-[9px] font-black border border-amber-400/40">BÊTA</span>
                                </label>
                                <span id="selected-outfit-name" class="text-[10px] font-semibold text-white/70 truncate max-w-[50%] text-right"></span>
                            </div>
                            <div class="grid grid-cols-[repeat(auto-fill,minmax(3.5rem,1fr))] gap-1.5" id="outfits-picker-container">
                                <!-- Boutons de tenues insérés dynamiquement -->
                            </div>
                        </div>

                        <!-- 4. Choix de la Coupe de Cheveux -->
                        <div>
                            <div class="flex items-center justify-between mb-1">
                                <label class="text-[11px] font-bold text-accent-300 uppercase tracking-wider flex items-center gap-1.5">5. Coupe de Cheveux <span id="style-new-chip"></span></label>
                                <span id="selected-style-name" class="text-[10px] font-semibold text-white/70 truncate max-w-[50%] text-right"></span>
                            </div>
                            <div class="grid grid-cols-[repeat(auto-fill,minmax(3.5rem,1fr))] gap-1.5" id="hairstyles-picker-container">
                                <!-- Boutons de coupes insérés dynamiquement -->
                            </div>
                        </div>

                        <!-- 5. Couleur des Cheveux -->
                        <div>
                            <div class="flex items-center justify-between mb-1">
                                <label class="text-[11px] font-bold text-accent-300 uppercase tracking-wider flex items-center gap-1.5">6. Teinte des Cheveux <span id="hair-new-chip"></span></label>
                                <span id="selected-hair-color-name" class="text-[10px] font-semibold text-white/70 truncate max-w-[50%] text-right"></span>
                            </div>
                            <div class="flex flex-wrap gap-1.5 pt-1" id="hair-color-swatches">
                                <!-- Swatches insérés dynamiquement -->
                            </div>
                        </div>

                        <!-- 6. Couleur des Yeux (Iris) -->
                        <div>
                            <div class="flex items-center justify-between mb-1">
                                <label class="text-[11px] font-bold text-accent-300 uppercase tracking-wider flex items-center gap-1.5">7. Couleur des Yeux <span id="eye-new-chip"></span></label>
                                <span id="selected-eye-color-name" class="text-[10px] font-semibold text-white/70 truncate max-w-[50%] text-right"></span>
                            </div>
                            <div class="flex flex-wrap gap-1.5 pt-1" id="eye-color-swatches">
                                <!-- Swatches insérés dynamiquement -->
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Pied de page avec Actions -->
                <div class="px-3 py-2 sm:px-5 sm:py-2.5 border-t border-white/15 bg-black/20 flex items-center justify-between gap-2">
                    <button type="button" id="btn-reset-avatar" class="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white/70 hover:text-white hover:bg-white/10 transition flex items-center gap-1.5 cursor-pointer">
                        <i class="bi bi-arrow-counterclockwise"></i> Réinitialiser
                    </button>

                    <div class="flex items-center gap-2 ml-auto">
                        <button type="button" id="btn-cancel-customizer" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition cursor-pointer">
                            Annuler
                        </button>
                        <button type="button" id="btn-save-avatar" class="px-4 py-1.5 rounded-lg text-xs font-black bg-gradient-to-r from-accent-500 to-amber-400 hover:from-accent-400 hover:to-amber-300 text-amber-950 transition shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer">
                            <i class="bi bi-check-circle-fill"></i> Enregistrer
                        </button>
                    </div>
                </div>

            </div>
        `;

        this.bindPermanentEvents(modalEl);
        this.isInitialized = true;
        return modalEl;
    }

    /**
     * Ouvre l'atelier de personnalisation
     * @param {Function} onSave - Callback appelé après sauvegarde pour rafraîchir l'interface
     */
    open(onSave = null) {
        this.onSaveCallback = onSave;
        const current = playerManager.getAvatarConfig();
        this.state = {
            type: current.type || 'boy',
            styleId: current.styleId || 1,
            outfitId: current.outfitId || 1,
            hairColor: current.hairColor || (current.type === 'boy' ? '#5a2d0c' : '#8a3c08'),
            eyeColor: current.eyeColor || (current.type === 'boy' ? 'brown' : 'amber'),
            skinColor: current.skinColor || 'light',
            species: current.species || 'human',
            styleKey: current.styleKey || null,
            outfitKey: current.outfitKey || null,
            mode: 'full'
        };
        this.dropLockedSkinItems();

        const modalEl = this.initModalStructure();

        const nameInput = modalEl.querySelector('#customizer-player-name');
        if (nameInput) {
            nameInput.value = playerManager.playerName || '';
        }

        this.syncUI();

        this.isOpen = true;
        modalEl.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');

        // Animation d'ouverture fluide
        requestAnimationFrame(() => {
            const backdrop = modalEl.querySelector('.modal-backdrop');
            const panel = modalEl.querySelector('.modal-panel');
            if (backdrop) backdrop.classList.remove('opacity-0');
            if (panel) {
                panel.classList.remove('opacity-0', 'scale-95', 'translate-y-4');
                panel.classList.add('opacity-100', 'scale-100', 'translate-y-0');
            }
        });
    }

    /**
     * Ferme le modal sans réinitialiser le DOM
     */
    close() {
        const modalEl = document.getElementById(this.modalId);
        if (!modalEl) return;

        const backdrop = modalEl.querySelector('.modal-backdrop');
        const panel = modalEl.querySelector('.modal-panel');
        if (backdrop) backdrop.classList.add('opacity-0');
        if (panel) {
            panel.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
            panel.classList.add('opacity-0', 'scale-95', 'translate-y-4');
        }

        setTimeout(() => {
            modalEl.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            this.isOpen = false;
        }, 250);
    }

    /**
     * Synchronise tous les composants d'interface selon le state courant
     */
    syncUI() {
        this.updateGenderButtons();
        this.updateViewModeButtons();
        this.renderSpeciesButtons();
        this.renderSkinSwatches();
        this.renderOutfitButtons();
        this.renderHairstyleButtons();
        this.renderHairSwatches();
        this.renderEyeSwatches();
        this.updateLabels();
        this.updatePreview();
    }

    // SECTION Éléments débloqués par les skins de la boutique

    /**
     * Options de rendu de l'avatar à partir du state, avec surcharges éventuelles (miniatures)
     */
    avatarOptions(overrides = {}) {
        return {
            type: this.state.type,
            styleId: this.state.styleId,
            styleKey: this.state.styleKey,
            outfitId: this.state.outfitId,
            outfitKey: this.state.outfitKey,
            species: this.state.species,
            hairColor: this.state.hairColor,
            eyeColor: this.state.eyeColor,
            skinColor: this.state.skinColor,
            mode: 'full',
            ...overrides
        };
    }

    /**
     * Retire du state ce qui n'est plus débloqué (sauvegarde ancienne ou boutique réinitialisée)
     */
    dropLockedSkinItems() {
        const catalog = rewardsManager.getUnlockedCatalog();
        if (this.state.species !== 'human' && !catalog.species.some(s => s.id === this.state.species)) this.state.species = 'human';
        if (this.state.styleKey && !catalog.styles[this.state.type].some(s => s.key === this.state.styleKey)) this.state.styleKey = null;
        if (this.state.outfitKey && !catalog.outfits.some(o => o.key === this.state.outfitKey)) this.state.outfitKey = null;
    }

    /**
     * Palettes affichées : teintes de base + teintes débloquées, dans l'ordre des catalogues complets
     */
    getAvailableSkins() {
        const unlocked = rewardsManager.getUnlockedCatalog().skins;
        const list = ALL_SKIN_COLORS.filter(s => SKIN_COLORS.includes(s) || unlocked.includes(s.id));
        return this.dedupeSwatches(list, s => s.base.toLowerCase(), s => s.id === this.state.skinColor || s.base === this.state.skinColor);
    }

    getAvailableHairs() {
        const unlocked = rewardsManager.getUnlockedCatalog().hairs;
        const list = ALL_HAIR_COLORS.filter(c => HAIR_COLORS.includes(c) || unlocked.includes(c.hex.toLowerCase()));
        return this.dedupeSwatches(list, c => c.hex.toLowerCase(), c => c.hex.toLowerCase() === (this.state.hairColor || '').toLowerCase());
    }

    getAvailableEyes() {
        const unlocked = rewardsManager.getUnlockedCatalog().eyes;
        const list = ALL_EYE_COLORS.filter(e => EYE_COLORS.includes(e) || unlocked.includes(e.id));
        return this.dedupeSwatches(list, e => `${e.dark}|${e.light}`.toLowerCase(), e => e.id === this.state.eyeColor);
    }

    /**
     * Retire les pastilles de même couleur (trophées différents, teinte identique) :
     * garde la première, ou celle actuellement sélectionnée pour qu'elle reste visible
     */
    dedupeSwatches(list, keyOf, isCurrent) {
        const byKey = new Map();
        list.forEach(item => {
            const k = keyOf(item);
            if (!byKey.has(k) || isCurrent(item)) byKey.set(k, item);
        });
        return list.filter(item => byKey.get(keyOf(item)) === item);
    }

    /**
     * Affiche la micro-chip « Nouveau » d'une section si au moins un de ses éléments est nouveau
     */
    setSectionChip(chipId, itemKeys) {
        const chip = document.getElementById(chipId);
        if (chip) chip.innerHTML = itemKeys.some(k => rewardsManager.isNewItem(k)) ? SECTION_CHIP : '';
    }

    /**
     * Sélecteur d'espèce : Humain toujours, puis les espèces des skins achetés
     */
    renderSpeciesButtons() {
        const container = document.getElementById('species-picker-container');
        if (!container) return;

        const species = [SPECIES_HUMAN, ...rewardsManager.getUnlockedCatalog().species];
        container.innerHTML = species.map(sp => {
            const isSelected = this.state.species === sp.id;
            const isNew = rewardsManager.isNewItem(`species:${sp.id}`);
            const thumbSvg = buildCustomAvatarSvg(this.avatarOptions({ species: sp.id, mode: 'head' }));
            return `
                <button type="button" data-species-id="${sp.id}" class="species-btn relative flex flex-col items-center justify-center p-1 rounded-xl border transition-all text-center cursor-pointer ${
                    isSelected ? 'bg-accent-500/25 border-accent-400 ring-2 ring-accent-400/50 shadow-md' : 'bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/30'
                }">
                    ${isNew ? NEW_CHIP : ''}
                    <div class="w-10 h-10 pointer-events-none flex items-center justify-center">${thumbSvg}</div>
                    <span class="text-[9px] font-bold text-white mt-0.5 leading-tight">${sp.label}</span>
                </button>
            `;
        }).join('');
        if (species.length === 1) {
            container.insertAdjacentHTML('beforeend', '<p class="col-span-full text-[10px] text-white/60 leading-snug"><i class="bi bi-trophy"></i> Achète des skins dans les trophées pour débloquer les Elfes et les Orcs.</p>');
        }
        this.setSectionChip('species-new-chip', species.map(sp => `species:${sp.id}`));

        container.querySelectorAll('.species-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.state.species = btn.dataset.speciesId;
                rewardsManager.markItemSeen(`species:${this.state.species}`);
                this.renderSpeciesButtons();
                this.renderOutfitButtons();
                this.renderHairstyleButtons();
                this.updateLabels();
                this.updatePreview();
            });
        });
    }

    // !SECTION Éléments débloqués par les skins de la boutique

    /**
     * Met à jour l'apparence des boutons de genre
     */
    updateGenderButtons() {
        const isBoy = this.state.type === 'boy';
        const boyBtn = document.getElementById('btn-gender-boy');
        const girlBtn = document.getElementById('btn-gender-girl');

        if (boyBtn) {
            boyBtn.className = `gender-btn flex items-center justify-center gap-2 py-1.5 px-2 rounded-lg font-bold text-xs transition border cursor-pointer ${
                isBoy ? 'bg-accent-500 text-white border-accent-300 shadow-md ring-2 ring-accent-400/50' : 'bg-white/10 text-white/80 border-white/10 hover:bg-white/20'
            }`;
        }
        if (girlBtn) {
            girlBtn.className = `gender-btn flex items-center justify-center gap-2 py-1.5 px-2 rounded-lg font-bold text-xs transition border cursor-pointer ${
                !isBoy ? 'bg-accent-500 text-white border-accent-300 shadow-md ring-2 ring-accent-400/50' : 'bg-white/10 text-white/80 border-white/10 hover:bg-white/20'
            }`;
        }
    }

    /**
     * Met à jour l'apparence des boutons de vue
     */
    updateViewModeButtons() {
        const isFull = this.state.mode === 'full';
        const fullBtn = document.getElementById('view-mode-full');
        const headBtn = document.getElementById('view-mode-head');

        if (fullBtn) {
            fullBtn.className = `view-mode-btn px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                isFull ? 'bg-accent-500 text-white shadow' : 'text-white/70 hover:text-white'
            }`;
        }
        if (headBtn) {
            headBtn.className = `view-mode-btn px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                !isFull ? 'bg-accent-500 text-white shadow' : 'text-white/70 hover:text-white'
            }`;
        }
    }

    /**
     * Rendu des pastilles de couleur de peau
     */
    renderSkinSwatches() {
        const container = document.getElementById('skin-color-swatches');
        if (!container) return;

        const skins = this.getAvailableSkins();
        container.innerHTML = skins.map(s => {
            const isSelected = this.state.skinColor === s.id || this.state.skinColor === s.base;
            const isNew = rewardsManager.isNewItem(`skin:${s.id}`);
            return `
                <button type="button" data-skin-id="${s.id}" data-skin-name="${s.name}" class="skin-swatch w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all transform hover:scale-110 relative shadow-md cursor-pointer ${
                    isSelected ? 'border-white ring-2 ring-accent-400 scale-110' : 'border-black/40 hover:border-white/80'
                }" style="background-color: ${s.base};" title="${s.name}">
                    ${isSelected ? '<i class="bi bi-check text-slate-800 text-xs font-black absolute inset-0 flex items-center justify-center drop-shadow"></i>' : ''}
                    ${isNew ? NEW_DOT : ''}
                </button>
            `;
        }).join('');
        this.setSectionChip('skin-new-chip', skins.map(s => `skin:${s.id}`));

        container.querySelectorAll('.skin-swatch').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const skinId = btn.dataset.skinId;
                this.state.skinColor = skinId;
                rewardsManager.markItemSeen(`skin:${skinId}`);
                this.renderSpeciesButtons();
                this.renderSkinSwatches();
                this.renderOutfitButtons();
                this.renderHairstyleButtons();
                this.updateLabels();
                this.updatePreview();
            });
        });
    }

    /**
     * Génère les boutons de tenues (Classes RPG) avec miniatures dynamiques
     */
    renderOutfitButtons() {
        const container = document.getElementById('outfits-picker-container');
        if (!container) return;

        const isBoy = this.state.type === 'boy';
        const outfits = isBoy ? BOY_OUTFITS : GIRL_OUTFITS;

        // NOTE Tenues de base (outfitId) puis tenues des skins achetés (outfitKey)
        const items = [
            ...[1, 2, 3, 4].map(id => ({ id, key: null, label: outfits[id].name.split(' ')[1] || outfits[id].name })),
            ...rewardsManager.getUnlockedCatalog().outfits.map(o => ({ id: null, key: o.key, label: o.label }))
        ];

        container.innerHTML = items.map(item => {
            const isSelected = item.key ? this.state.outfitKey === item.key : (!this.state.outfitKey && this.state.outfitId === item.id);
            const isNew = item.key && rewardsManager.isNewItem(`outfit:${item.key}`);
            const thumbSvg = buildCustomAvatarSvg(this.avatarOptions({
                outfitId: item.id || this.state.outfitId,
                outfitKey: item.key
            }));

            return `
                <button type="button" data-outfit-id="${item.id || ''}" data-outfit-key="${item.key || ''}" class="outfit-thumb-btn relative flex flex-col items-center justify-center p-1 rounded-xl border transition-all text-center cursor-pointer ${
                    isSelected ? 'bg-accent-500/25 border-accent-400 ring-2 ring-accent-400/50 shadow-md' : 'bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/30'
                }">
                    ${isNew ? NEW_CHIP : ''}
                    <div class="w-10 h-11 pointer-events-none flex items-center justify-center">
                        ${thumbSvg}
                    </div>
                    <span class="text-[9px] font-bold text-white mt-0.5 leading-tight truncate w-full">${item.label}</span>
                </button>
            `;
        }).join('');
        this.setSectionChip('outfit-new-chip', items.filter(i => i.key).map(i => `outfit:${i.key}`));

        container.querySelectorAll('.outfit-thumb-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (btn.dataset.outfitKey) {
                    this.state.outfitKey = btn.dataset.outfitKey;
                    rewardsManager.markItemSeen(`outfit:${btn.dataset.outfitKey}`);
                } else {
                    this.state.outfitKey = null;
                    this.state.outfitId = parseInt(btn.dataset.outfitId);
                }
                this.renderOutfitButtons();
                this.updateLabels();
                this.updatePreview();
            });
        });
    }

    /**
     * Génère les boutons de coupes de cheveux avec miniatures dynamiques
     */
    renderHairstyleButtons() {
        const container = document.getElementById('hairstyles-picker-container');
        if (!container) return;

        const isBoy = this.state.type === 'boy';
        const styles = isBoy ? BOY_STYLES : GIRL_STYLES;

        // NOTE Coupes de base (styleId) puis coupes des skins achetés pour ce genre (styleKey)
        const items = [
            ...[1, 2, 3, 4].map(id => ({ id, key: null, label: styles[id].name.split(' ')[1] || styles[id].name })),
            ...rewardsManager.getUnlockedCatalog().styles[this.state.type].map(st => ({ id: null, key: st.key, label: st.label }))
        ];

        container.innerHTML = items.map(item => {
            const isSelected = item.key ? this.state.styleKey === item.key : (!this.state.styleKey && this.state.styleId === item.id);
            const isNew = item.key && rewardsManager.isNewItem(`style:${item.key}`);
            // NOTE L'arrière de la capuche du Nécromancien fait partie de la coupe mais pas des cheveux : on le retire de la miniature
            const thumbSvg = buildCustomAvatarSvg(this.avatarOptions({
                styleId: item.id || this.state.styleId,
                styleKey: item.key,
                outfitId: 1, // Aperçu de coupe au naturel sans couvre-chef
                outfitKey: null,
                mode: 'head'
            })).replace(/<g id="necro-hood-back"[^>]*>\s*<g[^>]*>.*?<\/g>\s*<ellipse[^>]*\/>\s*<\/g>/s, '');

            return `
                <button type="button" data-style-id="${item.id || ''}" data-style-key="${item.key || ''}" class="style-thumb-btn relative flex flex-col items-center justify-center p-1 rounded-xl border transition-all text-center cursor-pointer ${
                    isSelected ? 'bg-accent-500/25 border-accent-400 ring-2 ring-accent-400/50 shadow-md' : 'bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/30'
                }">
                    ${isNew ? NEW_CHIP : ''}
                    <div class="w-10 h-11 pointer-events-none flex items-center justify-center">
                        ${thumbSvg}
                    </div>
                    <span class="text-[9px] font-bold text-white mt-0.5 leading-tight">${item.label}</span>
                </button>
            `;
        }).join('');
        this.setSectionChip('style-new-chip', items.filter(i => i.key).map(i => `style:${i.key}`));

        container.querySelectorAll('.style-thumb-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (btn.dataset.styleKey) {
                    this.state.styleKey = btn.dataset.styleKey;
                    rewardsManager.markItemSeen(`style:${btn.dataset.styleKey}`);
                } else {
                    this.state.styleKey = null;
                    this.state.styleId = parseInt(btn.dataset.styleId);
                }
                this.renderHairstyleButtons();
                this.renderOutfitButtons();
                this.updateLabels();
                this.updatePreview();
            });
        });
    }

    /**
     * Rendu des pastilles de couleur de cheveux
     */
    renderHairSwatches() {
        const container = document.getElementById('hair-color-swatches');
        if (!container) return;

        const hairs = this.getAvailableHairs();
        container.innerHTML = hairs.map(c => {
            const isSelected = this.state.hairColor.toLowerCase() === c.hex.toLowerCase();
            const isNew = rewardsManager.isNewItem(`hair:${c.hex.toLowerCase()}`);
            return `
                <button type="button" data-hair-color="${c.hex}" data-hair-name="${c.name}" class="hair-swatch w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all transform hover:scale-110 relative shadow-md cursor-pointer ${
                    isSelected ? 'border-white ring-2 ring-accent-400 scale-110' : 'border-black/40 hover:border-white/80'
                }" style="background-color: ${c.hex};" title="${c.name}">
                    ${isSelected ? '<i class="bi bi-check text-white text-xs font-black absolute inset-0 flex items-center justify-center drop-shadow"></i>' : ''}
                    ${isNew ? NEW_DOT : ''}
                </button>
            `;
        }).join('');
        this.setSectionChip('hair-new-chip', hairs.map(c => `hair:${c.hex.toLowerCase()}`));

        container.querySelectorAll('.hair-swatch').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const hex = btn.dataset.hairColor;
                this.state.hairColor = hex;
                rewardsManager.markItemSeen(`hair:${hex.toLowerCase()}`);
                this.renderSpeciesButtons();
                this.renderHairSwatches();
                this.renderHairstyleButtons();
                this.renderOutfitButtons();
                this.updateLabels();
                this.updatePreview();
            });
        });
    }

    /**
     * Rendu des pastilles de couleur des yeux
     */
    renderEyeSwatches() {
        const container = document.getElementById('eye-color-swatches');
        if (!container) return;

        const eyes = this.getAvailableEyes();
        container.innerHTML = eyes.map(e => {
            const isSelected = this.state.eyeColor === e.id;
            const isNew = rewardsManager.isNewItem(`eye:${e.id}`);
            return `
                <button type="button" data-eye-id="${e.id}" data-eye-name="${e.name}" class="eye-swatch w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all transform hover:scale-110 relative shadow-md cursor-pointer ${
                    isSelected ? 'border-white ring-2 ring-accent-400 scale-110' : 'border-black/40 hover:border-white/80'
                }" title="${e.name}">
                    <div class="w-full h-full rounded-full pointer-events-none" style="background: radial-gradient(circle at 35% 35%, ${e.light} 0%, ${e.dark} 70%);"></div>
                    ${isSelected ? '<i class="bi bi-check text-white text-xs font-black absolute inset-0 flex items-center justify-center drop-shadow pointer-events-none"></i>' : ''}
                    ${isNew ? NEW_DOT : ''}
                </button>
            `;
        }).join('');
        this.setSectionChip('eye-new-chip', eyes.map(e => `eye:${e.id}`));

        container.querySelectorAll('.eye-swatch').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const eyeId = btn.dataset.eyeId;
                this.state.eyeColor = eyeId;
                rewardsManager.markItemSeen(`eye:${eyeId}`);
                this.renderSpeciesButtons();
                this.renderEyeSwatches();
                this.renderHairstyleButtons();
                this.renderOutfitButtons();
                this.updateLabels();
                this.updatePreview();
            });
        });
    }

    /**
     * Met à jour les libellés descriptifs des options sélectionnées
     */
    updateLabels() {
        const isBoy = this.state.type === 'boy';
        const styles = isBoy ? BOY_STYLES : GIRL_STYLES;
        const currentStyle = (this.state.styleKey && RPG_STYLES[this.state.styleKey]) || styles[this.state.styleId] || styles[1];
        
        const styleNameEl = document.getElementById('selected-style-name');
        if (styleNameEl) styleNameEl.textContent = currentStyle.name;

        const outfits = isBoy ? BOY_OUTFITS : GIRL_OUTFITS;
        const currentOutfit = (this.state.outfitKey && RPG_OUTFITS[this.state.outfitKey]) || outfits[this.state.outfitId] || outfits[1];
        const outfitNameEl = document.getElementById('selected-outfit-name');
        if (outfitNameEl) outfitNameEl.textContent = currentOutfit.name;

        const currentSpecies = [SPECIES_HUMAN, ...rewardsManager.getUnlockedCatalog().species].find(sp => sp.id === this.state.species);
        const speciesNameEl = document.getElementById('selected-species-name');
        if (speciesNameEl) speciesNameEl.textContent = currentSpecies ? currentSpecies.label : SPECIES_HUMAN.label;

        const currentSkin = ALL_SKIN_COLORS.find(s => s.id === this.state.skinColor || s.base === this.state.skinColor);
        const skinNameEl = document.getElementById('selected-skin-color-name');
        if (skinNameEl) skinNameEl.textContent = currentSkin ? currentSkin.name : this.state.skinColor;

        const currentHair = ALL_HAIR_COLORS.find(c => c.hex.toLowerCase() === this.state.hairColor.toLowerCase());
        const hairNameEl = document.getElementById('selected-hair-color-name');
        if (hairNameEl) hairNameEl.textContent = currentHair ? currentHair.name : this.state.hairColor;

        const currentEye = ALL_EYE_COLORS.find(e => e.id === this.state.eyeColor);
        const eyeNameEl = document.getElementById('selected-eye-color-name');
        if (eyeNameEl) eyeNameEl.textContent = currentEye ? currentEye.name : this.state.eyeColor;
    }

    /**
     * Met à jour l'aperçu SVG en direct
     */
    updatePreview() {
        const box = document.getElementById('customizer-avatar-box');
        if (!box) return;

        const svgCode = buildCustomAvatarSvg(this.avatarOptions({ mode: this.state.mode }));

        box.innerHTML = svgCode;
    }

    /**
     * Attache les écouteurs d'événements permanents
     */
    bindPermanentEvents(modalEl) {
        // Fermeture
        modalEl.querySelector('#modal-close-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.close();
        });
        modalEl.querySelector('#btn-cancel-customizer')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.close();
        });
        modalEl.querySelector('.modal-backdrop')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.close();
        });

        // Changement de genre (Garçon)
        modalEl.querySelector('#btn-gender-boy')?.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.state.type !== 'boy') {
                this.state.type = 'boy';
                this.state.styleId = 1;
                this.state.styleKey = null;
                this.state.hairColor = '#5a2d0c';
                this.state.eyeColor = 'brown';
                this.syncUI();
            }
        });

        // Changement de genre (Fille)
        modalEl.querySelector('#btn-gender-girl')?.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.state.type !== 'girl') {
                this.state.type = 'girl';
                this.state.styleId = 1;
                this.state.styleKey = null;
                this.state.hairColor = '#8a3c08';
                this.state.eyeColor = 'amber';
                this.syncUI();
            }
        });

        // Mode de vue : Corps vs Tête
        modalEl.querySelector('#view-mode-full')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.state.mode = 'full';
            this.updateViewModeButtons();
            this.updatePreview();
        });

        modalEl.querySelector('#view-mode-head')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.state.mode = 'head';
            this.updateViewModeButtons();
            this.updatePreview();
        });

        // Bouton Réinitialiser
        modalEl.querySelector('#btn-reset-avatar')?.addEventListener('click', (e) => {
            e.stopPropagation();
            const isBoy = this.state.type === 'boy';
            this.state.styleId = 1;
            this.state.outfitId = 1;
            this.state.hairColor = isBoy ? '#5a2d0c' : '#8a3c08';
            this.state.eyeColor = isBoy ? 'brown' : 'amber';
            this.state.skinColor = 'light';
            this.state.species = 'human';
            this.state.styleKey = null;
            this.state.outfitKey = null;
            this.syncUI();
        });

        // Bouton Enregistrer
        modalEl.querySelector('#btn-save-avatar')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.save();
        });

        // Échap pour fermer
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    /**
     * Sauvegarde la configuration dans le localStorage et actualise l'application
     */
    save() {
        const configToSave = {
            type: this.state.type,
            styleId: this.state.styleId,
            outfitId: this.state.outfitId,
            hairColor: this.state.hairColor,
            eyeColor: this.state.eyeColor,
            skinColor: this.state.skinColor,
            species: this.state.species,
            styleKey: this.state.styleKey,
            outfitKey: this.state.outfitKey
        };

        // Mise à jour du prénom / pseudo du joueur
        const nameInput = document.getElementById('customizer-player-name');
        let newName = playerManager.playerName;
        if (nameInput) {
            const trimmedName = nameInput.value.trim();
            if (trimmedName.length > 0) {
                newName = trimmedName;
                playerManager.setPlayerName(trimmedName);

                // Mettre à jour l'affichage dans le hero et la navigation
                const playerDisplay = document.getElementById('player-name-display');
                if (playerDisplay) playerDisplay.textContent = trimmedName;

                const navPlayerBtn = document.getElementById('nav-player-btn');
                if (navPlayerBtn) {
                    navPlayerBtn.innerHTML = `<i class="bi bi-person"></i><span>${trimmedName}</span>`;
                }

                const mobilePlayerBtn = document.getElementById('mobile-player-btn');
                if (mobilePlayerBtn) {
                    mobilePlayerBtn.innerHTML = `<i class="bi bi-person"></i><span>${trimmedName}</span>`;
                }
            }
        }

        playerManager.setAvatarConfig(configToSave);

        // Déclencher confettis si disponibles
        if (typeof confetti === 'function') {
            try {
                confetti({
                    particleCount: 40,
                    spread: 60,
                    origin: { y: 0.7 }
                });
            } catch (e) {}
        }

        this.close();

        // Callback de rafraîchissement
        if (typeof this.onSaveCallback === 'function') {
            this.onSaveCallback({ ...configToSave, playerName: newName });
        }

        // Événement personnalisé global pour toute vue
        window.dispatchEvent(new CustomEvent('avatar-updated', { detail: { ...configToSave, playerName: newName } }));
    }
}

export const avatarCustomizerModal = new AvatarCustomizerModal();
