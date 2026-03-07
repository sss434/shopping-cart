import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalItems } from '../../store/cartSlice';
import './Layout.css';

export default function Layout() {
  const totalItems = useSelector(selectTotalItems);

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
