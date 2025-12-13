# Scripts de développement

Ce dossier contient les scripts utilitaires pour le développement de Job-EZ.

## Scripts disponibles

### `update-version.js`

**Script automatique de mise à jour de version** pour gérer le cache PWA.

#### Utilisation

```bash
npm run update-version
```

#### Ce que fait le script

1. ✅ Incrémente automatiquement la version patch dans `package.json` (1.0.1 → 1.0.2)
2. ✅ Met à jour `sw.js` ligne 6 : `const CACHE_VERSION = 'v1.0.2';`
3. ✅ Met à jour `js/modules/core/version.js` ligne 6 : `export const APP_VERSION = '1.0.2';`
4. ✅ Crée le fichier `.version` avec la nouvelle version

#### Pourquoi ce script existe

La PWA utilise un Service Worker qui cache les fichiers de l'application. Sans changement de version, les utilisateurs ne verront pas les nouvelles modifications (nouveau quiz, corrections UI, etc.).

Ce script garantit que :
- Tous les fichiers de version sont synchronisés
- Le Service Worker détectera automatiquement le changement
- L'ancien cache sera supprimé et remplacé par le nouveau
- Les utilisateurs verront immédiatement les modifications

#### Quand l'utiliser

**À utiliser avant chaque commit contenant** :
- Nouveau quiz
- Modification de l'interface utilisateur
- Correction de bugs visuels
- Changement de comportement de l'application
- Mise à jour de données (trophées, index, etc.)

**Ne PAS l'utiliser pour** :
- Modifications de documentation uniquement
- Changements de configuration sans impact utilisateur
- Modifications de scripts de développement

#### Workflow recommandé

```bash
# 1. Faire vos modifications (nouveau quiz, UI, etc.)
# 2. Générer l'index des quiz si nécessaire
npm run generate-index

# 3. Valider les quiz
npm run validate

# 4. Mettre à jour la version automatiquement
npm run update-version

# 5. Tester localement
npm run dev

# 6. Commit
git add package.json sw.js js/modules/core/version.js .version js/data/
git commit -m "feat: nouveau quiz + bump version"
git push
```

### `validate-quiz.js`

Script de validation des fichiers quiz JSON.

#### Utilisation

```bash
# Valider tous les quiz
npm run validate

# Valider un quiz spécifique
node scripts/validate-quiz.js js/data/mon-quiz.json
```

#### Ce que vérifie le script

- Structure JSON valide
- Présence de tous les champs obligatoires
- Correspondance entre `questionCount` et nombre réel de questions
- Correspondance exacte entre `correctAnswer` et `choices`
- Formats d'images recommandés
- Existence des fichiers images locaux

## Fichiers de configuration

### `.version`

Fichier texte contenant la version actuelle de l'application (ex: `1.0.2`).

- Généré automatiquement par `npm run update-version`
- Utilisé pour le cache-busting
- À commiter avec les autres fichiers de version

## Dépannage

### Le cache ne se vide pas

Si après `npm run update-version` les modifications ne sont toujours pas visibles :

1. **Vérifier que la version a changé** :
   ```bash
   grep "1.0" package.json sw.js js/modules/core/version.js
   ```
   Les trois fichiers doivent avoir la même version.

2. **Vider manuellement le cache** :
   - Chrome DevTools (F12)
   - Onglet "Application" → "Storage"
   - "Clear site data" → Tout cocher → Cliquer

3. **Hard refresh** :
   - `Ctrl+Shift+R` (Windows/Linux)
   - `Cmd+Shift+R` (Mac)

### Le Service Worker ne se met pas à jour

- Fermer tous les onglets de l'application
- Rouvrir un nouvel onglet
- Le nouveau Service Worker s'installera automatiquement

### Mode développement

Pour éviter les problèmes de cache en développement :

1. Chrome DevTools (F12) → Onglet "Application"
2. Section "Service Workers" → Cocher "Bypass for network"
3. Développer normalement
4. Décocher avant de tester la PWA
