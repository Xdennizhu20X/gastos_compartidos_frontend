import React, { useEffect } from 'react';
import { useGrupos } from '../../context/GruposContext'; // Adjust the path as needed
import EnviarInvitacion from './invitacion';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { SparklesCore } from "../ui/sparkles";
import { Grupo } from '../../types/Grupo'; // Import the Grupo interface

const GruposList: React.FC = () => {
  const { grupos, getGrupos } = useGrupos();

  useEffect(() => {
    getGrupos();
  }, [getGrupos]);

  return (
    <div>
      <div className="bg-black w-full min-h-screen justify-center items-center flex flex-wrap gap-3">
        <div className="pt-20 h-auto w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
          <h1 className="md:text-5xl text-3xl lg:text-8xl font-bold text-center text-white relative z-20">
            Grupos
          </h1>
          <div className="w-[40rem] h-20 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-20"
              particleColor="#FFFFFF"
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-auto bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
        {grupos.map((grupo: Grupo) => (
          <CardContainer key={grupo.id} className="z-30">
            <CardBody className="bg-gray-50 group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-10 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {grupo.nombre}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Descripción: {grupo.descripcion || 'Sin descripción'}
              </CardItem>

              <div className="my-5">
                <p className="font-semibold text-white">Integrantes:</p>
                <ul className="list-disc list-inside pl-4 text-white">
                  {grupo.integrantes.map(user => (
                    <li key={user.id} className="text-white">{user.nombre}</li>
                  ))}
                </ul>
              </div>
              <EnviarInvitacion grupoId={grupo.id} />
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default GruposList;
