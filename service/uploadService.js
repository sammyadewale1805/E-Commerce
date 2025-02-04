const Upload = require('../models/uploadModel');

const saveFileMetadata = async (file) => {
  try {
    const upload = new Upload({
      fileName: file.originalname,
      fileUrl: file.path,
      fileType: file.mimetype,
      size: file.size,
    });
    return await upload.save();
  } catch (error) {
    throw new Error('Failed to save file metadata');
  }
};

module.exports = { saveFileMetadata };
