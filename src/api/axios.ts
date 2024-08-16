// En tu archivo de configuración de Axios (por ejemplo, axios.js o axios.ts)
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ajusta la URL según tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a todas las solicitudes
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
