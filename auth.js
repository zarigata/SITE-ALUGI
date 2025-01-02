/* 
F3V3R DR34M KEYGEN STYLE COMMENT: 
ULTIMATE AUTHENTICATION DOMINATION SCRIPT
CODED WITH THE POWER OF 1337 H4X0R SECURITY SKILLS
*/

class AlugiAuth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('alugi_users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('alugi_current_user')) || null;
        this.items = JSON.parse(localStorage.getItem('alugi_items')) || [];
        
        this.initEventListeners();
        this.checkAuthMode();
    }

    initEventListeners() {
        // Toggle between login and register forms
        const showRegister = document.getElementById('show-register');
        const showLogin = document.getElementById('show-login');
        const loginContainer = document.querySelector('.login-container');
        const registerContainer = document.querySelector('.register-container');

        if (showRegister && showLogin && loginContainer && registerContainer) {
            showRegister.addEventListener('click', (e) => {
                e.preventDefault();
                loginContainer.style.display = 'none';
                registerContainer.style.display = 'block';
            });

            showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                registerContainer.style.display = 'none';
                loginContainer.style.display = 'block';
            });
        }

        // Register form submission
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.registerUser();
            });
        }

        // Login form submission
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.loginUser();
            });
        }

        // Back to home button
        const backButton = document.querySelector('.back-to-home');
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
    }

    checkAuthMode() {
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode');
        
        const loginContainer = document.querySelector('.login-container');
        const registerContainer = document.querySelector('.register-container');
        
        if (mode === 'signup' && loginContainer && registerContainer) {
            loginContainer.style.display = 'none';
            registerContainer.style.display = 'block';
        }
    }

    registerUser() {
        const nameInput = document.getElementById('register-name');
        const emailInput = document.getElementById('register-email');
        const passwordInput = document.getElementById('register-password');
        const confirmPasswordInput = document.getElementById('register-confirm-password');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validation
        if (password !== confirmPassword) {
            this.showError('As senhas não coincidem');
            return;
        }

        if (this.users.some(user => user.email === email)) {
            this.showError('Este email já está cadastrado');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password: this.hashPassword(password), // In a real app, use proper encryption
            items: [],
            createdAt: new Date().toISOString()
        };

        // Add user to users array
        this.users.push(newUser);
        localStorage.setItem('alugi_users', JSON.stringify(this.users));

        // Auto login after registration
        this.currentUser = { ...newUser, password: undefined };
        localStorage.setItem('alugi_current_user', JSON.stringify(this.currentUser));

        // Show success message and redirect
        this.showSuccess('Cadastro realizado com sucesso!');
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1500);
    }

    loginUser() {
        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-password');

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Find user
        const user = this.users.find(u => u.email === email);

        if (!user || user.password !== this.hashPassword(password)) {
            this.showError('Email ou senha incorretos');
            return;
        }

        // Set current user
        this.currentUser = { ...user, password: undefined };
        localStorage.setItem('alugi_current_user', JSON.stringify(this.currentUser));

        // Show success message and redirect
        this.showSuccess('Login realizado com sucesso!');
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1500);
    }

    hashPassword(password) {
        // Simple hash function (DO NOT use in production)
        return btoa(password);
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'auth-message error';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        this.showMessage(errorDiv);
    }

    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'auth-message success';
        successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        this.showMessage(successDiv);
    }

    showMessage(messageDiv) {
        const container = document.querySelector('.auth-wrapper');
        const existingMessage = document.querySelector('.auth-message');
        
        if (existingMessage) {
            existingMessage.remove();
        }

        container.insertBefore(messageDiv, container.firstChild);
        setTimeout(() => messageDiv.remove(), 5000);
    }

    // Method to check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Method to log out user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('alugi_current_user');
        window.location.href = 'index.html';
    }

    // Method to post a new item
    postItem(itemData) {
        if (!this.currentUser) {
            this.showError('Você precisa estar logado para postar um item');
            return false;
        }

        const newItem = {
            id: Date.now().toString(),
            ...itemData,
            userId: this.currentUser.id,
            userName: this.currentUser.name,
            createdAt: new Date().toISOString(),
            status: 'available'
        };

        // Add item to items array
        this.items.push(newItem);
        localStorage.setItem('alugi_items', JSON.stringify(this.items));

        // Add item to user's items
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            if (!this.users[userIndex].items) {
                this.users[userIndex].items = [];
            }
            this.users[userIndex].items.push(newItem.id);
            localStorage.setItem('alugi_users', JSON.stringify(this.users));
        }

        this.showSuccess('Item postado com sucesso!');
        return true;
    }

    // Method to get user's items
    getUserItems() {
        if (!this.currentUser) return [];
        return this.items.filter(item => item.userId === this.currentUser.id);
    }

    // Method to search items
    searchItems(query) {
        query = query.toLowerCase();
        return this.items.filter(item => 
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
    }
}

// Initialize authentication when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.AlugiAuth = new AlugiAuth();
});
