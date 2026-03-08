import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFavoriteProducts } from '../../store/favoritesSlice';
import ProductCard from '../../components/ProductCard';
import './Favorites.css';

export default function Favorites() {
  const products = useSelector(selectFavoriteProducts);

  return (
    <div className="favorites">
      <h1 className="favorites-title">Избранное</h1>
      {products.length === 0 ? (
        <div className="favorites-empty">
          <p>Вы ещё ничего не добавили в избранное.</p>
          <Link to="/" className="favorites-link">Перейти в каталог</Link>
        </div>
      ) : (
        <ul className="favorites-grid">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
