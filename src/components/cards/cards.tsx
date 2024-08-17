"use client";
import React, { useEffect } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useGastos } from "../../context/GastoContext"; // Ajusta la ruta según tu estructura

const CardsComponent: React.FC = () => {
  const { gastos, getGastos } = useGastos();

  useEffect(() => {
    // Obtener los gastos al montar el componente
    getGastos();
  }, [getGastos]);

  // Imagen predefinida para todos los gastos
  const imagenPredefinida = "https://tusfinanzas.ec/wp-content/uploads/2018/12/rastrear-gastos.jpg"; // Cambia esto por la ruta de tu imagen predefinida

  return (
    <div className="gap-10 flex flex-wrap justify-center">
      {gastos.length === 0 ? (
        <p>No hay gastos disponibles.</p>
      ) : (
        gastos.map((gasto, index) => (
          <Card
            className="animate-swing-drop-in w-72 h-52 bg-[#181a32] border-2 border-purple-300 shadow-[0_0_1px_#fff,inset_0_0_1px_#fff,0_0_5px_#08f,0_0_5px_#08f,0_0_1px_#08f]"
            style={{ animationDelay: `${index * 100}ms` }}
            shadow="sm"
            key={gasto.id}
            isPressable
            onPress={() => console.log(`Gasto ${gasto.id} presionado`)}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={gasto.nombre} // Utiliza el nombre del gasto como texto alternativo
                className="w-full object-cover h-[150px]"
                src={imagenPredefinida} // Utiliza la imagen predefinida para todos los gastos
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{gasto.nombre}</b>
              <p className="text-default-500">{gasto.precio}</p>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default CardsComponent;
