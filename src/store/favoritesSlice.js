import { createSlice, createSelector } from '@reduxjs/toolkit';
import { selectProducts } from './productsSlice';

/**
 * ФИЧА: Избранное (Wishlist)
 *
 * Обучающий момент: второй слайс с теми же паттернами что и корзина.
 * Хранит только массив id — данные о товарах не дублируются,
 * а получаются через cross-slice selector.
 */
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { ids: [] },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const idx = state.ids.indexOf(id);
      if (idx >= 0) {
        state.ids.splice(idx, 1);
      } else {
        state.ids.push(id);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

// --- Selectors ---
export const selectFavoriteIds = (state) => state.favorites.ids;

export const selectIsFavorite = (id) => (state) =>
  state.favorites.ids.includes(id);

/**
 * Cross-slice selector: объединяет данные из двух слайсов.
 * Это нормальный паттерн — селекторы могут читать любую часть стора.
 */
export const selectFavoriteProducts = createSelector(
  selectProducts,
  selectFavoriteIds,
  (products, ids) => products.filter((p) => ids.includes(p.id))
);

export const selectFavoritesCount = createSelector(
  selectFavoriteIds,
  (ids) => ids.length
);
