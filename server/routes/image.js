/**
 * Image Routes
 * API endpoints for image operations
 */

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { validateImageFile, validateMultipleFiles } = require('../middleware/validation');
const imageController = require('../controllers/imageController');

/**
 * POST /api/image/to-pdf
 * Convert images to PDF
 */
router.post('/to-pdf', upload.array('files', 20), validateMultipleFiles, imageController.imagesToPDF);

/**
 * POST /api/image/info
 * Get image metadata
 */
router.post('/info', upload.single('file'), validateImageFile, imageController.getImageInfo);

module.exports = router;
