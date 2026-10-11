#!/usr/bin/env node
// ANCHOR Instantané de tous les avatars : écrit un JSON {clé: chaîne SVG} pour comparer avant/après une refonte du code
// Usage : node scripts/avatar-snapshot.mjs <sortie.json>
// NOTE La comparaison se fait avec scripts/avatar-compare.mjs (écart numérique maximal entre deux instantanés)

import { writeFileSync } from 'node:fs';

globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
globalThis.window = globalThis;
globalThis.document = { addEventListener() {}, querySelector: () => null, getElementById: () => null };

const a = await import(new URL(`../js/modules/ui/avatars.js?v=${Date.now()}`, import.meta.url));
const out = {};
const modes = ['full', 'head'];

// SECTION Tenues et coupes de base, garçon et fille
for (const type of ['boy', 'girl']) {
    const styles = type === 'boy' ? a.BOY_STYLES : a.GIRL_STYLES;
    const outfits = type === 'boy' ? a.BOY_OUTFITS : a.GIRL_OUTFITS;
    for (const styleId of Object.keys(styles)) {
        for (const outfitId of Object.keys(outfits)) {
            for (const mode of modes) {
                out[`base|${type}|s${styleId}|o${outfitId}|${mode}`] = a.buildCustomAvatarSvg({ type, styleId: Number(styleId), outfitId: Number(outfitId), mode });
            }
        }
    }
}

// SECTION Coupes et tenues RPG croisées, espèces comprises
for (const type of ['boy', 'girl']) {
    for (const styleKey of Object.keys(a.RPG_STYLES)) {
        for (const outfitKey of Object.keys(a.RPG_OUTFITS)) {
            for (const mode of modes) {
                out[`rpg|${type}|${styleKey}|${outfitKey}|${mode}`] = a.buildCustomAvatarSvg({ type, styleKey, outfitKey, mode, hairColor: '#c2410c', skinColor: 'light' });
            }
        }
    }
    for (const species of ['human', 'elf', 'orc', 'cat', 'shadow']) {
        for (const mode of modes) {
            out[`espece|${type}|${species}|${mode}`] = a.buildCustomAvatarSvg({ type, species, mode, hairColor: '#7c3aed' });
        }
    }
}

// SECTION Presets de trophées
for (const t of a.RPG_TROPHIES) {
    for (const [type, p] of [['boy', t.boyPreset], ['girl', t.girlPreset]]) {
        for (const mode of modes) {
            out[`trophee|${t.id}|${type}|${mode}`] = a.buildCustomAvatarSvg({ type, styleKey: p.styleKey, outfitKey: p.outfitKey, species: p.species, skinColor: p.skinColor, hairColor: p.hairColor, eyeColor: p.eyeColor, mode });
        }
    }
}

writeFileSync(process.argv[2] || '/tmp/avatar-snapshot.json', JSON.stringify(out));
console.log(`${Object.keys(out).length} avatars, ${Object.values(out).reduce((n, s) => n + s.length, 0)} caractères`);
