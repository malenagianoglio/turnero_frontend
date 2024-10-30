import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Inicio from './components/PaginaInicio';
import Usuarios from './components/Usuarios';
import InicioSesion from './components/InicioSesion';
import Registro from './components/Registro';
<<<<<<< HEAD
import CanchasDisponibles from './components/PaginaCanchas';
=======
import BuscarCanchas from './components/BuscarCanchas';
>>>>>>> 428294d199053aa680c69fa32a192184d12180ae
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
<<<<<<< HEAD
              <Route path="/" element={<Inicio />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/iniciosesion" element={<InicioSesion />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/canchas" element={<CanchasDisponibles />} />
=======
              <Route path="/" element={<BuscarCanchas />} /> {/* Muestra BuscarCanchas en la ruta principal */}
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/iniciosesion" element={<InicioSesion />} />
              <Route path="/registro" element={<Registro/>} />
              
>>>>>>> 428294d199053aa680c69fa32a192184d12180ae
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
