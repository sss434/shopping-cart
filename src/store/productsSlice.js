import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * ФИЧА: Загрузка данных через createAsyncThunk
 *
 * Обучающий момент: createAsyncThunk автоматически создаёт три action creator-а:
 *   fetchProducts.pending   — запрос отправлен
 *   fetchProducts.fulfilled — ответ получен успешно
 *   fetchProducts.rejected  — запрос завершился ошибкой
 *
 * Их обрабатывает extraReducers — отдельная секция для async actions.
 */
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
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
  /**
   * extraReducers обрабатывает actions, созданные вне этого слайса
   * (в данном случае — три action-а от createAsyncThunk).
   */
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  },
});

export const { setSearchQuery, setSortBy } = productsSlice.actions;
export default productsSlice.reducer;

// --- Базовые селекторы ---
export const selectProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectSortBy = (state) => state.products.sortBy;

export const selectProductById = (id) =>
  createSelector(selectProducts, (items) => items.find((p) => p.id === id));

/**
 * Мемоизированный производный селектор.
 * Фильтрация и сортировка пересчитываются только при изменении входных данных.
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
