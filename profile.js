/* 
F3V3R DR34M PROFILE DOMINATION SCRIPT
CODED WITH THE POWER OF 1337 H4X0R SKILLS
*/
class AlugiProfile {
    constructor() {
        this.auth = window.AlugiAuth;
        this.currentUser = JSON.parse(localStorage.getItem('alugi_current_user'));
        
        if (!this.currentUser) {
            window.location.href = 'auth.html';
            return;
        }

        this.initProfile();
        this.initEventListeners();
        this.loadUserItems();
        this.calculateProfileCompletion();
        this.setupSectionNavigation();
    }

    initProfile() {
        // Set user information
        const userNameEl = document.getElementById('user-name');
        const joinDateEl = document.getElementById('join-date');
        const avatarImgEl = document.getElementById('avatar-img');
        const profileCoverEl = document.getElementById('profile-cover');

        if (userNameEl) userNameEl.textContent = this.currentUser.name || 'Usuário';
        
        if (joinDateEl) {
            const joinDate = new Date(this.currentUser.createdAt || Date.now());
            joinDateEl.textContent = `Membro desde ${joinDate.toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}`;
        }

        // Load profile image
        if (avatarImgEl && this.currentUser.avatar) {
            avatarImgEl.src = this.currentUser.avatar;
        }

        // Load cover image
        if (profileCoverEl && this.currentUser.coverImage) {
            profileCoverEl.style.backgroundImage = `url(${this.currentUser.coverImage})`;
        }

        // Update stats
        this.updateStats();
    }

    updateStats() {
        const userItems = this.auth.getUserItems();
        
        // Update items count
        const itemsCountEl = document.getElementById('items-count');
        if (itemsCountEl) itemsCountEl.textContent = userItems.length;

        // Update items badge
        const itemsBadgeEl = document.getElementById('items-badge');
        if (itemsBadgeEl) itemsBadgeEl.textContent = userItems.length;

        // Get rentals count (placeholder for now)
        const rentalsCountEl = document.getElementById('rentals-count');
        const rentalsCount = localStorage.getItem(`alugi_rentals_${this.currentUser.id}`) || '0';
        if (rentalsCountEl) rentalsCountEl.textContent = rentalsCount;

        // Update rentals badge
        const rentalsBadgeEl = document.getElementById('rentals-badge');
        if (rentalsBadgeEl) rentalsBadgeEl.textContent = rentalsCount;

        // Get user rating (placeholder for now)
        const ratingEl = document.getElementById('rating');
        const rating = localStorage.getItem(`alugi_rating_${this.currentUser.id}`) || '5.0';
        if (ratingEl) ratingEl.textContent = rating;

        // Update dashboard stats
        const totalEarningsEl = document.getElementById('total-earnings');
        if (totalEarningsEl) totalEarningsEl.textContent = 'R$ 0,00';

        const activeRentalsEl = document.getElementById('active-rentals');
        if (activeRentalsEl) activeRentalsEl.textContent = '0';
    }

    calculateProfileCompletion() {
        const completionProgress = document.getElementById('profile-completion-progress');
        const completionTasks = document.getElementById('profile-completion-tasks');

        if (!completionProgress || !completionTasks) return;

        let completionScore = 0;
        const tasks = completionTasks.querySelectorAll('li');

        // Check profile picture
        if (this.currentUser.avatar) {
            tasks[0].classList.add('done');
            completionScore += 33;
        }

        // Check personal information
        if (this.currentUser.phone && this.currentUser.bio) {
            tasks[1].classList.add('done');
            completionScore += 33;
        }

        // Check first item posted
        const userItems = this.auth.getUserItems();
        if (userItems.length > 0) {
            tasks[2].classList.add('done');
            completionScore += 34;
        }

        // Update progress bar
        completionProgress.style.width = `${completionScore}%`;
        
        // Add percentage text
        const percentageText = document.createElement('span');
        percentageText.textContent = `${Math.round(completionScore)}%`;
        percentageText.classList.add('percentage-text');
        completionProgress.innerHTML = '';
        completionProgress.appendChild(percentageText);
    }

