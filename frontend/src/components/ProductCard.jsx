import { Heart, Eye } from 'lucide-react';

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onOpenQuickView
}) {

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
      </div>
    </div>
  );
}

