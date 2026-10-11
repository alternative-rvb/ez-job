/**
 * Module de gestion de l'affichage des trophées : boutique des skins d'avatar (RPG_TROPHIES)
 */

import { rewardsManager, SUMMON_COST, SUMMON_REFUND, SUMMON_RATES } from './rewards-manager.js';
import { domManager } from '../ui/dom.js';
import { T } from '../core/theme.js';
import { playerManager } from '../core/player.js';
import { RPG_TROPHIES, MANNEQUIN_BOY, MANNEQUIN_GIRL, buildCustomAvatarSvg } from '../ui/avatars.js';
import { avatarCustomizerModal } from '../ui/avatar-modal.js';

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
        this.showMessage(`<i class="bi bi-check-circle-fill text-green-400"></i> Skin « ${skin.title} » appliqué à ton avatar ! <button id="btn-open-customizer-from-trophies" class="ml-1 underline font-bold">Ouvrir l'atelier</button>`, 'success');
        this.renderTrophies();
    }

    // SECTION Arbre d'invocation

    /**
     * Arbre magique SVG : racines et branches apparentes en traits plume, écorce et séparations de feuillage en traits fuseau
     * (tracés précalculés avec .claude/skills/avatars-svg/scripts/tapered-path.mjs), fruits lumineux aux couleurs des raretés
     */
    renderTreeSvg() {
        const fruits = [
            [36, 50, 'rare'], [64, 44, 'épique'], [50, 26, 'légendaire'], [26, 38, 'rare'], [74, 58, 'rare'], [46, 62, 'épique']
        ];
        return `
            <svg viewBox="0 0 100 110" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <!-- Halo magique -->
                <circle cx="50" cy="44" r="44" fill="#66bcb4" opacity="0.10"/>
                <circle cx="50" cy="44" r="36" fill="#66bcb4" opacity="0.10"/>
                <!-- Ombre au sol et racines en plume (épaisses au pied du tronc, effilées au bout), couleur du tronc -->
                <ellipse cx="50" cy="104" rx="34" ry="4.5" fill="#7c4004" opacity="0.16"/>
                <path d="M 43.48,95.28 L 41.33,96.09 L 39.12,96.9 L 37.2,97.62 L 34.9,98.44 L 32.9,99.16 L 30.52,99.99 L 28.44,100.72 L 26.32,101.47 L 24.18,102.22 L 22,103 L 22,103 L 24.29,102.66 L 26.54,102.28 L 28.75,101.9 L 30.92,101.51 L 33.41,101.02 L 35.51,100.63 L 37.91,100.13 L 39.94,99.73 L 42.25,99.23 L 44.52,98.72 Q 46.41,96.28 43.48,95.28 Z M 44.1,97.92 L 42.89,99.06 L 41.81,100.02 L 40.5,101.08 L 39.33,101.98 L 37.91,102.97 L 36.66,103.81 L 35.37,104.62 L 33.8,105.5 L 32.42,106.26 L 31,107 L 31,107 L 32.55,106.58 L 34.06,106.11 L 35.78,105.47 L 37.23,104.89 L 38.65,104.28 L 40.26,103.49 L 41.61,102.78 L 43.15,101.88 L 44.44,101.08 L 45.9,100.08 Q 46.51,97.75 44.1,97.92 Z M 48.82,98.76 L 48.74,99.69 L 48.64,100.6 L 48.52,101.51 L 48.34,102.53 L 48.19,103.41 L 48.01,104.27 L 47.77,105.25 L 47.51,106.22 L 47.29,107.05 L 47,108 L 47,108 L 47.56,107.18 L 48.03,106.44 L 48.53,105.55 L 49,104.62 L 49.41,103.81 L 49.79,102.97 L 50.2,101.96 L 50.54,101.08 L 50.87,100.17 L 51.18,99.24 Q 50.33,97.35 48.82,98.76 Z M 55.48,98.72 L 57.75,99.23 L 60.06,99.73 L 62.09,100.13 L 64.49,100.63 L 66.59,101.02 L 69.08,101.51 L 71.25,101.9 L 73.46,102.28 L 75.71,102.66 L 78,103 L 78,103 L 75.82,102.22 L 73.68,101.47 L 71.56,100.72 L 69.48,99.99 L 67.1,99.16 L 65.1,98.44 L 62.8,97.62 L 60.88,96.9 L 58.67,96.09 L 56.52,95.28 Q 53.59,96.28 55.48,98.72 Z M 54.1,100.08 L 55.58,101.09 L 57.12,102.04 L 58.72,102.93 L 60.16,103.63 L 61.88,104.41 L 63.41,105.02 L 64.99,105.59 L 66.61,106.11 L 68.28,106.59 L 70,107 L 70,107 L 68.4,106.25 L 66.85,105.5 L 65.36,104.72 L 63.94,103.91 L 62.57,103.08 L 61.04,102.1 L 59.8,101.2 L 58.42,100.15 L 57.12,99.05 L 55.9,97.92 Q 53.49,97.75 54.1,100.08 Z" fill="#8a4b14"/>
                <!-- Tronc évasé au pied, légèrement torsadé, côté droit dans l'ombre -->
                <path d="M 41,100 C 45,96 46,90 45,82 C 44,76 46,72 48,68 L 52,68 C 54,72 56,76 55,82 C 54,90 55,96 59,100 Z" fill="#8a4b14"/>
                <path d="M 52,68 C 54,72 56,76 55,82 C 54,90 55,96 59,100 L 55,100 C 52,94 52,88 52,82 C 52,76 51,72 50,68 Z" fill="#6b3510" opacity="0.55"/>
                <path d="M 47,96 L 47.01,94.11 L 47.04,91.92 L 47.12,90.06 L 47.21,87.89 L 47.3,86.03 L 47.42,83.86 L 47.52,81.99 L 47.63,80.11 L 47.82,77.9 L 48,76 L 48,76 L 47.48,77.85 L 46.99,80.02 L 46.63,81.89 L 46.37,83.77 L 46.2,85.97 L 46.16,87.86 L 46.23,90.07 L 46.39,91.95 L 46.67,94.14 L 47,96 L 47,96 Z M 53,95 L 53.48,93.35 L 53.87,91.7 L 54.15,89.77 L 54.28,88.12 L 54.26,86.49 L 54.08,84.61 L 53.79,83.03 L 53.3,81.22 L 52.67,79.46 L 52,78 L 52,78 L 52.37,79.55 L 52.73,81.36 L 52.99,83.17 L 53.14,84.72 L 53.27,86.54 L 53.32,88.12 L 53.34,89.72 L 53.28,91.62 L 53.18,93.3 L 53,95 L 53,95 Z M 50,90 L 50.27,89.09 L 50.52,88.02 L 50.71,86.98 L 50.84,85.97 L 50.9,84.98 L 50.88,84.03 L 50.77,82.96 L 50.59,81.96 L 50.34,81.01 L 50,80 L 50,80 L 50.1,81.05 L 50.13,82.01 L 50.13,83.01 L 50.12,84.04 L 50.1,84.97 L 50.08,85.93 L 50.07,86.93 L 50.05,87.97 L 50.02,89.06 L 50,90 L 50,90 Z" fill="#4a2406" opacity="0.6"/>
                <!-- Feuillage : couche arrière sombre, couche médiane, reflets avant -->
                <g class="summon-tree-canopy">
                    <!-- Feuillage arrière : teinte sombre, plus claire au-dessus (lumière), ombrée en dessous -->
                    <circle cx="50" cy="38" r="25" fill="#2a7069"/>
                    <path d="M 26.51,29.45 A 25 25 0 0 1 73.49,29.45 A 33.75 33.75 0 0 0 26.51,29.45 Z" fill="#33857c"/>
                    <path d="M 73.49,46.55 A 25 25 0 0 1 26.51,46.55 A 33.75 33.75 0 0 0 73.49,46.55 Z" fill="#1d4f49"/>
                    <circle cx="28" cy="52" r="16" fill="#2a7069"/>
                    <path d="M 12.96,46.53 A 16 16 0 0 1 43.04,46.53 A 21.6 21.6 0 0 0 12.96,46.53 Z" fill="#33857c"/>
                    <path d="M 43.04,57.47 A 16 16 0 0 1 12.96,57.47 A 21.6 21.6 0 0 0 43.04,57.47 Z" fill="#1d4f49"/>
                    <circle cx="72" cy="52" r="16" fill="#2a7069"/>
                    <path d="M 56.96,46.53 A 16 16 0 0 1 87.04,46.53 A 21.6 21.6 0 0 0 56.96,46.53 Z" fill="#33857c"/>
                    <path d="M 87.04,57.47 A 16 16 0 0 1 56.96,57.47 A 21.6 21.6 0 0 0 87.04,57.47 Z" fill="#1d4f49"/>
                    <circle cx="50" cy="56" r="17" fill="#2a7069"/>
                    <path d="M 34.03,50.19 A 17 17 0 0 1 65.97,50.19 A 22.95 22.95 0 0 0 34.03,50.19 Z" fill="#33857c"/>
                    <path d="M 65.97,61.81 A 17 17 0 0 1 34.03,61.81 A 22.95 22.95 0 0 0 65.97,61.81 Z" fill="#1d4f49"/>
                    <!-- Branches apparentes en plume (épaisses côté tronc), couleur du tronc, puis recouvertes en partie par les touffes claires -->
                    <path d="M 50.23,70.98 L 49.13,69.92 L 47.83,68.74 L 46.66,67.78 L 45.28,66.7 L 44.05,65.84 L 42.59,64.87 L 41.3,64.11 L 39.97,63.39 L 38.4,62.6 L 37,62 L 37,62 L 38.19,62.94 L 39.55,64.02 L 40.66,64.99 L 41.74,65.99 L 42.95,67.16 L 43.93,68.21 L 45.05,69.45 L 45.95,70.55 L 46.96,71.86 L 47.77,73.02 Q 50.43,73.72 50.23,70.98 Z M 52.23,73.02 L 53.21,71.66 L 54.07,70.5 L 55.15,69.16 L 56.09,68.02 L 57.26,66.71 L 58.3,65.59 L 59.37,64.47 L 60.68,63.21 L 61.83,62.11 L 63,61 L 63,61 L 61.58,61.78 L 60.21,62.61 L 58.68,63.64 L 57.38,64.53 L 56.11,65.44 L 54.69,66.56 L 53.5,67.53 L 52.16,68.71 L 51.03,69.73 L 49.77,70.98 Q 49.57,73.72 52.23,73.02 Z M 51.29,72.16 L 51.34,70.62 L 51.33,69.09 L 51.27,67.6 L 51.14,65.88 L 50.96,64.44 L 50.7,62.79 L 50.39,61.41 L 49.99,59.83 L 49.56,58.51 L 49,57 L 49,57 L 49.24,58.58 L 49.39,59.94 L 49.52,61.54 L 49.56,62.91 L 49.57,64.53 L 49.5,65.92 L 49.38,67.56 L 49.21,68.98 L 48.98,70.4 L 48.71,71.84 Q 49.77,73.81 51.29,72.16 Z M 42.39,64.42 L 41.76,64.04 L 41.25,63.69 L 40.7,63.21 L 40.18,62.69 L 39.75,62.2 L 39.3,61.57 L 38.94,60.99 L 38.6,60.37 L 38.29,59.71 L 38,59 L 38,59 L 38.12,59.76 L 38.29,60.49 L 38.51,61.19 L 38.76,61.86 L 39.12,62.61 L 39.47,63.22 L 39.94,63.9 L 40.47,64.52 L 40.97,65.04 L 41.61,65.58 Q 42.82,65.54 42.39,64.42 Z M 58.39,64.58 L 59.03,64.04 L 59.53,63.52 L 60.06,62.9 L 60.53,62.22 L 60.88,61.61 L 61.24,60.86 L 61.49,60.19 L 61.71,59.49 L 61.88,58.76 L 62,58 L 62,58 L 61.71,58.71 L 61.4,59.37 L 61.06,59.99 L 60.7,60.57 L 60.25,61.2 L 59.82,61.69 L 59.3,62.21 L 58.75,62.69 L 58.24,63.04 L 57.61,63.42 Q 57.18,64.54 58.39,64.58 Z" fill="#8a4b14"/>
                    <!-- Touffes avant d'une seule teinte, chacune ombrée en croissant à l'opposé de la lumière (bas droite) -->
                    <circle cx="32" cy="36" r="15" fill="#3a9187"/>
                    <path d="M 45.59,29.66 A 15 15 0 0 1 19.71,44.6 A 20.25 20.25 0 0 0 45.59,29.66 Z" fill="#2f7d74"/>
                    <circle cx="68" cy="36" r="15" fill="#3a9187"/>
                    <path d="M 81.59,29.66 A 15 15 0 0 1 55.71,44.6 A 20.25 20.25 0 0 0 81.59,29.66 Z" fill="#2f7d74"/>
                    <circle cx="24" cy="50" r="9" fill="#3a9187"/>
                    <path d="M 32.16,46.2 A 9 9 0 0 1 16.63,55.16 A 12.15 12.15 0 0 0 32.16,46.2 Z" fill="#2f7d74"/>
                    <circle cx="76" cy="50" r="9" fill="#3a9187"/>
                    <path d="M 84.16,46.2 A 9 9 0 0 1 68.63,55.16 A 12.15 12.15 0 0 0 84.16,46.2 Z" fill="#2f7d74"/>
                    <circle cx="40" cy="22" r="14" fill="#3a9187"/>
                    <path d="M 52.69,16.08 A 14 14 0 0 1 28.53,30.03 A 18.9 18.9 0 0 0 52.69,16.08 Z" fill="#2f7d74"/>
                    <circle cx="61" cy="22" r="13" fill="#3a9187"/>
                    <path d="M 72.78,16.51 A 13 13 0 0 1 50.35,29.46 A 17.55 17.55 0 0 0 72.78,16.51 Z" fill="#2f7d74"/>
                    <circle cx="50" cy="14" r="11" fill="#3a9187"/>
                    <path d="M 59.97,9.35 A 11 11 0 0 1 40.99,20.31 A 14.85 14.85 0 0 0 59.97,9.35 Z" fill="#2f7d74"/>
                    <!-- Feuillage de premier plan : petites touffes au bas du feuillage, devant branches et fruits -->
                    <circle cx="34" cy="63" r="6.5" fill="#3a9187"/>
                    <path d="M 39.89,60.25 A 6.5 6.5 0 0 1 28.68,66.73 A 8.78 8.78 0 0 0 39.89,60.25 Z" fill="#2f7d74"/>
                    <circle cx="66" cy="62" r="6.5" fill="#3a9187"/>
                    <path d="M 71.89,59.25 A 6.5 6.5 0 0 1 60.68,65.73 A 8.78 8.78 0 0 0 71.89,59.25 Z" fill="#2f7d74"/>
                    <!-- Reflets en fuseau posés sur le bord des touffes, le long de leur courbure (lumière en haut à gauche) -->
                    <path d="M 40.73,11.52 L 41.24,10.52 L 41.92,9.45 L 42.59,8.63 L 43.42,7.75 L 44.18,7.07 L 44.98,6.44 L 45.99,5.77 L 46.91,5.25 L 48.08,4.77 L 49.16,4.44 L 49.16,4.44 L 48.01,4.44 L 46.7,4.64 L 45.6,4.97 L 44.41,5.56 L 43.47,6.23 L 42.66,7.03 L 41.87,8.11 L 41.36,9.13 L 40.92,10.39 L 40.73,11.52 L 40.73,11.52 Z M 27.45,20.9 L 27.77,19.9 L 28.18,18.78 L 28.61,17.87 L 29.13,16.85 L 29.61,16 L 30.1,15.16 L 30.73,14.2 L 31.3,13.37 L 32.06,12.45 L 32.77,11.68 L 32.77,11.68 L 31.82,12.17 L 30.8,12.88 L 29.99,13.57 L 29.16,14.51 L 28.57,15.4 L 28.1,16.36 L 27.7,17.54 L 27.5,18.6 L 27.4,19.83 L 27.45,20.9 L 27.45,20.9 Z M 18.45,37.19 L 18.59,36.29 L 18.77,35.27 L 18.98,34.42 L 19.22,33.46 L 19.44,32.64 L 19.66,31.82 L 19.94,30.86 L 20.18,30.02 L 20.53,29.05 L 20.86,28.2 L 20.86,28.2 L 20.21,28.86 L 19.55,29.7 L 19.04,30.48 L 18.58,31.45 L 18.28,32.33 L 18.1,33.23 L 18.02,34.31 L 18.07,35.23 L 18.22,36.3 L 18.45,37.19 L 18.45,37.19 Z M 16.86,52.6 L 16.82,52.03 L 16.8,51.38 L 16.81,50.83 L 16.83,50.21 L 16.86,49.69 L 16.88,49.16 L 16.91,48.55 L 16.94,48 L 17.02,47.36 L 17.11,46.79 L 17.11,46.79 L 16.76,47.26 L 16.43,47.86 L 16.2,48.4 L 16.03,49.06 L 15.96,49.65 L 15.98,50.24 L 16.09,50.92 L 16.28,51.48 L 16.55,52.1 L 16.86,52.6 L 16.86,52.6 Z M 28.88,61.63 L 29.17,61.22 L 29.5,60.78 L 29.81,60.44 L 30.15,60.06 L 30.45,59.74 L 30.73,59.42 L 31.08,59.05 L 31.4,58.71 L 31.81,58.34 L 32.19,58.02 L 32.19,58.02 L 31.68,58.07 L 31.1,58.23 L 30.62,58.42 L 30.12,58.75 L 29.74,59.1 L 29.43,59.51 L 29.15,60.04 L 28.99,60.53 L 28.89,61.12 L 28.88,61.63 L 28.88,61.63 Z M 61.02,60.19 L 61.3,59.89 L 61.62,59.56 L 61.9,59.3 L 62.2,59 L 62.45,58.75 L 62.68,58.48 L 62.95,58.15 L 63.18,57.85 L 63.48,57.51 L 63.76,57.2 L 63.76,57.2 L 63.34,57.25 L 62.86,57.38 L 62.47,57.54 L 62.05,57.81 L 61.74,58.1 L 61.48,58.43 L 61.25,58.87 L 61.13,59.28 L 61.03,59.76 L 61.02,60.19 L 61.02,60.19 Z" fill="#ffffff" opacity="0.4"/>
                    <path d="M 64.97,11.1 L 65.54,11.46 L 66.18,11.89 L 66.71,12.27 L 67.31,12.72 L 67.82,13.11 L 68.33,13.5 L 68.92,13.97 L 69.43,14.38 L 70.01,14.89 L 70.5,15.35 L 70.5,15.35 L 70.2,14.74 L 69.78,14.06 L 69.37,13.51 L 68.82,12.93 L 68.3,12.48 L 67.74,12.09 L 67.04,11.72 L 66.4,11.47 L 65.64,11.23 L 64.97,11.1 L 64.97,11.1 Z M 77.62,26.38 L 77.99,26.95 L 78.4,27.61 L 78.73,28.18 L 79.11,28.84 L 79.43,29.4 L 79.76,29.96 L 80.14,30.61 L 80.47,31.18 L 80.83,31.87 L 81.14,32.48 L 81.14,32.48 L 81.07,31.8 L 80.91,31.02 L 80.73,30.35 L 80.43,29.61 L 80.12,29 L 79.75,28.42 L 79.25,27.8 L 78.77,27.31 L 78.17,26.78 L 77.62,26.38 L 77.62,26.38 Z" fill="#ffffff" opacity="0.2"/>
                    <!-- Grosse touffe centrale au premier plan de tout le feuillage (seuls les fruits passent devant) -->
                    <circle cx="50" cy="48" r="19" fill="#3a9187"/>
                    <path d="M 67.22,39.97 A 19 19 0 0 1 34.44,58.9 A 25.65 25.65 0 0 0 67.22,39.97 Z" fill="#2f7d74"/>
                    <path d="M 32.86,44.98 L 33.44,43.4 L 34.24,41.66 L 35.04,40.27 L 36.07,38.73 L 37.02,37.49 L 38.04,36.29 L 39.33,34.98 L 40.52,33.9 L 42.06,32.76 L 43.48,31.87 L 43.48,31.87 L 41.86,32.38 L 40.07,33.22 L 38.62,34.1 L 37.09,35.36 L 35.93,36.61 L 34.96,38 L 34.04,39.75 L 33.47,41.36 L 33.02,43.29 L 32.86,44.98 L 32.86,44.98 Z" fill="#ffffff" opacity="0.4"/>
                    <!-- Queues des fruits en fuseau -->
                    <path d="M 36,44 L 35.99,44.52 L 35.96,45.03 L 35.95,45.5 L 35.96,45.97 L 35.99,46.48 L 36,47 L 36,47 L 36.33,46.58 L 36.56,46.06 L 36.65,45.5 L 36.56,44.94 L 36.33,44.42 L 36,44 L 36,44 Z M 64,38 L 63.99,38.52 L 63.96,39.03 L 63.95,39.5 L 63.96,39.97 L 63.99,40.48 L 64,41 L 64,41 L 64.33,40.58 L 64.56,40.06 L 64.65,39.5 L 64.56,38.94 L 64.33,38.42 L 64,38 L 64,38 Z M 50,20 L 49.99,20.52 L 49.96,21.03 L 49.95,21.5 L 49.96,21.97 L 49.99,22.48 L 50,23 L 50,23 L 50.33,22.58 L 50.56,22.06 L 50.65,21.5 L 50.56,20.94 L 50.33,20.42 L 50,20 L 50,20 Z M 26,32 L 25.99,32.52 L 25.96,33.03 L 25.95,33.5 L 25.96,33.97 L 25.99,34.48 L 26,35 L 26,35 L 26.33,34.58 L 26.56,34.06 L 26.65,33.5 L 26.56,32.94 L 26.33,32.42 L 26,32 L 26,32 Z M 74,52 L 73.99,52.52 L 73.96,53.03 L 73.95,53.5 L 73.96,53.97 L 73.99,54.48 L 74,55 L 74,55 L 74.33,54.58 L 74.56,54.06 L 74.65,53.5 L 74.56,52.94 L 74.33,52.42 L 74,52 L 74,52 Z M 46,56 L 45.99,56.52 L 45.96,57.03 L 45.95,57.5 L 45.96,57.97 L 45.99,58.48 L 46,59 L 46,59 L 46.33,58.58 L 46.56,58.06 L 46.65,57.5 L 46.56,56.94 L 46.33,56.42 L 46,56 L 46,56 Z" fill="#1f4f49"/>
                    ${fruits.map(([x, y, r], i) => `
                        <g class="summon-tree-fruit" style="animation-delay:${i * 0.35}s">
                            <circle cx="${x}" cy="${y}" r="4.4" fill="${RARITY_GLOW[r]}" opacity="0.3"/>
                            <circle cx="${x}" cy="${y}" r="2.7" fill="${RARITY_GLOW[r]}" stroke="#ffffff" stroke-width="0.6"/>
                            <circle cx="${x - 0.8}" cy="${y - 0.9}" r="0.8" fill="#ffffff" opacity="0.85"/>
                        </g>
                    `).join('')}
                </g>
                <!-- Étincelles -->
                <path class="summon-tree-sparkle" d="M 14,19.4 Q 14,22 16.6,22 Q 14,22 14,24.6 Q 14,22 11.4,22 Q 14,22 14,19.4 Z M 82,72.2 Q 82,74 83.8,74 Q 82,74 82,75.8 Q 82,74 80.2,74 Q 82,74 82,72.2 Z" fill="#facc15"/>
                <path class="summon-tree-sparkle" style="animation-delay:1.1s" d="M 86,25.8 Q 86,28 88.2,28 Q 86,28 86,30.2 Q 86,28 83.8,28 Q 86,28 86,25.8 Z M 18,74 Q 18,76 20,76 Q 18,76 18,78 Q 18,76 16,76 Q 18,76 18,74 Z" fill="#facc15"/>
                <!-- Fruit qui tombe pendant l'invocation (couleur posée au tirage) -->
                <g id="summon-falling-fruit" class="summon-falling-fruit" opacity="0">
                    <circle cx="50" cy="40" r="7" fill="currentColor" opacity="0.35"/>
                    <circle cx="50" cy="40" r="4.5" fill="currentColor" stroke="#ffffff" stroke-width="0.8"/>
                </g>
            </svg>
        `;
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
                <p class="col-span-full text-center text-sm py-8" style="color:#b46e28">
                    <i class="bi bi-tree-fill text-2xl block mb-2" style="color:${T.hexPrimary}"></i>
                    Ta collection est vide pour l'instant : invoque ton premier skin avec l'arbre !
                </p>
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