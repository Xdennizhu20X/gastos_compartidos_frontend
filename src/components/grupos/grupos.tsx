import React, { useState } from 'react';
import { useGrupos } from '../../context/GruposContext'; 
import { Label } from "../ui/label"; 
import { Input } from "../ui/input"; 
import { cn } from "../../lib/util"; 
import { AuroraBackground } from '../ui/aurora-background';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Inicializar SweetAlert2 con React
const MySwal = withReactContent(Swal);

const CrearGrupo: React.FC = () => {
  const { createGrupo } = useGrupos();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [presupuesto, setPresupuesto] = useState<number | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const grupo = {
      nombre,
      descripcion,
      presupuesto
    };

    try {
      // @ts-ignore
      await createGrupo(grupo);

      // Mostrar alerta de éxito
      MySwal.fire({
        title: '¡Grupo creado con éxito!',
        text: `El grupo "${nombre}" ha sido creado.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Limpiar los campos después de crear el grupo
      setNombre('');
      setDescripcion('');
      setPresupuesto(undefined);
    } catch (error) {
      // Manejar errores, si es necesario
      console.error("Error creando el grupo:", error);
      MySwal.fire({
        title: 'Error',
        text: 'Hubo un problema al crear el grupo. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <AuroraBackground className="min-h-screen relative w-full overflow-hidden z-0 bg-black flex flex-col items-center justify-center">
      <div className="fixed top-20 left-4 z-50">
        <Link 
          to="/groups" 
          className="flex items-center text-white bg-gray-700 hover:bg-gray-900 transition duration-200 px-4 py-2 rounded-lg text-sm font-medium shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-white">
            <title>arrow-left</title>
            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
          </svg>
          Volver
        </Link>
      </div>
      <div className="max-w-md z-30 sm:w-full w-[90%] mx-auto absolute rounded-none md:rounded-2xl mt-10 p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Crear Nuevo Grupo
        </h2>
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <LabelInputContainer>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                id="nombre"
                placeholder="Escribe el nombre del grupo"
                type="text"
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="descripcion">Descripción</Label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Escribe una descripción para el grupo"
                className="border border-gray-300 p-2 rounded"
              />
            </LabelInputContainer>
          </div>
          <button
            type="submit"
            className="mt-5 bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Crear Grupo &rarr;
          </button>
        </form>
      </div>
    </AuroraBackground>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default CrearGrupo;
