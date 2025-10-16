// ===== MULTI-STEP FORM SYSTEM =====
class MultiStepForm {
    constructor() {
        this.form = document.getElementById('multi-step-form');
        this.steps = document.querySelectorAll('.form-step');
        this.progressSteps = document.querySelectorAll('.progress-steps .step');
        this.progressFill = document.getElementById('progress-fill');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.submitBtn = document.getElementById('submit-btn');
        
        this.currentStep = 1;
        this.totalSteps = this.steps.length;
        this.formData = {};
        this.selectedService = null;
        this.estimatedPrice = 0;
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.bindEvents();
        this.updateProgress();
        this.initializeServiceSelection();
        this.initializePriceCalculator();
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevBtn?.addEventListener('click', () => this.prevStep());
        this.nextBtn?.addEventListener('click', () => this.nextStep());
        this.submitBtn?.addEventListener('click', (e) => this.submitForm(e));
        
        // Form validation on input
        this.form.addEventListener('input', (e) => this.validateInput(e.target));
        this.form.addEventListener('change', (e) => this.handleInputChange(e.target));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                if (this.currentStep < this.totalSteps) {
                    this.nextStep();
                }
            }
        });
    }
    
    initializeServiceSelection() {
        const serviceOptions = document.querySelectorAll('.service-option');
        
        serviceOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove previous selection
                serviceOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selection to clicked option
                option.classList.add('selected');
                
                // Store selected service
                this.selectedService = {
                    type: option.dataset.service,
                    price: parseInt(option.dataset.price),
                    name: option.querySelector('h4').textContent
                };
                
                // Update form data
                this.formData.service = this.selectedService;
                
                // Enable next button
                this.updateNavigationButtons();
                
                // Add visual feedback
                this.addSelectionFeedback(option);
            });
        });
    }
    
    addSelectionFeedback(option) {
        const checkIcon = option.querySelector('.service-check i');
        checkIcon.style.transform = 'scale(0)';
        
        setTimeout(() => {
            checkIcon.style.transform = 'scale(1.2)';
            checkIcon.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            setTimeout(() => {
                checkIcon.style.transform = 'scale(1)';
            }, 300);
        }, 100);
    }
    
    initializePriceCalculator() {
        const inputs = ['origine', 'destination', 'poids', 'urgence'];
        
        inputs.forEach(inputName => {
            const input = document.getElementById(inputName);
            if (input) {
                input.addEventListener('change', () => this.calculatePrice());
                input.addEventListener('input', () => this.calculatePrice());
            }
        });
    }
    
    calculatePrice() {
        if (!this.selectedService) return;
        
        let basePrice = this.selectedService.price;
        let distancePrice = 0;
        let urgencyPrice = 0;
        
        // Calculate distance price (simplified)
        const origine = document.getElementById('origine')?.value;
        const destination = document.getElementById('destination')?.value;
        
        if (origine && destination) {
            // Simplified distance calculation (in real app, use Google Maps API)
            const estimatedDistance = this.estimateDistance(origine, destination);
            distancePrice = estimatedDistance * basePrice;
        }
        
        // Calculate urgency multiplier
        const urgence = document.getElementById('urgence')?.value;
        switch (urgence) {
            case 'express':
                urgencyPrice = basePrice * 0.5; // +50%
                break;
            case 'urgent':
                urgencyPrice = basePrice * 1.0; // +100%
                break;
            default:
                urgencyPrice = 0;
        }
        
        // Weight multiplier
        const poids = document.getElementById('poids')?.value;
        let weightMultiplier = 1;
        switch (poids) {
            case '100-500':
                weightMultiplier = 1.5;
                break;
            case '500-1000':
                weightMultiplier = 2;
                break;
            case '1000-5000':
                weightMultiplier = 3;
                break;
            case '5000+':
                weightMultiplier = 5;
                break;
        }
        
        // Calculate total
        const total = (basePrice + distancePrice + urgencyPrice) * weightMultiplier;
        
        // Update display
        this.updatePriceDisplay(basePrice, distancePrice, urgencyPrice, total);
        this.estimatedPrice = total;
    }
    
    estimateDistance(origine, destination) {
        // Simplified distance estimation (replace with real API)
        const distances = {
            'alger': { 'oran': 400, 'constantine': 300, 'annaba': 400 },
            'oran': { 'alger': 400, 'constantine': 700, 'annaba': 800 },
            'constantine': { 'alger': 300, 'oran': 700, 'annaba': 200 }
        };
        
        const orig = origine.toLowerCase();
        const dest = destination.toLowerCase();
        
        if (distances[orig] && distances[orig][dest]) {
            return distances[orig][dest];
        }
        
        return 200; // Default distance
    }
    
    updatePriceDisplay(base, distance, urgency, total) {
        document.getElementById('base-price').textContent = `${base.toLocaleString()} DA`;
        document.getElementById('distance-price').textContent = `${distance.toLocaleString()} DA`;
        document.getElementById('urgency-price').textContent = `${urgency.toLocaleString()} DA`;
        document.getElementById('total-price').textContent = `${total.toLocaleString()} DA`;
    }
    
    nextStep() {
        if (!this.validateCurrentStep()) {
            this.showValidationErrors();
            return;
        }
        
        if (this.currentStep < this.totalSteps) {
            this.saveCurrentStepData();
            this.currentStep++;
            this.updateStep();
            this.updateProgress();
            this.updateNavigationButtons();
            
            if (this.currentStep === 3) {
                this.generateSummary();
            }
        }
    }
    
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStep();
            this.updateProgress();
            this.updateNavigationButtons();
        }
    }
    
    updateStep() {
        // Hide all steps
        this.steps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step with animation
        const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
        if (currentStepElement) {
            setTimeout(() => {
                currentStepElement.classList.add('active');
            }, 100);
        }
    }
    
    updateProgress() {
        const progressPercentage = (this.currentStep / this.totalSteps) * 100;
        this.progressFill.style.width = `${progressPercentage}%`;
        
        // Update step indicators
        this.progressSteps.forEach((step, index) => {
            const stepNumber = index + 1;
            
            step.classList.remove('active', 'completed');
            
            if (stepNumber < this.currentStep) {
                step.classList.add('completed');
                step.querySelector('.step-number').innerHTML = '<i class="fas fa-check"></i>';
            } else if (stepNumber === this.currentStep) {
                step.classList.add('active');
                step.querySelector('.step-number').textContent = stepNumber;
            } else {
                step.querySelector('.step-number').textContent = stepNumber;
            }
        });
    }
    
    updateNavigationButtons() {
        // Previous button
        if (this.currentStep === 1) {
            this.prevBtn.style.display = 'none';
        } else {
            this.prevBtn.style.display = 'flex';
        }
        
        // Next/Submit button
        if (this.currentStep === this.totalSteps) {
            this.nextBtn.style.display = 'none';
            this.submitBtn.style.display = 'flex';
        } else {
            this.nextBtn.style.display = 'flex';
            this.submitBtn.style.display = 'none';
        }
        
        // Enable/disable next button based on validation
        const isValid = this.validateCurrentStep();
        this.nextBtn.disabled = !isValid;
        this.nextBtn.style.opacity = isValid ? '1' : '0.6';
    }
    
    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                return this.selectedService !== null;
            case 2:
                const origine = document.getElementById('origine').value.trim();
                const destination = document.getElementById('destination').value.trim();
                return origine && destination;
            case 3:
                const nom = document.getElementById('nom').value.trim();
                const email = document.getElementById('email').value.trim();
                const telephone = document.getElementById('telephone').value.trim();
                return nom && email && telephone && this.isValidEmail(email);
            default:
                return true;
        }
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    validateInput(input) {
        const value = input.value.trim();
        const isRequired = input.hasAttribute('required');
        
        // Remove previous validation classes
        input.classList.remove('valid', 'invalid');
        
        if (isRequired && !value) {
            input.classList.add('invalid');
            return false;
        }
        
        if (input.type === 'email' && value && !this.isValidEmail(value)) {
            input.classList.add('invalid');
            return false;
        }
        
        if (value) {
            input.classList.add('valid');
        }
        
        return true;
    }
    
    showValidationErrors() {
        const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
        const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                this.showFieldError(input);
            }
        });
        
        // Special validation for step 1
        if (this.currentStep === 1 && !this.selectedService) {
            this.showMessage('Veuillez sélectionner un service', 'error');
        }
    }
    
    showFieldError(input) {
        // Remove existing error
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 5px;
            animation: shake 0.5s ease-in-out;
        `;
        
        let message = 'Ce champ est requis';
        if (input.type === 'email') {
            message = 'Adresse email invalide';
        }
        
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
        
        // Remove error after 3 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 3000);
    }
    
    saveCurrentStepData() {
        const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
        const inputs = currentStepElement.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (input.type === 'radio') {
                if (input.checked) {
                    this.formData[input.name] = input.value;
                }
            } else {
                this.formData[input.name] = input.value;
            }
        });
    }
    
    generateSummary() {
        const summaryContainer = document.getElementById('quote-summary');
        
        const summaryItems = [
            { label: 'Service sélectionné', value: this.selectedService?.name || 'Non spécifié' },
            { label: 'Origine', value: this.formData.origine || 'Non spécifié' },
            { label: 'Destination', value: this.formData.destination || 'Non spécifié' },
            { label: 'Type de marchandise', value: this.formData.marchandise || 'Non spécifié' },
            { label: 'Poids approximatif', value: this.formData.poids || 'Non spécifié' },
            { label: 'Urgence', value: this.getUrgenceLabel(this.formData.urgence) },
            { label: 'Prix estimé', value: `${this.estimatedPrice.toLocaleString()} DA`, highlight: true }
        ];
        
        summaryContainer.innerHTML = summaryItems.map(item => `
            <div class="summary-item ${item.highlight ? 'highlight' : ''}">
                <span class="summary-label">${item.label}:</span>
                <span class="summary-value">${item.value}</span>
            </div>
        `).join('');
    }
    
    getUrgenceLabel(urgence) {
        switch (urgence) {
            case 'express': return 'Express (1-2 jours)';
            case 'urgent': return 'Urgent (même jour)';
            default: return 'Standard (3-5 jours)';
        }
    }
    
    handleInputChange(input) {
        this.validateInput(input);
        this.updateNavigationButtons();
        
        // Update price calculator if on step 2
        if (this.currentStep === 2) {
            this.calculatePrice();
        }
    }
    
    async submitForm(e) {
        e.preventDefault();
        
        if (!this.validateCurrentStep()) {
            this.showValidationErrors();
            return;
        }
        
        this.saveCurrentStepData();
        
        // Show loading state
        this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        this.submitBtn.disabled = true;
        
        try {
            // Simulate form submission
            await this.simulateFormSubmission();
            
            // Generate quote number
            const quoteNumber = this.generateQuoteNumber();
            
            // Show success message
            this.showSuccessModal(quoteNumber);
            
        } catch (error) {
            this.showMessage('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
        } finally {
            this.submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer la Demande';
            this.submitBtn.disabled = false;
        }
    }
    
    async simulateFormSubmission() {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }
    
    generateQuoteNumber() {
        const date = new Date();
        const year = date.getFullYear().toString().substr(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        return `TGE${year}${month}${day}${random}`;
    }
    
    showSuccessModal(quoteNumber) {
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="success-modal-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Demande envoyée avec succès !</h3>
                <p>Votre numéro de demande : <strong>${quoteNumber}</strong></p>
                <p>Nous vous contacterons dans les 24 heures.</p>
                <div class="success-actions">
                    <button class="btn btn-primary" onclick="this.closest('.success-modal').remove()">
                        Parfait !
                    </button>
                    <button class="btn btn-secondary" onclick="window.print()">
                        <i class="fas fa-print"></i> Imprimer
                    </button>
                </div>
            </div>
        `;
        
        // Add styles
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
        
        document.body.appendChild(modal);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);
    }
    
    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            background: ${type === 'error' ? '#ef4444' : '#10b981'};
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }
}

