import { useState } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import { REVIEWS_DATA } from '../data/products';

export default function ReviewsDrawer({ isOpen, onClose }) {
  const [reviewsList, setReviewsList] = useState(REVIEWS_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    title: '',
    comment: '',
    city: ''
  });
  const [submittedMessage, setSubmittedMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const created = {
      id: Date.now(),
      author: newReview.name,
      rating: Number(newReview.rating),
      date: 'Just now',
      verified: true,
      location: newReview.city || 'India',
      product: 'EID 2026 Pakistani Suite Collection',
      title: newReview.title || 'Wonderful Experience',
      comment: newReview.comment,
      userImage: null
    };

    setReviewsList([created, ...reviewsList]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsSubmitting(false);
      setNewReview({ name: '', rating: 5, title: '', comment: '', city: '' });
    }, 1800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="reviews-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-row">
            <Star size={20} fill="#c5a880" color="#c5a880" />
            <h2 className="drawer-title">Customer Reviews & Ratings</h2>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close reviews">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content reviews-drawer-content">
          {/* Overall Rating Summary */}
          <div className="reviews-summary-card">
            <div className="rating-score-box">
              <span className="big-score">4.9</span>
              <div className="summary-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#c5a880" color="#c5a880" />
                ))}
              </div>
              <span className="summary-total-reviews">Based on 163 verified reviews</span>
            </div>

            <div className="rating-bars-breakdown">
              <div className="rating-bar-row">
                <span>5 ★</span>
                <div className="bar-bg"><div className="bar-fill" style={{ width: '88%' }}></div></div>
                <span>88%</span>
              </div>
              <div className="rating-bar-row">
                <span>4 ★</span>
                <div className="bar-bg"><div className="bar-fill" style={{ width: '10%' }}></div></div>
                <span>10%</span>
              </div>
              <div className="rating-bar-row">
                <span>3 ★</span>
                <div className="bar-bg"><div className="bar-fill" style={{ width: '2%' }}></div></div>
                <span>2%</span>
              </div>
            </div>
          </div>

          {/* Write a review toggle */}
          <div className="write-review-prompt-row">
            <button
              className="write-review-toggle-btn"
              onClick={() => setIsSubmitting(!isSubmitting)}
            >
              {isSubmitting ? 'Cancel' : '✍️ Write a Verified Review'}
            </button>
          </div>

          {/* Write Review Form */}
          {isSubmitting && (
            <form onSubmit={handleSubmitReview} className="write-review-form">
              <h4 className="form-heading">Share your experience</h4>
              
              <div className="form-field">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Z."
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label>Rating</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5 - Outstanding)</option>
                  <option value="4">⭐⭐⭐⭐ (4 - Very Good)</option>
                  <option value="3">⭐⭐⭐ (3 - Average)</option>
                </select>
              </div>

              <div className="form-field">
                <label>City / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai, Maharashtra"
                  value={newReview.city}
                  onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label>Review Title</label>
                <input
                  type="text"
                  placeholder="e.g. Gorgeous embroidery and perfect fit"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label>Your Review Comments *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about the fabric quality, fitting, and packaging..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
              </div>

              {submittedMessage ? (
                <div className="review-submitted-success">
                  <CheckCircle size={16} /> Thank you! Your review has been published.
                </div>
              ) : (
                <button type="submit" className="submit-review-btn">
                  Publish Review
                </button>
              )}
            </form>
          )}

          {/* Customer Reviews List */}
          <div className="reviews-list">
            {reviewsList.map((review) => (
              <div key={review.id} className="customer-review-card">
                <div className="review-card-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="reviewer-name-row">
                        <span className="reviewer-name">{review.author}</span>
                        {review.verified && (
                          <span className="verified-badge">
                            <CheckCircle size={12} /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="reviewer-location">{review.location}</span>
                    </div>
                  </div>
                  <span className="review-date">{review.date}</span>
                </div>

                <div className="review-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill={i < review.rating ? '#c5a880' : 'none'}
                      color="#c5a880"
                    />
                  ))}
                  <span className="review-card-title">{review.title}</span>
                </div>

                <p className="review-comment-text">{review.comment}</p>

                {review.userImage && (
                  <div className="review-image-preview">
                    <img src={review.userImage} alt="Customer photo" />
                  </div>
                )}

                <div className="review-product-tag">
                  Item: <span>{review.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

