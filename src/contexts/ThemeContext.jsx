import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export const availableBackgrounds = ['blobs', 'illustration', 'clean'];

export const ThemeProviderCustom = ({ children }) => {
  const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light');
  const [bg, setBg] = useState(() => localStorage.getItem('bgVariant') || 'blobs');

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', mode);
      document.body.classList.remove(...availableBackgrounds.map(b => `bg-${b}`));
      document.body.classList.add(`bg-${bg}`);
      if (mode === 'dark') document.body.classList.add('theme-dark'); else document.body.classList.remove('theme-dark');
      localStorage.setItem('themeMode', mode);
      localStorage.setItem('bgVariant', bg);
    } catch (e) {
      // ignore
    }
  }, [mode, bg]);

  const toggleMode = () => setMode(m => (m === 'light' ? 'dark' : 'light'));
  const setBackground = (v) => setBg(v);

  // Preview a background temporarily (used on hover in UI)
  const previewBackground = (v) => {
    try {
      document.body.classList.remove(...availableBackgrounds.map(b => `bg-${b}`));
      document.body.classList.add(`bg-${v}`);
    } catch (e) {
      // ignore
    }
  };

  const clearPreview = () => {
    try {
      document.body.classList.remove(...availableBackgrounds.map(b => `bg-${b}`));
      document.body.classList.add(`bg-${bg}`);
    } catch (e) {
      // ignore
    }
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, bg, setBackground, previewBackground, clearPreview }}>{children}</ThemeContext.Provider>
  );
};

export const useThemeCustom = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeCustom must be used within ThemeProviderCustom');
  return ctx;
};

export default ThemeContext;
