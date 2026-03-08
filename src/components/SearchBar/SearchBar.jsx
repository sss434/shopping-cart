import { useSelector, useDispatch } from 'react-redux';
import {
  selectSearchQuery,
  selectSortBy,
  setSearchQuery,
  setSortBy,
} from '../../store/productsSlice';
import './SearchBar.css';

const SORT_OPTIONS = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
  { value: 'name-asc', label: 'По названию А–Я' },
];

export default function SearchBar() {
  const dispatch = useDispatch();
  const query = useSelector(selectSearchQuery);
  const sortBy = useSelector(selectSortBy);

  return (
    <div className="search-bar">
      <div className="search-bar-input-wrap">
        <span className="search-bar-icon" aria-hidden="true">🔍</span>
        <input
          type="search"
          className="search-bar-input"
          placeholder="Поиск товаров…"
          value={query}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
        {query && (
          <button
            type="button"
            className="search-bar-clear"
            onClick={() => dispatch(setSearchQuery(''))}
            aria-label="Очистить поиск"
          >
            ×
          </button>
        )}
      </div>
      <select
        className="search-bar-sort"
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
        aria-label="Сортировка"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
