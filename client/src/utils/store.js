/**
 * Zustand Store for Global State Management
 */

import { create } from 'zustand';

export const useAppStore = create((set) => ({
  language: localStorage.getItem('language') || 'en',
  isDarkMode: localStorage.getItem('isDarkMode') === 'true' || false,
  
  setLanguage: (language) => {
    localStorage.setItem('language', language);
    set({ language });
  },
  
  toggleDarkMode: () => set((state) => {
    const newDarkMode = !state.isDarkMode;
    localStorage.setItem('isDarkMode', String(newDarkMode));
    return { isDarkMode: newDarkMode };
  }),
}));

export const useFileStore = create((set) => ({
  uploadedFiles: [],
  processingStatus: null,
  
  addFiles: (files) => set((state) => ({
    uploadedFiles: [...state.uploadedFiles, ...files]
  })),
  
  removeFile: (index) => set((state) => ({
    uploadedFiles: state.uploadedFiles.filter((_, i) => i !== index)
  })),
  
  clearFiles: () => set({ uploadedFiles: [] }),
  
  setProcessingStatus: (status) => set({ processingStatus: status }),
}));
