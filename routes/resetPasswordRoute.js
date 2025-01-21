const express = require('express');
const ResetPasswordController = require('../controllers/resetPasswordController');

const router = express.Router();

/**
 * @swagger
 * /api/reset-password/request:
 *   post:
 *     summary: Request a password reset
 *     description: Request a password reset by email or phone number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset instructions sent
 *       400:
 *         description: Error
 */
router.post('/request', ResetPasswordController.requestReset);

/**
 * @swagger
 * /api/reset-password/reset:
 *   post:
 *     summary: Reset password
 *     description: Reset the password using a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Error
 */
router.post('/reset', ResetPasswordController.resetPassword);

module.exports = router;
