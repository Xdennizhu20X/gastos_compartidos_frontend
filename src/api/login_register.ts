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
    if (error.response && error.response.data) {
      console.error('Error durante el registro:', error.response.data.message);
      throw new Error(error.response.data.message); // Devuelve el mensaje de error del servidor
    } else {
      console.error('Error durante el registro:', error.message);
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
    if (error.response && error.response.data) {
      console.error('Error en la función login:', error.response.data.message);
      throw new Error(error.response.data.message); // Devuelve el mensaje de error del servidor
    } else {
      console.error('Error en la función login:', error.message);
      throw new Error('Error en el inicio de sesión'); // Mensaje genérico de error
    }
  }
};



