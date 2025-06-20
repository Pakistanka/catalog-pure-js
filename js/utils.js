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
  const priceRange = document.getElementById('price-range');
  const priceRangeValue = document.getElementById('price-range-value');

  if (!priceRange || !priceRangeValue) return;

  function updateRangeBackground(value, max) {
    const percentage = (value / max) * 100;
    priceRange.style.background = `linear-gradient(90deg, #3b82f6 ${percentage}%, #d1d5db ${percentage}%)`;
  }

  function updatePriceValue(value) {
    priceRangeValue.textContent = `0 - ${value}`;
  }

  priceRange.addEventListener('input', () => {
    updateRangeBackground(priceRange.value, priceRange.max);
    updatePriceValue(priceRange.value);
  });

  updateRangeBackground(priceRange.value, priceRange.max);
  updatePriceValue(priceRange.value);
}

