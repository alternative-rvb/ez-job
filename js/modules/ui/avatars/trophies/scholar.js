/**
 * Trophée 9 : La Sagesse des Grimoires, Mage à lunettes (scholar)
 * Module du trophée : tenue, coupes de cheveux, lunettes et entrée du registre RPG_TROPHIES.
 */

import { fuseau, calligraphique, mirror, fitBand, SKIN_DEFAULT } from '../../avatar-kit.js';

// ANCHOR Lunettes de vue rondes : deux verres, pont et branches vers les oreilles, monture de bronze
const SCHOLAR_GLASSES = `
        <g id="outfit-scholar-glasses">
            <!-- Verres bleutés (30 %) avec deux reflets en fuseau par verre : un en haut à gauche, un petit en bas à droite -->
            <circle cx="37" cy="41" r="9.3" fill="#bae6fd" opacity="0.3"/>
            <circle cx="63" cy="41" r="9.3" fill="#bae6fd" opacity="0.3"/>
            <path d="${fuseau('M 30.6,35.6 C 32.4,33.6 34.8,32.8 37.4,32.8', 1.3, 8)} ${fuseau('M 56.6,35.6 C 58.4,33.6 60.8,32.8 63.4,32.8', 1.3, 8)} ${fuseau('M 43.2,45.6 C 42.8,46.8 42,47.8 41,48.6', 0.9, 8)} ${fuseau('M 69.2,45.6 C 68.8,46.8 68,47.8 67,48.6', 0.9, 8)}" fill="#ffffff" opacity="0.85"/>
            <!-- Montures rondes, pont et branches -->
            <circle cx="37" cy="41" r="9.3" fill="none" stroke="#3b2412" stroke-width="1.2"/>
            <circle cx="63" cy="41" r="9.3" fill="none" stroke="#3b2412" stroke-width="1.2"/>
            <path d="M 46.1,39.4 Q 50,37 53.9,39.4" fill="none" stroke="#3b2412" stroke-width="1.1" stroke-linecap="round"/>
            <path d="M 27.8,39.4 L 22.6,38.2 M 72.2,39.4 L 77.4,38.2" fill="none" stroke="#3b2412" stroke-width="1" stroke-linecap="round"/>
        </g>`;

// ANCHOR Écharpe bleu nuit : tour de cou noué, un pan qui retombe sur la poitrine à droite, rayures claires en fuseau et franges
// NOTE Dessinée avec les lunettes, dans le calque du dessus, car le cou est dessiné après le corps
const SCHOLAR_SCARF = `
        <g id="outfit-scholar-scarf">
            <!-- Tour de cou : trait horizontal en fuseau, épais au centre, effilé aux deux bouts -->
            <path d="${fuseau('M 34.6,62.2 C 43,70.2 57,70.2 65.4,62.2', 6.6, 18)}" fill="#172554"/>
            <path d="${fuseau('M 37.4,63 C 44,68.4 56,68.4 62.6,63', 1.3, 14)}" fill="#3b4f9a"/>
            <!-- Pan qui retombe sur la poitrine, bout franchement coupé et franges -->
            <path d="M 55.4,67.4 L 63.2,66.4 L 65.6,82.4 L 57,83.6 Z" fill="#172554"/>
            <path d="${fuseau('M 58.6,68.6 C 59.4,73 60.2,77.4 61,81.8', 0.9, 10)} ${fuseau('M 61.6,68.2 C 62.4,72.8 63,77.2 63.8,81.4', 0.9, 10)}" fill="#3b4f9a"/>
            <path d="${fuseau('M 57.4,83.6 C 57.5,85 57.5,86 57.3,87.2', 0.7, 6)} ${fuseau('M 59.8,83.2 C 59.9,84.7 59.9,85.8 59.7,87.2', 0.7, 6)} ${fuseau('M 62.2,82.9 C 62.3,84.4 62.3,85.5 62.2,86.8', 0.7, 6)} ${fuseau('M 64.4,82.6 C 64.5,84.1 64.5,85.2 64.4,86.5', 0.7, 6)}" fill="#172554"/>
            <!-- Nœud -->
            <ellipse cx="57.2" cy="67.6" rx="3.3" ry="2.6" fill="#0f1b45"/>
        </g>`;

