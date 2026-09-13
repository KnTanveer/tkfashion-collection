import { useEffect, useRef, useState } from "react";
import { X, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import './QuickViewModal.css'

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onBuyNow
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  const galleryRef = useRef(null);
  const imageRefs = useRef([]);

  /* Flatten variants into one continuous gallery */
  const gallery =
    product?.variants?.flatMap((variant) =>
      variant.images.map((image) => ({
        image,
        color: variant.color
      }))
    ) || [];

  /*
   * Clean sizes
   */
  const sizes =
    product?.size
      ?.split(",")
      .map((size) => size.trim())
      .filter(Boolean) || [];

  /* Reset when product changes */
  useEffect(() => {
    if (!product) return;

    setActiveImageIndex(0);

    if (product.variants?.length) {
      setSelectedColor(product.variants[0].color);
    } else {
      setSelectedColor("");
    }

    setSelectedSize(sizes[0] || "");
  }, [product]);

  /*
   * Change active image
   */
  const changeImage = (index) => {
    if (index < 0 || index >= gallery.length) return;

    setActiveImageIndex(index);

    const color = gallery[index]?.color;

    if (color) {
      setSelectedColor(color);
    }
  };

  /*
   * Select color
   */
  const handleColorChange = (color) => {
    setSelectedColor(color);

    const index = gallery.findIndex(
      (item) => item.color === color
    );

    if (index !== -1) {
      changeImage(index);

      // Scroll thumbnail into view
      imageRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });

      // Scroll main gallery
      const galleryElement = galleryRef.current;

      if (galleryElement) {
        galleryElement.scrollTo({
          left: index * galleryElement.clientWidth,
          behavior: "smooth"
        });
      }
    }
  };

  /*
   * Handle swipe / horizontal scroll
   */
  const handleGalleryScroll = () => {
    const galleryElement = galleryRef.current;

    if (!galleryElement) return;

    const width = galleryElement.clientWidth;

    if (!width) return;

    const index = Math.round(
      galleryElement.scrollLeft / width
    );

    if (index !== activeImageIndex && gallery[index]) {
      setActiveImageIndex(index);

      const color = gallery[index].color;

      if (color) {
        setSelectedColor(color);
      }

      imageRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    }
  };

  /*
   * Previous / next buttons
   */
  const previousImage = () => {
    changeImage(activeImageIndex - 1);

    const galleryElement = galleryRef.current;

    if (galleryElement) {
      galleryElement.scrollTo({
        left: (activeImageIndex - 1) * galleryElement.clientWidth,
        behavior: "smooth"
      });
    }
  };

  const nextImage = () => {
    changeImage(activeImageIndex + 1);

    const galleryElement = galleryRef.current;

    if (galleryElement) {
      galleryElement.scrollTo({
        left: (activeImageIndex + 1) * galleryElement.clientWidth,
        behavior: "smooth"
      });
    }
  };

  /*
   * Add to cart
   */
  const handleBuyNow = () => {
    onBuyNow(product);

    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  if (!isOpen || !product) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
    >
      <div
        className="quickview-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="quickview-grid">

          {/* =====================================================
              PRODUCT GALLERY
          ====================================================== */}

          <div className="quickview-gallery">

            <div
              className="main-image-gallery"
              ref={galleryRef}
              onScroll={handleGalleryScroll}
            >

              {gallery.map((item, index) => (
                <div
                  className="main-gallery-slide"
                  key={index}
                >
                  <img
                    src={item.image}
                    alt={`${product.title} ${index + 1}`}
                    className="quickview-main-img"
                    draggable="false"
                  />
                </div>
              ))}

            </div>

            {/* Image counter */}
            {gallery.length > 1 && (
              <div className="image-counter">
                {activeImageIndex + 1} / {gallery.length}
              </div>
            )}

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="thumbnails-row">

                {gallery.map((item, idx) => (
                  <button
                    key={idx}
                    ref={(el) => {
                      imageRefs.current[idx] = el;
                    }}
                    className={`thumb-btn ${
                      activeImageIndex === idx
                        ? "active"
                        : ""
                    }`}
                    onClick={() => {
                      changeImage(idx);

                      const galleryElement =
                        galleryRef.current;

                      if (galleryElement) {
                        galleryElement.scrollTo({
                          left:
                            idx *
                            galleryElement.clientWidth,
                          behavior: "smooth"
                        });
                      }
                    }}
                  >
                    <img
                      src={item.image}
                      alt={`View ${idx + 1}`}
                    />
                  </button>
                ))}

              </div>
            )}

          </div>


          {/* =====================================================
              PRODUCT DETAILS
          ====================================================== */}

          <div className="quickview-details">

            <h2 className="quickview-title">
              {product.title}
            </h2>

            {product.subtitle && (
              <p className="quickview-subtitle">
                {product.subtitle}
              </p>
            )}

            {/* Price */}
            <div className="quickview-price-row">

              <span className="current-price">
                ₹{Number(product.price).toLocaleString()}
              </span>

              <span className="old-price">
                ₹{Number(product.price +800).toLocaleString()}
              </span>

            </div>

            {product.description && (
              <p className="quickview-description">
                {product.description}
              </p>
            )}


            {/* =================================================
                COLOR
            ================================================== */}

            {product.variants?.length > 0 && (
              <div className="quickview-option-group">

                <div className="option-header">

                  <span className="option-label">
                    Select Color:
                  </span>

                  <span className="selected-color-name">
                    {selectedColor}
                  </span>

                </div>

                <div className="colors-selector">

                  {product.variants.map((variant) => (

                    <button
                      key={variant.color}
                      type="button"
                      className={`color-choice ${
                        selectedColor === variant.color
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleColorChange(
                          variant.color
                        )
                      }
                      title={variant.color}
                      aria-label={`Select ${variant.color}`}
                    >

                      <span
                        className="color-circle"
                        style={{
                          backgroundColor:
                            variant.colorCode
                        }}
                      />

                    </button>

                  ))}

                </div>

              </div>
            )}


            {/* =================================================
                SIZE
            ================================================== */}

            {sizes.length > 0 && (
              <div className="quickview-option-group">

                <div className="option-header">

                  <span className="option-label">
                    Select Size:
                  </span>

                  <span>
                    {selectedSize}
                  </span>

                </div>

                <div className="sizes-selector-grid">

                  {sizes.map((size) => (

                    <button
                      key={size}
                      type="button"
                      className={`size-choice-btn ${
                        selectedSize === size
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedSize(size)
                      }
                    >
                      {size}
                    </button>

                  ))}

                </div>

              </div>
            )}


            {/* =================================================
                ACTIONS
            ================================================== */}

            <div className="quickview-action-buttons">

              <a
                href={`https://api.whatsapp.com/send/?phone=919969454909&text=Hi+TK+Fashion+Collection%21+I+want+to+purchase+${product.title}+of+size+${selectedSize}+and+color+${selectedColor}+&type=phone_number&app_absent=0`}
                target="_blank"
                rel="noopener noreferrer"
              >

                <button
                  type="button"
                  className={`quickview-add-btn ${
                    isAdded ? "added" : ""
                  }`}
                  onClick={handleBuyNow}
                >
                  Buy now
                  <SiWhatsapp size={18} />
                </button>

              </a>


              <button
                type="button"
                className={`quickview-wishlist-toggle ${
                  isWishlisted ? "active" : ""
                }`}
                onClick={() =>
                  onToggleWishlist(product)
                }
                title={
                  isWishlisted
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"
                }
              >

                <Heart
                  size={20}
                  fill={
                    isWishlisted
                      ? "#c5a880"
                      : "none"
                  }
                  color={
                    isWishlisted
                      ? "#c5a880"
                      : "#1C1917"
                  }
                />

              </button>

            </div>


            {/* =================================================
                DETAILS
            ================================================== */}

            {product.details && (
              <div className="product-specs-list">

                <h4 className="specs-title">
                  Fabric & Craft Specifications:
                </h4>

                <ul>
                  {product.details.map(
                    (spec, i) => (
                      <li key={i}>
                        {spec}
                      </li>
                    )
                  )}
                </ul>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}