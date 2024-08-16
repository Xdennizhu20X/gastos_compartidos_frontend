import React, { useEffect } from 'react';
import { useTransacciones } from '../../context/TransaccionesContext'; // Ajusta la ruta según tu estructura
import { Card, CardBody, CardFooter, Image, Button } from '@nextui-org/react';
import { pagarTransaccion } from '../../api/transacciones'; // Ajusta la ruta según tu estructura

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

  if (!transacciones) {
    return <div>Cargando transacciones...</div>;
  }

  if (transacciones.length === 0) {
    return <div>No se encontraron transacciones.</div>;
  }

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black'>
      <h2 className='text-2xl font-bold mb-6'>Mis Transacciones</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {transacciones.map((transaccion, index) => (
          <Card
            key={transaccion._id}
            className="animate-swing-drop-in w-72 h-auto bg-[#181a32] border-2 border-purple-300 shadow-[0_0_1px_#fff,inset_0_0_1px_#fff,0_0_5px_#08f,0_0_5px_#08f,0_0_1px_#08f]"
            style={{ animationDelay: `${index * 100}ms` }}
            shadow="sm"
            isPressable
            onPress={() => console.log(`Transacción ${transaccion._id} presionada`)}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt="Transacción"
                className="w-full object-cover h-[150px]"
                src="" // Reemplaza esto con una imagen real si tienes
              />
            </CardBody>
            <CardFooter className="text-small justify-between text-white flex flex-col">
              <div>
                <b>ID Transacción: {transaccion._id}</b>
                <p>Monto: {transaccion.monto}</p>
                <p>Fecha: {transaccion.fecha}</p>
                <p>Estado: {transaccion.estado}</p>
              </div>
              <Button
                className="mt-2 bg-purple-500"
                onClick={() => handlePagar(transaccion._id)}
                disabled={transaccion.estado === 'pagada'} // Deshabilitar si ya está pagada
              >
                {transaccion.estado === 'pagada' ? 'Pagada' : 'Pagar'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserTransactions;
