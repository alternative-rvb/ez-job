/**
 * Trophée 12 : Le Cosmonaute, Explorateur (astronaut)
 * Module du trophée : tenue, coupes de cheveux, casque relevé derrière la tête, drapeau et entrée du registre RPG_TROPHIES.
 */

import { fuseau, gripHand, fitBand, hairBase } from '../../avatar-kit.js';

// NOTE Gant blanc de combinaison : passé à gripHand() à la place de la carnation
const ASTRONAUT_GLOVE = { base: '#f8fafc', shadow: '#94a3b8' };

// ANCHOR Drapeau d'expédition, modélisé sur l'axe X=0, origine au milieu de la hampe (poignée)
const ASTRONAUT_FLAG_MODEL = `
    <!-- Hampe en alliage gris, embout orange -->
    <rect x="-0.7" y="-47" width="1.4" height="58" rx="0.7" fill="#94a3b8"/>
    <circle cx="0" cy="-47.6" r="1.5" fill="#f97316"/>
    <circle cx="-0.4" cy="-48" r="0.5" fill="#fed7aa"/>
    <!-- Oriflamme blanche qui flotte, bordure orange en fuseau -->
    <path d="M 0.7,-45 C 5,-47.5 10,-43 15.5,-45.5 C 14.2,-41 14.2,-37 15.5,-32.5 C 10,-35 5,-30.5 0.7,-33 Z" fill="#f8fafc"/>
    <path d="M 0.7,-45 C 5,-42.8 10,-47.2 15.5,-45.5 C 10,-41 5,-45.4 0.7,-41 Z" fill="#e2e8f0" opacity="0.6"/>
    <path d="${fuseau('M 0.7,-45 C 5,-47.5 10,-43 15.5,-45.5', 1.2, 12)} ${fuseau('M 0.7,-33 C 5,-30.5 10,-35 15.5,-32.5', 1.2, 12)}" fill="#f97316"/>
    <!-- Emblème : petite planète orange et son anneau -->
    <circle cx="8.2" cy="-39.2" r="3" fill="#f97316"/>
    <path d="${fuseau('M 3.6,-37.6 C 7,-35.4 11.6,-36 13,-38.4', 0.9, 10)}" fill="#7c2d12"/>
    <circle cx="7.3" cy="-40.2" r="0.9" fill="#fed7aa"/>
`;

// ANCHOR Rectangle aux coins arrondis en tracé (pour le cadre évidé du casque)
const roundRect = (x, y, w, h, r) => `M ${x + r},${y} H ${x + w - r} A ${r} ${r} 0 0 1 ${x + w},${y + r} V ${y + h - r} A ${r} ${r} 0 0 1 ${x + w - r},${y + h} H ${x + r} A ${r} ${r} 0 0 1 ${x},${y + h - r} V ${y + r} A ${r} ${r} 0 0 1 ${x + r},${y} Z`;

// ANCHOR Casque en deux parties, comme les cheveux. Partie arrière : fond de la coque, dans hairBack (derrière les cheveux)
const astronautHelmet = () => `
    <g id="astronaut-helmet-back">
        <rect x="14" y="-6" width="72" height="70" rx="28" fill="#f1f5f9"/>
        <path d="M 86,34 L 86,37 C 86,52 77,64 61,64 L 50,64 C 66,58 74,48 74,34 Z" fill="#cbd5e1"/>
        <rect x="18" y="-2" width="64" height="62" rx="24" fill="#94a3b8"/>
    </g>`;

// ANCHOR Partie avant : cadre blanc évidé qui passe devant les cheveux, rebord orange aux coins bas, puis la vitre
const astronautHelmetFront = () => `
    <g id="astronaut-helmet-front">
        <path d="${roundRect(14, -6, 72, 70, 28)} ${roundRect(18, -2, 64, 62, 24)}" fill="#f1f5f9" fill-rule="evenodd"/>
        <path d="${fuseau('M 17.5,38 C 17.5,50 27,59.5 40,59.5', 1.8, 16)} ${fuseau('M 82.5,38 C 82.5,50 73,59.5 60,59.5', 1.8, 16)}" fill="#f97316"/>
    </g>`;

// ANCHOR Vitre du casque, dans headAccessory (seul calque d'avant-plan rendu aussi en portrait, seul le drapeau la recouvre) : voile sombre transparent et reflets en fuseau
const astronautGlass = () => `
    <g id="astronaut-glass" pointer-events="none">
        <rect x="18" y="-2" width="64" height="62" rx="24" fill="#0f172a" opacity="0.3"/>
        <path d="${fuseau('M 27,10 C 23,19 22,29 24,40', 3, 14)}" fill="#ffffff" opacity="0.38"/>
        <path d="${fuseau('M 31,5 C 37,2 45,0 52,0', 1.8, 12)}" fill="#ffffff" opacity="0.38"/>
        <path d="${fuseau('M 70,2 C 76,7 79,14 80,22', 2.4, 12)}" fill="#ffffff" opacity="0.28"/>
    </g>`;

