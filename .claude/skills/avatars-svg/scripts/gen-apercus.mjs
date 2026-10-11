// ANCHOR Régénère les exemples par effet du guide utilisateur (.doc/guide-effets-traits-svg/<profil>.svg)
// NOTE Chaque exemple est un trait continu unique : vague, boucles, spirale
import { taperedPath } from './tapered-path.mjs';
import { writeFileSync } from 'node:fs';

// NOTE Convertit une suite de points en chaîne de Bézier cubiques lisses (Catmull-Rom)
function smooth(points) {
    let d = `M ${points[0][0]},${points[0][1]}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] || points[i], p1 = points[i], p2 = points[i + 1], p3 = points[i + 2] || p2;
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += ` C ${c1.map(v => v.toFixed(2))} ${c2.map(v => v.toFixed(2))} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
    }
    return d;
}

const vague = (() => { const pts = []; for (let i = 0; i <= 36; i++) { const x = 15 + i * 170 / 36; pts.push([x, 60 + 32 * Math.sin(i / 36 * Math.PI * 5)]); } return smooth(pts); })();
const boucles = (() => { let d = 'M 15,95', x = 15; for (let i = 0; i < 3; i++) { d += ` C ${x + 120},-25 ${x - 63},-25 ${x + 57},95`; x += 57; } return d; })();
const spirale = (() => { const pts = []; for (let i = 0; i <= 48; i++) { const a = i / 48 * Math.PI * 5; const r = 6 + 9 * a / Math.PI; pts.push([100 + r * Math.cos(a), 58 + r * Math.sin(a)]); } return smooth(pts); })();

const traj = [['Vague', vague, 9], ['Boucles', boucles, 9], ['Spirale', spirale, 10]];
const colors = { fuseau: '#38bdf8', plume: '#c084fc', comete: '#34d399', sablier: '#fb7185', calligraphique: '#fbbf24' };
const out = new URL('../../../../.doc/guide-effets-traits-svg/', import.meta.url);
for (const [name, color] of Object.entries(colors)) {
    const cells = traj.map(([label, d, width], i) => `
  <g transform="translate(${i * 200},0)">
    <text x="100" y="138" text-anchor="middle" font-size="13" fill="#cbd5e1">${label}</text>
    <path d="${taperedPath(d, name, width, i === 0 ? 10 : (i === 1 ? 60 : 8))}" fill="${color}"/>
  </g>`).join('');
    writeFileSync(new URL(`${name}.svg`, out), `<svg viewBox="0 -15 600 165" width="600" height="165" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect y="-15" width="600" height="165" fill="#1e293b"/>${cells}
</svg>
`);
}
console.log('ok');
