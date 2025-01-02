/* 
F3V3R DR34M KEYGEN STYLE COMMENT: 
ULTIMATE JAVASCRIPT DOMINATION SCRIPT
CODED WITH THE POWER OF 1337 H4X0R PROGRAMMING SKILLS
*/

// Sample dataset for Alugi App
const ALUGI_DATA = {
    categories: [
        { name: 'Ferramentas', description: 'Ferramentas para construção e reforma', icon: 'fas fa-hammer' },
        { name: 'Equipamentos de Festa', description: 'Equipamentos para festas e eventos', icon: 'fas fa-music' },
        { name: 'Eletrônicos', description: 'Eletrônicos para uso pessoal e profissional', icon: 'fas fa-laptop' },
        { name: 'Esportes', description: 'Equipamentos esportivos para atividades ao ar livre', icon: 'fas fa-basketball' }
    ],
    featuredItems: [
        { name: 'Furadeira', description: 'Furadeira para uso em madeira e metal', image: 'furadeira.jpg', dailyRate: 20.00 },
        { name: 'Som de Festa', description: 'Som de festa para eventos e celebrações', image: 'som-de-festa.jpg', dailyRate: 50.00 },
        { name: 'Notebook', description: 'Notebook para uso pessoal e profissional', image: 'notebook.jpg', dailyRate: 30.00 },
        { name: 'Bicicleta', description: 'Bicicleta para atividades ao ar livre', image: 'bicicleta.jpg', dailyRate: 15.00 }
    ],
    testimonials: [
        { text: 'O Alugi App é incrível! Encontrei tudo o que precisava para a minha festa.', name: 'João Silva', rating: 5 },
        { text: 'O Alugi App é muito fácil de usar e tem uma grande variedade de produtos.', name: 'Maria Oliveira', rating: 5 },
        { text: 'O Alugi App é o melhor lugar para encontrar equipamentos esportivos.', name: 'Pedro Souza', rating: 5 }
    ]
};

class AlugiApp {
    constructor() {
        this.data = ALUGI_DATA;
        this.initEventListeners();
        this.initDynamicContent();
        this.updateAuthUI();
    }

    // Initialize all event listeners
    initEventListeners() {
        this.setupSearchFunctionality();
        this.setupMobileMenu();
        this.setupAuthButtons();
    }

    // Initialize dynamic content
    initDynamicContent() {
        this.populateCategories();
        this.populateFeaturedItems();
        this.populateTestimonials();
    }

    // Populate categories dynamically
    populateCategories() {
        const categoryGrid = document.getElementById('category-grid');
        if (categoryGrid) {
            this.data.categories.forEach(category => {
                const categoryElement = document.createElement('div');
                categoryElement.classList.add('category-item');
                categoryElement.innerHTML = `
                    <i class="${category.icon}"></i>
                    <h3>${category.name}</h3>
                    <p>${category.description}</p>
                `;
                categoryElement.addEventListener('click', () => this.selectCategory(category));
                categoryGrid.appendChild(categoryElement);
            });
        }
    }

