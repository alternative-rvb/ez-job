/**
 * Module de définition, rendu et personnalisation des Avatars Chibi Manga
 * Supporte la sélection du genre, des 4 coupes de cheveux par genre,
 * ainsi que le choix dynamique des couleurs de cheveux et des yeux.
 */

import { playerManager } from '../core/player.js';

// ==========================================
// PALETTES DE COULEURS DE CHEVEUX
// ==========================================

// Couleurs de cheveux naturelles de base (Avatars de départ)
export const BASE_HAIR_COLORS = [
    { id: 'brown-dark', name: 'Brun Sombre', hex: '#5a2d0c' },
    { id: 'auburn', name: 'Roux Cuivré', hex: '#8a3c08' },
    { id: 'black', name: 'Noir Corbeau', hex: '#1c1917' },
    { id: 'chestnut', name: 'Châtain Doré', hex: '#6b3e1b' },
    { id: 'blonde', name: 'Blond Soleil', hex: '#d99a38' }
];

// Catalogue complet des couleurs de cheveux (incluant teintes débloquables via trophées)
export const ALL_HAIR_COLORS = [
    ...BASE_HAIR_COLORS,
    { id: 'elf-turquoise', name: 'Turquoise Féerique', hex: '#14b8a6', isTrophyReward: true },
    { id: 'elf-azure', name: 'Bleu Ciel Givré', hex: '#38bdf8', isTrophyReward: true },
    { id: 'elf-violet', name: 'Violet Clair Féerique', hex: '#a855f7', isTrophyReward: true },
    { id: 'orc-ginger', name: 'Roux Ardent Barbare', hex: '#c2410c', isTrophyReward: true },
    { id: 'orc-crimson', name: 'Rouge Barbare Sauvage', hex: '#b91c1c', isTrophyReward: true },
    { id: 'silver', name: 'Blanc Argenté', hex: '#c5cbd4', isTrophyReward: true },
    { id: 'blue-night', name: 'Bleu Nuit', hex: '#1e3a5f', isTrophyReward: true },
    { id: 'ruby', name: 'Rouge Grenat', hex: '#6e1313', isTrophyReward: true },
    { id: 'sakura', name: 'Rose Sombre', hex: '#8f244f', isTrophyReward: true },
    { id: 'purple', name: 'Violet Mystique', hex: '#581c87', isTrophyReward: true }
];

// Palette active pour la personnalisation des avatars de base
export const HAIR_COLORS = BASE_HAIR_COLORS;

// ==========================================
// PALETTES DE COULEURS DES YEUX
// ==========================================

// Couleurs d'yeux naturelles de base (Avatars de départ)
export const BASE_EYE_COLORS = [
    { id: 'brown', name: 'Marron Chocolat', dark: '#542c0e', light: '#8c4e1e' },
    { id: 'amber', name: 'Ambre / Noisette', dark: '#6d2e05', light: '#b45309' },
    { id: 'blue', name: 'Bleu Océan', dark: '#1e3a8a', light: '#3b82f6' },
    { id: 'onyx', name: 'Gris Onyx', dark: '#18181b', light: '#71717a' }
];

// Catalogue complet des yeux (incluant yeux magiques/exotiques des trophées)
export const ALL_EYE_COLORS = [
    ...BASE_EYE_COLORS,
    { id: 'emerald', name: 'Vert Émeraude', dark: '#065f46', light: '#10b981', isTrophyReward: true },
    { id: 'amethyst', name: 'Violet Améthyste', dark: '#581c87', light: '#a855f7', isTrophyReward: true },
    { id: 'ruby', name: 'Rouge Rubis', dark: '#881337', light: '#f43f5e', isTrophyReward: true },
    { id: 'gold', name: 'Or Flamboyant', dark: '#78350f', light: '#f59e0b', isTrophyReward: true }
];

// Palette active pour la personnalisation des avatars de base
export const EYE_COLORS = BASE_EYE_COLORS;

// ==========================================
// PALETTES DE CARNATIONS DE PEAU
// ==========================================

// Carnations humaines naturelles de base (Avatars de départ)
// Règle absolue : la couleur de bouche est basée sur la couleur de peau mais beaucoup plus foncée
export const BASE_SKIN_COLORS = [
    { id: 'pale', name: 'Porcelaine', base: '#ffe8d6', shadow: '#fcd3b8', mouth: '#a25146' }, // Rose-chair ombré foncé élégant
    { id: 'light', name: 'Pêche (Défaut)', base: '#ffd4a3', shadow: '#f0be8d', mouth: '#9c4933' }, // Rose-chair pêche foncé naturel
    { id: 'golden', name: 'Dorée / Miel', base: '#f6c48a', shadow: '#df9f62', mouth: '#8a3e18' }, // Caramel ambré profond riche
    { id: 'tan', name: 'Hâlée / Caramel', base: '#df9b62', shadow: '#b8733a', mouth: '#6e2d0e' }, // Caramel terre cuite foncé
    { id: 'brown', name: 'Chocolat', base: '#9c5b2e', shadow: '#733d17', mouth: '#441a05' }, // Cacao profond chaud
    { id: 'dark', name: 'Ébène', base: '#5c351c', shadow: '#3e210e', mouth: '#220a02' } // Ébène très sombre
];

// Catalogue complet des carnations (incluant peaux fantastiques des trophées)
export const ALL_SKIN_COLORS = [
    ...BASE_SKIN_COLORS,
    { id: 'orc-green', name: 'Vert Olive (Orc)', base: '#659b5e', shadow: '#46723e', mouth: '#1b4218', isTrophyReward: true } // Vert sous-bois sombre
];

// Palette active pour la personnalisation des avatars de base
export const SKIN_COLORS = BASE_SKIN_COLORS;

// Détermine dynamiquement la couleur de bouche adaptée à la peau (ton chair/lèvre naturel beaucoup plus foncé)
export function getSkinMouthColor(skin = { base: '#ffd4a3', shadow: '#f0be8d' }) {
    if (skin && skin.mouth) return skin.mouth;
    const sourceHex = (skin && (skin.shadow || skin.base)) || '#f0be8d';
    const cleanHex = String(sourceHex).replace('#', '');
    if (cleanHex.length === 6) {
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
        // Formule de dérivation de lèvre/chair ombrée beaucoup plus foncée
        const darkR = Math.max(0, Math.min(255, Math.round(r * 0.42 + 25))).toString(16).padStart(2, '0');
        const darkG = Math.max(0, Math.min(255, Math.round(g * 0.35))).toString(16).padStart(2, '0');
        const darkB = Math.max(0, Math.min(255, Math.round(b * 0.32))).toString(16).padStart(2, '0');
        return `#${darkR}${darkG}${darkB}`;
    }
    return '#9c4933';
}

// Générateur des oreilles selon l'espèce (Humain, Elfe, Orc, etc.)
export function getSpeciesEars(species = 'human', skin = { base: '#ffd4a3', shadow: '#f0be8d' }, gender = 'boy') {
    if (species === 'elf') {
        return `
            <g id="${gender}-ears-elf">
                <!-- Oreille gauche elfe : même géométrie anatomique que l'orc, effilée et élégante -->
                <path d="M 24 35 Q 18 31 13.5 31.5 Q 16.5 41 22.5 43.5 Z" fill="${skin.base}"/>
                <path d="M 23 35.5 Q 18 33 15 33.5 Q 17 39.5 21.5 41.5 Z" fill="${skin.shadow}"/>
                <!-- Oreille droite elfe : même géométrie anatomique que l'orc, effilée et élégante -->
                <path d="M 76 35 Q 82 31 86.5 31.5 Q 83.5 41 77.5 43.5 Z" fill="${skin.base}"/>
                <path d="M 77 35.5 Q 82 33 85 33.5 Q 83 39.5 78.5 41.5 Z" fill="${skin.shadow}"/>
            </g>
        `;
    }
    if (species === 'orc') {
        return `
            <g id="${gender}-ears-orc">
                <!-- Oreille gauche orc robuste rapprochée avec anneau doré -->
                <path d="M 24 35 Q 18 32 14.5 33 Q 17 41 22.5 44 Z" fill="${skin.base}"/>
                <path d="M 23 36 Q 18 34 16 35 Q 18 40 21.5 42 Z" fill="${skin.shadow}"/>
                <!-- Anneau d'or oreille gauche -->
                <ellipse cx="15.8" cy="34" rx="1.6" ry="2.0" fill="none" stroke="#fbbf24" stroke-width="1.1"/>
                <!-- Oreille droite orc robuste rapprochée avec anneau doré -->
                <path d="M 76 35 Q 82 32 85.5 33 Q 83 41 77.5 44 Z" fill="${skin.base}"/>
                <path d="M 77 36 Q 82 34 84 35 Q 82 40 78.5 42 Z" fill="${skin.shadow}"/>
                <!-- Anneau d'or oreille droite -->
                <ellipse cx="84.2" cy="34" rx="1.6" ry="2.0" fill="none" stroke="#fbbf24" stroke-width="1.1"/>
            </g>
        `;
    }
    // Oreilles humaines par défaut
    return `
        <g id="${gender}-ears-full">
            <circle cx="21" cy="38" r="4.8" fill="${skin.base}"/>
            <circle cx="21" cy="38" r="2.8" fill="${skin.shadow}"/>
            <circle cx="79" cy="38" r="4.8" fill="${skin.base}"/>
            <circle cx="79" cy="38" r="2.8" fill="${skin.shadow}"/>
        </g>
    `;
}

// Modèles anatomiques de base Garçon
export const BOY_BASE = {
    shadow: `<g id="boy-shadow"><ellipse cx="50" cy="116" rx="16" ry="3" fill="rgba(124, 64, 4, 0.18)"/></g>`,
    legs: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
        <g id="boy-legs">
            <polygon points="39,85 49,85 48,106 41,106" fill="#1b4d49"/>
            <polygon points="40,99 48.5,99 48,106 41,106" fill="#ffffff"/>
            <polygon points="39.8,101 48.7,101 48.3,102.5 40.2,102.5" fill="#ff9d00"/>
            <path d="M39.5 106 C39.5 104, 49.5 104, 49.5 106 L50 113 C50 115, 39 115, 39 113 Z" fill="#1f2937"/>
            <path d="M38.5 112 L50.5 112 L50 114 L39 114 Z" fill="#111827"/>
            <rect x="42.5" y="107" width="4" height="2" rx="0.8" fill="#ff9d00"/>
            <polygon points="51,85 61,85 59,106 52,106" fill="#1b4d49"/>
            <polygon points="51.5,99 60,99 59,106 52,106" fill="#ffffff"/>
            <polygon points="51.3,101 60.2,101 59.8,102.5 51.7,102.5" fill="#ff9d00"/>
            <path d="M50.5 106 C50.5 104, 60.5 104, 60.5 106 L61 113 C61 115, 50 115, 50 113 Z" fill="#1f2937"/>
            <path d="M49.5 112 L61.5 112 L61 114 L50 114 Z" fill="#111827"/>
            <rect x="53.5" y="107" width="4" height="2" rx="0.8" fill="#ff9d00"/>
        </g>`,
    body: `
        <g id="boy-body">
            <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 62,61.5 C 66,61.5 69,62 69,65 L 62.5,85 L 37.5,85 Z" fill="#ffffff"/>
            <path d="M 31,65 C 31,62 34,61.5 38,61.5 C 38,61.5 40,73 43,85 L 37.5,85 L 31,65 Z" fill="#489e96"/>
            <path d="M 69,65 C 69,62 66,61.5 62,61.5 C 62,61.5 60,73 57,85 L 62.5,85 L 69,65 Z" fill="#489e96"/>
            <path d="M42 60 L50 69 L58 60 Z" fill="#ff9d00"/>
            <path d="M47 67 L50 78 L53 67 Z" fill="#e08900"/>
        </g>`,
    belt: `
        <g id="boy-belt">
            <rect x="37" y="82.5" width="26" height="4.5" rx="1" fill="#1f2937"/>
            <rect x="46" y="81.5" width="8" height="6.5" rx="1.5" fill="#ffb733" stroke="#1f2937" stroke-width="0.8"/>
            <rect x="36" y="82.5" width="4.5" height="7" rx="1.2" fill="#489e96" stroke="#1b4d49" stroke-width="0.8"/>
            <circle cx="38.2" cy="86" r="0.7" fill="#ffb733"/>
        </g>`,
    arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
        <g id="boy-arms">
            <path d="M32 64 C24 71, 23 78, 29 84 C32 84, 34 81, 35 77 Z" fill="#489e96"/>
            <ellipse cx="29" cy="84" rx="3.8" ry="3.5" fill="${skin.base}"/>
            <path d="M68 64 C76 69, 78 72, 76 79 C73 81, 70 79, 66 75 Z" fill="#489e96"/>
            <ellipse cx="77" cy="79" rx="3.8" ry="3.5" fill="${skin.base}"/>
        </g>`,
    headBase: (withBand = true, skin = { base: '#ffd4a3', shadow: '#f0be8d' }, species = 'human') => `
        <g id="boy-head-base-full">
            <rect x="46" y="58" width="8" height="4" fill="${skin.base}"/>
            <path d="M42 60 L50 62 L58 60 Z" fill="${species === 'human' ? '#ff9d00' : skin.shadow}"/>
            ${getSpeciesEars(species, skin, 'boy')}
            <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="${skin.base}"/>
            ${withBand ? `
            <path d="M22 24 C33 17, 67 17, 78 24 L79 28 C68 21, 32 21, 21 28 Z" fill="#489e96"/>
            <rect x="45" y="19" width="10" height="6" rx="1.5" fill="#ff9d00"/>
            <circle cx="50" cy="22" r="1.5" fill="#ffffff"/>` : ''}
        </g>`,
    faceFeatures: (eye = { dark: '#542c0e', light: '#8c4e1e' }, skin = { base: '#ffd4a3', shadow: '#f0be8d' }, species = 'human', hairColor = '#5a2d0c') => {
        const mouthColor = getSkinMouthColor(skin);
        return `
        <g id="boy-face-features-full">
            <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
            <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="none" stroke="${skin.shadow}" stroke-width="0.8"/>
            <ellipse cx="37.5" cy="41.5" rx="4.2" ry="4.8" fill="${eye.dark}"/>
            <ellipse cx="37.5" cy="42.5" rx="3.5" ry="3.5" fill="${eye.light}"/>
            <circle cx="37.5" cy="41.5" r="2.2" fill="#241103"/>
            <circle cx="35.5" cy="39" r="1.8" fill="#ffffff"/>
            <circle cx="39.5" cy="43.5" r="0.9" fill="#ffffff"/>

            <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
            <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="${skin.shadow}" stroke-width="0.8"/>
            <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="${eye.dark}"/>
            <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="${eye.light}"/>
            <circle cx="62.5" cy="41.5" r="2.2" fill="#241103"/>
            <circle cx="60.5" cy="39" r="1.8" fill="#ffffff"/>
            <circle cx="64.5" cy="43.5" r="0.9" fill="#ffffff"/>

            <!-- Paupières garçon : trait supérieur épuré sans cil saillant, teinte cheveux en mode produit -->
            <g id="boy-eyelashes" style="mix-blend-mode: multiply;">
                <path d="M30 38 Q37 34 44 38" fill="none" stroke="${hairColor}" stroke-width="2.2" stroke-linecap="round"/>
                <path d="M56 38 Q63 34 70 38" fill="none" stroke="${hairColor}" stroke-width="2.2" stroke-linecap="round"/>
            </g>

            <polygon points="48.6,47.2 51.4,47.2 50,47.9" fill="${skin.shadow}" stroke="${skin.shadow}" stroke-width="0.7" stroke-linejoin="round"/>

            ${species === 'orc' ? `
            <!-- Peintures de guerre rouges tribales sous les yeux -->
            <polygon points="29,45 38,47 37,49 28,47" fill="#b91c1c" opacity="0.85"/>
            <polygon points="71,45 62,47 63,49 72,47" fill="#b91c1c" opacity="0.85"/>
            <!-- Bouche orc droite et plus large basée sur la couleur de peau mais beaucoup plus foncée -->
            <line x1="41" y1="52" x2="59" y2="52" stroke="${mouthColor}" stroke-width="2.6" stroke-linecap="round"/>
            <path d="M 40.5,53.5 L 41.5,52 L 58.5,52 L 59.5,53.5" stroke="${mouthColor}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
            <!-- Crocs inférieurs orc : écartés aux canines, légèrement plus petits et avec pointes arrondies SANS contour -->
            <path d="M 42.2,52.5 C 42.2,49.5 42.8,48 43.6,48 C 44.4,48 45.0,49.5 45.0,52.5 Z" fill="#fffbeb"/>
            <ellipse cx="43.2" cy="50" rx="0.4" ry="1.2" fill="#ffffff" opacity="0.8"/>
            <path d="M 55.0,52.5 C 55.0,49.5 55.6,48 56.4,48 C 57.2,48 57.8,49.5 57.8,52.5 Z" fill="#fffbeb"/>
            <ellipse cx="56.8" cy="50" rx="0.4" ry="1.2" fill="#ffffff" opacity="0.8"/>` : `
            <!-- Bouche souriante basée sur la couleur de peau mais beaucoup plus foncée -->
            <path d="M45 51 Q50 56.5 55 51" fill="none" stroke="${mouthColor}" stroke-width="2" stroke-linecap="round"/>`}
        </g>`;
    },
    eyebrows: (color = '#5a2d0c', opacity = 0.85) => `
        <g id="boy-eyebrows-front" opacity="${opacity}" style="mix-blend-mode: multiply;">
            <path d="M 44,28.2 L 32,27.5 L 30.5,28.5 L 33,29.2 L 44,31.2 Z" fill="${color}"/>
            <path d="M 56,28.2 L 68,27.5 L 69.5,28.5 L 67,29.2 L 56,31.2 Z" fill="${color}"/>
        </g>`
};

