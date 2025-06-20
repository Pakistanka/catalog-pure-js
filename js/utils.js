export function getImageSource(product) {
    if (window.matchMedia("(max-width: 480px)").matches) {
        return product.image.mobile;
    } else if (window.matchMedia("(max-width: 768px)").matches) {
        return product.image.tablet;
    } else {
        return product.image.desktop;
    }
}

export function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazy-load');
    const observer = new IntersectionObserver((entries) => {
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


export function setupPriceRange() {
  const range = document.getElementById('price-range');
  const minInput = document.getElementById('min-price');
  const maxInput = document.getElementById('max-price');

  if (!range || !minInput || !maxInput) return;

  const min = parseInt(range.min);
  const max = parseInt(range.max);

  function updateRangeBackground(value) {
    const percent = ((value - min) / (max - min)) * 100;
    range.style.background = `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percent}%, #d1d5db ${percent}%, #d1d5db 100%)`;
  }

  range.addEventListener('input', () => {
    const value = parseInt(range.value);
    maxInput.value = value;
    updateRangeBackground(value);
  });

  minInput.addEventListener('input', () => {
    let minValue = parseInt(minInput.value) || 0;
    let maxValue = parseInt(maxInput.value) || max;
    if (minValue > maxValue) {
      minInput.value = maxValue;
    }
  });

  maxInput.addEventListener('input', () => {
    let maxValue = parseInt(maxInput.value) || max;
    let minValue = parseInt(minInput.value) || 0;

    if (maxValue < minValue) {
      maxInput.value = minValue;
    }

    range.value = maxInput.value;
    updateRangeBackground(range.value);
  });

  updateRangeBackground(range.value);
}


