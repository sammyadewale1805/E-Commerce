const PaystackCallbackService = require('../service/paystackCallbackService');

class PaystackCallbackController {
  // Handle Paystack callback (webhook)
  static async handleCallback(req, res) {
    try {
      // Extract the Paystack signature and body data
      // const paystackSignature = req.headers['x-paystack-signature'];
      const event = req.body;

      // Verify the signature to ensure the webhook is from Paystack
      // const isValidSignature = await PaystackCallbackService.verifySignature(
      //   paystackSignature,
      //   req.body
      // );

      // if (!isValidSignature) {
      //   return res.status(400).json({ message: 'Invalid webhook signature' });
      // }

      // Process the event if the signature is valid
      await PaystackCallbackService.processEvent(event);

      res.status(200).json({ message: 'Webhook received and processed successfully' });
    } catch (error) {
      console.error('Error processing Paystack webhook:', error.message);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
}

module.exports = PaystackCallbackController;