// Variantes de coupes Garçon
export const BOY_STYLES = {
    1: {
        id: 1,
        name: "1. Ondulé",
        withBand: true,
        getHairBack: (color) => `
            <g id="boy-hair-back-full" transform="translate(50, 0) scale(0.85, 1) translate(-50, 0)">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <path d="M 18,44 C 12,34 8,26 10,20 C 12,14 6,10 12,4 C 16,-2 24,-6 30,-4 C 34,-12 44,-14 50,-10 C 56,-14 66,-12 70,-4 C 76,-6 84,-2 88,4 C 94,10 88,14 90,20 C 92,26 88,34 82,44 C 78,34 76,28 74,22 C 66,12 34,12 26,22 C 24,28 22,34 18,44 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="boy-hair-front-full">
                <path d="M 20,32 C 21,24 24,14 34,8 C 44,4 56,4 66,8 C 76,14 79,24 80,32 C 78,35 76,33 74,27 C 72,34 66,35 62,28 C 58,35 52,36 48,27 C 44,35 38,34 34,27 C 30,34 26,35 24,28 C 22,34 20,34 20,32 Z" fill="${color}"/>
            </g>`
    },
    2: {
        id: 2,
        name: "2. Chignon haut",
        withBand: false,
        getHairBack: (color) => `
            <g id="boy-hair-back-full">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <circle cx="50" cy="-6" r="10" fill="${color}"/>
                <ellipse cx="50" cy="-2" rx="5" ry="3" fill="#ff9d00"/>
                <path d="M 18,46 C 14,34 14,20 18,10 C 24,0 36,-4 50,-4 C 64,-4 76,0 82,10 C 86,20 86,34 82,46 C 76,34 74,22 70,16 C 62,8 38,8 30,16 C 26,22 24,34 18,46 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="boy-hair-front-full">
                <path d="M 21,30 C 22,18 35,6 48,5 C 53,5 56,10 56,19 C 50,28 38,33 26,34 Z" fill="${color}"/>
                <path d="M 79,30 C 78,18 65,6 52,5 C 47,5 44,10 44,19 C 50,28 62,33 74,34 Z" fill="${color}"/>
            </g>`
    },
    3: {
        id: 3,
        name: "3. Mèches libres",
        withBand: false,
        getHairBack: (color) => `
            <g id="boy-hair-back-full" transform="translate(50, 0) scale(0.85, 1) translate(-50, 0)">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <path d="M 16,46 C 10,36 6,24 10,16 C 12,8 8,4 16,-2 C 22,-8 32,-10 38,-8 C 42,-16 52,-18 58,-14 C 66,-18 76,-14 80,-6 C 88,-6 94,2 92,12 C 96,20 92,32 84,46 C 80,34 76,26 72,20 C 64,10 36,10 28,20 C 24,26 20,34 16,46 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="boy-hair-front-full">
                <path d="M 21,28 C 23,16 36,8 50,4 C 64,4 76,10 80,22 C 82,26 81,30 79,31 C 77,26 76,23 74,21 C 75,26 75,32 72,35 C 69,28 67,25 65,21 C 66,27 66,35 63,38 C 60,29 58,25 56,21 C 56,26 56,33 53,35 C 50,28 47,25 44,21 C 44,26 42,30 38,30 C 32,28 26,28 21,28 Z" fill="${color}"/>
            </g>`
    },
    4: {
        id: 4,
        name: "4. Coupe en pics",
        withBand: false,
        getHairBack: (color) => `
            <g id="boy-hair-back-full">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <path d="M 82,44 
                         C 88,36 96,30 96,30 
                         C 94,26 88,22 88,22 
                         C 94,16 98,10 98,10 
                         C 92,6 84,4 84,4 
                         C 90,-4 92,-12 92,-12 
                         C 84,-8 74,-6 74,-6 
                         C 72,-14 64,-20 64,-20 
                         C 58,-14 52,-12 52,-12 
                         C 46,-16 38,-18 38,-18 
                         C 34,-12 28,-6 28,-6 
                         C 18,-4 8,-2 8,-2 
                         C 14,6 18,10 18,10 
                         C 10,12 2,16 2,16 
                         C 8,22 16,24 16,24 
                         C 10,26 4,32 4,32 
                         C 10,36 18,44 18,44 
                         C 24,34 26,22 30,16 
                         C 38,8 62,8 70,16 
                         C 74,22 76,34 82,44 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="boy-hair-front-full">
                <path d="M 20,30 
                         C 22,14 34,4 50,4 
                         C 66,4 80,14 82,30 
                         C 82,36 80,37 78,34 
                         C 76,27 74,24 72,24 
                         C 70,30 67,36 64,35 
                         C 62,28 61,23 58,23 
                         C 56,29 52,38 48,38 
                         C 46,32 45,24 42,23 
                         C 40,28 36,37 33,37 
                         C 31,31 30,24 27,24 
                         C 25,29 23,34 20,30 Z" fill="${color}"/>
            </g>`
    }
};

// Modèles anatomiques de base Fille
export const GIRL_BASE = {
    shadow: `<g id="girl-shadow"><ellipse cx="50" cy="116" rx="16" ry="3" fill="rgba(124, 64, 4, 0.18)"/></g>`,
    legs: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
        <g id="girl-legs">
            <polygon points="39,88 49,88 48,106 41,106" fill="${skin.base}"/>
            <polygon points="40,96 48.5,96 48,106 41,106" fill="#489e96"/>
            <polygon points="40,96 48.5,96 48.3,98 40.2,98" fill="#ffffff"/>
            <path d="M39.5 106 C39.5 104, 49.5 104, 49.5 106 L50 113 C50 115, 39 115, 39 113 Z" fill="#ff9d00"/>
            <path d="M38.5 112 L50.5 112 L50 114 L39 114 Z" fill="#c47000"/>
            <rect x="42.5" y="107" width="4" height="2" rx="0.8" fill="#ffffff"/>
            <polygon points="51,88 61,88 59,106 52,106" fill="${skin.base}"/>
            <polygon points="51.5,96 60,96 59,106 52,106" fill="#489e96"/>
            <polygon points="51.5,96 60,96 59.8,98 51.7,98" fill="#ffffff"/>
            <path d="M50.5 106 C50.5 104, 60.5 104, 60.5 106 L61 113 C61 115, 50 115, 50 113 Z" fill="#ff9d00"/>
            <path d="M49.5 112 L61.5 112 L61 114 L50 114 Z" fill="#c47000"/>
            <rect x="53.5" y="107" width="4" height="2" rx="0.8" fill="#ffffff"/>
        </g>`,
    body: `
        <g id="girl-body">
            <path d="M38 82 C38 82, 44 83.5, 50 83.5 C56 83.5, 62 82, 62 82 C70 85, 76 89, 76 91.5 C60 94, 40 94, 24 91.5 C24 89, 30 85, 38 82 Z" fill="#236762"/>
            <path d="M40 83 C40 85, 38 88, 37 92" stroke="#133835" stroke-width="1.2" stroke-linecap="round"/>
            <path d="M50 83.5 L50 93.5" stroke="#133835" stroke-width="1.2" stroke-linecap="round"/>
            <path d="M60 83 C60 85, 62 88, 63 92" stroke="#133835" stroke-width="1.2" stroke-linecap="round"/>
            <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 62,61.5 C 66,61.5 69,62 69,65 L 62.5,82 L 37.5,82 Z" fill="#ff9d00"/>
            <path d="M44 60 L50 71 L56 60 Z" fill="#ffffff"/>
            <circle cx="50" cy="66" r="2.5" fill="#489e96"/>
            <polygon points="46,64 50,66 46,69" fill="#489e96"/>
            <polygon points="54,64 50,66 54,69" fill="#489e96"/>
            <circle cx="50" cy="73" r="1.5" fill="#ffde6a"/>
            <circle cx="50" cy="77" r="1.5" fill="#ffde6a"/>
        </g>`,
    belt: `
        <g id="girl-belt">
            <rect x="37" y="80.5" width="26" height="4" rx="1" fill="#1f2937"/>
            <rect x="47" y="79.5" width="6" height="6" rx="1.2" fill="#ffb733" stroke="#1f2937" stroke-width="0.8"/>
            <rect x="58.5" y="80.5" width="3.5" height="5.5" rx="1.2" fill="#489e96" stroke="#1b4d49" stroke-width="0.8"/>
            <circle cx="60.2" cy="83.2" r="0.7" fill="#ffffff"/>
        </g>`,
    arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
        <g id="girl-arms">
            <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="#ff9d00"/>
            <ellipse cx="27" cy="81.5" rx="3.6" ry="3.3" fill="${skin.base}"/>
            <path d="M67 63 C74 66.5, 76 70.5, 75 75.5 C72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="#ff9d00"/>
            <ellipse cx="76" cy="75.5" rx="3.6" ry="3.3" fill="${skin.base}"/>
        </g>`,
    headBase: (withTiara = false, skin = { base: '#ffd4a3', shadow: '#f0be8d' }, species = 'human') => `
        <g id="girl-head-base-full">
            <rect x="46" y="58" width="8" height="4" fill="${skin.base}"/>
            ${getSpeciesEars(species, skin, 'girl')}
            <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="${skin.base}"/>
            ${withTiara ? `
            <path d="M22 23 C33 16, 67 16, 78 23 L79 27 C68 20, 32 20, 21 27 Z" fill="#489e96"/>
            <circle cx="28" cy="22" r="3.5" fill="#ff9d00"/>
            <circle cx="28" cy="22" r="1.8" fill="#ffffff"/>` : ''}
        </g>`,
    faceFeatures: (eye = { dark: '#6d2e05', light: '#b45309' }, skin = { base: '#ffd4a3', shadow: '#f0be8d' }, species = 'human', hairColor = '#5a2d0c') => {
        const mouthColor = getSkinMouthColor(skin);
        return `
        <g id="girl-face-features-full">
            <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
            <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="none" stroke="${skin.shadow}" stroke-width="0.8"/>
            <ellipse cx="37.5" cy="41.5" rx="4.2" ry="4.8" fill="${eye.dark}"/>
            <ellipse cx="37.5" cy="42.5" rx="3.5" ry="3.5" fill="${eye.light}"/>
            <circle cx="37.5" cy="41.5" r="2.2" fill="#241103"/>
            <circle cx="35.5" cy="39" r="1.8" fill="#ffffff"/>
            <circle cx="39.5" cy="43.5" r="1" fill="#ffffff"/>

            <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
            <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="${skin.shadow}" stroke-width="0.8"/>
            <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="${eye.dark}"/>
            <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="${eye.light}"/>
            <circle cx="62.5" cy="41.5" r="2.2" fill="#241103"/>
            <circle cx="60.5" cy="39" r="1.8" fill="#ffffff"/>
            <circle cx="64.5" cy="43.5" r="1" fill="#ffffff"/>

            <!-- Cils manga fille : même teinte que les cheveux avec mode de fusion produit -->
            <g id="girl-eyelashes" style="mix-blend-mode: multiply;">
                <!-- Cils manga supérieurs œil gauche -->
                <polygon points="29.5,39.2 26.5,35.8 31.8,37.5" fill="${hairColor}"/>
                <polygon points="32.2,37.2 30.8,34.2 34.2,36.0" fill="${hairColor}"/>
                <polygon points="34.8,35.6 34.2,33.5 36.5,34.8" fill="${hairColor}"/>
                <path d="M30 38 Q37 33 44 38" fill="none" stroke="${hairColor}" stroke-width="2.2" stroke-linecap="round"/>
                <!-- Trait et cils inférieurs œil gauche -->
                <path d="M32 46.0 Q37 48.1 42 46.0" fill="none" stroke="${hairColor}" stroke-width="1" stroke-linecap="round"/>
                <polygon points="33.5,46.5 34.2,48.3 35.0,47.0" fill="${hairColor}"/>
                <polygon points="36.2,47.2 37.0,48.8 37.8,47.2" fill="${hairColor}"/>
                <polygon points="39.0,47.0 39.8,48.2 40.5,46.5" fill="${hairColor}"/>

                <!-- Cils manga supérieurs œil droit -->
                <polygon points="70.5,39.2 73.5,35.8 68.2,37.5" fill="${hairColor}"/>
                <polygon points="67.8,37.2 69.2,34.2 65.8,36.0" fill="${hairColor}"/>
                <polygon points="65.2,35.6 65.8,33.5 63.5,34.8" fill="${hairColor}"/>
                <path d="M56 38 Q63 33 70 38" fill="none" stroke="${hairColor}" stroke-width="2.2" stroke-linecap="round"/>
                <!-- Trait et cils inférieurs œil droit -->
                <path d="M58 46.0 Q63 48.1 68 46.0" fill="none" stroke="${hairColor}" stroke-width="1" stroke-linecap="round"/>
                <polygon points="66.5,46.5 65.8,48.3 65.0,47.0" fill="${hairColor}"/>
                <polygon points="63.8,47.2 63.0,48.8 62.2,47.2" fill="${hairColor}"/>
                <polygon points="61.0,47.0 60.2,48.2 59.5,46.5" fill="${hairColor}"/>
            </g>

            <polygon points="48.6,47.2 51.4,47.2 50,47.9" fill="${skin.shadow}" stroke="${skin.shadow}" stroke-width="0.7" stroke-linejoin="round"/>

            ${species === 'orc' ? `
            <!-- Peintures de guerre rouges tribales sous les yeux -->
            <polygon points="29,45 38,47 37,49 28,47" fill="#b91c1c" opacity="0.85"/>
            <polygon points="71,45 62,47 63,49 72,47" fill="#b91c1c" opacity="0.85"/>
            <!-- Bouche orc droite et plus large basée sur la couleur de peau mais beaucoup plus foncée -->
            <line x1="41" y1="52" x2="59" y2="52" stroke="${mouthColor}" stroke-width="2.6" stroke-linecap="round"/>
            <path d="M 40.5,53.5 L 41.5,52 L 58.5,52 L 59.5,53.5" stroke="${mouthColor}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
            <!-- Crocs inférieurs orc : écartés aux canines, légèrement plus petits et avec pointes arrondies SANS contour -->
            <path d="M 42.2,52.5 C 42.2,49.5 42.8,48 43.6,48 C 44.4,48 45.0,49.5 45.0,52.5 Z" fill="#fffbeb"/>
            <ellipse cx="43.2" cy="50" rx="0.4" ry="1.2" fill="#ffffff" opacity="0.8"/>
            <path d="M 55.0,52.5 C 55.0,49.5 55.6,48 56.4,48 C 57.2,48 57.8,49.5 57.8,52.5 Z" fill="#fffbeb"/>
            <ellipse cx="56.8" cy="50" rx="0.4" ry="1.2" fill="#ffffff" opacity="0.8"/>` : `
            <!-- Bouche souriante basée sur la couleur de peau mais beaucoup plus foncée -->
            <path d="M45 51 Q50 56.5 55 51" fill="none" stroke="${mouthColor}" stroke-width="2" stroke-linecap="round"/>`}
        </g>`;
    },
    eyebrows: (color = '#8a3c08', opacity = 0.85) => `
        <g id="girl-eyebrows-front" opacity="${opacity}" style="mix-blend-mode: multiply;">
            <path d="M 42.7,30.0 L 34.5,27.5 L 28.0,31.0 L 35.0,29.3 L 42.7,32.0 Z" fill="${color}"/>
            <path d="M 57.3,30.0 L 65.5,27.5 L 72.0,31.0 L 65.0,29.3 L 57.3,32.0 Z" fill="${color}"/>
        </g>`
};

