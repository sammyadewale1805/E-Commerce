const ProductService = require('../service/productService');

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      return {status: 400, message: 'Error fetching products', error: error.message };
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (error) {
      return {status: 500,  message: 'Error fetching product', error: error.message };
    }
  }

  static async createProduct(req, res) {
    try {
      const { name, price } = req.body;
      if (!name || !price) {
        return {status: 400, message: 'Name and price are required' };
      }
      const product = await ProductService.createProduct({ name, price });
      res.status(201).json(product);
    } catch (error) {
      return {status: 400, message: 'Error creating product', error: error.message };
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updatedProduct = await ProductService.updateProduct(id, req.body);
      if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json(updatedProduct);
    } catch (error) {
      return {status: 500,  message: 'Error updating product', error: error.message };
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await ProductService.deleteProduct(id);
      if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
      (deletedProduct);
    } catch (error) {
      return {status: 500, message: 'Error deleting product', error: error.message };
    }
  }
}

module.exports = ProductController;
