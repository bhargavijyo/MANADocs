/**
 * Tabs Component
 * Tab navigation with multiple content panes
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Tabs({
  tabs = [],
  defaultTab = 0,
  onChange,
  variant = 'default',
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    if (onChange) onChange(index);
  };

  const tabStyles = {
    default: {
      tab: 'pb-3 border-b-2 border-transparent hover:border-secondary-300 dark:hover:border-secondary-600 transition-colors',
      activeTab: 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400',
      activeText: 'font-semibold',
    },
    pill: {
      tab: 'px-4 py-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors',
      activeTab: 'bg-primary-600 text-white',
      activeText: 'font-semibold',
    },
    soft: {
      tab: 'px-4 py-2 rounded-lg transition-colors',
      activeTab: 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400',
      activeText: 'font-semibold',
    },
  };

  const style = tabStyles[variant];

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className={`flex gap-1 ${variant === 'default' ? 'border-b border-secondary-200 dark:border-secondary-700' : ''}`}>
        {tabs.map((tab, index) => (
          <motion.button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`${style.tab} ${activeTab === index ? style.activeTab : 'text-secondary-700 dark:text-secondary-400'} ${activeTab === index ? style.activeText : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab.icon && <span className="inline-block mr-2">{tab.icon}</span>}
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="pt-4"
      >
        {tabs[activeTab]?.content}
      </motion.div>
    </div>
  );
}
