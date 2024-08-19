import React, { useState, useEffect } from 'react';
import { useGastos } from '../../context/GastoContext';
import { useGrupos } from '../../context/GruposContext';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../../lib/util";
import { AuroraBackground } from '../ui/aurora-background';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CrearGasto: React.FC = () => {
  const { createGasto, userId } = useGastos();
  const { grupos, getGrupos } = useGrupos();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState<number>(0);
  const [grupoId, setGrupoId] = useState<string>('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');

  useEffect(() => {
    getGrupos();
  }, [getGrupos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      console.error('No se ha encontrado el ID del usuario');
      return;
    }

    if (!grupoId) {
      console.error('El ID del grupo no está definido');
      return;
    }

    MySwal.fire({
      title: 'Creando gasto...',
      text: 'Por favor, espera mientras se crea el gasto.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await createGasto({
        nombre,
        precio,
        grupo: grupoId,
        fechaVencimiento
      });

      MySwal.fire({
        title: '¡Gasto creado exitosamente!',
        text: `El gasto "${nombre}" ha sido creado con éxito.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      // Limpiar el formulario después de la creación
      setNombre('');
      setPrecio(0);
      setGrupoId('');
      setFechaVencimiento('');
    } catch (error) {
      console.error('Error al crear el gasto:', error);
      MySwal.fire({
        title: 'Error',
        text: 'Hubo un problema al crear el gasto. Por favor, intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <AuroraBackground className="min-h-screen relative w-full overflow-hidden z-0 bg-black flex flex-col items-center justify-center">
      <div className="fixed top-20 left-4 z-50">
        <Link
          to="/gastos"
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
          Crear Nuevo Gasto
        </h2>
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <LabelInputContainer>
              <Label htmlFor="nombre">Nombre del Gasto</Label>
              <Input
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                id="nombre"
                placeholder="Escribe el nombre del gasto"
                type="text"
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="precio">Precio</Label>
              <Input
                name="precio"
                value={precio}
                onChange={(e) => setPrecio(parseFloat(e.target.value))}
                id="precio"
                placeholder="Escribe el precio del gasto"
                type="number"
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="grupoId">Grupo</Label>
              <select
                name="grupoId"
                value={grupoId}
                onChange={(e) => setGrupoId(e.target.value)}
                id="grupoId"
                className="border rounded p-2"
                required
              >
                <option value="">Selecciona un grupo</option>
                {grupos.map((g) => (
                  <option key={g._id} value={g._id}>
                    {g.nombre}
                  </option>
                ))}
              </select>
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Label>
              <Input
                name="fechaVencimiento"
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
                id="fechaVencimiento"
                placeholder="Selecciona la fecha de vencimiento"
                type="date"
                required
              />
            </LabelInputContainer>
          </div>
          <button
            type="submit"
            className="mt-5 bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Crear Gasto &rarr;
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

export default CrearGasto;
