import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function LiveSalesToast({ isVisible = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    if (dismissed) return;

    const interval = setInterval(() => {
      setAnimating(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % LIVE_SALES_NOTIFICATIONS.length);
        setAnimating(true);
      }, 400);
    }, 7000);

    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed || !isVisible) return null;

  const currentItem = LIVE_SALES_NOTIFICATIONS[currentIndex];

  return (
    <div className={`live-sales-toast ${animating ? 'fade-in' : 'fade-out'}`}>
      <div className="toast-thumbnail-wrapper">
        <img
          src={currentItem.thumbnail}
          alt={currentItem.productTitle}
          className="toast-thumbnail"
        />
      </div>
      <div className="toast-details">
        <div className="toast-buyer-row">
          <span className="toast-verified-dot"></span>
          <span className="toast-buyer-name">{currentItem.buyerName}</span>
          <span className="toast-location">in {currentItem.city}, {currentItem.country}</span>
        </div>
        <div className="toast-action">
          Purchased <span className="toast-item-title">{currentItem.productTitle}</span>
        </div>
        <div className="toast-time">{currentItem.timeAgo}</div>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="toast-close-btn"
        aria-label="Close notification"
      >
        <X size={12} />
      </button>
    </div>
  );
}

