/**
 * Module de définition, rendu et personnalisation des Avatars Chibi Manga
 * Supporte la sélection du genre, des 4 coupes de cheveux par genre,
 * ainsi que le choix dynamique des couleurs de cheveux et des yeux.
 */

import { fuseau, plume, sablier, gripHand, SKIN_DEFAULT } from '../avatar-kit.js';
import { fairyGirlFrontHair } from './trophies/fairy.js';


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
    { id: 'purple', name: 'Violet Mystique', hex: '#581c87', isTrophyReward: true },
    { id: 'vampire-carmin', name: 'Noir Carmin', hex: '#2a0a12', isTrophyReward: true },
    { id: 'necro-bone', name: 'Blanc Os', hex: '#e7e5d8', isTrophyReward: true },
    { id: 'fairy-orchid', name: 'Orchidée', hex: '#d946ef', isTrophyReward: true },
    { id: 'scholar-chestnut', name: 'Châtain Clair', hex: '#b07d4b', isTrophyReward: true },
    { id: 'pirate-chestnut', name: 'Brun Corsaire', hex: '#3b2219', isTrophyReward: true },
    { id: 'dragon-crimson', name: 'Rouge Braise Draconique', hex: '#b91c1c', isTrophyReward: true }
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
    { id: 'cat-rose', name: 'Rose Félin', dark: '#9d174d', light: '#f472b6', isTrophyReward: true },
    { id: 'fairy-lilac', name: 'Lilas Féerique', dark: '#5b21b6', light: '#c4b5fd', isTrophyReward: true },
    { id: 'revenant-green', name: 'Vert Spectral', dark: '#052e16', light: '#15803d', isTrophyReward: true },
    { id: 'lagoon-blue', name: 'Bleu Lagon', dark: '#0e7490', light: '#06b6d4', isTrophyReward: true },
    { id: 'dragon-fire', name: 'Feu Draconique', dark: '#7f1d1d', light: '#ea580c', isTrophyReward: true }
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
    { id: 'shadow-lilac', name: 'Lilas Mystique (Ombre)', base: '#d8b4fe', shadow: '#a855f7', mouth: '#4c1d95', isTrophyReward: true }, // Peau lilas éthérée mystique
    { id: 'mannequin', name: 'Gris Mannequin', base: '#dcdcdc', shadow: '#b4b4b4', mouth: '#8c8c8c', isTrophyReward: true }, // Gabarit neutre, jamais débloqué
    { id: 'vampire-pale', name: 'Pâleur Nocturne (Vampire)', base: '#e6edf8', shadow: '#bccbe4', mouth: '#7f1d1d', isTrophyReward: true }, // Teint de lune
    { id: 'undead-grey', name: 'Gris Revenant (Nécromancien)', base: '#aebbb4', shadow: '#85948d', mouth: '#2f3a35', isTrophyReward: true } // Teint grisâtre de revenant
    ,{ id: 'fairy-cream', name: 'Crème Féerique', base: '#ffe6d5', shadow: '#f2c3a6', mouth: '#9f4a3a', isTrophyReward: true } // Teint crème rosé de fée
    ,{ id: 'dragon-amber', name: 'Ambre Draconique (Drakéide)', base: '#f5d5b8', shadow: '#d69d6c', mouth: '#7f2812', isTrophyReward: true } // Teint chaud ambré de dragonnier
];

// Palette active pour la personnalisation des avatars de base
export const SKIN_COLORS = BASE_SKIN_COLORS;

