/**
 * Main App Component
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ImageToPDF from './pages/ImageToPDF';
import MergePDF from './pages/MergePDF';
import CompressPDF from './pages/CompressPDF';
import { healthCheck } from './utils/api';

function App() {
  useEffect(() => {
    // Check server health on mount
    healthCheck()
      .then(() => console.log('✓ Backend server is healthy'))
      .catch(() => console.warn('⚠ Backend server is not running'));
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/image-to-pdf" element={<ImageToPDF />} />
            <Route path="/merge-pdf" element={<MergePDF />} />
            <Route path="/compress-pdf" element={<CompressPDF />} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#000',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
