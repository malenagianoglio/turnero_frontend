import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const BuscarCancha = () => {
    const [deportes, setDeportes] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [deporteSeleccionado, setDeporteSeleccionado] = useState(null);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [deportesResponse, horariosResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/deportes'),
                    axios.get('http://localhost:8080/api/horarios')
                ]);
                setDeportes(deportesResponse.data);
                setHorarios(horariosResponse.data);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!deporteSeleccionado || !horarioSeleccionado) {
            alert('Seleccione un deporte y un horario.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/buscar-cancha', {
                deporteId: deporteSeleccionado.id,
                horarioId: horarioSeleccionado.id,
            });
            
            // Manejo de la respuesta (ej. mostrar resultados en pantalla)
            console.log('Resultados de la búsqueda:', response.data);
        } catch (error) {
            console.error('Error al buscar cancha:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDeportes">
                <Form.Label>Seleccionar Deporte</Form.Label>
                <Form.Control
                    type="text"
                    value={deporteSeleccionado ? deporteSeleccionado.nombre : ''}
                    readOnly
                    placeholder="Seleccionar deporte"
                />
                <ListGroup>
                    {deportes.map((deporte) => (
                        <ListGroup.Item
                            key={deporte.id}
                            onClick={() => setDeporteSeleccionado(deporte)}
                            style={{ cursor: 'pointer' }}
                        >
                            {deporte.nombre}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Form.Group>

            <Form.Group controlId="formHorarios">
                <Form.Label>Seleccionar Horario</Form.Label>
                <Form.Control
                    type="text"
                    value={horarioSeleccionado ? horarioSeleccionado.hora : ''}
                    readOnly
                    placeholder="Seleccionar horario"
                />
                <ListGroup>
                    {horarios.map((horario) => (
                        <ListGroup.Item
                            key={horario.id}
                            onClick={() => setHorarioSeleccionado(horario)}
                            style={{ cursor: 'pointer' }}
                        >
                            {horario.hora}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Form.Group>

            <Button variant="primary" type="submit">
                Buscar
            </Button>
        </Form>
    );
};

export default BuscarCancha;

