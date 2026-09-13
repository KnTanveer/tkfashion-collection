import { Link } from "react-router-dom";
import "./CategorySection.css";

function CategorySection({ products = [] }) {
    // Get unique categories
    const categories = [
        ...new Set(
            products
                .map((product) => product.category)
                .filter(Boolean)
        )
    ];

    return (
        <section className="category-section">

            <div className="category-header">
                <div>
                    <p className="category-eyebrow">CURATED FOR YOU</p>
                    <h2>Shop By Category</h2>
                </div>

                <button className="category-view-all">
                    VIEW ALL <span>→</span>
                </button>
            </div>

            <div className="category-grid">

                {categories.map((category) => {
                    const categoryProduct = products.find(
                        (product) =>
                            product.category === category &&
                            product.variants?.[0]?.images?.[0]
                    );

                    const image = categoryProduct?.variants?.[0]?.images?.[0];

                    return (
                        <Link
                            key={category}
                            to={`/products?category=${encodeURIComponent(category)}`}
                            className="category-card"
                        >
                            <div className="category-image-container">
                                {image && (
                                    <img
                                        src={image}
                                        alt={category}
                                        className="category-image"
                                    />
                                )}
                            </div>

                            <div className="category-bottom">
                                <h3>{category}</h3>

                                <span className="category-explore">
                                    EXPLORE <span>→</span>
                                </span>
                            </div>
                        </Link>
                    );
                })}

            </div>

        </section>
    );
}

export default CategorySection;