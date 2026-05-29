/**
 * Input Component
 * Premium text input with validation
 */

import React from 'react';

export default function Input({
  label,
  error,
  helper,
  icon: Icon = null,
  value,
  onChange,
  disabled = false,
  required = false,
  size = 'md',
  placeholder,
  type = 'text',
  className = '',
  ...props
}) {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400">
            <Icon size={20} />
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full rounded-lg transition-all
            bg-white dark:bg-secondary-800
            border-2 border-secondary-200 dark:border-secondary-700
            text-secondary-900 dark:text-white
            placeholder-secondary-500 dark:placeholder-secondary-400
            focus:border-primary-500 focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${sizes[size]}
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-error' : ''}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm text-error mt-1.5 font-medium">{error}</p>
      )}

      {helper && !error && (
        <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1.5">{helper}</p>
      )}
    </div>
  );
}
