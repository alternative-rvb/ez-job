/**
 * Trophée 31 : Le Chevalier de Glace, Humain (frost)
 * Module du trophée : tenue d'armure givrée, coupes de cheveux, couronne de cristaux, épée de cristal et entrée du registre RPG_TROPHIES.
 */

import { fuseau, plume, gripHand, fitBand, hairBase, SKIN_DEFAULT } from '../../avatar-kit.js';

// NOTE Gantelet d'acier givré : passé à gripHand() à la place de la carnation
const FROST_GAUNTLET = { base: '#cbd5e1', shadow: '#64748b' };

// ANCHOR Épée de cristal, modélisée sur l'axe X=0, origine au milieu de la poignée
const FROST_SWORD_MODEL = `
    <!-- Poignée de cuir bleu nuit cerclée d'argent -->
    <rect x="-1.5" y="-7" width="3" height="16" rx="1.2" fill="#1d3d63"/>
    <path d="${fuseau('M -1.5,-4 Q 0,-4 1.5,-4', 0.7, 6)} ${fuseau('M -1.5,5 Q 0,5 1.5,5', 0.7, 6)} ${fuseau('M -1.5,9 Q 0,9 1.5,9', 0.7, 6)}" fill="#cbd5e1"/>
    <!-- Pommeau : cristal taillé en losange -->
    <polygon points="0,16 -3.2,12.5 0,9 3.2,12.5" fill="#7dd3fc"/>
    <polygon points="0,16 0,9 3.2,12.5" fill="#38bdf8"/>
    <!-- Garde d'argent en ailes de givre, gemme azur au centre -->
    <path d="M -9,-7.5 L -5,-11 L -1.8,-9.2 L 0,-10.5 L 1.8,-9.2 L 5,-11 L 9,-7.5 L 5,-5.6 L 1.8,-6.8 L 0,-5.8 L -1.8,-6.8 L -5,-5.6 Z" fill="#cbd5e1"/>
    <polygon points="0,-10.2 1.8,-8 0,-5.9 -1.8,-8" fill="#38bdf8"/>
    <polygon points="0,-9.2 0.8,-8 0,-6.9 -0.8,-8" fill="#f0f9ff"/>
    <!-- Lame de cristal à facettes : moitié claire à gauche, moitié azur à droite -->
    <path d="M 0,-10 L -3.9,-12 L -3.3,-47 L 0,-66 Z" fill="#e0f2fe"/>
    <path d="M 0,-10 L 3.9,-12 L 3.3,-47 L 0,-66 Z" fill="#7dd3fc"/>
    <path d="M -3.9,-12 L -3.3,-47 L -1.4,-30 Z" fill="#bae6fd"/>
    <path d="M 3.9,-12 L 3.3,-47 L 1.4,-34 Z" fill="#38bdf8" opacity="0.55"/>
    <!-- Arête centrale lumineuse et éclats de givre -->
    <path d="${fuseau('M 0,-13 Q 0,-37.5 0,-62', 1.3, 14)}" fill="#f0f9ff"/>
    <path d="${fuseau('M -2.1,-22 Q -2.1,-31 -2.1,-40', 0.5, 8)} ${fuseau('M 2.1,-26 Q 2.1,-34 2.1,-42', 0.5, 8)}" fill="#ffffff" opacity="0.8"/>
`;

// ANCHOR Une mèche en fuseau de la couleur des cheveux
const frostLock = (color, d, width) => `<path d="${fuseau(d, width, 16)}" fill="${color}"/>`;

// ANCHOR Frange de glaçons : calotte qui démarre au point haut de la base courte (y -2), mèches larges à pointes obtuses, au-dessus des yeux
const FROST_FRINGE = (color) => `
    <path d="M 21,31 C 19,14 32,0 50,-2 C 68,0 81,14 79,31 C 77,28 75,26 72,25 C 72,30 70,34 66,36 C 64,30 61,26 57,24 C 56,30 53,35 50,37 C 46,32 42,27 39,25 C 38,30 36,34 33,36 C 31,31 29,27 26,25 C 24,27 22,29 21,31 Z" fill="${color}"/>
`;

