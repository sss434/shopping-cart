import { useSelector, useDispatch } from 'react-redux';
import { selectNotifications, removeNotification } from '../../store/notificationsSlice';
import './Notifications.css';

export default function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);

  if (notifications.length === 0) return null;

  return (
    <ul className="notifications" aria-live="polite">
      {notifications.map((n) => (
        <li key={n.id} className={`notification notification--${n.type}`}>
          <span className="notification-msg">{n.message}</span>
          <button
            type="button"
            className="notification-close"
            onClick={() => dispatch(removeNotification(n.id))}
            aria-label="Закрыть"
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}
