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
    { id: 'paladin-gold', name: 'Or Solaire', hex: '#facc15', isTrophyReward: true },
    { id: 'cat-violet', name: 'Violet Félin', hex: '#7c3aed', isTrophyReward: true },
    { id: 'cat-lilac', name: 'Lilas Félin', hex: '#a78bfa', isTrophyReward: true },
    { id: 'shadow-dark', name: 'Noir Abyssal', hex: '#1e1435', isTrophyReward: true },
    { id: 'shadow-purple', name: 'Violet Nuit', hex: '#3b0764', isTrophyReward: true },
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
    { id: 'gold', name: 'Or Flamboyant', dark: '#78350f', light: '#f59e0b', isTrophyReward: true },
    { id: 'sky', name: 'Azur Céleste', dark: '#0c4a6e', light: '#38bdf8', isTrophyReward: true },
    { id: 'cat-rose', name: 'Rose Félin', dark: '#9d174d', light: '#f472b6', isTrophyReward: true }
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
    { id: 'orc-green', name: 'Vert Olive (Orc)', base: '#659b5e', shadow: '#46723e', mouth: '#1b4218', isTrophyReward: true }, // Vert sous-bois sombre
    { id: 'sun-bronze', name: 'Bronze Solaire (Paladin)', base: '#c68652', shadow: '#a0663a', mouth: '#5a240a', isTrophyReward: true }, // Bronze chaud, contraste avec l'Or Solaire
    { id: 'shadow-lilac', name: 'Lilas Mystique (Ombre)', base: '#d8b4fe', shadow: '#a855f7', mouth: '#4c1d95', isTrophyReward: true } // Peau lilas éthérée mystique
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


// ANCHOR Oreilles de chat sur le crâne (espèce cat) : couleur des cheveux, intérieur rose, touffes de poils en plume
// NOTE Dessinées juste avant hairFront : la frange recouvre leur base
export function getCatEars(hairColor = '#7c3aed') {
    return `
        <g id="cat-ears">
            <path d="M 23,10 C 20,1 18.5,-8 20,-16 C 27,-13 33,-8 39,-2 Z" fill="${hairColor}"/>
            <path d="M 25.2,6.5 C 23.4,0 22.6,-6 23.4,-11 C 27.6,-8.6 31.4,-5.6 35,-1.8 Z" fill="#f9a8d4"/>
            <path d="M 25.95,4.96 L 25.84,4.05 L 25.77,3.16 L 25.74,2.28 L 25.77,1.28 L 25.84,0.43 L 25.98,-0.54 L 26.14,-1.36 L 26.39,-2.3 L 26.64,-3.09 L 27,-4 L 27,-4 L 26.54,-3.13 L 26.19,-2.37 L 25.85,-1.44 L 25.6,-0.63 L 25.36,0.35 L 25.21,1.22 L 25.09,2.25 L 25.03,3.16 L 25.02,4.09 L 25.05,5.04 Q 25.56,5.63 25.95,4.96 Z M 27.9,4.05 L 27.97,3.33 L 28.08,2.63 L 28.22,1.95 L 28.39,1.3 L 28.65,0.56 L 28.9,-0.04 L 29.25,-0.72 L 29.64,-1.37 L 30.02,-1.9 L 30.5,-2.5 L 30.5,-2.5 L 29.94,-1.97 L 29.49,-1.48 L 29.02,-0.86 L 28.59,-0.21 L 28.26,0.39 L 27.92,1.12 L 27.66,1.79 L 27.44,2.48 L 27.25,3.2 L 27.1,3.95 Q 27.43,4.56 27.9,4.05 Z" fill="${hairColor}"/>
            <path d="M 77,10 C 80,1 81.5,-8 80,-16 C 73,-13 67,-8 61,-2 Z" fill="${hairColor}"/>
            <path d="M 74.8,6.5 C 76.6,0 77.4,-6 76.6,-11 C 72.4,-8.6 68.6,-5.6 65,-1.8 Z" fill="#f9a8d4"/>
            <path d="M 74.05,4.96 L 74.16,4.05 L 74.23,3.16 L 74.26,2.28 L 74.23,1.28 L 74.16,0.43 L 74.02,-0.54 L 73.86,-1.36 L 73.61,-2.3 L 73.36,-3.09 L 73,-4 L 73,-4 L 73.46,-3.13 L 73.81,-2.37 L 74.15,-1.44 L 74.4,-0.63 L 74.64,0.35 L 74.79,1.22 L 74.91,2.25 L 74.97,3.16 L 74.98,4.09 L 74.95,5.04 Q 74.44,5.63 74.05,4.96 Z M 72.1,4.05 L 72.03,3.33 L 71.92,2.63 L 71.78,1.95 L 71.61,1.3 L 71.35,0.56 L 71.1,-0.04 L 70.75,-0.72 L 70.36,-1.37 L 69.98,-1.9 L 69.5,-2.5 L 69.5,-2.5 L 70.06,-1.97 L 70.51,-1.48 L 70.98,-0.86 L 71.41,-0.21 L 71.74,0.39 L 72.08,1.12 L 72.34,1.79 L 72.56,2.48 L 72.75,3.2 L 72.9,3.95 Q 72.57,4.56 72.1,4.05 Z" fill="${hairColor}"/>
        </g>
    `;
}

// ANCHOR Queue de chat en panache simple (espèce cat) : courte, fine à la hanche puis évasée, bout arrondi,
// couleur des cheveux, rayures tigrées en fuseau, ombre discrète dessous et reflet dessus, dessinée derrière le corps
export function getCatTail(hairColor = '#7c3aed') {
    return `
        <g id="cat-tail">
            <path d="M 57,93 C 66,96 75,94 80,89 C 86,84 91,77 90,69 C 89.4,62 84,58.5 79,60 C 75,61.5 73.6,65 73.5,69 C 73,75 70.5,80.5 66,84 C 63,86.5 60,88 57,88.5 Z" fill="${hairColor}"/>
            <path d="M 60,93.6 L 62.76,94.22 L 65.96,94.53 L 69.12,94.39 L 71.79,93.92 L 74.8,92.9 L 77.66,91.41 L 79.97,89.75 L 82.12,87.78 L 84.12,85.52 L 86,83 L 86,83 L 83.68,85.09 L 81.35,86.89 L 79.03,88.44 L 76.71,89.76 L 74.01,91.06 L 71.26,92.09 L 68.84,92.8 L 65.9,93.35 L 62.8,93.61 L 60,93.6 L 60,93.6 Z" fill="#000000" opacity="0.15"/>
            <!-- Rayures tigrées en fuseau -->
            <path d="M 66.5,85.5 L 66.68,86.39 L 66.77,87.14 L 66.89,87.99 L 67,88.83 L 67.11,89.54 L 67.27,90.38 L 67.44,91.13 L 67.63,91.91 L 67.82,92.73 L 68,93.6 L 68,93.6 L 68.32,92.76 L 68.57,91.92 L 68.73,91.07 L 68.78,90.23 L 68.69,89.26 L 68.48,88.47 L 68.12,87.6 L 67.65,86.79 L 67.13,86.17 L 66.5,85.5 L 66.5,85.5 Z M 74.5,79 L 74.92,80.05 L 75.32,81.11 L 75.65,82.03 L 76.1,83.07 L 76.53,83.96 L 77.09,84.99 L 77.63,85.87 L 78.23,86.76 L 78.86,87.66 L 79.5,88.6 L 79.5,88.6 L 79.38,87.46 L 79.2,86.35 L 78.96,85.28 L 78.63,84.26 L 78.13,83.14 L 77.6,82.25 L 76.9,81.28 L 76.21,80.54 L 75.37,79.74 L 74.5,79 L 74.5,79 Z M 79.5,70.5 L 80.4,71.16 L 81.37,71.75 L 82.24,72.22 L 83.33,72.63 L 84.31,72.89 L 85.5,73.06 L 86.55,73.08 L 87.62,72.99 L 88.71,72.83 L 89.8,72.6 L 89.8,72.6 L 88.74,72.27 L 87.72,71.94 L 86.73,71.63 L 85.77,71.37 L 84.66,71.12 L 83.72,70.97 L 82.64,70.82 L 81.69,70.75 L 80.6,70.63 L 79.5,70.5 L 79.5,70.5 Z" fill="#000000" opacity="0.22"/>
            <path d="M 75.5,66 L 76.07,65.35 L 76.65,64.78 L 77.22,64.28 L 77.86,63.76 L 78.5,63.28 L 79.06,62.89 L 79.75,62.46 L 80.5,62.05 L 81.21,61.71 L 82,61.4 L 82,61.4 L 81.14,61.31 L 80.3,61.32 L 79.35,61.49 L 78.46,61.81 L 77.75,62.22 L 77.03,62.84 L 76.42,63.59 L 76.03,64.34 L 75.72,65.14 L 75.5,66 L 75.5,66 Z" fill="#ffffff" opacity="0.25"/>
        </g>
    `;
}

// ANCHOR Cornes en S du Mage Noir / Sorcière (espèce shadow) : double courbure sinueuse et cannelures améthyste en fuseau
// ANCHOR Cornes en S du Mage Noir / Sorcière (espèce shadow) : double courbure sinueuse et cannelures améthyste en fuseau
export function getShadowHorns() {
    return `
        <g id="shadow-horns">
            <!-- Corne gauche en S (échelle équilibrée S=0.84) -->
            <path d="M 26.6,16.1 
                     C 19,7.7 9.8,4.3 9,-4.1 
                     C 8.1,-11.6 14,-16.7 19,-18.4 
                     C 24.1,-20 24.9,-24.2 23.2,-28.4 
                     C 22.4,-24.2 19,-21.7 14.8,-19.2 
                     C 9.8,-16.7 3.9,-10.8 4.8,-3.2 
                     C 5.6,5.2 16.5,9.4 22.4,16.9 Z" 
                  fill="#130e24" stroke="#090514" stroke-width="0.8"/>
            <path d="M 26.6,16.1 
                     C 19.9,8.5 12.3,5.2 10.6,-3.2 
                     C 9.8,-10 14.8,-15 18.2,-17.5 
                     C 22.4,-19.2 23.2,-23.4 23.2,-27.6 
                     C 22.4,-23.4 20.7,-20 17.4,-18.4 
                     C 13.2,-15.8 9,-10 9.8,-2.4 
                     C 10.6,4.3 19,8.5 24.1,16.1 Z" 
                  fill="#7c3aed" opacity="0.6"/>
            <!-- Stries fines en fuseau (en bas arc vers le bas, en haut arc vers le haut) -->
            <path d="M 15,9.9 L 15.45,10.13 L 15.98,10.29 L 16.51,10.33 L 17.09,10.22 L 17.55,9.99 L 17.99,9.6 L 18.3,9.15 L 18.5,8.7 L 18.5,8.7 L 18.11,8.98 L 17.69,9.23 L 17.25,9.44 L 16.86,9.58 L 16.42,9.71 L 15.99,9.81 L 15.49,9.87 L 15,9.9 Z" fill="#c084fc"/>
            <path d="M 7,2.4 L 7.47,2.66 L 8.03,2.84 L 8.67,2.91 L 9.23,2.84 L 9.76,2.64 L 10.3,2.28 L 10.71,1.85 L 11,1.4 L 11,1.4 L 10.54,1.64 L 10.04,1.85 L 9.52,2.04 L 9.07,2.16 L 8.61,2.27 L 8.06,2.35 L 7.52,2.39 L 7,2.4 Z" fill="#c084fc"/>
            <path d="M 5.3,-8.6 L 5.84,-8.55 L 6.39,-8.52 L 6.92,-8.53 L 7.46,-8.59 L 7.98,-8.7 L 8.49,-8.87 L 9,-9.07 L 9.5,-9.3 L 9.5,-9.3 L 8.95,-9.33 L 8.41,-9.34 L 7.87,-9.32 L 7.34,-9.26 L 6.83,-9.15 L 6.31,-8.99 L 5.81,-8.81 L 5.3,-8.6 Z" fill="#c084fc"/>
            <path d="M 10.3,-16.1 L 10.81,-16.24 L 11.35,-16.34 L 11.92,-16.4 L 12.39,-16.4 L 12.93,-16.36 L 13.44,-16.29 L 13.98,-16.16 L 14.5,-16 L 14.5,-16 L 14.1,-16.38 L 13.59,-16.72 L 13.05,-16.95 L 12.41,-17.05 L 11.83,-16.99 L 11.21,-16.78 L 10.71,-16.46 L 10.3,-16.1 Z" fill="#c084fc"/>
            <path d="M 18.9,-21.9 L 19.42,-21.96 L 19.97,-21.97 L 20.52,-21.93 L 20.98,-21.83 L 21.49,-21.67 L 21.96,-21.48 L 22.45,-21.2 L 22.9,-20.9 L 22.9,-20.9 L 22.59,-21.36 L 22.18,-21.8 L 21.71,-22.13 L 21.12,-22.37 L 20.56,-22.43 L 19.92,-22.36 L 19.37,-22.17 L 18.9,-21.9 Z" fill="#c084fc"/>

            <!-- Corne droite en S -->
            <path d="M 73.4,16.1 
                     C 81,7.7 90.2,4.3 91,-4.1 
                     C 91.9,-11.6 86,-16.7 81,-18.4 
                     C 75.9,-20 75.1,-24.2 76.8,-28.4 
                     C 77.6,-24.2 81,-21.7 85.2,-19.2 
                     C 90.2,-16.7 96.1,-10.8 95.2,-3.2 
                     C 94.4,5.2 83.5,9.4 77.6,16.9 Z" 
                  fill="#130e24" stroke="#090514" stroke-width="0.8"/>
            <path d="M 73.4,16.1 
                     C 80.1,8.5 87.7,5.2 89.4,-3.2 
                     C 90.2,-10 85.2,-15 81.8,-17.5 
                     C 77.6,-19.2 76.8,-23.4 76.8,-27.6 
                     C 77.6,-23.4 79.3,-20 82.6,-18.4 
                     C 86.8,-15.8 91,-10 90.2,-2.4 
                     C 89.4,4.3 81,8.5 75.9,16.1 Z" 
                  fill="#7c3aed" opacity="0.6"/>
            <!-- Stries fines droite -->
            <path d="M 85,9.9 L 84.51,9.87 L 84.01,9.81 L 83.58,9.71 L 83.14,9.58 L 82.75,9.44 L 82.31,9.23 L 81.89,8.98 L 81.5,8.7 L 81.5,8.7 L 81.7,9.15 L 82.01,9.6 L 82.45,9.99 L 82.91,10.22 L 83.49,10.33 L 84.02,10.29 L 84.55,10.13 L 85,9.9 Z" fill="#c084fc"/>
            <path d="M 93,2.4 L 92.48,2.39 L 91.94,2.35 L 91.39,2.27 L 90.93,2.16 L 90.48,2.04 L 89.96,1.85 L 89.46,1.64 L 89,1.4 L 89,1.4 L 89.29,1.85 L 89.7,2.28 L 90.24,2.64 L 90.77,2.84 L 91.33,2.91 L 91.97,2.84 L 92.53,2.66 L 93,2.4 Z" fill="#c084fc"/>
            <path d="M 94.7,-8.6 L 94.19,-8.81 L 93.69,-8.99 L 93.17,-9.15 L 92.66,-9.26 L 92.13,-9.32 L 91.59,-9.34 L 91.05,-9.33 L 90.5,-9.3 L 90.5,-9.3 L 91,-9.07 L 91.51,-8.87 L 92.02,-8.7 L 92.54,-8.59 L 93.08,-8.53 L 93.61,-8.52 L 94.16,-8.55 L 94.7,-8.6 Z" fill="#c084fc"/>
            <path d="M 89.7,-16.1 L 89.29,-16.46 L 88.79,-16.78 L 88.17,-16.99 L 87.59,-17.05 L 86.95,-16.95 L 86.41,-16.72 L 85.9,-16.38 L 85.5,-16 L 85.5,-16 L 86.02,-16.16 L 86.56,-16.29 L 87.07,-16.36 L 87.61,-16.4 L 88.08,-16.4 L 88.65,-16.34 L 89.19,-16.24 L 89.7,-16.1 Z" fill="#c084fc"/>
            <path d="M 81.1,-21.9 L 80.63,-22.17 L 80.08,-22.36 L 79.44,-22.43 L 78.88,-22.37 L 78.29,-22.13 L 77.82,-21.8 L 77.41,-21.36 L 77.1,-20.9 L 77.1,-20.9 L 77.55,-21.2 L 78.04,-21.48 L 78.51,-21.67 L 79.02,-21.83 L 79.48,-21.93 L 80.03,-21.97 L 80.58,-21.96 L 81.1,-21.9 Z" fill="#c084fc"/>
        </g>
    `;
}

