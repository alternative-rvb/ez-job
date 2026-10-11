#!/usr/bin/env node
// ANCHOR Compare deux instantanés d'avatars (avatar-snapshot.mjs) : même structure, écart géométrique maximal toléré
// Usage : node scripts/avatar-compare.mjs <avant.json> <apres.json> [tolerance=0.3]
// NOTE Le texte hors nombres doit être identique. Les nombres sont comparés un à un ; les suites de points L
// (tracés à largeur variable) sont comparées point à point et doivent avoir le même nombre de points.

import { readFileSync } from 'node:fs';

const [fa, fb, tol = '0.3'] = process.argv.slice(2);
const A = JSON.parse(readFileSync(fa, 'utf8'));
const B = JSON.parse(readFileSync(fb, 'utf8'));
const NUM = /-?\d*\.?\d+/g;
// NOTE Les couleurs hexadécimales (#1e1b4b) ne sont pas des nombres
const mask = s => s.replace(/#[0-9a-fA-F]{3,8}\b/g, '#C');
let bad = 0;
let worst = 0;
const compareNums = (x, y) => {
    const nx = mask(x).match(NUM) || []; const ny = mask(y).match(NUM) || [];
    if (nx.length !== ny.length) return Infinity;
    let m = 0;
    nx.forEach((v, i) => { m = Math.max(m, Math.abs(Number(v) - Number(ny[i]))); });
    return m;
};
const skeleton = s => mask(s).replace(NUM, '#').replace(/\s+/g, ' ');
for (const key of Object.keys(A)) {
    const a = A[key]; const b = B[key];
    if (b === undefined) { console.log(`MANQUE ${key}`); bad++; continue; }
    if (a === b) continue;
    // NOTE Suites de points L isolées : on les compare à part, puis on compare le reste du texte
    const runs = /(?:L -?\d*\.?\d+,-?\d*\.?\d+ ?){4,}/g;
    const ra = a.match(runs) || []; const rb = b.match(runs) || [];
    const ta = a.replace(runs, 'L#RUN '); const tb = b.replace(runs, 'L#RUN ');
    if (ra.length !== rb.length || skeleton(ta) !== skeleton(tb)) { console.log(`STRUCTURE ${key}`); bad++; continue; }
    let m = compareNums(ta, tb);
    for (let i = 0; i < ra.length; i++) m = Math.max(m, compareNums(ra[i], rb[i]));
    if (!Number.isFinite(m)) { console.log(`POINTS ${key} : nombre de points différent`); bad++; continue; }
    worst = Math.max(worst, m);
    if (m > Number(tol)) { console.log(`ECART ${key} : ${m.toFixed(3)}`); bad++; }
}
console.log(bad ? `${bad} différences` : `OK : ${Object.keys(A).length} avatars conformes, écart max ${worst.toFixed(3)}`);
process.exit(bad ? 1 : 0);
