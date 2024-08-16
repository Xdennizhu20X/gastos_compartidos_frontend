// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '../api/axios'; // Ajusta la ruta según tu estructura

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  userDetails?: { id: string; nombre: string; email: string };
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  transacciones: Transaccion[];
  getTransacciones: () => Promise<void>;
}

interface Credentials {
  email: string;
  contrasena: string;
}

interface Transaccion {
  id: string;
  monto: number;
  fecha: string;
  estado: string;
}

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<{ id: string; nombre: string; email: string } | undefined>(undefined);
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = decodeToken(token);
          const userId = decodedToken.id;

          // Obtén los detalles del usuario
          const userResponse = await api.post(`/usuarios/${userId}`);
          setUserDetails(userResponse.data);
          setIsAuthenticated(true);

          // Obtén las transacciones del usuario
          await getTransacciones();
        } catch (error) {
          console.error('Error validando el token o obteniendo detalles del usuario:', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  const login = async (credentials: Credentials) => {
    try {
      const response = await api.post('/aut/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const decodedToken = decodeToken(response.data.token);
        const userId = decodedToken.id;
        const userResponse = await api.post(`/usuarios/${userId}`);
        setUserDetails(userResponse.data);
        setIsAuthenticated(true);

        // Obtén las transacciones del usuario
        await getTransacciones();
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw new Error('Credenciales inválidas. Por favor, verifica tu correo y contraseña.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserDetails(undefined);
    setTransacciones([]);
  };

  const getTransacciones = async () => {
    if (userDetails) {
      try {
        const response = await api.post(`/transaccion/user/${userDetails.id}`);
        setTransacciones(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }
  };

  const decodeToken = (token: string): DecodedToken => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c =>
      `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`
    ).join(''));

    return JSON.parse(jsonPayload);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, userDetails, transacciones, login, logout, getTransacciones }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
