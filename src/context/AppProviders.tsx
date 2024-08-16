// src/context/AppProviders.tsx
import React from 'react';
import { AuthProvider } from './AuthContext';
import { TransaccionesProvider } from './TransaccionesContext';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
    <TransaccionesProvider>
      
      {children}
    </TransaccionesProvider>
    </AuthProvider>
  );
};

export default AppProviders;
