/**
 * Footer Component
 */

import React from 'react';
import { getTranslation } from '../utils/i18n';
import { useAppStore } from '../utils/store';

export default function Footer() {
  const { language } = useAppStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">ManaDocs</h3>
            <p className="text-secondary-400 text-sm">
              {getTranslation('common.tagline', language)}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-secondary-400 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/#about" className="hover:text-white transition-colors">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-secondary-400 text-sm">
              <li><a href="/privacy" className="hover:text-white transition-colors">{getTranslation('footer.privacy', language)}</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">{getTranslation('footer.terms', language)}</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-700 pt-8">
          <p className="text-center text-secondary-400 text-sm">
            © {currentYear} ManaDocs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
