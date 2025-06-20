import { displayProducts } from './render.js';

export function setupFilterListeners(products) {
  const categoryFilters = document.getElementById('category-filters');
  const priceSlider = document.getElementById('price-range');
  const minInput = document.getElementById('min-price');
  const maxInput = document.getElementById('max-price');
  const sortBy = document.getElementById('sort-by');

  function filterAndSortProducts() {
    const selectedCategories = Array.from(document.querySelectorAll('#category-filters input[type="checkbox"]:checked')).map(input => input.value);
    const minPrice = parseInt(minInput.value) || 0;
    const maxPrice = parseInt(maxInput.value) || 3000;

    let filtered = products.filter(product =>
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      product.price >= minPrice &&
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

  // Sync range to max input
  priceSlider.addEventListener('input', () => {
    maxInput.value = priceSlider.value;
    filterAndSortProducts();
  });

  // Sync input changes to filtering
  minInput.addEventListener('input', () => {
    if (parseInt(minInput.value) > parseInt(maxInput.value)) {
      minInput.value = maxInput.value;
    }
    filterAndSortProducts();
  });

  maxInput.addEventListener('input', () => {
    priceSlider.value = maxInput.value;
    if (parseInt(maxInput.value) < parseInt(minInput.value)) {
      maxInput.value = minInput.value;
    }
    filterAndSortProducts();
  });

  categoryFilters.addEventListener('change', filterAndSortProducts);
  sortBy.addEventListener('change', filterAndSortProducts);
}
