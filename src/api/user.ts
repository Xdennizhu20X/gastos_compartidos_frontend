// import api from './axios';

// interface UserDetails {
//   id: string;
//   nombre: string;
//   email: string;
// }

// export const getUserDetails = async (userId: string): Promise<UserDetails> => {
//   try {
//     const response = await api.post(`/usuarios/${userId}`);
//     return response.data; // Asegúrate de que los datos tengan el tipo `UserDetails`
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     throw error;
//   }
// };

// api/user.ts
import api from './axios';

export const getUserDetails = async (userId: string) => {
  try {
    const response = await api.post(`/usuarios/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

