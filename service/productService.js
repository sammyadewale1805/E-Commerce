const Product = require('../models/productModel');

class ProductService {
  static async getAllProducts() {
    return Product.find();
  }

  static async getProductById(id) {
    return Product.findById(id);
  }

  static async createProduct(data) {
    return Product.create(data);
  }

  static async updateProduct(id, data) {
    return Product.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteProduct(id) {
    return Product.findByIdAndDelete(id);
  }
}

module.exports = ProductService;
