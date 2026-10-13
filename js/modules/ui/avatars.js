/**
 * Module de définition, rendu et personnalisation des Avatars Chibi Manga
 * Supporte la sélection du genre, des 4 coupes de cheveux par genre,
 * ainsi que le choix dynamique des couleurs de cheveux et des yeux.
 */
import { playerManager } from '../core/player.js';
import { ALL_EYE_COLORS, ALL_SKIN_COLORS, BOY_BASE, BOY_STYLES, GIRL_BASE, GIRL_STYLES, BOY_OUTFITS, GIRL_OUTFITS } from './avatars/base.js';
import { getCatEars, getCatTail, CAT_STYLES, OUTFIT_CAT_THIEF, CAT_TROPHY } from './avatars/trophies/cat.js';
import { getShadowHorns, SHADOW_STYLES, OUTFIT_SHADOW_MAGE, SHADOW_TROPHY } from './avatars/trophies/shadow.js';
import { ELF_STYLES, OUTFIT_ELF_RANGER, ELF_TROPHY } from './avatars/trophies/elf.js';
import { ORC_STYLES, OUTFIT_ORC_BERSERKER, ORC_TROPHY } from './avatars/trophies/orc.js';
import { PALADIN_STYLES, OUTFIT_PALADIN_LIGHT, PALADIN_TROPHY } from './avatars/trophies/paladin.js';
import { VAMPIRE_STYLES, OUTFIT_VAMPIRE_NOBLE, VAMPIRE_TROPHY } from './avatars/trophies/vampire.js';
import { NECROMANCER_STYLES, OUTFIT_NECROMANCER, NECROMANCER_TROPHY } from './avatars/trophies/necromancer.js';
import { FAIRY_STYLES, OUTFIT_FAIRY_HERBALIST, FAIRY_TROPHY } from './avatars/trophies/fairy.js';
import { SCHOLAR_STYLES, OUTFIT_SCHOLAR_MAGE, SCHOLAR_TROPHY } from './avatars/trophies/scholar.js';
import { PIRATE_STYLES, OUTFIT_PIRATE_CORSAIR, PIRATE_TROPHY } from './avatars/trophies/pirate.js';
import { getDragonHorns, DRAGON_STYLES, OUTFIT_DRAGON_KNIGHT, DRAGON_TROPHY } from './avatars/trophies/dragon.js';
import { ASTRONAUT_STYLES, OUTFIT_ASTRONAUT_EXPLORER, ASTRONAUT_TROPHY } from './avatars/trophies/astronaut.js';
import { MANNEQUIN_STYLES, OUTFIT_MANNEQUIN } from './avatars/mannequin.js';
import { RARE_TROPHIES } from './avatars/rares.js';

// ANCHOR API publique inchangée : tout ce qui était exporté par ce module l'est toujours (réexports)
export * from './avatars/base.js';
export { getCatEars, getCatTail, OUTFIT_CAT_THIEF } from './avatars/trophies/cat.js';
export { getShadowHorns, OUTFIT_SHADOW_MAGE } from './avatars/trophies/shadow.js';
export { OUTFIT_ELF_RANGER } from './avatars/trophies/elf.js';
export { OUTFIT_ORC_BERSERKER } from './avatars/trophies/orc.js';
export { OUTFIT_PALADIN_LIGHT } from './avatars/trophies/paladin.js';
export { OUTFIT_VAMPIRE_NOBLE } from './avatars/trophies/vampire.js';
export { OUTFIT_NECROMANCER } from './avatars/trophies/necromancer.js';
export { OUTFIT_FAIRY_HERBALIST } from './avatars/trophies/fairy.js';
export { OUTFIT_SCHOLAR_MAGE } from './avatars/trophies/scholar.js';
export { OUTFIT_PIRATE_CORSAIR } from './avatars/trophies/pirate.js';
export { getDragonHorns, OUTFIT_DRAGON_KNIGHT } from './avatars/trophies/dragon.js';
export { OUTFIT_ASTRONAUT_EXPLORER } from './avatars/trophies/astronaut.js';
export { OUTFIT_MANNEQUIN, MANNEQUIN_BOY, MANNEQUIN_GIRL } from './avatars/mannequin.js';
export { RARE_TROPHIES } from './avatars/rares.js';

