/**
 * File Cleanup Utility
 * Removes temporary files after processing
 */

const fs = require('fs');
const path = require('path');

const uploadsDir = process.env.UPLOAD_DIR || './uploads';
const CLEANUP_INTERVAL = parseInt(process.env.CLEANUP_INTERVAL || 86400000); // 24 hours

/**
 * Delete a single file
 */
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✓ Deleted: ${filePath}`);
    }
  } catch (error) {
    console.error(`Failed to delete file: ${filePath}`, error.message);
  }
};

/**
 * Delete multiple files
 */
const deleteFiles = (filePaths) => {
  filePaths.forEach(filePath => deleteFile(filePath));
};

/**
 * Cleanup old files (older than 24 hours)
 */
const cleanupOldFiles = () => {
  try {
    if (!fs.existsSync(uploadsDir)) return;

    const files = fs.readdirSync(uploadsDir);
    const now = Date.now();
    const maxAge = CLEANUP_INTERVAL;

    files.forEach(file => {
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      
      if (now - stats.mtimeMs > maxAge) {
        deleteFile(filePath);
      }
    });
  } catch (error) {
    console.error('Cleanup error:', error.message);
  }
};

/**
 * Start cleanup scheduler
 */
const startCleanupScheduler = () => {
  setInterval(cleanupOldFiles, CLEANUP_INTERVAL);
  console.log('✓ Cleanup scheduler started');
};

module.exports = {
  deleteFile,
  deleteFiles,
  cleanupOldFiles,
  startCleanupScheduler
};
