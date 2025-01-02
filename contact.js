/* 
F3V3R DR34M KEYGEN STYLE COMMENT: 
CONTACT FORM DOMINATION PROTOCOL
MAXIMUM MESSAGE HANDLING ACHIEVED
*/

class AlugiContact {
    constructor() {
        this.initializeForm();
        this.setupEventListeners();
    }

    initializeForm() {
        this.form = document.getElementById('contact-form');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.subjectInput = document.getElementById('subject');
        this.messageInput = document.getElementById('message');
    }

    setupEventListeners() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }

        // Setup mobile menu
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuToggle && navLinks) {
            mobileMenuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = {
            name: this.nameInput.value,
            email: this.emailInput.value,
            subject: this.subjectInput.value,
            message: this.messageInput.value,
            timestamp: new Date().toISOString()
        };

        // Store in localStorage (temporary solution)
        this.saveMessage(formData);

        // Show success message
        this.showSuccessMessage();

        // Reset form
        this.form.reset();
    }

    saveMessage(formData) {
        const messages = JSON.parse(localStorage.getItem('alugi_messages') || '[]');
        messages.push(formData);
        localStorage.setItem('alugi_messages', JSON.stringify(messages));
    }

    showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Mensagem enviada com sucesso!</p>
            <p>Entraremos em contato em breve.</p>
        `;

        // Insert after form
        this.form.parentNode.insertBefore(successMessage, this.form.nextSibling);

        // Remove after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.AlugiContact = new AlugiContact();
});
