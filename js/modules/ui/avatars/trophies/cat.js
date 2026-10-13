/**
 * Trophée 4 : Voleuse Féline (chat)
 * Module du trophée : tenue, coupes de cheveux et entrée du registre RPG_TROPHIES.
 */

import { fuseau, plume, SKIN_DEFAULT } from '../../avatar-kit.js';

// ANCHOR Oreilles de chat sur le crâne (espèce cat) : couleur des cheveux, intérieur rose, touffes de poils en plume
// NOTE Dessinées juste avant hairFront : la frange recouvre leur base
export function getCatEars(hairColor = '#7c3aed') {
    return `
        <g id="cat-ears">
            <path d="M 23,10 C 20,1 18.5,-8 20,-16 C 27,-13 33,-8 39,-2 Z" fill="${hairColor}"/>
            <path d="M 25.2,6.5 C 23.4,0 22.6,-6 23.4,-11 C 27.6,-8.6 31.4,-5.6 35,-1.8 Z" fill="#f9a8d4"/>
            <path d="${plume('M 25.5,5 C 25.18,1.94 25.6,-1.24 27,-4', 0.9, 10)} ${plume('M 27.5,4 C 27.78,1.59 28.75,-0.78 30.5,-2.5', 0.81, 10)}" fill="${hairColor}"/>
            <path d="M 77,10 C 80,1 81.5,-8 80,-16 C 73,-13 67,-8 61,-2 Z" fill="${hairColor}"/>
            <path d="M 74.8,6.5 C 76.6,0 77.4,-6 76.6,-11 C 72.4,-8.6 68.6,-5.6 65,-1.8 Z" fill="#f9a8d4"/>
            <path d="M 74.05,4.96 L 74.16,4.05 L 74.23,3.16 L 74.26,2.28 L 74.23,1.28 L 74.16,0.43 L 74.02,-0.54 L 73.86,-1.36 L 73.61,-2.3 L 73.36,-3.09 L 73,-4 L 73,-4 L 73.46,-3.13 L 73.81,-2.37 L 74.15,-1.44 L 74.4,-0.63 L 74.64,0.35 L 74.79,1.22 L 74.91,2.25 L 74.97,3.16 L 74.98,4.09 L 74.95,5.04 Q 74.44,5.63 74.05,4.96 Z M 72.1,4.05 L 72.03,3.33 L 71.92,2.63 L 71.78,1.95 L 71.61,1.3 L 71.35,0.56 L 71.1,-0.04 L 70.75,-0.72 L 70.36,-1.37 L 69.98,-1.9 L 69.5,-2.5 L 69.5,-2.5 L 70.06,-1.97 L 70.51,-1.48 L 70.98,-0.86 L 71.41,-0.21 L 71.74,0.39 L 72.08,1.12 L 72.34,1.79 L 72.56,2.48 L 72.75,3.2 L 72.9,3.95 Q 72.57,4.56 72.1,4.05 Z" fill="${hairColor}"/>
        </g>
    `;
}

// ANCHOR Queue de chat en panache simple (espèce cat) : courte, fine à la hanche puis évasée, bout arrondi,
// couleur des cheveux, rayures tigrées en fuseau, ombre discrète dessous et reflet dessus, dessinée derrière le corps
export function getCatTail(hairColor = '#7c3aed') {
    return `
        <g id="cat-tail">
            <path d="M 57,93 C 66,96 75,94 80,89 C 86,84 91,77 90,69 C 89.4,62 84,58.5 79,60 C 75,61.5 73.6,65 73.5,69 C 73,75 70.5,80.5 66,84 C 63,86.5 60,88 57,88.5 Z" fill="${hairColor}"/>
            <!-- NOTE Queue plus sombre que les cheveux : teinte du plan arrière -->
            <path d="M 57,93 C 66,96 75,94 80,89 C 86,84 91,77 90,69 C 89.4,62 84,58.5 79,60 C 75,61.5 73.6,65 73.5,69 C 73,75 70.5,80.5 66,84 C 63,86.5 60,88 57,88.5 Z" fill="#000000" opacity="0.22"/>
            <path d="${fuseau('M 60,93.6 C 64.83,94.4 69.9,93.94 74.41,91.98 C 78.96,90.04 82.83,86.76 86,83', 2, 5)}" fill="#000000" opacity="0.15"/>
            <!-- Rayures tigrées en fuseau -->
            <path d="${fuseau('M 66.5,85.5 C 67.91,87.93 68.32,90.83 68,93.6', 1.6, 10)} ${fuseau('M 74.5,79 C 76.67,81.9 78.29,85.19 79.5,88.6', 1.8, 10)} ${fuseau('M 79.5,70.5 C 82.75,71.87 86.28,72.48 89.8,72.6', 1.8, 10)}" fill="#000000" opacity="0.22"/>
            <path d="${fuseau('M 75.5,66 C 76.61,63.41 79.17,61.54 82,61.4', 1.3, 10)}" fill="#ffffff" opacity="0.25"/>
        </g>
    `;
}

