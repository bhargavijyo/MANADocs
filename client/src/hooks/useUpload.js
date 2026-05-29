/**
 * Custom Hook: useUpload
 * Advanced file upload management
 */

import { useState, useCallback } from 'react';

export function useUpload(maxSize = 52428800) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const addFiles = useCallback((newFiles) => {
    setError(null);
    const validFiles = Array.from(newFiles).filter(file => {
      if (file.size > maxSize) {
        setError(`File "${file.name}" exceeds maximum size of 50MB`);
        return false;
      }
      return true;
    });

    setFiles(prev => [...prev, ...validFiles]);
  }, [maxSize]);

  const removeFile = useCallback((index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setProgress(0);
    setError(null);
  }, []);

  const reorderFiles = useCallback((fromIndex, toIndex) => {
    const newFiles = [...files];
    const [removed] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, removed);
    setFiles(newFiles);
  }, [files]);

  return {
    files,
    uploading,
    progress,
    error,
    addFiles,
    removeFile,
    clearFiles,
    reorderFiles,
    setProgress,
    setUploading,
  };
}
