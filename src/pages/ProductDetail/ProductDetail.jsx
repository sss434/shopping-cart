import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProducts,
  selectProductById,
  selectProductsStatus,
} from '../../store/productsSlice';
import { addToCart } from '../../store/cartSlice';
import FavoriteButton from '../../components/FavoriteButton';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const status = useSelector(selectProductsStatus);
  const product = useSelector(selectProductById(id));

  // Если пользователь открыл страницу напрямую, данных ещё нет
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="pd-skeleton" />;
  }

  if (!product) {
    return (
      <div className="pd-not-found">
        <h1>Товар не найден</h1>
        <Link to="/" className="pd-back">← Вернуться в каталог</Link>
      </div>
    );
  }

  return (
    <div className="pd">
      <Link to="/" className="pd-back">← Вернуться в каталог</Link>
      <div className="pd-card">
        <div className="pd-image-wrap">
          <img
            src={product.image.replace('/300/300', '/600/600')}
            alt={product.title}
            className="pd-image"
          />
        </div>
        <div className="pd-info">
          <div className="pd-title-row">
            <h1 className="pd-title">{product.title}</h1>
            <FavoriteButton productId={product.id} size="lg" />
          </div>
          <p className="pd-price">{product.price.toLocaleString('ru-RU')} ₽</p>
          <p className="pd-description">
            Отличный выбор для работы и отдыха. Надёжное качество, современный дизайн
            и удобство использования — всё в одном устройстве.
          </p>
          <button
            type="button"
            className="pd-add"
            onClick={() => dispatch(addToCart(product))}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
}
