import { createSlice, createSelector } from '@reduxjs/toolkit';
import { products } from '../data/products';

/**
 * ФИЧА: Поиск + сортировка
 *
 * Обучающий момент: UI-состояние (то, что пользователь ввёл в поиск,
 * выбранная сортировка) тоже хранится в Redux — это позволяет:
 * - сохранять его между переходами по страницам
 * - легко читать из любого компонента
 * - отображать в Redux DevTools и откатывать через time-travel debugging
 */
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: products,
    searchQuery: '',
    sortBy: 'default', // 'default' | 'price-asc' | 'price-desc' | 'name-asc'
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSearchQuery, setSortBy } = productsSlice.actions;
export default productsSlice.reducer;

// --- Базовые селекторы ---
export const selectProducts = (state) => state.products.items;
export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectSortBy = (state) => state.products.sortBy;

export const selectProductById = (id) =>
  createSelector(selectProducts, (items) => items.find((p) => p.id === id));

/**
 * ФИЧА: Мемоизированный производный селектор
 *
 * Обучающий момент: createSelector кэширует результат — фильтрация
 * и сортировка НЕ пересчитываются, если searchQuery и sortBy не изменились.
 * Это ключевой паттерн оптимизации в Redux.
 */
export const selectFilteredProducts = createSelector(
  selectProducts,
  selectSearchQuery,
  selectSortBy,
  (items, query, sortBy) => {
    let result = items;

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    switch (sortBy) {
      case 'price-asc':
        return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...result].sort((a, b) => b.price - a.price);
      case 'name-asc':
        return [...result].sort((a, b) => a.title.localeCompare(b.title, 'ru'));
      default:
        return result;
    }
  }
);
