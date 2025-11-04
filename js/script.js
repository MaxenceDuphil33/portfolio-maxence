document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la fenêtre modale de la serre autonome
    const serreProject = document.querySelector('.project-card[style*="Serre.jpg"]');
    const serreOverlay = document.getElementById('serre-detail');
    const closeSerreDetail = serreOverlay ? serreOverlay.querySelector('.close-detail') : null;

    if (serreProject && serreOverlay) {
        // Ouvrir la modal au clic sur le projet Serre Autonome
        serreProject.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Empêcher l'ouverture si on clique sur un lien
            if (e.target.tagName === 'A') {
                return;
            }
            
            // Afficher l'overlay avec animation
            serreOverlay.style.display = 'block';
            setTimeout(() => {
                serreOverlay.style.opacity = '1';
                document.body.style.overflow = 'hidden';
            }, 10);
        });

        // Fermer la modal avec le bouton
        if (closeSerreDetail) {
            closeSerreDetail.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Masquer l'overlay avec animation
                serreOverlay.style.opacity = '0';
                document.body.style.overflow = 'auto';
                
                setTimeout(() => {
                    serreOverlay.style.display = 'none';
                }, 300);
            });
        }

        // Fermer en cliquant en dehors du contenu
        serreOverlay.addEventListener('click', function(e) {
            if (e.target === serreOverlay) {
                serreOverlay.style.opacity = '0';
                document.body.style.overflow = 'auto';
                
                setTimeout(() => {
                    serreOverlay.style.display = 'none';
                }, 300);
            }
        });

        // Fermer avec la touche Échap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && serreOverlay.style.display === 'block') {
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
        // Ouvrir la modal au clic sur le projet TRR
        trrProject.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Empêcher l'ouverture si on clique sur le bouton
            if (e.target.closest('.btn')) {
                return;
            }
            
            // Afficher l'overlay avec animation
            trrOverlay.style.display = 'block';
            setTimeout(() => {
                trrOverlay.style.opacity = '1';
                document.body.style.overflow = 'hidden';
            }, 10);
        });

        // Fermer la modal avec le bouton
        closeTrrDetail.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Masquer l'overlay avec animation
            trrOverlay.style.opacity = '0';
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                trrOverlay.style.display = 'none';
            }, 300);
        });

        // Fermer en cliquant en dehors du contenu
        trrOverlay.addEventListener('click', function(e) {
            if (e.target === trrOverlay) {
                trrOverlay.style.opacity = '0';
                document.body.style.overflow = 'auto';
                
                setTimeout(() => {
                    trrOverlay.style.display = 'none';
                }, 300);
            }
        });

        // Fermer avec la touche Échap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && trrOverlay.style.display === 'block') {
                trrOverlay.style.opacity = '0';
                document.body.style.overflow = 'auto';
                
                setTimeout(() => {
                    trrOverlay.style.display = 'none';
                }, 300);
            }
        });
    }
    // Gestion du diaporama d'arrière-plan
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000; // Change d'image toutes les 5 secondes

        function nextSlide() {
            // Masque la diapositive actuelle
            slides[currentSlide].classList.remove('active');
            
            // Passe à la diapositive suivante
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Affiche la nouvelle diapositive
            slides[currentSlide].classList.add('active');
        }

        // Démarre le diaporama
        setInterval(nextSlide, slideInterval);
    }

    // Gestion de l'affichage des descriptions de mission
    // Gestion de l'affichage des descriptions de mission
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Ne pas déclencher si on clique sur un lien ou une image
            if (e.target.tagName === 'A' || e.target.tagName === 'IMG') {
                return;
            }
            
            const title = this.querySelector('h3');
            const description = this.querySelector('.mission-description');
            
            if (description) {
                title.classList.toggle('active');
                description.classList.toggle('visible');
                
                // Faire défiler jusqu'à la description si on l'ouvre
                if (description.classList.contains('visible')) {
                    description.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });

    // Gestion de la lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // Fonction pour ouvrir la lightbox
    function openLightbox(imgSrc) {
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'flex';
        // Forcer le navigateur à appliquer le style avant d'ajouter la classe
        setTimeout(() => {
            lightbox.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
    
    // Fonction pour fermer la lightbox
    function closeLightboxFunc() {
        lightbox.classList.remove('show');
        // Attendre la fin de l'animation avant de cacher la lightbox
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
            // Faire défiler jusqu'à la section des annexes
            const annexesSection = document.getElementById('annexes');
            if (annexesSection) {
                annexesSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300); // Correspond à la durée de la transition CSS
    }
    
    // Gestion du clic sur la croix
    closeLightbox.onclick = closeLightboxFunc;
    
    // Fermeture en cliquant en dehors de l'image
    lightbox.onclick = function(e) {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    };
    
    // Gestion de la touche Échap
    document.onkeydown = function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightboxFunc();
        }
    };
    
    // Fermeture en cliquant en dehors de l'image
    lightbox.onclick = function(e) {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    };
    
    // Ajout des écouteurs aux images des fiches mission et des annexes
    document.querySelectorAll('.mission-gallery img, .annex-gallery .lightbox-image').forEach(img => {
        img.style.cursor = 'pointer';
        img.onclick = function(e) {
            e.stopPropagation(); // Empêche la propagation du clic aux éléments parents
            openLightbox(this.src);
        };
    });
    
    // Navigation mobile
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
    
    // Changement de style de la navbar au scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animation au défilement
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
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Ici, vous pouvez ajouter le code pour envoyer les données à un serveur
            // Par exemple, en utilisant fetch() ou en redirigeant vers une URL mailto:
            const mailtoLink = `mailto:votre@email.com?subject=${encodeURIComponent(subject)}&body=Nom: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0A${encodeURIComponent(message)}`;
            window.location.href = mailtoLink;
            
            // Réinitialisation du formulaire
            contactForm.reset();
            
            // Message de confirmation
            alert('Merci pour votre message ! Je vous répondrai dès que possible.');
        });
    }
    
    // Animation des barres de compétences au défilement
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
    
    // Gestion du défilement fluide pour les liens de navigation
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
    
    // Détection de la section active pour la mise en surbrillance du menu
    const sections = document.querySelectorAll('section');
    
    const highlightMenu = () => {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-links a[href*=${sectionId}]`).classList.add('active');
            } else {
                const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
                if (navLink) navLink.classList.remove('active');
            }
        });
    };
    
    // Événements
    window.addEventListener('scroll', () => {
        animateOnScroll();
        highlightMenu();
    });
    
    // Initialisation
    animateOnScroll();
    
    // Démarrer l'animation des compétences lorsque la section est visible
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
    
    // Slideshow d'arrière-plan pour la section héros
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
    
    // Interaction des fiches mission: agrandir la carte cliquée et réduire les autres
    const missionsSection = document.getElementById('missions');
    if (missionsSection) {
        const missionCards = missionsSection.querySelectorAll('.project-card');
        const grid = missionsSection.querySelector('.projects-grid');
        const missionLinks = missionsSection.querySelectorAll('a');
        
        // Empêcher la navigation des liens dans la section missions
        missionLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
            });
        });
        
        // Helper: FLIP animation
        const flip = (elements, mutate) => {
            const first = new Map();
            elements.forEach(el => {
                first.set(el, el.getBoundingClientRect());
            });
            // Mutation that changes layout
            mutate();
            // Measure last and invert
            elements.forEach(el => {
                const last = el.getBoundingClientRect();
                const f = first.get(el);
                const dx = f.left - last.left;
                const dy = f.top - last.top;
                // Invert
                el.style.transform = `translate(${dx}px, ${dy}px)`;
            });
            // Play
            requestAnimationFrame(() => {
                elements.forEach(el => {
                    el.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
                    el.style.transform = '';
                });
                // Cleanup after transition
                const onEnd = () => {
                    elements.forEach(el => {
                        el.style.transition = '';
                        el.removeEventListener('transitionend', onEnd);
                    });
                };
                elements[0]?.addEventListener('transitionend', onEnd);
            });
        };
        
        // Gérer le clic sur les cartes
        missionCards.forEach(card => {
            card.addEventListener('click', () => {
                const isActive = card.classList.contains('active');
                const allCards = Array.from(missionCards);
                
                flip(allCards, () => {
                    // Toggle classes with grid state
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
    const projetsSection = document.getElementById('projets');
    if (projetsSection) {
        const projectCards = projetsSection.querySelectorAll('.project-card');
        const gridProj = projetsSection.querySelector('.projects-grid');
        const projLinks = projetsSection.querySelectorAll('a');
        
        // Empêcher la navigation des liens dans la section projets
        projLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
            });
        });
        
        // Helper FLIP
        const flipProj = (elements, mutate) => {
            const first = new Map();
            elements.forEach(el => first.set(el, el.getBoundingClientRect()));
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
                const cleanup = () => {
                    elements.forEach(el => {
                        el.style.transition = '';
                        el.removeEventListener('transitionend', cleanup);
                    });
                };
                elements[0]?.addEventListener('transitionend', cleanup);
            });
        };
        
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const isActive = card.classList.contains('active');
                const allProj = Array.from(projectCards);
                
                flipProj(allProj, () => {
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
    
    // Ajout d'une animation de chargement de page
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
});

// Ajout d'un effet de parallaxe pour la section héros
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.backgroundPositionY = rate + 'px';
    }
});

// Ajout d'un bouton de retour en haut de page
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

// Style du bouton de retour en haut
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

// Afficher/masquer le bouton de retour en haut
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Faire défiler vers le haut lors du clic sur le bouton
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
