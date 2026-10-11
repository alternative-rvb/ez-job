/**
 * Trophée 7 : Le Souffle des Tombes, Nécromancien (necromancer)
 * Module du trophée : tenue, coupes de cheveux et entrée du registre RPG_TROPHIES.
 */

import { fuseau, plume, gripHand, fitBand, SKIN_DEFAULT } from '../../avatar-kit.js';

// ANCHOR Faux du Nécromancien, modélisée sur l'axe X=0 (manche vers +Y, lame vers -Y, tracés issus de l'export SVG retouché), origine au milieu de la poignée
const NECRO_SCYTHE_MODEL = `
<path d="M0.85,-44C0.988,-44 1.1,-43.888 1.1,-43.75L1.1,37.75C1.1,37.888 0.988,38 0.85,38L-0.85,38C-0.988,38 -1.1,37.888 -1.1,37.75L-1.1,-43.75C-1.1,-43.888 -0.988,-44 -0.85,-44L0.85,-44Z" fill="#3b2a1d"/>
                <path d="M-0.2,-40L-0.31,-30.57L-0.41,-21.82L-0.48,-12.58L-0.5,-2.61L-0.48,5.8L-0.41,14.9L-0.31,24.8L-0.2,34L-0.09,24.8L0.01,14.9L0.08,5.8L0.1,-2.61L0.08,-12.58L0.01,-21.82L-0.09,-30.57L-0.2,-40Z" fill="#5b4330"/>
                <path d="M3.74,-41.5L4.62,-43.08L5.68,-44.45L6.93,-45.61L8.39,-46.55L10.04,-47.26L11.89,-47.7L13.93,-47.82L16.11,-47.6L18.43,-47L20.37,-46.27L22.36,-45.26L24.38,-43.95L26.39,-42.34L28,-41L27.03,-42.88L25.46,-45.07L23.76,-47.02L21.94,-48.73L20,-50.19L17.42,-51.59L14.72,-52.58L11.94,-53.13L9.12,-53.24L6.29,-52.86L3.53,-52L0.89,-50.65L-1.56,-48.81L-3.74,-46.5C-3.573,-41.34 -1.08,-39.673 3.74,-41.5Z" fill="#9ca3af"/>
                <g transform="matrix(0.249391,0.017439,-0.017439,0.249391,-67.503361,-116.993787)">
                    <path d="M277.767,264.237L308.089,270.338C308.089,270.338 300.943,283.662 288.87,281.156C280.583,279.436 277.767,264.237 277.767,264.237Z" fill="#67707f"/>
                </g>
                <g transform="matrix(1,0,0,1,-0.195892,-1.746453)">
                    <path d="M3,-47.4L5.11,-48.37L7.28,-48.99L9.48,-49.27L11.71,-49.24L13.63,-48.97L15.91,-48.38L17.89,-47.62L19.89,-46.6L21.91,-45.3L23.6,-44L22.15,-45.58L20.29,-47.19L18.33,-48.48L16.29,-49.45L13.86,-50.15L11.77,-50.38L9.38,-50.23L7.1,-49.67L4.96,-48.71L3,-47.4Z" fill="#e5e7eb"/>
                </g>
`;

// NOTE Flamme verte spectrale : trois couches, base posée en (cx, cy), échelle s
const necroFlame = (cx, cy, s = 1) => `
            <g transform="translate(${cx} ${cy}) scale(${s})">
                <circle cx="0" cy="-8" r="8" fill="#4ade80" opacity="0.18"/>
                <path d="M 0,0 C -4.5,-2 -5.5,-7.5 -2.4,-11.5 C -2.4,-8.6 -0.4,-8 0.4,-10.4 C 1.8,-13.6 0.8,-16.4 -0.4,-19 C 5,-15 6.4,-8.4 4.8,-4.2 C 3.8,-1.4 2.2,0 0,0 Z" fill="#22c55e"/>
                <path d="M 0.2,-0.6 C -2.4,-2 -3,-6 -1,-9 C -0.6,-7.4 0.4,-7 1,-8.4 C 2.4,-5.8 2.4,-2.4 0.2,-0.6 Z" fill="#86efac"/>
                <path d="M 0.3,-1.2 C -0.7,-2.4 -0.5,-4.4 0.3,-5.6 C 1.1,-4.4 1.3,-2.4 0.3,-1.2 Z" fill="#f0fdf4"/>
            </g>`;

