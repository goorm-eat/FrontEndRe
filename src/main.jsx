import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider, createThemeConfig } from '@vapor-ui/core';
import '@vapor-ui/core/styles.css';

const themeConfig = createThemeConfig({
  appearance: 'light',
  radius: 'full',
  scaling: 1.0,
  primaryColor: '#FF7A00', // Primary color for the theme
  storageKey: 'my-vapor-theme',
});

createRoot(document.getElementById('root')).render(
  <ThemeProvider config={themeConfig}>
    <App />
  </ThemeProvider>
);
