/**
 * Module de définition et rendu des Avatars (Style Manga Chibi Plein Pied)
 * Coupe garçon nette et courte, yeux expressifs avec blanc de l'œil bien visible.
 */

export const AVATARS = {
    boy: {
        id: 'boy',
        color: '#489e96',
        accent: '#ff9d00',
        image: null,
        svg: `
            <svg viewBox="0 0 100 125" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                <!-- Ombre au sol -->
                <ellipse cx="50" cy="120" rx="24" ry="4" fill="rgba(124, 64, 4, 0.18)"/>

                <!-- Jambes & Chaussures (Pieds Chibi) -->
                <!-- Jambe Gauche -->
                <rect x="36" y="86" width="10" height="18" rx="4" fill="#5c3818"/>
                <rect x="35" y="98" width="12" height="7" rx="2" fill="#ffffff"/>
                <rect x="35" y="100" width="12" height="2" fill="#ff9d00"/>
                <!-- Botte Gauche -->
                <path d="M33 105 C33 102, 47 102, 47 105 L48 116 C48 118, 30 118, 30 116 Z" fill="#7c4004"/>
                <path d="M29 114 L49 114 L48 118 L28 118 Z" fill="#442100"/>
                <rect x="34" y="107" width="9" height="3" rx="1" fill="#ff9d00"/>

                <!-- Jambe Droite -->
                <rect x="54" y="86" width="10" height="18" rx="4" fill="#5c3818"/>
                <rect x="53" y="98" width="12" height="7" rx="2" fill="#ffffff"/>
                <rect x="53" y="100" width="12" height="2" fill="#ff9d00"/>
                <!-- Botte Droite -->
                <path d="M53 105 C53 102, 67 102, 67 105 L70 116 C70 118, 52 118, 52 116 Z" fill="#7c4004"/>
                <path d="M51 114 L71 114 L72 118 L52 118 Z" fill="#442100"/>
                <rect x="57" y="107" width="9" height="3" rx="1" fill="#ff9d00"/>

                <!-- Corps & Veste d'Aventurier -->
                <path d="M34 66 L66 66 L64 88 L36 88 Z" fill="#ffffff"/>
                <!-- Gilet turquoise -->
                <path d="M33 66 C33 66, 40 76, 44 88 L34 88 L31 70 Z" fill="#489e96"/>
                <path d="M67 66 C67 66, 60 76, 56 88 L66 88 L69 70 Z" fill="#489e96"/>
                <!-- Foulard orange -->
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

                <!-- Tête Chibi Manga (Grande et Ronde) -->
                <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>

                <!-- Oreilles Chibi bien visibles -->
                <circle cx="22" cy="38" r="4.5" fill="#ffd4a3"/>
                <circle cx="22" cy="38" r="2.5" fill="#f0be8d"/>
                <circle cx="78" cy="38" r="4.5" fill="#ffd4a3"/>
                <circle cx="78" cy="38" r="2.5" fill="#f0be8d"/>

                <!-- Cheveux Courts Manga Garçon (Coupe courte dynamique & pointes) -->
                <path d="M21 34 C19 22, 28 8, 50 8 C72 8, 81 22, 79 34 C77 24, 69 16, 50 16 C31 16, 23 24, 21 34 Z" fill="#6d3a14"/>
                <!-- Épis et mèches courtes du dessus -->
                <polygon points="34,12 40,3 44,11" fill="#6d3a14"/>
                <polygon points="45,10 52,2 56,10" fill="#6d3a14"/>
                <polygon points="57,10 65,4 67,12" fill="#6d3a14"/>
                <polygon points="26,20 20,13 28,15" fill="#6d3a14"/>
                <polygon points="74,20 80,13 72,15" fill="#6d3a14"/>
                <!-- Frange courte shōnen à pointes nettes -->
                <path d="M22 30 L27 34 L31 24 L37 35 L43 25 L49 36 L55 25 L61 35 L67 24 L73 34 L78 30 C74 18, 62 14, 50 14 C38 14, 26 18, 22 30 Z" fill="#6d3a14"/>
                <!-- Pattes courtes de garçon au niveau des oreilles -->
                <polygon points="22,30 25,38 27,33" fill="#6d3a14"/>
                <polygon points="78,30 75,38 73,33" fill="#6d3a14"/>

                <!-- Bandeau d'aventurier turquoise -->
                <path d="M24 23 C34 18, 66 18, 76 23 L77 27 C67 22, 33 22, 23 27 Z" fill="#489e96"/>
                <rect x="45" y="19" width="10" height="6" rx="1.5" fill="#ff9d00"/>
                <circle cx="50" cy="22" r="1.5" fill="#ffffff"/>

                <!-- YEUX MANGA AVEC BLANC DE L'OEIL (SCLÈRE) BIEN VISIBLE -->
                <!-- Oeil Gauche -->
                <!-- 1. Blanc de l'oeil -->
                <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
                <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
                <!-- 2. Iris coloré au centre -->
                <ellipse cx="37.5" cy="41.5" rx="4.2" ry="4.8" fill="#542c0e"/>
                <ellipse cx="37.5" cy="42.5" rx="3.5" ry="3.5" fill="#8c4e1e"/>
                <!-- 3. Pupille sombre -->
                <circle cx="37.5" cy="41.5" r="2.2" fill="#241103"/>
                <!-- 4. Reflets de lumière blancs brillants -->
                <circle cx="35.5" cy="39" r="1.8" fill="#ffffff"/>
                <circle cx="39.5" cy="43.5" r="0.9" fill="#ffffff"/>
                <!-- 5. Paupière supérieure & cils nets -->
                <path d="M30 38 Q37 34 44 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
                <!-- Sourcil Gauche -->
                <path d="M32 31 Q38 27 43 30" fill="none" stroke="#542c0e" stroke-width="2.2" stroke-linecap="round"/>

                <!-- Oeil Droit -->
                <!-- 1. Blanc de l'oeil -->
                <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
                <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
                <!-- 2. Iris coloré au centre -->
                <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="#542c0e"/>
                <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="#8c4e1e"/>
                <!-- 3. Pupille sombre -->
                <circle cx="62.5" cy="41.5" r="2.2" fill="#241103"/>
                <!-- 4. Reflets de lumière blancs brillants -->
                <circle cx="60.5" cy="39" r="1.8" fill="#ffffff"/>
                <circle cx="64.5" cy="43.5" r="0.9" fill="#ffffff"/>
                <!-- 5. Paupière supérieure & cils nets -->
                <path d="M56 38 Q63 34 70 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
                <!-- Sourcil Droit -->
                <path d="M57 30 Q62 27 68 31" fill="none" stroke="#542c0e" stroke-width="2.2" stroke-linecap="round"/>

                <!-- Joues Manga Rougissantes (Blush) -->
                <ellipse cx="30" cy="46" rx="4.5" ry="2.2" fill="#ff7070" opacity="0.55"/>
                <ellipse cx="70" cy="46" rx="4.5" ry="2.2" fill="#ff7070" opacity="0.55"/>
                <line x1="28" y1="45" x2="32" y2="47" stroke="#e04040" stroke-width="0.8" opacity="0.6"/>
                <line x1="68" y1="45" x2="72" y2="47" stroke="#e04040" stroke-width="0.8" opacity="0.6"/>

                <!-- Petit Nez Manga -->
                <circle cx="50" cy="44" r="0.9" fill="#d99866"/>

                <!-- Sourire Manga Chibi -->
                <path d="M45 48 Q50 54 55 48" fill="none" stroke="#7c4004" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `
    },
    girl: {
        id: 'girl',
        color: '#ff9d00',
        accent: '#489e96',
        image: null,
        svg: `
            <svg viewBox="0 0 100 125" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                <!-- Ombre au sol -->
                <ellipse cx="50" cy="120" rx="24" ry="4" fill="rgba(124, 64, 4, 0.18)"/>

                <!-- Couettes / Cheveux Arrière Longs Chibi -->
                <path d="M18 36 C10 54, 12 76, 18 90 C22 84, 24 70, 24 50 Z" fill="#8c3e06"/>
                <path d="M82 36 C90 54, 88 76, 82 90 C78 84, 76 70, 76 50 Z" fill="#8c3e06"/>

                <!-- Élastiques / Rubans de couettes turquoise -->
                <ellipse cx="20" cy="44" rx="4" ry="3" fill="#489e96"/>
                <ellipse cx="80" cy="44" rx="4" ry="3" fill="#489e96"/>

                <!-- Jambes & Chaussures (Pieds Chibi) -->
                <!-- Jambe Gauche -->
                <rect x="36" y="86" width="10" height="18" rx="4" fill="#ffd4a3"/>
                <rect x="35" y="94" width="12" height="11" rx="2" fill="#489e96"/>
                <rect x="35" y="96" width="12" height="2" fill="#ffffff"/>
                <!-- Botte Gauche -->
                <path d="M33 105 C33 102, 47 102, 47 105 L48 116 C48 118, 30 118, 30 116 Z" fill="#ff9d00"/>
                <path d="M29 114 L49 114 L48 118 L28 118 Z" fill="#c47000"/>
                <rect x="34" y="106" width="9" height="3" rx="1.5" fill="#ffffff"/>

                <!-- Jambe Droite -->
                <rect x="54" y="86" width="10" height="18" rx="4" fill="#ffd4a3"/>
                <rect x="53" y="94" width="12" height="11" rx="2" fill="#489e96"/>
                <rect x="53" y="96" width="12" height="2" fill="#ffffff"/>
                <!-- Botte Droite -->
                <path d="M53 105 C53 102, 67 102, 67 105 L70 116 C70 118, 52 118, 52 116 Z" fill="#ff9d00"/>
                <path d="M51 114 L71 114 L72 118 L52 118 Z" fill="#c47000"/>
                <rect x="57" y="106" width="9" height="3" rx="1.5" fill="#ffffff"/>

                <!-- Jupe plissée d'exploratrice -->
                <path d="M32 82 L68 82 L72 90 L28 90 Z" fill="#5c3818"/>
                <line x1="40" y1="82" x2="38" y2="90" stroke="#40240d" stroke-width="1.2"/>
                <line x1="50" y1="82" x2="50" y2="90" stroke="#40240d" stroke-width="1.2"/>
                <line x1="60" y1="82" x2="62" y2="90" stroke="#40240d" stroke-width="1.2"/>

                <!-- Corps & Gilet d'Aventurière Orange -->
                <path d="M34 66 L66 66 L66 82 L34 82 Z" fill="#ff9d00"/>
                <path d="M44 64 L50 74 L56 64 Z" fill="#ffffff"/>
                <!-- Nœud turquoise au col -->
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

                <!-- Tête Chibi Manga (Grande et Ronde) -->
                <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>

                <circle cx="23" cy="38" r="4.5" fill="#ffd4a3"/>
                <circle cx="77" cy="38" r="4.5" fill="#ffd4a3"/>

                <!-- Cheveux Manga Fille -->
                <path d="M22 34 C20 18, 32 8, 50 8 C68 8, 80 18, 78 34 C74 24, 68 20, 58 18 C48 16, 36 20, 28 26 C24 28, 22 34, 22 34 Z" fill="#a84e0e"/>
                <path d="M23 32 C26 38, 32 40, 36 34 C40 40, 48 40, 52 33 C56 40, 64 40, 68 34 C72 38, 75 36, 77 31 C72 16, 58 12, 50 12 C36 12, 26 20, 23 32 Z" fill="#a84e0e"/>
                <path d="M23 32 C21 44, 25 54, 28 58 C29 52, 27 42, 26 36 Z" fill="#8c3e06"/>
                <path d="M77 32 C79 44, 75 54, 72 58 C71 52, 73 42, 74 36 Z" fill="#8c3e06"/>

                <!-- Serre-tête turquoise -->
                <path d="M25 24 C35 19, 65 19, 75 24 L76 27 C66 22, 34 22, 24 27 Z" fill="#489e96"/>
                <circle cx="30" cy="23" r="3.5" fill="#ff9d00"/>
                <circle cx="30" cy="23" r="1.8" fill="#ffffff"/>

                <!-- YEUX MANGA FILLE AVEC BLANC DE L'OEIL (SCLÈRE) BIEN VISIBLE -->
                <!-- Oeil Gauche -->
                <!-- 1. Blanc de l'oeil -->
                <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
                <ellipse cx="37" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
                <!-- 2. Iris coloré au centre -->
                <ellipse cx="37.5" cy="41.5" rx="4.2" ry="4.8" fill="#6d2e05"/>
                <ellipse cx="37.5" cy="42.5" rx="3.5" ry="3.5" fill="#b45309"/>
                <!-- 3. Pupille sombre -->
                <circle cx="37.5" cy="41.5" r="2.2" fill="#2b1404"/>
                <!-- 4. Reflets de lumière blancs brillants -->
                <circle cx="35.5" cy="39" r="1.8" fill="#ffffff"/>
                <circle cx="39.5" cy="43.5" r="1" fill="#ffffff"/>
                <!-- 5. Cils & Paupière supérieure féminins -->
                <path d="M30 38 Q37 33 44 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
                <path d="M31 35 L34 37" stroke="#2b1404" stroke-width="1.6" stroke-linecap="round"/>
                <!-- Sourcil Gauche -->
                <path d="M32 30 Q37 26 43 29" fill="none" stroke="#7c3405" stroke-width="1.8" stroke-linecap="round"/>

                <!-- Oeil Droit -->
                <!-- 1. Blanc de l'oeil -->
                <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="#ffffff"/>
                <ellipse cx="63" cy="41" rx="6.5" ry="5.5" fill="none" stroke="#e2d0c0" stroke-width="0.8"/>
                <!-- 2. Iris coloré au centre -->
                <ellipse cx="62.5" cy="41.5" rx="4.2" ry="4.8" fill="#6d2e05"/>
                <ellipse cx="62.5" cy="42.5" rx="3.5" ry="3.5" fill="#b45309"/>
                <!-- 3. Pupille sombre -->
                <circle cx="62.5" cy="41.5" r="2.2" fill="#2b1404"/>
                <!-- 4. Reflets de lumière blancs brillants -->
                <circle cx="60.5" cy="39" r="1.8" fill="#ffffff"/>
                <circle cx="64.5" cy="43.5" r="1" fill="#ffffff"/>
                <!-- 5. Cils & Paupière supérieure féminins -->
                <path d="M56 38 Q63 33 70 38" fill="none" stroke="#2b1404" stroke-width="2.2" stroke-linecap="round"/>
                <path d="M69 35 L66 37" stroke="#2b1404" stroke-width="1.6" stroke-linecap="round"/>
                <!-- Sourcil Droit -->
                <path d="M57 29 Q63 26 68 30" fill="none" stroke="#7c3405" stroke-width="1.8" stroke-linecap="round"/>

                <!-- Joues Manga Rougissantes (Blush Chibi) -->
                <ellipse cx="30" cy="46" rx="4.5" ry="2.2" fill="#ff6b6b" opacity="0.55"/>
                <ellipse cx="70" cy="46" rx="4.5" ry="2.2" fill="#ff6b6b" opacity="0.55"/>
                <line x1="28" y1="45" x2="32" y2="47" stroke="#e03b3b" stroke-width="0.8" opacity="0.6"/>
                <line x1="68" y1="45" x2="72" y2="47" stroke="#e03b3b" stroke-width="0.8" opacity="0.6"/>

                <!-- Petit Nez Manga -->
                <circle cx="50" cy="44" r="0.9" fill="#d99866"/>

                <!-- Sourire Manga Chibi Mignon -->
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
