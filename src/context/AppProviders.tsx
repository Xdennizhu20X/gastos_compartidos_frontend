// src/context/AppProviders.tsx
import React from 'react';
import { AuthProvider } from './AuthContext';
import { TransaccionesProvider } from './TransaccionesContext';
import { GruposProvider } from './GruposContext';
import { InvitacionProvider } from './invitacionContext';
import { GastosProvider } from './GastoContext';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <GruposProvider>
      <GastosProvider>
        <InvitacionProvider>
            <TransaccionesProvider>
              {children}
            </TransaccionesProvider>
        </InvitacionProvider>
      </GastosProvider>
    </GruposProvider>
    </AuthProvider>
  );
};

export default AppProviders;
