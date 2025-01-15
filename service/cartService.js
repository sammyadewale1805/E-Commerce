const Cart = require('../models/cartModel');

class CartService {
  static async getCart() {
    return Cart.findOne().populate('products.product');
  }

  static async addToCart(productId, quantity) {
    let cart = await Cart.findOne();
    if (!cart) {
      cart = await Cart.create({ products: [] });
    }

    const existingProduct = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    return cart.populate('products.product');
  }

  static async removeFromCart(productId) {
    const cart = await Cart.findOne();
    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    return cart.populate('products.product');
  }
}

module.exports = CartService;
