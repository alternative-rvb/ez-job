/**
 * Fonctions pures de calcul de progression des trophées
 * Le déblocage est dérivé de playerManager.getSuccessfulQuizCount(), pas persisté
 */

export function getUnlockedTrophies(trophies, successCount) {
    return trophies.filter(t => t.unlockThreshold <= successCount);
}

export function getNextTrophy(trophies, successCount) {
    return trophies
        .filter(t => t.unlockThreshold > successCount)
        .sort((a, b) => a.unlockThreshold - b.unlockThreshold)[0] || null;
}

export function getNewlyUnlocked(trophies, previousCount, currentCount) {
    return trophies.filter(t => t.unlockThreshold > previousCount && t.unlockThreshold <= currentCount);
}
