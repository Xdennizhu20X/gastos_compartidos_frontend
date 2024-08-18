import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import api from '../api/axios'; // Ajusta la ruta según tu estructura

interface Gasto {
  id: string;
  monto: number;
  descripcion: string;
  fecha: string;
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

  const decodeToken = (token: string): any => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c =>
      `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`
    ).join(''));

    const decoded = JSON.parse(jsonPayload);
    console.log('Decoded Token:', decoded); // Verifica aquí el contenido decodificado
    return decoded;
  };

  const getGastos = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = decodeToken(token);
        const userId = decodedToken.id;
        setUserId(userId);

        const response = await api.post(`/gastos/usuario/${userId}`);
        console.log('Gastos obtenidos:', response.data);
        setGastos(response.data);
      } catch (error) {
        console.error('Error fetching gastos:', error);
      }
    }
  }, []);

  const createGasto = useCallback(async (nuevoGasto: NuevoGasto) => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    console.log('User ID:', userId);
  
    // Verifica los datos que se van a enviar
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
        console.error('Error creating gasto:', error.response?.data || error.message);
      }
    } else {
      console.error('User ID or token is missing');
    }
  }, [userId]);

  useEffect(() => {
    getGastos(); // Carga los gastos cuando se monta el componente
    console.log('User ID al cargar GastosProvider:', userId); // Verifica aquí el userId
  }, [getGastos, userId]);

  return (
    <GastosContext.Provider value={{ gastos, getGastos, createGasto, userId }}>
      {children}
    </GastosContext.Provider>
  );
};
