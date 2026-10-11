/**
 * Trophée 2 : Berserker des Steppes (orc)
 * Module du trophée : tenue, coupes de cheveux et entrée du registre RPG_TROPHIES.
 */

import { fuseau } from '../../avatar-kit.js';

export const OUTFIT_ORC_BERSERKER = {
    id: 'orc_berserker',
    name: 'Berserker des Steppes (Orc)',
    badge: 'Trophée 2',
    // Cape / col en fourrure de loup sauvage sur les épaules
    backEquipment: `
        <g id="outfit-orc-back">
            <!-- Col et cape de fourrure de bête sauvage -->
            <path d="M 28,64 C 18,74 15,92 18,106 C 28,110 38,104 50,108 C 62,104 72,110 82,106 C 85,92 82,74 72,64 Z" fill="#381c0c"/>
            <path d="${fuseau('M 24,70 C 22.33,74 20.67,78 19,82', 1.6, 8)} ${fuseau('M 19,82 C 21.67,81.33 24.33,80.67 27,80', 1.61, 8)} ${fuseau('M 27,80 C 25,84.67 23,89.33 21,94', 1.61, 8)} ${fuseau('M 21,94 C 24,92.67 27,91.33 30,90', 1.59, 8)} ${fuseau('M 30,90 C 28.33,94.67 26.67,99.33 25,104', 1.59, 8)} ${fuseau('M 25,104 C 28,102 31,100 34,98', 1.6, 8)}" fill="#542b13"/>
            <path d="${fuseau('M 76,70 C 77.67,74 79.33,78 81,82', 1.6, 8)} ${fuseau('M 81,82 C 78.33,81.33 75.67,80.67 73,80', 1.61, 8)} ${fuseau('M 73,80 C 75,84.67 77,89.33 79,94', 1.61, 8)} ${fuseau('M 79,94 C 76,92.67 73,91.33 70,90', 1.59, 8)} ${fuseau('M 70,90 C 71.67,94.67 73.33,99.33 75,104', 1.59, 8)} ${fuseau('M 75,104 C 72,102 69,100 66,98', 1.6, 8)}" fill="#542b13"/>
        </g>`,
    legs: (skin) => `
        <g id="outfit-orc-legs">
            <!-- Pantalon de cuir barbare sombre -->
            <polygon points="39,85 49,85 48,98 41,98" fill="#262626"/>
            <polygon points="51,85 61,85 59,98 52,98" fill="#262626"/>
            <!-- Guêtres en fourrure aux mollets -->
            <rect x="40" y="96" width="8.5" height="4.5" rx="1.5" fill="#542b13"/>
            <rect x="51.5" y="96" width="8.5" height="4.5" rx="1.5" fill="#542b13"/>
            <!-- Grosses bottes lourdes renforcées de fer -->
            <polygon points="40,99 48.5,99 48,106 41,106" fill="#171717"/>
            <path d="M39.5 106 C39.5 104, 49.5 104, 49.5 106 L50 113 C50 115, 39 115, 39 113 Z" fill="#171717"/>
            <path d="M38.5 112 L50.5 112 L50 114 L39 114 Z" fill="#09090b"/>
            <rect x="42" y="106.5" width="5" height="2" rx="0.5" fill="#94a3b8" stroke="#475569" stroke-width="0.5"/>

            <polygon points="51.5,99 60,99 59,106 52,106" fill="#171717"/>
            <path d="M50.5 106 C50.5 104, 60.5 104, 60.5 106 L61 113 C61 115, 50 115, 50 113 Z" fill="#171717"/>
            <path d="M49.5 112 L61.5 112 L61 114 L50 114 Z" fill="#09090b"/>
            <rect x="53" y="106.5" width="5" height="2" rx="0.5" fill="#94a3b8" stroke="#475569" stroke-width="0.5"/>
        </g>`,
    body: (skin) => `
        <g id="outfit-orc-body">
            <!-- Torse musclé à carnation orc apparente -->
            <path d="M 31,65 C 31,62 34,61.5 38,61.5 L 62,61.5 C 66,61.5 69,62 69,65 L 63.5,86 L 36.5,86 Z" fill="${skin.base}"/>
            <!-- Harnais de combat en lanières de cuir croisées (extrémités ajustées à fleur d'épaule et de taille) -->
            <path d="M 33.5,63.0 C 35,62.0 36.8,61.6 38.5,61.5 L 62.5,83.0 L 58.5,85.0 L 33.5,63.0 Z" fill="#451a03"/>
            <path d="M 66.5,63.0 C 65,62.0 63.2,61.6 61.5,61.5 L 37.5,83.0 L 41.5,85.0 L 66.5,63.0 Z" fill="#451a03"/>
            <!-- Rivets d'acier sur le harnais -->
            <circle cx="36" cy="67" r="1.2" fill="#cbd5e1" stroke="#334155" stroke-width="0.5"/>
            <circle cx="64" cy="67" r="1.2" fill="#cbd5e1" stroke="#334155" stroke-width="0.5"/>
            <!-- Crâne / Totem d'os central sculpté -->
            <path d="M 46,71 L 54,71 L 53,78 L 50,81 L 47,78 Z" fill="#fef3c7" stroke="#78350f" stroke-width="0.8"/>
            <circle cx="48.5" cy="74" r="1" fill="#78350f"/>
            <circle cx="51.5" cy="74" r="1" fill="#78350f"/>
            <line x1="48.5" y1="77" x2="51.5" y2="77" stroke="#78350f" stroke-width="0.7"/>
            <!-- Épaulette d'os gauche -->
            <path d="M 30,64 C 27,61 27,57 32,59 C 35,60 36,63 33,66 Z" fill="#fef3c7" stroke="#78350f" stroke-width="0.6"/>
        </g>`,
    belt: `
        <g id="outfit-orc-belt">
            <!-- Large ceinture barbare cloutée avec pagne en fourrure -->
            <path d="${fuseau('M 36.2,84.75 C 45.31,86.35 54.69,86.35 63.8,84.75', 8.78, 16)}" fill="#292524"/>
            <!-- Rivets en fer forgé -->
            <g transform="translate(0 0.29)"><circle cx="38" cy="84.8" r="1" fill="#94a3b8"/></g>
            <g transform="translate(0 0.8)"><circle cx="42" cy="84.8" r="1" fill="#94a3b8"/></g>
            <g transform="translate(0 0.8)"><circle cx="58" cy="84.8" r="1" fill="#94a3b8"/></g>
            <g transform="translate(0 0.29)"><circle cx="62" cy="84.8" r="1" fill="#94a3b8"/></g>
            <!-- Boucle de ceinture discrète : simple rivet rond au centre, dans la série des rivets voisins -->
            <g transform="translate(0 1.2)"><circle cx="50" cy="84.8" r="1" fill="#94a3b8"/></g>
            <!-- Pagne en lambeaux de cuir et fourrure -->
            <g transform="translate(0 1.2)"><polygon points="44,88 56,88 53,95 47,95" fill="#451a03"/></g>
            <g transform="translate(0 1.2)"><polygon points="46,88 54,88 50,94" fill="#542b13"/></g>
        </g>`,
    arms: (skin) => `
        <g id="outfit-orc-arms">
            <!-- NOTE Bras nus : l'orc ne porte aucun brassard, la carnation verte reste apparente jusqu'au poignet -->
            <!-- Bras orc gauche -->
            <path d="M32 64 C24 70, 23 77, 28 83 C31 83, 33 80, 35 76 Z" fill="${skin.base}"/>
            <!-- NOTE Main gauche dessinée une seule fois, dans handItem, refermée au premier plan sur la poignée -->

            <!-- Bras orc droit -->
            <path d="M68 64 C76 69, 78 72, 76 79 C73 81, 70 79, 66 75 Z" fill="${skin.base}"/>
            <ellipse cx="76" cy="78" rx="3.8" ry="3.5" fill="${skin.base}"/>
            <!-- NOTE Séparations des doigts en fuseau -->
            <path d="${fuseau('M 75,78.3 C 74.8,79.18 74.74,80.1 74.8,81', 0.64, 8)} ${fuseau('M 77,78.3 C 77.2,79.18 77.26,80.1 77.2,81', 0.64, 8)}" fill="${skin.shadow}"/>
        </g>`,
    headAccessory: `
        <g id="outfit-orc-head-accessory">
            <!-- Diadème / Bandeau de guerre en cuir barbare rehaussé sur le haut du front -->
            <path d="${fuseau('M 26,17 C 41.77,13.67 58.23,13.67 74,17', 4.4, 14)}" fill="#451a03"/>
            <!-- Trophée de guerre : crâne d'os au centre du bandeau, mâchoire posée sur le cuir -->
            <g transform="translate(50 20.4) scale(1.3) translate(-50 -20.4)">
            <path d="M 45,13.5 C 45,8.2 47.3,6 50,6 C 52.7,6 55,8.2 55,13.5 C 55,15.2 54.2,16 53.2,16.4 L 53.2,19.4 C 53.2,20.1 52.7,20.4 52.2,20.4 L 47.8,20.4 C 47.3,20.4 46.8,20.1 46.8,19.4 L 46.8,16.4 C 45.8,16 45,15.2 45,13.5 Z" fill="#fef3c7" stroke="#78350f" stroke-width="0.6"/>
            <!-- Orbites -->
            <ellipse cx="47.6" cy="12.2" rx="1.55" ry="1.85" fill="#1c0a02"/>
            <ellipse cx="52.4" cy="12.2" rx="1.55" ry="1.85" fill="#1c0a02"/>
            <!-- Nez -->
            <path d="M 50,14.4 L 49.2,16 L 50.8,16 Z" fill="#1c0a02"/>
            <!-- Dents -->
            <path d="M 48.2,17.6 L 48.2,20 M 50,17.6 L 50,20.2 M 51.8,17.6 L 51.8,20" stroke="#78350f" stroke-width="0.45" fill="none"/>
            <!-- Reflet -->
            <path d="M 46.6,9.6 C 47.1,8.2 48,7.4 49,7.1" stroke="#ffffff" stroke-width="0.5" fill="none" stroke-linecap="round" opacity="0.7"/>
            </g>
        </g>`,
    handItem: (skin = { base: '#659b5e', shadow: '#4d7c47' }) => `
        <g id="outfit-orc-hand-axe">
            <!-- Hache de guerre berserker orc en pierre taillée (silex brut et ligatures de cuir) -->
            <!-- Manche en bois lourd noueux -->
            <line x1="20" y1="36" x2="33" y2="114" stroke="#451a03" stroke-width="3.2" stroke-linecap="round"/>
            <line x1="20" y1="36" x2="33" y2="114" stroke="#78350f" stroke-width="1.8" stroke-linecap="round"/>

            <!-- Bague en os et pointe supérieure du manche -->
            <rect x="18.5" y="37" width="4" height="2.5" rx="0.6" fill="#b91c1c"/>
            <polygon points="19,37 20.5,31 22,37" fill="#fef3c7" stroke="#78350f" stroke-width="0.6"/>

            <!-- Tête de hache en pierre taillée : tranchant orienté vers l'avant/extérieur gauche -->
            <!-- Corps massif de la pierre de silex taillée -->
            <path d="M 6,38 
                     C 3,44 1,52 4,60 
                     C 6,64 12,62 16,58 
                     L 22,54 
                     L 27,53 
                     L 28,47 
                     L 22,44 
                     L 16,41 
                     C 12,38 8,36 6,38 Z" 
                  fill="#334155" stroke="#0f172a" stroke-width="0.9" stroke-linejoin="round"/>

            <!-- Biseau du tranchant en pierre taillée (arc de cercle orienté vers l'avant) -->
            <path d="M 6,38 
                     C 3,44 1,52 4,60 
                     L 8,56 
                     C 5,50 5,45 9,41 Z" 
                  fill="#64748b" stroke="#1e293b" stroke-width="0.6"/>

            <!-- Facettes rocheuses et éclats de pierre 3D -->
            <polygon points="9,41 6,38 13,40" fill="#94a3b8" opacity="0.9"/>
            <polygon points="4,48 1.5,52 5,54" fill="#94a3b8" opacity="0.9"/>
            <polygon points="8,56 4,60 11,58" fill="#cbd5e1" opacity="0.9"/>
            <polygon points="14,46 19,43 18,50" fill="#475569"/>
            <polygon points="14,48 18,52 13,54" fill="#1e293b"/>
            <!-- Encoches d'impact sur le silex -->
            <line x1="3" y1="46" x2="6" y2="47.5" stroke="#0f172a" stroke-width="0.7"/>
            <line x1="2.5" y1="54" x2="5.5" y2="54.5" stroke="#0f172a" stroke-width="0.7"/>

            <!-- Talon de pierre à l'arrière du manche (vers la droite) -->
            <polygon points="22,44 27,47 27,53 22,54" fill="#475569" stroke="#1e293b" stroke-width="0.7"/>
            <polygon points="23,46 26.5,47.5 26.5,52 23,52" fill="#64748b"/>

            <!-- Ligature de la pierre : cuir enroulé serré autour du manche, tours de cordelette rouge en biais, nœud et deux brins pendants -->
            <!-- NOTE Groupe centré sur le manche (x=22.17 à y=49) et tourné de son inclinaison (-9.46°) -->
            <g id="orc-axe-lashing" transform="translate(22.17, 49) rotate(-9.46)">
                <rect x="-2.9" y="-5.8" width="5.8" height="11.6" rx="1" fill="#78350f" stroke="#451a03" stroke-width="0.6"/>
                <path d="M -2.6,-4.6 L 2.6,-2.9 M -2.6,-2.4 L 2.6,-0.7 M -2.6,-0.2 L 2.6,1.5 M -2.6,2 L 2.6,3.7 M -2.6,4.1 L 2.6,5.4" stroke="#b91c1c" stroke-width="1" stroke-linecap="round"/>
                <path d="M -2.6,-4.6 L 2.6,-2.9 M -2.6,-2.4 L 2.6,-0.7 M -2.6,-0.2 L 2.6,1.5 M -2.6,2 L 2.6,3.7 M -2.6,4.1 L 2.6,5.4" stroke="#fca5a5" stroke-width="0.25" stroke-linecap="round" opacity="0.6"/>
                <circle cx="0" cy="-5.8" r="0.9" fill="#450a0a" stroke="#78350f" stroke-width="0.4"/>
                <path d="M 0,5.8 C -0.6,7.4 -1.8,8.6 -2.4,9.8 M 0.6,5.8 C 1.2,7.2 2.2,8.2 2.6,9.4" stroke="#b91c1c" stroke-width="0.8" stroke-linecap="round" fill="none"/>
            </g>
            <!-- Deux tours de cuir sur la poignée, au-dessus du brassard et sous la main -->
            <g transform="translate(26.1, 72.4) rotate(-9.46)">
                <rect x="-2.5" y="-1.5" width="5.0" height="3.0" rx="0.9" fill="#78350f" stroke="#451a03" stroke-width="0.5"/>
                <path d="M -2.2,0.20 L 2.2,-1.15" stroke="#b91c1c" stroke-width="0.95" stroke-linecap="round"/>
                <path d="M -2.2,1.70 L 2.2,0.35" stroke="#b91c1c" stroke-width="0.95" stroke-linecap="round"/>
            </g>
            <g transform="translate(29.2, 91.4) rotate(-9.46)">
                <rect x="-2.5" y="-1.5" width="5.0" height="3.0" rx="0.9" fill="#78350f" stroke="#451a03" stroke-width="0.5"/>
                <path d="M -2.2,0.20 L 2.2,-1.15" stroke="#b91c1c" stroke-width="0.95" stroke-linecap="round"/>
                <path d="M -2.2,1.70 L 2.2,0.35" stroke="#b91c1c" stroke-width="0.95" stroke-linecap="round"/>
            </g>


            <!-- Doigts orcs refermés sur la poignée de la hache -->
            <ellipse cx="28.5" cy="84" rx="3.6" ry="3.8" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.6"/>
            <path d="${fuseau('M 26,82.5 C 27.33,82.5 28.67,82.5 30,82.5', 0.65, 8)}" fill="${skin.shadow}"/>
            <path d="${fuseau('M 26.5,85.5 C 27.83,85.5 29.17,85.5 30.5,85.5', 0.65, 8)}" fill="${skin.shadow}"/>
        </g>`
};

