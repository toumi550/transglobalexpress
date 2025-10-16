// ===== ENHANCED GALLERY SYSTEM =====
class EnhancedGallery {
    constructor() {
        this.galleryGrid = document.getElementById('gallery-grid');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.lightbox = null;
        this.currentImageIndex = 0;
        this.filteredImages = [];
        
        this.init();
    }
    
    init() {
        if (!this.galleryGrid) return;
        
        this.createLightbox();
        this.bindEvents();
        this.updateFilteredImages('all');
    }
    
    bindEvents() {
        // Filtres
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                this.filterGallery(filter);
                this.updateActiveFilter(e.currentTarget);
            });
        });
        
        // Ouverture lightbox
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const category = item.dataset.category;
                this.updateFilteredImages(this.getCurrentFilter());
                const filteredIndex = this.filteredImages.indexOf(item);
                this.openLightbox(filteredIndex >= 0 ? filteredIndex : index);
            });
        });
        
        // Navigation clavier
        document.addEventListener('keydown', (e) => {
            if (this.lightbox && this.lightbox.classList.contains('active')) {
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
    
    getCurrentFilter() {
        const activeBtn = document.querySelector('.filter-btn.active');
        return activeBtn ? activeBtn.dataset.filter : 'all';
    }
    
    updateFilteredImages(filter) {
        if (filter === 'all') {
            this.filteredImages = Array.from(this.galleryItems);
        } else {
            this.filteredImages = Array.from(this.galleryItems).filter(item => 
                item.dataset.category === filter
            );
        }
    }
    
    filterGallery(filter) {
        this.galleryItems.forEach(item => {
            const category = item.dataset.category;
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                item.style.display = '';
                // Animation d'apparition
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });
        
        this.updateFilteredImages(filter);
    }
    
    updateActiveFilter(activeBtn) {
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
    
    createLightbox() {
        this.lightbox = document.createElement('div');
        this.lightbox.className = 'lightbox';
        this.lightbox.innerHTML = `
            <div class="lightbox-content">
                <img class="lightbox-image" src="" alt="">
                <div class="lightbox-info">
                    <h3 class="lightbox-title"></h3>
                    <p class="lightbox-description"></p>
                </div>
                <button class="lightbox-close">
                    <i class="fas fa-times"></i>
                </button>
                <button class="lightbox-prev">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="lightbox-next">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(this.lightbox);
        
        // Événements lightbox
        this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prevImage());
        this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());
        
        // Fermer en cliquant sur l'arrière-plan
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
    }
    
    openLightbox(index) {
        if (this.filteredImages.length === 0) return;
        
        this.currentImageIndex = index;
        this.updateLightboxContent();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.filteredImages.length;
        this.updateLightboxContent();
    }
    
    prevImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
        this.updateLightboxContent();
    }
    
    updateLightboxContent() {
        const currentItem = this.filteredImages[this.currentImageIndex];
        if (!currentItem) return;
        
        const img = currentItem.querySelector('.gallery-image');
        const title = currentItem.querySelector('.gallery-overlay h3').textContent;
        const description = currentItem.querySelector('.gallery-overlay p').textContent;
        
        const lightboxImg = this.lightbox.querySelector('.lightbox-image');
        const lightboxTitle = this.lightbox.querySelector('.lightbox-title');
        const lightboxDescription = this.lightbox.querySelector('.lightbox-description');
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;
        
        // Mettre à jour la visibilité des boutons de navigation
        const prevBtn = this.lightbox.querySelector('.lightbox-prev');
        const nextBtn = this.lightbox.querySelector('.lightbox-next');
        
        prevBtn.style.display = this.filteredImages.length > 1 ? 'flex' : 'none';
        nextBtn.style.display = this.filteredImages.length > 1 ? 'flex' : 'none';
    }
}

// ===== GALLERY ANIMATIONS =====
class GalleryAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.observeGalleryItems();
        this.addHoverEffects();
    }
    
    observeGalleryItems() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            item.style.transition = 'all 0.6s ease';
            observer.observe(item);
        });
    }
    
    addHoverEffects() {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.addParallaxEffect(item);
            });
            
            item.addEventListener('mouseleave', () => {
                this.removeParallaxEffect(item);
            });
        });
    }
    
    addParallaxEffect(item) {
        const overlay = item.querySelector('.gallery-overlay');
        const image = item.querySelector('.gallery-image');
        
        item.addEventListener('mousemove', this.handleMouseMove);
        item.dataset.parallaxActive = 'true';
    }
    
    removeParallaxEffect(item) {
        item.removeEventListener('mousemove', this.handleMouseMove);
        item.dataset.parallaxActive = 'false';
        
        const overlay = item.querySelector('.gallery-overlay');
        const image = item.querySelector('.gallery-image');
        
        if (overlay) overlay.style.transform = '';
        if (image) image.style.transform = '';
    }
    
    handleMouseMove(e) {
        if (e.currentTarget.dataset.parallaxActive !== 'true') return;
        
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        
        const overlay = e.currentTarget.querySelector('.gallery-overlay');
        const image = e.currentTarget.querySelector('.gallery-image');
        
        if (overlay) {
            overlay.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
        }
        
        if (image) {
            image.style.transform = `scale(1.1) translate(${moveX * 0.3}px, ${moveY * 0.3}px)`;
        }
    }
}

// ===== GALLERY PERFORMANCE OPTIMIZER =====
class GalleryOptimizer {
    constructor() {
        this.lazyLoadImages();
        this.optimizeAnimations();
    }
    
    lazyLoadImages() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    optimizeAnimations() {
        // Réduire les animations sur les appareils moins performants
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.body.classList.add('reduced-animations');
        }
        
        // Pause des animations quand la page n'est pas visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.body.classList.add('paused-animations');
            } else {
                document.body.classList.remove('paused-animations');
            }
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser la galerie
    new EnhancedGallery();
    
    // Initialiser les animations
    new GalleryAnimations();
    
    // Initialiser l'optimiseur
    new GalleryOptimizer();
});

// ===== CONSOLE LOG =====
console.log('%c🖼️ Enhanced Gallery Initialized', 'color: #10b981; font-size: 14px; font-weight: bold;');