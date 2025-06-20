import { getImageSource, setupLazyLoading } from './utils.js';

/**
 * Отображает список фильтров по категориям.
 * @param {string[]} categories
 */
export function displayCategoryFilters(categories) {
  const categoryFilters = document.querySelector('.category-filters');
  if (!categoryFilters) return;

  categoryFilters.innerHTML = categories.map(category => `
    <div class="category-option">
      <input type="checkbox" id="category-${category}" value="${category}">
      <label for="category-${category}">${category}</label>
    </div>
  `).join('');
}

/**
 * Отображает карточки товаров.
 * @param {Array} products - Список товаров.
 * @param {boolean} initial - Если true, используется lazy-loading.
 */
export function displayProducts(products, initial = false) {
  const productGrid = document.getElementById('product-grid');
  if (!productGrid) return;

  productGrid.innerHTML = products.map(product => {
    const imageAttributes = initial
      ? `data-src="${getImageSource(product)}" class="lazy-load"`
      : `src="${getImageSource(product)}"`;

    return `
      <div class="product-card">
        <img
          ${imageAttributes}
          alt="${product.name}"
          height="300"
        >
        <div class="content">
          <h3>${product.name}</h3>
          <p class="description">${product.description}</p>
          <div class="info">
            <p class="price">Цена: $${product.price}</p>
            <p class="rating">Рейтинг: ${product.rating}</p>
            <p class="category">Категория: ${product.category}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (initial) {
    setupLazyLoading();
  }
}
