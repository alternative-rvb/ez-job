/**
 * Trophée 3 : Le Serment Solaire (paladin)
 * Module du trophée : tenue, coupes de cheveux et entrée du registre RPG_TROPHIES.
 */

import { fuseau, SKIN_DEFAULT } from '../../avatar-kit.js';

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
    <path d="${fuseau('M 0,-2.5 C 0,-9.83 0,-17.17 0,-24.5', 0.7, 10)}" fill="#94a3b8"/>
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
            <path d="${fuseau('M 25,110 C 29.03,111.25 33.32,111.35 37.49,110.95 C 41.64,110.57 45.89,109.95 50,111 C 54.11,109.95 58.36,110.57 62.51,110.95 C 66.68,111.35 70.97,111.25 75,110', 1.79, 5)}" fill="#fbbf24"/>
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
            <path d="${fuseau('M 40,107.5 C 43,107.5 46,107.5 49,107.5', 1.2, 8)}" fill="#fbbf24"/>
            <path d="${fuseau('M 51,107.5 C 54,107.5 57,107.5 60,107.5', 1.2, 8)}" fill="#fbbf24"/>
        </g>`,
    body: `
        <g id="outfit-paladin-body">
            <!-- Cuirasse d'acier -->
            <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 62,61.5 C 66,61.5 69,62 69,65 L 63.5,86 L 36.5,86 Z" fill="#cbd5e1"/>
            <path d="M 34,64 C 35,63 37,62.5 40,62.5 L 42,62.5 L 41,80 L 37.5,80 Z" fill="#f1f5f9" opacity="0.7"/>
            <!-- Tabard blanc à liserés or -->
            <path d="M 42,62 L 58,62 L 57,86 L 43,86 Z" fill="#f8fafc"/>
            <path d="${fuseau('M 42,62 C 42.33,70 42.67,78 43,86', 1.3, 8)}" fill="#fbbf24"/>
            <path d="${fuseau('M 58,62 C 57.67,70 57.33,78 57,86', 1.3, 8)}" fill="#fbbf24"/>
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
            <!-- Ceinture en métal gris clair ajustée à la taille, boucle solaire centrée sur la courbe -->
            <path d="${fuseau('M 36.1,84.5 C 45.28,86.1 54.72,86.1 63.9,84.5', 6.75, 16)}" fill="#cbd5e1" stroke="#94a3b8" stroke-width="0.4"/>
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
            <path d="${fuseau('M 28,84.3 C 27.8,85.18 27.74,86.1 27.8,87', 0.64, 8)} ${fuseau('M 30,84.3 C 30.2,85.18 30.26,86.1 30.2,87', 0.64, 8)}" fill="${skin.shadow}"/>
            <!-- Bras droit -->
            <path d="M68 64 C76 69, 78 72, 76 79 C73 81, 70 79, 66 75 Z" fill="#94a3b8"/>
            <path d="M72 69 C75 72, 75 76, 73 78 C70 78, 68 75, 68 72 Z" fill="#cbd5e1"/>
            <!-- NOTE Main droite dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
            <!-- Épaulières bombées à liseré or -->
            <path d="M 25,68 C 24,62 30,58.5 37,61 C 39,62.5 38.5,65.5 36.5,67 C 33,69.5 28,70 25,68 Z" fill="#e2e8f0"/>
            <path d="${fuseau('M 25,68 C 28.54,70.18 33.24,69.27 36.5,67', 1.3, 10)}" fill="#fbbf24"/>
            <path d="M 75,68 C 76,62 70,58.5 63,61 C 61,62.5 61.5,65.5 63.5,67 C 67,69.5 72,70 75,68 Z" fill="#e2e8f0"/>
            <path d="${fuseau('M 75,68 C 71.46,70.18 66.76,69.27 63.5,67', 1.3, 10)}" fill="#fbbf24"/>
        </g>`,
    headAccessory: `
        <g id="outfit-paladin-head-accessory">
            <!-- Diadème en métal gris clair en fuseau, épais au front, fin aux tempes, contraste avec la chevelure Or Solaire -->
            <path d="${fuseau('M 28,26 C 42.42,22.68 57.58,22.68 72,26', 3.8, 14)}" fill="#cbd5e1"/>
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
    handItem: (skin = SKIN_DEFAULT) => `
        <g id="outfit-paladin-hand-items">
            <!-- Épée longue tenue droite dans la main droite (76, 79) -->
            <g id="paladin-sword" transform="translate(76, 79) rotate(12)">
                ${PALADIN_SWORD_MODEL}
                <ellipse cx="0" cy="2.5" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                <path d="${fuseau('M -1.6,1.5 C -0.73,1.5 0.13,1.5 1,1.5', 0.65, 8)}" fill="${skin.shadow}"/>
                <path d="${fuseau('M -1.6,3.5 C -0.73,3.5 0.13,3.5 1,3.5', 0.65, 8)}" fill="${skin.shadow}"/>
            </g>
            <!-- Bouclier solaire au bras gauche (main en 29, 84) -->
            <g id="paladin-shield" transform="translate(25, 72) rotate(-6)">
                ${PALADIN_SHIELD_MODEL}
            </g>
        </g>`
};

export const PALADIN_STYLES = {
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
                <!-- Chevelure longue et droite : côtés verticaux jusqu'aux omoplates, bas presque plat aux coins arrondis -->
                <path d="M 16,36 C 10,22 14,8 24,0 C 34,-6 66,-6 76,0 C 86,8 90,22 84,36 L 83,78 C 83,82.5 79,85 74,85 L 26,85 C 21,85 17,82.5 17,78 Z" fill="${color}"/>
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
};

export const PALADIN_TROPHY = {
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
    rarity: 'rare',
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
};
