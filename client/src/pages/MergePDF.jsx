/**
 * Merge PDF Page
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import FileUpload from '../components/FileUpload';
import Spinner from '../components/Spinner';
import { mergePDFs } from '../utils/api';
import { downloadFile, formatFileSize, isValidFileSize } from '../utils/helpers';

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);

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
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error('Please select at least 2 PDFs to merge');
      return;
    }

    setProcessing(true);

    try {
      const response = await mergePDFs(files);
      const { data } = response.data;

      toast.success('PDFs merged successfully!');
      downloadFile(
        `http://localhost:5000${data.downloadUrl}`,
        data.fileName
      );

      // Reset
      setFiles([]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to merge PDFs');
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
            Merge PDF
          </h1>
          <p className="text-lg text-secondary-600">
            Combine multiple PDFs into a single document
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
            accept=".pdf"
          />

          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 pt-8 border-t border-secondary-200"
            >
              <div className="mb-6">
                <h3 className="font-semibold text-secondary-900 mb-4">
                  Merge Order
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
                onClick={handleMerge}
                disabled={processing}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <div className="flex items-center justify-center">
                    <Spinner />
                    <span className="ml-2">Merging...</span>
                  </div>
                ) : (
                  'Merge PDFs'
                )}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
