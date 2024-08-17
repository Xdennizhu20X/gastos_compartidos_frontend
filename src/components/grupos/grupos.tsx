import React, { useState } from 'react';
import { useGrupos } from '../../context/GruposContext'; // Ajusta la ruta según tu estructura
import { Label } from "../ui/label"; // Asegúrate de que el componente esté en la ruta correcta
import { Input } from "../ui/input"; // Asegúrate de que el componente esté en la ruta correcta
import { cn } from "../../lib/util"; // Asegúrate de que la función esté en la ruta correcta
import { BackgroundBeams } from "../ui/background-beams"; // Asegúrate de que el componente esté en la ruta correcta
// Asegúrate de que la ruta sea correcta

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
    await createGrupo(grupo);
    setNombre('');
    setDescripcion('');
    setPresupuesto(undefined);
  };

  return (
    <div className="min-h-screen relative w-full overflow-hidden z-0 bg-slate-900 flex flex-col items-center justify-center">
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
            <LabelInputContainer>
              <Label htmlFor="presupuesto">Presupuesto</Label>
              <Input
                type="number"
                id="presupuesto"
                value={presupuesto ?? ''}
                onChange={(e) => setPresupuesto(Number(e.target.value))}
                placeholder="Ingresa el presupuesto"
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
      <BackgroundBeams />
    </div>
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
