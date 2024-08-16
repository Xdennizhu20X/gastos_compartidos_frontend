import React, { useEffect } from 'react';
import { useTransacciones } from '../../context/TransaccionesContext'; // Ajusta la ruta según tu estructura
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { Button } from '@nextui-org/react';
import { pagarTransaccion } from '../../api/transacciones'; // Ajusta la ruta según tu estructura
import { BackgroundBeams } from '../ui/background-beams';

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
    <div className="bg-black w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="pt-20 h-auto w-full bg-black flex flex-col items-center justify-center">
        <h1 className="md:text-5xl text-3xl lg:text-8xl font-bold text-center text-white relative z-20">
          Mis Transacciones
        </h1>
        <div className="w-[40rem] h-20 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-auto bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>

      <div className="w-full flex flex-wrap items-center justify-center gap-10">
        {transacciones.map((transaccion, index) => (
          <CardContainer key={transaccion._id} className="relative">
            <CardBody className="bg-gray-50 relative group/card dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-10 border shadow-[0_0_1px_#fff,inset_0_0_1px_#fff,0_0_5px_#08f,0_0_5px_#08f,0_0_1px_#08f]" style={{ animationDelay: `${index * 100}ms` }}>
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
          </CardContainer>
        ))}
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default UserTransactions;
