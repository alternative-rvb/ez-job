#!/usr/bin/env node
// ANCHOR Générateur de traits à largeur variable (stroked-to-filled path conversion)
// NOTE Le calcul vit dans js/modules/ui/avatar-kit.js (source unique) ; ce script n'en est que la ligne de commande
// Usage : node tapered-path.mjs "<x0,y0 x1,y1 x2,y2 [x3,y3]>" | "<d absolu M/C/Q>" <profil> <largeurMax> [échantillons par segment]
// Profils : fuseau, plume, comete, sablier, calligraphique

import { taperedPath, PROFILES, parsePathD } from '../../../../js/modules/ui/avatar-kit.js';
export { taperedPath, PROFILES, parsePathD };

if (import.meta.url === `file://${process.argv[1]}`) {
    const [, , rawPts, profile = 'fuseau', width = '2', samples = '12'] = process.argv;
    if (!rawPts) {
        console.error('Usage : node tapered-path.mjs "30,38 37,34 44,38" fuseau 2.2 [12]');
        process.exit(1);
    }
    // NOTE Entrée CLI : "x0,y0 x1,y1 x2,y2 [x3,y3]" (un segment) ou un attribut d absolu "M ... C ... C ..."
    let pts;
    if (/[MCQ]/i.test(rawPts)) {
        pts = rawPts;
    } else {
        pts = rawPts.trim().split(/\s+/).map(s => { const [x, y] = s.split(',').map(Number); return { x, y }; });
        if (![3, 4].includes(pts.length) || pts.some(p => Number.isNaN(p.x) || Number.isNaN(p.y))) {
            console.error('Il faut 3 points (Q) ou 4 points (C) au format x,y, ou un attribut d absolu (M, C, Q)');
            process.exit(1);
        }
    }
    try {
        console.log(taperedPath(pts, profile, Number(width), Number(samples)));
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
}
