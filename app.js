/* 
F3V3R DR34M KEYGEN STYLE COMMENT: 
ULTIMATE JAVASCRIPT DOMINATION SCRIPT
CODED WITH THE POWER OF 1337 H4X0R PROGRAMMING SKILLS
*/

// Using ALUGI_DATA from data.js

class AlugiApp {
    constructor() {
        this.data = ALUGI_DATA;
        this.initEventListeners();
        this.initDynamicContent();
        this.updateAuthUI();
        this.initSearchFunctionality();
    }

    // Initialize all event listeners
    initEventListeners() {
        this.setupSearchFunctionality();
        this.setupMobileMenu();
        this.setupAuthButtons();
        this.setupContactNavigation();
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

    // Setup authentication buttons
    setupAuthButtons() {
        const loginBtn = document.querySelector('.login');
        const signupBtn = document.querySelector('.signup');
        
        if (loginBtn && signupBtn) {
            // Check if user is logged in
            const currentUser = JSON.parse(localStorage.getItem('alugi_current_user'));
            
            if (currentUser) {
                // User is logged in, show profile and logout buttons
                loginBtn.textContent = 'Perfil';
                signupBtn.textContent = 'Sair';
                
                loginBtn.addEventListener('click', () => {
                    window.location.href = 'profile.html';
                });
                
                signupBtn.addEventListener('click', () => {
                    localStorage.removeItem('alugi_current_user');
                    window.location.reload();
                });
            } else {
                // User is not logged in, show login and signup buttons
                loginBtn.addEventListener('click', () => {
                    window.location.href = 'auth.html?mode=login';
                });
                
                signupBtn.addEventListener('click', () => {
                    window.location.href = 'auth.html?mode=signup';
                });
            }
        }
    }

    // Setup contact navigation
    setupContactNavigation() {
        const contactLink = document.querySelector('a[href="#contact"]');
        if (contactLink) {
            contactLink.addEventListener('click', (e) => {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Handle contact form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = {
                    name: contactForm.querySelector('#name').value,
                    email: contactForm.querySelector('#email').value,
                    message: contactForm.querySelector('#message').value
                };

                // Store the message in localStorage for now
                const messages = JSON.parse(localStorage.getItem('alugi_messages') || '[]');
                messages.push({
                    ...formData,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('alugi_messages', JSON.stringify(messages));

                // Show success message
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
            });
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
        const authButtons = document.querySelector('.auth-buttons');
        if (!authButtons) return;

        // Clear existing buttons
        authButtons.innerHTML = '';

        const currentUser = JSON.parse(localStorage.getItem('alugi_current_user'));

        if (currentUser) {
            // User is logged in
            const profileButton = document.createElement('button');
            profileButton.className = 'login';
            profileButton.textContent = currentUser.name;
            profileButton.onclick = () => window.location.href = 'profile.html';

            const logoutButton = document.createElement('button');
            logoutButton.className = 'signup';
            logoutButton.textContent = 'Sair';
            logoutButton.onclick = () => {
                localStorage.removeItem('alugi_current_user');
                window.location.reload();
            };

            authButtons.appendChild(profileButton);
            authButtons.appendChild(logoutButton);
        } else {
            // User is not logged in
            const loginButton = document.createElement('button');
            loginButton.className = 'login';
            loginButton.textContent = 'Entrar';
            loginButton.onclick = () => window.location.href = 'auth.html';

            const signupButton = document.createElement('button');
            signupButton.className = 'signup';
            signupButton.textContent = 'Cadastrar';
            signupButton.onclick = () => window.location.href = 'auth.html';

            authButtons.appendChild(loginButton);
            authButtons.appendChild(signupButton);
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

    // F3V3R DR34M SEARCH DOMINATION FUNCTION
    initSearchFunctionality() {
        const mainSearchInput = document.getElementById('main-search-input');
        const mainSearchButton = document.getElementById('main-search-button');

        function performSearch() {
            const query = mainSearchInput.value.trim();
            if (query) {
                // Use the search method from AlugiData
                const results = window.AlugiData.searchItems(query);
                
                // Store the search query for the results page
                localStorage.setItem('alugi_last_search_query', query);
                
                // Redirect to search results page
                window.location.href = 'search-results.html';
            }
        }

        // Add event listeners for search
        if (mainSearchButton) {
            mainSearchButton.addEventListener('click', performSearch);
        }
        if (mainSearchInput) {
            mainSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') performSearch();
            });
        }
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
