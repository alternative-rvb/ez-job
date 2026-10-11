/**
 * Module de pixellisation des images (API Canvas 2D)
 *
 * Le canvas reprend les classes de l'image (object-fit compris) et la remplace visuellement :
 * l'image est réduite sur un mini canvas puis ré-étirée sans lissage pour obtenir de gros pixels.
 * Les images externes sans CORS « salissent » le canvas, ce qui n'empêche pas de les dessiner.
 */

// NOTE: largeur max du canvas de rendu, suffisante pour l'affichage
const MAX_CANVAS_WIDTH = 800;

function whenLoaded(img) {
    if (img.complete && img.naturalWidth) return Promise.resolve();
    return new Promise((resolve, reject) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', reject, { once: true });
    });
}

/**
 * Remplace l'image par une version pixellisée de `columns` blocs sur la largeur.
 * En cas d'échec de chargement, l'image d'origine est réaffichée telle quelle.
 */
export async function pixelateImage(img, columns = 10) {
    try {
        await whenLoaded(img);
    } catch {
        img.style.visibility = '';
        return;
    }

    const ratio = Math.min(1, MAX_CANVAS_WIDTH / img.naturalWidth);
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.naturalWidth * ratio);
    canvas.height = Math.round(img.naturalHeight * ratio);
    canvas.className = img.className;
    canvas.style.imageRendering = 'pixelated';
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', img.alt || '');

    const w = Math.max(1, Math.round(columns));
    const h = Math.max(1, Math.round(columns * canvas.height / canvas.width));
    const small = document.createElement('canvas');
    small.width = w;
    small.height = h;
    small.getContext('2d').drawImage(img, 0, 0, w, h);

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(small, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

    img.before(canvas);
    img.style.display = 'none';
}
