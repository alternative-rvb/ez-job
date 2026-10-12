/**
 * Trophée 10 : Le Corsaire des Mers, Flibustier (pirate)
 * Module du trophée : tenue, coupes de cheveux, sabre d'abordage, tricorne et entrée du registre RPG_TROPHIES.
 */

import { fuseau, plume, gripHand, fitBand, SKIN_DEFAULT } from '../../avatar-kit.js';

// ANCHOR Sabre d'abordage (cimeterre / rapière de corsaire), modélisé sur l'axe X=0, origine au milieu de la poignée
const PIRATE_SABER_MODEL = `
    <!-- Lame d'abordage courbée en acier brillant : dos droit puis courbe vers la pointe acérée -->
    <path d="M 0,-4 C 0.5,-16 -1,-30 -4,-48 C -2,-42 2,-25 1.5,-4 Z" fill="#cbd5e1"/>
    <path d="${fuseau('M 0.2,-6 C 0.8,-18 -0.5,-32 -3.2,-46', 0.8, 10)}" fill="#ffffff"/>
    <path d="${fuseau('M -0.4,-6 C 0.1,-18 -1.2,-30 -3.8,-45', 0.6, 10)}" fill="#94a3b8"/>
    <!-- Garde coquille en laiton doré et quillons ouvragés -->
    <path d="M -5.5,-3 C -6.5,-7 6,-7 5.5,-3 C 3,-1.5 -3,-1.5 -5.5,-3 Z" fill="#fbbf24"/>
    <path d="${fuseau('M -5,-3 C -3.5,-5.8 4,-5.8 5,-3', 0.9, 10)}" fill="#fef08a"/>
    <path d="M -5.5,-3 C -9,2 -7.5,8 -1.5,8.5 C -3,7 -6,3 -4,-2 Z" fill="#d97706"/>
    <!-- Poignée de cuir brun ceinturée de fil d'or -->
    <rect x="-1.2" y="-2" width="2.4" height="9.5" rx="1" fill="#29180d"/>
    <path d="M -1,0 L 1,1.5 M -1,3 L 1,4.5 M -1,6 L 1,7.5" stroke="#fbbf24" stroke-width="0.6"/>
    <!-- Pommeau rond en laiton ouvragé -->
    <circle cx="0" cy="8.8" r="1.8" fill="#fbbf24"/>
    <circle cx="-0.5" cy="8.3" r="0.6" fill="#fef08a"/>
`;

