// ===== MAIN JAVASCRIPT FILE =====

// DOM Elements
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ===== LOADER =====
window.addEventListener('load', () => {
    // Attendre que toutes les ressources soient chargées
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'visible';
        initAnimations();
    }, 1000); // Réduit à 1 seconde
});

// Fallback si le loader reste trop longtemps
setTimeout(() => {
    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        document.body.style.overflow = 'visible';
        initAnimations();
    }
}, 3000); // Fallback après 3 secondes maximum

// ===== NAVIGATION =====
let lastScrollY = window.scrollY;
let ticking = false;

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // Close mobile menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Navbar scroll effects
function updateNavbar() {
    const currentScrollY = window.scrollY;

    // Add scrolled class
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

function requestNavbarUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}

window.addEventListener('scroll', requestNavbarUpdate);

// ===== ACTIVE NAVIGATION LINK =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            // Special handling for stagger animations
            if (entry.target.classList.contains('services-grid')) {
                const serviceCards = entry.target.querySelectorAll('.service-card');
                serviceCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 200);
                });
            }

            // Counter animation for stats
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
function initAnimations() {
    const animatedElements = document.querySelectorAll(
        '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .rotate-in, .services-grid, .stat-number'
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== COUNTER ANIMATION =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ===== PARALLAX EFFECTS =====
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');

    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

window.addEventListener('scroll', updateParallax);

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.init();
    }

    init() {
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
        this.animate();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';

        this.container.appendChild(particle);
        this.particles.push(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 12000);
    }

    animate() {
        setInterval(() => {
            if (this.particles.length < 30) {
                this.createParticle();
            }
        }, 300);
    }
}

// Initialize particle system for hero section - DISABLED
// document.addEventListener('DOMContentLoaded', () => {
//     const heroSection = document.querySelector('.hero');
//     if (heroSection) {
//         new ParticleSystem(heroSection);
//     }
// });

// ===== MAGNETIC CURSOR EFFECT =====
class MagneticCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'magnetic-cursor';
        this.cursor.innerHTML = '<div class="cursor-inner"></div>';
        document.body.appendChild(this.cursor);

        this.cursorInner = this.cursor.querySelector('.cursor-inner');
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Magnetic effect for buttons
        const magneticElements = document.querySelectorAll('.btn, .service-card, .nav-link');
        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('magnetic-active');
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('magnetic-active');
            });
        });

        this.animate();
    }

    animate() {
        this.cursorX += (this.mouseX - this.cursorX) * 0.1;
        this.cursorY += (this.mouseY - this.cursorY) * 0.1;

        this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize magnetic cursor (desktop only)
if (window.innerWidth > 768) {
    new MagneticCursor();
}

// ===== 3D TILT EFFECT =====
class TiltEffect {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;

            this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }
}

// Apply tilt effect to service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        new TiltEffect(card);
    });
});

// ===== RIPPLE EFFECT =====
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// ===== SMOOTH REVEAL ANIMATIONS =====
class SmoothReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-reveal]');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = element.dataset.delay || 0;

                    setTimeout(() => {
                        element.classList.add('revealed');
                    }, delay);
                }
            });
        }, { threshold: 0.1 });

        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Initialize smooth reveal
new SmoothReveal();

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Focus management
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ===== LAZY LOADING IMAGES =====
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// ===== CONSOLE SIGNATURE =====
console.log('%c🚛 Trans Global Express', 'color: #ea580c; font-size: 20px; font-weight: bold;');
console.log('%cSite développé avec ❤️ par votre équipe de développement', 'color: #1e3a8a; font-size: 12px;');

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateNavbar,
        animateCounter,
        createRipple,
        debounce,
        throttle
    };
}

// ===== TESTIMONIALS SLIDER =====
class TestimonialsSlider {
    constructor() {
        this.track = document.getElementById('testimonial-track');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prev-testimonial');
        this.nextBtn = document.getElementById('next-testimonial');
        this.currentSlide = 0;
        this.totalSlides = this.cards.length;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        if (!this.track) return;

        this.bindEvents();
        this.startAutoPlay();
        this.updateSlider();
    }

