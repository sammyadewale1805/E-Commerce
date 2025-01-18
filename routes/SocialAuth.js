const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const SocialUser = require('../models/SocialUsers'); // For social authentication
const { googleController, facebookAuth } = require('../controllers/social.controller');

const router = express.Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Helper function to generate JWT
 * @param {Object} user - User object
 * @returns {string} - Signed JWT token
 */
const generateToken = (user) => jwt.sign(
  { id: user._id, email: user.email },
  JWT_SECRET,
  { expiresIn: '1h' }
);

/**
 * @swagger
 * /api/social-auth/google:
 *   post:
 *     summary: Google Authentication
 *     description: Authenticate a user via Google OAuth and return a JWT token.
 *     tags:
 *       - Social Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Google OAuth token
 *                 example: "ya29.a0AR..."
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       400:
 *         description: Invalid token or authentication failed
 */

/**
 * @swagger
 * /api/social-auth/facebook:
 *   post:
 *     summary: Facebook Authentication
 *     description: Authenticate a user via Facebook OAuth and return a JWT token.
 *     tags:
 *       - Social Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *                 description: Facebook OAuth access token
 *                 example: "EAABsbCS1...."
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       400:
 *         description: Invalid token or authentication failed
 */

// Google Authentication Route
router.post('/google', googleController);

// Facebook Authentication Route
router.post('/facebook', facebookAuth);

module.exports = router;
