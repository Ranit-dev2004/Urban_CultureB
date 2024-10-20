const db = require("../models/index.model");
const Cart = db.Cart;
const Product = db.Product

exports.AddToCart = async (req, res) => {
    const userId = req.userId; 
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).send({message:'Product not found'})
        }
        let cart = await Cart.findOne({ userId });

        if (cart) {
          const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    
          if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
          } else {
            cart.products.push({ productId, quantity });
          }
        } else {
          cart = new Cart({
            userId,
            products: [{ productId, quantity }],
          });
        }
        await cart.save();
    
        res.status(200).send({ message: 'Product added to cart', cart });
      } catch (err) {
        res.status(500).send({ message: err.message || 'An error occurred while adding the product to the cart.' });
      }
    };
exports.getCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.userId }).populate('products.productId');
      if (!cart) return res.status(404).send({ message: 'Cart not found' });
      res.status(200).send({ cart });
    } catch (err) {
      res.status(500).send({ message: 'Error fetching cart' });
    }
  };

  exports.RemoveFromCart = async (req, res) => {
    const userId = req.userId; 
    const { productId } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).send({ message: 'Product not found in cart' });
        }

        cart.products.splice(productIndex, 1);

        if (cart.products.length === 0) {
            await Cart.deleteOne({ userId });
        } else {
            await cart.save();
        }

        res.status(200).send({ message: 'Product removed from cart', cart });
    } catch (err) {
        res.status(500).send({ message: err.message || 'An error occurred while removing the product from the cart.' });
    }
};


