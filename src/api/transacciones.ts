// api/transacciones.ts
import api from './axios';

export const getTransacciones = async (userId: string) => {
  try {
    const response = await api.post(`/transaccion/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const pagarTransaccion = async (id: string): Promise<void> => {
  try {
    await api.post(`/transaccion/${id}/pagar`);
  } catch (error) {
    console.error('Error paying transaction:', error);
    throw error;
  }
};
