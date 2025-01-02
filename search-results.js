/* 
F3V3R DR34M SEARCH RESULTS DOMINATION SCRIPT
CODED WITH THE POWER OF 1337 H4X0R SKILLS
*/
document.addEventListener('DOMContentLoaded', () => {
    const searchResultsGrid = document.getElementById('search-results-grid');
    const searchQueryText = document.getElementById('search-query-text');
    const noResultsSection = document.getElementById('no-results');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // Retrieve search results from localStorage
    const searchResults = JSON.parse(localStorage.getItem('alugi_search_results') || '[]');
    const searchQuery = localStorage.getItem('alugi_last_search_query') || '';

    // Display search query
    if (searchQueryText) {
        searchQueryText.textContent = `Resultados para: "${searchQuery}"`;
    }

    // Render search results
    function renderSearchResults(results) {
        if (!searchResultsGrid) return;

        searchResultsGrid.innerHTML = '';

        if (results.length === 0) {
            if (noResultsSection) noResultsSection.style.display = 'block';
            searchResultsGrid.style.display = 'none';
            return;
        }

        if (noResultsSection) noResultsSection.style.display = 'none';
        searchResultsGrid.style.display = 'grid';

        results.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.dataset.status = item.status;
            itemCard.innerHTML = `
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
                    <button onclick="viewItemDetails('${item.id}')">
                        <i class="fas fa-eye"></i> Detalhes
                    </button>
                </div>
            `;
            searchResultsGrid.appendChild(itemCard);
        });
    }

    // Initial render
    renderSearchResults(searchResults);

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            
            // Filter results
            const filteredResults = filter === 'todos' 
                ? searchResults 
                : searchResults.filter(item => item.status.toLowerCase() === filter);

            renderSearchResults(filteredResults);
        });
    });

    // New search functionality
    function performSearch() {
        const query = searchInput ? searchInput.value.trim() : '';
        if (query) {
            const results = window.AlugiData.searchItems(query);
            localStorage.setItem('alugi_last_search_query', query);
            localStorage.setItem('alugi_search_results', JSON.stringify(results));
            window.location.href = 'search-results.html';
        }
    }

    // Event listeners for search
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Item details view (placeholder)
    window.viewItemDetails = (itemId) => {
        // TODO: Implement item details modal or page
        console.log('View details for item:', itemId);
        alert('Detalhes do item serão implementados em breve!');
    };
});
