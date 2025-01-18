const express = require('express');
const router = express.Router();
const PaystackCallbackController = require('../controllers/paystackCallbackController');

/**
 * @swagger
 * /api/paystack/callback:
 *   post:
 *     summary: Handle Paystack webhook callback
 *     description: Receives and processes Paystack webhook events. Validates the signature to ensure the request is from Paystack.
 *     tags:
 *       - Paystack Webhook
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: The Paystack event payload
 *     responses:
 *       200:
 *         description: Webhook received and processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Webhook received and processed successfully
 *       400:
 *         description: Invalid webhook signature
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid webhook signature
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post('/paystack/callback', PaystackCallbackController.handleCallback);

module.exports = router;
