/**
 * Module de gestion des notifications de succès (in-app et push système)
 */

export class NotificationManager {
    constructor() {
        this.container = null;
        this.ensureContainer();
    }

    ensureContainer() {
        if (typeof document === 'undefined') return;
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'fixed top-4 right-4 sm:top-6 sm:right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4 sm:px-0';
            container.setAttribute('aria-live', 'polite');
            document.body.appendChild(container);
        }
        this.container = container;
    }

    /**
     * Affiche une notification toast de succès
     * @param {Object} options
     * @param {string} options.tag - Tag supérieur (ex: "TROPHÉE DÉBLOQUÉ !")
     * @param {string} options.title - Titre de la notification
     * @param {string} options.message - Corps du message
     * @param {string} options.iconHtml - Code HTML de l'icône
     * @param {string} options.type - 'trophy' | 'success' | 'info'
     * @param {number} options.duration - Durée en ms (défaut: 5000)
     * @param {Function} options.onClick - Action au clic
     */
    show({
        tag = 'SUCCÈS',
        title = '',
        message = '',
        iconHtml = '<i class="bi bi-star-fill text-yellow-400"></i>',
        type = 'success',
        duration = 5000,
        onClick = null
    }) {
        this.ensureContainer();
        if (!this.container) return;

        // Vibreur haptique sur mobile si disponible
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try {
                navigator.vibrate([100, 50, 100]);
            } catch (e) {
                // Ignore silent fail
            }
        }

        // Notification native du navigateur (Web Push Notification)
        this.triggerNativeNotification(title || tag, message);

        const toast = document.createElement('div');
        toast.className = 'notification-toast pointer-events-auto bg-gray-800/95 border border-primary-500/40 backdrop-blur-xl shadow-2xl rounded-2xl p-4 flex items-start gap-3.5 relative overflow-hidden transition-all duration-200 hover:border-primary-400 cursor-pointer';

        let iconBgClass = 'bg-primary-500/20 text-accent-400 border border-primary-500/30';
        let tagColorClass = 'text-accent-400';
        let progressBgClass = 'bg-gradient-to-r from-primary-500 to-accent-500';

        if (type === 'trophy') {
            iconBgClass = 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 shadow-lg shadow-yellow-500/10';
            tagColorClass = 'text-yellow-400';
            progressBgClass = 'bg-gradient-to-r from-yellow-500 to-accent-500';
        } else if (type === 'success') {
            iconBgClass = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10';
            tagColorClass = 'text-emerald-400';
            progressBgClass = 'bg-gradient-to-r from-emerald-500 to-teal-400';
        }

        toast.innerHTML = `
            <div class="flex-shrink-0 w-10 h-10 rounded-xl ${iconBgClass} flex items-center justify-center text-xl">
                ${iconHtml}
            </div>
            <div class="flex-1 min-w-0 pr-4">
                <div class="flex items-center gap-2 mb-0.5">
                    <span class="text-[10px] font-bold uppercase tracking-wider ${tagColorClass}">${tag}</span>
                </div>
                <h4 class="text-sm font-bold text-white truncate">${title}</h4>
                <p class="text-xs text-gray-300 leading-snug mt-0.5">${message}</p>
            </div>
            <button class="toast-close-btn absolute top-2.5 right-2.5 text-gray-400 hover:text-white p-1 rounded-lg transition-colors" aria-label="Fermer">
                <i class="bi bi-x text-lg"></i>
            </button>
            <div class="absolute bottom-0 inset-x-0 h-1 bg-gray-700/50">
                <div class="toast-progress h-full ${progressBgClass}" style="width: 100%;"></div>
            </div>
        `;

        this.container.appendChild(toast);

        // Déclencher l'animation de la barre de progression
        const progressBar = toast.querySelector('.toast-progress');
        if (progressBar) {
            requestAnimationFrame(() => {
                progressBar.style.transition = `width ${duration}ms linear`;
                progressBar.style.width = '0%';
            });
        }

        let isDismissed = false;
        const dismiss = () => {
            if (isDismissed) return;
            isDismissed = true;
            toast.classList.add('hiding');
            setTimeout(() => {
                toast.remove();
            }, 250);
        };

        const timeoutId = setTimeout(dismiss, duration);

        // Clic sur fermer
        const closeBtn = toast.querySelector('.toast-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                clearTimeout(timeoutId);
                dismiss();
            });
        }

        // Clic sur la notification
        toast.addEventListener('click', () => {
            clearTimeout(timeoutId);
            dismiss();
            if (onClick) onClick();
        });

        return toast;
    }

    /**
     * Déclenche une notification native du navigateur si autorisée
     */
    triggerNativeNotification(title, body) {
        if (typeof window === 'undefined' || !('Notification' in window)) return;

        if (Notification.permission === 'granted') {
            try {
                new Notification(title, {
                    body: body,
                    icon: '/images/erudizz-favicon.svg',
                    badge: '/images/erudizz-favicon.svg'
                });
            } catch (e) {
                console.warn('Native notification error:', e);
            }
        } else if (Notification.permission === 'default') {
            // Demander la permission
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    try {
                        new Notification(title, {
                            body: body,
                            icon: '/images/erudizz-favicon.svg',
                            badge: '/images/erudizz-favicon.svg'
                        });
                    } catch (e) {
                        console.warn('Native notification error:', e);
                    }
                }
            }).catch(() => {});
        }
    }

    /**
     * Notification spécifique pour un trophée débloqué
     * @param {Object} trophy - Objet trophée
     * @param {Function} onClick - Action au clic (ex: ouvrir trophées)
     */
    showTrophySuccess(trophy, onClick = null) {
        const rarityLabels = {
            'commun': 'Commun',
            'rare': 'Rare',
            'épique': 'Épique',
            'légendaire': 'Légendaire'
        };
        const rarity = rarityLabels[trophy.rarity] || 'Trophée';
        return this.show({
            tag: `Nouveau Trophée ${rarity} !`,
            title: `Trophée débloqué`,
            message: trophy.motivationUnlocked || 'Félicitations pour cette étape franchie !',
            iconHtml: '<i class="bi bi-trophy-fill text-yellow-400"></i>',
            type: 'trophy',
            duration: 6000,
            onClick
        });
    }

    /**
     * Notification spécifique pour un quiz réussi (score >= 80%)
     * @param {string} quizTitle - Titre du quiz
     * @param {number} score - Bonnes réponses
     * @param {number} percentage - Pourcentage
     */
    showQuizSuccess(quizTitle, score, percentage) {
        return this.show({
            tag: 'Quiz validé avec succès !',
            title: quizTitle || 'Félicitations !',
            message: `Score : ${percentage}% (${score} bonnes réponses). Vous assurez !`,
            iconHtml: '<i class="bi bi-check-circle-fill text-emerald-400"></i>',
            type: 'success',
            duration: 5000
        });
    }
}

export const notificationManager = new NotificationManager();
