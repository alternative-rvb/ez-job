# Developer Guide - Cheat Sheet (Dev Tools & Tests)

> [!WARNING]
> **FONCTIONNALITÉS PROVISOIRES (DEV ONLY)**
> Ces commandes, fonctions globales et raccourcis d'interface sont **strictement réservés aux tests en cours de développement** et **doivent être exclus / supprimés avant la mise en production**.

---

## 1. Cheat Sheet : Commandes Console (`F12`)

| Fonction | Description | Exemple |
| :--- | :--- | :--- |
| `addScore(pts)` | Ajoute des points (défaut `+10`) et anime l'avatar | `addScore(15);` |
| `setScore(pts)` | Définit le score exact (0 à 100) et met à jour la carte | `setScore(60);` |
| `resetScore()` | Réinitialise le score à `0 pt` et replace l'avatar au départ | `resetScore();` |
| `showSkeleton(ms)` | Déclenche l'effet squelette fidèle (défaut `2500ms`, `0` = infini) | `showSkeleton(3000);` |

---

## 2. Test Rapide via l'Interface (Mobile & Desktop)

- **Badge de score interactif** : En haut à droite de la carte Roadmap (`⭐ [Score]`), cliquer directement sur le badge pour ajouter instantanément **+15 points** et déclencher l'animation de marche.
- Au-delà de 100 points, le bouton boucle et réinitialise le trajet à 0 pour faciliter les tests répétitifs.

---

## 3. Paliers de Progression de la Roadmap (7 Milestones)

| Palier | Points | Position tracé | Lieu / Étape |
| :---: | :---: | :---: | :--- |
| **0** | `0 pt` | `2%` | Hameau du Départ |
| **1** | `10 pts` | `16%` | Forêt Enchantée |
| **2** | `25 pts` | `28%` | Lac de Cristal |
| **3** | `40 pts` | `42%` | Porte des Brumes |
| **4** | `60 pts` | `62%` | Col du Dragon |
| **5** | `80 pts` | `88%` | Crête des Étoiles |
| **6** | `100 pts` | `98%` | Citadelle Céleste (*Château*) |

---

## 4. Persistance & Stockage Local

- **Clé `localStorage`** : `'erudizz_rewards'`
- **Reset manuel complet** :
  ```javascript
  localStorage.removeItem('erudizz_rewards');
  location.reload();
  ```

---

## 5. Checklist avant Mise en Production

- [ ] Supprimer les déclarations `window.setScore`, `window.addScore`, `window.resetScore`, `window.showSkeleton` dans `js/modules/ui/roadmap.js`.
- [ ] Retirer l'événement de clic test `+15 pts` sur `#roadmap-score-badge`.
- [ ] Supprimer ou archiver ce guide développeur.
