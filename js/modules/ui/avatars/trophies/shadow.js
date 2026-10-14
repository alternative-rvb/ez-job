/**
 * Trophée 5 : Mage Noir et Sorcière des Ombres (shadow)
 * Module du trophée : tenue, coupes de cheveux et entrée du registre RPG_TROPHIES.
 */

import { fuseau, plume, SKIN_DEFAULT } from '../../avatar-kit.js';

// ANCHOR Bottine lacée : axe cx, s = -1 (gauche, pointe vers l'extérieur gauche) ou 1 (droite) ; revers pourpre, lacets croisés et semelle en fuseau
const shadowBoot = (cx, s) => {
    const x = (o) => Math.round((cx + s * o) * 100) / 100;
    return `
            <path d="M ${x(3.5)},98 L ${x(-3.5)},98 L ${x(-3.5)},109 C ${x(-4.5)},110 ${x(-4.7)},112 ${x(-3.7)},113 L ${x(4)},113 C ${x(6)},113 ${x(6)},111 ${x(4.5)},110.5 C ${x(3.5)},110 ${x(3.5)},108 ${x(3.5)},106 Z" fill="#1a1030"/>
            <!-- Revers pourpre en haut de la tige -->
            <path d="${fuseau(`M ${x(-3.6)},99.2 Q ${x(0)},100.4 ${x(3.6)},99.2`, 3.2, 12)}" fill="#581c87"/>
            <!-- Rails et lacets croisés en fuseau, sur le devant de la tige -->
            <path d="${fuseau(`M ${x(-1.3)},101.6 Q ${x(-1.5)},105 ${x(-1.3)},109`, 0.8, 10)} ${fuseau(`M ${x(1.3)},101.6 Q ${x(1.5)},105 ${x(1.3)},109`, 0.8, 10)}" fill="#3b0764"/>
            <path d="${fuseau(`M ${x(-1.3)},102.6 Q ${x(0)},103.1 ${x(1.3)},104.4`, 0.8, 8)} ${fuseau(`M ${x(1.3)},102.6 Q ${x(0)},103.1 ${x(-1.3)},104.4`, 0.8, 8)} ${fuseau(`M ${x(-1.3)},105.6 Q ${x(0)},106.1 ${x(1.3)},107.4`, 0.8, 8)} ${fuseau(`M ${x(1.3)},105.6 Q ${x(0)},106.1 ${x(-1.3)},107.4`, 0.8, 8)}" fill="#cbd5e1"/>
            <!-- Semelle en fuseau -->
            <path d="${fuseau(`M ${x(-3.8)},112.6 Q ${x(0.4)},113.8 ${x(5.4)},112.4`, 1.4, 12)}" fill="#334155"/>`;
};

