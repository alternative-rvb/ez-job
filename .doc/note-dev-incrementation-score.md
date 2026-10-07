# Note Développeur : Gestion et Test de l'Incrémentation du Score

## 1. Contexte & Architecture

Dans **CamiLudik**, la progression sur la carte interactive (*Roadmap - La Quête du Château*) et le déblocage des trophées sont indexés sur le total de points du joueur.

- **Gestionnaire principal** : `rewardsManager` (`js/modules/managers/rewards-manager.js`)
- **Persistance** : `localStorage` sous la clé `'erudizz_rewards'`
- **Composant UI** : `RoadmapManager` (`js/modules/ui/roadmap.js`)

---

## 2. Méthodes de test et d'incrémentation du score

### A. Via l'interface utilisateur (Mode Test Rapide)
- Un bouton interactif est intégré directement sur la carte de la Roadmap (en haut à droite, sur le badge de score affichant `⭐ [points] +15`).
- **Comportement au clic** :
  - Ajoute **+15 points** à chaque clic.
  - Déclenche l'animation complète de marche du personnage vers le nouveau palier.
  - Si le score dépasse 100 points, il revient à 0 pour permettre de re-tester l'ensemble du trajet.

### B. Via la console développeur (`F12`)
Deux fonctions globales sont exposées sur `window` pour piloter le score à volonté :

```javascript
// Définir un score précis (entre 0 et 100)
setScore(45);

// Ajouter des points au score existant
addScore(15);
```

### C. Directement via `localStorage`
```javascript
// Modifier manuellement la clé localStorage
const rewards = JSON.parse(localStorage.getItem('erudizz_rewards') || '{}');
rewards.totalPoints = 60;
localStorage.setItem('erudizz_rewards', JSON.stringify(rewards));
location.reload();
```

---

## 3. Paliers de la Roadmap (7 Milestones)

| Palier | Points requis | Pourcentage tracé | Étape |
| :--- | :--- | :--- | :--- |
| **0** | `0 pt` | 2% | Hameau du Départ (*Village*) |
| **1** | `10 pts` | 16% | Forêt Enchantée |
| **2** | `25 pts` | 28% | Lac de Cristal |
| **3** | `40 pts` | 42% | Porte des Brumes |
| **4** | `60 pts` | 62% | Col du Dragon |
| **5** | `80 pts` | 88% | Crête des Étoiles |
| **6** | `100 pts` | 98% | Citadelle Céleste (*Château*) |

---

## 4. Effet Squelette Fidèle (Skeleton Loading / Shimmer)

Un effet squelette complet, chaleureux et fidèle à la charte CamiLudik est implémenté :
- **CSS** : classes `.skeleton-shimmer`, `.skeleton-shimmer-subtle` et `.skeleton-svg-pulse` dans `styles/main.css`.
- **Roadmap Card** : silhouette exacte du profil, des montagnes SVG, de la route en pointillés fantômes, des 7 jalons et de la barre de progression.
- **Cartes de Quiz** : grilles de cartes horizontales avec bloc image, badges et lignes de texte en shimmer.
- **Commande de test console** :
  ```javascript
  showSkeleton(); // Affiche le squelette de la roadmap pendant 2.5 secondes puis réaffiche la carte
  showSkeleton(5000); // Définir une durée personnalisée en ms (ou 0 pour infini)
  ```

---

## 5. Dépannage & Cache Navigateur

Lors de modifications sur les modules JavaScript :
- Effectuer un **rechargement forcé sans cache** : `Ctrl + F5` (ou `Ctrl + Shift + R`).
