const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const SocialUser = require('../models/SocialUsers'); // For social authentication
const { googleController, facebookAuth } = require('../controllers/social.controller');

const router = express.Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to generate JWT
const generateToken = (user) => jwt.sign(
  { id: user._id, email: user.email },
  JWT_SECRET,
  { expiresIn: '1h  ' }
);

// Google Authentication Route
router.post('/google', googleController)

// Facebook Authentication Route
router.post('/facebook', facebookAuth )

module.exports = router;
