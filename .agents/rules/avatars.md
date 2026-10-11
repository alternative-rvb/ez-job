# Règles de Design des Avatars SVG & Trophées RPG

Ces règles sont absolues pour la génération et l'édition des avatars dans ce projet.

## 1. Règle absolue pour les Capes (Teinte toujours plus foncée pour TOUS les personnages)
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

## 2. Yeux, Paupières & Cils (Interdiction des cils chez les garçons & Contour carnation)
- **Contour de l'œil (Orbite / Tour de l'œil)** : Pour **TOUS les personnages**, le contour qui fait le tour de l'œil (`<ellipse ... fill="none" stroke="${skin.shadow}" stroke-width="0.8"/>`) doit **OBLIGATOIREMENT adopter la couleur d'ombre de la carnation (`${skin.shadow}`)**, et **JAMAIS une couleur fixe en dur** (ex. interdiction de `#e2d0c0`). Cela garantit une intégration naturelle et harmonieuse sur toutes les carnations (peaux pâles, dorées, ébène, lilas ou vert orc).
- **Garçons (Tous, base et RPG)** : **AUCUN cil saillant** (interdiction absolue de polygones ou pointes de cils sur les côtés). Seul un **trait de paupière supérieur épuré** (`<path d="M30 38 Q37 34 44 38"...>`) est présent au-dessus de l'œil pour souligner le regard.
- **Filles (Toutes, base et RPG)** : Cils manga supérieurs et inférieurs fins et élégants.
- **Teinte cheveux & Mode Produit** : Pour les deux, le groupe de paupière/cils adopte **la même teinte que les cheveux (`${hairColor}`)** avec le mode de fusion Produit (`style="mix-blend-mode: multiply;"`) pour s'intégrer harmonieusement sur les yeux et la peau.

## 3. Construction des Cheveux en Blocs Larges
- Les cheveux sont constitués de **petits blocs larges**, soit arrière (`hairBack`), soit avant (`hairFront`).
- Les mèches sont **soit elliptiques douces, soit pointues avec un angle obtus** (assez larges).
- **Interdiction** : Ne jamais faire de simples aplats plats ou de découpes linéaires en dents de scie étroites (sawtooth). Garantir un plein volume sans trous ni calvitie.

## 4. Parité Garçon / Fille & Accessoires
- Pour chaque personnage / trophée, le garçon et la fille partagent **exactement les mêmes couleurs** (peau, yeux, cheveux).
- Les nouveaux personnages RPG ne doivent **jamais hériter des accessoires d'écolier de base** (élastiques turquoise/orange `#489e96`/`#ff9d00`, serre-tête écolier).
- Chaque personnage dispose d'un **ID court standardisé** (`boy`, `girl`, `elf`, `orc`, `paladin`, `kitsune`, `shadow`, `vampire`).

## 5. Règle absolue pour la Bouche (Teinte peau mais BEAUCOUP plus foncée)
- Pour **TOUS les personnages** (garçons, filles, espèces fantastiques et trophées), la couleur de la bouche (`mouthColor`) est **impérativement basée sur la couleur de la peau (`skin`), mais dans une teinte BEAUCOUP PLUS FONCÉE** (dérivée via `getSkinMouthColor(skin)` ou champ `mouth` de la palette de peau).
- **Interdiction absolue** : Ne jamais coder de couleur de bouche fixe en dur (ex. `#7c4004` ou `#2b1404`), afin que la bouche s'harmonise naturellement avec toutes les carnations (porcelaine, pêche, dorée, caramel, chocolat, ébène, vert olive orc, lilas, etc.).

## 6. Contraste Peau / Cheveux & Palette de départ Intangible
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

