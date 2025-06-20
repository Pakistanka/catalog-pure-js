/**
 * Загружает данные товаров и категорий из JSON.
 * @returns {Promise<{ products: any[], categories: string[] }>}
 */
export async function fetchProductsData() {
  try {
    const response = await fetch('data/cards.json');
    if (!response.ok) throw new Error('Ошибка загрузки данных');
    const data = await response.json();
    return {
      products: data.products || [],
      categories: data.categories || []
    };
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return { products: [], categories: [] };
  }
}
