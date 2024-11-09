import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../App.css';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/api/usuarios/register', {
                nombre, 
                apellido,
                email,
                contrasena,
            });

            if (response.data) {
                alert('Registro exitoso');
                navigate('/iniciosesion'); 
            }
        } catch (error) {
            console.error('Error al registrarse', error);
            setError('Error en el registro. Intente de nuevo.');
        }
    };

    return (
        <div className='registrarse'>
            <div className='register-form'>
                <h2 className='login'>Registrarse</h2>
                    <Form onSubmit={handleRegister}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ingrese su nombre"
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSurname">
                            <Form.Label>Apellido:</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ingrese su apellido"
                                value={apellido} 
                                onChange={(e) => setApellido(e.target.value)} 
                                required 
                            />
                        </Form.Group>
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
                            Registrarse
                        </Button>
                    </Form>
                    <div className="registro">
                        <p>¿Ya tienes una cuenta? <Link to="/iniciosesion">Inicia Sesión</Link></p>
                    </div>
            </div>
        </div>
    );
};

export default Registro;
