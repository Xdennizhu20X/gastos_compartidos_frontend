import React, { useState } from 'react';
import { useGrupos } from '../../context/GruposContext'; // Ajusta la ruta según tu estructura

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
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="presupuesto">Presupuesto:</label>
          <input
            type="number"
            id="presupuesto"
            value={presupuesto ?? ''}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Crear Grupo
        </button>
      </form>
    </div>
  );
};

export default CrearGrupo;
