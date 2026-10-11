#!/usr/bin/env node
// ANCHOR Générateur de traits à largeur variable (stroked-to-filled path conversion)
// Usage : node tapered-path.mjs "<x0,y0 x1,y1 x2,y2 [x3,y3]>" | "<d absolu M/C/Q>" <profil> <largeurMax> [échantillons par segment]
// Profils : fuseau, plume, comete, sablier, calligraphique

export const PROFILES = {
    // NOTE 1. Fuseau (symmetric spindle) : pointes à 0 aux deux bouts, ventre épais au centre
    fuseau: t => Math.sin(Math.PI * t),
    // NOTE 2. Plume / pinceau (taper-out) : départ large et arrondi, effilement continu jusqu'à une pointe d'aiguille
    plume: t => Math.pow(1 - t, 0.9),
    // NOTE 3. Comète (flare wedge) : pointe à 0 au départ, s'évase vers une tête large et arrondie
    comete: t => Math.pow(t, 0.9),
    // NOTE 4. Sablier / diabolo (waisted) : épais aux deux bouts, étranglement très fin au centre (~15 %)
    sablier: t => 0.15 + 0.85 * Math.pow(Math.abs(2 * t - 1), 1.4),
    // NOTE 5. Calligraphique (plume à bec biseauté) : l'épaisseur dépend de la DIRECTION du trait, pas de sa position.
    // Bec tenu à 45° : plein maximal quand le trait est perpendiculaire au bec, délié très fin quand il lui est parallèle.
    calligraphique: (t, angle) => {
        const nib = -Math.PI / 4;
        const body = 0.12 + 0.88 * Math.abs(Math.sin(angle - nib));
        // NOTE Attaque et sortie légèrement affinées pour éviter les bouts coupés net
        return body * Math.min(1, Math.sin(Math.PI * t) * 3);
    }
};

// Point et tangente d'une Bézier quadratique (3 points) ou cubique (4 points)
function bezier(pts, t) {
    const u = 1 - t;
    if (pts.length === 3) {
        const [a, b, c] = pts;
        return {
            x: u * u * a.x + 2 * u * t * b.x + t * t * c.x,
            y: u * u * a.y + 2 * u * t * b.y + t * t * c.y,
            dx: 2 * u * (b.x - a.x) + 2 * t * (c.x - b.x),
            dy: 2 * u * (b.y - a.y) + 2 * t * (c.y - b.y)
        };
    }
    const [a, b, c, d] = pts;
    return {
        x: u ** 3 * a.x + 3 * u * u * t * b.x + 3 * u * t * t * c.x + t ** 3 * d.x,
        y: u ** 3 * a.y + 3 * u * u * t * b.y + 3 * u * t * t * c.y + t ** 3 * d.y,
        dx: 3 * u * u * (b.x - a.x) + 6 * u * t * (c.x - b.x) + 3 * t * t * (d.x - c.x),
        dy: 3 * u * u * (b.y - a.y) + 6 * u * t * (c.y - b.y) + 3 * t * t * (d.y - c.y)
    };
}

const r = n => Math.round(n * 100) / 100;

// NOTE Découpe un attribut d absolu (M, C, Q enchaînés) en segments de Bézier
export function parsePathD(d) {
    const tokens = d.match(/[MCQ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || [];
    const segments = [];
    let cmd = null, cur = null, i = 0;
    const num = () => Number(tokens[i++]);
    while (i < tokens.length) {
        if (/[MCQ]/i.test(tokens[i])) cmd = tokens[i++].toUpperCase();
        if (cmd === 'M') { cur = { x: num(), y: num() }; cmd = 'L?'; continue; }
        if (cmd === 'C') { const b = { x: num(), y: num() }, c = { x: num(), y: num() }, e = { x: num(), y: num() }; segments.push([cur, b, c, e]); cur = e; continue; }
        if (cmd === 'Q') { const b = { x: num(), y: num() }, e = { x: num(), y: num() }; segments.push([cur, b, e]); cur = e; continue; }
        throw new Error('Seules les commandes absolues M, C et Q sont prises en charge');
    }
    if (!segments.length) throw new Error('Aucun segment C ou Q trouvé');
    return segments;
}

// Retourne l'attribut d d'un tracé fermé à remplir (fill), sans stroke
// NOTE Entrée : un segment (3 ou 4 points), une liste de segments, ou une chaîne d (M, C, Q enchaînés)
// NOTE t est paramétré par la longueur d'arc sur l'ensemble du tracé : le profil s'étale sur toute la chaîne
// NOTE Les bouts qui gardent une épaisseur reçoivent un arrondi (équivalent de stroke-linecap="round")
export function taperedPath(input, profile = 'fuseau', maxWidth = 2, samples = 12) {
    const w = typeof profile === 'function' ? profile : PROFILES[profile];
    if (!w) throw new Error(`Profil inconnu : ${profile}`);
    const segments = typeof input === 'string' ? parsePathD(input) : (input[0] && input[0].x !== undefined ? [input] : input);
    // NOTE Échantillonnage fin pour mesurer la longueur d'arc cumulée
    const fine = [];
    segments.forEach(seg => { for (let k = 0; k <= 64; k++) fine.push(bezier(seg, k / 64)); });
    const cum = [0];
    for (let k = 1; k < fine.length; k++) cum.push(cum[k - 1] + Math.hypot(fine[k].x - fine[k - 1].x, fine[k].y - fine[k - 1].y));
    const total = cum[cum.length - 1] || 1;
    const n = samples * segments.length;
    const top = [], bottom = [], ends = [];
    let k = 0;
    for (let i = 0; i <= n; i++) {
        const target = (i / n) * total;
        while (k < cum.length - 2 && cum[k + 1] < target) k++;
        const p = fine[k + (cum[k + 1] - target < target - cum[k] ? 1 : 0)];
        const t = i / n;
        const len = Math.hypot(p.dx, p.dy) || 1;
        // NOTE Décalage selon la normale, demi-largeur de chaque côté de la trajectoire (le profil reçoit t et l'angle de la tangente)
        const nx = -p.dy / len, ny = p.dx / len, h = (maxWidth * Math.max(0, w(t, Math.atan2(p.dy, p.dx)))) / 2;
        top.push([r(p.x + nx * h), r(p.y + ny * h)]);
        bottom.push([r(p.x - nx * h), r(p.y - ny * h)]);
        if (i === 0 || i === n) ends.push({ x: p.x, y: p.y, tx: p.dx / len, ty: p.dy / len, h });
    }
    // NOTE Point de contrôle de l'arrondi : au-delà du bout, dans l'axe de la trajectoire
    const cap = (e, dir, to) => e.h > 0.05
        ? ` Q ${r(e.x + dir * e.tx * e.h * 1.4)},${r(e.y + dir * e.ty * e.h * 1.4)} ${to[0]},${to[1]}`
        : ` L ${to[0]},${to[1]}`;
    const side = arr => arr.map(([x, y]) => `${x},${y}`).join(' L ');
    const back = bottom.slice().reverse();
    return `M ${side(top)}${cap(ends[1], 1, back[0])} L ${side(back.slice(1))}${cap(ends[0], -1, top[0])} Z`;
}

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