// NOTE Bandoulière : sangle de cuir d'une épaule à la taille opposée (une extrémité à fleur d'épaule, l'autre prolongée jusqu'à l'anse du grimoire)
const STRAP_D = 'M 34.6,63.6 C 35.4,62.2 38,61.6 40.6,62.2 L 67,85.6 L 67,91.1 Z';

// Tenue du trophée 9 : robe d'érudit bleu encre sans cape, écharpe bleu nuit, bandoulière avec grimoire et fioles à la ceinture
export const OUTFIT_SCHOLAR_MAGE = {
    id: 'scholar_mage',
    name: 'Mage Érudit à lunettes (Humain)',
    badge: 'Trophée 9',
    backEquipment: '',
    legs: `
        <g id="outfit-scholar-legs">
            <!-- Pantalon sombre et bottines bleu marine -->
            <polygon points="39,86 49,86 48.5,104 41,104" fill="#1e293b"/>
            <polygon points="51,86 61,86 59,104 51.5,104" fill="#1e293b"/>
            <path d="M39.5 104 C39.5 102, 49.5 102, 49.5 104 L50 113 C50 115, 39 115, 39 113 Z" fill="#1e3a8a"/>
            <path d="M50.5 104 C50.5 102, 60.5 102, 60.5 104 L61 113 C61 115, 50 115, 50 113 Z" fill="#1e3a8a"/>
            <!-- Lanières de cuir clair en fuseau sur chaque bottine : une horizontale en travers du cou-de-pied, une verticale sur le devant -->
            <path d="${fuseau('M 39.8,108.2 C 42.6,109.2 46.4,109.2 49.4,108.2', 1.2, 10)} ${fuseau('M 44.6,104.6 C 44.9,107.4 44.9,110 44.6,112.6', 1.2, 10)}" fill="#d6a35c"/>
            <path d="${fuseau('M 50.6,108.2 C 53.6,109.2 57.4,109.2 60.2,108.2', 1.2, 10)} ${fuseau('M 55.4,104.6 C 55.7,107.4 55.7,110 55.4,112.6', 1.2, 10)}" fill="#d6a35c"/>
            <!-- Pans de la robe jusqu'aux genoux, ourlet doré en fuseau -->
            <path d="M 35.5,84 L 64.5,84 L 67,98 C 58,100.4 42,100.4 33,98 Z" fill="#2f4fa0"/>
            <path d="${fuseau('M 33.4,97.6 C 42,100 58,100 66.6,97.6', 1.1, 12)}" fill="#fbbf24"/>
            <path d="${fuseau('M 50,86 C 50,90 50,95 50,99', 0.9, 10)}" fill="#1d3a82"/>
        </g>`,
    body: `
        <g id="outfit-scholar-body">
            <!-- Robe d'érudit bleu encre, col à liseré d'or -->
            <path d="M 33,65 C 33,62 36,61.5 39,61.5 L 61,61.5 C 64,61.5 67,62 67,65 L 64.5,86 L 35.5,86 Z" fill="#2f4fa0"/>
            <path d="M 41,61.5 L 50,72 L 59,61.5 L 56,61.5 L 50,67.5 L 44,61.5 Z" fill="#f8fafc"/>
            <path d="${fuseau('M 41,61.5 C 44,66 47,69.5 50,72', 0.9, 8)} ${fuseau('M 59,61.5 C 56,66 53,69.5 50,72', 0.9, 8)}" fill="#fbbf24"/>
            <path d="${fuseau('M 38,66 C 37,72 37,79 37.6,85', 0.9, 10)} ${fuseau('M 62,66 C 63,72 63,79 62.4,85', 0.9, 10)}" fill="#1d3a82"/>
        </g>`,
    belt: `
        <g id="outfit-scholar-belt">
            <!-- Ceinture de cuir et boucle d'or -->
            <path d="${fuseau('M 35.5,84 C 44.5,85.8 55.5,85.8 64.5,84', 3, 12)}" fill="#78350f"/>
            <rect x="47.6" y="83" width="4.8" height="3.4" rx="0.8" fill="#fbbf24"/><rect x="48.8" y="83.8" width="2.4" height="1.8" rx="0.4" fill="#78350f"/>
            <!-- Bandoulière de cuir : de l'épaule gauche à la taille droite, coutures en fuseau -->
            <path d="${STRAP_D}" fill="#92400e"/>
            <path d="${fuseau('M 37.6,63.4 C 47,71 58,79.4 66.4,87', 0.5, 8)}" fill="#fcd34d" opacity="0.7"/>
            <!-- Grand flacon de potion violette suspendu à la ceinture, côté gauche -->
            <g id="scholar-potion" transform="translate(-11 15)">
                <rect x="49.2" y="70.6" width="2.4" height="2.8" rx="0.5" fill="#d1d5db"/>
                <rect x="49.6" y="69.4" width="1.6" height="1.6" rx="0.4" fill="#92400e"/>
                <circle cx="50.4" cy="76.4" r="3.4" fill="#e0f2fe" opacity="0.9"/>
                <path d="M 47.3,77 C 47.3,80 53.5,80 53.5,77 C 51.8,76 49,76 47.3,77 Z" fill="#a855f7"/>
                <circle cx="49.3" cy="75.2" r="0.8" fill="#ffffff"/>
            </g>
            <!-- Petite fiole turquoise suspendue à la ceinture, à côté du flacon -->
            <g id="scholar-vial" transform="translate(0.8 17.5)">
                <rect x="43.1" y="66.8" width="1.6" height="1.6" rx="0.4" fill="#92400e"/>
                <rect x="43.2" y="68.2" width="1.4" height="1.6" fill="#d1d5db"/>
                <ellipse cx="43.9" cy="71.4" rx="2.1" ry="2.5" fill="#e0f2fe" opacity="0.9"/>
                <path d="M 41.9,72 C 42,74 45.8,74 45.9,72 C 44.8,71.4 43,71.4 41.9,72 Z" fill="#2dd4bf"/>
            </g>
            <!-- Gros grimoire accroché à la hanche droite par la bandoulière, fermoir d'or -->
            <g id="scholar-grimoire" transform="translate(70.4 98.8) rotate(-24) scale(-2.2 2.2)">
                <!-- Anse de cuir : le grimoire pend comme un sac à main, accroché au bout de la bandoulière -->
                <path d="M -1.7,-3.2 C -1.7,-6.4 1.7,-6.4 1.7,-3.2" fill="none" stroke="#92400e" stroke-width="0.8" stroke-linecap="round"/>
                <!-- Livre tourné sur son axe Y : couverture raccourcie en largeur et resserrée vers la droite, tranche des pages fine, dos du livre en bas -->
                <path d="M 3,-4 L 4.9,-4.6 L 5.1,2.9 L 3,3.5 Z" fill="#e6cf95"/>
                <path d="M -5,-3.4 L 3,-4 L 4.9,-4.6 L -3.2,-3.95 Z" fill="#fef3c7"/>
                <path d="${fuseau('M -3.8,-3.65 C -0.8,-3.95 2.4,-4.2 4.5,-4.4', 0.35, 8)} ${fuseau('M 3.6,-3.9 C 3.9,-1.4 3.9,1 3.7,3.1', 0.35, 8)} ${fuseau('M 4.3,-4.2 C 4.6,-1.6 4.6,0.9 4.4,2.9', 0.35, 8)} " fill="#c9a85e"/>
                <!-- Couverture de cuir, dos du livre (tranche arrière) vers le bas -->
                <path d="M -5,-3.4 L 3,-4 L 3,3.5 L -5,3.8 Z" fill="#7c2d12"/>
                <path d="M -5,2.5 L 3,2.4 L 3,3.5 L -5,3.8 Z" fill="#431407"/>
                <path d="M -3.9,-2.5 L 2.2,-2.9 L 2.2,1.6 L -3.9,1.9 Z" fill="none" stroke="#fbbf24" stroke-width="0.4" stroke-linejoin="round"/>
                <!-- Rune magique en calligraphie dorée (traits à largeur variable), halo léger -->
                <circle cx="-0.9" cy="-0.5" r="2.4" fill="#fbbf24" opacity="0.14"/>
                <path d="${calligraphique('M -0.9,-2.4 C -1.2,-1.2 -0.7,0.2 -1,1.5', 0.95, 12)} ${calligraphique('M -2.7,0.5 C -2.1,-1.1 0,-1.5 1,-0.2', 0.8, 12)} ${calligraphique('M -2.5,-1.9 C -1.5,-0.9 -0.4,0.3 0.7,1.5', 0.8, 12)}" fill="#fbbf24"/>
                <circle cx="0.9" cy="-1.9" r="0.32" fill="#fde68a"/>
                <path d="M 2.4,-1 L 4.4,-1.5 L 4.4,0.5 L 2.4,0.9 Z" fill="#fbbf24"/>
            </g>
        </g>`,
    arms: (skin = SKIN_DEFAULT) => `
        <g id="outfit-scholar-arms">
            <!-- Manche gauche de robe, poignet à revers crème, main libre -->
            <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="#2f4fa0"/>
            <path d="${fitBand([[33, 63], [26, 67.5], [24, 74.5], [27, 81.5]], [[27, 81.5], [30, 81.5], [32.5, 77.5], [35, 73.5]], 0.62, 0.92, 0.12, 0.5, 0.4)}" fill="#f8fafc"/>
            <ellipse cx="28.4" cy="83.6" rx="3.5" ry="3.2" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
            <path d="${fuseau('M 27.6,84.2 C 27.4,85 27.4,85.8 27.6,86.6', 0.6, 8)} ${fuseau('M 29.6,84.2 C 29.8,85 29.8,85.8 29.6,86.6', 0.6, 8)}" fill="${skin.shadow}"/>
            <!-- Manche droite de robe, poignet à revers crème, main libre -->
            <path d="M67 63 C74 66.5, 76 70.5, 75 75.5 C72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="#2f4fa0"/>
            <path d="${fitBand([[67, 63], [74, 66.5], [76, 70.5], [75, 75.5]], [[75, 75.5], [72.5, 77.5], [69.5, 75.5], [66, 71.5]], 0.62, 0.92, 0.12, 0.5, 0.4)}" fill="#f8fafc"/>
            <ellipse cx="75.6" cy="78" rx="3.5" ry="3.2" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
            <path d="${fuseau('M 74.8,78.6 C 74.6,79.4 74.6,80.2 74.8,81', 0.6, 8)} ${fuseau('M 76.8,78.6 C 77,79.4 77,80.2 76.8,81', 0.6, 8)}" fill="${skin.shadow}"/>
        </g>`,
    // Lunettes de vue : dessinées par-dessus le visage et la frange
    headAccessory: SCHOLAR_GLASSES + SCHOLAR_SCARF,
    handItem: ''
};