// Tenue du trophée 31 : armure d'acier givré bleu glacier, cape bleu nuit à bord de glaçons, couronne de cristaux, épée de cristal
export const OUTFIT_FROST_KNIGHT = {
    id: 'frost_knight',
    name: 'Chevalier de Glace (Humain)',
    badge: 'Trophée 31',
    backEquipment: `
        <g id="outfit-frost-cape">
            <!-- Cape bleu nuit très sombre (#1d3d63, nettement plus foncée que la cuirasse #4f8fc9), bord bas en glaçons -->
            <path d="M 30,64 C 18,77 12,94 10,108 L 14,104 L 16,112 L 21,106 L 25,113 L 30,106 L 35,111 L 40,105 L 45,108 C 42,96 46,86 48,80 C 42,75 35,70 30,64 Z" fill="#1d3d63"/>
            <path d="M 70,64 C 82,77 88,94 90,108 L 86,104 L 84,112 L 79,106 L 75,113 L 70,106 L 65,111 L 60,105 L 55,108 C 58,96 54,86 52,80 C 58,75 65,70 70,64 Z" fill="#1d3d63"/>
            <path d="M 36,78 C 34,92 31,105 37,110 C 45,107 55,107 63,110 C 69,105 66,92 64,78 Z" fill="#102a47"/>
            <!-- Liseré d'argent le long des bords -->
            <path d="${fuseau('M 30,64 C 18,77 12,94 10,108', 1.1, 14)} ${fuseau('M 70,64 C 82,77 88,94 90,108', 1.1, 14)}" fill="#cbd5e1"/>
            <!-- Haut de cape derrière le cou et cols de cristal dressés derrière les épaules -->
            <path d="M 29,64 L 71,64 L 60,68 L 40,68 Z" fill="#1d3d63"/>
            <path d="M 28,63 L 21,50 L 36,59 Z" fill="#1d3d63"/>
            <path d="M 72,63 L 79,50 L 64,59 Z" fill="#1d3d63"/>
            <path d="${fuseau('M 22,51 Q 28,55 35,59', 0.8, 8)} ${fuseau('M 78,51 Q 72,55 65,59', 0.8, 8)}" fill="#cbd5e1"/>
        </g>`,
    legs: `
        <g id="outfit-frost-legs">
            <!-- Grèves d'acier bleu sombre à plaques givrées -->
            <polygon points="39,83 49,83 48.5,104 41,104" fill="#2f5d8f"/>
            <polygon points="51,83 61,83 59,104 51.5,104" fill="#2f5d8f"/>
            <path d="M 40,86 L 48,86 L 47,96 L 41,96 Z" fill="#4f8fc9"/>
            <path d="M 52,86 L 60,86 L 59,96 L 53,96 Z" fill="#4f8fc9"/>
            <!-- Solerets d'acier bleu nuit, bout pointu -->
            <path d="M 39,104 C 39,102 49.5,102 49.5,104 L 50,113 C 50,115 39,115 39,113 Z" fill="#1d3d63"/>
            <path d="M 50.5,104 C 50.5,102 61,102 61,104 L 61.5,113 C 61.5,115 50.5,115 50.5,113 Z" fill="#1d3d63"/>
            <path d="${fuseau('M 39.6,106.2 C 43,107.4 46,107.4 49.4,106.2', 1, 10)} ${fuseau('M 51,106.2 C 54.4,107.4 57.4,107.4 60.8,106.2', 1, 10)}" fill="#cbd5e1"/>
            <!-- Genouillères en cristal -->
            <polygon points="41,94 48,94 44.5,99" fill="#bae6fd"/>
            <polygon points="53,94 60,94 56.5,99" fill="#bae6fd"/>
        </g>`,
    body: `
        <g id="outfit-frost-body">
            <!-- Cuirasse d'acier givré bleu glacier -->
            <path d="M 33,65 C 33,62 36,61.5 39,61.5 L 61,61.5 C 64,61.5 67,62 67,65 L 64,86 L 36,86 Z" fill="#4f8fc9"/>
            <path d="M 61,61.5 C 64,61.5 67,62 67,65 L 64,86 L 58,86 C 61,76 62,68 61,61.5 Z" fill="#3f78ad"/>
            <!-- Plastron d'argent bordé de bleu nuit, flocon de cristal au centre -->
            <path d="M 42,61.5 L 50,79 L 58,61.5 Z" fill="#cbd5e1"/>
            <path d="M 44,63 L 50,75.5 L 56,63 Z" fill="#e2e8f0"/>
            <path d="${fuseau('M 42,61.5 Q 46,70 50,79', 1.1, 10)} ${fuseau('M 58,61.5 Q 54,70 50,79', 1.1, 10)}" fill="#1d3d63"/>
            <!-- Flocon : trois branches en fuseau croisées autour d'un cristal azur -->
            <path d="${fuseau('M 50,63.6 Q 50,69.5 50,75.4', 0.9, 8)} ${fuseau('M 44.6,66.6 Q 50,69.5 55.4,72.4', 0.9, 8)} ${fuseau('M 55.4,66.6 Q 50,69.5 44.6,72.4', 0.9, 8)}" fill="#38bdf8"/>
            <polygon points="50,67.2 52,70 50,72.8 48,70" fill="#0ea5e9"/>
            <polygon points="50,68.4 51,70 50,71.6 49,70" fill="#f0f9ff"/>
            <!-- Plaques latérales imbriquées en facettes de glace -->
            <path d="M 36,70 L 41,74 L 37,79 Z" fill="#3f78ad"/>
            <path d="M 64,70 L 59,74 L 63,79 Z" fill="#2f5d8f"/>
        </g>`,
    belt: `
        <g id="outfit-frost-belt">
            <!-- Ceinture de cuir bleu nuit ajustée à la taille, boucle de cristal sur monture d'argent -->
            <path d="${fuseau('M 36,83.5 C 44.5,85.5 55.5,85.5 64,83.5', 3.4, 12)}" fill="#1d3d63"/>
            <path d="${fuseau('M 37,83.1 C 44.5,84.9 55.5,84.9 63,83.1', 0.8, 12)}" fill="#cbd5e1"/>
            <g transform="translate(0 1)">
                <polygon points="46.5,81.6 53.5,81.6 52,86 48,86" fill="#cbd5e1"/>
                <polygon points="50,82.2 52,84 50,85.8 48,84" fill="#38bdf8"/>
                <polygon points="50,83 50.8,84 50,85 49.2,84" fill="#f0f9ff"/>
            </g>
        </g>`,
    arms: (skin = SKIN_DEFAULT) => `
        <g id="outfit-frost-arms">
            <!-- Brassard gauche d'acier givré, coudière de cristal -->
            <path d="M 33 63 C 26 67.5, 24 74.5, 27 81.5 C 30 81.5, 32.5 77.5, 35 73.5 Z" fill="#4f8fc9"/>
            <path d="${fitBand([[33, 63], [26, 67.5], [24, 74.5], [27, 81.5]], [[27, 81.5], [30, 81.5], [32.5, 77.5], [35, 73.5]], 0.62, 0.92, 0.12, 0.5, 0.4)}" fill="#cbd5e1"/>
            <polygon points="23,73 26,71 25,76" fill="#bae6fd"/>
            <!-- Main gauche gantée d'acier givré -->
            <ellipse cx="28.4" cy="83.6" rx="3.5" ry="3.2" fill="#cbd5e1" stroke="#64748b" stroke-width="0.5"/>
            <path d="${fuseau('M 27.6,84.2 C 27.4,85 27.4,85.8 27.6,86.6', 0.6, 8)} ${fuseau('M 29.6,84.2 C 29.8,85 29.8,85.8 29.6,86.6', 0.6, 8)}" fill="#64748b"/>
            <!-- Bras droit blindé (le gantelet qui tient l'épée est dessiné dans handItem) -->
            <path d="M 67 63 C 74 66.5, 76 70.5, 75 75.5 C 72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="#4f8fc9"/>
            <path d="${fitBand([[67, 63], [74, 66.5], [76, 70.5], [75, 75.5]], [[75, 75.5], [72.5, 77.5], [69.5, 75.5], [66, 71.5]], 0.62, 0.92, 0.12, 0.5, 0.4)}" fill="#cbd5e1"/>
            <polygon points="77,73 74,71 75,76" fill="#bae6fd"/>
        </g>`,
    headAccessory: `
        <g id="outfit-frost-crown">
            <!-- Couronne de givre en métal gris clair sans contour : bandeau, trois cristaux dressés, gemme azur -->
            <path d="${fuseau('M 28,26 C 36,20 64,20 72,26', 2.8, 14)}" fill="#cbd5e1"/>
            <polygon points="46.5,23.5 50,12 53.5,23.5" fill="#f8fdff"/>
            <polygon points="50,12 53.5,23.5 50,23.5" fill="#7dd3fc"/>
            <polygon points="37.5,22.4 40.6,14.5 43.5,21.6" fill="#f8fdff"/>
            <polygon points="56.5,21.6 59.4,14.5 62.5,22.4" fill="#f8fdff"/>
            <polygon points="59.4,14.5 62.5,22.4 56.5,21.6" fill="#7dd3fc"/>
            <circle cx="50" cy="22" r="2" fill="#38bdf8" stroke="#0c4a6e" stroke-width="0.4"/>
            <circle cx="49.5" cy="21.4" r="0.7" fill="#f0f9ff"/>
        </g>`,
    handItem: (skin = SKIN_DEFAULT) => `
        <g id="outfit-frost-sword">
            <!-- Épaulettes au premier plan, par-dessus les cheveux (calque handItem, jamais rendu en portrait) -->
            <g id="frost-pauldrons">
                <path d="M 34,62 C 30,58 24,59 23,66 C 28,68 32,67 36,65 Z" fill="#cbd5e1"/>
                <path d="M 66,62 C 70,58 76,59 77,66 C 72,68 68,67 64,65 Z" fill="#cbd5e1"/>
                <path d="${fuseau('M 24,60 C 23,66 28,68 35,65', 1, 8)} ${fuseau('M 76,60 C 77,66 72,68 65,65', 1, 8)}" fill="#1d3d63"/>
                <polygon points="27,60.6 29,54 31.4,60" fill="#bae6fd"/>
                <polygon points="73,60.6 71,54 68.6,60" fill="#bae6fd"/>
            </g>
            <!-- Épée de cristal tenue par la main droite (75.5, 76) -->
            <g id="frost-sword" transform="translate(75.5, 76) rotate(12)">
                ${FROST_SWORD_MODEL}
                <!-- Gantelet articulé serrant la poignée au centre de l'arme -->
                ${gripHand(FROST_GAUNTLET)}
            </g>
        </g>`
};

