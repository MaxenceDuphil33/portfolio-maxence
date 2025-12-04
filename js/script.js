// ====================================================================
// NOUVEAU: Données des annexes pour la modale PDF/Annexes unifiée
// ====================================================================
const annexesParMission = {
    // Les clés correspondent aux noms de fichiers PDF exacts dans votre dossier 'Fiche mission/'
    'fiche_mission_sas.pdf': {
        titre: 'Stage exécutant en maintenance',
        images: [
            {src: 'Photo/PNG-JPG/Ligne production chips.png', alt: 'Lignes de production de chips', legende: 'Lignes de production de chips'},
            {src: 'Photo/PNG-JPG/Plaquette.png', alt: 'Plaquette entreprise', legende: 'Plaquette de présentation'},
            {src: 'Photo/PNG-JPG/Tableau information.png', alt: 'Tableau d\'information', legende: 'Tableau d\'information'}
        ]
    },
    'fiche_mission_portail.pdf': {
        titre: 'Réparation portail automatique',
        images: [
            {src: 'Photo/PNG-JPG/Soudure portail.jpg', alt: 'Détail de la soudure', legende: 'Détail de la réparation'},
            {src: 'Photo/PNG-JPG/Fusible.jpg', alt: 'Fusible du portail', legende: 'Fusible défectueux'},
            {src: 'Photo/PNG-JPG/Baguette.jpg', alt: 'Baguette de portail', legende: 'Baguette de guidage'}
        ]
    },
    'fiche_mission_idex.pdf': {
        titre: 'Stage IDEX',
        images: [
            {src: 'Photo/PNG-JPG/Générateur bio masse.png', alt: 'Générateur biomasse', legende: 'Générateur biomasse'},
            {src: 'Photo/PNG-JPG/Système filtration miroir d\'eau.png', alt: 'Système de filtration', legende: 'Système de filtration'},
            {src: 'Photo/PNG-JPG/Remplacement buse.png', alt: 'Remplacement des buses', legende: 'Remplacement des buses'}
        ]
    }
};

// ====================================================================
// NOUVEAU: Fonctions de gestion de la modale PDF/Annexes
// ====================================================================
function openPdfModal(pdfUrl) {
    const pdfModal = document.getElementById('pdfModal');
    
    // 1. Charger le PDF et afficher la modale
    document.getElementById('pdfViewer').src = pdfUrl;
    pdfModal.style.display = 'flex'; // Utiliser flex pour centrer
    
    // 2. Extraire le nom du fichier pour trouver les annexes
    const pathParts = pdfUrl.split('/');
    const nomFichier = pathParts[pathParts.length - 1]; // Récupère le nom du fichier
    const annexes = annexesParMission[nomFichier];
    
    // 3. Préparer la galerie d'annexes
    const gallery = document.getElementById('annexesGallery');
    gallery.innerHTML = ''; // Nettoyer la galerie précédente
    
    if (annexes) {
        document.getElementById('annexesTitle').textContent = `Annexes - ${annexes.titre}`;
        
        // Créer les éléments figure/img/figcaption pour chaque annexe
        annexes.images.forEach(img => {
            const figure = document.createElement('figure');
            figure.className = 'annex-figure';
            figure.innerHTML = `
                <img src="${img.src}" alt="${img.alt}" class="lightbox-image" data-pdf-source="${pdfUrl}">
                <figcaption>${img.legende}</figcaption>
            `;
            // IMPORTANT: Ajout de l'écouteur de clic pour la Lightbox (voir plus bas)
            figure.querySelector('.lightbox-image').onclick = function(e) {
                 e.stopPropagation();
                 openLightbox(this.src);
            };
            gallery.appendChild(figure);
        });
    } else {
        // Afficher un message si aucune annexe n'est définie
        document.getElementById('annexesTitle').textContent = 'Annexes (non disponibles)';
    }
    
    document.body.style.overflow = 'hidden';
}

function closePdfModal() {
    const pdfModal = document.getElementById('pdfModal');
    pdfModal.style.display = 'none';
    document.getElementById('pdfViewer').src = '';
    document.body.style.overflow = 'auto';
}

