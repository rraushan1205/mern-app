import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
        pTitle: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        img1: {
            type: String,
            required: true
        },
        img2: {
            type: String,
            // required: true
        },
        img3: {
            type: String,
            // required: true
        },
        videoLink: {
            type: String
        },
        availableBool: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export const Product = mongoose.model('product_data', productSchema);