// Tenue du trophée 7 : robe de lin sombre vert de gris, capuche, cordon d'os, cape très sombre
export const OUTFIT_NECROMANCER = {
    id: 'necromancer',
    name: 'Nécromancien (Revenant)',
    badge: 'Trophée 7',
    backEquipment: `
        <g id="outfit-necro-cape">
            <!-- Cape de deuil vert nuit (#0e1a17, nettement plus sombre que la robe #2f4a43), bord effiloché -->
            <path d="M 30,63 C 19,76 14,94 12,108 L 18,111 L 24,108 L 31,112 L 39,109 L 50,113 L 61,109 L 69,112 L 76,108 L 82,111 L 88,108 C 86,94 81,76 70,63 L 60,67 L 40,67 Z" fill="#0e1a17"/>
            <path d="M 37,70 C 35,86 31,100 27,109 C 41,111 59,111 73,109 C 69,100 65,86 63,70 Z" fill="#08110f"/>
        </g>`,
    legs: `
        <g id="outfit-necro-legs">
            <!-- Jupe de robe longue jusqu'aux chevilles, ourlet déchiré -->
            <path d="M 37,83 L 63,83 L 65,106 L 61,108 L 56.5,105.5 L 50,109 L 43.5,105.5 L 39,108 L 35,106 Z" fill="#2f4a43"/>
            <path d="${fuseau('M 50,86 C 50,94 50,101 50,107', 0.9, 10)}" fill="#1e332d"/>
            <!-- Pointes de bottes noires -->
            <path d="M 39.5,108.5 C 39.5,107, 47,107, 47,108.5 L 47.6,112.4 C 47.6,114.2, 39,114.2, 39,112.4 Z" fill="#09090b"/>
            <path d="M 53,108.5 C 53,107, 60.5,107, 60.5,108.5 L 61,112.4 C 61,114.2, 52.4,114.2, 52.4,112.4 Z" fill="#09090b"/>
        </g>`,
    body: `
        <g id="outfit-necro-body">
            <!-- Robe de lin vert de gris -->
            <path d="M 33,65 C 33,62 36,61.5 39,61.5 L 61,61.5 C 64,61.5 67,62 67,65 L 65,86 L 35,86 Z" fill="#2f4a43"/>
            <!-- Plis verticaux de la robe -->
            <path d="${fuseau('M 42,66 C 41,72 41,79 41.4,85', 0.9, 10)} ${fuseau('M 58,66 C 59,72 59,79 58.6,85', 0.9, 10)}" fill="#1e332d"/>
            <!-- Dessin de côtes d'os peint à la craie sur la poitrine -->
            <path d="${fuseau('M 44.5,68 C 47,69.6 53,69.6 55.5,68', 0.6, 8)} ${fuseau('M 44.5,71.6 C 47,73.2 53,73.2 55.5,71.6', 0.6, 8)} ${fuseau('M 45,75.2 C 47.4,76.6 52.6,76.6 55,75.2', 0.6, 8)}" fill="#d6d3c4"/>
            <path d="${fuseau('M 50,66.6 C 50,71 50,76 50,79', 0.7, 8)}" fill="#d6d3c4"/>
        </g>`,
    belt: `
        <g id="outfit-necro-belt">
            <!-- Cordon de corde blanchie à la taille, crâne en boucle, pan pendant -->
            <path d="${fuseau('M 35.5,84 C 44.5,85.8 55.5,85.8 64.5,84', 2.2, 12)}" fill="#d6d3c4"/>
            <ellipse cx="50" cy="85.2" rx="2.7" ry="2.9" fill="#e7e5d8"/>
            <circle cx="49" cy="84.8" r="0.65" fill="#1c1917"/><circle cx="51" cy="84.8" r="0.65" fill="#1c1917"/>
            <path d="${fuseau('M 50,87 C 50.5,91 50,95 50.4,98.5', 1.6, 10)}" fill="#d6d3c4"/>
        </g>`,
    arms: (skin = SKIN_DEFAULT) => `
        <g id="outfit-necro-arms">
            <!-- Manche gauche de robe, poignet à revers d'os -->
            <path d="M33 63 C26 67.5, 24 74.5, 27 81.5 C30 81.5, 32.5 77.5, 35 73.5 Z" fill="#2f4a43"/>
            <path d="${fitBand([[33, 63], [26, 67.5], [24, 74.5], [27, 81.5]], [[27, 81.5], [30, 81.5], [32.5, 77.5], [35, 73.5]], 0.62, 0.92, 0.12, 0.5, 0.4)}" fill="#d6d3c4"/>
            <!-- Main gauche libre, ouverte sous une flamme spectrale -->
            <ellipse cx="28.4" cy="83.6" rx="3.5" ry="3.2" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
            <path d="${fuseau('M 27.6,84.2 C 27.4,85 27.4,85.8 27.6,86.6', 0.6, 8)} ${fuseau('M 29.6,84.2 C 29.8,85 29.8,85.8 29.6,86.6', 0.6, 8)}" fill="${skin.shadow}"/>
            ${necroFlame(28.4, 81, 0.85)}
            <!-- Manche droite de robe (la main qui serre la faux est dessinée dans handItem) -->
            <path d="M67 63 C74 66.5, 76 70.5, 75 75.5 C72.5 77.5, 69.5 75.5, 66 71.5 Z" fill="#2f4a43"/>
            <path d="${fitBand([[67, 63], [74, 66.5], [76, 70.5], [75, 75.5]], [[75, 75.5], [72.5, 77.5], [69.5, 75.5], [66, 71.5]], 0.62, 0.92, 0.12, 0.5, 0.4)}" fill="#d6d3c4"/>
        </g>`,
    // Capuche dessinée par-dessus les cheveux : ovale du visage évidé (règle evenodd), pointe légèrement inclinée
    headAccessory: (skin, hairColor = '#e7e5d8', type = 'boy') => `
        <g id="outfit-necro-hood-front">
            <!-- Partie avant de la capuche (tracés retouchés) : deux joues qui descendent vers les yeux et une pointe de front, par-dessus la frange -->
            <g>
            <g transform="matrix(0.231973,0,0,0.243371,3.646787,-27.070578)">
                <path d="M166.791,410.364C157.104,405.487 134.117,391.83 111.532,368.509C107.71,364.562 103.288,359.186 102.601,358.352C91.704,345.104 82.994,331.086 76.599,316.506C76.242,315.69 73.035,308.216 70.255,298.213C67.488,288.26 66.311,280.134 65.735,276.193C64.449,267.38 63.94,260.884 63.74,258.265C63.739,258.256 63.689,252.686 64.069,245.696C69.832,139.587 149.105,108.959 197.282,107.785C197.501,107.78 199.737,107.725 200.011,107.752C201.523,107.897 203.057,107.903 204.546,108.192C205.888,108.452 213.545,109.937 218.753,117.284C221.289,120.861 222.03,124.334 222.17,124.99C224.064,133.863 219.537,140.246 218.753,141.352C213.545,148.696 205.888,150.189 204.546,150.45C201.04,151.134 201.007,150.8 197.433,150.947C186.151,151.409 140.767,156.058 119.903,201.22C111.309,219.825 109.05,240.435 109,257.626C108.994,259.629 107.993,266.727 108.154,281.406C108.181,283.871 107.63,292.902 109.755,305.726C110.713,311.504 113.175,330.835 127.388,357.106C128.886,359.874 133.715,369.415 142.832,382.148C148.63,390.246 157.992,401.895 166.791,410.364Z" fill="#2f4a43"/>
            </g>
            <g transform="matrix(-0.231973,0,0,0.243371,96.057073,-27.070578)">
                <path d="M200,150.896C201.515,150.746 203.054,150.741 204.546,150.45C205.888,150.189 213.543,148.698 218.753,141.352C221.289,137.777 222.03,134.307 222.17,133.652C224.066,124.779 219.537,118.39 218.753,117.284C213.545,109.937 205.888,108.452 204.546,108.192C203.338,107.958 199.9,107.291 189.131,108.255C137.503,112.88 64.054,148.912 63.736,257.508C63.732,259.053 64.466,268.062 66.098,278.606C67.07,284.881 69.245,298.273 75.865,314.758C76.371,316.017 79.256,322.896 84.05,331.408C98.007,356.19 115.259,372.302 117.452,374.406C136.648,392.823 156.082,404.973 166.791,410.364C159.379,403.229 147.653,389.881 137.597,374.506C136.558,372.917 132.007,366.108 125.74,353.993C113.22,329.788 110.683,311.831 109.516,304.228C107.792,292.987 108.163,285.951 108.137,279.222C108.087,266.486 108.995,259.245 109,257.626C109.179,196.426 137.049,168.885 166.968,157.384C184.149,150.78 198.453,150.898 200,150.896Z" fill="#2f4a43"/>
            </g>
            <g transform="matrix(0.310348,0,0,0.325598,23.600682,-30.243261)">
                <path d="M85.197,87.48C152.302,87.48 180.991,197.608 180.991,197.608C180.991,197.608 116.624,157.332 85.263,157.332C54.566,157.332 -7.173,197.608 -7.173,197.608C-7.173,197.608 11.679,87.48 85.197,87.48Z" fill="#2f4a43"/>
            </g>
        </g>
            <!-- Couture du dessus de la capuche : trait en fuseau, du sommet vers le front -->
            <path d="${fuseau('M 50,-1.6 C 50.7,3 50.7,8 50,13', 1.1, 12)}" fill="#0e1a17"/>
        </g>${type === 'girl' ? `
        <!-- Mèches de la fille : longues, effilées, hirsutes, elles sortent des joues de la capuche et retombent par-dessus (tracés retouchés) -->
        <g id="necro-girl-locks"><g transform="matrix(1,0,0,1.167898,0,-4.927796)">
            <g transform="matrix(0.25,0,0,0.25,0,-34)">
                <path d="M147.446,407.167C148.231,403.255 149.481,395.853 146.516,387.256C146.14,386.167 144.415,381.166 139.607,374.354C138.404,372.649 134.848,367.895 129.905,362.527C129.557,362.149 129.545,362.158 125.506,357.835C121.317,353.352 121.196,353.442 115.987,348.077C113.474,345.489 109.993,342.222 106.442,334.873C104.473,330.799 103.432,326.536 103.25,325.793C101.356,318.035 101.406,312.358 101.388,311.059C101.333,306.988 101.424,301.452 103.195,291.946C103.408,290.804 105.939,278.845 110.808,266.936C113.951,259.25 116.483,254.461 117.043,253.4C116.785,255.106 115.698,262.287 115.312,274.857C115.267,276.337 114.937,283.705 116.036,295.563C116.229,297.641 117.078,305.545 118.792,312.195C119.855,316.318 120.88,320.09 123.401,325.514C124.996,328.947 126.468,331.18 126.779,331.653C128.306,333.968 128.273,333.985 130.976,337.349C131.002,337.381 133.544,340.349 138.501,347.574C138.825,348.045 141.937,352.351 145.801,359.654C146.758,361.463 150.446,368.294 152.516,376.942C153.583,381.402 153.602,385.664 153.606,386.427C153.652,396.949 149.524,403.8 147.446,407.167Z" fill="${hairColor}"/>
            </g>
            <g transform="matrix(0.278163,-0.032512,0.027907,0.238759,-11.25215,-26.403987)">
                <path d="M147.446,407.167C152.227,392.048 149.769,379.066 131.491,357.401C125.235,349.985 125.117,350.093 118.965,343.329C109.811,333.266 107.752,320.102 107.164,316.294C105.9,308.098 106.449,299.402 106.541,297.941C107.836,277.432 114.982,258.377 117.043,253.4C114.111,264.663 109.87,289.139 113.025,310.147C115.928,329.478 123.609,337.14 126.551,340.62C134.649,350.198 139.284,357.406 140.274,358.945C145.38,366.885 149.759,375.511 151.142,384.462C152.854,395.541 149.357,403.225 147.446,407.167Z" fill="${hairColor}"/>
            </g>
        </g>
        <g transform="matrix(-1,0,0,1.167898,128.049476,-4.927796)">
            <g transform="matrix(0.25,0,0,0.25,28.527998,-34)">
                <path d="M147.446,407.167C150.728,401.849 155.723,392.608 152.634,377.486C152.06,374.674 150.196,368.479 147.342,362.672C144.801,357.502 142.063,353.03 141.11,351.468C140.53,350.518 135.314,342.818 132.634,339.429C130.27,336.438 127.854,333.726 125.456,329.493C123.812,326.59 122.824,324.225 122.628,323.756C122.526,323.51 120.689,319.944 118.585,311.373C117.429,306.663 116.376,299.828 115.923,294.263C115.464,288.63 114.944,281.906 115.43,271.898C115.568,269.043 115.796,261.501 117.043,253.4C115.065,257.144 111.325,265.001 108.723,272.413C105.355,282.008 103.83,288.986 103.284,291.485C102.657,294.35 102.105,298.786 102.025,299.424C101.932,300.174 100.951,306.865 101.596,315.985C101.596,315.988 101.896,319.557 102.805,323.84C103.544,327.319 104.392,330.269 106.223,334.407C106.34,334.672 107.978,338.153 109.78,340.761C112.583,344.817 114.439,346.461 117.172,349.303C118.931,351.133 122.125,354.154 126.506,358.913C126.951,359.397 135.831,368.413 141.103,376.565C146.306,384.611 147.355,389.888 147.694,391.536C149.247,399.078 147.718,405.812 147.446,407.167Z" fill="${hairColor}"/>
            </g>
            <g transform="matrix(0.278163,-0.032512,0.027907,0.238759,17.275848,-26.403987)">
                <path d="M147.446,407.167C151.659,398.479 154.56,387.322 146.604,370.246C139.387,354.758 125.714,339.811 123.533,337.03C119.347,331.692 112.359,320.162 111.932,296.45C111.899,294.582 111.471,280.776 115.197,261.628C116.074,257.122 116.873,254.052 117.043,253.4C114.971,258.501 104.959,284.339 106.499,309.679C107.9,332.746 117.939,342.196 120.97,345.503C137.011,363.001 149.434,377.976 149.564,394.382C149.614,400.771 147.802,406.043 147.446,407.167Z" fill="${hairColor}"/>
            </g>
        </g>
        </g>` : ''}`,
    handItem: (skin = SKIN_DEFAULT) => `
        <g id="outfit-necro-scythe">
            <!-- Faux tenue dans la main droite (75.5, 78) -->
            <g id="necro-scythe" transform="translate(75.5, 78) rotate(-4)">
                ${NECRO_SCYTHE_MODEL}
                <!-- Main refermée sur le manche (origine du groupe) -->
                ${gripHand(skin)}
            </g>
        </g>`
};

