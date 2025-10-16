// ===== HERO CAROUSEL SYSTEM =====
class HeroCarousel {
    constructor() {
        this.heroBackground = document.getElementById('hero-background');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('hero-prev');
        this.nextBtn = document.getElementById('hero-next');
        this.currentSlide = 1;
        this.totalSlides = 7;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        if (!this.heroBackground) return;
        
        this.bindEvents();
        this.updateSlide();
        
        // Démarrer l'auto-play après un court délai pour s'assurer que tout est initialisé
        setTimeout(() => {
            this.startAutoPlay();
        }, 1000);
        
        // Vérifier et redémarrer l'auto-play toutes les 10 secondes si nécessaire
        setInterval(() => {
            if (!this.autoPlayInterval) {
                console.log('🔄 Redémarrage de l\'auto-play');
                this.startAutoPlay();
            }
        }, 10000);
    }
    
    bindEvents() {
        // Boutons de navigation
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Indicateurs
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index + 1);
            });
        });
        
        // Pause sur hover des contrôles uniquement
        const controls = document.querySelector('.hero-carousel-controls');
        if (controls) {
            controls.addEventListener('mouseenter', () => this.pauseAutoPlay());
            controls.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch/swipe support pour mobile
        this.addTouchSupport();
        
        // Redémarrer l'auto-play quand la page devient visible
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && !this.autoPlayInterval) {
                this.startAutoPlay();
            }
        });
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        this.currentSlide = this.currentSlide >= this.totalSlides ? 1 : this.currentSlide + 1;
        this.updateSlide();
    }
    
    prevSlide() {
        if (this.isTransitioning) return;
        this.currentSlide = this.currentSlide <= 1 ? this.totalSlides : this.currentSlide - 1;
        this.updateSlide();
    }
    
    goToSlide(slideNumber) {
        if (this.isTransitioning || slideNumber === this.currentSlide) return;
        this.currentSlide = slideNumber;
        this.updateSlide();
    }
    
    updateSlide() {
        this.isTransitioning = true;
        
        // Ajouter effet de transition
        this.heroBackground.classList.add('changing');
        
        setTimeout(() => {
            // Changer la classe de l'image
            this.heroBackground.className = `hero-background slide-${this.currentSlide}`;
            
            // Mettre à jour les indicateurs
            this.indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index + 1 === this.currentSlide);
            });
            
            setTimeout(() => {
                this.heroBackground.classList.remove('changing');
                this.isTransitioning = false;
            }, 300);
        }, 200);
    }
    
    startAutoPlay() {
        this.pauseAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            if (!this.isTransitioning) {
                this.nextSlide();
            }
        }, 4000); // Change toutes les 4 secondes
        console.log('🎠 Carrousel auto-play démarré');
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        
        this.heroBackground.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.heroBackground.addEventListener('touchend', (e) => {
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
}

// ===== ENHANCED HERO EFFECTS =====
class HeroEffects {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.init();
    }
    
    init() {
        if (!this.hero) return;
        
        this.addParallaxEffect();
        this.addMouseMoveEffect();
    }
    
    addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-background');
            
            if (heroBackground && scrolled < window.innerHeight) {
                const speed = scrolled * 0.5;
                heroBackground.style.transform = `translateY(${speed}px)`;
            }
        });
    }
    
    addMouseMoveEffect() {
        this.hero.addEventListener('mousemove', (e) => {
            const rect = this.hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const shapes = this.hero.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.02;
                const moveX = (x - 0.5) * 20 * speed;
                const moveY = (y - 0.5) * 20 * speed;
                
                shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
        
        this.hero.addEventListener('mouseleave', () => {
            const shapes = this.hero.querySelectorAll('.shape');
            shapes.forEach(shape => {
                shape.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize hero carousel
    new HeroCarousel();
    
    // Initialize hero effects
    new HeroEffects();
});

// ===== CONSOLE LOG =====
console.log('%c🎠 Hero Carousel Initialized', 'color: #ea580c; font-size: 14px; font-weight: bold;');