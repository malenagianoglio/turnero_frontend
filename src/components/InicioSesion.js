import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../App.css'; 

const InicioSesion = () => {
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/usuarios/login', {
                email,
                contrasena,
            });

            alert(response.data.message);
            login(response.data.token);
            if (response.data.rol === 'Administrador') {
                navigate('/admin'); // Redirige a la página de administración
            } else {
                navigate('/'); // Redirige a la página de inicio de cliente
            }
            

        } catch (error) {
            alert(error.response.data.error); 
        }
    };

    return (
        <div className='inicio-sesion'>
            <div className="login-form">
                <h2>Iniciar Sesión</h2>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Correo Electrónico:</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Ingrese su email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Ingrese su contraseña"
                            value={contrasena} 
                            onChange={(e) => setContrasena(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Ingresar
                    </Button>
                </Form>
                <div className="registro">
                <p>¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
                </div>
            </div>
        </div>
         
    );
};

export default InicioSesion;
