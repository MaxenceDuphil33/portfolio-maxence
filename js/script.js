// --- 1. Gestion de la Lightbox (Galerie d'images) ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('lightbox-image')) {
        lightbox.style.display = "block";
        lightboxImg.src = e.target.src;
    }
});

closeLightbox.onclick = function() {
    lightbox.style.display = "none";
}

// Fermer la lightbox en cliquant à l'extérieur
lightbox.onclick = function(e) {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
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
};

function openPdfModal(pdfUrl, missionTitle) {
    // 1. Mise à jour du PDF
    pdfViewer.src = pdfUrl;
    
    // 2. Affichage des annexes
    annexesTitle.textContent = "Annexes de la mission : " + missionTitle;
    annexesGallery.innerHTML = ''; // Efface le contenu précédent (y compris le message)
    
    const annexes = missionAnnexes[missionTitle];
    
    if (annexes && annexes.length > 0) {
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
        noAnnexesMessage.style.display = 'none';
    } else {
        // Affiche le message "Aucune annexe"
        annexesGallery.appendChild(noAnnexesMessage);
        noAnnexesMessage.style.display = 'block';
    }

    // 3. Affichage de la modale
    pdfModal.style.display = 'block';
    document.body.classList.add('modal-open');
}

function closePdfModal() {
    pdfModal.style.display = 'none';
    pdfViewer.src = ''; // Arrête la lecture du PDF
    document.body.classList.remove('modal-open');
}

// Fermer la modale en cliquant en dehors du contenu
window.onclick = function(event) {
    if (event.target == pdfModal) {
        closePdfModal();
    }
}
