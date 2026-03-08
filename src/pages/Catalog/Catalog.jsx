import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProducts,
  selectFilteredProducts,
  selectProductsStatus,
  selectProductsError,
  selectSearchQuery,
} from '../../store/productsSlice';
import ProductCard from '../../components/ProductCard';
import SearchBar from '../../components/SearchBar';
import './Catalog.css';

export default function Catalog() {
  const dispatch = useDispatch();
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const products = useSelector(selectFilteredProducts);
  const query = useSelector(selectSearchQuery);

  /**
   * Обучающий момент: dispatch thunk-а при монтировании компонента.
   * Запрашиваем данные только если они ещё не загружались — 
   * при повторном визите на страницу лишнего запроса не будет.
   */
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div className="catalog">
      <h1 className="catalog-title">Каталог товаров</h1>

      {status === 'loading' && (
        <ul className="catalog-grid">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i}>
              <div className="catalog-skeleton" />
            </li>
          ))}
        </ul>
      )}

      {status === 'failed' && (
        <div className="catalog-error">
          <p>Ошибка загрузки: {error}</p>
          <button type="button" onClick={() => dispatch(fetchProducts())}>
            Попробовать снова
          </button>
        </div>
      )}

      {status === 'succeeded' && (
        <>
          <SearchBar />
          {products.length === 0 ? (
            <p className="catalog-empty">По запросу «{query}» ничего не найдено.</p>
          ) : (
            <ul className="catalog-grid">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
