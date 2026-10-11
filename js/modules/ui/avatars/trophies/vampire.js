/**
 * Trophée 6 : La Nuit Éternelle, Noble Duelliste (vampire)
 * Module du trophée : tenue, coupes de cheveux et entrée du registre RPG_TROPHIES.
 */

import { fuseau, plume, gripHand, fitBand, SKIN_DEFAULT } from '../../avatar-kit.js';

// ANCHOR Rapière argentée du Noble Duelliste, modélisée sur l'axe X=0 (poignée vers +Y, lame vers -Y), origine au milieu de la poignée
const VAMPIRE_RAPIER_MODEL = `
    <!-- Lame fine en argent poli, du bas de la garde à la pointe -->
    <path d="${plume('M 0,-5 C 0,-20 0,-38 0,-54', 2.6, 12)}" fill="#cbd5e1"/>
    <path d="${fuseau('M -0.5,-8 C -0.5,-20 -0.5,-34 -0.5,-46', 0.7, 8)}" fill="#ffffff"/>
    <path d="${fuseau('M 0.7,-8 C 0.7,-20 0.7,-34 0.7,-46', 0.5, 8)}" fill="#94a3b8"/>
    <!-- Garde en coquille et quillons d'argent -->
    <path d="M -5,-3.4 C -5,-8 5,-8 5,-3.4 C 2.6,-1.8 -2.6,-1.8 -5,-3.4 Z" fill="#cbd5e1"/>
    <path d="${fuseau('M -4.4,-3.6 C -2.6,-6.2 2.6,-6.2 4.4,-3.6', 0.8, 10)}" fill="#f8fafc"/>
    <path d="${fuseau('M -6.4,-4.2 C -2,-4.2 2,-4.2 6.4,-4.2', 1, 8)}" fill="#94a3b8"/>
    <!-- Poignée de cuir noir et pommeau rubis -->
    <rect x="-1.2" y="-2" width="2.4" height="9" rx="1.1" fill="#18181b"/>
    <circle cx="0" cy="8.4" r="1.7" fill="#dc2626"/>
    <circle cx="-0.5" cy="7.9" r="0.5" fill="#ffffff" opacity="0.8"/>
`;

