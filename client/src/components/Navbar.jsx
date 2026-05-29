/**
 * Navbar Component
 * Responsive navigation header
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAppStore } from '../utils/store';
import { getTranslation } from '../utils/i18n';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { language, setLanguage } = useAppStore();

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg"></div>
            <span className="text-xl font-bold text-secondary-900">
              {getTranslation('common.appName', language)}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-secondary-700 hover:text-primary-600 font-medium">
              {getTranslation('navbar.home', language)}
            </Link>
            <Link to="/" className="text-secondary-700 hover:text-primary-600 font-medium">
              {getTranslation('navbar.features', language)}
            </Link>
            <div className="flex items-center space-x-3 border-l border-secondary-200 pl-6">
              <button
                onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
                className="px-3 py-1 rounded-lg bg-primary-100 text-primary-700 font-medium hover:bg-primary-200"
              >
                {language.toUpperCase()}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-3"
          >
            <Link to="/" className="block text-secondary-700 hover:text-primary-600 font-medium">
              {getTranslation('navbar.home', language)}
            </Link>
            <Link to="/" className="block text-secondary-700 hover:text-primary-600 font-medium">
              {getTranslation('navbar.features', language)}
            </Link>
            <button
              onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
              className="w-full text-left px-3 py-2 rounded-lg bg-primary-100 text-primary-700 font-medium"
            >
              {getTranslation('common.language', language)}: {language.toUpperCase()}
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
