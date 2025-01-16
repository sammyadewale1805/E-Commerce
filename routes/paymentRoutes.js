const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');

// Initialize payment
router.post('/initialize', PaymentController.initializePayment);

// Verify payment
router.get('/verify', PaymentController.verifyPayment);

module.exports = router;
