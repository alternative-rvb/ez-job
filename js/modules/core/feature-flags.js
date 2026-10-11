/**
 * Interrupteurs de fonctionnalités masquées, mémorisés dans localStorage
 */

const ATELIER_KEY = 'atelierEnabled';

// ANCHOR L'atelier d'avatar est masqué par défaut ; showAtelier() dans la console le réactive (voir roadmap.js)
export function isAtelierEnabled() {
    try {
        return localStorage.getItem(ATELIER_KEY) === 'true';
    } catch (e) {
        return false;
    }
}

export function setAtelierEnabled(enabled) {
    try {
        localStorage.setItem(ATELIER_KEY, enabled ? 'true' : 'false');
    } catch (e) {
        console.warn('Impossible de mémoriser l\'état de l\'atelier :', e);
    }
}
