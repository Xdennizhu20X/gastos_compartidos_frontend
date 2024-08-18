import api from './axios'; // Importa la instancia de Axios configurada
import { AxiosError } from 'axios'; // Importa AxiosError

interface UserData {
  nombre: string;
  email: string;
  contrasena: string;
}

interface Credentials {
  email: string;
  contrasena: string;
}

interface LoginResponse {
  token: string;
  message: string;
  userId: string;
}

// Define a custom interface for the error response
interface ErrorResponse {
  message: string;
}

// Función para registrar un nuevo usuario
export const register = async (userData: UserData): Promise<string> => {
  try {
    const response = await api.post('/aut/register', userData);
    return response.data.message; // Devuelve el mensaje del servidor
  } catch (error) {
    if (isAxiosError(error)) {
      // Check if the response and data have the expected structure
      const errorMessage = (error.response?.data as ErrorResponse)?.message || error.message;
      console.error('Error durante el registro:', errorMessage);
      throw new Error(errorMessage); // Devuelve el mensaje de error del servidor
    } else {
      console.error('Error durante el registro:', error);
      throw new Error('Error en el registro'); // Mensaje genérico de error
    }
  }
};

// Función para iniciar sesión
export const login = async (credentials: Credentials): Promise<LoginResponse> => {
  try {
    const response = await api.post('/aut/login', credentials);
    const { token, userId, message } = response.data; // Extrae el token, ID del usuario y mensaje
    console.log('Respuesta del servidor:', { token, userId, message }); // Log de la respuesta
    // Almacena el token en el almacenamiento local o en cookies, si es necesario
    localStorage.setItem('token', token);
    return { token, userId, message }; // Devuelve el token, ID del usuario y mensaje
  } catch (error) {
    if (isAxiosError(error)) {
      // Check if the response and data have the expected structure
      const errorMessage = (error.response?.data as ErrorResponse)?.message || error.message;
      console.error('Error en la función login:', errorMessage);
      throw new Error(errorMessage); // Devuelve el mensaje de error del servidor
    } else {
      console.error('Error en la función login:', error);
      throw new Error('Error en el inicio de sesión'); // Mensaje genérico de error
    }
  }
};

// Type guard para verificar si el error es un AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}