export const ORC_STYLES = {
    // Coupe Trophée 2 Garçon & Fille : Coupe hirsute en blocs larges obtus pointus
    orc_beast: {
        id: 'orc_beast',
        name: 'Hirsute en Blocs Sauvages',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-orc-beast">
                <ellipse cx="50" cy="24" rx="35" ry="30" fill="${color}"/>
                <!-- Gros blocs obtus pointus sauvages et larges à l'arrière -->
                <path d="M 82,42 
                         C 88,34 94,26 94,26 
                         C 90,22 86,18 86,18 
                         C 92,12 94,4 94,4 
                         C 88,2 82,0 82,0 
                         C 86,-8 86,-14 86,-14 
                         C 80,-10 74,-8 74,-8 
                         C 74,-16 66,-22 66,-22 
                         C 60,-16 54,-12 54,-12 
                         C 50,-22 44,-22 44,-22 
                         C 40,-14 36,-10 36,-10 
                         C 32,-18 24,-14 24,-14 
                         C 22,-8 20,-4 20,-4 
                         C 16,-2 8,2 8,2 
                         C 12,8 14,14 14,14 
                         C 8,18 6,24 6,24 
                         C 10,28 14,32 14,32 
                         C 10,38 18,44 18,44 
                         C 24,34 26,22 30,16 
                         C 38,8 62,8 70,16 
                         C 74,22 76,34 82,42 Z" fill="${color}"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-orc-beast">
                <!-- Masse frontale en blocs larges obtus pointus barbares -->
                <path d="M 20,30 
                         C 22,14 34,4 50,4 
                         C 66,4 78,14 80,30 
                         C 80,36 78,38 76,34 
                         C 74,26 71,22 68,22 
                         C 66,28 62,34 58,34 
                         C 56,26 53,20 50,20 
                         C 47,20 44,26 42,34 
                         C 38,34 34,28 32,22 
                         C 29,22 26,26 24,34 
                         C 22,38 20,36 20,30 Z" fill="${color}"/>
                <!-- Gros blocs de mèches hérissées sur le dessus en blocs larges -->
                <path d="M 28,10 C 24,2 26,-6 26,-6 C 30,0 34,4 34,4 C 36,-6 42,-12 42,-12 C 45,-4 47,2 47,2 C 49,-12 55,-16 55,-16 C 57,-6 58,2 58,2 C 62,-6 68,-10 68,-10 C 70,0 72,4 72,4 C 76,-4 80,0 80,0 C 78,8 74,12 72,12 Z" fill="${color}"/>
            </g>`
    },
    // Coupe Trophée 2 Fille : Crinière sauvage longue en blocs larges obtus (même style hirsute barbare)
    orc_girl: {
        id: 'orc_girl',
        name: 'Crinière Sauvage Longue (Orc Fille)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-orc-girl">
                <!-- Masse volumique crânienne -->
                <ellipse cx="50" cy="24" rx="35" ry="30" fill="${color}"/>
                <!-- Pics sauvages hérissés supérieurs (exactement le même style barbare) -->
                <path d="M 82,42 
                         C 88,34 94,26 94,26 
                         C 90,22 86,18 86,18 
                         C 92,12 94,4 94,4 
                         C 88,2 82,0 82,0 
                         C 86,-8 86,-14 86,-14 
                         C 80,-10 74,-8 74,-8 
                         C 74,-16 66,-22 66,-22 
                         C 60,-16 54,-12 54,-12 
                         C 50,-22 44,-22 44,-22 
                         C 40,-14 36,-10 36,-10 
                         C 32,-18 24,-14 24,-14 
                         C 22,-8 20,-4 20,-4 
                         C 16,-2 8,2 8,2 
                         C 12,8 14,14 14,14 
                         C 8,18 6,24 6,24 
                         C 10,28 14,32 14,32 
                         C 10,38 18,44 18,44 
                         C 24,34 26,22 30,16 
                         C 38,8 62,8 70,16 
                         C 74,22 76,34 82,42 Z" fill="${color}"/>
                <!-- Chevelure longue barbare dense descendant jusqu'aux cuisses en blocs larges obtus pointus -->
                <path d="M 16,36 
                         C 10,22 14,8 24,0 
                         C 34,-6 66,-6 76,0 
                         C 86,8 90,22 84,36 
                         C 94,50 97,60 99,68 
                         C 88,67 80,62 76,54 
                         C 72,72 66,88 50,90 
                         C 34,88 28,72 24,54 
                         C 20,62 12,67 1,68 
                         C 3,60 6,50 16,36 Z" fill="${color}"/>
                <!-- Mèches latérales sauvages supplémentaires en blocs obtus larges -->
                <path d="M 14,48 C 6,56 4,68 5,78 C 14,72 21,62 22,52 Z" fill="${color}"/>
                <path d="M 86,48 C 94,56 96,68 95,78 C 86,72 79,62 78,52 Z" fill="${color}"/>
                <!-- Mèches sauvages avant retombant sur les épaules en blocs obtus souples -->
                <path d="M 22,42 C 16,52 15,66 20,78 C 24,76 26,68 26,58 C 27,50 25,44 22,42 Z" fill="${color}" opacity="0.85"/>
                <path d="M 78,42 C 84,52 85,66 80,78 C 76,76 74,68 74,58 C 73,50 75,44 78,42 Z" fill="${color}" opacity="0.85"/>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-orc-girl">
                <!-- Masse frontale en blocs larges avec mèches barbares (même style actuel) -->
                <path d="M 20,30 
                         C 22,14 34,4 50,4 
                         C 66,4 78,14 80,30 
                         C 80,36 78,40 76,36 
                         C 74,28 71,22 68,22 
                         C 66,28 62,34 58,34 
                         C 56,26 53,20 50,20 
                         C 47,20 44,26 42,34 
                         C 38,34 34,28 32,22 
                         C 29,22 26,28 24,36 
                         C 22,40 20,36 20,30 Z" fill="${color}"/>
                <!-- Mèches de crête hérissées supérieures (exactement le même style actuel) -->
                <path d="M 28,10 C 24,2 26,-6 26,-6 C 30,0 34,4 34,4 C 36,-6 42,-12 42,-12 C 45,-4 47,2 47,2 C 49,-12 55,-16 55,-16 C 57,-6 58,2 58,2 C 62,-6 68,-10 68,-10 C 70,0 72,4 72,4 C 76,-4 80,0 80,0 C 78,8 74,12 72,12 Z" fill="${color}"/>
                <!-- Mèches de tempes sauvages encadrant le visage en blocs larges -->
                <path d="M 23,34 C 20,44 22,54 25,62 C 26,52 26,42 25,34 Z" fill="${color}"/>
                <path d="M 77,34 C 80,44 78,54 75,62 C 74,52 74,42 75,34 Z" fill="${color}"/>
            </g>`
    },
};

