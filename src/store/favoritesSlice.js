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
 * TODO: Если продукты ещё не загружены (items пустой), а ids пришли из localStorage, результат будет пустой массив — на странице «Избранное» ничего не покажется до загрузки. Рассмотреть: показывать скелетоны по количеству ids или фильтровать только те id, для которых продукт уже есть в state.products.items.
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
