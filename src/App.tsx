
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarComponent from './components/navbar/navbar';
import './App.css'

import Home from "./components/principal/principal";
import AnalyticsComponent from "./components/analitycs/analitycs";
import Transacciones from "./components/transacciones/Transacciones";

function App() {

  return (
    <div className="sm:dark dark text-foreground sm:h-screen h-full sm:overflow-hidden overflow-visible  bg-[#08042c]">
      <NavbarComponent/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/other" element={<AnalyticsComponent />} />
        <Route path="/transaccion" element={<Transacciones />} />
        {/* Add more Route components as needed */}
      </Routes>
    </div>
  );
}

export default App;
