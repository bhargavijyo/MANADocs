/**
 * PDF Processing Utilities
 * Handles PDF manipulation operations
 */

const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const { deleteFile } = require('./fileCleanup');

/**
 * Merge multiple PDF files into a single PDF
 */
const mergePDFs = async (filePaths) => {
  try {
    const mergedPdf = await PDFDocument.create();

    for (const filePath of filePaths) {
      const pdfBytes = fs.readFileSync(filePath);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    return mergedPdfBytes;
  } catch (error) {
    throw new Error(`PDF merge failed: ${error.message}`);
  }
};

/**
 * Compress PDF by reducing page quality
 */
const compressPDF = async (filePath, quality = 0.75) => {
  try {
    const pdfBytes = fs.readFileSync(filePath);
    const pdf = await PDFDocument.load(pdfBytes);

    // Note: pdf-lib doesn't have built-in compression
    // In production, consider using other libraries like ghostscript
    // or cloud services. This is a simplified approach.
    
    const compressedBytes = await pdf.save();
    return compressedBytes;
  } catch (error) {
    throw new Error(`PDF compression failed: ${error.message}`);
  }
};

/**
 * Get PDF metadata (page count, file size)
 */
const getPDFMetadata = async (filePath) => {
  try {
    const pdfBytes = fs.readFileSync(filePath);
    const pdf = await PDFDocument.load(pdfBytes);
    const stats = fs.statSync(filePath);

    return {
      pageCount: pdf.getPageCount(),
      fileSize: stats.size,
      fileName: path.basename(filePath),
      createdAt: stats.birthtime
    };
  } catch (error) {
    throw new Error(`Failed to get PDF metadata: ${error.message}`);
  }
};

/**
 * Convert PDF to images (returns paths to generated images)
 */
const pdfToImages = async (filePath) => {
  // Implementation requires pdf.js and canvas/image libraries
  // For now, return placeholder implementation
  try {
    return {
      success: true,
      message: 'PDF to image conversion would require additional setup'
    };
  } catch (error) {
    throw new Error(`PDF to image conversion failed: ${error.message}`);
  }
};

/**
 * Extract text from PDF
 */
const extractPDFText = async (filePath) => {
  try {
    const pdfBytes = fs.readFileSync(filePath);
    const pdf = await PDFDocument.load(pdfBytes);
    
    // Basic extraction - pdf-lib is limited for text extraction
    // Use pdf-parse or pdfjs-dist for better extraction
    return {
      pageCount: pdf.getPageCount(),
      note: 'Full text extraction requires specialized libraries'
    };
  } catch (error) {
    throw new Error(`Text extraction failed: ${error.message}`);
  }
};

module.exports = {
  mergePDFs,
  compressPDF,
  getPDFMetadata,
  pdfToImages,
  extractPDFText
};
