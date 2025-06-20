import { getImageSource, setupLazyLoading } from './utils.js';

export function displayCategoryFilters(categories) {
const categoryFilters = document.querySelector('.category-filters');
        categoryFilters.innerHTML = categories.map(category =>
            `<div class="category-option">
                <input type="checkbox" id="category-${category}" value="${category}">
                <label for="category-${category}">${category}</label>
            </div>`
        ).join('');

}

export function displayProducts(products, initial = false) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img
                ${initial ? `data-src="${getImageSource(product)}" class="lazy-load"` : `src="${getImageSource(product)}"`}
                alt="${product.name}"
                width="300"
                height="300"
                class="lazy-load"
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
    `).join('');

    if (initial) {
        setupLazyLoading();
    }
}
