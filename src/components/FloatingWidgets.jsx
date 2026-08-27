import { useState } from 'react';
import { Heart, MessageCircle, X, Send } from 'lucide-react';

export default function FloatingWidgets({
  wishlistCount,
  onOpenWishlist,
  onOpenReviews
}) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'support', text: 'Salam! Welcome to RAFAA / TK Fashion. How can we help you with your Eid shopping today?' }
  ]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMsg.trim()) return;

    const userText = chatMsg;
    setChatLog((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatMsg('');

    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        {
          sender: 'support',
          text: 'Thank you for reaching out! Our bridal & ethnic stylist will connect with you via WhatsApp in moments. COD is available across India with free shipping on prepaid orders.'
        }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* 1. Bottom-Left Wishlist Pill (Exact match to screenshot) */}
      <div className="floating-wishlist-container">
        <button
          className="floating-wishlist-pill"
          onClick={onOpenWishlist}
          aria-label="View Wishlist"
        >
          <Heart size={16} fill="white" color="white" />
          <span className="floating-wishlist-label">Wishlist</span>
          <span className="floating-wishlist-badge">({wishlistCount})</span>
        </button>
      </div>

      {/* 2. Right Edge Attached Reviews Vertical Tab (Exact match to screenshot) */}
      <button
        className="floating-reviews-tab"
        onClick={onOpenReviews}
        aria-label="Customer Reviews"
      >
        <span className="reviews-tab-star">★</span>
        <span className="reviews-tab-text">REVIEWS</span>
      </button>

      {/* 3. Bottom-Right Green Chat Button (Exact match to screenshot) */}
      <div className="floating-chat-container">
        {chatOpen && (
          <div className="floating-chat-box">
            <div className="chat-box-header">
              <div className="chat-agent-info">
                <div className="chat-agent-avatar">R</div>
                <div>
                  <div className="chat-agent-title">RAFAA Stylist Concierge</div>
                  <div className="chat-agent-status">
                    <span className="online-green-dot"></span> Online • Reply in ~1 min
                  </div>
                </div>
              </div>
              <button
                className="chat-close-btn"
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            <div className="chat-box-messages">
              {chatLog.map((msg, idx) => (
                <div key={idx} className={`chat-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="chat-quick-actions">
              <button
                onClick={() => {
                  setChatLog((prev) => [
                    ...prev,
                    { sender: 'user', text: 'Is COD available for my location?' },
                    { sender: 'support', text: 'Yes! Cash on Delivery is available across 19,000+ PIN codes in India.' }
                  ]);
                }}
              >
                COD Available?
              </button>
              <button
                onClick={() => {
                  setChatLog((prev) => [
                    ...prev,
                    { sender: 'user', text: 'How do I choose my size?' },
                    { sender: 'support', text: 'Our sizes range from M (38) up to 6XL. All suits feature 2-inch margins for easy alteration.' }
                  ]);
                }}
              >
                Size Guide
              </button>
            </div>

            <form onSubmit={handleSendChat} className="chat-input-form">
              <input
                type="text"
                placeholder="Ask our stylists anything..."
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
              />
              <button type="submit" aria-label="Send message">
                <Send size={15} />
              </button>
            </form>
          </div>
        )}

        <button
          className="floating-chat-btn"
          onClick={() => setChatOpen(!chatOpen)}
          aria-label="Live Chat Support"
        >
          <MessageCircle size={18} fill="#25D366" color="#25D366" />
          <span className="chat-btn-text">Chat</span>
        </button>
      </div>
    </>
  );
}

