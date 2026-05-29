/**
 * Alert Component
 * Notifications and alerts
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FiX, FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

export default function Alert({
  variant = 'info',
  title,
  message,
  onClose,
  action,
  actionLabel,
  closeable = true,
}) {
  const variants = {
    info: 'bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 text-blue-800 dark:text-blue-200',
    success: 'bg-green-50 dark:bg-green-950 border-l-4 border-green-500 text-green-800 dark:text-green-200',
    warning: 'bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500 text-amber-800 dark:text-amber-200',
    error: 'bg-red-50 dark:bg-red-950 border-l-4 border-red-500 text-red-800 dark:text-red-200',
  };

  const icons = {
    info: FiInfo,
    success: FiCheckCircle,
    warning: FiAlertCircle,
    error: FiAlertCircle,
  };

  const Icon = icons[variant];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`p-4 rounded-lg flex items-start gap-3 ${variants[variant]}`}
    >
      <Icon className="flex-shrink-0 mt-0.5" size={20} />
      
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        {message && <p className="text-sm opacity-90">{message}</p>}
        {action && (
          <button
            onClick={action}
            className="mt-2 text-sm font-semibold hover:underline"
          >
            {actionLabel || 'Action'}
          </button>
        )}
      </div>

      {closeable && (
        <button
          onClick={onClose}
          className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
        >
          <FiX size={20} />
        </button>
      )}
    </motion.div>
  );
}
