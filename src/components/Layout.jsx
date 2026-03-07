import { Link, Outlet } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Layout.css';

export default function Layout() {
  const { totalItems } = useCart();

  return (
    <div className="layout">
      <header className="layout-header">
        <Link to="/" className="layout-logo">
          Каталог
        </Link>
        <nav>
          <Link to="/cart" className="layout-cart-link">
            Корзина
            {totalItems > 0 && (
              <span className="layout-cart-badge">{totalItems}</span>
            )}
          </Link>
        </nav>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}
