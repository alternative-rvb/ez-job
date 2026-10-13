/**
 * Trophée 1 : Rôdeur Sylvestre (elfe)
 * Module du trophée : tenue, coupes de cheveux et entrée du registre RPG_TROPHIES.
 */

import { fuseau, SKIN_DEFAULT } from '../../avatar-kit.js';

// Modèle de dague elfique géométriquement parfait et rectiligne (aligné sur l'axe vertical x=0)
const ELF_DAGGER_MODEL = `
    <!-- Pommeau serti d'une émeraude et bague dorée (aligné sur l'axe x=0) -->
    <rect x="-1.5" y="-11.2" width="3" height="1.2" rx="0.4" fill="#fbbf24" stroke="#78350f" stroke-width="0.3"/>
    <circle cx="0" cy="-9.5" r="1.8" fill="#10b981" stroke="#065f46" stroke-width="0.4"/>
    <circle cx="-0.5" cy="-10" r="0.6" fill="#ffffff"/>

    <!-- Poignée tressée en cuir avec spires dorées (alignée sur l'axe x=0) -->
    <rect x="-1.1" y="-7.8" width="2.2" height="7.8" rx="0.4" fill="#451a03"/>
    <line x1="-1.1" y1="-6.2" x2="1.1" y2="-5.7" stroke="#fbbf24" stroke-width="0.5"/>
    <line x1="-1.1" y1="-4.2" x2="1.1" y2="-3.7" stroke="#fbbf24" stroke-width="0.5"/>
    <line x1="-1.1" y1="-2.2" x2="1.1" y2="-1.7" stroke="#fbbf24" stroke-width="0.5"/>

    <!-- Garde dorée ouvragée symétrique à quillons fins (perpendiculaire à l'axe) -->
    <path d="M -5.5,-1.2 C -2.5,0.2 2.5,0.2 5.5,-1.2 C 6,-0.3 6,0.8 5.5,1.2 C 2.5,0.2 -2.5,0.2 -5.5,1.2 C -6,0.8 -6,-0.3 -5.5,-1.2 Z" fill="#fbbf24" stroke="#78350f" stroke-width="0.4"/>
    <polygon points="0,-1.4 1.3,0 0,1.4 -1.3,0" fill="#10b981"/>

    <!-- Lame elfique droite biseautée (acier trempé le long de l'axe x=0) -->
    <!-- Côté gauche ombré -->
    <path d="M 0,1 L -2.2,1 C -2.5,7 -2.5,13 0,23 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="0.3"/>
    <!-- Côté droit lumineux miroir -->
    <path d="M 0,1 L 2.2,1 C 2.5,7 2.5,13 0,23 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="0.3"/>
    <!-- Arête centrale strictement rectiligne -->
    <line x1="0" y1="1" x2="0" y2="23" stroke="#64748b" stroke-width="0.5"/>
    <!-- Éclat magique à la pointe effilée -->
    <polygon points="-0.7,19 0,23.5 0.7,19 0,18" fill="#38bdf8" opacity="0.85"/>
`;

