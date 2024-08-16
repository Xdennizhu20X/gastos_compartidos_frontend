import { Button } from "@nextui-org/react";
import { Vortex } from "../ui/vortex";
import { Link } from "react-router-dom";
import { BackgroundGradient } from "../ui/background-gradient";
import { Image } from "@nextui-org/react";

export default function Dashboard() {
  return (
    <div className="w-full">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={920}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-screen overflow-y-hidden overflow-x-hidden "
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Gestiona Tus Gastos Compartidos
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          Divide y controla tus finanzas con total facilidad.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Button
            as={Link}
            to="/login"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
          >
            Order now
          </Button>
        </div>
      </Vortex>

      <div className="pt-35 bg-black flex w-screen flex-col items-center px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Funcionamiento de la Aplicación
        </h2>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-5 sm:grid-cols-1 justify-center  pb-20 ">
          <div className="max-w-sm">
            <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
              <Image
                src="https://dti.anahuacmayab.mx/wp-content/uploads/2022/08/54950-min-2050x2050.jpg"
                isZoomed
                alt="NextUI Fruit Image with Zoom" 
                width={270}
                height={180}
                className="object-contain"
              />
              <p className="font-bold text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                Regístrate y Crea un Grupo
              </p>

              <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Empieza creando un nuevo grupo de gastos y agrega a los miembros.
              </p>
            
            </BackgroundGradient>
          </div>
          <div className="max-w-sm">
            <BackgroundGradient className="rounded-[22px]  p-4 sm:p-10 bg-white dark:bg-zinc-900">
              <Image
                src="https://tusfinanzas.ec/wp-content/uploads/2018/12/rastrear-gastos.jpg"
                isZoomed
                alt="NextUI Fruit Image with Zoom"
                width={270}
                height={180}
                className="object-contain"
              />
              <p className="font-bold text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                Agrega Gastos
              </p>

              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Registra los gastos y asigna los montos a los miembros del grupo.

              </p>
              
            </BackgroundGradient>
          </div>
          <div className="max-w-sm ">
            <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
              <Image
                src="https://img.freepik.com/vector-gratis/empleados-departamento-finanzas-estan-calculando-gastos-negocio-empresa_1150-41782.jpg"
                isZoomed
                alt="NextUI Fruit Image with Zoom"
                width={270}
                height={180}
                className="object-contain"
              />
              <p className="font-bold text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                Divide y Consulta
              </p>

              <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Divide los gastos de manera justa y consulta los reportes para ver
              el estado actual.

              </p>
              
            </BackgroundGradient>
          </div>
        </div>
      </div>
    </div>
  );
}
