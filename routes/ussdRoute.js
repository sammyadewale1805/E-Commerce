// routes/ussdRoutes.js
const express = require('express');
const router = express.Router();
const ussdController = require('../controllers/ussdController');

/**
 * @swagger
 * /ussd:
 *   post:
 *     summary: Process a USSD request.
 *     description: Handles USSD sessions by processing parameters from the request body and returning an appropriate response.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 description: Unique session identifier.
 *                 example: "123456"
 *               serviceCode:
 *                 type: string
 *                 description: The USSD code dialed (e.g., *123#).
 *                 example: "*123#"
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number of the user.
 *                 example: "+254712345678"
 *               text:
 *                 type: string
 *                 description: The user's input text.
 *                 example: ""
 *     responses:
 *       200:
 *         description: USSD response string starting with either 'CON' to continue or 'END' to terminate the session.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.post('/', ussdController.handleUSSD);

module.exports = router;
