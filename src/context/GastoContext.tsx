import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import axios from 'axios';
import api from '../api/axios'; // Ajusta la ruta según tu estructura

interface Gasto {
  id: string;
  nombre: string;
  precio: number;
  fechaVencimiento: string;
  grupo: string; // ID del grupo
  usuarioCreador: string; // ID del usuario creador
}

interface GastosContextType {
  gastos: Gasto[];
  createGasto: (gasto: Omit<Gasto, 'id'>) => Promise<void>;
  getGastos: () => Promise<void>;
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

  const getGastos = useCallback(async () => {
    try {
      const response = await api.post('/gastos/all'); // Cambiado a GET para obtener datos
      console.log('Gastos obtenidos:', response.data);
      setGastos(response.data);
    } catch (error) {
      console.error('Error fetching gastos:', error);
    }
  }, []);

  const createGasto = useCallback(async (gasto: Omit<Gasto, 'id'>) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await api.post('/gastos', gasto, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Gasto creado:', response.data);
        setGastos(prevGastos => [...prevGastos, response.data]);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error creando gasto:', error.response?.data);
          alert(`Error creando gasto: ${error.response?.data.error || 'Error desconocido'}`);
        } else {
          console.error('Error creando gasto:', error);
        }
      }
    } else {
      alert('No se encontró el token de autenticación');
    }
  }, []);

  return (
    <GastosContext.Provider value={{ gastos, createGasto, getGastos }}>
      {children}
    </GastosContext.Provider>
  );
};
