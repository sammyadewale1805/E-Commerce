const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all items in the cart
 *     description: Retrieve all products currently in the user's cart.
 *     tags:
 *       - Cart
 *     responses:
 *       200:
 *         description: Successfully retrieved cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                     example: 63e1a542c4d1b731b40eb123
 *                   quantity:
 *                     type: number
 *                     example: 2
 *       500:
 *         description: Server error
 */
router.get('/', CartController.getCart);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add a product to the cart
 *     description: Add a product to the user's cart with the specified quantity.
 *     tags:
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 63e1a542c4d1b731b40eb123
 *               quantity:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/', CartController.addToCart);

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Remove a product from the cart
 *     description: Remove a specific product from the user's cart.
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to be removed from the cart
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *       404:
 *         description: Product not found in cart
 *       500:
 *         description: Server error
 */
router.delete('/:productId', CartController.removeFromCart);

module.exports = router;
