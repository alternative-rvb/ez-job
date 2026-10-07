/**
 * Module de définition et rendu des Avatars (Style Manga Chibi)
 * Structure nette en 2 groupes capillaires : cheveux arrière + cheveux avant.
 */

export const AVATARS = {
    boy: {
        id: 'boy',
        color: '#489e96',
        accent: '#ff9d00',
        image: null,
        headSvg: `
            <svg viewBox="4 -6 92 78" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <g id="boy-hair-back">
        <path d="M14 36 C10 14, 24 -4, 50 -4 C76 -4, 90 14, 86 36 C90 48, 86 58, 80 62 C76 56, 76 46, 76 38 C74 34, 26 34, 24 38 C24 46, 24 56, 20 62 C14 58, 10 48, 14 36 Z" fill="#542a0c"/>
        <polygon points="26,6 16,-4 30,0" fill="#542a0c"/>
        <polygon points="38,0 34,-10 46,-4" fill="#542a0c"/>
        <polygon points="54,-4 66,-10 62,0" fill="#542a0c"/>
        <polygon points="70,0 84,-4 74,6" fill="#542a0c"/>
        <polygon points="14,24 4,18 14,32" fill="#542a0c"/>
        <polygon points="86,24 96,18 86,32" fill="#542a0c"/>
    </g>

    <g id="boy-head">
        <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>
        <path d="M42 63 L50 65 L58 63 Z" fill="#ff9d00"/>

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

    <g id="boy-hair-front">
        <path d="M17 30 L23 37 L27 25 L35 39 L42 26 L50 40 L58 26 L65 39 L73 25 L77 37 L83 30 C78 12, 66 6, 50 6 C34 6, 22 12, 17 30 Z" fill="#6d3a14"/>
        <polygon points="17,30 21,42 25,34" fill="#6d3a14"/>
        <polygon points="83,30 79,42 75,34" fill="#6d3a14"/>
    </g>
</svg>
        `,
        svg: `
            <svg viewBox="0 -6 100 131" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
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

    <g id="boy-hair-back-full">
        <path d="M14 36 C10 14, 24 -4, 50 -4 C76 -4, 90 14, 86 36 C90 48, 86 58, 80 62 C76 56, 76 46, 76 38 C74 34, 26 34, 24 38 C24 46, 24 56, 20 62 C14 58, 10 48, 14 36 Z" fill="#542a0c"/>
        <polygon points="26,6 16,-4 30,0" fill="#542a0c"/>
        <polygon points="38,0 34,-10 46,-4" fill="#542a0c"/>
        <polygon points="54,-4 66,-10 62,0" fill="#542a0c"/>
        <polygon points="70,0 84,-4 74,6" fill="#542a0c"/>
        <polygon points="14,24 4,18 14,32" fill="#542a0c"/>
        <polygon points="86,24 96,18 86,32" fill="#542a0c"/>
    </g>

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

    <g id="boy-hair-front-full">
        <path d="M17 30 L23 37 L27 25 L35 39 L42 26 L50 40 L58 26 L65 39 L73 25 L77 37 L83 30 C78 12, 66 6, 50 6 C34 6, 22 12, 17 30 Z" fill="#6d3a14"/>
        <polygon points="17,30 21,42 25,34" fill="#6d3a14"/>
        <polygon points="83,30 79,42 75,34" fill="#6d3a14"/>
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
    <g id="girl-hair-back">
        <path d="M12 36 C8 12, 22 -4, 50 -4 C78 -4, 92 12, 88 36 C94 50, 90 64, 82 70 C78 64, 76 54, 76 44 C74 34, 26 34, 24 44 C24 54, 22 64, 18 70 C10 64, 6 50, 12 36 Z" fill="#8c3e06"/>
        <circle cx="18" cy="12" r="12" fill="#8c3e06"/>
        <circle cx="82" cy="12" r="12" fill="#8c3e06"/>
        <ellipse cx="14" cy="22" rx="4" ry="2.5" fill="#489e96" transform="rotate(-25 14 22)"/>
        <ellipse cx="20" cy="22" rx="4" ry="2.5" fill="#489e96" transform="rotate(25 20 22)"/>
        <ellipse cx="80" cy="22" rx="4" ry="2.5" fill="#489e96" transform="rotate(-25 80 22)"/>
        <ellipse cx="86" cy="22" rx="4" ry="2.5" fill="#489e96" transform="rotate(25 86 22)"/>
    </g>

    <g id="girl-head">
        <rect x="46" y="58" width="8" height="8" fill="#ffd4a3"/>
        <circle cx="50" cy="63" r="2.5" fill="#489e96"/>

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

    <g id="girl-hair-front">
        <path d="M18 30 C22 37, 28 41, 34 35 C39 42, 46 42, 50 35 C54 42, 61 42, 66 35 C72 41, 78 37, 82 30 C76 14, 64 8, 50 8 C36 8, 24 14, 18 30 Z" fill="#a84e0e"/>
        <path d="M18 30 C15 42, 18 54, 25 58 C27 50, 24 40, 23 32 Z" fill="#8c3e06"/>
        <path d="M82 30 C85 42, 82 54, 75 58 C73 50, 76 40, 77 32 Z" fill="#8c3e06"/>
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

    <g id="girl-hair-back-full">
        <path d="M12 36 C8 12, 22 -4, 50 -4 C78 -4, 92 12, 88 36 C94 50, 90 64, 82 70 C78 64, 76 54, 76 44 C74 34, 26 34, 24 44 C24 54, 22 64, 18 70 C10 64, 6 50, 12 36 Z" fill="#8c3e06"/>
        <circle cx="18" cy="12" r="12" fill="#8c3e06"/>
        <circle cx="82" cy="12" r="12" fill="#8c3e06"/>
        <ellipse cx="14" cy="22" rx="4" ry="2.5" fill="#489e96" transform="rotate(-25 14 22)"/>
        <ellipse cx="20" cy="22" rx="4" ry="2.5" fill="#489e96" transform="rotate(25 20 22)"/>
        <ellipse cx="80" cy="22" rx="4" ry="2.5" fill="#489e96" transform="rotate(-25 80 22)"/>
        <ellipse cx="86" cy="22" rx="4" ry="2.5" fill="#489e96" transform="rotate(25 86 22)"/>
    </g>

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

    <g id="girl-hair-front-full">
        <path d="M18 30 C22 37, 28 41, 34 35 C39 42, 46 42, 50 35 C54 42, 61 42, 66 35 C72 41, 78 37, 82 30 C76 14, 64 8, 50 8 C36 8, 24 14, 18 30 Z" fill="#a84e0e"/>
        <path d="M18 30 C15 42, 18 54, 25 58 C27 50, 24 40, 23 32 Z" fill="#8c3e06"/>
        <path d="M82 30 C85 42, 82 54, 75 58 C73 50, 76 40, 77 32 Z" fill="#8c3e06"/>
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
