import { ChevronDown, SlidersHorizontal, PackageOpen } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductGrid({
  products,
  totalDisplayCount,
  sortBy,
  onChangeSort,
  wishlistIds,
  onToggleWishlist,
  onOpenQuickView,
  onAddToCart,
  onOpenMobileFilters,
  onClearFilters
}) {
  return (
    <main className="product-grid-section">
      {/* Grid Header Controls (Matching screenshot: "163 products" on left, "Date, new to old v" on right) */}
      <div className="grid-header-bar">
        <div className="products-counter">
          <span className="count-number">{totalDisplayCount} products</span>
        </div>

        <div className="grid-controls-right">
          {/* Mobile Filter Trigger Button */}
          <button
            className="mobile-filter-trigger"
            onClick={onOpenMobileFilters}
          >
            <SlidersHorizontal size={15} /> Filter
          </button>

          {/* Sort Dropdown */}
          <div className="sort-dropdown-wrapper">
            <select
              value={sortBy}
              onChange={(e) => onChangeSort(e.target.value)}
              className="sort-select-input"
              aria-label="Sort products"
            >
              <option value="date-new-old">Date, new to old</option>
              <option value="date-old-new">Date, old to new</option>
              <option value="price-low-high">Price, low to high</option>
              <option value="price-high-low">Price, high to low</option>
              <option value="best-selling">Best selling</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown size={14} className="sort-select-icon" />
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      {products.length > 0 ? (
        <div className="products-grid-container">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onOpenQuickView={onOpenQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="no-products-found">
          <PackageOpen size={48} strokeWidth={1.5} className="no-products-icon" />
          <h3 className="no-products-title">No suits match your selected filters</h3>
          <p className="no-products-subtitle">
            Try adjusting your size, color, or price range filters to view more products.
          </p>
          <button className="reset-filter-btn" onClick={onClearFilters}>
            Clear all filters
          </button>
        </div>
      )}
    </main>
  );
}

