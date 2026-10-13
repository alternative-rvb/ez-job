/**
 * Trophée 11 : Le Chevalier Dragon, Drakéide (dragon)
 * Module du trophée : tenue, coupes de cheveux, cornes draconiques, lance et entrée du registre RPG_TROPHIES.
 */

import { fuseau, plume, gripHand, fitBand, hairBase, SKIN_DEFAULT } from '../../avatar-kit.js';
import { mixHex } from '../base.js';

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
            <!-- Cols à pointes de dragon dressés derrière les épaules, descendus de 3 pour toucher la cape -->
            <g transform="translate(0 3)">
            <path d="M 28,63 L 20,49 L 36,59 Z" fill="#380808" stroke="#1c0404" stroke-width="0.6"/>
            <path d="M 72,63 L 80,49 L 64,59 Z" fill="#380808" stroke="#1c0404" stroke-width="0.6"/>
            <path d="${fuseau('M 21,50 Q 28,54.5 35,59', 0.8, 8)} ${fuseau('M 79,50 Q 72,54.5 65,59', 0.8, 8)}" fill="#f59e0b"/>
            </g>
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
            <!-- Épaulettes au premier plan, par-dessus les cheveux (calque handItem, jamais rendu en portrait) -->
            <g id="dragon-pauldrons">
            <path d="M 34,62 C 30,58 24,59 23,66 C 28,68 32,67 36,65 Z" fill="#1e293b"/>
            <path d="M 66,62 C 70,58 76,59 77,66 C 72,68 68,67 64,65 Z" fill="#1e293b"/>
            <path d="${fuseau('M 24,60 C 23,66 28,68 35,65', 1, 8)} ${fuseau('M 76,60 C 77,66 72,68 65,65', 1, 8)}" fill="#f59e0b"/>
            </g>
            <!-- Lance de dragonnier tenue par la main droite (75.5, 76) -->
            <g id="dragon-lance" transform="translate(75.5, 76) rotate(14)">
                ${DRAGON_LANCE_MODEL}
                <!-- Gantelet articulé serrant la hampe au centre de l'arme -->
                <ellipse cx="0" cy="0" rx="3.3" ry="3.4" fill="#1e293b" stroke="#0f172a" stroke-width="0.5"/>
                <path d="${fuseau('M -1.6,-1 C -0.73,-1 0.13,-1 1,-1', 0.65, 8)} ${fuseau('M -1.6,1 C -0.73,1 0.13,1 1,1', 0.65, 8)}" fill="#f59e0b"/>
            </g>
        </g>`
};

// SECTION Coupes de cheveux exclusives du Chevalier Dragon : garçon court (coupe de la Fée en flammes), fille longue (crinière façon Orc en flammes)
// ANCHOR Une langue de feu : plume (base épaisse, pointe fine) et, une sur deux, un filet ambre
const dragonTongue = (color, d, width, glow = true) => `
    <path d="${plume(d, width * 1.3, 16)}" fill="${color}"/>
    ${glow ? `<path d="${fuseau(d, width * 0.2, 12)}" fill="${mixHex(color, '#f59e0b', 0.4)}"/>` : `<path d="${fuseau(d, width * 0.16, 12)}" fill="${mixHex(color, '#000000', 0.3)}"/>`}`;

export const DRAGON_STYLES = {
    dragon_boy: {
        id: 'dragon_boy',
        name: 'Crinière de Feu (Garçon)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-dragon-boy">
                <!-- ANCHOR Base courte : cercle 14 % plus grand que le crâne -->
                ${hairBase('court', color)}
                <!-- Pics en arrière-plan copiés tels quels de la coupe de base 4 (Coupe en pics, garçon), en plus de la coupe existante, descendus de 10 % de leur hauteur (25 % puis remontés de 15 %), largeur réduite de 20 % puis augmentée de 5 % autour de x=50 (échelle 0.84) -->
                <g transform="translate(8 6.4) scale(0.84 1)"><path d="M 82,44 
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
                         C 74,22 76,34 82,44 Z" fill="${color}"/></g>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-dragon-boy">
                <!-- Mèches latérales et épi ébouriffé de la Fée (garçon), conservés -->
                <g transform="matrix(0.136688,0.030396,-0.047579,0.213959,24.048365,-29.4201)">
                <path d="M108.168,291.526C107.808,291.264 103.599,288.466 96.702,281.802C96.248,281.363 93.152,278.123 91.456,275.867C88.513,271.953 87.746,270.495 86.359,267.587C83.549,261.698 84.688,257.345 86.212,253.079C86.403,252.546 87.805,249.396 89.829,246.832C90.821,245.574 93.15,242.481 98.58,239.034C102.603,236.48 106.531,234.907 112.243,233.768C111.61,234.558 109.803,236.563 108.812,240.778C108.368,242.664 108.108,244.904 109.513,251.521C109.895,253.319 109.985,253.305 110.347,255.103C110.751,257.114 111.683,259.622 111.37,263.546C111.15,266.308 110.976,266.297 110.726,269.059C110.671,269.661 110.343,270.9 109.995,274.011C109.902,274.85 109.63,275.912 109.287,279.24C109.233,279.765 108.645,282.75 108.402,287.685C108.309,289.576 108.244,289.571 108.168,291.526Z" fill="${color}"/>
                </g>
                <g transform="matrix(-0.136688,0.030396,0.047579,0.213959,77.367765,-29.4201)">
                <path d="M108.168,291.526C108.432,284.747 109.016,281.008 110.196,272.379C110.5,270.164 110.592,270.173 110.835,267.954C111.076,265.748 111.203,265.758 111.37,263.546C111.688,259.338 110.74,257.411 110.154,254.078C110.113,253.841 107.958,246.358 108.574,242.073C109.325,236.844 112.231,233.783 112.243,233.768C107.763,234.661 101.42,236.266 94.369,242.095C89.833,245.844 84.559,252.875 84.658,260.967C84.703,264.65 86.486,267.944 87.612,270.084C89.596,273.855 93.637,278.957 98.054,283.092C103.956,288.616 106.68,290.444 108.168,291.526Z" fill="${color}"/>
                </g>
                <g transform="matrix(0.25,0,0,0.25,3.785698,-35.212793)">
                <path d="M108.169,291.52C108.166,291.517 104.759,288.694 99.95,282.548C99.637,282.149 98.355,280.51 96.366,277.318C96.349,277.29 94.102,273.57 92.894,270.442C91.651,267.226 89.53,261.667 90.925,254.616C91.459,251.917 92.101,249.566 93.854,246.265C94.695,244.682 96.405,242.162 98.398,240.318C100.358,238.504 102.567,237 104.979,235.846C107.922,234.437 111.646,233.86 112.243,233.768C112.169,233.848 109.726,236.246 107.6,240.235C107.346,240.712 106.073,242.903 105.368,247.128C105.223,248.001 104.94,250.572 105.047,252.687C105.108,253.897 104.993,254.148 105.247,256.513C105.26,256.635 105.514,260.536 105.528,261.767C105.546,263.331 105.538,263.326 105.515,264.888C105.507,265.42 105.515,265.419 105.611,269.792C105.651,271.61 106.07,279.669 107.165,286.133C107.751,289.595 108.076,291.092 108.169,291.52Z" fill="${color}"/>
                </g>
                <g transform="matrix(-0.25,0,0,0.25,97.630433,-35.212793)">
                <path d="M108.169,291.52C107.921,290.338 106.709,284.9 105.992,276.322C105.94,275.693 105.69,271.973 105.646,270.895C105.579,269.246 105.623,269.248 105.553,267.596C105.451,265.182 105.541,265.184 105.523,262.768C105.48,256.903 105.053,256.225 105.063,253.4C105.066,252.608 104.953,251.422 105.093,249.821C105.117,249.548 105.246,245.592 106.81,241.89C106.949,241.56 107.552,240.133 108.944,237.948C110.316,235.795 111.813,234.229 112.243,233.768C109.381,234.233 104.662,235.086 99.538,239.32C95.698,242.494 93.561,246.263 92.025,250.341C91.922,250.615 90.924,253.803 90.642,256.419C90.426,258.425 90.469,259.489 90.496,260.732C90.5,260.936 90.733,263.04 90.773,263.246C91,264.44 91.285,266.382 93.136,271.061C93.333,271.559 94.892,274.995 96.691,277.835C97.653,279.355 99.877,282.982 105.211,288.686C106.297,289.848 107.925,291.302 108.169,291.52Z" fill="${color}"/>
                </g>
                <g transform="matrix(0.25,0,0,0.25,6.848695,-37.308708)">
                <path d="M133.889,307.947C132.793,307.458 127.369,305.149 118.836,299.274C118.337,298.931 114.43,296.018 112.211,294.016C107.091,289.396 104.935,286.453 104.867,286.369C101.062,281.634 98.618,277.561 96.972,271.111C96.712,270.092 95.909,266.001 95.93,262.681C95.968,256.457 97.255,249.911 102.198,243.087C104.313,240.167 107.045,237.185 112.24,233.77C112.001,234.229 109.738,238.184 108.296,244C108.273,244.092 107.138,247.99 107.544,253.745C107.592,254.43 107.903,257.808 108.924,261.12C110.075,264.853 110.113,264.84 111.967,269.334C112.138,269.749 112.142,269.742 114.151,274.503C115.706,278.19 116.062,279.015 118.265,283.505C119.282,285.578 124.041,294.63 129.833,302.587C132.321,306.004 133.551,307.529 133.889,307.947Z" fill="${color}"/>
                </g>
                <g transform="matrix(-0.25,0,0,0.25,94.567435,-37.308708)">
                <path d="M133.889,307.947C133.104,306.974 129.157,301.982 125.637,296.403C122.598,291.584 121.056,288.732 120.687,288.049C119.915,286.619 119.811,286.677 116.643,280.179C115.431,277.694 113.258,272.307 111.572,268.384C110.677,266.303 109.546,263.471 108.644,260.154C107.945,257.585 106.906,252.188 107.794,246.506C107.831,246.266 108.067,244.379 109.25,240.701C110.374,237.21 111.86,234.496 112.247,233.761C108.944,235.971 104.198,239.329 100.29,246.011C96.717,252.118 95.869,257.899 95.934,263.635C95.955,265.484 96.443,268.395 96.511,268.806C97.034,271.925 97.759,274.075 98.878,276.841C99.008,277.164 100.15,279.481 100.341,279.81C100.968,280.894 102.437,283.646 106.822,288.71C107.399,289.376 110.721,292.811 113.427,295.066C115.563,296.846 119.814,300.375 127.793,304.888C129.089,305.621 130.92,306.624 133.889,307.947Z" fill="${color}"/>
                </g>
                <g transform="matrix(0.25,0,0,0.25,0,-34)">
                <path d="M88,195.262C88,195.262 86.385,143.492 109.62,100C132.854,56.508 172.125,33.058 172.125,33.058C145.299,59.441 132.395,93.899 148.359,117.112C162.726,62.142 219.185,31.237 261.454,16.54C214.55,84.428 248.145,117.112 248.145,117.112C248.145,117.112 259.966,103.067 270.485,76.433C274.772,65.578 283.392,43.753 283.392,43.753C308.242,101.223 304.63,152.065 312,195.262L88,195.262Z" fill="${color}"/>
                </g>
                <!-- Traits fins en fuseau, de la couleur des cheveux, dans les espaces vides entre les mèches principales, courbés dans le sens des épis (vers la droite en montant) -->
                <path d="${fuseau('M 34.8,-1.6 C 35,-9.2 38,-15 44,-19.6', 2.3, 14)} ${fuseau('M 40.6,-2.4 C 40.8,-8 42.4,-11.5 46,-14', 0.9, 12)} ${fuseau('M 59.6,-2 C 59.8,-10 62,-17 67,-21.5', 2.3, 12)} ${fuseau('M 62,-2.6 C 62.2,-8.5 63.6,-12.5 67,-15', 0.9, 12)}" fill="${color}"/>
                <!-- Filets ambre et ombre dans les épis, façon flammes -->
                <path d="${fuseau('M 40,-3 C 41,-12 45,-20 51,-26', 1.6, 12)} ${fuseau('M 60,-3 C 61,-12 65,-19 70,-24', 1.6, 12)}" fill="${mixHex(color, '#f59e0b', 0.45)}"/>
                <path d="${fuseau('M 28,10 C 26,4 27,-2 31,-8', 1.2, 10)} ${fuseau('M 72,10 C 74,4 73,-2 69,-8', 1.2, 10)}" fill="${mixHex(color, '#000000', 0.3)}"/>
                <!-- Frange copiée telle quelle de la coupe de base 4 (Coupe en pics, garçon), à la place de la frange de la Fée -->
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
    },
    dragon_girl: {
        id: 'dragon_girl',
        name: 'Cascade de Flammes (Fille)',
        withTiara: false,
        // NOTE Exactement la coupe du garçon (pics du fond, épi, frange en pics), plus les cheveux longs de l'Orc fille copiés tels quels
        getHairBack: (color) => {
            const boy = DRAGON_STYLES.dragon_boy.getHairBack(color).replace('hair-back-dragon-boy', 'hair-back-dragon-girl');
            const open = boy.indexOf('>') + 1;
            return boy.slice(0, open) + `
                <g transform="translate(7.5 18) scale(0.85 1)">
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
                </g>
                ` + boy.slice(open);
        },
        getHairFront: (color) => {
            const boy = DRAGON_STYLES.dragon_boy.getHairFront(color).replace('hair-front-dragon-boy', 'hair-front-dragon-girl');
            const end = boy.lastIndexOf('</g>');
            return boy.slice(0, end) + `
                <g transform="translate(0 -6)">
                <!-- Mèches de tempes sauvages encadrant le visage en blocs larges -->
                <path d="M 23,34 C 20,44 22,54 25,62 C 26,52 26,42 25,34 Z" fill="${color}"/>
                <path d="M 77,34 C 80,44 78,54 75,62 C 74,52 74,42 75,34 Z" fill="${color}"/>
                </g>
            ` + boy.slice(end);
        }
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