export const OUTFIT_ELF_RANGER = {
    id: 'elf_ranger',
    name: 'Rôdeur Sylvestre (Elfe)',
    badge: 'Trophée 1',
    // Cape sylvestre aux découpes en feuille (sans carquois)
    backEquipment: `
        <g id="outfit-elf-back">
            <!-- Cape sylvestre découpée en feuilles (nettement plus foncée que la tunique émeraude #1b5e52) -->
            <path d="M 33,65 C 25,76 21,96 25,110 C 35,114 42,106 50,111 C 58,106 65,114 75,110 C 79,96 75,76 67,65 Z" fill="#0d332c"/>
            <path d="M 36,68 C 29,80 26,98 31,108 C 40,111 46,104 50,108 C 54,104 60,111 69,108 C 74,98 71,80 64,68 Z" fill="#144b41" opacity="0.85"/>
        </g>`,
    legs: (skin) => `
        <g id="outfit-elf-legs">
            <!-- Pantalon ajusté vert sombre sylvestre -->
            <polygon points="39,85 49,85 48,97 41,97" fill="#133e38"/>
            <polygon points="51,85 61,85 59,97 52,97" fill="#133e38"/>
            <!-- Bottes montantes de rôdeur en cuir patiné -->
            <polygon points="40,96 48.5,96 48,106 41,106" fill="#6d3811"/>
            <polygon points="39.8,98 48.7,98 48.3,99.5 40.2,99.5" fill="#f59e0b"/>
            <path d="M39.5 106 C39.5 104, 49.5 104, 49.5 106 L50 113 C50 115, 39 115, 39 113 Z" fill="#451a03"/>
            <path d="M38.5 112 L50.5 112 L50 114 L39 114 Z" fill="#290f02"/>
            <rect x="42.5" y="107" width="4" height="2" rx="0.8" fill="#f59e0b"/>

            <polygon points="51.5,96 60,96 59,106 52,106" fill="#6d3811"/>
            <polygon points="51.3,98 60.2,98 59.8,99.5 51.7,99.5" fill="#f59e0b"/>
            <path d="M50.5 106 C50.5 104, 60.5 104, 60.5 106 L61 113 C61 115, 50 115, 50 113 Z" fill="#451a03"/>
            <path d="M49.5 112 L61.5 112 L61 114 L50 114 Z" fill="#290f02"/>
            <rect x="53.5" y="107" width="4" height="2" rx="0.8" fill="#f59e0b"/>
        </g>`,
    body: `
        <g id="outfit-elf-body">
            <!-- Tunique d'éclaireur elfe émeraude -->
            <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 62,61.5 C 66,61.5 69,62 69,65 L 63.5,86 L 36.5,86 Z" fill="#1b5e52"/>
            <!-- Plastron en cuir ouvragé souple -->
            <path d="M 36,63 L 64,63 L 60,82 L 40,82 Z" fill="#78350f"/>
            <!-- Bordure dorée du plastron -->
            <path d="${fuseau('M 36,63 C 37.33,69.33 38.67,75.67 40,82', 0.9, 8)} ${fuseau('M 40,82 C 46.67,82 53.33,82 60,82', 0.9, 8)} ${fuseau('M 60,82 C 61.33,75.67 62.67,69.33 64,63', 0.9, 8)}" fill="#f59e0b"/>
            <!-- Lacets dorés du plastron -->
            <path d="${fuseau('M 47,65 C 49,65.67 51,66.33 53,67', 1.31, 8)}" fill="#fbbf24"/>
            <path d="${fuseau('M 53,67 C 51,68 49,69 47,70', 1.3, 8)}" fill="#fbbf24"/>
            <path d="${fuseau('M 47,73 C 49,73.67 51,74.33 53,75', 1.31, 8)}" fill="#fbbf24"/>
            <path d="${fuseau('M 53,75 C 51,76 49,77 47,78', 1.3, 8)}" fill="#fbbf24"/>
            <!-- Col montant émeraude et feuille dorée -->
            <path d="M44 60.5 L50 67 L56 60.5 Z" fill="#10b981"/>
            <path d="M48 60.5 L50 64 L52 60.5 Z" fill="#f59e0b"/>
        </g>`,
    belt: `
        <g id="outfit-elf-belt">
            <!-- Ceinture cuir patiné à boucle feuille elfique -->
            <path d="${fuseau('M 36.1,84.5 C 45.28,86.1 54.72,86.1 63.9,84.5', 6.75, 16)}" fill="#451a03"/>
            <g transform="translate(0 1.2)"><path d="M 46,84.5 C 47,81 53,81 54,84.5 C 53,88 47,88 46,84.5 Z" fill="#f59e0b" stroke="#361702" stroke-width="0.6"/></g>
            <g transform="translate(0 1.2)"><circle cx="50" cy="84.5" r="1.5" fill="#10b981"/></g>
            <!-- Sacoche d'herboriste avec fiole magique suspendue -->
            <g transform="translate(0 0.38)"><rect x="36" y="83" width="5" height="7" rx="1.2" fill="#6d3811" stroke="#361702" stroke-width="0.7"/></g>
            <g transform="translate(0 0.38)"><circle cx="38.5" cy="86" r="0.8" fill="#fbbf24"/></g>
            <!-- Petite fiole en verre vert -->
            <g transform="translate(0 0.45)"><ellipse cx="61" cy="87" rx="2" ry="3" fill="#34d399" opacity="0.85" stroke="#065f46" stroke-width="0.5"/></g>
            <g transform="translate(0 0.45)"><rect x="60" y="83.5" width="2" height="1.5" rx="0.4" fill="#d97706"/></g>
        </g>`,
    arms: (skin) => `
        <g id="outfit-elf-arms">
            <!-- Bras gauche avec manche verte et brassard en cuir -->
            <path d="M32 64 C24 70, 23 77, 28 83 C31 83, 33 80, 35 76 Z" fill="#1b5e52"/>
            <path d="M26 73 C24 76, 25 80, 29 82 C31 81, 32 78, 32 75 Z" fill="#78350f" stroke="#fbbf24" stroke-width="0.6"/>
            <!-- NOTE Main gauche dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
            <!-- Bras droit avec manche verte et brassard en cuir -->
            <path d="M68 64 C76 69, 78 72, 76 79 C73 81, 70 79, 66 75 Z" fill="#1b5e52"/>
            <path d="M72 69 C75 72, 75 76, 73 78 C70 78, 68 75, 68 72 Z" fill="#78350f" stroke="#fbbf24" stroke-width="0.6"/>
            <!-- NOTE Main droite dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->
        </g>`,
    headAccessory: `
        <g id="outfit-elf-head-accessory">
            <!-- Diadème frontal elfique rehaussé avec gemme émeraude -->
            <path d="${fuseau('M 28,26 C 42.42,22.68 57.58,22.68 72,26', 3.8, 14)}" fill="#f59e0b"/>
            <path d="M 45,23 L 50,18 L 55,23 Z" fill="#f59e0b"/>
            <circle cx="50" cy="20.5" r="2.2" fill="#10b981" stroke="#065f46" stroke-width="0.5"/>
            <circle cx="49.3" cy="19.8" r="0.7" fill="#ffffff"/>
        </g>`,
    handItem: (skin = SKIN_DEFAULT) => `
        <g id="outfit-elf-hand-twin-daggers">
            <!-- Dague elfique gauche (main gauche à 29, 84 en garde basse vers le bas-gauche) -->
            <g id="elf-dagger-left" transform="translate(29, 84) rotate(22)">
                ${ELF_DAGGER_MODEL}
                <!-- Doigts de la main gauche refermés sur la poignée -->
                <ellipse cx="0" cy="-3.5" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                <path d="${fuseau('M -1.6,-4.6 C -0.73,-4.6 0.13,-4.6 1,-4.6', 0.65, 8)}" fill="${skin.shadow}"/>
                <path d="${fuseau('M -1.6,-2.6 C -0.73,-2.6 0.13,-2.6 1,-2.6', 0.65, 8)}" fill="${skin.shadow}"/>
            </g>

            <!-- Dague elfique droite (main droite à 76, 78 en garde haute vers le haut-droite) -->
            <g id="elf-dagger-right" transform="translate(76, 78) rotate(-152)">
                ${ELF_DAGGER_MODEL}
                <!-- Doigts de la main droite refermés sur la poignée -->
                <ellipse cx="0" cy="-3.5" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                <path d="${fuseau('M -1.6,-4.6 C -0.73,-4.6 0.13,-4.6 1,-4.6', 0.65, 8)}" fill="${skin.shadow}"/>
                <path d="${fuseau('M -1.6,-2.6 C -0.73,-2.6 0.13,-2.6 1,-2.6', 0.65, 8)}" fill="${skin.shadow}"/>
            </g>
        </g>`
};

export const ELF_STYLES = {
    // Coupe Trophée 1 Garçon : Chevelure longue elfique noble avec mèches affinées et superposées
    elf_boy: {
        id: 'elf_boy',
        name: 'Noble Sylvestre Court (Mèches courtes nuque & épaules)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-elf-boy">
                <!-- Volume de base du crâne arrière -->
                <ellipse cx="50" cy="26" rx="35" ry="30" fill="${color}"/>
                <!-- Chevelure noble courte s'arrêtant aux épaules/nuque -->
                <path d="M 17,34 C 11,22 15,8 25,0 C 35,-6 65,-6 75,0 C 85,8 89,22 83,34 C 85,41 80,46 72,44 C 67,54 60,60 50,62 C 40,60 33,54 28,44 C 27,46 21,41 17,34 Z" fill="${color}"/>
                <!-- Nappe de mèches derrière la nuque, arrêtée au sommet des épaules, bouts pointus à angle obtus -->
                <path d="M 25,40 C 22,50 25,58 29,64 L 33,58 L 37,66 L 42,59 L 46,67 L 50,60 L 54,67 L 58,59 L 63,66 L 67,58 L 71,64 C 75,58 78,50 75,40 Z" fill="${color}"/>
                <!-- Mèches dorsales superposées plus courtes et effilées -->
                <path d="M 28,42 C 24,50 26,58 32,63 C 34,56 34,48 32,42 Z" fill="${color}" opacity="0.95"/>
                <path d="M 72,42 C 76,50 74,58 68,63 C 66,56 66,48 68,42 Z" fill="${color}" opacity="0.95"/>
                <path d="M 43,48 C 42,55 45,61 50,64 C 55,61 58,55 57,48 Z" fill="${color}" opacity="0.9"/>
                <!-- Mèches d'épaule courtes encadrant la nuque -->
                <path d="${fuseau('M 22,37 C 18.5,46 19.5,55 23.5,63', 4.2, 14)}" fill="${color}"/>
                <path d="M 24,42 C 21,48 21,55 25,62 C 27,57 27,51 26,44 Z" fill="${color}"/>
                <path d="${fuseau('M 78,37 C 81.5,46 80.5,55 76.5,63', 4.2, 14)}" fill="${color}"/>
                <path d="M 76,42 C 79,48 79,55 75,62 C 73,57 73,51 74,44 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-elf-boy">
                <!-- Masse crânienne supérieure complète avec mèches fines de tempes -->
                <path d="M 20,30 
                         C 22,14 34,4 50,4 
                         C 66,4 78,14 80,30 
                         C 80,38 78,48 76,54 
                         C 74,46 74,36 75,28 
                         C 73,28 70,25 67,23 
                         C 63,27 59,28 55,22 
                         C 53,16 47,16 45,22 
                         C 41,28 37,27 33,23 
                         C 30,25 27,28 25,28 
                         C 26,36 26,46 24,54 
                         C 22,48 20,38 20,30 Z" fill="${color}"/>
                <!-- Mèches de tempes devant les oreilles : traits en fuseau fins -->
                <path d="${fuseau('M 22,34 C 19,42 20,50 22,58', 2.2, 12)}" fill="${color}"/>
                <path d="${fuseau('M 25,32 C 24,40 25,48 27,54', 1.6, 12)}" fill="${color}"/>
                <path d="${fuseau('M 78,34 C 81,42 80,50 78,58', 2.2, 12)}" fill="${color}"/>
                <path d="${fuseau('M 75,32 C 76,40 75,48 73,54', 1.6, 12)}" fill="${color}"/>
                <!-- Mèches supérieures souples et affinées sur le sommet -->
                <path d="M 34,9 C 40,3 46,-1 50,-2 C 54,-1 60,3 66,9 C 60,6 55,6 50,7 C 45,6 40,6 34,9 Z" fill="${color}"/>
                <path d="M 42,4 C 46,-2 50,-2 54,4 C 52,1 48,1 42,4 Z" fill="#ffffff" opacity="0.3"/>
                <path d="M 37,12 C 43,6 48,3 50,2 C 52,3 57,6 63,12 C 58,9 54,9 50,9.5 C 46,9 42,9 37,12 Z" fill="${color}" opacity="0.9"/>
            </g>`
    },
    // Coupe Trophée 1 Fille : Chevelure longue elfique féerique avec mèches dédoublées affinées
    elf_girl: {
        id: 'elf_girl',
        name: 'Féerique Sylvestre Longue (Mèches fines en cascade)',
        withTiara: false,
        getHairBack: (color) => `
            <g id="hair-back-elf-girl">
                <!-- Volume de base du crâne arrière -->
                <ellipse cx="50" cy="26" rx="35" ry="31" fill="${color}"/>
                <!-- Grande chevelure longue elfique en cascade dans le dos -->
                <path d="M 16,36 C 10,22 14,8 24,0 C 34,-6 66,-6 76,0 C 86,8 90,22 84,36 C 88.5,48 87,62 83.5,72 C 80,66 77,62 75,56 C 69,72 63,90 50,92 C 37,90 31,72 25,56 C 23,62 20,66 16.5,72 C 13.5,62 11.5,48 16,36 Z" fill="${color}"/>
                <!-- Mèches dorsales superposées plus fines et effilées -->
                <path d="M 26,44 C 21,58 23,74 29,88 C 32,76 32,62 31,48 Z" fill="${color}" opacity="0.95"/>
                <path d="M 74,44 C 79,58 77,74 71,88 C 68,76 68,62 69,48 Z" fill="${color}" opacity="0.95"/>
                <path d="M 38,50 C 35,64 38,78 42,90 C 44,78 43,64 41,52 Z" fill="${color}" opacity="0.9"/>
                <path d="M 62,50 C 65,64 62,78 58,90 C 56,78 57,64 59,52 Z" fill="${color}" opacity="0.9"/>
                <!-- Tresse centrale effilée -->
                <path d="M 46,58 C 45,70 48,82 50,93 C 52,82 55,70 54,58 Z" fill="${color}" opacity="0.85"/>
                <!-- Mèches d'épaule gauche plus fines dédoublées en cascade (la plus extérieure en fuseau) -->
                <path d="${fuseau('M 20,40 C 16,52 15.5,66 18.5,78', 3.4, 14)}" fill="${color}"/>
                <path d="M 23,44 C 18,54 18,68 23,82 C 26,80 27,70 27,60 C 28,52 26,46 23,44 Z" fill="${color}"/>
                <path d="M 26,48 C 24,58 25,70 28,84 C 30,82 31,72 30,62 C 30,54 28,48 26,48 Z" fill="${color}" opacity="0.85"/>
                <!-- Mèches d'épaule droite plus fines dédoublées en cascade -->
                <path d="${fuseau('M 80,40 C 84,52 84.5,66 81.5,78', 3.4, 14)}" fill="${color}"/>
                <path d="M 77,44 C 82,54 82,68 77,82 C 74,80 73,70 73,60 C 72,52 74,46 77,44 Z" fill="${color}"/>
                <path d="M 74,48 C 76,58 75,70 72,84 C 70,82 69,72 70,62 C 70,54 72,48 74,48 Z" fill="${color}" opacity="0.85"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-elf-girl">
                <!-- Masse crânienne supérieure avec frange longue et pointue -->
                <path d="M 20,30 
                         C 22,14 34,4 50,4 
                         C 66,4 78,14 80,30 
                         C 80,38 78,48 76,56 
                         C 74,48 74,38 75,28 
                         C 73,30 68,34 64,33 
                         C 60,32 58,28 57,25 
                         C 55,30 52,36 47,37 
                         C 43,33 42,28 41,25 
                         C 39,29 36,34 32,35 
                         C 29,32 27,29 25,28 
                         C 26,38 26,48 24,56 
                         C 22,48 20,38 20,30 Z" fill="${color}"/>
                <!-- Mèches de tempes devant les oreilles : traits en fuseau fins -->
                <path d="${fuseau('M 22,34 C 19,42 20,52 23,60', 2.2, 12)}" fill="${color}"/>
                <path d="${fuseau('M 26,32 C 24,42 25,50 27,56', 1.6, 12)}" fill="${color}"/>
                <path d="${fuseau('M 78,34 C 81,42 80,52 77,60', 2.2, 12)}" fill="${color}"/>
                <path d="${fuseau('M 74,32 C 76,42 75,50 73,56', 1.6, 12)}" fill="${color}"/>
                <!-- Reflet du sommet, identique au garçon elfe -->
                <path d="M 42,4 C 46,-2 50,-2 54,4 C 52,1 48,1 42,4 Z" fill="#ffffff" opacity="0.3"/>
            </g>`
    },
};

export const ELF_TROPHY = {
    id: 'elf',
    shortId: 'elf',
    legacyId: 'trophy_elf_ranger',
    number: 1,
    title: "L'Éveil Sylvestre",
    species: 'elf',
    speciesName: 'Elfe',
    className: 'Rôdeur Sylvestre',
    badge: 'Nouveau',
    // ANCHOR Invocation : rareté de la carte (taux de tirage) et éléments ajoutés à l'atelier une fois gagnée
    rarity: 'épique',
    unlocks: {
        species: 'elf',
        skins: [],
        hairs: ['#14b8a6', '#38bdf8', '#a855f7'],
        eyes: ['emerald'],
        styles: { boy: 'elf_boy', girl: 'elf_girl' },
        outfit: 'elf_ranger',
        label: 'Elfe'
    },
    tagline: 'Maître rôdeur aux dagues jumelles et sens aiguisés',
    description: "Premier trophée d'élite : débloque la lignée des Elfes, leur coupe signature, leurs dagues jumelles et la panoplie sylvestre.",
    rewards: [
        { icon: 'bi-feather', label: "Espèce : Elfe (Oreilles pointues sylvestres)" },
        { icon: 'bi-shield-shaded', label: "Classe : Rôdeur Sylvestre" },
        { icon: 'bi-scissors', label: "Coupes exclusives : Pics sur le dessus (G) / Garçonne mèche longue (F)" },
        { icon: 'bi-gem', label: "Armes & Tête : Double dague elfique ciselée & Diadème émeraude rehaussé" },
        { icon: 'bi-person-bounding-box', label: "Tenue : Tunique d'éclaireur en lin vert & plastron cuir ouvragé" },
        { icon: 'bi-palette', label: "Teintes débloquées : Peau Porcelaine diaphane & Yeux Vert Émeraude" }
    ],
    boyPreset: {
        id: 'elf_b',
        type: 'boy',
        styleKey: 'elf_boy',
        styleId: 1,
        outfitKey: 'elf_ranger',
        species: 'elf',
        skinColor: 'pale',
        hairColor: '#14b8a6', // Turquoise Féerique (teinte lumineuse contrastant avec la peau porcelaine)
        eyeColor: 'emerald'
    },
    girlPreset: {
        id: 'elf_g',
        type: 'girl',
        styleKey: 'elf_girl',
        styleId: 1,
        outfitKey: 'elf_ranger',
        species: 'elf',
        skinColor: 'pale',
        hairColor: '#14b8a6', // Turquoise Féerique (identique, parité stricte)
        eyeColor: 'emerald'
    }
};
