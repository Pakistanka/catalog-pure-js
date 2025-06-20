/**
 * Определяет изображение в зависимости от размера экрана.
 * @param {Object} product
 * @returns {string}
 */
export function getImageSource(product) {
  if (window.matchMedia('(max-width: 480px)').matches) {
    return product.image.mobile;
  }
  if (window.matchMedia('(max-width: 768px)').matches) {
    return product.image.tablet;
  }
  return product.image.desktop;
}

/**
 * Настраивает ленивую загрузку изображений.
 */
export function setupLazyLoading() {
  const lazyImages = document.querySelectorAll('img.lazy-load');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));
}

/**
 * Инициализация взаимодействия range с input и визуальной подсветкой.
 */
export function setupPriceRange() {
  const range = document.getElementById('price-range');
  const minInput = document.getElementById('min-price');
  const maxInput = document.getElementById('max-price');

  if (!range || !minInput || !maxInput) return;

  const min = parseInt(range.min, 10);
  const max = parseInt(range.max, 10);

  const updateRangeBackground = (value) => {
    const percent = ((value - min) / (max - min)) * 100;
    range.style.background = `
      linear-gradient(to right,
        var(--color-accent, #3b82f6) 0%,
        var(--color-accent, #3b82f6) ${percent}%,
        var(--border-light, #d1d5db) ${percent}%,
        var(--border-light, #d1d5db) 100%)`;
  };

  const clampValue = (value, minVal, maxVal) =>
    Math.max(minVal, Math.min(maxVal, value));

  // Слайдер → maxInput
  range.addEventListener('input', () => {
    const value = clampValue(parseInt(range.value, 10), min, max);
    maxInput.value = value;
    updateRangeBackground(value);
  });

  // Ручной ввод minInput
  minInput.addEventListener('input', () => {
    const minVal = clampValue(parseInt(minInput.value, 10) || min, min, max);
    const maxVal = parseInt(maxInput.value, 10) || max;

    if (minVal > maxVal) minInput.value = maxVal;
  });

  // Ручной ввод maxInput → слайдер
  maxInput.addEventListener('input', () => {
    const maxVal = clampValue(parseInt(maxInput.value, 10) || max, min, max);
    const minVal = parseInt(minInput.value, 10) || min;

    if (maxVal < minVal) maxInput.value = minVal;

    range.value = maxVal;
    updateRangeBackground(maxVal);
  });

  updateRangeBackground(parseInt(range.value, 10));
}
