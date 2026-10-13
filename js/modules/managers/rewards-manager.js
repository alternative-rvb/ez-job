/**
 * Module de gestion du système de récompense (trophées, points, codes secrets)
 */

import { RPG_TROPHIES } from '../ui/avatars.js';

// ANCHOR Règles de l'invocation : coût, gemmes rendues sur un doublon, garantie et taux par rareté
export const SUMMON_COST = 10;
export const SUMMON_REFUND = 5;
export const SUMMON_PITY = 10;
export const SUMMON_RATES = [
    { rarity: 'rare', label: 'Rare', rate: 60 },
    { rarity: 'épique', label: 'Épique', rate: 30 },
    { rarity: 'légendaire', label: 'Légendaire', rate: 10 }
];

export class RewardsManager {
    constructor() {
        this.storageKey = 'erudizz_rewards';
        this.initializeRewards();
    }

    /**
     * Initialise le système de récompenses en localStorage
     */
    initializeRewards() {
        if (!localStorage.getItem(this.storageKey)) {
            const initialRewards = {
                totalPoints: 0,
                unlockedTrophies: [],
                unlockedSkins: [],
                newItems: [],
                secretCodes: {},
                pointsHistory: []
            };
            localStorage.setItem(this.storageKey, JSON.stringify(initialRewards));
        }
    }

    /**
     * Récupère les récompenses actuelles
     */
    getRewards() {
        const rewards = localStorage.getItem(this.storageKey);
        return rewards ? JSON.parse(rewards) : null;
    }

    /**
     * Sauvegarde les récompenses
     */
    saveRewards(rewards) {
        localStorage.setItem(this.storageKey, JSON.stringify(rewards));
    }

    /**
     * Calcule les points gagnés en fonction du score et du temps limite choisi
     * @param {number} scorePercentage - Pourcentage de réussite (0-100)
     * @param {number} timeLimit - Temps limite par question en secondes (5, 10, 15, 20)
     * @returns {number} Nombre de points gagnés
     */
    calculatePoints(scorePercentage, timeLimit = 10) {
        // Moins de 60% = 0 point
        if (scorePercentage < 60) {
            return 0;
        }

        // Temps infini : pas de défi chronométré, 1 seule gemme dès 60 %
        if (timeLimit === 0) {
            return 1;
        }

        // NOTE Gain croissant par tranche : 60-69, 70-79, 80-89, 90-99, 100 %
        // Chaque temps limite a sa ligne ; plus le temps est court, plus la tranche haute rapporte
        const POINTS_PAR_TRANCHE = {
            5:  [2, 4, 8, 12, 16], // 5s - le plus difficile
            10: [2, 4, 6, 10, 12], // 10s - difficile (par défaut)
            15: [2, 2, 4, 6, 8],   // 15s - moyen
            20: [1, 2, 2, 4, 6]    // 20s - facile
        };
        const tranches = POINTS_PAR_TRANCHE[timeLimit] || POINTS_PAR_TRANCHE[10];
        const index = Math.min(Math.floor((scorePercentage - 60) / 10), 4);

        return tranches[index];
    }

    /**
     * Ajoute des points après un quiz
     * @param {number} scorePercentage - Pourcentage de réussite
     * @param {string} quizName - Nom du quiz
     * @param {number} timeLimit - Temps limite par question utilisé
     * @returns {object} Objet avec pointsEarned et totalPoints
     */
    addPoints(scorePercentage, quizName, timeLimit = 10) {
        const points = this.calculatePoints(scorePercentage, timeLimit);
        const rewards = this.getRewards();

        if (points > 0) {
            rewards.totalPoints += points;
            rewards.pointsHistory.push({
                points: points,
                quizName: quizName,
                scorePercentage: scorePercentage,
                timeLimit: timeLimit,
                date: new Date().toISOString()
            });
            this.saveRewards(rewards);
        }

        return {
            pointsEarned: points,
            totalPoints: rewards.totalPoints,
            canBuySecretCode: rewards.totalPoints >= 5,
            canSummon: this.canSummon()
        };
    }

    /**
     * Génère un code secret aléatoire
     * @returns {string} Code secret généré
     */
    generateSecretCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    /**
     * Achète un code secret (coûte 5 points)
     * @param {string} trophyId - ID du trophée à débloquer
     * @returns {object|null} Code secret généré ou null si pas assez de points
     */
    buySecretCode(trophyId) {
        const rewards = this.getRewards();

        if (rewards.totalPoints < 5) {
            return null;
        }

        // Déduire les points
        rewards.totalPoints -= 5;

        // Générer le code secret
        const secretCode = this.generateSecretCode();

        // Stocker le code avec le trophée associé
        rewards.secretCodes[secretCode] = {
            trophy_id: trophyId,
            used: false,
            dateCreated: new Date().toISOString(),
            dateUsed: null
        };

        this.saveRewards(rewards);

        return {
            secretCode: secretCode,
            trophyId: trophyId,
            remainingPoints: rewards.totalPoints
        };
    }

