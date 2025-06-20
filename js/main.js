import { fetchProductsData } from './api.js';
import { displayCategoryFilters, displayProducts } from './render.js';
import { setupFilterListeners } from './filter.js';
import { setupPriceRange } from './utils.js';

document.addEventListener('DOMContentLoaded', async function () {
    const { products, categories } = await fetchProductsData();
    displayCategoryFilters(categories);
    displayProducts(products, true);

    setupFilterListeners(products);
    setupPriceRange();
});
