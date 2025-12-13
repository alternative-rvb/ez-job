/**
 * Service Worker pour Job-EZ
 * Permet le fonctionnement offline et améliore les performances
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `job-ez-${CACHE_VERSION}`;

// Assets critiques à mettre en cache lors de l'installation
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/js/app.js',
  '/js/modules/core/config.js',
  '/js/modules/core/state.js',
  '/js/modules/core/player.js',
  '/js/modules/core/utils.js',
  '/js/modules/core/version.js',
  '/js/modules/core/category-colors.js',
  '/js/modules/ui/dom.js',
  '/js/modules/managers/quiz-selector.js',
  '/js/modules/managers/question-manager.js',
  '/js/modules/managers/results-manager.js',
  '/js/modules/managers/history-manager.js',
  '/js/modules/managers/trophies-manager.js',
  '/js/modules/managers/rewards-manager.js',
  '/js/data/index.json',
  '/js/data/trophies.json',
  '/images/loose.gif',
  '/images/win.gif',
  '/images/start.gif',
  '/manifest.json'
];

// Pattern d'URLs à mettre en cache dynamiquement
const CACHE_PATTERNS = {
  quiz: /\/js\/data\/.*\.json$/,
  images: /\/images\//,
  cdn: /^https:\/\/(cdn\.tailwindcss\.com|cdn\.jsdelivr\.net)/
};

/**
 * Installation du Service Worker
 * Mise en cache des assets critiques
 */
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installation...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Mise en cache des assets critiques');
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Installation terminée');
        return self.skipWaiting(); // Active immédiatement le nouveau SW
      })
      .catch((error) => {
        console.error('[Service Worker] Erreur installation:', error);
      })
  );
});

/**
 * Activation du Service Worker
 * Nettoyage des anciens caches
 */
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activation...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Supprimer les caches qui ne correspondent pas à la version actuelle
              return cacheName.startsWith('job-ez-') && cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              console.log('[Service Worker] Suppression cache obsolète:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation terminée');
        return self.clients.claim(); // Prend le contrôle de tous les clients
      })
  );
});

/**
 * Interception des requêtes réseau
 * Stratégie : Cache First pour les assets, Network First pour les données
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorer les requêtes Chrome extensions
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // Stratégie de cache selon le type de ressource
  if (shouldCacheRequest(url)) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

/**
 * Détermine si une requête doit être mise en cache
 */
function shouldCacheRequest(url) {
  // Mettre en cache les assets statiques et CDN
  return (
    CACHE_PATTERNS.images.test(url.pathname) ||
    CACHE_PATTERNS.cdn.test(url.href) ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname === '/' ||
    url.pathname === '/index.html'
  );
}

/**
 * Stratégie Cache First
 * Cherche d'abord dans le cache, puis réseau en fallback
 */
async function cacheFirst(request) {
  const cached = await caches.match(request);

  if (cached) {
    console.log('[Service Worker] Cache hit:', request.url);
    return cached;
  }

  try {
    const response = await fetch(request);

    // Mettre en cache si la réponse est valide
    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
      console.log('[Service Worker] Mise en cache:', request.url);
    }

    return response;
  } catch (error) {
    console.error('[Service Worker] Erreur réseau:', request.url, error);

    // Retourner une page offline si disponible
    return caches.match('/offline.html') || new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

/**
 * Stratégie Network First
 * Essaie le réseau d'abord, cache en fallback
 */
async function networkFirst(request) {
  try {
    const response = await fetch(request);

    // Mettre en cache si la réponse est valide et que c'est un quiz JSON
    if (response && response.status === 200 && CACHE_PATTERNS.quiz.test(request.url)) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
      console.log('[Service Worker] Mise en cache (network first):', request.url);
    }

    return response;
  } catch (error) {
    console.log('[Service Worker] Réseau indisponible, recherche dans le cache:', request.url);

    const cached = await caches.match(request);

    if (cached) {
      return cached;
    }

    throw error;
  }
}

/**
 * Messages depuis l'application principale
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.delete(CACHE_NAME).then(() => {
        console.log('[Service Worker] Cache vidé');
      })
    );
  }
});
