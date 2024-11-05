import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Inicio from './components/PaginaInicio';
import InicioAdmin from './components/Administrador/PaginaInicioAdmi';
import Usuarios from './components/Usuarios';
import InicioSesion from './components/InicioSesion';
import Registro from './components/Registro';
import CanchasDisponibles from './components/PaginaCanchas';
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
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/iniciosesion" element={<InicioSesion />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/canchas" element={<CanchasDisponibles />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
