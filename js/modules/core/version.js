/**
 * Module de gestion de version pour cache-busting
 * Incrémente automatiquement la version à chaque build
 */

export const APP_VERSION = '1.0.8';
export const BUILD_TIMESTAMP = Date.now();

/**
 * Génère un paramètre de version pour les URLs
 * @returns {string} Paramètre de query string pour cache-busting
 */
export function getCacheBuster() {
    return `v=${APP_VERSION}`;
}

/**
 * Ajoute le cache-buster à une URL
 * @param {string} url - URL à modifier
 * @returns {string} URL avec paramètre de cache-busting
 */
export function addCacheBuster(url) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${getCacheBuster()}`;
}
