import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 
import axios from 'axios';
import '../App.css';

const Resultados = () => {
    const location = useLocation();
    const { resultados, fecha, horario } = location.state || { resultados: [], fecha: '', horario: '' };
    const [showModal, setShowModal] = useState(false);
    const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);
    const { userId } = useAuth();

    const handleReservar = (cancha) => {
        setCanchaSeleccionada(cancha);
        setShowModal(true);
    };

    const confirmarReserva = async () => {
        if (!canchaSeleccionada) return; 

        try {
            const response = await axios.post('http://localhost:8080/api/nuevareserva', {
                IdUsuario: userId,
                IdCancha: canchaSeleccionada.id,
                fecha: fecha,      
                horario_inicio: horario, 
            });

            alert(response.data.message || 'Reserva realizada con éxito');
            setShowModal(false);
        } catch (error) {
            console.error('Error al realizar la reserva:', error);
            alert('Error al realizar la reserva, por favor intenta de nuevo');
        }
    };

    return (
        <Container fluid className="contenedor-resultados">
            <Row>
                <Col>
                    <h2 className="titulo-resultados">Resultados de la Búsqueda</h2>
                    {resultados.length > 0 ? (
                        <Row>
                            {resultados.map((cancha, index) => (
                                <Col key={index} md={6} lg={4} className="mb-4">
                                    <Card className="resultado-card h-100">
                                        <Card.Body>
                                            <Card.Title className="text-primary">{cancha.nombre}</Card.Title>
                                            <Card.Text>
                                                <strong>Descripción:</strong> {cancha.descripcion || 'No disponible'}
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => handleReservar(cancha)}>
                                                Reservar
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p className="no-resultados">No hay canchas disponibles para mostrar.</p>
                    )}
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Reserva</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas reservar: <strong>{canchaSeleccionada?.nombre}</strong> para el {fecha} a las {horario}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={confirmarReserva}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Resultados;
