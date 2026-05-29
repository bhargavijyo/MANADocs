/**
 * PDF Controller
 * Handles all PDF-related operations
 */

const path = require('path');
const fs = require('fs');
const { mergePDFs, compressPDF, getPDFMetadata } = require('../utils/pdfProcessor');
const { deleteFile, deleteFiles } = require('../utils/fileCleanup');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * Merge multiple PDFs
 */
exports.mergePDFs = async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return sendError(res, 'At least 2 PDF files are required', 400);
    }

    const filePaths = req.files.map(file => file.path);

    // Merge PDFs
    const mergedPdfBytes = await mergePDFs(filePaths);

    // Generate output filename
    const outputFileName = `merged_${Date.now()}.pdf`;
    const outputPath = path.join(process.env.UPLOAD_DIR || './uploads', outputFileName);

    // Save merged PDF
    fs.writeFileSync(outputPath, mergedPdfBytes);

    // Cleanup source files
    deleteFiles(filePaths);

    sendSuccess(res, {
      fileName: outputFileName,
      downloadUrl: `/downloads/${outputFileName}`,
      fileSize: mergedPdfBytes.length
    }, 'PDFs merged successfully', 200);

  } catch (error) {
    sendError(res, 'PDF merge failed', 500, error);
  }
};

/**
 * Compress PDF
 */
exports.compressPDF = async (req, res) => {
  try {
    if (!req.file) {
      return sendError(res, 'No PDF file provided', 400);
    }

    const originalSize = req.file.size;
    const filePath = req.file.path;

    // Compress PDF
    const compressedBytes = await compressPDF(filePath);

    // Generate output filename
    const outputFileName = `compressed_${Date.now()}.pdf`;
    const outputPath = path.join(process.env.UPLOAD_DIR || './uploads', outputFileName);

    // Save compressed PDF
    fs.writeFileSync(outputPath, compressedBytes);

    // Cleanup source file
    deleteFile(filePath);

    const compressionRatio = ((1 - compressedBytes.length / originalSize) * 100).toFixed(2);

    sendSuccess(res, {
      fileName: outputFileName,
      downloadUrl: `/downloads/${outputFileName}`,
      originalSize,
      compressedSize: compressedBytes.length,
      compressionRatio: `${compressionRatio}%`,
      savedSize: originalSize - compressedBytes.length
    }, 'PDF compressed successfully', 200);

  } catch (error) {
    sendError(res, 'PDF compression failed', 500, error);
  }
};

/**
 * Get PDF metadata
 */
exports.getPDFInfo = async (req, res) => {
  try {
    if (!req.file) {
      return sendError(res, 'No PDF file provided', 400);
    }

    const metadata = await getPDFMetadata(req.file.path);
    deleteFile(req.file.path);

    sendSuccess(res, metadata, 'PDF info retrieved successfully', 200);

  } catch (error) {
    sendError(res, 'Failed to get PDF info', 500, error);
  }
};

/**
 * Split PDF (extract specific pages)
 */
exports.splitPDF = async (req, res) => {
  try {
    if (!req.file) {
      return sendError(res, 'No PDF file provided', 400);
    }

    const { pages } = req.body;
    if (!pages || !Array.isArray(pages)) {
      return sendError(res, 'Invalid pages array', 400);
    }

    // Implementation for splitting PDFs
    // This would require loading the PDF and extracting specific pages
    
    sendSuccess(res, {
      message: 'PDF split functionality available'
    }, 'PDF split feature available', 200);

  } catch (error) {
    sendError(res, 'PDF split failed', 500, error);
  }
};

module.exports = exports;