// ANCHOR Cornes en S du Mage Noir / Sorcière (espèce shadow) : double courbure sinueuse, tracé plume à base épaisse
export function getShadowHorns() {
    return `
        <g id="shadow-horns">
            <!-- NOTE Cornes en S tracées en plume : base épaisse plantée dans le crâne, effilement continu jusqu'à une pointe d'aiguille -->
            <!-- Corne gauche -->
            <circle cx="25" cy="16.5" r="5.5" fill="#130e24" stroke="#090514" stroke-width="0.8"/>
            <path d="M 29.01,12.73 L 28.13,11.97 L 26.88,10.83 L 26.03,10.13 L 25.19,9.46 L 23.99,8.45 L 23.18,7.82 L 22.04,6.89 L 21.27,6.31 L 20.19,5.44 L 19.48,4.9 L 18.48,4.09 L 17.54,3.3 L 16.66,2.55 L 15.84,1.81 L 15.09,1.11 L 14.41,0.42 L 13.64,-0.48 L 13.13,-1.11 L 12.58,-1.95 L 12.16,-2.77 L 11.89,-3.38 L 11.66,-4.23 L 11.53,-5.19 L 11.5,-6.13 L 11.56,-7.05 L 11.72,-7.97 L 11.97,-8.87 L 12.3,-9.77 L 12.72,-10.65 L 13.38,-11.72 L 13.96,-12.56 L 14.62,-13.37 L 15.32,-14.14 L 16.07,-14.88 L 17.07,-15.73 L 17.89,-16.37 L 18.93,-17.08 L 19.84,-17.7 L 21.09,-18.67 L 21.93,-19.56 L 22.74,-20.67 L 23.41,-22.02 L 23.74,-23.22 L 23.92,-24.62 L 23.87,-25.84 L 23.7,-27.05 L 23.41,-28.27 L 23,-29.5 L 23,-29.5 L 23.07,-28.22 L 23.07,-27 L 22.97,-25.85 L 22.75,-24.78 L 22.37,-23.64 L 21.89,-22.76 L 21.18,-21.83 L 20.4,-21.13 L 19.61,-20.61 L 18.51,-20.02 L 17.6,-19.68 L 16.28,-19.09 L 15.22,-18.57 L 13.9,-17.79 L 12.85,-17.11 L 11.82,-16.35 L 10.82,-15.52 L 9.87,-14.61 L 8.77,-13.34 L 7.95,-12.24 L 7.22,-11.05 L 6.58,-9.77 L 6.05,-8.4 L 5.66,-6.93 L 5.42,-5.39 L 5.34,-3.77 L 5.47,-2.04 L 5.69,-0.77 L 6.19,0.87 L 6.86,2.44 L 7.43,3.58 L 8.33,5.04 L 9.05,6.12 L 9.83,7.19 L 10.65,8.23 L 11.5,9.27 L 12.39,10.31 L 13.31,11.34 L 13.92,12.06 L 14.87,13.11 L 15.5,13.84 L 16.48,14.91 L 17.11,15.66 L 18.1,16.75 L 18.74,17.52 L 19.38,18.3 L 20.37,19.46 L 20.99,20.27 Q 30.28,22.11 29.01,12.73 Z" fill="#130e24" stroke="#090514" stroke-width="0.8" stroke-linejoin="round"/>
            <circle cx="25" cy="16.5" r="5.1" fill="#130e24"/>
            <path d="${plume('M 25.2,15.5 C 21.3,11.35 16.78,7.79 13.23,3.32 C 9.33,-0.99 9.2,-7.9 12.99,-12.31 C 16.08,-16.68 24.06,-18.19 22.4,-25', 5.4, 16)}" fill="#7c3aed" opacity="0.6"/>
            <path d="${plume('M 23.5,13 C 19.56,9.02 14.75,5.51 12.52,0.21 C 10.31,-5.2 13.41,-11.33 18,-14.4', 1.3, 16)}" fill="#c084fc"/>
            <!-- Corne droite (miroir) -->
            <circle cx="75" cy="16.5" r="5.5" fill="#130e24" stroke="#090514" stroke-width="0.8"/>
            <path d="M 70.99,12.73 L 71.87,11.97 L 73.12,10.83 L 73.97,10.13 L 74.81,9.46 L 76.01,8.45 L 76.82,7.82 L 77.96,6.89 L 78.73,6.31 L 79.81,5.44 L 80.52,4.9 L 81.52,4.09 L 82.46,3.3 L 83.34,2.55 L 84.16,1.81 L 84.91,1.11 L 85.59,0.42 L 86.36,-0.48 L 86.87,-1.11 L 87.42,-1.95 L 87.84,-2.77 L 88.11,-3.38 L 88.34,-4.23 L 88.47,-5.19 L 88.5,-6.13 L 88.44,-7.05 L 88.28,-7.97 L 88.03,-8.87 L 87.7,-9.77 L 87.28,-10.65 L 86.62,-11.72 L 86.04,-12.56 L 85.38,-13.37 L 84.68,-14.14 L 83.93,-14.88 L 82.93,-15.73 L 82.11,-16.37 L 81.07,-17.08 L 80.16,-17.7 L 78.91,-18.67 L 78.07,-19.56 L 77.26,-20.67 L 76.59,-22.02 L 76.26,-23.22 L 76.08,-24.62 L 76.13,-25.84 L 76.3,-27.05 L 76.59,-28.27 L 77,-29.5 L 77,-29.5 L 76.93,-28.22 L 76.93,-27 L 77.03,-25.85 L 77.25,-24.78 L 77.63,-23.64 L 78.11,-22.76 L 78.82,-21.83 L 79.6,-21.13 L 80.39,-20.61 L 81.49,-20.02 L 82.4,-19.68 L 83.72,-19.09 L 84.78,-18.57 L 86.1,-17.79 L 87.15,-17.11 L 88.18,-16.35 L 89.18,-15.52 L 90.13,-14.61 L 91.23,-13.34 L 92.05,-12.24 L 92.78,-11.05 L 93.42,-9.77 L 93.95,-8.4 L 94.34,-6.93 L 94.58,-5.39 L 94.66,-3.77 L 94.53,-2.04 L 94.31,-0.77 L 93.81,0.87 L 93.14,2.44 L 92.57,3.58 L 91.67,5.04 L 90.95,6.12 L 90.17,7.19 L 89.35,8.23 L 88.5,9.27 L 87.61,10.31 L 86.69,11.34 L 86.08,12.06 L 85.13,13.11 L 84.5,13.84 L 83.52,14.91 L 82.89,15.66 L 81.9,16.75 L 81.26,17.52 L 80.62,18.3 L 79.63,19.46 L 79.01,20.27 Q 69.72,22.11 70.99,12.73 Z" fill="#130e24" stroke="#090514" stroke-width="0.8" stroke-linejoin="round"/>
            <circle cx="75" cy="16.5" r="5.1" fill="#130e24"/>
            <path d="M 72.85,13.63 L 73.58,12.95 L 74.31,12.29 L 75.38,11.3 L 76.09,10.68 L 76.8,10.07 L 77.83,9.16 L 78.51,8.58 L 79.18,8.01 L 80.14,7.16 L 80.78,6.62 L 81.68,5.8 L 82.54,5 L 83.1,4.48 L 83.88,3.7 L 84.61,2.94 L 85.29,2.18 L 85.9,1.43 L 86.45,0.68 L 86.94,-0.06 L 87.36,-0.81 L 87.8,-1.81 L 88.06,-2.57 L 88.25,-3.35 L 88.38,-4.4 L 88.4,-5.39 L 88.37,-6.12 L 88.23,-7.08 L 88,-8.02 L 87.7,-8.93 L 87.32,-9.82 L 86.87,-10.68 L 86.22,-11.7 L 85.64,-12.48 L 85.02,-13.23 L 84.36,-13.93 L 83.67,-14.59 L 82.77,-15.33 L 82.04,-15.88 L 81.12,-16.47 L 80.31,-17.04 L 79.36,-17.87 L 78.61,-18.76 L 78.06,-19.69 L 77.68,-20.65 L 77.43,-21.77 L 77.35,-22.89 L 77.42,-23.88 L 77.6,-25 L 77.6,-25 L 77.58,-23.87 L 77.66,-22.91 L 77.87,-21.86 L 78.22,-20.86 L 78.67,-20.04 L 79.26,-19.28 L 80,-18.58 L 80.91,-17.93 L 81.68,-17.53 L 82.73,-17 L 83.59,-16.51 L 84.64,-15.8 L 85.47,-15.18 L 86.28,-14.49 L 87.07,-13.74 L 87.81,-12.93 L 88.66,-11.83 L 89.28,-10.89 L 89.84,-9.89 L 90.32,-8.83 L 90.71,-7.71 L 91.01,-6.53 L 91.17,-5.62 L 91.27,-4.36 L 91.23,-2.98 L 91.1,-1.9 L 90.87,-0.84 L 90.4,0.54 L 89.97,1.54 L 89.47,2.53 L 88.9,3.5 L 88.26,4.46 L 87.58,5.4 L 86.84,6.33 L 86.07,7.26 L 85.54,7.89 L 84.7,8.82 L 83.83,9.75 L 83.25,10.39 L 82.34,11.33 L 81.74,11.97 L 81.13,12.63 L 80.19,13.6 L 79.57,14.27 L 78.94,14.94 L 77.99,15.96 L 77.37,16.66 L 76.75,17.37 Q 72.18,18.23 72.85,13.63 Z" fill="#7c3aed" opacity="0.6"/>
            <path d="M 76.05,12.53 L 76.9,11.74 L 77.47,11.22 L 78.3,10.46 L 79.11,9.72 L 79.91,8.99 L 80.68,8.27 L 81.42,7.56 L 82.14,6.86 L 83.05,5.93 L 83.69,5.24 L 84.3,4.56 L 85.05,3.63 L 85.57,2.94 L 86.18,2.01 L 86.72,1.05 L 87.16,0.08 L 87.51,-0.92 L 87.72,-1.69 L 87.89,-2.75 L 87.93,-3.92 L 87.88,-4.8 L 87.73,-5.87 L 87.47,-6.91 L 87.13,-7.9 L 86.71,-8.86 L 86.22,-9.78 L 85.66,-10.65 L 85.04,-11.48 L 84.38,-12.26 L 83.67,-12.98 L 82.77,-13.79 L 82,-14.4 L 82,-14.4 L 82.81,-13.83 L 83.74,-13.06 L 84.49,-12.36 L 85.2,-11.61 L 85.86,-10.79 L 86.46,-9.93 L 87.01,-9.01 L 87.48,-8.05 L 87.87,-7.03 L 88.17,-5.97 L 88.38,-4.86 L 88.47,-3.94 L 88.47,-2.69 L 88.32,-1.56 L 88.15,-0.74 L 87.81,0.33 L 87.38,1.38 L 86.85,2.4 L 86.24,3.4 L 85.73,4.14 L 84.99,5.12 L 84.39,5.85 L 83.76,6.59 L 82.86,7.56 L 82.16,8.3 L 81.43,9.04 L 80.68,9.79 L 79.91,10.55 L 79.12,11.33 L 78.31,12.11 L 77.77,12.65 L 76.95,13.47 Q 75.85,13.63 76.05,12.53 Z" fill="#c084fc"/>
        </g>
    `;
}

