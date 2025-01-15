const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/LoginSignIn');
const { register } = require('../controllers/register.controller');
const { login } = require('../controllers/login.controller');

const router = express.Router();
const saltRounds = parseInt(process.env.BCRYPT_SALT);

// @route   POST /api/auth/register
// @desc    Register new user
router.post('/register', register)

// @route   POST /api/auth/login
// @desc    Login user and return JWT
router.post('/login', login)

module.exports = router;