// SECTION Registres des trophées : coupes, tenues et fiches assemblées depuis avatars/trophies/*.js
export const RPG_STYLES = { ...ELF_STYLES, ...ORC_STYLES, ...PALADIN_STYLES, ...CAT_STYLES, ...SHADOW_STYLES, ...VAMPIRE_STYLES, ...NECROMANCER_STYLES, ...FAIRY_STYLES, ...SCHOLAR_STYLES, ...PIRATE_STYLES, ...DRAGON_STYLES, ...ASTRONAUT_STYLES, ...MANNEQUIN_STYLES };

// Registre des tenues RPG
export const RPG_OUTFITS = {
    elf_ranger: OUTFIT_ELF_RANGER,
    orc_berserker: OUTFIT_ORC_BERSERKER,
    paladin_light: OUTFIT_PALADIN_LIGHT,
    cat_thief: OUTFIT_CAT_THIEF,
    shadow_mage: OUTFIT_SHADOW_MAGE,
    vampire_noble: OUTFIT_VAMPIRE_NOBLE,
    necromancer: OUTFIT_NECROMANCER,
    fairy_herbalist: OUTFIT_FAIRY_HERBALIST,
    scholar_mage: OUTFIT_SCHOLAR_MAGE,
    pirate_corsair: OUTFIT_PIRATE_CORSAIR,
    dragon_knight: OUTFIT_DRAGON_KNIGHT,
    astronaut_explorer: OUTFIT_ASTRONAUT_EXPLORER,
    mannequin: OUTFIT_MANNEQUIN
};

// Registre des Trophées RPG (IDs courts pour chaque personnage garçon et fille)
export const RPG_TROPHIES = [ELF_TROPHY, ORC_TROPHY, PALADIN_TROPHY, CAT_TROPHY, SHADOW_TROPHY, VAMPIRE_TROPHY, NECROMANCER_TROPHY, FAIRY_TROPHY, SCHOLAR_TROPHY, PIRATE_TROPHY, DRAGON_TROPHY, ASTRONAUT_TROPHY, ...RARE_TROPHIES];

// Dictionnaire récapitulatif des IDs courts de chaque personnage avatar
export const AVATAR_SHORT_IDS = {
    // Personnages de base
    boy: { id: 'boy', name: 'Garçon Aventurier (Base)', type: 'base', defaultGender: 'boy' },
    girl: { id: 'girl', name: 'Fille Aventurière (Base)', type: 'base', defaultGender: 'girl' },
    // Nouveaux personnages RPG débloqués via trophées
    elf: { id: 'elf', name: 'Elfe Rôdeur Sylvestre', type: 'trophy', number: 1, boyId: 'elf_b', girlId: 'elf_g' },
    orc: { id: 'orc', name: 'Orc Berserker', type: 'trophy', number: 2, boyId: 'orc_b', girlId: 'orc_g' },
    paladin: { id: 'paladin', name: 'Humain Paladin Solaire', type: 'trophy', number: 3, boyId: 'pal_b', girlId: 'pal_g' },
    cat: { id: 'cat', name: 'Félin Voleuse', type: 'trophy', number: 4, boyId: 'cat_b', girlId: 'cat_g' },
    shadow: { id: 'shadow', name: 'Ombre Mage Noir', type: 'trophy', number: 5, boyId: 'shd_b', girlId: 'shd_g' },
    vampire: { id: 'vampire', name: 'Vampire Noble Duelliste', type: 'trophy', number: 6, boyId: 'vmp_b', girlId: 'vmp_g' },
    necromancer: { id: 'necromancer', name: 'Revenant Nécromancien', type: 'trophy', number: 7, boyId: 'nec_b', girlId: 'nec_g' },
    fairy: { id: 'fairy', name: 'Fée Herboriste', type: 'trophy', number: 8, boyId: 'fai_b', girlId: 'fai_g' },
    scholar: { id: 'scholar', name: 'Humain Mage Érudit', type: 'trophy', number: 9, boyId: 'sch_b', girlId: 'sch_g' },
    pirate: { id: 'pirate', name: 'Corsaire des Mers', type: 'trophy', number: 10, boyId: 'pir_b', girlId: 'pir_g' },
    dragon: { id: 'dragon', name: 'Chevalier Dragon', type: 'trophy', number: 11, boyId: 'drg_b', girlId: 'drg_g' },
    astronaut: { id: 'astronaut', name: 'Cosmonaute Explorateur', type: 'trophy', number: 12, boyId: 'ast_b', girlId: 'ast_g' },
    // Avatars rares débloqués (variantes de départ)
    ...Object.fromEntries(RARE_TROPHIES.map(t => [t.id, { id: t.id, name: t.title, type: 'rare', number: t.number, boyId: t.boyPreset.id, girlId: t.girlPreset.id }]))
};

