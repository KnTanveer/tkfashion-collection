import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getProductByCategory } from "../api";
import Footer from "../components/Footer";

function Products() {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);

    const category = searchParams.get("category");

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProductByCategory(category);
                setProducts(data);
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
                        {category || "All Products"}
                    </h1>
                </div>

                <ProductGrid products={products} />
            </div>

            <Footer />
        </main>
    );
}

export default Products;