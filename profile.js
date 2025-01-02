/* 
F3V3R DR34M KEYGEN STYLE COMMENT: 
ULTIMATE PROFILE MANAGEMENT DOMINATION SCRIPT
CODED WITH THE POWER OF 1337 H4X0R SKILLS
*/

class AlugiProfile {
    constructor() {
        this.auth = window.AlugiAuth;
        this.currentUser = JSON.parse(localStorage.getItem('alugi_current_user'));
        
        if (!this.currentUser) {
            // Redirect to login if no user is logged in
            window.location.href = 'auth.html';
            return;
        }

        this.initEventListeners();
        this.populateUserDetails();
        this.loadUserItems();
    }

    initEventListeners() {
        const postItemForm = document.getElementById('post-item-form');
        if (postItemForm) {
            postItemForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.postNewItem();
            });
        }
    }

    populateUserDetails() {
        const userDetailsContainer = document.getElementById('user-details');
        if (userDetailsContainer) {
            userDetailsContainer.innerHTML = `
                <h2>${this.currentUser.name}</h2>
                <p>Email: ${this.currentUser.email}</p>
                <p>Itens postados: ${this.currentUser.items ? this.currentUser.items.length : 0}</p>
            `;
        }
    }

    postNewItem() {
        const itemName = document.getElementById('item-name').value;
        const itemDescription = document.getElementById('item-description').value;
        const itemCategory = document.getElementById('item-category').value;
        const dailyRate = parseFloat(document.getElementById('daily-rate').value);

        const itemData = {
            name: itemName,
            description: itemDescription,
            category: itemCategory,
            dailyRate: dailyRate
        };

        // Use authentication system to post item
        if (this.auth.postItem(itemData)) {
            alert('Item postado com sucesso!');
            this.loadUserItems();
            
            // Reset form
            document.getElementById('post-item-form').reset();
        }
    }

    loadUserItems() {
        const itemsGrid = document.getElementById('items-grid');
        if (!itemsGrid) return;

        // Clear previous items
        itemsGrid.innerHTML = '';

        // Get all items
        const allItems = JSON.parse(localStorage.getItem('alugi_items')) || [];
        
        // Filter items by current user
        const userItems = allItems.filter(item => item.userId === this.currentUser.id);

        if (userItems.length === 0) {
            itemsGrid.innerHTML = '<p>Você ainda não postou nenhum item</p>';
            return;
        }

        // Populate items grid
        userItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item-card');
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="item-details">
                    <span>Categoria: ${item.category}</span>
                    <span>Valor: R$ ${item.dailyRate.toFixed(2)}/dia</span>
                </div>
                <div class="item-actions">
                    <button class="edit-item" data-id="${item.id}">Editar</button>
                    <button class="delete-item" data-id="${item.id}">Excluir</button>
                </div>
            `;

            // Add event listeners for edit and delete
            const editButton = itemElement.querySelector('.edit-item');
            const deleteButton = itemElement.querySelector('.delete-item');

            editButton.addEventListener('click', () => this.editItem(item.id));
            deleteButton.addEventListener('click', () => this.deleteItem(item.id));

            itemsGrid.appendChild(itemElement);
        });
    }

    editItem(itemId) {
        // TODO: Implement item editing functionality
        alert('Edição de item será implementada em breve');
    }

    deleteItem(itemId) {
        if (!confirm('Tem certeza que deseja excluir este item?')) return;

        // Remove item from items array
        const allItems = JSON.parse(localStorage.getItem('alugi_items')) || [];
        const updatedItems = allItems.filter(item => item.id !== itemId);
        localStorage.setItem('alugi_items', JSON.stringify(updatedItems));

        // Remove item ID from user's items
        const users = JSON.parse(localStorage.getItem('alugi_users')) || [];
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            users[userIndex].items = users[userIndex].items.filter(id => id !== itemId);
            localStorage.setItem('alugi_users', JSON.stringify(users));
        }

        // Reload items
        this.loadUserItems();
    }
}

// Initialize profile when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.AlugiProfile = new AlugiProfile();
});
