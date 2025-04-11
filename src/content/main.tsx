import { ThemeProvider } from './provider/theme.tsx';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import '@/assets/styles/index.css';
import { StrictMode } from 'react';
import App from './app.tsx';

createRoot(document.getElementById('ravyn-app-root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="electron-theme">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
