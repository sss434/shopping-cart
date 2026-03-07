import { createSlice, createSelector } from '@reduxjs/toolkit';
import { products } from '../data/products';

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: products },
  reducers: {
    // Здесь можно добавить: setProducts, setFilter, setSearch и т.д.
  },
});

export default productsSlice.reducer;

// Selectors
export const selectProducts = (state) => state.products.items;

export const selectProductById = (id) =>
  createSelector(selectProducts, (items) => items.find((p) => p.id === id));
