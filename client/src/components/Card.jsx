/**
 * Premium Card Component
 * Versatile container with multiple variants
 */

import React from 'react';
import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  variant = 'default',
  hover = true,
  onClick,
  badge,
  title,
  subtitle,
  footer,
  ...props
}) {
  const baseStyles = 'rounded-xl transition-all duration-300';

  const variants = {
    default: 'bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 shadow-soft',
    elevated: 'bg-white dark:bg-secondary-900 shadow-md hover:shadow-lg border border-secondary-200 dark:border-secondary-700',
    glass: 'bg-white/50 dark:bg-secondary-900/50 backdrop-blur-md border border-secondary-200/50 dark:border-secondary-700/50 shadow-soft',
    gradient: 'bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 border border-primary-200 dark:border-primary-800',
    danger: 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800',
    success: 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800',
  };

  const content = (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {badge && (
        <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900 rounded-full">
          {badge}
        </div>
      )}

      {title && (
        <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-1">
          {title}
        </h3>
      )}

      {subtitle && (
        <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
          {subtitle}
        </p>
      )}

      {children}

      {footer && (
        <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
          {footer}
        </div>
      )}
    </div>
  );

  if (hover && onClick) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        onClick={onClick}
        className="cursor-pointer"
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
