import { useState, useMemo, useEffect } from 'react';
import './App.css';
import { PRODUCTS_DATA } from './data/products';
import { getProducts } from './api.js';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import WishlistDrawer from './components/WishlistDrawer';
import QuickViewModal from './components/QuickViewModal';
import FloatingWidgets from './components/FloatingWidgets';
import SearchModal from './components/SearchModal';
import Footer from './components/Footer';
import Hero from './components/Hero.jsx';

function App() {
  // Navigation & Category State
  const [activeCategory, setActiveCategory] = useState('eid-2026');

  // Filter States
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState(6000);
  const [sortBy, setSortBy] = useState('date-new-old');

  // Wishlist States
  const [wishlist, setWishlist] = useState([1, 2, 5]); // Pre-loaded wishlist items for realistic preview

  // Drawer / Modal Visibility States
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Toggle Filters

  const handleClearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedFabrics([]);
    setSelectedColors([]);
    setPriceRange(6000);
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

  // Fetch products

  const [productsData, setProductsData] = useState([]) 
  useEffect(() => {
        async function loadAllProducts() {
            const data = await getProducts()
            setProductsData(data)
        }
        loadAllProducts()
    }, [])

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

      {/* 2. Site Header & Navigation */}
      <Header
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      <Hero/>
      {/* 4. Main Catalog Section (2-Column Layout) */}
      <div className="catalog-page-container">
        <div className="catalog-layout">

          {/* Right Column: Products Grid */}
          {/* <ProductGrid
            products={PRODUCTS_DATA}
            totalDisplayCount={displayCount}
            sortBy={sortBy}
            onChangeSort={setSortBy}
            wishlistIds={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            onClearFilters={handleClearAllFilters}
          /> */}

          <ProductGrid
            products={productsData}
            onToggleWishlist={handleToggleWishlist}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
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
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistedProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => {
          setQuickViewProduct(product);
        }}
      />
    </div>
  );
}

export default App;
