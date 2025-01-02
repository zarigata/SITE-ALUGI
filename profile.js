/* 
F3V3R DR34M KEYGEN STYLE COMMENT: 
ULTIMATE PROFILE DOMINATION SCRIPT
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
    }

    initProfile() {
        // Set user information
        document.getElementById('user-name').textContent = this.currentUser.name;
        document.getElementById('join-date').textContent = new Date(this.currentUser.createdAt).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Load profile image if exists
        const avatarImg = document.getElementById('avatar-img');
        if (this.currentUser.avatar) {
            avatarImg.src = this.currentUser.avatar;
        }

        // Load cover image if exists
        const profileCover = document.getElementById('profile-cover');
        if (this.currentUser.coverImage) {
            profileCover.style.backgroundImage = `url(${this.currentUser.coverImage})`;
        }

        // Update stats
        this.updateStats();
    }

    updateStats() {
        const userItems = this.auth.getUserItems();
        document.getElementById('items-count').textContent = userItems.length;

        // Get rentals count (placeholder for now)
        const rentalsCount = localStorage.getItem(`alugi_rentals_${this.currentUser.id}`) || '0';
        document.getElementById('rentals-count').textContent = rentalsCount;

        // Get user rating (placeholder for now)
        const rating = localStorage.getItem(`alugi_rating_${this.currentUser.id}`) || '5.0';
        document.getElementById('rating').textContent = rating;
    }

    initEventListeners() {
        // Profile image upload
        document.getElementById('avatar-upload').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const avatarImg = document.getElementById('avatar-img');
                    avatarImg.src = e.target.result;
                    
                    // Save to localStorage
                    this.currentUser.avatar = e.target.result;
                    localStorage.setItem('alugi_current_user', JSON.stringify(this.currentUser));
                };
                reader.readAsDataURL(file);
            }
        });

        // Cover image upload
        document.getElementById('cover-upload').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const profileCover = document.getElementById('profile-cover');
                    profileCover.style.backgroundImage = `url(${e.target.result})`;
                    
                    // Save to localStorage
                    this.currentUser.coverImage = e.target.result;
                    localStorage.setItem('alugi_current_user', JSON.stringify(this.currentUser));
                };
                reader.readAsDataURL(file);
            }
        });

        // Post item form
        document.getElementById('post-item-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.postNewItem();
        });

        // Item images upload
        document.getElementById('item-images').addEventListener('change', (e) => {
            const files = e.target.files;
            const preview = document.getElementById('image-preview');
            preview.innerHTML = '';

            for (let i = 0; i < Math.min(files.length, 5); i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    preview.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });

        // Edit profile form
        document.getElementById('edit-profile-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProfileChanges();
        });

        // Navigation
        document.querySelectorAll('.profile-nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                document.querySelectorAll('.profile-nav a').forEach(a => a.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Items filters
        document.querySelectorAll('.items-filters button').forEach(button => {
            button.addEventListener('click', (e) => {
                document.querySelectorAll('.items-filters button').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterItems(e.target.textContent.split(' ')[0].toLowerCase());
            });
        });
    }

    postNewItem() {
        const itemData = {
            name: document.getElementById('item-name').value,
            description: document.getElementById('item-description').value,
            category: document.getElementById('item-category').value,
            dailyRate: parseFloat(document.getElementById('daily-rate').value),
            images: [],
            status: 'available'
        };

        // Get images
        const preview = document.getElementById('image-preview');
        const images = preview.getElementsByTagName('img');
        for (let img of images) {
            itemData.images.push(img.src);
        }

        if (this.auth.postItem(itemData)) {
            this.loadUserItems();
            hidePostItemModal();
            document.getElementById('post-item-form').reset();
            document.getElementById('image-preview').innerHTML = '';
        }
    }

    loadUserItems() {
        const items = this.auth.getUserItems();
        const grid = document.getElementById('items-grid');
        grid.innerHTML = '';

        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item-card';
            itemElement.innerHTML = `
                <div class="item-image" style="background-image: url(${item.images?.[0] || 'default-item.jpg'})"></div>
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

    filterItems(filter) {
        const items = document.querySelectorAll('.item-card');
        items.forEach(item => {
            const status = item.querySelector('.item-status').textContent.toLowerCase();
            if (filter === 'todos' || status === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
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
        document.getElementById('user-name').textContent = formData.name;
        
        // Close modal and show success message
        toggleEditProfile();
        this.auth.showSuccess('Perfil atualizado com sucesso!');
    }
}

// Modal functions
function toggleEditProfile() {
    const modal = document.getElementById('edit-profile-modal');
    if (!modal.classList.contains('active')) {
        // Load current user data into form
        const currentUser = JSON.parse(localStorage.getItem('alugi_current_user'));
        document.getElementById('edit-name').value = currentUser.name || '';
        document.getElementById('edit-email').value = currentUser.email || '';
        document.getElementById('edit-phone').value = currentUser.phone || '';
        document.getElementById('edit-bio').value = currentUser.bio || '';
        document.getElementById('edit-location').value = currentUser.location || '';
    }
    modal.classList.toggle('active');
}

function showPostItemModal() {
    document.getElementById('post-item-modal').classList.add('active');
}

function hidePostItemModal() {
    document.getElementById('post-item-modal').classList.remove('active');
}

function editItem(itemId) {
    // TODO: Implement item editing
    console.log('Edit item:', itemId);
}

function deleteItem(itemId) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        const auth = window.AlugiAuth;
        const items = JSON.parse(localStorage.getItem('alugi_items')) || [];
        const updatedItems = items.filter(item => item.id !== itemId);
        localStorage.setItem('alugi_items', JSON.stringify(updatedItems));
        window.AlugiProfile.loadUserItems();
        auth.showSuccess('Item excluído com sucesso!');
    }
}

// Initialize profile when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.AlugiProfile = new AlugiProfile();
});
