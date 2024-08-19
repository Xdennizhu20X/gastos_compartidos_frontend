
import {BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavbarComponent from './components/navbar/navbar';
import './App.css'

import Home from "./components/principal/principal";

import Transacciones from "./components/transacciones/Transacciones";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Dashboard from "./components/dashboard/dashboar";
import ProtectedRoute from './components/ProtectedRoutes'; 
import Nosotros from "./components/nosotros/nosotros";
import { NextUIProvider } from "@nextui-org/react";
import UserDetailsPage from "./components/usuario/UserDetails";

import CrearGrupo from "./components/grupos/grupos";
import GruposList from "./components/grupos/listgroups";

import MisInvitaciones from "./components/grupos/listInvitaciones";
import AddGastoForm from "./components/cards/aaddGasto";
import Metodo_pago from "./components/pago/metodo_pago";
import ListarGastos from "./components/cards/listarGasto";


function App() {
  return (
    <Router basename="/gastos_compartidos_frontend">
      <NextUIProvider>
        <div className="overflo">
          <NavbarComponent />
          <Routes>
          <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<Navigate to="/inicio" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/inicio" element={<Dashboard />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/metodo_pago" element={<ProtectedRoute><Metodo_pago /></ProtectedRoute>} />
            <Route path="/user" element={<ProtectedRoute><UserDetailsPage /></ProtectedRoute>} />
            <Route path="/trans" element={<ProtectedRoute><Transacciones /></ProtectedRoute>} />
            <Route path="/creategroups" element={<ProtectedRoute><CrearGrupo/></ProtectedRoute>} />
            <Route path="/groups" element={<ProtectedRoute><GruposList/></ProtectedRoute>} />
            <Route path="/misinv" element={<ProtectedRoute><MisInvitaciones/></ProtectedRoute>} />
            <Route path="/gastos" element={<ProtectedRoute><ListarGastos/></ProtectedRoute>} />
            <Route path="/creargasto" element={<ProtectedRoute><AddGastoForm/></ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </NextUIProvider>
    </Router>
  );
}


export default App;
