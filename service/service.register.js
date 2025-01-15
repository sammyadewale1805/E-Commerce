const User = require('../models/LoginSignIn');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();
const saltRounds = parseInt(process.env.BCRYPT_SALT);


exports.registerService = async (param) => {
    const { username, email, password } = param;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return  { status: 409, message: 'email alredy in use' }
      }

      // Hash password
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({id: newUser.email}, "load123")

      return {
        status: 201,
        message: 'registered successfully',
        token,
      }
    } catch (error) {
     return  {status: 500, message: 'Server error User', error: error.message };
    }
}
