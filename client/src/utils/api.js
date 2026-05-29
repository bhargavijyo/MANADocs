/**
 * Enhanced API Service
 * Centralized API communication with advanced features
 */

import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_TIMEOUT = 60000; // 60 seconds

// Create API client
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// IMAGE OPERATIONS
// ============================================

export const imagesToPDF = async (files, onProgress) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));

  try {
    const response = await apiClient.post('/image/to-pdf', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentComplete = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          onProgress(percentComplete);
        }
      },
    });
    return response;
  } catch (error) {
    handleError(error, 'Failed to convert images to PDF');
    throw error;
  }
};

export const getImageInfo = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient.post('/image/info', formData);
};

// ============================================
// PDF OPERATIONS
// ============================================

export const mergePDFs = async (files, onProgress) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));

  try {
    const response = await apiClient.post('/pdf/merge', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentComplete = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          onProgress(percentComplete);
        }
      },
    });
    return response;
  } catch (error) {
    handleError(error, 'Failed to merge PDFs');
    throw error;
  }
};

export const compressPDF = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post('/pdf/compress', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentComplete = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          onProgress(percentComplete);
        }
      },
    });
    return response;
  } catch (error) {
    handleError(error, 'Failed to compress PDF');
    throw error;
  }
};

export const getPDFInfo = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient.post('/pdf/info', formData);
};

export const splitPDF = async (file, pages, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('pages', JSON.stringify(pages));

  try {
    const response = await apiClient.post('/pdf/split', formData, {
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentComplete = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          onProgress(percentComplete);
        }
      },
    });
    return response;
  } catch (error) {
    handleError(error, 'Failed to split PDF');
    throw error;
  }
};

// ============================================
// HEALTH & UTILITY
// ============================================

export const healthCheck = () => {
  return apiClient.get('/health');
};

export const getServerInfo = () => {
  return apiClient.get('/');
};

// ============================================
// ERROR HANDLING
// ============================================

const handleError = (error, defaultMessage) => {
  let message = defaultMessage;

  if (error.response?.data?.message) {
    message = error.response.data.message;
  } else if (error.message === 'Network Error') {
    message = 'Network error. Please check your connection.';
  } else if (error.code === 'ECONNABORTED') {
    message = 'Request timeout. Please try again.';
  }

  toast.error(message);
  console.error('API Error:', error);
};

// ============================================
// EXPORT API CLIENT
// ============================================

export default apiClient;
