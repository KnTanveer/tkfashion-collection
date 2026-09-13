import express from "express";
import multer from "multer";
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

const API_KEY =  process.env.API_KEY
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


// GET PRODUCTS BY CATEGORY
// Keep this BEFORE /:id
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


// ======================================================
// CLOUDINARY UPLOAD HELPER
// ======================================================

const uploadToCloudinary = (buffer) => {
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

        stream.end(buffer);
    });
};


// ======================================================
// CREATE PRODUCT
// ======================================================

router.post(`/${API_KEY}/`, upload.array("images", 20), async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            price,
            size,
            variants
        } = req.body;


        // -----------------------------
        // VALIDATION
        // -----------------------------

        if (!title || !category || !price || !size) {

            return res.status(400).json({
                message: "Title, category, price and size are required"
            });

        }


        if (!req.files || req.files.length === 0) {

            return res.status(400).json({
                message: "At least one image is required"
            });

        }


        if (!variants) {

            return res.status(400).json({
                message: "Variants are required"
            });

        }


        // -----------------------------
        // PRICE VALIDATION
        // -----------------------------

        if (isNaN(price) || Number(price) < 0) {

            return res.status(400).json({
                message: "Price must be a valid positive number"
            });

        }


        // -----------------------------
        // PARSE VARIANTS
        // -----------------------------

        let parsedVariants;

        try {

            parsedVariants = JSON.parse(variants);

        } catch (error) {

            return res.status(400).json({
                message: "Invalid variants data"
            });

        }


        // -----------------------------
        // UPLOAD ALL IMAGES
        // -----------------------------

        const uploadedImages = [];

        for (const file of req.files) {

            const result = await uploadToCloudinary(
                file.buffer
            );

            uploadedImages.push(result.secure_url);
        }


        // -----------------------------
        // CONNECT IMAGES TO COLORS
        // -----------------------------

        const finalVariants = parsedVariants.map(
            (variant) => {

                const images = variant.imageIndexes.map(
                    (index) => {

                        return uploadedImages[index];

                    }
                );


                return {
                    color: variant.color,
                    colorCode: variant.colorCode,
                    images
                };

            }
        );


        // -----------------------------
        // CREATE PRODUCT
        // -----------------------------

        const product = await Product.create({

            title,

            description,

            category,

            price: Number(price),

            size,

            variants: finalVariants

        });


        res.status(201).json(product);


    } catch (error) {

        console.error(
            "CREATE PRODUCT ERROR:",
            error
        );

        res.status(500).json({
            message: error.message
        });

    }

});


// ======================================================
// UPDATE PRODUCT
// ======================================================

router.put(`/${API_KEY}/:id`, upload.none(), async (req, res) => {
    try {
        const { title, description, category, price, size } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (title !== undefined) {
            product.title = title;
        }

        if (description !== undefined) {
            product.description = description;
        }

        if (category !== undefined) {
            product.category = category;
        }

        if (size !== undefined) {
            product.size = size;
        }

        if (price !== undefined && price !== "") {
            if (isNaN(price) || Number(price) < 0) {
                return res.status(400).json({
                    message: "Price must be a valid number"
                });
            }

            product.price = Number(price);
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


// ======================================================
// DELETE PRODUCT
// ======================================================

router.delete(`/${API_KEY}/:id`, async (req, res) => {

    try {

        const product = await Product.findById(
            req.params.id
        );


        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        await Product.findByIdAndDelete(
            req.params.id
        );


        res.json({
            message: "Product deleted"
        });


    } catch (error) {

        console.error(
            "DELETE PRODUCT ERROR:",
            error
        );

        res.status(500).json({
            message: "Failed to delete product"
        });

    }

});


export default router;