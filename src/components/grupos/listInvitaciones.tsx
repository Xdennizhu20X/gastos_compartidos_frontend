import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useInvitacion } from '../../context/invitacionContext';
import { AuroraBackground } from '../ui/aurora-background';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AxiosError } from 'axios';

const MySwal = withReactContent(Swal);

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
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitaciones();
    
  }, [getInvitaciones]);

  const handleAccept = async (id: string) => {
    if (!id) {
      console.error('ID no proporcionada');
      return;
    }

    // Mostrar SweetAlert2 antes de enviar la aceptación
    const result = await MySwal.fire({
      title: '¿Aceptar invitación?',
      text: '¿Estás seguro de que quieres aceptar esta invitación?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(`/invitacion/${id}/responder`, { estado: 'aceptada' });
        setSuccessMessage(response.data.message);

        // Mostrar SweetAlert2 con mensaje de éxito
        MySwal.fire({
          title: '¡Aceptada!',
          text: 'La invitación ha sido aceptada exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data?.error || 'Error desconocido';
          setError(errorMessage);
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Error desconocido');
        }

        // Mostrar SweetAlert2 con mensaje de error
        MySwal.fire({
          title: 'Error',
          text: 'Hubo un error al aceptar la invitación. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  };

  if (loading) {
    return <AuroraBackground className="w-full min-h-screen  flex justify-center items-center text-8xl text-white font-bold">Loading...</AuroraBackground>;
  }

  if (error) {
    return <div className="w-full min-h-screen flex justify-center items-center text-red-500">{error}</div>;
  }

  if (successMessage) {
    return <div className="w-full min-h-screen flex justify-center items-center text-green-500">{successMessage}</div>;
  }

  if (invitaciones.length === 0) {
    return (
      <AuroraBackground className="w-full bg-black flex flex-col items-center">
        <p className="text-white text-lg font-semibold">
          <h1 className='text-8xl'>No tienes Invitaciones</h1>
        </p>
      </AuroraBackground>
    );
  }

  return (
    <AuroraBackground className="w-full min-h-screen flex flex-wrap pt-20 bg-black items-center p-6">
      <h2 className="text-5xl font-bold text-white mb-4">Mis Invitaciones</h2>
      <div className="w-[40rem] h-20 relative">
        {/* Gradientes */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
      </div>

      <div className='w-full h-auto flex flex-wrap gap-6 justify-center'>
        {invitaciones.map((invitacion) => (
          <CardContainer key={invitacion._id} className="z-30">
            <CardBody className="bg-gray-50 group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-10 border">
              <CardItem
                translateZ="50"
                className="text-lg font-semibold text-neutral-600 dark:text-white"
              >
                Invitación al grupo: {invitacion.grupo.nombre}
              </CardItem>

              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
              >
                Estado: {invitacion.estado}
              </CardItem>

              {invitacion.estado === 'pendiente' && (
                <button
                  onClick={() => handleAccept(invitacion._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mt-4"
                >
                  Aceptar
                </button>
              )}
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </AuroraBackground>
  );
};

export default MisInvitaciones;