// SECTION Coupes de cheveux exclusives du Chevalier de Glace : garçon court en glaçons, fille mi-longue aux mèches de givre
export const FROST_STYLES = {
    frost_boy: {
        id: 'frost_boy',
        name: 'Frange de Glaçons (Garçon)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-frost-boy">
                <!-- ANCHOR Base courte : cercle plus grand que le crâne -->
                ${hairBase('court', color)}
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-frost-boy">
                ${FROST_FRINGE(color)}
            </g>`
    },
    frost_girl: {
        id: 'frost_girl',
        name: 'Mèches de Givre (Fille)',
        withTiara: false,
        getHairBack: (color) => `
            <g id="hair-back-frost-girl">
                <!-- ANCHOR Base mi-longue : ellipse qui descend jusqu'au cou -->
                ${hairBase('mi-long', color)}
                <!-- Pointes arrière en fuseau qui suivent la courbe de l'ellipse -->
                ${frostLock(color, 'M 24,50 C 22,60 26,68 32,72', 5)}
                ${frostLock(color, 'M 76,50 C 78,60 74,68 68,72', 5)}
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-frost-girl">
                ${FROST_FRINGE(color)}
                <!-- Mèches de côté en fuseau qui suivent la courbure du visage -->
                ${frostLock(color, 'M 25,28 C 20,40 20,54 25,64', 5.5)}
                ${frostLock(color, 'M 75,28 C 80,40 80,54 75,64', 5.5)}
                <path d="${plume('M 23,40 C 22,50 23,58 26,64', 3.2, 12)}" fill="${color}"/>
            </g>`
    }
};

// SECTION Fiche Trophée RPG 31 : Chevalier de Glace
export const FROST_TROPHY = {
    id: 'frost',
    shortId: 'frost',
    legacyId: 'trophy_frost_knight',
    number: 31,
    title: 'Le Chevalier de Glace',
    species: 'human',
    speciesName: 'Humain',
    className: 'Chevalier de Glace',
    badge: 'Nouveau',
    tagline: 'Ni le froid ni la peur ne font plier son armure !',
    description: 'Débloque l\'armure d\'acier givré, la cape à bord de glaçons, la couronne de cristaux et l\'épée de cristal du Chevalier de Glace.',
    rarity: 'légendaire',
    unlocks: {
        species: 'human',
        skins: [],
        hairs: ['#8fc3e8'],
        eyes: ['glacier-eye'],
        styles: { boy: 'frost_boy', girl: 'frost_girl' },
        outfit: 'frost_knight',
        label: 'Chevalier de Glace'
    },
    rewards: [
        { icon: 'bi-person-badge', label: 'Espèce : Humain' },
        { icon: 'bi-snow', label: 'Classe : Chevalier de Glace' },
        { icon: 'bi-scissors', label: 'Coupes exclusives : Frange de Glaçons (G) / Mèches de Givre (F)' },
        { icon: 'bi-slash-square', label: 'Arme : Épée de cristal' },
        { icon: 'bi-person-bounding-box', label: 'Tenue : Armure givrée, cape à glaçons & couronne de cristaux' },
        { icon: 'bi-palette', label: 'Teintes débloquées : Bleu Givre, Iris Glacier' }
    ],
    boyPreset: {
        id: 'frs_b',
        type: 'boy',
        styleKey: 'frost_boy',
        styleId: 1,
        outfitKey: 'frost_knight',
        species: 'human',
        skinColor: 'golden',
        hairColor: '#8fc3e8',
        eyeColor: 'glacier-eye'
    },
    girlPreset: {
        id: 'frs_g',
        type: 'girl',
        styleKey: 'frost_girl',
        styleId: 1,
        outfitKey: 'frost_knight',
        species: 'human',
        skinColor: 'golden',
        hairColor: '#8fc3e8',
        eyeColor: 'glacier-eye'
    }
};
