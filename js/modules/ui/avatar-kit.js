/**
 * Boîte à outils de dessin des avatars SVG : traits à largeur variable, volumes, symétrie, mains, bandes
 * Module ES6 sans dépendance et sans DOM : tourne dans le navigateur comme dans Node (scripts/, skill avatars-svg).
 * Les tracés se calculent au rendu depuis leur ligne centrale (et sont mis en cache).
 */

// ANCHOR Constante partagée : carnation par défaut des tenues (remplace les copies de la signature)
export const SKIN_DEFAULT = { base: '#ffd4a3', shadow: '#f0be8d' };

// SECTION Traits à largeur variable (source unique, le script du skill avatars-svg la réexporte)
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

// NOTE Cache des tracés : l'atelier avatar affiche des dizaines de miniatures avec les mêmes traits
const traceCache = new Map();
const cached = (key, make) => {
    if (!traceCache.has(key)) traceCache.set(key, make());
    return traceCache.get(key);
};
const trace = (profile) => (d, width = 2, samples = 12) =>
    cached(`${profile}|${d}|${width}|${samples}`, () => taperedPath(d, profile, width, samples));

// ANCHOR Raccourcis par profil : un tracé fermé à remplir (fill), jamais de stroke
export const fuseau = trace('fuseau');
export const plume = trace('plume');
export const comete = trace('comete');
export const sablier = trace('sablier');
export const calligraphique = trace('calligraphique');

// SECTION Symétrie

// ANCHOR Miroir d'un attribut d : x devient (axe - x). axe = 100 dans le repère de l'avatar, 0 dans le repère local d'un groupe
export function mirror(d, axe = 100) {
    return d.replace(/(-?\d*\.?\d+),(-?\d*\.?\d+)/g, (m, x, y) => `${Math.round((axe - Number(x)) * 100) / 100},${y}`);
}

// SECTION Anneau ouvert (boucle d'oreille, maillon)

const r3 = n => Math.round(n * 1000) / 1000;

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
    let d = `M ${r3(P[1][0])},${r3(P[1][1])}`;
    for (let i = 1; i <= segments; i++) {
        const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += ` C ${r3(c1[0])},${r3(c1[1])} ${r3(c2[0])},${r3(c2[1])} ${r3(p2[0])},${r3(p2[1])}`;
    }
    return d;
}

export function openRing(cx, cy, rx, ry, gapPercent = 20, gapAngleDeg = -90, width = 1.3, samples = 6) {
    return fuseau(openRingCenterline(cx, cy, rx, ry, gapPercent, gapAngleDeg), width, samples);
}

// SECTION Volumes : croissants d'ombre et reflets de bord (arbre d'invocation, coupes, ornements)

const pol = (cx, cy, rad, deg) => {
    const a = (deg * Math.PI) / 180;
    return [r3(cx + rad * Math.cos(a)), r3(cy + rad * Math.sin(a))];
};

// ANCHOR Croissant d'ombre ou de lumière : arc sur le cercle de rayon r de a0 à a1 (degrés), retour par un arc de rayon k * r
export function crescent(cx, cy, rad, a0, a1, k = 1.35) {
    const p0 = pol(cx, cy, rad, a0); const p1 = pol(cx, cy, rad, a1);
    return `M ${p0[0]},${p0[1]} A ${rad} ${rad} 0 0 1 ${p1[0]},${p1[1]} A ${r3(k * rad)} ${r3(k * rad)} 0 0 0 ${p0[0]},${p0[1]} Z`;
}

