import axios from 'axios';

// Configura la instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia esto a la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
