/**
 * Module de définition et rendu des Avatars (Style Manga Chibi)
 * Structure de composition stricte en calques sémantiques <g> :
 * 1. Ombre au sol (<g id="...-shadow">)
 * 2. Cheveux arrière (<g id="...-hair-back">)
 * 3. Jambes & Chaussures (<g id="...-legs">)
 * 4. Corps & Vêtements (<g id="...-body">)
 * 5. Ceinture & Accessoires (<g id="...-belt">)
 * 6. Bras & Mains (<g id="...-arms">)
 * 7. Base de la tête (<g id="...-head-base">)
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
            <svg viewBox="4 -8 92 80" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
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

    <!-- 2. BASE DE LA TÊTE (Cou, crâne, oreilles, bandeau) -->
    <g id="boy-head-base">
        <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>
        <path d="M42 63 L50 65 L58 63 Z" fill="#ff9d00"/>

        <!-- Forme du crâne et visage -->
        <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>

        <!-- Oreilles -->
        <circle cx="22" cy="38" r="4.5" fill="#ffd4a3"/>
        <circle cx="22" cy="38" r="2.5" fill="#f0be8d"/>
        <circle cx="78" cy="38" r="4.5" fill="#ffd4a3"/>
        <circle cx="78" cy="38" r="2.5" fill="#f0be8d"/>

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
        <path d="M32 31 Q38 27 43 30" fill="none" stroke="#542c0e" stroke-width="2.2" stroke-linecap="round"/>

        <!-- Oeil droit & Sourcil droit -->
        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
        <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="#542c0e"/>
        <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="#8c4e1e"/>
        <circle cx="62.5" cy="41.5" r="2.2" fill="#241103"/>
        <circle cx="60.5" cy="39" r="1.8" fill="#ffffff"/>
        <circle cx="64.5" cy="43.5" r="0.9" fill="#ffffff"/>
        <path d="M56 38 Q63 34 70 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M57 30 Q62 27 68 31" fill="none" stroke="#542c0e" stroke-width="2.2" stroke-linecap="round"/>

        <!-- Nez et bouche -->
        <circle cx="50" cy="44" r="0.9" fill="#d99866"/>
        <path d="M45 48 Q50 54 55 48" fill="none" stroke="#7c4004" stroke-width="2" stroke-linecap="round"/>
    </g>
</svg>
        `,
        svg: `
            <svg viewBox="0 -8 100 133" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
    <!-- 1. OMBRE AU SOL -->
    <g id="boy-shadow">
        <ellipse cx="50" cy="120" rx="24" ry="4" fill="rgba(124, 64, 4, 0.18)"/>
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

    <!-- 3. JAMBES & CHAUSSURES -->
    <g id="boy-legs">
        <!-- Jambe gauche -->
        <rect x="36" y="86" width="10" height="18" rx="4" fill="#5c3818"/>
        <rect x="35" y="98" width="12" height="7" rx="2" fill="#ffffff"/>
        <rect x="35" y="100" width="12" height="2" fill="#ff9d00"/>
        <path d="M33 105 C33 102, 47 102, 47 105 L48 116 C48 118, 30 118, 30 116 Z" fill="#7c4004"/>
        <path d="M29 114 L49 114 L48 118 L28 118 Z" fill="#442100"/>
        <rect x="34" y="107" width="9" height="3" rx="1" fill="#ff9d00"/>

        <!-- Jambe droite -->
        <rect x="54" y="86" width="10" height="18" rx="4" fill="#5c3818"/>
        <rect x="53" y="98" width="12" height="7" rx="2" fill="#ffffff"/>
        <rect x="53" y="100" width="12" height="2" fill="#ff9d00"/>
        <path d="M53 105 C53 102, 67 102, 67 105 L70 116 C70 118, 52 118, 52 116 Z" fill="#7c4004"/>
        <path d="M51 114 L71 114 L72 118 L52 118 Z" fill="#442100"/>
        <rect x="57" y="107" width="9" height="3" rx="1" fill="#ff9d00"/>
    </g>

    <!-- 4. CORPS & VETEMENTS (Kimono en trapèze élégant) -->
    <g id="boy-body">
        <path d="M32 66 L68 66 L62 85 L38 85 Z" fill="#ffffff"/>
        <path d="M32 66 C32 66, 40 75, 43 85 L38 85 L30 69 Z" fill="#489e96"/>
        <path d="M68 66 C68 66, 60 75, 57 85 L62 85 L70 69 Z" fill="#489e96"/>
        <path d="M42 63 L50 72 L58 63 Z" fill="#ff9d00"/>
        <path d="M47 70 L50 80 L53 70 Z" fill="#e08900"/>
    </g>

    <!-- 5. CEINTURE / OBI & ACCESSOIRES -->
    <g id="boy-belt">
        <rect x="36" y="84" width="28" height="5" rx="1" fill="#7c4004"/>
        <rect x="46" y="83" width="8" height="7" rx="1.5" fill="#ffb733" stroke="#7c4004" stroke-width="1"/>
        <rect x="34" y="84" width="5" height="8" rx="1.5" fill="#995208" stroke="#5c3818" stroke-width="0.8"/>
        <circle cx="36.5" cy="88" r="0.8" fill="#ffb733"/>
    </g>

    <!-- 6. BRAS & MAINS (2 ovales : paume + pouce) -->
    <g id="boy-arms">
        <!-- Bras gauche -->
        <path d="M32 68 C24 74, 23 80, 29 85 C32 85, 34 82, 35 78 Z" fill="#489e96"/>
        <ellipse cx="29" cy="85" rx="3.8" ry="3.5" fill="#ffd4a3"/>
        <ellipse cx="32" cy="83" rx="2" ry="1.4" fill="#ffd4a3" transform="rotate(-30 32 83)"/>

        <!-- Bras droit -->
        <path d="M68 68 C76 72, 78 74, 76 80 C73 82, 70 80, 66 76 Z" fill="#489e96"/>
        <ellipse cx="77" cy="80" rx="3.8" ry="3.5" fill="#ffd4a3"/>
        <ellipse cx="74" cy="78" rx="2" ry="1.4" fill="#ffd4a3" transform="rotate(30 74 78)"/>
    </g>

    <!-- 7. BASE DE LA TÊTE (Cou, crâne, oreilles, bandeau) -->
    <g id="boy-head-base-full">
        <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>
        <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>
        <circle cx="22" cy="38" r="4.5" fill="#ffd4a3"/>
        <circle cx="22" cy="38" r="2.5" fill="#f0be8d"/>
        <circle cx="78" cy="38" r="4.5" fill="#ffd4a3"/>
        <circle cx="78" cy="38" r="2.5" fill="#f0be8d"/>

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
        <path d="M32 31 Q38 27 43 30" fill="none" stroke="#542c0e" stroke-width="2.2" stroke-linecap="round"/>

        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
        <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="#542c0e"/>
        <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="#8c4e1e"/>
        <circle cx="62.5" cy="41.5" r="2.2" fill="#241103"/>
        <circle cx="60.5" cy="39" r="1.8" fill="#ffffff"/>
        <circle cx="64.5" cy="43.5" r="0.9" fill="#ffffff"/>
        <path d="M56 38 Q63 34 70 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M57 30 Q62 27 68 31" fill="none" stroke="#542c0e" stroke-width="2.2" stroke-linecap="round"/>

        <circle cx="50" cy="44" r="0.9" fill="#d99866"/>
        <path d="M45 48 Q50 54 55 48" fill="none" stroke="#7c4004" stroke-width="2" stroke-linecap="round"/>
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
            <svg viewBox="4 -6 92 78" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
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

    <!-- 2. BASE DE LA TÊTE (Cou, crâne, oreilles, serre-tête) -->
    <g id="girl-head-base">
        <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>
        <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>
        <circle cx="23" cy="38" r="4.5" fill="#ffd4a3"/>
        <circle cx="77" cy="38" r="4.5" fill="#ffd4a3"/>

        <!-- Serre-tête turquoise & noeud -->
        <path d="M22 23 C33 16, 67 16, 78 23 L79 27 C68 20, 32 20, 21 27 Z" fill="#489e96"/>
        <circle cx="28" cy="22" r="3.5" fill="#ff9d00"/>
        <circle cx="28" cy="22" r="1.8" fill="#ffffff"/>
    </g>

    <!-- 3. CHEVEUX AVANT (Frange et mèches de joues) -->
    <g id="girl-hair-front">
        <path d="M 18,28 C 22,38 30,42 36,34 C 40,42 46,44 50,35 C 54,44 60,42 64,34 C 70,42 78,38 82,28 C 76,12 64,6 50,6 C 36,6 24,12 18,28 Z" fill="#8a3c08"/>
        <path d="M 18,28 C 14,40 16,54 24,60 C 24,50 22,40 22,30 Z" fill="#8a3c08"/>
        <path d="M 82,28 C 86,40 84,54 76,60 C 76,50 78,40 78,30 Z" fill="#8a3c08"/>
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
        <path d="M30 38 Q37 33 44 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M31 35 L34 37" stroke="#2b1404" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M32 30 Q37 26 43 29" fill="none" stroke="#7c3405" stroke-width="1.8" stroke-linecap="round"/>

        <!-- Oeil droit & Sourcil droit -->
        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
        <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="#6d2e05"/>
        <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="#b45309"/>
        <circle cx="62.5" cy="41.5" r="2.2" fill="#241103"/>
        <circle cx="60.5" cy="39" r="1.8" fill="#ffffff"/>
        <circle cx="64.5" cy="43.5" r="1" fill="#ffffff"/>
        <path d="M56 38 Q63 33 70 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M69 35 L66 37" stroke="#2b1404" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M57 29 Q63 26 68 30" fill="none" stroke="#7c3405" stroke-width="1.8" stroke-linecap="round"/>

        <!-- Nez et bouche -->
        <circle cx="50" cy="44" r="0.9" fill="#d99866"/>
        <path d="M45 48 Q50 54 55 48" fill="none" stroke="#7c4004" stroke-width="2" stroke-linecap="round"/>
    </g>
</svg>
        `,
        svg: `
            <svg viewBox="0 -6 100 131" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
    <!-- 1. OMBRE AU SOL -->
    <g id="girl-shadow">
        <ellipse cx="50" cy="120" rx="24" ry="4" fill="rgba(124, 64, 4, 0.18)"/>
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

    <!-- 3. JAMBES & CHAUSSURES -->
    <g id="girl-legs">
        <!-- Jambe gauche -->
        <rect x="36" y="86" width="10" height="18" rx="4" fill="#ffd4a3"/>
        <rect x="35" y="94" width="12" height="11" rx="2" fill="#489e96"/>
        <rect x="35" y="96" width="12" height="2" fill="#ffffff"/>
        <path d="M33 105 C33 102, 47 102, 47 105 L48 116 C48 118, 30 118, 30 116 Z" fill="#ff9d00"/>
        <path d="M29 114 L49 114 L48 118 L28 118 Z" fill="#c47000"/>
        <rect x="34" y="106" width="9" height="3" rx="1.5" fill="#ffffff"/>

        <!-- Jambe droite -->
        <rect x="54" y="86" width="10" height="18" rx="4" fill="#ffd4a3"/>
        <rect x="53" y="94" width="12" height="11" rx="2" fill="#489e96"/>
        <rect x="53" y="96" width="12" height="2" fill="#ffffff"/>
        <path d="M53 105 C53 102, 67 102, 67 105 L70 116 C70 118, 52 118, 52 116 Z" fill="#ff9d00"/>
        <path d="M51 114 L71 114 L72 118 L52 118 Z" fill="#c47000"/>
        <rect x="57" y="106" width="9" height="3" rx="1.5" fill="#ffffff"/>
    </g>

    <!-- 4. CORPS & JUPE (Veste en trapèze élégant & jupe plissée) -->
    <g id="girl-body">
        <path d="M38 82 C38 82, 44 83.5, 50 83.5 C56 83.5, 62 82, 62 82 C70 85, 76 89, 76 91.5 C60 94, 40 94, 24 91.5 C24 89, 30 85, 38 82 Z" fill="#5c3818"/>
        <path d="M40 83 C40 85, 38 88, 37 92" stroke="#40240d" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M50 83.5 L50 93.5" stroke="#40240d" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M60 83 C60 85, 62 88, 63 92" stroke="#40240d" stroke-width="1.2" stroke-linecap="round"/>

        <path d="M32 66 L68 66 L62 82 L38 82 Z" fill="#ff9d00"/>
        <path d="M44 64 L50 74 L56 64 Z" fill="#ffffff"/>
        <circle cx="50" cy="69" r="2.5" fill="#489e96"/>
        <polygon points="46,67 50,69 46,72" fill="#489e96"/>
        <polygon points="54,67 50,69 54,72" fill="#489e96"/>
        <circle cx="50" cy="76" r="1.5" fill="#ffde6a"/>
        <circle cx="50" cy="80" r="1.5" fill="#ffde6a"/>
    </g>

    <!-- 5. CEINTURE & ACCESSOIRES -->
    <g id="girl-belt">
        <rect x="37" y="81" width="26" height="4" fill="#7c4004"/>
        <rect x="47" y="80" width="6" height="6" rx="1" fill="#ffb733"/>
        <rect x="60" y="81" width="3.5" height="5.5" rx="1.2" fill="#66bcb4" stroke="#7c4004" stroke-width="0.8"/>
        <circle cx="61.7" cy="83.8" r="0.8" fill="#ffffff"/>
    </g>

    <!-- 6. BRAS & MAINS (2 ovales : paume + pouce) -->
    <g id="girl-arms">
        <!-- Bras gauche -->
        <path d="M33 68 C25 72, 23 78, 26 84 C29 84, 32 80, 35 76 Z" fill="#ff9d00"/>
        <ellipse cx="26" cy="84" rx="3.6" ry="3.3" fill="#ffd4a3"/>
        <ellipse cx="29" cy="82" rx="1.8" ry="1.3" fill="#ffd4a3" transform="rotate(-30 29 82)"/>

        <!-- Bras droit -->
        <path d="M67 68 C75 70, 77 74, 76 80 C73 82, 70 80, 66 76 Z" fill="#ff9d00"/>
        <ellipse cx="77" cy="78" rx="3.6" ry="3.3" fill="#ffd4a3"/>
        <ellipse cx="74" cy="76" rx="1.8" ry="1.3" fill="#ffd4a3" transform="rotate(30 74 76)"/>
    </g>

    <!-- 7. BASE DE LA TÊTE (Cou, crâne, oreilles, serre-tête) -->
    <g id="girl-head-base-full">
        <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>
        <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>
        <circle cx="23" cy="38" r="4.5" fill="#ffd4a3"/>
        <circle cx="77" cy="38" r="4.5" fill="#ffd4a3"/>

        <!-- Serre-tête turquoise & noeud -->
        <path d="M22 23 C33 16, 67 16, 78 23 L79 27 C68 20, 32 20, 21 27 Z" fill="#489e96"/>
        <circle cx="28" cy="22" r="3.5" fill="#ff9d00"/>
        <circle cx="28" cy="22" r="1.8" fill="#ffffff"/>
    </g>

    <!-- 8. CHEVEUX AVANT (Frange et mèches) -->
    <g id="girl-hair-front-full">
        <path d="M 18,28 C 22,38 30,42 36,34 C 40,42 46,44 50,35 C 54,44 60,42 64,34 C 70,42 78,38 82,28 C 76,12 64,6 50,6 C 36,6 24,12 18,28 Z" fill="#8a3c08"/>
        <path d="M 18,28 C 14,40 16,54 24,60 C 24,50 22,40 22,30 Z" fill="#8a3c08"/>
        <path d="M 82,28 C 86,40 84,54 76,60 C 76,50 78,40 78,30 Z" fill="#8a3c08"/>
    </g>

    <!-- 9. TRAITS DU VISAGE EN AVANT-PLAN (Sourcils, yeux, nez, bouche) -->
    <g id="girl-face-features-full">
        <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
        <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
        <ellipse cx="37.5" cy="41.5" rx="4.2" ry="4.8" fill="#6d2e05"/>
        <ellipse cx="37.5" cy="42.5" rx="3.5" ry="3.5" fill="#b45309"/>
        <circle cx="37.5" cy="41.5" r="2.2" fill="#2b1404"/>
        <circle cx="35.5" cy="39" r="1.8" fill="#ffffff"/>
        <circle cx="39.5" cy="43.5" r="1" fill="#ffffff"/>
        <path d="M30 38 Q37 33 44 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M31 35 L34 37" stroke="#2b1404" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M32 30 Q37 26 43 29" fill="none" stroke="#7c3405" stroke-width="1.8" stroke-linecap="round"/>

        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
        <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
        <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="#6d2e05"/>
        <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="#b45309"/>
        <circle cx="62.5" cy="41.5" r="2.2" fill="#2b1404"/>
        <circle cx="60.5" cy="39" r="1.8" fill="#ffffff"/>
        <circle cx="64.5" cy="43.5" r="1" fill="#ffffff"/>
        <path d="M56 38 Q63 33 70 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M69 35 L66 37" stroke="#2b1404" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M57 29 Q63 26 68 30" fill="none" stroke="#7c3405" stroke-width="1.8" stroke-linecap="round"/>

        <circle cx="50" cy="44" r="0.9" fill="#d99866"/>
        <path d="M45 48 Q50 54 55 48" fill="none" stroke="#7c4004" stroke-width="2" stroke-linecap="round"/>
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
