const mongoose = require('mongoose');
const { sendEmail } = require('../utils/email');
const User = require('../models/resetPasswordModel');
const crypto = require('crypto');

class ResetPasswordService {
  static async requestReset({ email, phoneNumber }) {
    let user;

    // Fetch user by email or phone number
    if (email) {
      user = await User.findOne({ email });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
    } else {
      throw new Error('Email or phone number is required');
    }

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user is an instance of the Mongoose model
    if (!(user instanceof mongoose.Document)) {
      console.log('User is not a Mongoose document');
      user = new User(user);  // Manually convert to a Mongoose document
    }

    // Now call the method on the user instance
    const token = generatePasswordResetToken();
    await user.save();

    if (email) {
      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
      await sendEmail(email, 'Password Reset Request', `Click here to reset your password: ${resetLink}`);
    }

    return { message: 'Reset instructions sent' };
  }
}
 const generatePasswordResetToken = function () {
  const token = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  return token;
};
module.exports = ResetPasswordService;
