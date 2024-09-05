const mongoose = require('mongoose');
const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
    },
    brand: {
        type: String,
    },
    image: {
        type: String,
    },
}, {
    timestamps: true,
    })
);

module.exports = Product