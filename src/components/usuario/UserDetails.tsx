import React from 'react';
import { useAuth } from '../../context/AuthContext'; // Ajusta la ruta según tu estructura de archivos

const UserProfile: React.FC = () => {
  const { userDetails, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <div>No estás autenticado. Inicia sesión para ver tu perfil.</div>;
  }

  if (!userDetails) {
    return <div>No se encontraron detalles del usuario.</div>;
  }

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-black text-white'>
      <h1>Perfil del Usuario</h1>
      <p><strong>Nombre:</strong> {userDetails.nombre}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      {/* Agrega más detalles si los tienes */}
    </div>
  );
};

export default UserProfile;