// Détermine dynamiquement la couleur de bouche adaptée à la peau (ton chair/lèvre naturel beaucoup plus foncé)
export function getSkinMouthColor(skin = SKIN_DEFAULT) {
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



// NOTE Mélange de deux couleurs hex (part de b entre 0 et 1), pour des teintes dérivées de la peau
export const mixHex = (a, b, t) => {
    const c = (h, i) => parseInt(String(h).replace('#', '').substring(i, i + 2), 16);
    return '#' + [0, 2, 4].map(i => Math.round(c(a, i) * (1 - t) + c(b, i) * t).toString(16).padStart(2, '0')).join('');
};

// ANCHOR Bouche principale souriante ; `inverted` la retourne en bouche triste (même tracé, miroir vertical autour de y=52)
export function getSmileMouth(mouthColor, inverted = false) {
    const path = `<path d="M 44.33,51.61 L 45.34,52.38 L 46.33,52.99 L 47.3,53.43 L 48.23,53.73 L 49.13,53.87 L 50,53.89 L 50.87,53.87 L 51.77,53.73 L 52.7,53.43 L 53.67,52.99 L 54.66,52.38 L 55.67,51.61 Q 55.85,50.07 54.33,50.39 L 53.67,51.3 L 53,52.07 L 52.3,52.69 L 51.56,53.16 L 50.8,53.48 L 50,53.62 L 49.2,53.48 L 48.44,53.16 L 47.7,52.69 L 47,52.07 L 46.33,51.3 L 45.67,50.39 Q 44.15,50.07 44.33,51.61 Z" fill="${mouthColor}"/>`;
    return inverted ? `<g id="mouth-sad" transform="matrix(1 0 0 -1 0 104)">${path}</g>` : path;
}

// ANCHOR Bouche fille complète (dessin de Nicolas) : lèvre supérieure en arc de Cupidon (deux moitiés), ouverture sombre en lentille, lèvre inférieure pleine
// NOTE Tracés repris de l'export SVG retouché, avec leurs matrices ; lèvres à la couleur de bouche issue de la peau, élargies de 30 % et affinées de 22 % autour de la ligne des lèvres (50, 52.4)
export function getFullLipsMouth(mouthColor) {
    return `<g id="mouth-full-lips" transform="translate(50 52.4) scale(1.3 0.78) translate(-50 -52.4)">
            <g transform="matrix(0.252178,0,0,0.25,-0.076708,-34.555898)"><path d="M200.322,343.192C209.69,343.192 217.295,347.898 217.295,347.898C217.295,347.898 209.69,357.283 200.322,357.283C190.955,357.283 183.349,347.898 183.349,347.898C183.349,347.898 190.955,343.192 200.322,343.192Z" fill="#1c0a0a"/></g>
            <g transform="matrix(0.186312,0,0,0.99414,12.976324,-298.051876)"><path d="M221.926,353.29C221.926,354.485 212.586,355.455 201.081,355.455C189.576,355.455 180.236,354.485 180.236,353.29L221.926,353.29Z" fill="${mouthColor}"/></g>
            <g transform="matrix(0.200005,0,0,0.25,10.08695,-34)"><path d="M178.747,345.98C185.118,344.165 190.639,340.725 197.01,338.91C198.312,338.539 199.925,338.991 201.062,339.621C201.079,339.63 203.323,342.417 203.321,342.426C203.028,343.507 203.22,344.758 202.432,345.667C201.644,346.577 200.333,347.453 198.95,347.471C192.188,347.561 185.509,345.891 178.747,345.98Z" fill="${mouthColor}"/></g>
            <g transform="matrix(-0.190823,-0.074879,0.059905,-0.238523,68.426077,148.480904)"><path d="M178.747,345.98C185.263,344.142 191.214,340.637 197.73,338.799C199.06,338.424 200.559,338.894 201.565,339.544C201.58,339.554 203.316,342.418 203.312,342.427C202.851,343.534 202.834,344.817 201.919,345.746C201.003,346.675 199.582,347.568 198.231,347.582C191.614,347.649 185.364,345.913 178.747,345.98Z" fill="${mouthColor}"/></g>
        </g>`;
}

// Générateur des oreilles selon l'espèce (Humain, Elfe, Orc, etc.)
export function getSpeciesEars(species = 'human', skin = SKIN_DEFAULT, gender = 'boy') {
    if (species === 'elf' || species === 'shadow' || species === 'vampire' || species === 'fairy' || species === 'dragon') {
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
                    <path d="${fuseau('M 18.9,40.22 C 18.99,41.89 16.56,42.69 15.65,41.28 C 14.58,39.97 16.1,37.91 17.66,38.51', 1.3, 24)}" fill="#fbbf24"/>
                </g>
                <g transform="translate(-2.4 0)">
                    <!-- Oreille droite orc robuste rapprochée avec anneau doré -->
                    <path d="M 76 35 Q 82 32 85.5 33 Q 83 41 77.5 44 Z" fill="${skin.base}"/>
                    <path d="M 77 36 Q 82 34 84 35 Q 82 40 78.5 42 Z" fill="${skin.shadow}"/>
                    <!-- Anneau d'or oreille droite : cercle ouvert à 80 %, fuseau, ouverture à cheval sur le rebord (centre 82.90, 40.22, angle -144°) -->
                    <path d="${fuseau('M 82.34,38.51 C 83.9,37.91 85.42,39.97 84.35,41.28 C 83.44,42.69 81.01,41.89 81.1,40.22', 1.3, 24)}" fill="#fbbf24"/>
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
    legs: (skin = SKIN_DEFAULT) => `
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
            <path d="${fuseau('M 37.4,84.75 C 45.7,86.35 54.3,86.35 62.6,84.75', 6.08, 16)}" fill="#1f2937"/>
            <g transform="translate(0 1.2)"><rect x="46" y="81.5" width="8" height="6.5" rx="1.5" fill="#ffb733" stroke="#1f2937" stroke-width="0.8"/></g>
            <g transform="translate(0 0.16)"><rect x="36" y="82.5" width="4.5" height="7" rx="1.2" fill="#489e96" stroke="#1b4d49" stroke-width="0.8"/></g>
            <g transform="translate(0 0.15)"><circle cx="38.2" cy="86" r="0.7" fill="#ffb733"/></g>
        </g>`,
    arms: (skin = SKIN_DEFAULT) => `
        <g id="boy-arms">
            <path d="M32 64 C24 71, 23 78, 29 84 C32 84, 34 81, 35 77 Z" fill="#489e96"/>
            <ellipse cx="29" cy="84" rx="3.8" ry="3.5" fill="${skin.base}"/>
            <!-- NOTE Séparations des doigts en fuseau -->
            <path d="${fuseau('M 28,84.3 C 27.8,85.18 27.74,86.1 27.8,87', 0.64, 8)} ${fuseau('M 30,84.3 C 30.2,85.18 30.26,86.1 30.2,87', 0.64, 8)}" fill="${skin.shadow}"/>
            <path d="M68 64 C76 69, 78 72, 76 79 C73 81, 70 79, 66 75 Z" fill="#489e96"/>
            <ellipse cx="77" cy="79" rx="3.8" ry="3.5" fill="${skin.base}"/>
            <!-- NOTE Séparations des doigts en fuseau -->
            <path d="${fuseau('M 76,79.3 C 75.8,80.18 75.74,81.1 75.8,82', 0.64, 8)} ${fuseau('M 78,79.3 C 78.2,80.18 78.26,81.1 78.2,82', 0.64, 8)}" fill="${skin.shadow}"/>
        </g>`,
    headBase: (withBand = true, skin = SKIN_DEFAULT, species = 'human', showCollar = species === 'human') => `
        <g id="boy-head-base-full">
            <rect x="46" y="58" width="8" height="4" fill="${skin.shadow}"/>
            ${getSpeciesEars(species, skin, 'boy')}
            <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="${skin.base}"/>
            ${withBand ? `
            <path d="M22 24 C33 17, 67 17, 78 24 L79 28 C68 21, 32 21, 21 28 Z" fill="#489e96"/>
            <rect x="45" y="19" width="10" height="6" rx="1.5" fill="#ff9d00"/>
            <circle cx="50" cy="22" r="1.5" fill="#ffffff"/>` : ''}
        </g>`,
    faceFeatures: (eye = { dark: '#542c0e', light: '#8c4e1e' }, skin = SKIN_DEFAULT, species = 'human', hairColor = '#5a2d0c', styleKey = null, mood = null) => {
        // NOTE Cils et paupières : le Revenant a le blanc de l'œil noir, ils passent en noir pour rester visibles
        const lashColor = species === 'undead' ? '#0a0a0a' : hairColor;
        const mouthColor = getSkinMouthColor(skin);
        return `
        <g id="boy-face-features-full">
            <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="${species === 'undead' ? '#0a0a0a' : '#ffffff'}"/>
            <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="none" stroke="${species === 'undead' ? '#0a0a0a' : skin.shadow}" stroke-width="${species === 'undead' ? 1.8 : 0.8}"/>
            <ellipse cx="37.5" cy="41.5" rx="4.2" ry="4.8" fill="${eye.dark}"/>
            <ellipse cx="37.5" cy="42.5" rx="3.5" ry="3.5" fill="${eye.light}"/>
            ${species === 'cat' || species === 'dragon' ? '<ellipse cx="37.5" cy="41.8" rx="0.85" ry="3.3" fill="#241103"/>' : `<circle cx="37.5" cy="41.5" r="2.2" fill="${species === 'undead' ? '#4ade80' : '#241103'}"/>`}
            <circle cx="35.5" cy="39" r="1.8" fill="#ffffff"/>
            <circle cx="39.5" cy="43.5" r="0.9" fill="#ffffff"/>

            <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="${species === 'undead' ? '#0a0a0a' : '#ffffff'}"/>
            <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="${species === 'undead' ? '#0a0a0a' : skin.shadow}" stroke-width="${species === 'undead' ? 1.8 : 0.8}"/>
            <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="${eye.dark}"/>
            <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="${eye.light}"/>
            ${species === 'cat' || species === 'dragon' ? '<ellipse cx="62.5" cy="41.8" rx="0.85" ry="3.3" fill="#241103"/>' : `<circle cx="62.5" cy="41.5" r="2.2" fill="${species === 'undead' ? '#4ade80' : '#241103'}"/>`}
            <circle cx="60.5" cy="39" r="1.8" fill="#ffffff"/>
            <circle cx="64.5" cy="43.5" r="0.9" fill="#ffffff"/>

            <!-- Paupières garçon : trait supérieur épuré sans cil saillant, teinte cheveux en mode produit -->
            <g id="boy-eyelashes" style="mix-blend-mode: multiply;">
                <path d="M30 38 Q37 34 44 38" fill="none" stroke="${lashColor}" stroke-width="2.2" stroke-linecap="round"/>
                <path d="M56 38 Q63 34 70 38" fill="none" stroke="${lashColor}" stroke-width="2.2" stroke-linecap="round"/>
            </g>

            ${species === 'cat' ? '<path d="M 48.3,46.8 L 51.7,46.8 Q 50,49 50,49 Q 50,49 48.3,46.8 Z" fill="#f472b6"/>' : `<polygon points="48.6,47.2 51.4,47.2 50,47.9" fill="${skin.shadow}" stroke="${skin.shadow}" stroke-width="0.7" stroke-linejoin="round"/>`}

            ${species === 'dragon' ? `
            <!-- Écailles draconiques délicates sur les tempes / pommettes, couleur d'ombre de carnation -->
            <g id="boy-dragon-scales" opacity="0.65">
                <polygon points="26,44 28,42 30,44 28,46" fill="${skin.shadow}"/>
                <polygon points="24,47 26,45 28,47 26,49" fill="${skin.shadow}"/>
                <polygon points="28,49 30,47 32,49 30,51" fill="${skin.shadow}"/>
                <polygon points="74,44 72,42 70,44 72,46" fill="${skin.shadow}"/>
                <polygon points="76,47 74,45 72,47 74,49" fill="${skin.shadow}"/>
                <polygon points="72,49 70,47 68,49 70,51" fill="${skin.shadow}"/>
            </g>` : ''}

            ${styleKey === 'pirate_boy' ? `
            <!-- Bouche souriante de corsaire et moustache harmonieuse suivant la même courbe -->
            <!-- 1. Tracé de la bouche souriante en sablier, épousant le sourire de corsaire -->
            <path d="${sablier('M 44.2,53.2 Q 50,57.4 55.8,53.2', 1.6)}" fill="${mouthColor}"/>
            <!-- 2. Mouche / impériale de corsaire sous la lèvre inférieure (style Jack Sparrow) -->
            <path d="${fuseau('M 50,58.2 Q 50,59.3 50,60.4', 1.2, 8)}" fill="${hairColor}"/>
            <!-- 3. Moustache de corsaire : suit exactement la même courbure que le sourire juste au-dessus de la lèvre, avec pointes effilées recourbées -->
            <g id="boy-pirate-mustache">
                <!-- Ailes de moustache en plume partant du centre (49.6, 50.2) vers les pointes, suivant en parallèle la courbure du sourire -->
                <path d="${plume('M 49.7,50.2 Q 45,52.2 38.8,49.2', 2.2, 14)} ${plume('M 50.3,50.2 Q 55,52.2 61.2,49.2', 2.2, 14)}" fill="${hairColor}"/>
                <!-- Liseré de profondeur / volume en fuseau sur le bord inférieur de la moustache -->
                <path d="${fuseau('M 49.4,50.8 Q 45.2,52.6 40,50', 1.0, 10)} ${fuseau('M 50.6,50.8 Q 54.8,52.6 60,50', 1.0, 10)}" fill="${mixHex(hairColor, '#000000', 0.35)}"/>
                <!-- Fin effilement supérieur remontant en pointe fine de corsaire -->
                <path d="${fuseau('M 41.5,50.4 Q 38.5,49.4 37,47.2', 0.8, 8)} ${fuseau('M 58.5,50.4 Q 61.5,49.4 63,47.2', 0.8, 8)}" fill="${hairColor}"/>
            </g>` : mood && species !== 'orc' ? getSmileMouth(mouthColor, mood === 'sad') : species === 'orc' ? `
            <!-- Peintures de guerre rouges tribales sous les yeux -->
            <polygon points="29,45 38,47 37,49 28,47" fill="#b91c1c" opacity="0.85"/>
            <polygon points="71,45 62,47 63,49 72,47" fill="#b91c1c" opacity="0.85"/>
            <!-- Bouche orc droite et plus large basée sur la couleur de peau mais beaucoup plus foncée -->
            <!-- NOTE Trait à largeur variable profil sablier, généré depuis la droite 41,52 vers 59,52 -->
            ${mood ? getSmileMouth(mouthColor, mood === 'sad') : `
            <path d="${sablier('M 41,52 C 47,52 53,52 59,52', 2.2)}" fill="${mouthColor}"/>
            <path d="M 40.5,53.5 L 41.5,52 L 58.5,52 L 59.5,53.5" stroke="${mouthColor}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
            <!-- Crocs inférieurs orc : écartés aux canines, légèrement plus petits et avec pointes arrondies SANS contour -->
            <path d="M 42.2,52.5 C 42.2,49.5 42.8,48 43.6,48 C 44.4,48 45.0,49.5 45.0,52.5 Z" fill="#fffbeb"/>
            <ellipse cx="43.2" cy="50" rx="0.4" ry="1.2" fill="#ffffff" opacity="0.8"/>
            <path d="M 55.0,52.5 C 55.0,49.5 55.6,48 56.4,48 C 57.2,48 57.8,49.5 57.8,52.5 Z" fill="#fffbeb"/>
            <ellipse cx="56.8" cy="50" rx="0.4" ry="1.2" fill="#ffffff" opacity="0.8"/>`}` : species === 'cat' ? `
            <!-- Bouche de chat en ω : petit croc ivoire arrondi façon orc (sans contour, pointe vers le bas) sur le côté droit, glissé derrière la lèvre, puis deux arcs fuseau de la couleur de bouche -->
            <path d="M 53.35,52.2 C 53.35,53.5 53.65,54.1 54.05,54.1 C 54.45,54.1 54.75,53.5 54.75,52.2 Z" fill="#fffbeb"/><ellipse cx="53.85" cy="53" rx="0.18" ry="0.5" fill="#ffffff" opacity="0.8"/>
            <path d="${fuseau('M 45,51.2 C 46.05,53.15 48.85,53.38 50,51.4', 1.29, 10)} ${fuseau('M 50,51.4 C 51.15,53.38 53.95,53.15 55,51.2', 1.29, 10)}" fill="${mouthColor}"/>` : (species === 'shadow' || species === 'vampire' || species === 'undead') ? `
            <!-- Bouche droite, sans sourire (Ombre et Vampire) : fuseau horizontal de la couleur de bouche -->
            <path d="${sablier('M 46,52.6 C 48.7,52.6 51.3,52.6 54,52.6', 1.5)}" fill="${mouthColor}"/>
            ${species === 'vampire' ? `<!-- Canines supérieures de vampire : deux crocs ivoire arrondis, sans contour, sous la lèvre -->
            <path d="M 46.1,52.9 C 46.1,54.9 46.6,56.1 47,56.1 C 47.4,56.1 47.9,54.9 47.9,52.9 Z" fill="#fffbeb"/><ellipse cx="46.8" cy="54.3" rx="0.2" ry="0.7" fill="#ffffff" opacity="0.8"/>
            <path d="M 52.1,52.9 C 52.1,54.9 52.6,56.1 53,56.1 C 53.4,56.1 53.9,54.9 53.9,52.9 Z" fill="#fffbeb"/><ellipse cx="52.8" cy="54.3" rx="0.2" ry="0.7" fill="#ffffff" opacity="0.8"/>` : ''}` : `
            <!-- Bouche souriante basée sur la couleur de peau mais beaucoup plus foncée -->
            <!-- NOTE Trait à largeur variable profil sablier (épais aux commissures, étranglé au centre), généré depuis Q 45,51 50,56.5 55,51 -->
            ${getSmileMouth(mouthColor, mood === 'sad')}`}
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
    legs: (skin = SKIN_DEFAULT) => `
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
            <path d="${fuseau('M 40,83 C 39.59,86.16 37.63,88.88 37,92', 0.8, 10)}" fill="#133835"/>
            <path d="${fuseau('M 50,83.5 C 50,86.83 50,90.17 50,93.5', 0.8, 10)}" fill="#133835"/>
            <path d="${fuseau('M 60,83 C 60.41,86.16 62.37,88.88 63,92', 0.8, 10)}" fill="#133835"/>
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
            <path d="${fuseau('M 36.65,82.5 C 45.46,84.1 54.54,84.1 63.35,82.5', 5.4, 16)}" fill="#1f2937"/>
            <g transform="translate(0 1.2)"><rect x="47" y="79.5" width="6" height="6" rx="1.2" fill="#ffb733" stroke="#1f2937" stroke-width="0.8"/></g>
            <g transform="translate(0 0.49)"><rect x="58.5" y="80.5" width="3.5" height="5.5" rx="1.2" fill="#489e96" stroke="#1b4d49" stroke-width="0.8"/></g>
            <g transform="translate(0 0.5)"><circle cx="60.2" cy="83.2" r="0.7" fill="#ffffff"/></g>
        </g>`,
    arms: (skin = SKIN_DEFAULT) => `
        <g id="girl-arms">
            <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="#ff9d00"/>
            <ellipse cx="27" cy="81.5" rx="3.6" ry="3.3" fill="${skin.base}"/>
            <!-- NOTE Séparations des doigts en fuseau -->
            <path d="${fuseau('M 26,81.8 C 25.8,82.62 25.74,83.46 25.8,84.3', 0.64, 8)} ${fuseau('M 28,81.8 C 28.2,82.62 28.26,83.46 28.2,84.3', 0.64, 8)}" fill="${skin.shadow}"/>
            <path d="M67 63 C74 66.5, 76 70.5, 75 75.5 C72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="#ff9d00"/>
            <ellipse cx="76" cy="75.5" rx="3.6" ry="3.3" fill="${skin.base}"/>
            <!-- NOTE Séparations des doigts en fuseau -->
            <path d="${fuseau('M 75,75.8 C 74.8,76.62 74.74,77.46 74.8,78.3', 0.64, 8)} ${fuseau('M 77,75.8 C 77.2,76.62 77.26,77.46 77.2,78.3', 0.64, 8)}" fill="${skin.shadow}"/>
        </g>`,
    headBase: (withTiara = false, skin = SKIN_DEFAULT, species = 'human') => `
        <g id="girl-head-base-full">
            <rect x="46" y="58" width="8" height="4" fill="${skin.shadow}"/>
            ${getSpeciesEars(species, skin, 'girl')}
            <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="${skin.base}"/>
            ${withTiara ? `
            <path d="M 21.5,25 L 24.71,24.01 L 28.53,23.3 L 31.99,22.99 L 35.71,22.78 L 39.64,22.66 L 42.7,22.67 L 46.85,22.64 L 50,22.65 L 53.15,22.64 L 57.3,22.67 L 60.36,22.66 L 64.29,22.78 L 68.01,22.99 L 71.47,23.3 L 75.29,24.01 L 78.5,25 L 78.5,25 L 75.72,22.96 L 72.07,21.16 L 68.66,19.83 L 64.89,18.73 L 60.84,17.86 L 57.67,17.33 L 53.31,16.95 L 50,16.85 L 46.69,16.95 L 42.33,17.33 L 39.16,17.86 L 35.11,18.73 L 31.34,19.83 L 27.93,21.16 L 24.28,22.96 L 21.5,25 L 21.5,25 Z" fill="#489e96"/>
            <circle cx="28" cy="22" r="3.5" fill="#ff9d00"/>
            <circle cx="28" cy="22" r="1.8" fill="#ffffff"/>` : ''}
        </g>`,
    faceFeatures: (eye = { dark: '#6d2e05', light: '#b45309' }, skin = SKIN_DEFAULT, species = 'human', hairColor = '#5a2d0c', styleKey = null, mood = null) => {
        const lashColor = species === 'undead' ? '#0a0a0a' : hairColor;
        const mouthColor = getSkinMouthColor(skin);
        return `
        <g id="girl-face-features-full">
            <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="${species === 'undead' ? '#0a0a0a' : '#ffffff'}"/>
            <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="none" stroke="${species === 'undead' ? '#0a0a0a' : skin.shadow}" stroke-width="${species === 'undead' ? 1.8 : 0.8}"/>
            <ellipse cx="37.5" cy="41.5" rx="4.2" ry="4.8" fill="${eye.dark}"/>
            <ellipse cx="37.5" cy="42.5" rx="3.5" ry="3.5" fill="${eye.light}"/>
            ${species === 'cat' || species === 'dragon' ? '<ellipse cx="37.5" cy="41.8" rx="0.85" ry="3.3" fill="#241103"/>' : `<circle cx="37.5" cy="41.5" r="2.2" fill="${species === 'undead' ? '#4ade80' : '#241103'}"/>`}
            <circle cx="35.5" cy="39" r="1.8" fill="#ffffff"/>
            <circle cx="39.5" cy="43.5" r="1" fill="#ffffff"/>

            <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="${species === 'undead' ? '#0a0a0a' : '#ffffff'}"/>
            <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="${species === 'undead' ? '#0a0a0a' : skin.shadow}" stroke-width="${species === 'undead' ? 1.8 : 0.8}"/>
            <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="${eye.dark}"/>
            <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="${eye.light}"/>
            ${species === 'cat' || species === 'dragon' ? '<ellipse cx="62.5" cy="41.8" rx="0.85" ry="3.3" fill="#241103"/>' : `<circle cx="62.5" cy="41.5" r="2.2" fill="${species === 'undead' ? '#4ade80' : '#241103'}"/>`}
            <circle cx="60.5" cy="39" r="1.8" fill="#ffffff"/>
            <circle cx="64.5" cy="43.5" r="1" fill="#ffffff"/>

            <!-- Cils manga fille : même teinte que les cheveux avec mode de fusion produit -->
            <g id="girl-eyelashes" style="mix-blend-mode: multiply;">
                <!-- Cils manga supérieurs œil gauche -->
                <polygon points="29.5,39.2 26.5,35.8 31.8,37.5" fill="${lashColor}"/>
                <polygon points="32.2,37.2 30.8,34.2 34.2,36.0" fill="${lashColor}"/>
                <polygon points="34.8,35.6 34.2,33.5 36.5,34.8" fill="${lashColor}"/>
                <path d="M30 38 Q37 33 44 38" fill="none" stroke="${lashColor}" stroke-width="2.2" stroke-linecap="round"/>
                <!-- Trait et cils inférieurs œil gauche -->
                <path d="M32 46.0 Q37 48.1 42 46.0" fill="none" stroke="${lashColor}" stroke-width="1" stroke-linecap="round"/>
                <polygon points="33.5,46.5 34.2,48.3 35.0,47.0" fill="${lashColor}"/>
                <polygon points="36.2,47.2 37.0,48.8 37.8,47.2" fill="${lashColor}"/>
                <polygon points="39.0,47.0 39.8,48.2 40.5,46.5" fill="${lashColor}"/>

                <!-- Cils manga supérieurs œil droit -->
                <polygon points="70.5,39.2 73.5,35.8 68.2,37.5" fill="${lashColor}"/>
                <polygon points="67.8,37.2 69.2,34.2 65.8,36.0" fill="${lashColor}"/>
                <polygon points="65.2,35.6 65.8,33.5 63.5,34.8" fill="${lashColor}"/>
                <path d="M56 38 Q63 33 70 38" fill="none" stroke="${lashColor}" stroke-width="2.2" stroke-linecap="round"/>
                <!-- Trait et cils inférieurs œil droit -->
                <path d="M58 46.0 Q63 48.1 68 46.0" fill="none" stroke="${lashColor}" stroke-width="1" stroke-linecap="round"/>
                <polygon points="66.5,46.5 65.8,48.3 65.0,47.0" fill="${lashColor}"/>
                <polygon points="63.8,47.2 63.0,48.8 62.2,47.2" fill="${lashColor}"/>
                <polygon points="61.0,47.0 60.2,48.2 59.5,46.5" fill="${lashColor}"/>
            </g>

            ${species === 'cat' ? '<path d="M 48.3,46.8 L 51.7,46.8 Q 50,49 50,49 Q 50,49 48.3,46.8 Z" fill="#f472b6"/>' : `<polygon points="48.6,47.2 51.4,47.2 50,47.9" fill="${skin.shadow}" stroke="${skin.shadow}" stroke-width="0.7" stroke-linejoin="round"/>`}

            ${species === 'dragon' ? `
            <!-- Écailles draconiques délicates sur les tempes / pommettes, couleur d'ombre de carnation -->
            <g id="girl-dragon-scales" opacity="0.65">
                <polygon points="26,44 28,42 30,44 28,46" fill="${skin.shadow}"/>
                <polygon points="24,47 26,45 28,47 26,49" fill="${skin.shadow}"/>
                <polygon points="28,49 30,47 32,49 30,51" fill="${skin.shadow}"/>
                <polygon points="74,44 72,42 70,44 72,46" fill="${skin.shadow}"/>
                <polygon points="76,47 74,45 72,47 74,49" fill="${skin.shadow}"/>
                <polygon points="72,49 70,47 68,49 70,51" fill="${skin.shadow}"/>
            </g>` : ''}

            ${mood && species !== 'orc' ? getSmileMouth(mouthColor, mood === 'sad') : species === 'orc' ? `
            <!-- Peintures de guerre rouges tribales sous les yeux -->
            <polygon points="29,45 38,47 37,49 28,47" fill="#b91c1c" opacity="0.85"/>
            <polygon points="71,45 62,47 63,49 72,47" fill="#b91c1c" opacity="0.85"/>
            <!-- Bouche orc droite et plus large basée sur la couleur de peau mais beaucoup plus foncée -->
            <!-- NOTE Trait à largeur variable profil sablier, généré depuis la droite 41,52 vers 59,52 -->
            ${mood ? getSmileMouth(mouthColor, mood === 'sad') : `
            <path d="${sablier('M 41,52 C 47,52 53,52 59,52', 2.2)}" fill="${mouthColor}"/>
            <path d="M 40.5,53.5 L 41.5,52 L 58.5,52 L 59.5,53.5" stroke="${mouthColor}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
            <!-- Crocs inférieurs orc : écartés aux canines, légèrement plus petits et avec pointes arrondies SANS contour -->
            <path d="M 42.2,52.5 C 42.2,49.5 42.8,48 43.6,48 C 44.4,48 45.0,49.5 45.0,52.5 Z" fill="#fffbeb"/>
            <ellipse cx="43.2" cy="50" rx="0.4" ry="1.2" fill="#ffffff" opacity="0.8"/>
            <path d="M 55.0,52.5 C 55.0,49.5 55.6,48 56.4,48 C 57.2,48 57.8,49.5 57.8,52.5 Z" fill="#fffbeb"/>
            <ellipse cx="56.8" cy="50" rx="0.4" ry="1.2" fill="#ffffff" opacity="0.8"/>`}` : species === 'cat' ? `
            <!-- Bouche de chat en ω : petit croc ivoire arrondi façon orc (sans contour, pointe vers le bas) sur le côté droit, glissé derrière la lèvre, puis deux arcs fuseau de la couleur de bouche -->
            <path d="${fuseau('M 45,51.2 C 46.05,53.15 48.85,53.38 50,51.4', 1.29, 10)} ${fuseau('M 50,51.4 C 51.15,53.38 53.95,53.15 55,51.2', 1.29, 10)}" fill="${mouthColor}"/>` : species === 'dragon' ? `
            <!-- Drakéide : bouche fille complète, lèvres affirmées -->
            ${mood ? getSmileMouth(mouthColor, mood === 'sad') : getFullLipsMouth(mixHex(skin.shadow, '#f43f5e', 0.4))}` : styleKey === 'scholar_girl' ? `
            <!-- Mage Érudite : bouche fille complète, lèvres rosées dérivées de la peau (plus claires que la couleur de bouche) -->
            ${mood ? getSmileMouth(mouthColor, mood === 'sad') : getFullLipsMouth(mixHex(skin.shadow, '#f43f5e', 0.45))}` : species === 'elf' ? `
            <!-- Elfe : bouche fille complète, lèvres rosées dérivées de la peau -->
            ${mood ? getSmileMouth(mouthColor, mood === 'sad') : getFullLipsMouth(mixHex(skin.shadow, '#f43f5e', 0.38))}` : (species === 'undead' || species === 'shadow') ? `
            <!-- Nécromancienne et Sorcière Shadow : bouche fille complète (lèvres pleines) -->
            ${mood ? getSmileMouth(mouthColor, mood === 'sad') : getFullLipsMouth(mouthColor)}` : (species === 'shadow' || species === 'vampire') ? `
            <!-- Bouche droite, sans sourire (Ombre garçon et Vampire) : fuseau horizontal de la couleur de bouche -->
            <path d="${sablier('M 46,52.6 C 48.7,52.6 51.3,52.6 54,52.6', 1.5)}" fill="${mouthColor}"/>
            ${species === 'vampire' ? `<!-- Canines supérieures de vampire : deux crocs ivoire arrondis, sans contour, sous la lèvre -->
            <path d="M 46.1,52.9 C 46.1,54.9 46.6,56.1 47,56.1 C 47.4,56.1 47.9,54.9 47.9,52.9 Z" fill="#fffbeb"/><ellipse cx="46.8" cy="54.3" rx="0.2" ry="0.7" fill="#ffffff" opacity="0.8"/>
            <path d="M 52.1,52.9 C 52.1,54.9 52.6,56.1 53,56.1 C 53.4,56.1 53.9,54.9 53.9,52.9 Z" fill="#fffbeb"/><ellipse cx="52.8" cy="54.3" rx="0.2" ry="0.7" fill="#ffffff" opacity="0.8"/>` : ''}` : `
            <!-- Bouche souriante basée sur la couleur de peau mais beaucoup plus foncée -->
            <!-- NOTE Trait à largeur variable profil sablier (épais aux commissures, étranglé au centre), généré depuis Q 45,51 50,56.5 55,51 -->
            ${getSmileMouth(mouthColor, mood === 'sad')}`}
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
                <!-- Baguettes orange à 45° qui tiennent les chignons : traits en fuseau courbés, ajustés au diamètre du chignon (de bord à bord à 45°) -->
                <path transform="translate(0 -4) rotate(-15 21 16)" d="${fuseau('M 14.8,22.2 C 20.7,19.9 24.9,15.7 27.2,9.8', 1.5, 14)}" fill="#ff9d00"/>
                <path transform="translate(0 -4) rotate(15 79 16)" d="${fuseau('M 85.2,22.2 C 79.3,19.9 75.1,15.7 72.8,9.8', 1.5, 14)}" fill="#ff9d00"/>
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

                <!-- Reflets soyeux sur les boucles : mêmes courbes qu'avant, tracées en fuseau -->
                <path d="${fuseau('M 12,36 C 8,42 12,48 18,48', 1.6, 12)} ${fuseau('M 14,54 C 10,60 14,66 20,66', 1.5, 12)} ${fuseau('M 16,70 C 14,75 18,78 22,78', 1.3, 12)} ${fuseau('M 88,36 C 92,42 88,48 82,48', 1.6, 12)} ${fuseau('M 86,54 C 90,60 86,66 80,66', 1.5, 12)} ${fuseau('M 84,70 C 86,75 82,78 78,78', 1.3, 12)}" fill="#ffffff" opacity="0.22"/>

                <!-- Ombres de creux entre les boucles : mêmes courbes qu'avant, tracées en fuseau -->
                <path d="${fuseau('M 16,46 C 22,46 24,52 24,56', 1.4, 12)} ${fuseau('M 84,46 C 78,46 76,52 76,56', 1.4, 12)}" fill="#000000" opacity="0.18"/>
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
                <!-- Bas du carré : quelques brèches (encoches) le long de la coupe -->
                <path d="M 15,66 C 15,20 26,-5 50,-5 C 74,-5 85,20 85,66 L 78,66 L 76.8,61 L 75.2,66 L 62,66 L 60.8,60.8 L 59.4,66 L 44,66 L 42.8,61.4 L 41.4,66 L 28,66 L 26.8,61 L 25.4,66 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="girl-hair-front-full">
                <!-- Frange droite, bord bas presque horizontal, quelques brèches (petites encoches) du côté droit -->
                <path d="M 21,30 C 24,12 36,6 50,6 C 64,6 76,12 79,30 L 79,36 L 73,36 L 71.8,31.4 L 70.4,36 L 63,36 L 61.8,31.8 L 60.4,36 L 55,36 L 54,32.6 L 52.8,36 L 21,36 Z" fill="${color}"/>
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
                <g transform="translate(0 4)">
                <path d="M 22,24 C 4,36 2,56 6,70 C 8,78 8,88 10,95 C 14,88 20,80 22,60 C 22,46 26,34 30,26 Z" fill="${color}"/>
                <path d="M 78,24 C 96,36 98,56 94,70 C 92,78 92,88 90,95 C 86,88 80,80 78,60 C 78,46 74,34 70,26 Z" fill="${color}"/>
                </g>
            </g>`,
        getHairFront: (color) => `
            <g id="girl-hair-front-full">
                <!-- Cheveux de devant repris de la fée : frange en mèches et mèches latérales -->
                ${fairyGirlFrontHair(color)}
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
                <path d="${fuseau('M 41,87 C 42,92 43,97 44,102', 1, 8)}" fill="#09090b"/>
                <!-- Bandages mollet gauche -->
                <rect x="40" y="103" width="8" height="3" fill="#3f3f46"/>
                <line x1="40" y1="104.5" x2="48" y2="104.5" stroke="#71717a" stroke-width="0.8"/>
                <!-- Pied / Tabi noir gauche -->
                <path d="M39.5 106 C39.5 104, 48.5 104, 48.5 106 L49 113.5 C49 115, 38.5 115, 38.5 113.5 Z" fill="#09090b"/>
                <line x1="44" y1="106" x2="44" y2="114" stroke="#27272a" stroke-width="0.8"/>
                
                <!-- Jambe droite losange bouffant -->
                <polygon points="51,85 62,85 69,94 60,103 52,103 48,94" fill="#18181b"/>
                <polygon points="53,87 62,87 66,94 59,102 54,102 51,94" fill="#27272a"/>
                <path d="${fuseau('M 59,87 C 58,92 57,97 56,102', 1, 8)}" fill="#09090b"/>
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
                <path d="${fuseau('M 36.25,84 C 45.32,85.6 54.68,85.6 63.75,84', 6.75, 16)}" fill="#18181b"/>
                <path d="${fuseau('M 36.25,84 C 45.32,85.6 54.68,85.6 63.75,84', 2.4, 16)}" fill="#b91c1c"/>
                <g transform="translate(0 1.2)"><circle cx="50" cy="84" r="1.8" fill="#fbbf24"/></g>
                <!-- Pan de tissu flottant noir et rouge -->
                <g transform="translate(0 0.29)"><path d="M 39,84 L 35,98 L 39,96 L 41,84 Z" fill="#b91c1c"/></g>
                <g transform="translate(0 0.5)"><path d="M 40,84 L 37,97 L 40,95 L 42,84 Z" fill="#09090b"/></g>
            </g>`,
        arms: (skin = SKIN_DEFAULT) => `
            <g id="boy-arms-ninja">
                <!-- Bras shinobi avec protège-bras renforcés -->
                <path d="M32 64 C23 71, 22 79, 28 85 C31 85, 33 81, 35 77 Z" fill="#09090b"/>
                <rect x="25" y="73" width="7" height="8" rx="1" fill="#27272a" stroke="#09090b" stroke-width="0.6" transform="rotate(-15 28 77)"/>
                <ellipse cx="28" cy="85" rx="3.8" ry="3.5" fill="${skin.base}"/>
                <!-- NOTE Séparations des doigts en fuseau -->
                <path d="${fuseau('M 27,85.3 C 26.8,86.18 26.74,87.1 26.8,88', 0.64, 8)} ${fuseau('M 29,85.3 C 29.2,86.18 29.26,87.1 29.2,88', 0.64, 8)}" fill="${skin.shadow}"/>
                <path d="M68 64 C77 69, 78 74, 76 81 C73 83, 70 80, 66 76 Z" fill="#09090b"/>
                <rect x="68" y="70" width="7" height="8" rx="1" fill="#27272a" stroke="#09090b" stroke-width="0.6" transform="rotate(15 71 74)"/>
                <!-- NOTE Main droite dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
            </g>`,
        headAccessory: "",
        handItem: (skin = SKIN_DEFAULT) => `
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
                    <path d="${fuseau('M -1.6,-1 C -0.73,-1 0.13,-1 1,-1', 0.65, 8)} ${fuseau('M -1.6,1 C -0.73,1 0.13,1 1,1', 0.65, 8)}" fill="${skin.shadow}"/>
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
                <path d="${fuseau('M 50,77.5 C 50,80 50,82.5 50,85', 1.6, 8)}" fill="#fbbf24"/>
            </g>`,
        belt: `
            <g id="boy-belt-mage">
                <path d="${fuseau('M 35.95,84.75 C 45.23,86.35 54.77,86.35 64.05,84.75', 6.08, 16)}" fill="#fbbf24"/>
                <g transform="translate(0 1.2)"><circle cx="50" cy="84.8" r="2.5" fill="#818cf8" stroke="#ffffff" stroke-width="0.6"/></g>
                <g transform="translate(0 0.53)"><rect x="58" y="83" width="5" height="6.5" rx="1.2" fill="#2e1065" stroke="#fbbf24" stroke-width="0.8"/></g>
            </g>`,
        arms: (skin = SKIN_DEFAULT) => `
            <g id="boy-arms-mage">
                <path d="M32 64 C23 71, 20 78, 25 84 C28 84, 32 80, 35 77 Z" fill="#4c1d95"/>
                <path d="M22 82 L26 84 L27 82 Z" fill="#fbbf24"/>
            <!-- NOTE Main gauche dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
                <path d="M68 64 C77 69, 80 75, 78 81 C75 83, 72 80, 66 76 Z" fill="#4c1d95"/>
                <path d="M75 79 L79 81 L80 79 Z" fill="#fbbf24"/>
                <ellipse cx="77" cy="80" rx="3.8" ry="3.5" fill="${skin.base}"/>
                <!-- NOTE Séparations des doigts en fuseau -->
                <path d="${fuseau('M 76,80.3 C 75.8,81.18 75.74,82.1 75.8,83', 0.64, 8)} ${fuseau('M 78,80.3 C 78.2,81.18 78.26,82.1 78.2,83', 0.64, 8)}" fill="${skin.shadow}"/>
            </g>`,
        headAccessory: `
            <g id="boy-head-mage">
                <!-- Bandeau magique orné d'un cristal azur -->
                <path d="M 21.5,25 L 24.71,24.01 L 28.53,23.3 L 31.99,22.99 L 35.71,22.78 L 39.64,22.66 L 42.7,22.67 L 46.85,22.64 L 50,22.65 L 53.15,22.64 L 57.3,22.67 L 60.36,22.66 L 64.29,22.78 L 68.01,22.99 L 71.47,23.3 L 75.29,24.01 L 78.5,25 L 78.5,25 L 75.72,22.96 L 72.07,21.16 L 68.66,19.83 L 64.89,18.73 L 60.84,17.86 L 57.67,17.33 L 53.31,16.95 L 50,16.85 L 46.69,16.95 L 42.33,17.33 L 39.16,17.86 L 35.11,18.73 L 31.34,19.83 L 27.93,21.16 L 24.28,22.96 L 21.5,25 L 21.5,25 Z" fill="#fbbf24"/>
                <circle cx="50" cy="20" r="4" fill="#38bdf8" stroke="#ffffff" stroke-width="1"/>
                <circle cx="49" cy="19" r="1.3" fill="#ffffff"/>
            </g>`,
        handItem: (skin = SKIN_DEFAULT) => `
            <g id="boy-hand-staff">
                <!-- Sceptre magique modélisé sur l'axe X=0, hampe centrée sur la main gauche (27.4, 84) -->
                <g id="boy-mage-staff" transform="translate(27.4, 84) rotate(-1.66)">
                    <rect x="-1.25" y="-48" width="2.5" height="69" rx="1.25" fill="#d97706"/>
                    <circle cx="0" cy="-52" r="7" fill="#818cf8" opacity="0.4"/>
                    <circle cx="0" cy="-52" r="5" fill="#c084fc" stroke="#fbbf24" stroke-width="1.2"/>
                    <circle cx="-1.5" cy="-53.5" r="1.8" fill="#ffffff"/>
                    <!-- Main refermée sur la poignée (origine du groupe) -->
                    ${gripHand(skin)}
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
                <path d="${fuseau('M 41,108 C 43.33,108 45.67,108 48,108', 1.2, 8)}" fill="#fbbf24"/>
                <path d="${fuseau('M 52,108 C 54.33,108 56.67,108 59,108', 1.2, 8)}" fill="#fbbf24"/>
            </g>`,
        body: `
            <g id="boy-body-archer">
                <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 62,61.5 C 66,61.5 69,62 69,65 L 62.5,85 L 37.5,85 Z" fill="#16a34a"/>
                <path d="M 39,63 L 61,63 L 57,85 L 43,85 Z" fill="#78350f"/>
                <path d="${fuseau('M 50,63 C 50,63.8 50,64.6 50,65.4', 1.2, 8)} ${fuseau('M 50,67 C 50,67.8 50,68.6 50,69.4', 1.2, 8)} ${fuseau('M 50,71 C 50,71.8 50,72.6 50,73.4', 1.2, 8)} ${fuseau('M 50,75 C 50,75.8 50,76.6 50,77.4', 1.2, 8)} ${fuseau('M 50,79 C 50,79.8 50,80.6 50,81.4', 1.2, 8)} ${fuseau('M 50,83 C 50,83.8 50,84.6 50,85.4', 1.2, 8)}" fill="#fbbf24"/>
                <path d="M 44,60 L 50,67 L 56,60 Z" fill="#fef08a"/>
            </g>`,
        belt: `
            <g id="boy-belt-archer">
                <path d="${fuseau('M 37.45,84.75 C 45.72,86.35 54.28,86.35 62.55,84.75', 6.08, 16)}" fill="#451a03"/>
                <g transform="translate(0 1.2)"><rect x="46" y="81.5" width="8" height="6.5" rx="1.5" fill="#fbbf24" stroke="#451a03" stroke-width="0.8"/></g>
            </g>`,
        arms: (skin = SKIN_DEFAULT) => `
            <g id="boy-arms-archer">
                <path d="M32 64 C24 71, 23 78, 29 84 C32 84, 34 81, 35 77 Z" fill="#16a34a"/>
                <rect x="25" y="77" width="7" height="6" rx="1.2" fill="#78350f" transform="rotate(-20 28 80)"/>
                <!-- NOTE Main gauche dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
                <path d="M68 64 C76 69, 78 72, 76 79 C73 81, 70 79, 66 75 Z" fill="#16a34a"/>
                <!-- NOTE Main droite dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
            </g>`,
        headAccessory: "",
        handItem: (skin = SKIN_DEFAULT) => `
            <g id="boy-hand-archer-equipment">
                <!-- Flèche modélisée sur l'axe X=0, tenue dans la main gauche (29, 84) inclinée à 45° -->
                <g id="boy-hand-arrow" transform="translate(29, 84) rotate(45)">
                    <polygon points="0,-36 3,-28 -3,-28" fill="#cbd5e1" stroke="#475569" stroke-width="0.7"/>
                    <path d="${fuseau('M 0,-35 C 0,-32.67 0,-30.33 0,-28', 0.8, 6)}" fill="#ffffff"/>
                    <rect x="-1.5" y="-28" width="3" height="2" rx="0.5" fill="#fbbf24"/>
                    <rect x="-0.9" y="-26" width="1.8" height="36" rx="0.9" fill="#78350f"/>
                    <rect x="-0.4" y="-26" width="0.8" height="36" rx="0.4" fill="#d97706"/>
                    <polygon points="0,3 4.5,6 4.5,10 0,8" fill="#15803d"/>
                    <polygon points="0,3 -4.5,6 -4.5,10 0,8" fill="#15803d"/>
                    <polygon points="0,5 3,7 3,9 0,8" fill="#fbbf24"/>
                    <polygon points="0,5 -3,7 -3,9 0,8" fill="#fbbf24"/>
                    <circle cx="0" cy="10" r="0.9" fill="#78350f"/>
                    <!-- Main refermée sur la poignée (origine du groupe) -->
                    ${gripHand(skin)}
                </g>
                <!-- Arc long modélisé autour de sa poignée, tenu dans la main droite (77, 79) -->
                <g id="boy-hand-bow" transform="translate(77, 79)">
                    <line x1="-12" y1="-26" x2="-12" y2="26" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>
                    <path d="M -12,-26 Q 12,0 -12,26" fill="none" stroke="#78350f" stroke-width="2.8" stroke-linecap="round"/>
                    <path d="M -12,-26 Q 13,0 -12,26" fill="none" stroke="#d97706" stroke-width="1.3" stroke-linecap="round"/>
                    <rect x="-2.5" y="-5" width="5" height="10" rx="1.2" fill="#fbbf24" stroke="#78350f" stroke-width="0.6"/>
                    <!-- Main refermée sur la poignée (origine du groupe) -->
                    ${gripHand(skin)}
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
                <path d="${fuseau('M 41,95 C 43.33,95 45.67,95 48,95', 1.2, 8)}" fill="#fbbf24"/>
                <polygon points="40,97 48.5,97 48,106 41,106" fill="#64748b"/>
                <path d="M39.5 106 C39.5 104, 49.5 104, 49.5 106 L50 113 C50 115, 39 115, 39 113 Z" fill="#334155"/>
                <rect x="42.5" y="107" width="4" height="2" rx="0.8" fill="#fbbf24"/>
                
                <polygon points="51,82 61,82 59,106 52,106" fill="#1e293b"/>
                <polygon points="51.5,84 60,84 59,95 52,95" fill="#94a3b8"/>
                <path d="${fuseau('M 52,95 C 54.5,95 57,95 59.5,95', 1.2, 8)}" fill="#fbbf24"/>
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
                <path d="${fuseau('M 39.05,82.75 C 46.24,84.35 53.76,84.35 60.95,82.75', 6.08, 16)}" fill="#1e293b"/>
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
        handItem: (skin = SKIN_DEFAULT) => `
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
                    <path d="${fuseau('M 0,-10 C 0,-20.33 0,-30.67 0,-41', 1.4, 10)}" fill="#ffffff"/>
                    <polygon points="-7,-33 0,-42 7,-33" fill="#ffffff" opacity="0.6"/>
                    <!-- Garde dorée massive et rubis -->
                    <polygon points="-10,-5 10,-5 8,-9 -8,-9" fill="#fbbf24" stroke="#b45309" stroke-width="0.8"/>
                    <circle cx="0" cy="-7" r="2.2" fill="#ef4444" stroke="#ffffff" stroke-width="0.5"/>
                    <!-- Poignée en cuir à fil d'or et pommeau au rubis -->
                    <rect x="-1.9" y="-5" width="3.8" height="12.5" rx="1.9" fill="#78350f"/>
                    <path d="${fuseau('M 0,-4.5 C 0,-3.83 0,-3.17 0,-2.5', 0.9, 6)} ${fuseau('M 0,-0.5 C 0,0.17 0,0.83 0,1.5', 0.9, 6)} ${fuseau('M 0,3.5 C 0,4.17 0,4.83 0,5.5', 0.9, 6)}" fill="#fbbf24"/>
                    <circle cx="0" cy="7.5" r="2.8" fill="#fbbf24" stroke="#78350f" stroke-width="0.8"/>
                    <circle cx="0" cy="7.5" r="1.4" fill="#ef4444"/>
                    <!-- Main refermée sur la poignée (origine du groupe) -->
                    ${gripHand({ base: '#cbd5e1', shadow: '#64748b' })}
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
                <path d="${fuseau('M 45,82 C 44.52,86.8 43.81,91.58 42.85,96.31 C 41.88,100.95 40.66,105.55 39,110', 1.2, 7)}" fill="#1e1b4b"/>
                <path d="${fuseau('M 55,82 C 55.48,86.8 56.19,91.58 57.16,96.31 C 58.12,100.95 59.34,105.55 61,110', 1.2, 7)}" fill="#1e1b4b"/>
                <path d="${fuseau('M 50,82 C 50,91.67 50,101.33 50,111', 1.2, 14)}" fill="#4c1d95"/>
                <!-- Motifs d'étoiles dorées brodées sur la robe -->
                <circle cx="50" cy="94" r="1.2" fill="#fbbf24"/>
                <circle cx="43" cy="103" r="0.9" fill="#e9d5ff"/>
                <circle cx="57" cy="103" r="0.9" fill="#e9d5ff"/>
                <!-- Ourlet doré ondulé au bas de la robe -->
                <path d="${fuseau('M 26,110 C 33.9,111.99 42.1,109.01 50,111 C 57.9,109.01 66.1,111.99 74,110', 1.61, 10)}" fill="#fbbf24"/>
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
                <path d="${fuseau('M 35.45,82.75 C 45.06,84.35 54.94,84.35 64.55,82.75', 6.08, 16)}" fill="#7e22ce"/>
                <!-- Boucle en croissant de lune or -->
                <g transform="translate(0 1.2)"><circle cx="50" cy="82.5" r="3.2" fill="#fbbf24"/></g>
                <g transform="translate(0 1.19)"><circle cx="51.5" cy="81.5" r="2.8" fill="#7e22ce"/></g>
            </g>`,
        arms: (skin = SKIN_DEFAULT) => `
            <g id="girl-arms-witch">
                <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="#6b21a8"/>
                <ellipse cx="27" cy="81.5" rx="3.6" ry="3.3" fill="${skin.base}"/>
                <!-- NOTE Séparations des doigts en fuseau -->
                <path d="${fuseau('M 26,81.8 C 25.8,82.62 25.74,83.46 25.8,84.3', 0.64, 8)} ${fuseau('M 28,81.8 C 28.2,82.62 28.26,83.46 28.2,84.3', 0.64, 8)}" fill="${skin.shadow}"/>
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
                <path d="${fuseau('M 20.5,18 C 38.5,22.69 57.77,22.09 75.5,16.5', 6.19, 16)}" fill="#9333ea"/>
                <!-- Vrai croissant de lune doré étincelant -->
                <path d="M 51,17 A 4.5,4.5 0 1 0 53,25 A 3.6,3.6 0 1 1 51,17 Z" fill="#fbbf24" stroke="#d97706" stroke-width="0.5"/>
                <circle cx="49" cy="20" r="0.8" fill="#ffffff"/>
            </g>`,
        handItem: (skin = SKIN_DEFAULT) => `
            <g id="girl-hand-witch-staff">
                <!-- Bâton de sorcière modélisé sur l'axe X=0, hampe centrée sur la main droite (76, 75.5) -->
                <g id="girl-witch-staff" transform="translate(76, 75.5)">
                    <rect x="-1.5" y="-41.5" width="3" height="74" rx="1.5" fill="#2e1065"/>
                    <path d="${fuseau('M 0,-40 C 0,-39 0,-38 0,-37', 0.8, 6)} ${fuseau('M 0,-34 C 0,-33 0,-32 0,-31', 0.8, 6)} ${fuseau('M 0,-28 C 0,-27 0,-26 0,-25', 0.8, 6)} ${fuseau('M 0,-22 C 0,-21 0,-20 0,-19', 0.8, 6)} ${fuseau('M 0,-16 C 0,-15 0,-14 0,-13', 0.8, 6)} ${fuseau('M 0,-10 C 0,-9 0,-8 0,-7', 0.8, 6)} ${fuseau('M 0,-4 C 0,-3 0,-2 0,-1', 0.8, 6)} ${fuseau('M 0,2 C 0,3 0,4 0,5', 0.8, 6)} ${fuseau('M 0,8 C 0,9 0,10 0,11', 0.8, 6)} ${fuseau('M 0,14 C 0,15 0,16 0,17', 0.8, 6)} ${fuseau('M 0,20 C 0,21 0,22 0,23', 0.8, 6)} ${fuseau('M 0,26 C 0,27 0,28 0,29', 0.8, 6)}" fill="#fbbf24"/>
                    <circle cx="0" cy="-49.5" r="9" fill="#c084fc" opacity="0.35"/>
                    <circle cx="0" cy="-49.5" r="6.5" fill="#9333ea" stroke="#fbbf24" stroke-width="1.2"/>
                    <circle cx="-2" cy="-52" r="2.2" fill="#ffffff"/>
                    <circle cx="1.5" cy="-48" r="1.2" fill="#e9d5ff"/>
                    <rect x="-2.5" y="-43" width="5" height="2.5" rx="0.6" fill="#fbbf24" stroke="#78350f" stroke-width="0.5"/>
                    <!-- Main refermée sur la poignée (origine du groupe) -->
                    ${gripHand(skin)}
                </g>
            </g>`
    },
    4: {
        id: 4,
        name: "4. Archère (Arc & Flèche)",
        backEquipment: "",
        legs: (skin = SKIN_DEFAULT) => `
            <g id="girl-legs-archer">
                <!-- Short d'archère aventurière & bottines de marche -->
                <!-- Short vert émeraude sombre -->
                <polygon points="38,82 49.5,82 49,93 37.5,93" fill="#047857"/>
                <path d="${fuseau('M 37.5,93 C 41.33,93 45.17,93 49,93', 1.2, 8)}" fill="#064e3b"/>
                <polygon points="50.5,82 62,82 62.5,93 51,93" fill="#047857"/>
                <path d="${fuseau('M 51,93 C 54.83,93 58.67,93 62.5,93', 1.2, 8)}" fill="#064e3b"/>
                
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
                <path d="${fuseau('M 38,82.5 C 45.9,84.1 54.1,84.1 62,82.5', 5.4, 16)}" fill="#78350f"/>
                <g transform="translate(0 1.2)"><circle cx="50" cy="82.5" r="2.5" fill="#fbbf24"/></g>
            </g>`,
        arms: (skin = SKIN_DEFAULT) => `
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
        handItem: (skin = SKIN_DEFAULT) => `
            <g id="girl-hand-archer-equipment">
                <!-- Flèche elfique modélisée sur l'axe X=0, tenue dans la main gauche (27, 81.5) inclinée à 45° -->
                <g id="girl-hand-arrow" transform="translate(27, 81.5) rotate(45)">
                    <polygon points="0,-36.5 3.5,-28.5 -3.5,-28.5" fill="#e2e8f0" stroke="#334155" stroke-width="0.7"/>
                    <path d="${fuseau('M 0,-35.5 C 0,-33.17 0,-30.83 0,-28.5', 0.9, 6)}" fill="#ffffff"/>
                    <rect x="-1.5" y="-28.5" width="3" height="2" rx="0.5" fill="#fbbf24"/>
                    <rect x="-0.8" y="-26.5" width="1.6" height="36" rx="0.8" fill="#854d0e"/>
                    <rect x="-0.35" y="-26.5" width="0.7" height="36" rx="0.35" fill="#fbbf24"/>
                    <polygon points="0,3.5 4.5,6.5 4.5,10.5 0,8.5" fill="#10b981"/>
                    <polygon points="0,3.5 -4.5,6.5 -4.5,10.5 0,8.5" fill="#10b981"/>
                    <polygon points="0,5.5 3,7.5 3,9.5 0,8.5" fill="#fbbf24"/>
                    <polygon points="0,5.5 -3,7.5 -3,9.5 0,8.5" fill="#fbbf24"/>
                    <circle cx="0" cy="10.5" r="0.8" fill="#78350f"/>
                    <!-- Main refermée sur la poignée (origine du groupe) -->
                    ${gripHand(skin)}
                </g>
                <!-- Arc elfique modélisé autour de sa poignée, tenu dans la main droite (76, 75.5) -->
                <g id="girl-hand-bow" transform="translate(76, 75.5)">
                    <line x1="-12" y1="-26" x2="-12" y2="26" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>
                    <path d="M -12,-26 Q 12,0 -12,26" fill="none" stroke="#a16207" stroke-width="2.6" stroke-linecap="round"/>
                    <path d="M -12,-26 Q 13,0 -12,26" fill="none" stroke="#fbbf24" stroke-width="1.2" stroke-linecap="round"/>
                    <rect x="-2.2" y="-5" width="4.4" height="10" rx="1" fill="#78350f" stroke="#fbbf24" stroke-width="0.6"/>
                    <!-- Main refermée sur la poignée (origine du groupe) -->
                    ${gripHand(skin)}
                </g>
            </g>`
    }
};
