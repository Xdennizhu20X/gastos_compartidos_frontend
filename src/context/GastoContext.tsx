import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import api from '../api/axios'; // Ajusta la ruta según tu estructura

interface Gasto {
  id: string;
  nombre: string;
  precio: number;
  fechaVencimiento: string;
  usuarioId: string;
  grupoId: string;

}

interface NuevoGasto {
  nombre: string;
  precio: number;
  grupo: string;
  fechaVencimiento: string;
}

interface GastosContextType {
  gastos: Gasto[];
  getGastos: () => Promise<void>;
  createGasto: (nuevoGasto: NuevoGasto) => Promise<void>;
  userId: string | null;
}

interface DecodedToken {
  id: string;
  // Agrega otros campos si los hay en tu token
}

const GastosContext = createContext<GastosContextType | undefined>(undefined);

export const useGastos = (): GastosContextType => {
  const context = useContext(GastosContext);
  if (!context) {
    throw new Error('useGastos debe usarse dentro de un GastosProvider');
  }
  return context;
};

export const GastosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

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

  const getGastos = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: DecodedToken = decodeToken(token);
        const userId = decodedToken.id;
        setUserId(userId);

        const response = await api.post(`/gastos/usuario/${userId}`);
        console.log('Gastos obtenidos:', response.data);
        setGastos(response.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching gastos:', error.message);
        } else {
          console.error('Unknown error:', error);
        }
      }
    }
  }, []);

  const createGasto = useCallback(async (nuevoGasto: NuevoGasto) => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    console.log('User ID:', userId);
  
    console.log('Datos enviados:', { ...nuevoGasto, usuarioCreador: userId });
  
    if (userId && token) {
      try {
        const response = await api.post(
          '/gastos',
          { ...nuevoGasto, usuarioCreador: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGastos((prevGastos) => [...prevGastos, response.data]);
        console.log('Gasto creado:', response.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error creating gasto:', error.message);
        } else {
          console.error('Unknown error:', error);
        }
      }
    } else {
      console.error('User ID or token is missing');
    }
  }, [userId]);

  useEffect(() => {
    getGastos(); // Carga los gastos cuando se monta el componente
    console.log('User ID al cargar GastosProvider:', userId);
  }, [getGastos, userId]);

  return (
    <GastosContext.Provider value={{ gastos, getGastos, createGasto, userId }}>
      {children}
    </GastosContext.Provider>
  );
};
