import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalItems } from '../../store/cartSlice';
import { selectFavoritesCount } from '../../store/favoritesSlice';
import Notifications from '../Notifications';
import './Layout.css';

export default function Layout() {
  const totalItems = useSelector(selectTotalItems);
  const favCount = useSelector(selectFavoritesCount);

  return (
    <div className="layout">
      <header className="layout-header">
        <Link to="/" className="layout-logo">
          Каталог
        </Link>
        <nav className="layout-nav">
          <Link to="/favorites" className="layout-nav-link">
            Избранное
            {favCount > 0 && (
              <span className="layout-nav-badge layout-nav-badge--fav">{favCount}</span>
            )}
          </Link>
          <Link to="/cart" className="layout-nav-link">
            Корзина
            {totalItems > 0 && (
              <span className="layout-nav-badge">{totalItems}</span>
            )}
          </Link>
        </nav>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
      <Notifications />
    </div>
  );
}
