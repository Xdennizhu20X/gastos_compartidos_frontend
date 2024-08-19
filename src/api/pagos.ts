// src/api/pagos.ts

import axios from './axios';

export const createPayment = async (paymentDetails: any) => {
  const response = await axios.post('/pagos', paymentDetails);
  return response.data;
};
