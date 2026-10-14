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
    scholar_mage: 'scholar',
    pirate_corsair: 'pirate',
    dragon_knight: 'dragon',
    astronaut_explorer: 'astronaut',
    frost_knight: 'frost'
};

// NOTE Repli quand la tenue n'est pas connue : l'espèce suffit pour la plupart des personnages
const SPECIES_TO_CHARACTER = {
    elf: 'elf',
    orc: 'orc',
    cat: 'cat',
    shadow: 'shadow',
    vampire: 'vampire',
    undead: 'necromancer',
    fairy: 'fairy',
    dragon: 'dragon'
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
    elf: ['Les bois nous appellent !', 'La forêt nous guide.', 'Le lac chante, écoute !', 'La Porte nous attend.', 'Léger comme le vent !', 'La Crête est en vue.', 'Le Sommet nous appelle.', 'Citadelle, nous voici !'],
    orc: ['Orc prêt ! Allons-y !', 'Orc aime la forêt !', 'Orc veut sauter dans le lac !', 'Une Porte ? Orc ouvre !', 'Orc grimpe, orc fort !', 'Plus que la Crête !', 'Le Sommet est tout près !', 'Orc a réussi ! Hourra !'],
    paladin: ['Que la lumière nous guide !', 'Au nom du Soleil !', 'Le lac, quel bel endroit.', 'La Porte sera franchie.', 'Courage, on monte !', 'La Crête, avec confiance !', 'Le Sommet est proche !', 'Gloire à la Citadelle !'],
    cat: ['Miaou, on y va !', 'Les bois, mon terrain de jeu !', 'Un lac ? Je regarde de loin.', 'La Porte ? Je me faufile.', 'Je grimpe sans bruit.', 'La Crête, un jeu d\'enfant.', 'Le Sommet sent bon !', 'Citadelle, nous voilà !'],
    shadow: ['L\'ombre se lève...', 'Les arbres murmurent.', 'Le lac reflète les étoiles.', 'La Porte va s\'ouvrir.', 'On monte dans la nuit.', 'La Crête brille de mille étoiles.', 'Le Sommet est à nous.', 'La Citadelle nous attend !'],
    vampire: ['La nuit est belle.', 'Forêt charmante, ma foi.', 'Un lac au clair de lune.', 'Cette Porte, quel style !', 'Montons avec élégance.', 'La Crête, enfin !', 'Le Sommet, sous la lune.', 'Quelle belle Citadelle !'],
    necromancer: ['Un secret nous attend...', 'Quelle forêt mystérieuse !', 'Le lac cache un secret.', 'La Porte grince, parfait !', 'Ma lanterne verte nous guide.', 'La Crête, un vent magique.', 'Le Sommet approche...', 'Citadelle, on arrive !'],
    fairy: ['Allons voir les fleurs !', 'La forêt est en fleurs !', 'Le lac scintille !', 'La Porte brille !', 'Je vole vers le haut !', 'La Crête, c\'est joli !', 'Le Sommet, bientôt !', 'La Citadelle, hourra !'],
    scholar: ['Ouvrons le grimoire !', 'Chapitre un : la forêt.', 'Hypothèse : le lac.', 'La Porte est logique.', 'Théorie : on monte.', 'La Crête, en théorie.', 'Le Sommet, bien sûr !', 'Mission réussie !'],
    pirate: ['Hissez les voiles !', 'Terre en vue : la forêt !', 'Un lac, mais sans bateau ?', 'La Porte, un coffre à ouvrir !', 'À l\'aventure sur la montagne !', 'La Crête, notre mât de misaine !', 'Le Sommet, le trésor est là !', 'Citadelle atteinte, moussaillons !'],
    dragon: ['Les flammes s\'éveillent !', 'La forêt nous attend.', 'Le lac fait de la vapeur !', 'La Porte brille de mille feux !', 'Je grimpe, ailes au vent.', 'La Crête, quelle belle vue.', 'Le Sommet est tout près !', 'Citadelle, nous voilà !'],
    astronaut: ['Compte à rebours lancé !', 'Atterrissage en forêt !', 'Un lac sans gravité ?', 'La Porte, un sas à ouvrir !', 'Décollage vers la crête !', 'La Crête, orbite en vue.', 'Le Sommet, mission presque finie !', 'Citadelle, ici la base !'],
    frost: ['Gardons la tête froide !', 'La forêt est givrée.', 'Un lac gelé, parfait !', 'La Porte est de glace !', 'On grimpe dans la neige.', 'La Crête, un vent glacial.', 'Le Sommet scintille !', 'Citadelle, nous voici !']
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
    base: { ok: ['Bien joué !', 'Bravo !', 'Super !'], ko: ['Oups...', 'Pas grave !', 'On réessaie !'] },
    elf: { ok: ['Bien visé !', 'La forêt applaudit.', 'Juste comme le vent !'], ko: ['Ma flèche a dévié...', 'Pas grave, on apprend.', 'Je retente !'] },
    orc: { ok: ['Orc content ! Hourra !', 'Orc malin !', 'Bravo, bravo !'], ko: ['Orc pas content...', 'Raté ! Orc réessaie.', 'Orc apprend, c\'est bien.'] },
    paladin: { ok: ['La lumière brille !', 'Bien joué, noble ami !', 'Bien dit !'], ko: ['Que le soleil m\'aide.', 'Je me relève.', 'Une leçon de plus.'] },
    cat: { ok: ['Miaou, évidemment !', 'Facile, ronron.', 'Sur mes pattes !'], ko: ['Pfff, miaou...', 'Je ne l\'ai pas fait exprès.', 'Je retombe sur mes pattes !'] },
    shadow: { ok: ['Les étoiles approuvent.', 'Sans surprise.', 'La nuit applaudit.'], ko: ['La nuit est brumeuse...', 'Un nuage devant mes yeux.', 'Je retenterai !'] },
    vampire: { ok: ['Élémentaire, mon cher.', 'Quelle élégance !', 'Naturellement.'], ko: ['Quel dommage !', 'Je retente, avec classe.', 'Même la lune se trompe.'] },
    necromancer: { ok: ['Ma lanterne brille !', 'Ça, c\'est magique !', 'Bravo, bravo !'], ko: ['Ma lanterne vacille...', 'Raté, je recommence.', 'Je vais mieux réviser.'] },
    fairy: { ok: ['Ça fleurit !', 'Magique !', 'Pluie d\'étoiles !'], ko: ['Mes ailes tremblent...', 'Une fleur fanée.', 'Zut, un pétale !'] },
    scholar: { ok: ['Conforme au grimoire !', 'Démonstration réussie.', 'Exact, évidemment.'], ko: ['Erreur de calcul...', 'Retour au grimoire.', 'On révise ensemble ?'] },
    pirate: { ok: ['Mille sabords, bien visé !', 'Un beau butin !', 'Yo ho ho !'], ko: ['Par tous les poissons...', 'Le navire tangue.', 'On repart à la voile !'] },
    dragon: { ok: ['Un feu de joie !', 'Rugissement de victoire !', 'Les écailles brillent !'], ko: ['Ma flamme vacille...', 'Même les dragons se trompent.', 'Un peu de fumée, on recommence !'] },
    astronaut: { ok: ['Mission accomplie !', 'Houston, c\'est bon !', 'Un petit pas pour moi !'], ko: ['Houston, un problème...', 'Perdu dans l\'espace.', 'On relance le compte à rebours !'] },
    frost: { ok: ['Net et précis !', 'Cristallin !', 'Le givre applaudit.'], ko: ['Mon armure gèle...', 'Un petit coup de froid.', 'On dégivre et on recommence !'] }
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
