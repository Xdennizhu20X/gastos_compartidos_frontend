import React, { useEffect, useState } from 'react';
import { getTransacciones, pagarTransaccion } from '../../api/transacciones';

const Transacciones: React.FC = () => {
  const [transacciones, setTransacciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransacciones = async () => {
      try {
        const data = await getTransacciones();
        setTransacciones(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransacciones();
  }, []);

  const handlePagar = async (id: string) => {
    try {
      await pagarTransaccion(id);
      // Optionally, refresh the list of transactions
      const data = await getTransacciones();
      setTransacciones(data);
    } catch (error) {
      console.error('Error paying transaction:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Transacciones</h1>
      <ul>
        {transacciones.map((transaccion) => (
          <li key={transaccion._id}>
            {transaccion.nombre} - {transaccion.monto} - Estado: {transaccion.estado}
            <button
              onClick={() => handlePagar(transaccion._id)}
              disabled={transaccion.estado === 'pagada'}
            >
              Pagar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transacciones;
