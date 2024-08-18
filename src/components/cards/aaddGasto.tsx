import React, { useState, useEffect } from 'react';
import { useGastos } from '../../context/GastoContext'; // Ajusta la ruta según tu estructura

const CrearGasto: React.FC = () => {
  const { createGasto, userId } = useGastos();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState<number>(0);
  const [grupo, setGrupoId] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();

    if (!userId) {
      console.error('No se ha encontrado el ID del usuario');
      return;
    }

    await createGasto({ nombre, precio, grupo, fechaVencimiento });

    // Limpiar el formulario después de la creación
    setNombre('');
    setPrecio(0);
    setGrupoId('');
    setFechaVencimiento('');
  };

  // Verifica si userId está disponible
  useEffect(() => {
    if (!userId) {
      console.error('User ID no disponible');
    }
  }, [userId]);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-md shadow-lg">
      <h2 className="text-xl font-bold mb-4">Crear Gasto</h2>
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-gray-700">Nombre del Gasto:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="precio" className="block text-gray-700">Precio:</label>
        <input
          type="number"
          id="precio"
          value={precio}
          onChange={(e) => setPrecio(parseFloat(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="grupoId" className="block text-gray-700">Grupo ID:</label>
        <input
          type="text"
          id="grupoId"
          value={grupo}
          onChange={(e) => setGrupoId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fechaVencimiento" className="block text-gray-700">Fecha de Vencimiento:</label>
        <input
          type="date"
          id="fechaVencimiento"
          value={fechaVencimiento}
          onChange={(e) => setFechaVencimiento(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Crear Gasto</button>
    </form>
  );
};

export default CrearGasto;
