#!/usr/bin/env node

/**
 * Script automatique de mise à jour de version pour CamiLudik
 * Met à jour package.json, sw.js, version.js, index.html et changelog.html
 * Usage: npm run update-version [optionalVersion] [optionalNote]
 */

const fs = require('fs');
const path = require('path');

// Chemins des fichiers à mettre à jour
const ROOT_DIR = path.join(__dirname, '..');
const PACKAGE_JSON = path.join(ROOT_DIR, 'package.json');
const SW_JS = path.join(ROOT_DIR, 'sw.js');
const VERSION_JS = path.join(ROOT_DIR, 'js', 'modules', 'core', 'version.js');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const CHANGELOG_HTML = path.join(ROOT_DIR, 'changelog.html');
const VERSION_FILE = path.join(ROOT_DIR, '.version');

// Lire la version actuelle
const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
const currentVersion = packageJson.version;

console.log('[PKG] Version actuelle:', currentVersion);

// Déterminer la nouvelle version (argument ou patch automatique)
const args = process.argv.slice(2);
let newVersion = '';
let releaseNote = '';

if (args.length > 0 && /^\d+\.\d+\.\d+$/.test(args[0])) {
  newVersion = args[0];
  releaseNote = args.slice(1).join(' ').trim();
} else {
  const versionParts = currentVersion.split('.');
  versionParts[2] = parseInt(versionParts[2], 10) + 1;
  newVersion = versionParts.join('.');
  releaseNote = args.join(' ').trim();
}

console.log('[VERSION] Nouvelle version:', newVersion);

// 1. Mettre à jour package.json
packageJson.version = newVersion;
fs.writeFileSync(PACKAGE_JSON, JSON.stringify(packageJson, null, 2) + '\n');
console.log('[OK] package.json mis à jour');

// 2. Mettre à jour sw.js
if (fs.existsSync(SW_JS)) {
  let swContent = fs.readFileSync(SW_JS, 'utf8');
  swContent = swContent.replace(
    /const CACHE_VERSION = 'v[\d.]+';/,
    `const CACHE_VERSION = 'v${newVersion}';`
  );
  // S'assurer que /changelog.html est dans les assets critiques
  if (!swContent.includes("'/changelog.html'")) {
    swContent = swContent.replace(
      "'/index.html',",
      "'/index.html',\n  '/changelog.html',"
    );
  }
  fs.writeFileSync(SW_JS, swContent);
  console.log('[OK] sw.js mis à jour');
}

// 3. Mettre à jour version.js
if (fs.existsSync(VERSION_JS)) {
  let versionContent = fs.readFileSync(VERSION_JS, 'utf8');
  versionContent = versionContent.replace(
    /export const APP_VERSION = '[\d.]+';/,
    `export const APP_VERSION = '${newVersion}';`
  );
  fs.writeFileSync(VERSION_JS, versionContent);
  console.log('[OK] version.js mis à jour');
}

// 4. Mettre à jour .version
fs.writeFileSync(VERSION_FILE, newVersion);
console.log('[OK] .version créé');

// 5. Mettre à jour index.html (footer)
if (fs.existsSync(INDEX_HTML)) {
  let indexContent = fs.readFileSync(INDEX_HTML, 'utf8');
  if (indexContent.includes('id="footer-version-text"')) {
    indexContent = indexContent.replace(
      /(<span\s+id="footer-version-text">)v[\d.]+(<\/span>)/,
      `$1v${newVersion}$2`
    );
    fs.writeFileSync(INDEX_HTML, indexContent);
    console.log('[OK] index.html mis à jour (numéro de version dans le footer)');
  } else {
    console.log('[INFO] index.html : balise #footer-version-text non trouvée');
  }
}

// 6. Mettre à jour changelog.html
if (fs.existsSync(CHANGELOG_HTML)) {
  let changelogContent = fs.readFileSync(CHANGELOG_HTML, 'utf8');

  // Vérifier si la version est déjà documentée dans le changelog
  const versionRegex = new RegExp(`v${newVersion.replace(/\./g, '\\.')}\\b`);
  if (!versionRegex.test(changelogContent)) {
    const mois = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    const now = new Date();
    const formattedDate = `${now.getDate()} ${mois[now.getMonth()]} ${now.getFullYear()}`;

    // Retirer le tag "Actuelle" des versions précédentes
    changelogContent = changelogContent.replace(
      /<span class="text-xs px-2\.5 py-0\.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">\s*Actuelle\s*<\/span>/g,
      ''
    );

    const noteText = releaseNote || 'Mise à jour et améliorations de l\'application.';

    // Nouveau bloc article de version au style CamiLudik
    const newArticle = `
      <!-- Version ${newVersion} -->
      <article class="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-md border border-amber-900/10 relative overflow-hidden">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-amber-900/10">
          <div class="flex items-center gap-3">
            <span class="px-3 py-1 rounded-full bg-accent-100 border border-accent-300 text-accent-700 font-mono text-sm font-bold">
              v${newVersion}
            </span>
            <span class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
              Actuelle
            </span>
          </div>
          <time class="text-xs text-[#7c4004]/70 flex items-center gap-1.5">
            <i class="bi bi-calendar3"></i> ${formattedDate}
          </time>
        </div>

        <ul class="space-y-3 text-sm text-[#7c4004]/90">
          <li class="flex items-start gap-2.5">
            <i class="bi bi-stars text-accent-500 mt-1 flex-shrink-0"></i>
            <div>
              <strong class="text-[#7c4004] font-semibold">Mise à jour</strong> : ${noteText}
            </div>
          </li>
        </ul>
      </article>
`;

    // Insérer juste après le début de la liste
    if (changelogContent.includes('id="changelog-list"')) {
      changelogContent = changelogContent.replace(
        /(<div[^>]*id="changelog-list"[^>]*>)/,
        `$1\n${newArticle}`
      );
      fs.writeFileSync(CHANGELOG_HTML, changelogContent);
      console.log(`[OK] changelog.html mis à jour (nouvelle entrée v${newVersion})`);
    }
  } else {
    console.log(`[INFO] changelog.html : entrée v${newVersion} déjà présente`);
  }
}

console.log('\n[TERMINE] Mise à jour de version terminée !');
console.log('[NOTE] N\'oubliez pas de commiter ces changements :');
console.log(`   git add package.json sw.js js/modules/core/version.js .version index.html changelog.html`);
console.log(`   git commit -m "chore: bump version to ${newVersion}"`);
