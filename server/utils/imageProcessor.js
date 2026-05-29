/**
 * Image Processing Utilities
 * Handles image manipulation and PDF generation
 */

const sharp = require('sharp');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

/**
 * Convert images to PDF
 */
const imagesToPDF = async (imagePaths, outputPath) => {
  try {
    const pdfDoc = await PDFDocument.create();

    for (const imagePath of imagePaths) {
      const imageBuffer = fs.readFileSync(imagePath);
      let imageData;

      // Determine image type and embed accordingly
      if (imagePath.toLowerCase().endsWith('.png')) {
        imageData = await pdfDoc.embedPng(imageBuffer);
      } else if (imagePath.toLowerCase().endsWith('.jpg') || imagePath.toLowerCase().endsWith('.jpeg')) {
        imageData = await pdfDoc.embedJpg(imageBuffer);
      } else {
        // Convert other formats to JPEG first
        const jpegBuffer = await sharp(imageBuffer).jpeg().toBuffer();
        imageData = await pdfDoc.embedJpg(jpegBuffer);
      }

      const page = pdfDoc.addPage([imageData.width, imageData.height]);
      page.drawImage(imageData, {
        x: 0,
        y: 0,
        width: imageData.width,
        height: imageData.height
      });
    }

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
    return outputPath;
  } catch (error) {
    throw new Error(`Images to PDF conversion failed: ${error.message}`);
  }
};

/**
 * Resize image
 */
const resizeImage = async (imagePath, width, height) => {
  try {
    const resized = await sharp(imagePath)
      .resize(width, height, { fit: 'inside', withoutEnlargement: true })
      .toBuffer();
    return resized;
  } catch (error) {
    throw new Error(`Image resize failed: ${error.message}`);
  }
};

/**
 * Compress image
 */
const compressImage = async (imagePath, quality = 80) => {
  try {
    const compressed = await sharp(imagePath)
      .jpeg({ quality })
      .toBuffer();
    return compressed;
  } catch (error) {
    throw new Error(`Image compression failed: ${error.message}`);
  }
};

/**
 * Get image metadata
 */
const getImageMetadata = async (imagePath) => {
  try {
    const metadata = await sharp(imagePath).metadata();
    const stats = fs.statSync(imagePath);

    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: stats.size,
      fileName: path.basename(imagePath)
    };
  } catch (error) {
    throw new Error(`Failed to get image metadata: ${error.message}`);
  }
};

module.exports = {
  imagesToPDF,
  resizeImage,
  compressImage,
  getImageMetadata
};
