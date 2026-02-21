/**
 * Module de thème — expose les couleurs de la charte pour usage dans le JS.
 * Pour changer le thème : modifier uniquement styles/main.css (:root).
 *
 * Usage dans les managers :
 *   import { T } from '../core/theme.js';
 *   element.style.background = T.gradientMain;
 *   element.style.color = T.hexTextPrimary;
 */

const s = getComputedStyle(document.documentElement);
const v = (name) => s.getPropertyValue(name).trim();

const p   = v('--color-primary');       // "90, 69, 148"
const pl  = v('--color-primary-light'); // "139, 114, 212"
const pd  = v('--color-primary-dark');  // "74, 53, 128"
const sec = v('--color-secondary');     // "239, 130, 24"
const bg3 = v('--color-bg-tertiary');   // "70, 54, 115"
const err = v('--color-error');         // "239, 68, 68"
const alr = v('--color-timer-alert');   // "234, 179, 8"

export const T = {
    // Couleurs solides
    primary:       `rgb(${p})`,
    primaryLight:  `rgb(${pl})`,
    primaryDark:   `rgb(${pd})`,
    secondary:     `rgb(${sec})`,

    // Couleurs hex (pour style color=)
    hexPrimary:      '#5a4594',
    hexPrimaryLight: '#8b72d4',
    hexSecondary:    '#ef8218',
    hexTextPrimary:  '#CCC4E3',

    // Couleurs avec opacité
    primaryA: (a) => `rgba(${p},${a})`,
    secondaryA: (a) => `rgba(${sec},${a})`,
    bgTertiaryA: (a) => `rgba(${bg3},${a})`,

    // Gradients
    gradientMain:    `linear-gradient(to right,rgb(${p}),rgb(${sec}))`,
    gradientMain135: `linear-gradient(135deg,rgb(${p}),rgb(${sec}))`,
    gradientTimerUrgent: `linear-gradient(to right,rgb(${err}),rgb(220,38,38))`,
    gradientTimerAlert:  `linear-gradient(to right,rgb(${alr}),rgb(${sec}))`,
};
