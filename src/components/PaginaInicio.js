import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css'; 
import '../App.css';

const Inicio = () => {
    const [deportes, setDeportes] = useState([]);
    const [buscarDeportes, setBuscarDeportes] = useState('');
    const [filtrarDeportes, setFiltrarDeportes] = useState([]);
    const [deporteSeleccionado, setDeporteSeleccionado] = useState(null);
    const [mostrarDeportes, setMostrarDeportes] = useState(false);

    const [fechaSeleccionada, setFechaSeleccionada] = useState(null); 
    const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

    const navigate = useNavigate();

    const opcionesHorarios = [
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deportesResponse = await axios.get('http://localhost:8080/api/deportes');
                setDeportes(deportesResponse.data);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filtrarDeportes = () => {
            if (buscarDeportes) {
                return deportes.filter(deporte =>
                    deporte.nombre.toLowerCase().includes(buscarDeportes.toLowerCase())
                );
            }
            return deportes;
        };
        setFiltrarDeportes(filtrarDeportes());
    }, [buscarDeportes, deportes]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const formattedFecha = fechaSeleccionada ? new Date(fechaSeleccionada).toISOString().split('T')[0] : null;

            const response = await axios.post('http://localhost:8080/api/buscarCanchas', {
                IdDeporte: deporteSeleccionado.id,
                Fecha: formattedFecha,
                Horario: horarioSeleccionado, 
            });

            const canchasDisponibles = response.data.canchasDisponibles || []; 
            navigate('/canchas', { state: { resultados: canchasDisponibles, fecha: formattedFecha, horario: horarioSeleccionado } });

        } catch (error) {
            console.error('Error al asignar espacio:', error);
        }
    };

    return (
        <Container fluid className="background-container">
            <Row className="gradient-container">
                <Col xs={12} md={6} className="left-column">
                </Col>

                <Col xs={12} md={6} className="right-column">
                    <div className='contenedor-form'>
                    <Form onSubmit={handleSearch}>
                        <Form.Group controlId="formDeporte">
                            <Form.Control
                                type="text"
                                placeholder="Elegir deporte"
                                value={buscarDeportes}
                                onChange={(e) => setBuscarDeportes(e.target.value)}
                                onFocus={() => setMostrarDeportes(true)}
                                onBlur={() => setTimeout(() => setMostrarDeportes(false), 200)}
                                required
                            />
                            {mostrarDeportes && filtrarDeportes.length > 0 && (
                                <ListGroup>
                                    {filtrarDeportes.map(deporte => (
                                        <ListGroup.Item
                                            key={deporte.id}
                                            onClick={() => {
                                                setDeporteSeleccionado(deporte);
                                                setBuscarDeportes(deporte.nombre);
                                                setMostrarDeportes(false);
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {deporte.nombre}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formFecha">
                            <Form.Control
                                type = "date"
                                placeholder='Seleccione una fecha'
                                value = {fechaSeleccionada}
                                onChange = {(e) => setFechaSeleccionada(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formHorario">
                            <Form.Control
                                as="select"
                                value={horarioSeleccionado}
                                onChange={(e) => setHorarioSeleccionado(e.target.value)}
                                required
                            >
                                <option value="">Seleccione un horario</option>
                                {opcionesHorarios.map((horario, index) => (
                                    <option key={index} value={horario}>
                                        {horario}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Buscar
                        </Button>
                    </Form>
                    </div>
                </Col>
            </Row>
            <div className="gradient-overlay"></div>
        </Container>
    );
};

export default Inicio;
