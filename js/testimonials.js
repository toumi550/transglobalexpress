// ===== ENHANCED TESTIMONIALS SYSTEM =====
class EnhancedTestimonials {
    constructor() {
        this.track = document.getElementById('testimonial-track');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prev-testimonial');
        this.nextBtn = document.getElementById('next-testimonial');
        this.autoplayIndicator = document.getElementById('testimonial-autoplay');
        this.currentSlide = 0;
        this.totalSlides = this.cards.length;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        this.autoPlayDuration = 5000; // 5 secondes
        
        this.init();
    }
    
    init() {
        if (!this.track || this.totalSlides === 0) return;
        
        this.bindEvents();
        this.startAutoPlay();
        this.updateSlider();
        this.initializeAnimations();
    }
    
    bindEvents() {
        // Boutons de navigation
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Indicateurs (dots)
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause sur hover des contrôles uniquement
        const controls = document.querySelector('.testimonial-controls');
        if (controls) {
            controls.addEventListener('mouseenter', () => this.pauseAutoPlay());
            controls.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        // Navigation clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // Pause quand la page n'est pas visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoPlay();
            } else {
                this.startAutoPlay();
            }
        });
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }
    
    prevSlide() {
        if (this.isTransitioning) return;
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        this.currentSlide = index;
        this.updateSlider();
    }
    
    updateSlider() {
        this.isTransitioning = true;
        
        // Mettre à jour la position du track
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Mettre à jour les cartes actives
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentSlide);
        });
        
        // Mettre à jour les dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        
        // Déclencher les animations de la carte active
        this.animateActiveCard();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }
    
    animateActiveCard() {
        const activeCard = this.cards[this.currentSlide];
        if (!activeCard) return;
        
        const elements = {
            stars: activeCard.querySelectorAll('.stars i'),
            text: activeCard.querySelector('p'),
            author: activeCard.querySelector('.testimonial-author'),
            quoteIcon: activeCard.querySelector('.quote-icon')
        };
        
        // Reset animations
        Object.values(elements).forEach(el => {
            if (el) {
                if (el.length) { // NodeList
                    el.forEach(item => {
                        item.style.animation = 'none';
                        item.offsetHeight; // Trigger reflow
                        item.style.animation = null;
                    });
                } else { // Single element
                    el.style.animation = 'none';
                    el.offsetHeight; // Trigger reflow
                    el.style.animation = null;
                }
            }
        });
        
        // Animate quote icon
        if (elements.quoteIcon) {
            elements.quoteIcon.style.transform = 'translateX(-50%) scale(0)';
            setTimeout(() => {
                elements.quoteIcon.style.transform = 'translateX(-50%) scale(1)';
                elements.quoteIcon.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }, 100);
        }
        
        // Animate text with typewriter effect
        if (elements.text) {
            this.typewriterEffect(elements.text);
        }
    }
    
    typewriterEffect(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--secondary-color)';
        
        let i = 0;
        const speed = 30; // Vitesse de frappe
        
        const typeInterval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 500);
            }
        }, speed);
    }
    
    startAutoPlay() {
        this.pauseAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            if (!this.isTransitioning) {
                this.nextSlide();
            }
        }, this.autoPlayDuration);
        
        // Mettre à jour l'indicateur
        if (this.autoplayIndicator) {
            this.autoplayIndicator.classList.add('active');
        }
        
        console.log('🎠 Testimonials auto-play started');
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
            
            // Mettre à jour l'indicateur
            if (this.autoplayIndicator) {
                this.autoplayIndicator.classList.remove('active');
            }
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextSlide(); // Swipe left = next
                } else {
                    this.prevSlide(); // Swipe right = previous
                }
            }
        });
    }
    
    initializeAnimations() {
        // Observer pour déclencher les animations au scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStatsCards();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        const statsSection = document.querySelector('.satisfaction-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
    
    animateStatsCards() {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                
                // Animer le compteur
                const numberElement = card.querySelector('.stat-number');
                if (numberElement) {
                    this.animateCounter(numberElement);
                }
            }, index * 200);
        });
    }
    
    animateCounter(element) {
        const target = parseFloat(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format pour les décimales
            if (target % 1 !== 0) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// ===== TESTIMONIALS EFFECTS =====
class TestimonialsEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.addParallaxEffect();
        this.addHoverEffects();
        // this.createFloatingElements(); // DISABLED - Floating elements removed
    }
    
    addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const testimonialsSection = document.querySelector('.testimonials');
            
            if (testimonialsSection) {
                const rect = testimonialsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const speed = scrolled * 0.1;
                    testimonialsSection.style.backgroundPosition = `center ${speed}px`;
                }
            }
        });
    }
    
    addHoverEffects() {
        const testimonialCards = document.querySelectorAll('.testimonial-content');
        
        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addCardTilt(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeCardTilt(card);
            });
        });
    }
    
    addCardTilt(card) {
        card.addEventListener('mousemove', this.handleCardMouseMove);
        card.dataset.tiltActive = 'true';
    }
    
    removeCardTilt(card) {
        card.removeEventListener('mousemove', this.handleCardMouseMove);
        card.dataset.tiltActive = 'false';
        card.style.transform = '';
    }
    
    handleCardMouseMove(e) {
        if (e.currentTarget.dataset.tiltActive !== 'true') return;
        
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const tiltX = (y - 0.5) * -10; // Invert for natural feel
        const tiltY = (x - 0.5) * 10;
        
        e.currentTarget.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    }
    
    createFloatingElements() {
        const testimonialsSection = document.querySelector('.testimonials');
        if (!testimonialsSection) return;
        
        // Créer des éléments flottants (étoiles, guillemets)
        const floatingElements = ['⭐', '💬', '👍', '✨'];
        
        for (let i = 0; i < 8; i++) {
            const element = document.createElement('div');
            element.className = 'floating-testimonial-element';
            element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
            element.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 15}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.3 + 0.1};
                pointer-events: none;
                z-index: 1;
                animation: floatTestimonial ${Math.random() * 10 + 15}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            testimonialsSection.appendChild(element);
        }
    }
}

