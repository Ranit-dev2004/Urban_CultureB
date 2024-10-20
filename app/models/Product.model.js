const mongoose = require('mongoose');
const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          oldPrice: {
            type: Number,
            required:true,
          },
          rating: {
            type: Number,
            required: true,
          },
          reviews: {
            type: Number,
            required: true,
          },
          discount: {
            type: String,
            required: true,
          },
          img: {
            type: String,
            required: true,
          },
}, {
    timestamps: true,
    })
);

module.exports = Product