// Variantes de coupes Fille
export const GIRL_STYLES = {
    1: {
        id: 1,
        name: "1. Macarons",
        withTiara: false,
        getHairBack: (color) => `
            <g id="girl-hair-back-full">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <ellipse cx="50" cy="50" rx="34" ry="46" fill="${color}"/>
                <path d="M 12,36 C 8,14 20,-2 50,-2 C 80,-2 92,14 88,36 C 94,50 90,64 82,70 C 78,64 76,52 76,42 C 74,32 26,32 24,42 C 24,52 22,64 18,70 C 10,64 6,50 12,36 Z" fill="${color}"/>
                <circle cx="16" cy="10" r="13" fill="${color}"/>
                <circle cx="84" cy="10" r="13" fill="${color}"/>
                <ellipse cx="12" cy="21" rx="4.5" ry="3.2" fill="#489e96" transform="rotate(-20 12 21)"/>
                <ellipse cx="20" cy="21" rx="4.5" ry="3.2" fill="#489e96" transform="rotate(20 20 21)"/>
                <circle cx="16" cy="21" r="2.6" fill="#ff9d00"/>
                <circle cx="15.5" cy="20.5" r="1" fill="#ffffff"/>
                <ellipse cx="80" cy="21" rx="4.5" ry="3.2" fill="#489e96" transform="rotate(-20 80 21)"/>
                <ellipse cx="88" cy="21" rx="4.5" ry="3.2" fill="#489e96" transform="rotate(20 88 21)"/>
                <circle cx="84" cy="21" r="2.6" fill="#ff9d00"/>
                <circle cx="83.5" cy="20.5" r="1" fill="#ffffff"/>
            </g>`,
        getHairFront: (color) => `
            <g id="girl-hair-front-full">
                <path d="M 21,30 C 23,35 25,37 28,36 C 31,35 33,30 35,28 C 39,33 46,38 50,41 C 54,38 61,33 65,28 C 67,30 69,35 72,36 C 75,37 77,35 79,30 C 76,12 64,6 50,6 C 36,6 24,12 21,30 Z" fill="${color}"/>
                <path d="M 23,30 C 23,39 25,48 27,54 C 26,46 25,38 25,30 Z" fill="${color}"/>
                <path d="M 77,30 C 77,39 75,48 73,54 C 74,46 75,38 75,30 Z" fill="${color}"/>
            </g>`
    },
    2: {
        id: 2,
        name: "2. Ondulé & boucles",
        withTiara: false,
        getHairBack: (color) => `
            <g id="girl-hair-back-full">
                <!-- Volume de base du crâne -->
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                
                <!-- Masse supérieure et silhouette ondulée -->
                <path d="M 16,40 C 10,28 10,16 16,6 C 22,-4 34,-8 44,-6 C 47,-12 55,-12 58,-6 C 68,-8 80,-4 86,6 C 92,16 92,28 86,40 C 82,30 78,22 74,16 C 66,8 34,8 26,16 C 22,22 18,30 16,40 Z" fill="${color}"/>

                <!-- Cascade de boucles volumineuses formées par des cercles étagés -->
                <!-- Côté gauche (boucles le long de l'épaule) -->
                <circle cx="20" cy="28" r="10" fill="${color}"/>
                <circle cx="14" cy="40" r="11" fill="${color}"/>
                <circle cx="22" cy="48" r="10" fill="${color}"/>
                <circle cx="16" cy="58" r="10" fill="${color}"/>
                <circle cx="24" cy="66" r="9" fill="${color}"/>
                <circle cx="18" cy="74" r="8" fill="${color}"/>
                <circle cx="26" cy="80" r="6.5" fill="${color}"/>

                <!-- Côté droit (boucles le long de l'épaule) -->
                <circle cx="80" cy="28" r="10" fill="${color}"/>
                <circle cx="86" cy="40" r="11" fill="${color}"/>
                <circle cx="78" cy="48" r="10" fill="${color}"/>
                <circle cx="84" cy="58" r="10" fill="${color}"/>
                <circle cx="76" cy="66" r="9" fill="${color}"/>
                <circle cx="82" cy="74" r="8" fill="${color}"/>
                <circle cx="74" cy="80" r="6.5" fill="${color}"/>

                <!-- Masse centrale arrière liant les boucles dans le dos -->
                <ellipse cx="50" cy="54" rx="28" ry="26" fill="${color}"/>
                <circle cx="39" cy="74" r="9" fill="${color}"/>
                <circle cx="61" cy="74" r="9" fill="${color}"/>
                <circle cx="50" cy="78" r="8" fill="${color}"/>

                <!-- Reflets soyeux sur les boucles -->
                <path d="M 12,36 C 8,42 12,48 18,48" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1.6" stroke-linecap="round"/>
                <path d="M 14,54 C 10,60 14,66 20,66" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M 16,70 C 14,75 18,78 22,78" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.3" stroke-linecap="round"/>

                <path d="M 88,36 C 92,42 88,48 82,48" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1.6" stroke-linecap="round"/>
                <path d="M 86,54 C 90,60 86,66 80,66" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M 84,70 C 86,75 82,78 78,78" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.3" stroke-linecap="round"/>

                <!-- Ombres de creux entre les boucles -->
                <path d="M 16,46 C 22,46 24,52 24,56" fill="none" stroke="rgba(0,0,0,0.18)" stroke-width="1.4" stroke-linecap="round"/>
                <path d="M 84,46 C 78,46 76,52 76,56" fill="none" stroke="rgba(0,0,0,0.18)" stroke-width="1.4" stroke-linecap="round"/>
            </g>`,
        getHairFront: (color) => `
            <g id="girl-hair-front-full">
                <!-- Frange ondulée en mèches souples -->
                <path d="M 20,32 C 21,22 26,12 36,8 C 44,5 56,5 64,8 C 74,12 79,22 80,32 C 77,35 75,32 72,26 C 70,33 64,34 60,27 C 56,34 50,35 46,26 C 42,34 36,33 32,26 C 28,33 24,34 22,27 C 21,33 20,33 20,32 Z" fill="${color}"/>
                <!-- Mèche ondulée tempe gauche -->
                <path d="M 22,30 C 22,40 25,48 28,54 C 27,46 25,38 25,30 Z" fill="${color}"/>
                <!-- Mèche ondulée tempe droite -->
                <path d="M 78,30 C 78,40 75,48 72,54 C 73,46 75,38 75,30 Z" fill="${color}"/>
            </g>`
    },
    3: {
        id: 3,
        name: "3. Carré court",
        withTiara: false,
        getHairBack: (color) => `
            <g id="girl-hair-back-full">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <path d="M 15,66 C 15,20 26,-5 50,-5 C 74,-5 85,20 85,66 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="girl-hair-front-full">
                <path d="M 21,30 C 23,35 25,37 28,36 C 31,35 33,30 35,28 C 39,33 46,38 50,41 C 54,38 61,33 65,28 C 67,30 69,35 72,36 C 75,37 77,35 79,30 C 76,12 64,6 50,6 C 36,6 24,12 21,30 Z" fill="${color}"/>
                <path d="M 23,30 C 23,39 25,48 27,54 C 26,46 25,38 25,30 Z" fill="${color}"/>
                <path d="M 77,30 C 77,39 75,48 73,54 C 74,46 75,38 75,30 Z" fill="${color}"/>
            </g>`
    },
    4: {
        id: 4,
        name: "4. Tresses",
        withTiara: false,
        getHairBack: (color) => `
            <g id="girl-hair-back-full">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <path d="M 22,24 C 4,36 2,56 6,70 C 8,78 7,83 6,86 L 14,87 C 18,80 22,72 22,58 C 22,46 26,34 30,26 Z" fill="${color}"/>
                <path d="M 7,86 C 6,91 9,94 10,95 C 11,94 14,91 13,86 Z" fill="${color}"/>
                <ellipse cx="7.5" cy="85.5" rx="3.5" ry="2.5" fill="#489e96" transform="rotate(-15 7.5 85.5)"/>
                <ellipse cx="12.5" cy="85.5" rx="3.5" ry="2.5" fill="#489e96" transform="rotate(15 12.5 85.5)"/>
                <circle cx="10" cy="85.5" r="1.8" fill="#ff9d00"/>
                <circle cx="9.6" cy="85.1" r="0.7" fill="#ffffff"/>
                <ellipse cx="16" cy="24" rx="4.5" ry="3.2" fill="#489e96" transform="rotate(-30 16 24)"/>
                <ellipse cx="24" cy="24" rx="4.5" ry="3.2" fill="#489e96" transform="rotate(10 24 24)"/>
                <circle cx="20" cy="24" r="2.4" fill="#ff9d00"/>
                <circle cx="19.5" cy="23.5" r="0.9" fill="#ffffff"/>
                <path d="M 78,24 C 96,36 98,56 94,70 C 92,78 93,83 94,86 L 86,87 C 82,80 78,72 78,58 C 78,46 74,34 70,26 Z" fill="${color}"/>
                <path d="M 87,86 C 86,91 89,94 90,95 C 91,94 94,91 93,86 Z" fill="${color}"/>
                <ellipse cx="87.5" cy="85.5" rx="3.5" ry="2.5" fill="#489e96" transform="rotate(-15 87.5 85.5)"/>
                <ellipse cx="92.5" cy="85.5" rx="3.5" ry="2.5" fill="#489e96" transform="rotate(15 92.5 85.5)"/>
                <circle cx="90" cy="85.5" r="1.8" fill="#ff9d00"/>
                <circle cx="89.6" cy="85.1" r="0.7" fill="#ffffff"/>
                <ellipse cx="76" cy="24" rx="4.5" ry="3.2" fill="#489e96" transform="rotate(-10 76 24)"/>
                <ellipse cx="84" cy="24" rx="4.5" ry="3.2" fill="#489e96" transform="rotate(30 84 24)"/>
                <circle cx="80" cy="24" r="2.4" fill="#ff9d00"/>
                <circle cx="79.5" cy="23.5" r="0.9" fill="#ffffff"/>
            </g>`,
        getHairFront: (color) => `
            <g id="girl-hair-front-full">
                <path d="M 21,30 C 23,35 25,37 28,36 C 31,35 33,30 35,28 C 39,33 46,38 50,41 C 54,38 61,33 65,28 C 67,30 69,35 72,36 C 75,37 77,35 79,30 C 76,12 64,6 50,6 C 36,6 24,12 21,30 Z" fill="${color}"/>
                <path d="M 23,30 C 23,39 25,48 27,54 C 26,46 25,38 25,30 Z" fill="${color}"/>
                <path d="M 77,30 C 77,39 75,48 73,54 C 74,46 75,38 75,30 Z" fill="${color}"/>
            </g>`
    }
};

// =============================================================================
// TENUES & ÉQUIPEMENTS DE PERSONNAGES (FONCTIONNALITÉ BÊTA)
// =============================================================================

