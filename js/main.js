import { fetchProductsData } from './api.js';
import { displayCategoryFilters, displayProducts } from './render.js';
import { setupFilterListeners } from './filter.js';
import { setupPriceRange } from './utils.js';

document.documentElement.classList.add('loading');
document.body.classList.add('loading');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { products, categories } = await fetchProductsData();
    displayCategoryFilters(categories);
    displayProducts(products, true);
    setupFilterListeners(products);
    setupPriceRange();
  } catch (error) {
    console.error('Ошибка при инициализации приложения:', error);
  } finally {
    document.getElementById('loader-overlay')?.remove();
    document.documentElement.classList.remove('loading');
    document.body.classList.remove('loading');
  }
});
