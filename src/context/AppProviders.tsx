// src/context/AppProviders.tsx
import React from 'react';
import { AuthProvider } from './AuthContext';
import { TransaccionesProvider } from './TransaccionesContext';
import { GruposProvider } from './GruposContext';
import { InvitacionProvider } from './invitacionContext';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <GruposProvider>
      <InvitacionProvider>
          <TransaccionesProvider>
            {children}
          </TransaccionesProvider>
      </InvitacionProvider>
    </GruposProvider>
    </AuthProvider>
  );
};

export default AppProviders;
