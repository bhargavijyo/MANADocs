/**
 * Validation Middleware
 * Validates request data and file types
 */

const validatePDFFile = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded'
    });
  }

  if (req.file.mimetype !== 'application/pdf') {
    return res.status(400).json({
      success: false,
      message: 'File must be a PDF'
    });
  }

  next();
};

const validateImageFile = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded'
    });
  }

  const allowedImageMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedImageMimes.includes(req.file.mimetype)) {
    return res.status(400).json({
      success: false,
      message: 'File must be an image (JPEG, PNG, WebP, or GIF)'
    });
  }

  next();
};

const validateMultipleFiles = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No files uploaded'
    });
  }

  if (req.files.length > 20) {
    return res.status(400).json({
      success: false,
      message: 'Maximum 20 files allowed'
    });
  }

  next();
};

module.exports = {
  validatePDFFile,
  validateImageFile,
  validateMultipleFiles
};
