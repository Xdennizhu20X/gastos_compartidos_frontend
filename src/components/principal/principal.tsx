import SearchComponent from "../search/search";
import CardsComponent from "../cards/cards";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <main className="sm:dark dark text-foreground bg-[#060528] h-full py-16">
        <section className="w-full flex sm:flex-row flex-col sm:justify-center sm:items-center">
          <div className="sm:w-full w-full flex flex-col justify-center items-center">
            <div className="left-content sm:w-full w-full flex flex-col items-center justify-center sm:block hidden">
              <div className="w-full flex flex-col justify-center items-center">
                <SearchComponent />
                {/* <img className="animate-slide-up-fade w-auto" src="src/assets/imagen_grupo.png" alt="" /> */}
              </div>
              <div className="w-full flex flex-col justify-center items-start">
                <h1 className="ml-16 text-xl font-semibold py-2 mb-5">Gastos Recientes</h1>
              </div>
              <CardsComponent />
            </div>
            <div className="w-full flex flex-col items-center sm:hidden">
              <SearchComponent />
              {/* <img className="h- w-96" src="src/assets/imagen_grupo.png" alt="" /> */}
              <div className="w-full flex flex-col justify-center items-start">
                <h1 className="ml-16 text-xl font-semibold py-2">Gastos Recientes</h1>
              </div>
              <CardsComponent />
            </div>
          </div>
        </section>
      </main>
    </NextUIProvider>
  );
}
