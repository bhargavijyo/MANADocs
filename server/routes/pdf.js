/**
 * PDF Routes
 * API endpoints for PDF operations
 */

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { validatePDFFile, validateMultipleFiles } = require('../middleware/validation');
const pdfController = require('../controllers/pdfController');

/**
 * POST /api/pdf/merge
 * Merge multiple PDFs into one
 */
router.post('/merge', upload.array('files', 20), validateMultipleFiles, pdfController.mergePDFs);

/**
 * POST /api/pdf/compress
 * Compress a PDF file
 */
router.post('/compress', upload.single('file'), validatePDFFile, pdfController.compressPDF);

/**
 * POST /api/pdf/info
 * Get PDF metadata
 */
router.post('/info', upload.single('file'), validatePDFFile, pdfController.getPDFInfo);

/**
 * POST /api/pdf/split
 * Split PDF and extract specific pages
 */
router.post('/split', upload.single('file'), validatePDFFile, pdfController.splitPDF);

module.exports = router;
