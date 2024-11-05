import React, { useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AltaCancha() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [IdDeporte, setIdDeporte] = useState('');
    const [deportes, setDeportes] = useState([]);
    const navigate = useNavigate();


    const fetchDeportes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/deportes');
            const data = await response.json();
            setDeportes(data);
        } catch (error) {
            console.error('Error al cargar los deportes:', error);
        }
    };

    useEffect(() => {
        fetchDeportes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevaCancha = {
            nombre,
            descripcion,
            IdDeporte, 
        };

        try {
            const response = await fetch('http://localhost:8080/api/canchas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaCancha),
            });

            if (response.ok) {
                alert('Cancha creada con éxito');
                navigate('/gestioncanchas'); 
            } else {
                alert('Hubo un problema al crear la cancha');
            }
        } catch (error) {
            console.error('Error al crear la cancha:', error);
        }
    };

    return (
        <Container>
            <h1>Registrar Nueva Cancha</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNombre" className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDescripcion" className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDeporte" className="mb-3">
                    <Form.Label>Deporte</Form.Label>
                    <Form.Control
                        as="select"
                        value={IdDeporte}
                        onChange={(e) => setIdDeporte(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un deporte</option>
                        {deportes.map((deporte) => (
                            <option key={deporte.id} value={deporte.id}>
                                {deporte.nombre}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Crear Cancha
                </Button>
            </Form>
        </Container>
    );
}

export default AltaCancha;
