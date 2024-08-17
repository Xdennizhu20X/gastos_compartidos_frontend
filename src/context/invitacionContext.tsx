import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import axios from '../api/axios'; // Ajusta la ruta según tu estructura

interface Invitacion {
  id: string; // Correspondiente al ObjectId generado por MongoDB
  usuario: string; // ID del usuario como ObjectId en formato string
  grupo: string; // ID del grupo como ObjectId en formato string
  estado: 'pendiente' | 'aceptada' | 'rechazada'; // Estado de la invitación
  fechaEnvio: Date; // Fecha de envío de la invitación
  fechaRespuesta?: Date; // Fecha de respuesta a la invitación, opcional
}

interface InvitacionContextType {
  enviarInvitacion: (grupoId: string) => Promise<void>;
  invitaciones: Invitacion[];
  getInvitaciones: () => Promise<void>;
}

const InvitacionContext = createContext<InvitacionContextType | undefined>(undefined);

export const InvitacionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [invitaciones, setInvitaciones] = useState<Invitacion[]>([]);

  const enviarInvitacion = async (grupoId: string) => {
    try {
      await axios.post('/invitacion', { grupoId });
      alert('Invitación enviada');
    } catch (error) {
      console.error('Error al enviar invitación:', error);
    }
  };

  const getInvitaciones = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = decodeToken(token);
        const userId = decodedToken.id;

        const response = await axios.post(`/invitacion/${userId}`);
        console.log('Invitaciones obtenidas:', response.data); // Para depuración
        setInvitaciones(response.data);
      } catch (error) {
        console.error('Error al obtener invitaciones:', error);
      }
    }
  }, []);

  const decodeToken = (token: string): { id: string } => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c =>
      `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`
    ).join(''));

    return JSON.parse(jsonPayload);
  };

  return (
    <InvitacionContext.Provider value={{ enviarInvitacion, invitaciones, getInvitaciones }}>
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