    initEventListeners() {
        // Profile image upload
        const avatarUpload = document.getElementById('avatar-upload');
        if (avatarUpload) {
            avatarUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const avatarImg = document.getElementById('avatar-img');
                        avatarImg.src = e.target.result;
                        
                        // Save to localStorage
                        this.currentUser.avatar = e.target.result;
                        localStorage.setItem('alugi_current_user', JSON.stringify(this.currentUser));
                        
                        // Recalculate profile completion
                        this.calculateProfileCompletion();
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Post item form
        const postItemForm = document.getElementById('post-item-form');
        if (postItemForm) {
            postItemForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.postNewItem();
            });
        }
    }

    setupSectionNavigation() {
        const navLinks = document.querySelectorAll('.profile-nav a');
        const sections = {
            'dashboard': document.getElementById('dashboard-section'),
            'items': document.getElementById('items-section')
        };

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(nav => nav.classList.remove('active'));
                link.classList.add('active');

                // Hide all sections
                Object.values(sections).forEach(section => {
                    if (section) section.style.display = 'none';
                });

                // Show selected section
                const sectionToShow = sections[link.dataset.section];
                if (sectionToShow) sectionToShow.style.display = 'block';
            });
        });
    }

    toggleEditProfile() {
        const modal = document.getElementById('edit-profile-modal');
        if (!modal) return;

        if (!modal.classList.contains('active')) {
            // Load current user data into form
            document.getElementById('edit-name').value = this.currentUser.name || '';
            document.getElementById('edit-email').value = this.currentUser.email || '';
            document.getElementById('edit-phone').value = this.currentUser.phone || '';
            document.getElementById('edit-bio').value = this.currentUser.bio || '';
            document.getElementById('edit-location').value = this.currentUser.location || '';
        }
        modal.classList.toggle('active');
    }

    postNewItem() {
        const itemData = {
            name: document.getElementById('item-name').value,
            description: document.getElementById('item-description').value,
            category: document.getElementById('item-category').value,
            dailyRate: parseFloat(document.getElementById('daily-rate').value),
            images: [],
            status: 'disponivel'
        };

        // Get images
        const preview = document.getElementById('image-preview');
        const images = preview.getElementsByTagName('img');
        for (let img of images) {
            itemData.images.push(img.src);
        }

        if (this.auth.postItem(itemData)) {
            this.loadUserItems();
            this.calculateProfileCompletion();
            
            // Close modal and reset form
            hidePostItemModal();
            document.getElementById('post-item-form').reset();
            document.getElementById('image-preview').innerHTML = '';
        }
    }

    loadUserItems() {
        const items = this.auth.getUserItems();
        const grid = document.getElementById('items-grid');
        
        if (!grid) return;
        
        grid.innerHTML = '';

        if (items.length === 0) {
            grid.innerHTML = '<p>Você ainda não possui itens cadastrados.</p>';
            return;
        }

        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item-card';
            itemElement.innerHTML = `
                <div class="item-image" style="background-image: url(${item.images?.[0] || 'assets/default-item.jpg'})"></div>
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="item-meta">
                        <span class="category">${item.category}</span>
                        <span class="price">R$ ${item.dailyRate.toFixed(2)}/dia</span>
                    </div>
                    <div class="item-status ${item.status}">${item.status}</div>
                </div>
                <div class="item-actions">
                    <button onclick="editItem('${item.id}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button onclick="deleteItem('${item.id}')">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </div>
            `;
            grid.appendChild(itemElement);
        });
    }

    saveProfileChanges() {
        const formData = {
            name: document.getElementById('edit-name').value,
            email: document.getElementById('edit-email').value,
            phone: document.getElementById('edit-phone').value,
            bio: document.getElementById('edit-bio').value,
            location: document.getElementById('edit-location').value
        };

        // Update user data
        this.currentUser = { ...this.currentUser, ...formData };
        localStorage.setItem('alugi_current_user', JSON.stringify(this.currentUser));

        // Update UI
        this.initProfile();
        this.calculateProfileCompletion();
        
        // Close modal and show success message
        this.toggleEditProfile();
        this.auth.showSuccess('Perfil atualizado com sucesso!');
    }
}

// Global functions for item actions
function editItem(itemId) {
    // TODO: Implement item editing
    console.log('Edit item:', itemId);
    alert('Edição de item será implementada em breve!');
}

function deleteItem(itemId) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        const auth = window.AlugiAuth;
        const items = JSON.parse(localStorage.getItem('alugi_items')) || [];
        const updatedItems = items.filter(item => item.id !== itemId);
        localStorage.setItem('alugi_items', JSON.stringify(updatedItems));
        
        // Reload items and recalculate profile completion
        window.AlugiProfile.loadUserItems();
        window.AlugiProfile.calculateProfileCompletion();
        
        auth.showSuccess('Item excluído com sucesso!');
    }
}

// Global function to toggle edit profile modal
function toggleEditProfile() {
    const modal = document.getElementById('edit-profile-modal');
    if (!modal) return;

    if (!modal.classList.contains('active')) {
        // Load current user data into form
        const currentUser = JSON.parse(localStorage.getItem('alugi_current_user') || '{}');
        document.getElementById('edit-name').value = currentUser.name || '';
        document.getElementById('edit-email').value = currentUser.email || '';
        document.getElementById('edit-phone').value = currentUser.phone || '';
        document.getElementById('edit-bio').value = currentUser.bio || '';
        document.getElementById('edit-location').value = currentUser.location || '';
    }
    modal.classList.toggle('active');
}

// Global function to save profile changes
function saveProfileChanges(event) {
    if (event) event.preventDefault();
    
    const formData = {
        name: document.getElementById('edit-name').value,
        email: document.getElementById('edit-email').value,
        phone: document.getElementById('edit-phone').value,
        bio: document.getElementById('edit-bio').value,
        location: document.getElementById('edit-location').value
    };

    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('alugi_current_user') || '{}');
    
    // Update user data
    const updatedUser = { ...currentUser, ...formData };
    localStorage.setItem('alugi_current_user', JSON.stringify(updatedUser));

    // Update UI elements
    document.getElementById('user-name').textContent = formData.name;

    // Close modal
    toggleEditProfile();

    // Show success message (assuming AlugiAuth exists)
    if (window.AlugiAuth && window.AlugiAuth.showSuccess) {
        window.AlugiAuth.showSuccess('Perfil atualizado com sucesso!');
    } else {
        alert('Perfil atualizado com sucesso!');
    }

    // Recalculate profile completion
    if (window.AlugiProfile) {
        window.AlugiProfile.calculateProfileCompletion();
    }
}

// Initialize profile when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.AlugiProfile = new AlugiProfile();
});