// Générateur des oreilles selon l'espèce (Humain, Elfe, Orc, etc.)
export function getSpeciesEars(species = 'human', skin = { base: '#ffd4a3', shadow: '#f0be8d' }, gender = 'boy') {
    if (species === 'elf' || species === 'shadow') {
        return `
            <!-- NOTE Oreilles descendues de 50 % de leur hauteur (12) et rapprochées de 25 % de leur largeur (2.6) -->
            <g id="${gender}-ears-elf" transform="translate(0 6)">
                <g transform="translate(2.6 0)">
                    <!-- Oreille gauche elfe : même géométrie anatomique que l'orc, effilée et élégante -->
                    <path d="M 24 35 Q 18 31 13.5 31.5 Q 16.5 41 22.5 43.5 Z" fill="${skin.base}"/>
                    <path d="M 23 35.5 Q 18 33 15 33.5 Q 17 39.5 21.5 41.5 Z" fill="${skin.shadow}"/>
                </g>
                <g transform="translate(-2.6 0)">
                    <!-- Oreille droite elfe : même géométrie anatomique que l'orc, effilée et élégante -->
                    <path d="M 76 35 Q 82 31 86.5 31.5 Q 83.5 41 77.5 43.5 Z" fill="${skin.base}"/>
                    <path d="M 77 35.5 Q 82 33 85 33.5 Q 83 39.5 78.5 41.5 Z" fill="${skin.shadow}"/>
                </g>
            </g>
        `;
    }
    if (species === 'orc') {
        return `
            <!-- NOTE Oreilles descendues de 50 % de leur hauteur (11) et rapprochées de 25 % de leur largeur (2.4), anneaux compris -->
            <g id="${gender}-ears-orc" transform="translate(0 5.5)">
                <g transform="translate(2.4 0)">
                    <!-- Oreille gauche orc robuste rapprochée avec anneau doré -->
                    <path d="M 24 35 Q 18 32 14.5 33 Q 17 41 22.5 44 Z" fill="${skin.base}"/>
                    <path d="M 23 36 Q 18 34 16 35 Q 18 40 21.5 42 Z" fill="${skin.shadow}"/>
                    <!-- Anneau d'or oreille gauche : cercle ouvert à 80 %, fuseau, ouverture à cheval sur le rebord (centre 17.10, 40.22, angle -36°) -->
                    <path d="M 18.9,40.22 L 18.85,40.4 L 18.77,40.58 L 18.69,40.74 L 18.59,40.88 L 18.47,41.02 L 18.36,41.13 L 18.23,41.23 L 18.08,41.31 L 17.94,41.38 L 17.8,41.43 L 17.65,41.47 L 17.51,41.49 L 17.38,41.5 L 17.24,41.49 L 17.1,41.47 L 16.97,41.45 L 16.84,41.41 L 16.73,41.36 L 16.63,41.3 L 16.52,41.23 L 16.42,41.16 L 16.33,41.07 L 16.24,40.98 L 16.17,40.89 L 16.11,40.8 L 16.05,40.69 L 16,40.58 L 15.96,40.46 L 15.92,40.33 L 15.9,40.22 L 15.89,40.1 L 15.89,39.97 L 15.91,39.83 L 15.93,39.7 L 15.97,39.56 L 16.02,39.43 L 16.08,39.31 L 16.16,39.18 L 16.26,39.06 L 16.36,38.95 L 16.49,38.84 L 16.62,38.74 L 16.77,38.67 L 16.93,38.6 L 17.1,38.55 L 17.27,38.52 L 17.47,38.5 L 17.66,38.51 L 17.66,38.51 L 17.48,38.42 L 17.29,38.35 L 17.1,38.3 L 16.9,38.27 L 16.68,38.26 L 16.47,38.27 L 16.25,38.32 L 16.03,38.39 L 15.83,38.48 L 15.64,38.58 L 15.45,38.73 L 15.27,38.89 L 15.12,39.08 L 14.98,39.29 L 14.88,39.5 L 14.8,39.71 L 14.73,39.96 L 14.7,40.22 L 14.7,40.48 L 14.73,40.74 L 14.79,40.97 L 14.86,41.2 L 14.98,41.44 L 15.12,41.66 L 15.29,41.86 L 15.48,42.04 L 15.67,42.19 L 15.87,42.31 L 16.11,42.42 L 16.36,42.5 L 16.61,42.55 L 16.87,42.57 L 17.1,42.55 L 17.33,42.52 L 17.57,42.46 L 17.8,42.37 L 18.01,42.25 L 18.21,42.11 L 18.37,41.96 L 18.51,41.8 L 18.65,41.62 L 18.76,41.42 L 18.84,41.22 L 18.9,41.01 L 18.93,40.81 L 18.94,40.62 L 18.93,40.41 L 18.9,40.22 L 18.9,40.22 Z" fill="#fbbf24"/>
                </g>
                <g transform="translate(-2.4 0)">
                    <!-- Oreille droite orc robuste rapprochée avec anneau doré -->
                    <path d="M 76 35 Q 82 32 85.5 33 Q 83 41 77.5 44 Z" fill="${skin.base}"/>
                    <path d="M 77 36 Q 82 34 84 35 Q 82 40 78.5 42 Z" fill="${skin.shadow}"/>
                    <!-- Anneau d'or oreille droite : cercle ouvert à 80 %, fuseau, ouverture à cheval sur le rebord (centre 82.90, 40.22, angle -144°) -->
                    <path d="M 82.34,38.51 L 82.53,38.5 L 82.73,38.52 L 82.9,38.55 L 83.07,38.6 L 83.23,38.67 L 83.38,38.74 L 83.51,38.84 L 83.64,38.95 L 83.74,39.06 L 83.84,39.18 L 83.92,39.31 L 83.98,39.43 L 84.03,39.56 L 84.07,39.7 L 84.09,39.83 L 84.11,39.97 L 84.11,40.1 L 84.1,40.22 L 84.08,40.33 L 84.04,40.46 L 84,40.58 L 83.95,40.69 L 83.89,40.8 L 83.83,40.89 L 83.76,40.98 L 83.67,41.07 L 83.58,41.16 L 83.48,41.23 L 83.37,41.3 L 83.27,41.36 L 83.16,41.41 L 83.03,41.45 L 82.9,41.47 L 82.76,41.49 L 82.62,41.5 L 82.49,41.49 L 82.35,41.47 L 82.2,41.43 L 82.06,41.38 L 81.92,41.31 L 81.77,41.23 L 81.64,41.13 L 81.53,41.02 L 81.41,40.88 L 81.31,40.74 L 81.23,40.58 L 81.15,40.4 L 81.1,40.22 L 81.1,40.22 L 81.07,40.41 L 81.06,40.62 L 81.07,40.81 L 81.1,41.01 L 81.16,41.22 L 81.24,41.42 L 81.35,41.62 L 81.49,41.8 L 81.63,41.96 L 81.79,42.11 L 81.99,42.25 L 82.2,42.37 L 82.43,42.46 L 82.67,42.52 L 82.9,42.55 L 83.13,42.57 L 83.39,42.55 L 83.64,42.5 L 83.89,42.42 L 84.13,42.31 L 84.33,42.19 L 84.52,42.04 L 84.71,41.86 L 84.88,41.66 L 85.02,41.44 L 85.14,41.2 L 85.21,40.97 L 85.27,40.74 L 85.3,40.48 L 85.3,40.22 L 85.27,39.96 L 85.2,39.71 L 85.12,39.5 L 85.02,39.29 L 84.88,39.08 L 84.73,38.89 L 84.55,38.73 L 84.36,38.58 L 84.17,38.48 L 83.97,38.39 L 83.75,38.32 L 83.53,38.27 L 83.32,38.26 L 83.1,38.27 L 82.9,38.3 L 82.71,38.35 L 82.52,38.42 L 82.34,38.51 L 82.34,38.51 Z" fill="#fbbf24"/>
                </g>
            </g>
        `;
    }
    // NOTE Le chat n'a pas d'oreilles sur les côtés : ses oreilles sont sur le crâne (getCatEars)
    if (species === 'cat') return '';
    // Oreilles humaines par défaut
    return `
        <!-- NOTE Oreilles descendues de 50 % de leur hauteur (9.6) et rapprochées de 25 % de leur largeur (x 21 -> 23.4) -->
        <g id="${gender}-ears-full" transform="translate(0 4.8)">
            <circle cx="23.4" cy="38" r="4.8" fill="${skin.base}"/>
            <circle cx="23.4" cy="38" r="2.8" fill="${skin.shadow}"/>
            <circle cx="76.6" cy="38" r="4.8" fill="${skin.base}"/>
            <circle cx="76.6" cy="38" r="2.8" fill="${skin.shadow}"/>
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
            <path d="M 37.4,84.75 L 38.88,85.62 L 40.39,86.43 L 41.93,87.16 L 43.5,87.79 L 45.09,88.3 L 46.72,88.68 L 48.35,88.91 L 50,88.99 L 51.65,88.91 L 53.28,88.68 L 54.91,88.3 L 56.5,87.79 L 58.07,87.16 L 59.61,86.43 L 61.12,85.62 L 62.6,84.75 L 62.6,84.75 L 60.93,84.45 L 59.29,84.12 L 57.68,83.8 L 56.1,83.51 L 54.54,83.26 L 53.02,83.07 L 51.5,82.95 L 50,82.91 L 48.5,82.95 L 46.98,83.07 L 45.46,83.26 L 43.9,83.51 L 42.32,83.8 L 40.71,84.12 L 39.07,84.45 L 37.4,84.75 L 37.4,84.75 Z" fill="#1f2937"/>
            <g transform="translate(0 1.2)"><rect x="46" y="81.5" width="8" height="6.5" rx="1.5" fill="#ffb733" stroke="#1f2937" stroke-width="0.8"/></g>
            <g transform="translate(0 0.16)"><rect x="36" y="82.5" width="4.5" height="7" rx="1.2" fill="#489e96" stroke="#1b4d49" stroke-width="0.8"/></g>
            <g transform="translate(0 0.15)"><circle cx="38.2" cy="86" r="0.7" fill="#ffb733"/></g>
        </g>`,
    arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
        <g id="boy-arms">
            <path d="M32 64 C24 71, 23 78, 29 84 C32 84, 34 81, 35 77 Z" fill="#489e96"/>
            <ellipse cx="29" cy="84" rx="3.8" ry="3.5" fill="${skin.base}"/>
            <!-- NOTE Séparations des doigts en fuseau -->
            <path d="M 28,84.3 L 27.81,84.61 L 27.65,84.94 L 27.53,85.28 L 27.48,85.63 L 27.48,85.98 L 27.55,86.33 L 27.66,86.67 L 27.8,87 L 27.8,87 L 27.91,86.66 L 28,86.33 L 28.08,86 L 28.12,85.67 L 28.13,85.35 L 28.1,85.01 L 28.05,84.66 L 28,84.3 L 28,84.3 Z M 30,84.3 L 29.95,84.66 L 29.9,85.01 L 29.87,85.35 L 29.88,85.67 L 29.92,86 L 30,86.33 L 30.09,86.66 L 30.2,87 L 30.2,87 L 30.34,86.67 L 30.45,86.33 L 30.52,85.98 L 30.52,85.63 L 30.47,85.28 L 30.35,84.94 L 30.19,84.61 L 30,84.3 L 30,84.3 Z" fill="${skin.shadow}"/>
            <path d="M68 64 C76 69, 78 72, 76 79 C73 81, 70 79, 66 75 Z" fill="#489e96"/>
            <ellipse cx="77" cy="79" rx="3.8" ry="3.5" fill="${skin.base}"/>
            <!-- NOTE Séparations des doigts en fuseau -->
            <path d="M 76,79.3 L 75.81,79.61 L 75.65,79.94 L 75.53,80.28 L 75.48,80.63 L 75.48,80.98 L 75.55,81.33 L 75.66,81.67 L 75.8,82 L 75.8,82 L 75.91,81.66 L 76,81.33 L 76.08,81 L 76.12,80.67 L 76.13,80.35 L 76.1,80.01 L 76.05,79.66 L 76,79.3 L 76,79.3 Z M 78,79.3 L 77.95,79.66 L 77.9,80.01 L 77.87,80.35 L 77.88,80.67 L 77.92,81 L 78,81.33 L 78.09,81.66 L 78.2,82 L 78.2,82 L 78.34,81.67 L 78.45,81.33 L 78.52,80.98 L 78.52,80.63 L 78.47,80.28 L 78.35,79.94 L 78.19,79.61 L 78,79.3 L 78,79.3 Z" fill="${skin.shadow}"/>
        </g>`,
    headBase: (withBand = true, skin = { base: '#ffd4a3', shadow: '#f0be8d' }, species = 'human', showCollar = species === 'human') => `
        <g id="boy-head-base-full">
            <rect x="46" y="58" width="8" height="4" fill="${skin.base}"/>
            ${showCollar ? '<path d="M42 60 L50 62 L58 60 Z" fill="#ff9d00"/>' : ''}
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
            ${species === 'cat' ? '<ellipse cx="37.5" cy="41.8" rx="0.85" ry="3.3" fill="#241103"/>' : '<circle cx="37.5" cy="41.5" r="2.2" fill="#241103"/>'}
            <circle cx="35.5" cy="39" r="1.8" fill="#ffffff"/>
            <circle cx="39.5" cy="43.5" r="0.9" fill="#ffffff"/>

            <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
            <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="${skin.shadow}" stroke-width="0.8"/>
            <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="${eye.dark}"/>
            <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="${eye.light}"/>
            ${species === 'cat' ? '<ellipse cx="62.5" cy="41.8" rx="0.85" ry="3.3" fill="#241103"/>' : '<circle cx="62.5" cy="41.5" r="2.2" fill="#241103"/>'}
            <circle cx="60.5" cy="39" r="1.8" fill="#ffffff"/>
            <circle cx="64.5" cy="43.5" r="0.9" fill="#ffffff"/>

            <!-- Paupières garçon : trait supérieur épuré sans cil saillant, teinte cheveux en mode produit -->
            <g id="boy-eyelashes" style="mix-blend-mode: multiply;">
                <path d="M30 38 Q37 34 44 38" fill="none" stroke="${hairColor}" stroke-width="2.2" stroke-linecap="round"/>
                <path d="M56 38 Q63 34 70 38" fill="none" stroke="${hairColor}" stroke-width="2.2" stroke-linecap="round"/>
            </g>

            ${species === 'cat' ? '<path d="M 48.3,46.8 L 51.7,46.8 Q 50,49 50,49 Q 50,49 48.3,46.8 Z" fill="#f472b6"/>' : '<polygon points="48.6,47.2 51.4,47.2 50,47.9" fill="${skin.shadow}" stroke="${skin.shadow}" stroke-width="0.7" stroke-linejoin="round"/>'}

            ${species === 'orc' ? `
            <!-- Peintures de guerre rouges tribales sous les yeux -->
            <polygon points="29,45 38,47 37,49 28,47" fill="#b91c1c" opacity="0.85"/>
            <polygon points="71,45 62,47 63,49 72,47" fill="#b91c1c" opacity="0.85"/>
            <!-- Bouche orc droite et plus large basée sur la couleur de peau mais beaucoup plus foncée -->
            <!-- NOTE Trait à largeur variable profil sablier, généré depuis la droite 41,52 vers 59,52 -->
            <path d="M 41,53.1 L 42.5,52.89 L 44,52.7 L 45.5,52.52 L 47,52.37 L 48.5,52.24 L 50,52.17 L 51.5,52.24 L 53,52.37 L 54.5,52.52 L 56,52.7 L 57.5,52.89 L 59,53.1 Q 60.54,52 59,50.9 L 57.5,51.11 L 56,51.3 L 54.5,51.48 L 53,51.63 L 51.5,51.76 L 50,51.84 L 48.5,51.76 L 47,51.63 L 45.5,51.48 L 44,51.3 L 42.5,51.11 L 41,50.9 Q 39.46,52 41,53.1 Z" fill="${mouthColor}"/>
            <path d="M 40.5,53.5 L 41.5,52 L 58.5,52 L 59.5,53.5" stroke="${mouthColor}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
            <!-- Crocs inférieurs orc : écartés aux canines, légèrement plus petits et avec pointes arrondies SANS contour -->
            <path d="M 42.2,52.5 C 42.2,49.5 42.8,48 43.6,48 C 44.4,48 45.0,49.5 45.0,52.5 Z" fill="#fffbeb"/>
            <ellipse cx="43.2" cy="50" rx="0.4" ry="1.2" fill="#ffffff" opacity="0.8"/>
            <path d="M 55.0,52.5 C 55.0,49.5 55.6,48 56.4,48 C 57.2,48 57.8,49.5 57.8,52.5 Z" fill="#fffbeb"/>
            <ellipse cx="56.8" cy="50" rx="0.4" ry="1.2" fill="#ffffff" opacity="0.8"/>` : species === 'cat' ? `
            <!-- Bouche de chat en ω : petit croc ivoire arrondi façon orc (sans contour, pointe vers le bas) sur le côté droit, glissé derrière la lèvre, puis deux arcs fuseau de la couleur de bouche -->
            <path d="M 53.35,52.2 C 53.35,53.5 53.65,54.1 54.05,54.1 C 54.45,54.1 54.75,53.5 54.75,52.2 Z" fill="#fffbeb"/><ellipse cx="53.85" cy="53" rx="0.18" ry="0.5" fill="#ffffff" opacity="0.8"/>
            <path d="M 45,51.2 L 45.24,51.8 L 45.61,52.41 L 46.05,52.91 L 46.67,53.31 L 47.37,53.49 L 48.19,53.4 L 48.83,53.07 L 49.37,52.55 L 49.75,51.97 L 50,51.4 L 50,51.4 L 49.47,51.69 L 48.91,51.95 L 48.36,52.13 L 47.91,52.2 L 47.47,52.2 L 47.08,52.14 L 46.61,52.02 L 46.11,51.83 L 45.54,51.53 L 45,51.2 L 45,51.2 Z M 50,51.4 L 50.25,51.97 L 50.63,52.55 L 51.17,53.07 L 51.81,53.4 L 52.63,53.49 L 53.33,53.31 L 53.95,52.91 L 54.39,52.41 L 54.76,51.8 L 55,51.2 L 55,51.2 L 54.46,51.53 L 53.89,51.83 L 53.39,52.02 L 52.92,52.14 L 52.53,52.2 L 52.09,52.2 L 51.64,52.13 L 51.09,51.95 L 50.53,51.69 L 50,51.4 L 50,51.4 Z" fill="${mouthColor}"/>` : `
            <!-- Bouche souriante basée sur la couleur de peau mais beaucoup plus foncée -->
            <!-- NOTE Trait à largeur variable profil sablier (épais aux commissures, étranglé au centre), généré depuis Q 45,51 50,56.5 55,51 -->
            <path d="M 44.33,51.61 L 45.34,52.38 L 46.33,52.99 L 47.3,53.43 L 48.23,53.73 L 49.13,53.87 L 50,53.89 L 50.87,53.87 L 51.77,53.73 L 52.7,53.43 L 53.67,52.99 L 54.66,52.38 L 55.67,51.61 Q 55.85,50.07 54.33,50.39 L 53.67,51.3 L 53,52.07 L 52.3,52.69 L 51.56,53.16 L 50.8,53.48 L 50,53.62 L 49.2,53.48 L 48.44,53.16 L 47.7,52.69 L 47,52.07 L 46.33,51.3 L 45.67,50.39 Q 44.15,50.07 44.33,51.61 Z" fill="${mouthColor}"/>`}
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
            <path d="M 40,83 L 39.68,83.86 L 39.24,84.67 L 38.74,85.59 L 38.32,86.35 L 37.93,87.2 L 37.58,88.14 L 37.3,89.16 L 37.14,90.07 L 37.04,91.02 L 37,92 L 37,92 L 37.46,91.14 L 37.92,90.33 L 38.36,89.55 L 38.82,88.63 L 39.22,87.74 L 39.55,86.87 L 39.79,86.01 L 40.02,84.94 L 40.1,83.95 L 40,83 L 40,83 Z" fill="#133835"/>
            <path d="M 50,83.5 L 49.78,84.44 L 49.59,85.53 L 49.43,86.47 L 49.33,87.56 L 49.3,88.5 L 49.33,89.44 L 49.43,90.53 L 49.59,91.47 L 49.78,92.56 L 50,93.5 L 50,93.5 L 50.22,92.56 L 50.41,91.47 L 50.57,90.53 L 50.67,89.44 L 50.7,88.5 L 50.67,87.56 L 50.57,86.47 L 50.41,85.53 L 50.22,84.44 L 50,83.5 L 50,83.5 Z" fill="#133835"/>
            <path d="M 60,83 L 59.9,83.95 L 59.98,84.94 L 60.21,86.01 L 60.45,86.87 L 60.78,87.74 L 61.18,88.63 L 61.64,89.55 L 62.08,90.33 L 62.54,91.14 L 63,92 L 63,92 L 62.96,91.02 L 62.86,90.07 L 62.7,89.16 L 62.42,88.14 L 62.07,87.2 L 61.68,86.35 L 61.26,85.59 L 60.76,84.67 L 60.32,83.86 L 60,83 L 60,83 Z" fill="#133835"/>
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
            <path d="M 36.65,82.5 L 38.24,83.3 L 39.85,84.05 L 41.49,84.72 L 43.15,85.3 L 44.84,85.77 L 46.55,86.12 L 48.27,86.33 L 50,86.4 L 51.73,86.33 L 53.45,86.12 L 55.16,85.77 L 56.85,85.3 L 58.51,84.72 L 60.15,84.05 L 61.76,83.3 L 63.35,82.5 L 63.35,82.5 L 61.6,82.26 L 59.87,82 L 58.18,81.74 L 56.5,81.5 L 54.86,81.29 L 53.23,81.13 L 51.61,81.03 L 50,81 L 48.39,81.03 L 46.77,81.13 L 45.14,81.29 L 43.5,81.5 L 41.82,81.74 L 40.13,82 L 38.4,82.26 L 36.65,82.5 L 36.65,82.5 Z" fill="#1f2937"/>
            <g transform="translate(0 1.2)"><rect x="47" y="79.5" width="6" height="6" rx="1.2" fill="#ffb733" stroke="#1f2937" stroke-width="0.8"/></g>
            <g transform="translate(0 0.49)"><rect x="58.5" y="80.5" width="3.5" height="5.5" rx="1.2" fill="#489e96" stroke="#1b4d49" stroke-width="0.8"/></g>
            <g transform="translate(0 0.5)"><circle cx="60.2" cy="83.2" r="0.7" fill="#ffffff"/></g>
        </g>`,
    arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
        <g id="girl-arms">
            <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="#ff9d00"/>
            <ellipse cx="27" cy="81.5" rx="3.6" ry="3.3" fill="${skin.base}"/>
            <!-- NOTE Séparations des doigts en fuseau -->
            <path d="M 26,81.8 L 25.81,82.09 L 25.65,82.39 L 25.53,82.7 L 25.48,83.02 L 25.48,83.35 L 25.55,83.67 L 25.66,83.99 L 25.8,84.3 L 25.8,84.3 L 25.91,83.98 L 26,83.67 L 26.08,83.37 L 26.12,83.08 L 26.13,82.77 L 26.1,82.46 L 26.05,82.14 L 26,81.8 L 26,81.8 Z M 28,81.8 L 27.95,82.14 L 27.9,82.46 L 27.87,82.77 L 27.88,83.08 L 27.92,83.37 L 28,83.67 L 28.09,83.98 L 28.2,84.3 L 28.2,84.3 L 28.34,83.99 L 28.45,83.67 L 28.52,83.35 L 28.52,83.02 L 28.47,82.7 L 28.35,82.39 L 28.19,82.09 L 28,81.8 L 28,81.8 Z" fill="${skin.shadow}"/>
            <path d="M67 63 C74 66.5, 76 70.5, 75 75.5 C72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="#ff9d00"/>
            <ellipse cx="76" cy="75.5" rx="3.6" ry="3.3" fill="${skin.base}"/>
            <!-- NOTE Séparations des doigts en fuseau -->
            <path d="M 75,75.8 L 74.81,76.09 L 74.65,76.39 L 74.53,76.7 L 74.48,77.02 L 74.48,77.35 L 74.55,77.67 L 74.66,77.99 L 74.8,78.3 L 74.8,78.3 L 74.91,77.98 L 75,77.67 L 75.08,77.37 L 75.12,77.08 L 75.13,76.77 L 75.1,76.46 L 75.05,76.14 L 75,75.8 L 75,75.8 Z M 77,75.8 L 76.95,76.14 L 76.9,76.46 L 76.87,76.77 L 76.88,77.08 L 76.92,77.37 L 77,77.67 L 77.09,77.98 L 77.2,78.3 L 77.2,78.3 L 77.34,77.99 L 77.45,77.67 L 77.52,77.35 L 77.52,77.02 L 77.47,76.7 L 77.35,76.39 L 77.19,76.09 L 77,75.8 L 77,75.8 Z" fill="${skin.shadow}"/>
        </g>`,
    headBase: (withTiara = false, skin = { base: '#ffd4a3', shadow: '#f0be8d' }, species = 'human') => `
        <g id="girl-head-base-full">
            <rect x="46" y="58" width="8" height="4" fill="${skin.base}"/>
            ${getSpeciesEars(species, skin, 'girl')}
            <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="${skin.base}"/>
            ${withTiara ? `
            <path d="M 21.5,25 L 24.71,24.01 L 28.53,23.3 L 31.99,22.99 L 35.71,22.78 L 39.64,22.66 L 42.7,22.67 L 46.85,22.64 L 50,22.65 L 53.15,22.64 L 57.3,22.67 L 60.36,22.66 L 64.29,22.78 L 68.01,22.99 L 71.47,23.3 L 75.29,24.01 L 78.5,25 L 78.5,25 L 75.72,22.96 L 72.07,21.16 L 68.66,19.83 L 64.89,18.73 L 60.84,17.86 L 57.67,17.33 L 53.31,16.95 L 50,16.85 L 46.69,16.95 L 42.33,17.33 L 39.16,17.86 L 35.11,18.73 L 31.34,19.83 L 27.93,21.16 L 24.28,22.96 L 21.5,25 L 21.5,25 Z" fill="#489e96"/>
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
            ${species === 'cat' ? '<ellipse cx="37.5" cy="41.8" rx="0.85" ry="3.3" fill="#241103"/>' : '<circle cx="37.5" cy="41.5" r="2.2" fill="#241103"/>'}
            <circle cx="35.5" cy="39" r="1.8" fill="#ffffff"/>
            <circle cx="39.5" cy="43.5" r="1" fill="#ffffff"/>

            <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
            <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="${skin.shadow}" stroke-width="0.8"/>
            <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="${eye.dark}"/>
            <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="${eye.light}"/>
            ${species === 'cat' ? '<ellipse cx="62.5" cy="41.8" rx="0.85" ry="3.3" fill="#241103"/>' : '<circle cx="62.5" cy="41.5" r="2.2" fill="#241103"/>'}
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

            ${species === 'cat' ? '<path d="M 48.3,46.8 L 51.7,46.8 Q 50,49 50,49 Q 50,49 48.3,46.8 Z" fill="#f472b6"/>' : '<polygon points="48.6,47.2 51.4,47.2 50,47.9" fill="${skin.shadow}" stroke="${skin.shadow}" stroke-width="0.7" stroke-linejoin="round"/>'}

            ${species === 'orc' ? `
            <!-- Peintures de guerre rouges tribales sous les yeux -->
            <polygon points="29,45 38,47 37,49 28,47" fill="#b91c1c" opacity="0.85"/>
            <polygon points="71,45 62,47 63,49 72,47" fill="#b91c1c" opacity="0.85"/>
            <!-- Bouche orc droite et plus large basée sur la couleur de peau mais beaucoup plus foncée -->
            <!-- NOTE Trait à largeur variable profil sablier, généré depuis la droite 41,52 vers 59,52 -->
            <path d="M 41,53.1 L 42.5,52.89 L 44,52.7 L 45.5,52.52 L 47,52.37 L 48.5,52.24 L 50,52.17 L 51.5,52.24 L 53,52.37 L 54.5,52.52 L 56,52.7 L 57.5,52.89 L 59,53.1 Q 60.54,52 59,50.9 L 57.5,51.11 L 56,51.3 L 54.5,51.48 L 53,51.63 L 51.5,51.76 L 50,51.84 L 48.5,51.76 L 47,51.63 L 45.5,51.48 L 44,51.3 L 42.5,51.11 L 41,50.9 Q 39.46,52 41,53.1 Z" fill="${mouthColor}"/>
            <path d="M 40.5,53.5 L 41.5,52 L 58.5,52 L 59.5,53.5" stroke="${mouthColor}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
            <!-- Crocs inférieurs orc : écartés aux canines, légèrement plus petits et avec pointes arrondies SANS contour -->
            <path d="M 42.2,52.5 C 42.2,49.5 42.8,48 43.6,48 C 44.4,48 45.0,49.5 45.0,52.5 Z" fill="#fffbeb"/>
            <ellipse cx="43.2" cy="50" rx="0.4" ry="1.2" fill="#ffffff" opacity="0.8"/>
            <path d="M 55.0,52.5 C 55.0,49.5 55.6,48 56.4,48 C 57.2,48 57.8,49.5 57.8,52.5 Z" fill="#fffbeb"/>
            <ellipse cx="56.8" cy="50" rx="0.4" ry="1.2" fill="#ffffff" opacity="0.8"/>` : species === 'cat' ? `
            <!-- Bouche de chat en ω : petit croc ivoire arrondi façon orc (sans contour, pointe vers le bas) sur le côté droit, glissé derrière la lèvre, puis deux arcs fuseau de la couleur de bouche -->
            <path d="M 53.35,52.2 C 53.35,53.5 53.65,54.1 54.05,54.1 C 54.45,54.1 54.75,53.5 54.75,52.2 Z" fill="#fffbeb"/><ellipse cx="53.85" cy="53" rx="0.18" ry="0.5" fill="#ffffff" opacity="0.8"/>
            <path d="M 45,51.2 L 45.24,51.8 L 45.61,52.41 L 46.05,52.91 L 46.67,53.31 L 47.37,53.49 L 48.19,53.4 L 48.83,53.07 L 49.37,52.55 L 49.75,51.97 L 50,51.4 L 50,51.4 L 49.47,51.69 L 48.91,51.95 L 48.36,52.13 L 47.91,52.2 L 47.47,52.2 L 47.08,52.14 L 46.61,52.02 L 46.11,51.83 L 45.54,51.53 L 45,51.2 L 45,51.2 Z M 50,51.4 L 50.25,51.97 L 50.63,52.55 L 51.17,53.07 L 51.81,53.4 L 52.63,53.49 L 53.33,53.31 L 53.95,52.91 L 54.39,52.41 L 54.76,51.8 L 55,51.2 L 55,51.2 L 54.46,51.53 L 53.89,51.83 L 53.39,52.02 L 52.92,52.14 L 52.53,52.2 L 52.09,52.2 L 51.64,52.13 L 51.09,51.95 L 50.53,51.69 L 50,51.4 L 50,51.4 Z" fill="${mouthColor}"/>` : `
            <!-- Bouche souriante basée sur la couleur de peau mais beaucoup plus foncée -->
            <!-- NOTE Trait à largeur variable profil sablier (épais aux commissures, étranglé au centre), généré depuis Q 45,51 50,56.5 55,51 -->
            <path d="M 44.33,51.61 L 45.34,52.38 L 46.33,52.99 L 47.3,53.43 L 48.23,53.73 L 49.13,53.87 L 50,53.89 L 50.87,53.87 L 51.77,53.73 L 52.7,53.43 L 53.67,52.99 L 54.66,52.38 L 55.67,51.61 Q 55.85,50.07 54.33,50.39 L 53.67,51.3 L 53,52.07 L 52.3,52.69 L 51.56,53.16 L 50.8,53.48 L 50,53.62 L 49.2,53.48 L 48.44,53.16 L 47.7,52.69 L 47,52.07 L 46.33,51.3 L 45.67,50.39 Q 44.15,50.07 44.33,51.61 Z" fill="${mouthColor}"/>`}
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
                <path d="M 41,87 L 41.19,88.91 L 41.4,90.82 L 41.67,92.72 L 42.01,94.6 L 42.42,96.47 L 42.9,98.32 L 43.44,100.16 L 44,102 L 44,102 L 43.81,100.09 L 43.6,98.18 L 43.33,96.28 L 42.99,94.4 L 42.58,92.53 L 42.1,90.68 L 41.56,88.84 L 41,87 L 41,87 Z" fill="#09090b"/>
                <!-- Bandages mollet gauche -->
                <rect x="40" y="103" width="8" height="3" fill="#3f3f46"/>
                <line x1="40" y1="104.5" x2="48" y2="104.5" stroke="#71717a" stroke-width="0.8"/>
                <!-- Pied / Tabi noir gauche -->
                <path d="M39.5 106 C39.5 104, 48.5 104, 48.5 106 L49 113.5 C49 115, 38.5 115, 38.5 113.5 Z" fill="#09090b"/>
                <line x1="44" y1="106" x2="44" y2="114" stroke="#27272a" stroke-width="0.8"/>
                
                <!-- Jambe droite losange bouffant -->
                <polygon points="51,85 62,85 69,94 60,103 52,103 48,94" fill="#18181b"/>
                <polygon points="53,87 62,87 66,94 59,102 54,102 51,94" fill="#27272a"/>
                <path d="M 59,87 L 58.44,88.84 L 57.9,90.68 L 57.42,92.53 L 57.01,94.4 L 56.67,96.28 L 56.4,98.18 L 56.19,100.09 L 56,102 L 56,102 L 56.56,100.16 L 57.1,98.32 L 57.58,96.47 L 57.99,94.6 L 58.33,92.72 L 58.6,90.82 L 58.81,88.91 L 59,87 L 59,87 Z" fill="#09090b"/>
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
                <path d="M 36.25,84 L 37.87,84.93 L 39.52,85.81 L 41.2,86.6 L 42.92,87.28 L 44.66,87.83 L 46.43,88.24 L 48.21,88.49 L 50,88.58 L 51.79,88.49 L 53.57,88.24 L 55.34,87.83 L 57.08,87.28 L 58.8,86.6 L 60.48,85.81 L 62.13,84.93 L 63.75,84 L 63.75,84 L 61.93,83.63 L 60.14,83.24 L 58.39,82.87 L 56.67,82.52 L 54.97,82.23 L 53.3,82.01 L 51.65,81.87 L 50,81.83 L 48.35,81.87 L 46.7,82.01 L 45.03,82.23 L 43.33,82.52 L 41.61,82.87 L 39.86,83.24 L 38.07,83.63 L 36.25,84 L 36.25,84 Z" fill="#18181b"/>
                <path d="M 36.25,84 L 37.93,84.51 L 39.63,84.98 L 41.33,85.39 L 43.05,85.75 L 44.78,86.03 L 46.51,86.23 L 48.26,86.36 L 50,86.4 L 51.74,86.36 L 53.49,86.23 L 55.22,86.03 L 56.95,85.75 L 58.67,85.39 L 60.37,84.98 L 62.07,84.51 L 63.75,84 L 63.75,84 L 62,84.05 L 60.25,84.07 L 58.52,84.07 L 56.8,84.05 L 55.09,84.04 L 53.39,84.02 L 51.69,84 L 50,84 L 48.31,84 L 46.61,84.02 L 44.91,84.04 L 43.2,84.05 L 41.48,84.07 L 39.75,84.07 L 38,84.05 L 36.25,84 L 36.25,84 Z" fill="#b91c1c"/>
                <g transform="translate(0 1.2)"><circle cx="50" cy="84" r="1.8" fill="#fbbf24"/></g>
                <!-- Pan de tissu flottant noir et rouge -->
                <g transform="translate(0 0.29)"><path d="M 39,84 L 35,98 L 39,96 L 41,84 Z" fill="#b91c1c"/></g>
                <g transform="translate(0 0.5)"><path d="M 40,84 L 37,97 L 40,95 L 42,84 Z" fill="#09090b"/></g>
            </g>`,
        arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="boy-arms-ninja">
                <!-- Bras shinobi avec protège-bras renforcés -->
                <path d="M32 64 C23 71, 22 79, 28 85 C31 85, 33 81, 35 77 Z" fill="#09090b"/>
                <rect x="25" y="73" width="7" height="8" rx="1" fill="#27272a" stroke="#09090b" stroke-width="0.6" transform="rotate(-15 28 77)"/>
                <ellipse cx="28" cy="85" rx="3.8" ry="3.5" fill="${skin.base}"/>
                <!-- NOTE Séparations des doigts en fuseau -->
                <path d="M 27,85.3 L 26.81,85.61 L 26.65,85.94 L 26.53,86.28 L 26.48,86.63 L 26.48,86.98 L 26.55,87.33 L 26.66,87.67 L 26.8,88 L 26.8,88 L 26.91,87.66 L 27,87.33 L 27.08,87 L 27.12,86.67 L 27.13,86.35 L 27.1,86.01 L 27.05,85.66 L 27,85.3 L 27,85.3 Z M 29,85.3 L 28.95,85.66 L 28.9,86.01 L 28.87,86.35 L 28.88,86.67 L 28.92,87 L 29,87.33 L 29.09,87.66 L 29.2,88 L 29.2,88 L 29.34,87.67 L 29.45,87.33 L 29.52,86.98 L 29.52,86.63 L 29.47,86.28 L 29.35,85.94 L 29.19,85.61 L 29,85.3 L 29,85.3 Z" fill="${skin.shadow}"/>
                <path d="M68 64 C77 69, 78 74, 76 81 C73 83, 70 80, 66 76 Z" fill="#09090b"/>
                <rect x="68" y="70" width="7" height="8" rx="1" fill="#27272a" stroke="#09090b" stroke-width="0.6" transform="rotate(15 71 74)"/>
                <!-- NOTE Main droite dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
            </g>`,
        headAccessory: "",
        handItem: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="boy-hand-ninjato">
                <!-- Ninjato modélisé sur l'axe X=0, poignée centrée sur la main droite (75.4, 81) -->
                <g id="boy-ninjato" transform="translate(75.4, 81) rotate(16.7)">
                    <!-- Lame droite en acier miroir et pointe biseautée -->
                    <rect x="-1.1" y="-48.5" width="2.2" height="39" fill="#cbd5e1"/>
                    <rect x="-0.2" y="-48.5" width="1" height="39" fill="#ffffff"/>
                    <polygon points="-1.1,-48.5 1.1,-48.5 0,-51.8" fill="#ffffff"/>
                    <!-- Tsuba carrée dorée -->
                    <rect x="-2.8" y="-9.6" width="5.6" height="2.2" rx="0.5" fill="#fbbf24" stroke="#78350f" stroke-width="0.5"/>
                    <!-- Poignée tressée sombre et pommeau doré -->
                    <rect x="-1.4" y="-7.4" width="2.8" height="11.6" rx="1.4" fill="#09090b"/>
                    <circle cx="0" cy="4.9" r="1.8" fill="#fbbf24" stroke="#78350f" stroke-width="0.5"/>
                    <!-- Main refermée sur la poignée (origine du groupe) -->
                    <ellipse cx="0" cy="0" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                    <path d="M -1.6,-1 L -1.28,-0.88 L -0.95,-0.77 L -0.62,-0.7 L -0.3,-0.67 L 0.03,-0.7 L 0.35,-0.77 L 0.68,-0.88 L 1,-1 L 1,-1 L 0.68,-1.12 L 0.35,-1.23 L 0.03,-1.3 L -0.3,-1.32 L -0.62,-1.3 L -0.95,-1.23 L -1.28,-1.12 L -1.6,-1 L -1.6,-1 Z M -1.6,1 L -1.28,1.12 L -0.95,1.23 L -0.62,1.3 L -0.3,1.33 L 0.03,1.3 L 0.35,1.23 L 0.68,1.12 L 1,1 L 1,1 L 0.68,0.88 L 0.35,0.77 L 0.03,0.7 L -0.3,0.68 L -0.62,0.7 L -0.95,0.77 L -1.28,0.88 L -1.6,1 L -1.6,1 Z" fill="${skin.shadow}"/>
                </g>
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
                <path d="M 50,77.5 L 49.69,78.44 L 49.43,79.38 L 49.26,80.31 L 49.2,81.25 L 49.26,82.19 L 49.43,83.13 L 49.69,84.06 L 50,85 L 50,85 L 50.31,84.06 L 50.57,83.13 L 50.74,82.19 L 50.8,81.25 L 50.74,80.31 L 50.57,79.38 L 50.31,78.44 L 50,77.5 L 50,77.5 Z" fill="#fbbf24"/>
            </g>`,
        belt: `
            <g id="boy-belt-mage">
                <path d="M 35.95,84.75 L 37.62,85.62 L 39.31,86.43 L 41.04,87.16 L 42.79,87.79 L 44.57,88.3 L 46.37,88.68 L 48.18,88.91 L 50,88.99 L 51.82,88.91 L 53.63,88.68 L 55.43,88.3 L 57.21,87.79 L 58.96,87.16 L 60.69,86.43 L 62.38,85.62 L 64.05,84.75 L 64.05,84.75 L 62.21,84.44 L 60.39,84.12 L 58.6,83.8 L 56.84,83.51 L 55.11,83.26 L 53.39,83.07 L 51.69,82.95 L 50,82.91 L 48.31,82.95 L 46.61,83.07 L 44.89,83.26 L 43.16,83.51 L 41.4,83.8 L 39.61,84.12 L 37.79,84.44 L 35.95,84.75 L 35.95,84.75 Z" fill="#fbbf24"/>
                <g transform="translate(0 1.2)"><circle cx="50" cy="84.8" r="2.5" fill="#818cf8" stroke="#ffffff" stroke-width="0.6"/></g>
                <g transform="translate(0 0.53)"><rect x="58" y="83" width="5" height="6.5" rx="1.2" fill="#2e1065" stroke="#fbbf24" stroke-width="0.8"/></g>
            </g>`,
        arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="boy-arms-mage">
                <path d="M32 64 C23 71, 20 78, 25 84 C28 84, 32 80, 35 77 Z" fill="#4c1d95"/>
                <path d="M22 82 L26 84 L27 82 Z" fill="#fbbf24"/>
                <!-- NOTE Main gauche dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
                <path d="M68 64 C77 69, 80 75, 78 81 C75 83, 72 80, 66 76 Z" fill="#4c1d95"/>
                <path d="M75 79 L79 81 L80 79 Z" fill="#fbbf24"/>
                <ellipse cx="77" cy="80" rx="3.8" ry="3.5" fill="${skin.base}"/>
                <!-- NOTE Séparations des doigts en fuseau -->
                <path d="M 76,80.3 L 75.81,80.61 L 75.65,80.94 L 75.53,81.28 L 75.48,81.63 L 75.48,81.98 L 75.55,82.33 L 75.66,82.67 L 75.8,83 L 75.8,83 L 75.91,82.66 L 76,82.33 L 76.08,82 L 76.12,81.67 L 76.13,81.35 L 76.1,81.01 L 76.05,80.66 L 76,80.3 L 76,80.3 Z M 78,80.3 L 77.95,80.66 L 77.9,81.01 L 77.87,81.35 L 77.88,81.67 L 77.92,82 L 78,82.33 L 78.09,82.66 L 78.2,83 L 78.2,83 L 78.34,82.67 L 78.45,82.33 L 78.52,81.98 L 78.52,81.63 L 78.47,81.28 L 78.35,80.94 L 78.19,80.61 L 78,80.3 L 78,80.3 Z" fill="${skin.shadow}"/>
            </g>`,
        headAccessory: `
            <g id="boy-head-mage">
                <!-- Bandeau magique orné d'un cristal azur -->
                <path d="M 21.5,25 L 24.71,24.01 L 28.53,23.3 L 31.99,22.99 L 35.71,22.78 L 39.64,22.66 L 42.7,22.67 L 46.85,22.64 L 50,22.65 L 53.15,22.64 L 57.3,22.67 L 60.36,22.66 L 64.29,22.78 L 68.01,22.99 L 71.47,23.3 L 75.29,24.01 L 78.5,25 L 78.5,25 L 75.72,22.96 L 72.07,21.16 L 68.66,19.83 L 64.89,18.73 L 60.84,17.86 L 57.67,17.33 L 53.31,16.95 L 50,16.85 L 46.69,16.95 L 42.33,17.33 L 39.16,17.86 L 35.11,18.73 L 31.34,19.83 L 27.93,21.16 L 24.28,22.96 L 21.5,25 L 21.5,25 Z" fill="#fbbf24"/>
                <circle cx="50" cy="20" r="4" fill="#38bdf8" stroke="#ffffff" stroke-width="1"/>
                <circle cx="49" cy="19" r="1.3" fill="#ffffff"/>
            </g>`,
        handItem: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="boy-hand-staff">
                <!-- Sceptre magique modélisé sur l'axe X=0, hampe centrée sur la main gauche (27.4, 84) -->
                <g id="boy-mage-staff" transform="translate(27.4, 84) rotate(-1.66)">
                    <rect x="-1.25" y="-48" width="2.5" height="69" rx="1.25" fill="#d97706"/>
                    <circle cx="0" cy="-52" r="7" fill="#818cf8" opacity="0.4"/>
                    <circle cx="0" cy="-52" r="5" fill="#c084fc" stroke="#fbbf24" stroke-width="1.2"/>
                    <circle cx="-1.5" cy="-53.5" r="1.8" fill="#ffffff"/>
                    <!-- Main refermée sur la poignée (origine du groupe) -->
                    <ellipse cx="0" cy="0" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                    <path d="M -1.6,-1 L -1.28,-0.88 L -0.95,-0.77 L -0.62,-0.7 L -0.3,-0.67 L 0.03,-0.7 L 0.35,-0.77 L 0.68,-0.88 L 1,-1 L 1,-1 L 0.68,-1.12 L 0.35,-1.23 L 0.03,-1.3 L -0.3,-1.32 L -0.62,-1.3 L -0.95,-1.23 L -1.28,-1.12 L -1.6,-1 L -1.6,-1 Z M -1.6,1 L -1.28,1.12 L -0.95,1.23 L -0.62,1.3 L -0.3,1.33 L 0.03,1.3 L 0.35,1.23 L 0.68,1.12 L 1,1 L 1,1 L 0.68,0.88 L 0.35,0.77 L 0.03,0.7 L -0.3,0.68 L -0.62,0.7 L -0.95,0.77 L -1.28,0.88 L -1.6,1 L -1.6,1 Z" fill="${skin.shadow}"/>
                </g>
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
                <path d="M 41,108 L 41.88,108.23 L 42.75,108.42 L 43.63,108.55 L 44.5,108.6 L 45.38,108.55 L 46.25,108.42 L 47.13,108.23 L 48,108 L 48,108 L 47.13,107.77 L 46.25,107.58 L 45.38,107.45 L 44.5,107.4 L 43.63,107.45 L 42.75,107.58 L 41.88,107.77 L 41,108 L 41,108 Z" fill="#fbbf24"/>
                <path d="M 52,108 L 52.88,108.23 L 53.75,108.42 L 54.63,108.55 L 55.5,108.6 L 56.38,108.55 L 57.25,108.42 L 58.13,108.23 L 59,108 L 59,108 L 58.13,107.77 L 57.25,107.58 L 56.38,107.45 L 55.5,107.4 L 54.63,107.45 L 53.75,107.58 L 52.88,107.77 L 52,108 L 52,108 Z" fill="#fbbf24"/>
            </g>`,
        body: `
            <g id="boy-body-archer">
                <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 62,61.5 C 66,61.5 69,62 69,65 L 62.5,85 L 37.5,85 Z" fill="#16a34a"/>
                <path d="M 39,63 L 61,63 L 57,85 L 43,85 Z" fill="#78350f"/>
                <path d="M 50,63 L 49.77,63.3 L 49.58,63.6 L 49.45,63.9 L 49.4,64.2 L 49.45,64.5 L 49.58,64.8 L 49.77,65.1 L 50,65.4 L 50,65.4 L 50.23,65.1 L 50.42,64.8 L 50.55,64.5 L 50.6,64.2 L 50.55,63.9 L 50.42,63.6 L 50.23,63.3 L 50,63 L 50,63 Z M 50,67 L 49.77,67.3 L 49.58,67.6 L 49.45,67.9 L 49.4,68.2 L 49.45,68.5 L 49.58,68.8 L 49.77,69.1 L 50,69.4 L 50,69.4 L 50.23,69.1 L 50.42,68.8 L 50.55,68.5 L 50.6,68.2 L 50.55,67.9 L 50.42,67.6 L 50.23,67.3 L 50,67 L 50,67 Z M 50,71 L 49.77,71.3 L 49.58,71.6 L 49.45,71.9 L 49.4,72.2 L 49.45,72.5 L 49.58,72.8 L 49.77,73.1 L 50,73.4 L 50,73.4 L 50.23,73.1 L 50.42,72.8 L 50.55,72.5 L 50.6,72.2 L 50.55,71.9 L 50.42,71.6 L 50.23,71.3 L 50,71 L 50,71 Z M 50,75 L 49.77,75.3 L 49.58,75.6 L 49.45,75.9 L 49.4,76.2 L 49.45,76.5 L 49.58,76.8 L 49.77,77.1 L 50,77.4 L 50,77.4 L 50.23,77.1 L 50.42,76.8 L 50.55,76.5 L 50.6,76.2 L 50.55,75.9 L 50.42,75.6 L 50.23,75.3 L 50,75 L 50,75 Z M 50,79 L 49.77,79.3 L 49.58,79.6 L 49.45,79.9 L 49.4,80.2 L 49.45,80.5 L 49.58,80.8 L 49.77,81.1 L 50,81.4 L 50,81.4 L 50.23,81.1 L 50.42,80.8 L 50.55,80.5 L 50.6,80.2 L 50.55,79.9 L 50.42,79.6 L 50.23,79.3 L 50,79 L 50,79 Z M 50,83 L 49.77,83.3 L 49.58,83.6 L 49.45,83.9 L 49.4,84.2 L 49.45,84.5 L 49.58,84.8 L 49.77,85.1 L 50,85.4 L 50,85.4 L 50.23,85.1 L 50.42,84.8 L 50.55,84.5 L 50.6,84.2 L 50.55,83.9 L 50.42,83.6 L 50.23,83.3 L 50,83 L 50,83 Z" fill="#fbbf24"/>
                <path d="M 44,60 L 50,67 L 56,60 Z" fill="#fef08a"/>
            </g>`,
        belt: `
            <g id="boy-belt-archer">
                <path d="M 37.45,84.75 L 38.92,85.62 L 40.42,86.43 L 41.96,87.16 L 43.52,87.79 L 45.11,88.3 L 46.73,88.68 L 48.36,88.91 L 50,88.99 L 51.64,88.91 L 53.27,88.68 L 54.89,88.3 L 56.48,87.79 L 58.04,87.16 L 59.58,86.43 L 61.08,85.62 L 62.55,84.75 L 62.55,84.75 L 60.88,84.45 L 59.25,84.12 L 57.64,83.8 L 56.07,83.51 L 54.53,83.26 L 53,83.07 L 51.5,82.95 L 50,82.91 L 48.5,82.95 L 47,83.07 L 45.47,83.26 L 43.93,83.51 L 42.36,83.8 L 40.75,84.12 L 39.12,84.45 L 37.45,84.75 L 37.45,84.75 Z" fill="#451a03"/>
                <g transform="translate(0 1.2)"><rect x="46" y="81.5" width="8" height="6.5" rx="1.5" fill="#fbbf24" stroke="#451a03" stroke-width="0.8"/></g>
            </g>`,
        arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="boy-arms-archer">
                <path d="M32 64 C24 71, 23 78, 29 84 C32 84, 34 81, 35 77 Z" fill="#16a34a"/>
                <rect x="25" y="77" width="7" height="6" rx="1.2" fill="#78350f" transform="rotate(-20 28 80)"/>
                <!-- NOTE Main gauche dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
                <path d="M68 64 C76 69, 78 72, 76 79 C73 81, 70 79, 66 75 Z" fill="#16a34a"/>
                <!-- NOTE Main droite dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
            </g>`,
        headAccessory: "",
        handItem: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="boy-hand-archer-equipment">
                <!-- Flèche modélisée sur l'axe X=0, tenue dans la main gauche (29, 84) inclinée à 45° -->
                <g id="boy-hand-arrow" transform="translate(29, 84) rotate(45)">
                    <polygon points="0,-36 3,-28 -3,-28" fill="#cbd5e1" stroke="#475569" stroke-width="0.7"/>
                    <path d="M 0,-35 L -0.2,-33.8 L -0.35,-32.7 L -0.4,-31.5 L -0.35,-30.3 L -0.2,-29.2 L 0,-28 L 0,-28 L 0.2,-29.2 L 0.35,-30.3 L 0.4,-31.5 L 0.35,-32.7 L 0.2,-33.8 L 0,-35 L 0,-35 Z" fill="#ffffff"/>
                    <rect x="-1.5" y="-28" width="3" height="2" rx="0.5" fill="#fbbf24"/>
                    <rect x="-0.9" y="-26" width="1.8" height="36" rx="0.9" fill="#78350f"/>
                    <rect x="-0.4" y="-26" width="0.8" height="36" rx="0.4" fill="#d97706"/>
                    <polygon points="0,3 4.5,6 4.5,10 0,8" fill="#15803d"/>
                    <polygon points="0,3 -4.5,6 -4.5,10 0,8" fill="#15803d"/>
                    <polygon points="0,5 3,7 3,9 0,8" fill="#fbbf24"/>
                    <polygon points="0,5 -3,7 -3,9 0,8" fill="#fbbf24"/>
                    <circle cx="0" cy="10" r="0.9" fill="#78350f"/>
                    <!-- Main refermée sur la poignée (origine du groupe) -->
                    <ellipse cx="0" cy="0" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                    <path d="M -1.6,-1 L -1.28,-0.88 L -0.95,-0.77 L -0.62,-0.7 L -0.3,-0.67 L 0.03,-0.7 L 0.35,-0.77 L 0.68,-0.88 L 1,-1 L 1,-1 L 0.68,-1.12 L 0.35,-1.23 L 0.03,-1.3 L -0.3,-1.32 L -0.62,-1.3 L -0.95,-1.23 L -1.28,-1.12 L -1.6,-1 L -1.6,-1 Z M -1.6,1 L -1.28,1.12 L -0.95,1.23 L -0.62,1.3 L -0.3,1.33 L 0.03,1.3 L 0.35,1.23 L 0.68,1.12 L 1,1 L 1,1 L 0.68,0.88 L 0.35,0.77 L 0.03,0.7 L -0.3,0.68 L -0.62,0.7 L -0.95,0.77 L -1.28,0.88 L -1.6,1 L -1.6,1 Z" fill="${skin.shadow}"/>
                </g>
                <!-- Arc long modélisé autour de sa poignée, tenu dans la main droite (77, 79) -->
                <g id="boy-hand-bow" transform="translate(77, 79)">
                    <line x1="-12" y1="-26" x2="-12" y2="26" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>
                    <path d="M -12,-26 Q 12,0 -12,26" fill="none" stroke="#78350f" stroke-width="2.8" stroke-linecap="round"/>
                    <path d="M -12,-26 Q 13,0 -12,26" fill="none" stroke="#d97706" stroke-width="1.3" stroke-linecap="round"/>
                    <rect x="-2.5" y="-5" width="5" height="10" rx="1.2" fill="#fbbf24" stroke="#78350f" stroke-width="0.6"/>
                    <!-- Main refermée sur la poignée (origine du groupe) -->
                    <ellipse cx="0" cy="0" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                    <path d="M -1.6,-1 L -1.28,-0.88 L -0.95,-0.77 L -0.62,-0.7 L -0.3,-0.67 L 0.03,-0.7 L 0.35,-0.77 L 0.68,-0.88 L 1,-1 L 1,-1 L 0.68,-1.12 L 0.35,-1.23 L 0.03,-1.3 L -0.3,-1.32 L -0.62,-1.3 L -0.95,-1.23 L -1.28,-1.12 L -1.6,-1 L -1.6,-1 Z M -1.6,1 L -1.28,1.12 L -0.95,1.23 L -0.62,1.3 L -0.3,1.33 L 0.03,1.3 L 0.35,1.23 L 0.68,1.12 L 1,1 L 1,1 L 0.68,0.88 L 0.35,0.77 L 0.03,0.7 L -0.3,0.68 L -0.62,0.7 L -0.95,0.77 L -1.28,0.88 L -1.6,1 L -1.6,1 Z" fill="${skin.shadow}"/>
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
                <path d="M 41,95 L 41.88,95.23 L 42.75,95.42 L 43.63,95.55 L 44.5,95.6 L 45.38,95.55 L 46.25,95.42 L 47.13,95.23 L 48,95 L 48,95 L 47.13,94.77 L 46.25,94.58 L 45.38,94.45 L 44.5,94.4 L 43.63,94.45 L 42.75,94.58 L 41.88,94.77 L 41,95 L 41,95 Z" fill="#fbbf24"/>
                <polygon points="40,97 48.5,97 48,106 41,106" fill="#64748b"/>
                <path d="M39.5 106 C39.5 104, 49.5 104, 49.5 106 L50 113 C50 115, 39 115, 39 113 Z" fill="#334155"/>
                <rect x="42.5" y="107" width="4" height="2" rx="0.8" fill="#fbbf24"/>
                
                <polygon points="51,82 61,82 59,106 52,106" fill="#1e293b"/>
                <polygon points="51.5,84 60,84 59,95 52,95" fill="#94a3b8"/>
                <path d="M 52,95 L 52.94,95.23 L 53.88,95.42 L 54.81,95.55 L 55.75,95.6 L 56.69,95.55 L 57.63,95.42 L 58.56,95.23 L 59.5,95 L 59.5,95 L 58.56,94.77 L 57.63,94.58 L 56.69,94.45 L 55.75,94.4 L 54.81,94.45 L 53.88,94.58 L 52.94,94.77 L 52,95 L 52,95 Z" fill="#fbbf24"/>
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
                <path d="M 39.05,82.75 L 40.31,83.61 L 41.6,84.42 L 42.93,85.15 L 44.29,85.79 L 45.69,86.3 L 47.11,86.68 L 48.55,86.91 L 50,86.99 L 51.45,86.91 L 52.89,86.68 L 54.31,86.3 L 55.71,85.79 L 57.07,85.15 L 58.4,84.42 L 59.69,83.61 L 60.95,82.75 L 60.95,82.75 L 59.47,82.45 L 58.02,82.13 L 56.61,81.81 L 55.24,81.51 L 53.9,81.26 L 52.58,81.07 L 51.29,80.95 L 50,80.91 L 48.71,80.95 L 47.42,81.07 L 46.1,81.26 L 44.76,81.51 L 43.39,81.81 L 41.98,82.13 L 40.53,82.45 L 39.05,82.75 L 39.05,82.75 Z" fill="#1e293b"/>
                <g transform="translate(0 1.2)"><rect x="46.5" y="79.5" width="7" height="6.5" rx="1.2" fill="#fbbf24" stroke="#78350f" stroke-width="0.8"/></g>
                <g transform="translate(0 1.2)"><circle cx="50" cy="82.8" r="1.5" fill="#ef4444"/></g>
            </g>`,
        arms: `
            <g id="girl-arms-warrior">
                <!-- Épaulières et gantelets d'acier -->
                <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="#64748b"/>
                <circle cx="31" cy="65" r="4" fill="#fbbf24" stroke="#b45309" stroke-width="0.8"/>
                <ellipse cx="27" cy="81.5" rx="3.6" ry="3.3" fill="#cbd5e1"/>
                <path d="M67 63 C74 66.5, 76 70.5, 75 75.5 C72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="#64748b"/>
                <circle cx="69" cy="65" r="4" fill="#fbbf24" stroke="#b45309" stroke-width="0.8"/>
                <!-- NOTE Main droite dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
            </g>`,
        headAccessory: "",
        handItem: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
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
                <!-- Glaive modélisé sur l'axe X=0, poignée centrée sur le gantelet droit (76, 75.5) -->
                <g id="girl-sword" transform="translate(76, 75.5)">
                    <!-- Lame courte et épaisse bicolore, pointe acérée -->
                    <polygon points="-7,-9 -7,-33 0,-42 0,-9" fill="#94a3b8" stroke="#334155" stroke-width="0.8"/>
                    <polygon points="0,-9 0,-42 7,-33 7,-9" fill="#cbd5e1" stroke="#334155" stroke-width="0.8"/>
                    <path d="M 0,-10 L 0.22,-12.91 L 0.41,-16.3 L 0.57,-19.2 L 0.67,-22.59 L 0.7,-25.5 L 0.67,-28.41 L 0.57,-31.8 L 0.41,-34.7 L 0.22,-38.09 L 0,-41 L 0,-41 L -0.22,-38.09 L -0.41,-34.7 L -0.57,-31.8 L -0.67,-28.41 L -0.7,-25.5 L -0.67,-22.59 L -0.57,-19.2 L -0.41,-16.3 L -0.22,-12.91 L 0,-10 L 0,-10 Z" fill="#ffffff"/>
                    <polygon points="-7,-33 0,-42 7,-33" fill="#ffffff" opacity="0.6"/>
                    <!-- Garde dorée massive et rubis -->
                    <polygon points="-10,-5 10,-5 8,-9 -8,-9" fill="#fbbf24" stroke="#b45309" stroke-width="0.8"/>
                    <circle cx="0" cy="-7" r="2.2" fill="#ef4444" stroke="#ffffff" stroke-width="0.5"/>
                    <!-- Poignée en cuir à fil d'or et pommeau au rubis -->
                    <rect x="-1.9" y="-5" width="3.8" height="12.5" rx="1.9" fill="#78350f"/>
                    <path d="M 0,-4.5 L -0.22,-4.16 L -0.39,-3.84 L -0.45,-3.5 L -0.39,-3.16 L -0.22,-2.84 L 0,-2.5 L 0,-2.5 L 0.22,-2.84 L 0.39,-3.16 L 0.45,-3.5 L 0.39,-3.84 L 0.22,-4.16 L 0,-4.5 L 0,-4.5 Z M 0,-0.5 L -0.22,-0.16 L -0.39,0.16 L -0.45,0.5 L -0.39,0.84 L -0.22,1.16 L 0,1.5 L 0,1.5 L 0.22,1.16 L 0.39,0.84 L 0.45,0.5 L 0.39,0.16 L 0.22,-0.16 L 0,-0.5 L 0,-0.5 Z M 0,3.5 L -0.22,3.84 L -0.39,4.16 L -0.45,4.5 L -0.39,4.84 L -0.22,5.16 L 0,5.5 L 0,5.5 L 0.22,5.16 L 0.39,4.84 L 0.45,4.5 L 0.39,4.16 L 0.22,3.84 L 0,3.5 L 0,3.5 Z" fill="#fbbf24"/>
                    <circle cx="0" cy="7.5" r="2.8" fill="#fbbf24" stroke="#78350f" stroke-width="0.8"/>
                    <circle cx="0" cy="7.5" r="1.4" fill="#ef4444"/>
                    <!-- Main refermée sur la poignée (origine du groupe) -->
                    <ellipse cx="0" cy="0" rx="3.2" ry="3.3" fill="#cbd5e1" stroke="#64748b" stroke-width="0.5"/>
                    <path d="M -1.6,-1 L -1.28,-0.88 L -0.95,-0.77 L -0.62,-0.7 L -0.3,-0.67 L 0.03,-0.7 L 0.35,-0.77 L 0.68,-0.88 L 1,-1 L 1,-1 L 0.68,-1.12 L 0.35,-1.23 L 0.03,-1.3 L -0.3,-1.32 L -0.62,-1.3 L -0.95,-1.23 L -1.28,-1.12 L -1.6,-1 L -1.6,-1 Z M -1.6,1 L -1.28,1.12 L -0.95,1.23 L -0.62,1.3 L -0.3,1.33 L 0.03,1.3 L 0.35,1.23 L 0.68,1.12 L 1,1 L 1,1 L 0.68,0.88 L 0.35,0.77 L 0.03,0.7 L -0.3,0.68 L -0.62,0.7 L -0.95,0.77 L -1.28,0.88 L -1.6,1 L -1.6,1 Z" fill="#64748b"/>
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
                <path d="M 45,82 L 44.67,83.86 L 44.26,86.18 L 43.9,88.02 L 43.53,89.86 L 43.08,92.14 L 42.71,93.95 L 42.26,96.18 L 41.89,97.95 L 41.43,100.13 L 41.07,101.86 L 40.58,103.97 L 40.08,106.03 L 39.56,108.05 L 39,110 L 39,110 L 39.81,108.13 L 40.58,106.19 L 41.3,104.17 L 41.97,102.09 L 42.48,100.39 L 43.03,98.21 L 43.43,96.43 L 43.86,94.16 L 44.15,92.32 L 44.45,90 L 44.64,88.13 L 44.78,86.25 L 44.93,83.89 L 45,82 L 45,82 Z" fill="#1e1b4b"/>
                <path d="M 55,82 L 55.07,83.89 L 55.22,86.25 L 55.36,88.13 L 55.55,90 L 55.85,92.32 L 56.14,94.16 L 56.57,96.43 L 56.97,98.21 L 57.52,100.39 L 58.03,102.09 L 58.7,104.17 L 59.42,106.19 L 60.19,108.13 L 61,110 L 61,110 L 60.44,108.05 L 59.92,106.03 L 59.42,103.97 L 58.93,101.86 L 58.57,100.13 L 58.11,97.95 L 57.74,96.18 L 57.29,93.95 L 56.92,92.14 L 56.47,89.86 L 56.1,88.02 L 55.74,86.18 L 55.33,83.86 L 55,82 L 55,82 Z" fill="#1e1b4b"/>
                <path d="M 50,82 L 49.87,84.27 L 49.74,86.08 L 49.63,88.34 L 49.53,90.16 L 49.46,92.42 L 49.42,94.23 L 49.4,96.5 L 49.42,98.77 L 49.46,100.58 L 49.53,102.84 L 49.63,104.66 L 49.74,106.92 L 49.87,108.73 L 50,111 L 50,111 L 50.13,108.73 L 50.26,106.92 L 50.37,104.66 L 50.47,102.84 L 50.54,100.58 L 50.58,98.77 L 50.6,96.5 L 50.58,94.23 L 50.54,92.42 L 50.47,90.16 L 50.37,88.34 L 50.26,86.08 L 50.13,84.27 L 50,82 L 50,82 Z" fill="#4c1d95"/>
                <!-- Motifs d'étoiles dorées brodées sur la robe -->
                <circle cx="50" cy="94" r="1.2" fill="#fbbf24"/>
                <circle cx="43" cy="103" r="0.9" fill="#e9d5ff"/>
                <circle cx="57" cy="103" r="0.9" fill="#e9d5ff"/>
                <!-- Ourlet doré ondulé au bas de la robe -->
                <path d="M 26,110 L 28.23,110.56 L 30.86,110.93 L 33.13,111.08 L 35.77,111.1 L 38.04,111.06 L 40.28,111.01 L 42.88,110.99 L 45.09,111.08 L 47.64,111.34 L 50.19,111.78 L 52.36,111.34 L 54.91,111.08 L 57.12,110.99 L 59.72,111.01 L 61.96,111.06 L 64.23,111.1 L 66.87,111.08 L 69.14,110.93 L 71.77,110.56 L 74,110 L 74,110 L 71.73,110.32 L 69.11,110.44 L 66.88,110.36 L 64.27,110.16 L 62.04,109.94 L 59.78,109.72 L 57.13,109.57 L 54.84,109.56 L 52.14,109.78 L 49.81,110.22 L 47.86,109.78 L 45.16,109.56 L 42.87,109.57 L 40.22,109.72 L 37.96,109.94 L 35.73,110.16 L 33.12,110.36 L 30.89,110.44 L 28.27,110.32 L 26,110 L 26,110 Z" fill="#fbbf24"/>
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
                <path d="M 35.45,82.75 L 37.18,83.62 L 38.94,84.43 L 40.73,85.16 L 42.55,85.79 L 44.39,86.3 L 46.25,86.68 L 48.12,86.91 L 50,86.99 L 51.88,86.91 L 53.75,86.68 L 55.61,86.3 L 57.45,85.79 L 59.27,85.16 L 61.06,84.43 L 62.82,83.62 L 64.55,82.75 L 64.55,82.75 L 62.65,82.44 L 60.77,82.12 L 58.92,81.8 L 57.1,81.51 L 55.3,81.26 L 53.52,81.07 L 51.76,80.95 L 50,80.91 L 48.24,80.95 L 46.48,81.07 L 44.7,81.26 L 42.9,81.51 L 41.08,81.8 L 39.23,82.12 L 37.35,82.44 L 35.45,82.75 L 35.45,82.75 Z" fill="#7e22ce"/>
                <!-- Boucle en croissant de lune or -->
                <g transform="translate(0 1.2)"><circle cx="50" cy="82.5" r="3.2" fill="#fbbf24"/></g>
                <g transform="translate(0 1.19)"><circle cx="51.5" cy="81.5" r="2.8" fill="#7e22ce"/></g>
            </g>`,
        arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="girl-arms-witch">
                <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="#6b21a8"/>
                <ellipse cx="27" cy="81.5" rx="3.6" ry="3.3" fill="${skin.base}"/>
                <!-- NOTE Séparations des doigts en fuseau -->
                <path d="M 26,81.8 L 25.81,82.09 L 25.65,82.39 L 25.53,82.7 L 25.48,83.02 L 25.48,83.35 L 25.55,83.67 L 25.66,83.99 L 25.8,84.3 L 25.8,84.3 L 25.91,83.98 L 26,83.67 L 26.08,83.37 L 26.12,83.08 L 26.13,82.77 L 26.1,82.46 L 26.05,82.14 L 26,81.8 L 26,81.8 Z M 28,81.8 L 27.95,82.14 L 27.9,82.46 L 27.87,82.77 L 27.88,83.08 L 27.92,83.37 L 28,83.67 L 28.09,83.98 L 28.2,84.3 L 28.2,84.3 L 28.34,83.99 L 28.45,83.67 L 28.52,83.35 L 28.52,83.02 L 28.47,82.7 L 28.35,82.39 L 28.19,82.09 L 28,81.8 L 28,81.8 Z" fill="${skin.shadow}"/>
                <path d="M67 63 C74 66.5, 76 70.5, 75 75.5 C72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="#6b21a8"/>
                <!-- NOTE Main droite dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
            </g>`,
        headAccessory: `
            <g id="girl-head-witch">
                <!-- Très large bord du chapeau qui coiffe le front, dessiné en premier, contour en fuseau (devant plus épais que l'arrière) -->
                <g id="witch-hat-brim" transform="rotate(-6 48 20)">
                    <ellipse cx="48" cy="20" rx="48" ry="11.5" fill="#3b0764"/>
                    <path d="M 0,20 L 0.4,18.67 L 1.27,17.57 L 2.36,16.69 L 3.57,15.95 L 4.85,15.33 L 6.11,14.81 L 7.39,14.35 L 8.81,13.9 L 10.09,13.55 L 11.46,13.2 L 12.88,12.88 L 14.23,12.6 L 15.64,12.33 L 16.96,12.11 L 18.48,11.86 L 19.9,11.66 L 21.18,11.49 L 22.66,11.31 L 23.99,11.16 L 25.51,11 L 26.9,10.87 L 28.32,10.75 L 29.58,10.65 L 31.04,10.55 L 32.51,10.45 L 33.81,10.38 L 35.29,10.3 L 36.79,10.23 L 38.12,10.18 L 39.46,10.13 L 41.01,10.09 L 42.37,10.06 L 43.73,10.03 L 45.09,10.02 L 46.65,10 L 48,10 L 49.35,10 L 50.91,10.02 L 52.27,10.03 L 53.63,10.06 L 54.99,10.09 L 56.54,10.13 L 57.88,10.18 L 59.21,10.23 L 60.71,10.3 L 62.19,10.38 L 63.49,10.45 L 64.96,10.55 L 66.42,10.65 L 67.68,10.75 L 69.1,10.87 L 70.49,11 L 72.01,11.16 L 73.34,11.31 L 74.82,11.49 L 76.1,11.66 L 77.52,11.86 L 79.04,12.11 L 80.36,12.33 L 81.77,12.6 L 83.12,12.88 L 84.54,13.2 L 85.91,13.55 L 87.19,13.9 L 88.61,14.35 L 89.89,14.81 L 91.15,15.33 L 92.43,15.95 L 93.64,16.69 L 94.73,17.57 L 95.6,18.67 L 96,20 L 96,20 L 95.72,18.61 L 94.92,17.39 L 93.88,16.37 L 92.7,15.51 L 91.44,14.75 L 90.2,14.1 L 88.93,13.51 L 87.53,12.93 L 86.25,12.45 L 84.89,11.98 L 83.47,11.54 L 82.12,11.14 L 80.71,10.76 L 79.38,10.42 L 77.85,10.07 L 76.43,9.76 L 75.14,9.49 L 73.66,9.21 L 72.32,8.97 L 70.78,8.72 L 69.38,8.51 L 67.95,8.31 L 66.68,8.14 L 65.2,7.96 L 63.71,7.8 L 62.4,7.67 L 60.89,7.53 L 59.37,7.42 L 58.03,7.32 L 56.67,7.24 L 55.1,7.16 L 53.72,7.11 L 52.34,7.06 L 50.95,7.03 L 49.37,7.01 L 48,7 L 46.63,7.01 L 45.05,7.03 L 43.66,7.06 L 42.28,7.11 L 40.9,7.16 L 39.33,7.24 L 37.97,7.32 L 36.63,7.42 L 35.11,7.53 L 33.6,7.67 L 32.29,7.8 L 30.8,7.96 L 29.32,8.14 L 28.05,8.31 L 26.62,8.51 L 25.22,8.72 L 23.68,8.97 L 22.34,9.21 L 20.86,9.49 L 19.57,9.76 L 18.15,10.07 L 16.62,10.42 L 15.29,10.76 L 13.88,11.14 L 12.53,11.54 L 11.11,11.98 L 9.75,12.45 L 8.47,12.93 L 7.07,13.51 L 5.8,14.1 L 4.56,14.75 L 3.3,15.51 L 2.12,16.37 L 1.08,17.39 L 0.28,18.61 L 0,20 L 0,20 Z" fill="#1e1b4b"/>
                    <path d="M 96,20 L 95.58,21.32 L 94.7,22.4 L 93.6,23.25 L 92.38,23.96 L 91.09,24.56 L 89.83,25.05 L 88.54,25.48 L 87.13,25.9 L 85.84,26.23 L 84.47,26.55 L 83.05,26.86 L 81.7,27.11 L 80.29,27.35 L 78.97,27.56 L 77.45,27.78 L 76.04,27.96 L 74.75,28.11 L 73.28,28.27 L 71.95,28.4 L 70.43,28.54 L 69.05,28.66 L 67.63,28.76 L 66.37,28.84 L 64.92,28.93 L 63.45,29.02 L 62.15,29.08 L 60.67,29.15 L 59.18,29.21 L 57.85,29.25 L 56.52,29.29 L 54.97,29.33 L 53.62,29.35 L 52.26,29.37 L 50.9,29.39 L 49.35,29.4 L 48,29.4 L 46.65,29.4 L 45.1,29.39 L 43.74,29.37 L 42.38,29.35 L 41.03,29.33 L 39.48,29.29 L 38.15,29.25 L 36.82,29.21 L 35.33,29.15 L 33.85,29.08 L 32.55,29.02 L 31.08,28.93 L 29.63,28.84 L 28.37,28.76 L 26.95,28.66 L 25.57,28.54 L 24.05,28.4 L 22.72,28.27 L 21.25,28.11 L 19.96,27.96 L 18.55,27.78 L 17.03,27.56 L 15.71,27.35 L 14.3,27.11 L 12.95,26.86 L 11.53,26.55 L 10.16,26.23 L 8.87,25.9 L 7.46,25.48 L 6.17,25.05 L 4.91,24.56 L 3.62,23.96 L 2.4,23.25 L 1.3,22.4 L 0.42,21.32 L 0,20 L 0,20 L 0.26,21.4 L 1.04,22.65 L 2.07,23.69 L 3.25,24.58 L 4.5,25.37 L 5.74,26.05 L 7.01,26.66 L 8.41,27.26 L 9.68,27.77 L 11.04,28.26 L 12.46,28.73 L 13.81,29.15 L 15.22,29.56 L 16.55,29.92 L 18.08,30.29 L 19.5,30.62 L 20.79,30.91 L 22.28,31.21 L 23.62,31.47 L 25.16,31.74 L 26.56,31.97 L 28,32.18 L 29.27,32.37 L 30.75,32.56 L 32.25,32.73 L 33.56,32.88 L 35.07,33.02 L 36.6,33.15 L 37.94,33.25 L 39.31,33.34 L 40.88,33.42 L 42.26,33.49 L 43.65,33.53 L 45.04,33.57 L 46.62,33.59 L 48,33.6 L 49.38,33.59 L 50.96,33.57 L 52.35,33.53 L 53.74,33.49 L 55.12,33.42 L 56.69,33.34 L 58.06,33.25 L 59.4,33.15 L 60.93,33.02 L 62.44,32.88 L 63.75,32.73 L 65.25,32.56 L 66.73,32.37 L 68,32.18 L 69.44,31.97 L 70.84,31.74 L 72.38,31.47 L 73.72,31.21 L 75.21,30.91 L 76.5,30.62 L 77.92,30.29 L 79.45,29.92 L 80.78,29.56 L 82.19,29.15 L 83.54,28.73 L 84.96,28.26 L 86.32,27.77 L 87.59,27.26 L 88.99,26.66 L 90.26,26.05 L 91.5,25.37 L 92.75,24.58 L 93.93,23.69 L 94.96,22.65 L 95.74,21.4 L 96,20 L 96,20 Z" fill="#1e1b4b"/>
                </g>
                <!-- Grand chapeau pointu de sorcière (CALOTTE PLUS HAUTE Y=-33), au premier plan devant le bord -->
                <path d="M 20,18 Q 36,-32 86,-33 Q 62,-4 76,16 Q 48,26 20,18 Z" fill="#2e1065"/>
                <!-- Flancs du cône en fuseau, effilés jusqu'à la pointe -->
                <path d="M 20,18 L 22.44,12.06 L 25.12,6.54 L 28.71,0.17 L 31.87,-4.45 L 36.05,-9.72 L 40.57,-14.42 L 44.42,-17.77 L 49.55,-21.51 L 55.05,-24.74 L 60.97,-27.46 L 67.32,-29.67 L 72.72,-31.11 L 79.91,-32.35 L 86,-33 L 86,-33 L 79.85,-33.02 L 72.5,-32.39 L 66.86,-31.48 L 60.16,-29.66 L 53.86,-27.17 L 47.97,-23.98 L 42.53,-20.11 L 38.53,-16.52 L 33.98,-11.45 L 29.93,-5.76 L 27.09,-0.76 L 23.94,5.99 L 21.82,11.82 L 20,18 L 20,18 Z M 86,-33 L 83.61,-30.48 L 80.74,-27.09 L 78.19,-23.73 L 76.44,-21.25 L 74.04,-17.08 L 72.48,-13.79 L 71.27,-10.52 L 70.26,-6.5 L 69.78,-2.58 L 69.89,1.97 L 70.58,5.6 L 71.78,9.04 L 73.79,12.96 L 76,16 L 76,16 L 74.3,12.68 L 72.84,8.67 L 72.17,5.28 L 71.92,1.84 L 72.12,-2.38 L 72.74,-6 L 73.75,-9.74 L 74.83,-12.85 L 76.15,-16.06 L 78.2,-20.23 L 79.56,-22.86 L 81.66,-26.44 L 84.06,-30.12 L 86,-33 L 86,-33 Z" fill="#1e1b4b"/>
                <!-- Ruban violet à la base du cône, d'un coin à l'autre, courbé vers le bas comme le bord -->
                <path d="M 20.5,18 L 23.81,19.41 L 27.16,20.67 L 30.56,21.78 L 34,22.71 L 37.49,23.43 L 41,23.93 L 44.54,24.2 L 48.08,24.22 L 51.63,24.01 L 55.15,23.55 L 58.65,22.85 L 62.11,21.94 L 65.53,20.83 L 68.9,19.54 L 72.22,18.09 L 75.5,16.5 L 75.5,16.5 L 71.9,16.92 L 68.35,17.23 L 64.84,17.45 L 61.39,17.62 L 57.97,17.74 L 54.6,17.84 L 51.25,17.94 L 47.92,18.03 L 44.59,18.12 L 41.25,18.21 L 37.89,18.29 L 34.5,18.35 L 31.07,18.38 L 27.59,18.34 L 24.07,18.22 L 20.5,18 L 20.5,18 Z" fill="#9333ea"/>
                <!-- Vrai croissant de lune doré étincelant -->
                <path d="M 51,17 A 4.5,4.5 0 1 0 53,25 A 3.6,3.6 0 1 1 51,17 Z" fill="#fbbf24" stroke="#d97706" stroke-width="0.5"/>
                <circle cx="49" cy="20" r="0.8" fill="#ffffff"/>
            </g>`,
        handItem: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="girl-hand-witch-staff">
                <!-- Bâton de sorcière modélisé sur l'axe X=0, hampe centrée sur la main droite (76, 75.5) -->
                <g id="girl-witch-staff" transform="translate(76, 75.5)">
                    <rect x="-1.5" y="-41.5" width="3" height="74" rx="1.5" fill="#2e1065"/>
                    <path d="M 0,-40 L -0.2,-39.48 L -0.35,-39.02 L -0.4,-38.5 L -0.35,-37.98 L -0.2,-37.52 L 0,-37 L 0,-37 L 0.2,-37.52 L 0.35,-37.98 L 0.4,-38.5 L 0.35,-39.02 L 0.2,-39.48 L 0,-40 L 0,-40 Z M 0,-34 L -0.2,-33.48 L -0.35,-33.02 L -0.4,-32.5 L -0.35,-31.98 L -0.2,-31.52 L 0,-31 L 0,-31 L 0.2,-31.52 L 0.35,-31.98 L 0.4,-32.5 L 0.35,-33.02 L 0.2,-33.48 L 0,-34 L 0,-34 Z M 0,-28 L -0.2,-27.48 L -0.35,-27.02 L -0.4,-26.5 L -0.35,-25.98 L -0.2,-25.52 L 0,-25 L 0,-25 L 0.2,-25.52 L 0.35,-25.98 L 0.4,-26.5 L 0.35,-27.02 L 0.2,-27.48 L 0,-28 L 0,-28 Z M 0,-22 L -0.2,-21.48 L -0.35,-21.02 L -0.4,-20.5 L -0.35,-19.98 L -0.2,-19.52 L 0,-19 L 0,-19 L 0.2,-19.52 L 0.35,-19.98 L 0.4,-20.5 L 0.35,-21.02 L 0.2,-21.48 L 0,-22 L 0,-22 Z M 0,-16 L -0.2,-15.48 L -0.35,-15.02 L -0.4,-14.5 L -0.35,-13.98 L -0.2,-13.52 L 0,-13 L 0,-13 L 0.2,-13.52 L 0.35,-13.98 L 0.4,-14.5 L 0.35,-15.02 L 0.2,-15.48 L 0,-16 L 0,-16 Z M 0,-10 L -0.2,-9.48 L -0.35,-9.02 L -0.4,-8.5 L -0.35,-7.98 L -0.2,-7.52 L 0,-7 L 0,-7 L 0.2,-7.52 L 0.35,-7.98 L 0.4,-8.5 L 0.35,-9.02 L 0.2,-9.48 L 0,-10 L 0,-10 Z M 0,-4 L -0.2,-3.48 L -0.35,-3.02 L -0.4,-2.5 L -0.35,-1.98 L -0.2,-1.52 L 0,-1 L 0,-1 L 0.2,-1.52 L 0.35,-1.98 L 0.4,-2.5 L 0.35,-3.02 L 0.2,-3.48 L 0,-4 L 0,-4 Z M 0,2 L -0.2,2.52 L -0.35,2.98 L -0.4,3.5 L -0.35,4.02 L -0.2,4.48 L 0,5 L 0,5 L 0.2,4.48 L 0.35,4.02 L 0.4,3.5 L 0.35,2.98 L 0.2,2.52 L 0,2 L 0,2 Z M 0,8 L -0.2,8.52 L -0.35,8.98 L -0.4,9.5 L -0.35,10.02 L -0.2,10.48 L 0,11 L 0,11 L 0.2,10.48 L 0.35,10.02 L 0.4,9.5 L 0.35,8.98 L 0.2,8.52 L 0,8 L 0,8 Z M 0,14 L -0.2,14.52 L -0.35,14.98 L -0.4,15.5 L -0.35,16.02 L -0.2,16.48 L 0,17 L 0,17 L 0.2,16.48 L 0.35,16.02 L 0.4,15.5 L 0.35,14.98 L 0.2,14.52 L 0,14 L 0,14 Z M 0,20 L -0.2,20.52 L -0.35,20.98 L -0.4,21.5 L -0.35,22.02 L -0.2,22.48 L 0,23 L 0,23 L 0.2,22.48 L 0.35,22.02 L 0.4,21.5 L 0.35,20.98 L 0.2,20.52 L 0,20 L 0,20 Z M 0,26 L -0.2,26.52 L -0.35,26.98 L -0.4,27.5 L -0.35,28.02 L -0.2,28.48 L 0,29 L 0,29 L 0.2,28.48 L 0.35,28.02 L 0.4,27.5 L 0.35,26.98 L 0.2,26.52 L 0,26 L 0,26 Z" fill="#fbbf24"/>
                    <circle cx="0" cy="-49.5" r="9" fill="#c084fc" opacity="0.35"/>
                    <circle cx="0" cy="-49.5" r="6.5" fill="#9333ea" stroke="#fbbf24" stroke-width="1.2"/>
                    <circle cx="-2" cy="-52" r="2.2" fill="#ffffff"/>
                    <circle cx="1.5" cy="-48" r="1.2" fill="#e9d5ff"/>
                    <rect x="-2.5" y="-43" width="5" height="2.5" rx="0.6" fill="#fbbf24" stroke="#78350f" stroke-width="0.5"/>
                    <!-- Main refermée sur la poignée (origine du groupe) -->
                    <ellipse cx="0" cy="0" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                    <path d="M -1.6,-1 L -1.28,-0.88 L -0.95,-0.77 L -0.62,-0.7 L -0.3,-0.67 L 0.03,-0.7 L 0.35,-0.77 L 0.68,-0.88 L 1,-1 L 1,-1 L 0.68,-1.12 L 0.35,-1.23 L 0.03,-1.3 L -0.3,-1.32 L -0.62,-1.3 L -0.95,-1.23 L -1.28,-1.12 L -1.6,-1 L -1.6,-1 Z M -1.6,1 L -1.28,1.12 L -0.95,1.23 L -0.62,1.3 L -0.3,1.33 L 0.03,1.3 L 0.35,1.23 L 0.68,1.12 L 1,1 L 1,1 L 0.68,0.88 L 0.35,0.77 L 0.03,0.7 L -0.3,0.68 L -0.62,0.7 L -0.95,0.77 L -1.28,0.88 L -1.6,1 L -1.6,1 Z" fill="${skin.shadow}"/>
                </g>
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
                <path d="M 37.5,93 L 38.94,93.23 L 40.38,93.42 L 41.81,93.55 L 43.25,93.6 L 44.69,93.55 L 46.13,93.42 L 47.56,93.23 L 49,93 L 49,93 L 47.56,92.77 L 46.13,92.58 L 44.69,92.45 L 43.25,92.4 L 41.81,92.45 L 40.38,92.58 L 38.94,92.77 L 37.5,93 L 37.5,93 Z" fill="#064e3b"/>
                <polygon points="50.5,82 62,82 62.5,93 51,93" fill="#047857"/>
                <path d="M 51,93 L 52.44,93.23 L 53.88,93.42 L 55.31,93.55 L 56.75,93.6 L 58.19,93.55 L 59.63,93.42 L 61.06,93.23 L 62.5,93 L 62.5,93 L 61.06,92.77 L 59.63,92.58 L 58.19,92.45 L 56.75,92.4 L 55.31,92.45 L 53.88,92.58 L 52.44,92.77 L 51,93 L 51,93 Z" fill="#064e3b"/>
                
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
                <path d="M 38,82.5 L 39.41,83.3 L 40.85,84.05 L 42.31,84.72 L 43.81,85.3 L 45.33,85.77 L 46.88,86.12 L 48.43,86.33 L 50,86.4 L 51.57,86.33 L 53.12,86.12 L 54.67,85.77 L 56.19,85.3 L 57.69,84.72 L 59.15,84.05 L 60.59,83.3 L 62,82.5 L 62,82.5 L 60.41,82.26 L 58.85,82 L 57.31,81.74 L 55.81,81.5 L 54.33,81.29 L 52.88,81.13 L 51.43,81.03 L 50,81 L 48.57,81.03 L 47.12,81.13 L 45.67,81.29 L 44.19,81.5 L 42.69,81.74 L 41.15,82 L 39.59,82.26 L 38,82.5 L 38,82.5 Z" fill="#78350f"/>
                <g transform="translate(0 1.2)"><circle cx="50" cy="82.5" r="2.5" fill="#fbbf24"/></g>
            </g>`,
        arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="girl-arms-archer">
                <!-- Bras nus sans manches avec protège-poignets en cuir -->
                <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="${skin.base}"/>
                <rect x="25" y="74" width="6.5" height="6.5" rx="1.2" fill="#78350f" stroke="#fbbf24" stroke-width="0.5" transform="rotate(-15 28 77)"/>
                <!-- NOTE Main gauche dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
                <path d="M67 63 C74 66.5, 76 70.5, 75 75.5 C72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="${skin.base}"/>
                <rect x="68" y="69" width="6.5" height="6" rx="1.2" fill="#78350f" stroke="#fbbf24" stroke-width="0.5" transform="rotate(15 71 72)"/>
                <!-- NOTE Main droite dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
            </g>`,
        headAccessory: "",
        handItem: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
            <g id="girl-hand-archer-equipment">
                <!-- Flèche elfique modélisée sur l'axe X=0, tenue dans la main gauche (27, 81.5) inclinée à 45° -->
                <g id="girl-hand-arrow" transform="translate(27, 81.5) rotate(45)">
                    <polygon points="0,-36.5 3.5,-28.5 -3.5,-28.5" fill="#e2e8f0" stroke="#334155" stroke-width="0.7"/>
                    <path d="M 0,-35.5 L -0.22,-34.3 L -0.39,-33.2 L -0.45,-32 L -0.39,-30.8 L -0.22,-29.7 L 0,-28.5 L 0,-28.5 L 0.22,-29.7 L 0.39,-30.8 L 0.45,-32 L 0.39,-33.2 L 0.22,-34.3 L 0,-35.5 L 0,-35.5 Z" fill="#ffffff"/>
                    <rect x="-1.5" y="-28.5" width="3" height="2" rx="0.5" fill="#fbbf24"/>
                    <rect x="-0.8" y="-26.5" width="1.6" height="36" rx="0.8" fill="#854d0e"/>
                    <rect x="-0.35" y="-26.5" width="0.7" height="36" rx="0.35" fill="#fbbf24"/>
                    <polygon points="0,3.5 4.5,6.5 4.5,10.5 0,8.5" fill="#10b981"/>
                    <polygon points="0,3.5 -4.5,6.5 -4.5,10.5 0,8.5" fill="#10b981"/>
                    <polygon points="0,5.5 3,7.5 3,9.5 0,8.5" fill="#fbbf24"/>
                    <polygon points="0,5.5 -3,7.5 -3,9.5 0,8.5" fill="#fbbf24"/>
                    <circle cx="0" cy="10.5" r="0.8" fill="#78350f"/>
                    <!-- Main refermée sur la poignée (origine du groupe) -->
                    <ellipse cx="0" cy="0" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                    <path d="M -1.6,-1 L -1.28,-0.88 L -0.95,-0.77 L -0.62,-0.7 L -0.3,-0.67 L 0.03,-0.7 L 0.35,-0.77 L 0.68,-0.88 L 1,-1 L 1,-1 L 0.68,-1.12 L 0.35,-1.23 L 0.03,-1.3 L -0.3,-1.32 L -0.62,-1.3 L -0.95,-1.23 L -1.28,-1.12 L -1.6,-1 L -1.6,-1 Z M -1.6,1 L -1.28,1.12 L -0.95,1.23 L -0.62,1.3 L -0.3,1.33 L 0.03,1.3 L 0.35,1.23 L 0.68,1.12 L 1,1 L 1,1 L 0.68,0.88 L 0.35,0.77 L 0.03,0.7 L -0.3,0.68 L -0.62,0.7 L -0.95,0.77 L -1.28,0.88 L -1.6,1 L -1.6,1 Z" fill="${skin.shadow}"/>
                </g>
                <!-- Arc elfique modélisé autour de sa poignée, tenu dans la main droite (76, 75.5) -->
                <g id="girl-hand-bow" transform="translate(76, 75.5)">
                    <line x1="-12" y1="-26" x2="-12" y2="26" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>
                    <path d="M -12,-26 Q 12,0 -12,26" fill="none" stroke="#a16207" stroke-width="2.6" stroke-linecap="round"/>
                    <path d="M -12,-26 Q 13,0 -12,26" fill="none" stroke="#fbbf24" stroke-width="1.2" stroke-linecap="round"/>
                    <rect x="-2.2" y="-5" width="4.4" height="10" rx="1" fill="#78350f" stroke="#fbbf24" stroke-width="0.6"/>
                    <circle cx="0" cy="-6.2" r="1.6" fill="#10b981" stroke="#fbbf24" stroke-width="0.5"/>
                    <!-- Main refermée sur la poignée (origine du groupe) -->
                    <ellipse cx="0" cy="0" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                    <path d="M -1.6,-1 L -1.28,-0.88 L -0.95,-0.77 L -0.62,-0.7 L -0.3,-0.67 L 0.03,-0.7 L 0.35,-0.77 L 0.68,-0.88 L 1,-1 L 1,-1 L 0.68,-1.12 L 0.35,-1.23 L 0.03,-1.3 L -0.3,-1.32 L -0.62,-1.3 L -0.95,-1.23 L -1.28,-1.12 L -1.6,-1 L -1.6,-1 Z M -1.6,1 L -1.28,1.12 L -0.95,1.23 L -0.62,1.3 L -0.3,1.33 L 0.03,1.3 L 0.35,1.23 L 0.68,1.12 L 1,1 L 1,1 L 0.68,0.88 L 0.35,0.77 L 0.03,0.7 L -0.3,0.68 L -0.62,0.7 L -0.95,0.77 L -1.28,0.88 L -1.6,1 L -1.6,1 Z" fill="${skin.shadow}"/>
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
            <path d="M 36,63 L 36.33,65.41 L 36.69,67.82 L 37.09,70.21 L 37.56,72.59 L 38.09,74.96 L 38.69,77.32 L 39.33,79.66 L 40,82 L 40,82 L 39.67,79.59 L 39.31,77.18 L 38.91,74.79 L 38.44,72.41 L 37.91,70.04 L 37.31,67.68 L 36.67,65.34 L 36,63 L 36,63 Z M 40,82 L 42.5,82.17 L 45,82.32 L 47.5,82.42 L 50,82.45 L 52.5,82.42 L 55,82.32 L 57.5,82.17 L 60,82 L 60,82 L 57.5,81.83 L 55,81.68 L 52.5,81.58 L 50,81.55 L 47.5,81.58 L 45,81.68 L 42.5,81.83 L 40,82 L 40,82 Z M 60,82 L 60.67,79.66 L 61.31,77.32 L 61.91,74.96 L 62.44,72.59 L 62.91,70.21 L 63.31,67.82 L 63.67,65.41 L 64,63 L 64,63 L 63.33,65.34 L 62.69,67.68 L 62.09,70.04 L 61.56,72.41 L 61.09,74.79 L 60.69,77.18 L 60.33,79.59 L 60,82 L 60,82 Z" fill="#f59e0b"/>
            <!-- Lacets dorés du plastron -->
            <path d="M 47,65 L 47.67,65.49 L 48.35,65.94 L 49.06,66.32 L 49.79,66.62 L 50.56,66.82 L 51.35,66.94 L 52.17,66.99 L 53,67 L 53,67 L 52.33,66.51 L 51.65,66.06 L 50.94,65.68 L 50.21,65.38 L 49.44,65.18 L 48.65,65.06 L 47.83,65.01 L 47,65 L 47,65 Z" fill="#fbbf24"/>
            <path d="M 53,67 L 52.14,67.15 L 51.29,67.34 L 50.48,67.59 L 49.71,67.92 L 48.98,68.34 L 48.29,68.84 L 47.64,69.4 L 47,70 L 47,70 L 47.86,69.85 L 48.71,69.66 L 49.52,69.41 L 50.29,69.08 L 51.02,68.66 L 51.71,68.16 L 52.36,67.6 L 53,67 L 53,67 Z" fill="#fbbf24"/>
            <path d="M 47,73 L 47.67,73.49 L 48.35,73.94 L 49.06,74.32 L 49.79,74.62 L 50.56,74.82 L 51.35,74.94 L 52.17,74.99 L 53,75 L 53,75 L 52.33,74.51 L 51.65,74.06 L 50.94,73.68 L 50.21,73.38 L 49.44,73.18 L 48.65,73.06 L 47.83,73.01 L 47,73 L 47,73 Z" fill="#fbbf24"/>
            <path d="M 53,75 L 52.14,75.15 L 51.29,75.34 L 50.48,75.59 L 49.71,75.92 L 48.98,76.34 L 48.29,76.84 L 47.64,77.4 L 47,78 L 47,78 L 47.86,77.85 L 48.71,77.66 L 49.52,77.41 L 50.29,77.08 L 51.02,76.66 L 51.71,76.16 L 52.36,75.6 L 53,75 L 53,75 Z" fill="#fbbf24"/>
            <!-- Col montant émeraude et feuille dorée -->
            <path d="M44 60.5 L50 67 L56 60.5 Z" fill="#10b981"/>
            <path d="M48 60.5 L50 64 L52 60.5 Z" fill="#f59e0b"/>
        </g>`,
    belt: `
        <g id="outfit-elf-belt">
            <!-- Ceinture cuir patiné à boucle feuille elfique -->
            <path d="M 36.1,84.5 L 37.74,85.43 L 39.41,86.31 L 41.11,87.1 L 42.84,87.78 L 44.61,88.33 L 46.39,88.74 L 48.19,88.99 L 50,89.08 L 51.81,88.99 L 53.61,88.74 L 55.39,88.33 L 57.16,87.78 L 58.89,87.1 L 60.59,86.31 L 62.26,85.43 L 63.9,84.5 L 63.9,84.5 L 62.06,84.13 L 60.26,83.74 L 58.49,83.37 L 56.74,83.02 L 55.03,82.73 L 53.34,82.51 L 51.67,82.37 L 50,82.33 L 48.33,82.37 L 46.66,82.51 L 44.97,82.73 L 43.26,83.02 L 41.51,83.37 L 39.74,83.74 L 37.94,84.13 L 36.1,84.5 L 36.1,84.5 Z" fill="#451a03"/>
            <g transform="translate(0 1.2)"><path d="M 46,84.5 C 47,81 53,81 54,84.5 C 53,88 47,88 46,84.5 Z" fill="#f59e0b" stroke="#361702" stroke-width="0.6"/></g>
            <g transform="translate(0 1.2)"><circle cx="50" cy="84.5" r="1.5" fill="#10b981"/></g>
            <!-- Sacoche d'herboriste avec fiole magique suspendue -->
            <g transform="translate(0 0.38)"><rect x="36" y="83" width="5" height="7" rx="1.2" fill="#6d3811" stroke="#361702" stroke-width="0.7"/></g>
            <g transform="translate(0 0.38)"><circle cx="38.5" cy="86" r="0.8" fill="#fbbf24"/></g>
            <!-- Petite fiole en verre vert -->
            <g transform="translate(0 0.45)"><ellipse cx="61" cy="87" rx="2" ry="3" fill="#34d399" opacity="0.85" stroke="#065f46" stroke-width="0.5"/></g>
            <g transform="translate(0 0.45)"><rect x="60" y="83.5" width="2" height="1.5" rx="0.4" fill="#d97706"/></g>
        </g>`,
    arms: (skin) => `
        <g id="outfit-elf-arms">
            <!-- Bras gauche avec manche verte et brassard en cuir -->
            <path d="M32 64 C24 70, 23 77, 28 83 C31 83, 33 80, 35 76 Z" fill="#1b5e52"/>
            <path d="M26 73 C24 76, 25 80, 29 82 C31 81, 32 78, 32 75 Z" fill="#78350f" stroke="#fbbf24" stroke-width="0.6"/>
            <!-- NOTE Main gauche dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
            <!-- Bras droit avec manche verte et brassard en cuir -->
            <path d="M68 64 C76 69, 78 72, 76 79 C73 81, 70 79, 66 75 Z" fill="#1b5e52"/>
            <path d="M72 69 C75 72, 75 76, 73 78 C70 78, 68 75, 68 72 Z" fill="#78350f" stroke="#fbbf24" stroke-width="0.6"/>
            <!-- NOTE Main droite dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
        </g>`,
    headAccessory: `
        <g id="outfit-elf-head-accessory">
            <!-- Diadème frontal elfique rehaussé avec gemme émeraude -->
            <path d="M 28,26 L 31.52,25.7 L 34.32,25.61 L 37.78,25.47 L 40.52,25.46 L 43.92,25.41 L 46.63,25.41 L 50,25.4 L 53.37,25.41 L 56.08,25.41 L 59.48,25.46 L 62.22,25.47 L 65.68,25.61 L 68.48,25.7 L 72,26 L 72,26 L 68.64,24.86 L 65.95,23.98 L 62.53,23.12 L 59.77,22.5 L 56.3,21.99 L 53.5,21.71 L 50,21.6 L 46.5,21.71 L 43.7,21.99 L 40.23,22.5 L 37.47,23.12 L 34.05,23.98 L 31.36,24.86 L 28,26 L 28,26 Z" fill="#f59e0b"/>
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
                <ellipse cx="0" cy="-3.5" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                <path d="M -1.6,-4.6 L -1.28,-4.48 L -0.95,-4.37 L -0.62,-4.3 L -0.3,-4.27 L 0.03,-4.3 L 0.35,-4.37 L 0.68,-4.48 L 1,-4.6 L 1,-4.6 L 0.68,-4.72 L 0.35,-4.83 L 0.03,-4.9 L -0.3,-4.92 L -0.62,-4.9 L -0.95,-4.83 L -1.28,-4.72 L -1.6,-4.6 L -1.6,-4.6 Z" fill="${skin.shadow}"/>
                <path d="M -1.6,-2.6 L -1.28,-2.48 L -0.95,-2.37 L -0.62,-2.3 L -0.3,-2.27 L 0.03,-2.3 L 0.35,-2.37 L 0.68,-2.48 L 1,-2.6 L 1,-2.6 L 0.68,-2.72 L 0.35,-2.83 L 0.03,-2.9 L -0.3,-2.92 L -0.62,-2.9 L -0.95,-2.83 L -1.28,-2.72 L -1.6,-2.6 L -1.6,-2.6 Z" fill="${skin.shadow}"/>
            </g>

            <!-- Dague elfique droite (main droite à 76, 78 en garde haute vers le haut-droite) -->
            <g id="elf-dagger-right" transform="translate(76, 78) rotate(-152)">
                ${ELF_DAGGER_MODEL}
                <!-- Doigts de la main droite refermés sur la poignée -->
                <ellipse cx="0" cy="-3.5" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                <path d="M -1.6,-4.6 L -1.28,-4.48 L -0.95,-4.37 L -0.62,-4.3 L -0.3,-4.27 L 0.03,-4.3 L 0.35,-4.37 L 0.68,-4.48 L 1,-4.6 L 1,-4.6 L 0.68,-4.72 L 0.35,-4.83 L 0.03,-4.9 L -0.3,-4.92 L -0.62,-4.9 L -0.95,-4.83 L -1.28,-4.72 L -1.6,-4.6 L -1.6,-4.6 Z" fill="${skin.shadow}"/>
                <path d="M -1.6,-2.6 L -1.28,-2.48 L -0.95,-2.37 L -0.62,-2.3 L -0.3,-2.27 L 0.03,-2.3 L 0.35,-2.37 L 0.68,-2.48 L 1,-2.6 L 1,-2.6 L 0.68,-2.72 L 0.35,-2.83 L 0.03,-2.9 L -0.3,-2.92 L -0.62,-2.9 L -0.95,-2.83 L -1.28,-2.72 L -1.6,-2.6 L -1.6,-2.6 Z" fill="${skin.shadow}"/>
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
            <path d="M 24,70 L 23.09,71.38 L 22.23,72.78 L 21.44,74.22 L 20.76,75.69 L 20.19,77.22 L 19.73,78.78 L 19.34,80.38 L 19,82 L 19,82 L 19.91,80.62 L 20.77,79.22 L 21.56,77.78 L 22.24,76.31 L 22.81,74.78 L 23.27,73.22 L 23.66,71.62 L 24,70 L 24,70 Z M 19,82 L 20.07,82.05 L 21.14,82.05 L 22.18,81.97 L 23.19,81.78 L 24.18,81.47 L 25.14,81.05 L 26.07,80.55 L 27,80 L 27,80 L 25.93,79.95 L 24.86,79.95 L 23.82,80.03 L 22.81,80.22 L 21.82,80.53 L 20.86,80.95 L 19.93,81.45 L 19,82 L 19,82 Z M 27,80 L 25.97,81.63 L 24.98,83.28 L 24.07,84.96 L 23.26,86.68 L 22.57,88.46 L 21.98,90.28 L 21.47,92.13 L 21,94 L 21,94 L 22.03,92.37 L 23.02,90.72 L 23.93,89.04 L 24.74,87.32 L 25.43,85.54 L 26.02,83.72 L 26.53,81.87 L 27,80 L 27,80 Z M 21,94 L 22.25,93.78 L 23.48,93.52 L 24.68,93.18 L 25.82,92.73 L 26.93,92.18 L 27.98,91.52 L 29,90.78 L 30,90 L 30,90 L 28.75,90.22 L 27.52,90.48 L 26.32,90.82 L 25.18,91.27 L 24.07,91.82 L 23.02,92.48 L 22,93.22 L 21,94 L 21,94 Z M 30,90 L 29.09,91.65 L 28.22,93.31 L 27.43,95 L 26.75,96.73 L 26.18,98.5 L 25.72,100.31 L 25.34,102.15 L 25,104 L 25,104 L 25.91,102.35 L 26.78,100.69 L 27.57,99 L 28.25,97.27 L 28.82,95.5 L 29.28,93.69 L 29.66,91.85 L 30,90 L 30,90 Z M 25,104 L 26.29,103.5 L 27.56,102.97 L 28.78,102.36 L 29.94,101.67 L 31.03,100.86 L 32.06,99.97 L 33.04,99 L 34,98 L 34,98 L 32.71,98.5 L 31.44,99.03 L 30.22,99.64 L 29.06,100.33 L 27.97,101.14 L 26.94,102.03 L 25.96,103 L 25,104 L 25,104 Z" fill="#542b13"/>
            <path d="M 76,70 L 76.34,71.62 L 76.73,73.22 L 77.19,74.78 L 77.76,76.31 L 78.44,77.78 L 79.23,79.22 L 80.09,80.62 L 81,82 L 81,82 L 80.66,80.38 L 80.27,78.78 L 79.81,77.22 L 79.24,75.69 L 78.56,74.22 L 77.77,72.78 L 76.91,71.38 L 76,70 L 76,70 Z M 81,82 L 80.07,81.45 L 79.14,80.95 L 78.18,80.53 L 77.19,80.22 L 76.18,80.03 L 75.14,79.95 L 74.07,79.95 L 73,80 L 73,80 L 73.93,80.55 L 74.86,81.05 L 75.82,81.47 L 76.81,81.78 L 77.82,81.97 L 78.86,82.05 L 79.93,82.05 L 81,82 L 81,82 Z M 73,80 L 73.47,81.87 L 73.98,83.72 L 74.57,85.54 L 75.26,87.32 L 76.07,89.04 L 76.98,90.72 L 77.97,92.37 L 79,94 L 79,94 L 78.53,92.13 L 78.02,90.28 L 77.43,88.46 L 76.74,86.68 L 75.93,84.96 L 75.02,83.28 L 74.03,81.63 L 73,80 L 73,80 Z M 79,94 L 78,93.22 L 76.98,92.48 L 75.93,91.82 L 74.82,91.27 L 73.68,90.82 L 72.48,90.48 L 71.25,90.22 L 70,90 L 70,90 L 71,90.78 L 72.02,91.52 L 73.07,92.18 L 74.18,92.73 L 75.32,93.18 L 76.52,93.52 L 77.75,93.78 L 79,94 L 79,94 Z M 70,90 L 70.34,91.85 L 70.72,93.69 L 71.18,95.5 L 71.75,97.27 L 72.43,99 L 73.22,100.69 L 74.09,102.35 L 75,104 L 75,104 L 74.66,102.15 L 74.28,100.31 L 73.82,98.5 L 73.25,96.73 L 72.57,95 L 71.78,93.31 L 70.91,91.65 L 70,90 L 70,90 Z M 75,104 L 74.04,103 L 73.06,102.03 L 72.03,101.14 L 70.94,100.33 L 69.78,99.64 L 68.56,99.03 L 67.29,98.5 L 66,98 L 66,98 L 66.96,99 L 67.94,99.97 L 68.97,100.86 L 70.06,101.67 L 71.22,102.36 L 72.44,102.97 L 73.71,103.5 L 75,104 L 75,104 Z" fill="#542b13"/>
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
            <path d="M 36.2,84.75 L 37.8,85.88 L 39.43,86.94 L 41.11,87.91 L 42.83,88.74 L 44.59,89.42 L 46.37,89.93 L 48.18,90.24 L 50,90.34 L 51.82,90.24 L 53.63,89.93 L 55.41,89.42 L 57.17,88.74 L 58.89,87.91 L 60.57,86.94 L 62.2,85.88 L 63.8,84.75 L 63.8,84.75 L 61.95,84.18 L 60.13,83.61 L 58.36,83.06 L 56.63,82.56 L 54.94,82.14 L 53.27,81.82 L 51.63,81.63 L 50,81.56 L 48.37,81.63 L 46.73,81.82 L 45.06,82.14 L 43.37,82.56 L 41.64,83.06 L 39.87,83.61 L 38.05,84.18 L 36.2,84.75 L 36.2,84.75 Z" fill="#292524"/>
            <!-- Rivets en fer forgé -->
            <g transform="translate(0 0.29)"><circle cx="38" cy="84.8" r="1" fill="#94a3b8"/></g>
            <g transform="translate(0 0.8)"><circle cx="42" cy="84.8" r="1" fill="#94a3b8"/></g>
            <g transform="translate(0 0.8)"><circle cx="58" cy="84.8" r="1" fill="#94a3b8"/></g>
            <g transform="translate(0 0.29)"><circle cx="62" cy="84.8" r="1" fill="#94a3b8"/></g>
            <!-- Boucle de ceinture tête de fauve / os -->
            <g transform="translate(0 1.2)"><rect x="46" y="81" width="8" height="7.5" rx="1.5" fill="#fef08a" stroke="#78350f" stroke-width="0.8"/></g>
            <g transform="translate(0 1.2)"><polygon points="48,84 52,84 50,87" fill="#78350f"/></g>
            <!-- Pagne en lambeaux de cuir et fourrure -->
            <g transform="translate(0 1.2)"><polygon points="44,88 56,88 53,95 47,95" fill="#451a03"/></g>
            <g transform="translate(0 1.2)"><polygon points="46,88 54,88 50,94" fill="#542b13"/></g>
        </g>`,
    arms: (skin) => `
        <g id="outfit-orc-arms">
            <!-- Bras orc gauche avec gros brassard en cuir à pointes d'acier -->
            <path d="M32 64 C24 70, 23 77, 28 83 C31 83, 33 80, 35 76 Z" fill="${skin.base}"/>
            <rect x="25" y="73" width="7" height="8" rx="1.2" fill="#292524" stroke="#451a03" stroke-width="0.6" transform="rotate(-15 28 77)"/>
            <polygon points="23,76 25,74 25,78" fill="#e2e8f0" stroke="#475569" stroke-width="0.5"/>
            <polygon points="29,81 31,79 31,83" fill="#e2e8f0" stroke="#475569" stroke-width="0.5"/>
            <!-- NOTE Main gauche dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->

            <!-- Bras orc droit avec brassard clouté -->
            <path d="M68 64 C76 69, 78 72, 76 79 C73 81, 70 79, 66 75 Z" fill="${skin.base}"/>
            <rect x="68" y="70" width="7" height="7.5" rx="1.2" fill="#292524" stroke="#451a03" stroke-width="0.6" transform="rotate(15 71 74)"/>
            <polygon points="76,72 74,70 74,74" fill="#e2e8f0" stroke="#475569" stroke-width="0.5"/>
            <ellipse cx="76" cy="78" rx="3.8" ry="3.5" fill="${skin.base}"/>
            <!-- NOTE Séparations des doigts en fuseau -->
            <path d="M 75,78.3 L 74.81,78.61 L 74.65,78.94 L 74.53,79.28 L 74.48,79.63 L 74.48,79.98 L 74.55,80.33 L 74.66,80.67 L 74.8,81 L 74.8,81 L 74.91,80.66 L 75,80.33 L 75.08,80 L 75.12,79.67 L 75.13,79.35 L 75.1,79.01 L 75.05,78.66 L 75,78.3 L 75,78.3 Z M 77,78.3 L 76.95,78.66 L 76.9,79.01 L 76.87,79.35 L 76.88,79.67 L 76.92,80 L 77,80.33 L 77.09,80.66 L 77.2,81 L 77.2,81 L 77.34,80.67 L 77.45,80.33 L 77.52,79.98 L 77.52,79.63 L 77.47,79.28 L 77.35,78.94 L 77.19,78.61 L 77,78.3 L 77,78.3 Z" fill="${skin.shadow}"/>
        </g>`,
    headAccessory: `
        <g id="outfit-orc-head-accessory">
            <!-- Diadème / Bandeau de guerre en cuir barbare rehaussé sur le haut du front -->
            <path d="M 26,17 L 29.83,16.76 L 32.89,16.74 L 36.66,16.65 L 39.66,16.69 L 43.37,16.68 L 46.32,16.7 L 50,16.7 L 53.68,16.7 L 56.63,16.68 L 60.34,16.69 L 63.34,16.65 L 67.11,16.74 L 70.17,16.76 L 74,17 L 74,17 L 70.33,15.8 L 67.39,14.85 L 63.66,13.93 L 60.66,13.27 L 56.87,12.72 L 53.82,12.42 L 50,12.3 L 46.18,12.42 L 43.13,12.72 L 39.34,13.27 L 36.34,13.93 L 32.61,14.85 L 29.67,15.8 L 26,17 L 26,17 Z" fill="#451a03"/>
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
            <!-- NOTE Croix centrée sur le manche (x=22.17 à y=49) et tournée de son inclinaison (-9.46°) -->
            <g id="orc-axe-lashing" transform="translate(22.17, 49) rotate(-9.46)">
                <!-- Tours de lanière au ras des bords haut et bas de la pierre -->
                <path d="M -2.4,-5.2 L 2.4,-5.6 M -2.4,5.6 L 2.4,5.2" stroke="#b91c1c" stroke-width="1.9" stroke-linecap="round"/>
                <path d="M -2.4,-5.2 L 2.4,-5.6 M -2.4,5.6 L 2.4,5.2" stroke="#78350f" stroke-width="0.9" stroke-linecap="round"/>
                <!-- Croix contenue dans la hauteur de la pierre, entre les deux tours -->
                <path d="M -2.2,-4.2 L 2.2,4.2 M 2.2,-4.2 L -2.2,4.2" stroke="#b91c1c" stroke-width="1.9" stroke-linecap="round"/>
                <path d="M -2.2,-4.2 L 2.2,4.2 M 2.2,-4.2 L -2.2,4.2" stroke="#78350f" stroke-width="0.9" stroke-linecap="round"/>
                <circle cx="0" cy="0" r="1.1" fill="#450a0a" stroke="#78350f" stroke-width="0.4"/>
            </g>

            <!-- Lanières rouges sur la poignée -->
            <line x1="24" y1="75" x2="27" y2="77" stroke="#b91c1c" stroke-width="1.3"/>
            <line x1="25" y1="79" x2="28" y2="81" stroke="#b91c1c" stroke-width="1.3"/>
            <line x1="26" y1="87" x2="29" y2="89" stroke="#b91c1c" stroke-width="1.3"/>
            <line x1="27" y1="91" x2="30" y2="93" stroke="#b91c1c" stroke-width="1.3"/>

            <!-- Doigts orcs refermés sur la poignée de la hache -->
            <ellipse cx="28.5" cy="84" rx="3.6" ry="3.8" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.6"/>
            <path d="M 26,82.5 L 26.5,82.62 L 27,82.73 L 27.5,82.8 L 28,82.83 L 28.5,82.8 L 29,82.73 L 29.5,82.62 L 30,82.5 L 30,82.5 L 29.5,82.38 L 29,82.27 L 28.5,82.2 L 28,82.18 L 27.5,82.2 L 27,82.27 L 26.5,82.38 L 26,82.5 L 26,82.5 Z" fill="${skin.shadow}"/>
            <path d="M 26.5,85.5 L 27,85.62 L 27.5,85.73 L 28,85.8 L 28.5,85.83 L 29,85.8 L 29.5,85.73 L 30,85.62 L 30.5,85.5 L 30.5,85.5 L 30,85.38 L 29.5,85.27 L 29,85.2 L 28.5,85.18 L 28,85.2 L 27.5,85.27 L 27,85.38 L 26.5,85.5 L 26.5,85.5 Z" fill="${skin.shadow}"/>
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
                <path d="M 16,36 C 10,22 14,8 24,0 C 34,-6 66,-6 76,0 C 86,8 90,22 84,36 C 91,48 89,62 85,72 C 80,66 77,62 75,56 C 69,72 63,90 50,92 C 37,90 31,72 25,56 C 23,62 20,66 15,72 C 11,62 9,48 16,36 Z" fill="${color}"/>
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
                <!-- Reflet du sommet, identique au garçon elfe -->
                <path d="M 42,4 C 46,-2 50,-2 54,4 C 52,1 48,1 42,4 Z" fill="#ffffff" opacity="0.3"/>
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
                         C 94,50 97,60 99,68 
                         C 88,67 80,62 76,54 
                         C 72,72 66,88 50,90 
                         C 34,88 28,72 24,54 
                         C 20,62 12,67 1,68 
                         C 3,60 6,50 16,36 Z" fill="${color}"/>
                <!-- Mèches latérales sauvages supplémentaires en blocs obtus larges -->
                <path d="M 14,48 C 6,56 4,68 5,78 C 14,72 21,62 22,52 Z" fill="${color}"/>
                <path d="M 86,48 C 94,56 96,68 95,78 C 86,72 79,62 78,52 Z" fill="${color}"/>
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
    },
    // Coupe Trophée 3 Garçon : coupe courte noble avec mèche héroïque balayée
    paladin_boy: {
        id: 'paladin_boy',
        name: 'Chevalier Solaire (Court à mèche héroïque)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-paladin-boy">
                <ellipse cx="50" cy="26" rx="35" ry="30" fill="${color}"/>
                <!-- Nuque courte en blocs arrondis -->
                <path d="M 18,34 C 12,22 16,8 26,0 C 36,-6 64,-6 74,0 C 84,8 88,22 82,34 C 85,42 82,50 76,54 C 72,49 66,51 60,53 C 56,50 44,50 40,53 C 34,51 28,49 24,54 C 18,50 15,42 18,34 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-paladin-boy">
                <!-- Calotte et frange en mèches pointues balayées vers la gauche -->
                <path d="M 20,30 
                         C 22,14 34,4 50,4 
                         C 66,4 78,14 80,30 
                         C 80,38 79,44 77,48 
                         C 75,42 75,35 74,29 
                         C 73,31 71,33 68,34 
                         C 66,30 64,28 62,27 
                         C 61,31 59,34 56,36 
                         C 54,31 52,29 49,28 
                         C 48,32 46,34 43,35 
                         C 42,31 40,29 37,28 
                         C 35,31 33,33 30,33 
                         C 29,31 28,30 27,30 
                         C 26,36 25,42 23,48 
                         C 21,42 20,36 20,30 Z" fill="${color}"/>
                <!-- Mèches de tempes -->
                <path d="M 22,34 C 19,42 20,48 23,54 C 25,48 25,42 24,36 Z" fill="${color}"/>
                <path d="M 78,34 C 81,42 80,48 77,54 C 75,48 75,42 76,36 Z" fill="${color}"/>
                <!-- Reflet solaire -->
                <path d="M 40,9 C 48,5 58,6 64,10 C 57,9 49,9 40,13 Z" fill="#ffffff" opacity="0.35"/>
            </g>`
    },

    // Coupe Trophée 3 Fille : chevelure longue en blocs arrondis et frange balayée
    paladin_girl: {
        id: 'paladin_girl',
        name: 'Chevalière Solaire (Longue à frange balayée)',
        withTiara: false,
        getHairBack: (color) => `
            <g id="hair-back-paladin-girl">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <!-- Chevelure longue en fuseau, lobes arrondis -->
                <path d="M 16,36 C 10,22 14,8 24,0 C 34,-6 66,-6 76,0 C 86,8 90,22 84,36 C 90,50 89,64 84,74 C 79,70 77,63 75,56 C 71,68 63,82 50,84 C 37,82 29,68 25,56 C 23,63 21,70 16,74 C 11,64 10,50 16,36 Z" fill="${color}"/>
                <!-- Mèches d'épaule en blocs elliptiques -->
                <path d="M 22,42 C 16,52 17,66 23,78 C 27,72 28,62 27,52 Z" fill="${color}"/>
                <path d="M 78,42 C 84,52 83,66 77,78 C 73,72 72,62 73,52 Z" fill="${color}"/>
                <path d="M 40,52 C 38,64 42,76 47,86 C 49,76 48,64 45,54 Z" fill="${color}" opacity="0.9"/>
                <path d="M 60,52 C 62,64 58,76 53,86 C 51,76 52,64 55,54 Z" fill="${color}" opacity="0.9"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-paladin-girl">
                <!-- Calotte et longue frange en mèches pointues balayées vers la gauche -->
                <path d="M 20,30 
                         C 22,14 34,4 50,4 
                         C 66,4 78,14 80,30 
                         C 80,38 78,48 76,56 
                         C 74,48 74,38 75,28 
                         C 73,31 70,34 66,35 
                         C 64,31 62,28 60,26 
                         C 58,31 55,35 50,37 
                         C 48,32 46,29 44,27 
                         C 42,31 39,34 35,35 
                         C 33,32 32,30 31,28 
                         C 29,30 28,31 26,31 
                         C 26,40 26,48 24,56 
                         C 22,48 20,38 20,30 Z" fill="${color}"/>
                <!-- Mèches de tempes longues -->
                <path d="M 22,34 C 19,42 20,52 23,60 C 25,54 25,44 24,36 Z" fill="${color}"/>
                <path d="M 78,34 C 81,42 80,52 77,60 C 75,54 75,44 76,36 Z" fill="${color}"/>
                <!-- Reflet solaire -->
                <path d="M 38,10 C 46,6 56,7 62,11 C 55,10 47,10 38,14 Z" fill="#ffffff" opacity="0.35"/>
            </g>`
    },

    // Coupe Trophée 4 Garçon : ébouriffée en mèches pointues balayées vers la droite
    cat_boy: {
        id: 'cat_boy',
        name: 'Félin Ébouriffé (Court en mèches pointues)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-cat-boy">
                <ellipse cx="50" cy="26" rx="35" ry="30" fill="${color}"/>
                <!-- Piques ébouriffées en arc autour du crâne : 8 blocs larges, pointes obtuses arrondies, longueur et inclinaison alternées -->
                <path d="M 24.85,40.18 Q 14.25,39.99 5.36,31.16 Q 4.22,30.12 5.11,28.88 Q 11.03,24.59 20.63,20.68 Z M 20.08,27.95 Q 11.16,22.84 9,17.76 Q 8.3,16.48 9.57,15.7 Q 16.59,7.94 27.2,9.1 Z M 22.69,15.24 Q 17.64,6.46 19.47,-4.12 Q 19.75,-5.64 21.36,-5.63 Q 30.39,-4.25 39.4,1.68 Z M 32.03,5.18 Q 32.11,-5.1 34.28,-9.24 Q 35.03,-10.56 36.48,-9.98 Q 49.02,-8.99 54.2,0.26 Z M 45.8,0.26 Q 50.98,-8.99 62.99,-13.26 Q 64.5,-13.86 65.37,-12.53 Q 67.89,-5.1 67.97,5.18 Z M 60.6,1.68 Q 69.61,-4.25 76.16,-3.73 Q 77.71,-3.82 77.95,-2.36 Q 82.36,6.46 77.31,15.24 Z M 72.8,9.1 Q 83.41,7.94 93.72,16.27 Q 94.97,17.18 94.24,18.51 Q 88.84,22.84 79.92,27.95 Z M 79.37,20.68 Q 88.97,24.59 91.9,28.67 Q 92.79,29.82 91.67,30.78 Q 85.75,39.99 75.15,40.18 Z" fill="${color}"/>
                <!-- Nuque courte en pointes obtuses -->
                <path d="M 18,34 C 12,22 16,8 26,0 C 36,-6 64,-6 74,0 C 84,8 88,22 82,34 C 86,40 85,48 80,53 C 77,49 74,48 71,50 C 70,47 67,46 64,47 L 36,47 C 33,46 30,47 29,50 C 26,48 23,49 20,53 C 15,48 14,40 18,34 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-cat-boy">
                <!-- Calotte et frange en mèches pointues balayées vers la droite -->
                <path d="M 80,30 C 78,14 66,4 50,4 C 34,4 22,14 20,30 C 20,38 21,44 23,48 C 25,42 25,35 26,29 C 27,31 29,33 32,34 C 34,30 36,28 38,27 C 39,31 41,34 44,36 C 46,31 48,29 51,28 C 52,32 54,34 57,35 C 58,31 60,29 63,28 C 65,31 67,33 70,33 C 71,31 72,30 73,30 C 74,36 75,42 77,48 C 79,42 80,36 80,30 Z" fill="${color}"/>
                <!-- Mèches de tempes -->
                <path d="M 22,34 C 19,42 20,48 23,54 C 25,48 25,42 24,36 Z" fill="${color}"/>
                <path d="M 78,34 C 81,42 80,48 77,54 C 75,48 75,42 76,36 Z" fill="${color}"/>
            </g>`
    },

    // Coupe Trophée 4 Fille : carré félin aux pointes obtuses, frange balayée vers la droite
    cat_girl: {
        id: 'cat_girl',
        name: 'Carré Félin (Frange balayée)',
        withTiara: false,
        getHairBack: (color) => `
            <g id="hair-back-cat-girl">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <!-- Piques ébouriffées en arc autour du crâne : 8 blocs larges, pointes obtuses arrondies, longueur et inclinaison alternées -->
                <path d="M 24.85,40.18 Q 14.25,39.99 5.36,31.16 Q 4.22,30.12 5.11,28.88 Q 11.03,24.59 20.63,20.68 Z M 20.08,27.95 Q 11.16,22.84 9,17.76 Q 8.3,16.48 9.57,15.7 Q 16.59,7.94 27.2,9.1 Z M 22.69,15.24 Q 17.64,6.46 19.47,-4.12 Q 19.75,-5.64 21.36,-5.63 Q 30.39,-4.25 39.4,1.68 Z M 32.03,5.18 Q 32.11,-5.1 34.28,-9.24 Q 35.03,-10.56 36.48,-9.98 Q 49.02,-8.99 54.2,0.26 Z M 45.8,0.26 Q 50.98,-8.99 62.99,-13.26 Q 64.5,-13.86 65.37,-12.53 Q 67.89,-5.1 67.97,5.18 Z M 60.6,1.68 Q 69.61,-4.25 76.16,-3.73 Q 77.71,-3.82 77.95,-2.36 Q 82.36,6.46 77.31,15.24 Z M 72.8,9.1 Q 83.41,7.94 93.72,16.27 Q 94.97,17.18 94.24,18.51 Q 88.84,22.84 79.92,27.95 Z M 79.37,20.68 Q 88.97,24.59 91.9,28.67 Q 92.79,29.82 91.67,30.78 Q 85.75,39.99 75.15,40.18 Z" fill="${color}"/>
                <!-- Silhouette en fuseau : côtés bombés aux joues puis effilés en pointe, mèche centrale descendant derrière la nuque -->
                <path d="M 16,36 C 10,22 14,8 24,0 C 34,-6 66,-6 76,0 C 86,8 90,22 84,36 C 90,48 90,62 82,77 C 79,70 77,62 76,55 C 72,61 68,64 64,65 C 60,70 55,75 50,79 C 45,75 40,70 36,65 C 32,64 28,61 24,55 C 23,62 21,70 18,77 C 10,62 10,48 16,36 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-cat-girl">
                <!-- Calotte et longue frange en mèches pointues balayées vers la droite -->
                <path d="M 80,30 C 78,14 66,4 50,4 C 34,4 22,14 20,30 C 20,38 22,48 24,56 C 26,48 26,38 25,28 C 27,31 30,34 34,35 C 36,31 38,28 40,26 C 42,31 45,35 50,37 C 52,32 54,29 56,27 C 58,31 61,34 65,35 C 67,32 68,30 69,28 C 71,30 72,31 74,31 C 74,40 74,48 76,56 C 78,48 80,38 80,30 Z" fill="${color}"/>
                <!-- Mèches de tempes longues et pointues -->
                <path d="M 22,34 C 18,44 19,54 24,62 C 26,54 26,44 24,36 Z" fill="${color}"/>
                <path d="M 78,34 C 82,44 81,54 76,62 C 74,54 74,44 76,36 Z" fill="${color}"/>
            </g>`
    },

    // Coupe Trophée 5 Garçon : Mi-long ténébreux à mèches effilées
    shadow_boy: {
        id: 'shadow_boy',
        name: 'Mi-long Ténébreux (Mage Noir)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-shadow-boy">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <path d="M 18,36 C 12,48 14,64 22,72 C 26,66 26,56 26,48 Z" fill="${color}"/>
                <path d="M 82,36 C 88,48 86,64 78,72 C 74,66 74,56 74,48 Z" fill="${color}"/>
                <path d="M 28,48 C 26,62 30,76 36,80 C 38,72 38,62 37,52 Z" fill="${color}"/>
                <path d="M 72,48 C 74,62 70,76 64,80 C 62,72 62,62 63,52 Z" fill="${color}"/>
                <path d="M 40,54 C 42,68 46,78 50,82 C 54,78 58,68 60,54 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-shadow-boy">
                <path d="M 20,30 
                         C 22,14 34,4 50,4 
                         C 66,4 78,14 80,30 
                         C 80,38 78,48 76,54 
                         C 74,46 74,36 74,28 
                         C 70,30 66,35 60,33 
                         C 55,31 54,26 52,22 
                         C 50,28 46,38 38,36 
                         C 32,34 30,28 28,26 
                         C 26,34 26,44 24,54 
                         C 22,48 20,38 20,30 Z" fill="${color}"/>
                <path d="M 23,32 C 20,40 22,48 24,54 C 25,48 26,40 25,34 Z" fill="${color}"/>
                <path d="M 77,32 C 80,40 78,48 76,54 C 75,48 74,40 75,34 Z" fill="${color}"/>
            </g>`
    },

    // Coupe Trophée 5 Fille : Longue chevelure de sorcière ondulée spectrale
    shadow_girl: {
        id: 'shadow_girl',
        name: 'Ondulé Sombre en Cascade (Sorcière)',
        withTiara: false,
        getHairBack: (color) => `
            <g id="hair-back-shadow-girl">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <path d="M 15,36 
                         C 8,24 12,8 24,0 
                         C 34,-6 66,-6 76,0 
                         C 88,8 92,24 85,36 
                         C 93,52 90,70 85,86 
                         C 80,78 77,72 74,62 
                         C 68,78 61,94 50,96 
                         C 39,94 32,78 26,62 
                         C 23,72 20,78 15,86 
                         C 10,70 7,52 15,36 Z" fill="${color}"/>
                <path d="M 22,42 C 16,56 16,74 23,88 C 26,82 27,72 26,60 Z" fill="${color}"/>
                <path d="M 78,42 C 84,56 84,74 77,88 C 74,82 73,72 74,60 Z" fill="${color}"/>
                <path d="M 27,52 C 24,68 28,84 34,92 C 35,82 34,70 32,58 Z" fill="${color}"/>
                <path d="M 73,52 C 76,68 72,84 66,92 C 65,82 66,70 68,58 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-shadow-girl">
                <path d="M 20,30 
                         C 22,14 34,4 50,4 
                         C 66,4 78,14 80,30 
                         C 80,38 78,46 76,56 
                         C 74,48 74,38 75,28 
                         C 71,32 66,35 61,34 
                         C 57,33 55,28 54,24 
                         C 52,28 48,37 42,38 
                         C 37,35 34,29 32,25 
                         C 29,30 27,33 25,28 
                         C 26,38 26,48 24,56 
                         C 22,48 20,38 20,30 Z" fill="${color}"/>
                <path d="M 22,34 C 18,44 20,56 24,64 C 25,56 25,46 24,36 Z" fill="${color}"/>
                <path d="M 78,34 C 82,44 80,56 76,64 C 75,56 75,46 76,36 Z" fill="${color}"/>
            </g>`
    }
};

