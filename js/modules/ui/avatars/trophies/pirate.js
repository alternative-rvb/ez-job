/**
 * Trophée 10 : Le Corsaire des Mers, Flibustier (pirate)
 * Module du trophée : tenue, coupes de cheveux, sabre d'abordage, tricorne et entrée du registre RPG_TROPHIES.
 */

import { fuseau, plume, gripHand, fitBand, hairBase, SKIN_DEFAULT } from '../../avatar-kit.js';
import { mixHex } from '../base.js';

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
            <!-- Cols relevés derrière la tête, comme le Vampire, descendus de 3 pour toucher la cape : manteau #091e36, revers intérieur de la couleur de la veste #1e3a5f -->
            <g transform="translate(0 3)">
            <path d="M 29,63 L 21,45 L 38,59 Z" fill="#091e36"/>
            <path d="M 71,63 L 79,45 L 62,59 Z" fill="#091e36"/>
            <path d="M 29.5,61.5 L 24,50 L 35,59 Z" fill="#1e3a5f"/>
            <path d="M 70.5,61.5 L 76,50 L 65,59 Z" fill="#1e3a5f"/>
            </g>
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
            <!-- Fond plein du chapeau : comble les trous entre la calotte et les ailes (le fond de la page ne doit jamais apparaître) -->
            <path d="M 3,-2 C 12,-12 28,-18 50,-18 C 72,-18 88,-12 97,-2 C 94,8 74,14 50,14 C 26,14 6,8 3,-2 Z" fill="#081426"/>
            <!-- Calotte haute du tricorne : dôme bombé qui dépasse les ailes (y = -27 à 12), deux teintes pour le volume -->
            <path d="M 23,12 C 21,-12 33,-27 50,-27 C 67,-27 79,-12 77,12 Z" fill="#071221"/>
            <path d="M 26,11 C 24,-9 35,-24 50,-24 C 65,-24 76,-9 74,11 Z" fill="#0f243f"/>
            <!-- Volume de la calotte : reflet clair sur le bombé, coutures de pliage vers la pointe avant, ombre à la jonction avec le rebord -->
            <path d="${fuseau('M 31,-6 C 33,-15 40,-22 50,-23', 2.6, 12)} ${fuseau('M 69,-6 C 67,-15 60,-22 50,-23', 2.6, 12)}" fill="#1e3a5f"/>
            <path d="${fuseau('M 50,-23 C 43,-14 42,-3 47,5', 1.0, 12)} ${fuseau('M 50,-23 C 57,-14 58,-3 53,5', 1.0, 12)}" fill="#1e3a5f"/>
            <path d="${fuseau('M 24,6 C 36,10 64,10 76,6', 3.2, 14)}" fill="#05101d"/>
            <!-- Ailes latérales du tricorne déployées très larges (largeur 94, de x=3 à x=97) -->
            <!-- Aile arrière/gauche évasée et relevée -->
            <path d="M 3,-2 C 12,-12 28,-18 50,-18 C 72,-18 88,-12 97,-2 C 86,5 72,0 50,0 C 28,0 14,5 3,-2 Z" fill="#081426"/>
            <!-- Grande aile gauche repliée vers le haut -->
            <path d="M 3,-2 C 1,6 10,14 50,14 C 34,14 18,6 16,-8 Z" fill="#0c2038"/>
            <path d="${fuseau('M 16,-8 C 5,-2 2,5 8,14', 2.0, 14)}" fill="#fbbf24"/>
            <!-- Grande aile droite repliée vers le haut -->
            <path d="M 97,-2 C 99,6 90,14 50,14 C 66,14 82,6 84,-8 Z" fill="#0c2038"/>
            <path d="${fuseau('M 84,-8 C 95,-2 98,5 92,14', 2.0, 14)}" fill="#fbbf24"/>
            <!-- Revers avant triangulaire relevé en tricorne avec pointe centrale majestueuse -->
            <path d="M 6,14 C 22,14 36,9 50,3 C 64,9 78,14 94,14 C 74,18 26,18 6,14 Z" fill="#0f243f"/>
            <!-- Galon doré prestigieux sur le grand rebord avant évasé -->
            <path d="${fuseau('M 6,14 C 22,14 36,9 50,3 C 64,9 78,14 94,14', 2.4, 20)}" fill="#fbbf24"/>
            <path d="${fuseau('M 9,14 C 25,13.8 37,9.5 50,3.8 C 63,9.5 75,13.8 91,14', 1.1, 18)}" fill="#fef08a"/>
            <!-- Médaillon d'or et joyau rubis au centre de la pointe avant -->
            <circle cx="50" cy="3.8" r="3.2" fill="#fbbf24"/>
            <circle cx="50" cy="3.8" r="1.8" fill="#dc2626"/>
            <circle cx="49.2" cy="3" r="0.7" fill="#fef08a"/>
            <!-- Grande plume écarlate de corsaire déployée depuis l'aile gauche -->
            <path d="${plume('M 36,5 C 25,-3 16,-9 4,-16', 5.2, 18)}" fill="#dc2626"/>
            <path d="${fuseau('M 34,4.5 C 24,-3 16,-9 4,-16', 1.2, 16)}" fill="#fef08a"/>
            <!-- Foulard / bandana carmin noué sous le tricorne façon Jack Sparrow (courbure souple et plis) -->
            <path d="${fuseau('M 21,21.5 Q 50,17 79,21.5', 4.8, 16)}" fill="#991b1b"/>
            <path d="${fuseau('M 22,22 Q 50,17.8 78,22', 1.4, 14)}" fill="#dc2626"/>
            <!-- Nœud et pans pendants du bandana sur la tempe gauche -->
            <path d="M 21,21 L 15,34 L 18.5,33 L 22,24 Z" fill="#7f1d1d"/>
            <path d="M 22,22 L 17.5,31 L 20.5,30.5 L 23,25 Z" fill="#dc2626"/>
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

