#!/usr/bin/env node
// Anneau ouvert en fuseau (boucle d'oreille, anneau de nez, maillon, bracelet vu de face).
// Usage : node open-ring.mjs <cx> <cy> <rx> <ry> [ouverture %] [angle ouverture °] [largeur] [échantillons]
//   ouverture %       : part du tour laissée vide (défaut 20, soit un anneau à 80 %)
//   angle ouverture ° : direction du centre de l'ouverture, 0 = droite, -90 = haut (défaut -90)
//   largeur           : épaisseur maximale du fuseau, atteinte à l'opposé de l'ouverture (défaut 1.3)
// Exemple : anneau d'oreille orc gauche
//   node open-ring.mjs 15.8 34 1.6 2 20 -90 1.3
// NOTE Le calcul vit dans js/modules/ui/avatar-kit.js (source unique) ; ce script n'en est que la ligne de commande
import { openRing, openRingCenterline } from '../../../../js/modules/ui/avatar-kit.js';
export { openRing, openRingCenterline };

if (import.meta.url === `file://${process.argv[1]}`) {
    const [cx, cy, rx, ry, gap, angle, width, samples] = process.argv.slice(2).map(Number);
    if ([cx, cy, rx, ry].some(v => !Number.isFinite(v))) {
        console.error('Usage : node open-ring.mjs <cx> <cy> <rx> <ry> [ouverture %] [angle ouverture °] [largeur] [échantillons]');
        process.exit(1);
    }
    console.log(openRing(cx, cy, rx, ry, gap || 20, Number.isNaN(angle) ? -90 : angle, width || 1.3, samples || 6));
}
