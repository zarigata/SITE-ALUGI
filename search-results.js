/* 
F3V3R DR34M SEARCH RESULTS DOMINATION SCRIPT
CODED WITH THE POWER OF 1337 H4X0R SKILLS
*/
document.addEventListener('DOMContentLoaded', () => {
    const searchResultsGrid = document.getElementById('search-results-grid');
    const searchQueryText = document.getElementById('search-query-text');
    const resultsCount = document.getElementById('results-count');
    const noResultsSection = document.getElementById('no-results');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const sortSelect = document.getElementById('sort-select');
    const resetSearchBtn = document.getElementById('reset-search');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const currentPageSpan = document.getElementById('current-page');

    // Pagination and search state
    let currentPage = 1;
    const itemsPerPage = 12;
    let totalResults = [];
    let filteredResults = [];

    // Retrieve search results from localStorage
    const searchResults = JSON.parse(localStorage.getItem('alugi_search_results') || '[]');
    const searchQuery = localStorage.getItem('alugi_last_search_query') || '';

    // Display search query and results count
    function updateSearchInfo(results) {
        if (searchQueryText) {
            searchQueryText.textContent = `Resultados para: "${searchQuery}"`;
        }
        if (resultsCount) {
            resultsCount.textContent = `${results.length} resultado(s) encontrado(s)`;
        }
    }

    // Render search results with pagination
    function renderSearchResults(results) {
        if (!searchResultsGrid) return;

        searchResultsGrid.innerHTML = '';

        if (results.length === 0) {
            if (noResultsSection) noResultsSection.style.display = 'block';
            searchResultsGrid.style.display = 'none';
            updatePagination(0);
            return;
        }

        if (noResultsSection) noResultsSection.style.display = 'none';
        searchResultsGrid.style.display = 'grid';

        // Pagination logic
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageResults = results.slice(startIndex, endIndex);

        pageResults.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.dataset.status = item.status;
            itemCard.innerHTML = `
                <div class="item-image" style="background-image: url(${item.images?.[0] || 'assets/default-item.jpg'})">
                    <div class="item-status-badge ${item.status}">${item.status}</div>
                </div>
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p class="item-description">${item.description}</p>
                    <div class="item-meta">
                        <span class="category"><i class="fas fa-tag"></i> ${item.category}</span>
                        <span class="price"><i class="fas fa-dollar-sign"></i> R$ ${item.dailyRate.toFixed(2)}/dia</span>
                    </div>
                </div>
                <div class="item-actions">
                    <button onclick="viewItemDetails('${item.id}')" class="details-btn">
                        <i class="fas fa-eye"></i> Detalhes
                    </button>
                    <button onclick="addToFavorites('${item.id}')" class="favorite-btn">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            `;
            searchResultsGrid.appendChild(itemCard);
        });

        updatePagination(results.length);
        updateSearchInfo(results);
    }

    // Pagination update
    function updatePagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        if (currentPageSpan) {
            currentPageSpan.textContent = `Página ${currentPage} de ${totalPages}`;
        }

        if (prevPageBtn) {
            prevPageBtn.disabled = currentPage === 1;
        }

        if (nextPageBtn) {
            nextPageBtn.disabled = currentPage === totalPages;
        }
    }

    // Sort results
    function sortResults(results, sortMethod) {
        switch(sortMethod) {
            case 'preco-asc':
                return results.sort((a, b) => a.dailyRate - b.dailyRate);
            case 'preco-desc':
                return results.sort((a, b) => b.dailyRate - a.dailyRate);
            default:
                return results; // relevancia
        }
    }

    // Initial render
    totalResults = searchResults;
    renderSearchResults(totalResults);

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            
            filteredResults = filter === 'todos' 
                ? totalResults 
                : totalResults.filter(item => item.status.toLowerCase() === filter);

            currentPage = 1; // Reset to first page
            renderSearchResults(filteredResults);
        });
    });

    // Sorting functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortMethod = sortSelect.value;
            const resultsToSort = filteredResults.length > 0 ? filteredResults : totalResults;
            const sortedResults = sortResults(resultsToSort, sortMethod);
            
            currentPage = 1; // Reset to first page
            renderSearchResults(sortedResults);
        });
    }

    // Pagination event listeners
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderSearchResults(filteredResults.length > 0 ? filteredResults : totalResults);
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil((filteredResults.length > 0 ? filteredResults : totalResults).length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderSearchResults(filteredResults.length > 0 ? filteredResults : totalResults);
            }
        });
    }

    // Reset search functionality
    if (resetSearchBtn) {
        resetSearchBtn.addEventListener('click', () => {
            localStorage.removeItem('alugi_search_results');
            localStorage.removeItem('alugi_last_search_query');
            window.location.href = 'index.html';
        });
    }

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

    // Placeholder functions for future implementation
    window.viewItemDetails = (itemId) => {
        // TODO: Implement item details modal or page
        console.log('View details for item:', itemId);
        alert('Detalhes do item serão implementados em breve!');
    };

    window.addToFavorites = (itemId) => {
        // TODO: Implement favorites functionality
        console.log('Add to favorites:', itemId);
        alert('Favoritos serão implementados em breve!');
    };
}); 
