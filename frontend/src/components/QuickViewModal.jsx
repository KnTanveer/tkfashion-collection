import { useState } from 'react';
import { X, Heart } from 'lucide-react';
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

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
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const currentSize = selectedSize || product.sizes[0] || 'L';

  const handleAddToCart = () => {
    onAddToCart(product);
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
            <h2 className="quickview-title">{product.title}</h2>
            <p className="quickview-subtitle">{product.subtitle}</p>

            {/* Price */}
            <div className="quickview-price-row">
              <span className="current-price">₹{product.price.toLocaleString()}</span>
              <span className="tax-inclusive-tag">Inclusive of all taxes</span>
            </div>

            <p className="quickview-description">{product.description}</p>


            {/* Size Selector */}
            <div className="quickview-option-group">
              <div className="option-header">
                <span className="option-label">Select Size:</span>
              </div>
              <div className="sizes-selector-grid">
                {product.size?.split(",").map((size) => (
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

            {/* Add to Cart & Wishlist Actions */}
            <div className="quickview-action-buttons">
              <a href='https://api.whatsapp.com/send/?phone=919969454909&text=Hi+TK+Fashion+Collection%21+I+have+a+question+about+size%2C+fabric+or+availability.&type=phone_number&app_absent=0'>
                <button
                  className={`quickview-add-btn ${isAdded ? 'added' : ''}`}
                  onClick={handleAddToCart}
                >
                  Buy now <SiWhatsapp size={18} />
                </button>
              </a>

              <button
                className={`quickview-wishlist-toggle ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(product)}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart size={20} fill={isWishlisted ? '#c5a880' : 'none'} color={isWishlisted ? '#c5a880' : '#1C1917'} />
              </button>
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

