/**
 * Image to PDF Page
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import FileUpload from '../components/FileUpload';
import Spinner from '../components/Spinner';
import { imagesToPDF } from '../utils/api';
import { downloadFile, formatFileSize, isValidFileSize } from '../utils/helpers';
import { getTranslation } from '../utils/i18n';
import { useAppStore } from '../utils/store';

export default function ImageToPDF() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const { language } = useAppStore();

  const handleFilesSelected = (selectedFiles) => {
    // Filter for image files only
    const imageFiles = selectedFiles.filter(file =>
      file.type.startsWith('image/')
    );

    if (imageFiles.length !== selectedFiles.length) {
      toast.error('Only image files are supported');
    }

    // Validate file sizes
    const validFiles = imageFiles.filter(file =>
      isValidFileSize(file)
    );

    if (validFiles.length !== imageFiles.length) {
      toast.error('Some files exceed the 50MB limit');
    }

    setFiles(validFiles);
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    setProcessing(true);

    try {
      const response = await imagesToPDF(files);
      const { data } = response.data;

      toast.success('Images converted to PDF successfully!');
      downloadFile(
        `http://localhost:5000${data.downloadUrl}`,
        data.fileName
      );

      // Reset
      setFiles([]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to convert images');
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
            {getTranslation('features.imageToPdf', language)}
          </h1>
          <p className="text-lg text-secondary-600">
            {getTranslation('features.imageToPdfDesc', language)}
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
            multiple={true}
            accept="image/*"
          />

          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 pt-8 border-t border-secondary-200"
            >
              <div className="mb-6">
                <h3 className="font-semibold text-secondary-900 mb-4">
                  File Order (drag to rearrange)
                </h3>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-secondary-50 rounded-lg"
                    >
                      <span className="w-6 h-6 bg-primary-600 text-white rounded flex items-center justify-center text-sm mr-3">
                        {index + 1}
                      </span>
                      <span className="flex-1 font-medium">{file.name}</span>
                      <span className="text-secondary-600 text-sm">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleConvert}
                disabled={processing}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <div className="flex items-center justify-center">
                    <Spinner />
                    <span className="ml-2">Converting...</span>
                  </div>
                ) : (
                  'Convert to PDF'
                )}
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Fast</h3>
            <p className="text-blue-700 text-sm">Converts images to PDF in seconds</p>
          </div>
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="font-semibold text-green-900 mb-2">Secure</h3>
            <p className="text-green-700 text-sm">Your files never leave your device</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="font-semibold text-purple-900 mb-2">Free</h3>
            <p className="text-purple-700 text-sm">No limits, no registration needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
