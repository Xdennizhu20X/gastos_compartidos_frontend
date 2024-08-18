import React, { useEffect } from 'react';
import { useTransacciones } from '../../context/TransaccionesContext'; // Ajusta la ruta según tu estructura
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { Button } from '@nextui-org/react';
import { pagarTransaccion } from '../../api/transacciones'; // Ajusta la ruta según tu estructura

import { AuroraBackground } from '../ui/aurora-background';

const UserTransactions: React.FC = () => {
  const { transacciones, getTransacciones } = useTransacciones();

  useEffect(() => {
    getTransacciones();
  }, [getTransacciones]);

  const handlePagar = async (id: string) => {
    try {
      await pagarTransaccion(id);
      await getTransacciones(); // Refresca la lista de transacciones después de pagar
      alert(`Transacción ${id} pagada exitosamente.`);
    } catch (error) {
      console.error('Error al pagar la transacción:', error);
      alert('Hubo un problema al pagar la transacción.');
    }
  };

  if (transacciones.length === 0) {
    return <div>No se encontraron transacciones.</div>;
  }

  return (
    <AuroraBackground className="bg-black  w-full h-auto flex flex-col items-center justify-center ">
      <div className="pt-20 h-auto w-full flex flex-col items-center justify-center">
        <h1 className="md:text-5xl text-4xl lg:text-8xl font-bold text-center text-white relative z-20">
          Mis Transacciones
        </h1>
        <div className="sm:w-[40rem] h-10 sm:h-20 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Radial Gradient to prevent sharp edges */}

        </div>
      </div>

      <div className="w-full flex flex-wrap items-center justify-center sm:gap-6 gap-1">
        {transacciones.map((transaccion, index) => (
          <CardContainer key={transaccion._id} className="relative">
            <div style={{ animationDelay: `${index * 100}ms` }}>
              <CardBody className="bg-gray-50 relative group/card dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[85%] sm:w-[30rem] h-auto rounded-xl p-10 border shadow-[0_0_1px_#fff,inset_0_0_1px_#fff,0_0_5px_#08f,0_0_5px_#08f,0_0_1px_#08f]">
                <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                  ID Transacción: {transaccion._id}
                </CardItem>
                <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                  Monto: {transaccion.monto}
                  <br />
                  Fecha: {transaccion.fecha}
                  <br />
                  Estado: {transaccion.estado}
                </CardItem>
                <Button
                  className="mt-2 bg-purple-500 text-white"
                  onClick={() => handlePagar(transaccion._id)}
                  disabled={transaccion.estado === 'pagada'}
                >
                  {transaccion.estado === 'pagada' ? 'Pagada' : 'Pagar'}
                </Button>
              </CardBody>
            </div>
          </CardContainer>
        ))}
      </div>

    </AuroraBackground>
  );
};

export default UserTransactions;
