/**
 * Module de partage des résultats
 * Gère le partage natif (Web Share API) et les options de repli (WhatsApp, copie presse-papier)
 */

/**
 * Affiche un toast d'information temporaire
 * @param {string} message - Message à afficher
 * @param {'success'|'info'|'warning'} type - Type du toast
 */
export function showToast(message, type = 'success') {
    // Supprimer tout toast existant
    const existing = document.getElementById('camiludik-toast');
    if (existing) {
        existing.remove();
    }

    const toast = document.createElement('div');
    toast.id = 'camiludik-toast';
    toast.className = 'camiludik-toast';

    const icon = type === 'success' ? 'bi-check-circle-fill text-green-500' :
                 type === 'warning' ? 'bi-exclamation-triangle-fill text-yellow-500' :
                 'bi-info-circle-fill text-primary-500';

    toast.innerHTML = `
        <div class="camiludik-toast-content">
            <i class="bi ${icon} text-xl flex-shrink-0"></i>
            <span class="text-sm font-semibold">${message}</span>
        </div>
    `;

    document.body.appendChild(toast);

    // Déclencher l'animation d'apparition
    requestAnimationFrame(() => {
        toast.classList.add('camiludik-toast-show');
    });

    // Disparition automatique après 3.5 secondes
    setTimeout(() => {
        toast.classList.remove('camiludik-toast-show');
        toast.classList.add('camiludik-toast-hide');
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

/**
 * Génère le texte formaté pour le partage
 * @param {Object} data - Données du résultat
 * @returns {string} - Texte formaté pour le partage
 */
export function generateShareText({ title, score, totalQuestions, percentage, pointsEarned }) {
    let emoji = '🎯';
    if (percentage === 100) emoji = '🏆';
    else if (percentage >= 80) emoji = '⭐';
    else if (percentage >= 50) emoji = '👍';

    const scoreLine = totalQuestions !== undefined
        ? `${percentage}% (${score}/${totalQuestions})`
        : `${percentage}%`;

    const pointsLine = pointsEarned ? ` (+${pointsEarned} pts)` : '';

    return `${emoji} J'ai obtenu ${scoreLine}${pointsLine} au quiz "${title}" sur CamiLudik ! 🎉\nPeux-tu faire mieux ? Teste tes connaissances ici :`;
}

/**
 * Ouvre une modale de repli de partage si l'API native n'est pas supportée
 * @param {string} shareText - Texte à partager
 * @param {string} shareUrl - URL à partager
 */
export function openShareFallbackModal(shareText, shareUrl) {
    const existing = document.getElementById('share-fallback-modal');
    if (existing) existing.remove();

    const fullMessage = `${shareText} ${shareUrl}`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;

    const modal = document.createElement('div');
    modal.id = 'share-fallback-modal';
    modal.className = 'feedback-modal-overlay';
    modal.style.zIndex = '10000';

    modal.innerHTML = `
        <div class="feedback-modal-content max-w-sm sm:max-w-md p-6 text-left" style="background:#fbf3ea;border:2px solid #66bcb4;border-radius:1.25rem;">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold flex items-center gap-2" style="color:#7c4004;font-family:'Baloo 2',sans-serif">
                    <i class="bi bi-share-fill text-primary-500"></i> Partager mon score
                </h3>
                <button id="close-share-modal" class="text-gray-400 hover:text-gray-600 p-1 text-xl leading-none">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>

            <p class="text-sm mb-4" style="color:#6b3603">
                Partage ton résultat avec tes amis par message ou sur les réseaux !
            </p>

            <!-- Aperçu du message -->
            <div class="p-3 rounded-xl mb-4 text-xs font-medium border" style="background:#f4eadd;border-color:#dcc9b0;color:#7c4004;white-space:pre-wrap;">
${shareText}
${shareUrl}
            </div>

            <!-- Actions de partage -->
            <div class="space-y-2">
                <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-base w-full justify-center py-2.5 font-bold" style="background-color:#25D366;color:white;box-shadow:0 2px 6px rgba(37,211,102,0.35);">
                    <i class="bi bi-whatsapp text-lg"></i> Partager sur WhatsApp
                </a>

                <button id="btn-copy-share-text" class="btn-base btn-primary w-full justify-center py-2.5">
                    <i class="bi bi-clipboard-check"></i> Copier le message
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Fermeture de la modale
    const closeModal = () => modal.remove();
    modal.querySelector('#close-share-modal')?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Copie dans le presse-papier
    modal.querySelector('#btn-copy-share-text')?.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(fullMessage);
            closeModal();
            showToast('Message copié dans le presse-papier !', 'success');
        } catch (err) {
            console.error('Erreur lors de la copie :', err);
            showToast('Impossible de copier automatiquement. Veuillez sélectionner le texte.', 'warning');
        }
    });
}

/**
 * Partage les résultats d'un quiz
 * Utilise l'API de partage native (Web Share API) sur mobile ou la modale de repli
 * @param {Object} options
 * @param {string} options.title - Titre du quiz
 * @param {number} options.score - Score obtenu
 * @param {number} options.totalQuestions - Nombre total de questions
 * @param {number} options.percentage - Pourcentage de réussite
 * @param {number} [options.pointsEarned] - Points gagnés
 * @returns {Promise<boolean>} - Succès ou non
 */
export async function shareQuizResult({ title, score, totalQuestions, percentage, pointsEarned }) {
    const shareText = generateShareText({
        title: title || 'Quiz',
        score: score !== undefined ? score : 0,
        totalQuestions: totalQuestions !== undefined ? totalQuestions : 0,
        percentage: percentage !== undefined ? percentage : 0,
        pointsEarned
    });

    const shareUrl = window.location.origin && window.location.origin !== 'null' && !window.location.origin.startsWith('file:')
        ? window.location.origin
        : 'https://job-ez.vercel.app';

    // 1. Vérifier si l'API native Web Share est supportée (mobile : WhatsApp, Messages, etc.)
    if (navigator.share) {
        try {
            await navigator.share({
                title: `CamiLudik - ${title || 'Quiz'}`,
                text: `${shareText}\n`,
                url: shareUrl
            });
            console.log('✅ Partage natif réussi');
            return true;
        } catch (error) {
            // Si l'utilisateur a annulé le partage (AbortError), ne pas afficher d'erreur
            if (error.name === 'AbortError') {
                console.log('ℹ️ Partage annulé par l\'utilisateur');
                return false;
            }
            console.warn('⚠️ Échec du partage natif, bascule vers la modale de repli:', error);
        }
    }

    // 2. Repli : Ouvrir la modale avec WhatsApp et Copier
    openShareFallbackModal(shareText, shareUrl);
    return true;
}