// NOTE Cheveux blanc os dépassant de la capuche : mèches courtes sur le front, longues sur les joues pour la fille
const necroFringeGirl = (color) => `
                <g transform="matrix(0.489429,0,0,0.489429,-75.495466,-98.591949)">
            <path d="M200,258.393C200,227.189 225.334,201.855 256.539,201.855C287.744,201.855 313.078,227.189 313.078,258.393L305.312,250.82L297.276,257.631L289.004,250.82C288.117,258.546 282.906,263.493 274.143,266.155C276.17,261.396 272.566,249.815 267.824,246.184C266.867,256.812 261.368,263.312 254.218,268.31C252.583,263.493 251.416,249.313 244.153,246.184C237.878,247.854 236.81,260.545 237.288,266.155C231.512,263.272 228.259,258.768 230.361,250.82L212.887,258.393L209.747,253.448L200,258.393Z" fill="${color}"/>
                </g>`;

const necroFringe = (color) => `
                <g transform="matrix(0.489429,0,0,0.489429,-75.495466,-98.591949)">
            <path d="M200,258.393C200,227.189 225.334,201.855 256.539,201.855C287.744,201.855 313.078,227.189 313.078,258.393L305.312,250.82L297.276,257.631L289.004,250.82L277.308,258.393L270.989,246.184L256.539,258.393L244.153,246.184L234.334,256.449L230.361,250.82L212.887,258.393L209.747,253.448L200,258.393Z" fill="${color}"/>
                </g>`;

