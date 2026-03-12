/**
 * ФИЧА: Custom Logger Middleware
 *
 * Обучающий момент: middleware — это функция вида:
 *   (storeAPI) => (next) => (action) => { ... }
 *
 * Это классический паттерн currying. Каждый middleware:
 * 1. Получает доступ к store (getState, dispatch)
 * 2. Вызывает next(action) — передаёт action дальше по цепочке
 * 3. Может делать что угодно до и после next()
 *
 * Открой DevTools → Console чтобы видеть каждый dispatched action.
 * TODO: Убедиться, что import.meta.env.DEV в production build Vite действительно false, и логи не попадут в прод. Если позже добавится логирование payload, проверить, что в payload нет чувствительных данных (токены, пароли).
 */
export const loggerMiddleware = (storeAPI) => (next) => (action) => {
  if (import.meta.env.DEV && typeof action.type === 'string') {
    const prevState = storeAPI.getState();

    console.group(
      `%c[Redux] %c${action.type}`,
      'color:#94a3b8;font-weight:normal',
      'color:#646cff;font-weight:bold'
    );
    if (action.payload !== undefined) {
      console.log('%cPayload  →', 'color:#94a3b8', action.payload);
    }
    console.log('%cPrev     →', 'color:#e57373', prevState);

    const result = next(action);

    console.log('%cNext     →', 'color:#4ade80', storeAPI.getState());
    console.groupEnd();

    return result;
  }

  return next(action);
};
