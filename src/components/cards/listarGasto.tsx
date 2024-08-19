import { Button } from "@nextui-org/react";
import { SparklesCore } from "../ui/sparkles";
import Gastos from "./cards";
import { Link } from "react-router-dom";

export default function ListarGastos() {
  return (
    <div className="bg-black w-full min-h-screen justify-center sm:justify-start pt-20 items-center flex flex-col gap-10">
        <div className="h-auto  w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
          <h1 className="md:text-5xl text-5xl lg:text-8xl font-bold text-center text-white relative z-20">
            Gastos
          </h1>
          <div className="w-[40rem] sm:block hidden h-20 relative">
            {/* Gradientes */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Componente SparklesCore */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-20"
              particleColor="#FFFFFF"
            />

            {/* Gradiente Radial para evitar bordes afilados */}
            <div className="absolute inset-0 w-full h-auto bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <Button
            as={Link}
            to="/creargasto"
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
          >
            Agregar Gasto
          </Button>
        </div>
        <Gastos/>
    </div>
  );
}
