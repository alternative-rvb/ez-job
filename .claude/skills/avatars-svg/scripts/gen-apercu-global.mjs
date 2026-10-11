// ANCHOR Régénère l'aperçu global du guide utilisateur (.doc/guide-effets-traits-svg-apercu.svg)
import { taperedPath } from './tapered-path.mjs';
import { writeFileSync } from 'node:fs';
// NOTE Trajectoire cursive à 4 boucles (une Bézier cubique par boucle, points de contrôle croisés)
let d = 'M 30,78', x = 30;
for (let i = 0; i < 4; i++) { d += ` C ${x + 150},-40 ${x - 65},-40 ${x + 85},78`; x += 85; }
const rows = [['1. Fuseau', 'fuseau', '#38bdf8'], ['2. Plume / pinceau', 'plume', '#c084fc'], ['3. Comète', 'comete', '#34d399'], ['4. Sablier / diabolo', 'sablier', '#fb7185'], ['5. Calligraphique (plume à bec)', 'calligraphique', '#fbbf24']];
const body = rows.map(([label, prof, color], i) => `
  <!-- ANCHOR Profil ${i + 1} : ${prof} sur une trajectoire à 4 boucles -->
  <text x="20" y="${i * 135 + 22}" font-size="15" font-weight="700" fill="#f8fafc">${label}</text>
  <path d="${taperedPath(d, prof, 10, 48)}" fill="${color}" transform="translate(0,${i * 135 + 48})"/>`).join('');
writeFileSync(new URL('../../../../.doc/guide-effets-traits-svg-apercu.svg', import.meta.url), `<svg viewBox="0 0 400 680" width="400" height="680" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="400" height="680" fill="#1e293b"/>${body}
</svg>
`);