/**
 * Génère le code SVG d'un avatar personnalisé
 * @param {Object} options - Options de configuration
 * @param {'boy'|'girl'} options.type - Modèle de base
 * @param {number} options.styleId - ID de la coupe (1..4)
 * @param {string} options.styleKey - Clé d'une coupe RPG exclusive
 * @param {number} options.outfitId - ID de la tenue (1..4)
 * @param {string} options.outfitKey - Clé d'une tenue RPG (ex: 'elf_ranger')
 * @param {Object} options.customOutfit - Objet tenue personnalisé direct
 * @param {string} options.species - Espèce ('human', 'elf', 'orc', etc.)
 * @param {string} options.hairColor - Code hex de la couleur des cheveux
 * @param {string} options.eyeColor - ID ou objet de couleur des yeux
 * @param {string} options.skinColor - ID ou objet de couleur de peau
 * @param {'full'|'head'} options.mode - Vue corps complet ou portrait tête seule
 * @param {'happy'|'sad'|null} options.mood - force la bouche principale pour tous les personnages : 'happy' sourit, 'sad' la retourne ; null garde la bouche propre à chaque personnage
 * @param {boolean} options.layers - Export éditeur : chaque couche dans un calque nommé (Inkscape, Figma, Illustrator)
 * @returns {string} SVG complet
 */
