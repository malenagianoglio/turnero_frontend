import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../App.css'; 
import { useAuth } from '../AuthContext'; 

function Barra_navegacion() {
  const { user, logout } = useAuth(); 

  return (
    <div className="sidebar">
      <Navbar bg="light" data-bs-theme="light">
        <Navbar.Brand as={Link} to="/">TurnoClick</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          
          {user ? (
            <>
              <Nav.Link as={Link} to="/perfil">Perfil</Nav.Link>
              <Button variant="outline-danger" onClick={logout}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <Button variant="outline-primary" as={Link} to="/iniciosesion">
              Iniciar Sesión
            </Button>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default Barra_navegacion;
