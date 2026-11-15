/**
 * Icônes uniques des deux monnaies du jeu : à utiliser partout, jamais d'icône écrite à la main.
 * Points (progression sur la carte) : étoile orange.
 * Fruits de connaissance (invocation de trophées, ex-gemmes) : le fruit lumineux de l'arbre, turquoise principal de la charte (--color-primary) d'invocation.
 */

// ANCHOR Une seule définition par monnaie : changer l'icône ou la couleur ici la change dans toute l'application
export const POINTS_ICON_CLASS = 'bi bi-star-fill text-accent-500';

/**
 * @param {string} extraClass - Taille ou marge seulement (ex. 'text-xl', 'mr-1'), jamais de couleur
 */
export const pointsIcon = (extraClass = '') => `<i class="${POINTS_ICON_CLASS} ${extraClass}"></i>`;

// NOTE Même dessin que les fruits de js/modules/ui/tree-svg.js (halo, fruit, liseré blanc, reflet), avec sa queue ; la taille suit le font-size (1.35em, le fruit occupe moins que le cadre)
export const gemIcon = (extraClass = '') => `<svg viewBox="0 0 24 26" class="inline-block w-[1.35em] h-[1.35em] align-[-0.3em] ${extraClass}" aria-hidden="true"><path d="M12 7.5 Q12 3 15.5 1.2" stroke="#6b3510" stroke-width="1.7" fill="none" stroke-linecap="round"/><circle cx="12" cy="15" r="11" style="fill:rgb(var(--color-primary))" opacity="0.3"/><circle cx="12" cy="15" r="8" style="fill:rgb(var(--color-primary))" stroke="#ffffff" stroke-width="1.2"/><circle cx="9.3" cy="12.4" r="2.3" fill="#ffffff" opacity="0.85"/></svg>`;
