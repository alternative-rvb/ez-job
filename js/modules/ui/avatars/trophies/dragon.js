/**
 * Trophée 11 : Le Chevalier Dragon, Drakéide (dragon)
 * Module du trophée : tenue, coupes de cheveux, cornes draconiques, lance et entrée du registre RPG_TROPHIES.
 */

import { fuseau, plume, gripHand, fitBand, SKIN_DEFAULT } from '../../avatar-kit.js';

// ANCHOR Cornes draconiques (espèce dragon / drakéide) : cornes en S ascendantes en fuseau & plume dans l'esprit de Shadow, obsidienne et flammes rubis/or
export function getDragonHorns() {
    return `
        <g id="dragon-horns">
            <!-- Corne gauche : base plantée dans le crâne, grande corne ascendante effilée en plume et traits en fuseau de feu -->
            <circle cx="25.5" cy="16.5" r="5.2" fill="#18181b" stroke="#09090b" stroke-width="0.8"/>
            <!-- Ergot secondaire inférieur gauche -->
            <path d="${plume('M 26,17.5 C 22,20 18,21.5 13.5,21', 3.2, 12)}" fill="#18181b" stroke="#09090b" stroke-width="0.7"/>
            <path d="${fuseau('M 25,17.8 C 21.5,19.8 18,21 14.5,20.8', 1.2, 10)}" fill="#f59e0b"/>
            <!-- Corps principal de la grande corne gauche en plume -->
            <path d="${plume('M 25.5,16.5 C 19,10 13,2 10.5,-6 C 8.5,-14 13,-22 22,-28.5', 6.2, 22)}" fill="#18181b" stroke="#09090b" stroke-width="0.8"/>
            <circle cx="25.5" cy="16.5" r="4.6" fill="#18181b"/>
            <!-- Traits intérieurs de flamme draconique dans l'esprit de Shadow (plume & fuseau dégradés) -->
            <path d="${plume('M 25.5,15.5 C 19.5,9.5 14,2 11.5,-6 C 9.5,-13 13.5,-21 21.5,-27.5', 3.8, 18)}" fill="#b91c1c" opacity="0.85"/>
            <path d="${fuseau('M 24.5,14 C 19,8 14.5,2 12.5,-5 C 11,-12 14,-19 21,-26', 1.8, 16)}" fill="#f59e0b"/>
            <path d="${fuseau('M 23.5,11 C 18.5,6 15,1 13.5,-4 C 12,-9 14.5,-16 20,-23', 0.9, 14)}" fill="#fef08a"/>

            <!-- Corne droite : symétrie avec reflets draconiques or et rubis -->
            <circle cx="74.5" cy="16.5" r="5.2" fill="#18181b" stroke="#09090b" stroke-width="0.8"/>
            <!-- Ergot secondaire inférieur droit -->
            <path d="${plume('M 74,17.5 C 78,20 82,21.5 86.5,21', 3.2, 12)}" fill="#18181b" stroke="#09090b" stroke-width="0.7"/>
            <path d="${fuseau('M 75,17.8 C 78.5,19.8 82,21 85.5,20.8', 1.2, 10)}" fill="#f59e0b"/>
            <!-- Corps principal de la grande corne droite en plume -->
            <path d="${plume('M 74.5,16.5 C 81,10 87,2 89.5,-6 C 91.5,-14 87,-22 78,-28.5', 6.2, 22)}" fill="#18181b" stroke="#09090b" stroke-width="0.8"/>
            <circle cx="74.5" cy="16.5" r="4.6" fill="#18181b"/>
            <!-- Traits intérieurs de flamme draconique dans l'esprit de Shadow -->
            <path d="${plume('M 74.5,15.5 C 80.5,9.5 86,2 88.5,-6 C 90.5,-13 86.5,-21 78.5,-27.5', 3.8, 18)}" fill="#b91c1c" opacity="0.85"/>
            <path d="${fuseau('M 75.5,14 C 81,8 85.5,2 87.5,-5 C 89,-12 86,-19 79,-26', 1.8, 16)}" fill="#f59e0b"/>
            <path d="${fuseau('M 76.5,11 C 81.5,6 85,1 86.5,-4 C 88,-9 85.5,-16 80,-23', 0.9, 14)}" fill="#fef08a"/>
        </g>
    `;
}