export function buildCustomAvatarSvg({
    type = 'boy',
    styleId = 1,
    styleKey = null,
    outfitId = 1,
    outfitKey = null,
    customOutfit = null,
    species = 'human',
    hairColor = null,
    eyeColor = null,
    skinColor = 'light',
    mode = 'full',
    layers = false,
    mood = null
} = {}) {
    const isBoy = type === 'boy';
    const base = isBoy ? BOY_BASE : GIRL_BASE;
    const styles = isBoy ? BOY_STYLES : GIRL_STYLES;
    const outfits = isBoy ? BOY_OUTFITS : GIRL_OUTFITS;

    // Résolution de la coupe de cheveux (standard ou exclusive RPG)
    let style = styles[styleId] || styles[1];
    if (styleKey && RPG_STYLES[styleKey]) {
        style = RPG_STYLES[styleKey];
    }
    
    // Résolution de la tenue (standard ou RPG)
    let outfit = outfits[outfitId] || outfits[1];
    if (customOutfit) {
        outfit = customOutfit;
    } else if (outfitKey && RPG_OUTFITS[outfitKey]) {
        outfit = RPG_OUTFITS[outfitKey];
    }

    // Couleur des cheveux (défaut partagé entre fille et garçon)
    const effectiveHairColor = hairColor || '#5a2d0c';

    // Couleur des yeux (défaut partagé entre fille et garçon, recherche dans ALL_EYE_COLORS)
    let effectiveEye = ALL_EYE_COLORS[0];
    if (typeof eyeColor === 'string') {
        const found = ALL_EYE_COLORS.find(c => c.id === eyeColor);
        if (found) effectiveEye = found;
    } else if (eyeColor && eyeColor.dark && eyeColor.light) {
        effectiveEye = eyeColor;
    }

    // Couleur de peau (recherche dans ALL_SKIN_COLORS)
    let effectiveSkin = ALL_SKIN_COLORS[1]; // light
    if (typeof skinColor === 'string') {
        const found = ALL_SKIN_COLORS.find(c => c.id === skinColor || c.base === skinColor);
        if (found) effectiveSkin = found;
    } else if (skinColor && skinColor.base && skinColor.shadow) {
        effectiveSkin = skinColor;
    }

    const hairBack = style.getHairBack(effectiveHairColor);
    const hairFront = style.getHairFront(effectiveHairColor);

    // Les nouveaux personnages RPG (espèces fantastiques ou tenues RPG) ne doivent JAMAIS
    // hériter des accessoires de base (bandeaux sportifs, diadèmes classiques, élastiques d'écolier)
    const isNewCharacter = species !== 'human' || Boolean(outfitKey) || Boolean(customOutfit) || Boolean(styleKey);
    const showBaseBand = !isNewCharacter && (isBoy ? Boolean(style.withBand) : Boolean(style.withTiara));
    // NOTE Le triangle de col orange appartient à la tenue de base : jamais sur un personnage de trophée
    const headBase = isBoy ? base.headBase(showBaseBand, effectiveSkin, species, !isNewCharacter) : base.headBase(showBaseBand, effectiveSkin, species);
    const faceFeatures = base.faceFeatures(effectiveEye, effectiveSkin, species, effectiveHairColor, styleKey, mood);
    const eyebrows = base.eyebrows ? base.eyebrows(effectiveHairColor, 0.85) : '';

    // NOTE Traits d'espèce qui suivent la couleur des cheveux, quelle que soit la tenue
    const catEars = species === 'cat' ? getCatEars(effectiveHairColor) : '';
    const catTail = species === 'cat' ? getCatTail(effectiveHairColor) : '';
    const shadowHorns = species === 'shadow' ? getShadowHorns() : '';
    const dragonHorns = species === 'dragon' ? getDragonHorns() : '';
    const renderPart = (part, ...extra) => (typeof part === 'function' ? part(effectiveSkin, ...extra) : (part || ''));

    // ANCHOR Export calques : ordre = ordre de dessin (premier = tout au fond)
    const headLayers = [
        ['cheveux-arriere', 'Cheveux arrière', hairBack],
        ['tete', 'Tête', headBase],
        ['visage', 'Visage', faceFeatures],
        ['oreilles-chat', 'Oreilles de chat', catEars],
        ['cheveux-avant', 'Cheveux avant', hairFront],
        // NOTE Cornes par-dessus la frange : leur base arrondie reste visible, plantée sur le crâne
        ['cornes', 'Cornes', shadowHorns || dragonHorns],
        ['sourcils', 'Sourcils', eyebrows],
        ['accessoire-tete', 'Accessoire de tête', renderPart(outfit.headAccessory, effectiveHairColor, type)]
    ];
    // NOTE Les cheveux arrière sont au fond, derrière la cape : une cape recouvre les mèches qui retombent dans le dos
    const fullLayers = [
        headLayers[0],
        ['equipement-dos', 'Équipement dos (cape)', renderPart(outfit.backEquipment)],
        ['queue-chat', 'Queue de chat', catTail],
        ['ombre-sol', 'Ombre au sol', base.shadow],
        ['jambes', 'Jambes', renderPart(outfit.legs)],
        ['corps', 'Corps (tenue)', renderPart(outfit.body)],
        ['ceinture', 'Ceinture', renderPart(outfit.belt)],
        ['bras', 'Bras', renderPart(outfit.arms)],
        ...headLayers.slice(1),
        ['objet-main', 'Objet en main', renderPart(outfit.handItem)]
    ];
    const isHead = mode === 'head';
    const viewBox = isHead ? '0 -34 100 102' : '0 -34 100 156';

    if (layers) {
        const groups = (isHead ? headLayers : fullLayers)
            .filter(([, , content]) => content && content.trim())
            .map(([id, label, content]) => `<g id="calque-${id}" inkscape:groupmode="layer" inkscape:label="${label}">${content}</g>`)
            .join('\n');
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="${viewBox}" width="${isHead ? 400 : 400}" height="${isHead ? 408 : 624}">\n${groups}\n</svg>`;
    }

    if (isHead) {
        return `
            <svg viewBox="${viewBox}" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                ${headLayers.map(l => l[2]).join('\n')}
            </svg>
        `;
    }

    return `
        <svg viewBox="${viewBox}" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
            ${fullLayers.map(l => l[2]).join('\n')}
        </svg>
    `;
}

/**
 * Objet AVATARS pour compatibilité avec le code existant
 */
export const AVATARS = {
    boy: {
        id: 'boy',
        color: '#489e96',
        accent: '#ff9d00',
        image: null,
        get svg() {
            const config = (playerManager && playerManager.getAvatarConfig) ? playerManager.getAvatarConfig() : { type: 'boy', styleId: 1 };
            return buildCustomAvatarSvg({ ...config, type: 'boy', mode: 'full' });
        },
        get headSvg() {
            const config = (playerManager && playerManager.getAvatarConfig) ? playerManager.getAvatarConfig() : { type: 'boy', styleId: 1 };
            return buildCustomAvatarSvg({ ...config, type: 'boy', mode: 'head' });
        }
    },
    girl: {
        id: 'girl',
        color: '#ff9d00',
        accent: '#489e96',
        image: null,
        get svg() {
            const config = (playerManager && playerManager.getAvatarConfig) ? playerManager.getAvatarConfig() : { type: 'girl', styleId: 1 };
            return buildCustomAvatarSvg({ ...config, type: 'girl', mode: 'full' });
        },
        get headSvg() {
            const config = (playerManager && playerManager.getAvatarConfig) ? playerManager.getAvatarConfig() : { type: 'girl', styleId: 1 };
            return buildCustomAvatarSvg({ ...config, type: 'girl', mode: 'head' });
        }
    },
    // Nouveaux personnages RPG accessibles via leurs IDs courts
    elf: {
        id: 'elf',
        color: '#1b5e52',
        accent: '#f59e0b',
        get svg() { return renderAvatarSvg('elf'); },
        get headSvg() { return renderAvatarHeadSvg('elf'); }
    },
    orc: {
        id: 'orc',
        color: '#659b5e',
        accent: '#b91c1c',
        get svg() { return renderAvatarSvg('orc'); },
        get headSvg() { return renderAvatarHeadSvg('orc'); }
    },
    paladin: {
        id: 'paladin',
        color: '#fbbf24',
        accent: '#cbd5e1',
        get svg() { return renderAvatarSvg('paladin'); },
        get headSvg() { return renderAvatarHeadSvg('paladin'); }
    },
    cat: {
        id: 'cat',
        color: '#ea580c',
        accent: '#fef08a',
        get svg() { return renderAvatarSvg('cat'); },
        get headSvg() { return renderAvatarHeadSvg('cat'); }
    },
    shadow: {
        id: 'shadow',
        color: '#581c87',
        accent: '#a855f7',
        get svg() { return renderAvatarSvg('shadow'); },
        get headSvg() { return renderAvatarHeadSvg('shadow'); }
    },
    vampire: {
        id: 'vampire',
        color: '#881337',
        accent: '#e2e8f0',
        get svg() { return renderAvatarSvg('vampire'); },
        get headSvg() { return renderAvatarHeadSvg('vampire'); }
    },
    necromancer: {
        id: 'necromancer',
        color: '#2f4a43',
        accent: '#4ade80',
        get svg() { return renderAvatarSvg('necromancer'); },
        get headSvg() { return renderAvatarHeadSvg('necromancer'); }
    },
    fairy: {
        id: 'fairy',
        color: '#4ade80',
        accent: '#f472b6',
        get svg() { return renderAvatarSvg('fairy'); },
        get headSvg() { return renderAvatarHeadSvg('fairy'); }
    },
    scholar: {
        id: 'scholar',
        color: '#2f4fa0',
        accent: '#fbbf24',
        get svg() { return renderAvatarSvg('scholar'); },
        get headSvg() { return renderAvatarHeadSvg('scholar'); }
    },
    pirate: {
        id: 'pirate',
        color: '#0284c7',
        accent: '#f59e0b',
        get svg() { return renderAvatarSvg('pirate'); },
        get headSvg() { return renderAvatarHeadSvg('pirate'); }
    },
    dragon: {
        id: 'dragon',
        color: '#b91c1c',
        accent: '#f59e0b',
        get svg() { return renderAvatarSvg('dragon'); },
        get headSvg() { return renderAvatarHeadSvg('dragon'); }
    },
    astronaut: {
        id: 'astronaut',
        color: '#f97316',
        accent: '#e2e8f0',
        get svg() { return renderAvatarSvg('astronaut'); },
        get headSvg() { return renderAvatarHeadSvg('astronaut'); }
    }
};

/**
 * Retrouve la configuration prédéfinie d'un personnage via son ID court
 * @param {string} id - ID court (ex: 'elf', 'elf_b', 'elf_g', 'orc', 'orc_b', etc.)
 * @returns {Object|null}
 */
export function getAvatarPresetById(id) {
    if (!id || typeof id !== 'string') return null;
    const cleanId = id.trim().toLowerCase();
    for (const trophy of RPG_TROPHIES) {
        if (trophy.id === cleanId || trophy.shortId === cleanId || trophy.legacyId === cleanId) {
            return trophy.boyPreset;
        }
        if (trophy.boyPreset && (trophy.boyPreset.id === cleanId || cleanId === `${trophy.id}_boy` || cleanId === `${trophy.id}_b`)) {
            return trophy.boyPreset;
        }
        if (trophy.girlPreset && (trophy.girlPreset.id === cleanId || cleanId === `${trophy.id}_girl` || cleanId === `${trophy.id}_g`)) {
            return trophy.girlPreset;
        }
    }
    return null;
}

/**
 * Rend le SVG complet de l'avatar du joueur (personnalisé ou par ID court)
 */
export function renderAvatarSvg(avatarConfigOrId = null) {
    if (typeof avatarConfigOrId === 'object' && avatarConfigOrId !== null) {
        return buildCustomAvatarSvg({ ...avatarConfigOrId, mode: 'full' });
    }
    if (typeof avatarConfigOrId === 'string') {
        const preset = getAvatarPresetById(avatarConfigOrId);
        if (preset) {
            return buildCustomAvatarSvg({ ...preset, mode: 'full' });
        }
        if (avatarConfigOrId === 'boy' || avatarConfigOrId === 'girl') {
            const saved = playerManager ? playerManager.getAvatarConfig() : null;
            if (saved && saved.type === avatarConfigOrId) {
                return buildCustomAvatarSvg({ ...saved, mode: 'full' });
            }
            return buildCustomAvatarSvg({ type: avatarConfigOrId, styleId: 1, mode: 'full' });
        }
    }
    const config = playerManager ? playerManager.getAvatarConfig() : { type: 'boy', styleId: 1 };
    return buildCustomAvatarSvg({ ...config, mode: 'full' });
}

/**
 * Rend le SVG portrait (tête seule) de l'avatar du joueur (personnalisé ou par ID court)
 */
export function renderAvatarHeadSvg(avatarConfigOrId = null, mood = null) {
    if (typeof avatarConfigOrId === 'object' && avatarConfigOrId !== null) {
        return buildCustomAvatarSvg({ ...avatarConfigOrId, mode: 'head', mood });
    }
    if (typeof avatarConfigOrId === 'string') {
        const preset = getAvatarPresetById(avatarConfigOrId);
        if (preset) {
            return buildCustomAvatarSvg({ ...preset, mode: 'head', mood });
        }
        if (avatarConfigOrId === 'boy' || avatarConfigOrId === 'girl') {
            const saved = playerManager ? playerManager.getAvatarConfig() : null;
            if (saved && saved.type === avatarConfigOrId) {
                return buildCustomAvatarSvg({ ...saved, mode: 'head', mood });
            }
            return buildCustomAvatarSvg({ type: avatarConfigOrId, styleId: 1, mode: 'head', mood });
        }
    }
    const config = playerManager ? playerManager.getAvatarConfig() : { type: 'boy', styleId: 1 };
    return buildCustomAvatarSvg({ ...config, mode: 'head', mood });
}
