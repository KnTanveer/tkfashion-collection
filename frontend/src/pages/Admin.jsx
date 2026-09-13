import { useEffect, useState } from "react";
import "./Admin.css";

const URL = import.meta.env.VITE_API_URL;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = URL + "/api/products";

function Admin() {
    const [products, setProducts] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [size, setSize] = useState("");

    const [variants, setVariants] = useState([
        {
            color: "",
            colorCode: "#000000",
            images: []
        }
    ]);

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [adminPassword, setAdminPassword] = useState("");

    // Color
    const addVariant = () => {
        setVariants([
            ...variants,
            {
                color: "",
                colorCode: "#000000",
                images: []
            }
        ]);
    };

    const removeVariant = (index) => {
        setVariants(
            variants.filter((_, i) => i !== index)
        );
    };

    const updateVariantColor = (index, value) => {
        const updated = [...variants];

        updated[index].color = value;

        setVariants(updated);
    };

    const updateVariantColorCode = (index, value) => {
        const updated = [...variants];

        updated[index].colorCode = value;

        setVariants(updated);
    };

    const updateVariantImages = (index, files) => {
        const updated = [...variants];

        updated[index].images = Array.from(files);

        setVariants(updated);
    };

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!adminPassword) {
            return;
        }

        if (adminPassword !== ADMIN_KEY) {
            alert("Invalid password");
            return;
        }

        setAuthenticated(true);
        setAdminPassword("");
    };

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
        if (authenticated) {
            fetchProducts();
        }
    }, [authenticated]);

    // RESET FORM
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPrice("");
        setCategory("");
        setSize("");

        setVariants([
            {
                color: "",
                colorCode: "#000000",
                images: []
            }
        ]);

        setEditingId(null);
    };

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            alert("Please enter title");
            return;
        }

        setLoading(true);

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("size", size);

        // Only add variants/images when creating a new product
        if (!editingId) {
            if (variants.length === 0) {
                alert("Add at least one color");
                setLoading(false);
                return;
            }

            for (const variant of variants) {
                if (!variant.color) {
                    alert("Every color needs a name");
                    setLoading(false);
                    return;
                }

                if (variant.images.length === 0) {
                    alert(`Add images for ${variant.color}`);
                    setLoading(false);
                    return;
                }
            }

            let imageIndex = 0;

            const variantData = variants.map((variant) => {
                const imageIndexes = [];

                variant.images.forEach((image) => {
                    formData.append("images", image);
                    imageIndexes.push(imageIndex);
                    imageIndex++;
                });

                return {
                    color: variant.color,
                    colorCode: variant.colorCode,
                    imageIndexes
                };
            });

            formData.append(
                "variants",
                JSON.stringify(variantData)
            );
        }

        try {
            let response;

            if (editingId) {
                response = await fetch(`${API_URL}/${API_KEY}/${editingId}`, {
                    method: "PUT",
                    body: formData
                });
            } else {
                response = await fetch(`${API_URL}/${API_KEY}/`, {
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

        setTitle(product.title || "");
        setDescription(product.description || "");
        setPrice(product.price || "");
        setCategory(product.category || "");
        setSize(product.size || "");

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
            const response = await fetch(`${API_URL}/${API_KEY}/${id}`, {
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

    if (!authenticated) {
        return (
            <div className="admin-login">
                <h1>Admin Login</h1>

                <form onSubmit={handleLogin}>
                    <input
                        type="password"
                        placeholder="Admin password"
                        value={adminPassword}
                        onChange={(e) =>
                            setAdminPassword(e.target.value)
                        }
                        autoFocus
                    />

                    <button
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }

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
                    Description
                </label>

                <input
                    type="text"
                    placeholder="Product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    Sizes
                </label>

                <input
                    type="text"
                    placeholder="S, M, L, XL"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                />

                <label>Colors & Images</label>

                <div className="variants-container">

                    {variants.map((variant, index) => (
                        <div
                            className="variant-editor"
                            key={index}
                        >

                            <div className="variant-header">

                                <h3>
                                    Color {index + 1}
                                </h3>

                                {variants.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(index)}
                                    >
                                        Remove
                                    </button>
                                )}

                            </div>

                            <input
                                type="text"
                                placeholder="Color name e.g. Black"
                                value={variant.color}
                                onChange={(e) =>
                                    updateVariantColor(
                                        index,
                                        e.target.value
                                    )
                                }
                            />

                            <div className="color-input-row">

                                <input
                                    type="color"
                                    value={variant.colorCode}
                                    onChange={(e) =>
                                        updateVariantColorCode(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />

                                <span>
                                    {variant.colorCode}
                                </span>

                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) =>
                                    updateVariantImages(
                                        index,
                                        e.target.files
                                    )
                                }
                            />

                            {variant.images.length > 0 && (
                                <div className="variant-preview">
                                    {variant.images.map((image, imageIndex) => (
                                        <img
                                            key={imageIndex}
                                            src={window.URL.createObjectURL(image)}
                                            alt=""
                                        />
                                    ))}
                                </div>
                            )}

                        </div>
                    ))}

                </div>

                <button
                    type="button"
                    onClick={addVariant}
                >
                    + Add Color
                </button>

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
                                    src={product.variants?.[0]?.images?.[0]}
                                    alt={product.title}
                                />

                                <div className="admin-product-info">

                                    <h3>
                                        {product.title}
                                    </h3>

                                    <p>
                                        ₹{product.price} {product.category}
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