// ANCHOR Lance de dragonnier (hallebarde draconique), modélisée sur l'axe X=0, origine au milieu de la poignée
const DRAGON_LANCE_MODEL = `
    <!-- Hampe en bois sombre cerclée d'orichalque -->
    <rect x="-1.5" y="-35" width="3" height="82" rx="1.2" fill="#2d160c"/>
    <path d="M -1.5,-20 L 1.5,-20 M -1.5,-10 L 1.5,-10 M -1.5,10 L 1.5,10 M -1.5,25 L 1.5,25 M -1.5,40 L 1.5,40" stroke="#f59e0b" stroke-width="0.7"/>
    <!-- Fer de lance draconique avec ailettes acérées et pointe étincelante -->
    <path d="M 0,-34 L -6,-42 L -3.5,-48 L -1.5,-45 L 0,-64 L 1.5,-45 L 3.5,-48 L 6,-42 Z" fill="#1e293b" stroke="#0f172a" stroke-width="0.7"/>
    <!-- Lame centrale en acier bleuté et cœur rubis incandescent -->
    <path d="M 0,-35 L -2.5,-46 L 0,-62 L 2.5,-46 Z" fill="#dc2626"/>
    <path d="${fuseau('M 0,-36 Q 0,-48 0,-60', 1.2, 12)}" fill="#fef08a"/>
    <!-- Ailettes ciselées dorées -->
    <path d="${fuseau('M -6,-42 Q -4.5,-44.5 -3,-47', 1, 6)} ${fuseau('M 6,-42 Q 4.5,-44.5 3,-47', 1, 6)}" fill="#f59e0b"/>
    <!-- Gemme rubis incrustée au collet de la hampe -->
    <circle cx="0" cy="-34" r="2.2" fill="#f59e0b"/>
    <circle cx="0" cy="-34" r="1.3" fill="#dc2626"/>
    <!-- Talon de lance inférieur avec pointe d'acier -->
    <path d="M -2,45 L 0,52 L 2,45 Z" fill="#1e293b"/>
`;