    // Populate featured items
    populateFeaturedItems() {
        const featuredItemsGrid = document.getElementById('featured-items-grid');
        if (featuredItemsGrid) {
            this.data.featuredItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('featured-item');
                itemElement.innerHTML = `
                    <img src="images/${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="item-footer">
                        <span class="price">R$ ${item.dailyRate.toFixed(2)}/dia</span>
                        <button class="rent-button">Alugar</button>
                    </div>
                `;
                featuredItemsGrid.appendChild(itemElement);
            });
        }
    }

    // Populate testimonials
    populateTestimonials() {
        const testimonialGrid = document.getElementById('testimonial-grid');
        if (testimonialGrid) {
            this.data.testimonials.forEach(testimonial => {
                const testimonialElement = document.createElement('div');
                testimonialElement.classList.add('testimonial-item');
                testimonialElement.innerHTML = `
                    <p>"${testimonial.text}"</p>
                    <div class="testimonial-footer">
                        <span class="name">${testimonial.name}</span>
                        <div class="rating">
                            ${this.generateStarRating(testimonial.rating)}
                        </div>
                    </div>
                `;
                testimonialGrid.appendChild(testimonialElement);
            });
        }
    }

    // Generate star rating
    generateStarRating(rating) {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }

    // Advanced search functionality with debounce
    setupSearchFunctionality() {
        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.search-button');
        
        const debounce = (func, delay) => {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(this, args), delay);
            };
        };

        const debouncedSearch = debounce((query) => {
            this.performSearch(query);
        }, 300);

        if (searchInput && searchButton) {
            searchInput.addEventListener('input', (e) => debouncedSearch(e.target.value));
            searchButton.addEventListener('click', () => debouncedSearch(searchInput.value));
        }
    }

    // Mobile menu toggle
    setupMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuToggle && navLinks) {
            mobileMenuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
            });
        }
    }

    // Category selection method
    selectCategory(category) {
        console.log(`Selected category: ${category.name}`);
        // TODO: Implement category filtering logic
    }

    // Authentication button handlers
    setupAuthButtons() {
        const loginButton = document.querySelector('.login');
        const signupButton = document.querySelector('.signup');

        if (loginButton && signupButton) {
            loginButton.addEventListener('click', this.showLoginModal.bind(this));
            signupButton.addEventListener('click', this.showSignupModal.bind(this));
        }
    }

    // Modal methods (placeholder for future implementation)
    showLoginModal() {
        console.log('Login modal triggered');
        // TODO: Implement login modal
    }

    showSignupModal() {
        console.log('Signup modal triggered');
        // TODO: Implement signup modal
    }

    // Update authentication UI based on login status
    updateAuthUI() {
        const loginButton = document.querySelector('.login');
        const signupButton = document.querySelector('.signup');
        const currentUser = JSON.parse(localStorage.getItem('alugi_current_user'));

        if (loginButton && signupButton) {
            if (currentUser) {
                // User is logged in
                loginButton.textContent = currentUser.name;
                signupButton.textContent = 'Sair';
                
                loginButton.addEventListener('click', () => {
                    // Redirect to user profile or dashboard
                    window.location.href = 'profile.html';
                });
                
                signupButton.addEventListener('click', () => {
                    // Logout
                    localStorage.removeItem('alugi_current_user');
                    this.updateAuthUI();
                    window.location.reload();
                });
            } else {
                // User is not logged in
                loginButton.textContent = 'Entrar';
                signupButton.textContent = 'Cadastrar';
                
                loginButton.addEventListener('click', () => {
                    window.location.href = 'auth.html';
                });
                
                signupButton.addEventListener('click', () => {
                    window.location.href = 'auth.html';
                });
            }
        }
    }

    // Perform item search
    performSearch(query) {
        // First, check if we have an auth system
        const auth = window.AlugiAuth;
        if (!auth) {
            console.error('Authentication system not initialized');
            return;
        }

        // Perform search using the authentication system's search method
        const results = auth.searchItems(query);
        
        // Display search results
        this.displaySearchResults(results);
    }

    // Display search results
    displaySearchResults(results) {
        const searchResultsContainer = document.getElementById('search-results');
        
        // Create container if it doesn't exist
        if (!searchResultsContainer) {
            const container = document.createElement('div');
            container.id = 'search-results';
            container.classList.add('search-results');
            document.body.appendChild(container);
        }

        // Clear previous results
        searchResultsContainer.innerHTML = '';

        if (results.length === 0) {
            searchResultsContainer.innerHTML = '<p>Nenhum item encontrado</p>';
            return;
        }

        // Create result items
        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result-item');
            resultItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span>Categoria: ${item.category}</span>
                <span>Postado por: ${item.userName}</span>
            `;
            searchResultsContainer.appendChild(resultItem);
        });
    }

    // Static utility methods
    static formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    static getCurrentTimestamp() {
        return new Date().toISOString();
    }
}

// Initialize the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    window.AlugiApp = new AlugiApp();
});
