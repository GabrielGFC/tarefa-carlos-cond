import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  // ativa suporte a CSS vars (gera as variáveis em :root)
  cssVariables: true,
  // prepara light/dark pra SSR
  colorSchemes: {
    light: { /* sua palette light */ },
    dark:  { /* sua palette dark  */ },
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: `'Public Sans','Roboto',sans-serif` },
});

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
