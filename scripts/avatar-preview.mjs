#!/usr/bin/env node
// ANCHOR Aperçu des avatars en une commande : planche PNG fille et garçon, corps et portrait, teintes, zoom
// Usage : node scripts/avatar-preview.mjs <id|base> [--zoom visage|mains|ceinture|queue|x,y,l,h] [--teintes]
//                                          [--style n] [--outfit n] [--sortie fichier.png] [--svg]
//                                          [--un garcon|fille[:corps|portrait]] [--taille px]
//   id     : elf, orc, paladin, cat, shadow (preset du trophée, garçon et fille)
//   base   : personnages de base (coupe --style, tenue --outfit, 1 par défaut)
//   --zoom : recadre la planche sur une zone, en gros plan, corps entier uniquement
//   --teintes : ajoute une ligne de variantes (cheveux brun, blond, roux, noir, peau foncée)
//   --un   : un seul personnage et un seul plan (image 4 fois plus légère à lire), ex. --un fille:portrait
//   --taille : largeur en pixels d'un personnage (défaut 260 ; 160 suffit pour un contrôle rapide)
//   --svg  : écrit aussi le SVG de la planche à côté du PNG
// Prérequis : rsvg-convert. Écrit par défaut dans le dossier temporaire du système et affiche le chemin.

import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// NOTE Bouchons minimaux : le module importe player.js qui lit localStorage au chargement
globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
globalThis.window = globalThis;
globalThis.document = { addEventListener() {}, querySelector: () => null, getElementById: () => null };

const avatars = await import(new URL(`../js/modules/ui/avatars.js?v=${Date.now()}`, import.meta.url));
const { buildCustomAvatarSvg, RPG_TROPHIES, ALL_SKIN_COLORS, MANNEQUIN_BOY, MANNEQUIN_GIRL } = avatars;

// SECTION Arguments
const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name, def = null) => {
    const i = args.indexOf(`--${name}`);
    return i >= 0 && args[i + 1] ? args[i + 1] : def;
};
const WITH_VALUE = ['--zoom', '--style', '--outfit', '--sortie', '--un', '--taille'];
const target = args.find((a, i) => !a.startsWith('--') && !WITH_VALUE.includes(args[i - 1]));
if (!target) {
    console.error('Usage : node scripts/avatar-preview.mjs <elf|orc|paladin|cat|shadow|vampire|necromancer|fairy|scholar|pirate|dragon|astronaut|frost|mannequin|base> [--zoom zone] [--teintes] [--style n] [--outfit n] [--sortie f.png] [--svg]');
    process.exit(1);
}

// NOTE Zones de zoom nommées (x, y, largeur, hauteur) dans le repère de l'avatar complet (0 -34 100 156)
const ZONES = {
    visage: [14, -8, 72, 72],
    mains: [8, 52, 84, 50],
    ceinture: [22, 66, 56, 40],
    queue: [48, 48, 52, 56],
    tete: [0, -34, 100, 102]
};
const zoomArg = option('zoom');
const zone = zoomArg ? (ZONES[zoomArg] || zoomArg.split(',').map(Number)) : null;
if (zone && (zone.length !== 4 || zone.some(Number.isNaN))) {
    console.error(`Zone de zoom inconnue : ${zoomArg} (visage, mains, ceinture, queue, tete ou x,y,l,h)`);
    process.exit(1);
}

// SECTION Configurations des deux personnages
function configs(extra = {}) {
    if (target === 'base') {
        const styleId = Number(option('style', 1));
        const outfitId = Number(option('outfit', 1));
        return ['boy', 'girl'].map(type => ({ type, styleId, outfitId, hairColor: null, eyeColor: null, skinColor: 'light', ...extra }));
    }
    if (target === 'mannequin') return [MANNEQUIN_BOY, MANNEQUIN_GIRL].map(p => ({ ...p, ...extra }));
    const trophy = RPG_TROPHIES.find(t => t.id === target || t.shortId === target);
    if (!trophy) {
        console.error(`Trophée inconnu : ${target} (${RPG_TROPHIES.map(t => t.id).join(', ')}, base)`);
        process.exit(1);
    }
    return [['boy', trophy.boyPreset], ['girl', trophy.girlPreset]].map(([type, p]) => ({
        type, styleKey: p.styleKey, outfitKey: p.outfitKey,
        styleId: p.styleId || 1, outfitId: p.outfitId || 1,
        species: p.species,
        skinColor: p.skinColor, hairColor: p.hairColor, eyeColor: p.eyeColor, ...extra
    }));
}

