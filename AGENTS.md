# AGENTS.md

Ce fichier fournit les instructions aux agents de code (Claude Code, Codex, etc.) qui travaillent dans ce dépôt. `CLAUDE.md` se contente d'importer ce fichier.

## Charte graphique

La charte graphique complète (palette, typographie, emplacements des couleurs dans le code) est dans [.doc/charte-graphique.md](.doc/charte-graphique.md). La lire avant tout changement de couleur ou de style.

**Règle importante** : toujours mettre à jour `.doc/charte-graphique.md` après chaque changement de couleur ou de style. Ce fichier est la source de vérité pour l'identité visuelle.

### Système de thème centralisé

**Pour changer une couleur de la charte : ne modifier que `styles/main.css` (bloc `:root`).** Les valeurs se propagent automatiquement partout.

Architecture :
- `styles/main.css` (`:root`) — source unique de toutes les couleurs (variables CSS `--color-*`)
- `js/modules/core/theme.js` — lit les variables CSS via `getComputedStyle` au démarrage et expose l'objet `T`
- `js/modules/managers/*.js` — importent `{ T }` et utilisent `T.gradientMain`, `T.primaryA(0.5)`, etc. dans les templates HTML

**Règles d'usage dans les managers JS :**
- Toujours utiliser `T.*` pour les couleurs dans les `style=""` inline
- Ne jamais écrire de valeurs hex/rgb directement dans les managers
- Voir `theme.js` pour la liste complète des helpers disponibles (`T.hexPrimary`, `T.primaryA()`, `T.gradientMain`, etc.)

**Couleurs intentionnellement hors charte (ne pas modifier) :**
- `category-colors.js` — palette décorative rotative des cartes quiz
- `rarity-épique` `rgb(147,51,234)` — rareté distincte du primary
- `rarity-commun` `rgb(107,114,128)` — gris neutre sémantique pour trophées non débloqués
- Couleurs sémantiques vert/rouge/jaune (`text-green-400`, `text-red-400`, `text-yellow-400`) — feedback utilisateur universel

## Règles de Design des Avatars SVG & Trophées RPG

Ces règles sont absolues pour la génération et l'édition des avatars dans ce projet :

### 1. Règle absolue pour les Capes (Teinte toujours plus foncée pour TOUS les personnages)
- **Règle générale impérative pour TOUS les personnages (de base comme RPG, actuels et futurs)** : Toute cape (`capeBack`, `backEquipment`, pans d'épaules ou manteau dorsal) **DOIT TOUJOURS AVOIR UNE TEINTE NETTEMENT PLUS FONCÉE** par rapport à la tenue principale / vêtement du corps (`body`).
- **Principe optique** : La cape se situant dans le plan arrière et dans l'ombre portée du corps, sa couleur doit obligatoirement être assombrie (minimum 25% à 40% plus sombre que la pièce maîtresse du buste).
- **Interdictions formelles :**
  - Interdiction de concevoir une cape plus claire ou de même clarté que la tenue.
  - Interdiction de concevoir une cape d'une famille de couleur déconnectée de la tenue (ex. pas de cape blanche sur armure sombre, pas de cape rouge sur tenue verte).
- **Exemples de référence appliqués :**
  - Mage violet améthyste (`#4c1d95`) -> Cape violet sombre profond (`#2e1065`) avec liseré or (`#fbbf24`).
  - Rôdeur émeraude (`#1b5e52`) -> Cape sylvestre vert profond très sombre (`#0d332c` / `#144b41`).
  - Orc harnais cuir barbare (`#451a03`) -> Cape de fourrure brun très sombre presque noire (`#261208` / `#381c0c`).
  - Paladin armure acier bleuté (`#cbd5e1`) -> Cape ardoise / acier sombre (`#334155` ou `#475569`) avec bordure or (`#fbbf24`).
  - Ombre / Mage noir pourpre sombre (`#581c87`) -> Cape pourpre nuit d'ébène (`#2e1065` / `#1e1b4b`).
  - Vampire redingote velours rouge (`#991b1b`) -> Cape pourpre sang très sombre (`#450a0a`).

### 2. Yeux, Paupières & Cils (Interdiction des cils chez les garçons & Contour carnation)
- **Contour de l'œil (Orbite / Tour de l'œil)** : Pour **TOUS les personnages**, le contour qui fait le tour de l'œil (`<ellipse ... fill="none" stroke="${skin.shadow}" stroke-width="0.8"/>`) doit **OBLIGATOIREMENT adopter la couleur d'ombre de la carnation (`${skin.shadow}`)**, et **JAMAIS une couleur fixe en dur** (ex. interdiction de `#e2d0c0`). Cela garantit une intégration naturelle et harmonieuse sur toutes les carnations (peaux pâles, dorées, ébène, lilas ou vert orc).
- **Garçons (Tous, base et RPG)** : **AUCUN cil saillant** (interdiction absolue de polygones ou pointes de cils sur les côtés). Seul un **trait de paupière supérieur épuré** (`<path d="M30 38 Q37 34 44 38"...>`) est présent au-dessus de l'œil pour souligner le regard.
- **Filles (Toutes, base et RPG)** : Cils manga supérieurs et inférieurs fins et élégants.
- **Teinte cheveux & Mode Produit** : Pour les deux, le groupe de paupière/cils adopte **la même teinte que les cheveux (`${hairColor}`)** avec le mode de fusion Produit (`style="mix-blend-mode: multiply;"`) pour s'intégrer harmonieusement sur les yeux et la peau.

