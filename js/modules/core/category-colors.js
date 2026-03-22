/**
 * Palette de couleurs par catégorie
 * Cet objet est généré automatiquement basé sur l'index.json
 */

// Palette de couleurs prédéfinies pour les catégories — thème CamiLudik
// bg/bgEnd : valeurs hex pour dégradés inline (Tailwind CDN ne détecte pas les classes JS dynamiques)
// Utiliser des teintes assez foncées pour garantir la lisibilité du texte blanc
const COLOR_PALETTE = [
  { bg: 'from-amber-500 to-orange-500',   bgHex: '#f59e0b', bgEndHex: '#f97316', badge: 'text-white font-semibold' },
  { bg: 'from-emerald-500 to-teal-500',   bgHex: '#10b981', bgEndHex: '#14b8a6', badge: 'text-white font-semibold' },
  { bg: 'from-sky-500 to-blue-500',       bgHex: '#0ea5e9', bgEndHex: '#3b82f6', badge: 'text-white font-semibold' },
  { bg: 'from-rose-500 to-pink-500',      bgHex: '#f43f5e', bgEndHex: '#ec4899', badge: 'text-white font-semibold' },
  { bg: 'from-violet-500 to-purple-500',  bgHex: '#8b5cf6', bgEndHex: '#a855f7', badge: 'text-white font-semibold' },
  { bg: 'from-orange-500 to-red-500',     bgHex: '#f97316', bgEndHex: '#ef4444', badge: 'text-white font-semibold' },
  { bg: 'from-cyan-500 to-sky-500',       bgHex: '#06b6d4', bgEndHex: '#0ea5e9', badge: 'text-white font-semibold' },
  { bg: 'from-green-600 to-emerald-500',  bgHex: '#16a34a', bgEndHex: '#10b981', badge: 'text-white font-semibold' },
  { bg: 'from-fuchsia-500 to-rose-500',   bgHex: '#d946ef', bgEndHex: '#f43f5e', badge: 'text-white font-semibold' },
  { bg: 'from-red-600 to-orange-500',     bgHex: '#dc2626', bgEndHex: '#f97316', badge: 'text-white font-semibold' },
];

// Index JSON avec les catégories (chargé une seule fois)
let indexData = null;
let categoryColorMap = {};

/**
 * Charger les données d'index.json
 */
async function loadIndexData() {
  if (indexData) return indexData;
  
  try {
    const response = await fetch('js/data/index.json');
    if (!response.ok) throw new Error('Erreur lors du chargement de index.json');
    indexData = await response.json();
    return indexData;
  } catch (error) {
    console.error('❌ Erreur lors du chargement de index.json:', error);
    return null;
  }
}

/**
 * Initialiser le mapping des couleurs depuis l'index.json
 */
export async function initializeCategoryColors() {
  const data = await loadIndexData();
  
  if (data && data.categories && Array.isArray(data.categories)) {
    categoryColorMap = {};
    data.categories.forEach((category, index) => {
      const colorIndex = index % COLOR_PALETTE.length;
      categoryColorMap[category] = COLOR_PALETTE[colorIndex];
    });
    console.log('✅ Couleurs des catégories initialisées');
    return categoryColorMap;
  }
  return null;
}

/**
 * Obtenir les couleurs pour une catégorie
 */
export function getCategoryColors(category) {
  // Si pas encore chargé, utiliser une couleur par défaut basée sur le hash
  if (!categoryColorMap || Object.keys(categoryColorMap).length === 0) {
    const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorIndex = hash % COLOR_PALETTE.length;
    return COLOR_PALETTE[colorIndex];
  }
  
  return categoryColorMap[category] || {
    bg: 'from-gray-400 to-gray-500',
    badge: 'text-white border border-white/30' /* fallback catégorie inconnue */
  };
}
