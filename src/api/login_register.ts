import api from './axios'; // Importa la instancia de Axios configurada

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

// Función para registrar un nuevo usuario
export const register = async (userData: UserData): Promise<string> => {
  try {
    const response = await api.post('/aut/register', userData);
    return response.data.message; // Devuelve el mensaje del servidor
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

// Función para iniciar sesión
export const login = async (credentials: Credentials): Promise<LoginResponse> => {
  try {
    const response = await api.post('/aut/login', credentials);
    const { token, userId, message } = response.data; // Extrae el token, ID del usuario y mensaje
    console.log('Respuesta del servidor:', { token, userId, message }); // Log de la respuesta
    return { token, userId, message }; // Devuelve el token, ID del usuario y mensaje
  } catch (error) {
    console.error('Error en la función login:', error);
    throw error;
  }
};



