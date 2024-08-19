import React, { useEffect } from 'react';
import { useGastos } from '../../context/GastoContext';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';

import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

interface Gasto {
  id: string;
  nombre: string;
  precio: number;
  fechaVencimiento: string;
  usuarioId: string;
  grupoId: string;
}

const Gastos: React.FC = () => {
  const { gastos, getGastos } = useGastos();

  useEffect(() => {
    getGastos();
  }, [getGastos]);

  return (
    <div>
      <div className="bg-transparent w-full h-auto justify-center items-center flex flex-wrap gap-3">
        
        {gastos.length > 0 ? (
          gastos.map((gasto: Gasto) => (
            <CardContainer key={gasto.id} className="z-30">
              <CardBody className="bg-gray-50 group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-10 border">
              <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 font-extrabold text-4xl max-w-sm mt-2 dark:text-neutral-300"
                >
                  {gasto.nombre || 'Sin descripción'}
                </CardItem>
                <CardItem
                  translateZ="50"
                  className="text-3xl  text-neutral-600 dark:text-white"
                >
                  <strong>Monto:</strong> ${gasto.precio.toFixed(2)}
                </CardItem>

                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-2xl max-w-sm mt-2 dark:text-neutral-300"
                >
                 <strong>Fecha: </strong> {new Date(gasto.fechaVencimiento).toLocaleDateString()}
                </CardItem>
              </CardBody>
            </CardContainer>
          ))
        ) : (
          <div className="w-full flex flex-col items-center">
            <p className="text-white text-lg font-semibold">No tienes gastos registrados.</p>
            <Button
              as={Link}
              to="/creargasto"
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
            >
              Crear Gasto
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gastos;