// Tenue du trophée 10 : veste de corsaire bleu océan, manteau dorsal marine sombre, pantalon bouffant et tricorne
export const OUTFIT_PIRATE_CORSAIR = {
    id: 'pirate_corsair',
    name: 'Corsaire des Mers (Humain)',
    badge: 'Trophée 10',
    backEquipment: `
        <g id="outfit-pirate-coat-back">
            <!-- Manteau long de capitaine marine très sombre (#091e36, nettement plus foncé que la veste #1e3a5f) -->
            <path d="M 29,64 C 18,77 12,95 10,110 C 23,108 31,109 39,111 C 42,98 46,88 48,80 C 42,75 35,70 29,64 Z" fill="#091e36" stroke="#05101d" stroke-width="0.8"/>
            <path d="M 71,64 C 82,77 88,95 90,110 C 77,108 69,109 61,111 C 58,98 54,88 52,80 C 58,75 65,70 71,64 Z" fill="#091e36" stroke="#05101d" stroke-width="0.8"/>
            <path d="M 36,78 C 34,92 31,107 35,111 C 45,110 55,110 65,111 C 69,107 66,92 64,78 Z" fill="#05101d"/>
            <!-- Liseré or sur le bord extérieur du manteau -->
            <path d="${fuseau('M 29,64 C 18,77 12,95 10,110', 1.1, 14)} ${fuseau('M 71,64 C 82,77 88,95 90,110', 1.1, 14)}" fill="#fbbf24"/>
        </g>`,
    legs: `
        <g id="outfit-pirate-legs">
            <!-- Pantalon sombre de marin bouffant -->
            <polygon points="39,83 49,83 48.5,103 41,103" fill="#0f172a"/>
            <polygon points="51,83 61,83 59,103 51.5,103" fill="#0f172a"/>
            <!-- Bottes montantes de pirate en cuir sombre avec grands revers évasés -->
            <path d="M 38,103 C 38,100 50,100 50,103 L 50.5,113 C 50.5,115 38.5,115 38.5,113 Z" fill="#24140a"/>
            <path d="M 49.5,103 C 49.5,100 61.5,100 61.5,103 L 62,113 C 62,115 50,115 50,113 Z" fill="#24140a"/>
            <!-- Grands revers de bottes avec bordure cuir et boucle laiton -->
            <path d="M 37.5,102 C 37.5,100 50.5,100 50.5,102 L 50.5,106.5 C 47,107.5 41,107.5 37.5,106.5 Z" fill="#3b200f"/>
            <path d="M 49.5,102 C 49.5,100 62.5,100 62.5,102 L 62.5,106.5 C 59,107.5 53,107.5 49.5,106.5 Z" fill="#3b200f"/>
            <path d="${fuseau('M 37.5,102 C 44,101 50.5,101 50.5,102', 1, 10)} ${fuseau('M 49.5,102 C 56,101 62.5,101 62.5,102', 1, 10)}" fill="#d97706"/>
            <!-- Boucles dorées sur le cou-de-pied -->
            <rect x="42.5" y="108.5" width="3.6" height="2.4" rx="0.5" fill="#fbbf24"/>
            <rect x="54.5" y="108.5" width="3.6" height="2.4" rx="0.5" fill="#fbbf24"/>
        </g>`,
    body: `
        <g id="outfit-pirate-body">
            <!-- Veste de corsaire bleu océan profond -->
            <path d="M 33,65 C 33,62 36,61.5 39,61.5 L 61,61.5 C 64,61.5 67,62 67,65 L 64,86 L 36,86 Z" fill="#1e3a5f"/>
            <!-- Chemise blanche à col ouvert et jabot de corsaire -->
            <polygon points="44,61.5 50,75 56,61.5" fill="#f8fafc"/>
            <path d="${fuseau('M 46,65 C 48,68 52,68 54,65', 0.9, 10)} ${fuseau('M 47,70 C 49,72 51,72 53,70', 0.8, 10)}" fill="#cbd5e1"/>
            <!-- Revers de veste brodés or -->
            <path d="M 39,61.5 L 45,76 L 38,82 L 36,82 Z" fill="#152b47"/>
            <path d="M 61,61.5 L 55,76 L 62,82 L 64,82 Z" fill="#152b47"/>
            <path d="${fuseau('M 39,61.5 Q 42,68.75 45,76', 1, 10)} ${fuseau('M 61,61.5 Q 58,68.75 55,76', 1, 10)}" fill="#fbbf24"/>
            <!-- Boutons dorés en double rangée -->
            <circle cx="42" cy="67" r="1.1" fill="#fbbf24"/><circle cx="58" cy="67" r="1.1" fill="#fbbf24"/>
            <circle cx="43" cy="72" r="1.1" fill="#fbbf24"/><circle cx="57" cy="72" r="1.1" fill="#fbbf24"/>
            <circle cx="44" cy="77" r="1.1" fill="#fbbf24"/><circle cx="56" cy="77" r="1.1" fill="#fbbf24"/>
        </g>`,
    belt: `
        <g id="outfit-pirate-belt">
            <!-- Écharpe de taille nouée rouge carmin plissée -->
            <path d="${fuseau('M 35.5,83.5 C 44,86 56,86 64.5,83.5', 4.5, 14)}" fill="#991b1b"/>
            <path d="${fuseau('M 37,84 C 44,86.2 56,86.2 63,84', 1.2, 12)}" fill="#dc2626"/>
            <!-- Nœud et pans pendants de l'écharpe sur la hanche gauche -->
            <path d="M 35,84.5 L 32,96 L 35.5,95 L 37.5,85.5 Z" fill="#7f1d1d"/>
            <path d="M 37,84.5 L 35,93 L 38.5,92.5 L 39.5,85.5 Z" fill="#991b1b"/>
            <!-- Large ceinture de cuir sombre par-dessus -->
            <path d="${fuseau('M 36,83 C 44,84.8 56,84.8 64,83', 2.8, 12)}" fill="#261408"/>
            <!-- Boucle carrée en laiton doré poli -->
            <g transform="translate(0 0.8)">
                <rect x="47.2" y="81.8" width="5.6" height="4.4" rx="0.8" fill="#fbbf24"/>
                <rect x="48.6" y="82.8" width="2.8" height="2.4" rx="0.4" fill="#261408"/>
                <rect x="47.6" y="83.6" width="4.8" height="0.8" rx="0.2" fill="#d97706"/>
            </g>
        </g>`,
    arms: (skin = SKIN_DEFAULT) => `
        <g id="outfit-pirate-arms">
            <!-- Manche gauche bleue avec parement retroussé et galon doré -->
            <path d="M 33 63 C 26 67.5, 24 74.5, 27 81.5 C 30 81.5, 32.5 77.5, 35 73.5 Z" fill="#1e3a5f"/>
            <path d="${fitBand([[33, 63], [26, 67.5], [24, 74.5], [27, 81.5]], [[27, 81.5], [30, 81.5], [32.5, 77.5], [35, 73.5]], 0.62, 0.92, 0.12, 0.5, 0.4)}" fill="#152b47"/>
            <path d="${fuseau('M 26,80 C 28.5,80.5 31,80.5 33.5,80', 1, 8)}" fill="#fbbf24"/>
            <!-- Main gauche libre, doigts en fuseau -->
            <ellipse cx="28.4" cy="83.6" rx="3.5" ry="3.2" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
            <path d="${fuseau('M 27.6,84.2 C 27.4,85 27.4,85.8 27.6,86.6', 0.6, 8)} ${fuseau('M 29.6,84.2 C 29.8,85 29.8,85.8 29.6,86.6', 0.6, 8)}" fill="${skin.shadow}"/>
            <!-- Manche droite bleue avec parement retroussé (main qui tient le sabre dans handItem) -->
            <path d="M 67 63 C 74 66.5, 76 70.5, 75 75.5 C 72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="#1e3a5f"/>
            <path d="${fitBand([[67, 63], [74, 66.5], [76, 70.5], [75, 75.5]], [[75, 75.5], [72.5, 77.5], [69.5, 75.5], [66, 71.5]], 0.62, 0.92, 0.12, 0.5, 0.4)}" fill="#152b47"/>
            <path d="${fuseau('M 67.5,74.5 C 70,75 72.5,75 75,74.5', 1, 8)}" fill="#fbbf24"/>
        </g>`,
    headAccessory: `
        <g id="outfit-pirate-tricorne">
            <!-- Calotte supérieure du tricorne recouvrant le sommet du crâne -->
            <path d="M 23,24 C 22,0 35,-6 50,-6 C 65,-6 78,0 77,24 Z" fill="#071221"/>
            <!-- Ailes relevées arrière du tricorne -->
            <path d="M 12,22 C 14,7 28,0 50,0 C 72,0 86,7 88,22 C 80,14 66,10 50,10 C 34,10 20,14 12,22 Z" fill="#0b1b30"/>
            <path d="${fuseau('M 12,22 C 28,2 72,2 88,22', 1.4, 16)}" fill="#d97706"/>
            <!-- Rebord avant relevé en tricorne avec pointe centrale -->
            <path d="M 14,24 C 24,13 38,17 50,21 C 62,17 76,13 86,24 C 80,28 67,25 50,25 C 33,25 20,28 14,24 Z" fill="#0f243f"/>
            <!-- Galon doré prestigieux sur le rebord avant -->
            <path d="${fuseau('M 14,24 C 24,13 38,17 50,21 C 62,17 76,13 86,24', 2.2, 16)}" fill="#fbbf24"/>
            <path d="${fuseau('M 17,24.5 C 26,14.5 39,18 50,22 C 61,18 74,14.5 83,24.5', 1, 14)}" fill="#fef08a"/>
            <!-- Médaillon d'or et rubis au centre du tricorne -->
            <circle cx="50" cy="21" r="2.8" fill="#fbbf24"/>
            <circle cx="50" cy="21" r="1.5" fill="#dc2626"/>
            <circle cx="49.3" cy="20.3" r="0.6" fill="#fef08a"/>
            <!-- Grande plume écarlate de corsaire flottant sur le côté -->
            <path d="${plume('M 50,19 C 40,11 28,5 14,3', 4.2, 16)}" fill="#dc2626"/>
            <path d="${fuseau('M 48,18.5 C 39,11 28,5 14,3', 1, 14)}" fill="#fef08a"/>
        </g>`,
    handItem: (skin = SKIN_DEFAULT) => `
        <g id="outfit-pirate-saber">
            <!-- Sabre d'abordage tenu par la main droite (75.5, 78) -->
            <g id="pirate-saber" transform="translate(75.5, 78) rotate(16)">
                ${PIRATE_SABER_MODEL}
                <!-- Main serrant la poignée au centre de l'arme -->
                ${gripHand(skin)}
            </g>
        </g>`
};

