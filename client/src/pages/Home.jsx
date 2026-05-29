/**
 * Homepage
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiImage, FiFile, FiZap, FiEye } from 'react-icons/fi';
import FeatureCard from '../components/FeatureCard';
import UpcomingFeatures from '../components/UpcomingFeatures';
import { getTranslation } from '../utils/i18n';
import { useAppStore } from '../utils/store';

export default function Home() {
  const { language } = useAppStore();

  const features = [
    {
      icon: FiImage,
      title: getTranslation('features.imageToPdf', language),
      description: getTranslation('features.imageToPdfDesc', language),
      link: '/image-to-pdf',
    },
    {
      icon: FiFile,
      title: getTranslation('features.mergePdf', language),
      description: getTranslation('features.mergePdfDesc', language),
      link: '/merge-pdf',
    },
    {
      icon: FiZap,
      title: getTranslation('features.compressPdf', language),
      description: getTranslation('features.compressPdfDesc', language),
      link: '/compress-pdf',
    },
    {
      icon: FiEye,
      title: getTranslation('features.preview', language),
      description: getTranslation('features.previewDesc', language),
      link: '/preview',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            {getTranslation('hero.title', language)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-12 text-purple-100"
          >
            {getTranslation('hero.subtitle', language)}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/image-to-pdf"
              className="inline-block px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:shadow-soft-lg transition-all hover:scale-105"
            >
              {getTranslation('hero.cta', language)}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center text-secondary-900 mb-16"
          >
            {getTranslation('navbar.features', language)}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center text-secondary-900 mb-16"
          >
            Why Choose ManaDocs?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Lightning Fast',
                description: 'Process your documents in seconds, not minutes.'
              },
              {
                title: 'Secure & Private',
                description: 'Your files are never stored on our servers. Process locally.'
              },
              {
                title: 'Completely Free',
                description: 'No hidden fees, no premium plans. Everything is free forever.'
              },
              {
                title: 'Mobile Friendly',
                description: 'Works perfectly on your phone, tablet, and desktop.'
              },
              {
                title: 'Easy to Use',
                description: 'Simple, intuitive interface anyone can master in seconds.'
              },
              {
                title: 'Multilingual',
                description: 'Available in English, Telugu, and more languages coming soon.'
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-all"
              >
                <h3 className="text-lg font-bold text-secondary-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-secondary-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Features Section */}
      <UpcomingFeatures language={language} />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-primary text-white text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Get Started?
          </motion.h2>
          <p className="text-lg mb-8 text-purple-100">
            Choose a tool and start transforming your documents today.
          </p>
          <Link
            to="/image-to-pdf"
            className="inline-block px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:shadow-soft-lg transition-all hover:scale-105"
          >
            Start Now for Free
          </Link>
        </div>
      </section>
    </div>
  );
}