// ANCHOR Tenue du trophée 4 : voleuse féline, base archère en cuir sombre, accents lilas, pattes griffues
export const OUTFIT_CAT_THIEF = {
    id: 'cat_thief',
    name: 'Voleuse Féline (Chat)',
    badge: 'Trophée 4',
    // NOTE Pas de cape : la queue de chat est un trait d'espèce (getCatTail), dessinée derrière le corps
    backEquipment: '',
    legs: (skin = SKIN_DEFAULT) => `
        <g id="outfit-cat-legs">
            <!-- Short de cuir noir -->
            <polygon points="38,82 49.5,82 49,93 37.5,93" fill="#18181b"/>
            <polygon points="50.5,82 62,82 62.5,93 51,93" fill="#18181b"/>
            <path d="${fuseau('M 38.5,92 C 41.81,92.53 45.19,92.53 48.5,92', 0.9, 10)} ${fuseau('M 51.5,92 C 54.81,92.53 58.19,92.53 61.5,92', 0.9, 10)}" fill="#a78bfa"/>
            <!-- Jambes nues -->
            <polygon points="39,93 48.5,93 48,104 41,104" fill="${skin.base}"/>
            <polygon points="51.5,93 61,93 59,104 52,104" fill="${skin.base}"/>
            <!-- Bottines souples de voleuse à revers lilas -->
            <path d="M39.5 104 C39.5 102, 49.5 102, 49.5 104 L50 113 C50 115, 39 115, 39 113 Z" fill="#27272a"/>
            <rect x="39" y="103" width="10.5" height="3" rx="0.8" fill="#3f3f46"/>
            <path d="${fuseau('M 39.5,104.5 C 42.78,105.23 46.22,105.23 49.5,104.5', 1, 10)}" fill="#a78bfa"/>
            <path d="M50.5 104 C50.5 102, 60.5 102, 60.5 104 L61 113 C61 115, 50 115, 50 113 Z" fill="#27272a"/>
            <rect x="50.5" y="103" width="10.5" height="3" rx="0.8" fill="#3f3f46"/>
            <path d="${fuseau('M 51,104.5 C 54.28,105.23 57.72,105.23 61,104.5', 1, 10)}" fill="#a78bfa"/>
        </g>`,
    body: `
        <g id="outfit-cat-body">
            <!-- Haut de cuir sans manches anthracite -->
            <path d="M 33,65 C 33,62 36,61.5 39,61.5 L 61,61.5 C 64,61.5 67,62 67,65 L 62.5,82 L 37.5,82 Z" fill="#27272a"/>
            <!-- Coutures latérales en fuseau -->
            <path d="${fuseau('M 39,64 C 38.73,69.34 38.94,74.7 39.6,80', 0.9, 10)} ${fuseau('M 61,64 C 61.27,69.34 61.06,74.7 60.4,80', 0.9, 10)}" fill="#52525b"/>
            <!-- Foulard de voleuse violet nuit et grelot doré -->
            <path d="M 41,61 C 44,64.5 56,64.5 59,61 L 57,60 C 54,62.5 46,62.5 43,60 Z" fill="#4c1d95"/>
            <path d="${fuseau('M 42.5,61.4 C 47.21,63.51 52.79,63.51 57.5,61.4', 0.8, 10)}" fill="#6d28d9"/>
            <circle cx="50" cy="65" r="1.9" fill="#fbbf24" stroke="#b45309" stroke-width="0.4"/>
            <path d="${fuseau('M 48.6,65.4 C 49.49,65.73 50.51,65.73 51.4,65.4', 0.5, 10)}" fill="#78350f"/>
            <circle cx="49.4" cy="64.4" r="0.5" fill="#ffffff" opacity="0.8"/>
        </g>`,
    belt: `
        <g id="outfit-cat-belt">
            <!-- Ceinture ajustée à la taille mesurée (38 à 62), boucle et sacoche recentrées sur sa courbe -->
            <path d="${fuseau('M 38,82.5 C 45.89,84.1 54.11,84.1 62,82.5', 4.05, 10)}" fill="#3f2a1d"/>
            <g transform="translate(0 1.2)"><rect x="48.4" y="81.2" width="3.2" height="2.6" rx="0.6" fill="#d4d4d8" stroke="#52525b" stroke-width="0.4"/></g>
            <g transform="translate(0 0.79)"><rect x="55.2" y="82" width="3.8" height="4.2" rx="0.8" fill="#4a3426"/><path d="${fuseau('M 55.4,83.2 C 56.49,83.6 57.71,83.6 58.8,83.2', 0.6, 10)}" fill="#a78bfa"/></g>
        </g>`,
    arms: (skin = SKIN_DEFAULT) => `
        <g id="outfit-cat-arms">
            <!-- Bras nus ; brassards de cuir noir calés sur les avant-bras -->
            <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="${skin.base}"/>
            <!-- Brassard gauche épousant les bords de l'avant-bras au poignet, liseré lilas en fuseau sur le haut -->
            <path d="M 25.64,73.32 L 25.49,75.11 L 25.54,76.96 L 25.8,79.05 L 26.62,81.2 L 27.24,81.84 L 28.22,81.65 L 29.17,81.22 L 30.06,80.57 L 30.89,79.75 Z" fill="#18181b"/>
            <path d="${fuseau('M 25.64,73.32 C 27.24,75.58 28.97,77.75 30.89,79.75', 0.8, 10)}" fill="#a78bfa"/>
            <path d="M67 63 C74 66.5, 76 70.5, 75 75.5 C72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="${skin.base}"/>
            <!-- Brassard droit épousant les bords de l'avant-bras au poignet, liseré lilas en fuseau sur le haut -->
            <path d="M 74.37,68.96 L 74.98,70.35 L 75.36,71.83 L 75.56,73.51 L 75.3,75.46 L 75.02,75.92 L 74.02,76.42 L 73.02,76.6 L 72.03,76.5 L 71.03,76.15 Z" fill="#18181b"/>
            <path d="${fuseau('M 74.37,68.96 C 73.37,71.41 72.29,73.82 71.03,76.15', 0.81, 10)}" fill="#a78bfa"/>
            <!-- NOTE Mains remplacées par les pattes griffues, dessinées une seule fois dans handItem -->
        </g>`,
    headAccessory: '',
    handItem: `
        <g id="outfit-cat-paws">
                <!-- Patte de chat griffue gauche : gant de velours, trois griffes en plume identiques, recourbées vers le corps -->
                <g id="cat-paw-gauche" transform="translate(27.6, 83.6)">
                    <!-- Griffe du pouce : plus courte, côté corps, même plume recourbée vers l'intérieur -->
                    <path d="${plume('M 3.2,0.2 C 5.6,1 7.4,2.6 7.4,4.6', 1.9, 10)}" fill="#f4f4f5" stroke="#3f3f46" stroke-width="0.35" stroke-linejoin="round"/>
                    <path d="${plume('M -2.4,1.8 C -2.83,4.65 -1.95,7.79 0.4,9.6', 1.99, 10)} ${plume('M 0,2.6 C -0.43,5.45 0.45,8.59 2.8,10.4', 1.99, 10)} ${plume('M 2.4,1.8 C 1.97,4.65 2.85,7.79 5.2,9.6', 1.99, 10)}" fill="#f4f4f5" stroke="#3f3f46" stroke-width="0.35" stroke-linejoin="round"/>
                    <circle cx="0" cy="0" r="3.7" fill="#27272a"/>
                    <path d="${fuseau('M -1.3,-3.4 C -1.24,-2.27 -1.23,-1.13 -1.3,0', 0.6, 10)} ${fuseau('M 1.3,-3.4 C 1.24,-2.27 1.23,-1.13 1.3,0', 0.6, 10)}" fill="#52525b"/>
                    <circle cx="-1.2" cy="-1.3" r="0.9" fill="#ffffff" opacity="0.18"/>
                </g>
                <!-- Patte de chat griffue droite : gant de velours, trois griffes en plume identiques, recourbées vers le corps -->
                <g id="cat-paw-droite" transform="translate(74.6, 78)">
                    <!-- Griffe du pouce : plus courte, côté corps, même plume recourbée vers l'intérieur -->
                    <path d="${plume('M -3.2,0.2 C -5.6,1 -7.4,2.6 -7.4,4.6', 1.9, 10)}" fill="#f4f4f5" stroke="#3f3f46" stroke-width="0.35" stroke-linejoin="round"/>
                    <path d="M 3.39,1.68 L 3.39,2.68 L 3.3,3.62 L 3.14,4.52 L 2.9,5.37 L 2.55,6.3 L 2.16,7.03 L 1.62,7.81 L 1,8.52 L 0.29,9.14 L -0.4,9.6 L -0.4,9.6 L 0.11,8.97 L 0.63,8.23 L 1.05,7.46 L 1.36,6.66 L 1.54,5.96 L 1.67,5.11 L 1.7,4.35 L 1.67,3.57 L 1.57,2.76 L 1.41,1.92 Q 2.23,0.41 3.39,1.68 Z M 0.99,2.48 L 0.99,3.48 L 0.9,4.42 L 0.74,5.32 L 0.5,6.17 L 0.15,7.1 L -0.24,7.83 L -0.78,8.61 L -1.4,9.32 L -2.11,9.94 L -2.8,10.4 L -2.8,10.4 L -2.29,9.77 L -1.77,9.03 L -1.35,8.26 L -1.04,7.46 L -0.86,6.76 L -0.73,5.91 L -0.7,5.15 L -0.73,4.37 L -0.83,3.56 L -0.99,2.72 Q -0.17,1.21 0.99,2.48 Z M -1.41,1.68 L -1.41,2.68 L -1.5,3.62 L -1.66,4.52 L -1.9,5.37 L -2.25,6.3 L -2.64,7.03 L -3.18,7.81 L -3.8,8.52 L -4.51,9.14 L -5.2,9.6 L -5.2,9.6 L -4.69,8.97 L -4.17,8.23 L -3.75,7.46 L -3.44,6.66 L -3.26,5.96 L -3.13,5.11 L -3.1,4.35 L -3.13,3.57 L -3.23,2.76 L -3.39,1.92 Q -2.57,0.41 -1.41,1.68 Z" fill="#f4f4f5" stroke="#3f3f46" stroke-width="0.35" stroke-linejoin="round"/>
                    <circle cx="0" cy="0" r="3.7" fill="#27272a"/>
                    <path d="${fuseau('M -1.3,-3.4 C -1.24,-2.27 -1.23,-1.13 -1.3,0', 0.6, 10)} ${fuseau('M 1.3,-3.4 C 1.24,-2.27 1.23,-1.13 1.3,0', 0.6, 10)}" fill="#52525b"/>
                    <circle cx="-1.2" cy="-1.3" r="0.9" fill="#ffffff" opacity="0.18"/>
                </g>
        </g>`
};

