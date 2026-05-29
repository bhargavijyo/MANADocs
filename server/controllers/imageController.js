/**
 * Image Controller
 * Handles all image-related operations
 */

const path = require('path');
const fs = require('fs');
const { imagesToPDF, getImageMetadata } = require('../utils/imageProcessor');
const { deleteFile, deleteFiles } = require('../utils/fileCleanup');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * Convert images to PDF
 */
exports.imagesToPDF = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return sendError(res, 'No images provided', 400);
    }

    const imagePaths = req.files.map(file => file.path);

    // Generate output filename
    const outputFileName = `images_${Date.now()}.pdf`;
    const outputPath = path.join(process.env.UPLOAD_DIR || './uploads', outputFileName);

    // Convert images to PDF
    await imagesToPDF(imagePaths, outputPath);

    // Get output file size
    const stats = fs.statSync(outputPath);

    // Cleanup source files
    deleteFiles(imagePaths);

    sendSuccess(res, {
      fileName: outputFileName,
      downloadUrl: `/downloads/${outputFileName}`,
      fileSize: stats.size,
      imagesCount: req.files.length
    }, 'Images converted to PDF successfully', 200);

  } catch (error) {
    sendError(res, 'Images to PDF conversion failed', 500, error);
  }
};

/**
 * Get image metadata
 */
exports.getImageInfo = async (req, res) => {
  try {
    if (!req.file) {
      return sendError(res, 'No image provided', 400);
    }

    const metadata = await getImageMetadata(req.file.path);
    deleteFile(req.file.path);

    sendSuccess(res, metadata, 'Image info retrieved successfully', 200);

  } catch (error) {
    sendError(res, 'Failed to get image info', 500, error);
  }
};

module.exports = exports;