// NOTE Ondulations : bord inférieur en vagues (alternance de creux et de bosses arrondies)
export const SCHOLAR_STYLES = {
    // Coupe Trophée 9 Garçon : même coupe ondulée que le premier avatar classique (style 1), sans bandeau
    scholar_boy: {
        id: 'scholar_boy',
        name: 'Ondulé Classique (Mage Érudit)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-scholar-boy" transform="translate(50, 0) scale(0.85, 1) translate(-50, 0)">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <path d="M 18,44 C 12,34 8,26 10,20 C 12,14 6,10 12,4 C 16,-2 24,-6 30,-4 C 34,-12 44,-14 50,-10 C 56,-14 66,-12 70,-4 C 76,-6 84,-2 88,4 C 94,10 88,14 90,20 C 92,26 88,34 82,44 C 78,34 76,28 74,22 C 66,12 34,12 26,22 C 24,28 22,34 18,44 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-scholar-boy">
                <path d="M 20,32 C 21,24 24,14 34,8 C 44,4 56,4 66,8 C 76,14 79,24 80,32 C 78,35 76,33 74,27 C 72,34 66,35 62,28 C 58,35 52,36 48,27 C 44,35 38,34 34,27 C 30,34 26,35 24,28 C 22,34 20,34 20,32 Z" fill="${color}"/>
            </g>`
    },
    // Coupe Trophée 9 Fille : cheveux longs ondulés aux épaules
    scholar_girl: {
        id: 'scholar_girl',
        name: 'Longue Ondulée Studieuse (Mage Érudite)',
        withTiara: false,
        getHairBack: (color) => {
            const side = 'M 18,28 C 11,42 18,50 13,62 C 10,72 18,78 14,86 C 20,91 27,86 28,80 L 32,40 Z';
            return `
            <g id="hair-back-scholar-girl">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <path d="${side}" fill="${color}"/><path d="${mirror(side)}" fill="${color}"/>
                <!-- Nappe de cheveux derrière la nuque, reliant les deux côtés : tour de tête complet, bas ondulé -->
                <path d="M 24,40 L 76,40 C 78,56 77,70 74,82 C 71,88 66,84 62,89 C 57,93 53,86 50,90 C 47,86 43,93 38,89 C 34,84 29,88 26,82 C 23,70 22,56 24,40 Z" fill="${color}"/>
            </g>`;
        },
        getHairFront: (color) => `
            <g id="hair-front-scholar-girl">
                <path d="M 24,38 C 19,21 32,8.5 50,8.5 C 68,8.5 81,21 76,38 C 74,31 70,27 64,26 C 66,31 62,35 57,33 C 54,27 48,25 43,27 C 46,32 41,36 36,33 C 31,31 27,33 24,38 Z" fill="${color}"/>
            </g>`
    }
};

export const SCHOLAR_TROPHY = {
    id: 'scholar',
    shortId: 'scholar',
    legacyId: 'trophy_scholar_mage',
    number: 9,
    title: 'La Sagesse des Grimoires',
    species: 'human',
    speciesName: 'Humain',
    className: 'Mage à lunettes',
    badge: 'Nouveau',
    rarity: 'épique',
    unlocks: {
        species: null,
        skins: [],
        hairs: ['#b07d4b'],
        eyes: [],
        styles: { boy: 'scholar_boy', girl: 'scholar_girl' },
        outfit: 'scholar_mage',
        label: 'Mage Érudit'
    },
    tagline: 'Mage studieux aux lunettes rondes',
    description: "Neuvième trophée : débloque la robe d'érudit bleu encre, la bandoulière avec grimoire, les fioles de potion à la ceinture, les lunettes de vue rondes, les cheveux ondulés et le châtain clair.",
    rewards: [
        { icon: 'bi-eyeglasses', label: 'Accessoire : Lunettes de vue rondes' },
        { icon: 'bi-shield-shaded', label: 'Classe : Mage à lunettes' },
        { icon: 'bi-scissors', label: 'Coupes exclusives : Ondulé classique (G) / Longue ondulée (F)' },
        { icon: 'bi-book', label: 'Équipement : Grimoire en bandoulière & fioles de potion à la ceinture' },
        { icon: 'bi-person-bounding-box', label: "Tenue : Robe d'érudit bleu encre, bottines bleues & ceinture à fioles" },
        { icon: 'bi-palette', label: 'Teinte débloquée : Cheveux Châtain Clair' }
    ],
    boyPreset: {
        id: 'sch_b',
        type: 'boy',
        styleKey: 'scholar_boy',
        styleId: 1,
        outfitKey: 'scholar_mage',
        species: 'human',
        skinColor: 'pale',
        hairColor: '#b07d4b', // Châtain Clair
        eyeColor: 'blue'
    },
    girlPreset: {
        id: 'sch_g',
        type: 'girl',
        styleKey: 'scholar_girl',
        styleId: 1,
        outfitKey: 'scholar_mage',
        species: 'human',
        skinColor: 'pale',
        hairColor: '#b07d4b', // Châtain Clair (parité stricte)
        eyeColor: 'blue'
    }
};