// ANCHOR Une mèche en fuseau de la couleur des cheveux (mêmes courbes que l'ellipse arrière)
const astronautLock = (color, d, width) => `<path d="${fuseau(d, width, 16)}" fill="${color}"/>`;

// ANCHOR Frange balayée du Cosmonaute : calotte qui démarre au point haut de la base courte (y -2) et s'arrête au-dessus des yeux
const ASTRONAUT_FRINGE = (color) => `
    <path d="M 21,31 C 19,14 32,0 50,-2 C 68,0 81,14 79,31 C 76,26 74,23 71,22 C 72,27 70,30 67,32 C 64,26 61,23 57,21 C 57,26 55,30 52,32 C 48,25 43,22 38,23 C 37,28 33,31 29,33 C 26,30 23,29 21,31 Z" fill="${color}"/>
`;

// Tenue du trophée 12 : combinaison blanche et orange, sac de survie, ceinture à outils, gants, drapeau
export const OUTFIT_ASTRONAUT_EXPLORER = {
    id: 'astronaut_explorer',
    name: 'Cosmonaute Explorateur (Humain)',
    badge: 'Trophée 12',
    backEquipment: `
        <g id="outfit-astronaut-backpack">
            <!-- Sac de survie dorsal gris acier, plus sombre que la combinaison, dépassant derrière les épaules -->
            <path d="M 31,63 C 27,62 25,64 25,68 L 26,90 C 26,93 29,95 33,94 L 40,92 L 40,66 Z" fill="#94a3b8"/>
            <path d="M 69,63 C 73,62 75,64 75,68 L 74,90 C 74,93 71,95 67,94 L 60,92 L 60,66 Z" fill="#94a3b8"/>
            <path d="M 25.5,70 L 25.8,86 C 26,89 28,91 30.5,91 L 30.5,70 Z" fill="#64748b"/>
            <path d="M 74.5,70 L 74.2,86 C 74,89 72,91 69.5,91 L 69.5,70 Z" fill="#64748b"/>
            <!-- Voyants orange sur la tranche -->
            <rect x="27.4" y="74" width="2.2" height="3" rx="0.6" fill="#f97316"/>
            <rect x="70.4" y="74" width="2.2" height="3" rx="0.6" fill="#f97316"/>
        </g>`,
    legs: `
        <g id="outfit-astronaut-legs">
            <!-- Jambes de combinaison blanche, genouillères orange -->
            <polygon points="39,83 49,83 48.5,103 41,103" fill="#f8fafc"/>
            <polygon points="51,83 61,83 59,103 51.5,103" fill="#f8fafc"/>
            <path d="M 44.4,83 L 45,103 L 41,103 L 39,83 Z" fill="#e2e8f0" opacity="0.7"/>
            <path d="M 55.6,83 L 55,103 L 59,103 L 61,83 Z" fill="#e2e8f0" opacity="0.7"/>
            <path d="${fuseau('M 40.6,92 C 43.5,93.6 46.5,93.6 48.8,92', 2.4, 10)} ${fuseau('M 51.2,92 C 53.5,93.6 56.5,93.6 59.4,92', 2.4, 10)}" fill="#f97316"/>
            <!-- Bottes lunaires grises à semelle orange -->
            <path d="M 38,103 C 38,100 50,100 50,103 L 50.5,111 C 50.5,113.5 38.5,113.5 38.5,111 Z" fill="#cbd5e1"/>
            <path d="M 49.5,103 C 49.5,100 61.5,100 61.5,103 L 62,111 C 62,113.5 50,113.5 50,111 Z" fill="#cbd5e1"/>
            <path d="${fuseau('M 38.4,110.6 C 43,112.4 46,112.4 50.4,110.6', 1.8, 10)} ${fuseau('M 49.6,110.6 C 54,112.4 57,112.4 61.6,110.6', 1.8, 10)}" fill="#f97316"/>
            <path d="${fuseau('M 38.4,104.4 C 43,105.6 46,105.6 50.4,104.4', 1, 10)} ${fuseau('M 49.6,104.4 C 54,105.6 57,105.6 61.6,104.4', 1, 10)}" fill="#94a3b8"/>
        </g>`,
    body: `
        <g id="outfit-astronaut-body">
            <!-- Combinaison blanche -->
            <path d="M 33,65 C 33,62 36,61.5 39,61.5 L 61,61.5 C 64,61.5 67,62 67,65 L 64,86 L 36,86 Z" fill="#f8fafc"/>
            <path d="M 61,61.5 C 64,61.5 67,62 67,65 L 64,86 L 58,86 C 61,76 62,68 61,61.5 Z" fill="#e2e8f0"/>
            <!-- Bandes orange en fuseau sur les flancs de la poitrine -->
            <path d="${fuseau('M 38.5,64 C 37,71 37.3,78 38.6,84', 2.2, 12)} ${fuseau('M 61.5,64 C 63,71 62.7,78 61.4,84', 2.2, 12)}" fill="#f97316"/>
            <!-- Plastron de commande : boîtier gris, trois voyants, écran -->
            <rect x="42.5" y="68" width="15" height="9.5" rx="1.6" fill="#64748b"/>
            <rect x="44" y="69.4" width="7" height="3.4" rx="0.8" fill="#0f172a"/>
            <path d="${fuseau('M 44.8,71.6 C 46.4,70.4 47.6,72.6 49.4,70.8', 0.6, 8)}" fill="#4ade80"/>
            <circle cx="53.6" cy="70.6" r="1" fill="#f97316"/>
            <circle cx="56" cy="70.6" r="1" fill="#38bdf8"/>
            <rect x="44" y="74" width="12" height="1.8" rx="0.7" fill="#cbd5e1"/>
            <!-- Écusson d'expédition sur la poitrine gauche -->
            <circle cx="39.8" cy="70" r="2.1" fill="#f97316"/>
            <path d="${fuseau('M 38.2,70.9 C 39.6,71.7 41,71.4 41.7,70.2', 0.5, 8)}" fill="#7c2d12"/>
        </g>`,
    belt: `
        <g id="outfit-astronaut-belt">
            <!-- Ceinture orange ajustée à la taille, boucle grise et deux pochettes à outils -->
            <path d="${fuseau('M 36,83.6 C 44,85.6 56,85.6 64,83.6', 3.2, 14)}" fill="#f97316"/>
            <path d="${fuseau('M 37,83.2 C 44,84.8 56,84.8 63,83.2', 0.9, 12)}" fill="#fdba74"/>
            <rect x="46.8" y="82.2" width="6.4" height="4.2" rx="0.9" fill="#94a3b8"/>
            <rect x="48.2" y="83.2" width="3.6" height="2.2" rx="0.5" fill="#475569"/>
            <rect x="38.5" y="84.6" width="4.6" height="3.6" rx="0.8" fill="#c2410c"/>
            <rect x="57" y="84.6" width="4.6" height="3.6" rx="0.8" fill="#c2410c"/>
        </g>`,
    arms: `
        <g id="outfit-astronaut-arms">
            <!-- Manche gauche blanche, brassard orange, poignet scellé -->
            <path d="M 33 63 C 26 67.5, 24 74.5, 27 81.5 C 30 81.5, 32.5 77.5, 35 73.5 Z" fill="#f8fafc"/>
            <path d="${fitBand([[33, 63], [26, 67.5], [24, 74.5], [27, 81.5]], [[27, 81.5], [30, 81.5], [32.5, 77.5], [35, 73.5]], 0.28, 0.5, 0.1, 0.5, 0.4)}" fill="#f97316"/>
            <path d="${fuseau('M 26,80.4 C 28.5,81 31,81 33.4,80.2', 1.6, 8)}" fill="#cbd5e1"/>
            <!-- Gant gauche libre, doigts en fuseau -->
            <ellipse cx="28.4" cy="83.8" rx="3.5" ry="3.3" fill="#f8fafc" stroke="#94a3b8" stroke-width="0.5"/>
            <path d="${fuseau('M 27.6,84.4 C 27.4,85.2 27.4,86 27.6,86.8', 0.6, 8)} ${fuseau('M 29.6,84.4 C 29.8,85.2 29.8,86 29.6,86.8', 0.6, 8)}" fill="#94a3b8"/>
            <!-- Manche droite blanche, brassard orange (le gant qui tient le drapeau est dans handItem) -->
            <path d="M 67 63 C 74 66.5, 76 70.5, 75 75.5 C 72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="#f8fafc"/>
            <path d="${fitBand([[67, 63], [74, 66.5], [76, 70.5], [75, 75.5]], [[75, 75.5], [72.5, 77.5], [69.5, 75.5], [66, 71.5]], 0.28, 0.5, 0.1, 0.5, 0.4)}" fill="#f97316"/>
            <path d="${fuseau('M 67.6,74.2 C 70,75 72.6,75 75.2,74.2', 1.4, 8)}" fill="#cbd5e1"/>
        </g>`,
    // NOTE Le cou est dessiné après le corps : le col-bague de la combinaison vit donc ici
    headAccessory: `
        <g id="outfit-astronaut-collar">
            <path d="${fuseau('M 40.5,60.6 Q 50,67.4 59.5,60.6', 3.6, 14)}" fill="#f8fafc"/>
            <path d="${fuseau('M 41.4,62.6 Q 50,69 58.6,62.6', 1.5, 12)}" fill="#f97316"/>
        </g>
        ${astronautHelmetFront()}
        ${astronautGlass()}`,
    handItem: `
        <g id="outfit-astronaut-flag">
            <!-- Drapeau d'expédition tenu par la main droite (75.5, 78) -->
            <g id="astronaut-flag" transform="translate(75.5, 78) rotate(6)">
                ${ASTRONAUT_FLAG_MODEL}
                <!-- Gant serrant la hampe au centre de l'arme -->
                ${gripHand(ASTRONAUT_GLOVE)}
            </g>
        </g>`
};