### 3. Construction des Cheveux en Blocs Larges
- Les cheveux sont constitués de **petits blocs larges**, soit arrière (`hairBack`), soit avant (`hairFront`).
- Les mèches sont **soit elliptiques douces, soit pointues avec un angle obtus** (assez larges).
- **Interdiction** : Ne jamais faire de simples aplats plats ou de découpes linéaires en dents de scie étroites (sawtooth). Garantir un plein volume sans trous ni calvitie.

### 4. Parité Garçon / Fille & Accessoires
- Pour chaque personnage / trophée, le garçon et la fille partagent **exactement les mêmes couleurs** (peau, yeux, cheveux).
- Les nouveaux personnages RPG ne doivent **jamais hériter des accessoires d'écolier de base** (élastiques turquoise/orange `#489e96`/`#ff9d00`, serre-tête écolier).
- Chaque personnage dispose d'un **ID court standardisé** (`boy`, `girl`, `elf`, `orc`, `paladin`, `kitsune`, `shadow`, `vampire`).

### 5. Règle absolue pour la Bouche (Teinte peau mais BEAUCOUP plus foncée)
- Pour **TOUS les personnages** (garçons, filles, espèces fantastiques et trophées), la couleur de la bouche (`mouthColor`) est **impérativement basée sur la couleur de la peau (`skin`), mais dans une teinte BEAUCOUP PLUS FONCÉE** (dérivée via `getSkinMouthColor(skin)` ou champ `mouth` de la palette de peau).
- **Interdiction absolue** : Ne jamais coder de couleur de bouche fixe en dur (ex. `#7c4004` ou `#2b1404`), afin que la bouche s'harmonise naturellement avec toutes les carnations (porcelaine, pêche, dorée, caramel, chocolat, ébène, vert olive orc, lilas, etc.).

### 6. Contraste Peau / Cheveux & Palette de départ Intangible
- **Palette de départ inchangée (`BASE_HAIR_COLORS`)** : Les 5 couleurs de cheveux d'origine du sélecteur de départ ne doivent **JAMAIS** être modifiées ou recréées. Elles restent strictement :
  - `brown-dark` -> **Brun Sombre (`#5a2d0c`)**
  - `auburn` -> **Roux Cuivré (`#8a3c08`)**
  - `black` -> **Noir Corbeau (`#1c1917`)**
  - `chestnut` -> **Châtain Doré (`#6b3e1b`)**
  - `blonde` -> **Blond Soleil (`#d99a38`)**
