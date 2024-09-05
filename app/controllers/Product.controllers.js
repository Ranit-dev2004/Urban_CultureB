const config = require("../config/auth.config");
const db = require("../models/index.model");
const Product = db.Product;

exports.Addproduct = async (req, res) => {
    try {
        const { name, description, price, category, brand, image, timestamps } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            brand,
            image,
            timestamps
        });
        const savedProduct = await newProduct.save();

        res.status(200).json({
            message: "Product added successfully!",
            product: savedProduct
        });

    } catch (err) {
         res.status(500).json({
            message: "Sorry, getting some bugs:)",
            error: err.message
        });
    }
};
exports.UpdateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
            new: true,
            runValidators: true 
        });

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (err) {
        console.log("Error while updating product:", err);
        res.status(500).json({
            message: "Failed to update product",
            error: err.message
        });
    }
};
exports.DeleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct
        });
    } catch (err) {
        console.log("Error while deleting product:", err);
        res.status(500).json({
            message: "Failed to delete product",
            error: err.message
        });
    }
};
exports.FindProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product found",
            product: product
        });
    } catch (err) {
        console.log("Error while finding product:", err);
        res.status(500).json({
            message: "Failed to find product",
            error: err.message
        });
    }
};

exports.findProductByField = async (req, res) => {
    try {
        const { name, description, price, category, brand, image } = req.query;
        const query = {};
        
        if (name) query.name = { $regex: name, $options: 'i' };
        if (description) query.description = { $regex: description, $options: 'i' };
        if (category) query.category = { $regex: category, $options: 'i' };
        if (brand) query.brand = { $regex: brand, $options: 'i' };
        
        const product = await Product.findOne(query);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product found",
            product: product
        });
    } catch (err) {
        console.log("Error while finding product by field:", err);
        res.status(500).json({
            message: "Failed to find product",
            error: err.message
        });
    }
};

