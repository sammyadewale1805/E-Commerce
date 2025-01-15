const cartService = require('../service/cartService');

class CartController {
  static async getCart(req, res) {
    try {
      const cart = await cartService.getCart();
      res.json(cart || { products: [] });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
  }

  static async addToCart(req, res) {
    try {
      const { productId, quantity } = req.body;
      if (!productId || !quantity || quantity < 1) {
        return res.status(400).json({ message: 'Invalid product or quantity' });
      }

      const cart = await cartService.addToCart(productId, quantity);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
  }

  static async removeFromCart(req, res) {
    try {
      const { productId } = req.params;

      const cart = await cartService.removeFromCart(productId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error removing from cart', error: error.message });
    }
  }
}

module.exports = CartController;
