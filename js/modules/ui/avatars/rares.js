/**
 * Module des Avatars Rares : Déclinaisons de couleurs des personnages de base
 * 18 personnages rares qui n'apportent que de nouvelles teintes de cheveux et d'yeux exclusives,
 * complétant le pool du gacha (ratio 60 % Rare / 30 % Épique / 10 % Légendaire).
 */

export const RARE_TROPHIES_DATA = [
    // --- GROUPE TENUE 1 : Aventurier Solaire & Sarcelle (Blanc, Sarcelle #489e96, Orange #ff9d00, Or) ---
    {
        id: 'rare_mint',
        shortId: 'rare_mint',
        number: 13,
        title: "L'Aventurier Menthe",
        tagline: "Fraîcheur boréale et reflets menthe en accord avec la veste sarcelle !",
        hairColor: '#2dd4bf',
        hairName: 'Menthe Givrée',
        eyeColor: 'mint',
        eyeName: 'Menthe Givrée',
        skinColor: 'dark',
        styleId: 1,
        outfitId: 1
    },
    {
        id: 'rare_peach',
        shortId: 'rare_peach',
        number: 14,
        title: "L'Aventurier Pêche",
        tagline: "Éclat fruité et chaleur estivale en harmonie avec le foulard solaire !",
        hairColor: '#fb923c',
        hairName: 'Pêche Veloutée',
        eyeColor: 'topaz',
        eyeName: 'Topaze Dorée',
        skinColor: 'pale',
        styleId: 2,
        outfitId: 1
    },
    {
        id: 'rare_cyan',
        shortId: 'rare_cyan',
        number: 15,
        title: "L'Aventurier Cyan",
        tagline: "Lagons étincelants et reflets d'azur sublimant les revers sarcelle !",
        hairColor: '#06b6d4',
        hairName: 'Cyan Glacé',
        eyeColor: 'ice-cyan',
        eyeName: 'Cyan Glacé',
        skinColor: 'brown',
        styleId: 3,
        outfitId: 1
    },
    {
        id: 'rare_citrine',
        shortId: 'rare_citrine',
        number: 16,
        title: "L'Aventurier Citrine",
        tagline: "Rayonnement blond platine et boucle d'or scintillante de l'explorateur !",
        hairColor: '#fef08a',
        hairName: 'Blond Platine',
        eyeColor: 'citrine',
        eyeName: 'Citrine Lumineuse',
        skinColor: 'tan',
        styleId: 4,
        outfitId: 1
    },

    // --- GROUPE TENUE 2 : Guerrier & Ninja (Acier poli #cbd5e1, Noir shinobi, Rouge cramoisi #b91c1c, Rubis #ef4444) ---
    {
        id: 'rare_garnet',
        shortId: 'rare_garnet',
        number: 17,
        title: "L'Aventurier Grenat",
        tagline: "Flamme rouge grenat en parfait accord avec le rubis de l'armure et les liens shinobi !",
        hairColor: '#991b1b',
        hairName: 'Rouge Grenat',
        eyeColor: 'garnet',
        eyeName: 'Grenat Flamboyant',
        skinColor: 'pale',
        styleId: 1,
        outfitId: 2
    },
    {
        id: 'rare_silver',
        shortId: 'rare_silver',
        number: 18,
        title: "L'Aventurier Argent",
        tagline: "Éclat polaire étincelant en osmose avec la cuirasse d'acier et la lame miroir !",
        hairColor: '#e2e8f0',
        hairName: 'Argent Polaire',
        eyeColor: 'platinum',
        eyeName: 'Gris Platine',
        skinColor: 'golden',
        styleId: 2,
        outfitId: 2
    },
    {
        id: 'rare_sapphire',
        shortId: 'rare_sapphire',
        number: 19,
        title: "L'Aventurier Saphir",
        tagline: "Profondeur abyssale et regard d'azur rehaussant les plaques d'acier ardoise !",
        hairColor: '#1e3a8a',
        hairName: 'Bleu Saphir',
        eyeColor: 'sapphire',
        eyeName: 'Bleu Saphir',
        skinColor: 'light',
        styleId: 3,
        outfitId: 2
    },
    {
        id: 'rare_berry',
        shortId: 'rare_berry',
        number: 20,
        title: "L'Aventurier Framboise",
        tagline: "Nuance rubis sauvage résonnant avec les dorures et mailles martiales !",
        hairColor: '#be185d',
        hairName: 'Framboise Sauvage',
        eyeColor: 'wild-berry',
        eyeName: 'Framboise Sauvage',
        skinColor: 'tan',
        styleId: 4,
        outfitId: 2
    },
    {
        id: 'rare_indigo',
        shortId: 'rare_indigo',
        number: 21,
        title: "L'Aventurier Indigo",
        tagline: "Nuit sans lune et reflets d'encre étoilée épousant l'armure d'ombre shinobi !",
        hairColor: '#3730a3',
        hairName: 'Indigo Nuit',
        eyeColor: 'night-indigo',
        eyeName: 'Indigo Nuit',
        skinColor: 'dark',
        styleId: 1,
        outfitId: 2
    },

    // --- GROUPE TENUE 3 : Mage & Sorcière (Violet améthyste #4c1d95, Pourpre nuit #2e1065, Or astral #fbbf24, Lilas) ---
    {
        id: 'rare_imperial',
        shortId: 'rare_imperial',
        number: 22,
        title: "L'Aventurier Pourpre",
        tagline: "Majesté royale et pourpre impérial dans la continuité des robes d'arcanes !",
        hairColor: '#6b21a8',
        hairName: 'Pourpre Impérial',
        eyeColor: 'imperial-purple',
        eyeName: 'Pourpre Impérial',
        skinColor: 'golden',
        styleId: 2,
        outfitId: 3
    },
    {
        id: 'rare_lavender',
        shortId: 'rare_lavender',
        number: 23,
        title: "L'Aventurier Lavande",
        tagline: "Douceur pastel et brume féerique illuminant les velours mystiques et les astres d'or !",
        hairColor: '#c4b5fd',
        hairName: 'Lavande Pastel',
        eyeColor: 'lavender',
        eyeName: 'Lavande Douce',
        skinColor: 'brown',
        styleId: 3,
        outfitId: 3
    },
    {
        id: 'rare_sakura',
        shortId: 'rare_sakura',
        number: 24,
        title: "L'Aventurier Sakura",
        tagline: "Pétales enchantés et rose bonbon vibrant auprès des orbes lilas du sceptre !",
        hairColor: '#f472b6',
        hairName: 'Rose Bonbon',
        eyeColor: 'pink-blush',
        eyeName: 'Rose Poudré',
        skinColor: 'light',
        styleId: 4,
        outfitId: 3
    },
    {
        id: 'rare_ash',
        shortId: 'rare_ash',
        number: 25,
        title: "L'Aventurier Cendré",
        tagline: "Élégance subtile et châtain poudré de brume sous le bandeau magique des sages !",
        hairColor: '#57534e',
        hairName: 'Châtain Cendré',
        eyeColor: 'ash-grey',
        eyeName: 'Gris Cendré',
        skinColor: 'pale',
        styleId: 1,
        outfitId: 3
    },

    // --- GROUPE TENUE 4 : Archer & Archère (Vert émeraude / forêt #16a34a, Cuir fauve #78350f, Lacets or, Arc bois) ---
    {
        id: 'rare_forest',
        shortId: 'rare_forest',
        number: 26,
        title: "L'Aventurier Forêt",
        tagline: "Canopée profonde et vert jade en symbiose avec la tunique de rôdeur sylvestre !",
        hairColor: '#14532d',
        hairName: 'Vert Forêt',
        eyeColor: 'deep-jade',
        eyeName: 'Jade Sombre',
        skinColor: 'light',
        styleId: 2,
        outfitId: 4
    },
    {
        id: 'rare_copper',
        shortId: 'rare_copper',
        number: 27,
        title: "L'Aventurier Cuivre",
        tagline: "Feu cuivré flamboyant contrastant magnifiquement sur la parure émeraude et le cuir !",
        hairColor: '#ea580c',
        hairName: 'Cuivre Flamboyant',
        eyeColor: 'copper',
        eyeName: 'Ambre Cuivré',
        skinColor: 'pale',
        styleId: 3,
        outfitId: 4
    },
    {
        id: 'rare_cacao',
        shortId: 'rare_cacao',
        number: 28,
        title: "L'Aventurier Moka",
        tagline: "Terre cuite ancestrale et brun moka rappelant le bois noble de l'arc et les lanières !",
        hairColor: '#291810',
        hairName: 'Brun Moka',
        eyeColor: 'warm-hazel',
        eyeName: 'Noisette Moka',
        skinColor: 'golden',
        styleId: 4,
        outfitId: 4
    },
    {
        id: 'rare_honey',
        shortId: 'rare_honey',
        number: 29,
        title: "L'Aventurier Ambre",
        tagline: "Rayons de miel doré et ambre chaleureux sublimant les feuillages d'automne !",
        hairColor: '#b45309',
        hairName: 'Ambre Chaud',
        eyeColor: 'amber-glow',
        eyeName: 'Ambre Chaud',
        skinColor: 'dark',
        styleId: 1,
        outfitId: 4
    },
    {
        id: 'rare_coral',
        shortId: 'rare_coral',
        number: 30,
        title: "L'Aventurier Corail",
        tagline: "Fraîcheur florale et rose corail des clairières printanières sur cuir fauve !",
        hairColor: '#fb7185',
        hairName: 'Rose Corail',
        eyeColor: 'coral',
        eyeName: 'Rose Corail',
        skinColor: 'brown',
        styleId: 2,
        outfitId: 4
    }
];

