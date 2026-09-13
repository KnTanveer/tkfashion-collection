import { useState, useMemo, useEffect } from 'react';
import '../App.css';
import { getProducts } from '../api.js';
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import WishlistDrawer from '../components/WishlistDrawer';
import QuickViewModal from '../components/QuickViewModal';
import FloatingWidgets from '../components/FloatingWidgets';
import SearchModal from '../components/SearchModal';
import Footer from '../components/Footer';
import Hero from '../components/Hero.jsx';
import CategorySection from '../components/CategorySection.jsx';

function Home() {
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

    const [productsData, setProductsData] = useState(Array);
    const [productsLoading, setProductsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function loadAllProducts() {
            try {
                const data = await getProducts();

                if (!cancelled && Array.isArray(data) && data.length > 0) {
                    setProductsData(data);
                }
            } catch (error) {
                console.error('Failed to load products:', error);
            } finally {
                if (!cancelled) {
                    setProductsLoading(false);
                }
            }
        }

        loadAllProducts();

        return () => {
            cancelled = true;
        };
    }, [])

    // Filtered & Sorted Products
    const filteredProducts = useMemo(() => {
        let list = [...productsData];

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
    }, [productsData, selectedSizes, selectedFabrics, selectedColors, priceRange, sortBy]);

    // Wishlisted product objects
    const wishlistedProducts = useMemo(() => {
        return productsData.filter((p) => wishlist.includes(p.id));
    }, [productsData, wishlist]);

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

            <Hero />
            <CategorySection products={productsData} />

            {/* 4. Main Catalog Section */}

            <main className="catalog-page-container">
                <div className="category-header">
                    <h2>New Arrivals</h2>
                </div>
                <div className="catalog-layout">
                    <ProductGrid
                        products={filteredProducts}
                        wishlistIds={wishlist}
                        onToggleWishlist={handleToggleWishlist}
                        onOpenQuickView={(p) => setQuickViewProduct(p)}
                        onClearFilters={handleClearAllFilters}
                        loading={productsLoading}
                    />
                </div>
            </main>

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

export default Home;
