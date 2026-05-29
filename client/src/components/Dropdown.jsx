/**
 * Dropdown Component
 * Dropdown menu with multiple options
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

export default function Dropdown({
  trigger,
  items = [],
  onSelect,
  align = 'left',
  size = 'md',
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    onSelect?.(item);
    setIsOpen(false);
  };

  const sizes = {
    sm: 'text-sm w-40',
    md: 'text-base w-48',
    lg: 'text-lg w-56',
  };

  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
      >
        {trigger}
        <FiChevronDown
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          size={18}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full mt-2 ${alignClasses[align]} ${sizes[size]} bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg shadow-lg z-50`}
          >
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelect(item)}
                className={`w-full text-left px-4 py-2.5 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors ${
                  index !== items.length - 1
                    ? 'border-b border-secondary-100 dark:border-secondary-700'
                    : ''
                } first:rounded-t-lg last:rounded-b-lg`}
              >
                {item.icon && <span className="inline-block mr-2">{item.icon}</span>}
                <span className="text-secondary-900 dark:text-white font-medium">
                  {item.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