    /**
     * Valide et utilise un code secret
     * @param {string} secretCode - Code à valider
     * @returns {object|null} Objet avec le trophée débloqué ou null si code invalide
     */
    useSecretCode(secretCode) {
        const rewards = this.getRewards();

        if (!rewards.secretCodes[secretCode]) {
            return null; // Code n'existe pas
        }

        const codeData = rewards.secretCodes[secretCode];

        if (codeData.used) {
            return null; // Code déjà utilisé
        }

        // Marquer comme utilisé
        codeData.used = true;
        codeData.dateUsed = new Date().toISOString();

        // Ajouter le trophée aux trophées débloqués
        if (!rewards.unlockedTrophies.includes(codeData.trophy_id)) {
            rewards.unlockedTrophies.push(codeData.trophy_id);
        }

        this.saveRewards(rewards);

        return {
            trophyId: codeData.trophy_id,
            successMessage: 'Trophée débloqué avec succès!'
        };
    }

    // SECTION Invocation de skins (RPG_TROPHIES)

    /**
     * Skins invocables (les squelettes status 'locked' sont exclus), triés par numéro
     * @returns {array}
     */
    getSummonPool() {
        return RPG_TROPHIES
            .filter(t => t.status !== 'locked' && t.rarity && t.unlocks)
            .sort((a, b) => a.number - b.number);
    }

    /**
     * IDs des skins gagnés
     * @returns {array}
     */
    getUnlockedSkins() {
        const rewards = this.getRewards();
        return (rewards && rewards.unlockedSkins) || [];
    }

    /**
     * Vérifie si un skin est gagné
     * @param {string} skinId
     * @returns {boolean}
     */
    isSkinUnlocked(skinId) {
        return this.getUnlockedSkins().includes(skinId);
    }

    /**
     * Nombre d'invocations restantes avant le légendaire garanti
     * @returns {number}
     */
    getPityRemaining() {
        const rewards = this.getRewards();
        return Math.max(1, SUMMON_PITY - ((rewards && rewards.pullsSinceLegendary) || 0));
    }

    /**
     * Vérifie si le joueur a assez de gemmes pour invoquer
     * @returns {boolean}
     */
    canSummon() {
        return this.getTotalPoints() >= SUMMON_COST && this.getSummonPool().length > 0;
    }

    /**
     * Tire une rareté selon SUMMON_RATES, parmi celles qui ont au moins un skin
     */
    rollRarity(pool) {
        const rates = SUMMON_RATES.filter(r => pool.some(t => t.rarity === r.rarity));
        const total = rates.reduce((sum, r) => sum + r.rate, 0);
        let roll = Math.random() * total;
        for (const r of rates) {
            roll -= r.rate;
            if (roll < 0) return r.rarity;
        }
        return rates[rates.length - 1].rarity;
    }

    /**
     * Invoque un skin : coûte SUMMON_COST gemmes, un doublon en rend SUMMON_REFUND,
     * et le légendaire est garanti à la SUMMON_PITY-ième invocation sans légendaire
     * @returns {object|null} { skin, isNew, refund, remainingPoints } ou null si pas assez de gemmes
     */
    summon() {
        if (!this.canSummon()) return null;
        const pool = this.getSummonPool();
        const rewards = this.getRewards();
        const pulls = (rewards.pullsSinceLegendary || 0) + 1;

        const hasLegendary = pool.some(t => t.rarity === 'légendaire');
        const rarity = hasLegendary && pulls >= SUMMON_PITY ? 'légendaire' : this.rollRarity(pool);
        const candidates = pool.filter(t => t.rarity === rarity);
        const skin = candidates[Math.floor(Math.random() * candidates.length)];
        const isNew = !(rewards.unlockedSkins || []).includes(skin.id);
        const refund = isNew ? 0 : SUMMON_REFUND;

        rewards.totalPoints = rewards.totalPoints - SUMMON_COST + refund;
        rewards.pullsSinceLegendary = rarity === 'légendaire' ? 0 : pulls;
        if (isNew) {
            rewards.unlockedSkins = [...(rewards.unlockedSkins || []), skin.id];
            rewards.newItems = [...new Set([...(rewards.newItems || []), ...this.getSkinItemKeys(skin)])];
        }
        rewards.pointsHistory.push({
            points: refund - SUMMON_COST,
            quizName: `Invocation : ${skin.title}${isNew ? '' : ' (doublon)'}`,
            date: new Date().toISOString()
        });
        this.saveRewards(rewards);

        return { skin, isNew, refund, remainingPoints: rewards.totalPoints };
    }

