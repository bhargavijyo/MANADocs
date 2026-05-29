/**
 * Feature Card Component
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FeatureCard({ icon: Icon, title, description, link, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-all"
    >
      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary-600" />
      </div>
      <h3 className="text-xl font-bold text-secondary-900 mb-3">{title}</h3>
      <p className="text-secondary-600 mb-6">{description}</p>
      {link && (
        <Link
          to={link}
          className="inline-block text-primary-600 hover:text-primary-700 font-semibold transition-colors"
        >
          Learn More →
        </Link>
      )}
    </motion.div>
  );
}
