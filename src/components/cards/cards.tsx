// src/components/GastosList.tsx
import React, { useEffect, useState } from 'react';
import { useGastos } from '../../context/GastoContext'; // Ajusta la ruta según tu estructura
import CrearGasto from './aaddGasto';

interface Gasto {
  id: string;
  precio: number;
  nombre: string;
  fechaVencimiento: string;
  grupo: {
    _id: string;
    nombre: string;
  };
}

const GastosList: React.FC = () => {
  const { gastos, getGastos } = useGastos();

  useEffect(() => {
    getGastos();
  }, [getGastos]);

  return (
    <div className="bg-white p-5 rounded-md shadow-lg">
      <h2 className="text-xl font-bold mb-4">Tus Gastos</h2>
      {gastos.length > 0 ? (
        <ul className="space-y-4">
          {gastos.map((gasto) => (
            <li key={gasto.id} className="p-4 bg-gray-100 rounded-md shadow-sm">
              <p className="text-lg font-semibold">Monto: ${gasto.precio.toFixed(2)}</p>
              <p className="text-gray-600">Descripción: {gasto.nombre}</p>
              <p className="text-gray-500">Fecha: {new Date(gasto.fechaVencimiento).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes gastos registrados.</p>
      )}
      
    </div>
  );
};

export default GastosList;
