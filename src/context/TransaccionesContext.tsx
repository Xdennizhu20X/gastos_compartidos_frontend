import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import api from '../api/axios'; // Ajusta la ruta según tu estructura

interface TransaccionesContextType {
  transacciones: Transaccion[];
  getTransacciones: () => Promise<void>;
  usuarioId: string | null; // Asegúrate de agregar el campo usuarioId
}

interface Transaccion {
  _id: string;
  monto: number;
  fecha: string;
  estado: string;
}

interface DecodedToken {
  id: string;
  // otros campos que pueda tener tu token decodificado
}

const TransaccionesContext = createContext<TransaccionesContextType | undefined>(undefined);

export const TransaccionesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  const getTransacciones = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = decodeToken(token);
        const userId = decodedToken.id;
        setUsuarioId(userId); // Guardar el usuarioId en el estado

        const response = await api.post(`/transaccion/user/${userId}`);
        console.log('Transacciones obtenidas:', response.data); // Añadido para depuración
        setTransacciones(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }
  }, []); // Dependencias vacías, se ejecuta solo una vez

  const decodeToken = (token: string): DecodedToken => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c =>
      `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`
    ).join(''));

    return JSON.parse(jsonPayload);
  };

  return (
    <TransaccionesContext.Provider value={{ transacciones, getTransacciones, usuarioId }}>
      {children}
    </TransaccionesContext.Provider>
  );
};

export const useTransacciones = (): TransaccionesContextType => {
  const context = useContext(TransaccionesContext);
  if (!context) {
    throw new Error('useTransacciones debe usarse dentro de un TransaccionesProvider');
  }
  return context;
};
