
import { ScrollShadow } from "@nextui-org/react";
import SearchComponent from "../search/search";
import CardsComponent from "../cards/cards";
import { NextUIProvider } from "@nextui-org/react";
import AnaliticsComponent from "../analitycs/analitycs";


export default function Home() {
  return (

    <NextUIProvider>
      <main className="sm:dark dark text-foreground  sm:h-screen h-auto  bg-[#08042c]">

        <section className="w-full sm:h-screen h-auto flex sm:flex-row flex-col sm:justify-center sm:items-center">
          <div className="sm:w-[70%] w-full flex flex-col justify-center items-center">
            <ScrollShadow size={200} className="left-content sm:w-full w-full h-screen flex flex-col items-center justify-center sm:block hidden">
              <div className="w-full flex flex-col justify-center items-center">
              <SearchComponent />
              <img className="h-[320px] w-[95%]" src="src/assets/imagen_grupo.png" alt="" />
              </div>
              <div className="w-full flex flex-col justify-center items-start">
                <h1 className="ml-16 text-xl font-semibold py-2">Gastos Recientes</h1>
              </div>
              <CardsComponent />
            </ScrollShadow>
            <div className="w-full flex flex-col items-center sm:hidden">
              <SearchComponent />
              <img className="h-[220px] w-96"  src="src/assets/imagen_grupo.png" alt="" />
              <div className="w-full flex flex-col justify-center items-start">
                <h1 className="ml-16 text-xl font-semibold py-2">Gastos Recientes</h1>
              </div>
              <CardsComponent />
            </div>
          </div>
          <div className="sm:w-[30%] w-full sm:h-screen h-auto mx-auto flex flex-col justify-end items-center">
            <ScrollShadow size={200} className="right-content w-full h-screen  sm:block hidden">
              <AnaliticsComponent />
            </ScrollShadow>
            <div className="w-full sm:hidden h-auto flex flex-col items-center ">
            <AnaliticsComponent />
            </div>
          </div>
        </section>





      </main>
    </NextUIProvider>




  );
}