// Épée longue du paladin, modélisée sur l'axe X=0 (poignée vers +Y, lame vers -Y)
const PALADIN_SWORD_MODEL = `
    <!-- Pommeau solaire -->
    <circle cx="0" cy="6.2" r="1.6" fill="#fbbf24" stroke="#b45309" stroke-width="0.4"/>
    <!-- Fusée gainée de cuir -->
    <rect x="-1" y="0" width="2" height="5" rx="0.5" fill="#78350f"/>
    <!-- Quillons droits dorés -->
    <rect x="-5" y="-1.4" width="10" height="1.8" rx="0.8" fill="#fbbf24" stroke="#b45309" stroke-width="0.4"/>
    <!-- Lame d'acier : deux pans pour le relief, gouttière centrale -->
    <path d="M 0,-1.4 L -1.7,-1.4 L -1.7,-26 L 0,-30 Z" fill="#cbd5e1"/>
    <path d="M 0,-1.4 L 1.7,-1.4 L 1.7,-26 L 0,-30 Z" fill="#f1f5f9"/>
    <path d="M 0,-2.5 L 0.11,-4.56 L 0.21,-6.97 L 0.28,-9.03 L 0.33,-11.44 L 0.35,-13.5 L 0.33,-15.56 L 0.28,-17.97 L 0.21,-20.03 L 0.11,-22.44 L 0,-24.5 L 0,-24.5 L -0.11,-22.44 L -0.21,-20.03 L -0.28,-17.97 L -0.33,-15.56 L -0.35,-13.5 L -0.33,-11.44 L -0.28,-9.03 L -0.21,-6.97 L -0.11,-4.56 L 0,-2.5 L 0,-2.5 Z" fill="#94a3b8"/>
`;