export const BOY_OUTFITS = {
    1: {
        id: 1,
        name: "1. Classique (Aventurier)",
        backEquipment: "",
        legs: BOY_BASE.legs,
        body: BOY_BASE.body,
        belt: BOY_BASE.belt,
        arms: BOY_BASE.arms,
        headAccessory: "",
        handItem: ""
    },
    2: {
        id: 2,
        name: "2. Ninja (Épée droite & Shinobi)",
        backEquipment: "",
        legs: `
            <g id="boy-legs-ninja">
                <!-- Pantalon bouffant shinobi en forme de losange -->
                <!-- Jambe gauche losange bouffant -->
                <polygon points="38,85 49,85 52,94 48,103 40,103 31,94" fill="#18181b"/>
                <polygon points="38,87 47,87 49,94 46,102 41,102 34,94" fill="#27272a"/>
                <line x1="41" y1="87" x2="44" y2="102" stroke="#09090b" stroke-width="0.8"/>
                <!-- Bandages mollet gauche -->
                <rect x="40" y="103" width="8" height="3" fill="#3f3f46"/>
                <line x1="40" y1="104.5" x2="48" y2="104.5" stroke="#71717a" stroke-width="0.8"/>
                <!-- Pied / Tabi noir gauche -->
                <path d="M39.5 106 C39.5 104, 48.5 104, 48.5 106 L49 113.5 C49 115, 38.5 115, 38.5 113.5 Z" fill="#09090b"/>
                <line x1="44" y1="106" x2="44" y2="114" stroke="#27272a" stroke-width="0.8"/>
                
                <!-- Jambe droite losange bouffant -->
                <polygon points="51,85 62,85 69,94 60,103 52,103 48,94" fill="#18181b"/>
                <polygon points="53,87 62,87 66,94 59,102 54,102 51,94" fill="#27272a"/>
                <line x1="59" y1="87" x2="56" y2="102" stroke="#09090b" stroke-width="0.8"/>
                <!-- Bandages mollet droit -->
                <rect x="52" y="103" width="8" height="3" fill="#3f3f46"/>
                <line x1="52" y1="104.5" x2="60" y2="104.5" stroke="#71717a" stroke-width="0.8"/>
                <!-- Pied / Tabi noir droit -->
                <path d="M51.5 106 C51.5 104, 60.5 104, 60.5 106 L61 113.5 C61 115, 50.5 115, 50.5 113.5 Z" fill="#09090b"/>
                <line x1="56" y1="106" x2="56" y2="114" stroke="#27272a" stroke-width="0.8"/>
            </g>`,
        body: `
            <g id="boy-body-ninja">
                <!-- Veste de combat shinobi noire avec plastron d'armure -->
                <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 62,61.5 C 66,61.5 69,62 69,65 L 63.5,85 L 36.5,85 Z" fill="#09090b"/>
                <!-- Plastron d'écailles sombres et col croisé -->
                <path d="M 38,61.5 L 50,76 L 56,76 L 44,61.5 Z" fill="#27272a"/>
                <path d="M 62,61.5 L 46,76 L 42,76 L 56,61.5 Z" fill="#18181b"/>
                <path d="M 46,60 L 50,65 L 54,60 Z" fill="#b91c1c"/>
                <!-- Mailles shinobi sous le col -->
                <rect x="47" y="60" width="6" height="4" fill="#3f3f46" stroke="#18181b" stroke-width="0.5"/>
            </g>`,
        belt: `
            <g id="boy-belt-ninja">
                <!-- Ceinture shinobi avec pan flottant sur le côté -->
                <rect x="36" y="81.5" width="28" height="5" rx="1" fill="#18181b"/>
                <line x1="36" y1="84" x2="64" y2="84" stroke="#b91c1c" stroke-width="1.8"/>
                <circle cx="50" cy="84" r="1.8" fill="#fbbf24"/>
                <!-- Pan de tissu flottant noir et rouge -->
                <path d="M 39,84 L 35,98 L 39,96 L 41,84 Z" fill="#b91c1c"/>
                <path d="M 40,84 L 37,97 L 40,95 L 42,84 Z" fill="#09090b"/>
            </g>`,
        arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="boy-arms-ninja">
                <!-- Bras shinobi avec protège-bras renforcés -->
                <path d="M32 64 C23 71, 22 79, 28 85 C31 85, 33 81, 35 77 Z" fill="#09090b"/>
                <rect x="25" y="73" width="7" height="8" rx="1" fill="#27272a" stroke="#09090b" stroke-width="0.6" transform="rotate(-15 28 77)"/>
                <ellipse cx="28" cy="85" rx="3.8" ry="3.5" fill="${skin.base}"/>
                <path d="M68 64 C77 69, 78 74, 76 81 C73 83, 70 80, 66 76 Z" fill="#09090b"/>
                <rect x="68" y="70" width="7" height="8" rx="1" fill="#27272a" stroke="#09090b" stroke-width="0.6" transform="rotate(15 71 74)"/>
                <ellipse cx="76" cy="81" rx="3.8" ry="3.5" fill="${skin.base}"/>
            </g>`,
        headAccessory: "",
        handItem: `
            <g id="boy-hand-ninjato">
                <!-- Ninjato : Épée fine droite de ninja remontée légèrement (axe 100% aligné) -->
                <!-- Poignée droite tressée sombre -->
                <line x1="77.8" y1="73" x2="74.2" y2="85" stroke="#09090b" stroke-width="2.8" stroke-linecap="round"/>
                <!-- Pommeau doré aligné à l'extrémité de la poignée -->
                <circle cx="73.8" cy="85.8" r="1.8" fill="#fbbf24" stroke="#78350f" stroke-width="0.5"/>
                <!-- Tsuba carrée dorée perpendiculaire à la lame -->
                <rect x="75" y="71.8" width="5.6" height="2.2" rx="0.5" fill="#fbbf24" stroke="#78350f" stroke-width="0.5" transform="rotate(16.7 77.8 73)"/>
                <!-- Lame droite fine en acier miroir remontée -->
                <line x1="77.8" y1="73" x2="89.8" y2="33" stroke="#cbd5e1" stroke-width="2.2" stroke-linecap="square"/>
                <line x1="78.1" y1="73" x2="90.1" y2="33" stroke="#ffffff" stroke-width="1" stroke-linecap="square"/>
                <!-- Pointe biseautée rasoir du ninjato -->
                <polygon points="88.6,34.5 91,31.5 89.3,30.5" fill="#ffffff"/>
            </g>`
    },
    3: {
        id: 3,
        name: "3. Mage (Bandeau & Sceptre)",
        backEquipment: `
            <g id="boy-back-mage">
                <!-- Cape magique violette plus foncée assortie au buste (s'arrête à y=99, pieds bien visibles) -->
                <path d="M 33,65 C 24,76 19,88 17,99 C 32,102 68,102 83,99 C 81,88 76,76 67,65 Z" fill="#2e1065"/>
                <path d="M 17,99 C 32,102 68,102 83,99 L 84,101 C 68,104 32,104 16,101 Z" fill="#fbbf24"/>
            </g>`,
        legs: `
            <g id="boy-legs-mage">
                <polygon points="39,85 49,85 48,105 41,105" fill="#4c1d95"/>
                <polygon points="51,85 61,85 59,105 52,105" fill="#4c1d95"/>
                <path d="M38.5 105 C38.5 103, 49.5 103, 49.5 105 L50 113.5 C50 115, 38 115, 38 113.5 Z" fill="#2e1065"/>
                <path d="M49.5 105 C49.5 103, 60.5 103, 60.5 105 L61 113.5 C61 115, 49 115, 49 113.5 Z" fill="#2e1065"/>
                <rect x="42" y="106" width="5" height="2.5" rx="0.6" fill="#fbbf24"/>
                <rect x="53" y="106" width="5" height="2.5" rx="0.6" fill="#fbbf24"/>
            </g>`,
        body: `
            <g id="boy-body-mage">
                <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 62,61.5 C 66,61.5 69,62 69,65 L 64,85 L 36,85 Z" fill="#4c1d95"/>
                <path d="M 44,61.5 L 50,73 L 56,61.5 Z" fill="#fbbf24"/>
                <circle cx="50" cy="74" r="3.5" fill="#38bdf8" stroke="#ffffff" stroke-width="0.8"/>
                <circle cx="50" cy="74" r="1.5" fill="#ffffff"/>
                <line x1="50" y1="77.5" x2="50" y2="85" stroke="#fbbf24" stroke-width="1.5"/>
            </g>`,
        belt: `
            <g id="boy-belt-mage">
                <rect x="36" y="82.5" width="28" height="4.5" rx="1" fill="#fbbf24"/>
                <circle cx="50" cy="84.8" r="2.5" fill="#818cf8" stroke="#ffffff" stroke-width="0.6"/>
                <rect x="58" y="83" width="5" height="6.5" rx="1.2" fill="#2e1065" stroke="#fbbf24" stroke-width="0.8"/>
            </g>`,
        arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="boy-arms-mage">
                <path d="M32 64 C23 71, 20 78, 25 84 C28 84, 32 80, 35 77 Z" fill="#4c1d95"/>
                <path d="M22 82 L26 84 L27 82 Z" fill="#fbbf24"/>
                <ellipse cx="27" cy="84" rx="3.8" ry="3.5" fill="${skin.base}"/>
                <path d="M68 64 C77 69, 80 75, 78 81 C75 83, 72 80, 66 76 Z" fill="#4c1d95"/>
                <path d="M75 79 L79 81 L80 79 Z" fill="#fbbf24"/>
                <ellipse cx="77" cy="80" rx="3.8" ry="3.5" fill="${skin.base}"/>
            </g>`,
        headAccessory: `
            <g id="boy-head-mage">
                <!-- Bandeau magique orné d'un cristal azur -->
                <path d="M22 23 C33 16, 67 16, 78 23 L79 27 C68 20, 32 20, 21 27 Z" fill="#fbbf24"/>
                <circle cx="50" cy="20" r="4" fill="#38bdf8" stroke="#ffffff" stroke-width="1"/>
                <circle cx="49" cy="19" r="1.3" fill="#ffffff"/>
            </g>`,
        handItem: `
            <g id="boy-hand-staff">
                <!-- Grand sceptre magique vertical avec orbe flottante -->
                <line x1="26" y1="36" x2="28" y2="105" stroke="#d97706" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="26" cy="32" r="7" fill="#818cf8" opacity="0.4"/>
                <circle cx="26" cy="32" r="5" fill="#c084fc" stroke="#fbbf24" stroke-width="1.2"/>
                <circle cx="24.5" cy="30.5" r="1.8" fill="#ffffff"/>
                <path d="M 21,34 C 21,25 31,25 31,34" fill="none" stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round"/>
            </g>`
    },
    4: {
        id: 4,
        name: "4. Archer (Arc & Flèche)",
        backEquipment: "",
        legs: `
            <g id="boy-legs-archer">
                <polygon points="39,85 49,85 48,106 41,106" fill="#14532d"/>
                <polygon points="51,85 61,85 59,106 52,106" fill="#14532d"/>
                <path d="M39.5 106 C39.5 104, 49.5 104, 49.5 106 L50 113.5 C50 115, 39 115, 39 113.5 Z" fill="#92400e"/>
                <path d="M50.5 106 C50.5 104, 60.5 104, 60.5 106 L61 113.5 C61 115, 50 115, 50 113.5 Z" fill="#92400e"/>
                <line x1="41" y1="108" x2="48" y2="108" stroke="#fbbf24" stroke-width="1"/>
                <line x1="52" y1="108" x2="59" y2="108" stroke="#fbbf24" stroke-width="1"/>
            </g>`,
        body: `
            <g id="boy-body-archer">
                <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 62,61.5 C 66,61.5 69,62 69,65 L 62.5,85 L 37.5,85 Z" fill="#16a34a"/>
                <path d="M 39,63 L 61,63 L 57,85 L 43,85 Z" fill="#78350f"/>
                <line x1="50" y1="63" x2="50" y2="85" stroke="#fbbf24" stroke-width="1" stroke-dasharray="2 2"/>
                <path d="M 44,60 L 50,67 L 56,60 Z" fill="#fef08a"/>
            </g>`,
        belt: `
            <g id="boy-belt-archer">
                <rect x="37" y="82.5" width="26" height="4.5" rx="1" fill="#451a03"/>
                <rect x="46" y="81.5" width="8" height="6.5" rx="1.5" fill="#fbbf24" stroke="#451a03" stroke-width="0.8"/>
            </g>`,
        arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="boy-arms-archer">
                <path d="M32 64 C24 71, 23 78, 29 84 C32 84, 34 81, 35 77 Z" fill="#16a34a"/>
                <rect x="25" y="77" width="7" height="6" rx="1.2" fill="#78350f" transform="rotate(-20 28 80)"/>
                <ellipse cx="29" cy="84" rx="3.8" ry="3.5" fill="${skin.base}"/>
                <path d="M68 64 C76 69, 78 72, 76 79 C73 81, 70 79, 66 75 Z" fill="#16a34a"/>
                <ellipse cx="77" cy="79" rx="3.8" ry="3.5" fill="${skin.base}"/>
            </g>`,
        headAccessory: "",
        handItem: `
            <g id="boy-hand-archer-equipment">
                <!-- Flèche tenue dans la main droite à (29, 84) inclinée à 45° -->
                <g id="boy-hand-arrow" transform="rotate(45 29 84)">
                    <!-- Pointe de flèche en fer biseautée -->
                    <polygon points="29,48 32,56 26,56" fill="#cbd5e1" stroke="#475569" stroke-width="0.7"/>
                    <line x1="29" y1="48" x2="29" y2="56" stroke="#ffffff" stroke-width="0.8"/>
                    <!-- Bague dorée sous la pointe -->
                    <rect x="27.5" y="56" width="3" height="2" rx="0.5" fill="#fbbf24"/>
                    <!-- Hampe en bois d'if traversant la main à (29, 84) -->
                    <line x1="29" y1="56" x2="29" y2="94" stroke="#78350f" stroke-width="1.8" stroke-linecap="round"/>
                    <line x1="29" y1="56" x2="29" y2="94" stroke="#d97706" stroke-width="0.8" stroke-linecap="round"/>
                    <!-- Empennage à plumes d'archer vertes et or sous la main -->
                    <polygon points="29,87 33.5,90 33.5,94 29,92" fill="#15803d"/>
                    <polygon points="29,87 24.5,90 24.5,94 29,92" fill="#15803d"/>
                    <polygon points="29,89 32,91 32,93 29,92" fill="#fbbf24"/>
                    <polygon points="29,89 26,91 26,93 29,92" fill="#fbbf24"/>
                    <circle cx="29" cy="94" r="0.9" fill="#78350f"/>
                </g>
                <!-- Arc long d'archer tenu dans l'autre main à (77, 79) -->
                <g id="boy-hand-bow">
                    <!-- Corde tendue vers le personnage (côté intérieur à x=65) -->
                    <line x1="65" y1="53" x2="65" y2="105" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>
                    <!-- Bois d'if courbé vers l'extérieur passant exactement dans la main à (77, 79) -->
                    <path d="M 65,53 Q 89,79 65,105" fill="none" stroke="#78350f" stroke-width="2.8" stroke-linecap="round"/>
                    <path d="M 65,53 Q 90,79 65,105" fill="none" stroke="#d97706" stroke-width="1.3" stroke-linecap="round"/>
                    <!-- Poignée en cuir placée directement sur le bois et dans la main (77, 79) -->
                    <rect x="74.5" y="75" width="5" height="8" rx="1.2" fill="#fbbf24" stroke="#78350f" stroke-width="0.6"/>
                </g>
            </g>`
    }
};

export const GIRL_OUTFITS = {
    1: {
        id: 1,
        name: "1. Classique (Aventurière)",
        backEquipment: "",
        legs: GIRL_BASE.legs,
        body: GIRL_BASE.body,
        belt: GIRL_BASE.belt,
        arms: GIRL_BASE.arms,
        headAccessory: "",
        handItem: ""
    },
    2: {
        id: 2,
        name: "2. Guerrière (Épée courte & Armure)",
        backEquipment: "",
        legs: `
            <g id="girl-legs-warrior">
                <!-- Jambières et pantalon d'armure de chevalière (SANS JUPE) -->
                <polygon points="39,82 49,82 48,106 41,106" fill="#1e293b"/>
                <polygon points="40,84 48.5,84 48,95 41,95" fill="#94a3b8"/>
                <line x1="41" y1="95" x2="48" y2="95" stroke="#fbbf24" stroke-width="1"/>
                <polygon points="40,97 48.5,97 48,106 41,106" fill="#64748b"/>
                <path d="M39.5 106 C39.5 104, 49.5 104, 49.5 106 L50 113 C50 115, 39 115, 39 113 Z" fill="#334155"/>
                <rect x="42.5" y="107" width="4" height="2" rx="0.8" fill="#fbbf24"/>
                
                <polygon points="51,82 61,82 59,106 52,106" fill="#1e293b"/>
                <polygon points="51.5,84 60,84 59,95 52,95" fill="#94a3b8"/>
                <line x1="52" y1="95" x2="59.5" y2="95" stroke="#fbbf24" stroke-width="1"/>
                <polygon points="51.5,97 60,97 59,106 52,106" fill="#64748b"/>
                <path d="M50.5 106 C50.5 104, 60.5 104, 60.5 106 L61 113 C61 115, 50 115, 50 113 Z" fill="#334155"/>
                <rect x="53.5" y="107" width="4" height="2" rx="0.8" fill="#fbbf24"/>
            </g>`,
        body: `
            <g id="girl-body-warrior">
                <!-- Cuirasse d'acier & corset renforcé (SANS JUPE, NET ET AFFINÉ) -->
                <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 62,61.5 C 66,61.5 69,62 69,65 L 63,82 L 37,82 Z" fill="#cbd5e1"/>
                <!-- Plastron d'or et d'acier stylisé -->
                <path d="M41 62 L50 75 L59 62 Z" fill="#fbbf24"/>
                <circle cx="50" cy="68" r="2.8" fill="#ef4444" stroke="#ffffff" stroke-width="0.6"/>
                <path d="M 37,80 L 50,83 L 63,80 L 62,82 L 50,85 L 38,82 Z" fill="#94a3b8"/>
            </g>`,
        belt: `
            <g id="girl-belt-warrior">
                <rect x="36" y="80.5" width="28" height="4.5" rx="1" fill="#1e293b"/>
                <rect x="46.5" y="79.5" width="7" height="6.5" rx="1.2" fill="#fbbf24" stroke="#78350f" stroke-width="0.8"/>
                <circle cx="50" cy="82.8" r="1.5" fill="#ef4444"/>
            </g>`,
        arms: `
            <g id="girl-arms-warrior">
                <!-- Épaulières et gantelets d'acier -->
                <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="#64748b"/>
                <circle cx="31" cy="65" r="4" fill="#fbbf24" stroke="#b45309" stroke-width="0.8"/>
                <ellipse cx="27" cy="81.5" rx="3.6" ry="3.3" fill="#cbd5e1"/>
                <path d="M67 63 C74 66.5, 76 70.5, 75 75.5 C72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="#64748b"/>
                <circle cx="69" cy="65" r="4" fill="#fbbf24" stroke="#b45309" stroke-width="0.8"/>
                <ellipse cx="76" cy="75.5" rx="3.6" ry="3.3" fill="#cbd5e1"/>
            </g>`,
        headAccessory: "",
        handItem: `
            <g id="girl-hand-warrior-equipment">
                <!-- Grand Bouclier / Écu d'acier et d'or dans la main droite à (27, 81.5) -->
                <g id="girl-shield">
                    <!-- Bordure d'or robuste et imposante de l'écu (largeur 26px, hauteur 42px) -->
                    <path d="M 12,60 Q 25,56 38,60 C 39,78 36,92 25,102 C 14,92 11,78 12,60 Z" fill="#fbbf24" stroke="#b45309" stroke-width="1"/>
                    <!-- Plat de l'écu bicolore acier clair / acier sombre -->
                    <path d="M 14.5,61.5 Q 25,58 25,61.5 L 25,98.5 C 16,89 13.5,77 14.5,61.5 Z" fill="#cbd5e1"/>
                    <path d="M 25,61.5 Q 25,58 35.5,61.5 C 36.5,77 34,89 25,98.5 Z" fill="#94a3b8"/>
                    <!-- Umbo central losange doré serti d'un grand rubis étincelant -->
                    <polygon points="25,71 31,79 25,87 19,79" fill="#fbbf24" stroke="#b45309" stroke-width="0.8"/>
                    <circle cx="25" cy="79" r="3.2" fill="#ef4444" stroke="#ffffff" stroke-width="0.7"/>
                    <circle cx="24" cy="77.8" r="0.9" fill="#ffffff"/>
                    <!-- Rivets dorés décoratifs -->
                    <circle cx="15" cy="62" r="1.1" fill="#78350f"/>
                    <circle cx="35" cy="62" r="1.1" fill="#78350f"/>
                    <circle cx="25" cy="58" r="1.1" fill="#78350f"/>
                    <circle cx="25" cy="99" r="1.1" fill="#78350f"/>
                </g>
                <!-- Épée courte mais épaisse (Glaive de guerrière) tenue dans l'autre main à (76, 75.5) -->
                <g id="girl-sword">
                    <!-- Pommeau doré serti d'un rubis -->
                    <circle cx="76" cy="85.5" r="2.8" fill="#fbbf24" stroke="#78350f" stroke-width="0.8"/>
                    <circle cx="76" cy="85.5" r="1.4" fill="#ef4444"/>
                    <!-- Poignée en cuir & fil d'or passant sous la main -->
                    <line x1="76" y1="85.5" x2="76" y2="72" stroke="#78350f" stroke-width="3.8" stroke-linecap="round"/>
                    <line x1="76" y1="85.5" x2="76" y2="72" stroke="#fbbf24" stroke-width="1" stroke-dasharray="2 2"/>
                    <!-- Garde dorée massive sculptée -->
                    <polygon points="66,73 86,73 84,69 68,69" fill="#fbbf24" stroke="#b45309" stroke-width="0.8"/>
                    <circle cx="76" cy="71" r="2.2" fill="#ef4444" stroke="#ffffff" stroke-width="0.5"/>
                    <!-- Lame courte mais très épaisse (14px de large) bicolore avec pointe acérée -->
                    <polygon points="69,69 69,45 76,36 76,69" fill="#94a3b8" stroke="#334155" stroke-width="0.8"/>
                    <polygon points="76,69 76,36 83,45 83,69" fill="#cbd5e1" stroke="#334155" stroke-width="0.8"/>
                    <!-- Ligne de biseau et éclat lumineux -->
                    <line x1="76" y1="69" x2="76" y2="36" stroke="#ffffff" stroke-width="1.3"/>
                    <polygon points="69,45 76,36 83,45" fill="#ffffff" opacity="0.6"/>
                </g>
            </g>`
    },
    3: {
        id: 3,
        name: "3. Sorcière (Chapeau & Sceptre)",
        backEquipment: "",
        legs: `
            <g id="girl-legs-witch">
                <!-- Robe longue magique jusqu'aux pieds avec bordure dorée et pointes de bottines -->
                <!-- Jupe longue évasée de la robe -->
                <path d="M 36,82 L 64,82 C 67,92 73,103 74,110 C 66,112 58,109 50,111 C 42,109 34,112 26,110 C 27,103 33,92 36,82 Z" fill="#3b0764"/>
                <path d="M 36,82 L 44,82 L 40,110 C 34,112 28,111 26,110 C 27,103 33,92 36,82 Z" fill="#2e1065"/>
                <path d="M 64,82 L 56,82 L 60,110 C 66,112 72,111 74,110 C 73,103 67,92 64,82 Z" fill="#2e1065"/>
                <!-- Lignes de plis et drapé -->
                <path d="M 45,82 C 44,92 42,102 39,110" stroke="#1e1b4b" stroke-width="1"/>
                <path d="M 55,82 C 56,92 58,102 61,110" stroke="#1e1b4b" stroke-width="1"/>
                <line x1="50" y1="82" x2="50" y2="111" stroke="#4c1d95" stroke-width="1"/>
                <!-- Motifs d'étoiles dorées brodées sur la robe -->
                <circle cx="50" cy="94" r="1.2" fill="#fbbf24"/>
                <circle cx="43" cy="103" r="0.9" fill="#e9d5ff"/>
                <circle cx="57" cy="103" r="0.9" fill="#e9d5ff"/>
                <!-- Ourlet doré ondulé au bas de la robe -->
                <path d="M 26,110 C 34,112 42,109 50,111 C 58,109 66,112 74,110" stroke="#fbbf24" stroke-width="1.3" fill="none"/>
                <!-- Bouts de bottines pointues peeking sous la robe -->
                <path d="M 37,110 L 44,110 L 45,114.5 C 45,115.5 35,115.5 34,113.5 Z" fill="#1e1b4b"/>
                <rect x="38" y="111" width="3.5" height="2" rx="0.6" fill="#fbbf24"/>
                <path d="M 56,110 L 63,110 L 66,113.5 C 65,115.5 55,115.5 55,114.5 Z" fill="#1e1b4b"/>
                <rect x="58.5" y="111" width="3.5" height="2" rx="0.6" fill="#fbbf24"/>
            </g>`,
        body: `
            <g id="girl-body-witch">
                <!-- Buste de la robe de sorcière -->
                <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 62,61.5 C 66,61.5 69,62 69,65 L 64,85 L 36,85 Z" fill="#581c87"/>
                <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 42,61.5 L 45,85 L 36,85 Z" fill="#3b0764"/>
                <path d="M 69,65 C 69,62 66,61.5 62,61.5 L 58,61.5 L 55,85 L 64,85 Z" fill="#3b0764"/>
                <!-- Col et décolleté blanc et violet -->
                <path d="M44 60 L50 71 L56 60 Z" fill="#fdf4ff"/>
                <circle cx="50" cy="66" r="2.5" fill="#a855f7"/>
                <circle cx="50" cy="74" r="1.5" fill="#fbbf24"/>
            </g>`,
        belt: `
            <g id="girl-belt-witch">
                <rect x="37" y="80.5" width="26" height="4.5" rx="1" fill="#7e22ce"/>
                <!-- Boucle en croissant de lune or -->
                <circle cx="50" cy="82.5" r="3.2" fill="#fbbf24"/>
                <circle cx="51.5" cy="81.5" r="2.8" fill="#7e22ce"/>
            </g>`,
        arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="girl-arms-witch">
                <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="#6b21a8"/>
                <ellipse cx="27" cy="81.5" rx="3.6" ry="3.3" fill="${skin.base}"/>
                <path d="M67 63 C74 66.5, 76 70.5, 75 75.5 C72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="#6b21a8"/>
                <ellipse cx="76" cy="75.5" rx="3.6" ry="3.3" fill="${skin.base}"/>
            </g>`,
        headAccessory: `
            <g id="girl-head-witch">
                <!-- Grand chapeau pointu de sorcière (CALOTTE PLUS HAUTE Y=-33) -->
                <path d="M 20,18 Q 36,-32 86,-33 Q 62,-4 76,16 Z" fill="#1e1b4b"/>
                <path d="M 23,18 Q 38,-29 82,-30 Q 63,-5 74,16 Z" fill="#2e1065"/>
                <!-- Très large bord du chapeau (rx=50) qui coiffe le front à l'avant-plan -->
                <ellipse cx="50" cy="19" rx="50" ry="13.5" fill="#1e1b4b" transform="rotate(-6 50 19)"/>
                <ellipse cx="50" cy="19" rx="46" ry="9.5" fill="#3b0764" transform="rotate(-6 50 19)"/>
                <!-- Ruban violet vibrant courbé vers le BAS (perspective naturelle) -->
                <path d="M 26,16 Q 50,26 74,17 L 73,22 Q 50,31 27,21 Z" fill="#9333ea"/>
                <!-- Vrai croissant de lune doré étincelant -->
                <path d="M 51,17 A 4.5,4.5 0 1 0 53,25 A 3.6,3.6 0 1 1 51,17 Z" fill="#fbbf24" stroke="#d97706" stroke-width="0.5"/>
                <circle cx="49" cy="20" r="0.8" fill="#ffffff"/>
            </g>`,
        handItem: `
            <g id="girl-hand-witch-staff">
                <!-- Grand bâton de sorcière vertical (hampe ébène passant exactement dans la main à x=76, y=75.5) -->
                <line x1="76" y1="34" x2="76" y2="108" stroke="#2e1065" stroke-width="3" stroke-linecap="round"/>
                <line x1="76" y1="34" x2="76" y2="108" stroke="#fbbf24" stroke-width="0.8" stroke-dasharray="3 3"/>
                <!-- Sommet magique épuré -->
                <!-- Halo d'énergie violette -->
                <circle cx="76" cy="26" r="9" fill="#c084fc" opacity="0.35"/>
                <!-- Grande orbe améthyste éclatante -->
                <circle cx="76" cy="26" r="6.5" fill="#9333ea" stroke="#fbbf24" stroke-width="1.2"/>
                <circle cx="74" cy="23.5" r="2.2" fill="#ffffff"/>
                <circle cx="77.5" cy="27.5" r="1.2" fill="#e9d5ff"/>
                <!-- Bague dorée sous l'orbe -->
                <rect x="73.5" y="32.5" width="5" height="2.5" rx="0.6" fill="#fbbf24" stroke="#78350f" stroke-width="0.5"/>
            </g>`
    },
    4: {
        id: 4,
        name: "4. Archère (Arc & Flèche)",
        backEquipment: "",
        legs: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="girl-legs-archer">
                <!-- Short d'archère aventurière & bottines de marche -->
                <!-- Short vert émeraude sombre -->
                <polygon points="38,82 49.5,82 49,93 37.5,93" fill="#047857"/>
                <line x1="37.5" y1="93" x2="49" y2="93" stroke="#064e3b" stroke-width="1"/>
                <polygon points="50.5,82 62,82 62.5,93 51,93" fill="#047857"/>
                <line x1="51" y1="93" x2="62.5" y2="93" stroke="#064e3b" stroke-width="1"/>
                
                <!-- Jambes nues -->
                <polygon points="39,93 48.5,93 48,104 41,104" fill="${skin.base}"/>
                <polygon points="51.5,93 61,93 59,104 52,104" fill="${skin.base}"/>
                
                <!-- Bottines d'aventurière en cuir avec revers -->
                <path d="M39.5 104 C39.5 102, 49.5 102, 49.5 104 L50 113 C50 115, 39 115, 39 113 Z" fill="#78350f"/>
                <rect x="39" y="103" width="10.5" height="3" rx="0.8" fill="#854d0e" stroke="#fbbf24" stroke-width="0.6"/>
                <rect x="42.5" y="107" width="4" height="2" rx="0.8" fill="#fbbf24"/>
                
                <path d="M50.5 104 C50.5 102, 60.5 102, 60.5 104 L61 113 C61 115, 50 115, 50 113 Z" fill="#78350f"/>
                <rect x="50.5" y="103" width="10.5" height="3" rx="0.8" fill="#854d0e" stroke="#fbbf24" stroke-width="0.6"/>
                <rect x="53.5" y="107" width="4" height="2" rx="0.8" fill="#fbbf24"/>
            </g>`,
        body: `
            <g id="girl-body-archer">
                <!-- Haut débardeur sans manches émeraude & col or -->
                <path d="M 33,65 C 33,62 36,61.5 39,61.5 L 61,61.5 C 64,61.5 67,62 67,65 L 62.5,82 L 37.5,82 Z" fill="#047857"/>
                <path d="M44 60 L50 69 L56 60 Z" fill="#fef08a"/>
                <circle cx="50" cy="65" r="2.2" fill="#10b981"/>
                <circle cx="50" cy="73" r="1.5" fill="#fbbf24"/>
            </g>`,
        belt: `
            <g id="girl-belt-archer">
                <rect x="37" y="80.5" width="26" height="4" rx="1" fill="#78350f"/>
                <circle cx="50" cy="82.5" r="2.5" fill="#fbbf24"/>
            </g>`,
        arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="girl-arms-archer">
                <!-- Bras nus sans manches avec protège-poignets en cuir -->
                <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="${skin.base}"/>
                <rect x="25" y="74" width="6.5" height="6.5" rx="1.2" fill="#78350f" stroke="#fbbf24" stroke-width="0.5" transform="rotate(-15 28 77)"/>
                <ellipse cx="27" cy="81.5" rx="3.6" ry="3.3" fill="${skin.base}"/>
                <path d="M67 63 C74 66.5, 76 70.5, 75 75.5 C72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="${skin.base}"/>
                <rect x="68" y="69" width="6.5" height="6" rx="1.2" fill="#78350f" stroke="#fbbf24" stroke-width="0.5" transform="rotate(15 71 72)"/>
                <ellipse cx="76" cy="75.5" rx="3.6" ry="3.3" fill="${skin.base}"/>
            </g>`,
        headAccessory: "",
        handItem: `
            <g id="girl-hand-archer-equipment">
                <!-- Flèche elfique tenue dans la main droite à (27, 81.5) inclinée à 45° -->
                <g id="girl-hand-arrow" transform="rotate(45 27 81.5)">
                    <!-- Pointe elfique étincelante -->
                    <polygon points="27,45 30.5,53 23.5,53" fill="#e2e8f0" stroke="#334155" stroke-width="0.7"/>
                    <line x1="27" y1="45" x2="27" y2="53" stroke="#ffffff" stroke-width="0.9"/>
                    <!-- Bague dorée sous la pointe -->
                    <rect x="25.5" y="53" width="3" height="2" rx="0.5" fill="#fbbf24"/>
                    <!-- Hampe en bois d'if traversant la main à (27, 81.5) -->
                    <line x1="27" y1="53" x2="27" y2="91" stroke="#854d0e" stroke-width="1.6" stroke-linecap="round"/>
                    <line x1="27" y1="53" x2="27" y2="91" stroke="#fbbf24" stroke-width="0.7" stroke-linecap="round"/>
                    <!-- Empennage à plumes elfiques émeraude et or sous la main -->
                    <polygon points="27,85 31.5,88 31.5,92 27,90" fill="#10b981"/>
                    <polygon points="27,85 22.5,88 22.5,92 27,90" fill="#10b981"/>
                    <polygon points="27,87 30,89 30,91 27,90" fill="#fbbf24"/>
                    <polygon points="27,87 24,89 24,91 27,90" fill="#fbbf24"/>
                    <circle cx="27" cy="92" r="0.8" fill="#78350f"/>
                </g>
                <!-- Arc elfique tenu dans l'autre main à (76, 75.5) -->
                <g id="girl-hand-bow">
                    <!-- Corde tendue vers le personnage (côté intérieur à x=64) -->
                    <line x1="64" y1="49.5" x2="64" y2="101.5" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>
                    <!-- Bois elfique courbé vers l'extérieur passant exactement dans la main à (76, 75.5) -->
                    <path d="M 64,49.5 Q 88,75.5 64,101.5" fill="none" stroke="#a16207" stroke-width="2.6" stroke-linecap="round"/>
                    <path d="M 64,49.5 Q 89,75.5 64,101.5" fill="none" stroke="#fbbf24" stroke-width="1.2" stroke-linecap="round"/>
                    <!-- Poignée et ornementation émeraude placées directement sur le bois et dans la main (76, 75.5) -->
                    <rect x="73.8" y="72" width="4.4" height="7" rx="1" fill="#78350f" stroke="#fbbf24" stroke-width="0.6"/>
                    <circle cx="76" cy="75.5" r="2.2" fill="#10b981" stroke="#fbbf24" stroke-width="0.6"/>
                </g>
            </g>`
    }
};

// ==========================================
// TENUES ET ÉQUIPEMENTS DES TROPHÉES RPG
// ==========================================

// Modèle de dague elfique géométriquement parfait et rectiligne (aligné sur l'axe vertical x=0)
const ELF_DAGGER_MODEL = `
    <!-- Pommeau serti d'une émeraude et bague dorée (aligné sur l'axe x=0) -->
    <rect x="-1.5" y="-11.2" width="3" height="1.2" rx="0.4" fill="#fbbf24" stroke="#78350f" stroke-width="0.3"/>
    <circle cx="0" cy="-9.5" r="1.8" fill="#10b981" stroke="#065f46" stroke-width="0.4"/>
    <circle cx="-0.5" cy="-10" r="0.6" fill="#ffffff"/>

    <!-- Poignée tressée en cuir avec spires dorées (alignée sur l'axe x=0) -->
    <rect x="-1.1" y="-7.8" width="2.2" height="7.8" rx="0.4" fill="#451a03"/>
    <line x1="-1.1" y1="-6.2" x2="1.1" y2="-5.7" stroke="#fbbf24" stroke-width="0.5"/>
    <line x1="-1.1" y1="-4.2" x2="1.1" y2="-3.7" stroke="#fbbf24" stroke-width="0.5"/>
    <line x1="-1.1" y1="-2.2" x2="1.1" y2="-1.7" stroke="#fbbf24" stroke-width="0.5"/>

    <!-- Garde dorée ouvragée symétrique à quillons fins (perpendiculaire à l'axe) -->
    <path d="M -5.5,-1.2 C -2.5,0.2 2.5,0.2 5.5,-1.2 C 6,-0.3 6,0.8 5.5,1.2 C 2.5,0.2 -2.5,0.2 -5.5,1.2 C -6,0.8 -6,-0.3 -5.5,-1.2 Z" fill="#fbbf24" stroke="#78350f" stroke-width="0.4"/>
    <polygon points="0,-1.4 1.3,0 0,1.4 -1.3,0" fill="#10b981"/>

    <!-- Lame elfique droite biseautée (acier trempé le long de l'axe x=0) -->
    <!-- Côté gauche ombré -->
    <path d="M 0,1 L -2.2,1 C -2.5,7 -2.5,13 0,23 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="0.3"/>
    <!-- Côté droit lumineux miroir -->
    <path d="M 0,1 L 2.2,1 C 2.5,7 2.5,13 0,23 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="0.3"/>
    <!-- Arête centrale strictement rectiligne -->
    <line x1="0" y1="1" x2="0" y2="23" stroke="#64748b" stroke-width="0.5"/>
    <!-- Éclat magique à la pointe effilée -->
    <polygon points="-0.7,19 0,23.5 0.7,19 0,18" fill="#38bdf8" opacity="0.85"/>
`;

export const OUTFIT_ELF_RANGER = {
    id: 'elf_ranger',
    name: 'Rôdeur Sylvestre (Elfe)',
    badge: 'Trophée 1',
    // Cape sylvestre aux découpes en feuille (sans carquois)
    backEquipment: `
        <g id="outfit-elf-back">
            <!-- Cape sylvestre découpée en feuilles (nettement plus foncée que la tunique émeraude #1b5e52) -->
            <path d="M 33,65 C 25,76 21,96 25,110 C 35,114 42,106 50,111 C 58,106 65,114 75,110 C 79,96 75,76 67,65 Z" fill="#0d332c"/>
            <path d="M 36,68 C 29,80 26,98 31,108 C 40,111 46,104 50,108 C 54,104 60,111 69,108 C 74,98 71,80 64,68 Z" fill="#144b41" opacity="0.85"/>
        </g>`,
    legs: (skin) => `
        <g id="outfit-elf-legs">
            <!-- Pantalon ajusté vert sombre sylvestre -->
            <polygon points="39,85 49,85 48,97 41,97" fill="#133e38"/>
            <polygon points="51,85 61,85 59,97 52,97" fill="#133e38"/>
            <!-- Bottes montantes de rôdeur en cuir patiné -->
            <polygon points="40,96 48.5,96 48,106 41,106" fill="#6d3811"/>
            <polygon points="39.8,98 48.7,98 48.3,99.5 40.2,99.5" fill="#f59e0b"/>
            <path d="M39.5 106 C39.5 104, 49.5 104, 49.5 106 L50 113 C50 115, 39 115, 39 113 Z" fill="#451a03"/>
            <path d="M38.5 112 L50.5 112 L50 114 L39 114 Z" fill="#290f02"/>
            <rect x="42.5" y="107" width="4" height="2" rx="0.8" fill="#f59e0b"/>

            <polygon points="51.5,96 60,96 59,106 52,106" fill="#6d3811"/>
            <polygon points="51.3,98 60.2,98 59.8,99.5 51.7,99.5" fill="#f59e0b"/>
            <path d="M50.5 106 C50.5 104, 60.5 104, 60.5 106 L61 113 C61 115, 50 115, 50 113 Z" fill="#451a03"/>
            <path d="M49.5 112 L61.5 112 L61 114 L50 114 Z" fill="#290f02"/>
            <rect x="53.5" y="107" width="4" height="2" rx="0.8" fill="#f59e0b"/>
        </g>`,
    body: `
        <g id="outfit-elf-body">
            <!-- Tunique d'éclaireur elfe émeraude -->
            <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 62,61.5 C 66,61.5 69,62 69,65 L 63.5,86 L 36.5,86 Z" fill="#1b5e52"/>
            <!-- Plastron en cuir ouvragé souple -->
            <path d="M 36,63 L 64,63 L 60,82 L 40,82 Z" fill="#78350f"/>
            <!-- Bordure dorée du plastron -->
            <path d="M 36,63 L 40,82 L 60,82 L 64,63" fill="none" stroke="#f59e0b" stroke-width="0.7"/>
            <!-- Lacets dorés du plastron -->
            <line x1="47" y1="65" x2="53" y2="67" stroke="#fbbf24" stroke-width="1"/>
            <line x1="53" y1="67" x2="47" y2="70" stroke="#fbbf24" stroke-width="1"/>
            <line x1="47" y1="73" x2="53" y2="75" stroke="#fbbf24" stroke-width="1"/>
            <line x1="53" y1="75" x2="47" y2="78" stroke="#fbbf24" stroke-width="1"/>
            <!-- Col montant émeraude et feuille dorée -->
            <path d="M44 60.5 L50 67 L56 60.5 Z" fill="#10b981"/>
            <path d="M48 60.5 L50 64 L52 60.5 Z" fill="#f59e0b"/>
        </g>`,
    belt: `
        <g id="outfit-elf-belt">
            <!-- Ceinture cuir patiné à boucle feuille elfique -->
            <rect x="36" y="82" width="28" height="5" rx="1.2" fill="#451a03"/>
            <path d="M 46,84.5 C 47,81 53,81 54,84.5 C 53,88 47,88 46,84.5 Z" fill="#f59e0b" stroke="#361702" stroke-width="0.6"/>
            <circle cx="50" cy="84.5" r="1.5" fill="#10b981"/>
            <!-- Sacoche d'herboriste avec fiole magique suspendue -->
            <rect x="36" y="83" width="5" height="7" rx="1.2" fill="#6d3811" stroke="#361702" stroke-width="0.7"/>
            <circle cx="38.5" cy="86" r="0.8" fill="#fbbf24"/>
            <!-- Petite fiole en verre vert -->
            <ellipse cx="61" cy="87" rx="2" ry="3" fill="#34d399" opacity="0.85" stroke="#065f46" stroke-width="0.5"/>
            <rect x="60" y="83.5" width="2" height="1.5" rx="0.4" fill="#d97706"/>
        </g>`,
    arms: (skin) => `
        <g id="outfit-elf-arms">
            <!-- Bras gauche avec manche verte et brassard en cuir -->
            <path d="M32 64 C24 70, 23 77, 28 83 C31 83, 33 80, 35 76 Z" fill="#1b5e52"/>
            <path d="M26 73 C24 76, 25 80, 29 82 C31 81, 32 78, 32 75 Z" fill="#78350f" stroke="#fbbf24" stroke-width="0.6"/>
            <ellipse cx="29" cy="84" rx="3.6" ry="3.3" fill="${skin.base}"/>
            <!-- Bras droit avec manche verte et brassard en cuir -->
            <path d="M68 64 C76 69, 78 72, 76 79 C73 81, 70 79, 66 75 Z" fill="#1b5e52"/>
            <path d="M72 69 C75 72, 75 76, 73 78 C70 78, 68 75, 68 72 Z" fill="#78350f" stroke="#fbbf24" stroke-width="0.6"/>
            <ellipse cx="76" cy="78" rx="3.6" ry="3.3" fill="${skin.base}"/>
        </g>`,
    headAccessory: `
        <g id="outfit-elf-head-accessory">
            <!-- Diadème frontal elfique rehaussé avec gemme émeraude -->
            <path d="M 28,26 Q 50,21 72,26" fill="none" stroke="#f59e0b" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M 45,23 L 50,18 L 55,23 Z" fill="#f59e0b"/>
            <circle cx="50" cy="20.5" r="2.2" fill="#10b981" stroke="#065f46" stroke-width="0.5"/>
            <circle cx="49.3" cy="19.8" r="0.7" fill="#ffffff"/>
        </g>`,
    handItem: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
        <g id="outfit-elf-hand-twin-daggers">
            <!-- Dague elfique gauche (main gauche à 29, 84 en garde basse vers le bas-gauche) -->
            <g id="elf-dagger-left" transform="translate(29, 84) rotate(22)">
                ${ELF_DAGGER_MODEL}
                <!-- Doigts de la main gauche refermés sur la poignée -->
                <ellipse cx="0" cy="-3.5" rx="2.5" ry="3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                <line x1="-1.6" y1="-4.6" x2="1" y2="-4.6" stroke="${skin.shadow}" stroke-width="0.5"/>
                <line x1="-1.6" y1="-2.6" x2="1" y2="-2.6" stroke="${skin.shadow}" stroke-width="0.5"/>
            </g>

            <!-- Dague elfique droite (main droite à 76, 78 en garde haute vers le haut-droite) -->
            <g id="elf-dagger-right" transform="translate(76, 78) rotate(-152)">
                ${ELF_DAGGER_MODEL}
                <!-- Doigts de la main droite refermés sur la poignée -->
                <ellipse cx="0" cy="-3.5" rx="2.5" ry="3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                <line x1="-1.6" y1="-4.6" x2="1" y2="-4.6" stroke="${skin.shadow}" stroke-width="0.5"/>
                <line x1="-1.6" y1="-2.6" x2="1" y2="-2.6" stroke="${skin.shadow}" stroke-width="0.5"/>
            </g>
        </g>`
};

export const OUTFIT_ORC_BERSERKER = {
    id: 'orc_berserker',
    name: 'Berserker des Steppes (Orc)',
    badge: 'Trophée 2',
    // Cape / col en fourrure de loup sauvage sur les épaules
    backEquipment: `
        <g id="outfit-orc-back">
            <!-- Col et cape de fourrure de bête sauvage -->
            <path d="M 28,64 C 18,74 15,92 18,106 C 28,110 38,104 50,108 C 62,104 72,110 82,106 C 85,92 82,74 72,64 Z" fill="#381c0c"/>
            <path d="M 24,70 L 19,82 L 27,80 L 21,94 L 30,90 L 25,104 L 34,98" stroke="#542b13" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M 76,70 L 81,82 L 73,80 L 79,94 L 70,90 L 75,104 L 66,98" stroke="#542b13" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        </g>`,
    legs: (skin) => `
        <g id="outfit-orc-legs">
            <!-- Pantalon de cuir barbare sombre -->
            <polygon points="39,85 49,85 48,98 41,98" fill="#262626"/>
            <polygon points="51,85 61,85 59,98 52,98" fill="#262626"/>
            <!-- Guêtres en fourrure aux mollets -->
            <rect x="40" y="96" width="8.5" height="4.5" rx="1.5" fill="#542b13"/>
            <rect x="51.5" y="96" width="8.5" height="4.5" rx="1.5" fill="#542b13"/>
            <!-- Grosses bottes lourdes renforcées de fer -->
            <polygon points="40,99 48.5,99 48,106 41,106" fill="#171717"/>
            <path d="M39.5 106 C39.5 104, 49.5 104, 49.5 106 L50 113 C50 115, 39 115, 39 113 Z" fill="#171717"/>
            <path d="M38.5 112 L50.5 112 L50 114 L39 114 Z" fill="#09090b"/>
            <rect x="42" y="106.5" width="5" height="2" rx="0.5" fill="#94a3b8" stroke="#475569" stroke-width="0.5"/>

            <polygon points="51.5,99 60,99 59,106 52,106" fill="#171717"/>
            <path d="M50.5 106 C50.5 104, 60.5 104, 60.5 106 L61 113 C61 115, 50 115, 50 113 Z" fill="#171717"/>
            <path d="M49.5 112 L61.5 112 L61 114 L50 114 Z" fill="#09090b"/>
            <rect x="53" y="106.5" width="5" height="2" rx="0.5" fill="#94a3b8" stroke="#475569" stroke-width="0.5"/>
        </g>`,
    body: (skin) => `
        <g id="outfit-orc-body">
            <!-- Torse musclé à carnation orc apparente -->
            <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 62,61.5 C 66,61.5 69,62 69,65 L 63.5,86 L 36.5,86 Z" fill="${skin.base}"/>
            <!-- Harnais de combat en lanières de cuir croisées (extrémités ajustées à fleur d'épaule et de taille) -->
            <path d="M 33.5,63.0 C 35,62.0 36.8,61.6 38.5,61.5 L 62.5,83.0 L 58.5,85.0 L 33.5,63.0 Z" fill="#451a03"/>
            <path d="M 66.5,63.0 C 65,62.0 63.2,61.6 61.5,61.5 L 37.5,83.0 L 41.5,85.0 L 66.5,63.0 Z" fill="#451a03"/>
            <!-- Rivets d'acier sur le harnais -->
            <circle cx="36" cy="67" r="1.2" fill="#cbd5e1" stroke="#334155" stroke-width="0.5"/>
            <circle cx="64" cy="67" r="1.2" fill="#cbd5e1" stroke="#334155" stroke-width="0.5"/>
            <!-- Crâne / Totem d'os central sculpté -->
            <path d="M 46,71 L 54,71 L 53,78 L 50,81 L 47,78 Z" fill="#fef3c7" stroke="#78350f" stroke-width="0.8"/>
            <circle cx="48.5" cy="74" r="1" fill="#78350f"/>
            <circle cx="51.5" cy="74" r="1" fill="#78350f"/>
            <line x1="48.5" y1="77" x2="51.5" y2="77" stroke="#78350f" stroke-width="0.7"/>
            <!-- Épaulette d'os gauche -->
            <path d="M 30,64 C 27,61 27,57 32,59 C 35,60 36,63 33,66 Z" fill="#fef3c7" stroke="#78350f" stroke-width="0.6"/>
        </g>`,
    belt: `
        <g id="outfit-orc-belt">
            <!-- Large ceinture barbare cloutée avec pagne en fourrure -->
            <rect x="35" y="81.5" width="30" height="6.5" rx="1.5" fill="#292524"/>
            <!-- Rivets en fer forgé -->
            <circle cx="38" cy="84.8" r="1" fill="#94a3b8"/>
            <circle cx="42" cy="84.8" r="1" fill="#94a3b8"/>
            <circle cx="58" cy="84.8" r="1" fill="#94a3b8"/>
            <circle cx="62" cy="84.8" r="1" fill="#94a3b8"/>
            <!-- Boucle de ceinture tête de fauve / os -->
            <rect x="46" y="81" width="8" height="7.5" rx="1.5" fill="#fef08a" stroke="#78350f" stroke-width="0.8"/>
            <polygon points="48,84 52,84 50,87" fill="#78350f"/>
            <!-- Pagne en lambeaux de cuir et fourrure -->
            <polygon points="44,88 56,88 53,95 47,95" fill="#451a03"/>
            <polygon points="46,88 54,88 50,94" fill="#542b13"/>
        </g>`,
    arms: (skin) => `
        <g id="outfit-orc-arms">
            <!-- Bras orc gauche avec gros brassard en cuir à pointes d'acier -->
            <path d="M32 64 C24 70, 23 77, 28 83 C31 83, 33 80, 35 76 Z" fill="${skin.base}"/>
            <rect x="25" y="73" width="7" height="8" rx="1.2" fill="#292524" stroke="#451a03" stroke-width="0.6" transform="rotate(-15 28 77)"/>
            <polygon points="23,76 25,74 25,78" fill="#e2e8f0" stroke="#475569" stroke-width="0.5"/>
            <polygon points="29,81 31,79 31,83" fill="#e2e8f0" stroke="#475569" stroke-width="0.5"/>
            <ellipse cx="29" cy="84" rx="3.8" ry="3.5" fill="${skin.base}"/>

            <!-- Bras orc droit avec brassard clouté -->
            <path d="M68 64 C76 69, 78 72, 76 79 C73 81, 70 79, 66 75 Z" fill="${skin.base}"/>
            <rect x="68" y="70" width="7" height="7.5" rx="1.2" fill="#292524" stroke="#451a03" stroke-width="0.6" transform="rotate(15 71 74)"/>
            <polygon points="76,72 74,70 74,74" fill="#e2e8f0" stroke="#475569" stroke-width="0.5"/>
            <ellipse cx="76" cy="78" rx="3.8" ry="3.5" fill="${skin.base}"/>
        </g>`,
    headAccessory: `
        <g id="outfit-orc-head-accessory">
            <!-- Diadème / Bandeau de guerre en cuir barbare rehaussé sur le haut du front -->
            <path d="M 26,17 Q 50,12 74,17" fill="none" stroke="#451a03" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Pointe de diadème barbare frontale -->
            <path d="M 45,14 L 50,9 L 55,14 Z" fill="#78350f" stroke="#451a03" stroke-width="0.5"/>
            <!-- Corne courte barbare gauche rehaussée -->
            <path d="M 27,17.5 Q 20,11 16,5 Q 24,10 29,17.5 Z" fill="#fef3c7" stroke="#78350f" stroke-width="0.7"/>
            <!-- Corne courte barbare droite rehaussée -->
            <path d="M 73,17.5 Q 80,11 84,5 Q 76,10 71,17.5 Z" fill="#fef3c7" stroke="#78350f" stroke-width="0.7"/>
            <!-- Gemme rouge sang / Joyau de guerre frontal -->
            <circle cx="50" cy="12.5" r="2.3" fill="#b91c1c" stroke="#450a0a" stroke-width="0.7"/>
            <circle cx="49.3" cy="11.8" r="0.7" fill="#fca5a5"/>
        </g>`,
    handItem: (skin = { base: '#659b5e', shadow: '#4d7c47' }) => `
        <g id="outfit-orc-hand-axe">
            <!-- Hache de guerre berserker orc en pierre taillée (silex brut et ligatures de cuir) -->
            <!-- Manche en bois lourd noueux -->
            <line x1="20" y1="36" x2="33" y2="114" stroke="#451a03" stroke-width="3.2" stroke-linecap="round"/>
            <line x1="20" y1="36" x2="33" y2="114" stroke="#78350f" stroke-width="1.8" stroke-linecap="round"/>

            <!-- Bague en os et pointe supérieure du manche -->
            <rect x="18.5" y="37" width="4" height="2.5" rx="0.6" fill="#b91c1c"/>
            <polygon points="19,37 20.5,31 22,37" fill="#fef3c7" stroke="#78350f" stroke-width="0.6"/>

            <!-- Tête de hache en pierre taillée : tranchant orienté vers l'avant/extérieur gauche -->
            <!-- Corps massif de la pierre de silex taillée -->
            <path d="M 6,38 
                     C 3,44 1,52 4,60 
                     C 6,64 12,62 16,58 
                     L 22,54 
                     L 27,53 
                     L 28,47 
                     L 22,44 
                     L 16,41 
                     C 12,38 8,36 6,38 Z" 
                  fill="#334155" stroke="#0f172a" stroke-width="0.9" stroke-linejoin="round"/>

            <!-- Biseau du tranchant en pierre taillée (arc de cercle orienté vers l'avant) -->
            <path d="M 6,38 
                     C 3,44 1,52 4,60 
                     L 8,56 
                     C 5,50 5,45 9,41 Z" 
                  fill="#64748b" stroke="#1e293b" stroke-width="0.6"/>

            <!-- Facettes rocheuses et éclats de pierre 3D -->
            <polygon points="9,41 6,38 13,40" fill="#94a3b8" opacity="0.9"/>
            <polygon points="4,48 1.5,52 5,54" fill="#94a3b8" opacity="0.9"/>
            <polygon points="8,56 4,60 11,58" fill="#cbd5e1" opacity="0.9"/>
            <polygon points="14,46 19,43 18,50" fill="#475569"/>
            <polygon points="14,48 18,52 13,54" fill="#1e293b"/>
            <!-- Encoches d'impact sur le silex -->
            <line x1="3" y1="46" x2="6" y2="47.5" stroke="#0f172a" stroke-width="0.7"/>
            <line x1="2.5" y1="54" x2="5.5" y2="54.5" stroke="#0f172a" stroke-width="0.7"/>

            <!-- Talon de pierre à l'arrière du manche (vers la droite) -->
            <polygon points="22,44 27,47 27,53 22,54" fill="#475569" stroke="#1e293b" stroke-width="0.7"/>
            <polygon points="23,46 26.5,47.5 26.5,52 23,52" fill="#64748b"/>

            <!-- Ligatures barbares : lanières de cuir et tendons rouges croisés fixant la pierre au manche -->
            <path d="M 18,42 L 25,56" stroke="#b91c1c" stroke-width="2.4" stroke-linecap="round"/>
            <path d="M 18,42 L 25,56" stroke="#78350f" stroke-width="1.4" stroke-linecap="round"/>
            <path d="M 25,42 L 18,56" stroke="#b91c1c" stroke-width="2.4" stroke-linecap="round"/>
            <path d="M 25,42 L 18,56" stroke="#78350f" stroke-width="1.4" stroke-linecap="round"/>
            <circle cx="21.5" cy="49" r="1.6" fill="#450a0a" stroke="#78350f" stroke-width="0.5"/>

            <!-- Lanières rouges sur la poignée -->
            <line x1="24" y1="75" x2="27" y2="77" stroke="#b91c1c" stroke-width="1.3"/>
            <line x1="25" y1="79" x2="28" y2="81" stroke="#b91c1c" stroke-width="1.3"/>
            <line x1="26" y1="87" x2="29" y2="89" stroke="#b91c1c" stroke-width="1.3"/>
            <line x1="27" y1="91" x2="30" y2="93" stroke="#b91c1c" stroke-width="1.3"/>

            <!-- Doigts orcs refermés sur la poignée de la hache -->
            <ellipse cx="28.5" cy="84" rx="3.6" ry="3.8" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.6"/>
            <line x1="26" y1="82.5" x2="30" y2="82.5" stroke="${skin.shadow}" stroke-width="0.6"/>
            <line x1="26.5" y1="85.5" x2="30.5" y2="85.5" stroke="${skin.shadow}" stroke-width="0.6"/>
        </g>`
};

// ==========================================
// COUPES DE CHEVEUX EXCLUSIVES DES TROPHÉES
// ==========================================

export const RPG_STYLES = {
    // Coupe Trophée 1 Garçon : Chevelure longue elfique noble avec mèches affinées et superposées
    elf_boy: {
        id: 'elf_boy',
        name: 'Noble Sylvestre Court (Mèches courtes nuque & épaules)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-elf-boy">
                <!-- Volume de base du crâne arrière -->
                <ellipse cx="50" cy="26" rx="35" ry="30" fill="${color}"/>
                <!-- Chevelure noble courte s'arrêtant aux épaules/nuque -->
                <path d="M 17,34 C 11,22 15,8 25,0 C 35,-6 65,-6 75,0 C 85,8 89,22 83,34 C 88,44 85,54 78,60 C 74,56 73,50 72,44 C 67,54 60,60 50,62 C 40,60 33,54 28,44 C 27,50 26,56 22,60 C 15,54 12,44 17,34 Z" fill="${color}"/>
                <!-- Mèches dorsales superposées plus courtes et effilées -->
                <path d="M 28,42 C 24,50 26,58 32,63 C 34,56 34,48 32,42 Z" fill="${color}" opacity="0.95"/>
                <path d="M 72,42 C 76,50 74,58 68,63 C 66,56 66,48 68,42 Z" fill="${color}" opacity="0.95"/>
                <path d="M 43,48 C 42,55 45,61 50,64 C 55,61 58,55 57,48 Z" fill="${color}" opacity="0.9"/>
                <!-- Mèches d'épaule courtes encadrant la nuque -->
                <path d="M 20,38 C 15,46 16,54 21,60 C 23,56 24,50 23,44 Z" fill="${color}" opacity="0.9"/>
                <path d="M 24,42 C 21,48 21,55 25,62 C 27,57 27,51 26,44 Z" fill="${color}"/>
                <path d="M 80,38 C 85,46 84,54 79,60 C 77,56 76,50 77,44 Z" fill="${color}" opacity="0.9"/>
                <path d="M 76,42 C 79,48 79,55 75,62 C 73,57 73,51 74,44 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-elf-boy">
                <!-- Masse crânienne supérieure complète avec mèches fines de tempes -->
                <path d="M 20,30 
                         C 22,14 34,4 50,4 
                         C 66,4 78,14 80,30 
                         C 80,38 78,48 76,54 
                         C 74,46 74,36 75,28 
                         C 73,28 70,25 67,23 
                         C 63,27 59,28 55,22 
                         C 53,16 47,16 45,22 
                         C 41,28 37,27 33,23 
                         C 30,25 27,28 25,28 
                         C 26,36 26,46 24,54 
                         C 22,48 20,38 20,30 Z" fill="${color}"/>
                <!-- Mèches fines de tempes encadrant délicatement les joues -->
                <path d="M 22,34 C 19,42 20,50 22,58 C 24,52 24,44 23,36 Z" fill="${color}"/>
                <path d="M 25,32 C 24,40 25,48 27,54 C 28,48 28,40 27,34 Z" fill="${color}" opacity="0.85"/>
                <path d="M 78,34 C 81,42 80,50 78,58 C 76,52 76,44 77,36 Z" fill="${color}"/>
                <path d="M 75,32 C 76,40 75,48 73,54 C 72,48 72,40 73,34 Z" fill="${color}" opacity="0.85"/>
                <!-- Mèches supérieures souples et affinées sur le sommet -->
                <path d="M 34,9 C 40,3 46,-1 50,-2 C 54,-1 60,3 66,9 C 60,6 55,6 50,7 C 45,6 40,6 34,9 Z" fill="${color}"/>
                <path d="M 42,4 C 46,-2 50,-2 54,4 C 52,1 48,1 42,4 Z" fill="#ffffff" opacity="0.3"/>
                <path d="M 37,12 C 43,6 48,3 50,2 C 52,3 57,6 63,12 C 58,9 54,9 50,9.5 C 46,9 42,9 37,12 Z" fill="${color}" opacity="0.9"/>
            </g>`
    },

    // Coupe Trophée 1 Fille : Chevelure longue elfique féerique avec mèches dédoublées affinées
    elf_girl: {
        id: 'elf_girl',
        name: 'Féerique Sylvestre Longue (Mèches fines en cascade)',
        withTiara: false,
        getHairBack: (color) => `
            <g id="hair-back-elf-girl">
                <!-- Volume de base du crâne arrière -->
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <!-- Grande chevelure longue elfique en cascade dans le dos -->
                <path d="M 16,36 C 10,22 14,8 24,0 C 34,-6 66,-6 76,0 C 86,8 90,22 84,36 C 92,52 90,72 84,88 C 80,78 77,68 75,56 C 69,72 63,90 50,92 C 37,90 31,72 25,56 C 23,68 20,78 16,88 C 10,72 8,52 16,36 Z" fill="${color}"/>
                <!-- Mèches dorsales superposées plus fines et effilées -->
                <path d="M 26,44 C 21,58 23,74 29,88 C 32,76 32,62 31,48 Z" fill="${color}" opacity="0.95"/>
                <path d="M 74,44 C 79,58 77,74 71,88 C 68,76 68,62 69,48 Z" fill="${color}" opacity="0.95"/>
                <path d="M 38,50 C 35,64 38,78 42,90 C 44,78 43,64 41,52 Z" fill="${color}" opacity="0.9"/>
                <path d="M 62,50 C 65,64 62,78 58,90 C 56,78 57,64 59,52 Z" fill="${color}" opacity="0.9"/>
                <!-- Tresse centrale effilée -->
                <path d="M 46,58 C 45,70 48,82 50,93 C 52,82 55,70 54,58 Z" fill="${color}" opacity="0.85"/>
                <!-- Mèches d'épaule gauche plus fines dédoublées en cascade -->
                <path d="M 19,40 C 13,50 12,64 17,76 C 20,74 22,66 22,56 C 23,48 22,42 19,40 Z" fill="${color}" opacity="0.9"/>
                <path d="M 23,44 C 18,54 18,68 23,82 C 26,80 27,70 27,60 C 28,52 26,46 23,44 Z" fill="${color}"/>
                <path d="M 26,48 C 24,58 25,70 28,84 C 30,82 31,72 30,62 C 30,54 28,48 26,48 Z" fill="${color}" opacity="0.85"/>
                <!-- Mèches d'épaule droite plus fines dédoublées en cascade -->
                <path d="M 81,40 C 87,50 88,64 83,76 C 80,74 78,66 78,56 C 77,48 78,42 81,40 Z" fill="${color}" opacity="0.9"/>
                <path d="M 77,44 C 82,54 82,68 77,82 C 74,80 73,70 73,60 C 72,52 74,46 77,44 Z" fill="${color}"/>
                <path d="M 74,48 C 76,58 75,70 72,84 C 70,82 69,72 70,62 C 70,54 72,48 74,48 Z" fill="${color}" opacity="0.85"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-elf-girl">
                <!-- Masse crânienne supérieure avec frange longue et pointue -->
                <path d="M 20,30 
                         C 22,14 34,4 50,4 
                         C 66,4 78,14 80,30 
                         C 80,38 78,48 76,56 
                         C 74,48 74,38 75,28 
                         C 73,30 68,34 64,33 
                         C 60,32 58,28 57,25 
                         C 55,30 52,36 47,37 
                         C 43,33 42,28 41,25 
                         C 39,29 36,34 32,35 
                         C 29,32 27,29 25,28 
                         C 26,38 26,48 24,56 
                         C 22,48 20,38 20,30 Z" fill="${color}"/>
                <!-- Mèches fines de tempes encadrant les pommettes -->
                <path d="M 22,34 C 19,42 20,52 23,60 C 25,54 25,44 24,36 Z" fill="${color}"/>
                <path d="M 26,32 C 24,42 25,50 27,56 C 28,50 28,42 27,34 Z" fill="${color}" opacity="0.85"/>
                <path d="M 78,34 C 81,42 80,52 77,60 C 75,54 75,44 76,36 Z" fill="${color}"/>
                <path d="M 74,32 C 76,42 75,50 73,56 C 72,50 72,42 73,34 Z" fill="${color}" opacity="0.85"/>
            </g>`
    },

    // Coupe Trophée 2 Garçon & Fille : Coupe hirsute en blocs larges obtus pointus
    orc_beast: {
        id: 'orc_beast',
        name: 'Hirsute en Blocs Sauvages',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-orc-beast">
                <ellipse cx="50" cy="24" rx="35" ry="30" fill="${color}"/>
                <!-- Gros blocs obtus pointus sauvages et larges à l'arrière -->
                <path d="M 82,42 
                         C 88,34 94,26 94,26 
                         C 90,22 86,18 86,18 
                         C 92,12 94,4 94,4 
                         C 88,2 82,0 82,0 
                         C 86,-8 86,-14 86,-14 
                         C 80,-10 74,-8 74,-8 
                         C 74,-16 66,-22 66,-22 
                         C 60,-16 54,-12 54,-12 
                         C 50,-22 44,-22 44,-22 
                         C 40,-14 36,-10 36,-10 
                         C 32,-18 24,-14 24,-14 
                         C 22,-8 20,-4 20,-4 
                         C 16,-2 8,2 8,2 
                         C 12,8 14,14 14,14 
                         C 8,18 6,24 6,24 
                         C 10,28 14,32 14,32 
                         C 10,38 18,44 18,44 
                         C 24,34 26,22 30,16 
                         C 38,8 62,8 70,16 
                         C 74,22 76,34 82,42 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-orc-beast">
                <!-- Masse frontale en blocs larges obtus pointus barbares -->
                <path d="M 20,30 
                         C 22,14 34,4 50,4 
                         C 66,4 78,14 80,30 
                         C 80,36 78,38 76,34 
                         C 74,26 71,22 68,22 
                         C 66,28 62,34 58,34 
                         C 56,26 53,20 50,20 
                         C 47,20 44,26 42,34 
                         C 38,34 34,28 32,22 
                         C 29,22 26,26 24,34 
                         C 22,38 20,36 20,30 Z" fill="${color}"/>
                <!-- Gros blocs de mèches hérissées sur le dessus en blocs larges -->
                <path d="M 28,10 C 24,2 26,-6 26,-6 C 30,0 34,4 34,4 C 36,-6 42,-12 42,-12 C 45,-4 47,2 47,2 C 49,-12 55,-16 55,-16 C 57,-6 58,2 58,2 C 62,-6 68,-10 68,-10 C 70,0 72,4 72,4 C 76,-4 80,0 80,0 C 78,8 74,12 72,12 Z" fill="${color}"/>
            </g>`
    },

    // Coupe Trophée 2 Fille : Crinière sauvage longue en blocs larges obtus (même style hirsute barbare)
    orc_girl: {
        id: 'orc_girl',
        name: 'Crinière Sauvage Longue (Orc Fille)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-orc-girl">
                <!-- Masse volumique crânienne -->
                <ellipse cx="50" cy="24" rx="35" ry="30" fill="${color}"/>
                <!-- Pics sauvages hérissés supérieurs (exactement le même style barbare) -->
                <path d="M 82,42 
                         C 88,34 94,26 94,26 
                         C 90,22 86,18 86,18 
                         C 92,12 94,4 94,4 
                         C 88,2 82,0 82,0 
                         C 86,-8 86,-14 86,-14 
                         C 80,-10 74,-8 74,-8 
                         C 74,-16 66,-22 66,-22 
                         C 60,-16 54,-12 54,-12 
                         C 50,-22 44,-22 44,-22 
                         C 40,-14 36,-10 36,-10 
                         C 32,-18 24,-14 24,-14 
                         C 22,-8 20,-4 20,-4 
                         C 16,-2 8,2 8,2 
                         C 12,8 14,14 14,14 
                         C 8,18 6,24 6,24 
                         C 10,28 14,32 14,32 
                         C 10,38 18,44 18,44 
                         C 24,34 26,22 30,16 
                         C 38,8 62,8 70,16 
                         C 74,22 76,34 82,42 Z" fill="${color}"/>
                <!-- Chevelure longue barbare dense descendant jusqu'aux cuisses en blocs larges obtus pointus -->
                <path d="M 16,36 
                         C 10,22 14,8 24,0 
                         C 34,-6 66,-6 76,0 
                         C 86,8 90,22 84,36 
                         C 94,54 92,72 86,88 
                         C 80,78 78,66 76,54 
                         C 72,72 66,88 50,90 
                         C 34,88 28,72 24,54 
                         C 22,66 20,78 14,88 
                         C 8,72 6,54 16,36 Z" fill="${color}"/>
                <!-- Mèches latérales sauvages supplémentaires en blocs obtus larges -->
                <path d="M 14,48 C 6,60 10,74 17,86 C 20,76 22,64 22,52 Z" fill="${color}"/>
                <path d="M 86,48 C 94,60 90,74 83,86 C 80,76 78,64 78,52 Z" fill="${color}"/>
                <!-- Mèches sauvages avant retombant sur les épaules en blocs obtus souples -->
                <path d="M 22,42 C 16,52 15,66 20,78 C 24,76 26,68 26,58 C 27,50 25,44 22,42 Z" fill="${color}" opacity="0.85"/>
                <path d="M 78,42 C 84,52 85,66 80,78 C 76,76 74,68 74,58 C 73,50 75,44 78,42 Z" fill="${color}" opacity="0.85"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-orc-girl">
                <!-- Masse frontale en blocs larges avec mèches barbares (même style actuel) -->
                <path d="M 20,30 
                         C 22,14 34,4 50,4 
                         C 66,4 78,14 80,30 
                         C 80,36 78,40 76,36 
                         C 74,28 71,22 68,22 
                         C 66,28 62,34 58,34 
                         C 56,26 53,20 50,20 
                         C 47,20 44,26 42,34 
                         C 38,34 34,28 32,22 
                         C 29,22 26,28 24,36 
                         C 22,40 20,36 20,30 Z" fill="${color}"/>
                <!-- Mèches de crête hérissées supérieures (exactement le même style actuel) -->
                <path d="M 28,10 C 24,2 26,-6 26,-6 C 30,0 34,4 34,4 C 36,-6 42,-12 42,-12 C 45,-4 47,2 47,2 C 49,-12 55,-16 55,-16 C 57,-6 58,2 58,2 C 62,-6 68,-10 68,-10 C 70,0 72,4 72,4 C 76,-4 80,0 80,0 C 78,8 74,12 72,12 Z" fill="${color}"/>
                <!-- Mèches de tempes sauvages encadrant le visage en blocs larges -->
                <path d="M 23,34 C 20,44 22,54 25,62 C 26,52 26,42 25,34 Z" fill="${color}"/>
                <path d="M 77,34 C 80,44 78,54 75,62 C 74,52 74,42 75,34 Z" fill="${color}"/>
            </g>`
    }
};

// Registre des tenues RPG
export const RPG_OUTFITS = {
    elf_ranger: OUTFIT_ELF_RANGER,
    orc_berserker: OUTFIT_ORC_BERSERKER
};

// Registre des Trophées RPG (Nouveau système de récompenses avec IDs courts pour chaque personnage)
export const RPG_TROPHIES = [
    {
        id: 'elf',
        shortId: 'elf',
        legacyId: 'trophy_elf_ranger',
        number: 1,
        title: "L'Éveil Sylvestre",
        species: 'elf',
        speciesName: 'Elfe',
        className: 'Rôdeur Sylvestre',
        badge: 'Nouveau',
        tagline: 'Maître rôdeur aux dagues jumelles et sens aiguisés',
        description: "Premier trophée d'élite : débloque la lignée des Elfes, leur coupe signature, leurs dagues jumelles et la panoplie sylvestre.",
        rewards: [
            { icon: 'bi-feather', label: "Espèce : Elfe (Oreilles pointues sylvestres)" },
            { icon: 'bi-shield-shaded', label: "Classe : Rôdeur Sylvestre" },
            { icon: 'bi-scissors', label: "Coupes exclusives : Pics sur le dessus (G) / Garçonne mèche longue (F)" },
            { icon: 'bi-gem', label: "Armes & Tête : Double dague elfique ciselée & Diadème émeraude rehaussé" },
            { icon: 'bi-person-bounding-box', label: "Tenue : Tunique d'éclaireur en lin vert & plastron cuir ouvragé" },
            { icon: 'bi-palette', label: "Teintes débloquées : Peau Porcelaine diaphane & Yeux Vert Émeraude" }
        ],
        boyPreset: {
            id: 'elf_b',
            type: 'boy',
            styleKey: 'elf_boy',
            styleId: 1,
            outfitKey: 'elf_ranger',
            species: 'elf',
            skinColor: 'pale',
            hairColor: '#14b8a6', // Turquoise Féerique (teinte lumineuse contrastant avec la peau porcelaine)
            eyeColor: 'emerald'
        },
        girlPreset: {
            id: 'elf_g',
            type: 'girl',
            styleKey: 'elf_girl',
            styleId: 1,
            outfitKey: 'elf_ranger',
            species: 'elf',
            skinColor: 'pale',
            hairColor: '#14b8a6', // Turquoise Féerique (identique, parité stricte)
            eyeColor: 'emerald'
        }
    },
    {
        id: 'orc',
        shortId: 'orc',
        legacyId: 'trophy_orc_berserker',
        number: 2,
        title: 'La Fureur des Steppes',
        species: 'orc',
        speciesName: 'Orc',
        className: 'Berserker',
        badge: 'Nouveau',
        tagline: 'Guerrier indomptable aux crocs acérés et hache massive',
        description: "Deuxième trophée d'élite : débloque la robuste espèce des Orcs, leur chevelure hirsute en pics, bouche droite de guerre et puissante panoplie de Berserker.",
        rewards: [
            { icon: 'bi-feather', label: "Espèce : Orc (Peau Vert Olive, Oreilles larges à anneau d'or & Dents du bas écartées et arrondies)" },
            { icon: 'bi-shield-shaded', label: "Classe : Berserker des Steppes" },
            { icon: 'bi-scissors', label: "Coupes exclusives : Hirsute en pics (G) & Crinière sauvage longue (F)" },
            { icon: 'bi-slash-square', label: "Arme : Hache de guerre berserker en pierre taillée" },
            { icon: 'bi-person-bounding-box', label: "Tenue : Harnais barbare riveté, col de fourrure & couronne de bête" },
            { icon: 'bi-palette', label: "Teintes débloquées : Peau Vert Olive (#659b5e) & Yeux Ambre Sauvage" }
        ],
        boyPreset: {
            id: 'orc_b',
            type: 'boy',
            styleKey: 'orc_beast',
            styleId: 4,
            outfitKey: 'orc_berserker',
            species: 'orc',
            skinColor: 'orc-green',
            hairColor: '#c2410c', // Roux Ardent Barbare (contraste éclatant avec la peau vert olive)
            eyeColor: 'amber'
        },
        girlPreset: {
            id: 'orc_g',
            type: 'girl',
            styleKey: 'orc_girl',
            styleId: 4,
            outfitKey: 'orc_berserker',
            species: 'orc',
            skinColor: 'orc-green',
            hairColor: '#c2410c', // Roux Ardent Barbare (identique, parité stricte)
            eyeColor: 'amber'
        }
    },
    {
        id: 'paladin',
        shortId: 'paladin',
        legacyId: 'trophy_paladin_light',
        number: 3,
        title: 'Le Serment Solaire',
        species: 'human',
        speciesName: 'Humain',
        className: 'Paladin de Lumière',
        badge: 'À venir',
        status: 'locked',
        tagline: 'Chevalier en armure de plaques scintillante',
        description: 'Troisième trophée : débloque l’armure de plates étincelante, bouclier doré et heaume solaire.',
        rewards: [
            { icon: 'bi-feather', label: 'Espèce : Humain' },
            { icon: 'bi-shield-shaded', label: 'Classe : Paladin' }
        ],
        boyPreset: { id: 'pal_b', type: 'boy', species: 'human' },
        girlPreset: { id: 'pal_g', type: 'girl', species: 'human' }
    },
    {
        id: 'kitsune',
        shortId: 'kitsune',
        legacyId: 'trophy_beast_monk',
        number: 4,
        title: 'La Voie Céleste',
        species: 'beast',
        speciesName: 'Kitsune / Mi-Humain',
        className: 'Moine Céleste',
        badge: 'À venir',
        status: 'locked',
        tagline: 'Disciple spirituel aux oreilles animales',
        description: 'Quatrième trophée : débloque les oreilles animales et les kimonos de prière shinto.',
        rewards: [
            { icon: 'bi-feather', label: 'Espèce : Kitsune (Oreilles animales)' },
            { icon: 'bi-shield-shaded', label: 'Classe : Moine Céleste' }
        ],
        boyPreset: { id: 'kit_b', type: 'boy', species: 'beast' },
        girlPreset: { id: 'kit_g', type: 'girl', species: 'beast' }
    },
    {
        id: 'shadow',
        shortId: 'shadow',
        legacyId: 'trophy_shadow_mage',
        number: 5,
        title: 'L’Énigme du Néant',
        species: 'shadow',
        speciesName: 'Ombre / Démon',
        className: 'Mage Noir Runique',
        badge: 'À venir',
        status: 'locked',
        tagline: 'Tisseur d’arcanes aux runes spectrales',
        description: 'Cinquième trophée : débloque la peau lilas sombre, yeux améthyste et robe runique.',
        rewards: [
            { icon: 'bi-feather', label: 'Espèce : Ombre' },
            { icon: 'bi-shield-shaded', label: 'Classe : Mage Noir' }
        ],
        boyPreset: { id: 'shd_b', type: 'boy', species: 'shadow' },
        girlPreset: { id: 'shd_g', type: 'girl', species: 'shadow' }
    },
    {
        id: 'vampire',
        shortId: 'vampire',
        legacyId: 'trophy_vampire_noble',
        number: 6,
        title: 'La Nuit Éternelle',
        species: 'vampire',
        speciesName: 'Vampire',
        className: 'Noble Duelliste',
        badge: 'À venir',
        status: 'locked',
        tagline: 'Aristocrate immortel au regard rubis',
        description: 'Sixième trophée : débloque les canines supérieures, redingote pourpre et rapière argentée.',
        rewards: [
            { icon: 'bi-feather', label: 'Espèce : Vampire (Canines & Regard rubis)' },
            { icon: 'bi-shield-shaded', label: 'Classe : Noble Duelliste' }
        ],
        boyPreset: { id: 'vmp_b', type: 'boy', species: 'vampire' },
        girlPreset: { id: 'vmp_g', type: 'girl', species: 'vampire' }
    }
];

// Dictionnaire récapitulatif des IDs courts de chaque personnage avatar
export const AVATAR_SHORT_IDS = {
    // Personnages de base
    boy: { id: 'boy', name: 'Garçon Aventurier (Base)', type: 'base', defaultGender: 'boy' },
    girl: { id: 'girl', name: 'Fille Aventurière (Base)', type: 'base', defaultGender: 'girl' },
    // Nouveaux personnages RPG débloqués via trophées
    elf: { id: 'elf', name: 'Elfe Rôdeur Sylvestre', type: 'trophy', number: 1, boyId: 'elf_b', girlId: 'elf_g' },
    orc: { id: 'orc', name: 'Orc Berserker', type: 'trophy', number: 2, boyId: 'orc_b', girlId: 'orc_g' },
    paladin: { id: 'paladin', name: 'Humain Paladin Solaire', type: 'trophy', number: 3, boyId: 'pal_b', girlId: 'pal_g' },
    kitsune: { id: 'kitsune', name: 'Kitsune Moine Céleste', type: 'trophy', number: 4, boyId: 'kit_b', girlId: 'kit_g' },
    shadow: { id: 'shadow', name: 'Ombre Mage Noir', type: 'trophy', number: 5, boyId: 'shd_b', girlId: 'shd_g' },
    vampire: { id: 'vampire', name: 'Vampire Noble Duelliste', type: 'trophy', number: 6, boyId: 'vmp_b', girlId: 'vmp_g' }
};

/**
 * Génère le code SVG d'un avatar personnalisé
 * @param {Object} options - Options de configuration
 * @param {'boy'|'girl'} options.type - Modèle de base
 * @param {number} options.styleId - ID de la coupe (1..4)
 * @param {string} options.styleKey - Clé d'une coupe RPG exclusive
 * @param {number} options.outfitId - ID de la tenue (1..4)
 * @param {string} options.outfitKey - Clé d'une tenue RPG (ex: 'elf_ranger')
 * @param {Object} options.customOutfit - Objet tenue personnalisé direct
 * @param {string} options.species - Espèce ('human', 'elf', 'orc', etc.)
 * @param {string} options.hairColor - Code hex de la couleur des cheveux
 * @param {string} options.eyeColor - ID ou objet de couleur des yeux
 * @param {string} options.skinColor - ID ou objet de couleur de peau
 * @param {'full'|'head'} options.mode - Vue corps complet ou portrait tête seule
 * @returns {string} SVG complet
 */
export function buildCustomAvatarSvg({
    type = 'boy',
    styleId = 1,
    styleKey = null,
    outfitId = 1,
    outfitKey = null,
    customOutfit = null,
    species = 'human',
    hairColor = null,
    eyeColor = null,
    skinColor = 'light',
    mode = 'full'
} = {}) {
    const isBoy = type === 'boy';
    const base = isBoy ? BOY_BASE : GIRL_BASE;
    const styles = isBoy ? BOY_STYLES : GIRL_STYLES;
    const outfits = isBoy ? BOY_OUTFITS : GIRL_OUTFITS;

    // Résolution de la coupe de cheveux (standard ou exclusive RPG)
    let style = styles[styleId] || styles[1];
    if (styleKey && RPG_STYLES[styleKey]) {
        style = RPG_STYLES[styleKey];
    }
    
    // Résolution de la tenue (standard ou RPG)
    let outfit = outfits[outfitId] || outfits[1];
    if (customOutfit) {
        outfit = customOutfit;
    } else if (outfitKey && RPG_OUTFITS[outfitKey]) {
        outfit = RPG_OUTFITS[outfitKey];
    }

    // Couleur des cheveux (défaut partagé entre fille et garçon)
    const effectiveHairColor = hairColor || '#5a2d0c';

    // Couleur des yeux (défaut partagé entre fille et garçon, recherche dans ALL_EYE_COLORS)
    let effectiveEye = ALL_EYE_COLORS[0];
    if (typeof eyeColor === 'string') {
        const found = ALL_EYE_COLORS.find(c => c.id === eyeColor);
        if (found) effectiveEye = found;
    } else if (eyeColor && eyeColor.dark && eyeColor.light) {
        effectiveEye = eyeColor;
    }

    // Couleur de peau (recherche dans ALL_SKIN_COLORS)
    let effectiveSkin = ALL_SKIN_COLORS[1]; // light
    if (typeof skinColor === 'string') {
        const found = ALL_SKIN_COLORS.find(c => c.id === skinColor || c.base === skinColor);
        if (found) effectiveSkin = found;
    } else if (skinColor && skinColor.base && skinColor.shadow) {
        effectiveSkin = skinColor;
    }

    const hairBack = style.getHairBack(effectiveHairColor);
    const hairFront = style.getHairFront(effectiveHairColor);

    // Les nouveaux personnages RPG (espèces fantastiques ou tenues RPG) ne doivent JAMAIS
    // hériter des accessoires de base (bandeaux sportifs, diadèmes classiques, élastiques d'écolier)
    const isNewCharacter = species !== 'human' || Boolean(outfitKey) || Boolean(customOutfit) || Boolean(styleKey);
    const showBaseBand = !isNewCharacter && (isBoy ? Boolean(style.withBand) : Boolean(style.withTiara));
    const headBase = isBoy ? base.headBase(showBaseBand, effectiveSkin, species) : base.headBase(showBaseBand, effectiveSkin, species);
    const faceFeatures = base.faceFeatures(effectiveEye, effectiveSkin, species, effectiveHairColor);
    const eyebrows = base.eyebrows ? base.eyebrows(effectiveHairColor, 0.85) : '';

    const renderPart = (part) => (typeof part === 'function' ? part(effectiveSkin) : (part || ''));

    if (mode === 'head') {
        return `
            <svg viewBox="0 -34 100 102" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                ${hairBack}
                ${headBase}
                ${faceFeatures}
                ${hairFront}
                ${eyebrows}
                ${renderPart(outfit.headAccessory)}
            </svg>
        `;
    }

    return `
        <svg viewBox="0 -34 100 156" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
            ${renderPart(outfit.backEquipment)}
            ${base.shadow}
            ${hairBack}
            ${renderPart(outfit.legs)}
            ${renderPart(outfit.body)}
            ${renderPart(outfit.belt)}
            ${renderPart(outfit.arms)}
            ${headBase}
            ${faceFeatures}
            ${hairFront}
            ${eyebrows}
            ${renderPart(outfit.headAccessory)}
            ${renderPart(outfit.handItem)}
        </svg>
    `;
}

/**
 * Objet AVATARS pour compatibilité avec le code existant
 */
export const AVATARS = {
    boy: {
        id: 'boy',
        color: '#489e96',
        accent: '#ff9d00',
        image: null,
        get svg() {
            const config = (playerManager && playerManager.getAvatarConfig) ? playerManager.getAvatarConfig() : { type: 'boy', styleId: 1 };
            return buildCustomAvatarSvg({ ...config, type: 'boy', mode: 'full' });
        },
        get headSvg() {
            const config = (playerManager && playerManager.getAvatarConfig) ? playerManager.getAvatarConfig() : { type: 'boy', styleId: 1 };
            return buildCustomAvatarSvg({ ...config, type: 'boy', mode: 'head' });
        }
    },
    girl: {
        id: 'girl',
        color: '#ff9d00',
        accent: '#489e96',
        image: null,
        get svg() {
            const config = (playerManager && playerManager.getAvatarConfig) ? playerManager.getAvatarConfig() : { type: 'girl', styleId: 1 };
            return buildCustomAvatarSvg({ ...config, type: 'girl', mode: 'full' });
        },
        get headSvg() {
            const config = (playerManager && playerManager.getAvatarConfig) ? playerManager.getAvatarConfig() : { type: 'girl', styleId: 1 };
            return buildCustomAvatarSvg({ ...config, type: 'girl', mode: 'head' });
        }
    },
    // Nouveaux personnages RPG accessibles via leurs IDs courts
    elf: {
        id: 'elf',
        color: '#1b5e52',
        accent: '#f59e0b',
        get svg() { return renderAvatarSvg('elf'); },
        get headSvg() { return renderAvatarHeadSvg('elf'); }
    },
    orc: {
        id: 'orc',
        color: '#659b5e',
        accent: '#b91c1c',
        get svg() { return renderAvatarSvg('orc'); },
        get headSvg() { return renderAvatarHeadSvg('orc'); }
    },
    paladin: {
        id: 'paladin',
        color: '#fbbf24',
        accent: '#cbd5e1',
        get svg() { return renderAvatarSvg('paladin'); },
        get headSvg() { return renderAvatarHeadSvg('paladin'); }
    },
    kitsune: {
        id: 'kitsune',
        color: '#ea580c',
        accent: '#fef08a',
        get svg() { return renderAvatarSvg('kitsune'); },
        get headSvg() { return renderAvatarHeadSvg('kitsune'); }
    },
    shadow: {
        id: 'shadow',
        color: '#581c87',
        accent: '#a855f7',
        get svg() { return renderAvatarSvg('shadow'); },
        get headSvg() { return renderAvatarHeadSvg('shadow'); }
    },
    vampire: {
        id: 'vampire',
        color: '#881337',
        accent: '#e2e8f0',
        get svg() { return renderAvatarSvg('vampire'); },
        get headSvg() { return renderAvatarHeadSvg('vampire'); }
    }
};

/**
 * Retrouve la configuration prédéfinie d'un personnage via son ID court
 * @param {string} id - ID court (ex: 'elf', 'elf_b', 'elf_g', 'orc', 'orc_b', etc.)
 * @returns {Object|null}
 */
export function getAvatarPresetById(id) {
    if (!id || typeof id !== 'string') return null;
    const cleanId = id.trim().toLowerCase();
    for (const trophy of RPG_TROPHIES) {
        if (trophy.id === cleanId || trophy.shortId === cleanId || trophy.legacyId === cleanId) {
            return trophy.boyPreset;
        }
        if (trophy.boyPreset && (trophy.boyPreset.id === cleanId || cleanId === `${trophy.id}_boy` || cleanId === `${trophy.id}_b`)) {
            return trophy.boyPreset;
        }
        if (trophy.girlPreset && (trophy.girlPreset.id === cleanId || cleanId === `${trophy.id}_girl` || cleanId === `${trophy.id}_g`)) {
            return trophy.girlPreset;
        }
    }
    return null;
}

/**
 * Rend le SVG complet de l'avatar du joueur (personnalisé ou par ID court)
 */
export function renderAvatarSvg(avatarConfigOrId = null) {
    if (typeof avatarConfigOrId === 'object' && avatarConfigOrId !== null) {
        return buildCustomAvatarSvg({ ...avatarConfigOrId, mode: 'full' });
    }
    if (typeof avatarConfigOrId === 'string') {
        const preset = getAvatarPresetById(avatarConfigOrId);
        if (preset) {
            return buildCustomAvatarSvg({ ...preset, mode: 'full' });
        }
        if (avatarConfigOrId === 'boy' || avatarConfigOrId === 'girl') {
            const saved = playerManager ? playerManager.getAvatarConfig() : null;
            if (saved && saved.type === avatarConfigOrId) {
                return buildCustomAvatarSvg({ ...saved, mode: 'full' });
            }
            return buildCustomAvatarSvg({ type: avatarConfigOrId, styleId: 1, mode: 'full' });
        }
    }
    const config = playerManager ? playerManager.getAvatarConfig() : { type: 'boy', styleId: 1 };
    return buildCustomAvatarSvg({ ...config, mode: 'full' });
}

/**
 * Rend le SVG portrait (tête seule) de l'avatar du joueur (personnalisé ou par ID court)
 */
export function renderAvatarHeadSvg(avatarConfigOrId = null) {
    if (typeof avatarConfigOrId === 'object' && avatarConfigOrId !== null) {
        return buildCustomAvatarSvg({ ...avatarConfigOrId, mode: 'head' });
    }
    if (typeof avatarConfigOrId === 'string') {
        const preset = getAvatarPresetById(avatarConfigOrId);
        if (preset) {
            return buildCustomAvatarSvg({ ...preset, mode: 'head' });
        }
        if (avatarConfigOrId === 'boy' || avatarConfigOrId === 'girl') {
            const saved = playerManager ? playerManager.getAvatarConfig() : null;
            if (saved && saved.type === avatarConfigOrId) {
                return buildCustomAvatarSvg({ ...saved, mode: 'head' });
            }
            return buildCustomAvatarSvg({ type: avatarConfigOrId, styleId: 1, mode: 'head' });
        }
    }
    const config = playerManager ? playerManager.getAvatarConfig() : { type: 'boy', styleId: 1 };
    return buildCustomAvatarSvg({ ...config, mode: 'head' });
}
