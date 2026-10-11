#!/usr/bin/env node
// ANCHOR Garde-fou des avatars : détecte les éléments perdus ou cassés par une édition, par rapport au dernier commit (HEAD)
// Usage : node scripts/avatar-check.mjs [--geometrie]     ou     npm run avatars:check
// Contrôles :
//   1. toutes les clés (coupes, tenues, trophées, identifiants courts) et tous les exports présents à HEAD existent encore ;
//   2. aucun avatar ne rend 'undefined', 'NaN' ou '[object' dans son SVG ;
//   3. tous les identifiants de groupe (id="...") rendus à HEAD sont toujours rendus ;
//   4. avec --geometrie : écart géométrique maximal par rapport à HEAD (informatif, les retouches voulues en provoquent).
// NOTE Code de sortie 1 en cas d'élément perdu ou de rendu cassé.

import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
globalThis.window = globalThis;
globalThis.document = { addEventListener() {}, querySelector: () => null, getElementById: () => null };

const root = new URL('..', import.meta.url).pathname;
// NOTE HEAD est extrait dans un dossier temporaire : js/ complet, pour que les imports relatifs fonctionnent
const tmp = mkdtempSync(join(tmpdir(), 'avatar-head-'));
execFileSync('sh', ['-c', `git -C "${root}" archive HEAD js | tar -x -C "${tmp}"`]);
const stamp = Date.now();
const load = async (dir) => import(`${pathToFileURL(join(dir, 'js/modules/ui/avatars.js')).href}?v=${stamp}`);
const H = await load(tmp);
const N = await load(root);

let errors = 0;
const fail = (msg) => { console.log(`ERREUR ${msg}`); errors++; };

// SECTION 1 : clés et exports
const keySets = ['BOY_STYLES', 'GIRL_STYLES', 'BOY_OUTFITS', 'GIRL_OUTFITS', 'RPG_STYLES', 'RPG_OUTFITS', 'AVATAR_SHORT_IDS'];
for (const name of keySets) {
    for (const k of Object.keys(H[name] || {})) if (!(k in (N[name] || {}))) fail(`${name}[${k}] présent à HEAD, absent maintenant`);
}
const ids = a => (a.RPG_TROPHIES || []).map(t => t.id);
for (const id of ids(H)) if (!ids(N).includes(id)) fail(`trophée ${id} présent à HEAD, absent maintenant`);
for (const name of Object.keys(H)) if (!(name in N)) fail(`export ${name} présent à HEAD, absent maintenant`);

// SECTION 2 et 3 : rendu de tous les avatars
function configs(a) {
    const out = [];
    for (const type of ['boy', 'girl']) {
        const styles = type === 'boy' ? a.BOY_STYLES : a.GIRL_STYLES;
        const outfits = type === 'boy' ? a.BOY_OUTFITS : a.GIRL_OUTFITS;
        for (const styleId of Object.keys(styles)) for (const outfitId of Object.keys(outfits)) out.push([`base|${type}|s${styleId}|o${outfitId}`, { type, styleId: +styleId, outfitId: +outfitId }]);
        for (const styleKey of Object.keys(a.RPG_STYLES)) for (const outfitKey of Object.keys(a.RPG_OUTFITS)) out.push([`rpg|${type}|${styleKey}|${outfitKey}`, { type, styleKey, outfitKey, hairColor: '#c2410c' }]);
    }
    for (const t of a.RPG_TROPHIES) for (const [type, p] of [['boy', t.boyPreset], ['girl', t.girlPreset]]) out.push([`trophee|${t.id}|${type}`, { type, ...p }]);
    return out;
}
const render = (a) => {
    const res = {};
    for (const [key, cfg] of configs(a)) for (const mode of ['full', 'head']) res[`${key}|${mode}`] = a.buildCustomAvatarSvg({ ...cfg, mode });
    return res;
};
const rh = render(H);
const rn = render(N);
const idSet = svgs => new Set(Object.values(svgs).flatMap(s => s.match(/ id="[^"]+"/g) || []));
for (const [key, svg] of Object.entries(rn)) {
    if (!svg.includes('<svg')) fail(`${key} : pas de SVG`);
    const bad = svg.match(/undefined|NaN|\[object/);
    if (bad) fail(`${key} : rendu contient « ${bad[0]} »`);
}
const idsNow = idSet(rn);
for (const id of idSet(rh)) if (!idsNow.has(id)) fail(`identifiant${id} rendu à HEAD, absent maintenant`);

// SECTION 4 : écart géométrique (informatif)
if (process.argv.includes('--geometrie')) {
    const NUM = /-?\d*\.?\d+/g;
    const mask = s => s.replace(/#[0-9a-fA-F]{3,8}\b/g, '#C');
    let changed = 0;
    for (const key of Object.keys(rh)) {
        if (rh[key] === rn[key]) continue;
        const a = mask(rh[key]).match(NUM) || []; const b = mask(rn[key]).match(NUM) || [];
        if (a.length !== b.length) { changed++; continue; }
        if (a.some((v, i) => Math.abs(v - b[i]) > 0.3)) changed++;
    }
    console.log(`${changed} avatars sur ${Object.keys(rh).length} diffèrent de HEAD (écart supérieur à 0.3 ou structure changée)`);
}

console.log(errors ? `${errors} problème(s)` : `OK : ${Object.keys(rn).length} rendus, aucun élément perdu par rapport à HEAD`);
process.exit(errors ? 1 : 0);
