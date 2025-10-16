// ===== ADVANCED ANIMATIONS JAVASCRIPT =====

// ===== 3D SCENE MANAGER =====
class Scene3D {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.objects = [];
        this.init();
    }
    
    init() {
        // Create 3D context without Three.js (pure CSS 3D)
        this.container.style.perspective = '1000px';
        this.container.style.perspectiveOrigin = '50% 50%';
        this.createFloatingElements();
    }
    
    createFloatingElements() {
        for (let i = 0; i < 10; i++) {
            const element = document.createElement('div');
            element.className = 'floating-3d-element';
            element.style.cssText = `
                position: absolute;
                width: ${Math.random() * 20 + 10}px;
                height: ${Math.random() * 20 + 10}px;
                background: linear-gradient(45deg, #ea580c, #1e3a8a);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float3D ${Math.random() * 10 + 5}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                transform-style: preserve-3d;
                opacity: 0.7;
            `;
            this.container.appendChild(element);
        }
    }
}

// ===== ADVANCED PARTICLE SYSTEM =====
class AdvancedParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 3 + 1,
                color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
                life: 1,
                decay: Math.random() * 0.02 + 0.005
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    updateParticles() {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.1;
                particle.vy += (dy / distance) * force * 0.1;
            }
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Life cycle
            particle.life -= particle.decay;
            if (particle.life <= 0) {
                this.particles[index] = {
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    radius: Math.random() * 3 + 1,
                    color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
                    life: 1,
                    decay: Math.random() * 0.02 + 0.005
                };
            }
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
            this.ctx.restore();
        });
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (100 - distance) / 100 * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = '#ea580c';
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            });
        });
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// ===== MORPHING SHAPES =====
class MorphingShape {
    constructor(element) {
        this.element = element;
        this.paths = [
            'M20,20 Q40,5 60,20 Q80,35 60,50 Q40,65 20,50 Q5,35 20,20',
            'M20,30 Q30,10 50,20 Q70,30 60,50 Q50,70 30,60 Q10,50 20,30',
            'M30,20 Q50,10 70,30 Q80,50 60,70 Q40,80 20,60 Q10,40 30,20'
        ];
        this.currentPath = 0;
        this.init();
    }
    
    init() {
        this.element.innerHTML = `
            <svg width="100" height="100" viewBox="0 0 100 100">
                <path d="${this.paths[0]}" fill="url(#morphGradient)">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 50 50;360 50 50"
                        dur="10s"
                        repeatCount="indefinite"/>
                </path>
                <defs>
                    <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#ea580c"/>
                        <stop offset="100%" style="stop-color:#1e3a8a"/>
                    </linearGradient>
                </defs>
            </svg>
        `;
        
        this.startMorphing();
    }
    
    startMorphing() {
        setInterval(() => {
            this.currentPath = (this.currentPath + 1) % this.paths.length;
            const path = this.element.querySelector('path');
            path.style.transition = 'all 2s ease-in-out';
            path.setAttribute('d', this.paths[this.currentPath]);
        }, 3000);
    }
}

