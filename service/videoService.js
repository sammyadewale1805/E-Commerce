const fetch = require('node-fetch');

exports.getVideoChunk = async (fileUrl, range) => {
  try {
    // Fetch the video chunk using the fileUrl (the URL is from Cloudinary)
    const [start, end] = range.replace(/bytes=/, '').split('-').map(Number);

    // Fetch the video chunk from the fileUrl
    const response = await fetch(fileUrl, {
      headers: { Range: `bytes=${start}-${end || ''}` },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch video chunk: ${response.statusText}`);
    }

    // Get content range and length
    const contentRange = response.headers.get('content-range');
    const contentLength = response.headers.get('content-length');

    return {
      stream: response.body, // Video chunk stream
      contentRange,
      contentLength,
    };
  } catch (error) {
    throw new Error(`Error fetching video chunk: ${error.message}`);
  }
};
