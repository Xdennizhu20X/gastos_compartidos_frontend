import api from './axios';

export const getTransacciones = async () => {
    try {
      const response = await api.post('/transaccion/all'); // Cambiado a POST
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  };
 

export const pagarTransaccion = async (id: string) => {
  try {
    const response = await api.post(`/transaccion/${id}/pagar`);
    return response.data;
  } catch (error) {
    console.error('Error paying transaction:', error);
    throw error;
  }
};
