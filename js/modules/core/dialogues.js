/**
 * Répliques des bulles de dialogue, adaptées au personnage de l'avatar
 * (carte de la roadmap et fenêtre de réponse du quiz)
 */

// ANCHOR Tenue de trophée -> identifiant de personnage
const OUTFIT_TO_CHARACTER = {
    elf_ranger: 'elf',
    orc_berserker: 'orc',
    paladin_light: 'paladin',
    cat_thief: 'cat',
    shadow_mage: 'shadow',
    vampire_noble: 'vampire',
    necromancer: 'necromancer',
    fairy_herbalist: 'fairy',
    scholar_mage: 'scholar'
};

// NOTE Repli quand la tenue n'est pas connue : l'espèce suffit pour la plupart des personnages
const SPECIES_TO_CHARACTER = {
    elf: 'elf',
    orc: 'orc',
    cat: 'cat',
    shadow: 'shadow',
    vampire: 'vampire',
    undead: 'necromancer',
    fairy: 'fairy'
};

/**
 * Identifiant du personnage à partir de la config d'avatar du joueur ('base' si c'est un personnage de départ)
 */
export function getCharacterId(config = {}) {
    return OUTFIT_TO_CHARACTER[config?.outfitKey] || SPECIES_TO_CHARACTER[config?.species] || 'base';
}

// SECTION Carte : une réplique par palier de points
// Ordre : 0 pt, >0, >=10, >=25, >=40, >=60, >=80, >=100 (forêt, lac, porte, ascension, crête, sommet, citadelle)
const MAP_LINES = {
    base: ['C\'est parti !', 'En route vers la Forêt !', 'Vers le Lac !', 'Cap sur la Porte !', 'L\'Ascension commence !', 'Plus que la Crête !', 'Le Sommet est proche !', 'Citadelle atteinte !'],
    elf: ['Les bois m\'appellent !', 'La forêt me guide.', 'Le lac chante, écoutez.', 'La Porte nous attend.', 'Léger comme le vent !', 'La Crête est en vue.', 'Le Sommet m\'appelle.', 'Citadelle, me voici !'],
    orc: ['Orc prêt ! Grrr !', 'Orc aime la forêt !', 'Orc veut boire au lac.', 'Porte ? Orc cogne !', 'Orc grimpe, orc fort !', 'Plus que la Crête !', 'Sommet bientôt écrasé !', 'Orc a gagné ! Roar !'],
    paladin: ['Que la lumière guide !', 'Au nom du Soleil !', 'Le lac, havre de paix.', 'La Porte sera franchie.', 'L\'ascension est sacrée.', 'La Crête, avec foi !', 'Le Sommet est proche !', 'Gloire à la Citadelle !'],
    cat: ['Miaou, on y va !', 'Les bois, mon terrain !', 'Un lac ? Je boude.', 'La Porte ? Je me faufile.', 'Je grimpe sans bruit.', 'La Crête, un jeu d\'enfant.', 'Le Sommet sent bon !', 'Citadelle, c\'est à moi !'],
    shadow: ['L\'ombre se lève...', 'Les arbres murmurent.', 'Le lac reflète la nuit.', 'La Porte s\'ouvrira.', 'Les ombres montent.', 'La Crête tremble déjà.', 'Le Sommet est à nous.', 'La Citadelle m\'obéit !'],
    vampire: ['La nuit est à moi.', 'Forêt charmante, ma foi.', 'Un lac au clair de lune.', 'Cette Porte, quel style !', 'Montons avec élégance.', 'La Crête, enfin !', 'Le Sommet, à la nuit tombée.', 'Quelle belle Citadelle !'],
    necromancer: ['Les morts m\'attendent...', 'Quelle forêt macabre !', 'Le lac cache des secrets.', 'La Porte grince, parfait.', 'Les os me guident.', 'La Crête, tombeau de vent.', 'Le Sommet approche...', 'Citadelle, je t\'invoque !'],
    fairy: ['Allons voir les fleurs !', 'La forêt est en fleurs !', 'Le lac scintille !', 'La Porte brille !', 'Je vole vers le haut !', 'La Crête, c\'est joli !', 'Le Sommet, bientôt !', 'La Citadelle, hourra !'],
    scholar: ['Ouvrons le grimoire !', 'Chapitre un : la forêt.', 'Hypothèse : le lac.', 'La Porte est logique.', 'Théorie : on monte.', 'La Crête, en théorie.', 'Le Sommet, CQFD.', 'Thèse validée !']
};

const MAP_THRESHOLDS = [100, 80, 60, 40, 25, 10, 1, 0];

/**
 * Réplique de la carte selon le personnage et le total de points
 */
export function getMapLine(characterId, totalPoints) {
    const lines = MAP_LINES[characterId] || MAP_LINES.base;
    const tier = MAP_THRESHOLDS.findIndex(min => totalPoints >= min);
    return lines[MAP_LINES.base.length - 1 - tier];
}
// !SECTION

// SECTION Quiz : variantes courtes sous le Vrai / Faux de la bulle
const ANSWER_LINES = {
    base: { ok: ['Bien joué !', 'Bravo !', 'Super !'], ko: ['Oups...', 'Pas grave !', 'Dommage...'] },
    elf: { ok: ['Bien visé !', 'La forêt approuve.', 'Juste comme le vent !'], ko: ['Ma flèche dévie...', 'La forêt soupire.', 'Raté, j\'apprends.'] },
    orc: { ok: ['Orc content ! Roar !', 'Orc malin !', 'Grrr, bien !'], ko: ['Orc pas content !', 'Grrr... raté !', 'Orc cogne le quiz !'] },
    paladin: { ok: ['La lumière triomphe !', 'Justice rendue !', 'Bien dit, noble !'], ko: ['Que le soleil m\'aide.', 'Je me relèverai.', 'Une épreuve de plus.'] },
    cat: { ok: ['Miaou, évidemment !', 'Facile, ronron.', 'Sur mes pattes !'], ko: ['Pfff, miaou...', 'Je fais semblant.', 'Griffe de travers !'] },
    shadow: { ok: ['Les ombres savent.', 'Sans surprise.', 'L\'ombre approuve.'], ko: ['L\'ombre s\'épaissit...', 'Un voile sur mes yeux.', 'Les ténèbres rient.'] },
    vampire: { ok: ['Élémentaire, mon cher.', 'Quelle élégance !', 'Naturellement.'], ko: ['Quelle indignité !', 'Pas de quoi pâlir.', 'Je suis déjà pâle...'] },
    necromancer: { ok: ['Les os approuvent.', 'Ça, c\'est vivant !', 'Les morts applaudissent.'], ko: ['Même les morts rient...', 'Raté, je ressuscite.', 'Mon crâne en tremble.'] },
    fairy: { ok: ['Ça fleurit !', 'Magique !', 'Pluie d\'étoiles !'], ko: ['Mes ailes tombent...', 'Une fleur fanée.', 'Zut, un pétale !'] },
    scholar: { ok: ['Conforme au grimoire !', 'Démonstration réussie.', 'Exact, évidemment.'], ko: ['Erreur de calcul...', 'Retour au grimoire.', 'Il faut réviser.'] }
};

/**
 * Variante au hasard pour une bonne (isCorrect) ou une mauvaise réponse
 */
export function getAnswerLine(characterId, isCorrect) {
    const set = ANSWER_LINES[characterId] || ANSWER_LINES.base;
    const lines = isCorrect ? set.ok : set.ko;
    return lines[Math.floor(Math.random() * lines.length)];
}
// !SECTION
