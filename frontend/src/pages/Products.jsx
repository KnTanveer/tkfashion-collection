import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getProductByCategory, getProducts } from "../api";
import Footer from "../components/Footer";
import FloatingWidgets from "../components/FloatingWidgets"
import QuickViewModal from "../components/QuickViewModal"

function Products() {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [quickViewProduct, setQuickViewProduct] = useState(null);

    const category = searchParams.get("category");

    useEffect(() => {
        async function fetchProducts() {
            try {
                if (!category) {
                    const data = await getProducts();
                    setProducts(data);
                } else {
                    const data = await getProductByCategory(category);
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setProducts([]);
            }
        }

        fetchProducts();
    }, [category]);


    return (
        <main>
            <Header />

            <div className="catalog-page-container">
                <div className="products-header">
                    <h1>
                        {category || "All"}
                    </h1>
                </div>

                <ProductGrid
                    products={products}
                    onOpenQuickView={(product) => setQuickViewProduct(product)}
                />
            </div>

            <Footer />

            <FloatingWidgets />

            <QuickViewModal
                product={quickViewProduct}
                isOpen={Boolean(quickViewProduct)}
                onClose={() => setQuickViewProduct(null)}
            />

            {/* <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistedProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => {
          setQuickViewProduct(product);
        }}
      /> */}
        </main>
    );
}

export default Products;