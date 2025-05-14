import { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { theme } from './index';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
      <CssVarsProvider theme={theme} defaultMode="light">
        <CssBaseline />
        {children}
      </CssVarsProvider>
  );
}  