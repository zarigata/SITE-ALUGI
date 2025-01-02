/* 
F3V3R DR34M KEYGEN STYLE COMMENT: 
ULTIMATE DATA DOMINATION SCRIPT
CODED WITH THE POWER OF 1337 H4X0R DATA SKILLS
*/

const ALUGI_DATA = {
    categories: [
        {
            id: 'tools',
            name: 'Ferramentas',
            icon: 'fas fa-tools',
            description: 'Alugue ferramentas profissionais e domésticas'
        },
        {
            id: 'party-equipment',
            name: 'Equipamentos de Festa',
            icon: 'fas fa-birthday-cake',
            description: 'Encontre tudo para sua festa perfeita'
        },
        {
            id: 'electronics',
            name: 'Eletrônicos',
            icon: 'fas fa-laptop',
            description: 'Alugue os melhores eletrônicos'
        },
        {
            id: 'sports',
            name: 'Esportes',
            icon: 'fas fa-futbol',
            description: 'Equipamentos esportivos para todos os níveis'
        },
        {
            id: 'cameras',
            name: 'Câmeras',
            icon: 'fas fa-camera',
            description: 'Capture momentos especiais com câmeras profissionais'
        },
        {
            id: 'musical-instruments',
            name: 'Instrumentos Musicais',
            icon: 'fas fa-guitar',
            description: 'Experimente novos sons sem grande investimento'
        }
    ],
    featuredItems: [
        {
            id: 'dslr-camera',
            name: 'Câmera DSLR Profissional',
            category: 'cameras',
            dailyRate: 89.90,
            description: 'Câmera Canon profissional para fotógrafos',
            image: 'camera.jpg'
        },
        {
            id: 'power-drill',
            name: 'Furadeira Industrial',
            category: 'tools',
            dailyRate: 49.90,
            description: 'Furadeira potente para projetos profissionais',
            image: 'drill.jpg'
        },
        {
            id: 'sound-system',
            name: 'Sistema de Som Completo',
            category: 'party-equipment',
            dailyRate: 199.90,
            description: 'Sistema de som para festas e eventos',
            image: 'sound-system.jpg'
        }
    ],
    testimonials: [
        {
            name: 'João Silva',
            text: 'Aluguei uma câmera profissional para meu casamento e foi incrível!',
            rating: 5
        },
        {
            name: 'Maria Souza',
            text: 'Encontrei todas as ferramentas que precisava para meu projeto de reforma.',
            rating: 4
        },
        {
            name: 'Pedro Santos',
            text: 'Economia e praticidade em um só lugar. Recomendo!',
            rating: 5
        }
    ],
    howItWorks: [
        {
            step: 1,
            title: 'Encontre',
            description: 'Pesquise o item que você precisa em nossa plataforma',
            icon: 'fas fa-search'
        },
        {
            step: 2,
            title: 'Contate',
            description: 'Converse diretamente com o proprietário do item',
            icon: 'fas fa-comment'
        },
        {
            step: 3,
            title: 'Alugue',
            description: 'Faça seu aluguel de forma segura e rápida',
            icon: 'fas fa-handshake'
        },
        {
            step: 4,
            title: 'Desfrute',
            description: 'Use o item e devolva no prazo combinado',
            icon: 'fas fa-smile'
        }
    ],
    // F3V3R DR34M SEARCH DOMINATION FUNCTION
    searchItems(query) {
        // Normalize query for case-insensitive and accent-insensitive search
        const normalizedQuery = this.normalizeString(query.toLowerCase());
        
        // Get all items from localStorage
        const allItems = JSON.parse(localStorage.getItem('alugi_items')) || [];
        
        // Perform search across multiple fields
        const searchResults = allItems.filter(item => {
            const nameMatch = this.normalizeString(item.name.toLowerCase()).includes(normalizedQuery);
            const descriptionMatch = this.normalizeString(item.description.toLowerCase()).includes(normalizedQuery);
            const categoryMatch = this.normalizeString(item.category.toLowerCase()).includes(normalizedQuery);
            
            return nameMatch || descriptionMatch || categoryMatch;
        });
        
        // Store search results in localStorage for retrieval on search results page
        localStorage.setItem('alugi_search_results', JSON.stringify(searchResults));
        
        return searchResults;
    },
    
    // Utility function to normalize strings for better search
    normalizeString(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9 ]/g, '');
    },
};
