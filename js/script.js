// --- 1. Gestion de la Lightbox (Galerie d'images) ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

document.addEventListener('click', function(e) {
    // Condition pour ouvrir la Lightbox
    if (e.target.classList.contains('lightbox-image')) {
        // Ajout de la classe 'show' pour la transition CSS
        lightbox.classList.add('show');
        lightbox.style.display = "flex"; // Nécessaire si 'display: none' est utilisé dans le CSS
        lightboxImg.src = e.target.src;
    }
});

// Fermer la lightbox via le bouton X
closeLightbox.onclick = function() {
    lightbox.classList.remove('show');
    // Délai pour que l'animation CSS finisse avant de cacher
    setTimeout(() => {
        lightbox.style.display = "none";
    }, 300); 
}

// Fermer la lightbox en cliquant à l'extérieur
lightbox.onclick = function(e) {
    if (e.target === lightbox) {
        lightbox.classList.remove('show');
        setTimeout(() => {
            lightbox.style.display = "none";
        }, 300);
    }
}

// --- 2. Gestion de la Modale PDF/Annexes ---
const pdfModal = document.getElementById('pdfModal');
const pdfViewer = document.getElementById('pdfViewer');
const annexesGallery = document.getElementById('annexesGallery');
const annexesTitle = document.getElementById('annexesTitle');
const noAnnexesMessage = document.getElementById('noAnnexesMessage');

// Mappage des fiches mission aux annexes correspondantes
const missionAnnexes = {
    // Le titre doit correspondre exactement au titre cliqué
    "Stage exécutant en maintenance": [
        { src: "Photo/PNG-JPG/Ligne production chips.png", caption: "Lignes de production de chips" },
        { src: "Photo/PNG-JPG/Plaquette.png", caption: "Plaquette de présentation" },
        { src: "Photo/PNG-JPG/Tableau information.png", caption: "Tableau d'information" }
    ],
    // Réparation portail automatique
    "Réparation portail automatique": [
        { src: "Photo/PNG-JPG/Soudure portail.jpg", caption: "Détail de la réparation" },
        { src: "Photo/PNG-JPG/Fusible.jpg", caption: "Fusible défectueux" },
        { src: "Photo/PNG-JPG/Baguette.jpg", caption: "Baguette de guidage" }
    ],
    // Stage IDEX
    "Stage IDEX": [
        { src: "Photo/PNG-JPG/Générateur bio masse.png", caption: "Générateur biomasse" },
        { src: "Photo/PNG-JPG/Système filtration miroir d'eau.png", caption: "Système de filtration" },
        { src: "Photo/PNG-JPG/Remplacement buse.png", caption: "Remplacement des buses" }
    ],
    // Ajout d'une mission sans annexe pour tester le message
    "Projet non documenté": [],
};

/**
 * Ouvre la modale PDF et charge le contenu des annexes.
 * @param {string} pdfUrl - URL du fichier PDF à charger.
 * @param {string} missionTitle - Titre de la mission pour les annexes.
 */
function openPdfModal(pdfUrl, missionTitle) {
    // 1. Mise à jour du PDF
    pdfViewer.src = pdfUrl;
    
    // 2. Affichage des annexes
    annexesTitle.textContent = "Annexes de la mission : " + missionTitle;
    annexesGallery.innerHTML = ''; // Efface le contenu précédent
    
    const annexes = missionAnnexes[missionTitle] || []; // S'assure d'avoir un tableau même si le titre n'existe pas
    
    if (annexes.length > 0) {
        // Crée les vignettes d'annexes
        annexes.forEach(annex => {
            const figure = document.createElement('figure');
            figure.classList.add('annex-figure');
            
            figure.innerHTML = `
                <img src="${annex.src}" alt="${annex.caption}" class="lightbox-image">
                <figcaption>${annex.caption}</figcaption>
            `;
            annexesGallery.appendChild(figure);
        });
        // Assure que le message "Aucune annexe" est bien caché
        if (noAnnexesMessage) {
             noAnnexesMessage.style.display = 'none';
        }
    } else {
        // Affiche le message "Aucune annexe"
        if (noAnnexesMessage) {
            annexesGallery.appendChild(noAnnexesMessage);
            noAnnexesMessage.style.display = 'block';
        }
    }

    // 3. Affichage de la modale (avec la classe CSS pour bloquer le défilement du body)
    pdfModal.style.display = 'block';
    document.body.classList.add('modal-open');
}

/**
 * Ferme la modale PDF.
 */
function closePdfModal() {
    pdfModal.style.display = 'none';
    pdfViewer.src = ''; // Arrête la lecture du PDF
    document.body.classList.remove('modal-open');
}

// Attach the close function to the close button inside the modal
const pdfCloseButton = document.querySelector('.pdf-close');
if (pdfCloseButton) {
    pdfCloseButton.onclick = closePdfModal;
}


// --- 3. Gestion de l'ouverture de la Modale via les boutons ---

// Écouteur global pour gérer les clics sur les boutons de mission
document.addEventListener('click', function(e) {
    const target = e.target;

    // Vérifie si le clic est sur le bouton "Voir la mission"
    if (target.classList.contains('btn-view-mission')) {
        e.preventDefault(); // Empêche l'action par défaut si c'est un lien
        
        // Récupère l'URL du PDF et le titre de la mission à partir des attributs data
        const pdfUrl = target.getAttribute('data-pdf-url');
        const missionTitle = target.getAttribute('data-mission-title');

        if (pdfUrl && missionTitle) {
            openPdfModal(pdfUrl, missionTitle);
        } else {
            console.error("Informations PDF manquantes sur le bouton.");
        }
    }
});


// Fermer la modale en cliquant en dehors du contenu
window.onclick = function(event) {
    if (event.target == pdfModal) {
        closePdfModal();
    }
}
