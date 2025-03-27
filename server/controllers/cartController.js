const cartModel = require('../models/cartModel');

async function getCartItems(req, res) {
    const { userId } = req.params;

    try {
        const cart = await cartModel.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
}

async function addToCart(req, res) {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user._id;

    try {
        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            cart = new cartModel({ userId, products: [] });
        }

        const existingProduct = cart.products.find(p => p.productId.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error adding product to cart", error });
    }
}

async function removeFromCart(req, res) {
    const { productId } = req.params;
    const userId = req.user._id;

    try {
        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "cartModel not found" });
        }

        cart.products = cart.products.filter(p => p.productId.toString() !== productId);

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error removing product from cart", error });
    }
}

async function updateCartItemQuantity(req, res) {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1." });
    }

    try {
        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        const cartItem = cart.products.find(item => item.productId.toString() === itemId);

        if (!cartItem) {
            return res.status(404).json({ message: "Item not found in cart." });
        }

        cartItem.quantity = quantity;

        await cart.save();

        return res.status(200).json({ message: "Quantity updated successfully", cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    addToCart,
    getCartItems,
    removeFromCart,
    updateCartItemQuantity,
}