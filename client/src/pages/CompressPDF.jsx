/**
 * Compress PDF Page
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import FileUpload from '../components/FileUpload';
import Spinner from '../components/Spinner';
import { compressPDF } from '../utils/api';
import { downloadFile, formatFileSize, isValidFileSize } from '../utils/helpers';

export default function CompressPDF() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [compressionInfo, setCompressionInfo] = useState(null);

  const handleFilesSelected = (selectedFiles) => {
    // Filter for PDF files only
    const pdfFiles = selectedFiles.filter(file =>
      file.type === 'application/pdf'
    );

    if (pdfFiles.length !== selectedFiles.length) {
      toast.error('Only PDF files are supported');
    }

    // Validate file sizes
    const validFiles = pdfFiles.filter(file =>
      isValidFileSize(file)
    );

    if (validFiles.length !== pdfFiles.length) {
      toast.error('Some files exceed the 50MB limit');
    }

    setFiles(validFiles);
    setCompressionInfo(null);
  };

  const handleCompress = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF to compress');
      return;
    }

    setProcessing(true);

    try {
      const response = await compressPDF(files[0]);
      const { data } = response.data;

      toast.success('PDF compressed successfully!');

      setCompressionInfo({
        originalSize: data.originalSize,
        compressedSize: data.compressedSize,
        compressionRatio: data.compressionRatio,
        savedSize: data.savedSize,
      });

      downloadFile(
        `http://localhost:5000${data.downloadUrl}`,
        data.fileName
      );

      // Reset
      setFiles([]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to compress PDF');
      console.error('Error:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 pt-12 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-secondary-900 mb-3">
            Compress PDF
          </h1>
          <p className="text-lg text-secondary-600">
            Reduce PDF file size without losing quality
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-soft mb-8"
        >
          <FileUpload
            onFilesSelected={handleFilesSelected}
            multiple={false}
            accept=".pdf"
          />

          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 pt-8 border-t border-secondary-200"
            >
              <div className="mb-6 p-4 bg-secondary-50 rounded-lg">
                <p className="font-medium text-secondary-900 mb-2">
                  {files[0].name}
                </p>
                <p className="text-secondary-600 text-sm">
                  Original size: {formatFileSize(files[0].size)}
                </p>
              </div>

              <button
                onClick={handleCompress}
                disabled={processing}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <div className="flex items-center justify-center">
                    <Spinner />
                    <span className="ml-2">Compressing...</span>
                  </div>
                ) : (
                  'Compress PDF'
                )}
              </button>
            </motion.div>
          )}

          {compressionInfo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-8 border-t border-secondary-200"
            >
              <h3 className="font-semibold text-secondary-900 mb-4">Compression Results</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600">Original Size</p>
                  <p className="text-xl font-bold text-blue-900">
                    {formatFileSize(compressionInfo.originalSize)}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600">Compressed Size</p>
                  <p className="text-xl font-bold text-green-900">
                    {formatFileSize(compressionInfo.compressedSize)}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600">Saved</p>
                  <p className="text-xl font-bold text-purple-900">
                    {formatFileSize(compressionInfo.savedSize)}
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-600">Compression Ratio</p>
                  <p className="text-xl font-bold text-orange-900">
                    {compressionInfo.compressionRatio}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
