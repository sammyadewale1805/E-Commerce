const crypto = require('crypto');
const Payment = require('../models/paymentModel');

class PaystackCallbackService {
  // Verify the Paystack webhook signature
  static async verifySignature(paystackSignature, body) {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      throw new Error('Paystack secret key is not defined');
    }

    // Generate the hash of the payload using HMAC
    const hash = crypto
      .createHmac('sha512', secretKey)
      .update(JSON.stringify(body))
      .digest('hex');

    // Compare the generated hash with Paystack's signature
    return hash === paystackSignature;
  }

  // Process the Paystack event after signature verification
  static async processEvent(event) {
    try {
      switch (event.event) {
        case 'charge.success': {
          const transactionData = event.data;

          // Check if the payment already exists in the database
          const existingPayment = await Payment.findOne({ reference: transactionData.reference });
          if (existingPayment) {
            console.log('Payment already processed:', transactionData.reference);
            return;
          }

          // Create a new payment record in the database
          const payment = new Payment({
            reference: transactionData.reference,
            amount: transactionData.amount,
            status: transactionData.status,
            customer: {
              email: transactionData.customer.email,
              firstName: transactionData.customer.first_name || 'N/A',
              lastName: transactionData.customer.last_name || 'N/A',
            },
          });

          await payment.save();
          console.log('Payment processed successfully:', transactionData.reference);
          break;
        }
        default:
          console.log('Unsupported event type:', event.event);
      }
    } catch (error) {
      console.error('Error processing Paystack event:', error.message);
      throw new Error('Error processing event');
    }
  }
}

module.exports = PaystackCallbackService;
