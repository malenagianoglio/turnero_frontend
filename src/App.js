import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Usuarios from './components/Usuarios';
import InicioSesion from './components/InicioSesion';
import Registro from './components/Registro';
import BuscarCanchas from './components/BuscarCanchas';
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
              <Route path="/" element={<BuscarCanchas />} /> {/* Muestra BuscarCanchas en la ruta principal */}
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/iniciosesion" element={<InicioSesion />} />
              <Route path="/registro" element={<Registro/>} />
              
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
