import React, { useState } from 'react';
import { BackgroundGradient } from "../ui/background-gradient";
import { Vortex } from "../ui/vortex";

export default function Metodo_pago() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBank(event.target.value);
  };

  return (
    <div>
      <div className="h-[300px] w-full flex items-center justify-center relative z-10">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={500}
          baseHue={920}
          className="w-full h-full flex items-center justify-center overflow-hidden"
        >
          <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
            Formulario de Pago
          </h2>
        </Vortex>
      </div>

      <div className="pt-20 bg-black flex flex-col items-center relative z-20">
        <BackgroundGradient className="flex flex-col bg-black rounded-[16px] p-4 sm:p-6">
          <div className="flex flex-col items-center">
            <h3 className="text-white text-2xl font-bold mb-6">Método de Pago</h3>

            <div className="flex mb-6 border-b border-gray-700 space-x-4">
              <button
                onClick={() => handlePaymentMethodChange('transfer')}
                className={`py-2 px-4 rounded-t-lg ${paymentMethod === 'transfer' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'} hover:bg-blue-600 transition duration-200`}
              >
                Transferencia Bancaria
              </button>
              <button
                onClick={() => handlePaymentMethodChange('creditCard')}
                className={`py-2 px-4 rounded-t-lg ${paymentMethod === 'creditCard' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'} hover:bg-blue-600 transition duration-200`}
              >
                Tarjeta de Crédito/Débito
              </button>
            </div>

            <form className="w-full max-w-lg">
              {paymentMethod === 'transfer' && (
                <div className="mb-6">
                  <h4 className="text-white text-lg font-semibold">Detalles de Transferencia</h4>
                  <div className="flex flex-col space-y-4 mt-2">
                    <select
                      value={selectedBank}
                      onChange={handleBankChange}
                      className="block p-3 rounded-md border border-gray-300 w-full bg-white text-black"
                    >
                      <option value="" disabled>Seleccionar Banco</option>
                      <option value="pichincha">Banco Pichincha</option>
                      <option value="loja">Banco de Loja</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Número de Cuenta"
                      className="block p-3 rounded-md border border-gray-300 w-full"
                    />
                    <input
                      type="number"
                      placeholder="Monto"
                      className="block p-3 rounded-md border border-gray-300 w-full"
                    />
                    <input
                      type="text"
                      placeholder="Motivo"
                      className="block p-3 rounded-md border border-gray-300 w-full"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'creditCard' && (
                <div className="mb-6">
                  <h4 className="text-white text-lg font-semibold">Detalles de Tarjeta</h4>

                  {/* Logos de las tarjetas de crédito */}
                  <div className="flex space-x-4 mt-4 mb-4 justify-center">
                    <img src="https://1000marcas.net/wp-content/uploads/2019/12/Visa-Logo-2005.jpg" alt="Visa" className="h-10" />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpT3-GMtjwNqXKLubqTfOUqh64jZwooTsxxw&s" alt="MasterCard" className="h-10" />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9h_lvBnm4UQvLK2jkqQDhs788I6JCL0XcPg&s" alt="PayPal" className="h-10" />
                  </div>

                  <div className="flex flex-col space-y-4 mt-2">
                    <input
                      type="text"
                      placeholder="Número de Tarjeta"
                      className="block p-3 rounded-md border border-gray-300 w-full"
                    />
                    <div className="flex justify-between space-x-4">
                      <input
                        type="text"
                        placeholder="Nombre del Titular"
                        className="block p-3 rounded-md border border-gray-300 w-[48%]"
                      />
                      <input
                        type="text"
                        placeholder="Fecha de Expiración"
                        className="block p-3 rounded-md border border-gray-300 w-[48%]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Código de Seguridad"
                      className="block p-3 rounded-md border border-gray-300 w-full"
                    />
                  </div>
                </div>
              )}

              {/* Mostrar el botón solo si se ha seleccionado un método de pago */}
              {paymentMethod && (
                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Enviar Pago
                  </button>
                </div>
              )}
            </form>
          </div>
        </BackgroundGradient>

        <div className="h-16" /> {/* Espacio adicional */}
      </div>
    </div>
  );
}