// ===== LIQUID ANIMATION =====
class LiquidAnimation {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        this.init();
    }
    
    init() {
        this.resize();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }
    
    animate() {
        const time = Date.now() * 0.002;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Create liquid effect
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#ea580c');
        gradient.addColorStop(0.5, '#1e3a8a');
        gradient.addColorStop(1, '#ea580c');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        
        for (let x = 0; x <= this.canvas.width; x += 10) {
            const y = this.canvas.height / 2 + Math.sin(x * 0.01 + time) * 50 + Math.cos(x * 0.02 + time * 1.5) * 30;
            if (x === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height);
        this.ctx.closePath();
        this.ctx.fill();
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== GLITCH EFFECT =====
class GlitchEffect {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.init();
    }
    
    init() {
        this.element.addEventListener('mouseenter', () => this.startGlitch());
        this.element.addEventListener('mouseleave', () => this.stopGlitch());
    }
    
    startGlitch() {
        let iteration = 0;
        const interval = setInterval(() => {
            this.element.textContent = this.originalText
                .split('')
                .map((letter, index) => {
                    if (index < iteration) {
                        return this.originalText[index];
                    }
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');
            
            if (iteration >= this.originalText.length) {
                clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
    }
    
    stopGlitch() {
        this.element.textContent = this.originalText;
    }
}

// ===== HOLOGRAPHIC EFFECT =====
class HolographicEffect {
    constructor(element) {
        this.element = element;
        this.init();
    }
    
    init() {
        this.element.style.background = `
            linear-gradient(
                45deg,
                transparent 30%,
                rgba(255, 255, 255, 0.5) 50%,
                transparent 70%
            ),
            linear-gradient(135deg, #ea580c, #1e3a8a)
        `;
        this.element.style.backgroundSize = '200% 200%, 100% 100%';
        this.element.style.animation = 'holographic 3s linear infinite';
        
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.element.style.backgroundPosition = `${x}% ${y}%, 0% 0%`;
        });
    }
}

// ===== MAGNETIC FIELD EFFECT =====
class MagneticField {
    constructor(container) {
        this.container = container;
        this.elements = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        this.createElements();
        this.bindEvents();
        this.animate();
    }
    
    createElements() {
        for (let i = 0; i < 20; i++) {
            const element = document.createElement('div');
            element.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #ea580c;
                border-radius: 50%;
                pointer-events: none;
                transition: all 0.3s ease;
            `;
            
            this.container.appendChild(element);
            this.elements.push({
                element,
                x: Math.random() * this.container.offsetWidth,
                y: Math.random() * this.container.offsetHeight,
                vx: 0,
                vy: 0
            });
        }
    }
    
    bindEvents() {
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }
    
    animate() {
        this.elements.forEach(item => {
            const dx = this.mouse.x - item.x;
            const dy = this.mouse.y - item.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                item.vx += (dx / distance) * force * 0.5;
                item.vy += (dy / distance) * force * 0.5;
            }
            
            item.vx *= 0.95;
            item.vy *= 0.95;
            item.x += item.vx;
            item.y += item.vy;
            
            // Boundary check
            if (item.x < 0) item.x = this.container.offsetWidth;
            if (item.x > this.container.offsetWidth) item.x = 0;
            if (item.y < 0) item.y = this.container.offsetHeight;
            if (item.y > this.container.offsetHeight) item.y = 0;
            
            item.element.style.transform = `translate(${item.x}px, ${item.y}px)`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== NEURAL NETWORK VISUALIZATION =====
class NeuralNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.init();
    }
    
    init() {
        this.resize();
        this.createNetwork();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    createNetwork() {
        const layers = [5, 8, 6, 3];
        let nodeId = 0;
        
        layers.forEach((layerSize, layerIndex) => {
            for (let i = 0; i < layerSize; i++) {
                this.nodes.push({
                    id: nodeId++,
                    x: (this.canvas.width / (layers.length - 1)) * layerIndex,
                    y: (this.canvas.height / (layerSize + 1)) * (i + 1),
                    layer: layerIndex,
                    activation: Math.random(),
                    targetActivation: Math.random()
                });
            }
        });
        
        // Create connections
        this.nodes.forEach(node => {
            this.nodes.forEach(otherNode => {
                if (otherNode.layer === node.layer + 1) {
                    this.connections.push({
                        from: node,
                        to: otherNode,
                        weight: Math.random() * 2 - 1,
                        activity: 0
                    });
                }
            });
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update activations
        this.nodes.forEach(node => {
            node.activation += (node.targetActivation - node.activation) * 0.1;
            if (Math.random() < 0.01) {
                node.targetActivation = Math.random();
            }
        });
        
        // Draw connections
        this.connections.forEach(connection => {
            const alpha = Math.abs(connection.weight) * connection.from.activation;
            this.ctx.strokeStyle = `rgba(234, 88, 12, ${alpha})`;
            this.ctx.lineWidth = Math.abs(connection.weight) * 3;
            this.ctx.beginPath();
            this.ctx.moveTo(connection.from.x, connection.from.y);
            this.ctx.lineTo(connection.to.x, connection.to.y);
            this.ctx.stroke();
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 8 + node.activation * 5, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(30, 58, 138, ${0.7 + node.activation * 0.3})`;
            this.ctx.fill();
            this.ctx.strokeStyle = '#ea580c';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D scenes - DISABLED
    // const hero3D = document.querySelector('.hero');
    // if (hero3D) {
    //     new Scene3D(hero3D);
    // }
    
    // Initialize particle systems - DISABLED
    // const particleCanvas = document.createElement('canvas');
    // particleCanvas.style.cssText = `
    //     position: fixed;
    //     top: 0;
    //     left: 0;
    //     width: 100%;
    //     height: 100%;
    //     pointer-events: none;
    //     z-index: -1;
    //     opacity: 0.3;
    // `;
    // document.body.appendChild(particleCanvas);
    // new AdvancedParticleSystem(particleCanvas);
    
    // Initialize morphing shapes - DISABLED
    // const morphElements = document.querySelectorAll('.morph-shape');
    // morphElements.forEach(element => {
    //     new MorphingShape(element);
    // });
    
    // Initialize glitch effects
    const glitchElements = document.querySelectorAll('.glitch-text');
    glitchElements.forEach(element => {
        new GlitchEffect(element);
    });
    
    // Initialize holographic effects
    const holoElements = document.querySelectorAll('.holographic');
    holoElements.forEach(element => {
        new HolographicEffect(element);
    });
    
    // Initialize magnetic fields - DISABLED
    // const magneticContainers = document.querySelectorAll('.magnetic-container');
    // magneticContainers.forEach(container => {
    //     new MagneticField(container);
    // });
});

// ===== PERFORMANCE MONITOR =====
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.init();
    }
    
    init() {
        this.monitor();
    }
    
    monitor() {
        const currentTime = performance.now();
        this.frameCount++;
        
        if (currentTime >= this.lastTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            // Adjust animation quality based on performance
            if (this.fps < 30) {
                document.body.classList.add('low-performance');
            } else {
                document.body.classList.remove('low-performance');
            }
        }
        
        requestAnimationFrame(() => this.monitor());
    }
}

// Initialize performance monitor
new PerformanceMonitor();

// ===== CSS ANIMATIONS KEYFRAMES (Added dynamically) =====
const style = document.createElement('style');
style.textContent = `

    
    .low-performance * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
    }
    
    .magnetic-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #ea580c;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
    }
    
    .magnetic-cursor.magnetic-active {
        transform: scale(1.5);
        border-color: #1e3a8a;
    }
    
    .cursor-inner {
        width: 4px;
        height: 4px;
        background: #ea580c;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
`;
document.head.appendChild(style);