// NOTE Un avatar posé dans une cellule : le SVG imbriqué garde son propre viewBox
const cell = (cfg, mode, x, y, w, h, view) => {
    let svg = buildCustomAvatarSvg({ ...cfg, mode });
    svg = svg.replace(/<svg[^>]*>/, `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${view || (mode === 'head' ? '0 -34 100 102' : '0 -34 100 156')}">`);
    return svg;
};
const label = (text, x, y) => `<text x="${x}" y="${y}" font-family="sans-serif" font-size="13" fill="#57534e">${text}</text>`;

// SECTION Composition de la planche
const BG = '#f4eadd';
const parts = [];
let W; let H;

const unArg = option('un');
const taille = Number(option('taille', 260));
if (unArg) {
    // NOTE Un seul personnage, un seul plan : image minimale
    const [who, plan = 'corps'] = unArg.split(':');
    const type = /^(g|b)/i.test(who) && !/^f/i.test(who) ? 'boy' : 'girl';
    const mode = /^(p|h|t)/i.test(plan) ? 'head' : 'full';
    const cfg = configs().find(c => c.type === type);
    W = taille + 20; H = Math.round(taille * (mode === 'head' ? 102 : 156) / 100) + 20;
    parts.push(cell(cfg, mode, 10, 10, taille, H - 20));
} else if (zone) {
    // NOTE Zoom : filles et garçons côte à côte, même recadrage, à grande taille
    const [zx, zy, zw, zh] = zone;
    const cw = Math.max(240, taille * 2); const ch = Math.round(cw * zh / zw);
    W = cw * 2 + 30; H = ch + 20 + 24;
    configs().forEach((cfg, i) => {
        parts.push(cell(cfg, 'full', 10 + i * (cw + 10), 24, cw, ch, `${zx} ${zy} ${zw} ${zh}`));
        parts.push(label(cfg.type === 'boy' ? 'garçon' : 'fille', 14 + i * (cw + 10), 16));
    });
} else {
    // NOTE Ligne principale : garçon et fille, corps entier puis portrait
    const fw = taille; const fh = Math.round(fw * 156 / 100);
    const pw = taille; const ph = Math.round(pw * 102 / 100);
    const rowsExtra = flag('teintes') ? 1 : 0;
    const mw = 130; const mh = Math.round(mw * 156 / 100);
    W = fw * 2 + pw * 2 + 50; H = fh + 40 + rowsExtra * (mh + 34);
    const [boy, girl] = configs();
    let x = 10;
    for (const [cfg, mode, w, h] of [[boy, 'full', fw, fh], [girl, 'full', fw, fh], [boy, 'head', pw, ph], [girl, 'head', pw, ph]]) {
        parts.push(cell(cfg, mode, x, 26, w, h));
        parts.push(label(`${cfg.type === 'boy' ? 'garçon' : 'fille'} ${mode === 'head' ? 'portrait' : 'corps'}`, x + 4, 18));
        x += w + 10;
    }
    if (rowsExtra) {
        // NOTE Teintes : mêmes personnages, quatre couleurs de cheveux classiques et une peau foncée
        const hairs = ['#5a2d0c', '#d99a38', '#8a3c08', '#1c1917'];
        const dark = ALL_SKIN_COLORS.find(s => s.id === 'dark');
        const variants = [...hairs.map(h => ({ hairColor: h })), { skinColor: dark.id, hairColor: hairs[1] }];
        const y0 = fh + 52;
        [boy, girl].forEach((base, r) => variants.forEach((v, i) => {
            const cx = 10 + i * (mw + 8) + r * (variants.length * (mw + 8) + 16);
            parts.push(cell({ ...base, ...v }, 'full', cx, y0, mw, mh));
        }));
        W = Math.max(W, 10 + 2 * (variants.length * (mw + 8)) + 16);
        parts.push(label('teintes : cheveux brun, blond, roux, noir, peau foncée (garçon puis fille)', 10, y0 - 6));
    }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${BG}"/>
${parts.join('\n')}
</svg>`;

// SECTION Sortie
const base = option('sortie') || join(tmpdir(), `avatar-preview-${target}${zoomArg ? '-' + zoomArg.replace(/,/g, '_') : ''}${unArg ? '-' + unArg.replace(/:/g, '_') : ''}${flag('teintes') ? '-teintes' : ''}.png`);
const svgPath = base.replace(/\.png$/i, '.svg');
writeFileSync(svgPath, svg);
execFileSync('rsvg-convert', [svgPath, '-o', base]);
console.log(base);
if (!flag('svg')) {
    try { execFileSync('rm', [svgPath]); } catch { /* NOTE tolérance : fichier temporaire */ }
}
