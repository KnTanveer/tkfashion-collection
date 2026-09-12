import express from "express";
import multer from "multer";
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.json(products);
    } catch (error) {
        console.error("GET PRODUCTS ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
});


// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);
    } catch (error) {
        console.error("GET PRODUCT ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch product"
        });
    }
});

// GET PRODUCTS BY CATEGORY
router.get("/category/:category", async (req, res) => {
    try {
        const { category } = req.params;

        const products = await Product.find({
            category: {
                $regex: `^${category}$`,
                $options: "i"
            }
        }).sort({ createdAt: -1 });

        res.json(products);

    } catch (error) {
        console.error("GET CATEGORY PRODUCTS ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch products by category"
        });
    }
});

// CREATE PRODUCT
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, category, price, size } = req.body;

        // Validate required fields
        if (!title || !category || !price || !size || !req.file) {
            return res.status(400).json({
                message: "Title, category, price and image are required"
            });
        }

        // Validate price
        if (isNaN(price) || Number(price) < 0) {
            return res.status(400).json({
                message: "Price must be a valid positive number"
            });
        }


        // Upload image to Cloudinary
        const uploadToCloudinary = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "ecommerce-products"
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                stream.end(req.file.buffer);
            });
        };


        const result = await uploadToCloudinary();


        // Create product
        const product = await Product.create({
            title,
            category,
            price: Number(price),
            size,
            image: result.secure_url
        });


        res.status(201).json(product);

    } catch (error) {
        console.error("CREATE PRODUCT ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
});


// UPDATE PRODUCT
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const { title, category, price, size } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }


        // Update title
        if (title) {
            product.title = title;
        }


        // Update category
        if (category) {
            product.category = category;
        }

        // Update size
        if (size) {
            product.size = size;
        }

        // Update price
        if (price !== undefined && price !== "") {

            if (isNaN(price) || Number(price) < 0) {
                return res.status(400).json({
                    message: "Price must be a valid positive number"
                });
            }

            product.price = Number(price);
        }


        // If a new image was uploaded
        if (req.file) {

            const uploadToCloudinary = () => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "ecommerce-products"
                        },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );

                    stream.end(req.file.buffer);
                });
            };


            const result = await uploadToCloudinary();

            product.image = result.secure_url;
        }


        await product.save();

        res.json(product);

    } catch (error) {
        console.error("UPDATE PRODUCT ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
});


// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product deleted"
        });

    } catch (error) {
        console.error("DELETE PRODUCT ERROR:", error);

        res.status(500).json({
            message: "Failed to delete product"
        });
    }
});


export default router;