// ===== ADD REVIEW FUNCTIONALITY =====
class AddReviewHandler {
    constructor() {
        this.addReviewBtn = document.querySelector('.add-review-btn');
        this.init();
    }
    
    init() {
        if (!this.addReviewBtn) return;
        
        this.addReviewBtn.addEventListener('click', () => {
            this.openReviewModal();
        });
    }
    
    openReviewModal() {
        // Créer une modal simple pour l'ajout d'avis
        const modal = document.createElement('div');
        modal.className = 'review-modal';
        modal.innerHTML = `
            <div class="review-modal-content">
                <div class="review-modal-header">
                    <h3>Laissez votre avis</h3>
                    <button class="review-modal-close">&times;</button>
                </div>
                <div class="review-modal-body">
                    <p>Merci de votre intérêt ! Pour laisser un avis, vous pouvez :</p>
                    <div class="review-options">
                        <a href="mailto:contact@transglobalexpress.dz?subject=Avis Client" class="review-option">
                            <i class="fas fa-envelope"></i>
                            Envoyer par Email
                        </a>
                        <a href="tel:+213550968092" class="review-option">
                            <i class="fas fa-phone"></i>
                            Appeler Directement
                        </a>
                        <a href="#contact" class="review-option">
                            <i class="fas fa-map-marker-alt"></i>
                            Nous Rendre Visite
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Styles inline pour la modal
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        // Fermer la modal
        const closeBtn = modal.querySelector('.review-modal-close');
        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => modal.remove(), 300);
            }
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser les témoignages
    new EnhancedTestimonials();
    
    // Initialiser les effets
    new TestimonialsEffects();
    
    // Initialiser l'ajout d'avis
    new AddReviewHandler();
    
    // Initialiser les cartes de stats avec animation
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
    });
});

// ===== ADDITIONAL CSS ANIMATIONS =====
const testimonialStyles = document.createElement('style');
testimonialStyles.textContent = `
    @keyframes floatTestimonial {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        25% {
            transform: translateY(-20px) rotate(5deg);
        }
        50% {
            transform: translateY(-40px) rotate(0deg);
        }
        75% {
            transform: translateY(-20px) rotate(-5deg);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.9); }
    }
    
    .review-modal-content {
        background: white;
        padding: 30px;
        border-radius: 20px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
    
    .review-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid #f0f0f0;
    }
    
    .review-modal-close {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #666;
    }
    
    .review-options {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-top: 20px;
    }
    
    .review-option {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px 20px;
        background: #f8f9fa;
        border-radius: 10px;
        text-decoration: none;
        color: #333;
        transition: all 0.3s ease;
    }
    
    .review-option:hover {
        background: #ea580c;
        color: white;
        transform: translateX(10px);
    }
`;
document.head.appendChild(testimonialStyles);

// ===== CONSOLE LOG =====
console.log('%c💬 Enhanced Testimonials Initialized', 'color: #10b981; font-size: 14px; font-weight: bold;');