// ====================================================================
// Lightbox (mise à jour pour la compatibilité avec la modale PDF)
// ====================================================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

// Fonction pour ouvrir la lightbox
function openLightbox(imgSrc) {
    // Si la modale PDF est ouverte, il faut la masquer en arrière-plan
    const pdfModal = document.getElementById('pdfModal');
    if (pdfModal && pdfModal.style.display === 'flex') {
        pdfModal.style.visibility = 'hidden'; // On la masque sans la fermer
    }
    
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden';
}

// Fonction pour fermer la lightbox
function closeLightboxFunc() {
    lightbox.classList.remove('show');
    
    // Réafficher la modale PDF si elle était ouverte
    const pdfModal = document.getElementById('pdfModal');
    if (pdfModal) {
        pdfModal.style.visibility = 'visible';
    }
    
    setTimeout(() => {
        lightbox.style.display = 'none';
        
        // On remet le défilement du body uniquement si la modale PDF est également fermée
        if (!pdfModal || pdfModal.style.display !== 'flex') {
            document.body.style.overflow = '';
        }

        // Le défilement jusqu'à la section annexes n'est plus pertinent ici
        // car la lightbox est déclenchée DANS la section annexe de la modale.

    }, 300); // Correspond à la durée de la transition CSS
}


document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================================================
    // Gestion des modales existantes (Serre et TRR)
    // ====================================================================
    
    // Gestion de la fenêtre modale de la serre autonome
    const serreProject = document.querySelector('.project-card[style*="Serre.jpg"]');
    const serreOverlay = document.getElementById('serre-detail');
    const closeSerreDetail = serreOverlay ? serreOverlay.querySelector('.close-detail') : null;

    if (serreProject && serreOverlay) {
        serreProject.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (e.target.tagName === 'A') {
                return;
            }
            serreOverlay.style.display = 'block';
            setTimeout(() => {
                serreOverlay.style.opacity = '1';
                document.body.style.overflow = 'hidden';
            }, 10);
        });

        if (closeSerreDetail) {
            closeSerreDetail.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                serreOverlay.style.opacity = '0';
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    serreOverlay.style.display = 'none';
                }, 300);
            });
        }

        serreOverlay.addEventListener('click', function(e) {
            if (e.target === serreOverlay) {
                serreOverlay.style.opacity = '0';
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    serreOverlay.style.display = 'none';
                }, 300);
            }
        });
    }

    // Gestion de la fenêtre modale du projet TRR
    const trrProject = document.querySelector('.project-card.view-trr-detail');
    const trrOverlay = document.getElementById('trr-detail-overlay');
    const closeTrrDetail = document.querySelector('.close-trr-detail');

    if (trrProject && trrOverlay) {
        trrProject.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (e.target.closest('.btn')) {
                return;
            }
            trrOverlay.style.display = 'block';
            setTimeout(() => {
                trrOverlay.style.opacity = '1';
                document.body.style.overflow = 'hidden';
            }, 10);
        });

        closeTrrDetail.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            trrOverlay.style.opacity = '0';
            document.body.style.overflow = 'auto';
            setTimeout(() => {
                trrOverlay.style.display = 'none';
            }, 300);
        });

        trrOverlay.addEventListener('click', function(e) {
            if (e.target === trrOverlay) {
                trrOverlay.style.opacity = '0';
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    trrOverlay.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // ====================================================================
    // NOUVEAU: Gestion du clic en dehors des modales (Serre, TRR, PDF)
    // ====================================================================
    window.onclick = function(event) {
        const pdfModal = document.getElementById('pdfModal');
        const serreOverlay = document.getElementById('serre-detail');
        const trrOverlay = document.getElementById('trr-detail-overlay');
        
        if (event.target === pdfModal) {
            closePdfModal();
        } else if (serreOverlay && event.target === serreOverlay) {
            // Logique déjà gérée par l'écouteur du DOMContentLoaded
        } else if (trrOverlay && event.target === trrOverlay) {
            // Logique déjà gérée par l'écouteur du DOMContentLoaded
        }
    };
    
    // ====================================================================
    // NOUVEAU: Gestion de la touche Échap (pour toutes les modales)
    // ====================================================================
    document.addEventListener('keydown', function(e) {
        const pdfModal = document.getElementById('pdfModal');
        const serreOverlay = document.getElementById('serre-detail');
        const trrOverlay = document.getElementById('trr-detail-overlay');
        
        if (e.key === 'Escape') {
            if (lightbox.style.display === 'flex') {
                closeLightboxFunc(); // Ferme la lightbox en priorité
            } else if (pdfModal && pdfModal.style.display === 'flex') {
                closePdfModal();
            } else if (serreOverlay && serreOverlay.style.display === 'block') {
                serreOverlay.style.opacity = '0';
                document.body.style.overflow = 'auto';
                setTimeout(() => { serreOverlay.style.display = 'none'; }, 300);
            } else if (trrOverlay && trrOverlay.style.display === 'block') {
                trrOverlay.style.opacity = '0';
                document.body.style.overflow = 'auto';
                setTimeout(() => { trrOverlay.style.display = 'none'; }, 300);
            }
        }
    });


    // Gestion du diaporama d'arrière-plan (code existant)
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000;
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        setInterval(nextSlide, slideInterval);
    }

    // Gestion de l'affichage des descriptions de mission (code existant)
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.tagName === 'IMG') {
                return;
            }
            const title = this.querySelector('h3');
            const description = this.querySelector('.mission-description');
            if (description) {
                title.classList.toggle('active');
                description.classList.toggle('visible');
                if (description.classList.contains('visible')) {
                    description.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });

    // Gestion de la lightbox (fermeture)
    closeLightbox.onclick = closeLightboxFunc;
    
    // Fermeture en cliquant en dehors de l'image
    lightbox.onclick = function(e) {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    };
    
    // Fermeture avec la touche Échap est désormais gérée dans le gestionnaire 'keydown' plus haut.
    
    // Ajout des écouteurs aux images des fiches mission et des annexes
    // NOTE: L'écouteur pour les images dans la modale PDF est désormais dans la fonction openPdfModal
    document.querySelectorAll('.mission-gallery img').forEach(img => {
        img.style.cursor = 'pointer';
        img.onclick = function(e) {
            e.stopPropagation();
            openLightbox(this.src);
        };
    });
    
    // Navigation mobile (code existant)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    
    // Toggle menu mobile
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fermer le menu mobile après le clic sur un lien
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Changement de style de la navbar au scroll (code existant)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animation au défilement (code existant)
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in, .skill-card, .project-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Gestion du formulaire de contact (code existant)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            const mailtoLink = `mailto:votre@email.com?subject=${encodeURIComponent(subject)}&body=Nom: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0A${encodeURIComponent(message)}`;
            window.location.href = mailtoLink;
            
            contactForm.reset();
            
            alert('Merci pour votre message ! Je vous répondrai dès que possible.');
        });
    }
    
    // Animation des barres de compétences au défilement (code existant)
    const animateSkills = () => {
        const skills = document.querySelectorAll('.progress-bar');
        skills.forEach(skill => {
            const width = skill.style.width;
            skill.style.width = '0';
            setTimeout(() => {
                skill.style.width = width;
            }, 100);
        });
    };
    
    // Gestion du défilement fluide pour les liens de navigation (code existant)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Détection de la section active pour la mise en surbrillance du menu (code existant)
    const sections = document.querySelectorAll('section');
    
    const highlightMenu = () => {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    };
    
    // Événements (code existant)
    window.addEventListener('scroll', () => {
        animateOnScroll();
        highlightMenu();
    });
    
    // Initialisation (code existant)
    animateOnScroll();
    
    // Démarrer l'animation des compétences lorsque la section est visible (code existant)
    const skillsSection = document.querySelector('.skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Slideshow d'arrière-plan pour la section héros (code existant)
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroImages = [
            'Photo/Facade.jpg',
            'Photo/entrepo.jpg'
        ];
        const slides = [];
        heroImages.forEach(src => {
            const slide = document.createElement('div');
            slide.className = 'bg-slide';
            slide.style.backgroundImage = `url('${src}')`;
            hero.insertBefore(slide, hero.firstChild);
            slides.push(slide);
        });
        let current = 0;
        if (slides.length) {
            slides.forEach((s, i) => {
                if (i === 0) s.classList.add('active');
            });
            const fadeNext = () => {
                const prev = slides[current];
                const nextIndex = (current + 1) % slides.length;
                const next = slides[nextIndex];
                next.classList.add('active');
                setTimeout(() => {
                    prev.classList.remove('active');
                }, 200);
                current = nextIndex;
            };
            setInterval(fadeNext, 10000);
        }
    }
    
    // Interaction des fiches mission et projets (code existant avec FLIP)
    // Pas de changement nécessaire dans cette logique FLIP.
    const missionsSection = document.getElementById('missions');
    const projetsSection = document.getElementById('projets');
    
    // Helper: FLIP animation (code existant)
    const flip = (elements, mutate) => {
        const first = new Map();
        elements.forEach(el => { first.set(el, el.getBoundingClientRect()); });
        mutate();
        elements.forEach(el => {
            const last = el.getBoundingClientRect();
            const f = first.get(el);
            const dx = f.left - last.left;
            const dy = f.top - last.top;
            el.style.transform = `translate(${dx}px, ${dy}px)`;
        });
        requestAnimationFrame(() => {
            elements.forEach(el => {
                el.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
                el.style.transform = '';
            });
            const onEnd = () => {
                elements.forEach(el => {
                    el.style.transition = '';
                    el.removeEventListener('transitionend', onEnd);
                });
            };
            elements[0]?.addEventListener('transitionend', onEnd);
        });
    };
    
    // Gérer le clic sur les cartes Mission
    if (missionsSection) {
        const missionCards = missionsSection.querySelectorAll('.project-card');
        const grid = missionsSection.querySelector('.projects-grid');
        const missionLinks = missionsSection.querySelectorAll('a');
        
        missionLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
            });
        });
        
        missionCards.forEach(card => {
            card.addEventListener('click', () => {
                const isActive = card.classList.contains('active');
                const allCards = Array.from(missionCards);
                
                flip(allCards, () => {
                    if (isActive) {
                        grid?.classList.remove('has-active');
                        allCards.forEach(c => c.classList.remove('active', 'shrink'));
                    } else {
                        grid?.classList.add('has-active');
                        allCards.forEach(c => c.classList.remove('active', 'shrink'));
                        card.classList.add('active');
                        allCards.forEach(c => { if (c !== card) c.classList.add('shrink'); });
                    }
                });
                
                if (!isActive) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        });
    }
    
    // Interaction des projets: comportement identique aux fiches mission
    if (projetsSection) {
        const projectCards = projetsSection.querySelectorAll('.project-card');
        const gridProj = projetsSection.querySelector('.projects-grid');
        const projLinks = projetsSection.querySelectorAll('a');
        
        projLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
            });
        });
        
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const isActive = card.classList.contains('active');
                const allProj = Array.from(projectCards);
                
                flip(allProj, () => {
                    if (isActive) {
                        gridProj?.classList.remove('has-active');
                        allProj.forEach(c => c.classList.remove('active', 'shrink'));
                    } else {
                        gridProj?.classList.add('has-active');
                        allProj.forEach(c => c.classList.remove('active', 'shrink'));
                        card.classList.add('active');
                        allProj.forEach(c => { if (c !== card) c.classList.add('shrink'); });
                    }
                });
                
                if (!isActive) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        });
    }
    
    // Ajout d'une animation de chargement de page (code existant)
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
});

// Ajout d'un effet de parallaxe pour la section héros (code existant)
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.backgroundPositionY = rate + 'px';
    }
});

// Ajout d'un bouton de retour en haut de page (code existant)
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

// Style du bouton de retour en haut (code existant)
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        background: var(--secondary-color);
        transform: translateY(-3px);
    }
`;
document.head.appendChild(style);

// Afficher/masquer le bouton de retour en haut (code existant)
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Faire défiler vers le haut lors du clic sur le bouton (code existant)
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
