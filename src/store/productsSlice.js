import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";

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
/**
 * json-server 1.0 beta: _like убран, сортировка через _sort=-field (минус = desc).
 * Поиск по title делаем на клиенте в selectFilteredProducts.
 */
const buildProductsUrl = (sortBy) => {
  if (sortBy === "default") return "/api/products";
  const params = new URLSearchParams();
  if (sortBy === "price-asc") params.set("_sort", "price");
  else if (sortBy === "price-desc") params.set("_sort", "-price");
  else if (sortBy === "name-asc") params.set("_sort", "title");
  const qs = params.toString();
  return `/api/products?${qs}`;
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  // TODO: Нет отмены запроса при размонтировании компонента или при повторном вызове fetchProducts (race). Добавить AbortController, передавать signal в fetch и вызывать abort при unmount или в condition; в rejected обрабатывать AbortError и не класть ошибку в state.
  async (_, { getState, rejectWithValue }) => {
    try {
      const { sortBy } = getState().products;
      const url = buildProductsUrl(sortBy);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    searchQuery: "",
    sortBy: "default", // 'default' | 'price-asc' | 'price-desc' | 'name-asc'
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
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // TODO: При пагинации не заменять items целиком, а мержить (append/replace page).
        // Сейчас полная замена — ок для одного списка.
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Неизвестная ошибка";
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

// TODO: Параметризованный селектор — при каждом новом id создаётся новая функция-селектор. В useSelector это может давать лишние перерасчёты при смене id (например при навигации). Рассмотреть useMemo(() => selectProductById(id), [id]) в компоненте.
export const selectProductById = (id) =>
  createSelector(selectProducts, (items) => items.find((p) => p.id === id));

/** Сортировка с бэка (json-server _sort). Поиск по title — на клиенте (в v1 beta _like убран). */
export const selectFilteredProducts = createSelector(
  selectProducts,
  selectSearchQuery,
  (items, query) => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((p) => p.title.toLowerCase().includes(q));
  },
);