export const NECROMANCER_STYLES = {
    // Coupe Trophée 7 Garçon : mèches blanc os courtes sous la capuche
    necromancer_boy: {
        id: 'necromancer_boy',
        name: 'Mèches Blanc Os (Nécromancien)',
        withBand: false,
        getHairBack: (color) => `
            <g id="hair-back-necromancer-boy">
                <!-- Partie arrière de la capuche : deux ellipses sombres derrière la tête (tracés retouchés) -->
                <g id="necro-hood-back" transform="matrix(0.865946,0,0,1.1125,6.702703,0.9)">
                    <g transform="matrix(0.818694,0,0,0.858922,9.112973,4.480366)"><ellipse cx="50" cy="30" rx="37" ry="38" fill="#0e1a17"/></g>
                    <ellipse cx="50" cy="28" rx="27" ry="26" fill="#0e1a17"/>
                </g>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-necromancer-boy">${necroFringe(color)}
            </g>`
    },
    // Coupe Trophée 7 Fille : mèches longues le long des joues, sous la capuche
    necromancer_girl: {
        id: 'necromancer_girl',
        name: 'Longues Mèches Blanc Os (Nécromancienne)',
        withTiara: false,
        getHairBack: (color) => `
            <g id="hair-back-necromancer-girl">
                <!-- Partie arrière de la capuche : deux ellipses sombres derrière la tête (tracés retouchés) -->
                <g id="necro-hood-back" transform="matrix(0.865946,0,0,1.1125,6.702703,0.9)">
                    <g transform="matrix(0.818694,0,0,0.858922,9.112973,4.480366)"><ellipse cx="50" cy="30" rx="37" ry="38" fill="#0e1a17"/></g>
                    <ellipse cx="50" cy="28" rx="27" ry="26" fill="#0e1a17"/>
                </g>
            </g>`,
        getHairFront: (color) => `
            <g id="hair-front-necromancer-girl">${necroFringeGirl(color)}
            </g>`
    }
};

