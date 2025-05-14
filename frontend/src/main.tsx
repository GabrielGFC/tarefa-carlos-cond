import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import ThemeProvider from './theme/Provider';

import '@fontsource/public-sans';
import '@fontsource/roboto';      


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>   
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