// SECTION Coupes de cheveux exclusives du Pirate : locks en fuseau qui suivent les courbes de l'ellipse arrière
// ANCHOR Une lock : fuseau qui suit la courbe de l'ellipse et filet d'ombre fin
const pirateLock = (color, d, width) => `
    <path d="${fuseau(d, width, 16)}" fill="${color}"/>
    <path d="${fuseau(d, width * 0.2, 12)}" fill="${mixHex(color, '#000000', 0.32)}"/>
`;

export const PIRATE_STYLES = {
    pirate_boy: {
        id: 'pirate_boy',
        name: 'Locks de Corsaire (Jack Sparrow)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-pirate-boy">
                <!-- ANCHOR Base mi-long : ellipse qui descend jusqu'au cou -->
                ${hairBase('mi-long', color)}
                <!-- Locks en fuseau le long de la courbe de l'ellipse, deux par côté -->
                ${pirateLock(color, 'M 21,26 C 14,38 15,54 24,70', 6)}
                ${pirateLock(color, 'M 27,34 C 22,46 23,58 30,72', 5)}
                ${pirateLock(color, 'M 79,26 C 86,38 85,54 76,70', 6)}
                ${pirateLock(color, 'M 73,34 C 78,46 77,58 70,72', 5)}
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-pirate-boy">
                <!-- Mèches libres copiées telles quelles de la coupe de base 3 (garçon) -->
                <path d="M 21,28 C 23,16 36,8 50,4 C 64,4 76,10 80,22 C 82,26 81,30 79,31 C 77,26 76,23 74,21 C 75,26 75,32 72,35 C 69,28 67,25 65,21 C 66,27 66,35 63,38 C 60,29 58,25 56,21 C 56,26 56,33 53,35 C 50,28 47,25 44,21 C 44,26 42,30 38,30 C 32,28 26,28 21,28 Z" fill="${color}"/>
                <!-- Deux mèches plus longues sur les côtés qui encadrent le visage, en fuseau le long de sa courbe -->
                ${pirateLock(color, 'M 30,8 C 20,22 19,58 24,80', 6.5)}
                ${pirateLock(color, 'M 70,8 C 80,22 81,58 76,80', 6.5)}
            </g>`
    },
    pirate_girl: {
        id: 'pirate_girl',
        name: 'Capitaine aux Locks (Fille)',
        withTiara: false,
        getHairBack: (color) => `
            <g id="hair-back-pirate-girl">
                <!-- ANCHOR Base longue : ellipse qui descend jusqu'aux jambes -->
                ${hairBase('long', color)}
                <!-- Locks en fuseau le long de la courbe de l'ellipse, deux par côté -->
                ${pirateLock(color, 'M 22,26 C 13,44 13,68 20,92', 7)}
                ${pirateLock(color, 'M 28,34 C 21,52 21,72 27,94', 6)}
                ${pirateLock(color, 'M 78,26 C 87,44 87,68 80,92', 7)}
                ${pirateLock(color, 'M 72,34 C 79,52 79,72 73,94', 6)}
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-pirate-girl">
                <!-- Mèches libres copiées telles quelles de la coupe de base 3 (garçon), même frange pour la fille -->
                <path d="M 21,28 C 23,16 36,8 50,4 C 64,4 76,10 80,22 C 82,26 81,30 79,31 C 77,26 76,23 74,21 C 75,26 75,32 72,35 C 69,28 67,25 65,21 C 66,27 66,35 63,38 C 60,29 58,25 56,21 C 56,26 56,33 53,35 C 50,28 47,25 44,21 C 44,26 42,30 38,30 C 32,28 26,28 21,28 Z" fill="${color}"/>
                <!-- Deux mèches plus longues sur les côtés qui encadrent le visage, en fuseau le long de sa courbe, jusqu'aux épaules -->
                ${pirateLock(color, 'M 30,8 C 19,24 18,68 23,94', 7)}
                ${pirateLock(color, 'M 70,8 C 81,24 82,68 77,94', 7)}
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
