import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 
import { Link } from 'react-router-dom';
import '../App.css'; 

const InicioSesion = () => {
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate();
    const { login } = useAuth(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); 

        try {
            const response = await axios.post('http://localhost:8080/api/usuarios/login', {
                email,
                contrasena,
            });

            if (response.data) {
                alert('Inicio de sesión exitoso');
                login(response.data); 
                navigate('/');
            }
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            setError('Credenciales incorrectas. Intente de nuevo.'); 
        }
    };

    return (
        <div className='inicio-sesion'>
            <div className="login-form">
                <h2>Iniciar Sesión</h2>
                <Form onSubmit={handleLogin}>
                    {error && <Alert variant="danger">{error}</Alert>}
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