export const ORC_TROPHY = {
    id: 'orc',
    shortId: 'orc',
    legacyId: 'trophy_orc_berserker',
    number: 2,
    title: 'La Fureur des Steppes',
    species: 'orc',
    speciesName: 'Orc',
    className: 'Berserker',
    badge: 'Nouveau',
    // ANCHOR Invocation : rareté de la carte (taux de tirage) et éléments ajoutés à l'atelier une fois gagnée
    rarity: 'légendaire',
    unlocks: {
        species: 'orc',
        skins: ['orc-green'],
        hairs: ['#c2410c', '#b91c1c'],
        eyes: [],
        styles: { boy: 'orc_beast', girl: 'orc_girl' },
        outfit: 'orc_berserker',
        label: 'Orc'
    },
    tagline: 'Guerrier indomptable aux crocs acérés et hache massive',
    description: "Deuxième trophée d'élite : débloque la robuste espèce des Orcs, leur chevelure hirsute en pics, bouche droite de guerre et puissante panoplie de Berserker.",
    rewards: [
        { icon: 'bi-feather', label: "Espèce : Orc (Peau Vert Olive, Oreilles larges à anneau d'or & Dents du bas écartées et arrondies)" },
        { icon: 'bi-shield-shaded', label: "Classe : Berserker des Steppes" },
        { icon: 'bi-scissors', label: "Coupes exclusives : Hirsute en pics (G) & Crinière sauvage longue (F)" },
        { icon: 'bi-slash-square', label: "Arme : Hache de guerre berserker en pierre taillée" },
        { icon: 'bi-person-bounding-box', label: "Tenue : Harnais barbare riveté, col de fourrure & couronne de bête" },
        { icon: 'bi-palette', label: "Teintes débloquées : Peau Vert Olive (#659b5e) & Yeux Ambre Sauvage" }
    ],
    boyPreset: {
        id: 'orc_b',
        type: 'boy',
        styleKey: 'orc_beast',
        styleId: 4,
        outfitKey: 'orc_berserker',
        species: 'orc',
        skinColor: 'orc-green',
        hairColor: '#c2410c', // Roux Ardent Barbare (contraste éclatant avec la peau vert olive)
        eyeColor: 'amber'
    },
    girlPreset: {
        id: 'orc_g',
        type: 'girl',
        styleKey: 'orc_girl',
        styleId: 4,
        outfitKey: 'orc_berserker',
        species: 'orc',
        skinColor: 'orc-green',
        hairColor: '#c2410c', // Roux Ardent Barbare (identique, parité stricte)
        eyeColor: 'amber'
    }
};
