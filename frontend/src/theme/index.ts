import { extendTheme } from '@mui/material/styles';

export const theme = extendTheme({
  // Raiz
  shape: { borderRadius: 12 },

  // Tipografia
  typography: {
    fontFamily: `'Public Sans', 'Roboto', sans-serif`,
  },
  // Light & Dark
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: { main: '#7C3AED' },
        secondary: { main: '#06B6D4' },
        background: { default: '#F5F7FA', paper: '#FFFFFF' },
        text: { primary: '#1E293B', secondary: '#475569' },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: { main: '#7C3AED' },
        secondary: { main: '#06B6D4' },
        background: { default: '#0F172A', paper: '#1E293B' },
        text: { primary: '#F1F5F9', secondary: '#94A3B8' },
      },
    },
  },
});