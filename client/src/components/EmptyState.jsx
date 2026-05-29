/**
 * Empty State Component
 * Beautiful empty state UI
 */

import React from 'react';
import { motion } from 'framer-motion';

export default function EmptyState({
  icon: Icon = null,
  title,
  description,
  action,
  actionLabel = 'Get Started',
  image,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      {image ? (
        <img src={image} alt={title} className="w-32 h-32 mb-6 opacity-70" />
      ) : Icon ? (
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-16 h-16 mb-6 text-primary-300 dark:text-primary-700"
        >
          <Icon size={64} />
        </motion.div>
      ) : null}

      <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8 max-w-md">
          {description}
        </p>
      )}

      {action && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={action}
          className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
}
