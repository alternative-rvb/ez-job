/**
 * Mannequin neutre : base de dessin des futurs trophées (tête nue, corps nu, gris neutre)
 * Ce n'est pas un trophée : aucune entrée dans RPG_TROPHIES, donc jamais tiré ni débloqué.
 * Il sert de gabarit commun : mêmes proportions, mêmes ancrages (épaules, poignets, taille, chevilles)
 * que tous les personnages. On exporte son SVG par calques (lab) pour dessiner dessus une tenue,
 * une coupe ou un trait d'espèce, puis on renvoie le fichier.
 */

import { fuseau, SKIN_DEFAULT } from '../avatar-kit.js';

// NOTE Articulations de mannequin : petits disques d'ombre aux épaules, coudes et genoux
const joint = (cx, cy, r = 1.4) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#000000" opacity="0.1"/>`;

export const OUTFIT_MANNEQUIN = {
    id: 'mannequin',
    name: 'Mannequin neutre (corps nu)',
    badge: 'Gabarit',
    backEquipment: '',
    legs: (skin = SKIN_DEFAULT) => `
        <g id="outfit-mannequin-legs">
            <!-- Jambes lisses -->
            <polygon points="39,82 49.5,82 48.5,104 41,104" fill="${skin.base}"/>
            <polygon points="50.5,82 61,82 59,104 51.5,104" fill="${skin.base}"/>
            ${joint(44.8, 93, 1.5)}${joint(55.2, 93, 1.5)}
            <!-- Pieds nus arrondis, orteils non détaillés -->
            <path d="M40.5 104 C40.5 102, 49 102, 49 104 L50 111 C50 113.6, 39 113.6, 39 111 Z" fill="${skin.base}"/>
            <path d="M51 104 C51 102, 59.5 102, 59.5 104 L61 111 C61 113.6, 50 113.6, 50 111 Z" fill="${skin.base}"/>
        </g>`,
    body: (skin = SKIN_DEFAULT) => `
        <g id="outfit-mannequin-body">
            <!-- Torse lisse et bassin continu, sans détail anatomique -->
            <path d="M 33,65 C 33,62 36,61.5 39,61.5 L 61,61.5 C 64,61.5 67,62 67,65 L 62.5,82 L 37.5,82 Z" fill="${skin.base}"/>
            <path d="M 37.5,80 C 37.5,86 40,88.5 50,88.5 C 60,88.5 62.5,86 62.5,80 Z" fill="${skin.base}"/>
            <!-- Flancs en fuseau pour donner du volume -->
            <path d="${fuseau('M 38.4,64 C 37.5,69.5 37.7,75 38.6,80', 0.8, 10)} ${fuseau('M 61.6,64 C 62.5,69.5 62.3,75 61.4,80', 0.8, 10)}" fill="${skin.shadow}" opacity="0.7"/>
            ${joint(35, 64.5, 2)}${joint(65, 64.5, 2)}
        </g>`,
    belt: '',
    arms: (skin = SKIN_DEFAULT) => `
        <g id="outfit-mannequin-arms">
            <!-- Bras nus et mains ouvertes le long du corps -->
            <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="${skin.base}"/>
            <path d="M67 63 C74 66.5, 76 70.5, 75 75.5 C72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="${skin.base}"/>
            ${joint(27.2, 74.2, 1.3)}${joint(74.4, 70.4, 1.3)}
            <ellipse cx="28.4" cy="83.4" rx="3.5" ry="3.2" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
            <path d="${fuseau('M 27.6,84 C 27.4,84.8 27.4,85.6 27.6,86.4', 0.6, 8)} ${fuseau('M 29.6,84 C 29.8,84.8 29.8,85.6 29.6,86.4', 0.6, 8)}" fill="${skin.shadow}"/>
            <ellipse cx="75.6" cy="78" rx="3.5" ry="3.2" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
            <path d="${fuseau('M 74.8,78.6 C 74.6,79.4 74.6,80.2 74.8,81', 0.6, 8)} ${fuseau('M 76.8,78.6 C 77,79.4 77,80.2 76.8,81', 0.6, 8)}" fill="${skin.shadow}"/>
        </g>`,
    headAccessory: '',
    handItem: ''
};

// NOTE Tête nue : aucune coupe, ni derrière ni devant
export const MANNEQUIN_STYLES = {
    mannequin_boy: { id: 'mannequin_boy', name: 'Tête nue (Mannequin)', withBand: false, getHairBack: () => '', getHairFront: () => '' },
    mannequin_girl: { id: 'mannequin_girl', name: 'Tête nue (Mannequin)', withTiara: false, getHairBack: () => '', getHairFront: () => '' }
};

// ANCHOR Presets du mannequin (garçon et fille), utilisables avec buildCustomAvatarSvg ou le script d'aperçu
const mannequinPreset = (type) => ({
    id: type === 'boy' ? 'mnq_b' : 'mnq_g',
    type,
    styleKey: `mannequin_${type}`,
    styleId: 1,
    outfitKey: 'mannequin',
    species: 'human',
    skinColor: 'mannequin',
    hairColor: '#9ca3af', // NOTE Sert seulement aux sourcils et aux paupières : gris neutre
    eyeColor: 'onyx'
});
export const MANNEQUIN_BOY = mannequinPreset('boy');
export const MANNEQUIN_GIRL = mannequinPreset('girl');
