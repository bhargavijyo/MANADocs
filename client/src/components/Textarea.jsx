/**
 * Textarea Component
 * Multi-line text input with validation
 */

import React from 'react';

export default function Textarea({
  label,
  error,
  helper,
  value,
  onChange,
  disabled = false,
  required = false,
  placeholder,
  rows = 4,
  maxLength,
  showCounter = false,
  className = '',
  ...props
}) {
  const characterCount = value?.length || 0;
  const isFull = maxLength && characterCount >= maxLength;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <textarea
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          className={`
            w-full px-4 py-2.5 rounded-lg resize-vertical
            bg-white dark:bg-secondary-800
            border-2 border-secondary-200 dark:border-secondary-700
            text-secondary-900 dark:text-white
            placeholder-secondary-500 dark:placeholder-secondary-400
            focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            ${error ? 'border-error focus:border-error focus:ring-error/20' : ''}
            font-mono text-sm
          `}
          {...props}
        />
      </div>

      {showCounter && maxLength && (
        <div className={`text-right text-xs mt-1.5 font-medium ${
          isFull ? 'text-error' : 'text-secondary-500 dark:text-secondary-400'
        }`}>
          {characterCount}/{maxLength}
        </div>
      )}

      {error && (
        <p className="text-sm text-error mt-1.5 font-medium">{error}</p>
      )}

      {helper && !error && (
        <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1.5">{helper}</p>
      )}
    </div>
  );
}
