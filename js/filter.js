import { displayProducts } from './render.js';

export function setupFilterListeners(products) {
  const categoryFilters = document.getElementById('category-filters');
  const priceSlider = document.getElementById('price-range');
  const minInput = document.getElementById('min-price');
  const maxInput = document.getElementById('max-price');
  const sortBy = document.getElementById('sort-by');

  if (!categoryFilters || !priceSlider || !minInput || !maxInput || !sortBy) return;

  const getSelectedCategories = () =>
    Array.from(categoryFilters.querySelectorAll('input[type="checkbox"]:checked'))
      .map(input => input.value);

  const getMinPrice = () => Math.max(0, parseInt(minInput.value) || 0);
  const getMaxPrice = () => Math.min(3000, parseInt(maxInput.value) || 3000);

  const filterAndSortProducts = () => {
    const selectedCategories = getSelectedCategories();
    const minPrice = getMinPrice();
    const maxPrice = getMaxPrice();

    const filtered = products
      .filter(product =>
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        product.price >= minPrice &&
        product.price <= maxPrice
      )
      .sort((a, b) => {
        switch (sortBy.value) {
          case 'price-asc': return a.price - b.price;
          case 'price-down': return b.price - a.price;
          case 'rating': return b.rating - a.rating;
          case 'name': return a.name.localeCompare(b.name);
          default: return 0;
        }
      });

    displayProducts(filtered, false);
  };

  priceSlider.addEventListener('input', () => {
    maxInput.value = priceSlider.value;
    filterAndSortProducts();
  });

  minInput.addEventListener('input', () => {
    const minVal = getMinPrice();
    const maxVal = getMaxPrice();
    if (minVal > maxVal) {
      minInput.value = maxVal;
    }
    filterAndSortProducts();
  });

  maxInput.addEventListener('input', () => {
    const minVal = getMinPrice();
    const maxVal = getMaxPrice();
    if (maxVal < minVal) {
      maxInput.value = minVal;
    }
    priceSlider.value = maxInput.value;
    filterAndSortProducts();
  });

  categoryFilters.addEventListener('change', filterAndSortProducts);
  sortBy.addEventListener('change', filterAndSortProducts);
}
