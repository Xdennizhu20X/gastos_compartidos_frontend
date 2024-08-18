import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import api from '../api/axios'; // Ajusta la ruta según tu estructura
import { Grupo, Usuario } from '../types/Grupo'; // Importa la interfaz de Grupo

interface GruposContextType {
  grupos: Grupo[];
  getGrupos: () => Promise<void>;
  createGrupo: (grupo: Omit<Grupo, 'id'>) => Promise<void>;
  sendInvitation: (email: string, grupoId: string) => Promise<void>;
  userId: string | null;
}

interface DecodedToken {
  id: string;
  // Agrega otros campos según lo que contenga tu token decodificado
}

const GruposContext = createContext<GruposContextType | undefined>(undefined);

export const useGrupos = (): GruposContextType => {
  const context = useContext(GruposContext);
  if (!context) {
    throw new Error('useGrupos debe usarse dentro de un GruposProvider');
  }
  return context;
};

export const GruposProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const getGrupos = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: DecodedToken = decodeToken(token);
        const userId = decodedToken.id;

        setUserId(userId);

        const response = await api.post(`/grupos/usuario/${userId}`);
        console.log('Grupos obtenidos:', response.data);
        setGrupos(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    }
  }, []);

  const createGrupo = useCallback(async (grupo: Omit<Grupo, 'id'>) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = decodeToken(token);
        const userId = decodedToken.id;
  
        if (!userId) {
          console.error('El ID del usuario es nulo o indefinido');
          return;
        }
  
        const res = await api.post(`/usuarios/${userId}`);
        const user: Usuario = res.data;
  
        const grupoConCreador = {
          ...grupo,
          integrantes: [user],
        };
  
        console.log('Datos enviados al backend:', grupoConCreador);
  
        const response = await api.post('/grupos', grupoConCreador);
        console.log('Grupo creado:', response.data);
  
        if (response.data && response.data.grupo) {
          setGrupos(prevGrupos => [...prevGrupos, response.data.grupo]);
        } else {
          console.error('La respuesta del backend no contiene el grupo');
        }
      } catch (error) {
        console.error('Error al crear el grupo:', error);
      }
    }
  }, []);

  const sendInvitation = useCallback(async (email: string, grupoId: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = decodeToken(token);
        const usuarioId = decodedToken.id;

        if (!usuarioId || !grupoId) {
          console.error('usuarioId o grupoId están indefinidos:', { usuarioId, grupoId });
          return;
        }

        const response = await api.post('/invitacion', { usuarioId, grupoId, email });
        console.log('Invitación enviada:', response.data);
      } catch (error) {
        console.error('Error enviando la invitación:', error);
      }
    }
  }, []);

  useEffect(() => {
    getGrupos();
  }, [getGrupos]);

  const decodeToken = (token: string): DecodedToken => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c =>
      `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`
    ).join(''));

    const decoded: DecodedToken = JSON.parse(jsonPayload);
    console.log('Decoded Token:', decoded);
    return decoded;
  };

  return (
    <GruposContext.Provider value={{ grupos, getGrupos, createGrupo, sendInvitation, userId }}>
      {children}
    </GruposContext.Provider>
  );
};

export { GruposContext };
