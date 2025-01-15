const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

router.get('/', CartController.getCart); // Get all items in the cart
router.post('/', CartController.addToCart); // Add a product to the cart
router.delete('/:productId', CartController.removeFromCart); // Remove a product from the cart

module.exports = router;
