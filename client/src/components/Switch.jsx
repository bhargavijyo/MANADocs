/**
 * Switch/Toggle Component
 * Toggle switch for boolean states
 */

import React from 'react';
import { motion } from 'framer-motion';

export default function Switch({
  label,
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  color = 'primary',
  helper,
  className = '',
}) {
  const sizes = {
    sm: {
      container: 'w-10 h-6',
      dot: 'w-5 h-5',
      translate: 'translate-x-4',
    },
    md: {
      container: 'w-12 h-7',
      dot: 'w-6 h-6',
      translate: 'translate-x-5',
    },
    lg: {
      container: 'w-14 h-8',
      dot: 'w-7 h-7',
      translate: 'translate-x-6',
    },
  };

  const colors = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    success: 'bg-success',
    warning: 'bg-warning',
  };

  const sizeClass = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.button
        onClick={() => !disabled && onChange?.(!checked)}
        disabled={disabled}
        className={`
          relative ${sizeClass.container} rounded-full transition-colors
          ${checked ? colors[color] : 'bg-secondary-300 dark:bg-secondary-600'}
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
          dark:focus:ring-offset-secondary-900
        `}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={`
            absolute top-0.5 left-0.5 ${sizeClass.dot} rounded-full
            bg-white shadow-md
          `}
          animate={{
            x: checked ? sizeClass.translate : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 600,
            damping: 30,
          }}
        />
      </motion.button>

      {label && (
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-secondary-700 dark:text-secondary-300 cursor-pointer">
            {label}
          </label>
          {helper && (
            <p className="text-xs text-secondary-500 dark:text-secondary-400">{helper}</p>
          )}
        </div>
      )}
    </div>
  );
}
