/**
 * Toast Component Wrapper
 * Wrapper for react-hot-toast with custom styling
 */

import React from 'react';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

export const showToast = {
  success: (message, options = {}) => {
    return toast.custom((t) => (
      <div
        className={`bg-success/10 border border-success text-success px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in ${
          t.visible ? 'opacity-100' : 'opacity-0'
        } transition-opacity`}
      >
        <FiCheckCircle size={20} />
        <span className="font-medium">{message}</span>
      </div>
    ), options);
  },

  error: (message, options = {}) => {
    return toast.custom((t) => (
      <div
        className={`bg-error/10 border border-error text-error px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in ${
          t.visible ? 'opacity-100' : 'opacity-0'
        } transition-opacity`}
      >
        <FiAlertCircle size={20} />
        <span className="font-medium">{message}</span>
      </div>
    ), options);
  },

  info: (message, options = {}) => {
    return toast.custom((t) => (
      <div
        className={`bg-info/10 border border-info text-info px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in ${
          t.visible ? 'opacity-100' : 'opacity-0'
        } transition-opacity`}
      >
        <FiInfo size={20} />
        <span className="font-medium">{message}</span>
      </div>
    ), options);
  },

  loading: (message, options = {}) => {
    return toast.loading(message, options);
  },

  promise: (promise, messages, options = {}) => {
    return toast.promise(promise, messages, options);
  },

  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },

  dismissAll: () => {
    toast.remove();
  },
};

export default showToast;
