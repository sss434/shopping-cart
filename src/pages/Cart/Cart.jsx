import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectItems,
  selectTotalItems,
  selectTotalSum,
  updateQuantity,
  removeFromCart,
} from '../../store/cartSlice';
import './Cart.css';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const totalItems = useSelector(selectTotalItems);
  const totalSum = useSelector(selectTotalSum);

  if (items.length === 0) {
    return (
      <div className="cart cart-empty">
        <h1 className="cart-title">Корзина</h1>
        <p>В корзине пока ничего нет.</p>
        <Link to="/" className="cart-link">Перейти в каталог</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1 className="cart-title">Корзина</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="cart-item-image-wrap">
              <img src={item.image} alt={item.title} className="cart-item-image" />
            </div>
            <div className="cart-item-info">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-price">{item.price.toLocaleString('ru-RU')} ₽</p>
            </div>
            <div className="cart-item-actions">
              <button
                type="button"
                className="cart-item-btn"
                onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))}
                aria-label="Уменьшить количество"
              >
                −
              </button>
              <span className="cart-item-qty">{item.quantity}</span>
              <button
                type="button"
                className="cart-item-btn"
                onClick={() => dispatch(updateQuantity({ id: item.id, delta: 1 }))}
                aria-label="Увеличить количество"
              >
                +
              </button>
            </div>
            <p className="cart-item-subtotal">
              {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
            </p>
            <button
              type="button"
              className="cart-item-remove"
              onClick={() => dispatch(removeFromCart(item.id))}
              aria-label="Удалить"
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p className="cart-summary-row">
          <span>Товаров:</span>
          <strong>{totalItems}</strong>
        </p>
        <p className="cart-summary-row cart-summary-total">
          <span>Итого:</span>
          <strong>{totalSum.toLocaleString('ru-RU')} ₽</strong>
        </p>
      </div>
    </div>
  );
}
