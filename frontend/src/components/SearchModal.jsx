import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/products';

export default function SearchModal({
  isOpen,
  onClose,
  onSelectProduct
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const popularSearches = [
    'Pakistani Plazzo Suit',
    'Black Cutwork Suit',
    'Rosewood Mauve',
    'Velvet Kaftan',
    'Farshi Gharara',
    'Chikankari'
  ];

  const searchResults = searchTerm.trim()
    ? PRODUCTS_DATA.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.title.toLowerCase().includes(query) ||
          p.subtitle.toLowerCase().includes(query) ||
          p.color.toLowerCase().includes(query) ||
          p.fabric.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        );
      })
    : [];

  return (
    <div className="modal-backdrop search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-input-header">
          <Search size={22} className="search-icon-inside" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Pakistani suits, fabrics, sizes (e.g. 2XL, velvet, lawn)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="main-search-input"
          />
          {searchTerm && (
            <button className="clear-search-text" onClick={() => setSearchTerm('')}>
              <X size={16} />
            </button>
          )}
          <button className="close-search-btn" onClick={onClose}>
            ESC
          </button>
        </div>

        {/* Search Content */}
        <div className="search-modal-body">
          {/* Quick Suggestions / Popular Tags */}
          {!searchTerm.trim() ? (
            <div className="popular-searches-box">
              <span className="popular-title">Trending Searches:</span>
              <div className="popular-tags-list">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    className="popular-tag-btn"
                    onClick={() => setSearchTerm(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="search-results-section">
              <div className="results-header">
                Found <strong>{searchResults.length}</strong> items matching "{searchTerm}"
              </div>

              {searchResults.length === 0 ? (
                <div className="no-search-results">
                  <p>No products found matching your search.</p>
                  <div className="suggestions-helper">
                    <span>Try searching:</span>
                    <button onClick={() => setSearchTerm('Pakistani')}>Pakistani</button>
                    <button onClick={() => setSearchTerm('Velvet')}>Velvet</button>
                    <button onClick={() => setSearchTerm('Georgette')}>Georgette</button>
                  </div>
                </div>
              ) : (
                <div className="search-results-grid">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="search-result-item"
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                    >
                      <img src={product.image} alt={product.title} className="result-thumb" />
                      <div className="result-info">
                        <div className="result-title">{product.title}</div>
                        <div className="result-subtitle">{product.subtitle}</div>
                        <div className="result-meta">
                          <span className="result-price">₹{product.price.toLocaleString()}</span>
                          <span className="result-fabric">{product.fabric}</span>
                        </div>
                      </div>
                      <ArrowRight size={16} className="result-arrow" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

