/**
 * Progress Component
 * File upload and processing progress
 */

import React from 'react';
import { motion } from 'framer-motion';

export default function Progress({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'primary',
  label,
  showPercentage = true,
  animated = true,
}) {
  const percentage = (value / max) * 100;

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const variants = {
    primary: 'bg-primary-500',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };

  return (
    <div>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-semibold text-secondary-600 dark:text-secondary-400">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div className={`w-full rounded-full bg-secondary-200 dark:bg-secondary-700 overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={animated ? { duration: 0.5, ease: 'easeOut' } : { duration: 0 }}
          className={`h-full rounded-full ${variants[variant]} transition-all`}
        />
      </div>
    </div>
  );
}