    bindEvents() {
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Pause autoplay on hover
        this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }

    updateSlider() {
        // Update track position
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;

        // Update active card
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentSlide);
        });

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// ===== QUOTE FORM HANDLER =====
class QuoteFormHandler {
    constructor() {
        this.form = document.getElementById('quote-form');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.addInputValidation();
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!this.validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = this.form.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Envoi en cours...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    validateForm(data) {
        const requiredFields = ['nom', 'email', 'telephone', 'service', 'details'];
        let isValid = true;

        requiredFields.forEach(field => {
            const input = this.form.querySelector(`[name="${field}"]`);
            const value = data[field];

            if (!value || value.trim() === '') {
                this.showFieldError(input, 'Ce champ est requis');
                isValid = false;
            } else {
                this.clearFieldError(input);
            }
        });

        // Email validation
        if (data.email && !this.isValidEmail(data.email)) {
            const emailInput = this.form.querySelector('[name="email"]');
            this.showFieldError(emailInput, 'Adresse email invalide');
            isValid = false;
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(input, message) {
        this.clearFieldError(input);

        input.style.borderColor = '#ef4444';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 4px;
        `;
        errorDiv.textContent = message;

        input.parentNode.appendChild(errorDiv);
    }

    clearFieldError(input) {
        input.style.borderColor = '';
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        message.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-check-circle"></i>
                <span>Votre demande a été envoyée avec succès !</span>
            </div>
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => message.remove(), 300);
        }, 4000);
    }

    addInputValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    this.showFieldError(input, 'Ce champ est requis');
                } else {
                    this.clearFieldError(input);
                }
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }
}

// ===== GALLERY LIGHTBOX =====
class GalleryLightbox {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.lightbox = null;
        this.currentIndex = 0;
        this.images = [];

        this.init();
    }

    init() {
        this.collectImages();
        this.bindEvents();
        this.createLightbox();
    }

    collectImages() {
        this.galleryItems.forEach((item, index) => {
            const img = item.querySelector('.gallery-image');
            const title = item.querySelector('.gallery-overlay h3')?.textContent || '';
            const description = item.querySelector('.gallery-overlay p')?.textContent || '';

            this.images.push({
                src: img.src,
                title,
                description,
                index
            });
        });
    }

    bindEvents() {
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.currentIndex = index;
                this.openLightbox();
            });
        });
    }

    createLightbox() {
        this.lightbox = document.createElement('div');
        this.lightbox.className = 'lightbox';
        this.lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;

        this.lightbox.innerHTML = `
            <div class="lightbox-content" style="position: relative; max-width: 90%; max-height: 90%;">
                <img class="lightbox-image" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;">
                <div class="lightbox-info" style="position: absolute; bottom: -60px; left: 0; right: 0; text-align: center; color: white;">
                    <h3 class="lightbox-title" style="font-size: 1.5rem; margin-bottom: 8px;"></h3>
                    <p class="lightbox-description" style="opacity: 0.8;"></p>
                </div>
                <button class="lightbox-close" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 2rem; cursor: pointer; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center;">
                    <i class="fas fa-times"></i>
                </button>
                <button class="lightbox-prev" style="position: absolute; left: -60px; top: 50%; transform: translateY(-50%); background: rgba(255, 255, 255, 0.2); border: none; color: white; font-size: 1.5rem; cursor: pointer; width: 50px; height: 50px; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="lightbox-next" style="position: absolute; right: -60px; top: 50%; transform: translateY(-50%); background: rgba(255, 255, 255, 0.2); border: none; color: white; font-size: 1.5rem; cursor: pointer; width: 50px; height: 50px; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;

        document.body.appendChild(this.lightbox);

        // Bind lightbox events
        this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prevImage());
        this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.closeLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.style.visibility === 'visible') {
                switch (e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.prevImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    openLightbox() {
        this.updateLightboxContent();
        this.lightbox.style.opacity = '1';
        this.lightbox.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.style.opacity = '0';
        this.lightbox.style.visibility = 'hidden';
        document.body.style.overflow = '';
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateLightboxContent();
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateLightboxContent();
    }

    updateLightboxContent() {
        const image = this.images[this.currentIndex];
        const lightboxImage = this.lightbox.querySelector('.lightbox-image');
        const lightboxTitle = this.lightbox.querySelector('.lightbox-title');
        const lightboxDescription = this.lightbox.querySelector('.lightbox-description');

        lightboxImage.src = image.src;
        lightboxTitle.textContent = image.title;
        lightboxDescription.textContent = image.description;
    }
}

// ===== BACK TO TOP BUTTON =====
class BackToTopButton {
    constructor() {
        this.button = document.getElementById('back-to-top');
        this.init();
    }

    init() {
        if (!this.button) return;

        this.button.addEventListener('click', () => this.scrollToTop());
        window.addEventListener('scroll', throttle(() => this.updateVisibility(), 100));
    }

    updateVisibility() {
        if (window.scrollY > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ===== ENHANCED SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-animate]');
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animate;
                    const delay = element.dataset.delay || 0;

                    setTimeout(() => {
                        element.classList.add('animate');
                        this.triggerCustomAnimation(element, animationType);
                    }, delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }

    triggerCustomAnimation(element, type) {
        switch (type) {
            case 'counter':
                this.animateCounter(element);
                break;
            case 'progress':
                this.animateProgress(element);
                break;
            case 'typewriter':
                this.animateTypewriter(element);
                break;
        }
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.count || element.textContent);
        const duration = parseInt(element.dataset.duration || 2000);
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    animateProgress(element) {
        const target = parseInt(element.dataset.progress || 100);
        const duration = parseInt(element.dataset.duration || 1500);

        element.style.width = '0%';
        element.style.transition = `width ${duration}ms ease-out`;

        setTimeout(() => {
            element.style.width = target + '%';
        }, 100);
    }

    animateTypewriter(element) {
        const text = element.textContent;
        const speed = parseInt(element.dataset.speed || 50);

        element.textContent = '';
        element.style.borderRight = '2px solid var(--secondary-color)';

        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;

            if (i >= text.length) {
                clearInterval(timer);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, speed);
    }
}

// ===== INITIALIZE ALL COMPONENTS =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize testimonials slider
    new TestimonialsSlider();

    // Initialize quote form handler
    new QuoteFormHandler();

    // Initialize gallery lightbox
    new GalleryLightbox();

    // Initialize back to top button
    new BackToTopButton();

    // Initialize enhanced scroll animations
    new ScrollAnimations();

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== ADDITIONAL CSS ANIMATIONS =====
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .field-error {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .success-message {
        animation: slideInRight 0.3s ease-out;
    }
    
    .lightbox-content {
        animation: zoomIn 0.3s ease-out;
    }
    
    @keyframes zoomIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(additionalStyles);

// ===== CONTACT SECTION FUNCTIONALITY =====

// Fonction pour copier du texte dans le presse-papiers
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        // Méthode moderne pour les navigateurs sécurisés
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Adresse copiée dans le presse-papiers !', 'success');
        }).catch(err => {
            console.error('Erreur lors de la copie:', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        // Méthode de fallback pour les anciens navigateurs
        fallbackCopyTextToClipboard(text);
    }
}

// Méthode de fallback pour copier du texte
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('Adresse copiée dans le presse-papiers !', 'success');
        } else {
            showNotification('Impossible de copier l\'adresse', 'error');
        }
    } catch (err) {
        console.error('Erreur lors de la copie:', err);
        showNotification('Erreur lors de la copie', 'error');
    }

    document.body.removeChild(textArea);
}

// Fonction pour afficher les notifications
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Créer la nouvelle notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Ajouter les styles CSS inline pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-family: var(--font-primary);
        font-weight: 500;
        max-width: 350px;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;

    document.body.appendChild(notification);

    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Animation de sortie et suppression
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Gestion du formulaire de contact rapide
document.addEventListener('DOMContentLoaded', function () {
    const quickContactForm = document.getElementById('quick-contact-form');

    if (quickContactForm) {
        quickContactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Validation simple
            if (!data.name || !data.phone || !data.subject || !data.message) {
                showNotification('Veuillez remplir tous les champs', 'error');
                return;
            }

            // Simulation d'envoi (remplacer par votre logique d'envoi réelle)
            const submitButton = this.querySelector('.contact-submit');
            const originalText = submitButton.innerHTML;

            // Animation du bouton de soumission
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitButton.disabled = true;

            // Simuler l'envoi (remplacer par un appel API réel)
            setTimeout(() => {
                showNotification('Message envoyé avec succès ! Nous vous répondrons rapidement.', 'success');

                // Réinitialiser le formulaire
                this.reset();

                // Restaurer le bouton
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;

                // Optionnel : rediriger vers WhatsApp pour un suivi immédiat
                setTimeout(() => {
                    const whatsappMessage = `Bonjour, je viens d'envoyer un message via votre site web. Nom: ${data.name}, Sujet: ${data.subject}`;
                    const whatsappUrl = `https://wa.me/213555123456?text=${encodeURIComponent(whatsappMessage)}`;

                    if (confirm('Souhaitez-vous également nous contacter directement sur WhatsApp pour un suivi immédiat ?')) {
                        window.open(whatsappUrl, '_blank');
                    }
                }, 1000);

            }, 2000); // Simulation de 2 secondes d'envoi
        });
    }

    // Mise à jour du statut d'ouverture en temps réel
    updateBusinessStatus();

    // Mettre à jour le statut toutes les minutes
    setInterval(updateBusinessStatus, 60000);
});

