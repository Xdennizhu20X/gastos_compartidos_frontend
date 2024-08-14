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
// api/login_register.ts
export const login = async (credentials: Credentials): Promise<LoginResponse> => {
  try {
    const response = await api.post('/aut/login', credentials); // Usa Axios para hacer la solicitud
    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error('Error en la función login:', error);
    throw error; // Re-lanzar el error para que pueda ser capturado en el componente
  }
};


