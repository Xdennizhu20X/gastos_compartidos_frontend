
import CardsComponent from "../cards/cards";
import { NextUIProvider } from "@nextui-org/react";
import { Vortex } from "../ui/vortex";


export default function Home() {
  return (
    <NextUIProvider>
      <Vortex backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={920}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-screen overflow-y-hidden overflow-x-hidden ">
                  <div className="h-auto  w-full bg-transparent flex flex-col items-center justify-center overflow-hidden rounded-md">
          <h1 className="md:text-5xl text-5xl lg:text-8xl font-bold text-center text-white relative z-20">
            Bienevenido a DivvyUp
          </h1>
          <div className="w-[40rem] sm:block hidden h-20 relative">
            {/* Gradientes */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />



            {/* Gradiente Radial para evitar bordes afilados */}
            <div className="absolute inset-0 w-full h-auto bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
        <section className="w-full flex sm:flex-row flex-col sm:justify-center sm:items-center">
          <div className="sm:w-full w-full flex flex-col justify-center items-center">
            <div className="left-content sm:w-full w-full flex flex-col items-center justify-center sm:block hidden">
              <div className="w-full flex flex-col justify-center items-center">

                {/* <img className="animate-slide-up-fade w-auto" src="src/assets/imagen_grupo.png" alt="" /> */}
              </div>
              <div className="w-full flex flex-col justify-center items-start">
                <h1 className="ml-16 text-2xl font-semibold py-2 mb-5 text-white">Gastos Recientes</h1>
              </div>
              <CardsComponent />
            </div>
            <div className="w-full flex flex-col items-center sm:hidden">

              {/* <img className="h- w-96" src="src/assets/imagen_grupo.png" alt="" /> */}
              <div className="w-full flex flex-col justify-center items-start">
                <h1 className="ml-16 text-xl font-semibold py-2">Gastos Recientes</h1>
              </div>
              <CardsComponent />
            </div>
          </div>
        </section>
      </Vortex>
    </NextUIProvider>
  );
}
