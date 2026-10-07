/**
 * Module de définition et rendu des Avatars (Style Manga Chibi)
 * Structure en 2 groupes capillaires superposés : cheveux arrière + cheveux avant.
 * Teinte 100% uniforme par personnage pour validation de la coupe.
 */

export const AVATARS = {
    boy: {
        id: 'boy',
        color: '#489e96',
        accent: '#ff9d00',
        image: null,
        headSvg: `
            <svg viewBox="4 -6 92 78" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <!-- GROUPE 1 : CHEVEUX ARRIERE (Même teinte #5a2d0c) -->
    <g id="boy-hair-back">
        <!-- Grande masse arriere shonen volumineuse -->
        <path d="M 14,38 C 8,24 8,12 16,4 C 22,-2 30,-6 38,-4 C 36,-12 46,-16 52,-8 C 58,-16 72,-12 74,-4 C 82,-8 90,0 92,10 C 98,22 94,34 90,40 C 94,48 90,62 82,66 C 78,58 76,46 76,38 C 74,32 26,32 24,38 C 24,46 22,58 18,66 C 10,62 8,48 14,38 Z" fill="#5a2d0c"/>
        <!-- Meches dynamiques orientees (gauche, haut, droite) -->
        <path d="M 16,24 C 6,16 4,4 10,-4 C 16,2 20,12 22,20 Z" fill="#5a2d0c"/>
        <path d="M 30,0 C 26,-10 32,-16 40,-12 C 38,-4 36,2 34,8 Z" fill="#5a2d0c"/>
        <path d="M 46,-8 C 52,-20 62,-18 64,-8 C 58,-2 54,2 50,4 Z" fill="#5a2d0c"/>
        <path d="M 68,-4 C 76,-16 88,-12 86,-2 C 80,4 76,8 72,12 Z" fill="#5a2d0c"/>
        <path d="M 88,20 C 98,10 102,18 98,28 C 92,30 88,28 86,24 Z" fill="#5a2d0c"/>
    </g>

    <!-- GROUPE 2 : TETE ET VISAGE -->
    <g id="boy-head">
        <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>
        <path d="M42 63 L50 65 L58 63 Z" fill="#ff9d00"/>

        <!-- Crane et visage -->
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

        <!-- Oeil droit -->
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

    <!-- GROUPE 3 : CHEVEUX AVANT (Même teinte #5a2d0c) -->
    <g id="boy-hair-front">
        <!-- Frange et meches avant dynamiques courbees qui tombent sur le front -->
        <path d="M 16,28 C 20,8 32,2 50,2 C 68,2 80,8 84,28 C 86,38 82,48 76,52 C 74,44 76,34 74,28 C 70,36 64,42 60,34 C 58,42 50,46 46,36 C 44,44 36,46 32,36 C 30,42 26,48 22,42 C 18,48 14,40 16,28 Z" fill="#5a2d0c"/>
        <path d="M 40,16 C 46,30 54,34 50,44 C 44,36 40,26 40,16 Z" fill="#5a2d0c"/>
        <path d="M 18,28 C 14,38 16,50 22,54 C 20,44 20,36 22,28 Z" fill="#5a2d0c"/>
        <path d="M 82,28 C 86,38 84,50 78,54 C 80,44 80,36 78,28 Z" fill="#5a2d0c"/>
    </g>
</svg>
        `,
        svg: `
            <svg viewBox="0 -6 100 131" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
    <!-- Ombre au sol -->
    <ellipse cx="50" cy="120" rx="24" ry="4" fill="rgba(124, 64, 4, 0.18)"/>

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

    <!-- Corps / Kimono -->
    <path d="M34 66 L66 66 L64 88 L36 88 Z" fill="#ffffff"/>
    <path d="M33 66 C33 66, 40 76, 44 88 L34 88 L31 70 Z" fill="#489e96"/>
    <path d="M67 66 C67 66, 60 76, 56 88 L66 88 L69 70 Z" fill="#489e96"/>
    <path d="M42 63 L50 72 L58 63 Z" fill="#ff9d00"/>
    <path d="M47 70 L50 80 L53 70 Z" fill="#e08900"/>

    <!-- Ceinture / Obi -->
    <rect x="33" y="84" width="34" height="5" rx="1" fill="#7c4004"/>
    <rect x="46" y="83" width="8" height="7" rx="1.5" fill="#ffb733" stroke="#7c4004" stroke-width="1"/>
    <rect x="31" y="84" width="6" height="8" rx="1.5" fill="#995208" stroke="#5c3818" stroke-width="0.8"/>
    <circle cx="34" cy="88" r="0.8" fill="#ffb733"/>

    <!-- Bras gauche -->
    <path d="M32 68 C24 74, 23 80, 29 85 C32 85, 34 82, 35 78 Z" fill="#489e96"/>
    <circle cx="30" cy="85" r="4" fill="#ffd4a3"/>

    <!-- Bras droit -->
    <path d="M68 68 C76 72, 78 74, 76 80 C73 82, 70 80, 66 76 Z" fill="#489e96"/>
    <circle cx="77" cy="80" r="4.2" fill="#ffd4a3"/>

    <!-- GROUPE 1 : CHEVEUX ARRIERE -->
    <g id="boy-hair-back-full">
        <path d="M 14,38 C 8,24 8,12 16,4 C 22,-2 30,-6 38,-4 C 36,-12 46,-16 52,-8 C 58,-16 72,-12 74,-4 C 82,-8 90,0 92,10 C 98,22 94,34 90,40 C 94,48 90,62 82,66 C 78,58 76,46 76,38 C 74,32 26,32 24,38 C 24,46 22,58 18,66 C 10,62 8,48 14,38 Z" fill="#5a2d0c"/>
        <path d="M 16,24 C 6,16 4,4 10,-4 C 16,2 20,12 22,20 Z" fill="#5a2d0c"/>
        <path d="M 30,0 C 26,-10 32,-16 40,-12 C 38,-4 36,2 34,8 Z" fill="#5a2d0c"/>
        <path d="M 46,-8 C 52,-20 62,-18 64,-8 C 58,-2 54,2 50,4 Z" fill="#5a2d0c"/>
        <path d="M 68,-4 C 76,-16 88,-12 86,-2 C 80,4 76,8 72,12 Z" fill="#5a2d0c"/>
        <path d="M 88,20 C 98,10 102,18 98,28 C 92,30 88,28 86,24 Z" fill="#5a2d0c"/>
    </g>

    <!-- GROUPE 2 : TETE ET VISAGE -->
    <g id="boy-head-full">
        <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>
        <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>
        <circle cx="22" cy="38" r="4.5" fill="#ffd4a3"/>
        <circle cx="22" cy="38" r="2.5" fill="#f0be8d"/>
        <circle cx="78" cy="38" r="4.5" fill="#ffd4a3"/>
        <circle cx="78" cy="38" r="2.5" fill="#f0be8d"/>

        <path d="M22 24 C33 17, 67 17, 78 24 L79 28 C68 21, 32 21, 21 28 Z" fill="#489e96"/>
        <rect x="45" y="19" width="10" height="6" rx="1.5" fill="#ff9d00"/>
        <circle cx="50" cy="22" r="1.5" fill="#ffffff"/>

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

    <!-- GROUPE 3 : CHEVEUX AVANT -->
    <g id="boy-hair-front-full">
        <path d="M 16,28 C 20,8 32,2 50,2 C 68,2 80,8 84,28 C 86,38 82,48 76,52 C 74,44 76,34 74,28 C 70,36 64,42 60,34 C 58,42 50,46 46,36 C 44,44 36,46 32,36 C 30,42 26,48 22,42 C 18,48 14,40 16,28 Z" fill="#5a2d0c"/>
        <path d="M 40,16 C 46,30 54,34 50,44 C 44,36 40,26 40,16 Z" fill="#5a2d0c"/>
        <path d="M 18,28 C 14,38 16,50 22,54 C 20,44 20,36 22,28 Z" fill="#5a2d0c"/>
        <path d="M 82,28 C 86,38 84,50 78,54 C 80,44 80,36 78,28 Z" fill="#5a2d0c"/>
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
    <!-- GROUPE 1 : CHEVEUX ARRIERE (Même teinte #8a3c08) -->
    <g id="girl-hair-back">
        <path d="M 12,36 C 8,14 20,-2 50,-2 C 80,-2 92,14 88,36 C 94,50 90,64 82,70 C 78,64 76,52 76,42 C 74,32 26,32 24,42 C 24,52 22,64 18,70 C 10,64 6,50 12,36 Z" fill="#8a3c08"/>
        <circle cx="16" cy="10" r="13" fill="#8a3c08"/>
        <circle cx="84" cy="10" r="13" fill="#8a3c08"/>
        <ellipse cx="12" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(-25 12 21)"/>
        <ellipse cx="18" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(25 18 21)"/>
        <ellipse cx="82" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(-25 82 21)"/>
        <ellipse cx="88" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(25 88 21)"/>
    </g>

    <!-- GROUPE 2 : TETE ET VISAGE -->
    <g id="girl-head">
        <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>
        <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>
        <circle cx="23" cy="38" r="4.5" fill="#ffd4a3"/>
        <circle cx="77" cy="38" r="4.5" fill="#ffd4a3"/>

        <path d="M22 23 C33 16, 67 16, 78 23 L79 27 C68 20, 32 20, 21 27 Z" fill="#489e96"/>
        <circle cx="28" cy="22" r="3.5" fill="#ff9d00"/>
        <circle cx="28" cy="22" r="1.8" fill="#ffffff"/>

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

    <!-- GROUPE 3 : CHEVEUX AVANT (Même teinte #8a3c08) -->
    <g id="girl-hair-front">
        <path d="M 18,28 C 22,38 30,42 36,34 C 40,42 46,44 50,35 C 54,44 60,42 64,34 C 70,42 78,38 82,28 C 76,12 64,6 50,6 C 36,6 24,12 18,28 Z" fill="#8a3c08"/>
        <path d="M 18,28 C 14,40 16,54 24,60 C 24,50 22,40 22,30 Z" fill="#8a3c08"/>
        <path d="M 82,28 C 86,40 84,54 76,60 C 76,50 78,40 78,30 Z" fill="#8a3c08"/>
    </g>
</svg>
        `,
        svg: `
            <svg viewBox="0 -6 100 131" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="120" rx="24" ry="4" fill="rgba(124, 64, 4, 0.18)"/>

    <rect x="36" y="86" width="10" height="18" rx="4" fill="#ffd4a3"/>
    <rect x="35" y="94" width="12" height="11" rx="2" fill="#489e96"/>
    <rect x="35" y="96" width="12" height="2" fill="#ffffff"/>
    <path d="M33 105 C33 102, 47 102, 47 105 L48 116 C48 118, 30 118, 30 116 Z" fill="#ff9d00"/>
    <path d="M29 114 L49 114 L48 118 L28 118 Z" fill="#c47000"/>
    <rect x="34" y="106" width="9" height="3" rx="1.5" fill="#ffffff"/>

    <rect x="54" y="86" width="10" height="18" rx="4" fill="#ffd4a3"/>
    <rect x="53" y="94" width="12" height="11" rx="2" fill="#489e96"/>
    <rect x="53" y="96" width="12" height="2" fill="#ffffff"/>
    <path d="M53 105 C53 102, 67 102, 67 105 L70 116 C70 118, 52 118, 52 116 Z" fill="#ff9d00"/>
    <path d="M51 114 L71 114 L72 118 L52 118 Z" fill="#c47000"/>
    <rect x="57" y="106" width="9" height="3" rx="1.5" fill="#ffffff"/>

    <path d="M33 82 C33 82, 40 83.5, 50 83.5 C60 83.5, 67 82, 67 82 C72 85, 76 89, 76 91.5 C60 94, 40 94, 24 91.5 C24 89, 28 85, 33 82 Z" fill="#5c3818"/>
    <path d="M38 83 C38 85, 36 88, 35 92" stroke="#40240d" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M50 83.5 L50 93.5" stroke="#40240d" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M62 83 C62 85, 64 88, 65 92" stroke="#40240d" stroke-width="1.2" stroke-linecap="round"/>

    <path d="M34 66 L66 66 L66 82 L34 82 Z" fill="#ff9d00"/>
    <path d="M44 64 L50 74 L56 64 Z" fill="#ffffff"/>
    <circle cx="50" cy="69" r="2.5" fill="#489e96"/>
    <polygon points="46,67 50,69 46,72" fill="#489e96"/>
    <polygon points="54,67 50,69 54,72" fill="#489e96"/>
    <circle cx="50" cy="76" r="1.5" fill="#ffde6a"/>
    <circle cx="50" cy="80" r="1.5" fill="#ffde6a"/>

    <rect x="33" y="81" width="34" height="4" fill="#7c4004"/>
    <rect x="47" y="80" width="6" height="6" rx="1" fill="#ffb733"/>
    <rect x="62" y="81" width="4" height="6" rx="1.5" fill="#66bcb4" stroke="#7c4004" stroke-width="0.8"/>
    <circle cx="64" cy="84" r="1" fill="#ffffff"/>

    <path d="M33 68 C25 72, 23 78, 26 84 C29 84, 32 80, 35 76 Z" fill="#ff9d00"/>
    <circle cx="26" cy="84" r="3.8" fill="#ffd4a3"/>
    <path d="M67 68 C75 70, 77 74, 76 80 C73 82, 70 80, 66 76 Z" fill="#ff9d00"/>
    <circle cx="77" cy="78" r="3.8" fill="#ffd4a3"/>

    <!-- GROUPE 1 : CHEVEUX ARRIERE -->
    <g id="girl-hair-back-full">
        <path d="M 12,36 C 8,14 20,-2 50,-2 C 80,-2 92,14 88,36 C 94,50 90,64 82,70 C 78,64 76,52 76,42 C 74,32 26,32 24,42 C 24,52 22,64 18,70 C 10,64 6,50 12,36 Z" fill="#8a3c08"/>
        <circle cx="16" cy="10" r="13" fill="#8a3c08"/>
        <circle cx="84" cy="10" r="13" fill="#8a3c08"/>
        <ellipse cx="12" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(-25 12 21)"/>
        <ellipse cx="18" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(25 18 21)"/>
        <ellipse cx="82" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(-25 82 21)"/>
        <ellipse cx="88" cy="21" rx="4" ry="2.5" fill="#489e96" transform="rotate(25 88 21)"/>
    </g>

    <!-- GROUPE 2 : TETE ET VISAGE -->
    <g id="girl-head-full">
        <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>
        <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>
        <circle cx="23" cy="38" r="4.5" fill="#ffd4a3"/>
        <circle cx="77" cy="38" r="4.5" fill="#ffd4a3"/>

        <path d="M22 23 C33 16, 67 16, 78 23 L79 27 C68 20, 32 20, 21 27 Z" fill="#489e96"/>
        <circle cx="28" cy="22" r="3.5" fill="#ff9d00"/>
        <circle cx="28" cy="22" r="1.8" fill="#ffffff"/>

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

    <!-- GROUPE 3 : CHEVEUX AVANT -->
    <g id="girl-hair-front-full">
        <path d="M 18,28 C 22,38 30,42 36,34 C 40,42 46,44 50,35 C 54,44 60,42 64,34 C 70,42 78,38 82,28 C 76,12 64,6 50,6 C 36,6 24,12 18,28 Z" fill="#8a3c08"/>
        <path d="M 18,28 C 14,40 16,54 24,60 C 24,50 22,40 22,30 Z" fill="#8a3c08"/>
        <path d="M 82,28 C 86,40 84,54 76,60 C 76,50 78,40 78,30 Z" fill="#8a3c08"/>
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
