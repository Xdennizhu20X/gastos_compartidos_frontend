import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from './context/AuthContext.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <AuthProvider>
      <App />
    </AuthProvider>,

    </NextUIProvider>
  </StrictMode>
)
