/**
 * Module de définition et rendu des Avatars (Style Manga Chibi)
 * Structure de composition stricte en calques sémantiques <g> :
 * 1. Ombre au sol (<g id="...-shadow">)
 * 2. Cheveux arrière (<g id="...-hair-back">)
 * 3. Jambes & Chaussures (<g id="...-legs">)
 * 4. Corps & Vêtements (<g id="...-body">)
 * 5. Ceinture & Accessoires (<g id="...-belt">)
 * 6. Bras & Mains (<g id="...-arms">)
 * 7. Base de la tête (<g id="...-head-base">) avec oreilles placées derrière le crâne
 * 8. Cheveux avant / Frange (<g id="...-hair-front">)
 * 9. Traits du visage en avant-plan (<g id="...-face-features">)
 */

export const AVATARS = {
    boy: {
        id: 'boy',
        color: '#489e96',
        accent: '#ff9d00',
        image: null,
        headSvg: `
            <svg viewBox="4 -22 92 88" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <!-- 1. CHEVEUX ARRIERE -->
    <g id="boy-hair-back">
        <path d="M 18,42 
                 C 12,34 8,26 10,20 
                 C 12,14 6,10 12,4 
                 C 16,-2 24,-6 30,-4 
                 C 34,-12 44,-14 50,-10 
                 C 56,-14 66,-12 70,-4 
                 C 76,-6 84,-2 88,4 
                 C 94,10 88,14 90,20 
                 C 92,26 88,34 82,42 
                 C 78,34 76,28 74,22 
                 C 66,12 34,12 26,22 
                 C 24,28 22,34 18,42 Z" fill="#5a2d0c"/>
    </g>

    <!-- 2. BASE DE LA TÊTE (Oreilles derrière le crâne) -->
    <g id="boy-head-base">
        <!-- Cou court & Col -->
        <rect x="46" y="58" width="8" height="4" fill="#ffd4a3"/>
        <path d="M42 60 L50 62 L58 60 Z" fill="#ff9d00"/>

        <!-- Oreilles (derrière le crâne) -->
        <g id="boy-ears">
            <circle cx="22" cy="38" r="4.5" fill="#ffd4a3"/>
            <circle cx="22" cy="38" r="2.5" fill="#f0be8d"/>
            <circle cx="78" cy="38" r="4.5" fill="#ffd4a3"/>
            <circle cx="78" cy="38" r="2.5" fill="#f0be8d"/>
        </g>

        <!-- Forme du crâne et visage (devant les oreilles) -->
        <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>

        <!-- Bandeau frontal ninja turquoise -->
        <path d="M22 24 C33 17, 67 17, 78 24 L79 28 C68 21, 32 21, 21 28 Z" fill="#489e96"/>
        <rect x="45" y="19" width="10" height="6" rx="1.5" fill="#ff9d00"/>
        <circle cx="50" cy="22" r="1.5" fill="#ffffff"/>
    </g>

    <!-- 3. CHEVEUX AVANT (Frange) -->
    <g id="boy-hair-front">
        <path d="M 20,32 
                 C 21,24 24,14 34,8 
                 C 44,4 56,4 66,8 
                 C 76,14 79,24 80,32 
                 C 78,35 76,33 74,27 
                 C 72,34 66,35 62,28 
                 C 58,35 52,36 48,27 
                 C 44,35 38,34 34,27 
                 C 30,34 26,35 24,28 
                 C 22,34 20,34 20,32 Z" fill="#5a2d0c"/>
    </g>

    <!-- 4. TRAITS DU VISAGE EN AVANT-PLAN (Sourcils, yeux, nez, bouche) -->
    <g id="boy-face-features">
        <!-- Oeil gauche -->
        <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
        <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
        <ellipse cx="37.5" cy="41.5" rx="4.2" ry="4.8" fill="#542c0e"/>
        <ellipse cx="37.5" cy="42.5" rx="3.5" ry="3.5" fill="#8c4e1e"/>
        <circle cx="37.5" cy="41.5" r="2.2" fill="#241103"/>
        <circle cx="35.5" cy="39" r="1.8" fill="#ffffff"/>
        <circle cx="39.5" cy="43.5" r="0.9" fill="#ffffff"/>
        <path d="M30 38 Q37 34 44 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M43 28.4 L35.5 26.2 L31 29.5 L35.8 28.2 L43 30.6 Z" fill="#542c0e"/>

        <!-- Oeil droit & Sourcil droit -->
        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
        <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="#542c0e"/>
        <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="#8c4e1e"/>
        <circle cx="62.5" cy="41.5" r="2.2" fill="#241103"/>
        <circle cx="60.5" cy="39" r="1.8" fill="#ffffff"/>
        <circle cx="64.5" cy="43.5" r="0.9" fill="#ffffff"/>
        <path d="M56 38 Q63 34 70 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M57 28.4 L64.5 26.2 L69 29.5 L64.2 28.2 L57 30.8 Z" fill="#542c0e"/>

        <!-- Nez et bouche (positionnés plus bas) -->
        <circle cx="50" cy="47.5" r="0.9" fill="#d99866"/>
        <path d="M45 51 Q50 56.5 55 51" fill="none" stroke="#7c4004" stroke-width="2" stroke-linecap="round"/>
    </g>
</svg>
        `,
        svg: `
            <svg viewBox="0 -22 100 144" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
    <!-- 1. OMBRE AU SOL -->
    <g id="boy-shadow">
        <ellipse cx="50" cy="116" rx="16" ry="3" fill="rgba(124, 64, 4, 0.18)"/>
    </g>

    <!-- 2. GROUPE CHEVEUX ARRIERE (Calque le plus au fond) -->
    <g id="boy-hair-back-full">
        <path d="M 18,42 
                 C 12,34 8,26 10,20 
                 C 12,14 6,10 12,4 
                 C 16,-2 24,-6 30,-4 
                 C 34,-12 44,-14 50,-10 
                 C 56,-14 66,-12 70,-4 
                 C 76,-6 84,-2 88,4 
                 C 94,10 88,14 90,20 
                 C 92,26 88,34 82,42 
                 C 78,34 76,28 74,22 
                 C 66,12 34,12 26,22 
                 C 24,28 22,34 18,42 Z" fill="#5a2d0c"/>
    </g>

    <!-- 3. JAMBES & CHAUSSURES (Jambes rapprochées en trapèze & chaussures compactes) -->
    <g id="boy-legs">
        <!-- Jambe gauche (trapèze resserré) -->
        <polygon points="39,85 49,85 48,106 41,106" fill="#5c3818"/>
        <!-- Chaussette / guêtre gauche -->
        <polygon points="40,99 48.5,99 48,106 41,106" fill="#ffffff"/>
        <polygon points="39.8,101 48.7,101 48.3,102.5 40.2,102.5" fill="#ff9d00"/>
        <!-- Chaussure gauche -->
        <path d="M39.5 106 C39.5 104, 49.5 104, 49.5 106 L50 113 C50 115, 39 115, 39 113 Z" fill="#7c4004"/>
        <path d="M38.5 112 L50.5 112 L50 114 L39 114 Z" fill="#442100"/>
        <rect x="42.5" y="107" width="4" height="2" rx="0.8" fill="#ff9d00"/>

        <!-- Jambe droite (trapèze resserré) -->
        <polygon points="51,85 61,85 59,106 52,106" fill="#5c3818"/>
        <!-- Chaussette / guêtre droite -->
        <polygon points="51.5,99 60,99 59,106 52,106" fill="#ffffff"/>
        <polygon points="51.3,101 60.2,101 59.8,102.5 51.7,102.5" fill="#ff9d00"/>
        <!-- Chaussure droite -->
        <path d="M50.5 106 C50.5 104, 60.5 104, 60.5 106 L61 113 C61 115, 50 115, 50 113 Z" fill="#7c4004"/>
        <path d="M49.5 112 L61.5 112 L61 114 L50 114 Z" fill="#442100"/>
        <rect x="53.5" y="107" width="4" height="2" rx="0.8" fill="#ff9d00"/>
    </g>

    <!-- 4. CORPS & VETEMENTS (Kimono en trapèze élégant connecté aux épaules) -->
    <g id="boy-body">
        <path d="M32 62 L68 62 L62 85 L38 85 Z" fill="#ffffff"/>
        <path d="M32 62 C32 62, 40 73, 43 85 L38 85 L30 66 Z" fill="#489e96"/>
        <path d="M68 62 C68 62, 60 73, 57 85 L62 85 L70 66 Z" fill="#489e96"/>
        <path d="M42 60 L50 69 L58 60 Z" fill="#ff9d00"/>
        <path d="M47 67 L50 78 L53 67 Z" fill="#e08900"/>
    </g>

    <!-- 5. CEINTURE / OBI & ACCESSOIRES (Ceinture ajustée à la taille) -->
    <g id="boy-belt">
        <rect x="37" y="82.5" width="26" height="4.5" rx="1" fill="#7c4004"/>
        <rect x="46" y="81.5" width="8" height="6.5" rx="1.5" fill="#ffb733" stroke="#7c4004" stroke-width="0.8"/>
        <rect x="36" y="82.5" width="4.5" height="7" rx="1.2" fill="#995208" stroke="#5c3818" stroke-width="0.8"/>
        <circle cx="38.2" cy="86" r="0.7" fill="#ffb733"/>
    </g>

    <!-- 6. BRAS & MAINS (Un seul ovale pour la main chibi) -->
    <g id="boy-arms">
        <!-- Bras gauche -->
        <path d="M32 64 C24 71, 23 78, 29 84 C32 84, 34 81, 35 77 Z" fill="#489e96"/>
        <ellipse cx="29" cy="84" rx="3.8" ry="3.5" fill="#ffd4a3"/>

        <!-- Bras droit -->
        <path d="M68 64 C76 69, 78 72, 76 79 C73 81, 70 79, 66 75 Z" fill="#489e96"/>
        <ellipse cx="77" cy="79" rx="3.8" ry="3.5" fill="#ffd4a3"/>
    </g>

    <!-- 7. BASE DE LA TÊTE (Oreilles derrière le crâne, cou court) -->
    <g id="boy-head-base-full">
        <!-- Cou court & Col -->
        <rect x="46" y="58" width="8" height="4" fill="#ffd4a3"/>
        <path d="M42 60 L50 62 L58 60 Z" fill="#ff9d00"/>

        <!-- Oreilles (derrière le crâne) -->
        <g id="boy-ears-full">
            <circle cx="22" cy="38" r="4.5" fill="#ffd4a3"/>
            <circle cx="22" cy="38" r="2.5" fill="#f0be8d"/>
            <circle cx="78" cy="38" r="4.5" fill="#ffd4a3"/>
            <circle cx="78" cy="38" r="2.5" fill="#f0be8d"/>
        </g>

        <!-- Forme du crâne et visage (devant les oreilles) -->
        <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>

        <!-- Bandeau frontal ninja turquoise -->
        <path d="M22 24 C33 17, 67 17, 78 24 L79 28 C68 21, 32 21, 21 28 Z" fill="#489e96"/>
        <rect x="45" y="19" width="10" height="6" rx="1.5" fill="#ff9d00"/>
        <circle cx="50" cy="22" r="1.5" fill="#ffffff"/>
    </g>

    <!-- 8. CHEVEUX AVANT (Frange) -->
    <g id="boy-hair-front-full">
        <path d="M 20,32 
                 C 21,24 24,14 34,8 
                 C 44,4 56,4 66,8 
                 C 76,14 79,24 80,32 
                 C 78,35 76,33 74,27 
                 C 72,34 66,35 62,28 
                 C 58,35 52,36 48,27 
                 C 44,35 38,34 34,27 
                 C 30,34 26,35 24,28 
                 C 22,34 20,34 20,32 Z" fill="#5a2d0c"/>
    </g>

    <!-- 9. TRAITS DU VISAGE EN AVANT-PLAN (Sourcils, yeux, nez, bouche) -->
    <g id="boy-face-features-full">
        <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
        <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
        <ellipse cx="37.5" cy="41.5" rx="4.2" ry="4.8" fill="#542c0e"/>
        <ellipse cx="37.5" cy="42.5" rx="3.5" ry="3.5" fill="#8c4e1e"/>
        <circle cx="37.5" cy="41.5" r="2.2" fill="#241103"/>
        <circle cx="35.5" cy="39" r="1.8" fill="#ffffff"/>
        <circle cx="39.5" cy="43.5" r="0.9" fill="#ffffff"/>
        <path d="M30 38 Q37 34 44 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M43 28.4 L35.5 26.2 L31 29.5 L35.8 28.2 L43 30.6 Z" fill="#542c0e"/>

        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
        <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="#542c0e"/>
        <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="#8c4e1e"/>
        <circle cx="62.5" cy="41.5" r="2.2" fill="#241103"/>
        <circle cx="60.5" cy="39" r="1.8" fill="#ffffff"/>
        <circle cx="64.5" cy="43.5" r="0.9" fill="#ffffff"/>
        <path d="M56 38 Q63 34 70 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M57 28.4 L64.5 26.2 L69 29.5 L64.2 28.2 L57 30.8 Z" fill="#542c0e"/>

        <!-- Nez et bouche (positionnés plus bas) -->
        <circle cx="50" cy="47.5" r="0.9" fill="#d99866"/>
        <path d="M45 51 Q50 56.5 55 51" fill="none" stroke="#7c4004" stroke-width="2" stroke-linecap="round"/>
    </g>
</svg>
        `
    },
    girl: {
        id: 'girl',
        color: '#ff9d00',
        accent: '#489e96',
        image: null,
        headSvg: `
            <svg viewBox="4 -22 92 88" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <!-- 1. CHEVEUX ARRIERE -->
    <g id="girl-hair-back">
        <!-- Ovale arrière descendant du crâne jusqu'aux jambes -->
        <ellipse cx="50" cy="50" rx="34" ry="46" fill="#8a3c08"/>
        <path d="M 12,36 C 8,14 20,-2 50,-2 C 80,-2 92,14 88,36 C 94,50 90,64 82,70 C 78,64 76,52 76,42 C 74,32 26,32 24,42 C 24,52 22,64 18,70 C 10,64 6,50 12,36 Z" fill="#8a3c08"/>
        <circle cx="16" cy="10" r="13" fill="#8a3c08"/>
        <circle cx="84" cy="10" r="13" fill="#8a3c08"/>
        <ellipse cx="12" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(-25 12 21)"/>
        <ellipse cx="18" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(25 18 21)"/>
        <ellipse cx="82" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(-25 82 21)"/>
        <ellipse cx="88" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(25 88 21)"/>
    </g>

    <!-- 2. BASE DE LA TÊTE (Oreilles derrière le crâne, cou court) -->
    <g id="girl-head-base">
        <!-- Cou court -->
        <rect x="46" y="58" width="8" height="4" fill="#ffd4a3"/>

        <!-- Oreilles (devant les cheveux arrière, juste derrière le crâne) -->
        <g id="girl-ears">
            <circle cx="21" cy="38" r="4.8" fill="#ffd4a3"/>
            <circle cx="21" cy="38" r="2.8" fill="#f0be8d"/>
            <circle cx="79" cy="38" r="4.8" fill="#ffd4a3"/>
            <circle cx="79" cy="38" r="2.8" fill="#f0be8d"/>
        </g>

        <!-- Forme du crâne et visage (devant les oreilles) -->
        <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>

        <!-- Serre-tête turquoise & noeud -->
        <path d="M22 23 C33 16, 67 16, 78 23 L79 27 C68 20, 32 20, 21 27 Z" fill="#489e96"/>
        <circle cx="28" cy="22" r="3.5" fill="#ff9d00"/>
        <circle cx="28" cy="22" r="1.8" fill="#ffffff"/>
    </g>

    <!-- 3. CHEVEUX AVANT (Frange & mèches légères dégageant les oreilles) -->
    <g id="girl-hair-front">
        <path d="M 21,30 C 23,36 26,38 30,36 C 34,34 36,29 38,28 C 41,32 45,43 50,43 C 55,43 59,32 62,28 C 64,29 66,34 70,36 C 74,38 77,36 79,30 C 76,12 64,6 50,6 C 36,6 24,12 21,30 Z" fill="#8a3c08"/>
        <path d="M 23,30 C 23,39 25,48 27,54 C 26,46 25,38 25,30 Z" fill="#8a3c08"/>
        <path d="M 77,30 C 77,39 75,48 73,54 C 74,46 75,38 75,30 Z" fill="#8a3c08"/>
    </g>

    <!-- 4. TRAITS DU VISAGE EN AVANT-PLAN (Sourcils, yeux, nez, bouche) -->
    <g id="girl-face-features">
        <!-- Oeil gauche -->
        <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
        <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
        <ellipse cx="37.5" cy="41.5" rx="4.2" ry="4.8" fill="#6d2e05"/>
        <ellipse cx="37.5" cy="42.5" rx="3.5" ry="3.5" fill="#b45309"/>
        <circle cx="37.5" cy="41.5" r="2.2" fill="#241103"/>
        <circle cx="35.5" cy="39" r="1.8" fill="#ffffff"/>
        <circle cx="39.5" cy="43.5" r="1" fill="#ffffff"/>
        <!-- Cils manga supérieurs : 3 pointes dégressives compactes -->
        <polygon points="29.5,39.2 26.5,35.8 31.8,37.5" fill="#2b1404"/>
        <polygon points="32.2,37.2 30.8,34.2 34.2,36.0" fill="#2b1404"/>
        <polygon points="34.8,35.6 34.2,33.5 36.5,34.8" fill="#2b1404"/>
        <path d="M30 38 Q37 33 44 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
        <!-- Trait et cils inférieurs (ancrés sur le trait inférieur) -->
        <path d="M32 44.5 Q37 47.5 42 44.5" fill="none" stroke="#2b1404" stroke-width="1" stroke-linecap="round"/>
        <polygon points="33.5,45.0 34.2,47.2 35.0,45.5" fill="#2b1404"/>
        <polygon points="36.2,45.7 37.0,47.6 37.8,45.7" fill="#2b1404"/>
        <polygon points="39.0,45.5 39.8,46.9 40.5,45.0" fill="#2b1404"/>
        <path d="M43 28.5 L35.5 26.3 L31 29.5 L35.8 28.1 L43 30.5 Z" fill="#6d2e05"/>

        <!-- Oeil droit & Sourcil droit -->
        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
        <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="#6d2e05"/>
        <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="#b45309"/>
        <circle cx="62.5" cy="41.5" r="2.2" fill="#241103"/>
        <circle cx="60.5" cy="39" r="1.8" fill="#ffffff"/>
        <circle cx="64.5" cy="43.5" r="1" fill="#ffffff"/>
        <!-- Cils manga supérieurs : 3 pointes dégressives compactes -->
        <polygon points="70.5,39.2 73.5,35.8 68.2,37.5" fill="#2b1404"/>
        <polygon points="67.8,37.2 69.2,34.2 65.8,36.0" fill="#2b1404"/>
        <polygon points="65.2,35.6 65.8,33.5 63.5,34.8" fill="#2b1404"/>
        <path d="M56 38 Q63 33 70 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
        <!-- Trait et cils inférieurs (ancrés sur le trait inférieur) -->
        <path d="M58 44.5 Q63 47.5 68 44.5" fill="none" stroke="#2b1404" stroke-width="1" stroke-linecap="round"/>
        <polygon points="66.5,45.0 65.8,47.2 65.0,45.5" fill="#2b1404"/>
        <polygon points="63.8,45.7 63.0,47.6 62.2,45.7" fill="#2b1404"/>
        <polygon points="61.0,45.5 60.2,46.9 59.5,45.0" fill="#2b1404"/>
        <path d="M57 28.5 L64.5 26.3 L69 29.5 L64.2 28.1 L57 30.5 Z" fill="#6d2e05"/>

        <!-- Nez et bouche (positionnés plus bas) -->
        <circle cx="50" cy="47.5" r="0.9" fill="#d99866"/>
        <path d="M45 51 Q50 56.5 55 51" fill="none" stroke="#7c4004" stroke-width="2" stroke-linecap="round"/>
    </g>
</svg>
        `,
        svg: `
            <svg viewBox="0 -22 100 144" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
    <!-- 1. OMBRE AU SOL -->
    <g id="girl-shadow">
        <ellipse cx="50" cy="116" rx="16" ry="3" fill="rgba(124, 64, 4, 0.18)"/>
    </g>

    <!-- 2. GROUPE CHEVEUX ARRIERE -->
    <g id="girl-hair-back-full">
        <!-- Ovale arrière descendant du crâne jusqu'aux jambes -->
        <ellipse cx="50" cy="50" rx="34" ry="46" fill="#8a3c08"/>
        <path d="M 12,36 C 8,14 20,-2 50,-2 C 80,-2 92,14 88,36 C 94,50 90,64 82,70 C 78,64 76,52 76,42 C 74,32 26,32 24,42 C 24,52 22,64 18,70 C 10,64 6,50 12,36 Z" fill="#8a3c08"/>
        <circle cx="16" cy="10" r="13" fill="#8a3c08"/>
        <circle cx="84" cy="10" r="13" fill="#8a3c08"/>
        <ellipse cx="12" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(-25 12 21)"/>
        <ellipse cx="18" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(25 18 21)"/>
        <ellipse cx="82" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(-25 82 21)"/>
        <ellipse cx="88" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(25 88 21)"/>
    </g>

    <!-- 3. JAMBES & CHAUSSURES (Jambes rapprochées en trapèze & chaussures compactes) -->
    <g id="girl-legs">
        <!-- Jambe gauche (trapèze resserré) -->
        <polygon points="39,88 49,88 48,106 41,106" fill="#ffd4a3"/>
        <!-- Chaussette montante gauche -->
        <polygon points="40,96 48.5,96 48,106 41,106" fill="#489e96"/>
        <polygon points="40,96 48.5,96 48.3,98 40.2,98" fill="#ffffff"/>
        <!-- Chaussure gauche -->
        <path d="M39.5 106 C39.5 104, 49.5 104, 49.5 106 L50 113 C50 115, 39 115, 39 113 Z" fill="#ff9d00"/>
        <path d="M38.5 112 L50.5 112 L50 114 L39 114 Z" fill="#c47000"/>
        <rect x="42.5" y="107" width="4" height="2" rx="0.8" fill="#ffffff"/>

        <!-- Jambe droite (trapèze resserré) -->
        <polygon points="51,88 61,88 59,106 52,106" fill="#ffd4a3"/>
        <!-- Chaussette montante droite -->
        <polygon points="51.5,96 60,96 59,106 52,106" fill="#489e96"/>
        <polygon points="51.5,96 60,96 59.8,98 51.7,98" fill="#ffffff"/>
        <!-- Chaussure droite -->
        <path d="M50.5 106 C50.5 104, 60.5 104, 60.5 106 L61 113 C61 115, 50 115, 50 113 Z" fill="#ff9d00"/>
        <path d="M49.5 112 L61.5 112 L61 114 L50 114 Z" fill="#c47000"/>
        <rect x="53.5" y="107" width="4" height="2" rx="0.8" fill="#ffffff"/>
    </g>

    <!-- 4. CORPS & JUPE (Veste en trapèze élégant connectée aux épaules & jupe plissée) -->
    <g id="girl-body">
        <path d="M38 82 C38 82, 44 83.5, 50 83.5 C56 83.5, 62 82, 62 82 C70 85, 76 89, 76 91.5 C60 94, 40 94, 24 91.5 C24 89, 30 85, 38 82 Z" fill="#5c3818"/>
        <path d="M40 83 C40 85, 38 88, 37 92" stroke="#40240d" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M50 83.5 L50 93.5" stroke="#40240d" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M60 83 C60 85, 62 88, 63 92" stroke="#40240d" stroke-width="1.2" stroke-linecap="round"/>

        <path d="M32 62 L68 62 L62 82 L38 82 Z" fill="#ff9d00"/>
        <path d="M44 60 L50 71 L56 60 Z" fill="#ffffff"/>
        <circle cx="50" cy="66" r="2.5" fill="#489e96"/>
        <polygon points="46,64 50,66 46,69" fill="#489e96"/>
        <polygon points="54,64 50,66 54,69" fill="#489e96"/>
        <circle cx="50" cy="73" r="1.5" fill="#ffde6a"/>
        <circle cx="50" cy="77" r="1.5" fill="#ffde6a"/>
    </g>

    <!-- 5. CEINTURE & ACCESSOIRES (Ceinture ajustée sur la taille) -->
    <g id="girl-belt">
        <rect x="37" y="80.5" width="26" height="4" rx="1" fill="#7c4004"/>
        <rect x="47" y="79.5" width="6" height="6" rx="1.2" fill="#ffb733" stroke="#7c4004" stroke-width="0.8"/>
        <rect x="58.5" y="80.5" width="3.5" height="5.5" rx="1.2" fill="#66bcb4" stroke="#7c4004" stroke-width="0.8"/>
        <circle cx="60.2" cy="83.2" r="0.7" fill="#ffffff"/>
    </g>

    <!-- 6. BRAS & MAINS (Un seul ovale pour la main chibi) -->
    <g id="girl-arms">
        <!-- Bras gauche -->
        <path d="M33 64 C25 69, 23 76, 26 83 C29 83, 32 79, 35 75 Z" fill="#ff9d00"/>
        <ellipse cx="26" cy="83" rx="3.6" ry="3.3" fill="#ffd4a3"/>

        <!-- Bras droit -->
        <path d="M67 64 C75 68, 77 72, 76 79 C73 81, 70 79, 66 75 Z" fill="#ff9d00"/>
        <ellipse cx="77" cy="77" rx="3.6" ry="3.3" fill="#ffd4a3"/>
    </g>

    <!-- 7. BASE DE LA TÊTE (Oreilles derrière le crâne, cou court) -->
    <g id="girl-head-base-full">
        <!-- Cou court -->
        <rect x="46" y="58" width="8" height="4" fill="#ffd4a3"/>

        <!-- Oreilles (devant les cheveux arrière, juste derrière le crâne) -->
        <g id="girl-ears-full">
            <circle cx="21" cy="38" r="4.8" fill="#ffd4a3"/>
            <circle cx="21" cy="38" r="2.8" fill="#f0be8d"/>
            <circle cx="79" cy="38" r="4.8" fill="#ffd4a3"/>
            <circle cx="79" cy="38" r="2.8" fill="#f0be8d"/>
        </g>

        <!-- Forme du crâne et visage (devant les oreilles) -->
        <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>

        <!-- Serre-tête turquoise & noeud -->
        <path d="M22 23 C33 16, 67 16, 78 23 L79 27 C68 20, 32 20, 21 27 Z" fill="#489e96"/>
        <circle cx="28" cy="22" r="3.5" fill="#ff9d00"/>
        <circle cx="28" cy="22" r="1.8" fill="#ffffff"/>
    </g>

    <!-- 8. CHEVEUX AVANT (Frange & mèches légères dégageant les oreilles) -->
    <g id="girl-hair-front-full">
        <path d="M 21,30 C 23,36 26,38 30,36 C 34,34 36,29 38,28 C 41,32 45,43 50,43 C 55,43 59,32 62,28 C 64,29 66,34 70,36 C 74,38 77,36 79,30 C 76,12 64,6 50,6 C 36,6 24,12 21,30 Z" fill="#8a3c08"/>
        <path d="M 23,30 C 23,39 25,48 27,54 C 26,46 25,38 25,30 Z" fill="#8a3c08"/>
        <path d="M 77,30 C 77,39 75,48 73,54 C 74,46 75,38 75,30 Z" fill="#8a3c08"/>
    </g>

    <!-- 9. TRAITS DU VISAGE EN AVANT-PLAN (Sourcils, yeux, nez, bouche) -->
    <g id="girl-face-features-full">
        <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
        <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
        <ellipse cx="37.5" cy="41.5" rx="4.2" ry="4.8" fill="#6d2e05"/>
        <ellipse cx="37.5" cy="42.5" rx="3.5" ry="3.5" fill="#b45309"/>
        <circle cx="37.5" cy="41.5" r="2.2" fill="#241103"/>
        <circle cx="35.5" cy="39" r="1.8" fill="#ffffff"/>
        <circle cx="39.5" cy="43.5" r="1" fill="#ffffff"/>
        <!-- Cils manga supérieurs : 3 pointes dégressives compactes -->
        <polygon points="29.5,39.2 26.5,35.8 31.8,37.5" fill="#2b1404"/>
        <polygon points="32.2,37.2 30.8,34.2 34.2,36.0" fill="#2b1404"/>
        <polygon points="34.8,35.6 34.2,33.5 36.5,34.8" fill="#2b1404"/>
        <path d="M30 38 Q37 33 44 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
        <!-- Trait et cils inférieurs (ancrés sur le trait inférieur) -->
        <path d="M32 44.5 Q37 47.5 42 44.5" fill="none" stroke="#2b1404" stroke-width="1" stroke-linecap="round"/>
        <polygon points="33.5,45.0 34.2,47.2 35.0,45.5" fill="#2b1404"/>
        <polygon points="36.2,45.7 37.0,47.6 37.8,45.7" fill="#2b1404"/>
        <polygon points="39.0,45.5 39.8,46.9 40.5,45.0" fill="#2b1404"/>
        <path d="M43 28.5 L35.5 26.3 L31 29.5 L35.8 28.1 L43 30.5 Z" fill="#6d2e05"/>

        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
        <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="#6d2e05"/>
        <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="#b45309"/>
        <circle cx="62.5" cy="41.5" r="2.2" fill="#241103"/>
        <circle cx="60.5" cy="39" r="1.8" fill="#ffffff"/>
        <circle cx="64.5" cy="43.5" r="1" fill="#ffffff"/>
        <!-- Cils manga supérieurs : 3 pointes dégressives compactes -->
        <polygon points="70.5,39.2 73.5,35.8 68.2,37.5" fill="#2b1404"/>
        <polygon points="67.8,37.2 69.2,34.2 65.8,36.0" fill="#2b1404"/>
        <polygon points="65.2,35.6 65.8,33.5 63.5,34.8" fill="#2b1404"/>
        <path d="M56 38 Q63 33 70 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
        <!-- Trait et cils inférieurs (ancrés sur le trait inférieur) -->
        <path d="M58 44.5 Q63 47.5 68 44.5" fill="none" stroke="#2b1404" stroke-width="1" stroke-linecap="round"/>
        <polygon points="66.5,45.0 65.8,47.2 65.0,45.5" fill="#2b1404"/>
        <polygon points="63.8,45.7 63.0,47.6 62.2,45.7" fill="#2b1404"/>
        <polygon points="61.0,45.5 60.2,46.9 59.5,45.0" fill="#2b1404"/>
        <path d="M57 28.5 L64.5 26.3 L69 29.5 L64.2 28.1 L57 30.5 Z" fill="#6d2e05"/>

        <!-- Nez et bouche (positionnés plus bas) -->
        <circle cx="50" cy="47.5" r="0.9" fill="#d99866"/>
        <path d="M45 51 Q50 56.5 55 51" fill="none" stroke="#7c4004" stroke-width="2" stroke-linecap="round"/>
    </g>
</svg>
        `
    }
};

export function renderAvatarSvg(avatarId = 'boy') {
    const avatar = AVATARS[avatarId] || AVATARS.boy;
    if (avatar.image) {
        return `<img src="${avatar.image}" alt="Avatar" class="w-full h-full object-contain" />`;
    }
    return avatar.svg;
}

export function renderAvatarHeadSvg(avatarId = 'boy') {
    const avatar = AVATARS[avatarId] || AVATARS.boy;
    if (avatar.image) {
        return `<img src="${avatar.image}" alt="Avatar" class="w-full h-full object-cover object-top" />`;
    }
    return avatar.headSvg || avatar.svg;
}
