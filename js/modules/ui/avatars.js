/**
 * Module de définition et rendu des Avatars (Style Manga Chibi Fluffy / Ranma 1/2)
 * Chevelures ultra-volumineuses avec masse capillaire généreuse et douces courbes.
 */

export const AVATARS = {
    boy: {
        id: 'boy',
        color: '#489e96',
        accent: '#ff9d00',
        image: null,
        headSvg: `
            <svg viewBox="4 -4 92 78" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <!-- Cou Chibi -->
    <rect x="45" y="58" width="10" height="10" fill="#ffd4a3"/>
    <path d="M41 64 L50 67 L59 64 Z" fill="#ff9d00"/>

    <!-- CHEVEUX ARRIÈRE - MASSE VOLUMINEUSE GÉANTE (Style Ranma / Ryoga) -->
    <path d="M14 36 C8 16, 22 2, 50 2 C78 2, 92 16, 86 36 C92 48, 88 60, 82 62 C78 56, 78 46, 76 42 C74 46, 70 54, 66 56 C64 50, 65 42, 64 38 C60 44, 54 48, 50 48 C46 48, 40 44, 36 38 C35 42, 36 50, 34 56 C30 54, 26 46, 24 42 C22 46, 22 56, 18 62 C12 60, 8 48, 14 36 Z" fill="#4a250b"/>
    
    <!-- Épis et touffes de cheveux volumineuses tout autour -->
    <path d="M16 26 C8 20, 6 12, 12 6 C16 12, 20 18, 22 24 Z" fill="#5c3010"/>
    <path d="M12 38 C4 34, 2 24, 8 18 C12 24, 14 30, 16 36 Z" fill="#5c3010"/>
    <path d="M24 10 C20 -2, 32 -6, 40 2 C34 4, 28 8, 24 10 Z" fill="#5c3010"/>
    <path d="M36 4 C38 -8, 54 -8, 56 4 C48 2, 42 2, 36 4 Z" fill="#6d3a14"/>
    <path d="M52 2 C60 -6, 74 -2, 70 10 C64 6, 58 4, 52 2 Z" fill="#5c3010"/>
    <path d="M78 24 C82 16, 88 10, 94 16 C90 22, 86 28, 80 32 Z" fill="#5c3010"/>
    <path d="M84 36 C92 30, 96 22, 94 36 C90 42, 86 44, 82 42 Z" fill="#5c3010"/>

    <!-- MASSE PRINCIPALE DU DÔME DE CHEVEUX -->
    <path d="M12 34 C10 14, 24 0, 50 0 C76 0, 90 14, 88 34 C82 20, 72 10, 50 10 C28 10, 18 20, 12 34 Z" fill="#6d3a14"/>

    <!-- TÊTE & VISAGE CHIBI -->
    <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>

    <!-- Oreilles Chibi -->
    <circle cx="22" cy="38" r="4.5" fill="#ffd4a3"/>
    <circle cx="22" cy="38" r="2.5" fill="#f0be8d"/>
    <circle cx="78" cy="38" r="4.5" fill="#ffd4a3"/>
    <circle cx="78" cy="38" r="2.5" fill="#f0be8d"/>

    <!-- Bandeau d'aventurier turquoise -->
    <path d="M21 24 C32 17, 68 17, 79 24 L80 29 C69 22, 31 22, 20 29 Z" fill="#489e96"/>
    <rect x="44" y="18" width="12" height="7" rx="1.5" fill="#ff9d00"/>
    <circle cx="50" cy="21.5" r="1.8" fill="#ffffff"/>

    <!-- GROSSES MÈCHES ÉPAISSES ET BOMBÉES DE LA FRANGE (Style Ranma) -->
    <path d="M18 28 C14 38, 16 50, 24 54 C24 46, 22 38, 24 30 Z" fill="#5c3010"/>
    <path d="M20 25 C22 36, 26 44, 34 38 C32 30, 28 24, 24 24 Z" fill="#6d3a14"/>
    <path d="M28 22 C32 35, 38 46, 46 36 C42 26, 36 20, 30 22 Z" fill="#7a4218"/>
    <path d="M42 21 C46 34, 52 47, 58 35 C54 25, 48 19, 44 21 Z" fill="#6d3a14"/>
    <path d="M54 22 C60 35, 66 44, 72 36 C68 28, 62 22, 56 22 Z" fill="#7a4218"/>
    <path d="M74 25 C78 35, 82 44, 80 54 C76 46, 76 38, 74 30 Z" fill="#5c3010"/>

    <!-- REFLETS BRILLANTS MANGA -->
    <path d="M28 8 C34 4, 46 4, 50 6 C46 9, 36 9, 28 8 Z" fill="#ffffff" opacity="0.45"/>
    <path d="M54 6 C60 4, 68 5, 74 9 C68 9, 60 9, 54 6 Z" fill="#ffffff" opacity="0.45"/>
    <circle cx="38" cy="6" r="1.5" fill="#ffffff" opacity="0.75"/>
    <circle cx="64" cy="7" r="1.5" fill="#ffffff" opacity="0.75"/>

    <!-- YEUX MANGA -->
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
</svg>
        `,
        svg: `
            <svg viewBox="0 -6 100 131" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
    <!-- Ombre au sol -->
    <ellipse cx="50" cy="120" rx="24" ry="4" fill="rgba(124, 64, 4, 0.18)"/>

    <!-- Jambes & Chaussures (Pieds Chibi) -->
    <rect x="36" y="86" width="10" height="18" rx="4" fill="#5c3818"/>
    <rect x="35" y="98" width="12" height="7" rx="2" fill="#ffffff"/>
    <rect x="35" y="100" width="12" height="2" fill="#ff9d00"/>
    <path d="M33 105 C33 102, 47 102, 47 105 L48 116 C48 118, 30 118, 30 116 Z" fill="#7c4004"/>
    <path d="M29 114 L49 114 L48 118 L28 118 Z" fill="#442100"/>
    <rect x="34" y="107" width="9" height="3" rx="1" fill="#ff9d00"/>

    <rect x="54" y="86" width="10" height="18" rx="4" fill="#5c3818"/>
    <rect x="53" y="98" width="12" height="7" rx="2" fill="#ffffff"/>
    <rect x="53" y="100" width="12" height="2" fill="#ff9d00"/>
    <path d="M53 105 C53 102, 67 102, 67 105 L70 116 C70 118, 52 118, 52 116 Z" fill="#7c4004"/>
    <path d="M51 114 L71 114 L72 118 L52 118 Z" fill="#442100"/>
    <rect x="57" y="107" width="9" height="3" rx="1" fill="#ff9d00"/>

    <!-- Corps & Veste d'Aventurier -->
    <path d="M34 66 L66 66 L64 88 L36 88 Z" fill="#ffffff"/>
    <path d="M33 66 C33 66, 40 76, 44 88 L34 88 L31 70 Z" fill="#489e96"/>
    <path d="M67 66 C67 66, 60 76, 56 88 L66 88 L69 70 Z" fill="#489e96"/>
    <path d="M42 63 L50 72 L58 63 Z" fill="#ff9d00"/>
    <path d="M47 70 L50 80 L53 70 Z" fill="#e08900"/>

    <!-- Ceinture en cuir avec boucle dorée -->
    <rect x="33" y="84" width="34" height="5" rx="1" fill="#7c4004"/>
    <rect x="46" y="83" width="8" height="7" rx="1.5" fill="#ffb733" stroke="#7c4004" stroke-width="1"/>
    <rect x="31" y="84" width="6" height="8" rx="1.5" fill="#995208" stroke="#5c3818" stroke-width="0.8"/>
    <circle cx="34" cy="88" r="0.8" fill="#ffb733"/>

    <!-- Bras & Mains Chibi -->
    <path d="M32 68 C24 74, 23 80, 29 85 C32 85, 34 82, 35 78 Z" fill="#489e96"/>
    <circle cx="30" cy="85" r="4" fill="#ffd4a3"/>
    <path d="M68 68 C76 72, 78 74, 76 80 C73 82, 70 80, 66 76 Z" fill="#489e96"/>
    <circle cx="77" cy="80" r="4.2" fill="#ffd4a3"/>

    <!-- Cou Chibi -->
    <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>

    <!-- CHEVEUX ARRIÈRE - MASSE VOLUMINEUSE GÉANTE (Style Ranma / Ryoga) -->
    <path d="M14 36 C8 16, 22 2, 50 2 C78 2, 92 16, 86 36 C92 48, 88 60, 82 62 C78 56, 78 46, 76 42 C74 46, 70 54, 66 56 C64 50, 65 42, 64 38 C60 44, 54 48, 50 48 C46 48, 40 44, 36 38 C35 42, 36 50, 34 56 C30 54, 26 46, 24 42 C22 46, 22 56, 18 62 C12 60, 8 48, 14 36 Z" fill="#4a250b"/>
    
    <path d="M16 26 C8 20, 6 12, 12 6 C16 12, 20 18, 22 24 Z" fill="#5c3010"/>
    <path d="M12 38 C4 34, 2 24, 8 18 C12 24, 14 30, 16 36 Z" fill="#5c3010"/>
    <path d="M24 10 C20 -2, 32 -6, 40 2 C34 4, 28 8, 24 10 Z" fill="#5c3010"/>
    <path d="M36 4 C38 -8, 54 -8, 56 4 C48 2, 42 2, 36 4 Z" fill="#6d3a14"/>
    <path d="M52 2 C60 -6, 74 -2, 70 10 C64 6, 58 4, 52 2 Z" fill="#5c3010"/>
    <path d="M78 24 C82 16, 88 10, 94 16 C90 22, 86 28, 80 32 Z" fill="#5c3010"/>
    <path d="M84 36 C92 30, 96 22, 94 36 C90 42, 86 44, 82 42 Z" fill="#5c3010"/>

    <!-- MASSE PRINCIPALE DU DÔME DE CHEVEUX -->
    <path d="M12 34 C10 14, 24 0, 50 0 C76 0, 90 14, 88 34 C82 20, 72 10, 50 10 C28 10, 18 20, 12 34 Z" fill="#6d3a14"/>

    <!-- TÊTE & VISAGE CHIBI -->
    <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>

    <!-- Oreilles Chibi -->
    <circle cx="22" cy="38" r="4.5" fill="#ffd4a3"/>
    <circle cx="22" cy="38" r="2.5" fill="#f0be8d"/>
    <circle cx="78" cy="38" r="4.5" fill="#ffd4a3"/>
    <circle cx="78" cy="38" r="2.5" fill="#f0be8d"/>

    <!-- Bandeau d'aventurier turquoise -->
    <path d="M21 24 C32 17, 68 17, 79 24 L80 29 C69 22, 31 22, 20 29 Z" fill="#489e96"/>
    <rect x="44" y="18" width="12" height="7" rx="1.5" fill="#ff9d00"/>
    <circle cx="50" cy="21.5" r="1.8" fill="#ffffff"/>

    <!-- GROSSES MÈCHES ÉPAISSES ET BOMBÉES DE LA FRANGE (Style Ranma) -->
    <path d="M18 28 C14 38, 16 50, 24 54 C24 46, 22 38, 24 30 Z" fill="#5c3010"/>
    <path d="M20 25 C22 36, 26 44, 34 38 C32 30, 28 24, 24 24 Z" fill="#6d3a14"/>
    <path d="M28 22 C32 35, 38 46, 46 36 C42 26, 36 20, 30 22 Z" fill="#7a4218"/>
    <path d="M42 21 C46 34, 52 47, 58 35 C54 25, 48 19, 44 21 Z" fill="#6d3a14"/>
    <path d="M54 22 C60 35, 66 44, 72 36 C68 28, 62 22, 56 22 Z" fill="#7a4218"/>
    <path d="M74 25 C78 35, 82 44, 80 54 C76 46, 76 38, 74 30 Z" fill="#5c3010"/>

    <!-- REFLETS BRILLANTS MANGA -->
    <path d="M28 8 C34 4, 46 4, 50 6 C46 9, 36 9, 28 8 Z" fill="#ffffff" opacity="0.45"/>
    <path d="M54 6 C60 4, 68 5, 74 9 C68 9, 60 9, 54 6 Z" fill="#ffffff" opacity="0.45"/>
    <circle cx="38" cy="6" r="1.5" fill="#ffffff" opacity="0.75"/>
    <circle cx="64" cy="7" r="1.5" fill="#ffffff" opacity="0.75"/>

    <!-- YEUX MANGA -->
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
</svg>
        `
    },
    girl: {
        id: 'girl',
        color: '#ff9d00',
        accent: '#489e96',
        image: null,
        headSvg: `
            <svg viewBox="4 -4 92 80" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <!-- Cou Chibi -->
    <rect x="45" y="58" width="10" height="10" fill="#ffd4a3"/>
    <circle cx="50" cy="64" r="2.5" fill="#489e96"/>

    <!-- CHEVEUX ARRIÈRE - MASSE VOLUMINEUSE GÉANTE & ONDULÉE (Style Shampoo / Ranma-chan) -->
    <path d="M8 40 C4 14, 20 -2, 50 -2 C80 -2, 96 14, 92 40 C98 56, 94 70, 84 74 C78 68, 76 56, 75 48 C70 56, 62 66, 50 66 C38 66, 30 56, 25 48 C24 56, 22 68, 16 74 C6 70, 2 56, 8 40 Z" fill="#6d2e05"/>

    <!-- CHIGNONS / COUETTES HAUTES VOLUMINEUSES FLUFFY -->
    <circle cx="18" cy="14" r="13" fill="#8c3e06"/>
    <circle cx="17" cy="13" r="11" fill="#a84e0e"/>
    <!-- Ruban turquoise chignon gauche -->
    <ellipse cx="13" cy="23" rx="4.5" ry="3" fill="#489e96" transform="rotate(-30 13 23)"/>
    <ellipse cx="21" cy="24" rx="4.5" ry="3" fill="#489e96" transform="rotate(30 21 24)"/>
    <circle cx="17" cy="23.5" r="2.5" fill="#ff9d00"/>

    <circle cx="82" cy="14" r="13" fill="#8c3e06"/>
    <circle cx="83" cy="13" r="11" fill="#a84e0e"/>
    <!-- Ruban turquoise chignon droit -->
    <ellipse cx="79" cy="24" rx="4.5" ry="3" fill="#489e96" transform="rotate(-30 79 24)"/>
    <ellipse cx="87" cy="23" rx="4.5" ry="3" fill="#489e96" transform="rotate(30 87 23)"/>
    <circle cx="83" cy="23.5" r="2.5" fill="#ff9d00"/>

    <!-- GRANDES MÈCHES LATÉRALES ÉPAISSES ET ONDULÉES -->
    <path d="M14 26 C6 38, 4 54, 10 68 C16 76, 20 74, 22 64 C24 52, 22 38, 20 28 Z" fill="#8c3e06"/>
    <path d="M10 40 C7 52, 8 64, 14 70" fill="none" stroke="#c9661c" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>

    <path d="M86 26 C94 38, 96 54, 90 68 C84 76, 80 74, 78 64 C76 52, 78 38, 80 28 Z" fill="#8c3e06"/>
    <path d="M90 40 C93 52, 92 64, 86 70" fill="none" stroke="#c9661c" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>

    <!-- DÔME SUPÉRIEUR GÉANT DE CHEVEUX FLUFFY -->
    <path d="M12 32 C10 10, 24 -4, 50 -4 C76 -4, 90 10, 88 32 C80 18, 70 8, 50 8 C30 8, 20 18, 12 32 Z" fill="#a84e0e"/>

    <!-- TÊTE & VISAGE CHIBI -->
    <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>

    <!-- Oreilles Chibi -->
    <circle cx="23" cy="38" r="4.5" fill="#ffd4a3"/>
    <circle cx="77" cy="38" r="4.5" fill="#ffd4a3"/>

    <!-- Serre-tête turquoise -->
    <path d="M22 23 C33 16, 67 16, 78 23 L79 27 C68 20, 32 20, 21 27 Z" fill="#489e96"/>
    <circle cx="28" cy="22" r="3.5" fill="#ff9d00"/>
    <circle cx="28" cy="22" r="1.8" fill="#ffffff"/>

    <!-- FRANGE ÉPAISSE ET BOMBÉE À GROSSES MÈCHES COURBES -->
    <path d="M16 28 C12 40, 16 54, 25 58 C27 50, 24 40, 22 30 Z" fill="#8c3e06"/>
    <path d="M84 28 C88 40, 84 54, 75 58 C73 50, 76 40, 78 30 Z" fill="#8c3e06"/>

    <path d="M18 24 C22 36, 28 44, 35 37 C32 28, 26 22, 22 22 Z" fill="#a84e0e"/>
    <path d="M28 22 C34 38, 42 46, 50 37 C45 26, 38 20, 31 21 Z" fill="#b85912"/>
    <path d="M44 21 C51 38, 59 46, 65 37 C60 26, 53 20, 46 21 Z" fill="#a84e0e"/>
    <path d="M58 22 C64 36, 70 44, 77 37 C73 28, 67 22, 63 22 Z" fill="#b85912"/>

    <!-- REFLETS BRILLANTS MANGA -->
    <path d="M28 6 C36 2, 46 2, 50 4 C45 7, 36 7, 28 6 Z" fill="#ffffff" opacity="0.55"/>
    <path d="M54 4 C60 2, 70 3, 76 7 C70 7, 60 7, 54 4 Z" fill="#ffffff" opacity="0.55"/>
    <circle cx="36" cy="4" r="1.8" fill="#ffffff" opacity="0.85"/>
    <circle cx="66" cy="5" r="1.8" fill="#ffffff" opacity="0.85"/>

    <!-- YEUX MANGA FILLE -->
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
</svg>
        `,
        svg: `
            <svg viewBox="0 -6 100 131" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
    <!-- Ombre au sol -->
    <ellipse cx="50" cy="120" rx="24" ry="4" fill="rgba(124, 64, 4, 0.18)"/>

    <!-- Jambes & Chaussures (Pieds Chibi) -->
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

    <!-- Jupe plissée évasée à courbes douces -->
    <path d="M33 82 C33 82, 40 83.5, 50 83.5 C60 83.5, 67 82, 67 82 C72 85, 76 89, 76 91.5 C60 94, 40 94, 24 91.5 C24 89, 28 85, 33 82 Z" fill="#5c3818"/>
    <path d="M38 83 C38 85, 36 88, 35 92" stroke="#40240d" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M50 83.5 L50 93.5" stroke="#40240d" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M62 83 C62 85, 64 88, 65 92" stroke="#40240d" stroke-width="1.2" stroke-linecap="round"/>

    <!-- Corps & Gilet d'Aventurière Orange -->
    <path d="M34 66 L66 66 L66 82 L34 82 Z" fill="#ff9d00"/>
    <path d="M44 64 L50 74 L56 64 Z" fill="#ffffff"/>
    <circle cx="50" cy="69" r="2.5" fill="#489e96"/>
    <polygon points="46,67 50,69 46,72" fill="#489e96"/>
    <polygon points="54,67 50,69 54,72" fill="#489e96"/>
    <circle cx="50" cy="76" r="1.5" fill="#ffde6a"/>
    <circle cx="50" cy="80" r="1.5" fill="#ffde6a"/>

    <!-- Ceinture avec fiole magique -->
    <rect x="33" y="81" width="34" height="4" fill="#7c4004"/>
    <rect x="47" y="80" width="6" height="6" rx="1" fill="#ffb733"/>
    <rect x="62" y="81" width="4" height="6" rx="1.5" fill="#66bcb4" stroke="#7c4004" stroke-width="0.8"/>
    <circle cx="64" cy="84" r="1" fill="#ffffff"/>

    <!-- Bras & Mains Chibi -->
    <path d="M33 68 C25 72, 23 78, 26 84 C29 84, 32 80, 35 76 Z" fill="#ff9d00"/>
    <circle cx="26" cy="84" r="3.8" fill="#ffd4a3"/>
    <path d="M67 68 C75 70, 77 74, 76 80 C73 82, 70 80, 66 76 Z" fill="#ff9d00"/>
    <circle cx="77" cy="78" r="3.8" fill="#ffd4a3"/>

    <!-- Cou Chibi -->
    <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>

    <!-- CHEVEUX ARRIÈRE - MASSE VOLUMINEUSE GÉANTE & ONDULÉE (Style Shampoo / Ranma-chan) -->
    <path d="M8 40 C4 14, 20 -2, 50 -2 C80 -2, 96 14, 92 40 C98 56, 94 70, 84 74 C78 68, 76 56, 75 48 C70 56, 62 66, 50 66 C38 66, 30 56, 25 48 C24 56, 22 68, 16 74 C6 70, 2 56, 8 40 Z" fill="#6d2e05"/>

    <!-- CHIGNONS / COUETTES HAUTES VOLUMINEUSES FLUFFY -->
    <circle cx="18" cy="14" r="13" fill="#8c3e06"/>
    <circle cx="17" cy="13" r="11" fill="#a84e0e"/>
    <ellipse cx="13" cy="23" rx="4.5" ry="3" fill="#489e96" transform="rotate(-30 13 23)"/>
    <ellipse cx="21" cy="24" rx="4.5" ry="3" fill="#489e96" transform="rotate(30 21 24)"/>
    <circle cx="17" cy="23.5" r="2.5" fill="#ff9d00"/>

    <circle cx="82" cy="14" r="13" fill="#8c3e06"/>
    <circle cx="83" cy="13" r="11" fill="#a84e0e"/>
    <ellipse cx="79" cy="24" rx="4.5" ry="3" fill="#489e96" transform="rotate(-30 79 24)"/>
    <ellipse cx="87" cy="23" rx="4.5" ry="3" fill="#489e96" transform="rotate(30 87 23)"/>
    <circle cx="83" cy="23.5" r="2.5" fill="#ff9d00"/>

    <!-- GRANDES MÈCHES LATÉRALES ÉPAISSES ET ONDULÉES -->
    <path d="M14 26 C6 38, 4 54, 10 68 C16 76, 20 74, 22 64 C24 52, 22 38, 20 28 Z" fill="#8c3e06"/>
    <path d="M10 40 C7 52, 8 64, 14 70" fill="none" stroke="#c9661c" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>

    <path d="M86 26 C94 38, 96 54, 90 68 C84 76, 80 74, 78 64 C76 52, 78 38, 80 28 Z" fill="#8c3e06"/>
    <path d="M90 40 C93 52, 92 64, 86 70" fill="none" stroke="#c9661c" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>

    <!-- DÔME SUPÉRIEUR GÉANT DE CHEVEUX FLUFFY -->
    <path d="M12 32 C10 10, 24 -4, 50 -4 C76 -4, 90 10, 88 32 C80 18, 70 8, 50 8 C30 8, 20 18, 12 32 Z" fill="#a84e0e"/>

    <!-- TÊTE & VISAGE CHIBI -->
    <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>

    <!-- Oreilles Chibi -->
    <circle cx="23" cy="38" r="4.5" fill="#ffd4a3"/>
    <circle cx="77" cy="38" r="4.5" fill="#ffd4a3"/>

    <!-- Serre-tête turquoise -->
    <path d="M22 23 C33 16, 67 16, 78 23 L79 27 C68 20, 32 20, 21 27 Z" fill="#489e96"/>
    <circle cx="28" cy="22" r="3.5" fill="#ff9d00"/>
    <circle cx="28" cy="22" r="1.8" fill="#ffffff"/>

    <!-- FRANGE ÉPAISSE ET BOMBÉE À GROSSES MÈCHES COURBES -->
    <path d="M16 28 C12 40, 16 54, 25 58 C27 50, 24 40, 22 30 Z" fill="#8c3e06"/>
    <path d="M84 28 C88 40, 84 54, 75 58 C73 50, 76 40, 78 30 Z" fill="#8c3e06"/>

    <path d="M18 24 C22 36, 28 44, 35 37 C32 28, 26 22, 22 22 Z" fill="#a84e0e"/>
    <path d="M28 22 C34 38, 42 46, 50 37 C45 26, 38 20, 31 21 Z" fill="#b85912"/>
    <path d="M44 21 C51 38, 59 46, 65 37 C60 26, 53 20, 46 21 Z" fill="#a84e0e"/>
    <path d="M58 22 C64 36, 70 44, 77 37 C73 28, 67 22, 63 22 Z" fill="#b85912"/>

    <!-- REFLETS BRILLANTS MANGA -->
    <path d="M28 6 C36 2, 46 2, 50 4 C45 7, 36 7, 28 6 Z" fill="#ffffff" opacity="0.55"/>
    <path d="M54 4 C60 2, 70 3, 76 7 C70 7, 60 7, 54 4 Z" fill="#ffffff" opacity="0.55"/>
    <circle cx="36" cy="4" r="1.8" fill="#ffffff" opacity="0.85"/>
    <circle cx="66" cy="5" r="1.8" fill="#ffffff" opacity="0.85"/>

    <!-- YEUX MANGA FILLE -->
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
</svg>
        `
    }
};

/**
 * Retourne le code HTML/SVG de l'avatar demandé
 * @param {string} avatarId - 'boy' ou 'girl'
 * @returns {string}
 */
export function renderAvatarSvg(avatarId = 'boy') {
    const avatar = AVATARS[avatarId] || AVATARS.boy;
    if (avatar.image) {
        return `<img src="${avatar.image}" alt="Avatar" class="w-full h-full object-contain" />`;
    }
    return avatar.svg;
}

/**
 * Retourne le portrait / tête zoomée de l'avatar demandé
 * @param {string} avatarId - 'boy' ou 'girl'
 * @returns {string}
 */
export function renderAvatarHeadSvg(avatarId = 'boy') {
    const avatar = AVATARS[avatarId] || AVATARS.boy;
    if (avatar.image) {
        return `<img src="${avatar.image}" alt="Avatar" class="w-full h-full object-cover object-top" />`;
    }
    return avatar.headSvg || avatar.svg;
}
