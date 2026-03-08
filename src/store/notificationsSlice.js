import { createSlice } from '@reduxjs/toolkit';

/**
 * ФИЧА: Toast-уведомления
 *
 * Обучающий момент: эфемерное UI-состояние в Redux.
 * Уведомления живут только в памяти (не персистируются).
 * showNotification — это thunk: функция, которая возвращает функцию.
 * Redux Toolkit включает redux-thunk по умолчанию.
 */
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: { list: [] },
  reducers: {
    addNotification: (state, action) => {
      state.list.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.list = state.list.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;

export const selectNotifications = (state) => state.notifications.list;

/**
 * Thunk-создатель: принимает параметры → возвращает функцию,
 * которую Redux вызовет с dispatch и getState.
 *
 * Обучающий момент: thunk позволяет выполнять побочные эффекты
 * (setTimeout) внутри action creator, не нарушая чистоту Redux.
 */
export const showNotification =
  (message, type = 'success') =>
  (dispatch) => {
    const id = `${Date.now()}-${Math.random()}`;
    dispatch(addNotification({ id, message, type }));
    setTimeout(() => dispatch(removeNotification(id)), 3500);
  };
