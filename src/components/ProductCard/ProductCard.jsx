import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import FavoriteButton from '../FavoriteButton';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-card-image-wrap">
          <img
            src={product.image}
            alt={product.title}
            className="product-card-image"
          />
        </div>
        <div className="product-card-body">
          <h3 className="product-card-title">{product.title}</h3>
          <p className="product-card-price">
            {product.price.toLocaleString('ru-RU')} ₽
          </p>
        </div>
      </Link>
      <div className="product-card-footer">
        <button
          type="button"
          className="product-card-add"
          onClick={() => dispatch(addToCart(product))}
        >
          В корзину
        </button>
        <FavoriteButton productId={product.id} size="sm" />
      </div>
    </article>
  );
}
