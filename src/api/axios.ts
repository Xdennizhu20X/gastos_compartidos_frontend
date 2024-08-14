// axios.ts
import axios from 'axios';

// Configura la instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia esto a la URL base de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
