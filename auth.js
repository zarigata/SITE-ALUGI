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
    }

    registerUser() {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        // Basic validation
        if (password !== confirmPassword) {
            alert('As senhas não coincidem');
            return;
        }

        // Check if user already exists
        if (this.users.some(user => user.email === email)) {
            alert('Este email já está cadastrado');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password: this.hashPassword(password),
            items: []
        };

        this.users.push(newUser);
        localStorage.setItem('alugi_users', JSON.stringify(this.users));
        
        alert('Cadastro realizado com sucesso!');
        
        // Automatically log in the user
        this.currentUser = newUser;
        localStorage.setItem('alugi_current_user', JSON.stringify(newUser));
        
        // Redirect to home page or dashboard
        window.location.href = 'index.html';
    }

    loginUser() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const user = this.users.find(u => u.email === email && this.verifyPassword(password, u.password));

        if (user) {
            this.currentUser = user;
            localStorage.setItem('alugi_current_user', JSON.stringify(user));
            alert('Login realizado com sucesso!');
            window.location.href = 'index.html';
        } else {
            alert('Email ou senha incorretos');
        }
    }

    // Simple password hashing (not cryptographically secure, for demonstration)
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    verifyPassword(inputPassword, storedHash) {
        return this.hashPassword(inputPassword) === storedHash;
    }

    // Method to post a new item
    postItem(itemData) {
        if (!this.currentUser) {
            alert('Você precisa estar logado para postar um item');
            return false;
        }

        const newItem = {
            id: Date.now().toString(),
            ...itemData,
            userId: this.currentUser.id,
            userName: this.currentUser.name
        };

        this.items.push(newItem);
        localStorage.setItem('alugi_items', JSON.stringify(this.items));

        // Add item to user's items
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.users[userIndex].items.push(newItem.id);
            localStorage.setItem('alugi_users', JSON.stringify(this.users));
        }

        return true;
    }

    // Method to search items
    searchItems(query) {
        return this.items.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Logout method
    logout() {
        this.currentUser = null;
        localStorage.removeItem('alugi_current_user');
        window.location.href = 'index.html';
    }
}

// Initialize authentication when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.AlugiAuth = new AlugiAuth();
});
