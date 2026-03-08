import { createListenerMiddleware } from '@reduxjs/toolkit';
import { addToCart, removeFromCart, clearCart } from './cartSlice';
import { toggleFavorite } from './favoritesSlice';
import { showNotification } from './notificationsSlice';

/**
 * ФИЧА: RTK ListenerMiddleware
 *
 * Обучающий момент: позволяет реагировать на actions из других слайсов
 * БЕЗ прямой связи между компонентами и без дублирования dispatch.
 *
 * Аналог: redux-saga / redux-observable, но встроен в RTK без доп. зависимостей.
 * Компонент просто dispatch(addToCart(product)) — уведомление появляется автоматически.
 */
export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: addToCart,
  effect: (action, api) => {
    api.dispatch(
      showNotification(`«${action.payload.title}» добавлен в корзину`, 'success')
    );
  },
});

listenerMiddleware.startListening({
  actionCreator: removeFromCart,
  effect: (_action, api) => {
    api.dispatch(showNotification('Товар удалён из корзины', 'info'));
  },
});

listenerMiddleware.startListening({
  actionCreator: clearCart,
  effect: (_action, api) => {
    api.dispatch(showNotification('Корзина очищена', 'info'));
  },
});

listenerMiddleware.startListening({
  actionCreator: toggleFavorite,
  effect: (action, api) => {
    const isNowFav = api.getState().favorites.ids.includes(action.payload);
    api.dispatch(
      showNotification(
        isNowFav ? 'Добавлено в избранное' : 'Убрано из избранного',
        isNowFav ? 'success' : 'info'
      )
    );
  },
});
