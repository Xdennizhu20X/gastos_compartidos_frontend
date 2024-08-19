import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { BackgroundGradient } from "../ui/background-gradient";
import { Vortex } from "../ui/vortex";
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Metodo_pago() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [email, setEmail] = useState('');
 

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transaccionId = query.get('transaccionId') || '';
  const userId = query.get('usuarioId') || '';
  const amountQuery = query.get('amount') || '';

  useEffect(() => {
    if (amountQuery) {
      setAmount(amountQuery); // Establece el monto desde la URL
    }
  }, [amountQuery]);

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBank(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const paymentData = {
      method: paymentMethod,
      bank: selectedBank,
      accountNumber,
      amount: parseFloat(amount),
      reason,
      cardNumber,
      cardHolderName,
      expirationDate,
      securityCode,
      userId,
      transaccionId,
      email
    };
  
    try {
      const response = await axios.post('/pagos', paymentData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        const { pagoId } = response.data; // Asegúrate de que esto coincide con la respuesta del servidor
  
        if (pagoId) {
          const result = await Swal.fire({
            title: 'Pago creado exitosamente',
            text: '¿Deseas completar el pago?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          });
  
          if (result.isConfirmed) {
            try {
              await axios.post(`/pagos/${pagoId}/completar`);
              Swal.fire('Pago completado', 'Tu pago ha sido completado exitosamente.', 'success');
            } catch (err) {
              console.error('Error al completar el pago:', err);
              Swal.fire('Error', 'Hubo un problema al completar el pago.', 'error');
            }
          } else {
            Swal.fire('Cancelado', 'El pago no fue completado.', 'info');
          }
        } else {
          console.error('ID del pago no disponible');
          Swal.fire('Error', 'No se pudo obtener el ID del pago.', 'error');
        }
      } else {
        Swal.fire('Error', 'Error al crear el pago.', 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      Swal.fire('Error', 'Hubo un error al realizar el pago.', 'error');
    }
  };

  return (
    <div>
      <div className="min-h-screen w-full flex items-center justify-center relative z-10">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={500}
          baseHue={920}
          className="w-full h-full flex flex-col items-center justify-center overflow-hidden"
        >
          <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
            Formulario de Pago
          </h2>
          <div className="pt-20 bg-transparent flex flex-col items-center relative z-20">
        <BackgroundGradient className="flex flex-col bg-black rounded-[16px] p-4 sm:p-6">
          <div className="flex flex-col items-center">
            <h3 className="text-white text-2xl font-bold mb-6">Método de Pago</h3>

            <div className="flex mb-6 border-b border-gray-700 space-x-4">
              <button
                onClick={() => handlePaymentMethodChange('transfer')}
                className={`py-2 px-4 rounded-t-lg ${paymentMethod === 'transfer' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                Transferencia
              </button>
              <button
                onClick={() => handlePaymentMethodChange('card')}
                className={`py-2 px-4 rounded-t-lg ${paymentMethod === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                Tarjeta de Crédito
              </button>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="mb-6 text-white text-lg font-semibold">
                {amount && (
                  <div className="mb-4">
                    <h4 className="text-xl">Monto a Pagar:</h4>
                    <p className="text-lg font-bold">${amount}</p>
                  </div>
                )}
              </div>

              <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block p-3 rounded-md border border-gray-300 w-full mb-4"
              />

              {paymentMethod === 'transfer' && (
                <div>
                  <div className="flex flex-col space-y-4">
                    <select
                      value={selectedBank}
                      onChange={handleBankChange}
                      className="block p-3 rounded-md border border-gray-300 w-full"
                    >
                      <option value="">Seleccionar Banco</option>
                      <option value="loja">Loja</option>
                      {/* Agrega más opciones según sea necesario */}
                    </select>
                    <input
                      type="text"
                      placeholder="Número de Cuenta"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="block p-3 rounded-md border border-gray-300 w-full"
                    />
                    <input
                      type="text"
                      placeholder="Motivo"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="block p-3 rounded-md border border-gray-300 w-full"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div>
                  <div className="flex flex-col space-y-4">
                    <input
                      type="text"
                      placeholder="Número de Tarjeta"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="block p-3 rounded-md border border-gray-300 w-full"
                    />
                    <input
                      type="text"
                      placeholder="Nombre del Titular"
                      value={cardHolderName}
                      onChange={(e) => setCardHolderName(e.target.value)}
                      className="block p-3 rounded-md border border-gray-300 w-full"
                    />
                    <input
                      type="text"
                      placeholder="Fecha de Expiración (MM/AA)"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                      className="block p-3 rounded-md border border-gray-300 w-full"
                    />
                    <input
                      type="text"
                      placeholder="Código de Seguridad"
                      value={securityCode}
                      onChange={(e) => setSecurityCode(e.target.value)}
                      className="block p-3 rounded-md border border-gray-300 w-full"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Realizar Pago
              </button>
            </form>
          </div>
        </BackgroundGradient>
      </div>
        </Vortex>
      </div>

      
    </div>
  );
}
