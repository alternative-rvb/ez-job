#!/usr/bin/env node

/**
 * Script automatique de mise à jour de version
 * Met à jour package.json, sw.js et version.js automatiquement
 * Usage: npm run update-version
 */

const fs = require('fs');
const path = require('path');

// Chemins des fichiers à mettre à jour
const PACKAGE_JSON = path.join(__dirname, '..', 'package.json');
const SW_JS = path.join(__dirname, '..', 'sw.js');
const VERSION_JS = path.join(__dirname, '..', 'js', 'modules', 'core', 'version.js');

// Lire la version actuelle
const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
const currentVersion = packageJson.version;

console.log('📦 Version actuelle:', currentVersion);

// Incrémenter la version patch
const versionParts = currentVersion.split('.');
versionParts[2] = parseInt(versionParts[2]) + 1;
const newVersion = versionParts.join('.');

console.log('✨ Nouvelle version:', newVersion);

// Mettre à jour package.json
packageJson.version = newVersion;
fs.writeFileSync(PACKAGE_JSON, JSON.stringify(packageJson, null, 2) + '\n');
console.log('✅ package.json mis à jour');

// Mettre à jour sw.js
let swContent = fs.readFileSync(SW_JS, 'utf8');
swContent = swContent.replace(
  /const CACHE_VERSION = 'v[\d.]+';/,
  `const CACHE_VERSION = 'v${newVersion}';`
);
fs.writeFileSync(SW_JS, swContent);
console.log('✅ sw.js mis à jour');

// Mettre à jour version.js
let versionContent = fs.readFileSync(VERSION_JS, 'utf8');
versionContent = versionContent.replace(
  /export const APP_VERSION = '[\d.]+';/,
  `export const APP_VERSION = '${newVersion}';`
);
fs.writeFileSync(VERSION_JS, versionContent);
console.log('✅ version.js mis à jour');

// Créer le fichier .version
fs.writeFileSync(path.join(__dirname, '..', '.version'), newVersion);
console.log('✅ .version créé');

console.log('\n🎉 Mise à jour de version terminée !');
console.log('📝 N\'oubliez pas de commiter ces changements :');
console.log(`   git add package.json sw.js js/modules/core/version.js .version`);
console.log(`   git commit -m "chore: bump version to ${newVersion}"`);
