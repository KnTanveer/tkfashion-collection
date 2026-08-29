import { useState } from 'react';
import { Heart, Eye } from 'lucide-react';

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onOpenQuickView
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'L');

  return (
    <div className="product-card" onClick={() => onOpenQuickView(product)}>
      <div className="product-image-container">
        {/* Wishlist Button */}
        <button
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isWishlisted ? '#c5a880' : 'none'} color={isWishlisted ? '#c5a880' : '#1C1917'} />
        </button>

        {/* Product Main Image */}
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />

        {/* Quick View Button on Image Overlay */}
        <div className="product-card-overlay">
          <button
            className="quick-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
          >
            <Eye size={15} /> Quick View
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="product-info">

        {/* Product Title */}
        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>

        {/* Price Row */}
        <div className="product-price-row">
          <span className="current-price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Quick Size Selection & Add to Cart button */}
        <div className="product-card-actions" onClick={(e) => e.stopPropagation()}>
          <div className="quick-sizes-row">
            {product.sizes.slice(0, 4).map((size) => (
              <button
                key={size}
                className={`quick-size-pill ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
            {product.sizes.length > 4 && (
              <span className="more-sizes-hint">+{product.sizes.length - 4}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