// Tenue Trophée 5 : Mage Noir & Sorcière des Ombres
export const OUTFIT_SHADOW_MAGE = {
    id: 'shadow_mage',
    name: 'Robe de Sorcière & Cape des Ombres',
    backEquipment: `
        <g id="outfit-shadow-cape">
            <!-- Cape pourpre nuit d'ébène (#1b122c, nettement plus foncée que la robe) -->
            <path d="M 31,64 
                     C 20,78 14,94 11,109 
                     C 22,107 30,108 38,109 
                     C 42,98 46,88 48,80 
                     C 42,75 35,70 31,64 Z" 
                  fill="#1b122c" stroke="#0a0512" stroke-width="0.8"/>
            <path d="M 69,64 
                     C 80,78 86,94 89,109 
                     C 78,107 70,108 62,109 
                     C 58,98 54,88 52,80 
                     C 58,75 65,70 69,64 Z" 
                  fill="#1b122c" stroke="#0a0512" stroke-width="0.8"/>
            <path d="M 36,78 C 34,92 32,106 36,110 C 45,109 55,109 64,110 C 68,106 66,92 64,78 Z" 
                  fill="#120b1f"/>
            <!-- Liseré sur l'ourlet de la cape -->
            <path d="M 31,64 C 20,78 14,94 11,109" stroke="#9333ea" stroke-width="1.1" stroke-linecap="round" fill="none"/>
            <path d="M 69,64 C 80,78 86,94 89,109" stroke="#9333ea" stroke-width="1.1" stroke-linecap="round" fill="none"/>
            <!-- Cols relevés de sorcière -->
            <path d="M 28,62 L 23,53 L 34,59 Z" fill="#2e1065" stroke="#120b1f" stroke-width="0.6"/>
            <path d="M 72,62 L 77,53 L 66,59 Z" fill="#2e1065" stroke="#120b1f" stroke-width="0.6"/>
        </g>`,
    legs: (skin = SKIN_DEFAULT) => `
        <g id="outfit-shadow-legs">
            <rect x="42.5" y="86" width="4.5" height="18" rx="2" fill="#24143d"/>
            <rect x="53" y="86" width="4.5" height="18" rx="2" fill="#24143d"/>
            ${shadowBoot(44.5, -1)}
            ${shadowBoot(55.5, 1)}
        </g>`,
    body: (skin = SKIN_DEFAULT) => `
        <g id="outfit-shadow-body">
            <!-- Haut / Buste en velours pourpre (#581c87) -->
            <path d="M 35,63 C 35,60 41,58 50,58 C 59,58 65,60 65,63 L 63.5,82 L 36.5,82 Z" fill="#581c87" stroke="#2e1065" stroke-width="0.7"/>
            <!-- Décolleté délicat -->
            <path d="M 44,58 Q 50,65 56,58 Z" fill="${skin.base}"/>
            <!-- Ras-du-cou avec pendentif améthyste -->
            <path d="M 45,59 Q 50,62 55,59" stroke="#0f172a" stroke-width="1.1" fill="none"/>
            <circle cx="50" cy="62" r="1.3" fill="#c084fc" stroke="#3b0764" stroke-width="0.5"/>
            
            <!-- Corset / Laçage croisé : rails et croisillons en fuseau -->
            <path d="${fuseau('M 46,65 Q 45.4,71.5 46,78', 1, 12)} ${fuseau('M 54,65 Q 54.6,71.5 54,78', 1, 12)}" fill="#3b0764"/>
            <path d="${fuseau('M 46,67 Q 50,68.6 54,71', 1.1, 10)} ${fuseau('M 54,67 Q 50,68.6 46,71', 1.1, 10)} ${fuseau('M 46,72 Q 50,73.6 54,76', 1.1, 10)} ${fuseau('M 54,72 Q 50,73.6 46,76', 1.1, 10)}" fill="#c084fc"/>

            <!-- Jupe de sorcière évasée festonnée -->
            <path d="M 36.5,82 
                     C 32,86 28,92 31,98 
                     L 38,94 
                     L 44,99 
                     L 50,93 
                     L 56,99 
                     L 62,94 
                     L 69,98 
                     C 72,92 68,86 63.5,82 Z" 
                  fill="#4c1d95" stroke="#1e1b4b" stroke-width="0.8"/>
            <path d="M 31,98 L 38,94 L 36,96 Z" fill="#7c3aed"/>
            <path d="M 44,99 L 50,93 L 48,96 Z" fill="#7c3aed"/>
            <path d="M 56,99 L 62,94 L 60,96 Z" fill="#7c3aed"/>
            <path d="M 31,98 L 38,94 L 44,99 L 50,93 L 56,99 L 62,94 L 69,98" 
                  stroke="#cbd5e1" stroke-width="0.8" fill="none" stroke-linejoin="round"/>
        </g>`,
    belt: `
        <g id="outfit-shadow-belt">
            <path d="M 36,79 Q 50,82 64,79 L 64,83 Q 50,86 36,83 Z" fill="#0f172a"/>
            <rect x="47" y="79" width="6" height="5" rx="1.2" fill="#334155" stroke="#cbd5e1" stroke-width="0.6"/>
            <path d="M 49,80.2 C 48.5,81.5 48.5,82.5 49,83.8 C 50.5,83.5 50.5,80.5 49,80.2 Z" fill="#f8fafc"/>
            <!-- Fiole de potion magique luminescente à la taille -->
            <g transform="translate(62, 82)">
                <rect x="-1" y="-2" width="2" height="1.5" rx="0.3" fill="#b45309"/>
                <circle cx="0" cy="2" r="2.8" fill="#a855f7" stroke="#3b0764" stroke-width="0.5"/>
                <circle cx="0" cy="2" r="2" fill="#c084fc"/>
                <circle cx="-0.8" cy="1.2" r="0.7" fill="#ffffff" opacity="0.8"/>
            </g>
        </g>`,
    arms: (skin = SKIN_DEFAULT) => `
        <g id="outfit-shadow-arms">
            <!-- NOTE Manches pagode : tube qui s'évase de l'épaule au poignet, revers doublé violet sombre, la main sort du revers -->
            <path d="M 34,62 C 28,63.5 24,66.5 21.6,71.2 Q 23.5,79 31.4,78.8 C 33,75 35,71 36,67 C 36.5,65 35.5,63 34,62 Z" fill="#581c87" stroke="#2e1065" stroke-width="0.7" stroke-linejoin="round"/>
            <path d="M 21.6,71.2 Q 27.7,73.4 31.4,78.8 Q 23.5,79 21.6,71.2 Z" fill="#2e1065"/>
            <path d="M 31,65 C 29,67.5 27.5,69.5 26,72" stroke="#3b0764" stroke-width="0.7" stroke-linecap="round" fill="none"/>
            <path d="M 21.6,71.2 Q 23.5,79 31.4,78.8" stroke="#a855f7" stroke-width="1" stroke-linecap="round" fill="none"/>

            <path d="M 66,62 C 72,63.5 76,66.5 78.4,71.2 Q 76.5,79 68.6,78.8 C 67,75 65,71 64,67 C 63.5,65 64.5,63 66,62 Z" fill="#581c87" stroke="#2e1065" stroke-width="0.7" stroke-linejoin="round"/>
            <path d="M 78.4,71.2 Q 72.3,73.4 68.6,78.8 Q 76.5,79 78.4,71.2 Z" fill="#2e1065"/>
            <path d="M 69,65 C 71,67.5 72.5,69.5 74,72" stroke="#3b0764" stroke-width="0.7" stroke-linecap="round" fill="none"/>
            <path d="M 78.4,71.2 Q 76.5,79 68.6,78.8" stroke="#a855f7" stroke-width="1" stroke-linecap="round" fill="none"/>

            <!-- Main droite ouverte, sortant du revers (symétrique de la main gauche qui tient le sceptre) -->
            <ellipse cx="77.5" cy="80" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
            <path d="M 76,78.8 Q 77.5,79.4 79,78.8" stroke="${skin.shadow}" stroke-width="0.7" fill="none"/>
            <path d="M 76,81.2 Q 77.5,81.8 79,81.2" stroke="${skin.shadow}" stroke-width="0.7" fill="none"/>
        </g>`,
    headAccessory: `
        <g id="outfit-shadow-crown">
            <!-- Diadème d'arcanes : bandeau d'argent en fuseau, pointes en plume, croissant de lune sertissant une améthyste -->
            <path d="${fuseau('M 29,23 C 42.63,19.02 57.37,19.02 71,23', 3, 16)}" fill="#94a3b8"/>
            <path d="M 31,21.6 Q 50,15.8 69,21.6" stroke="#f1f5f9" stroke-width="0.5" fill="none" stroke-linecap="round" opacity="0.85"/>
            <path d="${plume('M 41,19.6 C 40.15,16.37 37.71,13.54 34.5,12.5', 2.41)}" fill="#cbd5e1"/>
            <path d="M 57.84,19.28 L 58.22,18.4 L 58.64,17.58 L 59.12,16.82 L 59.64,16.11 L 60.21,15.46 L 60.92,14.76 L 61.56,14.24 L 62.35,13.7 L 63.04,13.32 L 63.89,12.94 L 64.62,12.7 L 65.5,12.5 L 65.5,12.5 L 64.72,12.94 L 64.12,13.36 L 63.42,13.89 L 62.9,14.4 L 62.31,15.04 L 61.87,15.62 L 61.39,16.35 L 61.05,17.01 L 60.75,17.69 L 60.51,18.41 L 60.31,19.15 L 60.16,19.92 Q 58.55,21.22 57.84,19.28 Z" fill="#cbd5e1"/>
            <path d="${plume('M 46,18.4 C 45.63,14.3 44.53,9.98 41.5,7', 2.21)}" fill="#cbd5e1"/>
            <path d="M 52.9,18.3 L 53.1,17.29 L 53.35,16.08 L 53.59,15.18 L 53.92,14.1 L 54.28,13.08 L 54.67,12.13 L 55.18,11.07 L 55.66,10.26 L 56.27,9.35 L 56.92,8.53 L 57.73,7.65 L 58.5,7 L 58.5,7 L 57.91,7.81 L 57.28,8.78 L 56.81,9.68 L 56.39,10.62 L 56.1,11.47 L 55.79,12.52 L 55.58,13.46 L 55.4,14.45 L 55.26,15.5 L 55.19,16.38 L 55.12,17.53 L 55.1,18.5 Q 53.86,19.93 52.9,18.3 Z" fill="#cbd5e1"/>
            <path d="${plume('M 29.5,22.8 C 27.29,23.73 25.69,26.06 26,28.5', 1.6, 10)}" fill="#cbd5e1"/>
            <path d="M 70.85,22.08 L 71.54,22.53 L 72.16,23.03 L 72.69,23.57 L 73.14,24.14 L 73.57,24.84 L 73.88,25.58 L 74.07,26.34 L 74.14,27.01 L 74.12,27.81 L 74,28.5 L 74,28.5 L 73.92,27.81 L 73.76,27.07 L 73.55,26.49 L 73.24,25.86 L 72.85,25.3 L 72.38,24.8 L 71.9,24.42 L 71.38,24.08 L 70.8,23.78 L 70.15,23.52 Q 69.49,22.32 70.85,22.08 Z" fill="#cbd5e1"/>
            <!-- Petites gemmes des pointes -->
            <circle cx="41.5" cy="19.4" r="1" fill="#a855f7" stroke="#3b0764" stroke-width="0.4"/>
            <circle cx="58.5" cy="19.4" r="1" fill="#a855f7" stroke="#3b0764" stroke-width="0.4"/>
            <!-- Croissant de lune central, cornes vers le haut -->
            <path d="M 43.5,12 C 44,17.8 47,20.6 50,20.6 C 53,20.6 56,17.8 56.5,12 C 54.8,15.6 52.6,17 50,17 C 47.4,17 45.2,15.6 43.5,12 Z" fill="#e2e8f0"/>
            <path d="M 44.6,13.6 C 45.4,16.6 47.2,18.4 49,19" stroke="#ffffff" stroke-width="0.45" fill="none" stroke-linecap="round" opacity="0.9"/>
            <!-- Améthyste centrale -->
            <circle cx="50" cy="16.6" r="2.4" fill="#7e22ce" stroke="#3b0764" stroke-width="0.6"/>
            <circle cx="50" cy="16.6" r="1.6" fill="#c084fc"/>
            <circle cx="49.3" cy="15.9" r="0.55" fill="#ffffff"/>
            <!-- Pendentif sur le front -->
            <path d="M 50,20.8 L 50,23" stroke="#cbd5e1" stroke-width="0.6"/>
            <path d="M 48.7,23 Q 50,26.4 51.3,23 Q 50,22 48.7,23 Z" fill="#c084fc" stroke="#581c87" stroke-width="0.4"/>
            <circle cx="49.8" cy="23.4" r="0.35" fill="#ffffff"/>
        </g>`,
    handItem: (skin = SKIN_DEFAULT) => `
        <g id="outfit-shadow-scepter" transform="translate(22, 80) rotate(-14)">
            <!-- Sceptre de mage noir en bois noueux d'ébène et orbe flottant -->
            <line x1="0" y1="-30" x2="0" y2="34" stroke="#0f172a" stroke-width="2.6" stroke-linecap="round"/>
            <line x1="0" y1="-30" x2="0" y2="34" stroke="#3b0764" stroke-width="1.2" stroke-linecap="round"/>

            <polygon points="-1.5,32 0,37 1.5,32" fill="#cbd5e1" stroke="#1e293b" stroke-width="0.5"/>
            <rect x="-2" y="30" width="4" height="2" rx="0.5" fill="#475569"/>

            <!-- Tête du sceptre : croissant enserrant l'orbe magique -->
            <path d="M -3.5,-24 L 3.5,-24 L 2,-20 L -2,-20 Z" fill="#475569" stroke="#0f172a" stroke-width="0.5"/>
            <path d="M -7,-34 
                     C -9,-43 0,-49 8,-44 
                     C 4,-41 0,-36 2,-30 
                     C -3,-31 -6,-33 -7,-34 Z" 
                  fill="#334155" stroke="#cbd5e1" stroke-width="0.7"/>
            <path d="M -5,-33 C -6,-40 0,-45 6,-42" stroke="#f8fafc" stroke-width="0.6" fill="none"/>

            <!-- Orbe d'arcanes flottant et brillant -->
            <circle cx="0" cy="-36" r="7.5" fill="#a855f7" opacity="0.4"/>
            <circle cx="0" cy="-36" r="4.8" fill="#7e22ce" stroke="#3b0764" stroke-width="0.7"/>
            <circle cx="0" cy="-36" r="3.4" fill="#c084fc"/>
            <circle cx="-1.2" cy="-37.2" r="1.3" fill="#ffffff" opacity="0.9"/>
            <path d="M -4,-40 Q -1,-43 2,-40 Q 5,-37 2,-33" stroke="#f3e8ff" stroke-width="0.6" fill="none" opacity="0.8"/>

            <!-- Main qui serre le sceptre (règle 9) -->
            <ellipse cx="0" cy="0" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
            <path d="M -1.8,-1.2 Q 0,-0.6 1.8,-1.2" stroke="${skin.shadow}" stroke-width="0.7" fill="none"/>
            <path d="M -1.8,1.2 Q 0,1.8 1.8,1.2" stroke="${skin.shadow}" stroke-width="0.7" fill="none"/>
            <circle cx="-1" cy="0" r="0.8" fill="#c084fc" stroke="#3b0764" stroke-width="0.3"/>
        </g>`
};

