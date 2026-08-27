import { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check, Star } from 'lucide-react';

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onOpenQuickView,
  onAddToCart
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'L');
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="product-card" onClick={() => onOpenQuickView(product)}>
      <div className="product-image-container">
        {/* Product Badges */}
        <div className="product-badges">
          {product.discount && (
            <span className="badge-discount">{product.discount}</span>
          )}
          {product.isBestSeller && (
            <span className="badge-bestseller">BESTSELLER</span>
          )}
        </div>

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
        {/* Rating Stars */}
        <div className="product-rating-row">
          <div className="stars-wrapper">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
              />
            ))}
          </div>
          <span className="rating-number">({product.reviewsCount})</span>
        </div>

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

          <button
            className={`card-add-to-cart-btn ${isAdded ? 'added' : ''}`}
            onClick={handleQuickAdd}
          >
            {isAdded ? (
              <>
                <Check size={14} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={14} /> Add to Bag
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