// Bouclier solaire du paladin, modélisé symétrique sur l'axe X=0 (pointe vers +Y)
const PALADIN_SHIELD_MODEL = `
    <path d="M -9.5,0 L 9.5,0 C 9.5,11 6,18 0,23 C -6,18 -9.5,11 -9.5,0 Z" fill="#fbbf24"/>
    <path d="M -7.8,1.6 L 7.8,1.6 C 7.8,10.5 5,16.5 0,20.6 C -5,16.5 -7.8,10.5 -7.8,1.6 Z" fill="#f8fafc"/>
    <!-- Soleil d'or au centre -->
    <polygon points="3.4,9.9 6,9 3.4,8.1" fill="#ea580c"/>
            <polygon points="1.77,12.04 4.24,13.24 3.04,10.77" fill="#ea580c"/>
            <polygon points="-0.9,12.4 0,15 0.9,12.4" fill="#ea580c"/>
            <polygon points="-3.04,10.77 -4.24,13.24 -1.77,12.04" fill="#ea580c"/>
            <polygon points="-3.4,8.1 -6,9 -3.4,9.9" fill="#ea580c"/>
            <polygon points="-1.77,5.96 -4.24,4.76 -3.04,7.23" fill="#ea580c"/>
            <polygon points="0.9,5.6 0,3 -0.9,5.6" fill="#ea580c"/>
            <polygon points="3.04,7.23 4.24,4.76 1.77,5.96" fill="#ea580c"/>
    <circle cx="0" cy="9" r="3.2" fill="#fde047" stroke="#b45309" stroke-width="0.5"/>
    <circle cx="-0.9" cy="8.1" r="0.9" fill="#ffffff" opacity="0.8"/>
`;

