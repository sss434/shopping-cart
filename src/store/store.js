import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';

const CART_STORAGE_KEY = 'redux-cart';

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

function saveCartToStorage(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore write errors
  }
}

const preloadedCart = loadCartFromStorage();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  preloadedState: preloadedCart
    ? { cart: { items: preloadedCart } }
    : undefined,
});

// Сохраняем только items корзины при каждом изменении стора
store.subscribe(() => {
  saveCartToStorage(store.getState().cart.items);
});