- **Sélecteur de départ** : Affiche uniquement `HAIR_COLORS` (ces 5 teintes de base), sans les couleurs exclusives de trophées.
- **Règle de contraste pour la conception des personnages & trophées RPG** :
  - Lors de la conception de presets de personnages, trophées ou récompenses, toujours garantir un contraste marqué entre la couleur de la peau et celle des cheveux (ex. peau verte d'Orc avec chevelure roux ardent `#c2410c` ou rouge `#b91c1c`, peau pâle d'Elfe avec chevelure turquoise féerique `#14b8a6`).
  - Éviter d'attribuer des combinaisons où la chevelure se confond avec la carnation (ex. blond terne sur peau dorée ou brun moyen identique à une peau foncée).

### 7. Construction des Oreilles (Elfes & Orcs)
- **Même géométrie robuste et rapprochée** : base d'attache au crâne à $x=24$ et $x=76$, s'arrêtant à $x=13.5$ et $x=86.5$ (ne jamais écarter jusqu'à $x=11$).
- **Tracé Bézier quadratique (`Q`) propre** : deux aplats imbriqués (`fill="${skin.base}"` et `fill="${skin.shadow}"`) **SANS contour/stroke** disgracieux.
- **Lobe et orientation** : lobe descendant vers la mâchoire (`y=43.5 - 44`). Pour l'Elfe, la pointe reste effilée et orientée vers le haut et l'extérieur (`y=31.5`), jamais tombante molle vers le bas.
- **Hauteur des oreilles (toutes espèces)** : chaque groupe d'oreilles de `getSpeciesEars()` est descendu de 50 % de sa hauteur par un `transform="translate(0 d)"` (humain 4.8, elfe 6, orc 5.5, anneaux compris), et chaque oreille est rapprochée du visage de 25 % de sa largeur (humain : centres à x=23.4 et x=76.6 ; elfe 2.6 et orc 2.4 par `translate(±d 0)` sur chaque côté). Les coordonnées ci-dessus restent celles du dessin avant ces décalages ; une nouvelle espèce applique la même règle.

### 8. Anatomie et Armes Orc & Barbare
- **Dents inférieures orc** : écartées aux canines (gap $12.8\text{px}$, $x=42.2$ et $x=57.8$), légèrement plus petites ($4.5\text{px}$ de haut), avec **pointes arrondies** (courbe Bézier lisse, pas de triangles coupants) et **STRICTEMENT SANS CONTOUR / STROKE** (aplat ivoire pur `fill="#fffbeb"` sans contour pour un rendu propre et intégré).
- **Hache en pierre taillée** : fer taillé en facettes minérales, tranchant en croissant orienté vers l'AVANT/EXTÉRIEUR (gauche), talon plat à droite, ligature croisée barbare en cuir/cordelette rouge.
- **Fille Orc** : crinière sauvage longue jusqu'à $y=90$ dans le même style barbare que le garçon.

### 9. Alignement des Armes Vectorielles
- Toute arme (dagues elfiques, épées, bâtons) doit être construite avec son axe central **rigoureusement colinéaire à $X=0$** (pommeau, garde, quillons, lame et pointe alignés), puis positionnée par transformation `<g transform="translate(x, y) rotate(angle)">`. Ne jamais créer d'angle brisé visuel.
- **Prise en main (tous les personnages, base comme trophées)** : l'origine du groupe de l'arme est le point de prise, placé **au milieu de la poignée** et sur le centre de la main du bras. La main qui serre est dessinée **dans le groupe de l'arme, après elle, donc au premier plan**, et elle est **la seule main** de ce côté : l'ellipse de main du bras correspondant est supprimée de `arms` (commentaire `NOTE Main ... dessinée une seule fois, dans handItem`) pour ne jamais dupliquer la main. Une main cachée derrière un bouclier, sans poignée, reste dans `arms`. Forme : `<ellipse cx="0" cy="0" rx="3.2" ry="3.3" fill="${skin.base}" stroke="${skin.shadow}" stroke-width="0.5"/>` plus deux séparations de doigts en fuseau en travers de la poignée (gantelet : mêmes formes aux couleurs du métal). `handItem` devient alors une fonction `(skin) =>`.
- **Groupes sans orphelins** : tout ce qui appartient à une arme (lame, garde, poignée, pommeau, ornements, ligatures, main qui serre) vit dans **un seul groupe** porteur de l'unique `translate`/`rotate`. Un sous-élément incliné (ex. ligature croisée de la hache orc) a son propre sous-groupe centré sur l'axe du manche et tourné de son inclinaison. Jamais de coordonnée absolue à côté d'un groupe transformé : déplacer le groupe doit tout emporter.
- **Elfe** : équipé de sa double dague ciselée, aucun carquois au dos.

### 10. Design d'Interface & Badges ("Nouveau")
- Tous les badges de statut ("New", "Nouveau", tags d'IDs) doivent rester des **micro-chips minimalistes** (`text-[8px]`, `px-1.5 py-0.5`, fond translucide flouté, bordure fine).
- **Interdiction** : Ne jamais afficher de gros blocs opaques jaunes criards qui masquent ou écrasent le visuel des avatars.

### 11. Workflow & Discipline de Développement
- **Interdiction absolue d'exécuter `git commit`** sans instruction explicite de l'utilisateur. L'utilisateur valide et teste en direct sur `http://localhost:8000/test-avatars.html`.
- Toujours vérifier la portée des variables dans les templates JS pour prévenir tout `ReferenceError`.
- Valider la syntaxe des scripts avec `node -c` avant toute restitution.

### 12. Spécificités des Coupes et Teintes Elfe & Orc
- **Elfe Garçon** : Mèches arrière courtes s'arrêtant proprement à la nuque et au sommet des épaules ($y \approx 60-64$), évitant la cascade longue de la fille.
- **Elfe Fille** : Frange frontale longue et pointue ($y \approx 35-37$), pleine et opaque. Interdiction formelle de superposer des traits fins translucides ou rayures diagonales parasites sur le front sous le diadème.
- **Teinte Cheveux Elfe** : Teintes féeriques lumineuses (Turquoise Féerique `#14b8a6`, Bleu Ciel Givré `#38bdf8`, Violet Clair Féerique `#a855f7`).
- **Teinte Cheveux Orc** : roux ardent (`#c2410c`) ou rouge (`#b91c1c`).

### 13. Positionnement des Bretelles, Sangles et Harnais (À fleur d'épaule)
- **Règle absolue d'ajustement anatomique** : Toute bretelle, lanière, baudrier, sangle ou harnais passant sur le torse ou les épaules **DOIT IMPÉRATIVEMENT AVOIR SES EXTRÉMITÉS RIGOUREUSEMENT POSITIONNÉES À FLEUR D'ÉPAULE**.
- **Continuité du galbe** : Les sommets de la sangle doivent épouser fidèlement la courbe Bézier de l'épaule (`y = 61.5..65` entre `x = 31..38.5` à gauche et `x = 61.5..69` à droite).
- **Interdictions formelles :**
  - Interdiction de laisser flotter des coins de polygones dans le vide en dehors du corps ou coupés en ligne droite déconnectée de la pente de l'épaule.
  - Interdiction de faire déborder les extrémités inférieures au-delà de la largeur de taille/bassin (`x = 36.5..63.5`). Les sangles doivent s'ancrer impeccablement sur la ceinture.

### Documentation détaillée
Voir le guide complet dans [.doc/guide-technique-avatars-svg.md](.doc/guide-technique-avatars-svg.md). La méthode de création des trophées skins (socle réutilisable, apports d'un trophée, recette, lab) est dans [.claude/skills/avatars-svg/SKILL.md](.claude/skills/avatars-svg/SKILL.md).

## Project Overview

Erudizz est une application de quiz interactifs construite avec Vanilla JavaScript ES6 modules et Tailwind CSS (CDN). Elle dispose d'un thème sombre violet/orange, d'un suivi des joueurs via localStorage, d'un historique des quiz et de plusieurs modes de jeu (normal/spoiler).

## Development Commands

Les scripts sont dans `package.json` (`npm run dev`, `build`, `generate-index`, `validate`, `update-version`). Points non évidents :

- L'app utilise des modules ES6 : elle DOIT tourner via un serveur HTTP (`npm run dev` ou `python3 -m http.server 8000`), jamais en `file://`.
- L'index des quiz se génère avec `python3 api.py generate-index` (appelé par `npm run generate-index`).
- Valider un quiz précis : `node scripts/validate-quiz.js path/to/quiz.json`.
- Versionner : toujours `npm run update-version` (met à jour `package.json`, `sw.js`, `js/modules/core/version.js` et `.version`), jamais `bump-version` seul.
- `test-avatars.html` est le laboratoire de test des avatars (dev, exclu du déploiement).

## Quiz : format et règles de rédaction

La spécification complète du format JSON (champs `config` et `questions`, types QCM et saisie libre) est dans [.doc/quiz-format-specification.md](.doc/quiz-format-specification.md). La lire avant de créer ou modifier un quiz.

### Checklist de création d'un quiz

1. **Choisir le nom du fichier** : `[slug-kebab-case].json` dans `js/data/`
2. **Définir la configuration** :
   - Titre : majuscule initiale uniquement (ex: `"Calcul mental 2"`, `"Les unités de mesure"`)
   - Pour les séries (Le Petit Nicolas) : format `"Le Petit Nicolas - Ch. X : Titre du chapitre"`
   - Description : tutoiement cohérent (`"Teste tes connaissances..."`, `"Entraîne-toi..."`, `"Découvre..."`)
   - Catégorie appropriée (Développement, CM2, Coaching, Divertissement)
   - Difficulté réaliste (numérique `1` à `5` recommandé, ou ancien format `"Facile"`/`"Moyen"`/`"Difficile"`)
   - `spoilerMode: true` si les images révèlent les réponses ou donnent un indice fort, `false` si elles sont décoratives
   - `questionCount` exact
   - `createdAt` au format `YYYY-MM-DD` (tri des quiz et badge "NEW" pendant 30 jours)
3. **Créer les questions** :
   - Minimum 10 questions, recommandé 20
   - **Pour QCM** : Exactement 4 choix de réponses + `correctAnswer` DOIT être une copie exacte d'un des `choices`
   - **Pour saisie libre** : `acceptedAnswers` (recommandé) ou `answer` (déprécié), validation insensible à la casse
   - Possibilité de **mixer les deux types** dans un même quiz
   - Images de préférence locales dans `/images/quiz/[nom-du-quiz]/`
4. **Valider le quiz** : `npm run validate`
5. **Régénérer l'index** : `npm run generate-index`
6. **Tester localement** : `npm run dev`
7. **Commiter les deux fichiers** : le quiz JSON + `index.json`

### Règles importantes

- **JAMAIS** de majuscule sur chaque mot du titre : `"Calcul mental"` et non `"Calcul Mental"`
- **JAMAIS** tutoyer et vouvoyer dans le même fichier (la description utilise `tu`)
- **JAMAIS** de faute de frappe entre `correctAnswer` et `choices` (sensible à la casse)
- **JAMAIS** mélanger `choices`+`correctAnswer` avec `answer`/`acceptedAnswers` dans la même question
- Toujours mettre `questionCount` égal au nombre réel de questions
- `summaryUrl` pointe vers une page HTML statique de `/resumes/`, stylée avec la charte (polices Baloo 2 / Almarai)

## Important Implementation Details

- **State** : toujours appeler `quizState.reset()` avant de démarrer un nouveau quiz pour vider l'état précédent.
- **Thème** : dans les managers, couleurs uniquement via `T.*` (voir section Charte graphique).
- **Config** : `CONFIG` (singleton, `config.js`) détecte le chemin `/private/`, qui change le filtrage des catégories (`CONFIG.categoryFilter`, `null` = toutes).
- **Free Mode** : boutons de réponse masqués via la classe `.free-mode` sur `body`, la bonne réponse s'affiche à l'expiration du timer.
- **Trophées** : débloqués par codes secrets (`secretCode` dans `js/data/trophies.json`), images dans `images/trophies/characters/<série>/`, protégées contre le clic droit et l'appui long.

## Suivi du backlog

Le backlog du projet est dans `.doc/backlog.csv`, les tâches terminées dans `.doc/archives/backlog-archive-AAAA-MM-JJ.csv` (un fichier par jour d'archivage).

### Workflow

Pour toute nouvelle fonctionnalité ou évolution, avant de développer : demande, reformulation technique, analyse d'impact par rapport au reste du backlog, inscription au backlog (avec `date_debut`), réalisation, résumé des modifications et tests recommandés, archivage de la ligne avec `date_fin`, commit.

- Consulter `.doc/backlog.csv` avant de commencer une tâche (la demande peut y être déjà détaillée) et après l'avoir terminée (ajouter une ligne pour tout point non traité repéré en cours de route).
- Le commit inclut toujours le mouvement de backlog (jamais de commit séparé), au format `[id] Résumé court`. Le commit reste soumis à l'accord explicite de l'utilisateur.
- Une tâche terminée : renseigner `date_fin` puis déplacer la ligne vers l'archive du jour (la créer avec l'en-tête si elle n'existe pas), au lieu de la garder dans `backlog.csv`.
- Un plan d'exécution détaillé se rédige dans `.doc/plans/<id>-<sujet>-AAAA-MM-JJ.md`, référencé dans la colonne `description` ; le plan cite son `id` en première ligne.

### Colonnes

`id,priorite,tache_principale,type,description,date_debut,date_fin`, identiques dans le fichier actif et les archives.

- `id` : entier jamais réutilisé, continu sur actif + archives. Toujours le recalculer au moment de créer la ligne :

```bash
tail -n +2 .doc/backlog.csv .doc/archives/backlog-archive-*.csv | grep -v '^==>' | grep -v '^$' | cut -d',' -f1 | sort -n | tail -1
```

- `priorite` : uniquement `1 urgent 🔴`, `2 important 🟡`, `3 normal 🔵`, `4 nice_to_have 🟢`.
- `tache_principale` : `<Contexte ou module> : <résumé>` (ex. `Trophées : Factoriser l'effet 3D dupliqué des cartes`).
- `type` : `tâche`, `feature`, `bug`, `dette-technique` ou `doc`.
- `description` : contexte complet dans une seule cellule (entre guillemets si elle contient des virgules).
- `date_debut` / `date_fin` : `AAAA-MM-JJ`, vide tant que non renseigné.

## Documentation Guidelines

**IMPORTANT**: Always ask before creating documentation files. Prefer updating AGENTS.md over creating separate documentation.

If documentation is explicitly requested:

- `.doc/quiz-format-specification.md` - Quiz JSON format specification (comprehensive)
- `.doc/architecture-*.md` - Auto-generated project architecture files (via /architecture command)
- `.doc/*.md` - Other technical notes (only if explicitly requested)

## Deployment Notes

### Vercel

Site statique déployé sur Vercel ([vercel.json](vercel.json)).

**IMPORTANT** : `js/data/index.json` doit être **pré-généré et commité**. Vercel ne régénère PAS l'index au build. Après tout ajout ou modification de quiz : `npm run generate-index`, puis commiter le quiz et `index.json` ensemble.

### PWA & Service Worker

- Le cache du Service Worker (`sw.js`) empêche de voir les modifications tant que `CACHE_VERSION` ne change pas : lancer `npm run update-version` avant chaque commit avec modifications visuelles ou de quiz.
- Stratégies : Cache First pour les assets statiques, Network First pour les quiz `/js/data/*.json`, Stale-While-Revalidate pour `/js/data/index.json`.
- En développement, travailler avec "Bypass for network" activé dans DevTools (onglet Application), et le désactiver pour tester le cache.
- localStorage (`playerName`, `playerResults`) survit au vidage du cache du Service Worker.
