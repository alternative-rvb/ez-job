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
            <!-- Cols relevés derrière la tête, comme le Vampire : manteau #091e36, revers intérieur de la couleur de la veste #1e3a5f -->
            <!-- Haut de cape derrière le cou, comme le Vampire : relie les deux pans et les cols -->
            <path d="M 29,64 L 71,64 L 60,68 L 40,68 Z" fill="#091e36"/>
            <path d="M 29,63 L 21,45 L 38,59 Z" fill="#091e36"/>
            <path d="M 71,63 L 79,45 L 62,59 Z" fill="#091e36"/>
            <path d="M 29.5,61.5 L 24,50 L 35,59 Z" fill="#1e3a5f"/>
            <path d="M 70.5,61.5 L 76,50 L 65,59 Z" fill="#1e3a5f"/>
            <!-- Liseré or en fuseau le long des deux bords des cols (bord supérieur et bord extérieur visible) -->
            <path d="${fuseau('M 22,46 Q 29,50.5 37,58', 0.9, 10)} ${fuseau('M 78,46 Q 71,50.5 63,58', 0.9, 10)} ${fuseau('M 21.8,46.5 Q 24.2,56 29,62.6', 1.1, 12)} ${fuseau('M 78.2,46.5 Q 75.8,56 71,62.6', 1.1, 12)}" fill="#fbbf24"/>
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
            <!-- Chapeau descendu légèrement (4.5) ; le bandana reste en place -->
            <g id="pirate-hat" transform="translate(0 4.5)">
            <!-- Fond plein du chapeau : comble les trous entre la calotte et les ailes (le fond de la page ne doit jamais apparaître) -->
            <path d="M 3,-2 C 12,-12 28,-18 50,-18 C 72,-18 88,-12 97,-2 C 94,8 74,14 50,14 C 26,14 6,8 3,-2 Z" fill="#081426"/>
            <!-- Calotte du tricorne : un seul dôme bas et uni (y = -22 à 12), sans coutures ni reflets -->
            <path d="M 23,12 C 21,-8 33,-22 50,-22 C 67,-22 79,-8 77,12 Z" fill="#0b1b30"/>
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
            </g>
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
        getHairBack: (color) => {
            const darkColor = mixHex(color, '#000000', 0.32);
            return `
            <g id="hair-back-pirate-boy">
                <g transform="matrix(0.25,0,0,0.25,0,-34)">
                    <path d="M328 272 C328 344.902 270.692 404 200 404 C129.308 404 72 344.902 72 272 C72 199.098 129.308 140 200 140 C270.692 140 328 199.098 328 272 Z" fill="${color}"/>
                    <path d="M84 240 L77 248.16 L69.76 259.6 L64.48 269.32 L59.6 282.44 L56.56 293.48 L54.64 304.96 L53.96 316.8 L54.84 331.88 L56.88 344.04 L59.4 353.08 L63.64 365.12 L68.96 376.96 L75.28 388.6 L81.16 396.92 L89.08 408.08 L96 416 L96 416 L93.24 405.92 L89.52 393.12 L87.64 383.52 L85 371.36 L82.8 359.6 L81.04 348.2 L80.04 339.88 L78.68 329.12 L77.48 316 L76.8 305.72 L76.4 295.56 L76.32 285.44 L77.32 272.88 L78.4 262.72 L81.24 250.2 Z" fill="${color}"/>
                    <path d="M84 240 L76.4 253.68 L70.48 268.24 L66.28 283.64 L64.16 297.04 L63.32 313.64 L64.4 330.76 L66.72 345.28 L70.4 359.96 L75.36 374.72 L81.6 389.52 L87.6 401.28 L96 416 L96 416 L88.72 400.72 L83.8 388.56 L78.56 373.6 L74.4 358.88 L71.28 344.4 L69.16 330.2 L67.96 313.56 L68.28 297.4 L69.64 284.24 L72.76 268.92 L77.52 254.16 Z" fill="${darkColor}"/>
                    <path d="M108 272 L102.68 280.36 L97.96 288.96 L93.88 297.8 L90.16 309.36 L87.8 318.8 L86.32 328.48 L85.88 340.8 L86.52 350.8 L88.08 360.8 L90.6 370.76 L94.04 380.68 L98.36 390.52 L102.48 397.72 L108.16 407.36 L114.44 417 L120 424 L120 424 L118 415.36 L115.2 404.44 L112.92 393.88 L111.8 386.08 L110.08 376.24 L108.64 366.76 L107.44 357.56 L106.4 348.6 L105.48 339.84 L104.8 328.96 L104.36 320.24 L104.12 311.44 L104.68 300.28 L105.28 291.08 L106.36 281.64 Z" fill="${color}"/>
                    <path d="M108 272 L103.28 283.08 L98.84 296.56 L95.76 310.2 L94.16 321.72 L93.6 335.72 L94.44 349.92 L96.28 361.92 L99.72 376.48 L103.72 388.76 L108.68 401.2 L113.4 411.24 L120 424 L120 424 L114.36 410.8 L110.56 400.48 L106.4 387.88 L103.08 375.6 L100.08 361.2 L98.44 349.48 L97.48 335.64 L97.6 321.96 L98.56 310.6 L100.8 297.04 L104.24 283.4 Z" fill="${darkColor}"/>
                    <path d="M316 240 L318.76 250.2 L321.6 262.72 L322.68 272.88 L323.68 285.44 L323.6 295.56 L323.2 305.72 L322.52 316 L321.32 329.12 L319.96 339.88 L318.96 348.2 L317.2 359.6 L315 371.36 L312.36 383.52 L310.48 393.12 L306.76 405.92 L304 416 L304 416 L310.92 408.08 L318.84 396.92 L324.72 388.6 L331.04 376.96 L336.36 365.12 L340.6 353.08 L343.12 344.04 L345.16 331.88 L346.04 316.8 L345.36 304.96 L343.44 293.48 L340.4 282.44 L335.52 269.32 L330.24 259.6 L323 248.16 Z" fill="${color}"/>
                    <path d="M316 240 L322.48 254.16 L327.24 268.92 L330.36 284.24 L331.72 297.4 L332.04 313.56 L330.84 330.2 L328.72 344.4 L325.6 358.88 L321.44 373.6 L316.2 388.56 L311.28 400.72 L304 416 L304 416 L312.4 401.28 L318.4 389.52 L324.64 374.72 L329.6 359.96 L333.28 345.28 L335.6 330.76 L336.68 313.64 L335.84 297.04 L333.72 283.64 L329.52 268.24 L323.6 253.68 Z" fill="${darkColor}"/>
                    <path d="M292 272 L293.64 281.64 L294.72 291.08 L295.32 300.28 L295.88 311.44 L295.64 320.24 L295.2 328.96 L294.52 339.84 L293.6 348.6 L292.56 357.56 L291.36 366.76 L289.92 376.24 L288.2 386.08 L287.08 393.88 L284.8 404.44 L282 415.36 L280 424 L280 424 L285.56 417 L291.84 407.36 L297.52 397.72 L301.64 390.52 L305.96 380.68 L309.4 370.76 L311.92 360.8 L313.48 350.8 L314.12 340.8 L313.68 328.48 L312.2 318.8 L309.84 309.36 L306.12 297.8 L302.04 288.96 L297.32 280.36 Z" fill="${color}"/>
                    <path d="M292 272 L295.76 283.4 L299.2 297.04 L301.44 310.6 L302.4 321.96 L302.52 335.64 L301.56 349.48 L299.92 361.2 L296.92 375.6 L293.6 387.88 L289.44 400.48 L285.64 410.8 L280 424 L280 424 L286.6 411.24 L291.32 401.2 L296.28 388.76 L300.28 376.48 L303.72 361.92 L305.56 349.92 L306.4 335.72 L305.84 321.72 L304.24 310.2 L301.16 296.56 L296.72 283.08 Z" fill="${darkColor}"/>
                    <path d="M68.277 259.46 C68.277 185.752 127.251 126 200 126 C272.749 126 331.723 185.752 331.723 259.46 C331.723 333.168 272.749 392.92 200 392.92 C127.251 392.92 68.277 333.168 68.277 259.46 Z" fill="${color}"/>
                </g>
            </g>`;
        },
        getHairFront: (color) => {
            const darkColor = mixHex(color, '#000000', 0.32);
            return `
            <g id="hair-front-pirate-boy">
                <g transform="matrix(0.25,0,0,0.25,0,-34)">
                    <path d="M84 248 C92 200 144 168 200 152 C256 152 304 176 320 224 C328 240 324 256 316 260 C308 240 304 228 296 220 C300 240 300 264 288 276 C276 248 268 236 260 220 C264 244 264 276 252 288 C240 252 232 236 224 220 C224 240 224 268 212 276 C200 248 188 236 176 220 C176 240 168 256 152 256 C128 248 104 248 84 248 Z" fill="${color}"/>
                    <path d="M120 168 L109 181.52 L99.16 198.44 L90.68 218.16 L84.56 235.52 L79.6 254.12 L75.76 273.72 L73.52 288.88 L71.96 309.56 L71.64 325.24 L72.28 346.24 L74.04 367.04 L76.52 382.36 L80.16 402.28 L84.72 421.32 L90.04 439.32 L96 456 L96 456 L95.04 438.44 L94.56 419.96 L94.56 400.8 L94.84 381.12 L95.64 366.12 L96.32 345.96 L97.16 325.8 L97.92 310.8 L98.96 291 L99.64 276.4 L100.96 257.44 L102.6 239.24 L104.64 221.88 L108.52 201.84 L113.56 183.8 Z" fill="${color}"/>
                    <path d="M120 168 L107.52 189.08 L98.72 211.44 L91.76 237 L87.32 260.2 L84.2 284.72 L82.32 310.04 L81.76 335.8 L82.24 356.44 L83.84 381.88 L86.6 406.52 L90.36 430 L96 456 L96 456 L91.68 429.8 L89.16 406.24 L87.52 381.64 L86.72 356.32 L86.76 335.84 L87.52 310.28 L89.2 285.16 L91.8 260.84 L95.4 237.76 L101.24 212.2 L108.76 189.6 Z" fill="${darkColor}"/>
                    <path d="M280 168 L286.44 183.8 L291.48 201.84 L295.36 221.88 L297.4 239.24 L299.04 257.44 L300.36 276.4 L301.04 291 L302.08 310.8 L302.84 325.8 L303.68 345.96 L304.36 366.12 L305.16 381.12 L305.44 400.8 L305.44 419.96 L304.96 438.44 L304 456 L304 456 L309.96 439.32 L315.28 421.32 L319.84 402.28 L323.48 382.36 L325.96 367.04 L327.72 346.24 L328.36 325.24 L328.04 309.56 L326.48 288.88 L324.24 273.72 L320.4 254.12 L315.44 235.52 L309.32 218.16 L300.84 198.44 L291 181.52 Z" fill="${color}"/>
                    <path d="M280 168 L291.24 189.6 L298.76 212.2 L304.6 237.76 L308.2 260.84 L310.8 285.16 L312.48 310.28 L313.24 335.84 L313.28 356.32 L312.48 381.64 L310.84 406.24 L308.32 429.8 L304 456 L304 456 L309.64 430 L313.4 406.52 L316.16 381.88 L317.76 356.44 L318.24 335.8 L317.68 310.04 L315.8 284.72 L312.68 260.2 L308.24 237 L301.28 211.44 L292.48 189.08 Z" fill="${darkColor}"/>
                </g>
            </g>`;
        }
    },
    pirate_girl: {
        id: 'pirate_girl',
        name: 'Capitaine aux Locks (Fille)',
        withTiara: false,
        getHairBack: (color) => {
            const darkColor = mixHex(color, '#000000', 0.32);
            return `
            <g id="hair-back-pirate-girl">
                <g transform="matrix(0.25,0,0,0.25,0,-34)">
                    <path d="M332 340 C332 448.248 272.902 536 200 536 C127.098 536 68 448.248 68 340 C68 231.752 127.098 144 200 144 C272.902 144 332 231.752 332 340 Z" fill="${color}"/>
                    <path d="M68.277 259.46 C68.277 185.752 127.251 126 200 126 C272.749 126 331.723 185.752 331.723 259.46 C331.723 333.168 272.749 392.92 200 392.92 C127.251 392.92 68.277 333.168 68.277 259.46 Z" fill="${color}"/>
                    <path d="M88 240 L79.16 252.72 L69.84 270.04 L62.96 284.64 L57.08 299.96 L51.8 320.16 L48.52 336.84 L46.56 354 L45.92 371.48 L46.56 389.2 L48.48 407.04 L51.64 424.96 L55.24 438.32 L60.44 456.08 L66.6 473.72 L72.44 486.68 L80 504 L80 504 L77.72 485.32 L77.04 471.36 L75.72 453.16 L74.8 435.32 L74.76 422.12 L74.28 404.88 L74 388.04 L73.92 371.48 L74 355.2 L74.28 339.2 L74.84 323.44 L76.48 304.04 L77.96 288.68 L80 273.44 L84.2 254.84 Z" fill="${color}"/>
                    <path d="M88 240 L78.16 260.6 L70.16 282.48 L64.84 301.6 L60.36 325.48 L57.8 350.28 L57.12 371.48 L57.8 393.08 L59.8 415 L63.08 437.12 L67.6 459.36 L73.24 481.68 L80 504 L80 504 L74.64 481.32 L70.32 458.8 L67 436.52 L64.6 414.48 L63.2 392.8 L62.72 371.48 L63.2 350.56 L65.16 326.12 L68.72 302.4 L72.84 283.24 L79.48 261.12 Z" fill="${darkColor}"/>
                    <path d="M112 272 L104.84 284.84 L98.4 298.12 L91.88 315.4 L87.2 329.6 L83.44 344.16 L80.72 359.08 L79.04 374.28 L78.48 389.72 L78.96 405.32 L80.56 421.08 L83.16 436.84 L86.72 452.68 L91.2 468.52 L96.52 484.4 L101.52 496.16 L108 512 L108 512 L106.04 495.04 L105.48 482.44 L104.32 466.12 L103.52 450.2 L103 434.64 L102.68 419.4 L102.52 404.44 L102.48 389.8 L102.56 375.32 L102.8 361 L103.24 346.76 L103.88 332.52 L104.88 318.32 L107.24 300.64 L109.28 286.32 Z" fill="${color}"/>
                    <path d="M112 272 L104.28 292.28 L98.84 309.56 L93.88 330.76 L90.84 348.84 L88.68 370.96 L88.08 389.76 L88.8 412.68 L90.6 432.04 L93.44 451.68 L97.36 471.56 L102.2 491.68 L108 512 L108 512 L103.44 491.4 L99.72 471.12 L96.8 451.2 L94.72 431.64 L93.4 412.4 L92.88 389.76 L93.32 371.2 L94.96 349.32 L97.2 331.36 L101.2 310.12 L105.44 292.64 Z" fill="${darkColor}"/>
                    <path d="M312 240 L315.8 254.84 L320 273.44 L322.04 288.68 L323.52 304.04 L325.16 323.44 L325.72 339.2 L326 355.2 L326.08 371.48 L326 388.04 L325.72 404.88 L325.24 422.12 L325.2 435.32 L324.28 453.16 L322.96 471.36 L322.28 485.32 L320 504 L320 504 L327.56 486.68 L333.4 473.72 L339.56 456.08 L344.76 438.32 L348.36 424.96 L351.52 407.04 L353.44 389.2 L354.08 371.48 L353.44 354 L351.48 336.84 L348.2 320.16 L342.92 299.96 L337.04 284.64 L330.16 270.04 L320.84 252.72 Z" fill="${color}"/>
                    <path d="M312 240 L320.52 261.12 L327.16 283.24 L331.28 302.4 L334.84 326.12 L336.8 350.56 L337.28 371.48 L336.8 392.8 L335.4 414.48 L333 436.52 L329.68 458.8 L325.36 481.32 L320 504 L320 504 L326.76 481.68 L332.4 459.36 L336.92 437.12 L340.2 415 L342.2 393.08 L342.88 371.48 L342.2 350.28 L339.64 325.48 L335.16 301.6 L329.84 282.48 L321.84 260.6 Z" fill="${darkColor}"/>
                    <path d="M288 272 L290.72 286.32 L292.76 300.64 L295.12 318.32 L296.12 332.52 L296.76 346.76 L297.2 361 L297.44 375.32 L297.52 389.8 L297.48 404.44 L297.32 419.4 L297 434.64 L296.48 450.2 L295.68 466.12 L294.52 482.44 L293.96 495.04 L292 512 L292 512 L298.48 496.16 L303.48 484.4 L308.8 468.52 L313.28 452.68 L316.84 436.84 L319.44 421.08 L321.04 405.32 L321.52 389.72 L320.96 374.28 L319.28 359.08 L316.56 344.16 L312.8 329.6 L308.12 315.4 L301.6 298.12 L295.16 284.84 Z" fill="${color}"/>
                    <path d="M288 272 L294.56 292.64 L298.8 310.12 L302.8 331.36 L305.04 349.32 L306.68 371.2 L307.12 389.76 L306.6 412.4 L305.28 431.64 L303.2 451.2 L300.28 471.12 L296.56 491.4 L292 512 L292 512 L297.8 491.68 L302.64 471.56 L306.56 451.68 L309.4 432.04 L311.2 412.68 L311.92 389.76 L311.32 370.96 L309.16 348.84 L306.12 330.76 L301.16 309.56 L295.72 292.28 Z" fill="${darkColor}"/>
                </g>
            </g>`;
        },
        getHairFront: (color) => {
            const darkColor = mixHex(color, '#000000', 0.32);
            return `
            <g id="hair-front-pirate-girl">
                <g transform="matrix(0.25,0,0,0.25,0,-34)">
                    <path d="M84 248 C92 200 144 168 200 152 C256 152 304 176 320 224 C328 240 324 256 316 260 C308 240 304 228 296 220 C300 240 300 264 288 276 C276 248 268 236 260 220 C264 244 264 276 252 288 C240 252 232 236 224 220 C224 240 224 268 212 276 C200 248 188 236 176 220 C176 240 168 256 152 256 C128 248 104 248 84 248 Z" fill="${color}"/>
                    <path d="M120 168 L106.16 187.72 L97.16 203.8 L87.88 227.24 L81.24 247.96 L75.8 270.2 L71.6 293.64 L69.16 311.8 L67.36 336.6 L66.84 361.72 L67.56 380.6 L69.32 405.52 L71.88 423.92 L75.64 447.76 L80.32 470.6 L85.84 492.12 L92 512 L92 512 L91.24 491.28 L90.96 469.36 L91.12 446.48 L91.64 422.84 L92.6 404.76 L93.4 380.44 L94.32 362.16 L95.32 337.88 L96.52 313.96 L97.32 296.32 L98.84 273.52 L100.68 251.64 L103 230.96 L107.32 207.2 L111.16 189.92 Z" fill="${color}"/>
                    <path d="M120 168 L106.32 192.52 L96.64 218.96 L89.04 249.44 L84.12 277.24 L80.64 306.64 L78.56 337.12 L77.8 368.12 L78.2 392.92 L79.76 423.48 L82.52 453.04 L86.32 481.08 L92 512 L92 512 L87.72 480.92 L85.28 452.8 L83.72 423.28 L83.04 392.84 L83.2 368.16 L84.16 337.36 L86.04 307.12 L88.92 277.88 L92.92 250.16 L99.36 219.68 L107.64 193.04 Z" fill="${darkColor}"/>
                    <path d="M280 168 L288.84 189.92 L292.68 207.2 L297 230.96 L299.32 251.64 L301.16 273.52 L302.68 296.32 L303.48 313.96 L304.68 337.88 L305.68 362.16 L306.6 380.44 L307.4 404.76 L308.36 422.84 L308.88 446.48 L309.04 469.36 L308.76 491.28 L308 512 L308 512 L314.16 492.12 L319.68 470.6 L324.36 447.76 L328.12 423.92 L330.68 405.52 L332.44 380.6 L333.16 361.72 L332.64 336.6 L330.84 311.8 L328.4 293.64 L324.2 270.2 L318.76 247.96 L312.12 227.24 L302.84 203.8 L293.84 187.72 Z" fill="${color}"/>
                    <path d="M280 168 L292.36 193.04 L300.64 219.68 L307.08 250.16 L311.08 277.88 L313.96 307.12 L315.84 337.36 L316.8 368.16 L316.96 392.84 L316.28 423.28 L314.72 452.8 L312.28 480.92 L308 512 L308 512 L313.68 481.08 L317.48 453.04 L320.24 423.48 L321.8 392.92 L322.2 368.12 L321.44 337.12 L319.36 306.64 L315.88 277.24 L310.96 249.44 L303.36 218.96 L293.68 192.52 Z" fill="${darkColor}"/>
                </g>
            </g>`;
        }
    }
};

// SECTION Fiche Trophée RPG 10 : Pirate
export const PIRATE_TROPHY = {
    id: 'pirate',
    shortId: 'pirate',
    legacyId: 'trophy_pirate_corsair',
    number: 10,
    title: 'Le Corsaire des Mers',
    species: 'pirate',
    speciesName: 'Corsaire',
    className: 'Corsaire',
    badge: 'Nouveau',
    tagline: 'Cap sur l\'aventure et les trésors des Sept Mers !',
    description: 'Débloque la tenue de Corsaire des Sept Mers, le grand tricorne brodé d\'or, le sabre d\'abordage et la moustache exclusive de flibustier.',
    rarity: 'épique',
    unlocks: {
        species: 'pirate',
        skins: [],
        hairs: ['#3b2219'],
        eyes: ['lagoon-blue'],
        styles: { boy: 'pirate_boy', girl: 'pirate_girl' },
        outfit: 'pirate_corsair',
        label: 'Corsaire des Mers'
    },
    rewards: [
        { icon: 'bi-person-badge', label: 'Espèce : Corsaire' },
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
        species: 'pirate',
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
        species: 'pirate',
        skinColor: 'sun-bronze',
        hairColor: '#3b2219',
        eyeColor: 'lagoon-blue'
    }
};
