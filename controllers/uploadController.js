const { saveFileMetadata } = require('../service/uploadService');

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Save file metadata
    const savedFile = await saveFileMetadata(req.file);

    res.status(201).json({
      message: 'File uploaded successfully',
      file: savedFile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadFile };
