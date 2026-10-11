# Modèles de code d'un trophée skin

Modèles tirés des trophées `elf` et `orc` de `js/modules/ui/avatars.js`. Remplacer `<id>`, `<NOM>` et les valeurs entre chevrons.

## Teintes débloquées (catalogues `ALL_*`)

```js
// ALL_SKIN_COLORS : la bouche est la peau en BEAUCOUP plus foncé
{ id: '<espece>-<teinte>', name: '<Nom affiché>', base: '#......', shadow: '#......', mouth: '#......', isTrophyReward: true },

// ALL_EYE_COLORS : dark en haut de l'iris, light en bas
{ id: '<teinte>', name: '<Nom affiché>', dark: '#......', light: '#......', isTrophyReward: true },

// ALL_HAIR_COLORS : contraste franc avec la peau du preset
{ id: '<teinte>', name: '<Nom affiché>', hex: '#......', isTrophyReward: true },
```

Avant d'ajouter une teinte, vérifier qu'elle n'existe pas déjà dans le catalogue (plusieurs teintes de cheveux sont déjà prêtes : `silver`, `blue-night`, `ruby`, `sakura`, `purple`).

## Coupe exclusive (`RPG_STYLES`)

```js
<id>_boy: {
    id: '<id>_boy',
    name: '<Nom de la coupe>',
    withBand: false,
    getHairBack: (color) => `
        <g id="hair-back-<id>-boy">
            <!-- ANCHOR Socle universel : ne pas descendre sous y=57 -->
            <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
            <!-- Blocs larges : ellipses douces ou pointes à angle obtus -->
        </g>`,
    getHairFront: (color) => `
        <g id="hair-front-<id>-boy">
            <!-- Calotte qui couvre le front, mèches larges, oreilles visibles de face -->
        </g>`
},
```

La version fille (`<id>_girl`) suit le même schéma avec `withTiara: false`.

## Tenue (`OUTFIT_<NOM>` puis `RPG_OUTFITS`)

```js
export const OUTFIT_<NOM> = {
    id: '<id>_<classe>',
    name: '<Classe> (<Espèce>)',
    badge: 'Trophée <n>',
    // Cape : même famille que body, 25 à 40 % plus foncée
    backEquipment: `<g id="outfit-<id>-back">...</g>`,
    // Fonction (skin) => string dès qu'une partie de peau est visible
    legs: (skin) => `<g id="outfit-<id>-legs">...</g>`,
    body: (skin) => `<g id="outfit-<id>-body">...</g>`,
    belt: `<g id="outfit-<id>-belt">...</g>`,
    arms: (skin) => `<g id="outfit-<id>-arms">...</g>`,
    headAccessory: `<g id="outfit-<id>-head">...</g>`,
    // Arme modélisée sur l'axe X=0 puis placée par transform
    handItem: (skin) => `
        <g id="outfit-<id>-weapon" transform="translate(x, y) rotate(angle)">...</g>`
};

export const RPG_OUTFITS = {
    elf_ranger: OUTFIT_ELF_RANGER,
    orc_berserker: OUTFIT_ORC_BERSERKER,
    <id>_<classe>: OUTFIT_<NOM>
};
```

`RPG_OUTFITS` est déclaré après les tenues : toute nouvelle `OUTFIT_*` doit être définie au-dessus.

## Trait d'espèce

```js
// getSpeciesEars() : nouvelle branche avant le return humain par défaut
if (species === '<espece>') {
    return `
        <g id="${gender}-ears-<espece>">
            <!-- Deux aplats imbriqués skin.base puis skin.shadow, tracé Q, sans stroke -->
        </g>
    `;
}
```

Pour les dents (crocs, canines), ajouter un bloc `${species === '<espece>' ? `...` : ''}` dans `faceFeatures` de `BOY_BASE` **et** de `GIRL_BASE`, sans contour.

## Entrée `RPG_TROPHIES`

```js
{
    id: '<id>',
    shortId: '<id>',
    legacyId: 'trophy_<id>_<classe>',
    number: <n>,
    title: '<Titre du trophée>',
    species: '<espece>',
    speciesName: '<Espèce>',
    className: '<Classe>',
    badge: 'Nouveau',
    tagline: '<Accroche courte>',
    description: "<Ce que débloque le trophée>",
    rewards: [
        { icon: 'bi-feather', label: 'Espèce : ...' },
        { icon: 'bi-shield-shaded', label: 'Classe : ...' },
        { icon: 'bi-scissors', label: 'Coupes exclusives : ... (G) / ... (F)' },
        { icon: 'bi-slash-square', label: 'Arme : ...' },
        { icon: 'bi-person-bounding-box', label: 'Tenue : ...' },
        { icon: 'bi-palette', label: 'Teintes débloquées : ...' }
    ],
    boyPreset: {
        id: '<prefixe>_b', type: 'boy', styleKey: '<id>_boy', styleId: 1,
        outfitKey: '<id>_<classe>', species: '<espece>',
        skinColor: '<id peau>', hairColor: '#......', eyeColor: '<id yeux>'
    },
    girlPreset: {
        id: '<prefixe>_g', type: 'girl', styleKey: '<id>_girl', styleId: 1,
        outfitKey: '<id>_<classe>', species: '<espece>',
        skinColor: '<id peau>', hairColor: '#......', eyeColor: '<id yeux>'
    }
}
```

Les presets garçon et fille partagent exactement `skinColor`, `hairColor` et `eyeColor`. Penser à mettre à jour `AVATAR_SHORT_IDS` et les couleurs `color`/`accent` de `AVATARS.<id>`.
