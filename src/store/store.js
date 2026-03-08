import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';
import favoritesReducer from './favoritesSlice';
import notificationsReducer from './notificationsSlice';
import { listenerMiddleware } from './listenerMiddleware';
import { loggerMiddleware } from './loggerMiddleware';

// --- localStorage helpers ---
function load(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

// --- Preloaded state из localStorage ---
const savedCart = load('redux-cart');
const savedFavorites = load('redux-favorites');

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    favorites: favoritesReducer,
    notifications: notificationsReducer,
  },
  preloadedState: {
    ...(savedCart && { cart: { items: savedCart } }),
    ...(savedFavorites && { favorites: { ids: savedFavorites } }),
  },

  /**
   * Обучающий момент: getDefaultMiddleware() включает:
   * - redux-thunk (для showNotification и других thunks)
   * - serializability check
   * - immutability check
   *
   * Мы добавляем свои middleware в начало (logger) и начало (listener).
   * listenerMiddleware.middleware должен идти ПЕРЕД остальными.
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(loggerMiddleware),
});

// --- Persist при каждом изменении стора ---
store.subscribe(() => {
  const state = store.getState();
  save('redux-cart', state.cart.items);
  save('redux-favorites', state.favorites.ids);
});
