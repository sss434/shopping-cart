import { useSelector } from 'react-redux';
import { selectFilteredProducts, selectSearchQuery } from '../../store/productsSlice';
import ProductCard from '../../components/ProductCard';
import SearchBar from '../../components/SearchBar';
import './Catalog.css';

export default function Catalog() {
  const products = useSelector(selectFilteredProducts);
  const query = useSelector(selectSearchQuery);

  return (
    <div className="catalog">
      <h1 className="catalog-title">Каталог товаров</h1>
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
    </div>
  );
}
