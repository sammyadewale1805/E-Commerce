// routes/uploadRoutes.js
const express = require('express');
const upload = require('../upload'); // Multer configuration
const { uploadFile } = require('../controllers/uploadController');

const router = express.Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file.
 *     description: Uploads a file using Multer middleware and saves it to the server.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File uploaded successfully"
 *                 fileUrl:
 *                   type: string
 *                   example: "http://localhost:5001/uploads/sample.jpg"
 *       400:
 *         description: No file uploaded or invalid file format.
 */
router.post('/', upload.single('file'), uploadFile);

module.exports = router;
