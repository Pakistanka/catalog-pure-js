export async function fetchProductsData() {
    const response = await fetch('data/cards.json');
    const data = await response.json();
    return {
        products: data.products,
        categories: data.categories
    };
}
