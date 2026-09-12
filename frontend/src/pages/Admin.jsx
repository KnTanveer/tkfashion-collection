import { useEffect, useState } from "react";
import './Admin.css';

const API_URL = "http://localhost:5001/api/products";

function Admin() {
    const [products, setProducts] = useState([]);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    // GET PRODUCTS
    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL);

            const data = await response.json();

            setProducts(data);

        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // RESET FORM
    const resetForm = () => {
        setTitle("");
        setPrice("");
        setCategory("");
        setImage(null);
        setEditingId(null);

        document.getElementById("imageInput").value = "";
    };

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !category) {
            alert("Please enter title and category");
            return;
        }

        if (!editingId && !image) {
            alert("Please select an image");
            return;
        }

        setLoading(true);

        const formData = new FormData();

        formData.append("title", title);
        formData.append("price", price);
        formData.append("category", category);

        if (image) {
            formData.append("image", image);
        }

        try {
            let response;

            if (editingId) {

                // UPDATE
                response = await fetch(`${API_URL}/${editingId}`, {
                    method: "PUT",
                    body: formData
                });

            } else {

                // CREATE
                response = await fetch(API_URL, {
                    method: "POST",
                    body: formData
                });

            }

            if (!response.ok) {
                throw new Error("Request failed");
            }

            await fetchProducts();

            resetForm();

        } catch (error) {
            console.error(error);

            alert("Something went wrong");

        } finally {
            setLoading(false);
        }
    };

    // EDIT
    const handleEdit = (product) => {
        setEditingId(product._id);
        setPrice(product.price);
        setTitle(product.title);
        setCategory(product.category);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // DELETE
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Delete failed");
            }

            setProducts(
                products.filter((product) => product._id !== id)
            );

        } catch (error) {
            console.error(error);

            alert("Failed to delete product");
        }
    };

    return (
        <div className="admin-container">
            <h1>Product Admin</h1>

            {/* FORM */}
            <form
                className="product-form"
                onSubmit={handleSubmit}
            >

                <h2>
                    {editingId ? "Edit Product" : "Add Product"}
                </h2>


                <label>
                    Title
                </label>

                <input
                    type="text"
                    placeholder="Product title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>
                    Price
                </label>

                <input
                    type="number"
                    placeholder="1299"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                />

                <label>
                    Category
                </label>

                <input
                    type="text"
                    placeholder="T-Shirts"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <label>
                    Image
                </label>

                <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <div className="form-buttons">
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : editingId
                                ? "Update Product"
                                : "Add Product"
                        }
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* PRODUCTS */}

            <div className="products-section">

                <h2>
                    Products ({products.length})
                </h2>


                {products.length === 0 ? (
                    <p>No products yet.</p>
                ) : (

                    <div className="products-grid">
                        {products.map((product) => (
                            <div
                                className="product-card"
                                key={product._id}
                            >

                                <img
                                    src={product.image}
                                    alt={product.title}
                                />

                                <div className="product-info">

                                    <h3>
                                        {product.title}
                                    </h3>

                                    <p>
                                        {product.category}
                                    </p>

                                    <div className="actions">
                                        <button
                                            onClick={() => handleEdit(product)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(product._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;