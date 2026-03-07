import { createSlice, createSelector } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return;
      item.quantity = Math.max(0, item.quantity + delta);
      if (item.quantity === 0) {
        state.items = state.items.filter((i) => i.id !== id);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
const selectCartState = (state) => state.cart;

export const selectItems = (state) => state.cart.items;

export const selectTotalItems = createSelector(
  selectCartState,
  (cart) => cart.items.reduce((acc, i) => acc + i.quantity, 0)
);

export const selectTotalSum = createSelector(
  selectCartState,
  (cart) => cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
);
