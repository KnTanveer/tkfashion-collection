import { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const shippingFreeThreshold = 2999;
  const isFreeShipping = subtotal >= shippingFreeThreshold;
  const progressPercent = Math.min(100, Math.round((subtotal / shippingFreeThreshold) * 100));
  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'EID2026' || promoCode.trim().toUpperCase() === 'RAFAA10') {
      setDiscountApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try "EID2026" for 10% off');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Cart Header */}
        <div className="drawer-header">
          <div className="drawer-title-row">
            <ShoppingBag size={20} />
            <h2 className="drawer-title">Shopping Bag ({items.reduce((sum, i) => sum + i.quantity, 0)})</h2>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="shipping-progress-box">
          <div className="shipping-progress-text">
            <Truck size={16} />
            {isFreeShipping ? (
              <span className="free-shipping-unlocked">
                🎉 Congratulations! You have unlocked <strong>FREE Shipping</strong>
              </span>
            ) : (
              <span>
                Add <strong>₹{(shippingFreeThreshold - subtotal).toLocaleString()}</strong> more to get Free Shipping!
              </span>
            )}
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="drawer-content">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingBag size={54} strokeWidth={1.2} className="empty-cart-icon" />
              <h3>Your shopping bag is empty</h3>
              <p>Explore our exclusive EID 2026 collection and discover handcrafted Pakistani ensembles.</p>
              <button className="continue-shopping-btn" onClick={onClose}>
                Explore EID Collection
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="cart-item-row">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <div className="cart-item-top">
                      <h4 className="cart-item-title">{item.product.title}</h4>
                      <button
                        className="cart-item-remove"
                        onClick={() => onRemoveItem(item.product.id, item.size)}
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="cart-item-size">Size: <strong>{item.size}</strong></div>
                    <div className="cart-item-bottom">
                      <div className="quantity-controls">
                        <button
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="cart-item-price">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="drawer-footer">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="promo-code-form">
              <input
                type="text"
                placeholder="Discount code (use EID2026)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-input"
              />
              <button type="submit" className="promo-apply-btn">
                Apply
              </button>
            </form>
            {promoError && <div className="promo-error-msg">{promoError}</div>}
            {discountApplied && (
              <div className="promo-success-msg">
                Coupon applied! 10% discount subtracted.
              </div>
            )}

            {/* Calculations */}
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            {discountApplied && (
              <div className="summary-row discount-row">
                <span>Discount (10%)</span>
                <span>-₹{discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Shipping</span>
              <span>{isFreeShipping ? 'FREE' : '₹149'}</span>
            </div>
            <div className="summary-row total-row">
              <span>Estimated Total</span>
              <span className="total-amount">₹{(finalTotal + (isFreeShipping ? 0 : 149)).toLocaleString()}</span>
            </div>

            <button className="checkout-btn" onClick={onCheckout}>
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div className="trust-badge-row">
              <ShieldCheck size={14} />
              <span>100% Authentic Designer Quality & Easy 7-Day Exchange</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

