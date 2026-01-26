// Initialisation après chargement
document.addEventListener('DOMContentLoaded', function() {
    // Préloader
    const preloader = document.querySelector('.preloader');
    
    // Simulation de chargement
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }, 1500);
    
    // Initialisation GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Animations Hero
    animateHero();
    
    // Initialisation Swiper
    initSwiper();
    
    // Galerie Lightbox
    initLightbox();
    
    // Navigation
    initNavigation();
    
    // Animations au scroll
    initScrollAnimations();
    
    // Validation formulaire
    initFormValidation();
    
    // Effets visuels
    initVisualEffects();
});

// Animations Hero avec GSAP
function animateHero() {
    const tl = gsap.timeline();
    
    tl.from('.hero-title .title-line', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out'
    })
    .from('.hero-subtitle .subtitle-line', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3')
    .from('.hero-actions', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3');
}

// Initialisation Swiper
function initSwiper() {
    const teamSwiper = new Swiper('.team-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
}

// Lightbox Galerie
function initLightbox() {
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDesc = document.querySelector('.lightbox-description');
    const lightboxCurrent = document.querySelector('.current-index');
    const lightboxTotal = document.querySelector('.total-index');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    const galleryItems = Array.from(document.querySelectorAll('.galerie-item'));
    
    // Mettre à jour le total
    lightboxTotal.textContent = galleryItems.length;
    
    // Ouvrir lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            updateLightbox();
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Fermer lightbox
    closeBtn.addEventListener('click', () => {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Navigation lightbox
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightbox();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightbox();
    });
    
    // Navigation clavier
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                lightboxModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                break;
            case 'ArrowLeft':
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightbox();
                break;
            case 'ArrowRight':
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateLightbox();
                break;
        }
    });
    
    // Mettre à jour le contenu du lightbox
    function updateLightbox() {
        const currentItem = galleryItems[currentIndex];
        const img = currentItem.querySelector('img');
        const title = currentItem.querySelector('h5');
        const desc = currentItem.querySelector('p');
        
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxTitle.textContent = title ? title.textContent : '';
        lightboxDesc.textContent = desc ? desc.textContent : '';
        lightboxCurrent.textContent = currentIndex + 1;
        
        // Animation
        gsap.from(lightboxImage, {
            scale: 0.9,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
}

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active link
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Animations au scroll
function initScrollAnimations() {
    // Animation des éléments au scroll
    const animatedElements = document.querySelectorAll('.fiche-card, .timeline-item, .team-card, .galerie-item');
    
    animatedElements.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Animation du synopsis
    gsap.from('.synopsis-visual', {
        scrollTrigger: {
            trigger: '.section-synopsis',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none none'
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });
    
    gsap.from('.synopsis-content', {
        scrollTrigger: {
            trigger: '.section-synopsis',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none none'
        },
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });
}

// Validation formulaire
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Validation nom
        if (!name.value.trim()) {
            showError(name, 'Le nom est requis');
            isValid = false;
        } else {
            clearError(name);
        }
        
        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            showError(email, 'Veuillez entrer un email valide');
            isValid = false;
        } else {
            clearError(email);
        }
        
        // Validation message
        if (!message.value.trim()) {
            showError(message, 'Le message est requis');
            isValid = false;
        } else {
            clearError(message);
        }
        
        if (isValid) {
            // Animation d'envoi
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Envoi en cours...</span>';
            submitBtn.disabled = true;
            
            // Simulation d'envoi
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Message envoyé !</span>';
                submitBtn.style.background = '#2ecc71';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        }
    });
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '5px';
    }
    
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// Effets visuels
function initVisualEffects() {
    // Effet de parallaxe sur le héros
    gsap.to('.hero-video', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Filtrage galerie
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.galerie-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const category = item.classList.contains(filter) || filter === 'all';
                
                gsap.to(item, {
                    opacity: category ? 1 : 0,
                    scale: category ? 1 : 0.8,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: function() {
                        item.style.display = category ? 'block' : 'none';
                    }
                });
            });
        });
    });
    
    // Effet de reveal sur les titres
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            title.appendChild(span);
            
            gsap.to(span, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: i * 0.05,
                ease: 'power3.out'
            });
        });
    });

    
}

// Animation et interactions pour la section Prix
document.addEventListener('DOMContentLoaded', function() {
    const prixCards = document.querySelectorAll('.prix-card');
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    // Animation au survol des cartes
    prixCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animation des statistiques
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statsNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    let current = 0;
                    const increment = target / 50;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.round(current);
                    }, 30);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.prix-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Effet parallaxe sur les images
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        document.querySelectorAll('.prix-img').forEach(img => {
            img.style.transform = `translate3d(0px, ${rate}px, 0px)`;
        });
    });
    
    // Touch support pour mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    prixCards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        card.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(this);
        });
    });
    
    function handleSwipe(card) {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe gauche - retourner la carte
            card.querySelector('.prix-card-inner').style.transform = 'rotateY(180deg)';
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe droit - remettre la carte
            card.querySelector('.prix-card-inner').style.transform = 'rotateY(0deg)';
        }
    }
    
    // Preload des images
    function preloadImages() {
        const images = document.querySelectorAll('.prix-img');
        images.forEach(img => {
            const image = new Image();
            image.src = img.src;
        });
    }
    
    // Lancer le preload
    window.addEventListener('load', preloadImages);
});

