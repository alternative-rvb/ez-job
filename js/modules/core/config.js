/**
 * Configuration globale de l'application Quiz
 * Contient uniquement les paramètres vraiment globaux
 */

// Déterminer si on est sur la page privée ou publique
const isPrivate = window.location.pathname.includes('/private');

class AppConfig {
    constructor() {
        this.timeLimit = 10;        // Temps par question en secondes
        this.freeMode = false;      // Mode libre activé par défaut
        this.questionsPath = '/js/data/';  // Chemin absolu depuis la racine
        this.showResponse = true;   // Afficher la bonne réponse en cas de mauvaise réponse
        this.categoryFilter = null;  // null = toutes les catégories
        this.availableCategories = [];  // Mis à jour dynamiquement depuis l'index
        this.availableLevels = [];      // Niveaux scolaires (CM2, 6eme, 5eme...)
        this.availableSubjects = [];    // Matières (Mathématiques, Français...)
        this.isPrivate = isPrivate;
    }

    // Méthode pour mettre à jour les catégories disponibles
    setAvailableCategories(categories) {
        this.availableCategories = categories || [];
    }

    // Méthode pour mettre à jour les niveaux scolaires disponibles
    setAvailableLevels(levels) {
        this.availableLevels = levels || [];
    }

    // Méthode pour mettre à jour les matières disponibles
    setAvailableSubjects(subjects) {
        this.availableSubjects = subjects || [];
    }

    // Méthode pour mettre à jour le filtre de catégories (utile pour la version privée)
    setCategoryFilter(categories) {
        this.categoryFilter = categories;
    }
}

export const CONFIG = new AppConfig();