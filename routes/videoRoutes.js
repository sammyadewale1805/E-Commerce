// routes/videoRoutes.js
const express = require('express');
const { streamVideo } = require('../controllers/videoController');

const router = express.Router();

/**
 * @swagger
 * /video/{videoId}:
 *   get:
 *     summary: Stream video by videoId.
 *     description: Streams a video file based on the video ID from the database.
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the video to stream.
 *     responses:
 *       200:
 *         description: Video streaming response.
 *         content:
 *           video/mp4:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Video not found.
 */
router.get('/:videoId', streamVideo);

module.exports = router;
