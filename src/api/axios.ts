import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ajusta según tu entorno
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token en los headers de cada solicitud
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const createGasto = async (gastoData) => {
  try {
    const response = await api.post('/gastos', gastoData);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};

export default api;