// SECTION Coupes de cheveux exclusives du Pirate (garçon et fille)
export const PIRATE_STYLES = {
    pirate_boy: {
        id: 'pirate_boy',
        name: 'Marin d\'Abordage (Garçon)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-pirate-boy">
                <!-- ANCHOR Socle universel : ne pas descendre sous y=57 -->
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <!-- Mèches mi-longues décoiffées par les embruns -->
                <path d="M 17,46 C 12,36 8,24 11,16 C 14,8 10,4 17,-2 C 23,-8 33,-10 39,-8 C 43,-16 53,-18 59,-14 C 67,-18 77,-14 81,-6 C 89,-6 95,2 93,12 C 97,20 93,32 85,46 C 80,35 76,27 72,21 C 64,11 36,11 28,21 C 24,27 21,35 17,46 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-pirate-boy">
                <!-- Mèches libres sur le front et tempes dégagées pour le tricorne -->
                <path d="M 21,28 C 24,18 36,10 50,6 C 64,10 76,18 79,28 C 76,33 74,31 71,25 C 68,32 63,33 60,26 C 56,33 50,34 46,25 C 42,33 36,32 33,25 C 29,32 25,33 23,26 C 21,31 20,30 21,28 Z" fill="${color}"/>
            </g>`
    },
    pirate_girl: {
        id: 'pirate_girl',
        name: 'Capitaine Aventurière (Fille)',
        withTiara: false,
        getHairBack: (color) => `
            <g id="hair-back-pirate-girl">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <!-- Longue crinière ondulée tombant sur les épaules -->
                <path d="M 16,48 C 11,38 7,26 10,18 C 13,10 9,6 16,0 C 22,-6 32,-8 38,-6 C 42,-14 52,-16 58,-12 C 66,-16 76,-12 80,-4 C 88,-4 94,4 92,14 C 96,22 92,34 84,48 C 81,64 78,78 74,88 C 70,82 72,70 71,60 C 64,20 36,20 29,60 C 28,70 30,82 26,88 C 22,78 19,64 16,48 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-pirate-girl">
                <!-- Mèches de visage aventureuses avec longue mèche tombante sur le côté -->
                <path d="M 20,30 C 22,18 35,8 50,6 C 65,8 78,18 80,30 C 76,34 74,30 72,24 C 69,32 64,34 60,26 C 55,34 49,35 45,26 C 40,34 35,33 31,25 C 28,32 24,33 22,27 Z" fill="${color}"/>
                <!-- Mèche longue et élégante encadrant la tempe gauche -->
                <path d="${fuseau('M 22,30 C 18,42 17,54 20,66', 2.2, 14)}" fill="${color}"/>
                <path d="${fuseau('M 78,30 C 82,42 83,54 80,66', 2.2, 14)}" fill="${color}"/>
            </g>`
    }
};

// SECTION Fiche Trophée RPG 10 : Pirate
export const PIRATE_TROPHY = {
    id: 'pirate',
    shortId: 'pirate',
    legacyId: 'trophy_pirate_corsair',
    number: 10,
    title: 'Le Corsaire des Mers',
    species: 'human',
    speciesName: 'Humain',
    className: 'Corsaire',
    badge: 'Nouveau',
    tagline: 'Cap sur l\'aventure et les trésors des Sept Mers !',
    description: 'Débloque la tenue de Corsaire des Sept Mers, le grand tricorne brodé d\'or, le sabre d\'abordage et la moustache exclusive de flibustier.',
    rarity: 'épique',
    rewards: [
        { icon: 'bi-person-badge', label: 'Espèce : Humain' },
        { icon: 'bi-compass', label: 'Classe : Corsaire des Mers' },
        { icon: 'bi-scissors', label: 'Coupes exclusives : Marin d\'Abordage (G) / Capitaine (F)' },
        { icon: 'bi-slash-square', label: 'Arme : Sabre d\'abordage ouvragé' },
        { icon: 'bi-person-bounding-box', label: 'Tenue : Veste d\'officier, manteau dorsal & tricorne' },
        { icon: 'bi-palette', label: 'Teintes débloquées : Brun Corsaire, Bleu Lagon' }
    ],
    boyPreset: {
        id: 'pir_b',
        type: 'boy',
        styleKey: 'pirate_boy',
        styleId: 1,
        outfitKey: 'pirate_corsair',
        species: 'human',
        skinColor: 'sun-bronze',
        hairColor: '#3b2219',
        eyeColor: 'lagoon-blue'
    },
    girlPreset: {
        id: 'pir_g',
        type: 'girl',
        styleKey: 'pirate_girl',
        styleId: 1,
        outfitKey: 'pirate_corsair',
        species: 'human',
        skinColor: 'sun-bronze',
        hairColor: '#3b2219',
        eyeColor: 'lagoon-blue'
    }
};
