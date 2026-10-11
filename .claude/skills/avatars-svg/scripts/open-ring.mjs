#!/usr/bin/env node
// Anneau ouvert en fuseau (boucle d'oreille, anneau de nez, maillon, bracelet vu de face).
// Usage : node open-ring.mjs <cx> <cy> <rx> <ry> [ouverture %] [angle ouverture °] [largeur] [échantillons]
//   ouverture %       : part du tour laissée vide (défaut 20, soit un anneau à 80 %)
//   angle ouverture ° : direction du centre de l'ouverture, 0 = droite, -90 = haut (défaut -90)
//   largeur           : épaisseur maximale du fuseau, atteinte à l'opposé de l'ouverture (défaut 1.3)
// Exemple : anneau d'oreille orc gauche
//   node open-ring.mjs 15.8 34 1.6 2 20 -90 1.3
import { taperedPath } from './tapered-path.mjs';

const r = n => Math.round(n * 1000) / 1000;

// ANCHOR Arc d'ellipse converti en cubiques Catmull-Rom (le générateur ne lit pas la commande A)
export function openRingCenterline(cx, cy, rx, ry, gapPercent = 20, gapAngleDeg = -90, segments = 8) {
    const gap = (gapPercent / 100) * 2 * Math.PI;
    const a0 = (gapAngleDeg * Math.PI) / 180 + gap / 2;
    const a1 = a0 + 2 * Math.PI - gap;
    const pt = i => {
        const a = a0 + ((a1 - a0) * i) / segments;
        return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
    };
    const P = Array.from({ length: segments + 3 }, (_, i) => pt(i - 1));
    let d = `M ${r(P[1][0])},${r(P[1][1])}`;
    for (let i = 1; i <= segments; i++) {
        const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += ` C ${r(c1[0])},${r(c1[1])} ${r(c2[0])},${r(c2[1])} ${r(p2[0])},${r(p2[1])}`;
    }
    return d;
}

export function openRing(cx, cy, rx, ry, gapPercent = 20, gapAngleDeg = -90, width = 1.3, samples = 6) {
    return taperedPath(openRingCenterline(cx, cy, rx, ry, gapPercent, gapAngleDeg), 'fuseau', width, samples);
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const [cx, cy, rx, ry, gap, angle, width, samples] = process.argv.slice(2).map(Number);
    if ([cx, cy, rx, ry].some(v => !Number.isFinite(v))) {
        console.error('Usage : node open-ring.mjs <cx> <cy> <rx> <ry> [ouverture %] [angle ouverture °] [largeur] [échantillons]');
        process.exit(1);
    }
    console.log(openRing(cx, cy, rx, ry, gap || 20, Number.isNaN(angle) ? -90 : angle, width || 1.3, samples || 6));
}