export const NECROMANCER_TROPHY = {
    id: 'necromancer',
    shortId: 'necro',
    legacyId: 'trophy_necromancer_revenant',
    number: 7,
    title: 'Le Souffle des Tombes',
    species: 'undead',
    speciesName: 'Revenant',
    className: 'Nécromancien',
    badge: 'Nouveau',
    rarity: 'légendaire',
    unlocks: {
        species: 'undead',
        skins: ['undead-grey'],
        hairs: ['#e7e5d8'],
        eyes: ['revenant-green'],
        styles: { boy: 'necromancer_boy', girl: 'necromancer_girl' },
        outfit: 'necromancer',
        label: 'Nécromancien Revenant'
    },
    tagline: 'Mage des morts aux flammes spectrales',
    description: "Septième trophée : débloque l'espèce Revenant (teint gris de tombe, regard noir à pupille vert flamme, bouche droite), la robe à capuche, le cordon d'os, la cape de deuil, la flamme verte et la faux.",
    rewards: [
        { icon: 'bi-feather', label: 'Espèce : Revenant (Teint gris & Regard vert spectral)' },
        { icon: 'bi-shield-shaded', label: 'Classe : Nécromancien' },
        { icon: 'bi-scissors', label: 'Coupes exclusives : Mèches blanc os (G) / Longues mèches (F)' },
        { icon: 'bi-fire', label: 'Magie : Flamme verte spectrale dans la main gauche' },
        { icon: 'bi-slash-lg', label: 'Arme : Faux au cordon de crânes' },
        { icon: 'bi-person-bounding-box', label: 'Tenue : Robe à capuche, cordon d\'os & cape de deuil' },
        { icon: 'bi-palette', label: 'Teintes débloquées : Peau Gris Revenant, Cheveux Blanc Os & Yeux noirs à pupille vert flamme' }
    ],
    boyPreset: {
        id: 'nec_b',
        type: 'boy',
        styleKey: 'necromancer_boy',
        styleId: 1,
        outfitKey: 'necromancer',
        species: 'undead',
        skinColor: 'undead-grey',
        hairColor: '#e7e5d8', // Blanc Os (contraste franc avec la peau grise et la capuche sombre)
        eyeColor: 'revenant-green'
    },
    girlPreset: {
        id: 'nec_g',
        type: 'girl',
        styleKey: 'necromancer_girl',
        styleId: 1,
        outfitKey: 'necromancer',
        species: 'undead',
        skinColor: 'undead-grey',
        hairColor: '#e7e5d8', // Blanc Os (parité stricte)
        eyeColor: 'revenant-green'
    }
};
