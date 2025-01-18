const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');

/**
 * @swagger
 * /api/payments/initialize:
 *   post:
 *     summary: Initialize a payment
 *     description: Creates a new payment session and returns a payment URL.
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               amount:
 *                 type: number
 *                 example: 5000
 *     responses:
 *       200:
 *         description: Payment initialized successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Payment initialized successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     authorization_url:
 *                       type: string
 *                       example: https://paystack.com/pay/xyz123
 *                     reference:
 *                       type: string
 *                       example: 12345abcde
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/initialize', PaymentController.initializePayment);

/**
 * @swagger
 * /api/payments/verify:
 *   get:
 *     summary: Verify a payment
 *     description: Verifies the payment status using the reference provided.
 *     tags:
 *       - Payments
 *     parameters:
 *       - in: query
 *         name: reference
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment reference to verify
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Payment verified successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: success
 *                     reference:
 *                       type: string
 *                       example: 12345abcde
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.get('/verify', PaymentController.verifyPayment);

module.exports = router;