// ===== FORM ENHANCEMENTS =====
class FormEnhancements {
    constructor() {
        this.init();
    }
    
    init() {
        this.addInputAnimations();
        this.addFormValidationStyles();
        this.addProgressAnimations();
    }
    
    addInputAnimations() {
        const inputs = document.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentNode.classList.remove('focused');
                if (input.value) {
                    input.parentNode.classList.add('filled');
                } else {
                    input.parentNode.classList.remove('filled');
                }
            });
        });
    }
    
    addFormValidationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .form-group.focused .input-icon {
                color: var(--secondary-color);
                transform: translateY(-50%) scale(1.1);
            }
            
            .form-group input.valid,
            .form-group select.valid,
            .form-group textarea.valid {
                border-color: #10b981;
                box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
            }
            
            .form-group input.invalid,
            .form-group select.invalid,
            .form-group textarea.invalid {
                border-color: #ef4444;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
            
            .success-modal-content {
                background: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            }
            
            .success-icon {
                width: 80px;
                height: 80px;
                background: #10b981;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 auto 20px;
                font-size: 2rem;
                color: white;
                animation: successPulse 1s ease-in-out;
            }
            
            @keyframes successPulse {
                0% { transform: scale(0); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
            
            .success-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 30px;
            }
            
            .summary-item.highlight {
                background: rgba(234, 88, 12, 0.1);
                border: 2px solid var(--secondary-color);
            }
            
            .summary-item.highlight .summary-value {
                color: var(--secondary-color);
                font-size: 1.2rem;
                font-weight: 700;
            }
        `;
        document.head.appendChild(style);
    }
    
    addProgressAnimations() {
        // Add smooth transitions to progress elements
        const progressElements = document.querySelectorAll('.progress-fill, .step-number, .step-label');
        progressElements.forEach(element => {
            element.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize multi-step form
    new MultiStepForm();
    
    // Initialize form enhancements
    new FormEnhancements();
});

// ===== CONSOLE LOG =====
console.log('%c📝 Multi-Step Form Initialized', 'color: #10b981; font-size: 14px; font-weight: bold;');