## 7. Construction des Oreilles (Elfes & Orcs)
- **Même géométrie robuste et rapprochée** : base d'attache au crâne à $x=24$ et $x=76$, s'arrêtant à $x=13.5$ et $x=86.5$ (ne jamais écarter jusqu'à $x=11$).
- **Tracé Bézier quadratique (`Q`) propre** : deux aplats imbriqués (`fill="${skin.base}"` et `fill="${skin.shadow}"`) **SANS contour/stroke** disgracieux.
- **Lobe et orientation** : lobe descendant vers la mâchoire (`y=43.5 - 44`). Pour l'Elfe, la pointe reste effilée et orientée vers le haut et l'extérieur (`y=31.5`), jamais tombante molle vers le bas.

## 8. Anatomie et Armes Orc & Barbare
- **Dents inférieures orc** : écartées aux canines (gap $12.8\text{px}$, $x=42.2$ et $x=57.8$), légèrement plus petites ($4.5\text{px}$ de haut), avec **pointes arrondies** (courbe Bézier lisse, pas de triangles coupants) et **STRICTEMENT SANS CONTOUR / STROKE** (aplat ivoire pur `fill="#fffbeb"` sans contour pour un rendu propre et intégré).
- **Hache en pierre taillée** : fer taillé en facettes minérales, tranchant en croissant orienté vers l'AVANT/EXTÉRIEUR (gauche), talon plat à droite, ligature croisée barbare en cuir/cordelette rouge.
- **Fille Orc** : crinière sauvage longue jusqu'à $y=90$ dans le même style barbare que le garçon.

## 9. Alignement des Armes Vectorielles
- Toute arme (dagues elfiques, épées, bâtons) doit être construite avec son axe central **rigoureusement colinéaire à $X=0$** (pommeau, garde, quillons, lame et pointe alignés), puis positionnée par transformation `<g transform="translate(x, y) rotate(angle)">`. Ne jamais créer d'angle brisé visuel.
- **Elfe** : équipé de sa double dague ciselée, aucun carquois au dos.

## 10. Design d'Interface & Badges ("Nouveau")
- Tous les badges de statut ("New", "Nouveau", tags d'IDs) doivent rester des **micro-chips minimalistes** (`text-[8px]`, `px-1.5 py-0.5`, fond translucide flouté, bordure fine).
- **Interdiction** : Ne jamais afficher de gros blocs opaques jaunes criards qui masquent ou écrasent le visuel des avatars.

## 11. Workflow & Discipline de Développement
- **Interdiction absolue d'exécuter `git commit`** sans instruction explicite de l'utilisateur. L'utilisateur valide et teste en direct sur `http://localhost:8000/test-avatars.html`.
- Toujours vérifier la portée des variables dans les templates JS pour prévenir tout `ReferenceError`.
- Valider la syntaxe des scripts avec `node -c` avant toute restitution.

## 12. Spécificités des Coupes et Teintes Elfe & Orc
- **Elfe Garçon** : Mèches arrière courtes s'arrêtant proprement à la nuque et au sommet des épaules ($y \approx 60-64$), évitant la cascade longue de la fille.
- **Elfe Fille** : Frange frontale longue et pointue ($y \approx 35-37$), pleine et opaque. Interdiction formelle de superposer des traits fins translucides ou rayures diagonales parasites sur le front sous le diadème.
- **Teinte Cheveux Elfe** : Teintes féeriques lumineuses (Turquoise Féerique `#14b8a6`, Bleu Ciel Givré `#38bdf8`, Violet Clair Féerique `#a855f7`).
- **Teinte Cheveux Orc** : Teintes chaudes et ardentes (Roux Ardent Barbare `#c2410c`, Rouge Barbare Sauvage `#b91c1c`) offrant un contraste saisissant avec la peau vert olive.

## 13. Positionnement des Bretelles, Sangles et Harnais (À fleur d'épaule)
- **Règle absolue d'ajustement anatomique** : Toute bretelle, lanière, baudrier, sangle ou harnais passant sur le torse ou les épaules **DOIT IMPÉRATIVEMENT AVOIR SES EXTRÉMITÉS RIGOUREUSEMENT POSITIONNÉES À FLEUR D'ÉPAULE**.
- **Continuité du galbe** : Les sommets de la sangle doivent épouser fidèlement la courbe Bézier de l'épaule (`y = 61.5..65` entre `x = 31..38.5` à gauche et `x = 61.5..69` à droite).
- **Interdictions formelles :**
  - Interdiction de laisser flotter des coins de polygones dans le vide en dehors du corps ou coupés en ligne droite déconnectée de la pente de l'épaule.
  - Interdiction de faire déborder les extrémités inférieures au-delà de la largeur de taille/bassin (`x = 36.5..63.5`). Les sangles doivent s'ancrer impeccablement sur la ceinture.