// ANCHOR Reflet fin en fuseau qui suit le bord d'un cercle, en retrait (1.4 à 1.8) pour rester dans la forme
export function rimHighlight(cx, cy, rad, a0, a1, retrait = 1.6, largeur = 1.1) {
    const rr = rad - retrait;
    const mid = (a0 + a1) / 2;
    const p0 = pol(cx, cy, rr, a0); const p1 = pol(cx, cy, rr, a1);
    // NOTE Contrôles de la cubique qui approche l'arc (tangentes aux extrémités)
    const span = ((a1 - a0) * Math.PI) / 180;
    const kk = (4 / 3) * Math.tan(span / 4) * rr;
    const t0 = [-Math.sin((a0 * Math.PI) / 180), Math.cos((a0 * Math.PI) / 180)];
    const t1 = [-Math.sin((a1 * Math.PI) / 180), Math.cos((a1 * Math.PI) / 180)];
    const d = `M ${p0[0]},${p0[1]} C ${r3(p0[0] + t0[0] * kk)},${r3(p0[1] + t0[1] * kk)} ${r3(p1[0] - t1[0] * kk)},${r3(p1[1] - t1[1] * kk)} ${p1[0]},${p1[1]}`;
    void mid;
    return fuseau(d, largeur, 10);
}

// SECTION Mains et bandes

// ANCHOR Main qui serre une poignée, à l'origine du groupe de l'arme : ellipse rx 3.2 ry 3.3 et deux séparations de doigts en fuseau
export function gripHand(skin = SKIN_DEFAULT) {
    return `<ellipse cx="0" cy="0" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>
                    <path d="${fuseau('M -1.6,-1 C -0.73,-1 0.13,-1 1,-1', 0.65, 8)} ${fuseau('M -1.6,1 C -0.73,1 0.13,1 1,1', 0.65, 8)}" fill="${skin.shadow}"/>`;
}

const bezierPoint = (p, t) => {
    const u = 1 - t;
    return p.length === 4
        ? [u ** 3 * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t ** 3 * p[3][0],
            u ** 3 * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t ** 3 * p[3][1]]
        : [u * u * p[0][0] + 2 * u * t * p[1][0] + t * t * p[2][0], u * u * p[0][1] + 2 * u * t * p[1][1] + t * t * p[2][1]];
};

// ANCHOR Bande qui épouse un membre : échantillonne le bord extérieur (t0 à t1) et le bord intérieur (u0 à u1),
// relie les points en polygone fermé et le gonfle de `gonfle` (0.35 par défaut). Courbes = 3 ou 4 points [x, y].
export function fitBand(courbeExt, courbeInt, t0, t1, u0, u1, gonfle = 0.35, pas = 8) {
    const ext = []; const int = [];
    for (let i = 0; i <= pas; i++) {
        ext.push(bezierPoint(courbeExt, t0 + ((t1 - t0) * i) / pas));
        int.push(bezierPoint(courbeInt, u0 + ((u1 - u0) * i) / pas));
    }
    const poly = [...ext, ...int.reverse()];
    const cx = poly.reduce((s, p) => s + p[0], 0) / poly.length;
    const cy = poly.reduce((s, p) => s + p[1], 0) / poly.length;
    const grown = poly.map(([x, y]) => {
        const dx = x - cx; const dy = y - cy; const l = Math.hypot(dx, dy) || 1;
        return [r3(x + (dx / l) * gonfle), r3(y + (dy / l) * gonfle)];
    });
    return `M ${grown.map(p => p.join(',')).join(' L ')} Z`;
}

// ANCHOR Ceinture fuseau ajustée à la taille : de xl à xr à la hauteur cy, creux de 2.4, largeur 1.35 * hauteur
export function beltOnWaist(xl, xr, cy, hauteur) {
    return fuseau(`M ${xl},${cy} Q 50,${r3(cy + 2.4)} ${xr},${cy}`, r3(1.35 * hauteur), 14);
}

// ANCHOR Décalage vertical de la courbe de ceinture à l'abscisse x (pour recentrer boucles et sacoches) : 4.8 t (1 - t)
export const beltDyAt = (x, xl, xr) => {
    const t = (x - xl) / (xr - xl);
    return r3(4.8 * t * (1 - t));
};
