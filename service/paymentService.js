const axios = require('axios');
const Payment = require('../models/paymentModel');

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

console.log(PAYSTACK_SECRET_KEY)

class PaymentService {
  static async initializePayment({ email, amount }) {
    try {
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        { email, amount: amount * 100 }, // Amount in kobo
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to initialize payment');
    }
  }

  static async verifyPayment(reference) {
    try {
      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to verify payment');
    }
  }

  static async savePaymentDetails(details) {
    return await Payment.create(details);
  }
}

module.exports = PaymentService;
