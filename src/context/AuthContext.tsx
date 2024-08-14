import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { login as apiLogin } from '../api/login_register';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean; // Agregado para manejar el estado de carga
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Credentials {
  email: string;
  contrasena: string;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Agregado para manejar el estado de carga

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      console.log('Token en localStorage:', token);

      if (token) {
        try {
          // Aquí deberías hacer una solicitud al backend para validar el token
          // Simulación de validación
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error validando el token:', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false); // Finaliza el estado de carga
    };

    checkToken();
  }, []);

  const login = async (credentials: Credentials) => {
    try {
      const response = await apiLogin(credentials);
      localStorage.setItem('token', response.token);
      console.log('Token almacenado:', response.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
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
