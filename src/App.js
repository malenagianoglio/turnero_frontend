import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Inicio from './components/Usuario/PaginaInicio';
import InicioAdmin from './components/Administrador/PaginaInicioAdmi';
import GestionCanchas from './components/Administrador/GestionCanchas';
import CanchaDetalle from './components/Administrador/CanchaDetalle';
import NuevaCancha from './components/Administrador/NuevaCancha';
import GestionReservas from './components/Administrador/GestionReservas';
import InicioSesion from './components/Sesion/InicioSesion';
import Registro from './components/Sesion/Registro';
import CanchasDisponibles from './components/Usuario/PaginaCanchas';
import MisReservas from './components/Usuario/MisReservas'
import { AuthProvider } from './AuthContext'; 
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/admin" element={< InicioAdmin/>} />
              <Route path="/gestioncanchas" element={< GestionCanchas/>} />
              <Route path="/canchadetalle/:id" element={< CanchaDetalle/>} />
              <Route path="/nuevacancha" element={< NuevaCancha/>} />
              <Route path="/gestionreservas" element={<GestionReservas />} />
              <Route path="/iniciosesion" element={<InicioSesion />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/canchas" element={<CanchasDisponibles />} />
              <Route path="/misreservas" element={<MisReservas />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
