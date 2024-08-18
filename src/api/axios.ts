import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gastos-compartidos.onrender.com/api', // Ajusta según tu entorno
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



export default api;