// Tenue du trophée 11 : armure d'écailles draconiques rouge rubis et acier sombre, cape pourpre sombre lambelée
export const OUTFIT_DRAGON_KNIGHT = {
    id: 'dragon_knight',
    name: 'Chevalier Dragon (Drakéide)',
    badge: 'Trophée 11',
    backEquipment: `
        <g id="outfit-dragon-cape">
            <!-- Cape draconique écarlate sombre profonde (#380808, 35 % plus foncée que la cuirasse #881337) -->
            <path d="M 30,64 C 18,77 12,94 10,109 C 18,105 24,111 30,106 C 35,111 40,105 45,108 C 42,96 46,86 48,80 C 42,75 35,70 30,64 Z" fill="#380808" stroke="#1c0404" stroke-width="0.8"/>
            <path d="M 70,64 C 82,77 88,94 90,109 C 82,105 76,111 70,106 C 65,111 60,105 55,108 C 58,96 54,86 52,80 C 58,75 65,70 70,64 Z" fill="#380808" stroke="#1c0404" stroke-width="0.8"/>
            <path d="M 36,78 C 34,92 31,105 37,110 C 45,107 55,107 63,110 C 69,105 66,92 64,78 Z" fill="#1c0404"/>
            <!-- Liseré d'or et d'écailles sur les bords de cape -->
            <path d="${fuseau('M 30,64 C 18,77 12,94 10,109', 1.1, 14)} ${fuseau('M 70,64 C 82,77 88,94 90,109', 1.1, 14)}" fill="#f59e0b"/>
            <!-- Cols à pointes de dragon dressés derrière les épaules -->
            <path d="M 28,63 L 20,49 L 36,59 Z" fill="#380808" stroke="#1c0404" stroke-width="0.6"/>
            <path d="M 72,63 L 80,49 L 64,59 Z" fill="#380808" stroke="#1c0404" stroke-width="0.6"/>
            <path d="${fuseau('M 21,50 Q 28,54.5 35,59', 0.8, 8)} ${fuseau('M 79,50 Q 72,54.5 65,59', 0.8, 8)}" fill="#f59e0b"/>
        </g>`,
    legs: `
        <g id="outfit-dragon-legs">
            <!-- Grèves articulées en acier noir et plates d'écailles draconiques -->
            <polygon points="39,83 49,83 48.5,104 41,104" fill="#1e293b"/>
            <polygon points="51,83 61,83 59,104 51.5,104" fill="#1e293b"/>
            <path d="M 40,86 L 48,86 L 47,96 L 41,96 Z" fill="#881337"/>
            <path d="M 52,86 L 60,86 L 59,96 L 53,96 Z" fill="#881337"/>
            <!-- Solerets blindés à pointes d'acier noir -->
            <path d="M 39,104 C 39,102 49.5,102 49.5,104 L 50,113 C 50,115 39,115 39,113 Z" fill="#0f172a"/>
            <path d="M 50.5,104 C 50.5,102 61,102 61,104 L 61.5,113 C 61.5,115 50.5,115 50.5,113 Z" fill="#0f172a"/>
            <!-- Genouillères pointues avec liseré d'orichalque -->
            <polygon points="41,94 48,94 44.5,99" fill="#f59e0b"/>
            <polygon points="53,94 60,94 56.5,99" fill="#f59e0b"/>
        </g>`,
    body: `
        <g id="outfit-dragon-body">
            <!-- Cuirasse à plaques d'écailles de dragon rouge rubis profond (#881337) -->
            <path d="M 33,65 C 33,62 36,61.5 39,61.5 L 61,61.5 C 64,61.5 67,62 67,65 L 64,86 L 36,86 Z" fill="#881337"/>
            <!-- Plastron central en acier noirci d'orichalque avec gravure draconique -->
            <path d="M 42,61.5 L 50,78 L 58,61.5 Z" fill="#1e293b"/>
            <path d="M 44,63 L 50,75 L 56,63 Z" fill="#0f172a"/>
            <path d="${fuseau('M 42,61.5 Q 46,69.75 50,78', 1.1, 10)} ${fuseau('M 58,61.5 Q 54,69.75 50,78', 1.1, 10)}" fill="#f59e0b"/>
            <!-- Gemme de feu rubis étincelante au centre du torse -->
            <polygon points="50,66 52.5,70 50,74 47.5,70" fill="#dc2626"/>
            <polygon points="50,67.5 51.5,70 50,72.5 48.5,70" fill="#fef08a"/>
            <!-- Écailles latérales imbriquées -->
            <path d="M 36,70 L 41,74 L 37,79 Z" fill="#70102e"/>
            <path d="M 64,70 L 59,74 L 63,79 Z" fill="#70102e"/>
            <!-- Épaulières massives ailées avec pointes en liseré or -->
            <path d="M 34,62 C 30,58 24,59 23,66 C 28,68 32,67 36,65 Z" fill="#1e293b"/>
            <path d="M 66,62 C 70,58 76,59 77,66 C 72,68 68,67 64,65 Z" fill="#1e293b"/>
            <path d="${fuseau('M 24,60 C 23,66 28,68 35,65', 1, 8)} ${fuseau('M 76,60 C 77,66 72,68 65,65', 1, 8)}" fill="#f59e0b"/>
        </g>`,
    belt: `
        <g id="outfit-dragon-belt">
            <!-- Ceinture de plates blindée d'acier noir et orichalque -->
            <path d="${fuseau('M 36,83.5 C 44.5,85.5 55.5,85.5 64,83.5', 3.6, 12)}" fill="#18181b"/>
            <!-- Boucle draconique en tête de dragon stylisée avec rubis -->
            <g transform="translate(0 1)">
                <polygon points="46,81.5 54,81.5 52,86 48,86" fill="#f59e0b"/>
                <polygon points="47.5,82.5 52.5,82.5 51,85 49,85" fill="#dc2626"/>
                <circle cx="50" cy="83.5" r="0.8" fill="#fef08a"/>
            </g>
        </g>`,
    arms: (skin = SKIN_DEFAULT) => `
        <g id="outfit-dragon-arms">
            <!-- Brassard gauche d'écailles et acier avec coudière acérée -->
            <path d="M 33 63 C 26 67.5, 24 74.5, 27 81.5 C 30 81.5, 32.5 77.5, 35 73.5 Z" fill="#881337"/>
            <path d="${fitBand([[33, 63], [26, 67.5], [24, 74.5], [27, 81.5]], [[27, 81.5], [30, 81.5], [32.5, 77.5], [35, 73.5]], 0.62, 0.92, 0.12, 0.5, 0.4)}" fill="#1e293b"/>
            <polygon points="23,73 26,71 25,76" fill="#f59e0b"/>
            <!-- Main gauche gantée de plates sombres -->
            <ellipse cx="28.4" cy="83.6" rx="3.5" ry="3.2" fill="#1e293b" stroke="#0f172a" stroke-width="0.5"/>
            <path d="${fuseau('M 27.6,84.2 C 27.4,85 27.4,85.8 27.6,86.6', 0.6, 8)} ${fuseau('M 29.6,84.2 C 29.8,85 29.8,85.8 29.6,86.6', 0.6, 8)}" fill="#f59e0b"/>
            <!-- Bras droit blindé (main serrant la lance dans handItem) -->
            <path d="M 67 63 C 74 66.5, 76 70.5, 75 75.5 C 72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="#881337"/>
            <path d="${fitBand([[67, 63], [74, 66.5], [76, 70.5], [75, 75.5]], [[75, 75.5], [72.5, 77.5], [69.5, 75.5], [66, 71.5]], 0.62, 0.92, 0.12, 0.5, 0.4)}" fill="#1e293b"/>
            <polygon points="77,73 74,71 75,76" fill="#f59e0b"/>
        </g>`,
    headAccessory: `
        <g id="outfit-dragon-diadem">
            <!-- Diadème draconique sans contour en acier noir et orichalque -->
            <path d="${fuseau('M 28,26 C 36,20 64,20 72,26', 2.8, 14)}" fill="#1e293b"/>
            <path d="${fuseau('M 31,25 C 38,20.5 62,20.5 69,25', 1.2, 12)}" fill="#f59e0b"/>
            <!-- Pointe frontale ascendante et gemme rubis étincelante -->
            <polygon points="47,24 50,16 53,24" fill="#1e293b"/>
            <polygon points="48.5,23 50,17.5 51.5,23" fill="#f59e0b"/>
            <circle cx="50" cy="21" r="2.2" fill="#dc2626"/>
            <circle cx="50" cy="21" r="0.9" fill="#fef08a"/>
        </g>`,
    handItem: (skin = SKIN_DEFAULT) => `
        <g id="outfit-dragon-lance">
            <!-- Lance de dragonnier tenue par la main droite (75.5, 76) -->
            <g id="dragon-lance" transform="translate(75.5, 76) rotate(14)">
                ${DRAGON_LANCE_MODEL}
                <!-- Gantelet articulé serrant la hampe au centre de l'arme -->
                <ellipse cx="0" cy="0" rx="3.3" ry="3.4" fill="#1e293b" stroke="#0f172a" stroke-width="0.5"/>
                <path d="${fuseau('M -1.6,-1 C -0.73,-1 0.13,-1 1,-1', 0.65, 8)} ${fuseau('M -1.6,1 C -0.73,1 0.13,1 1,1', 0.65, 8)}" fill="#f59e0b"/>
            </g>
        </g>`
};

