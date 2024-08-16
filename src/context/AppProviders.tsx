// src/context/AppProviders.tsx
import React from 'react';
import { AuthProvider } from './AuthContext';
import { TransaccionesProvider } from './TransaccionesContext';
import { GruposProvider } from './GruposContext';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <GruposProvider>
          <TransaccionesProvider>
            {children}
          </TransaccionesProvider>
      </GruposProvider>
 
    </AuthProvider>
  );
};

export default AppProviders;