export const SHADOW_STYLES = {
    // Coupe Trophée 5 Garçon : Mi-long ténébreux à mèches effilées
    shadow_boy: {
        id: 'shadow_boy',
        name: 'Mi-long Ténébreux (Mage Noir)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-shadow-boy">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <path d="M 18,36 C 12,48 14,64 22,72 C 26,66 26,56 26,48 Z" fill="${color}"/>
                <path d="M 82,36 C 88,48 86,64 78,72 C 74,66 74,56 74,48 Z" fill="${color}"/>
                <path d="M 28,48 C 26,62 30,76 36,80 C 38,72 38,62 37,52 Z" fill="${color}"/>
                <path d="M 72,48 C 74,62 70,76 64,80 C 62,72 62,62 63,52 Z" fill="${color}"/>
                <path d="M 40,54 C 42,68 46,78 50,82 C 54,78 58,68 60,54 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-shadow-boy">
                <path d="M 20,30 
                         C 22,14 34,4 50,4 
                         C 66,4 78,14 80,30 
                         C 80,38 78,48 76,54 
                         C 74,46 74,36 74,28 
                         C 70,30 66,35 60,33 
                         C 55,31 54,26 52,22 
                         C 50,28 46,38 38,36 
                         C 32,34 30,28 28,26 
                         C 26,34 26,44 24,54 
                         C 22,48 20,38 20,30 Z" fill="${color}"/>
                <path d="M 23,32 C 20,40 22,48 24,54 C 25,48 26,40 25,34 Z" fill="${color}"/>
                <path d="M 77,32 C 80,40 78,48 76,54 C 75,48 74,40 75,34 Z" fill="${color}"/>
            </g>`
    },
    // Coupe Trophée 5 Fille : Longue chevelure de sorcière ondulée spectrale
    shadow_girl: {
        id: 'shadow_girl',
        name: 'Ondulé Sombre en Cascade (Sorcière)',
        withTiara: false,
        getHairBack: (color) => `
            <g id="hair-back-shadow-girl">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <path d="M 15,36 
                         C 8,24 12,8 24,0 
                         C 34,-6 66,-6 76,0 
                         C 88,8 92,24 85,36 
                         C 93,52 90,70 85,86 
                         C 80,78 77,72 74,62 
                         C 68,78 61,94 50,96 
                         C 39,94 32,78 26,62 
                         C 23,72 20,78 15,86 
                         C 10,70 7,52 15,36 Z" fill="${color}"/>
                <path d="M 22,42 C 16,56 16,74 23,88 C 26,82 27,72 26,60 Z" fill="${color}"/>
                <path d="M 78,42 C 84,56 84,74 77,88 C 74,82 73,72 74,60 Z" fill="${color}"/>
                <path d="M 27,52 C 24,68 28,84 34,92 C 35,82 34,70 32,58 Z" fill="${color}"/>
                <path d="M 73,52 C 76,68 72,84 66,92 C 65,82 66,70 68,58 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-shadow-girl">
                <path d="M 20,30 
                         C 22,14 34,4 50,4 
                         C 66,4 78,14 80,30 
                         C 80,38 78,46 76,56 
                         C 74,48 74,38 75,28 
                         C 71,32 66,35 61,34 
                         C 57,33 55,28 54,24 
                         C 52,28 48,37 42,38 
                         C 37,35 34,29 32,25 
                         C 29,30 27,33 25,28 
                         C 26,38 26,48 24,56 
                         C 22,48 20,38 20,30 Z" fill="${color}"/>
                <path d="M 22,34 C 18,44 20,56 24,64 C 25,56 25,46 24,36 Z" fill="${color}"/>
                <path d="M 78,34 C 82,44 80,56 76,64 C 75,56 75,46 76,36 Z" fill="${color}"/>
            </g>`
    }
};

export const SHADOW_TROPHY = {
    id: 'shadow',
    shortId: 'shadow',
    legacyId: 'trophy_shadow_mage',
    number: 5,
    title: 'L’Énigme du Néant',
    species: 'shadow',
    speciesName: 'Ombre',
    className: 'Mage Noir & Sorcière',
    badge: 'Nouveau',
    rarity: 'légendaire',
    unlocks: {
        species: 'shadow',
        skins: ['shadow-lilac'],
        hairs: ['#1e1435', '#3b0764'],
        eyes: ['amethyst'],
        styles: { boy: 'shadow_boy', girl: 'shadow_girl' },
        outfit: 'shadow_mage',
        label: 'Mage Noir'
    },
    tagline: 'Maître des arcanes aux cornes en S et robe de sorcière',
    description: "Cinquième trophée d'élite : débloque l'espèce Ombre (oreilles d'elfe pointues et cornes en S d'ébène), la robe de sorcière en velours pourpre, la tiare lunaire, le sceptre d'arcanes et la peau Lilas Mystique.",
    rewards: [
        { icon: 'bi-feather', label: "Espèce : Ombre (Oreilles d'elfe pointues & Cornes en S d'ébène)" },
        { icon: 'bi-shield-shaded', label: "Classe : Mage Noir & Sorcière des Ombres" },
        { icon: 'bi-scissors', label: "Coupes exclusives : Mi-long ténébreux (G) / Ondulé sombre en cascade (F)" },
        { icon: 'bi-slash-square', label: "Arme : Sceptre d'arcanes à orbe améthyste flottant" },
        { icon: 'bi-person-bounding-box', label: "Tenue : Robe de sorcière en velours, cape nuit d'ébène & tiare lunaire" },
        { icon: 'bi-palette', label: "Teintes débloquées : Peau Lilas Mystique (#d8b4fe), Cheveux Noir Abyssal & Yeux Améthyste" }
    ],
    boyPreset: {
        id: 'shd_b',
        type: 'boy',
        styleKey: 'shadow_boy',
        styleId: 1,
        outfitKey: 'shadow_mage',
        species: 'shadow',
        skinColor: 'shadow-lilac',
        hairColor: '#1e1435', // Noir Abyssal (contraste franc avec la peau lilas)
        eyeColor: 'amethyst'
    },
    girlPreset: {
        id: 'shd_g',
        type: 'girl',
        styleKey: 'shadow_girl',
        styleId: 1,
        outfitKey: 'shadow_mage',
        species: 'shadow',
        skinColor: 'shadow-lilac',
        hairColor: '#1e1435', // Noir Abyssal (parité stricte)
        eyeColor: 'amethyst'
    }
};
