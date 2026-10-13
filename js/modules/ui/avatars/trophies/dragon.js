/**
 * Trophée 11 : Le Chevalier Dragon, Drakéide (dragon)
 * Module du trophée : tenue, coupes de cheveux, cornes draconiques, lance et entrée du registre RPG_TROPHIES.
 */

import { fuseau, plume, gripHand, fitBand, SKIN_DEFAULT } from '../../avatar-kit.js';
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

// SECTION Coupes de cheveux exclusives du Chevalier Dragon (garçon et fille) - Drakéide de Feu
export const DRAGON_STYLES = {
    dragon_boy: {
        id: 'dragon_boy',
        name: 'Crinière de Feu (Garçon)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-dragon-boy">
                <!-- ANCHOR Socle universel -->
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <!-- Grande crinière de feu flamboyante : langues de flammes ascendantes foudroyantes -->
                <path d="M 12,46 
                         C 8,36 6,24 8,14 
                         C 6,4 11,-4 17,-12 
                         C 20,-10 23,-4 24,2 
                         C 26,-6 31,-14 37,-20 
                         C 41,-15 42,-8 43,-3 
                         C 45,-12 47,-21 50,-26 
                         C 53,-21 55,-12 57,-3 
                         C 58,-8 59,-15 63,-20 
                         C 69,-14 74,-6 76,2 
                         C 77,-4 80,-10 83,-12 
                         C 89,-4 94,4 92,14 
                         C 94,24 92,36 88,46 
                         C 84,36 80,26 76,20 
                         C 66,10 34,10 24,20 
                         C 20,26 16,36 12,46 Z" fill="${color}"/>
                <!-- Langues de flammes vives intérieures jaillissant entre les cornes -->
                <path d="M 45,2 C 47,-10 48,-20 50,-24 C 52,-20 53,-10 55,2 C 53,-2 47,-2 45,2 Z" fill="${mixHex(color, '#f59e0b', 0.32)}"/>
                <path d="M 33,4 C 34,-6 35,-14 38,-18 C 39,-13 40,-6 41,2 Z" fill="${mixHex(color, '#f59e0b', 0.22)}"/>
                <path d="M 67,4 C 66,-6 65,-14 62,-18 C 61,-13 60,-6 59,2 Z" fill="${mixHex(color, '#f59e0b', 0.22)}"/>
                <!-- Flammes latérales extérieures sculptées en fuseaux de feu -->
                <path d="${plume('M 18,22 C 10,18 6,10 7,-1', 4.8, 14)}" fill="${color}"/>
                <path d="${fuseau('M 17,20 C 11,16 8,9 9,1', 1.8, 10)}" fill="${mixHex(color, '#f59e0b', 0.35)}"/>
                <path d="${plume('M 84,22 C 92,18 96,10 93,-1', 4.8, 14)}" fill="${color}"/>
                <path d="${fuseau('M 85,20 C 91,16 94,9 93,1', 1.8, 10)}" fill="${mixHex(color, '#f59e0b', 0.35)}"/>
                <!-- Pointes de flammes basses flammées aux tempes -->
                <path d="${plume('M 21,36 C 13,38 9,44 11,50', 4.2, 12)}" fill="${color}"/>
                <path d="${plume('M 81,36 C 89,38 93,44 91,50', 4.2, 12)}" fill="${color}"/>
                <!-- Stries de profondeur d'ombre entre les langues de feu -->
                <path d="${fuseau('M 43,0 C 47,-9 48,-17 50,-22', 1.2, 10)}" fill="${mixHex(color, '#000000', 0.3)}"/>
                <path d="${fuseau('M 57,0 C 53,-9 52,-17 50,-22', 1.2, 10)}" fill="${mixHex(color, '#000000', 0.3)}"/>
                <path d="${fuseau('M 31,8 C 29,1 31,-7 36,-17', 1.3, 12)}" fill="${mixHex(color, '#000000', 0.25)}"/>
                <path d="${fuseau('M 71,8 C 73,1 71,-7 66,-17', 1.3, 12)}" fill="${mixHex(color, '#000000', 0.25)}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-dragon-boy">
                <!-- Frange flamboyante sculptée en langues de feu acérées -->
                <path d="M 20,24 C 23,16 35,8 50,6 C 65,8 77,16 80,24 C 77,29 74,27 72,21 C 70,29 65,33 60,25 C 57,32 52,34 49,27 C 47,33 42,34 39,26 C 36,31 32,32 29,24 C 26,29 22,30 20,24 Z" fill="${color}"/>
                <!-- Mèche de feu centrale plongeante et effilée -->
                <path d="${plume('M 48,15 C 50,22 51,28 53,34', 3.8, 14)}" fill="${color}"/>
                <path d="${fuseau('M 48.5,17 C 50,23 51,28 52.5,32', 1.4, 10)}" fill="${mixHex(color, '#f59e0b', 0.3)}"/>
                <!-- Mèches latérales en langues de flammes inclinées vers l'intérieur -->
                <path d="${plume('M 34,18 C 37,24 40,29 44,33', 3.4, 12)}" fill="${color}"/>
                <path d="${plume('M 66,18 C 63,24 60,29 56,33', 3.4, 12)}" fill="${color}"/>
                <!-- Mèches de tempes ardentes encadrant les joues comme des flammèches -->
                <path d="${plume('M 21,24 C 17,32 16,40 18,48', 3.2, 14)}" fill="${color}"/>
                <path d="${fuseau('M 20.5,26 C 17.5,33 16.8,39 18.2,45', 1.2, 10)}" fill="${mixHex(color, '#f59e0b', 0.35)}"/>
                <path d="${plume('M 79,24 C 83,32 84,40 82,48', 3.2, 14)}" fill="${color}"/>
                <path d="${fuseau('M 79.5,26 C 82.5,33 83.2,39 81.8,45', 1.2, 10)}" fill="${mixHex(color, '#f59e0b', 0.35)}"/>
                <!-- Sillons d'ombre sculptant le relief des flammes -->
                <path d="${fuseau('M 38,18 C 40,23 42,28 44,31', 0.9, 8)} ${fuseau('M 62,18 C 60,23 58,28 56,31', 0.9, 8)}" fill="${mixHex(color, '#000000', 0.3)}"/>
            </g>`
    },
    dragon_girl: {
        id: 'dragon_girl',
        name: 'Cascade de Flammes (Fille)',
        withTiara: false,
        getHairBack: (color) => `
            <g id="hair-back-dragon-girl">
                <!-- ANCHOR Socle universel -->
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <!-- Crête supérieure flamboyante identique au garçon pour la majesté draconique -->
                <path d="M 14,44 
                         C 9,34 7,22 9,14 
                         C 7,4 12,-4 18,-12 
                         C 21,-10 24,-4 25,2 
                         C 27,-6 32,-14 38,-20 
                         C 42,-15 43,-8 44,-3 
                         C 46,-12 48,-21 50,-26 
                         C 52,-21 54,-12 56,-3 
                         C 57,-8 58,-15 62,-20 
                         C 68,-14 73,-6 75,2 
                         C 76,-4 79,-10 82,-12 
                         C 88,-4 93,4 91,14 
                         C 94,22 92,34 88,44 
                         C 86,56 83,72 85,86 
                         C 80,84 78,76 75,68 
                         C 73,62 70,74 68,84 
                         C 64,80 62,70 60,60 
                         C 56,40 44,40 40,60 
                         C 38,70 36,80 32,84 
                         C 30,74 27,62 25,68 
                         C 22,76 20,84 15,86 
                         C 17,72 14,56 14,44 Z" fill="${color}"/>
                <!-- Flots de flammes latéraux ondulants tombant sur les épaules -->
                <path d="${plume('M 17,40 C 11,52 9,68 14,84', 5.2, 18)}" fill="${color}"/>
                <path d="${fuseau('M 16,42 C 11,54 10,68 14,80', 2.0, 14)}" fill="${mixHex(color, '#f59e0b', 0.35)}"/>
                <path d="${plume('M 83,40 C 89,52 91,68 86,84', 5.2, 18)}" fill="${color}"/>
                <path d="${fuseau('M 84,42 C 89,54 90,68 86,80', 2.0, 14)}" fill="${mixHex(color, '#f59e0b', 0.35)}"/>
                <!-- Pointes de flammes terminales effilées en bas de crinière -->
                <path d="${plume('M 20,78 C 17,84 15,87 18,90', 3.2, 8)} ${plume('M 80,78 C 83,84 85,87 82,90', 3.2, 8)}" fill="${color}"/>
                <!-- Crête centrale incandescente -->
                <path d="M 45,2 C 47,-10 48,-20 50,-24 C 52,-20 53,-10 55,2 C 53,-2 47,-2 45,2 Z" fill="${mixHex(color, '#f59e0b', 0.32)}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-dragon-girl">
                <!-- Frange féminine flamboyante en langues de flammes vives -->
                <path d="M 21,26 C 23,16 35,8 50,6 C 65,8 77,16 79,26 C 76,31 73,28 71,22 C 68,30 64,32 60,24 C 56,32 52,33 49,26 C 46,33 42,33 39,25 C 35,31 31,31 29,23 C 26,29 23,30 21,26 Z" fill="${color}"/>
                <!-- Mèche de flamme plongeante délicate au centre -->
                <path d="${plume('M 48,15 C 50,22 51,27 52,32', 3.2, 12)}" fill="${color}"/>
                <path d="${fuseau('M 48.5,17 C 50,22 51,26 51.8,30', 1.1, 8)}" fill="${mixHex(color, '#f59e0b', 0.3)}"/>
                <!-- Longues mèches enflammées encadrant les joues (accroche-cœurs de feu) -->
                <path d="${plume('M 22,26 C 17,38 16,52 20,66', 3.6, 16)}" fill="${color}"/>
                <path d="${fuseau('M 21.5,28 C 17.5,39 16.8,50 19.8,62', 1.4, 12)}" fill="${mixHex(color, '#f59e0b', 0.35)}"/>
                <!-- Extrémité en flèche de feu léchant la clavicule -->
                <path d="${fuseau('M 19,62 C 20,66 22,69 24,71', 1.8, 8)}" fill="${color}"/>
                <path d="${plume('M 78,26 C 83,38 84,52 80,66', 3.6, 16)}" fill="${color}"/>
                <path d="${fuseau('M 78.5,28 C 82.5,39 83.2,50 80.2,62', 1.4, 12)}" fill="${mixHex(color, '#f59e0b', 0.35)}"/>
                <path d="${fuseau('M 81,62 C 80,66 78,69 76,71', 1.8, 8)}" fill="${color}"/>
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
