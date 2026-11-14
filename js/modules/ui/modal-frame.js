/**
 * Cadre commun des grandes fenêtres (carte agrandie et Atelier Avatar) :
 * même panneau, même en-tête, mêmes onglets Carte / Atelier, pour que la bascule de l'une à l'autre paraisse une seule fenêtre.
 */

// ANCHOR Classes du panneau partagées par les deux fenêtres (les tailles responsive sont dans styles/main.css, section Fenêtres plein écran)
export const MODAL_PANEL_CLASSES = 'modal-panel relative bg-gradient-to-b from-primary-900 via-primary-800 to-amber-950 text-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[94vh] transition-all duration-300 transform opacity-0 scale-95 translate-y-4';
export const MODAL_BACKDROP_HTML = '<div class="modal-backdrop fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300 opacity-0"></div>';

/**
 * En-tête commun : icône, titre, onglets Carte / Atelier et bouton de fermeture
 * @param {object} o
 * @param {'map'|'atelier'} o.active - onglet actif
 * @param {string} o.icon - classe bootstrap-icons
 * @param {string} o.title
 * @param {string} o.badge
 * @param {string} o.subtitle
 * @param {string} o.closeAttrs - attributs du bouton de fermeture (id ou class)
 */
export function modalHeaderHTML({ active, icon, title, badge, subtitle, closeAttrs }) {
    const tab = (id, label, ico) => {
        const on = id === active;
        return `<button type="button" data-modal-tab="${id}" ${on ? 'aria-current="page"' : ''} class="modal-tab px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${on ? 'bg-accent-500 text-white shadow cursor-default' : 'text-white/80 hover:text-white hover:bg-white/10 cursor-pointer'}"><i class="bi ${ico}"></i><span>${label}</span></button>`;
    };
    return `
        <div class="modal-header px-4 py-2.5 sm:px-5 sm:py-3 border-b border-white/15 flex items-center justify-between gap-3 bg-white/5">
            <div class="flex items-center gap-3 min-w-0">
                <span class="w-8 h-8 flex-shrink-0 rounded-xl bg-gradient-to-tr from-accent-500 to-amber-400 flex items-center justify-center text-white text-base shadow-md">
                    <i class="bi ${icon}"></i>
                </span>
                <div class="min-w-0">
                    <h2 class="text-base sm:text-lg font-black text-white flex items-center gap-2 leading-tight">
                        <span class="truncate">${title}</span>
                        <span class="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-accent-500/30 text-accent-300 border border-accent-400/40">${badge}</span>
                    </h2>
                    <p class="hidden md:block text-[11px] text-white/70">${subtitle}</p>
                </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
                <div class="flex items-center gap-0.5 bg-white/10 p-0.5 rounded-xl border border-white/10" role="tablist">
                    ${tab('map', 'Carte', 'bi-map-fill')}
                    ${tab('atelier', 'Atelier', 'bi-palette-fill')}
                </div>
                <button ${closeAttrs} class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition cursor-pointer" title="Fermer" aria-label="Fermer">
                    <i class="bi bi-x-lg text-lg"></i>
                </button>
            </div>
        </div>`;
}
