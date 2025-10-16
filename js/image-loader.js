// ===== IMAGE LOADER SYSTEM =====
class ImageLoader {
    constructor() {
        this.imagePaths = [
            { local: '/images/hero1.jpg', fallback: '' },
            { local: '/images/hero2.jpg', fallback: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
            { local: '/images/hero3.jpg', fallback: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
            { local: '/images/hero4.jpg', fallback: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
            { local: '/images/hero5.jpg', fallback: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
            { local: '/images/hero6.jpg', fallback: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
            { local: '/images/hero7.jpg', fallback: '' }
        ];
        this.loadedImages = [];
        this.init();
    }
    
    init() {
        this.preloadImages();
    }
    
    async preloadImages() {
        console.log('🖼️ Préchargement des images...');
        
        for (let i = 0; i < this.imagePaths.length; i++) {
            const imageData = this.imagePaths[i];
            const slideNumber = i + 1;
            
            // Force l'utilisation du fallback pour éviter les images locales\nconsole.log(`Using fallback for slide ${slideNumber}`);\nthis.loadedImages[i] = imageData.fallback;\nthis.applyImageToSlide(slideNumber, imageData.fallback);\nconsole.log(`✅ Image fallback ${slideNumber} chargée`);
        }
        
        console.log('🎉 Toutes les images sont chargées!');
    }
    
    testImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => reject(new Error(`Failed to load ${src}`));
            img.src = src;
        });
    }
    
    applyImageToSlide(slideNumber, imageSrc) {
        // Créer ou mettre à jour le style CSS pour cette slide
        const styleId = `slide-${slideNumber}-style`;
        let styleElement = document.getElementById(styleId);
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }
        
        styleElement.textContent = `
            .hero-background.slide-${slideNumber} {
                background-image: url('${imageSrc}') !important;
            }
        `;
    }
    
    getLoadedImages() {
        return this.loadedImages;
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le chargeur d'images
    window.imageLoader = new ImageLoader();
});

console.log('%c🖼️ Image Loader Initialized', 'color: #10b981; font-size: 14px; font-weight: bold;');