// SECTION Coupes de cheveux exclusives du Chevalier Dragon (garçon et fille)
export const DRAGON_STYLES = {
    dragon_boy: {
        id: 'dragon_boy',
        name: 'Crinière du Dragon (Garçon)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-dragon-boy">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <!-- Mèches hérissées en arrière par le souffle des flammes -->
                <path d="M 17,46 C 11,36 7,24 10,16 C 13,8 9,4 16,-2 C 22,-8 32,-10 38,-8 C 42,-16 52,-18 58,-14 C 66,-18 76,-14 80,-6 C 88,-6 94,2 92,12 C 96,20 92,32 84,46 C 80,35 76,27 72,21 C 64,11 36,11 28,21 C 24,27 21,35 17,46 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-dragon-boy">
                <!-- Pointes vives dégageant les cornes et les yeux ardents -->
                <path d="M 22,28 C 25,18 36,10 50,6 C 64,10 75,18 78,28 C 75,32 72,29 69,23 C 66,31 61,32 58,25 C 54,32 48,33 44,24 C 40,32 34,31 31,24 C 28,31 24,32 22,28 Z" fill="${color}"/>
            </g>`
    },
    dragon_girl: {
        id: 'dragon_girl',
        name: 'Écailles Célestes (Fille)',
        withTiara: false,
        getHairBack: (color) => `
            <g id="hair-back-dragon-girl">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <!-- Longue crinière sauvage se déployant le long du dos -->
                <path d="M 16,48 C 11,38 7,26 10,18 C 13,10 9,6 16,0 C 22,-6 32,-8 38,-6 C 42,-14 52,-16 58,-12 C 66,-16 76,-12 80,-4 C 88,-4 94,4 92,14 C 96,22 92,34 84,48 C 81,64 77,78 73,88 C 69,82 71,70 70,60 C 64,20 36,20 30,60 C 29,70 31,82 27,88 C 23,78 19,64 16,48 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-dragon-girl">
                <!-- Frange nette dégageant le diadème avec tresses effilées -->
                <path d="M 21,30 C 23,18 36,8 50,6 C 64,8 77,18 79,30 C 75,34 73,30 71,24 C 68,32 63,34 59,26 C 54,34 48,35 44,26 C 39,34 34,33 30,25 C 27,32 23,33 21,30 Z" fill="${color}"/>
                <!-- Deux mèches effilées encadrant les joues -->
                <path d="${fuseau('M 23,30 C 19,43 18,56 22,68', 2.4, 14)}" fill="${color}"/>
                <path d="${fuseau('M 77,30 C 81,43 82,56 78,68', 2.4, 14)}" fill="${color}"/>
            </g>`
    }
};

// SECTION Fiche Trophée RPG 11 : Chevalier Dragon
export const DRAGON_TROPHY = {
    id: 'dragon',
    shortId: 'dragon',
    legacyId: 'trophy_dragon_knight',
    number: 11,
    title: 'Le Chevalier Dragon',
    species: 'dragon',
    speciesName: 'Drakéide',
    className: 'Chevalier Dragon',
    badge: 'Nouveau',
    tagline: 'Maîtrise le feu ancestral et chevauche les cieux !',
    description: 'Débloque l\'espèce Drakéide avec ses cornes draconiques et ses yeux ardents, l\'armure d\'écailles de dragon et la lance de dragonnier.',
    rarity: 'légendaire',
    rewards: [
        { icon: 'bi-fire', label: 'Espèce : Drakéide' },
        { icon: 'bi-shield-shaded', label: 'Classe : Chevalier Dragon' },
        { icon: 'bi-scissors', label: 'Coupes exclusives : Crinière du Dragon (G) / Écailles Célestes (F)' },
        { icon: 'bi-slash-square', label: 'Arme : Lance de dragonnier ouvragée' },
        { icon: 'bi-person-bounding-box', label: 'Tenue : Cuirasse d\'écailles, cape écarlate & diadème' },
        { icon: 'bi-palette', label: 'Teintes débloquées : Rouge Braise Draconique, Feu Draconique, Ambre Drakéide' }
    ],
    boyPreset: {
        id: 'drg_b',
        type: 'boy',
        styleKey: 'dragon_boy',
        styleId: 1,
        outfitKey: 'dragon_knight',
        species: 'dragon',
        skinColor: 'dragon-amber',
        hairColor: '#b91c1c',
        eyeColor: 'dragon-fire'
    },
    girlPreset: {
        id: 'drg_g',
        type: 'girl',
        styleKey: 'dragon_girl',
        styleId: 1,
        outfitKey: 'dragon_knight',
        species: 'dragon',
        skinColor: 'dragon-amber',
        hairColor: '#b91c1c',
        eyeColor: 'dragon-fire'
    }
};
