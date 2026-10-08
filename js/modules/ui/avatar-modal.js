/**
 * Atelier de Personnalisation de l'Avatar Chibi Manga (Modal interactif)
 * Permet de modifier le genre, la coupe de cheveux (1 à 4), la couleur des cheveux
 * et la couleur des yeux en direct avec aperçu instantané et sauvegarde dans le localStorage.
 */

import { playerManager } from '../core/player.js';
import { 
    SKIN_COLORS,
    HAIR_COLORS, 
    EYE_COLORS, 
    BOY_STYLES, 
    GIRL_STYLES, 
    BOY_OUTFITS,
    GIRL_OUTFITS,
    buildCustomAvatarSvg 
} from './avatars.js';

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
            modalEl.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto hidden';
            document.body.appendChild(modalEl);
        }

        modalEl.innerHTML = `
            <!-- Arrière-plan flouté sombre -->
            <div class="modal-backdrop fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300 opacity-0"></div>

            <!-- Panneau Principal -->
            <div class="modal-panel relative bg-gradient-to-b from-primary-900 via-primary-800 to-amber-950 text-white w-full max-w-3xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[92vh] transition-all duration-300 transform opacity-0 scale-95 translate-y-4">
                
                <!-- En-tête -->
                <div class="px-5 py-4 sm:px-6 border-b border-white/15 flex items-center justify-between bg-white/5">
                    <div class="flex items-center gap-3">
                        <span class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-accent-500 to-amber-400 flex items-center justify-center text-white text-xl shadow-md">
                            <i class="bi bi-palette-fill"></i>
                        </span>
                        <div>
                            <h2 class="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                                Atelier Avatar
                                <span class="text-xs px-2 py-0.5 rounded-full bg-accent-500/30 text-accent-300 border border-accent-400/40">Chibi Manga</span>
                            </h2>
                            <p class="text-xs text-white/70">Personnalise ton apparence, ta tenue et tes couleurs</p>
                        </div>
                    </div>
                    <button id="modal-close-btn" class="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition cursor-pointer" title="Fermer">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                </div>

                <!-- Corps avec Défilement -->
                <div class="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    <!-- Colonne GAUCHE : Grand Aperçu Interactif -->
                    <div class="md:col-span-5 flex flex-col items-center justify-center bg-black/25 rounded-2xl p-4 border border-white/10 relative">
                        <div class="text-xs font-bold text-accent-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <i class="bi bi-eye"></i> Aperçu en Direct
                        </div>

                        <!-- Boîte d'affichage du SVG -->
                        <div id="customizer-avatar-box" class="w-44 h-56 sm:w-48 sm:h-60 flex items-center justify-center transition-all duration-300 transform hover:scale-105">
                            <!-- SVG inséré dynamiquement -->
                        </div>

                        <!-- Contrôle de vue (Corps complet / Tête seule) -->
                        <div class="mt-3 flex items-center gap-1.5 bg-white/10 p-1 rounded-xl border border-white/10">
                            <button type="button" id="view-mode-full" class="view-mode-btn px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer">
                                <i class="bi bi-person-standing"></i> Corps
                            </button>
                            <button type="button" id="view-mode-head" class="view-mode-btn px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer">
                                <i class="bi bi-person-bounding-box"></i> Tête
                            </button>
                        </div>
                    </div>

                    <!-- Colonne DROITE : Sélecteurs & Options -->
                    <div class="md:col-span-7 space-y-5">
                        
                        <!-- 1. Choix du Genre -->
                        <div>
                            <label class="block text-xs font-bold text-accent-300 uppercase tracking-wider mb-2">1. Personnage</label>
                            <div class="grid grid-cols-2 gap-2.5">
                                <button type="button" id="btn-gender-boy" class="gender-btn flex items-center justify-center gap-2 p-2.5 rounded-xl font-bold text-xs transition border cursor-pointer">
                                    Garçon
                                </button>
                                <button type="button" id="btn-gender-girl" class="gender-btn flex items-center justify-center gap-2 p-2.5 rounded-xl font-bold text-xs transition border cursor-pointer">
                                    Fille
                                </button>
                            </div>
                        </div>

                        <!-- 2. Couleur de Peau -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="text-xs font-bold text-accent-300 uppercase tracking-wider">2. Teint de Peau</label>
                                <span id="selected-skin-color-name" class="text-[11px] font-semibold text-white/80"></span>
                            </div>
                            <div class="flex flex-wrap gap-2" id="skin-color-swatches">
                                <!-- Swatches de peau insérés dynamiquement -->
                            </div>
                        </div>

                        <!-- 3. Choix de la Tenue (BÊTA) -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="text-xs font-bold text-accent-300 uppercase tracking-wider flex items-center gap-1.5">
                                    3. Tenue & Classe <span class="px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-300 text-[9px] font-black border border-amber-400/40">BÊTA</span>
                                </label>
                                <span id="selected-outfit-name" class="text-[11px] font-semibold text-white/80"></span>
                            </div>
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2" id="outfits-picker-container">
                                <!-- Boutons de tenues insérés dynamiquement -->
                            </div>
                        </div>

                        <!-- 4. Choix de la Coupe de Cheveux -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="text-xs font-bold text-accent-300 uppercase tracking-wider">4. Coupe de Cheveux</label>
                                <span id="selected-style-name" class="text-[11px] font-semibold text-white/80"></span>
                            </div>
                            <div class="grid grid-cols-4 gap-2" id="hairstyles-picker-container">
                                <!-- Boutons de coupes insérés dynamiquement -->
                            </div>
                        </div>

                        <!-- 5. Couleur des Cheveux -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="text-xs font-bold text-accent-300 uppercase tracking-wider">5. Teinte des Cheveux</label>
                                <span id="selected-hair-color-name" class="text-[11px] font-semibold text-white/80"></span>
                            </div>
                            <div class="flex flex-wrap gap-2" id="hair-color-swatches">
                                <!-- Swatches insérés dynamiquement -->
                            </div>
                        </div>

                        <!-- 6. Couleur des Yeux (Iris) -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="text-xs font-bold text-accent-300 uppercase tracking-wider">6. Couleur des Yeux</label>
                                <span id="selected-eye-color-name" class="text-[11px] font-semibold text-white/80"></span>
                            </div>
                            <div class="flex flex-wrap gap-2" id="eye-color-swatches">
                                <!-- Swatches insérés dynamiquement -->
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Pied de page avec Actions -->
                <div class="px-5 py-3.5 sm:px-6 border-t border-white/15 bg-black/20 flex flex-wrap items-center justify-between gap-3">
                    <button type="button" id="btn-reset-avatar" class="px-3 py-2 rounded-xl text-xs font-bold text-white/70 hover:text-white hover:bg-white/10 transition flex items-center gap-1.5 cursor-pointer">
                        <i class="bi bi-arrow-counterclockwise"></i> Réinitialiser
                    </button>

                    <div class="flex items-center gap-2 ml-auto">
                        <button type="button" id="btn-cancel-customizer" class="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition cursor-pointer">
                            Annuler
                        </button>
                        <button type="button" id="btn-save-avatar" class="px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-accent-500 to-amber-400 hover:from-accent-400 hover:to-amber-300 text-amber-950 transition shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer">
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
            mode: 'full'
        };

        const modalEl = this.initModalStructure();

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
        this.renderSkinSwatches();
        this.renderOutfitButtons();
        this.renderHairstyleButtons();
        this.renderHairSwatches();
        this.renderEyeSwatches();
        this.updateLabels();
        this.updatePreview();
    }

    /**
     * Met à jour l'apparence des boutons de genre
     */
    updateGenderButtons() {
        const isBoy = this.state.type === 'boy';
        const boyBtn = document.getElementById('btn-gender-boy');
        const girlBtn = document.getElementById('btn-gender-girl');

        if (boyBtn) {
            boyBtn.className = `gender-btn flex items-center justify-center gap-2 p-2.5 rounded-xl font-bold text-xs transition border cursor-pointer ${
                isBoy ? 'bg-accent-500 text-white border-accent-300 shadow-md ring-2 ring-accent-400/50' : 'bg-white/10 text-white/80 border-white/10 hover:bg-white/20'
            }`;
        }
        if (girlBtn) {
            girlBtn.className = `gender-btn flex items-center justify-center gap-2 p-2.5 rounded-xl font-bold text-xs transition border cursor-pointer ${
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

        container.innerHTML = SKIN_COLORS.map(s => {
            const isSelected = this.state.skinColor === s.id || this.state.skinColor === s.base;
            return `
                <button type="button" data-skin-id="${s.id}" data-skin-name="${s.name}" class="skin-swatch w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all transform hover:scale-110 relative shadow-md cursor-pointer ${
                    isSelected ? 'border-white ring-2 ring-accent-400 scale-110' : 'border-black/40 hover:border-white/80'
                }" style="background-color: ${s.base};" title="${s.name}">
                    ${isSelected ? '<i class="bi bi-check text-slate-800 text-xs font-black absolute inset-0 flex items-center justify-center drop-shadow"></i>' : ''}
                </button>
            `;
        }).join('');

        container.querySelectorAll('.skin-swatch').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const skinId = btn.dataset.skinId;
                this.state.skinColor = skinId;
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

        container.innerHTML = [1, 2, 3, 4].map(id => {
            const outfit = outfits[id];
            const isSelected = this.state.outfitId === id;
            const thumbSvg = buildCustomAvatarSvg({
                type: this.state.type,
                styleId: this.state.styleId,
                outfitId: id,
                hairColor: this.state.hairColor,
                eyeColor: this.state.eyeColor,
                skinColor: this.state.skinColor,
                mode: 'full'
            });

            return `
                <button type="button" data-outfit-id="${id}" class="outfit-thumb-btn flex flex-col items-center justify-center p-2 rounded-2xl border transition-all text-center cursor-pointer ${
                    isSelected ? 'bg-accent-500/25 border-accent-400 ring-2 ring-accent-400/50 scale-105 shadow-md' : 'bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/30'
                }">
                    <div class="w-12 h-14 pointer-events-none flex items-center justify-center">
                        ${thumbSvg}
                    </div>
                    <span class="text-[10px] font-bold text-white mt-1 leading-tight truncate w-full">${outfit.name.split(' ')[1] || outfit.name}</span>
                </button>
            `;
        }).join('');

        container.querySelectorAll('.outfit-thumb-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const outfitId = parseInt(btn.dataset.outfitId);
                this.state.outfitId = outfitId;
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

        container.innerHTML = [1, 2, 3, 4].map(id => {
            const style = styles[id];
            const isSelected = this.state.styleId === id;
            const thumbSvg = buildCustomAvatarSvg({
                type: this.state.type,
                styleId: id,
                outfitId: 1, // Aperçu de coupe au naturel sans couvre-chef
                hairColor: this.state.hairColor,
                eyeColor: this.state.eyeColor,
                skinColor: this.state.skinColor,
                mode: 'head'
            });

            return `
                <button type="button" data-style-id="${id}" class="style-thumb-btn flex flex-col items-center justify-center p-2 rounded-2xl border transition-all text-center cursor-pointer ${
                    isSelected ? 'bg-accent-500/25 border-accent-400 ring-2 ring-accent-400/50 scale-105 shadow-md' : 'bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/30'
                }">
                    <div class="w-12 h-14 pointer-events-none flex items-center justify-center">
                        ${thumbSvg}
                    </div>
                    <span class="text-[10px] font-bold text-white mt-1 leading-tight">${style.name.split(' ')[1] || style.name}</span>
                </button>
            `;
        }).join('');

        container.querySelectorAll('.style-thumb-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const styleId = parseInt(btn.dataset.styleId);
                this.state.styleId = styleId;
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

        container.innerHTML = HAIR_COLORS.map(c => {
            const isSelected = this.state.hairColor.toLowerCase() === c.hex.toLowerCase();
            return `
                <button type="button" data-hair-color="${c.hex}" data-hair-name="${c.name}" class="hair-swatch w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all transform hover:scale-110 relative shadow-md cursor-pointer ${
                    isSelected ? 'border-white ring-2 ring-accent-400 scale-110' : 'border-black/40 hover:border-white/80'
                }" style="background-color: ${c.hex};" title="${c.name}">
                    ${isSelected ? '<i class="bi bi-check text-white text-xs font-black absolute inset-0 flex items-center justify-center drop-shadow"></i>' : ''}
                </button>
            `;
        }).join('');

        container.querySelectorAll('.hair-swatch').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const hex = btn.dataset.hairColor;
                this.state.hairColor = hex;
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

        container.innerHTML = EYE_COLORS.map(e => {
            const isSelected = this.state.eyeColor === e.id;
            return `
                <button type="button" data-eye-id="${e.id}" data-eye-name="${e.name}" class="eye-swatch w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all transform hover:scale-110 relative shadow-md overflow-hidden cursor-pointer ${
                    isSelected ? 'border-white ring-2 ring-accent-400 scale-110' : 'border-black/40 hover:border-white/80'
                }" title="${e.name}">
                    <div class="w-full h-full pointer-events-none" style="background: radial-gradient(circle at 35% 35%, ${e.light} 0%, ${e.dark} 70%);"></div>
                    ${isSelected ? '<i class="bi bi-check text-white text-xs font-black absolute inset-0 flex items-center justify-center drop-shadow pointer-events-none"></i>' : ''}
                </button>
            `;
        }).join('');

        container.querySelectorAll('.eye-swatch').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const eyeId = btn.dataset.eyeId;
                this.state.eyeColor = eyeId;
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
        const currentStyle = styles[this.state.styleId] || styles[1];
        
        const styleNameEl = document.getElementById('selected-style-name');
        if (styleNameEl) styleNameEl.textContent = currentStyle.name;

        const outfits = isBoy ? BOY_OUTFITS : GIRL_OUTFITS;
        const currentOutfit = outfits[this.state.outfitId] || outfits[1];
        const outfitNameEl = document.getElementById('selected-outfit-name');
        if (outfitNameEl) outfitNameEl.textContent = currentOutfit.name;

        const currentSkin = SKIN_COLORS.find(s => s.id === this.state.skinColor || s.base === this.state.skinColor);
        const skinNameEl = document.getElementById('selected-skin-color-name');
        if (skinNameEl) skinNameEl.textContent = currentSkin ? currentSkin.name : this.state.skinColor;

        const currentHair = HAIR_COLORS.find(c => c.hex.toLowerCase() === this.state.hairColor.toLowerCase());
        const hairNameEl = document.getElementById('selected-hair-color-name');
        if (hairNameEl) hairNameEl.textContent = currentHair ? currentHair.name : this.state.hairColor;

        const currentEye = EYE_COLORS.find(e => e.id === this.state.eyeColor);
        const eyeNameEl = document.getElementById('selected-eye-color-name');
        if (eyeNameEl) eyeNameEl.textContent = currentEye ? currentEye.name : this.state.eyeColor;
    }

    /**
     * Met à jour l'aperçu SVG en direct
     */
    updatePreview() {
        const box = document.getElementById('customizer-avatar-box');
        if (!box) return;

        const svgCode = buildCustomAvatarSvg({
            type: this.state.type,
            styleId: this.state.styleId,
            outfitId: this.state.outfitId,
            hairColor: this.state.hairColor,
            eyeColor: this.state.eyeColor,
            skinColor: this.state.skinColor,
            mode: this.state.mode
        });

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
            skinColor: this.state.skinColor
        };

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
            this.onSaveCallback(configToSave);
        }

        // Événement personnalisé global pour toute vue
        window.dispatchEvent(new CustomEvent('avatar-updated', { detail: configToSave }));
    }
}

export const avatarCustomizerModal = new AvatarCustomizerModal();
