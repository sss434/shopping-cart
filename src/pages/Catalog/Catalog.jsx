import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  selectFilteredProducts,
  selectProductsStatus,
  selectProductsError,
  selectSearchQuery,
} from "../../store/productsSlice";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import "./Catalog.css";

export default function Catalog() {
  const dispatch = useDispatch();
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const products = useSelector(selectFilteredProducts);
  const query = useSelector(selectSearchQuery);
  // TODO -  слишком избыточно перегруженный компонент, в одном компоненте идет ререндер из-за изменения и продкетов и query и всего подряд

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div className="catalog">
      <h1 className="catalog-title">Каталог товаров</h1>

      {status === "loading" && (
        <ul className="catalog-grid">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i}>
              <div className="catalog-skeleton" />
            </li>
          ))}
        </ul>
      )}

      {status === "failed" && (
        <div className="catalog-error">
          <p>Ошибка загрузки: {error}</p>
          <button type="button" onClick={() => dispatch(fetchProducts())}>
            Попробовать снова
          </button>
        </div>
      )}

      {status === "succeeded" && (
        <>
          {/* TODO - изменения продуктов провоцирует ререндер SearchBar, при каждом обновлении продукта, 
          ререндериться SearchBar. Изменение продуктов не должо провоцировать ререндер SearchBar  */}
          <SearchBar />
          {products.length === 0 ? (
            <p className="catalog-empty">
              По запросу «{query}» ничего не найдено.
            </p>
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
