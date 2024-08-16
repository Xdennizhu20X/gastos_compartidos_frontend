
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarComponent from './components/navbar/navbar';
import './App.css'

import Home from "./components/principal/principal";
import AnalyticsComponent from "./components/analitycs/analitycs";
import Transacciones from "./components/transacciones/Transacciones";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Dashboard from "./components/dashboard/dashboar";
import ProtectedRoute from './components/ProtectedRoutes'; 
import Nosotros from "./components/nosotros/nosotros";
import { NextUIProvider } from "@nextui-org/react";
import UserDetailsPage from "./components/usuario/UserDetails";

function App() {

  return (

  <Router>
    <NextUIProvider>
      <div className="overflo">
        <NavbarComponent />
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/nosotros" element={<Nosotros />} />

          <Route path="/user" element={<ProtectedRoute><UserDetailsPage /></ProtectedRoute>} />
          <Route path="/trans" element={<ProtectedRoute><Transacciones /></ProtectedRoute>} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </NextUIProvider>
  </Router>




    
  );
}

export default App;
