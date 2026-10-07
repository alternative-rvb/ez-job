/**
 * Module de définition et rendu des Avatars (Style Manga Chibi)
 * Version avec chevelures volumineuses et douces courbes pour l'héroïne.
 */

export const AVATARS = {
    boy: {
        id: 'boy',
        color: '#489e96',
        accent: '#ff9d00',
        image: null,
        headSvg: `
            <svg viewBox="16 0 68 64" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>
                <path d="M42 62 L50 64 L58 62 Z" fill="#ff9d00"/>

                <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>

                <circle cx="22" cy="38" r="4.5" fill="#ffd4a3"/>
                <circle cx="22" cy="38" r="2.5" fill="#f0be8d"/>
                <circle cx="78" cy="38" r="4.5" fill="#ffd4a3"/>
                <circle cx="78" cy="38" r="2.5" fill="#f0be8d"/>

                <path d="M19 34 C16 18, 27 3, 50 3 C73 3, 84 18, 81 34 C79 22, 69 13, 50 13 C31 13, 21 22, 19 34 Z" fill="#6d3a14"/>
                <polygon points="32,9 38,-1 43,8" fill="#6d3a14"/>
                <polygon points="43,7 51,-3 57,7" fill="#6d3a14"/>
                <polygon points="56,7 65,0 67,9" fill="#6d3a14"/>
                <polygon points="24,17 16,8 26,12" fill="#6d3a14"/>
                <polygon points="76,17 84,8 74,12" fill="#6d3a14"/>
                <path d="M28 15 C36 8, 64 8, 72 15" fill="none" stroke="#8a4818" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                <path d="M19 30 L25 35 L29 23 L36 36 L43 24 L50 37 L57 24 L64 36 L71 23 L76 35 L81 30 C76 16, 64 12, 50 12 C36 12, 24 16, 19 30 Z" fill="#6d3a14"/>
                <polygon points="19,30 23,39 26,33" fill="#6d3a14"/>
                <polygon points="81,30 77,39 74,33" fill="#6d3a14"/>

                <path d="M24 23 C34 18, 66 18, 76 23 L77 27 C67 22, 33 22, 23 27 Z" fill="#489e96"/>
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

                <ellipse cx="30" cy="46" rx="4.5" ry="2.2" fill="#ff7070" opacity="0.55"/>
                <ellipse cx="70" cy="46" rx="4.5" ry="2.2" fill="#ff7070" opacity="0.55"/>
                <line x1="28" y1="45" x2="32" y2="47" stroke="#e04040" stroke-width="0.8" opacity="0.6"/>
                <line x1="68" y1="45" x2="72" y2="47" stroke="#e04040" stroke-width="0.8" opacity="0.6"/>
                <circle cx="50" cy="44" r="0.9" fill="#d99866"/>
                <path d="M45 48 Q50 54 55 48" fill="none" stroke="#7c4004" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `,
        svg: `
            <svg viewBox="0 0 100 125" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="50" cy="120" rx="24" ry="4" fill="rgba(124, 64, 4, 0.18)"/>

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

                <path d="M34 66 L66 66 L64 88 L36 88 Z" fill="#ffffff"/>
                <path d="M33 66 C33 66, 40 76, 44 88 L34 88 L31 70 Z" fill="#489e96"/>
                <path d="M67 66 C67 66, 60 76, 56 88 L66 88 L69 70 Z" fill="#489e96"/>
                <path d="M42 63 L50 72 L58 63 Z" fill="#ff9d00"/>
                <path d="M47 70 L50 80 L53 70 Z" fill="#e08900"/>

                <rect x="33" y="84" width="34" height="5" rx="1" fill="#7c4004"/>
                <rect x="46" y="83" width="8" height="7" rx="1.5" fill="#ffb733" stroke="#7c4004" stroke-width="1"/>
                <rect x="31" y="84" width="6" height="8" rx="1.5" fill="#995208" stroke="#5c3818" stroke-width="0.8"/>
                <circle cx="34" cy="88" r="0.8" fill="#ffb733"/>

                <path d="M32 68 C24 74, 23 80, 29 85 C32 85, 34 82, 35 78 Z" fill="#489e96"/>
                <circle cx="30" cy="85" r="4" fill="#ffd4a3"/>
                <path d="M68 68 C76 72, 78 74, 76 80 C73 82, 70 80, 66 76 Z" fill="#489e96"/>
                <circle cx="77" cy="80" r="4.2" fill="#ffd4a3"/>

                <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>

                <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>

                <circle cx="22" cy="38" r="4.5" fill="#ffd4a3"/>
                <circle cx="22" cy="38" r="2.5" fill="#f0be8d"/>
                <circle cx="78" cy="38" r="4.5" fill="#ffd4a3"/>
                <circle cx="78" cy="38" r="2.5" fill="#f0be8d"/>

                <path d="M19 34 C16 18, 27 3, 50 3 C73 3, 84 18, 81 34 C79 22, 69 13, 50 13 C31 13, 21 22, 19 34 Z" fill="#6d3a14"/>
                <polygon points="32,9 38,-1 43,8" fill="#6d3a14"/>
                <polygon points="43,7 51,-3 57,7" fill="#6d3a14"/>
                <polygon points="56,7 65,0 67,9" fill="#6d3a14"/>
                <polygon points="24,17 16,8 26,12" fill="#6d3a14"/>
                <polygon points="76,17 84,8 74,12" fill="#6d3a14"/>
                <path d="M28 15 C36 8, 64 8, 72 15" fill="none" stroke="#8a4818" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                <path d="M19 30 L25 35 L29 23 L36 36 L43 24 L50 37 L57 24 L64 36 L71 23 L76 35 L81 30 C76 16, 64 12, 50 12 C36 12, 24 16, 19 30 Z" fill="#6d3a14"/>
                <polygon points="19,30 23,39 26,33" fill="#6d3a14"/>
                <polygon points="81,30 77,39 74,33" fill="#6d3a14"/>

                <path d="M24 23 C34 18, 66 18, 76 23 L77 27 C67 22, 33 22, 23 27 Z" fill="#489e96"/>
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

                <ellipse cx="30" cy="46" rx="4.5" ry="2.2" fill="#ff7070" opacity="0.55"/>
                <ellipse cx="70" cy="46" rx="4.5" ry="2.2" fill="#ff7070" opacity="0.55"/>
                <line x1="28" y1="45" x2="32" y2="47" stroke="#e04040" stroke-width="0.8" opacity="0.6"/>
                <line x1="68" y1="45" x2="72" y2="47" stroke="#e04040" stroke-width="0.8" opacity="0.6"/>

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
            <svg viewBox="16 0 68 64" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 36 C13 44, 13 54, 17 64 C22 62, 23 54, 24 44 Z" fill="#8c3e06"/>
                <path d="M81 36 C87 44, 87 54, 83 64 C78 62, 77 54, 76 44 Z" fill="#8c3e06"/>
                <ellipse cx="15" cy="42" rx="3.2" ry="2.2" fill="#489e96" transform="rotate(-20 15 42)"/>
                <circle cx="17.5" cy="42.5" r="2" fill="#35837c"/>
                <ellipse cx="85" cy="42" rx="3.2" ry="2.2" fill="#489e96" transform="rotate(20 85 42)"/>
                <circle cx="82.5" cy="42.5" r="2" fill="#35837c"/>

                <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>
                <circle cx="50" cy="62" r="2.2" fill="#489e96"/>

                <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>

                <circle cx="23" cy="38" r="4.5" fill="#ffd4a3"/>
                <circle cx="77" cy="38" r="4.5" fill="#ffd4a3"/>

                <path d="M18 34 C16 14, 29 3, 50 3 C71 3, 84 14, 82 34 C78 20, 68 13, 50 13 C32 13, 22 20, 18 34 Z" fill="#a84e0e"/>
                <path d="M28 15 C38 8, 62 8, 72 15" fill="none" stroke="#c9661c" stroke-width="2.8" stroke-linecap="round" opacity="0.65"/>
                <path d="M19 32 C23 38, 28 41, 33 35 C38 42, 46 42, 50 35 C54 42, 62 42, 67 35 C72 41, 77 38, 81 32 C75 16, 63 12, 50 12 C37 12, 25 16, 19 32 Z" fill="#a84e0e"/>
                <path d="M19 32 C16 44, 20 55, 26 60 C28 54, 25 44, 24 35 Z" fill="#8c3e06"/>
                <path d="M81 32 C84 44, 80 55, 74 60 C72 54, 75 44, 76 35 Z" fill="#8c3e06"/>

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

                <ellipse cx="30" cy="46" rx="4.5" ry="2.2" fill="#ff6b6b" opacity="0.55"/>
                <ellipse cx="70" cy="46" rx="4.5" ry="2.2" fill="#ff6b6b" opacity="0.55"/>
                <line x1="28" y1="45" x2="32" y2="47" stroke="#e03b3b" stroke-width="0.8" opacity="0.6"/>
                <line x1="68" y1="45" x2="72" y2="47" stroke="#e03b3b" stroke-width="0.8" opacity="0.6"/>
                <circle cx="50" cy="44" r="0.9" fill="#d99866"/>
                <path d="M45 48 Q50 54 55 48" fill="none" stroke="#7c4004" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `,
        svg: `
            <svg viewBox="0 0 100 125" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="50" cy="120" rx="24" ry="4" fill="rgba(124, 64, 4, 0.18)"/>

                <path d="M20 36 C10 44, 6 58, 10 72 C13 82, 10 90, 15 94 C20 92, 21 82, 22 72 C23 60, 24 46, 23 37 Z" fill="#8c3e06"/>
                <path d="M13 54 C10 66, 12 80, 17 90" fill="none" stroke="#a84e0e" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
                <path d="M80 36 C90 44, 94 58, 90 72 C87 82, 90 90, 85 94 C80 92, 79 82, 78 72 C77 60, 76 46, 77 37 Z" fill="#8c3e06"/>
                <path d="M87 54 C90 66, 88 80, 83 90" fill="none" stroke="#a84e0e" stroke-width="2" stroke-linecap="round" opacity="0.5"/>

                <ellipse cx="14" cy="42" rx="3.5" ry="2.2" fill="#489e96" transform="rotate(-25 14 42)"/>
                <ellipse cx="21" cy="43" rx="3.5" ry="2.2" fill="#489e96" transform="rotate(25 21 43)"/>
                <circle cx="17.5" cy="42.5" r="2.2" fill="#35837c"/>
                <ellipse cx="79" cy="43" rx="3.5" ry="2.2" fill="#489e96" transform="rotate(-25 79 43)"/>
                <ellipse cx="86" cy="42" rx="3.5" ry="2.2" fill="#489e96" transform="rotate(25 86 42)"/>
                <circle cx="82.5" cy="42.5" r="2.2" fill="#35837c"/>

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

                <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>

                <path d="M22 36 C22 18, 34 10, 50 10 C66 10, 78 18, 78 36 C78 52, 66 60, 50 60 C34 60, 22 52, 22 36 Z" fill="#ffd4a3"/>

                <circle cx="23" cy="38" r="4.5" fill="#ffd4a3"/>
                <circle cx="77" cy="38" r="4.5" fill="#ffd4a3"/>

                <path d="M18 34 C16 14, 29 3, 50 3 C71 3, 84 14, 82 34 C78 20, 68 13, 50 13 C32 13, 22 20, 18 34 Z" fill="#a84e0e"/>
                <path d="M28 15 C38 8, 62 8, 72 15" fill="none" stroke="#c9661c" stroke-width="2.8" stroke-linecap="round" opacity="0.65"/>
                <path d="M19 32 C23 38, 28 41, 33 35 C38 42, 46 42, 50 35 C54 42, 62 42, 67 35 C72 41, 77 38, 81 32 C75 16, 63 12, 50 12 C37 12, 25 16, 19 32 Z" fill="#a84e0e"/>
                <path d="M19 32 C16 44, 20 55, 26 60 C28 54, 25 44, 24 35 Z" fill="#8c3e06"/>
                <path d="M81 32 C84 44, 80 55, 74 60 C72 54, 75 44, 76 35 Z" fill="#8c3e06"/>

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

                <ellipse cx="30" cy="46" rx="4.5" ry="2.2" fill="#ff6b6b" opacity="0.55"/>
                <ellipse cx="70" cy="46" rx="4.5" ry="2.2" fill="#ff6b6b" opacity="0.55"/>
                <line x1="28" y1="45" x2="32" y2="47" stroke="#e03b3b" stroke-width="0.8" opacity="0.6"/>
                <line x1="68" y1="45" x2="72" y2="47" stroke="#e03b3b" stroke-width="0.8" opacity="0.6"/>

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
