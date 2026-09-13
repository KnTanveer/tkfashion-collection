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

    // Wishlist States
    const [wishlist, setWishlist] = useState([1, 2, 5]); // Pre-loaded wishlist items for realistic preview

    // Drawer / Modal Visibility States
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState(null);

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
    const sixProducts = productsData.slice(0, 6);

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
                <div id="newarrivals" className="category-header">
                    <h2>New Arrivals</h2>
                </div>
                <div className="catalog-layout">
                    <ProductGrid
                        products={sixProducts}
                        wishlistIds={wishlist}
                        onToggleWishlist={handleToggleWishlist}
                        onOpenQuickView={(p) => setQuickViewProduct(p)}
                        loading={productsLoading}
                    />
                </div>
            </main>

            {/* 5. Site Footer */}
            <Footer />

            {/* 6. Floating Widgets (Exact match: Wishlist pill, Reviews tab, Chat widget) */}
            <FloatingWidgets/>

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
