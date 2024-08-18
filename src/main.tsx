
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import AppProviders from './context/AppProviders';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(

      <AppProviders>
        <App />
      </AppProviders>

  );
}
