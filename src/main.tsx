import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import AppProviders from './context/AppProviders';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(


    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
      </StrictMode>
  );
}
