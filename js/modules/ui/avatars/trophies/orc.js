/**
 * Trophée 2 : Berserker des Steppes (orc)
 * Module du trophée : tenue, coupes de cheveux et entrée du registre RPG_TROPHIES.
 */

import { fuseau } from '../../avatar-kit.js';
import { mixHex } from '../base.js';

export const OUTFIT_ORC_BERSERKER = {
    id: 'orc_berserker',
    name: 'Berserker des Steppes (Orc)',
    badge: 'Trophée 2',
    // Cape / col en fourrure de loup sauvage sur les épaules
    backEquipment: `
        <g id="outfit-orc-back">
            <!-- Col et cape de fourrure de bête sauvage -->
            <g transform="matrix(0.25,0,0,0.25,0,-34)">
                <path d="M87.997 414.551 C67.625 456.798 62.878 511.557 72 556.545 C113.628 576.545 152 552 200 568 C248 552 286.372 576.545 328 556.545 C337.122 511.557 332.375 456.798 312.003 414.551 Z" fill="#381c0c"/>
                <path d="M96 413 L92.36 418.52 L88.92 424.12 L85.76 429.88 L83.04 435.88 L80.64 442.24 L78.84 448.96 L77.52 455.96 L76.88 463.08 L98.08 459.72 L96.88 466.08 L95.84 472.48 L95.04 478.96 L94.48 485.48 L94.24 492.08 L94.32 498.64 L94.8 505.28 L95.6 511.96 L96.88 518.56 L108.64 513.72 L106.96 519.92 L105.44 526.16 L104.16 532.44 L103.12 538.72 L102.32 545.04 L101.84 551.36 L101.6 557.72 L101.68 564.08 L102.08 570.44 L131.68 561.48 L130.4 555.24 L128.8 549.12 L126.88 543.12 L124.64 537.28 L122.08 531.64 L119.2 526.24 L116 521.12 L112.56 516.32 L108.8 511.96 L124.8 513.96 L122.96 507.72 L120.72 501.6 L118.08 495.68 L115.04 490 L111.68 484.56 L107.92 479.48 L103.84 474.76 L99.44 470.48 L94.72 466.72 L107.68 468.96 L105.44 463.12 L102.8 457.48 L99.76 452.12 L96.32 447.08 L92.56 442.44 L88.4 438.24 L83.92 434.52 L79.12 431.36 L74 428.8 Z" fill="#542b13"/>
                <path d="M304 413 L305.36 419.48 L306.92 425.88 L308.76 432.12 L311.04 438.2 L313.76 444.04 L317.08 449.6 L320.96 454.76 L325.56 459.36 L304.36 456 C304.36 456 304.88 462.6 305.76 469.12 C306.68 475.64 307.96 482.08 309.52 488.36 C311.44 494.56 313.68 500.56 316.32 506.28 C319.24 511.88 322.64 517.12 326.4 521.88 L314.64 517.04 L316.48 523.28 L318.56 529.44 L320.88 535.48 L323.52 541.36 L326.4 547.04 L329.6 552.48 L333.04 557.64 L336.8 562.48 L340.8 566.96 L311.2 558 L311.36 551.64 L311.28 545.28 L310.96 538.96 L310.4 532.68 L309.6 526.44 L308.56 520.24 L307.28 514.12 L305.76 508.08 L304 502.16 L292.24 507 C292.24 507 292.48 500.48 292.4 493.96 C292.24 487.44 291.84 480.96 291.12 474.56 C290.16 468.2 288.96 461.92 287.44 455.76 C285.76 449.72 283.68 443.84 281.28 438.24 L302.48 441.6 L298.56 436.44 L294.32 431.64 L289.76 427.24 L284.88 423.24 L279.76 419.68 L274.32 416.64 L268.64 414.12 L262.72 420.2 L256.56 418.52 Z" fill="#542b13"/>
            </g>
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
    // Coupe Trophée 2 Fille : Crinière sauvage longue
    orc_girl: {
        id: 'orc_girl',
        name: 'Crinière Sauvage Longue (Orc Fille)',
        withBand: false,
        getHairBack: (color) => `
            <g transform="matrix(0.25,0,0,0.25,0,-34)">
                <path d="M87.158 298.764 C87.158 199.763 137.679 119.508 200 119.508 C262.321 119.508 312.842 199.763 312.842 298.764 C312.842 397.764 262.321 478.02 200 478.02 C137.679 478.02 87.158 397.764 87.158 298.764 Z" fill="${mixHex(color, '#000000', 0.14)}"/>
            </g>
            <g id="hair-back-orc-girl">
                <g transform="matrix(0.25,0,0,0.25,0,-34)">
                    <path d="M340 232 C340 298.274 277.32 352 200 352 C122.68 352 60 298.274 60 232 C60 165.726 122.68 112 200 112 C277.32 112 340 165.726 340 232 Z" fill="${color}"/>
                    <path d="M281.908 333.47 C319.657 360.875 345.271 410.834 345.668 462.667 C307.728 459.394 280 443.056 266.155 410.426 Z" fill="${color}"/>
                    <path d="M106.858 329.609 C73.835 362.556 56.311 415.894 64.012 467.333 C95.148 454.269 119.349 424.872 122.678 391.077 Z" fill="${color}"/>
                    <path d="M285.13 316.519 C327.549 335.927 362.526 379.842 373.188 430.73 C332.964 427.464 302.26 405.025 281.677 365.918 Z" fill="${color}"/>
                    <path d="M114.198 316.519 C71.78 335.927 36.802 379.842 26.141 430.73 C66.365 427.464 97.068 405.025 117.651 365.918 Z" fill="${color}"/>
                </g>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-orc-girl">
                <g transform="matrix(0.25,0,0,0.25,0,-34)">
                    <path d="M80 256 C88 192 136 152 200 152 C264 152 312 192 320 256 C320 280 312 296 304 280 C296 248 284 224 272 224 C264 248 248 272 232 272 C224 240 212 216 200 216 C188 216 176 240 168 272 C152 272 136 248 128 224 C116 224 104 248 96 280 C88 296 80 280 80 256 Z" fill="${color}"/>
                    <path d="M144 96 C144 96 160 80 176 48 C176 48 196.534 48 212.277 79.655 C216.766 74.156 220 72 220 72 C220.79 75.949 221.541 79.82 222.253 83.59 C230.941 77.264 247.471 64.529 264 48 C264 48 296 72 296 104 C296 104 320 96 344 80 C344 80 344 104 328 136 L376 152 C376 152 368 184 344 208 L376 240 L328 304 C304 272 296 224 280 200 C272.072 192.072 260.215 186.108 246.376 182.108 L169.02 178.592 C148.696 182.122 130.742 189.258 120 200 C104 224 96 272 72 312 L44 278 C44 278 56 272.8 56 264 L24 232 C24 232 32 208 56 192 C56 192 48 168 32 144 L80 120 C80 120 88 104 96 80 C96 80 128 64 144 96 Z" fill="${color}"/>
                    <path d="M92 272 C80 312 88 352 100 384 C104 344 104 304 100 272 Z" fill="${color}"/>
                    <path d="M308 272 C320 312 312 352 300 384 C296 344 296 304 300 272 Z" fill="${color}"/>
                </g>
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
    rarity: 'épique',
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
