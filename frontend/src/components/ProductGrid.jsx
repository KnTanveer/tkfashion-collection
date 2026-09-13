import { PackageOpen } from 'lucide-react';
import ProductCard from './ProductCard';


export default function ProductGrid({
  products,
  wishlistIds,
  onToggleWishlist,
  onOpenQuickView,
  onBuyNow,
  onClearFilters
}) {

  return (
    <main className="product-grid-section">
      {/* Product Cards Grid */}
      {products.length > 0 ? (
        <div className="products-grid-container">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isWishlisted={wishlistIds?.includes(product._id)}
              onToggleWishlist={onToggleWishlist}
              onOpenQuickView={onOpenQuickView}
              onBuyNow={onBuyNow}
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