export const CAT_STYLES = {
    // Coupe Trophée 4 Garçon : ébouriffée en mèches pointues balayées vers la droite
    cat_boy: {
        id: 'cat_boy',
        name: 'Félin Ébouriffé (Court en mèches pointues)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-cat-boy">
                <ellipse cx="50" cy="26" rx="35" ry="30" fill="${color}"/>
                <!-- Piques ébouriffées en arc autour du crâne : 8 blocs larges, pointes obtuses arrondies, longueur et inclinaison alternées -->
                <path d="M 24.85,40.18 Q 14.25,39.99 5.36,31.16 Q 4.22,30.12 5.11,28.88 Q 11.03,24.59 20.63,20.68 Z M 20.08,27.95 Q 11.16,22.84 9,17.76 Q 8.3,16.48 9.57,15.7 Q 16.59,7.94 27.2,9.1 Z M 22.69,15.24 Q 17.64,6.46 19.47,-4.12 Q 19.75,-5.64 21.36,-5.63 Q 30.39,-4.25 39.4,1.68 Z M 32.03,5.18 Q 32.11,-5.1 34.28,-9.24 Q 35.03,-10.56 36.48,-9.98 Q 49.02,-8.99 54.2,0.26 Z M 45.8,0.26 Q 50.98,-8.99 62.99,-13.26 Q 64.5,-13.86 65.37,-12.53 Q 67.89,-5.1 67.97,5.18 Z M 60.6,1.68 Q 69.61,-4.25 76.16,-3.73 Q 77.71,-3.82 77.95,-2.36 Q 82.36,6.46 77.31,15.24 Z M 72.8,9.1 Q 83.41,7.94 93.72,16.27 Q 94.97,17.18 94.24,18.51 Q 88.84,22.84 79.92,27.95 Z M 79.37,20.68 Q 88.97,24.59 91.9,28.67 Q 92.79,29.82 91.67,30.78 Q 85.75,39.99 75.15,40.18 Z" fill="${color}"/>
                <!-- Nuque courte en pointes obtuses -->
                <path d="M 18,34 C 12,22 16,8 26,0 C 36,-6 64,-6 74,0 C 84,8 88,22 82,34 C 86,40 85,48 80,53 C 77,49 74,48 71,50 C 70,47 67,46 64,47 L 36,47 C 33,46 30,47 29,50 C 26,48 23,49 20,53 C 15,48 14,40 18,34 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-cat-boy">
                <!-- Calotte et frange en mèches pointues balayées vers la droite -->
                <path d="M 80,30 C 78,14 66,4 50,4 C 34,4 22,14 20,30 C 20,38 21,44 23,48 C 25,42 25,35 26,29 C 27,31 29,33 32,34 C 34,30 36,28 38,27 C 39,31 41,34 44,36 C 46,31 48,29 51,28 C 52,32 54,34 57,35 C 58,31 60,29 63,28 C 65,31 67,33 70,33 C 71,31 72,30 73,30 C 74,36 75,42 77,48 C 79,42 80,36 80,30 Z" fill="${color}"/>
                <!-- Mèches de tempes -->
                <path d="M 22,34 C 19,42 20,48 23,54 C 25,48 25,42 24,36 Z" fill="${color}"/>
                <path d="M 78,34 C 81,42 80,48 77,54 C 75,48 75,42 76,36 Z" fill="${color}"/>
            </g>`
    },
    // Coupe Trophée 4 Fille : carré félin aux pointes obtuses, frange balayée vers la droite
    cat_girl: {
        id: 'cat_girl',
        name: 'Carré Félin (Frange balayée)',
        withTiara: false,
        getHairBack: (color) => `
            <g id="hair-back-cat-girl">
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <!-- Piques ébouriffées en arc autour du crâne : 8 blocs larges, pointes obtuses arrondies, longueur et inclinaison alternées -->
                <path d="M 24.85,40.18 Q 14.25,39.99 5.36,31.16 Q 4.22,30.12 5.11,28.88 Q 11.03,24.59 20.63,20.68 Z M 20.08,27.95 Q 11.16,22.84 9,17.76 Q 8.3,16.48 9.57,15.7 Q 16.59,7.94 27.2,9.1 Z M 22.69,15.24 Q 17.64,6.46 19.47,-4.12 Q 19.75,-5.64 21.36,-5.63 Q 30.39,-4.25 39.4,1.68 Z M 32.03,5.18 Q 32.11,-5.1 34.28,-9.24 Q 35.03,-10.56 36.48,-9.98 Q 49.02,-8.99 54.2,0.26 Z M 45.8,0.26 Q 50.98,-8.99 62.99,-13.26 Q 64.5,-13.86 65.37,-12.53 Q 67.89,-5.1 67.97,5.18 Z M 60.6,1.68 Q 69.61,-4.25 76.16,-3.73 Q 77.71,-3.82 77.95,-2.36 Q 82.36,6.46 77.31,15.24 Z M 72.8,9.1 Q 83.41,7.94 93.72,16.27 Q 94.97,17.18 94.24,18.51 Q 88.84,22.84 79.92,27.95 Z M 79.37,20.68 Q 88.97,24.59 91.9,28.67 Q 92.79,29.82 91.67,30.78 Q 85.75,39.99 75.15,40.18 Z" fill="${color}"/>
                <!-- Silhouette en fuseau : côtés bombés aux joues puis effilés en pointe, mèche centrale descendant derrière la nuque -->
                <path d="M 16,36 C 10,22 14,8 24,0 C 34,-6 66,-6 76,0 C 86,8 90,22 84,36 C 90,48 90,62 82,77 C 79,70 77,62 76,55 C 72,61 68,64 64,65 C 60,70 55,75 50,79 C 45,75 40,70 36,65 C 32,64 28,61 24,55 C 23,62 21,70 18,77 C 10,62 10,48 16,36 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-cat-girl">
                <!-- Calotte et longue frange en mèches pointues balayées vers la droite -->
                <path d="M 80,30 C 78,14 66,4 50,4 C 34,4 22,14 20,30 C 20,38 22,48 24,56 C 26,48 26,38 25,28 C 27,31 30,34 34,35 C 36,31 38,28 40,26 C 42,31 45,35 50,37 C 52,32 54,29 56,27 C 58,31 61,34 65,35 C 67,32 68,30 69,28 C 71,30 72,31 74,31 C 74,40 74,48 76,56 C 78,48 80,38 80,30 Z" fill="${color}"/>
                <!-- Mèches de tempes longues et pointues -->
                <path d="M 22,34 C 18,44 19,54 24,62 C 26,54 26,44 24,36 Z" fill="${color}"/>
                <path d="M 78,34 C 82,44 81,54 76,62 C 74,54 74,44 76,36 Z" fill="${color}"/>
            </g>`
    },
};

export const CAT_TROPHY = {
    id: 'cat',
    shortId: 'cat',
    legacyId: 'trophy_cat_thief',
    number: 4,
    title: 'La Griffe de Velours',
    species: 'cat',
    speciesName: 'Félin',
    className: 'Voleuse Féline',
    badge: 'Nouveau',
    // ANCHOR Invocation : rareté de la carte (taux de tirage) et éléments ajoutés à l'atelier une fois gagnée
    rarity: 'épique',
    unlocks: {
        species: 'cat',
        skins: [],
        hairs: ['#7c3aed', '#a78bfa'],
        eyes: ['cat-rose'],
        styles: { boy: 'cat_boy', girl: 'cat_girl' },
        outfit: 'cat_thief',
        label: 'Chat'
    },
    tagline: 'Voleuse agile aux oreilles de chat et aux griffes de velours',
    description: "Quatrième trophée : débloque l'espèce féline (oreilles de chat, bouche en ω, queue touffue), les pattes griffues et la tenue de voleuse.",
    rewards: [
        { icon: 'bi-feather', label: 'Espèce : Félin (Oreilles de chat, bouche en ω & queue épaisse)' },
        { icon: 'bi-shield-shaded', label: 'Classe : Voleuse Féline' },
        { icon: 'bi-scissors', label: 'Coupes exclusives : Félin ébouriffé (G) / Carré félin (F)' },
        { icon: 'bi-slash-square', label: 'Armes : Pattes de chat griffues' },
        { icon: 'bi-person-bounding-box', label: 'Tenue : Cuir sombre de voleuse, foulard violet nuit & grelot doré' },
        { icon: 'bi-palette', label: 'Teintes débloquées : Cheveux Violet Félin & Lilas Félin, Yeux Rose Félin aux pupilles fendues' }
    ],
    boyPreset: {
        id: 'cat_b',
        type: 'boy',
        styleKey: 'cat_boy',
        styleId: 1,
        outfitKey: 'cat_thief',
        species: 'cat',
        skinColor: 'light',
        hairColor: '#7c3aed', // Violet Félin (contraste franc avec la peau pêche)
        eyeColor: 'cat-rose'
    },
    girlPreset: {
        id: 'cat_g',
        type: 'girl',
        styleKey: 'cat_girl',
        styleId: 1,
        outfitKey: 'cat_thief',
        species: 'cat',
        skinColor: 'light',
        hairColor: '#7c3aed', // Violet Félin (identique, parité stricte)
        eyeColor: 'cat-rose'
    }
};
