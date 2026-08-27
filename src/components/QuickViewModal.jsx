import { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Check, MapPin } from 'lucide-react';

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const currentSize = selectedSize || product.sizes[0] || 'L';

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length >= 6) {
      setPincodeStatus({
        valid: true,
        message: 'COD is Available at this location. Delivery in 3-5 working days.'
      });
    } else {
      setPincodeStatus({
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code.'
      });
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, currentSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* Product Gallery Left */}
          <div className="quickview-gallery">
            <div className="main-image-wrapper">
              <img
                src={images[activeImageIndex] || product.image}
                alt={product.title}
                className="quickview-main-img"
              />
              {product.discount && (
                <span className="badge-discount">{product.discount}</span>
              )}
            </div>

            {images.length > 1 && (
              <div className="thumbnails-row">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`View ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Right */}
          <div className="quickview-details">
            <div className="quickview-code">SKU: {product.code}</div>
            <h2 className="quickview-title">{product.title}</h2>
            <p className="quickview-subtitle">{product.subtitle}</p>

            {/* Ratings */}
            <div className="quickview-rating-row">
              <div className="stars-wrapper">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
                  />
                ))}
              </div>
              <span className="rating-text">
                {product.rating} ({product.reviewsCount} verified reviews)
              </span>
            </div>

            {/* Price */}
            <div className="quickview-price-row">
              <span className="current-price">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
              )}
              <span className="tax-inclusive-tag">Inclusive of all taxes</span>
            </div>

            <p className="quickview-description">{product.description}</p>

            {/* Size Selector */}
            <div className="quickview-option-group">
              <div className="option-header">
                <span className="option-label">Select Size:</span>
                <span className="size-guide-link">Size Guide</span>
              </div>
              <div className="sizes-selector-grid">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-choice-btn ${currentSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="quickview-option-group">
              <span className="option-label">Quantity:</span>
              <div className="quantity-controls modal-qty">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart & Wishlist Actions */}
            <div className="quickview-action-buttons">
              <button
                className={`quickview-add-btn ${isAdded ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <>
                    <Check size={18} /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add to Bag • ₹{(product.price * quantity).toLocaleString()}
                  </>
                )}
              </button>

              <button
                className={`quickview-wishlist-toggle ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(product)}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart size={20} fill={isWishlisted ? '#c5a880' : 'none'} color={isWishlisted ? '#c5a880' : '#1C1917'} />
              </button>
            </div>

            {/* PIN Code Delivery Checker */}
            <div className="pincode-checker-box">
              <form onSubmit={handleCheckPincode} className="pincode-form">
                <div className="pincode-input-wrap">
                  <MapPin size={16} className="pincode-pin-icon" />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter Indian PIN Code for COD check"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="pincode-input"
                  />
                </div>
                <button type="submit" className="pincode-check-btn">
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <div className={`pincode-result ${pincodeStatus.valid ? 'success' : 'error'}`}>
                  {pincodeStatus.valid ? <Check size={14} /> : null}
                  <span>{pincodeStatus.message}</span>
                </div>
              )}
            </div>

            {/* Specifications Details List */}
            {product.details && (
              <div className="product-specs-list">
                <h4 className="specs-title">Fabric & Craft Specifications:</h4>
                <ul>
                  {product.details.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

