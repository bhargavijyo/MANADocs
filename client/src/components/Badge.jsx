/**
 * Badge Component
 * Status indicators and labels
 */

import React from 'react';

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon = null,
  dot = false,
}) {
  const baseStyles = 'inline-flex items-center gap-1.5 font-semibold rounded-full';

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const variants = {
    primary: 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300',
    secondary: 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300',
    success: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    warning: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',
    error: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
    info: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
  };

  return (
    <span className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}>
      {dot && <span className={`w-2 h-2 rounded-full ${variants[variant].split(' ')[0]}`} />}
      {Icon && <Icon size={16} />}
      {children}
    </span>
  );
}
