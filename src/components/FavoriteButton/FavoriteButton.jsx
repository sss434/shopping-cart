import { useSelector, useDispatch } from 'react-redux';
import { selectIsFavorite, toggleFavorite } from '../../store/favoritesSlice';
import './FavoriteButton.css';

export default function FavoriteButton({ productId, size = 'md' }) {
  const dispatch = useDispatch();
  const isFav = useSelector(selectIsFavorite(productId));

  return (
    <button
      type="button"
      className={`fav-btn fav-btn--${size} ${isFav ? 'fav-btn--active' : ''}`}
      onClick={() => dispatch(toggleFavorite(productId))}
      aria-label={isFav ? 'Убрать из избранного' : 'Добавить в избранное'}
      title={isFav ? 'Убрать из избранного' : 'В избранное'}
    >
      {isFav ? '♥' : '♡'}
    </button>
  );
}