    /**
     * Clés des éléments d'atelier apportés par un skin (ex. 'hair:#14b8a6', 'species:elf')
     * @param {object} skin - Entrée de RPG_TROPHIES
     * @returns {array}
     */
    getSkinItemKeys(skin) {
        const u = skin.unlocks;
        const keys = [];
        if (u.species) keys.push(`species:${u.species}`);
        u.skins.forEach(id => keys.push(`skin:${id}`));
        u.hairs.forEach(hex => keys.push(`hair:${hex.toLowerCase()}`));
        u.eyes.forEach(id => keys.push(`eye:${id}`));
        Object.values(u.styles).forEach(key => keys.push(`style:${key}`));
        if (u.outfit) keys.push(`outfit:${u.outfit}`);
        // NOTE Pastille de la carte dans la collection, retirée quand la carte est agrandie ou appliquée
        keys.push(`card:${skin.id}`);
        return keys;
    }

    /**
     * Catalogue des éléments débloqués par tous les skins achetés
     * @returns {object} { species, skins, hairs, eyes, styles: { boy, girl }, outfits } (tableaux)
     */
    getUnlockedCatalog() {
        const catalog = { species: [], skins: [], hairs: [], eyes: [], styles: { boy: [], girl: [] }, outfits: [] };
        this.getSummonPool().filter(t => this.isSkinUnlocked(t.id)).forEach(t => {
            const u = t.unlocks;
            if (u.species) catalog.species.push({ id: u.species, label: u.label, skin: t });
            catalog.skins.push(...u.skins);
            catalog.hairs.push(...u.hairs.map(h => h.toLowerCase()));
            catalog.eyes.push(...u.eyes);
            // NOTE Les skins rares n'apportent que des couleurs : pas de coupe à ajouter
            if (u.styles.boy) catalog.styles.boy.push({ key: u.styles.boy, label: u.label });
            if (u.styles.girl) catalog.styles.girl.push({ key: u.styles.girl, label: u.label });
            if (u.outfit) catalog.outfits.push({ key: u.outfit, label: u.label });
        });
        return catalog;
    }

    /**
     * Indique si un élément d'atelier porte encore la pastille « Nouveau »
     * @param {string} itemKey - ex. 'hair:#14b8a6'
     * @returns {boolean}
     */
    isNewItem(itemKey) {
        const rewards = this.getRewards();
        return Boolean(rewards && (rewards.newItems || []).includes(itemKey));
    }

    /**
     * Retire la pastille « Nouveau » d'un élément (à sa première sélection)
     * @param {string} itemKey
     */
    markItemSeen(itemKey) {
        const rewards = this.getRewards();
        if (!rewards || !(rewards.newItems || []).includes(itemKey)) return;
        rewards.newItems = rewards.newItems.filter(k => k !== itemKey);
        this.saveRewards(rewards);
    }

    // !SECTION Invocation de skins

    /**
     * Récupère les trophées débloqués
     * @returns {array} Liste des IDs des trophées débloqués
     */
    getUnlockedTrophies() {
        const rewards = this.getRewards();
        return rewards.unlockedTrophies || [];
    }

    /**
     * Récupère le total de points actuels
     * @returns {number} Total de points
     */
    getTotalPoints() {
        const rewards = this.getRewards();
        return rewards.totalPoints || 0;
    }

    /**
     * Vérifie si un code secret est valide et non utilisé
     * @param {string} secretCode - Code à vérifier
     * @returns {boolean}
     */
    isCodeValid(secretCode) {
        const rewards = this.getRewards();
        const codeData = rewards.secretCodes[secretCode];
        return codeData && !codeData.used;
    }

    /**
     * Récupère l'historique des points
     * @returns {array} Historique des points gagnés
     */
    getPointsHistory() {
        const rewards = this.getRewards();
        return rewards.pointsHistory || [];
    }

    /**
     * Définit directement le total de points (utile pour les tests et réglages)
     * @param {number} points
     */
    setTotalPoints(points) {
        const rewards = this.getRewards() || {
            totalPoints: 0,
            unlockedTrophies: [],
            unlockedSkins: [],
            newItems: [],
            secretCodes: {},
            pointsHistory: []
        };
        rewards.totalPoints = Math.max(0, parseInt(points) || 0);
        this.saveRewards(rewards);
        return rewards.totalPoints;
    }

    /**
     * Réinitialise toutes les récompenses (pour les tests)
     */
    resetRewards() {
        localStorage.removeItem(this.storageKey);
        this.initializeRewards();
    }
}

// Export du singleton
export const rewardsManager = new RewardsManager();
