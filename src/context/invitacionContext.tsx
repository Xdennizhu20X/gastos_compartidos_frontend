import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from '../api/axios'; // Ajusta la ruta según tu estructura

interface InvitacionContextType {
  enviarInvitacion: (grupoId: string) => Promise<void>;
}

const InvitacionContext = createContext<InvitacionContextType | undefined>(undefined);

export const InvitacionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const enviarInvitacion = async (grupoId: string) => {
    try {
      await axios.post('/invitacion', { grupoId });
      alert('Invitación enviada');
    } catch (error) {
      console.error('Error al enviar invitación:', error);
    }
  };

  return (
    <InvitacionContext.Provider value={{ enviarInvitacion }}>
      {children}
    </InvitacionContext.Provider>
  );
};

export const useInvitacion = (): InvitacionContextType => {
  const context = useContext(InvitacionContext);
  if (!context) {
    throw new Error('useInvitacion debe usarse dentro de un InvitacionProvider');
  }
  return context;
};
