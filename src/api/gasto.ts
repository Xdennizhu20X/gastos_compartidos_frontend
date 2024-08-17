import axios from './axios';

export const createGasto = async (gastoData) => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post('/gastos', gastoData, config);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};
