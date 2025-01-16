const express = require('express');
const router = express.Router();
const PaystackCallbackController = require('../controllers/paystackCallbackController');

// Paystack callback (webhook) route
router.post('/paystack/callback', PaystackCallbackController.handleCallback);

module.exports = router;