// Tenue du trophée 6 : noble duelliste, redingote de velours rouge sang, jabot blanc, cape pourpre sang très sombre
export const OUTFIT_VAMPIRE_NOBLE = {
    id: 'vampire_noble',
    name: 'Noble Duelliste (Vampire)',
    badge: 'Trophée 6',
    backEquipment: `
        <g id="outfit-vampire-cape">
            <!-- Cape pourpre sang très sombre (#450a0a, nettement plus foncée que la redingote #991b1b), doublure encore plus sombre -->
            <path d="M 30,63 C 19,76 14,94 12,108 C 34,111 66,111 88,108 C 86,94 81,76 70,63 L 60,67 L 40,67 Z" fill="#450a0a"/>
            <path d="M 37,70 C 35,86 31,100 27,109 C 41,111 59,111 73,109 C 69,100 65,86 63,70 Z" fill="#2c0606"/>
            <!-- Liseré de la cape en fuseau -->
            <path d="${fuseau('M 30,63 C 19,76 14,94 12,108', 1.1, 12)} ${fuseau('M 70,63 C 81,76 86,94 88,108', 1.1, 12)}" fill="#7f1d1d"/>
            <!-- Cols relevés derrière la tête -->
            <path d="M 29,63 L 21,45 L 38,59 Z" fill="#450a0a"/>
            <path d="M 71,63 L 79,45 L 62,59 Z" fill="#450a0a"/>
            <path d="M 29.5,61.5 L 24,50 L 35,59 Z" fill="#7f1d1d"/>
            <path d="M 70.5,61.5 L 76,50 L 65,59 Z" fill="#7f1d1d"/>
        </g>`,
    legs: `
        <g id="outfit-vampire-legs">
            <!-- Pantalon noir ajusté -->
            <polygon points="39,83 49,83 48.5,104 41,104" fill="#1c1917"/>
            <polygon points="51,83 61,83 59,104 51.5,104" fill="#1c1917"/>
            <!-- Bottes noires à revers d'argent -->
            <path d="M39.5 104 C39.5 102, 49.5 102, 49.5 104 L50 113 C50 115, 39 115, 39 113 Z" fill="#09090b"/>
            <path d="${fuseau('M 39.5,104.4 C 42.78,105.2 46.22,105.2 49.5,104.4', 1.1, 10)}" fill="#cbd5e1"/>
            <path d="M50.5 104 C50.5 102, 60.5 102, 60.5 104 L61 113 C61 115, 50 115, 50 113 Z" fill="#09090b"/>
            <path d="${fuseau('M 51,104.4 C 54.28,105.2 57.72,105.2 61,104.4', 1.1, 10)}" fill="#cbd5e1"/>
        </g>`,
    body: `
        <g id="outfit-vampire-body">
            <!-- Redingote de velours rouge sang -->
            <path d="M 33,65 C 33,62 36,61.5 39,61.5 L 61,61.5 C 64,61.5 67,62 67,65 L 64,86 L 36,86 Z" fill="#991b1b"/>
            <!-- Revers plus sombres et boutonnage central -->
            <path d="M 41,61.5 L 50,76 L 59,61.5 L 56,61.5 L 50,70 L 44,61.5 Z" fill="#7f1d1d"/>
            <path d="${fuseau('M 50,66 C 50,72 50,79 50,85', 0.8, 10)}" fill="#450a0a"/>
            <circle cx="46.8" cy="72" r="1" fill="#fbbf24"/><circle cx="53.2" cy="72" r="1" fill="#fbbf24"/>
            <circle cx="46.4" cy="78" r="1" fill="#fbbf24"/><circle cx="53.6" cy="78" r="1" fill="#fbbf24"/>
            <!-- Jabot de dentelle blanche -->
            <path d="M 43.5,61 C 45,65 47,69 50,72.5 C 53,69 55,65 56.5,61 C 53.5,62.6 46.5,62.6 43.5,61 Z" fill="#f8fafc"/>
            <path d="${fuseau('M 45,64.5 C 47,66.8 53,66.8 55,64.5', 0.5, 10)} ${fuseau('M 46.5,68 C 48,69.6 52,69.6 53.5,68', 0.5, 10)}" fill="#cbd5e1"/>
            <!-- Broche rubis au jabot -->
            <circle cx="50" cy="66.5" r="1.3" fill="#dc2626" stroke="#7f1d1d" stroke-width="0.3"/>
        </g>`,
    belt: `
        <g id="outfit-vampire-belt">
            <!-- Ceinture noire ajustée à la taille, boucle d'argent -->
            <path d="${fuseau('M 36,84 C 44.5,85.6 55.5,85.6 64,84', 3.4, 12)}" fill="#18181b"/>
            <g transform="translate(0 1.2)"><rect x="47.8" y="82.6" width="4.4" height="3" rx="0.7" fill="#cbd5e1"/><rect x="48.8" y="83.4" width="2.4" height="1.4" rx="0.3" fill="#18181b"/></g>
        </g>`,
    arms: (skin = SKIN_DEFAULT) => `
        <g id="outfit-vampire-arms">
            <!-- Manche gauche de redingote, manchette de dentelle ajustée au poignet -->
            <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="#991b1b"/>
            <path d="${fitBand([[33, 63], [26, 67.5], [24, 74.5], [27, 81.5]], [[27, 81.5], [30, 81.5], [32.5, 77.5], [35, 73.5]], 0.62, 0.92, 0.12, 0.5, 0.4)}" fill="#f8fafc"/>
            <!-- Main gauche libre, doigts en fuseau -->
            <ellipse cx="28.4" cy="83.6" rx="3.5" ry="3.2" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
            <path d="${fuseau('M 27.6,84.2 C 27.4,85 27.4,85.8 27.6,86.6', 0.6, 8)} ${fuseau('M 29.6,84.2 C 29.8,85 29.8,85.8 29.6,86.6', 0.6, 8)}" fill="${skin.shadow}"/>
            <!-- Manche droite de redingote, manchette de dentelle (la main qui serre la rapière est dessinée dans handItem) -->
            <path d="M67 63 C74 66.5, 76 70.5, 75 75.5 C72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="#991b1b"/>
            <path d="${fitBand([[67, 63], [74, 66.5], [76, 70.5], [75, 75.5]], [[75, 75.5], [72.5, 77.5], [69.5, 75.5], [66, 71.5]], 0.62, 0.92, 0.12, 0.5, 0.4)}" fill="#f8fafc"/>
        </g>`,
    headAccessory: '',
    handItem: (skin = SKIN_DEFAULT) => `
        <g id="outfit-vampire-rapier">
            <!-- Rapière tenue dans la main droite (75.5, 78) -->
            <g id="vampire-rapier" transform="translate(75.5, 78) rotate(14)">
                ${VAMPIRE_RAPIER_MODEL}
                <!-- Main refermée sur la poignée (origine du groupe) -->
                ${gripHand(skin)}
            </g>
        </g>`
};

