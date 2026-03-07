import { useSelector } from 'react-redux';
import { selectProducts } from '../../store/productsSlice';
import ProductCard from '../../components/ProductCard';
import './Catalog.css';

export default function Catalog() {
  const products = useSelector(selectProducts);

  return (
    <div className="catalog">
      <h1 className="catalog-title">Каталог товаров</h1>
      <ul className="catalog-grid">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
