import { useState, useMemo } from 'react';
import './App.css';
import { PRODUCTS_DATA } from './data/products';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import SidebarFilter from './components/SidebarFilter';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import QuickViewModal from './components/QuickViewModal';
import ReviewsDrawer from './components/ReviewsDrawer';
import FloatingWidgets from './components/FloatingWidgets';
import SearchModal from './components/SearchModal';
import AccountModal from './components/AccountModal';
import Footer from './components/Footer';

function App() {
  // Navigation & Category State
  const [activeCategory, setActiveCategory] = useState('eid-2026');

  // Filter States
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState(6000);
  const [sortBy, setSortBy] = useState('date-new-old');

  // Cart & Wishlist States
  const [cart, setCart] = useState([
    {
      product: PRODUCTS_DATA[0],
      size: 'XL',
      quantity: 1
    }
  ]);
  const [wishlist, setWishlist] = useState([1, 2, 5]); // Pre-loaded wishlist items for realistic preview

  // Drawer / Modal Visibility States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Toggle Filters
  const handleToggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleToggleFabric = (fabric) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric]
    );
  };

  const handleToggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleClearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedFabrics([]);
    setSelectedColors([]);
    setPriceRange(6000);
  };

  // Cart Handlers
  const handleAddToCart = (product, size = 'L', quantity = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, size, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (productId, size, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const handleCheckout = () => {
    alert('Thank you for choosing RAFAA / TK Fashion! Redirecting to secure COD/UPI checkout...');
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS_DATA];

    // Filter by Size
    if (selectedSizes.length > 0) {
      list = list.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s))
      );
    }

    // Filter by Fabric
    if (selectedFabrics.length > 0) {
      list = list.filter((p) => selectedFabrics.includes(p.fabric));
    }

    // Filter by Color
    if (selectedColors.length > 0) {
      list = list.filter((p) => selectedColors.includes(p.color));
    }

    // Filter by Price Range
    list = list.filter((p) => p.price <= priceRange);

    // Sort Products
    if (sortBy === 'date-new-old') {
      list.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (sortBy === 'date-old-new') {
      list.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    } else if (sortBy === 'price-low-high') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'best-selling') {
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedSizes, selectedFabrics, selectedColors, priceRange, sortBy]);

  // Wishlisted product objects
  const wishlistedProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => wishlist.includes(p.id));
  }, [wishlist]);

  // Display count (matching reference screenshot count: e.g. 163 products or dynamic)
  const displayCount = selectedSizes.length > 0 || selectedFabrics.length > 0 || selectedColors.length > 0 || priceRange < 6000
    ? filteredProducts.length
    : 163;

  return (
    <div className="app-root">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Site Header & Navigation */}
      <Header
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        onOpenAccountModal={() => setIsAccountOpen(true)}
      />

      {/* 3. Breadcrumbs & Collection Title */}
      <section className="collection-header-section">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href="#home" className="breadcrumb-link" onClick={(e) => { e.preventDefault(); setActiveCategory('home'); }}>
            Home
          </a>
          <span className="breadcrumb-separator">/</span>
          <a href="#collections" className="breadcrumb-link" onClick={(e) => { e.preventDefault(); setActiveCategory('eid-2026'); }}>
            Collections
          </a>
          <span className="breadcrumb-separator">/</span>
        </nav>
        <h1 className="collection-title">EID 2026</h1>
      </section>

      {/* 4. Main Catalog Section (2-Column Layout) */}
      <div className="catalog-page-container">
        <div className="catalog-layout">
          {/* Left Column: Sidebar Filters */}
          <div className={isMobileFiltersOpen ? 'sidebar-filter mobile-drawer-open' : ''}>
            {isMobileFiltersOpen && (
              <div className="mobile-filter-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <strong style={{ fontSize: '16px' }}>Filters</strong>
                <button onClick={() => setIsMobileFiltersOpen(false)} style={{ fontSize: '14px', fontWeight: 'bold' }}>✕ Close</button>
              </div>
            )}
            <SidebarFilter
              selectedSizes={selectedSizes}
              onToggleSize={handleToggleSize}
              selectedFabrics={selectedFabrics}
              onToggleFabric={handleToggleFabric}
              selectedColors={selectedColors}
              onToggleColor={handleToggleColor}
              priceRange={priceRange}
              onChangePriceRange={setPriceRange}
              onClearAllFilters={handleClearAllFilters}
            />
          </div>

          {/* Right Column: Products Grid */}
          <ProductGrid
            products={filteredProducts}
            totalDisplayCount={displayCount}
            sortBy={sortBy}
            onChangeSort={setSortBy}
            wishlistIds={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
            onClearFilters={handleClearAllFilters}
          />
        </div>
      </div>

      {/* 5. Site Footer */}
      <Footer />

      {/* 6. Floating Widgets (Exact match: Wishlist pill, Reviews tab, Chat widget) */}
      <FloatingWidgets
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenReviews={() => setIsReviewsOpen(true)}
      />

      {/* 7. Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistedProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
      />

      <ReviewsDrawer
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => {
          setQuickViewProduct(product);
        }}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />
    </div>
  );
}

export default App;
