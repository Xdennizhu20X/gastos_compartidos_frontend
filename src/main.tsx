import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from "@nextui-org/react";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>

    </NextUIProvider>
  </StrictMode>
)
