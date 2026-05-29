import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiFileText, FiBook, FiUser, FiShield, FiCpu, 
  FiType, FiGrid, FiMessageCircle, FiBell
} from 'react-icons/fi';

// Feature card component
function FeatureCard({ icon: Icon, title, description, index }) {
  const [isNotified, setIsNotified] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative p-6 rounded-xl bg-gradient-to-br from-secondary-800/40 to-secondary-900/40 border border-secondary-700/50 backdrop-blur-sm overflow-hidden"
      >
        {/* Background gradient blob */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 transition-all duration-300" />

        {/* Decorative circle */}
        <div className="absolute -right-8 -top-8 w-20 h-20 bg-primary-500/10 rounded-full blur-xl group-hover:bg-primary-500/20 transition-all duration-300" />

        <div className="relative z-10">
          {/* Icon and Coming Soon Badge */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="p-3 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/30 text-primary-400"
            >
              <Icon size={28} />
            </motion.div>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary-500/20 to-primary-600/20 text-primary-300 border border-primary-500/30">
              Coming Soon
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-300 transition-colors duration-200">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-secondary-300 mb-4 leading-relaxed">
            {description}
          </p>

          {/* Notify Me Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsNotified(!isNotified)}
            className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              isNotified
                ? 'bg-primary-500/20 text-primary-300 border border-primary-500/50'
                : 'bg-secondary-700/50 text-secondary-100 hover:bg-secondary-600/50 border border-secondary-600/50 hover:border-primary-500/50'
            }`}
          >
            <FiBell size={16} />
            {isNotified ? 'Notified ✓' : 'Notify Me'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main component
export default function UpcomingFeatures({ language = 'en' }) {
  const features = [
    {
      icon: FiFileText,
      title: 'Word → PDF',
      description: 'Convert DOCX files into professional PDFs instantly.',
    },
    {
      icon: FiBook,
      title: 'PDF → Word',
      description: 'Extract editable content from PDFs easily.',
    },
    {
      icon: FiUser,
      title: 'Resume Builder',
      description: 'Create beautiful ATS-friendly resumes in minutes.',
    },
    {
      icon: FiShield,
      title: 'Aadhaar Masking',
      description: 'Protect sensitive information automatically.',
    },
    {
      icon: FiCpu,
      title: 'AI Document Assistant',
      description: 'Smart AI suggestions for document optimization.',
    },
    {
      icon: FiType,
      title: 'OCR Text Extraction',
      description: 'Extract text from scanned images and PDFs.',
    },
    {
      icon: FiGrid,
      title: 'QR Generator',
      description: 'Generate clean QR codes instantly.',
    },
    {
      icon: FiMessageCircle,
      title: 'WhatsApp Share',
      description: 'Share documents directly through WhatsApp.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 -left-40 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* Gradient line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30"
          >
            <span className="text-sm font-semibold text-primary-300">🚀 Coming Soon</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-primary-200 to-primary-100 bg-clip-text text-transparent mb-4">
            Upcoming Features
          </h2>
          <p className="text-lg text-secondary-300 max-w-2xl mx-auto">
            Powerful document tools coming soon to ManaDocs.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-secondary-300 mb-4">
            Want early access to new features?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-500 hover:to-primary-600 transition-all duration-300 shadow-lg shadow-primary-600/50"
          >
            Join Our Newsletter
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