export const OUTFIT_PALADIN_LIGHT = {
    id: 'paladin_light',
    name: 'Paladin de Lumière (Humain)',
    badge: 'Trophée 3',
    // Cape ardoise (nettement plus sombre que l'armure acier #cbd5e1) à liseré or
    backEquipment: `
        <g id="outfit-paladin-back">
            <path d="M 33,65 C 25,76 21,96 25,110 C 35,113 42,109 50,111 C 58,109 65,113 75,110 C 79,96 75,76 67,65 Z" fill="#334155"/>
            <path d="M 36,68 C 29,80 27,98 30,107 C 39,110 45,106 50,108 C 55,106 61,110 70,107 C 73,98 71,80 64,68 Z" fill="#1e293b" opacity="0.6"/>
            <!-- Liseré or de l'ourlet -->
            <path d="M 25,110 L 27.26,110.72 L 29.88,111.27 L 32.4,111.56 L 34.83,111.65 L 37.55,111.58 L 40.18,111.42 L 42.72,111.29 L 44.85,111.27 L 47.31,111.43 L 49.78,111.87 L 52.69,111.43 L 55.15,111.27 L 57.28,111.29 L 59.82,111.42 L 62.45,111.58 L 65.17,111.65 L 67.6,111.56 L 70.12,111.27 L 72.74,110.72 L 75,110 L 75,110 L 72.68,110.44 L 70.06,110.72 L 67.58,110.74 L 65.22,110.6 L 62.56,110.31 L 59.96,109.97 L 57.38,109.69 L 55.15,109.56 L 52.5,109.66 L 50.22,110.13 L 47.5,109.66 L 44.85,109.56 L 42.62,109.69 L 40.04,109.97 L 37.44,110.31 L 34.78,110.6 L 32.42,110.74 L 29.94,110.72 L 27.32,110.44 L 25,110 L 25,110 Z" fill="#fbbf24"/>
        </g>`,
    legs: (skin) => `
        <g id="outfit-paladin-legs">
            <!-- Cuissards en cotte de mailles -->
            <polygon points="39,85 49,85 48,97 41,97" fill="#94a3b8"/>
            <polygon points="51,85 61,85 59,97 52,97" fill="#94a3b8"/>
            <!-- Jambières d'acier et genouillères -->
            <polygon points="40,97 48.5,97 48,106 41,106" fill="#cbd5e1"/>
            <polygon points="51.5,97 60,97 59,106 52,106" fill="#cbd5e1"/>
            <ellipse cx="44.5" cy="97.5" rx="4.3" ry="2.4" fill="#e2e8f0"/>
            <ellipse cx="55.5" cy="97.5" rx="4.3" ry="2.4" fill="#e2e8f0"/>
            <circle cx="44.5" cy="97.5" r="0.9" fill="#fbbf24"/>
            <circle cx="55.5" cy="97.5" r="0.9" fill="#fbbf24"/>
            <!-- Solerets d'acier -->
            <path d="M39.5 106 C39.5 104, 49.5 104, 49.5 106 L50 113 C50 115, 39 115, 39 113 Z" fill="#94a3b8"/>
            <path d="M38.5 112 L50.5 112 L50 114 L39 114 Z" fill="#475569"/>
            <path d="M50.5 106 C50.5 104, 60.5 104, 60.5 106 L61 113 C61 115, 50 115, 50 113 Z" fill="#94a3b8"/>
            <path d="M49.5 112 L61.5 112 L61 114 L50 114 Z" fill="#475569"/>
            <path d="M 40,107.5 L 41.13,107.73 L 42.25,107.92 L 43.38,108.05 L 44.5,108.1 L 45.63,108.05 L 46.75,107.92 L 47.88,107.73 L 49,107.5 L 49,107.5 L 47.88,107.27 L 46.75,107.08 L 45.63,106.95 L 44.5,106.9 L 43.38,106.95 L 42.25,107.08 L 41.13,107.27 L 40,107.5 L 40,107.5 Z" fill="#fbbf24"/>
            <path d="M 51,107.5 L 52.13,107.73 L 53.25,107.92 L 54.38,108.05 L 55.5,108.1 L 56.63,108.05 L 57.75,107.92 L 58.88,107.73 L 60,107.5 L 60,107.5 L 58.88,107.27 L 57.75,107.08 L 56.63,106.95 L 55.5,106.9 L 54.38,106.95 L 53.25,107.08 L 52.13,107.27 L 51,107.5 L 51,107.5 Z" fill="#fbbf24"/>
        </g>`,
    body: `
        <g id="outfit-paladin-body">
            <!-- Cuirasse d'acier -->
            <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 62,61.5 C 66,61.5 69,62 69,65 L 63.5,86 L 36.5,86 Z" fill="#cbd5e1"/>
            <path d="M 34,64 C 35,63 37,62.5 40,62.5 L 42,62.5 L 41,80 L 37.5,80 Z" fill="#f1f5f9" opacity="0.7"/>
            <!-- Tabard blanc à liserés or -->
            <path d="M 42,62 L 58,62 L 57,86 L 43,86 Z" fill="#f8fafc"/>
            <path d="M 42,62 L 41.88,65.01 L 41.79,68.02 L 41.77,71.03 L 41.85,74.03 L 42.02,77.03 L 42.29,80.02 L 42.63,83.01 L 43,86 L 43,86 L 43.12,82.99 L 43.21,79.98 L 43.23,76.97 L 43.15,73.97 L 42.98,70.97 L 42.71,67.98 L 42.37,64.99 L 42,62 L 42,62 Z" fill="#fbbf24"/>
            <path d="M 58,62 L 57.63,64.99 L 57.29,67.98 L 57.02,70.97 L 56.85,73.97 L 56.77,76.97 L 56.79,79.98 L 56.88,82.99 L 57,86 L 57,86 L 57.37,83.01 L 57.71,80.02 L 57.98,77.03 L 58.15,74.03 L 58.23,71.03 L 58.21,68.02 L 58.12,65.01 L 58,62 L 58,62 Z" fill="#fbbf24"/>
            <!-- Soleil d'or brodé -->
            <polygon points="53,72.8 55.2,72 53,71.2" fill="#ea580c"/>
            <polygon points="51.56,74.69 53.68,75.68 52.69,73.56" fill="#ea580c"/>
            <polygon points="49.2,75 50,77.2 50.8,75" fill="#ea580c"/>
            <polygon points="47.31,73.56 46.32,75.68 48.44,74.69" fill="#ea580c"/>
            <polygon points="47,71.2 44.8,72 47,72.8" fill="#ea580c"/>
            <polygon points="48.44,69.31 46.32,68.32 47.31,70.44" fill="#ea580c"/>
            <polygon points="50.8,69 50,66.8 49.2,69" fill="#ea580c"/>
            <polygon points="52.69,70.44 53.68,68.32 51.56,69.31" fill="#ea580c"/>
            <circle cx="50" cy="72" r="2.8" fill="#fde047" stroke="#b45309" stroke-width="0.5"/>
            <!-- Gorgerin d'acier -->
            <path d="M 43,60.5 L 50,64.5 L 57,60.5 L 57,62.5 L 50,66.5 L 43,62.5 Z" fill="#94a3b8"/>
        </g>`,
    belt: `
        <g id="outfit-paladin-belt">
            <!-- Ceinture de cuir ajustée à la taille, boucle solaire centrée sur la courbe -->
            <path d="M 36.1,84.5 L 37.74,85.43 L 39.41,86.31 L 41.11,87.1 L 42.84,87.78 L 44.61,88.33 L 46.39,88.74 L 48.19,88.99 L 50,89.08 L 51.81,88.99 L 53.61,88.74 L 55.39,88.33 L 57.16,87.78 L 58.89,87.1 L 60.59,86.31 L 62.26,85.43 L 63.9,84.5 L 63.9,84.5 L 62.06,84.13 L 60.26,83.74 L 58.49,83.37 L 56.74,83.02 L 55.03,82.73 L 53.34,82.51 L 51.67,82.37 L 50,82.33 L 48.33,82.37 L 46.66,82.51 L 44.97,82.73 L 43.26,83.02 L 41.51,83.37 L 39.74,83.74 L 37.94,84.13 L 36.1,84.5 L 36.1,84.5 Z" fill="#78350f"/>
            <g transform="translate(0 1.2)"><circle cx="50" cy="84.5" r="2.4" fill="#fbbf24" stroke="#b45309" stroke-width="0.5"/></g>
            <g transform="translate(0 1.2)"><circle cx="50" cy="84.5" r="0.9" fill="#fef9c3"/></g>
        </g>`,
    arms: (skin) => `
        <g id="outfit-paladin-arms">
            <!-- Bras gauche : maille, canon d'avant-bras et main -->
            <path d="M32 64 C24 70, 23 77, 28 83 C31 83, 33 80, 35 76 Z" fill="#94a3b8"/>
            <path d="M26 73 C24 76, 25 80, 29 82 C31 81, 32 78, 32 75 Z" fill="#cbd5e1"/>
            <ellipse cx="29" cy="84" rx="3.6" ry="3.3" fill="${skin.base}"/>
            <!-- NOTE Séparations des doigts en fuseau -->
            <path d="M 28,84.3 L 27.81,84.59 L 27.65,84.89 L 27.53,85.2 L 27.48,85.52 L 27.48,85.85 L 27.55,86.17 L 27.66,86.49 L 27.8,86.8 L 27.8,86.8 L 27.91,86.48 L 28,86.17 L 28.08,85.87 L 28.12,85.58 L 28.13,85.27 L 28.1,84.96 L 28.05,84.64 L 28,84.3 L 28,84.3 Z M 30,84.3 L 29.95,84.64 L 29.9,84.96 L 29.87,85.27 L 29.88,85.58 L 29.92,85.87 L 30,86.17 L 30.09,86.48 L 30.2,86.8 L 30.2,86.8 L 30.34,86.49 L 30.45,86.17 L 30.52,85.85 L 30.52,85.52 L 30.47,85.2 L 30.35,84.89 L 30.19,84.59 L 30,84.3 L 30,84.3 Z" fill="${skin.shadow}"/>
            <!-- Bras droit -->
            <path d="M68 64 C76 69, 78 72, 76 79 C73 81, 70 79, 66 75 Z" fill="#94a3b8"/>
            <path d="M72 69 C75 72, 75 76, 73 78 C70 78, 68 75, 68 72 Z" fill="#cbd5e1"/>
            <!-- NOTE Main droite dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
            <!-- Épaulières bombées à liseré or -->
            <path d="M 25,68 C 24,62 30,58.5 37,61 C 39,62.5 38.5,65.5 36.5,67 C 33,69.5 28,70 25,68 Z" fill="#e2e8f0"/>
            <path d="M 25,68 L 25.97,68.75 L 27.13,69.33 L 28.42,69.7 L 29.61,69.85 L 31.03,69.79 L 32.25,69.55 L 33.43,69.12 L 34.55,68.54 L 35.58,67.82 L 36.5,67 L 36.5,67 L 35.38,67.48 L 34.24,67.84 L 33.1,68.12 L 31.98,68.34 L 30.87,68.5 L 29.6,68.62 L 28.53,68.66 L 27.31,68.59 L 26.13,68.38 L 25,68 L 25,68 Z" fill="#fbbf24"/>
            <path d="M 75,68 C 76,62 70,58.5 63,61 C 61,62.5 61.5,65.5 63.5,67 C 67,69.5 72,70 75,68 Z" fill="#e2e8f0"/>
            <path d="M 75,68 L 73.87,68.38 L 72.69,68.59 L 71.47,68.66 L 70.4,68.62 L 69.13,68.5 L 68.02,68.34 L 66.9,68.12 L 65.76,67.84 L 64.62,67.48 L 63.5,67 L 63.5,67 L 64.42,67.82 L 65.45,68.54 L 66.57,69.12 L 67.75,69.55 L 68.97,69.79 L 70.39,69.85 L 71.58,69.7 L 72.87,69.33 L 74.03,68.75 L 75,68 L 75,68 Z" fill="#fbbf24"/>
        </g>`,
    headAccessory: `
        <g id="outfit-paladin-head-accessory">
            <!-- Diadème ardoise (teinte de la cape) en fuseau, épais au front, fin aux tempes, contraste avec la chevelure Or Solaire -->
            <path d="M 28,26 L 31.52,25.7 L 34.32,25.61 L 37.78,25.47 L 40.52,25.46 L 43.92,25.41 L 46.63,25.41 L 50,25.4 L 53.37,25.41 L 56.08,25.41 L 59.48,25.46 L 62.22,25.47 L 65.68,25.61 L 68.48,25.7 L 72,26 L 72,26 L 68.64,24.86 L 65.95,23.98 L 62.53,23.12 L 59.77,22.5 L 56.3,21.99 L 53.5,21.71 L 50,21.6 L 46.5,21.71 L 43.7,21.99 L 40.23,22.5 L 37.47,23.12 L 34.05,23.98 L 31.36,24.86 L 28,26 L 28,26 Z" fill="#475569"/>
            <polygon points="52.4,21.25 54.6,20.5 52.4,19.75" fill="#ea580c"/>
            <polygon points="51.17,22.73 53.25,23.75 52.23,21.67" fill="#ea580c"/>
            <polygon points="49.25,22.9 50,25.1 50.75,22.9" fill="#ea580c"/>
            <polygon points="47.77,21.67 46.75,23.75 48.83,22.73" fill="#ea580c"/>
            <polygon points="47.6,19.75 45.4,20.5 47.6,21.25" fill="#ea580c"/>
            <polygon points="48.83,18.27 46.75,17.25 47.77,19.33" fill="#ea580c"/>
            <polygon points="50.75,18.1 50,15.9 49.25,18.1" fill="#ea580c"/>
            <polygon points="52.23,19.33 53.25,17.25 51.17,18.27" fill="#ea580c"/>
            <circle cx="50" cy="20.5" r="2.4" fill="#fde047" stroke="#b45309" stroke-width="0.5"/>
            <circle cx="49.3" cy="19.8" r="0.7" fill="#ffffff"/>
        </g>`,
    handItem: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
        <g id="outfit-paladin-hand-items">
            <!-- Épée longue tenue droite dans la main droite (76, 79) -->
            <g id="paladin-sword" transform="translate(76, 79) rotate(12)">
                ${PALADIN_SWORD_MODEL}
                <ellipse cx="0" cy="2.5" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                <path d="M -1.6,1.5 L -1.28,1.62 L -0.95,1.73 L -0.62,1.8 L -0.3,1.83 L 0.03,1.8 L 0.35,1.73 L 0.68,1.62 L 1,1.5 L 1,1.5 L 0.68,1.38 L 0.35,1.27 L 0.03,1.2 L -0.3,1.18 L -0.62,1.2 L -0.95,1.27 L -1.28,1.38 L -1.6,1.5 L -1.6,1.5 Z" fill="${skin.shadow}"/>
                <path d="M -1.6,3.5 L -1.28,3.62 L -0.95,3.73 L -0.62,3.8 L -0.3,3.83 L 0.03,3.8 L 0.35,3.73 L 0.68,3.62 L 1,3.5 L 1,3.5 L 0.68,3.38 L 0.35,3.27 L 0.03,3.2 L -0.3,3.18 L -0.62,3.2 L -0.95,3.27 L -1.28,3.38 L -1.6,3.5 L -1.6,3.5 Z" fill="${skin.shadow}"/>
            </g>
            <!-- Bouclier solaire au bras gauche (main en 29, 84) -->
            <g id="paladin-shield" transform="translate(25, 72) rotate(-6)">
                ${PALADIN_SHIELD_MODEL}
            </g>
        </g>`
};


// ANCHOR Tenue du trophée 4 : voleuse féline, base archère en cuir sombre, accents lilas, pattes griffues
export const OUTFIT_CAT_THIEF = {
    id: 'cat_thief',
    name: 'Voleuse Féline (Chat)',
    badge: 'Trophée 4',
    // NOTE Pas de cape : la queue de chat est un trait d'espèce (getCatTail), dessinée derrière le corps
    backEquipment: '',
    legs: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
        <g id="outfit-cat-legs">
            <!-- Short de cuir noir -->
            <polygon points="38,82 49.5,82 49,93 37.5,93" fill="#18181b"/>
            <polygon points="50.5,82 62,82 62.5,93 51,93" fill="#18181b"/>
            <path d="M 38.5,92 L 39.42,92.27 L 40.51,92.52 L 41.45,92.7 L 42.55,92.81 L 43.5,92.85 L 44.45,92.81 L 45.55,92.7 L 46.49,92.52 L 47.58,92.27 L 48.5,92 L 48.5,92 L 47.54,92 L 46.44,92 L 45.51,91.97 L 44.42,91.96 L 43.5,91.95 L 42.58,91.96 L 41.49,91.97 L 40.56,92 L 39.46,92 L 38.5,92 L 38.5,92 Z M 51.5,92 L 52.42,92.27 L 53.51,92.52 L 54.45,92.7 L 55.55,92.81 L 56.5,92.85 L 57.45,92.81 L 58.55,92.7 L 59.49,92.52 L 60.58,92.27 L 61.5,92 L 61.5,92 L 60.54,92 L 59.44,92 L 58.51,91.97 L 57.42,91.96 L 56.5,91.95 L 55.58,91.96 L 54.49,91.97 L 53.56,92 L 52.46,92 L 51.5,92 L 51.5,92 Z" fill="#a78bfa"/>
            <!-- Jambes nues -->
            <polygon points="39,93 48.5,93 48,104 41,104" fill="${skin.base}"/>
            <polygon points="51.5,93 61,93 59,104 52,104" fill="${skin.base}"/>
            <!-- Bottines souples de voleuse à revers lilas -->
            <path d="M39.5 104 C39.5 102, 49.5 102, 49.5 104 L50 113 C50 115, 39 115, 39 113 Z" fill="#27272a"/>
            <rect x="39" y="103" width="10.5" height="3" rx="0.8" fill="#3f3f46"/>
            <path d="M 39.5,104.5 L 40.41,104.84 L 41.49,105.15 L 42.43,105.36 L 43.54,105.51 L 44.5,105.55 L 45.46,105.51 L 46.57,105.36 L 47.51,105.15 L 48.59,104.84 L 49.5,104.5 L 49.5,104.5 L 48.54,104.53 L 47.43,104.56 L 46.5,104.56 L 45.42,104.56 L 44.5,104.55 L 43.58,104.56 L 42.5,104.56 L 41.57,104.56 L 40.46,104.53 L 39.5,104.5 L 39.5,104.5 Z" fill="#a78bfa"/>
            <path d="M50.5 104 C50.5 102, 60.5 102, 60.5 104 L61 113 C61 115, 50 115, 50 113 Z" fill="#27272a"/>
            <rect x="50.5" y="103" width="10.5" height="3" rx="0.8" fill="#3f3f46"/>
            <path d="M 51,104.5 L 51.91,104.84 L 52.99,105.15 L 53.93,105.36 L 55.04,105.51 L 56,105.55 L 56.96,105.51 L 58.07,105.36 L 59.01,105.15 L 60.09,104.84 L 61,104.5 L 61,104.5 L 60.04,104.53 L 58.93,104.56 L 58,104.56 L 56.92,104.56 L 56,104.55 L 55.08,104.56 L 54,104.56 L 53.07,104.56 L 51.96,104.53 L 51,104.5 L 51,104.5 Z" fill="#a78bfa"/>
        </g>`,
    body: `
        <g id="outfit-cat-body">
            <!-- Haut de cuir sans manches anthracite -->
            <path d="M 33,65 C 33,62 36,61.5 39,61.5 L 61,61.5 C 64,61.5 67,62 67,65 L 62.5,82 L 37.5,82 Z" fill="#27272a"/>
            <!-- Coutures latérales en fuseau -->
            <path d="M 39,64 L 38.8,65.5 L 38.63,67.25 L 38.52,68.75 L 38.48,70.51 L 38.5,72.02 L 38.59,73.52 L 38.77,75.28 L 38.99,76.77 L 39.29,78.52 L 39.6,80 L 39.6,80 L 39.56,78.48 L 39.51,76.73 L 39.49,75.22 L 39.45,73.48 L 39.4,71.98 L 39.33,70.49 L 39.25,68.75 L 39.16,67.25 L 39.08,65.5 L 39,64 L 39,64 Z M 61,64 L 60.92,65.5 L 60.84,67.25 L 60.75,68.75 L 60.67,70.49 L 60.6,71.98 L 60.55,73.48 L 60.51,75.22 L 60.49,76.73 L 60.44,78.48 L 60.4,80 L 60.4,80 L 60.71,78.52 L 61.01,76.77 L 61.23,75.28 L 61.41,73.52 L 61.5,72.02 L 61.52,70.51 L 61.48,68.75 L 61.37,67.25 L 61.2,65.5 L 61,64 L 61,64 Z" fill="#52525b"/>
            <!-- Emblème patte de chat lilas -->
            <ellipse cx="50" cy="73.2" rx="2.1" ry="1.7" fill="#a78bfa"/><ellipse cx="47.80" cy="70.60" rx="0.75" ry="0.95" fill="#a78bfa"/><ellipse cx="49.20" cy="69.40" rx="0.75" ry="0.95" fill="#a78bfa"/><ellipse cx="50.80" cy="69.40" rx="0.75" ry="0.95" fill="#a78bfa"/><ellipse cx="52.20" cy="70.60" rx="0.75" ry="0.95" fill="#a78bfa"/>
            <!-- Foulard de voleuse violet nuit et grelot doré -->
            <path d="M 41,61 C 44,64.5 56,64.5 59,61 L 57,60 C 54,62.5 46,62.5 43,60 Z" fill="#4c1d95"/>
            <path d="M 42.5,61.4 L 43.87,62.06 L 45.25,62.6 L 46.9,63.05 L 48.32,63.3 L 50,63.4 L 51.68,63.3 L 53.1,63.05 L 54.75,62.6 L 56.13,62.06 L 57.5,61.4 L 57.5,61.4 L 56.05,61.83 L 54.63,62.15 L 52.99,62.42 L 51.61,62.54 L 50,62.6 L 48.39,62.54 L 47.01,62.42 L 45.37,62.15 L 43.95,61.83 L 42.5,61.4 L 42.5,61.4 Z" fill="#6d28d9"/>
            <circle cx="50" cy="65" r="1.9" fill="#fbbf24" stroke="#b45309" stroke-width="0.4"/>
            <path d="M 48.6,65.4 L 48.84,65.56 L 49.14,65.71 L 49.4,65.81 L 49.68,65.88 L 50,65.9 L 50.32,65.88 L 50.6,65.81 L 50.86,65.71 L 51.16,65.56 L 51.4,65.4 L 51.4,65.4 L 51.12,65.41 L 50.8,65.42 L 50.54,65.41 L 50.29,65.4 L 50,65.4 L 49.71,65.4 L 49.46,65.41 L 49.2,65.42 L 48.88,65.41 L 48.6,65.4 L 48.6,65.4 Z" fill="#78350f"/>
            <circle cx="49.4" cy="64.4" r="0.5" fill="#ffffff" opacity="0.8"/>
        </g>`,
    belt: `
        <g id="outfit-cat-belt">
            <!-- Ceinture ajustée à la taille mesurée (38 à 62), boucle et sacoche recentrées sur sa courbe -->
            <path d="M 38,82.5 L 40.15,83.53 L 42.73,84.46 L 44.99,85.13 L 47.68,85.58 L 50,85.73 L 52.32,85.58 L 55.01,85.13 L 57.27,84.46 L 59.85,83.53 L 62,82.5 L 62,82.5 L 59.65,82.29 L 56.98,82.09 L 54.74,81.87 L 52.18,81.73 L 50,81.68 L 47.82,81.73 L 45.26,81.87 L 43.02,82.09 L 40.35,82.29 L 38,82.5 L 38,82.5 Z" fill="#3f2a1d"/>
            <g transform="translate(0 1.2)"><rect x="48.4" y="81.2" width="3.2" height="2.6" rx="0.6" fill="#d4d4d8" stroke="#52525b" stroke-width="0.4"/></g>
            <g transform="translate(0 0.79)"><rect x="55.2" y="82" width="3.8" height="4.2" rx="0.8" fill="#4a3426"/><path d="M 55.4,83.2 L 55.69,83.39 L 56.05,83.57 L 56.37,83.69 L 56.71,83.77 L 57.1,83.8 L 57.49,83.77 L 57.83,83.69 L 58.15,83.57 L 58.51,83.39 L 58.8,83.2 L 58.8,83.2 L 58.46,83.21 L 58.07,83.22 L 57.76,83.21 L 57.45,83.2 L 57.1,83.2 L 56.75,83.2 L 56.44,83.21 L 56.13,83.22 L 55.74,83.21 L 55.4,83.2 L 55.4,83.2 Z" fill="#a78bfa"/></g>
        </g>`,
    arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
        <g id="outfit-cat-arms">
            <!-- Bras nus ; brassards de cuir noir calés sur les avant-bras -->
            <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="${skin.base}"/>
            <!-- Brassard gauche épousant les bords de l'avant-bras au poignet, liseré lilas en fuseau sur le haut -->
            <path d="M 25.64,73.32 L 25.49,75.11 L 25.54,76.96 L 25.8,79.05 L 26.62,81.2 L 27.24,81.84 L 28.22,81.65 L 29.17,81.22 L 30.06,80.57 L 30.89,79.75 Z" fill="#18181b"/>
            <path d="M 25.64,73.32 L 26.03,74.08 L 26.44,74.82 L 26.86,75.53 L 27.31,76.2 L 27.79,76.84 L 28.39,77.53 L 28.92,78.07 L 29.57,78.67 L 30.23,79.23 L 30.89,79.75 L 30.89,79.75 L 30.41,79.06 L 29.92,78.36 L 29.41,77.65 L 28.97,77.04 L 28.41,76.33 L 27.91,75.73 L 27.38,75.14 L 26.81,74.54 L 26.23,73.94 L 25.64,73.32 L 25.64,73.32 Z" fill="#a78bfa"/>
            <path d="M67 63 C74 66.5, 76 70.5, 75 75.5 C72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="${skin.base}"/>
            <!-- Brassard droit épousant les bords de l'avant-bras au poignet, liseré lilas en fuseau sur le haut -->
            <path d="M 74.37,68.96 L 74.98,70.35 L 75.36,71.83 L 75.56,73.51 L 75.3,75.46 L 75.02,75.92 L 74.02,76.42 L 73.02,76.6 L 72.03,76.5 L 71.03,76.15 Z" fill="#18181b"/>
            <path d="M 74.37,68.96 L 73.94,69.67 L 73.53,70.37 L 73.13,71.06 L 72.77,71.74 L 72.44,72.41 L 72.1,73.2 L 71.84,73.87 L 71.55,74.64 L 71.29,75.4 L 71.03,76.15 L 71.03,76.15 L 71.5,75.52 L 71.97,74.86 L 72.42,74.16 L 72.78,73.53 L 73.17,72.75 L 73.46,72.05 L 73.73,71.32 L 73.96,70.55 L 74.17,69.77 L 74.37,68.96 L 74.37,68.96 Z" fill="#a78bfa"/>
            <!-- NOTE Mains remplacées par les pattes griffues, dessinées une seule fois dans handItem -->
        </g>`,
    headAccessory: '',
    handItem: `
        <g id="outfit-cat-paws">
                <!-- Patte de chat griffue gauche : gant de velours, trois griffes en plume identiques, recourbées vers le corps -->
                <g id="cat-paw-gauche" transform="translate(27.6, 83.6)">
                    <path d="M -3.39,1.68 L -3.39,2.68 L -3.3,3.62 L -3.14,4.52 L -2.9,5.37 L -2.55,6.3 L -2.16,7.03 L -1.62,7.81 L -1,8.52 L -0.29,9.14 L 0.4,9.6 L 0.4,9.6 L -0.11,8.97 L -0.63,8.23 L -1.05,7.46 L -1.36,6.66 L -1.54,5.96 L -1.67,5.11 L -1.7,4.35 L -1.67,3.57 L -1.57,2.76 L -1.41,1.92 Q -2.23,0.41 -3.39,1.68 Z M -0.99,2.48 L -0.99,3.48 L -0.9,4.42 L -0.74,5.32 L -0.5,6.17 L -0.15,7.1 L 0.24,7.83 L 0.78,8.61 L 1.4,9.32 L 2.11,9.94 L 2.8,10.4 L 2.8,10.4 L 2.29,9.77 L 1.77,9.03 L 1.35,8.26 L 1.04,7.46 L 0.86,6.76 L 0.73,5.91 L 0.7,5.15 L 0.73,4.37 L 0.83,3.56 L 0.99,2.72 Q 0.17,1.21 -0.99,2.48 Z M 1.41,1.68 L 1.41,2.68 L 1.5,3.62 L 1.66,4.52 L 1.9,5.37 L 2.25,6.3 L 2.64,7.03 L 3.18,7.81 L 3.8,8.52 L 4.51,9.14 L 5.2,9.6 L 5.2,9.6 L 4.69,8.97 L 4.17,8.23 L 3.75,7.46 L 3.44,6.66 L 3.26,5.96 L 3.13,5.11 L 3.1,4.35 L 3.13,3.57 L 3.23,2.76 L 3.39,1.92 Q 2.57,0.41 1.41,1.68 Z" fill="#f4f4f5" stroke="#3f3f46" stroke-width="0.35" stroke-linejoin="round"/>
                    <circle cx="0" cy="0" r="3.7" fill="#27272a"/>
                    <path d="M -1.3,-3.4 L -1.38,-3.06 L -1.45,-2.73 L -1.5,-2.4 L -1.54,-2.02 L -1.55,-1.7 L -1.54,-1.39 L -1.5,-1.03 L -1.44,-0.66 L -1.37,-0.36 L -1.3,0 L -1.3,0 L -1.19,-0.35 L -1.09,-0.65 L -1.01,-1.01 L -0.97,-1.38 L -0.95,-1.7 L -0.97,-2.03 L -1.02,-2.41 L -1.09,-2.74 L -1.19,-3.07 L -1.3,-3.4 L -1.3,-3.4 Z M 1.3,-3.4 L 1.19,-3.07 L 1.09,-2.74 L 1.02,-2.41 L 0.97,-2.03 L 0.95,-1.7 L 0.97,-1.38 L 1.01,-1.01 L 1.09,-0.65 L 1.19,-0.35 L 1.3,0 L 1.3,0 L 1.37,-0.36 L 1.44,-0.66 L 1.5,-1.03 L 1.54,-1.39 L 1.55,-1.7 L 1.54,-2.02 L 1.5,-2.4 L 1.45,-2.73 L 1.38,-3.06 L 1.3,-3.4 L 1.3,-3.4 Z" fill="#52525b"/>
                    <circle cx="-1.2" cy="-1.3" r="0.9" fill="#ffffff" opacity="0.18"/>
                </g>
                <!-- Patte de chat griffue droite : gant de velours, trois griffes en plume identiques, recourbées vers le corps -->
                <g id="cat-paw-droite" transform="translate(74.6, 78)">
                    <path d="M 3.39,1.68 L 3.39,2.68 L 3.3,3.62 L 3.14,4.52 L 2.9,5.37 L 2.55,6.3 L 2.16,7.03 L 1.62,7.81 L 1,8.52 L 0.29,9.14 L -0.4,9.6 L -0.4,9.6 L 0.11,8.97 L 0.63,8.23 L 1.05,7.46 L 1.36,6.66 L 1.54,5.96 L 1.67,5.11 L 1.7,4.35 L 1.67,3.57 L 1.57,2.76 L 1.41,1.92 Q 2.23,0.41 3.39,1.68 Z M 0.99,2.48 L 0.99,3.48 L 0.9,4.42 L 0.74,5.32 L 0.5,6.17 L 0.15,7.1 L -0.24,7.83 L -0.78,8.61 L -1.4,9.32 L -2.11,9.94 L -2.8,10.4 L -2.8,10.4 L -2.29,9.77 L -1.77,9.03 L -1.35,8.26 L -1.04,7.46 L -0.86,6.76 L -0.73,5.91 L -0.7,5.15 L -0.73,4.37 L -0.83,3.56 L -0.99,2.72 Q -0.17,1.21 0.99,2.48 Z M -1.41,1.68 L -1.41,2.68 L -1.5,3.62 L -1.66,4.52 L -1.9,5.37 L -2.25,6.3 L -2.64,7.03 L -3.18,7.81 L -3.8,8.52 L -4.51,9.14 L -5.2,9.6 L -5.2,9.6 L -4.69,8.97 L -4.17,8.23 L -3.75,7.46 L -3.44,6.66 L -3.26,5.96 L -3.13,5.11 L -3.1,4.35 L -3.13,3.57 L -3.23,2.76 L -3.39,1.92 Q -2.57,0.41 -1.41,1.68 Z" fill="#f4f4f5" stroke="#3f3f46" stroke-width="0.35" stroke-linejoin="round"/>
                    <circle cx="0" cy="0" r="3.7" fill="#27272a"/>
                    <path d="M -1.3,-3.4 L -1.38,-3.06 L -1.45,-2.73 L -1.5,-2.4 L -1.54,-2.02 L -1.55,-1.7 L -1.54,-1.39 L -1.5,-1.03 L -1.44,-0.66 L -1.37,-0.36 L -1.3,0 L -1.3,0 L -1.19,-0.35 L -1.09,-0.65 L -1.01,-1.01 L -0.97,-1.38 L -0.95,-1.7 L -0.97,-2.03 L -1.02,-2.41 L -1.09,-2.74 L -1.19,-3.07 L -1.3,-3.4 L -1.3,-3.4 Z M 1.3,-3.4 L 1.19,-3.07 L 1.09,-2.74 L 1.02,-2.41 L 0.97,-2.03 L 0.95,-1.7 L 0.97,-1.38 L 1.01,-1.01 L 1.09,-0.65 L 1.19,-0.35 L 1.3,0 L 1.3,0 L 1.37,-0.36 L 1.44,-0.66 L 1.5,-1.03 L 1.54,-1.39 L 1.55,-1.7 L 1.54,-2.02 L 1.5,-2.4 L 1.45,-2.73 L 1.38,-3.06 L 1.3,-3.4 L 1.3,-3.4 Z" fill="#52525b"/>
                    <circle cx="-1.2" cy="-1.3" r="0.9" fill="#ffffff" opacity="0.18"/>
                </g>
        </g>`
};

// Tenue Trophée 5 : Mage Noir & Sorcière des Ombres
export const OUTFIT_SHADOW_MAGE = {
    id: 'shadow_mage',
    name: 'Robe de Sorcière & Cape des Ombres',
    backEquipment: `
        <g id="outfit-shadow-cape">
            <!-- Cape pourpre nuit d'ébène (#1b122c, nettement plus foncée que la robe) -->
            <path d="M 31,64 
                     C 20,78 14,94 11,109 
                     C 22,107 30,108 38,109 
                     C 42,98 46,88 48,80 
                     C 42,75 35,70 31,64 Z" 
                  fill="#1b122c" stroke="#0a0512" stroke-width="0.8"/>
            <path d="M 69,64 
                     C 80,78 86,94 89,109 
                     C 78,107 70,108 62,109 
                     C 58,98 54,88 52,80 
                     C 58,75 65,70 69,64 Z" 
                  fill="#1b122c" stroke="#0a0512" stroke-width="0.8"/>
            <path d="M 36,78 C 34,92 32,106 36,110 C 45,109 55,109 64,110 C 68,106 66,92 64,78 Z" 
                  fill="#120b1f"/>
            <!-- Liseré sur l'ourlet de la cape -->
            <path d="M 31,64 C 20,78 14,94 11,109" stroke="#9333ea" stroke-width="1.1" stroke-linecap="round" fill="none"/>
            <path d="M 69,64 C 80,78 86,94 89,109" stroke="#9333ea" stroke-width="1.1" stroke-linecap="round" fill="none"/>
            <!-- Cols relevés de sorcière -->
            <path d="M 28,62 L 23,53 L 34,59 Z" fill="#2e1065" stroke="#120b1f" stroke-width="0.6"/>
            <path d="M 72,62 L 77,53 L 66,59 Z" fill="#2e1065" stroke="#120b1f" stroke-width="0.6"/>
        </g>`,
    legs: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
        <g id="outfit-shadow-legs">
            <rect x="42.5" y="86" width="4.5" height="18" rx="2" fill="#24143d"/>
            <rect x="53" y="86" width="4.5" height="18" rx="2" fill="#24143d"/>
            <!-- Bottine gauche à revers -->
            <path d="M 41,98 C 41,96 48,96 48,98 L 48,111 C 47,113 42,113 40,111 L 39,112.5 C 38,113 48,114 49,112 L 49,98 Z" fill="#0f172a"/>
            <path d="M 40.5,98 Q 44.5,96 48.5,98 L 47.5,101 Q 44.5,99 41.5,101 Z" fill="#581c87" stroke="#0f172a" stroke-width="0.5"/>
            <circle cx="44.5" cy="104" r="0.9" fill="#cbd5e1"/>
            <circle cx="44.5" cy="107" r="0.9" fill="#cbd5e1"/>
            <path d="M 38,112.5 Q 44,113.5 49,112.5" stroke="#334155" stroke-width="1.2" stroke-linecap="round"/>

            <!-- Bottine droite à revers -->
            <path d="M 59,98 C 59,96 52,96 52,98 L 52,111 C 53,113 58,113 60,111 L 61,112.5 C 62,113 52,114 51,112 L 51,98 Z" fill="#0f172a"/>
            <path d="M 51.5,98 Q 55.5,96 59.5,98 L 58.5,101 Q 55.5,99 52.5,101 Z" fill="#581c87" stroke="#0f172a" stroke-width="0.5"/>
            <circle cx="55.5" cy="104" r="0.9" fill="#cbd5e1"/>
            <circle cx="55.5" cy="107" r="0.9" fill="#cbd5e1"/>
            <path d="M 51,112.5 Q 56,113.5 62,112.5" stroke="#334155" stroke-width="1.2" stroke-linecap="round"/>
        </g>`,
    body: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
        <g id="outfit-shadow-body">
            <!-- Haut / Buste en velours pourpre (#581c87) -->
            <path d="M 35,63 C 35,60 41,58 50,58 C 59,58 65,60 65,63 L 63.5,82 L 36.5,82 Z" fill="#581c87" stroke="#2e1065" stroke-width="0.7"/>
            <!-- Décolleté délicat -->
            <path d="M 44,58 Q 50,65 56,58 Z" fill="${skin.base}"/>
            <!-- Ras-du-cou avec pendentif améthyste -->
            <path d="M 45,59 Q 50,62 55,59" stroke="#0f172a" stroke-width="1.1" fill="none"/>
            <circle cx="50" cy="62" r="1.3" fill="#c084fc" stroke="#3b0764" stroke-width="0.5"/>
            
            <!-- Corset / Laçage croisé argenté -->
            <path d="M 46,67 L 54,71 M 54,67 L 46,71" stroke="#c084fc" stroke-width="0.9" stroke-linecap="round"/>
            <path d="M 46,72 L 54,76 M 54,72 L 46,76" stroke="#c084fc" stroke-width="0.9" stroke-linecap="round"/>
            <line x1="46" y1="65" x2="46" y2="78" stroke="#3b0764" stroke-width="0.8"/>
            <line x1="54" y1="65" x2="54" y2="78" stroke="#3b0764" stroke-width="0.8"/>

            <!-- Jupe de sorcière évasée festonnée -->
            <path d="M 36.5,82 
                     C 32,86 28,92 31,98 
                     L 38,94 
                     L 44,99 
                     L 50,93 
                     L 56,99 
                     L 62,94 
                     L 69,98 
                     C 72,92 68,86 63.5,82 Z" 
                  fill="#4c1d95" stroke="#1e1b4b" stroke-width="0.8"/>
            <path d="M 31,98 L 38,94 L 36,96 Z" fill="#7c3aed"/>
            <path d="M 44,99 L 50,93 L 48,96 Z" fill="#7c3aed"/>
            <path d="M 56,99 L 62,94 L 60,96 Z" fill="#7c3aed"/>
            <path d="M 31,98 L 38,94 L 44,99 L 50,93 L 56,99 L 62,94 L 69,98" 
                  stroke="#cbd5e1" stroke-width="0.8" fill="none" stroke-linejoin="round"/>
        </g>`,
    belt: `
        <g id="outfit-shadow-belt">
            <path d="M 36,79 Q 50,82 64,79 L 64,83 Q 50,86 36,83 Z" fill="#0f172a"/>
            <rect x="47" y="79" width="6" height="5" rx="1.2" fill="#334155" stroke="#cbd5e1" stroke-width="0.6"/>
            <path d="M 49,80.2 C 48.5,81.5 48.5,82.5 49,83.8 C 50.5,83.5 50.5,80.5 49,80.2 Z" fill="#f8fafc"/>
            <!-- Fiole de potion magique luminescente à la taille -->
            <g transform="translate(62, 82)">
                <rect x="-1" y="-2" width="2" height="1.5" rx="0.3" fill="#b45309"/>
                <circle cx="0" cy="2" r="2.8" fill="#a855f7" stroke="#3b0764" stroke-width="0.5"/>
                <circle cx="0" cy="2" r="2" fill="#c084fc"/>
                <circle cx="-0.8" cy="1.2" r="0.7" fill="#ffffff" opacity="0.8"/>
            </g>
        </g>`,
    arms: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
        <g id="outfit-shadow-arms">
            <!-- Bras gauche manche pagode évasée -->
            <path d="M 35,63 C 30,68 26,75 23,80 C 20,86 17,90 18,92 C 21,91 24,86 27,82 C 29,86 33,84 35,80 C 35,74 36,68 36,63 Z" fill="#581c87" stroke="#2e1065" stroke-width="0.7"/>
            <path d="M 18,92 C 21,91 25,85 27,82 C 23,86 20,90 18,92 Z" fill="#7c3aed"/>
            
            <!-- Bras droit manche pagode évasée -->
            <path d="M 65,63 C 70,68 74,75 77,80 C 80,86 83,90 82,92 C 79,91 76,86 73,82 C 71,86 67,84 65,80 C 65,74 64,68 64,63 Z" fill="#581c87" stroke="#2e1065" stroke-width="0.7"/>
            <path d="M 82,92 C 79,91 75,85 73,82 C 77,86 80,90 82,92 Z" fill="#7c3aed"/>

            <!-- Main droite délicate ouverte vers l'avant -->
            <ellipse cx="76" cy="81" rx="3.1" ry="3.2" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
            <path d="M 74.5,80 Q 76,81 77.5,80" stroke="${skin.shadow}" stroke-width="0.6" fill="none"/>
            <path d="M 75,82 Q 76.5,83 78,82" stroke="${skin.shadow}" stroke-width="0.6" fill="none"/>
        </g>`,
    headAccessory: `
        <g id="outfit-shadow-crown">
            <!-- Tiare / Diadème en croissant de lune et joyaux d'arcanes -->
            <path d="M 31,21 Q 50,17 69,21 Q 50,19.5 31,21 Z" fill="#334155" stroke="#0f172a" stroke-width="0.6"/>
            <path d="M 31,21 Q 50,17 69,21" stroke="#cbd5e1" stroke-width="0.8" fill="none"/>
            <polygon points="38,20 41,15 44,19" fill="#1e293b" stroke="#cbd5e1" stroke-width="0.4"/>
            <polygon points="56,19 59,15 62,20" fill="#1e293b" stroke="#cbd5e1" stroke-width="0.4"/>
            <path d="M 46.5,17 C 46.5,12 53.5,12 53.5,17 C 51.5,14 48.5,14 46.5,17 Z" fill="#f8fafc" stroke="#475569" stroke-width="0.4"/>
            <circle cx="50" cy="18" r="1.9" fill="#9333ea" stroke="#3b0764" stroke-width="0.5"/>
            <circle cx="49.5" cy="17.5" r="0.6" fill="#ffffff"/>
            <path d="M 50,19.5 L 50,22" stroke="#cbd5e1" stroke-width="0.6"/>
            <path d="M 48.8,22 Q 50,25 50,25 Q 50,25 51.2,22 Q 50,21 48.8,22 Z" fill="#c084fc" stroke="#581c87" stroke-width="0.4"/>
            <circle cx="49.8" cy="22.5" r="0.4" fill="#ffffff"/>
        </g>`,
    handItem: (skin = { base: '#ffd4a3', shadow: '#f0be8d' }) => `
        <g id="outfit-shadow-scepter" transform="translate(22, 80) rotate(-14)">
            <!-- Sceptre de mage noir en bois noueux d'ébène et orbe flottant -->
            <line x1="0" y1="-30" x2="0" y2="34" stroke="#0f172a" stroke-width="2.6" stroke-linecap="round"/>
            <line x1="0" y1="-30" x2="0" y2="34" stroke="#3b0764" stroke-width="1.2" stroke-linecap="round"/>

            <polygon points="-1.5,32 0,37 1.5,32" fill="#cbd5e1" stroke="#1e293b" stroke-width="0.5"/>
            <rect x="-2" y="30" width="4" height="2" rx="0.5" fill="#475569"/>

            <!-- Tête du sceptre : croissant enserrant l'orbe magique -->
            <path d="M -3.5,-24 L 3.5,-24 L 2,-20 L -2,-20 Z" fill="#475569" stroke="#0f172a" stroke-width="0.5"/>
            <path d="M -7,-34 
                     C -9,-43 0,-49 8,-44 
                     C 4,-41 0,-36 2,-30 
                     C -3,-31 -6,-33 -7,-34 Z" 
                  fill="#334155" stroke="#cbd5e1" stroke-width="0.7"/>
            <path d="M -5,-33 C -6,-40 0,-45 6,-42" stroke="#f8fafc" stroke-width="0.6" fill="none"/>

            <!-- Orbe d'arcanes flottant et brillant -->
            <circle cx="0" cy="-36" r="7.5" fill="#a855f7" opacity="0.4"/>
            <circle cx="0" cy="-36" r="4.8" fill="#7e22ce" stroke="#3b0764" stroke-width="0.7"/>
            <circle cx="0" cy="-36" r="3.4" fill="#c084fc"/>
            <circle cx="-1.2" cy="-37.2" r="1.3" fill="#ffffff" opacity="0.9"/>
            <path d="M -4,-40 Q -1,-43 2,-40 Q 5,-37 2,-33" stroke="#f3e8ff" stroke-width="0.6" fill="none" opacity="0.8"/>

            <!-- Main qui serre le sceptre (règle 9) -->
            <ellipse cx="0" cy="0" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
            <path d="M -1.8,-1.2 Q 0,-0.6 1.8,-1.2" stroke="${skin.shadow}" stroke-width="0.7" fill="none"/>
            <path d="M -1.8,1.2 Q 0,1.8 1.8,1.2" stroke="${skin.shadow}" stroke-width="0.7" fill="none"/>
            <circle cx="-1" cy="0" r="0.8" fill="#c084fc" stroke="#3b0764" stroke-width="0.3"/>
        </g>`
};

// Registre des tenues RPG
export const RPG_OUTFITS = {
    elf_ranger: OUTFIT_ELF_RANGER,
    orc_berserker: OUTFIT_ORC_BERSERKER,
    paladin_light: OUTFIT_PALADIN_LIGHT,
    cat_thief: OUTFIT_CAT_THIEF,
    shadow_mage: OUTFIT_SHADOW_MAGE
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
        // ANCHOR Invocation : rareté de la carte (taux de tirage) et éléments ajoutés à l'atelier une fois gagnée
        rarity: 'rare',
        unlocks: {
            species: 'elf',
            skins: [],
            hairs: ['#14b8a6', '#38bdf8', '#a855f7'],
            eyes: ['emerald'],
            styles: { boy: 'elf_boy', girl: 'elf_girl' },
            outfit: 'elf_ranger',
            label: 'Elfe'
        },
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
        // ANCHOR Invocation : rareté de la carte (taux de tirage) et éléments ajoutés à l'atelier une fois gagnée
        rarity: 'épique',
        unlocks: {
            species: 'orc',
            skins: ['orc-green'],
            hairs: ['#c2410c', '#b91c1c'],
            eyes: [],
            styles: { boy: 'orc_beast', girl: 'orc_girl' },
            outfit: 'orc_berserker',
            label: 'Orc'
        },
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
        badge: 'Nouveau',
        // ANCHOR Invocation : rareté de la carte (taux de tirage) et éléments ajoutés à l'atelier une fois gagnée
        rarity: 'légendaire',
        unlocks: {
            species: null,
            skins: ['sun-bronze'],
            hairs: ['#facc15'],
            eyes: ['sky'],
            styles: { boy: 'paladin_boy', girl: 'paladin_girl' },
            outfit: 'paladin_light',
            label: 'Paladin'
        },
        tagline: 'Chevalier en armure de plaques scintillante',
        description: "Troisième trophée : débloque l'armure de plates étincelante, le bouclier solaire, l'épée longue et le diadème du Paladin.",
        rewards: [
            { icon: 'bi-feather', label: 'Espèce : Humain (Peau Bronze Solaire)' },
            { icon: 'bi-shield-shaded', label: 'Classe : Paladin de Lumière' },
            { icon: 'bi-scissors', label: 'Coupes exclusives : Court à mèche héroïque (G) / Longue à frange balayée (F)' },
            { icon: 'bi-slash-square', label: 'Armes : Épée longue & Bouclier solaire' },
            { icon: 'bi-person-bounding-box', label: 'Tenue : Armure de plates, tabard au soleil d\'or, cape ardoise & diadème solaire' },
            { icon: 'bi-palette', label: 'Teintes débloquées : Peau Bronze Solaire, Cheveux Or Solaire & Yeux Azur Céleste' }
        ],
        boyPreset: {
            id: 'pal_b',
            type: 'boy',
            styleKey: 'paladin_boy',
            styleId: 1,
            outfitKey: 'paladin_light',
            species: 'human',
            skinColor: 'sun-bronze',
            hairColor: '#facc15', // Or Solaire (contraste franc avec la peau bronze)
            eyeColor: 'sky'
        },
        girlPreset: {
            id: 'pal_g',
            type: 'girl',
            styleKey: 'paladin_girl',
            styleId: 1,
            outfitKey: 'paladin_light',
            species: 'human',
            skinColor: 'sun-bronze',
            hairColor: '#facc15', // Or Solaire (identique, parité stricte)
            eyeColor: 'sky'
        }
    },
    {
        id: 'cat',
        shortId: 'cat',
        legacyId: 'trophy_cat_thief',
        number: 4,
        title: 'La Griffe de Velours',
        species: 'cat',
        speciesName: 'Félin',
        className: 'Voleuse Féline',
        badge: 'Nouveau',
        // ANCHOR Invocation : rareté de la carte (taux de tirage) et éléments ajoutés à l'atelier une fois gagnée
        rarity: 'légendaire',
        unlocks: {
            species: 'cat',
            skins: [],
            hairs: ['#7c3aed', '#a78bfa'],
            eyes: ['cat-rose'],
            styles: { boy: 'cat_boy', girl: 'cat_girl' },
            outfit: 'cat_thief',
            label: 'Chat'
        },
        tagline: 'Voleuse agile aux oreilles de chat et aux griffes de velours',
        description: "Quatrième trophée : débloque l'espèce féline (oreilles de chat, bouche en ω, queue touffue), les pattes griffues et la tenue de voleuse.",
        rewards: [
            { icon: 'bi-feather', label: 'Espèce : Félin (Oreilles de chat, bouche en ω & queue épaisse)' },
            { icon: 'bi-shield-shaded', label: 'Classe : Voleuse Féline' },
            { icon: 'bi-scissors', label: 'Coupes exclusives : Félin ébouriffé (G) / Carré félin (F)' },
            { icon: 'bi-slash-square', label: 'Armes : Pattes de chat griffues' },
            { icon: 'bi-person-bounding-box', label: 'Tenue : Cuir sombre de voleuse, foulard violet nuit & grelot doré' },
            { icon: 'bi-palette', label: 'Teintes débloquées : Cheveux Violet Félin & Lilas Félin, Yeux Rose Félin aux pupilles fendues' }
        ],
        boyPreset: {
            id: 'cat_b',
            type: 'boy',
            styleKey: 'cat_boy',
            styleId: 1,
            outfitKey: 'cat_thief',
            species: 'cat',
            skinColor: 'light',
            hairColor: '#7c3aed', // Violet Félin (contraste franc avec la peau pêche)
            eyeColor: 'cat-rose'
        },
        girlPreset: {
            id: 'cat_g',
            type: 'girl',
            styleKey: 'cat_girl',
            styleId: 1,
            outfitKey: 'cat_thief',
            species: 'cat',
            skinColor: 'light',
            hairColor: '#7c3aed', // Violet Félin (identique, parité stricte)
            eyeColor: 'cat-rose'
        }
    },
    {
        id: 'shadow',
        shortId: 'shadow',
        legacyId: 'trophy_shadow_mage',
        number: 5,
        title: 'L’Énigme du Néant',
        species: 'shadow',
        speciesName: 'Ombre',
        className: 'Mage Noir & Sorcière',
        badge: 'Nouveau',
        rarity: 'légendaire',
        unlocks: {
            species: 'shadow',
            skins: ['shadow-lilac'],
            hairs: ['#1e1435', '#3b0764'],
            eyes: ['amethyst'],
            styles: { boy: 'shadow_boy', girl: 'shadow_girl' },
            outfit: 'shadow_mage',
            label: 'Mage Noir'
        },
        tagline: 'Maître des arcanes aux cornes en S et robe de sorcière',
        description: "Cinquième trophée d'élite : débloque l'espèce Ombre (oreilles d'elfe pointues et cornes en S d'ébène), la robe de sorcière en velours pourpre, la tiare lunaire, le sceptre d'arcanes et la peau Lilas Mystique.",
        rewards: [
            { icon: 'bi-feather', label: "Espèce : Ombre (Oreilles d'elfe pointues & Cornes en S d'ébène)" },
            { icon: 'bi-shield-shaded', label: "Classe : Mage Noir & Sorcière des Ombres" },
            { icon: 'bi-scissors', label: "Coupes exclusives : Mi-long ténébreux (G) / Ondulé sombre en cascade (F)" },
            { icon: 'bi-slash-square', label: "Arme : Sceptre d'arcanes à orbe améthyste flottant" },
            { icon: 'bi-person-bounding-box', label: "Tenue : Robe de sorcière en velours, cape nuit d'ébène & tiare lunaire" },
            { icon: 'bi-palette', label: "Teintes débloquées : Peau Lilas Mystique (#d8b4fe), Cheveux Noir Abyssal & Yeux Améthyste" }
        ],
        boyPreset: {
            id: 'shd_b',
            type: 'boy',
            styleKey: 'shadow_boy',
            styleId: 1,
            outfitKey: 'shadow_mage',
            species: 'shadow',
            skinColor: 'shadow-lilac',
            hairColor: '#1e1435', // Noir Abyssal (contraste franc avec la peau lilas)
            eyeColor: 'amethyst'
        },
        girlPreset: {
            id: 'shd_g',
            type: 'girl',
            styleKey: 'shadow_girl',
            styleId: 1,
            outfitKey: 'shadow_mage',
            species: 'shadow',
            skinColor: 'shadow-lilac',
            hairColor: '#1e1435', // Noir Abyssal (parité stricte)
            eyeColor: 'amethyst'
        }
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
    cat: { id: 'cat', name: 'Félin Voleuse', type: 'trophy', number: 4, boyId: 'cat_b', girlId: 'cat_g' },
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
    // NOTE Le triangle de col orange appartient à la tenue de base : jamais sur un personnage de trophée
    const headBase = isBoy ? base.headBase(showBaseBand, effectiveSkin, species, !isNewCharacter) : base.headBase(showBaseBand, effectiveSkin, species);
    const faceFeatures = base.faceFeatures(effectiveEye, effectiveSkin, species, effectiveHairColor);
    const eyebrows = base.eyebrows ? base.eyebrows(effectiveHairColor, 0.85) : '';

    // NOTE Traits d'espèce qui suivent la couleur des cheveux, quelle que soit la tenue
    const catEars = species === 'cat' ? getCatEars(effectiveHairColor) : '';
    const catTail = species === 'cat' ? getCatTail(effectiveHairColor) : '';
    const shadowHorns = species === 'shadow' ? getShadowHorns() : '';
    const renderPart = (part) => (typeof part === 'function' ? part(effectiveSkin) : (part || ''));

    if (mode === 'head') {
        return `
            <svg viewBox="0 -34 100 102" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                ${hairBack}
                ${headBase}
                ${faceFeatures}
                ${catEars}
                ${shadowHorns}
                ${hairFront}
                ${eyebrows}
                ${renderPart(outfit.headAccessory)}
            </svg>
        `;
    }

    return `
        <svg viewBox="0 -34 100 156" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
            ${renderPart(outfit.backEquipment)}
            ${catTail}
            ${base.shadow}
            ${hairBack}
            ${renderPart(outfit.legs)}
            ${renderPart(outfit.body)}
            ${renderPart(outfit.belt)}
            ${renderPart(outfit.arms)}
            ${headBase}
            ${faceFeatures}
            ${catEars}
            ${shadowHorns}
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
    cat: {
        id: 'cat',
        color: '#ea580c',
        accent: '#fef08a',
        get svg() { return renderAvatarSvg('cat'); },
        get headSvg() { return renderAvatarHeadSvg('cat'); }
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
