import React, { useEffect } from 'react';
import { useTransacciones } from '../../context/TransaccionesContext'; // Ajusta la ruta según tu estructura
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { AuroraBackground } from '../ui/aurora-background';

const UserTransactions: React.FC = () => {
  const { transacciones, getTransacciones, usuarioId } = useTransacciones(); // Ahora usuarioId está disponible
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    getTransacciones();
  }, [getTransacciones]);

  const handlePagar = (transaccionId: string, monto: number) => {
    if (usuarioId) {
      // Redirige a la página de pago con los parámetros necesarios
      navigate(`/metodo_pago?transaccionId=${transaccionId}&usuarioId=${usuarioId}&amount=${monto}`);
    } else {
      alert('No se pudo obtener el ID de usuario.');
    }
  };

  if (transacciones.length === 0) {
    return (
      <AuroraBackground className="bg-black w-full min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            No se encontraron transacciones.
          </h1>
        </div>
      </AuroraBackground>
    );
  }

  return (
    <AuroraBackground className="bg-black w-full min-h-screen flex flex-col items-center justify-center">
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
        </div>
      </div>

      <div className="w-full flex flex-wrap items-center justify-center sm:gap-6 gap-1">
        {transacciones.map((transaccion, index) => (
          <CardContainer key={transaccion._id} className="relative">
            <div style={{ animationDelay: `${index * 100}ms` }}>
              <CardBody className="bg-gray-50 relative group/card dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[85%] sm:w-[30rem] h-auto rounded-xl p-10 border shadow-[0_0_1px_#fff,inset_0_0_1px_#fff,0_0_5px_#08f,0_0_5px_#08f,0_0_1px_#08f]">

                <CardItem as="p" translateZ="60" className="text-neutral-500 text-2xl max-w-sm mt-2 dark:text-white">
                  <strong>Monto: </strong>{transaccion.monto}
                  <br />
                  <strong>Fecha:</strong> {transaccion.fecha}
                  <br />
                  <strong>Estado:</strong> {transaccion.estado}
                </CardItem>
                <Button
                  className="mt-2 bg-purple-500 text-white"
                  onClick={() => handlePagar(transaccion._id, transaccion.monto)}
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