const OUTFIT_HARMONY_NAMES = {
    1: "Aventurier Solaire (Classique)",
    2: "Guerrier & Ninja (Acier & Ombre)",
    3: "Mage & Sorcière (Arcanes Pourpres)",
    4: "Archer & Archère (Rôdeur Sylvestre)"
};

function createRareTrophy(data) {
    const outfitLabel = OUTFIT_HARMONY_NAMES[data.outfitId] || "Aventurier";
    return {
        id: data.id,
        shortId: data.shortId,
        legacyId: `trophy_${data.id}`,
        number: data.number,
        title: data.title,
        species: 'human',
        speciesName: 'Humain',
        className: 'Aventurier (Variante Rare)',
        badge: 'Nouveau',
        rarity: 'rare',
        isBaseVariant: true,
        tagline: data.tagline,
        description: `Variante rare harmonisée avec la tenue ${outfitLabel} : débloque la teinte de cheveux exclusive ${data.hairName} et les yeux ${data.eyeName}.`,
        rewards: [
            { icon: 'bi-shield-shaded', label: `Tenue harmonisée : ${outfitLabel}` },
            { icon: 'bi-palette', label: `Teinte débloquée : Cheveux ${data.hairName}` },
            { icon: 'bi-eye', label: `Teinte débloquée : Yeux ${data.eyeName}` }
        ],
        unlocks: {
            species: null,
            skins: [],
            hairs: [data.hairColor],
            eyes: [data.eyeColor],
            styles: {},
            outfit: null,
            label: data.title
        },
        boyPreset: {
            id: `r${data.number}_b`,
            type: 'boy',
            styleId: data.styleId,
            styleKey: null,
            outfitId: data.outfitId,
            outfitKey: null,
            species: 'human',
            skinColor: data.skinColor,
            hairColor: data.hairColor,
            eyeColor: data.eyeColor
        },
        girlPreset: {
            id: `r${data.number}_g`,
            type: 'girl',
            styleId: data.styleId,
            styleKey: null,
            outfitId: data.outfitId,
            outfitKey: null,
            species: 'human',
            skinColor: data.skinColor,
            hairColor: data.hairColor,
            eyeColor: data.eyeColor
        }
    };
}

export const RARE_TROPHIES = RARE_TROPHIES_DATA.map(createRareTrophy);
