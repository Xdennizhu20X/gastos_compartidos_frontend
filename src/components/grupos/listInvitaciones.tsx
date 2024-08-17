import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useInvitacion } from '../../context/invitacionContext'; // Asegúrate de importar tu hook
import { AuroraBackground } from '../ui/aurora-background';

const MisInvitaciones: React.FC = () => {
  const { invitaciones, getInvitaciones } = useInvitacion();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvitaciones = async () => {
      try {
        await getInvitaciones();
      } catch (err) {
        setError('Error fetching invitations.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvitaciones();
  }, [getInvitaciones]);

  const handleAccept = async (id: string) => {
    console.log('ID:', id);  // Verifica si ID es indefinida
    if (!id) {
      console.error('ID no proporcionada');
      return;
    }
    try {
      const response = await axios.post(`/api/invitacion/${id}/responder`, { estado: 'aceptada' });
      setSuccessMessage(response.data.message);  // Mostrar mensaje de éxito
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'Error desconocido';
        setError(errorMessage);  // Mostrar mensaje de error
      } else {
        setError('Error desconocido');
      }
    }
  };
  

  if (loading) {
    return <div className="w-full min-h-screen flex justify-center items-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="w-full min-h-screen flex justify-center items-center text-red-500">{error}</div>;
  }

  if (successMessage) {
    return <div className="w-full min-h-screen flex justify-center items-center text-green-500">{successMessage}</div>;
  }

  if (invitaciones.length === 0) {
    return <div className="w-full min-h-screen flex justify-center items-center text-gray-500">No se encontraron invitaciones.</div>;
  }

  return (
    <AuroraBackground className='w-full min-h-screen flex flex-col pt-20 items-center p-6'>
      <h2 className='text-5xl font-bold text-white mb-4'>Mis Invitaciones</h2>
      <div className="w-[40rem] h-20 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Radial Gradient to prevent sharp edges */}

        </div>
      <ul className='w-full max-w-md space-y-4'>
        {invitaciones.map((invitacion) => (
          <li key={invitacion._id} className='bg-white shadow-lg rounded-lg p-4 border border-gray-200'>
            <div className='flex items-center mb-2'>
              <strong className='text-lg font-semibold mr-2'>Invitación de:</strong>
              <span className='text-gray-700'>{invitacion.usuario}</span>
            </div>
            <div className='mb-4'>
              <strong className='text-lg font-semibold mr-2'>Mensaje:</strong>
              <span className='text-gray-700'>{invitacion.estado}</span>
            </div>
            {invitacion.estado === 'pendiente' && (
              <button
                onClick={() => handleAccept(invitacion._id)}
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
              >
                Aceptar
              </button>
            )}
          </li>
        ))}
      </ul>
    </AuroraBackground>
  );
}

export default MisInvitaciones;
