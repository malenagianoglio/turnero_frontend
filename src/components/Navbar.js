import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../App.css';

function Barra_navegacion() {
  const { isAuthenticated, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true }); 
  };

  return (
    <Navbar expand="lg" bg="light" className="sidebar">
      <Navbar.Brand as={Link} to="/" className="navbar-left">
        TurnoClick
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="navbar-center">
        <Nav className="ms-auto navbar-right">
          {isAuthenticated ? (
            <>
              {userRole === 'Cliente' && (
                <>
                  <Nav.Link as={Link} to="/misreservas">Mis reservas</Nav.Link>
                </>
              )}
              {userRole === 'Administrador' && (
                <>
                  <Nav.Link as={Link} to="/gestioncanchas">Gestión Canchas</Nav.Link>
                  <Nav.Link as={Link} to="/gestionreservas">Gestión Reservas</Nav.Link>
                </>
              )}
              <div className='boton-cerrar'>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </div>
            </>
          ) : (
            <Button variant="outline-primary" as={Link} to="/iniciosesion">
              Iniciar Sesión
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Barra_navegacion;