// SECTION Coupes de cheveux exclusives du Cosmonaute : le casque est en deux parties : fond de coque dans hairBack, cadre avant et vitre dans headAccessory
export const ASTRONAUT_STYLES = {
    astronaut_boy: {
        id: 'astronaut_boy',
        name: 'Frange d\'Équipage (Garçon)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-astronaut-boy">
                ${astronautHelmet()}
                <!-- ANCHOR Base courte : cercle un peu plus grand que le crâne -->
                ${hairBase('court', color)}
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-astronaut-boy">
                ${ASTRONAUT_FRINGE(color)}
            </g>`
    },
    astronaut_girl: {
        id: 'astronaut_girl',
        name: 'Cheveux d\'Apesanteur (Fille)',
        withTiara: false,
        getHairBack: (color) => `
            <g id="hair-back-astronaut-girl">
                ${astronautHelmet()}
                <!-- ANCHOR Base courte : tient dans le casque -->
                ${hairBase('court', color)}
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-astronaut-girl">
                ${ASTRONAUT_FRINGE(color)}
                <!-- Mèches de côté courtes en fuseau, à l'intérieur du casque (x >= 20, y <= 58) -->
                ${astronautLock(color, 'M 29,8 C 22,22 21,40 25,56', 5.5)}
                ${astronautLock(color, 'M 71,8 C 78,22 79,40 75,56', 5.5)}
            </g>`
    }
};

// SECTION Fiche Trophée RPG 12 : Cosmonaute
export const ASTRONAUT_TROPHY = {
    id: 'astronaut',
    shortId: 'astronaut',
    legacyId: 'trophy_astronaut_explorer',
    number: 12,
    title: 'Le Cosmonaute',
    species: 'human',
    speciesName: 'Humain',
    className: 'Explorateur',
    badge: 'Nouveau',
    tagline: 'Les étoiles ne sont plus qu\'à un quiz de distance !',
    description: 'Débloque la combinaison de cosmonaute blanche et orange, le casque relevé derrière la tête et le drapeau d\'expédition.',
    rarity: 'rare',
    rewards: [
        { icon: 'bi-person-badge', label: 'Espèce : Humain' },
        { icon: 'bi-rocket-takeoff', label: 'Classe : Cosmonaute Explorateur' },
        { icon: 'bi-scissors', label: 'Coupes exclusives : Frange d\'Équipage (G) / Apesanteur (F)' },
        { icon: 'bi-flag', label: 'Accessoire : Drapeau d\'expédition' },
        { icon: 'bi-person-bounding-box', label: 'Tenue : Combinaison, sac de survie & casque relevé' },
        { icon: 'bi-palette', label: 'Teinte débloquée : Indigo Orbital' }
    ],
    boyPreset: {
        id: 'ast_b',
        type: 'boy',
        styleKey: 'astronaut_boy',
        styleId: 1,
        outfitKey: 'astronaut_explorer',
        species: 'human',
        skinColor: 'golden',
        hairColor: '#312e81',
        eyeColor: 'sky'
    },
    girlPreset: {
        id: 'ast_g',
        type: 'girl',
        styleKey: 'astronaut_girl',
        styleId: 1,
        outfitKey: 'astronaut_explorer',
        species: 'human',
        skinColor: 'golden',
        hairColor: '#312e81',
        eyeColor: 'sky'
    }
};
