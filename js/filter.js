
import { displayProducts } from './render.js';

export function setupFilterListeners(products) {
    const categoryFilters = document.getElementById('category-filters');
    const priceRange = document.getElementById('price-range');
    const priceRangeValue = document.getElementById('price-range-value');
    const sortBy = document.getElementById('sort-by');

    function filterAndSortProducts() {
        const selectedCategories = Array.from(document.querySelectorAll('#category-filters input[type="checkbox"]:checked')).map(input => input.value);
        const maxPrice = parseInt(priceRange.value);

        let filtered = products.filter(product =>
            (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
            product.price <= maxPrice
        );

        filtered.sort((a, b) => {
            if (sortBy.value === 'price-asc') return a.price - b.price;
            if (sortBy.value === 'price-down') return b.price - a.price;
            if (sortBy.value === 'rating') return b.rating - a.rating;
            if (sortBy.value === 'name') return a.name.localeCompare(b.name);
            return 0;
        });

        displayProducts(filtered, false);
    }

    categoryFilters.addEventListener('change', filterAndSortProducts);
    priceRange.addEventListener('input', function () {
        priceRangeValue.textContent = `0 - ${priceRange.value}`;
        filterAndSortProducts();
    });
    sortBy.addEventListener('change', filterAndSortProducts);
}
