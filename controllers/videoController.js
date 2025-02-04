const uploadModel = require('../models/uploadModel'); // Import the existing Upload model
const videoService = require('../service/videoService'); // Use the video service

exports.streamVideo = async (req, res) => {
  try {
    const { videoId } = req.params; // Get videoId from the route parameters (using _id for lookup)
    const range = req.headers.range; // Get the Range header to stream the video in chunks

    if (!range) {
      return res.status(400).send('Range header is required'); // Return error if range header is missing
    }

    // Fetch the video metadata using the existing Upload model by _id
    const video = await uploadModel.findById(videoId); // Query the video by _id
    if (!video) {
      return res.status(404).json({ message: 'Video not found' }); // Return error if video not found
    }

    // Use the videoService to get the video chunk from Cloudinary
    const videoStreamData = await videoService.getVideoChunk(video.fileUrl, range); // Pass the fileUrl to the service

    // Set the response headers for partial content (206) to stream the video
    res.writeHead(206, {
      'Content-Range': videoStreamData.contentRange,
      'Accept-Ranges': 'bytes',
      'Content-Length': videoStreamData.contentLength,
      'Content-Type': video.fileType, // Use the fileType from the database
    });

    // Pipe the video stream to the response
    videoStreamData.stream.pipe(res);
  } catch (error) {
    res.status(500).json({
      message: 'Error streaming video',
      error: error.message,
    });
  }
};