// Fonction pour mettre à jour le statut d'ouverture
function updateBusinessStatus() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute; // Temps en minutes depuis minuit

    let isOpen = false;
    let nextChange = '';

    // Horaires : Lundi-Vendredi 8h-18h, Samedi 8h-13h, Dimanche fermé
    if (currentDay >= 1 && currentDay <= 5) { // Lundi à Vendredi
        isOpen = currentTime >= 480 && currentTime < 1080; // 8h00 à 18h00
        nextChange = isOpen ? 'Fermeture à 18h00' : (currentTime < 480 ? 'Ouverture à 8h00' : 'Ouverture lundi à 8h00');
    } else if (currentDay === 6) { // Samedi
        isOpen = currentTime >= 480 && currentTime < 780; // 8h00 à 13h00
        nextChange = isOpen ? 'Fermeture à 13h00' : (currentTime < 480 ? 'Ouverture à 8h00' : 'Ouverture lundi à 8h00');
    } else { // Dimanche
        isOpen = false;
        nextChange = 'Ouverture lundi à 8h00';
    }

    // Mettre à jour l'affichage du statut
    const statusIndicators = document.querySelectorAll('.current-status .status-indicator');
    const statusTexts = document.querySelectorAll('.current-status span');

    statusIndicators.forEach(indicator => {
        indicator.className = `status-indicator ${isOpen ? 'online' : 'offline'}`;
    });

    statusTexts.forEach(text => {
        text.textContent = isOpen ? `Actuellement ouvert - ${nextChange}` : `Actuellement fermé - ${nextChange}`;
    });

    // Mettre à jour les badges de statut dans les horaires
    const statusBadges = document.querySelectorAll('.status-badge');
    statusBadges.forEach((badge, index) => {
        if (index < 5) { // Lundi à Vendredi
            if (currentDay >= 1 && currentDay <= 5 && currentDay === index + 1) {
                badge.className = `status-badge ${isOpen ? 'open' : 'closed'}`;
                badge.textContent = isOpen ? 'Ouvert' : 'Fermé';
            }
        } else if (index === 5) { // Samedi
            if (currentDay === 6) {
                badge.className = `status-badge ${isOpen ? 'open' : 'closed'}`;
                badge.textContent = isOpen ? 'Ouvert' : 'Fermé';
            }
        }
    });
}

// Rendre les fonctions globales pour les appels depuis HTML
window.copyToClipboard = copyToClipboard;
window.showNotification = showNotification;