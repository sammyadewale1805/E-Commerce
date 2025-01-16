const PaymentService = require('../service/paymentService');

class PaymentController {
  static async initializePayment(req, res) {
    const { email, amount, userId } = req.body;

    try {
      const { data } = await PaymentService.initializePayment({ email, amount });
      const paymentDetails = {
        userId,
        email,
        amount,
        paymentStatus: 'pending',
        reference: data.reference,
      };

      await PaymentService.savePaymentDetails(paymentDetails);
      res.status(200).json({ authorizationUrl: data.authorization_url });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async verifyPayment(req, res) {
    const { reference } = req.query;

    try {
      const { data } = await PaymentService.verifyPayment(reference);

      if (data.status === 'success') {
        await Payment.findOneAndUpdate(
          { reference },
          { paymentStatus: 'success' },
          { new: true }
        );
        res.status(200).json({ message: 'Payment verified successfully', data });
      } else {
        res.status(400).json({ message: 'Payment verification failed' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PaymentController;
