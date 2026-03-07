import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Catalog.css';

export default function Catalog() {
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