// NOTE Cheveux lisses : deux demi-ellipses (l'ellipse coupée en deux au milieu) et frange rideau, séparée au milieu du front
// Rideau gauche : arc extérieur sur le crâne, bord intérieur qui part de la raie (50,16) et s'écarte vers la tempe, mèche pointue vers la joue
const vampireCurtain = (color, tip) => `
                <path d="M 50,4 C 33,4 19,16 19,34 C 19,${tip - 14} 21,${tip - 6} 24,${tip} C 26,${tip - 10} 27,50 29,38 C 33,29 43,20 50,16 Z" fill="${color}"/>
                <path d="M 50,4 C 67,4 81,16 81,34 C 81,${tip - 14} 79,${tip - 6} 76,${tip} C 74,${tip - 10} 73,50 71,38 C 67,29 57,20 50,16 Z" fill="${color}"/>
                <path d="${fuseau('M 47,18 C 41,22 35,28 31,35', 1.1, 10)} ${fuseau('M 53,18 C 59,22 65,28 69,35', 1.1, 10)}" fill="#ffffff" opacity="0.14"/>`;

export const VAMPIRE_STYLES = {
    // Coupe Trophée 6 Garçon : cheveux lisses mi-longs, frange rideau séparée au milieu
    vampire_boy: {
        id: 'vampire_boy',
        name: 'Lisse Frange Rideau (Noble Vampire)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-vampire-boy">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <path d="M 50,12 A 33 28 0 0 0 50,68 Z" fill="${color}"/>
                <path d="M 50,12 A 33 28 0 0 1 50,68 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-vampire-boy">${vampireCurtain(color, 62)}
            </g>`
    },
    // Coupe Trophée 6 Fille : cheveux lisses longs en deux demi-ellipses, frange rideau séparée au milieu
    vampire_girl: {
        id: 'vampire_girl',
        name: 'Longue Lisse Frange Rideau (Comtesse Vampire)',
        withTiara: false,
        getHairBack: (color) => `
            <g id="hair-back-vampire-girl">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <path d="M 50,24 A 36 37 0 0 0 50,98 Z" fill="${color}"/>
                <path d="M 50,24 A 36 37 0 0 1 50,98 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-vampire-girl">${vampireCurtain(color, 74)}
            </g>`
    }
};

export const VAMPIRE_TROPHY = {
    id: 'vampire',
    shortId: 'vampire',
    legacyId: 'trophy_vampire_noble',
    number: 6,
    title: 'La Nuit Éternelle',
    species: 'vampire',
    speciesName: 'Vampire',
    className: 'Noble Duelliste',
    badge: 'Nouveau',
    rarity: 'épique',
    unlocks: {
        species: 'vampire',
        skins: ['vampire-pale'],
        hairs: ['#2a0a12'],
        eyes: ['ruby'],
        styles: { boy: 'vampire_boy', girl: 'vampire_girl' },
        outfit: 'vampire_noble',
        label: 'Noble Vampire'
    },
    tagline: 'Aristocrate immortel au regard rubis',
    description: "Sixième trophée : débloque l'espèce Vampire (canines apparentes, regard rubis, teint de lune), la redingote de velours rouge sang, le jabot de dentelle, la cape pourpre sang et la rapière argentée.",
    rewards: [
        { icon: 'bi-feather', label: 'Espèce : Vampire (Canines & Regard rubis)' },
        { icon: 'bi-shield-shaded', label: 'Classe : Noble Duelliste' },
        { icon: 'bi-scissors', label: 'Coupes exclusives : Plaqué en arrière (G) / Longue lisse (F)' },
        { icon: 'bi-slash-square', label: 'Arme : Rapière argentée au pommeau rubis' },
        { icon: 'bi-person-bounding-box', label: 'Tenue : Redingote de velours, jabot de dentelle & cape pourpre sang' },
        { icon: 'bi-palette', label: 'Teintes débloquées : Peau Pâleur Nocturne, Cheveux Noir Carmin & Yeux Rubis' }
    ],
    boyPreset: {
        id: 'vmp_b',
        type: 'boy',
        styleKey: 'vampire_boy',
        styleId: 1,
        outfitKey: 'vampire_noble',
        species: 'vampire',
        skinColor: 'vampire-pale',
        hairColor: '#2a0a12', // Noir Carmin (contraste franc avec la peau pâle)
        eyeColor: 'ruby'
    },
    girlPreset: {
        id: 'vmp_g',
        type: 'girl',
        styleKey: 'vampire_girl',
        styleId: 1,
        outfitKey: 'vampire_noble',
        species: 'vampire',
        skinColor: 'vampire-pale',
        hairColor: '#2a0a12', // Noir Carmin (parité stricte)
        eyeColor: 'ruby'
    }
};
