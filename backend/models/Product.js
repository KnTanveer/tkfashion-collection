import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
    {
        color: {
            type: String,
            required: true,
            trim: true
        },

        colorCode: {
            type: String,
            required: true,
            trim: true
        },

        images: {
            type: [String],
            required: true
        }
    },
    {
        _id: false
    }
);

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true
        },

        size: {
            type: String,
            required: true,
            trim: true
        },

        variants: {
            type: [variantSchema],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;