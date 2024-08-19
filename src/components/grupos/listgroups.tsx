import React, { useEffect, useState } from 'react';
import { useGrupos } from '../../context/GruposContext'; // Ajusta la ruta según sea necesario
import EnviarInvitacion from './invitacion';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { SparklesCore } from "../ui/sparkles";
import { Grupo } from '../../types/Grupo'; // Importa la interfaz Grupo
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LoadingScreen from '../loading';

const GruposList: React.FC = () => {
  const { grupos, getGrupos, deleteGrupo } = useGrupos();
  const [loading, setLoading] = useState<boolean>(true);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); 
    getGrupos();
  }, [getGrupos]);

  if (loading) {
    return <LoadingScreen />;
  }

  const handleDeleteGrupo = async (grupoId: string) => {
    const result = await MySwal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      deleteGrupo(grupoId);
      MySwal.fire(
        '¡Eliminado!',
        'El grupo ha sido eliminado.',
        'success'
      );
    }
  };

  return (
    <div>
      <div className="bg-black  pt-20 w-full min-h-screen sm:justify-start justify-center items-center flex flex-col gap-3">
        <div className="h-auto w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
          <h1 className="md:text-5xl text-5xl lg:text-8xl font-bold text-center text-white relative z-20">
            Grupos
          </h1>
          <div className="w-[40rem] h-20 relative">
            {/* Gradientes */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Componente principal */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-20"
              particleColor="#FFFFFF"
            />

            {/* Gradiente radial para prevenir bordes duros */}
            <div className="absolute inset-0 w-full h-auto bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
        {/* Botón para crear un nuevo grupo */}
        <div className="w-full flex flex-col items-center">
          <Button
            as={Link}
            to="/creategroups"
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
          >
            Agregar Grupo
          </Button>
        </div>
        {/* Contenedor flex para los grupos */}
        <div className="w-full flex flex-wrap justify-center gap-4 mt-8">
          {grupos.length > 0 ? (
            grupos.map((grupo: Grupo) => (
              <CardContainer key={grupo._id} className="z-30 bg-black">
                <CardBody className="bg-black group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-10 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {grupo.nombre}
                  </CardItem>

                  <div className="my-5">
                    <p className="font-semibold text-white">Integrantes:</p>
                    <ul className="list-disc list-inside pl-4 text-black dark:text-white">
                      {grupo.integrantes.map(user => (
                        <li key={user.id} className="text-white">{user.nombre}</li>
                      ))}
                    </ul>
                  </div>
                  <EnviarInvitacion grupoId={grupo._id} />
                  <button
                    onClick={() => handleDeleteGrupo(grupo._id)}
                    className="mt-4 p-2 bg-red-500 hover:bg-red-700 duration-500 rounded-full text-white"
                  >
                    <svg
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </button>
                </CardBody>
              </CardContainer>
            ))
          ) : (
            <div className="w-full flex flex-col items-center">
              <p className="text-white text-lg font-semibold">No tienes Grupos registrados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GruposList;
