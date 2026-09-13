import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onBuyNow
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="wishlist-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Wishlist Header */}
        <div className="drawer-header">
          <div className="drawer-title-row">
            <Heart size={20} fill="#b89a5a" color="#b89a5a" />
            <h2 className="drawer-title">My Wishlist ({wishlistProducts.length})</h2>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close wishlist">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="drawer-content">
          {wishlistProducts.length === 0 ? (
            <div className="cart-empty-state">
              <Heart size={54} strokeWidth={1.2} className="empty-cart-icon" />
              <h3>Your wishlist is empty</h3>
              <p>Click the heart icon on any Pakistani suit or dress to save your favorite picks here.</p>
              <button className="continue-shopping-btn" onClick={onClose}>
                Browse Collection
              </button>
            </div>
          ) : (
            <div className="wishlist-items-grid">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="wishlist-item-card">
                  <div className="wishlist-item-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="wishlist-item-image"
                    />
                    <button
                      className="wishlist-remove-btn"
                      onClick={() => onRemoveFromWishlist(product.id)}
                      title="Remove from wishlist"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="wishlist-item-details">
                    <h4 className="wishlist-item-title">{product.title}</h4>
                    <div className="wishlist-item-price">
                      <span className="current-price">₹{product.price.toLocaleString()}</span>
                    </div>
                    <button
                      className="wishlist-add-to-bag-btn"
                      onClick={() => {
                        onBuyNow(product, product.sizes[0] || 'L', 1);
                        onRemoveFromWishlist(product.id);
                      }}
                    >
                      <ShoppingBag size={14} /> Move to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

