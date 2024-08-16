import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import api from '../api/axios'; // Ajusta la ruta según tu estructura

interface Grupo {
  id: string;
  nombre: string;
  integrantes: string[]; // IDs de usuarios
  descripcion?: string;
  presupuesto?: number;
}

interface GruposContextType {
  grupos: Grupo[];
  getGrupos: () => Promise<void>;
  createGrupo: (grupo: Omit<Grupo, 'id'>) => Promise<void>; // Excluye el campo 'id' ya que es generado por el backend
}

const GruposContext = createContext<GruposContextType | undefined>(undefined);

export const GruposProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);

  const getGrupos = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = decodeToken(token);
        const userId = decodedToken.id;

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
          console.error('User ID is null or undefined');
          return;
        }
  
        const grupoConCreador = { ...grupo, integrantes: [userId] };
  
        console.log('Datos enviados al backend:', grupoConCreador);
  
        const response = await api.post('/grupos', grupoConCreador);
        console.log('Grupo creado:', response.data);
  
        if (response.data && response.data.grupo) {
          setGrupos(prevGrupos => [...prevGrupos, response.data.grupo]);
        } else {
          console.error('La respuesta del backend no contiene el grupo');
        }
      } catch (error) {
        console.error('Error creating group:', error);
      }
    }
  }, []);

  const decodeToken = (token: string): DecodedToken => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c =>
      `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`
    ).join(''));
  
    const decoded = JSON.parse(jsonPayload);
    console.log('Decoded Token:', decoded); // Verifica el contenido del token
    return decoded;
  };

  return (
    <GruposContext.Provider value={{ grupos, getGrupos, createGrupo }}>
      {children}
    </GruposContext.Provider>
  );
};

export const useGrupos = (): GruposContextType => {
  const context = useContext(GruposContext);
  if (!context) {
    throw new Error('useGrupos debe usarse dentro de un GruposProvider');
  }
  return context;
};
