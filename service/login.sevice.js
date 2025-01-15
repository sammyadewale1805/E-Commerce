const User = require('../models/LoginSignIn');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginService = async (param) => {
  const {email, password} = param;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return { status: 404, message: 'Email not found' };
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 401, message: 'Invalid credentials' };
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return {
      status: 200,
      message: 'Login successful',
      token,
    };
  } catch (error) {
    return { status: 500, message: 'Server error', error: error.message };
  }
};
