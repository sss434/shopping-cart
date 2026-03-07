import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
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
        <button
          type="button"
          className="product-card-add"
          onClick={() => addToCart(product)}
        >
          Добавить в корзину
        </button>
      </div>
    </article>
  );
}
