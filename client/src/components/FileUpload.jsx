/**
 * File Upload Component with Drag & Drop
 */

import React from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiX } from 'react-icons/fi';
import { formatFileSize } from '../utils/helpers';
import { getTranslation } from '../utils/i18n';
import { useAppStore } from '../utils/store';

export default function FileUpload({ 
  onFilesSelected, 
  multiple = true, 
  accept = 'image/*,.pdf'
}) {
  const [files, setFiles] = React.useState([]);
  const { language } = useAppStore();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
      onFilesSelected([...files, ...acceptedFiles]);
    },
    multiple,
    accept,
  });

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const clearAll = () => {
    setFiles([]);
    onFilesSelected([]);
  };

  return (
    <div className="w-full">
      <motion.div
        {...getRootProps()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer
          transition-all duration-300
          ${isDragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-primary-200 hover:border-primary-400 bg-white'
          }
        `}
      >
        <input {...getInputProps()} />
        <motion.div
          animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <FiUploadCloud className="w-8 h-8 text-primary-600" />
          </div>
          <div>
            <p className="text-lg font-semibold text-secondary-900">
              {getTranslation('upload.dragDrop', language)}
            </p>
            <p className="text-sm text-secondary-600 mt-1">
              {getTranslation('upload.or', language)} <span className="font-medium">{getTranslation('upload.selectFiles', language)}</span>
            </p>
          </div>
          <p className="text-xs text-secondary-500">
            {getTranslation('upload.maxSize', language)}
          </p>
        </motion.div>
      </motion.div>

      {/* Files Preview */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-secondary-900">
              {files.length} {files.length === 1 ? 'file' : 'files'} selected
            </h3>
            <button
              onClick={clearAll}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg border border-secondary-200"
              >
                <div className="flex-1">
                  <p className="font-medium text-secondary-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-secondary-600">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-4 p-2 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 text-red-600" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
