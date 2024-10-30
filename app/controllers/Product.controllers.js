const config = require("../config/auth.config");
const db = require("../models/index.model");
const Product = db.Product;

exports.Addproduct = async (req, res) => {
    try {
        const productsData = req.body;
        const savedProducts = [];
        const errors = [];

        for (const productData of productsData) {
            const { name, price, oldPrice, rating, reviews, img, discount } = productData;

            if (!name || !price || !rating || !reviews || !img || !discount) {
                errors.push(`Product data missing required fields: ${JSON.stringify(productData)}`);
                continue; 
            }

            const newProduct = new Product({
                name,
                price,
                oldPrice,
                rating,
                reviews,
                img,
                discount,
            });

            try {
                const savedProduct = await newProduct.save();
                savedProducts.push(savedProduct);
            } catch (err) {
                errors.push(`Error saving product: ${err.message} - Data: ${JSON.stringify(productData)}`);
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Some products could not be added.",
                errors,
                savedProducts
            });
        }

        res.status(200).json({
            message: "Products added successfully!",
            products: savedProducts
        });

    } catch (err) {
        res.status(500).json({
            message: "Sorry, getting some bugs :)",
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
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findProductByField = async (req, res) => {
    try {
        const { name, description, category, brand } = req.query;
        const query = {};
        if (name) query.name = { $regex: name, $options: 'i' };
        if (description) query.description = { $regex: description, $options: 'i' };
        if (category) query.category = { $regex: category, $options: 'i' };
        if (brand) query.brand = { $regex: brand, $options: 'i' };
        const products = await Product.find(query);

        if (products.length === 0) {
            return res.status(404).json({
                message: "No products found"
            });
        }

        res.status(200).json({
            message: "Products found",
            products: products 
        });
    } catch (err) {
        console.log("Error while finding products by field:", err);
        res.status(500).json({
            message: "Failed to find products",
            error: err.message
        });
    }
};


exports.getBestSellingItems = async (req,res)=>{
    try{
        const items=await Product.find();
        res.json(items);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.FindProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  